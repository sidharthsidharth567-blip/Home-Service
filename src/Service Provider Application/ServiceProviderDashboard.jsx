import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, MessageSquare, Calendar,
  BarChart3, Wallet, HelpCircle, Bell, Settings,
  Search, Download, Upload, TrendingUp, Clock,
  CheckCircle2, Star as StarIcon, ArrowLeft,
  Phone, Mail, MapPin, User, Lock, Globe,
  CreditCard, ToggleLeft, ChevronRight, Send,
  Filter, SortAsc, Edit2, Trash2, Eye
} from 'lucide-react';
import ProviderAvailability from './ProviderAvailability';
import EarningsDashboard from './EarningsDashboard';
import ServiceProviderNotifications from './ServiceProviderNotifications';

// ─── Dummy Data ────────────────────────────────────────────────────────────────

const DUMMY_STATS = [
  { id: 'customers', label: 'Total Customers', value: '1,630', trend: '3.5%', trendUp: true,  icon: Users,     color: '#e23744' },
  { id: 'jobs',      label: 'Jobs Completed',  value: '1,293', trend: '2.5%', trendUp: false, icon: Calendar,  color: '#3b82f6' },
  { id: 'revenue',   label: 'Revenue Generated',value: '₹75,000',trend:'12%', trendUp: true,  icon: Wallet,    color: '#10b981' },
  { id: 'rating',    label: 'Satisfaction',    value: '4.8 / 5.0',trend:'24%',trendUp: true,  icon: StarIcon,  color: '#f59e0b' },
];

const EARNING_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const EARNING_INCOME  = [28000, 42000, 35000, 67000, 54000, 31000, 49000];
const EARNING_EXPENSE = [12000, 18000, 14000, 22000, 19000, 13000, 17000];

const RECENT_JOBS = [
  { id:'JOB-101', customer:'Bessie Cooper',    age:'45 yrs', date:'Nov 24, 2024', duration:'8:00–9:00 AM',  time:'60 min', contact:'(702) 555-0122', email:'tanya.hill@example.com',   status:'Completed', service:'Plumbing'   },
  { id:'JOB-102', customer:'Leslie Alexander', age:'34 yrs', date:'Nov 24, 2024', duration:'8:30–9:15 AM',  time:'45 min', contact:'(205) 555-0100', email:'debbie.baker@example.com',  status:'Completed', service:'Electrical' },
  { id:'JOB-103', customer:'Albert Flores',    age:'40 yrs', date:'Nov 25, 2024', duration:'9:00–9:30 AM',  time:'30 min', contact:'(316) 555-0116', email:'kenzi.lawson@example.com',  status:'Pending',   service:'Cleaning'   },
  { id:'JOB-104', customer:'Priya Menon',      age:'29 yrs', date:'Nov 25, 2024', duration:'10:00–11:00 AM',time:'60 min', contact:'(912) 555-0183', email:'priya.menon@example.com',   status:'Ongoing',   service:'Plumbing'   },
  { id:'JOB-105', customer:'Rahul Pandey',     age:'38 yrs', date:'Nov 26, 2024', duration:'2:00–3:30 PM',  time:'90 min', contact:'(731) 555-0042', email:'rahul.pandey@example.com',  status:'Completed', service:'Carpentry'  },
];

const CUSTOMERS = [
  { id:1, name:'Ananya Singh',   phone:'+91 99001 23456', email:'ananya.s@example.com',   area:'MG Road',      jobs:12, spent:'₹14,200', rating:5, avatar:'AS', lastVisit:'Apr 10, 2026' },
  { id:2, name:'Vikram Joshi',   phone:'+91 98123 45678', email:'vikram.j@example.com',   area:'Koramangala',  jobs:7,  spent:'₹8,650',  rating:4, avatar:'VJ', lastVisit:'Apr 9, 2026'  },
  { id:3, name:'Meera Iyer',     phone:'+91 97654 32101', email:'meera.i@example.com',    area:'Indiranagar',  jobs:19, spent:'₹22,400', rating:5, avatar:'MI', lastVisit:'Apr 8, 2026'  },
  { id:4, name:'Suresh Nair',    phone:'+91 96543 21098', email:'suresh.n@example.com',   area:'Whitefield',   jobs:3,  spent:'₹3,200',  rating:4, avatar:'SN', lastVisit:'Apr 5, 2026'  },
  { id:5, name:'Kavya Menon',    phone:'+91 95432 10987', email:'kavya.m@example.com',    area:'JP Nagar',     jobs:8,  spent:'₹9,750',  rating:5, avatar:'KM', lastVisit:'Apr 3, 2026'  },
  { id:6, name:'Arjun Reddy',    phone:'+91 94321 09876', email:'arjun.r@example.com',    area:'HSR Layout',   jobs:15, spent:'₹18,900', rating:5, avatar:'AR', lastVisit:'Apr 1, 2026'  },
  { id:7, name:'Nisha Kumar',    phone:'+91 93210 98765', email:'nisha.k@example.com',    area:'Marathahalli', jobs:5,  spent:'₹5,400',  rating:4, avatar:'NK', lastVisit:'Mar 28, 2026' },
  { id:8, name:'Rohit Das',      phone:'+91 92109 87654', email:'rohit.d@example.com',    area:'Jayanagar',    jobs:11, spent:'₹13,100', rating:4, avatar:'RD', lastVisit:'Mar 25, 2026' },
];

const MESSAGES_DATA = [
  { id:1, avatar:'AS', name:'Ananya Singh',   preview:'Thanks so much! You did a great job.',  time:'2 hrs ago',  unread:0, thread:[
    { from:'c', text:'Hi, I booked a plumbing service for today.' },
    { from:'m', text:'Hi Ananya! I\'m on my way, will reach in ~15 mins.' },
    { from:'c', text:'Great, thank you!' },
    { from:'m', text:'Job done! Please check and let me know.' },
    { from:'c', text:'Thanks so much! You did a great job.' },
  ]},
  { id:2, avatar:'VJ', name:'Vikram Joshi',   preview:'Can you come a bit earlier?',            time:'15 min ago', unread:2, thread:[
    { from:'c', text:'Hello, I had scheduled 11 AM but is it possible to come earlier?' },
    { from:'c', text:'Can you come a bit earlier?' },
  ]},
  { id:3, avatar:'MI', name:'Meera Iyer',     preview:'What\'s your estimated arrival time?',   time:'5 min ago',  unread:1, thread:[
    { from:'c', text:'What\'s your estimated arrival time?' },
  ]},
  { id:4, avatar:'SN', name:'Suresh Nair',    preview:'The tap is still dripping slightly.',     time:'Yesterday',  unread:0, thread:[
    { from:'m', text:'Hello Suresh, your repair is complete.' },
    { from:'c', text:'The tap is still dripping slightly.' },
    { from:'m', text:'I\'ll check it again tomorrow morning.' },
  ]},
  { id:5, avatar:'KM', name:'Kavya Menon',    preview:'Booking confirmed for tomorrow!',         time:'Yesterday',  unread:0, thread:[
    { from:'c', text:'Can I book you for tomorrow at 10 AM?' },
    { from:'m', text:'Yes, I\'m available. Booking confirmed for tomorrow!' },
    { from:'c', text:'Booking confirmed for tomorrow!' },
  ]},
];

const QUICK_REPLIES = ['On my way!', '~10 minutes', 'Job done ✓', 'Will call shortly', 'Please wait'];

const STATUS_COLOR = {
  Completed: { bg:'#f0fdf4', color:'#166534' },
  Pending:   { bg:'#fef3c7', color:'#92400e' },
  Ongoing:   { bg:'#eff6ff', color:'#1e40af' },
  Cancelled: { bg:'#fef2f2', color:'#991b1b' },
};

// ─── Reusable UI ──────────────────────────────────────────────────────────────

function Avatar({ initials, size = 38, color = '#e23744' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      backgroundColor: `${color}18`, color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: '700', fontSize: size * 0.32, flexShrink: 0
    }}>
      {initials}
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick, isMobile }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '11px 14px', borderRadius: '10px', cursor: 'pointer',
      backgroundColor: active ? '#fff1f2' : 'transparent',
      color: active ? '#e23744' : '#6b7280',
      fontWeight: active ? '600' : '500',
      transition: 'all 0.18s ease', 
      marginBottom: isMobile ? '0' : '3px',
      marginRight: isMobile ? '8px' : '0',
      flexShrink: 0
    }}>
      <Icon size={19} strokeWidth={active ? 2.5 : 2} />
      <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div style={{ backgroundColor:'#fff', padding:'22px', borderRadius:'16px', border:'1px solid #e5e7eb', flex:1, minWidth:'200px', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px' }}>
        <div style={{ padding:'10px', backgroundColor:`${stat.color}14`, borderRadius:'12px', color:stat.color }}>
          <Icon size={22} />
        </div>
        <span style={{ padding:'4px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'600', backgroundColor:stat.trendUp?'#f0fdf4':'#fef2f2', color:stat.trendUp?'#166534':'#991b1b' }}>
          {stat.trendUp ? '↑' : '↓'} {stat.trend}
        </span>
      </div>
      <p style={{ color:'#6b7280', fontSize:'13px', marginBottom:'4px' }}>{stat.label}</p>
      <h3 style={{ fontSize:'26px', fontWeight:'700', color:'#111827' }}>{stat.value}</h3>
      <p style={{ color:'#9ca3af', fontSize:'12px', marginTop:'4px' }}>Last 7 days</p>
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function DashboardHome({ winWidth }) {
  const maxIncome = Math.max(...EARNING_INCOME);
  const isTablet = winWidth <= 1024;
  
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
      {/* Stat Cards */}
      <div style={{ display:'grid', gridTemplateColumns: winWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap:'18px' }}>
        {DUMMY_STATS.map(s => <StatCard key={s.id} stat={s} />)}
      </div>

      {/* Charts */}
      <div style={{ display:'grid', gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr', gap:'20px' }}>
        {/* Bar Chart */}
        <div style={{ backgroundColor:'#fff', padding:'24px', borderRadius:'16px', border:'1px solid #e5e7eb', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
            <h3 style={{ fontSize:'17px', fontWeight:'700' }}>Earnings Overview</h3>
            <select style={{ padding:'7px 12px', borderRadius:'8px', border:'1px solid #e5e7eb', fontSize:'13px', color:'#374151' }}>
              <option>6 months</option>
              <option>Year</option>
            </select>
          </div>
          <div style={{ display:'flex', gap:'20px', marginBottom:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'#6b7280' }}>
              <div style={{ width:10, height:10, borderRadius:2, backgroundColor:'#e23744' }} /> Income
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'#6b7280' }}>
              <div style={{ width:10, height:10, borderRadius:2, backgroundColor:'#e5e7eb' }} /> Expenses
            </div>
          </div>
          {/* Y-axis labels */}
          <div style={{ display:'flex', gap:'8px' }}>
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', paddingBottom:'20px', fontSize:'11px', color:'#9ca3af', textAlign:'right', minWidth:'44px' }}>
              {['₹70k','₹50k','₹30k','₹10k','0'].map(v=><span key={v}>{v}</span>)}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'flex-end', gap:'10px', height:'200px', paddingBottom:'0' }}>
                {EARNING_MONTHS.map((m, i) => {
                  const incH = Math.round((EARNING_INCOME[i] / 70000) * 190);
                  const expH = Math.round((EARNING_EXPENSE[i] / 70000) * 190);
                  const isHighest = EARNING_INCOME[i] === maxIncome;
                  return (
                    <div key={m} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', position:'relative' }}>
                      {isHighest && (
                        <div style={{ position:'absolute', top: 190 - incH - 36, left:'50%', transform:'translateX(-50%)', backgroundColor:'#1f2a3b', color:'#fff', borderRadius:'6px', padding:'3px 8px', fontSize:'11px', fontWeight:'600', whiteSpace:'nowrap' }}>
                          ₹{(EARNING_INCOME[i]/1000).toFixed(0)}k
                          <div style={{ position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'5px solid transparent', borderRight:'5px solid transparent', borderTop:'5px solid #1f2a3b' }} />
                        </div>
                      )}
                      <div style={{ width:'100%', display:'flex', alignItems:'flex-end', gap:'3px', height:'190px' }}>
                        <div style={{ flex:1, height:`${incH}px`, backgroundColor: isHighest ? '#e23744' : '#d1d5db', borderRadius:'5px 5px 0 0', transition:'height 0.4s ease' }} />
                        <div style={{ flex:1, height:`${expH}px`, backgroundColor:'#f3f4f6', borderRadius:'5px 5px 0 0', transition:'height 0.4s ease' }} />
                      </div>
                      <span style={{ fontSize:'12px', color:'#9ca3af' }}>{m}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Work Distribution */}
        <div style={{ backgroundColor:'#fff', padding:'24px', borderRadius:'16px', border:'1px solid #e5e7eb', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize:'17px', fontWeight:'700', marginBottom:'20px' }}>Work Distribution</h3>
          <div style={{ height:'12px', width:'100%', borderRadius:'99px', overflow:'hidden', display:'flex', marginBottom:'20px' }}>
            <div style={{ width:'40%', backgroundColor:'#e23744' }} />
            <div style={{ width:'25%', backgroundColor:'#3b82f6' }} />
            <div style={{ width:'20%', backgroundColor:'#10b981' }} />
            <div style={{ width:'15%', backgroundColor:'#f59e0b' }} />
          </div>
          <div style={{ display:'grid', gap:'14px' }}>
            {[
              { label:'Plumbing',   val:'₹30,000', pct:'40%', color:'#e23744' },
              { label:'Electrical', val:'₹18,750', pct:'25%', color:'#3b82f6' },
              { label:'Cleaning',   val:'₹15,000', pct:'20%', color:'#10b981' },
              { label:'Carpentry',  val:'₹11,250', pct:'15%', color:'#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'13px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <div style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:item.color }} />
                  <span style={{ color:'#4b5563' }}>{item.label}</span>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontWeight:'700', color:'#111827' }}>{item.val}</div>
                  <div style={{ fontSize:'11px', color:'#9ca3af' }}>{item.pct}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ padding:'20px 24px', borderBottom:'1px solid #e5e7eb', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ fontSize:'17px', fontWeight:'700' }}>All Appointments</h3>
          <div style={{ position:'relative' }}>
            <Search size={16} style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#9ca3af' }} />
            <input type="text" placeholder="Search..." style={{ padding:'9px 12px 9px 36px', borderRadius:'8px', border:'1px solid #e5e7eb', fontSize:'13px', width:'220px', outline:'none' }} />
          </div>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
            <thead style={{ backgroundColor:'#f9fafb', fontSize:'12px', color:'#6b7280', fontWeight:'600' }}>
              <tr>
                {['Patients','Date','Duration','Contact','Status','Service'].map(h=>(
                  <th key={h} style={{ padding:'14px 20px', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_JOBS.map(job => {
                const s = STATUS_COLOR[job.status] || STATUS_COLOR.Pending;
                return (
                  <tr key={job.id} style={{ borderBottom:'1px solid #f3f4f6', fontSize:'13px' }}>
                    <td style={{ padding:'14px 20px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                        <Avatar initials={job.customer.split(' ').map(w=>w[0]).join('')} size={34} color="#e23744" />
                        <div>
                          <div style={{ fontWeight:'600', color:'#111827' }}>{job.customer}</div>
                          <div style={{ fontSize:'11px', color:'#9ca3af' }}>{job.age}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:'14px 20px', color:'#374151' }}>{job.date}</td>
                    <td style={{ padding:'14px 20px' }}>
                      <div style={{ color:'#374151' }}>{job.duration}</div>
                      <div style={{ fontSize:'11px', color:'#9ca3af' }}>{job.time}</div>
                    </td>
                    <td style={{ padding:'14px 20px' }}>
                      <div style={{ color:'#374151' }}>{job.contact}</div>
                      <div style={{ fontSize:'11px', color:'#9ca3af' }}>{job.email}</div>
                    </td>
                    <td style={{ padding:'14px 20px' }}>
                      <span style={{ padding:'4px 12px', borderRadius:'99px', fontSize:'12px', fontWeight:'600', backgroundColor:s.bg, color:s.color, display:'inline-flex', alignItems:'center', gap:'4px' }}>
                        {job.status === 'Completed' ? <CheckCircle2 size={11}/> : <Clock size={11}/>}
                        {job.status}
                      </span>
                    </td>
                    <td style={{ padding:'14px 20px' }}>
                      <span style={{ fontWeight:'600', color:'#e23744' }}>{job.service}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CustomersPage({ winWidth }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const isTablet = winWidth <= 992;
  const isMobile = winWidth <= 768;
  const filtered = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.area.toLowerCase().includes(search.toLowerCase())
  );
  const view = selected ? CUSTOMERS.find(c => c.id === selected) : null;

  if (view) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ display:'flex', alignItems:'center', gap:'6px', background:'none', border:'none', color:'#e23744', fontWeight:'600', fontSize:'14px', cursor:'pointer', marginBottom:'24px' }}>
          ← Back to Customers
        </button>
        <div style={{ display:'grid', gridTemplateColumns:isTablet ? '1fr' : '1fr 2fr', gap:'20px' }}>
          <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', padding:'28px', textAlign:'center' }}>
            <Avatar initials={view.avatar} size={72} color="#e23744" />
            <h2 style={{ fontSize:'20px', fontWeight:'700', marginTop:'14px' }}>{view.name}</h2>
            <p style={{ color:'#6b7280', fontSize:'13px', marginTop:'4px' }}>{view.area}</p>
            <div style={{ display:'flex', justifyContent:'center', gap:'4px', marginTop:'8px' }}>
              {'★★★★★'.split('').slice(0, view.rating).map((s,i)=><span key={i} style={{ color:'#f59e0b', fontSize:'16px' }}>★</span>)}
              {'★★★★★'.split('').slice(view.rating).map((s,i)=><span key={i} style={{ color:'#e5e7eb', fontSize:'16px' }}>★</span>)}
            </div>
            <div style={{ borderTop:'1px solid #e5e7eb', marginTop:'20px', paddingTop:'20px', display:'grid', gridTemplateColumns:isMobile ? '1fr' : '1fr 1fr', gap:'12px' }}>
              {[['Total Jobs', view.jobs], ['Total Spent', view.spent], ['Last Visit', view.lastVisit], ['Member Since', '2023']].map(([l,v])=>(
                <div key={l} style={{ textAlign:'center' }}>
                  <div style={{ fontWeight:'700', fontSize:'15px' }}>{v}</div>
                  <div style={{ fontSize:'11px', color:'#9ca3af', marginTop:'2px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', padding:'20px' }}>
              <h3 style={{ fontWeight:'700', marginBottom:'16px' }}>Contact Info</h3>
              {[[Phone, view.phone], [Mail, view.email], [MapPin, view.area + ', Bangalore']].map(([Icon, val], i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'10px 0', borderBottom:'1px solid #f3f4f6', fontSize:'14px', color:'#374151', wordBreak:'break-word' }}>
                  <Icon size={16} style={{ color:'#9ca3af', flexShrink:0 }} />{val}
                </div>
              ))}
            </div>
            <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', padding:'20px' }}>
              <h3 style={{ fontWeight:'700', marginBottom:'16px' }}>Recent Jobs</h3>
              {RECENT_JOBS.slice(0,3).map(job=>{
                const s=STATUS_COLOR[job.status]||STATUS_COLOR.Pending;
                return (
                  <div key={job.id} style={{ display:'flex', justifyContent:'space-between', alignItems:isMobile ? 'flex-start' : 'center', flexDirection:isMobile ? 'column' : 'row', gap:'10px', padding:'10px 0', borderBottom:'1px solid #f3f4f6', fontSize:'13px' }}>
                    <div>
                      <div style={{ fontWeight:'600' }}>{job.service}</div>
                      <div style={{ color:'#9ca3af' }}>{job.date}</div>
                    </div>
                    <span style={{ padding:'3px 10px', borderRadius:99, fontSize:'11px', fontWeight:'600', backgroundColor:s.bg, color:s.color }}>{job.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:isMobile ? 'stretch' : 'center', flexDirection:isMobile ? 'column' : 'row', gap:'12px', marginBottom:'20px' }}>
        <div style={{ display:'flex', gap:'10px', flexDirection:isMobile ? 'column' : 'row', width:isMobile ? '100%' : 'auto' }}>
          <div style={{ position:'relative' }}>
            <Search size={16} style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#9ca3af' }} />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customers..." style={{ padding:'10px 12px 10px 36px', borderRadius:'10px', border:'1px solid #e5e7eb', fontSize:'13px', width:isMobile ? '100%' : '260px', outline:'none' }} />
          </div>
          <button style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', padding:'10px 16px', borderRadius:'10px', border:'1px solid #e5e7eb', backgroundColor:'#fff', fontSize:'13px', fontWeight:'600', color:'#6b7280', cursor:'pointer', width:isMobile ? '100%' : 'auto' }}>
            <Filter size={15} /> Filter
          </button>
        </div>
        <span style={{ fontSize:'13px', color:'#9ca3af' }}>{filtered.length} customers</span>
      </div>
      <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
            <thead style={{ backgroundColor:'#f9fafb', fontSize:'12px', color:'#6b7280', fontWeight:'600' }}>
              <tr>
                {['Customer','Phone','Area','Total Jobs','Total Spent','Rating','Last Visit','Actions'].map(h=>(
                  <th key={h} style={{ padding:'14px 18px', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom:'1px solid #f3f4f6', fontSize:'13px' }}>
                  <td style={{ padding:'14px 18px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <Avatar initials={c.avatar} size={36} color="#e23744" />
                      <div>
                        <div style={{ fontWeight:'600' }}>{c.name}</div>
                        <div style={{ fontSize:'11px', color:'#9ca3af' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:'14px 18px', color:'#374151' }}>{c.phone}</td>
                  <td style={{ padding:'14px 18px', color:'#374151' }}>{c.area}</td>
                  <td style={{ padding:'14px 18px', fontWeight:'600', color:'#111827' }}>{c.jobs}</td>
                  <td style={{ padding:'14px 18px', fontWeight:'600', color:'#10b981' }}>{c.spent}</td>
                  <td style={{ padding:'14px 18px' }}>
                    <span style={{ color:'#f59e0b', letterSpacing:'1px' }}>{'★'.repeat(c.rating)}{'☆'.repeat(5-c.rating)}</span>
                  </td>
                  <td style={{ padding:'14px 18px', color:'#6b7280' }}>{c.lastVisit}</td>
                  <td style={{ padding:'14px 18px' }}>
                    <button onClick={()=>setSelected(c.id)} style={{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'5px 12px', borderRadius:'8px', border:'1px solid #e5e7eb', backgroundColor:'#fff', fontSize:'12px', fontWeight:'600', color:'#374151', cursor:'pointer' }}>
                      <Eye size={13}/> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MessagesPage({ winWidth }) {
  const [threads, setThreads] = useState(MESSAGES_DATA);
  const [active, setActive] = useState(null);
  const [input, setInput]   = useState('');

  const openChat = id => {
    setActive(id);
    setThreads(prev => prev.map(m => m.id===id ? {...m, unread:0} : m));
  };

  const sendMsg = (text) => {
    const t = text || input.trim();
    if (!t) return;
    setThreads(prev => prev.map(m => m.id===active ? {...m, thread:[...m.thread,{from:'m',text:t}], preview:t} : m));
    if (!text) setInput('');
    setTimeout(()=>{ const el=document.getElementById('msg-scroll'); if(el) el.scrollTop=el.scrollHeight; },50);
  };

  const conv = active ? threads.find(m=>m.id===active) : null;

  const isTablet = winWidth <= 1024;
  const isMobile = winWidth <= 768;

  if (conv) {
    return (
      <div style={{ display:'grid', gridTemplateColumns: isTablet ? '1fr' : '300px 1fr', gap:'20px', minHeight:isTablet ? 'auto' : 'calc(100vh - 220px)' }}>
        {/* List */}
        <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'16px', borderBottom:'1px solid #e5e7eb', fontWeight:'700', fontSize:'15px' }}>Messages</div>
          <div style={{ overflowY:'auto', flex:1 }}>
            {threads.map(m=>(
              <div key={m.id} onClick={()=>openChat(m.id)} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'14px 16px', borderBottom:'1px solid #f3f4f6', cursor:'pointer', backgroundColor:m.id===active?'#fff1f2':'#fff' }}>
                <Avatar initials={m.avatar} size={40} color="#e23744" />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontWeight:'600', fontSize:'13px' }}>{m.name}</span>
                    <span style={{ fontSize:'11px', color:'#9ca3af' }}>{m.time}</span>
                  </div>
                  <div style={{ fontSize:'12px', color:'#9ca3af', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginTop:'2px' }}>{m.preview}</div>
                </div>
                {m.unread>0 && <div style={{ width:18, height:18, borderRadius:'50%', backgroundColor:'#e23744', color:'#fff', fontSize:'10px', fontWeight:'700', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{m.unread}</div>}
              </div>
            ))}
          </div>
        </div>
        {/* Chat */}
        <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div style={{ padding:'14px 20px', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:isMobile ? 'flex-start' : 'center', justifyContent:'space-between', flexDirection:isMobile ? 'column' : 'row', gap:'12px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <Avatar initials={conv.avatar} size={38} color="#e23744" />
              <div>
                <div style={{ fontWeight:'600', fontSize:'14px' }}>{conv.name}</div>
                <div style={{ fontSize:'11px', color:'#10b981' }}>● Online</div>
              </div>
            </div>
            <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'7px 14px', borderRadius:'8px', backgroundColor:'#f0fdf4', color:'#166534', border:'none', cursor:'pointer', fontSize:'13px', fontWeight:'600' }}>
              <Phone size={14}/> Call
            </button>
          </div>
          <div id="msg-scroll" style={{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:'10px', backgroundColor:'#fafafa' }}>
            {conv.thread.map((msg,i)=>(
              <div key={i} style={{ alignSelf:msg.from==='m'?'flex-end':'flex-start', maxWidth:isMobile ? '88%' : '70%' }}>
                <div style={{ padding:'10px 14px', borderRadius:msg.from==='m'?'16px 16px 4px 16px':'16px 16px 16px 4px', fontSize:'13px', backgroundColor:msg.from==='m'?'#e23744':'#fff', color:msg.from==='m'?'#fff':'#111827', border:msg.from==='m'?'none':'1px solid #e5e7eb', boxShadow:'0 1px 2px rgba(0,0,0,0.05)' }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding:'8px 12px', borderTop:'1px solid #e5e7eb', display:'flex', gap:'8px', overflowX:'auto', backgroundColor:'#fff' }}>
            {QUICK_REPLIES.map(q=>(
              <button key={q} onClick={()=>sendMsg(q)} style={{ padding:'5px 12px', borderRadius:99, border:'1px solid #e5e7eb', fontSize:'12px', backgroundColor:'#fff', cursor:'pointer', whiteSpace:'nowrap', color:'#6b7280' }}>{q}</button>
            ))}
          </div>
          <div style={{ padding:'12px 16px', borderTop:'1px solid #e5e7eb', display:'flex', gap:'10px', backgroundColor:'#fff', flexDirection:isMobile ? 'column' : 'row' }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()} placeholder="Type a message..." style={{ flex:1, padding:'10px 14px', borderRadius:'10px', border:'1px solid #e5e7eb', fontSize:'13px', outline:'none', width:'100%' }} />
            <button onClick={()=>sendMsg()} style={{ padding:'10px 18px', borderRadius:'10px', backgroundColor:'#e23744', color:'#fff', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', fontWeight:'600', fontSize:'13px', width:isMobile ? '100%' : 'auto' }}>
              <Send size={15}/> Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', overflow:'hidden' }}>
      <div style={{ padding:'18px 20px', borderBottom:'1px solid #e5e7eb', fontWeight:'700', fontSize:'16px' }}>All Messages</div>
      {threads.map(m=>(
        <div key={m.id} onClick={()=>openChat(m.id)} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'16px 20px', borderBottom:'1px solid #f3f4f6', cursor:'pointer' }}>
          <Avatar initials={m.avatar} size={44} color="#e23744" />
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <span style={{ fontWeight:'600', fontSize:'14px' }}>{m.name}</span>
              <span style={{ fontSize:'12px', color:'#9ca3af' }}>{m.time}</span>
            </div>
            <div style={{ fontSize:'13px', color:'#6b7280', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginTop:'3px' }}>{m.preview}</div>
          </div>
          {m.unread>0 && <div style={{ width:20, height:20, borderRadius:'50%', backgroundColor:'#e23744', color:'#fff', fontSize:'11px', fontWeight:'700', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{m.unread}</div>}
        </div>
      ))}
    </div>
  );
}

function SettingsPage({ winWidth }) {
  const [name, setName]           = useState('Amit Sharma');
  const [phone, setPhone]         = useState('+91 98765 43210');
  const [email, setEmail]         = useState('amit.sharma@homecare.in');
  const [bio, setBio]             = useState('Experienced plumber with 6+ years in residential and commercial plumbing.');
  const [notifJobs, setNJ]        = useState(true);
  const [notifPay, setNP]         = useState(true);
  const [notifPromo, setNPR]      = useState(false);
  const [lang, setLang]           = useState('English');
  const [saved, setSaved]         = useState(false);

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false), 2500); };

  const Toggle = ({ value, onChange }) => (
    <div onClick={()=>onChange(!value)} style={{ width:46, height:26, borderRadius:99, backgroundColor:value?'#e23744':'#d1d5db', position:'relative', cursor:'pointer', transition:'background 0.25s', flexShrink:0 }}>
      <div style={{ position:'absolute', top:3, left:value?23:3, width:20, height:20, borderRadius:'50%', backgroundColor:'#fff', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }} />
    </div>
  );

  const Field = ({ label, value, onChange, type='text', textarea=false }) => (
    <div style={{ marginBottom:'16px' }}>
      <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'6px' }}>{label}</label>
      {textarea
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} rows={3} style={{ width:'100%', padding:'10px 12px', borderRadius:'10px', border:'1px solid #e5e7eb', fontSize:'13px', outline:'none', resize:'vertical', fontFamily:'inherit' }} />
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} style={{ width:'100%', padding:'10px 12px', borderRadius:'10px', border:'1px solid #e5e7eb', fontSize:'13px', outline:'none' }} />
      }
    </div>
  );

  const isMobile = winWidth <= 768;

  return (
    <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'20px' }}>
      {/* Profile */}
      <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', padding:'24px' }}>
        <h3 style={{ fontWeight:'700', fontSize:'16px', marginBottom:'20px', borderBottom:'1px solid #f3f4f6', paddingBottom:'12px' }}>👤 Profile Information</h3>
        <div style={{ textAlign:'center', marginBottom:'20px' }}>
          <div style={{ width:72, height:72, borderRadius:'50%', backgroundColor:'#fff1f2', color:'#e23744', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px', fontWeight:'700', margin:'0 auto 10px' }}>AS</div>
          <button style={{ fontSize:'12px', color:'#e23744', background:'none', border:'none', cursor:'pointer', fontWeight:'600' }}>Change Photo</button>
        </div>
        <Field label="Full Name" value={name} onChange={setName} />
        <Field label="Phone Number" value={phone} onChange={setPhone} type="tel" />
        <Field label="Email Address" value={email} onChange={setEmail} type="email" />
        <Field label="Bio" value={bio} onChange={setBio} textarea />
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
        {/* Notifications */}
        <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', padding:'24px' }}>
          <h3 style={{ fontWeight:'700', fontSize:'16px', marginBottom:'16px', borderBottom:'1px solid #f3f4f6', paddingBottom:'12px' }}>🔔 Notification Preferences</h3>
          {[
            ['Job Alerts', 'Notify me when a new job is assigned', notifJobs, setNJ],
            ['Payment Updates', 'Notify me on payment received/failed', notifPay, setNP],
            ['Promotions', 'News, promotions and app updates', notifPromo, setNPR],
          ].map(([title, sub, val, setter])=>(
            <div key={title} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid #f3f4f6' }}>
              <div>
                <div style={{ fontWeight:'600', fontSize:'13px' }}>{title}</div>
                <div style={{ fontSize:'12px', color:'#9ca3af', marginTop:'2px' }}>{sub}</div>
              </div>
              <Toggle value={val} onChange={setter} />
            </div>
          ))}
        </div>

        {/* Language */}
        <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', padding:'24px' }}>
          <h3 style={{ fontWeight:'700', fontSize:'16px', marginBottom:'16px', borderBottom:'1px solid #f3f4f6', paddingBottom:'12px' }}>🌐 Language & Region</h3>
          <div style={{ marginBottom:'16px' }}>
            <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'6px' }}>App Language</label>
            <select value={lang} onChange={e=>setLang(e.target.value)} style={{ width:'100%', padding:'10px 12px', borderRadius:'10px', border:'1px solid #e5e7eb', fontSize:'13px', outline:'none' }}>
              {['English','Hindi','Kannada','Tamil','Telugu','Malayalam'].map(l=><option key={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Security */}
        <div style={{ backgroundColor:'#fff', borderRadius:'16px', border:'1px solid #e5e7eb', padding:'24px' }}>
          <h3 style={{ fontWeight:'700', fontSize:'16px', marginBottom:'16px', borderBottom:'1px solid #f3f4f6', paddingBottom:'12px' }}>🔒 Security</h3>
          {['Change Password','Two-Factor Authentication','Active Sessions'].map(item=>(
            <div key={item} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid #f3f4f6', cursor:'pointer' }}>
              <span style={{ fontSize:'13px', color:'#374151' }}>{item}</span>
              <ChevronRight size={16} style={{ color:'#9ca3af' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Save button — full width */}
      <div style={{ gridColumn:'1 / -1', display:'flex', justifyContent:'flex-end', gap:'12px' }}>
        {saved && <span style={{ padding:'11px 20px', borderRadius:'10px', backgroundColor:'#f0fdf4', color:'#166534', fontSize:'13px', fontWeight:'600' }}>✓ Changes saved!</span>}
        <button onClick={save} style={{ padding:'11px 28px', borderRadius:'10px', backgroundColor:'#e23744', color:'#fff', border:'none', cursor:'pointer', fontSize:'14px', fontWeight:'700' }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

// ─── Main Shell ────────────────────────────────────────────────────────────────

export default function ServiceProviderDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('providerActiveTab') || 'dashboard';
  });
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = winWidth <= 768;

  useEffect(() => {
    sessionStorage.setItem('providerActiveTab', activeTab);
  }, [activeTab]);

  const PAGE_TITLES = {
    dashboard: 'Report & Analytics',
    customers: 'Customers',
    messages:  'Messages',
    availability: 'Scheduling',
    notifications: 'Notifications',
    earnings: 'Earnings',
    settings: 'Settings',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':     return <DashboardHome winWidth={winWidth} />;
      case 'customers':     return <CustomersPage winWidth={winWidth} />;
      case 'messages':      return <MessagesPage winWidth={winWidth} />;
      case 'notifications': return <ServiceProviderNotifications />;
      case 'availability':  return <ProviderAvailability winWidth={winWidth} />;
      case 'earnings':      return <EarningsDashboard winWidth={winWidth} />;
      case 'settings':      return <SettingsPage winWidth={winWidth} />;
      default:              return <DashboardHome winWidth={winWidth} />;
    }
  };

  return (
    <div style={{ display:'flex', flexDirection: isMobile ? 'column' : 'row', minHeight:'100vh', backgroundColor:'#f8fafc', fontFamily:"'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: isMobile ? '100%' : 250, backgroundColor:'#fff', borderRight: isMobile ? 'none' : '1px solid #e5e7eb', borderBottom: isMobile ? '1px solid #e5e7eb' : 'none', padding: isMobile ? '16px' : '20px 12px', display:'flex', flexDirection:'column', position: isMobile ? 'static' : 'fixed', top:0, bottom:0, left:0, zIndex:50, overflowY:'auto' }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px', padding: isMobile ? '0 0 16px' : '4px 10px 28px' }}>
          <div style={{ width:34, height:34, backgroundColor:'#e23744', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
            <TrendingUp size={20} />
          </div>
          <span style={{ fontSize:'18px', fontWeight:'800', color:'#111827', fontFamily:"'Outfit', sans-serif" }}>
            HomeCare <span style={{ color:'#e23744' }}>Pro</span>
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, display: isMobile ? 'flex' : 'block', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? '8px' : '0' }}>
          {[
            [LayoutDashboard, 'Dashboard',     'dashboard'],
            [Users,           'Customers',     'customers'],
            [MessageSquare,   'Messages',      'messages'],
            [Calendar,        'Scheduling',    'availability'],
            [Bell,            'Notifications', 'notifications'],
            [BarChart3,       'Earnings',      'earnings'],
          ].map(([Icon, label, id]) => (
            <SidebarItem key={id} isMobile={isMobile} icon={Icon} label={label} active={activeTab===id} onClick={()=>setActiveTab(id)} />
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: isMobile ? 'none' : '1px solid #e5e7eb', paddingTop: isMobile ? '0' : '16px', display: isMobile ? 'flex' : 'block', overflowX: isMobile ? 'auto' : 'visible', marginTop: isMobile ? '8px' : '0' }}>
          <SidebarItem isMobile={isMobile} icon={HelpCircle} label="Help & Support" onClick={()=>{}} />
          <SidebarItem isMobile={isMobile} icon={Settings}   label="Settings"       active={activeTab==='settings'} onClick={()=>setActiveTab('settings')} />
          {onBack && (
            <div onClick={onBack} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'11px 14px', borderRadius:'10px', cursor:'pointer', backgroundColor:'#fff1f2', color:'#e23744', fontWeight:'600', marginTop: isMobile ? '0' : '8px', border:'1px solid #fecdd3', transition:'all 0.18s', flexShrink: 0 }}>
              <ArrowLeft size={17} />
              <span style={{ fontSize:'14px', whiteSpace: 'nowrap' }}>Back to Home</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: isMobile ? 0 : 250, flex:1, padding: isMobile ? '24px 16px' : '36px 40px', minWidth:0, width: '100%', boxSizing: 'border-box' }}>
        <header style={{ display:'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '16px', marginBottom:'28px' }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '24px' : '26px', fontWeight:'800', color:'#111827' }}>
              {PAGE_TITLES[activeTab] || activeTab}
            </h1>
            <p style={{ color:'#6b7280', marginTop:'4px', fontSize:'14px' }}>Welcome back, Amit! Here's what's happening today.</p>
          </div>
          <div style={{ display:'flex', gap:'10px', width: isMobile ? '100%' : 'auto', overflowX: isMobile ? 'auto' : 'visible' }}>
            <button style={{ display:'flex', alignItems:'center', gap:'7px', padding:'10px 18px', borderRadius:'10px', border:'1px solid #e5e7eb', backgroundColor:'#fff', fontSize:'13px', fontWeight:'600', color:'#6b7280', cursor:'pointer', whiteSpace: 'nowrap' }}>
              <Download size={16}/> Export
            </button>
            <button style={{ display:'flex', alignItems:'center', gap:'7px', padding:'10px 18px', borderRadius:'10px', backgroundColor:'#e23744', fontSize:'13px', fontWeight:'600', color:'#fff', border:'none', cursor:'pointer', whiteSpace: 'nowrap' }}>
              <Upload size={16}/> Import Data
            </button>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}
