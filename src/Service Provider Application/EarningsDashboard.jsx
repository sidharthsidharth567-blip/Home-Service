import React, { useState } from 'react';

const styles = {
  // layout
  container: {
    maxWidth: 1200,
    margin: 0,
    padding: '30px 20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  // top bar
  topbar: {
    background: 'var(--primary)',
    borderRadius: 14,
    padding: '20px 24px',
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topbarTitle: { fontSize: '1.3rem', fontWeight: 700, color: '#fff', margin: '0 0 4px' },
  topbarSub:   { fontSize: '0.85rem', color: '#ccc', margin: 0 },
  avatar: {
    width: 42, height: 42, borderRadius: '50%',
    background: '#0052a3',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 700, fontSize: '0.9rem',
  },
  // section label
  secLabel: {
    fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)',
    textTransform: 'uppercase', letterSpacing: 0.6,
    margin: '28px 0 12px',
  },
  // filter buttons
  filterSection: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 },
  filterBtn: {
    padding: '7px 18px',
    border: '#ddd 1.5px solid',
    background: 'transparent',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#333',
    transition: 'all 0.2s',
  },
  filterBtnActive: { background: 'var(--primary)', color: '#fff', border: 'var(--primary) 1.5px solid' },
  // summary cards
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 12,
    marginBottom: 8,
  },
  summaryCard: {
    background: '#f0f5ff',
    borderRadius: 10,
    padding: '14px 16px',
    border: '0.5px solid #ddd',
  },
  summaryLabel: { fontSize: '0.78rem', color: '#666', marginBottom: 6, fontWeight: 600 },
  summaryValue: { fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 6 },
  badgeUp:  { display:'inline-block', padding:'2px 10px', borderRadius:99, fontSize:'0.78rem', fontWeight:600, background:'#EAF3DE', color:'#27500A' },
  badgeDown:{ display:'inline-block', padding:'2px 10px', borderRadius:99, fontSize:'0.78rem', fontWeight:600, background:'#FCEBEB', color:'#791F1F' },
  badgeNeu: { display:'inline-block', padding:'2px 10px', borderRadius:99, fontSize:'0.78rem', fontWeight:600, background: '#f0f5ff', color: 'var(--primary)', border:'0.5px solid #ddd' },
  // breakdown cards
  breakdownGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12,
  },
  card: {
    background: '#fff',
    border: '0.5px solid #ddd',
    borderRadius: 12,
    padding: '14px 18px',
  },
  cardTitle: {
    fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12,
  },
  brow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '7px 0', borderBottom: '0.5px solid #f0f0f0', fontSize: '0.875rem',
  },
  browLast: { borderBottom: 'none', paddingBottom: 0 },
  browLabel: { color: '#666' },
  browVal:   { fontWeight: 700, color: '#333' },
  // alert / insight
  alertBox: {
    display: 'flex', gap: 12, alignItems: 'flex-start',
    background: '#f0f5ff', border: '0.5px solid #ddd',
    borderRadius: 12, padding: '12px 16px', marginBottom: 10,
  },
  alertIcon:  { fontSize: '1.1rem', flexShrink: 0, marginTop: 2 },
  alertTitle: { fontSize: '0.875rem', fontWeight: 700, color: '#333', marginBottom: 3 },
  alertText:  { fontSize: '0.8rem', color: '#666', margin: 0 },
  // incentives
  incentiveCard: {
    background: '#f0f5ff', border: '0.5px solid #ddd',
    borderRadius: 12, padding: '14px 18px', marginBottom: 10,
  },
  incTitle: { fontSize: '0.95rem', fontWeight: 700, color: '#333', marginBottom: 4 },
  incDesc:  { fontSize: '0.8rem', color: '#666', marginBottom: 10 },
  progBar:  { width:'100%', height:7, background: '#ddd', borderRadius:99, overflow:'hidden', marginBottom:5 },
  progFill: { height:'100%', background: 'var(--primary)', borderRadius:99, transition:'width 0.3s' },
  progText: { fontSize:'0.75rem', color: '#666', fontWeight:600 },
  // filters row for job table
  dateFilters: { display:'flex', gap:8, flexWrap:'wrap', marginBottom:12, alignItems:'center' },
  dateLabel: { fontSize:'0.8rem', color:'#666' },
  dateInput: {
    padding:'6px 10px', border:'1px solid #ddd',
    background:'#fff', borderRadius:8, fontSize:'0.8rem', color:'#333',
    outline:'none',
  },
  // table
  tableWrap: {
    background: '#fff', border: '0.5px solid #ddd',
    borderRadius: 12, overflow: 'hidden',
  },
  tableHead: {
    display: 'grid', gridTemplateColumns: '1.4fr 1.4fr 1fr 1fr 1fr',
    padding: '10px 16px',
    background: '#f0f5ff',
    fontSize: '0.78rem', fontWeight: 700, color: '#666',
    borderBottom: '0.5px solid #ddd',
  },
  tableRow: {
    display: 'grid', gridTemplateColumns: '1.4fr 1.4fr 1fr 1fr 1fr',
    padding: '11px 16px', borderBottom: '0.5px solid #f0f0f0',
    fontSize: '0.875rem', alignItems: 'center',
  },
  tDate:    { color: '#888', fontSize: '0.78rem' },
  tService: { fontWeight: 600, color: '#1f2a3b' },
  tEarned:  { fontWeight: 700, color: 'var(--primary)' },
  tComm:    { color: '#A32D2D' },
  tNet:     { fontWeight: 700, color: '#27500A' },
  // deductions
  dedRow: {
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'12px 16px', borderBottom:'0.5px solid #f0f0f0', fontSize:'0.875rem',
  },
  dedVal:   { color:'#A32D2D', fontWeight:700 },
  dedTotal: {
    display:'flex', justifyContent:'space-between',
    padding:'12px 16px', background: '#f0f5ff',
    borderTop:'1px solid #ddd',
    fontSize:'0.875rem', fontWeight:700, color: '#333',
    borderRadius:'0 0 12px 12px',
  },
  // analytics
  analyticsGrid: {
    display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:12,
  },
  analyticCard: {
    background: '#f0f5ff', borderRadius:10, padding:'14px 16px',
    textAlign:'center', border:'0.5px solid #ddd',
  },
  analyticVal:   { fontSize:'1.25rem', fontWeight:700, color: 'var(--primary)', marginBottom:4 },
  analyticLabel: { fontSize:'0.78rem', color: '#666' },
  // wallet
  walletGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:12 },
  walletCard: {
    background:'#fff', border:'0.5px solid #ddd',
    borderRadius:12, padding:'16px 18px',
  },
  walletLabel: {
    fontSize:'0.72rem', fontWeight:700, color: 'var(--primary)',
    textTransform:'uppercase', letterSpacing:0.5, marginBottom:6,
  },
  walletVal:  { fontSize:'1.5rem', fontWeight:700, color: '#333', marginBottom:4 },
  walletSub:  { fontSize:'0.78rem', color:'#888', marginBottom:14 },
  btnPrimary: {
    width:'100%', padding:'9px 12px',
    background: 'var(--primary)', color:'#fff',
    border:'1.5px solid var(--primary)',
    borderRadius:8, fontSize:'0.875rem', fontWeight:700,
    cursor:'pointer',
  },
  btnSecondary: {
    width:'100%', padding:'9px 12px',
    background:'transparent', color: 'var(--primary)',
    border:'1.5px solid #ddd',
    borderRadius:8, fontSize:'0.875rem', fontWeight:700,
    cursor:'pointer',
  },
  // payout
  payoutRow: {
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'12px 16px', borderBottom:'0.5px solid #f0f0f0',
    fontSize:'0.875rem',
  },
  payoutDate:   { fontSize:'0.78rem', color:'#888' },
  payoutMethod: { fontWeight:600, color:'#1f2a3b' },
  payoutAmt:    { fontWeight:700, color: 'var(--primary)' },
  pillDone:    { padding:'3px 10px', borderRadius:99, fontSize:'0.75rem', fontWeight:600, background:'#EAF3DE', color:'#27500A' },
  pillPending: { padding:'3px 10px', borderRadius:99, fontSize:'0.75rem', fontWeight:600, background:'#FAEEDA', color:'#633806' },
  // download buttons
  dlBtns: { display:'flex', gap:10, flexWrap:'wrap', marginBottom:40 },
  dlBtn: {
    display:'inline-flex', alignItems:'center', gap:6,
    padding:'9px 18px',
    background: '#f0f5ff', border:'1.5px solid #ddd',
    borderRadius:8, fontSize:'0.875rem', fontWeight:600,
    cursor:'pointer', color: 'var(--primary)',
  },
};

// ─── Data ──────────────────────────────────────────────────────────────────
const allJobs = [
  { id:1, date:'Apr 10, 2026', time:'2:30 PM',  service:'Plumbing',            earned:850,  commission:85,  net:765  },
  { id:2, date:'Apr 10, 2026', time:'11:00 AM', service:'Cleaning',             earned:1200, commission:120, net:1080 },
  { id:3, date:'Apr 9, 2026',  time:'4:15 PM',  service:'Electrical',           earned:950,  commission:95,  net:855  },
  { id:4, date:'Apr 9, 2026',  time:'10:30 AM', service:'Electrical',           earned:650,  commission:65,  net:585  },
  { id:5, date:'Apr 8, 2026',  time:'3:45 PM',  service:'Plumbing',             earned:1100, commission:110, net:990  },
  { id:6, date:'Apr 7, 2026',  time:'1:00 PM',  service:'Carpentry',            earned:1350, commission:135, net:1215 },
  { id:7, date:'Apr 7, 2026',  time:'9:30 AM',  service:'Cleaning',             earned:800,  commission:80,  net:720  },
  { id:8, date:'Apr 6, 2026',  time:'5:00 PM',  service:'Plumbing',             earned:700,  commission:70,  net:630  },
  { id:9, date:'Apr 5, 2026',  time:'2:00 PM',  service:'Electrical',           earned:1050, commission:105, net:945  },
  { id:10,date:'Apr 4, 2026',  time:'11:30 AM', service:'Carpentry',            earned:900,  commission:90,  net:810  },
];

const summaryCards = [
  { label: "Today's earnings", value: '₹2,050',    badge:'up',   pct:12, vs:'yesterday'  },
  { label: 'This week',        value: '₹8,500',    badge:'down', pct:5,  vs:'last week'  },
  { label: 'This month',       value: '₹35,000',   badge:'up',   pct:18, vs:'last month' },
  { label: 'Lifetime earnings',value: '₹2,45,000', badge:'neu'                            },
];

const breakdownService = [
  { label:'Plumbing',   val:'₹12,500' },
  { label:'Electrical', val:'₹10,200' },
  { label:'Cleaning',   val:'₹8,000'  },
  { label:'Carpentry',  val:'₹4,300'  },
];

const breakdownPayment = [
  { label:'Cash',          val:'₹18,000' },
  { label:'Online / UPI',  val:'₹15,200' },
  { label:'Tips & bonuses',val:'₹2,100'  },
];

const alerts = [
  { icon:'🎉', title:'Excellent performance!',  text:'You earned 20% more than last week' },
  { icon:'⏰', title:'High demand alert',        text:'High demand for plumbing tomorrow 9–12 AM' },
];

const incentives = [
  { title:'Complete 10 jobs bonus',    desc:'Earn ₹500 bonus when you complete 10 jobs', done:7,  total:10 },
  { title:'5-star rating reward',      desc:'Get ₹200 bonus for maintaining 5-star rating', done:45, total:50 },
];

const deductions = [
  { label:'Platform commission (10%)', amt:3500 },
  { label:'Taxes / GST',               amt:1200 },
  { label:'Cancellation penalty',      amt:200  },
];

const analytics = [
  { val:'₹1,250', label:'Daily avg'        },
  { val:'Monday', label:'Peak earning day' },
  { val:'₹850',   label:'Avg per job'      },
  { val:'98%',    label:'Completion rate'  },
];

const walletItems = [
  { label:'Available balance', val:'₹12,500', sub:'Ready to withdraw',       btn:'Withdraw now',       primary:true  },
  { label:'Pending balance',   val:'₹3,200',  sub:'Processing (7–10 days)',  btn:'View details',       primary:false },
  { label:'Last payout',       val:'₹10,000', sub:'Bank transfer • Apr 5',   btn:'Manage bank details',primary:false },
];

const payouts = [
  { date:'Apr 5, 2026',  method:'Bank transfer', amt:'₹10,000', status:'Completed' },
  { date:'Mar 28, 2026', method:'Bank transfer', amt:'₹8,500',  status:'Completed' },
  { date:'Mar 21, 2026', method:'UPI',           amt:'₹7,200',  status:'Completed' },
  { date:'Mar 14, 2026', method:'Bank transfer', amt:'₹9,500',  status:'Completed' },
  { date:'Mar 31, 2026', method:'UPI',           amt:'₹2,800',  status:'Pending'   },
];

const serviceOptions = ['All services','Plumbing','Electrical','Cleaning','Carpentry'];

// ─── Component ─────────────────────────────────────────────────────────────
export default function EarningsDashboard() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [fromDate, setFromDate]         = useState('2026-04-01');
  const [toDate, setToDate]             = useState('2026-04-10');
  const [svcFilter, setSvcFilter]       = useState('');

  const filteredJobs = allJobs.filter(j => {
    const dateStr = j.date; // e.g. "Apr 10, 2026"
    if (svcFilter && j.service !== svcFilter) return false;
    return true;
  });

  const totalDeductions = deductions.reduce((s, d) => s + d.amt, 0);

  return (
    <div style={styles.container}>

      {/* Top bar */}
      <div style={styles.topbar}>
        <div>
          <h1 style={styles.topbarTitle}>Earnings Dashboard</h1>
          <p style={styles.topbarSub}>Track your earnings, payments & performance</p>
        </div>
        <div style={styles.avatar}>RK</div>
      </div>

      {/* Period filter */}
      <div style={styles.filterSection}>
        {['all','today','week','month'].map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{ ...styles.filterBtn, ...(activeFilter === f ? styles.filterBtnActive : {}) }}
          >
            {f === 'all' ? 'All Time' : f === 'today' ? 'Today' : f === 'week' ? 'This Week' : 'This Month'}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div style={styles.summaryGrid}>
        {summaryCards.map((c, i) => (
          <div key={i} style={styles.summaryCard}>
            <div style={styles.summaryLabel}>{c.label}</div>
            <div style={styles.summaryValue}>{c.value}</div>
            {c.badge === 'up'  && <span style={styles.badgeUp}>↑ {c.pct}% vs {c.vs}</span>}
            {c.badge === 'down'&& <span style={styles.badgeDown}>↓ {c.pct}% vs {c.vs}</span>}
            {c.badge === 'neu' && <span style={styles.badgeNeu}>Cumulative total</span>}
          </div>
        ))}
      </div>

      {/* Earnings breakdown */}
      <p style={styles.secLabel}>📊 Earnings Breakdown</p>
      <div style={styles.breakdownGrid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>By service type</div>
          {breakdownService.map((item, i) => (
            <div key={i} style={{ ...styles.brow, ...(i === breakdownService.length-1 ? styles.browLast : {}) }}>
              <span style={styles.browLabel}>{item.label}</span>
              <span style={styles.browVal}>{item.val}</span>
            </div>
          ))}
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>By payment method</div>
          {breakdownPayment.map((item, i) => (
            <div key={i} style={{ ...styles.brow, ...(i === breakdownPayment.length-1 ? styles.browLast : {}) }}>
              <span style={styles.browLabel}>{item.label}</span>
              <span style={styles.browVal}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <p style={styles.secLabel}>🔔 Alerts & Insights</p>
      {alerts.map((a, i) => (
        <div key={i} style={styles.alertBox}>
          <div style={styles.alertIcon}>{a.icon}</div>
          <div>
            <div style={styles.alertTitle}>{a.title}</div>
            <p style={styles.alertText}>{a.text}</p>
          </div>
        </div>
      ))}

      {/* Incentives */}
      <p style={styles.secLabel}>🎯 Incentives & Bonuses</p>
      {incentives.map((inc, i) => (
        <div key={i} style={styles.incentiveCard}>
          <div style={styles.incTitle}>{inc.title}</div>
          <div style={styles.incDesc}>{inc.desc}</div>
          <div style={styles.progBar}>
            <div style={{ ...styles.progFill, width: `${(inc.done / inc.total) * 100}%` }} />
          </div>
          <div style={styles.progText}>{inc.done} / {inc.total} completed</div>
        </div>
      ))}

      {/* Job history */}
      <p style={styles.secLabel}>📅 Detailed History</p>
      <div style={styles.dateFilters}>
        <span style={styles.dateLabel}>From</span>
        <input style={styles.dateInput} type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        <span style={styles.dateLabel}>To</span>
        <input style={styles.dateInput} type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
        <select style={styles.dateInput} value={svcFilter} onChange={e => setSvcFilter(e.target.value === 'All services' ? '' : e.target.value)}>
          {serviceOptions.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div style={styles.tableWrap}>
        <div style={styles.tableHead}>
          <div>Date & Time</div><div>Service</div><div>Earned</div><div>Commission</div><div>Net</div>
        </div>
        {filteredJobs.length === 0
          ? <div style={{ padding:16, textAlign:'center', fontSize:'0.875rem', color:'#888' }}>No jobs found</div>
          : filteredJobs.map((job, i) => (
            <div key={job.id} style={{ ...styles.tableRow, ...(i === filteredJobs.length-1 ? { borderBottom:'none' } : {}) }}>
              <div style={styles.tDate}>{job.date} {job.time}</div>
              <div style={styles.tService}>{job.service}</div>
              <div style={styles.tEarned}>₹{job.earned}</div>
              <div style={styles.tComm}>-₹{job.commission}</div>
              <div style={styles.tNet}>₹{job.net}</div>
            </div>
          ))
        }
      </div>

      {/* Deductions */}
      <p style={styles.secLabel}>💸 Deductions & Commission</p>
      <div style={{ ...styles.card, padding:0, overflow:'hidden' }}>
        {deductions.map((d, i) => (
          <div key={i} style={styles.dedRow}>
            <span>{d.label}</span>
            <span style={styles.dedVal}>-₹{d.amt.toLocaleString('en-IN')}</span>
          </div>
        ))}
        <div style={styles.dedTotal}>
          <span>Total deductions</span>
          <span>-₹{totalDeductions.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Analytics */}
      <p style={styles.secLabel}>📈 Analytics</p>
      <div style={styles.analyticsGrid}>
        {analytics.map((a, i) => (
          <div key={i} style={styles.analyticCard}>
            <div style={styles.analyticVal}>{a.val}</div>
            <div style={styles.analyticLabel}>{a.label}</div>
          </div>
        ))}
      </div>

      {/* Wallet */}
      <p style={styles.secLabel}>🏦 Wallet & Balance</p>
      <div style={styles.walletGrid}>
        {walletItems.map((w, i) => (
          <div key={i} style={styles.walletCard}>
            <div style={styles.walletLabel}>{w.label}</div>
            <div style={styles.walletVal}>{w.val}</div>
            <div style={styles.walletSub}>{w.sub}</div>
            <button
              style={w.primary ? styles.btnPrimary : styles.btnSecondary}
              onClick={() => {
                if (i === 0) {
                  if (window.confirm('Withdraw \u20b912,500 to your registered bank account?')) {
                    alert('\u2713 Withdrawal of \u20b912,500 initiated! Will be credited in 1\u20132 business days.');
                  }
                } else if (i === 1) {
                  alert('Pending Balance Details:\n\u2022 Job #JOB-104: \u20b91,200 (Processing)\n\u2022 Job #JOB-105: \u20b92,000 (Processing)\n\nExpected by: Apr 18, 2026');
                } else {
                  const details = prompt('Enter new bank account number (demo):');
                  if (details) alert('\u2713 Bank details updated successfully!');
                }
              }}
            >{w.btn}</button>
          </div>
        ))}
      </div>

      {/* Payout history */}
      <p style={styles.secLabel}>💳 Payout History</p>
      <div style={styles.tableWrap}>
        {payouts.map((p, i) => (
          <div key={i} style={{ ...styles.payoutRow, ...(i === payouts.length-1 ? { borderBottom:'none' } : {}) }}>
            <div>
              <div style={styles.payoutDate}>{p.date}</div>
              <div style={styles.payoutMethod}>{p.method}</div>
            </div>
            <div style={styles.payoutAmt}>{p.amt}</div>
            <span style={p.status === 'Completed' ? styles.pillDone : styles.pillPending}>
              {p.status}
            </span>
          </div>
        ))}
      </div>

      {/* Reports */}
      <p style={styles.secLabel}>🧾 Reports</p>
      <div style={styles.dlBtns}>
        <button
          style={styles.dlBtn}
          onClick={() => {
            const rows = [['Date','Time','Service','Earned','Commission','Net'],
              ...allJobs.map(j => [j.date, j.time, j.service, ''+j.earned, ''+j.commission, ''+j.net])];
            const csv = rows.map(r => r.join(',')).join('\n');
            const a = document.createElement('a');
            a.href = 'data:text/csv,' + encodeURIComponent(csv);
            a.download = 'earnings_statement.csv';
            a.click();
          }}
        >📄 Download PDF Statement</button>
        <button
          style={styles.dlBtn}
          onClick={() => {
            const rows = [['Month','Income','Expenses'],
              ['Jan 2026','28000','12000'],['Feb 2026','42000','18000'],
              ['Mar 2026','35000','14000'],['Apr 2026','67000','22000']];
            const tsv = rows.map(r => r.join('\t')).join('\n');
            const a = document.createElement('a');
            a.href = 'data:text/plain,' + encodeURIComponent(tsv);
            a.download = 'earnings_report.xls';
            a.click();
          }}
        >📊 Download Excel Report</button>
      </div>

    </div>
  );
}