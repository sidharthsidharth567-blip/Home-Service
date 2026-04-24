import { useState } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

function PaymentGateway({ amount, method, onSuccess, onCancel }) {
  const [status, setStatus] = useState('idle'); // idle, processing, success, error

  const handleSimulate = (isSuccess) => {
    setStatus('processing');
    setTimeout(() => {
      setStatus(isSuccess ? 'success' : 'error');
      if (isSuccess) {
        setTimeout(onSuccess, 1500);
      }
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg-white)', width: '100%', maxWidth: '420px', borderRadius: '16px',
        overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--primary)', color: 'white', padding: '24px', textAlign: 'center',
          position: 'relative'
        }}>
          {status === 'idle' && (
            <button 
              onClick={onCancel}
              style={{
                position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)',
                border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          )}
          <ShieldCheck size={32} style={{ margin: '0 auto 12px' }} />
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
            Secure Payment
          </h2>
          <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '14px' }}>100% Safe & Encrypted</p>
        </div>

        {/* Amount */}
        <div style={{
          padding: '24px 24px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px'
        }}>
          <span style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Total Amount to Pay</span>
          <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-dark)' }}>{amount}</span>
        </div>

        <div style={{ padding: '24px' }}>
          {status === 'processing' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '16px' }}>
              <Loader2 size={40} className="spin" color="var(--primary)" />
              <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-dark)' }}>Processing Payment...</div>
              <p style={{ fontSize: '13px', color: 'var(--text-gray)', margin: 0 }}>Please do not close this window</p>
              <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .spin { animation: spin 1s linear infinite; }
              `}</style>
            </div>
          ) : status === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '16px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={32} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)' }}>Payment Successful!</div>
              <p style={{ fontSize: '14px', color: 'var(--text-gray)', margin: 0 }}>Redirecting...</p>
            </div>
          ) : (
            <>
              {status === 'error' && (
                <div style={{
                  background: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '8px',
                  display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', color: '#991b1b'
                }}>
                  <AlertCircle size={20} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>Payment failed. Please try again or use a different method.</span>
                </div>
              )}

              {/* Dummy Input Fields based on Method */}
              {method === 'UPI' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '8px' }}>
                    <Smartphone size={20} color="var(--text-gray)" />
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Pay via UPI App</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ flex: 1, padding: '12px', background: 'white', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>GPay</button>
                    <button style={{ flex: 1, padding: '12px', background: 'white', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>PhonePe</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '8px' }}>
                    <CreditCard size={20} color="var(--text-gray)" />
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Enter Card Details</span>
                  </div>
                  <input type="text" placeholder="Card Number (Dummy)" style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input type="text" placeholder="MM/YY" style={{ flex: 1, padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
                    <input type="text" placeholder="CVV" style={{ flex: 1, padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
                  </div>
                </div>
              )}

              {/* Dev Simulation Buttons */}
              <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => handleSimulate(true)}
                  style={{
                    width: '100%', padding: '14px', background: '#16a34a', color: 'white',
                    border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '15px',
                    cursor: 'pointer', transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={e => e.target.style.opacity = 0.9}
                  onMouseLeave={e => e.target.style.opacity = 1}
                >
                  Simulate Success
                </button>
                <button
                  onClick={() => handleSimulate(false)}
                  style={{
                    width: '100%', padding: '14px', background: '#ef4444', color: 'white',
                    border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '15px',
                    cursor: 'pointer', transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={e => e.target.style.opacity = 0.9}
                  onMouseLeave={e => e.target.style.opacity = 1}
                >
                  Simulate Failure
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;
