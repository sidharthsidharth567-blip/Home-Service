import { useState } from 'react';
import { 
  Search, ShieldAlert, AlertTriangle, CheckCircle, 
  XCircle, FileText, User, Briefcase, ImageIcon, 
  MessageSquare, DollarSign, Gavel, RefreshCcw, Ban,
  ChevronRight, AlertCircle, Clock, ShieldCheck
} from 'lucide-react';

const disputeTheme = {
  primary: '#e23744',
  warning: '#f59e0b',
  error: '#ef4444',
  success: '#10b981',
  textDark: '#111827',
  textGray: '#6b7280',
  border: '#e5e7eb',
  bgLight: '#f8fafc'
};

const INITIAL_DISPUTES = [
  {
    id: 'TKT-8012',
    bookingId: 'BK-1055',
    date: '16 Apr 2024 10:20 AM',
    customerName: 'Aisha Rahman',
    providerName: 'FraudTech Repair',
    issueType: 'Payment Issue',
    severity: 'High',
    amountDisputed: '₹350',
    description: 'The technician forced me to pay an extra ₹350 claiming sudden gas charges. He refused to generate a valid system bill.',
    customerEvidence: 'https://images.unsplash.com/photo-1621259182978-fbf93132e53d?auto=format&fit=crop&w=400&q=80',
    providerDefense: 'The AC required a complete nitrogen flush before the gas could be added. The customer agreed on-site.',
    status: 'under review'
  },
  {
    id: 'TKT-8013',
    bookingId: 'BK-1058',
    date: '15 Apr 2024 14:15 PM',
    customerName: 'Rohan Menon',
    providerName: 'SmartFix Plumbing',
    issueType: 'Poor Quality',
    severity: 'Medium',
    amountDisputed: '₹1,200',
    description: 'The pipe is still leaking worse than before. I want a complete refund.',
    customerEvidence: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80',
    providerDefense: 'The main valve is actually broken deeper in the wall. I temporarily sealed the outer pipe.',
    status: 'pending'
  }
];

export default function DisputeResolution() {
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [selectedId, setSelectedId] = useState(INITIAL_DISPUTES[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolutionAction, setResolutionAction] = useState('refund');
  const [note, setNote] = useState('');

  const activeDisputes = disputes.filter(d => 
    d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.providerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = disputes.find(d => d.id === selectedId);

  const handleResolve = () => {
    setDisputes(disputes.filter(d => d.id !== selectedId));
    setIsModalOpen(false);
    setSelectedId(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '32px', minHeight: 'calc(100vh - 180px)' }}>
      {/* List Sidebar */}
      <div style={{ background: '#fff', borderRadius: '16px', border: `1px solid ${disputeTheme.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: `1px solid ${disputeTheme.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Tickets</h3>
            <span style={{ fontSize: '12px', background: '#fef3c7', color: '#92400e', padding: '2px 10px', borderRadius: '20px', fontWeight: 700 }}>{activeDisputes.length} Active</span>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: disputeTheme.textGray }} />
            <input 
               style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '8px', border: `1px solid ${disputeTheme.border}`, fontSize: '13px', outline: 'none' }}
               placeholder="Search tickets..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {activeDisputes.map(d => {
            const isActive = selectedId === d.id;
            return (
              <div 
                key={d.id} 
                onClick={() => setSelectedId(d.id)}
                style={{
                  padding: '16px', borderRadius: '12px', cursor: 'pointer', marginBottom: '8px',
                   border: `1px solid ${isActive ? disputeTheme.primary : 'transparent'}`,
                   backgroundColor: isActive ? '#fff1f2' : 'transparent',
                   transition: '0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                   <span style={{ fontWeight: 700, fontSize: '14px' }}>{d.issueType}</span>
                   <span style={{ fontSize: '11px', color: d.severity === 'High' ? disputeTheme.error : disputeTheme.warning, fontWeight: 800 }}>{d.severity.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: '12px', color: disputeTheme.textGray }}>Ticket: {d.id} • {d.date.split(' ')[0]}</div>
                <div style={{ marginTop: 8, fontSize: '11px', display: 'flex', gap: 6 }}>
                  <span style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>C: {d.customerName}</span>
                  <span style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>P: {d.providerName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail View */}
      <div style={{ background: '#fff', borderRadius: '16px', border: `1px solid ${disputeTheme.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {selected ? (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                 <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{selected.issueType}</h2>
                       <span style={{ background: '#fff7ed', color: '#c2410c', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 800 }}>{selected.status.toUpperCase()}</span>
                    </div>
                    <p style={{ color: disputeTheme.textGray, marginTop: 4 }}>Reference Booking: <span style={{ fontWeight: 700, color: disputeTheme.textDark }}>{selected.bookingId}</span></p>
                 </div>
                 <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '12px 20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: disputeTheme.primary, textTransform: 'uppercase' }}>Amount in Dispute</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: disputeTheme.primary }}>{selected.amountDisputed}</div>
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '32px' }}>
                {/* Customer Section */}
                <div>
                   <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, marginBottom: '16px' }}>
                     <User size={18} color="#3b82f6" /> Customer: {selected.customerName}
                   </h4>
                   <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: `1px solid ${disputeTheme.border}`, minHeight: '120px' }}>
                     <div style={{ fontSize: '14px', lineHeight: 1.6, color: disputeTheme.textDark }}>"{selected.description}"</div>
                     <div style={{ marginTop: 20 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: disputeTheme.textGray, marginBottom: 8 }}>EVIDENCE ATTACHED</div>
                        <img src={selected.customerEvidence} style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} alt="Ev" />
                     </div>
                   </div>
                </div>

                {/* Provider Section */}
                <div>
                   <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, marginBottom: '16px' }}>
                     <Briefcase size={18} color="#8b5cf6" /> Provider: {selected.providerName}
                   </h4>
                   <div style={{ background: '#fcf8ff', padding: '20px', borderRadius: '12px', border: '#e9d5ff 1px solid', minHeight: '120px' }}>
                     <div style={{ fontSize: '14px', lineHeight: 1.6, color: disputeTheme.textDark }}>"{selected.providerDefense}"</div>
                     <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, color: disputeTheme.textGray, fontSize: 12 }}>
                        <AlertCircle size={14} /> No media files uploaded by provider.
                     </div>
                   </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: `1px solid ${disputeTheme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: disputeTheme.textGray }}>
                 <Gavel size={16} color={disputeTheme.primary} /> Awaiting Final Verdict
               </div>
               <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => { setResolutionAction('penalty'); setIsModalOpen(true); }}
                    style={{ padding: '12px 20px', borderRadius: '10px', background: '#fef2f2', color: '#ef4444', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                  >Penalty / Ban</button>
                  <button 
                     onClick={() => { setResolutionAction('refund'); setIsModalOpen(true); }}
                     style={{ padding: '12px 20px', borderRadius: '10px', background: disputeTheme.success, color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                  >Issue Refund</button>
                  <button 
                     onClick={() => { setResolutionAction('reject'); setIsModalOpen(true); }}
                     style={{ padding: '12px 20px', borderRadius: '10px', background: disputeTheme.textDark, color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                  >Reject Dispute</button>
               </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: disputeTheme.textGray }}>
            <ShieldAlert size={48} strokeWidth={1} />
            <p style={{ marginTop: '16px', fontWeight: 600 }}>Select a dispute ticket for review</p>
          </div>
        )}
      </div>

       {/* Resolution Modal */}
       {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', width: '420px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', textTransform: 'capitalize' }}>{resolutionAction} Verdict</h3>
            <p style={{ fontSize: '13px', color: disputeTheme.textGray, marginBottom: '16px' }}>Provide the final justification for this decision. This will be sent as an official app notice.</p>
            <textarea 
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${disputeTheme.border}`, height: '100px', outline: 'none', fontSize: '14px' }}
              placeholder="Case closed due to..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: '#f1f5f9', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              <button 
                 onClick={handleResolve} 
                 style={{ flex: 1, padding: '12px', borderRadius: '10px', background: disputeTheme.primary, color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
              >Confirm Verdict</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
