import { useState } from 'react';
import { 
  RefreshCcw, Search, Filter, 
  CheckCircle2, XCircle, Clock, 
  ArrowDownLeft, AlertTriangle, 
  User, CreditCard, ChevronRight,
  ShieldCheck, Info, FileText, Download, X,
  ShieldAlert, History, ArrowRight
} from 'lucide-react';

const zomatoTheme = {
  primary: '#e23744',
  primaryHover: '#cb202d',
  bgPage: '#f8f8f8',
  white: '#ffffff',
  textDark: '#1c1c1c',
  textGray: '#696969',
  textLight: '#9c9c9c',
  border: '#e8e8e8',
  success: '#24963f',
  warning: '#f5a623',
  error: '#ef4444'
};

const INITIAL_REFUNDS = [
  { id: 'REF-9901', bookingId: 'BK-1055', customer: 'Aisha Rahman', email: 'aisha.r@test.com', amount: '₹350', date: '16 Apr', reason: 'Overcharged by Provider', status: 'Requested', method: 'UPI' },
  { id: 'REF-9902', bookingId: 'BK-2092', customer: 'Rohan Menon', email: 'rohan.m@mail.com', amount: '₹1,200', date: '17 Apr', reason: 'Service Not Provided', status: 'Processing', method: 'Credit Card' },
  { id: 'REF-9903', bookingId: 'BK-3391', customer: 'Albert Flores', email: 'albert.f@work.in', amount: '₹4,200', date: '15 Apr', reason: 'Duplicate Payment', status: 'Success', method: 'Net Banking' },
  { id: 'REF-9904', bookingId: 'BK-5012', customer: 'Suresh Kumar', email: 'suresh.k@gmail.com', amount: '₹750', date: '14 Apr', reason: 'Cancellation Policy', status: 'Failed', method: 'Wallet' },
  { id: 'REF-9905', bookingId: 'BK-6011', customer: 'Neha Joseph', email: 'neha.j@outlook.com', amount: '₹2,100', date: '16 Apr', reason: 'Damaged Property', status: 'Requested', method: 'UPI' },
];

export default function RefundSystem() {
  const [refunds, setRefunds] = useState(INITIAL_REFUNDS);
  const [search, setSearch] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRef, setSelectedRef] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = (id, newStatus) => {
    setIsProcessing(true);
    setTimeout(() => {
      setRefunds(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      setIsProcessing(false);
    }, 1000);
  };

  const handleBulkApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setRefunds(prev => prev.map(r => r.status === 'Requested' ? { ...r, status: 'Success' } : r));
      setIsProcessing(false);
    }, 1000);
  };

  const filtered = refunds.filter(r => r.id.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase()));

  const styles = {
    card: { background: zomatoTheme.white, borderRadius: '16px', boxShadow: '0 8px 24px rgba(28, 28, 28, 0.08)', overflow: 'hidden', border: `1px solid ${zomatoTheme.border}` },
    statBox: { padding: '24px', backgroundColor: '#fff', borderRight: `1px solid ${zomatoTheme.border}`, flex: 1 },
    btnPrimary: { background: zomatoTheme.primary, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: '0.2s' },
    btnGhost: { background: '#f8f8f8', color: zomatoTheme.textDark, border: `1px solid ${zomatoTheme.border}`, padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' },
    badge: (status) => ({
      padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase',
      backgroundColor: status === 'Success' ? '#e7f5ec' : (status === 'Failed' ? '#fef0f1' : '#fff9e6'),
      color: status === 'Success' ? zomatoTheme.success : (status === 'Failed' ? zomatoTheme.primary : zomatoTheme.warning)
    })
  };

  return (
    <div style={{ backgroundColor: zomatoTheme.bgPage, minHeight: '100%' }}>
      {/* Processing Loader */}
      {isProcessing && (
        <div style={{ position:'fixed', inset:0, background:'rgba(255,255,255,0.8)', backdropFilter:'blur(4px)', display:'grid', placeItems:'center', zIndex:2000 }}>
          <div style={{ width:48, height:48, border:`4px solid ${zomatoTheme.primary}20`, borderTop:`4px solid ${zomatoTheme.primary}`, borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
        </div>
      )}

      {/* Hero Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', background: zomatoTheme.border, borderRadius: '20px', overflow: 'hidden', marginBottom: '32px', border: `1px solid ${zomatoTheme.border}` }}>
        <div style={styles.statBox}>
          <div style={{ fontSize: '12px', color: zomatoTheme.textLight, fontWeight: 700, marginBottom: '4px' }}>PENDING REVIEW</div>
          <div style={{ fontSize: '24px', fontWeight: 900 }}>{refunds.filter(r => r.status==='Requested').length} Requests</div>
        </div>
        <div style={styles.statBox}>
          <div style={{ fontSize: '12px', color: zomatoTheme.textLight, fontWeight: 700, marginBottom: '4px' }}>TOTAL REVERSED</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: zomatoTheme.success }}>₹1,42,800</div>
        </div>
        <div style={styles.statBox}>
          <div style={{ fontSize: '12px', color: zomatoTheme.textLight, fontWeight: 700, marginBottom: '4px' }}>SYSTEM HEALTH</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: zomatoTheme.primary }}>99.1%</div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={{ padding: '24px', borderBottom: `1px solid ${zomatoTheme.border}`, display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: zomatoTheme.textDark }}>Reversal Ledger</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
             <button onClick={handleBulkApprove} style={styles.btnPrimary}>Bulk Approve</button>
          </div>
        </div>

        <div style={{ padding: '24px', overflowX: 'auto' }}>
          <div style={{ position: 'relative', marginBottom: '24px', minWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: zomatoTheme.textLight }} />
            <input 
              style={{ width: '100%', padding: '14px 16px 14px 48px', borderRadius: '12px', border: `1px solid ${zomatoTheme.border}`, outline: 'none', background: '#fcfcfc', fontSize: '15px' }} 
              placeholder="Search by ID, Name or Booking reference..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
             <thead style={{ background: '#fcfcfc' }}>
               <tr>
                 <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', color: zomatoTheme.textLight }}>ORDER DETAILS</th>
                 <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', color: zomatoTheme.textLight }}>CUSTOMER</th>
                 <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', color: zomatoTheme.textLight }}>AMOUNT</th>
                 <th style={{ textAlign: 'left', padding: '16px', fontSize: '13px', color: zomatoTheme.textLight }}>STATUS</th>
                 <th style={{ textAlign: 'right', padding: '16px', fontSize: '13px', color: zomatoTheme.textLight }}>OPERATIONS</th>
               </tr>
             </thead>
             <tbody>
               {filtered.map(ref => (
                 <tr key={ref.id} style={{ borderBottom: `1px solid ${zomatoTheme.border}` }}>
                    <td style={{ padding: '20px 16px' }}>
                       <div style={{ fontWeight: 800 }}>{ref.id}</div>
                       <div style={{ fontSize: '12px', color: zomatoTheme.textLight }}>Booking: {ref.bookingId}</div>
                    </td>
                    <td style={{ padding: '20px 16px' }}>
                       <div style={{ fontWeight: 700 }}>{ref.customer}</div>
                       <div style={{ fontSize: '12px', color: zomatoTheme.textLight }}>{ref.reason}</div>
                    </td>
                    <td style={{ padding: '20px 16px' }}>
                       <div style={{ fontWeight: 900 }}>{ref.amount}</div>
                       <div style={{ fontSize: '12px', color: zomatoTheme.textLight }}>{ref.method}</div>
                    </td>
                    <td style={{ padding: '20px 16px' }}>
                       <span style={styles.badge(ref.status)}>{ref.status}</span>
                    </td>
                    <td style={{ padding: '20px 16px', textAlign: 'right' }}>
                       {ref.status === 'Requested' ? (
                         <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => handleAction(ref.id, 'Success')} style={{ ...styles.btnPrimary, padding: '8px 16px', fontSize: '13px', background: zomatoTheme.success }}>Release</button>
                            <button onClick={() => handleAction(ref.id, 'Failed')} style={{ ...styles.btnGhost, padding: '8px 16px', fontSize: '13px', border: `1px solid ${zomatoTheme.primary}`, color: zomatoTheme.primary }}>Reject</button>
                         </div>
                       ) : (
                         <button onClick={() => { setSelectedRef(ref); setActiveModal('receipt'); }} style={{ ...styles.btnGhost, padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}><FileText size={14}/> View Receipt</button>
                       )}
                    </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>

      {/* Zomato Style Receipt Modal */}
      {activeModal === 'receipt' && selectedRef && (
        <div style={{ position:'fixed', inset:0, background:'rgba(28, 28, 28, 0.4)', backdropFilter:'blur(10px)', display:'grid', placeItems:'center', zIndex:1000 }}>
          <div style={{ background: '#fff', width: '90%', maxWidth: '440px', borderRadius: '24px', overflow: 'hidden' }}>
             <div style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: zomatoTheme.success }}>
                  <CheckCircle2 size={32} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: 8 }}>Reversal Successful</h2>
                <p style={{ color: zomatoTheme.textLight, fontSize: '14px' }}>Refund for Order {selectedRef.bookingId} has been credited.</p>
             </div>
             <div style={{ padding: '0 32px 32px' }}>
                <div style={{ background: '#f8f8f8', borderRadius: '20px', padding: '24px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontSize: '13px', color: zomatoTheme.textLight }}>Reference ID</span>
                      <span style={{ fontSize: '13px', fontWeight: 800 }}>{selectedRef.id}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontSize: '13px', color: zomatoTheme.textLight }}>Recipient</span>
                      <span style={{ fontSize: '13px', fontWeight: 800 }}>{selectedRef.customer}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px dashed ${zomatoTheme.border}`, paddingTop: 16 }}>
                      <span style={{ fontSize: '16px', fontWeight: 900 }}>Amount Refunded</span>
                      <span style={{ fontSize: '18px', fontWeight: 900, color: zomatoTheme.primary }}>{selectedRef.amount}</span>
                   </div>
                </div>
                <button onClick={() => setActiveModal(null)} style={{ ...styles.btnPrimary, width: '100%', marginTop: 24, fontSize: '16px' }}>Got it</button>
             </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }`}</style>
    </div>
  );
}
