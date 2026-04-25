import { useState } from 'react';
import { 
  ArrowLeft, CheckCircle, XCircle, Search, 
  ShieldCheck, UserCheck, FileText, ImageIcon, 
  MapPin, Phone, Award, ShieldAlert,
  ChevronRight, ExternalLink, AlertCircle
} from 'lucide-react';

const vSystemTheme = {
  primary: '#e23744',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  textDark: '#111827',
  textGray: '#6b7280',
  border: '#e5e7eb',
  bgLight: '#f8fafc'
};

const INITIAL_PENDING = [
  {
    id: 'PRV-3051',
    name: 'Manu R',
    phone: '+91 98765 43210',
    address: 'Kacheripady, Ernakulam, Kerala 682018',
    category: 'Plumbing',
    experience: '5 Years',
    profilePhoto: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80',
    appliedOn: '16 Apr 2024',
    backgroundChecks: { phoneVerified: true, addressValidated: false },
    documents: {
      kyc: [
        { type: 'Aadhaar Card (Front)', num: 'XXXX XXXX 1234', docUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=400&q=80' },
        { type: 'PAN Card', num: 'ABCDE1234F', docUrl: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&w=400&q=80' }
      ],
      work: [
        { type: 'Trade License', num: 'TRD-987654', docUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80' }
      ]
    },
    status: 'pending'
  },
  {
    id: 'PRV-3052',
    name: 'Suresh Kumar',
    phone: '+91 85470 11223',
    address: 'Vennala, Kochi, Kerala 682028',
    category: 'Electrical',
    experience: '8 Years',
    profilePhoto: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=400&q=80',
    appliedOn: '15 Apr 2024',
    backgroundChecks: { phoneVerified: true, addressValidated: true },
    documents: {
      kyc: [
        { type: 'Aadhaar Card (Front)', num: 'XXXX XXXX 5566', docUrl: 'https://images.unsplash.com/photo-1627885376378-011d61efeb8a?auto=format&fit=crop&w=400&q=80' }
      ],
      work: [
        { type: 'Diploma in Electricals', num: 'CERT-5091', docUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80' }
      ]
    },
    status: 'pending'
  }
];

export default function VerificationSystem({ onBack }) {
  const [providers, setProviders] = useState(INITIAL_PENDING);
  const [selectedId, setSelectedId] = useState(INITIAL_PENDING[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const pendingProviders = providers.filter(
    (p) => p.status === 'pending' && p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProvider = providers.find((p) => p.id === selectedId);

  const handleApprove = () => {
    if (!selectedId) return;
    setProviders(providers.map(p => p.id === selectedId ? { ...p, status: 'approved' } : p));
    moveToNext();
  };

  const handleConfirmReject = () => {
    if (!selectedId || !rejectReason.trim()) return;
    setProviders(providers.map(p => p.id === selectedId ? { ...p, status: 'rejected', rejectReason } : p));
    setIsRejectModalOpen(false);
    moveToNext();
  };

  const moveToNext = () => {
    const remaining = pendingProviders.filter(p => p.id !== selectedId);
    setSelectedId(remaining.length > 0 ? remaining[0].id : null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '32px', minHeight: 'calc(100vh - 180px)' }}>
      {/* Queue Sidebar */}
      <div style={{ background: '#fff', borderRadius: '16px', border: `1px solid ${vSystemTheme.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: `1px solid ${vSystemTheme.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Queue</h3>
            <span style={{ fontSize: '12px', background: `${vSystemTheme.primary}15`, color: vSystemTheme.primary, padding: '2px 10px', borderRadius: '20px', fontWeight: 700 }}>{pendingProviders.length} Pending</span>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: vSystemTheme.textGray }} />
            <input 
              style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '8px', border: `1px solid ${vSystemTheme.border}`, fontSize: '13px', outline: 'none' }}
              placeholder="Search provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {pendingProviders.map(p => {
            const isActive = selectedId === p.id;
            return (
              <div 
                key={p.id} 
                onClick={() => setSelectedId(p.id)}
                style={{
                  padding: '16px', borderRadius: '12px', cursor: 'pointer', marginBottom: '8px',
                   border: `1px solid ${isActive ? vSystemTheme.primary : 'transparent'}`,
                   backgroundColor: isActive ? '#fff1f2' : 'transparent',
                   transition: '0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: vSystemTheme.textDark }}>{p.name}</span>
                  <span style={{ fontSize: '11px', color: vSystemTheme.textGray }}>{p.appliedOn}</span>
                </div>
                <div style={{ fontSize: '12px', color: vSystemTheme.textGray }}>{p.category} • {p.experience} Exp.</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification View */}
      <div style={{ background: '#fff', borderRadius: '16px', border: `1px solid ${vSystemTheme.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {selectedProvider ? (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
              <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', alignItems: 'flex-start' }}>
                <img src={selectedProvider.profilePhoto} style={{ width: 80, height: 80, borderRadius: '16px', objectFit: 'cover' }} alt="Provider" />
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{selectedProvider.name}</h2>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: vSystemTheme.textGray }}><Phone size={14} /> {selectedProvider.phone}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: vSystemTheme.textGray }}><MapPin size={14} /> {selectedProvider.address}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '24px', marginBottom: '32px' }}>
                <div style={{ padding: '20px', borderRadius: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <h4 style={{ color: '#166534', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>Automated Checks</h4>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                     <div style={{ fontSize: '13px', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><CheckCircle size={16} /> Phone Verified</div>
                     <div style={{ fontSize: '13px', color: selectedProvider.backgroundChecks.addressValidated ? '#166534' : '#ef4444', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                        {selectedProvider.backgroundChecks.addressValidated ? <CheckCircle size={16} /> : <AlertCircle size={16} />} 
                        Address Check
                     </div>
                  </div>
                </div>
                <div style={{ padding: '20px', borderRadius: '12px', background: '#f8fafc', border: `1px solid ${vSystemTheme.border}` }}>
                  <h4 style={{ color: vSystemTheme.textGray, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>Document Summary</h4>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>{selectedProvider.documents.kyc.length + selectedProvider.documents.work.length} Files Uploaded</div>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={20} color={vSystemTheme.primary} /> Identity Documents</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {selectedProvider.documents.kyc.map((d, i) => (
                    <div key={i} style={{ borderRadius: '12px', border: `1px solid ${vSystemTheme.border}`, overflow: 'hidden' }}>
                      <div style={{ padding: '12px', fontSize: '13px', fontWeight: 700, backgroundColor: '#fafafa', borderBottom: `1px solid ${vSystemTheme.border}` }}>{d.type}</div>
                      <div style={{ height: '160px', backgroundColor: '#f3f4f6', position: 'relative' }}>
                        <img src={d.docUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Doc" />
                        <div style={{ position: 'absolute', bottom: 10, right: 10, background: '#fff', padding: '6px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}><ExternalLink size={14} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={20} color={vSystemTheme.primary} /> Proof of Work</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {selectedProvider.documents.work.map((d, i) => (
                    <div key={i} style={{ borderRadius: '12px', border: `1px solid ${vSystemTheme.border}`, overflow: 'hidden' }}>
                      <div style={{ padding: '12px', fontSize: '13px', fontWeight: 700, backgroundColor: '#fafafa', borderBottom: `1px solid ${vSystemTheme.border}` }}>{d.type}</div>
                      <div style={{ height: '160px', backgroundColor: '#f3f4f6' }}>
                        <img src={d.docUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Doc" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '24px 32px', borderTop: `1px solid ${vSystemTheme.border}`, display: 'flex', justifyContent: 'flex-end', gap: '16px', flexWrap: 'wrap', background: '#fff' }}>
              <button 
                onClick={() => setIsRejectModalOpen(true)}
                style={{ padding: '12px 24px', borderRadius: '10px', background: '#fef2f2', color: '#ef4444', border: 'none', fontWeight: 700, cursor: 'pointer' }}
              >Reject Application</button>
              <button 
                onClick={handleApprove}
                style={{ padding: '12px 24px', borderRadius: '10px', background: vSystemTheme.primary, color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
              >Approve & Verify</button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: vSystemTheme.textGray }}>
            <UserCheck size={48} strokeWidth={1} />
            <p style={{ marginTop: '16px', fontWeight: 600 }}>No pending verifications selected</p>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {isRejectModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', width: '400px', borderRadius: '16px', padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Rejection Reason</h3>
            <p style={{ fontSize: '13px', color: vSystemTheme.textGray, marginBottom: '16px' }}>Let the provider know why their application was rejected.</p>
            <textarea 
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${vSystemTheme.border}`, height: '100px', outline: 'none', fontSize: '14px' }}
              placeholder="e.g. Identity documents are blurry..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setIsRejectModalOpen(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: '#f1f5f9', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleConfirmReject} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: '#ef4444', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
