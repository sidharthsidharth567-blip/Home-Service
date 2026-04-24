import { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Wallet, 
  CreditCard, ArrowUpRight, ArrowDownRight, 
  Calendar, Filter, Download, Info, CheckCircle2,
  PieChart, Activity, ShieldCheck
} from 'lucide-react';

const zomatoTheme = {
  primary: '#e23744',
  success: '#24963f',
  warning: '#f5a623',
  blue: '#3b82f6',
  textDark: '#1c1c1c',
  textGray: '#696969',
  textLight: '#9c9c9c',
  border: '#e8e8e8',
  bgPage: '#f8f8f8',
  white: '#ffffff'
};

const DUMMY_LOGS = [
  { id: 'TXN-99121', type: 'Settlement', entity: 'Razorpay', amount: '₹12,450', date: 'Apr 17, 10:20', status: 'Success' },
  { id: 'TXN-99122', type: 'Payout', entity: 'Akhil R (Provider)', amount: '₹840', date: 'Apr 17, 10:15', status: 'Success' },
  { id: 'TXN-99123', type: 'Platform Fee', entity: 'HomeCare', amount: '₹120', date: 'Apr 17, 10:15', status: 'Pending' },
];

export default function FinancialAnalytics() {
  const [timeRange, setTimeRange] = useState('7D');

  const mainStats = [
    { label: 'Gross Volume', value: '₹1,67,467', trend: '+12.5%', isUp: true },
    { label: 'Net Revenue', value: '₹24,890', trend: '+8.2%', isUp: true },
    { label: 'Avg. Order', value: '₹1,450', trend: '-2.1%', isUp: false },
    { label: 'Settled Funds', value: '₹92,300', trend: '+18.4%', isUp: true },
  ];

  const styles = {
    card: { background: zomatoTheme.white, borderRadius: '24px', border: `1px solid ${zomatoTheme.border}`, boxShadow: '0 8px 30px rgba(0,0,0,0.06)', overflow: 'hidden' },
    statCard: { padding: '24px', flex: 1, textAlign: 'center' },
    btnGhost: { background: '#f8f8f8', color: zomatoTheme.textDark, border: `1px solid ${zomatoTheme.border}`, padding: '10px 20px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', fontSize: 13 },
  };

  return (
    <div style={{ backgroundColor: zomatoTheme.bgPage, minHeight: '100%' }}>
      
      {/* Dashboard Headline */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
         <div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: zomatoTheme.textDark }}>Financial Intelligence</h2>
            <p style={{ color: zomatoTheme.textLight, fontSize: 14 }}>Real-time audit of platform revenue and payout health.</p>
         </div>
         <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', background: '#fff', borderRadius: 12, border: `1px solid ${zomatoTheme.border}`, padding: 4 }}>
               {['24H', '7D', '30D', '1Y'].map(r => (
                 <button 
                  key={r} 
                  onClick={() => setTimeRange(r)}
                  style={{ padding: '8px 16px', border: 'none', background: timeRange===r?zomatoTheme.primary:'none', color: timeRange===r?'#fff':zomatoTheme.textLight, borderRadius: 10, fontWeight: 800, cursor: 'pointer', fontSize: 12, transition: '0.2s' }}
                 >{r}</button>
               ))}
            </div>
            <button style={{ ...styles.btnGhost, background: zomatoTheme.textDark, color: '#fff', border: 'none' }}><Download size={16} style={{marginRight:8}}/> Export CSV</button>
         </div>
      </div>

      {/* Primary Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: zomatoTheme.border, borderRadius: 24, overflow: 'hidden', border: `1px solid ${zomatoTheme.border}`, marginBottom: 32 }}>
         {mainStats.map((s, i) => (
           <div key={i} style={{ background: '#fff', padding: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: zomatoTheme.textLight, fontWeight: 800, marginBottom: 8, textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: zomatoTheme.textDark }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 900, color: s.isUp ? zomatoTheme.success : zomatoTheme.primary, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                 {s.isUp ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {s.trend}
              </div>
           </div>
         ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32 }}>
         {/* Live Ledger */}
         <div style={styles.card}>
            <div style={{ padding: '24px 32px', borderBottom: `1px solid ${zomatoTheme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ fontSize: 18, fontWeight: 900 }}>Production Payout Ledger</h3>
               <div style={{ fontSize: 11, fontWeight: 800, color: zomatoTheme.success, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={14}/> GATEWAY CONNECTED
               </div>
            </div>
            <div style={{ padding: '0 32px 32px' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fcfcfc' }}>
                       <th style={{ textAlign: 'left', padding: '16px', fontSize: 11, color: zomatoTheme.textLight, fontWeight: 900 }}>TXN ID</th>
                       <th style={{ textAlign: 'left', padding: '16px', fontSize: 11, color: zomatoTheme.textLight, fontWeight: 900 }}>BENEFICIARY</th>
                       <th style={{ textAlign: 'left', padding: '16px', fontSize: 11, color: zomatoTheme.textLight, fontWeight: 900 }}>VALUE</th>
                       <th style={{ textAlign: 'right', padding: '16px', fontSize: 11, color: zomatoTheme.textLight, fontWeight: 900 }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DUMMY_LOGS.map(log => (
                      <tr key={log.id} style={{ borderBottom: `1px solid ${zomatoTheme.border}` }}>
                         <td style={{ padding: '20px 16px' }}>
                            <div style={{ fontWeight: 800 }}>{log.id}</div>
                            <div style={{ fontSize: 11, color: zomatoTheme.textLight }}>{log.date}</div>
                         </td>
                         <td style={{ padding: '20px 16px' }}>
                            <div style={{ fontWeight: 700, fontSize: 14 }}>{log.entity}</div>
                            <div style={{ fontSize: 11, color: zomatoTheme.textLight }}>{log.type}</div>
                         </td>
                         <td style={{ padding: '20px 16px', fontWeight: 900 }}>{log.amount}</td>
                         <td style={{ padding: '20px 16px', textAlign: 'right' }}>
                            <span style={{ 
                              padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 900,
                              backgroundColor: log.status==='Success'?'#e7f5ec':'#fff7ed',
                              color: log.status==='Success'?zomatoTheme.success:zomatoTheme.warning
                            }}>{log.status.toUpperCase()}</span>
                         </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Distribution Summary */}
         <div style={styles.card}>
            <div style={{ padding: '24px 32px', borderBottom: `1px solid ${zomatoTheme.border}` }}>
               <h3 style={{ fontSize: 18, fontWeight: 900 }}>Margin Distribution</h3>
            </div>
            <div style={{ padding: 32 }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {[
                    { l: 'Provider Share (85%)', v: '₹1,42,347', c: zomatoTheme.primary },
                    { l: 'Platform Fee (15%)', v: '₹25,120', c: zomatoTheme.textDark },
                    { l: 'TDS/Tax Withheld', v: '₹8,450', c: zomatoTheme.warning },
                  ].map((m, i) => (
                    <div key={i}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: zomatoTheme.textGray }}>{m.l}</span>
                          <span style={{ fontSize: 14, fontWeight: 900 }}>{m.v}</span>
                       </div>
                       <div style={{ height: 8, background: '#f1f5f9', borderRadius: 99 }}>
                          <div style={{ width: i===0?'85%':i===1?'15%':'5%', height: '100%', background: m.c, borderRadius: 99 }} />
                       </div>
                    </div>
                  ))}
               </div>
               
               <div style={{ marginTop: 40, padding: 20, background: '#f8fafc', borderRadius: 16, border: `1px dashed ${zomatoTheme.border}` }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: zomatoTheme.textLight, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><Activity size={14}/> SYSTEM LATENCY</div>
                  <div style={{ fontSize: 20, fontWeight: 900 }}>142ms</div>
                  <p style={{ fontSize: 11, color: zomatoTheme.textLight, marginTop: 4 }}>Gateways are responding within optimal SLAs.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
