import { useState } from 'react';
import {
  ShieldCheck, Lock, Unlock, Search,
  ArrowUpRight, Clock, AlertTriangle,
  CheckCircle2, Filter, MoreVertical,
  ChevronRight, CircleDollarSign, Info, X,
  Shield, CreditCard, ExternalLink
} from 'lucide-react';

const zomatoTheme = {
  primary: '#e23744',
  success: '#24963f',
  warning: '#f5a623',
  error: '#ef4444',
  textDark: '#1c1c1c',
  textGray: '#696969',
  textLight: '#9c9c9c',
  border: '#e8e8e8',
  bgPage: '#f8f8f8',
  white: '#ffffff'
};

const INITIAL_ESCROWS = [
  { id: 'ESC-88401', ref: 'BK-1055', customer: 'Aisha Rahman', provider: 'FraudTech Repair', amount: '₹8,900', heldSince: '16 Apr', condition: 'Job Completion', status: 'Held', safety: 94 },
  { id: 'ESC-88402', ref: 'BK-2092', customer: 'Rohan Menon', provider: 'SmartFix Plumbing', amount: '₹1,200', heldSince: '17 Apr', condition: 'OTP Verification', status: 'Releasing', safety: 98 },
  { id: 'ESC-88403', ref: 'BK-3391', customer: 'Neha Joseph', provider: 'CleanNest Services', amount: '₹4,200', heldSince: '15 Apr', condition: 'Manual Approval', status: 'Disputed', safety: 42 },
  { id: 'ESC-88404', ref: 'BK-5012', customer: 'Suresh Kumar', provider: 'BrightSpark Elec', amount: '₹750', heldSince: '14 Apr', condition: 'Job Completion', status: 'Paid Out', safety: 100 },
];

export default function EscrowSystem() {
  const [escrows, setEscrows] = useState(INITIAL_ESCROWS);
  const [search, setSearch] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'policy' | 'wallet' | 'details'
  const [selectedEscrow, setSelectedEscrow] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleRelease = (id) => {
    setIsSyncing(true);
    setTimeout(() => {
      setEscrows(prev => prev.map(e => e.id === id ? { ...e, status: 'Paid Out' } : e));
      setIsSyncing(false);
    }, 1200);
  };

  const filtered = escrows.filter(e => e.id.toLowerCase().includes(search.toLowerCase()) || e.customer.toLowerCase().includes(search.toLowerCase()));

  const styles = {
    card: { background: zomatoTheme.white, borderRadius: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', overflow: 'hidden', border: `1px solid ${zomatoTheme.border}` },
    buttonPrimary: { background: zomatoTheme.primary, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 },
    buttonGhost: { background: '#fff', color: zomatoTheme.textDark, border: `1px solid ${zomatoTheme.border}`, padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' },
    badge: (status) => ({
      padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase',
      backgroundColor: status === 'Paid Out' ? '#e7f5ec' : (status === 'Disputed' ? '#fef0f1' : '#fff7ed'),
      color: status === 'Paid Out' ? zomatoTheme.success : (status === 'Disputed' ? zomatoTheme.primary : zomatoTheme.warning)
    })
  };

  return (
    <div style={{ backgroundColor: zomatoTheme.bgPage, minHeight: '100%' }}>
      {/* Syncing Overlay */}
      {isSyncing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', zIndex: 2000 }}>
          <div style={{ width: 40, height: 40, border: `4px solid ${zomatoTheme.primary}20`, borderTop: `4px solid ${zomatoTheme.primary}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      )}

      {/* Header Banner - Zomato Style */}
      <div style={{ ...styles.card, padding: '32px', marginBottom: '32px', border: 'none', background: `linear-gradient(135deg, ${zomatoTheme.primary} 0%, #b91c1c 100%)`, color: '#fff' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', width: 'fit-content', marginBottom: 12 }}>
              <ShieldCheck size={16} /> <span style={{ fontSize: 11, fontWeight: 800 }}>SECURE MULTI-SIG VAULT ACTIVE</span>
            </div>
            <h2 style={{ fontSize: '30px', fontWeight: 900, margin: 0 }}>Escrow Control Center</h2>
            <p style={{ opacity: 0.9, marginTop: 8, fontSize: 15 }}>Managing ₹1,64,300 in protected customer funds.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setActiveModal('wallet')} style={{ ...styles.buttonGhost, border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff' }}>Manage Wallets</button>
            <button onClick={() => setActiveModal('policy')} style={{ ...styles.buttonGhost, border: 'none', background: '#fff', color: zomatoTheme.primary }}>Release Policies</button>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={{ padding: '24px', borderBottom: `1px solid ${zomatoTheme.border}`, display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 20, fontWeight: 900 }}>Held Funds Ledger</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', width: '100%', maxWidth: '400px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: zomatoTheme.textLight }} />
              <input
                style={{ padding: '12px 16px 12px 48px', borderRadius: '12px', border: `1px solid ${zomatoTheme.border}`, outline: 'none', fontSize: 14, width: '100%' }}
                placeholder="Search escrow or booking ref..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button style={{ ...styles.buttonGhost, padding: '10px' }}><Filter size={20} /></button>
          </div>
        </div>

        <div style={{ padding: '0 24px 24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#fcfcfc' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>ESCROW ID</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>PARTIES</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>VALUE</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>CONDITION</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>STATUS</th>
                <th style={{ textAlign: 'right', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(esc => (
                <tr key={esc.id} style={{ borderBottom: `1px solid ${zomatoTheme.border}` }}>
                  <td style={{ padding: '24px 16px' }}>
                    <div style={{ fontWeight: 900 }}>{esc.id}</div>
                    <div style={{ fontSize: 11, color: zomatoTheme.textLight }}>Ref: {esc.ref}</div>
                  </td>
                  <td style={{ padding: '24px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>C: {esc.customer}</div>
                    <div style={{ fontSize: 13, color: zomatoTheme.textLight }}>P: {esc.provider}</div>
                  </td>
                  <td style={{ padding: '24px 16px' }}>
                    <div style={{ fontWeight: 900, color: zomatoTheme.primary }}>{esc.amount}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: esc.safety > 80 ? zomatoTheme.success : zomatoTheme.warning }}>SCORE: {esc.safety}%</div>
                  </td>
                  <td style={{ padding: '24px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
                      <Clock size={14} /> {esc.condition}
                    </div>
                  </td>
                  <td style={{ padding: '24px 16px' }}>
                    <span style={styles.badge(esc.status)}>{esc.status}</span>
                  </td>
                  <td style={{ padding: '24px 16px', textAlign: 'right' }}>
                    {esc.status === 'Held' ? (
                      <button onClick={() => handleRelease(esc.id)} style={{ ...styles.buttonPrimary, padding: '8px 16px', fontSize: 12, marginLeft: 'auto' }}><Unlock size={14} /> Release</button>
                    ) : (
                      <button onClick={() => { setSelectedEscrow(esc); setActiveModal('details'); }} style={{ ...styles.buttonGhost, padding: '8px 16px', fontSize: 12, marginLeft: 'auto' }}>View details</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Release Policy Modal */}
      {activeModal === 'policy' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', width: '400px', borderRadius: '24px', padding: '32px', position: 'relative' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 20 }}>Release Policies</h3>
            {[
              { l: 'Auto-Release', d: 'Pay after 48h of job completion', v: true },
              { l: 'OTP Verification', d: 'Require customer code for payout', v: true },
              { l: 'Manual QC', d: 'Held until admin reviews photos', v: false },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{p.l}</div>
                  <div style={{ fontSize: 12, color: zomatoTheme.textLight }}>{p.d}</div>
                </div>
                <div style={{ width: 40, height: 20, background: p.v ? zomatoTheme.success : '#eee', borderRadius: 20, position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, [p.v ? 'right' : 'left']: 2 }} />
                </div>
              </div>
            ))}
            <button style={{ ...styles.buttonPrimary, width: '100%', marginTop: 20, display: 'flex', justifyContent: 'center' }}>Update Protocols</button>
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      {activeModal === 'wallet' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', width: '480px', borderRadius: '24px', padding: '32px', position: 'relative' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 24 }}>Platform Wallets</h3>
            <div style={{ background: '#f8f8f8', borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: zomatoTheme.textLight, marginBottom: 8 }}>MAIN ESCROW RESERVE</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: zomatoTheme.primary }}>₹12,45,000.00</div>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ padding: 16, border: `1px solid ${zomatoTheme.border}`, borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CreditCard size={20} color={zomatoTheme.textLight} />
                  <div><div style={{ fontWeight: 700, fontSize: 14 }}>Razorpay Balance</div><div style={{ fontSize: 11, color: zomatoTheme.textLight }}>ID: rzp_live_9921</div></div>
                </div>
                <ExternalLink size={16} color={zomatoTheme.textLight} />
              </div>
              <div style={{ padding: 16, border: `1px solid ${zomatoTheme.border}`, borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Shield size={20} color={zomatoTheme.textLight} />
                  <div><div style={{ fontWeight: 700, fontSize: 14 }}>Cold Storage Vault</div><div style={{ fontSize: 11, color: zomatoTheme.textLight }}>Offline Ledger</div></div>
                </div>
                <Lock size={16} color={zomatoTheme.textLight} />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }`}</style>
    </div>
  );
}
