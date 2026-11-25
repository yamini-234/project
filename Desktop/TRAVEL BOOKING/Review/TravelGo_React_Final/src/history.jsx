import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Plane, Hotel, TrainFront, CalendarDays, MapPin, Ticket, Search, ArrowLeft, LogOut, Luggage, CircleCheck, Wallet } from 'lucide-react';
import './history.css';

const read = (key, fallback = '') => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
const money = value => value || 'Price unavailable';
function App() {
  const [email] = useState(() => read('userEmail').trim().toLowerCase());
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const all = useMemo(() => {
    if (!email) return [];
    let byUser = [];
    let legacy = [];
    try {
      const data = JSON.parse(read('bookingsByUser', '{}'));
      byUser = Array.isArray(data[email]) ? data[email] : [];
    } catch { byUser = []; }
    // Backward compatibility: older payment flow stored bookings in allBookings.
    try {
      const data = JSON.parse(read('allBookings', '[]'));
      legacy = Array.isArray(data)
        ? data.filter(b => String(b.email || b.customerEmail || '').trim().toLowerCase() === email)
            .map(b => ({
              id: b.id,
              type: b.type,
              status: b.status || 'Confirmed',
              customerName: b.customer || b.customerName || 'Traveller',
              customerEmail: email,
              customerPhone: b.phone || b.customerPhone || '',
              price: b.price || '₹0',
              bookedAt: b.bookedAt || b.dateCreated || new Date().toISOString(),
              details: b.type === 'flight'
                ? { airline: b.airline, from: b.from, to: b.to, date: b.travelDate, travellers: b.travellers }
                : b.type === 'hotel'
                  ? { hotel: b.hotel, room: b.room, destination: b.destination, checkIn: b.checkIn, checkOut: b.checkOut, guests: b.guests }
                  : { train: b.train, from: b.from, to: b.to, travelClass: b.trainClass, date: b.journeyDate, passengers: b.passengers }
            }))
        : [];
    } catch { legacy = []; }
    const merged = [...byUser];
    for (const item of legacy) {
      if (!merged.some(existing => existing.id === item.id)) merged.push(item);
    }
    return merged.sort((a, b) => new Date(b.bookedAt || 0) - new Date(a.bookedAt || 0));
  }, [email]);
  const bookings = all.filter(b => (filter === 'all' || b.type === filter) && `${b.id} ${b.customerName} ${JSON.stringify(b.details || {})}`.toLowerCase().includes(query.toLowerCase()));
  const userName = read('userName', 'Traveller');
  const iconFor = type => type === 'hotel' ? <Hotel/> : type === 'train' ? <TrainFront/> : <Plane/>;
  const detailsFor = b => { const d=b.details||{}; if(b.type==='hotel') return [[ 'Hotel',d.hotel ],['Room',d.room],['Destination',d.destination],['Check-in',d.checkIn],['Check-out',d.checkOut],['Guests',d.guests]]; if(b.type==='train') return [['Train',d.train],['Route',`${d.from||'-'} → ${d.to||'-'}`],['Class',d.travelClass],['Journey date',d.date],['Passengers',d.passengers]]; return [['Airline',d.airline],['Route',`${d.from||'-'} → ${d.to||'-'}`],['Departure',d.date],['Travellers',d.travellers]]; };
  if (!email) return <main className="auth-wrap"><section className="auth-card"><div className="brand-mark"><Luggage size={30}/></div><h1>Your trips, all in one place.</h1><p>Please log in with the same email address used while booking to see your saved tickets and booking history.</p><a className="primary" href="login.html">Log in to TravelGo</a><a className="back-link" href="index.html"><ArrowLeft size={16}/> Back to home</a></section></main>;
  return <><header className="topbar"><a className="brand" href="index.html">Travel<span>Go</span></a><nav><a href="index.html">Home</a><a className="active" href="history.html">My Bookings</a></nav><div className="profile"><span className="avatar">{userName.charAt(0).toUpperCase()}</span><span>{userName}</span><button title="Log out" onClick={()=>{localStorage.removeItem('loggedIn'); window.location.href='index.html';}}><LogOut size={17}/></button></div></header>
  <main className="page"><section className="welcome"><div><p className="eyebrow">TRAVEL DASHBOARD</p><h1>Your booking history</h1><p className="muted">All your confirmed flights, hotels and train tickets in one place.</p></div><div className="welcome-icon"><Ticket size={34}/></div></section>
  <section className="stats"><div className="stat"><span className="stat-icon"><Luggage/></span><div><strong>{all.length}</strong><small>Total bookings</small></div></div><div className="stat"><span className="stat-icon green"><CircleCheck/></span><div><strong>{all.filter(b=>b.status==='Confirmed').length}</strong><small>Confirmed</small></div></div><div className="stat"><span className="stat-icon gold"><Wallet/></span><div><strong>{all.length ? '₹' + all.reduce((sum,b)=>sum+(Number(String(b.price||'').replace(/[^0-9.]/g,''))||0),0).toLocaleString('en-IN') : '₹0'}</strong><small>Total booked value</small></div></div></section>
  <section className="history-panel"><div className="panel-head"><div><h2>All trips</h2><p className="muted">Showing bookings for {email}</p></div><label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search booking ID or destination"/></label></div><div className="filters">{[['all','All bookings'],['flight','Flights'],['hotel','Hotels'],['train','Trains']].map(([v,label])=><button key={v} className={filter===v?'selected':''} onClick={()=>setFilter(v)}>{label}</button>)}</div>
  {bookings.length ? <div className="booking-list">{bookings.map(b=><article className="booking-card" key={b.id}><div className="booking-head"><div className="type-icon">{iconFor(b.type)}</div><div className="booking-title"><h3>{b.type.charAt(0).toUpperCase()+b.type.slice(1)} booking</h3><span>Booking ID: {b.id}</span></div><span className="status"><CircleCheck size={14}/> {b.status||'Confirmed'}</span></div><div className="details-grid">{detailsFor(b).filter(([,v])=>v && v!=='-').map(([label,value])=><div className="detail" key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><div className="booking-foot"><span><CalendarDays size={15}/> Booked on {new Date(b.bookedAt).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</span><strong>{money(b.price)}</strong></div></article>)}</div> : <div className="empty"><div className="empty-icon"><Ticket size={30}/></div><h3>{all.length ? 'No matching bookings' : 'No bookings yet'}</h3><p>{all.length ? 'Try another search or filter.' : 'Your confirmed tickets will appear here after you complete a booking.'}</p><a className="primary" href="index.html">Explore trips</a></div>}</section><footer>© 2026 TravelGo · Your journey starts here</footer></main></>;
}

createRoot(document.getElementById('root')).render(<App/>);
