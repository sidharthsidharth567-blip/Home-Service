import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  FileText, 
  CheckCircle2, 
  ChevronLeft, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Info,
  Layers,
  Wrench,
  Receipt,
  Timer
} from 'lucide-react';

const JobDocumentation = ({ 
  onClose, 
  jobId = 'BH-4592', 
  service = 'Kitchen Sink Repair',
  technician = 'Sujith Kumar'
}) => {
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'bills' | 'summary'
  const [compareMode, setCompareMode] = useState('side'); // 'side' | 'toggle'
  const [toggleState, setToggleState] = useState('after'); // 'before' | 'after'

  const materials = [
    { id: 1, name: 'PVC Drainage Pipe (2m)', qty: 1, price: 450.00, verified: true },
    { id: 2, name: 'Industrial Grade Sealant', qty: 2, price: 180.00, verified: true },
    { id: 3, name: 'L-Joint Connector (Steel)', qty: 1, price: 120.00, verified: true },
    { id: 4, name: 'Visit & Labor Charge', qty: 1, price: 350.00, verified: true },
  ];

  const beforeImg = "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80";
  const afterImg = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80";

  const styles = {
    overlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(8px)',
      padding: '20px'
    },
    modal: {
      background: '#fff', width: '100%', maxWidth: '900px', maxHeight: '90vh',
      borderRadius: '28px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative'
    },
    header: {
      padding: '24px 32px', borderBottom: '1px solid #f1f5f9',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    },
    tabs: {
      display: 'flex', gap: '32px', padding: '0 32px',
      borderBottom: '1px solid #f1f5f9', background: '#f8fafc'
    },
    tab: (active) => ({
      padding: '16px 0', fontSize: '14px', fontWeight: 700,
      color: active ? '#e23744' : '#64748b', cursor: 'pointer',
      borderBottom: `2.5px solid ${active ? '#e23744' : 'transparent'}`,
      transition: 'all 0.2s'
    }),
    content: {
      padding: '32px', overflowY: 'auto', flex: 1
    },
    comparisonGrid: {
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px',
      marginBottom: '32px'
    },
    imgLabel: (type) => ({
      position: 'absolute', top: '16px', left: '16px',
      background: type === 'before' ? '#1e293b' : '#059669',
      color: '#fff', padding: '4px 12px', borderRadius: '8px',
      fontSize: '11px', fontWeight: 800, textTransform: 'uppercase',
      letterSpacing: '0.5px', zIndex: 5
    }),
    imgContainer: {
      position: 'relative', borderRadius: '16px', overflow: 'hidden',
      height: '340px', background: '#f1f5f9'
    },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    billBox: {
      background: '#f8fafc', padding: '24px', borderRadius: '20px',
      border: '1px solid #e2e8f0'
    },
    billRow: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 0', borderBottom: '1px solid #e2e8f0'
    },
    badge: {
      display: 'flex', alignItems: 'center', gap: '6px',
      background: '#ecfdf5', color: '#059669', padding: '6px 12px',
      borderRadius: '99px', fontSize: '11px', fontWeight: 700
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '13px', marginBottom: '4px' }}>
              <ChevronLeft size={16} style={{ cursor: 'pointer' }} onClick={onClose} />
              <span>Job Documentation • {jobId}</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: 0 }}>{service}</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Assigned To</div>
            <div style={{ fontWeight: 700, color: '#1e293b' }}>{technician}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <div style={styles.tab(activeTab === 'gallery')} onClick={() => setActiveTab('gallery')}>Gallery & Proof</div>
          <div style={styles.tab(activeTab === 'bills')} onClick={() => setActiveTab('bills')}>Material Audit</div>
          <div style={styles.tab(activeTab === 'summary')} onClick={() => setActiveTab('summary')}>Work Summary</div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          
          {activeTab === 'gallery' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Before & After Comparison</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                   <div style={styles.badge}>
                     <ShieldCheck size={14} /> AI Verified Match
                   </div>
                </div>
              </div>

              <div style={styles.comparisonGrid}>
                <div style={styles.imgContainer}>
                  <div style={styles.imgLabel('before')}>Before</div>
                  <img src={beforeImg} alt="Before" style={styles.img} />
                </div>
                <div style={styles.imgContainer}>
                  <div style={styles.imgLabel('after')}>After</div>
                  <img src={afterImg} alt="After" style={styles.img} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <div style={{ flex: 1, padding: '20px', background: '#f0fdf4', borderRadius: '16px', display: 'flex', gap: '16px' }}>
                  <CheckCircle2 color="#059669" size={24} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#065f46' }}>Quality Assurance Passed</div>
                    <div style={{ fontSize: '12px', color: '#047857', opacity: 0.8 }}>Technician verified the fix with pressure test. No leaks found.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bills' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Material & Parts Audit</h3>
                <button style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', 
                  padding: '8px 16px', borderRadius: '12px', background: '#1e293b',
                  color: '#fff', border: 'none', fontWeight: 600, fontSize: '13px', cursor: 'pointer'
                }}>
                  <Download size={14} /> Download Invoice
                </button>
              </div>

              <div style={styles.billBox}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>
                  Itemized Materials
                </div>
                {materials.map(m => (
                  <div key={m.id} style={styles.billRow}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e23744' }} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{m.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Qty: {m.qty}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                       {m.verified && <CheckCircle2 size={16} color="#059669" />}
                       <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>₹{m.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
                <div style={{ ...styles.billRow, borderBottom: 'none', marginTop: '16px', paddingTop: '20px' }}>
                   <div style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>Total Approved Amount</div>
                   <div style={{ fontSize: '20px', fontWeight: 900, color: '#e23744' }}>₹1,100.00</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
             <div style={{ maxWidth: '600px' }}>
               <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Technician Summary</h3>
               <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                 "Upon arrival, I inspected the kitchen sink drainage. Found a significant crack in the main PVC pipe leading to the grease trap. The pipe was replaced with a heavy-duty variant and resealed using industrial sealant. Tested the flow for 10 minutes; zero leakage observed."
               </p>
               
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                 <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                     <Timer size={16} color="#e23744" />
                     <span style={{ fontSize: '13px', fontWeight: 700 }}>Time Spent</span>
                   </div>
                   <div style={{ fontSize: '18px', fontWeight: 800 }}>1h 24m</div>
                 </div>
                 <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                     <ShieldCheck size={16} color="#059669" />
                     <span style={{ fontSize: '13px', fontWeight: 700 }}>Warranty</span>
                   </div>
                   <div style={{ fontSize: '18px', fontWeight: 800 }}>6 Months</div>
                 </div>
               </div>
             </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ padding: '20px 32px', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
           <button 
             onClick={onClose}
             style={{ 
               padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0',
               background: '#fff', color: '#64748b', fontWeight: 700, cursor: 'pointer'
             }}
           >
             Close
           </button>
           <button style={{ 
             padding: '12px 32px', borderRadius: '12px', border: 'none',
             background: '#e23744', color: '#fff', fontWeight: 700, cursor: 'pointer',
             display: 'flex', alignItems: 'center', gap: '10px'
           }}>
             Report Issue <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default JobDocumentation;
