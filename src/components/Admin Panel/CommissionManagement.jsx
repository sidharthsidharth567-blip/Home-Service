import { useState, useMemo } from 'react';
import { 
  TrendingUp, DollarSign, Activity, Percent, 
  Briefcase, Settings, Search, Save, AlertCircle, 
  ShieldCheck, Download, Plus, Filter, ChevronRight,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2
} from 'lucide-react';

const financeTheme = {
  primary: '#e23744',
  secondary: '#10b981',
  blue: '#3392ff',
  textDark: '#111827',
  textGray: '#6b7280',
  border: '#e5e7eb',
  bgLight: '#f8fafc'
};

const DUMMY_LATEST_TXNS = [
  { id: 'BK-9901', provider: 'Akhil R', category: 'Plumbing', amount: '₹1,000', comm: '₹150', status: 'Settled', date: 'Apr 16, 14:20' },
  { id: 'BK-9902', provider: 'Suresh Kumar', category: 'Electrical', amount: '₹500', comm: '₹50', status: 'Pending', date: 'Apr 16, 09:45' },
  { id: 'BK-9903', provider: 'HomeShine', category: 'Cleaning', amount: '₹5,000', comm: '₹550', status: 'Settled', date: 'Apr 15, 18:10' },
  { id: 'BK-9904', provider: 'Elite Elec', category: 'Electrical', amount: '₹800', comm: '₹120', status: 'Refunded', date: 'Apr 15, 11:30' },
];

export default function CommissionManagement() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [defaultRate, setDefaultRate] = useState(15);

  const styles = {
    tabs: { display: 'flex', gap: '32px', marginBottom: '32px', borderBottom: `1px solid ${financeTheme.border}` },
    tab: (active) => ({
      padding: '12px 4px', fontSize: '14px', fontWeight: active ? 700 : 500,
      color: active ? financeTheme.primary : financeTheme.textGray,
      borderBottom: `2px solid ${active ? financeTheme.primary : 'transparent'}`,
      cursor: 'pointer', transition: '0.2s'
    }),
    card: { background: '#fff', borderRadius: '16px', border: `1px solid ${financeTheme.border}`, padding: '24px' },
    summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' },
    
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '16px', background: '#f9fafb', color: financeTheme.textGray, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' },
    td: { padding: '16px', borderBottom: `1px solid ${financeTheme.border}`, fontSize: '14px' },
    
    badge: (status) => ({
      padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
      backgroundColor: status === 'Settled' ? '#ecfdf5' : (status === 'Pending' ? '#fff7ed' : '#fef2f2'),
      color: status === 'Settled' ? '#065f46' : (status === 'Pending' ? '#9a3412' : '#991b1b')
    })
  };

  return (
    <div>
      <div style={styles.tabs}>
        <div style={styles.tab(activeTab === 'dashboard')} onClick={() => setActiveTab('dashboard')}>Overview</div>
        <div style={styles.tab(activeTab === 'transactions')} onClick={() => setActiveTab('transactions')}>Transactions</div>
        <div style={styles.tab(activeTab === 'settings')} onClick={() => setActiveTab('settings')}>Commission Setup</div>
      </div>

      {activeTab === 'dashboard' && (
        <>
          <div style={styles.summaryGrid}>
            {[
              { label: 'Total Volume', value: '₹1,84,500', trend: '+12.5%', icon: TrendingUp, color: '#3b82f6' },
              { label: 'Net Commission', value: '₹28,450', trend: '+8.2%', icon: DollarSign, color: '#10b981' },
              { label: 'Avg. Margin', value: '15.4%', trend: '-0.5%', icon: Activity, color: '#f59e0b' },
              { label: 'Payouts Processed', value: '142', trend: '+24%', icon: Briefcase, color: financeTheme.primary },
            ].map((stat, i) => (
              <div key={i} style={styles.card}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px' }}>
                  <div style={{ padding:'10px', backgroundColor:`${stat.color}15`, borderRadius:'12px', color:stat.color }}><stat.icon size={20} /></div>
                  <span style={{ fontSize:'12px', fontWeight:700, color:stat.trend.startsWith('+') ? '#10b981' : '#ef4444' }}>{stat.trend}</span>
                </div>
                <div style={{ fontSize:'13px', color:financeTheme.textGray }}>{stat.label}</div>
                <div style={{ fontSize:'24px', fontWeight:800, marginTop:4 }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div style={{ ...styles.card, padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: `1px solid ${financeTheme.border}`, display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Recent Payout Ledger</h3>
                <button style={{ background:'none', border:'none', color:financeTheme.primary, fontWeight:700, fontSize:'13px', cursor:'pointer' }}>View All</button>
              </div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Booking ID</th>
                    <th style={styles.th}>Provider</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Our Cut</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_LATEST_TXNS.map(tx => (
                    <tr key={tx.id}>
                      <td style={styles.td}><span style={{ fontWeight: 700 }}>{tx.id}</span></td>
                      <td style={styles.td}>
                        <div style={{ fontWeight: 600 }}>{tx.provider}</div>
                        <div style={{ fontSize: '12px', color: financeTheme.textGray }}>{tx.category}</div>
                      </td>
                      <td style={styles.td}>{tx.amount}</td>
                      <td style={{ ...styles.td, color: financeTheme.secondary, fontWeight: 700 }}>{tx.comm}</td>
                      <td style={styles.td}><span style={styles.badge(tx.status)}>{tx.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.card}>
               <h3 style={{ fontSize:'16px', fontWeight:800, marginBottom:'20px' }}>Global Settings</h3>
               <div style={{ marginBottom:'24px' }}>
                  <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:financeTheme.textGray, marginBottom:8 }}>Flat Platform Fee (%)</label>
                  <div style={{ display:'flex', gap:10 }}>
                    <input 
                      type="number" 
                      value={defaultRate} 
                      onChange={e => setDefaultRate(e.target.value)}
                      style={{ flex:1, padding:'10px', borderRadius:'8px', border:`1px solid ${financeTheme.border}`, outline:'none' }} 
                    />
                    <button style={{ background:financeTheme.primary, color:'#fff', border:'none', padding:'0 16px', borderRadius:'8px', fontWeight:700 }}>Save</button>
                  </div>
               </div>
               <div style={{ background:'#f8fafc', padding:'16px', borderRadius:'12px', border:`1px solid ${financeTheme.border}` }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, color:financeTheme.textDark, fontWeight:700, fontSize:'14px', marginBottom:8 }}>
                    <ShieldCheck size={16} color={financeTheme.secondary} /> Auto-Settlement
                  </div>
                  <p style={{ fontSize:'12px', color:financeTheme.textGray, lineHeight:1.5 }}>Payments are automatically cleared to providers after 48h of job completion.</p>
               </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'transactions' && (
        <div style={styles.card}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'24px' }}>
            <h3 style={{ fontSize:'18px', fontWeight:800 }}>Transaction History</h3>
            <div style={{ display:'flex', gap:12 }}>
              <div style={{ position:'relative' }}>
                <Search size={16} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:financeTheme.textGray }} />
                <input style={{ padding:'8px 12px 8px 36px', borderRadius:'8px', border:`1px solid ${financeTheme.border}`, outline:'none', fontSize:'13px' }} placeholder="Search TXN ID..." />
              </div>
              <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 12px', borderRadius:'8px', border:`1px solid ${financeTheme.border}`, background:'#fff', fontSize:'13px', fontWeight:600 }}><Filter size={14}/> Filters</button>
            </div>
          </div>
          <table style={styles.table}>
            <thead style={styles.th}>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Entity</th>
                <th style={styles.th}>Gross Amt</th>
                <th style={styles.th}>Comm %</th>
                <th style={styles.th}>Platform Net</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_LATEST_TXNS.concat(DUMMY_LATEST_TXNS).map((tx, i) => (
                <tr key={i}>
                  <td style={styles.td}>{tx.date}</td>
                  <td style={styles.td}>{tx.provider}</td>
                  <td style={styles.td}>{tx.amount}</td>
                  <td style={styles.td}>15%</td>
                  <td style={{ ...styles.td, color:financeTheme.secondary, fontWeight:700 }}>{tx.comm}</td>
                  <td style={styles.td}><span style={styles.badge(tx.status)}>{tx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
          <div style={styles.card}>
            <h3 style={{ fontSize:'17px', fontWeight:800, marginBottom:16 }}>Category Margins</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {['Plumbing', 'Electrical', 'Cleaning', 'Repairs'].map(cat => (
                <div key={cat} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px', borderRadius:'10px', background:'#f8fafc' }}>
                  <span style={{ fontWeight:700 }}>{cat}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <input type="number" defaultValue="15" style={{ width:60, padding:6, borderRadius:6, border:`1px solid ${financeTheme.border}`, textAlign:'center' }} />
                    <span style={{ fontSize:12, fontWeight:700, color:financeTheme.textGray }}>%</span>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ width:'100%', marginTop:20, padding:12, borderRadius:10, background:financeTheme.primary, color:'#fff', border:'none', fontWeight:700, cursor:'pointer' }}>Save Changes</button>
          </div>
          
          <div style={styles.card}>
            <h3 style={{ fontSize:'17px', fontWeight:800, marginBottom:16 }}>Platform Policies</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
               <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontWeight:700 }}>Auto-Refund</div>
                    <div style={{ fontSize:12, color:financeTheme.textGray }}>Enable for cancellations within 2h</div>
                  </div>
                  <div style={{ width:36, height:20, background:financeTheme.secondary, borderRadius:20, position:'relative' }}>
                    <div style={{ width:16, height:16, background:'#fff', borderRadius:'50%', position:'absolute', top:2, right:2 }} />
                  </div>
               </div>
               <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontWeight:700 }}>Service Fee</div>
                    <div style={{ fontSize:12, color:financeTheme.textGray }}>Extra ₹50 per order convenience fee</div>
                  </div>
                  <div style={{ width:36, height:20, background:'#e2e8f0', borderRadius:20, position:'relative' }}>
                    <div style={{ width:16, height:16, background:'#fff', borderRadius:'50%', position:'absolute', top:2, left:2 }} />
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
