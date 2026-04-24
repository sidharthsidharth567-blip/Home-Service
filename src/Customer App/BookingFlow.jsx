import { useEffect, useMemo, useState } from 'react';
import {
  User,
  Wrench,
  CheckCircle,
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  Check,
  AlertCircle,
  Truck,
  Zap,
  Banknote,
  Wallet,
  Building2,
  ShieldCheck
} from 'lucide-react';
import SmartDispatchSystem from '../components/Advanced Modules/SmartDispatchSystem';
import DynamicPricing from '../components/Advanced Modules/DynamicPricing';
import { getGlobalDemand, calculateDetailedPrice } from '../utils/pricingEngine';
import { useLanguage } from '../components/Advanced Modules/LanguageSupport';

const WALLET_BALANCE = 2450.00;

const serviceOptions = {
  Plumbing: ['Pipe Leak', 'Tap Repair', 'Drain Cleaning'],
  Electrical: ['Switch Repair', 'Wiring', 'Light Installation'],
  Cleaning: ['Deep Cleaning', 'Sofa Cleaning', 'Carpet Cleaning'],
  Repairs: ['Furniture Repair', 'Door Fix', 'Window Repair'],
  Painting: ['Interior Painting', 'Exterior Painting', 'Touch-up'],
  Gardening: ['Lawn Mowing', 'Plant Care', 'Tree Pruning'],
};

const providerOptions = [
  { name: 'Amit Sharma', rating: '4.9', distance: '2.1 km', initials: 'AS', jobs: 156, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit' },
  { name: 'Priya Verma', rating: '4.8', distance: '3.4 km', initials: 'PV', jobs: 89, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
  { name: 'Rohit Patel', rating: '4.7', distance: '4.0 km', initials: 'RP', jobs: 210, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit' },
  { name: 'Sujith Kumar', rating: '4.8', distance: '1.2 km', initials: 'SK', jobs: 320, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sujith' },
];

const timeSlots = [
  '09:00 AM – 11:00 AM',
  '11:00 AM – 01:00 PM',
  '02:00 PM – 04:00 PM',
  '04:00 PM – 06:00 PM',
];

const baseEstimate = {
  Plumbing: 1200,
  Electrical: 1400,
  Cleaning: 1800,
  Repairs: 1600,
  Painting: 1400,
  Gardening: 1300,
};

// UI Components
function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 99,
        background: checked ? 'var(--primary)' : '#d0d0d0',
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        width: 18, height: 18,
        background: '#fff', borderRadius: '50%',
        top: 3, left: checked ? 23 : 3,
        transition: 'left 0.2s',
      }} />
    </div>
  );
}

function Stepper({ step, winWidth }) {
  const isMobile = winWidth <= 600;
  const steps = [
    { label: 'Contact', icon: User },
    { label: 'Details', icon: Wrench },
    { label: 'Confirm', icon: CheckCircle },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      justifyContent: isMobile ? 'center' : 'flex-start'
    }}>
      {steps.map((item, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        const Icon = item.icon;

        return (
          <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && (
              <div style={{
                width: isMobile ? '30px' : '60px',
                height: '2px',
                background: done ? 'var(--primary)' : 'var(--border)',
                margin: '0 -4px',
                marginBottom: '28px'
              }} />
            )}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              position: 'relative'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: `2px solid ${active || done ? 'var(--primary)' : 'var(--border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: active ? 'var(--primary)' : (done ? 'var(--primary-soft)' : 'var(--bg-white)'),
                color: active ? 'white' : (done ? 'var(--primary)' : 'var(--text-light)'),
                fontWeight: 700,
                fontSize: '16px',
                transition: 'all 0.3s',
                zIndex: 2,
                boxShadow: active ? '0 0 0 4px var(--primary-soft)' : 'none'
              }}>
                {done ? <Check size={20} /> : <Icon size={20} />}
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 600,
                color: active ? 'var(--primary)' : 'var(--text-light)'
              }}>{item.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Sidebar({ state }) {
  const selectedProvider = providerOptions.find(p => p.name === state.provider);
  const distanceStr = selectedProvider?.distance || '0 km';

  const pricing = calculateDetailedPrice(baseEstimate[state.service], {
    isUrgent: state.urgent,
    isAsap: state.when === 'asap',
    distance: distanceStr,
    time: state.slot
  });

  const whenStr = state.when === 'asap' ? 'ASAP' : `${state.date} · ${state.slot}`;

  const summaryRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '15px'
  };

  const costDetailStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: 'var(--text-gray)'
  };

  const sectionTitleStyle = {
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--text-light)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '16px'
  };

  return (
    <aside style={{
      background: 'var(--bg-white)',
      borderRadius: 'var(--radius-lg)',
      padding: '32px',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={sectionTitleStyle}>Booking Snapshot</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={summaryRowStyle}>
            <span style={{ color: 'var(--text-gray)' }}>Service</span>
            <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{state.service}</span>
          </div>
          <div style={summaryRowStyle}>
            <span style={{ color: 'var(--text-gray)' }}>Type</span>
            <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{state.sub}</span>
          </div>
          <div style={summaryRowStyle}>
            <span style={{ color: 'var(--text-gray)' }}>Status</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {pricing.isNight && <div title="Night Premium Applied" style={{ padding: '2px 6px', background: '#4f46e5', color: '#fff', fontSize: '10px', borderRadius: '4px', fontWeight: 800 }}>NIGHT</div>}
              {pricing.urgentCharge > 0 && <div title="Urgent Fee Applied" style={{ padding: '2px 6px', background: '#ef4444', color: '#fff', fontSize: '10px', borderRadius: '4px', fontWeight: 800 }}>URGENT</div>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={sectionTitleStyle}>Price Details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={costDetailStyle}>
            <span>Base Service Fee</span>
            <span style={{ fontWeight: 600 }}>₹{pricing.base}</span>
          </div>

          {pricing.nightCharge > 0 && (
            <div style={costDetailStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} />
                <span>Night Premium (20%)</span>
              </div>
              <span style={{ color: '#4f46e5', fontWeight: 600 }}>+₹{pricing.nightCharge}</span>
            </div>
          )}

          {pricing.surgeCharge > 0 && (
            <div style={costDetailStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} fill={getGlobalDemand().color} color={getGlobalDemand().color} />
                <span>Demand Surge (x{pricing.multiplier})</span>
              </div>
              <span style={{ color: getGlobalDemand().color, fontWeight: 700 }}>+₹{pricing.surgeCharge}</span>
            </div>
          )}

          {pricing.urgentCharge > 0 && (
            <div style={costDetailStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={14} />
                <span>Urgent / ASAP Fee</span>
              </div>
              <span style={{ color: '#ef4444', fontWeight: 600 }}>+₹{pricing.urgentCharge}</span>
            </div>
          )}

          {pricing.distanceCharge > 0 && (
            <div style={costDetailStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} />
                <span>Distance Surcharge ({distanceStr})</span>
              </div>
              <span style={{ fontWeight: 600 }}>+₹{pricing.distanceCharge}</span>
            </div>
          )}

          <div style={costDetailStyle}>
            <span>Visit & Logistics</span>
            <span style={{ fontWeight: 600 }}>₹{pricing.visitCharge}</span>
          </div>

          <div style={{
            ...summaryRowStyle,
            borderTop: '1px solid var(--border)',
            paddingTop: '16px',
            marginTop: '8px'
          }}>
            <span style={{ color: 'var(--text-dark)', fontWeight: 700, fontSize: '16px' }}>Total Amount</span>
            <span style={{ color: 'var(--primary)', fontSize: '24px', fontWeight: 800 }}>
              ₹{pricing.total}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>When & How</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={16} />
              <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{state.when === 'asap' ? 'ASAP' : `${state.date} · ${state.slot}`}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CreditCard size={16} />
              <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{state.payment}</span>
            </div>
          </div>
          {state.payment === 'Wallet' && (
            <div style={{ padding: '8px 12px', background: '#f0fdf4', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              <span style={{ color: '#16a34a', fontWeight: 600 }}>Wallet Balance</span>
              <span style={{ color: '#16a34a', fontWeight: 800 }}>₹{WALLET_BALANCE}</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '8px' }}>
        <DynamicPricing
          basePrice={baseEstimate[state.service]}
          serviceName={state.service}
          state={state}
        />
      </div>
    </aside>
  );
}

function Step1({ state, setState, winWidth }) {
  const isMobile = winWidth <= 600;

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const inputStyle = {
    padding: '12px 16px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    fontSize: '15px',
    fontFamily: 'inherit',
    background: 'var(--bg-light)',
    transition: 'all 0.2s',
    outline: 'none'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <span style={{
        display: 'block', fontFamily: 'Outfit', fontSize: '14px', fontWeight: 700,
        color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px'
      }}>Contact & location</span>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '24px'
      }}>
        <div style={formGroupStyle}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Full Name</label>
          <input
            style={inputStyle}
            type="text"
            value={state.name}
            onChange={e => setState(s => ({ ...s, name: e.target.value }))}
            placeholder="e.g. John Doe"
            onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.background = 'var(--bg-white)'; e.target.style.boxShadow = '0 0 0 4px var(--primary-soft)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-light)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Phone Number</label>
          <input
            style={inputStyle}
            type="tel"
            value={state.phone}
            onChange={e => setState(s => ({ ...s, phone: e.target.value }))}
            placeholder="e.g. +91 9876543210"
            onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.background = 'var(--bg-white)'; e.target.style.boxShadow = '0 0 0 4px var(--primary-soft)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-light)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-light)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MapPin size={20} color="var(--primary)" />
          <span style={{ fontSize: 15, fontWeight: 500 }}>Auto-detect location (GPS)</span>
        </div>
        <Toggle checked={state.gps} onChange={v => setState(s => ({ ...s, gps: v }))} />
      </div>

      <div style={formGroupStyle}>
        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Service Address</label>
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
          value={state.address}
          onChange={e => setState(s => ({ ...s, address: e.target.value }))}
          placeholder="Detailed address with house number"
          onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.background = 'var(--bg-white)'; e.target.style.boxShadow = '0 0 0 4px var(--primary-soft)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg-light)'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Address Label</label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['Home', 'Work', 'Other'].map(item => {
            const isActive = state.saved === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setState(s => ({
                  ...s, saved: item,
                  address: item === 'Home' ? '2nd Floor, Rajajinagar, Bangalore'
                    : item === 'Work' ? '3rd Floor, Tech Park Business Tower' : '',
                }))}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                  background: isActive ? 'var(--primary)' : 'var(--bg-white)',
                  color: isActive ? 'white' : 'var(--text-gray)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step2({ state, setState, winWidth }) {
  const isMobile = winWidth <= 600;
  const subOptions = useMemo(() => serviceOptions[state.service] || [], [state.service]);

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const inputStyle = {
    padding: '12px 16px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    fontSize: '15px',
    fontFamily: 'inherit',
    background: 'var(--bg-light)',
    transition: 'all 0.2s',
    outline: 'none'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <span style={{
        display: 'block', fontFamily: 'Outfit', fontSize: '14px', fontWeight: 700,
        color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px'
      }}>Service & Schedule</span>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '24px'
      }}>
        <div style={formGroupStyle}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Category</label>
          <select
            style={inputStyle}
            value={state.service}
            onChange={e => setState(s => ({ ...s, service: e.target.value, sub: serviceOptions[e.target.value][0] }))}
          >
            {Object.keys(serviceOptions).map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Service Type</label>
          <select
            style={inputStyle}
            value={state.sub}
            onChange={e => setState(s => ({ ...s, sub: e.target.value }))}
          >
            {subOptions.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div style={formGroupStyle}>
        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Detailed Description of Problem</label>
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: '130px', lineHeight: '1.6' }}
          value={state.desc}
          onChange={e => setState(s => ({ ...s, desc: e.target.value }))}
          placeholder="Please provide details about the issue. Giving more information helps our professional prepare better. (e.g., 'Kitchen tap is leaking from the handle area since yesterday...')"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fef2f2', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AlertCircle size={20} color="#ef4444" />
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#991b1b', display: 'block' }}>Emergency / Urgent Service</span>
            <span style={{ fontSize: 13, color: '#b91c1c' }}>Additional charges apply for speed delivery</span>
          </div>
        </div>
        <Toggle checked={state.urgent} onChange={v => setState(s => ({ ...s, urgent: v }))} />
      </div>

      <div style={formGroupStyle}>
        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Scheduling</label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['asap', 'later'].map(w => {
            const isActive = state.when === w;
            return (
              <button
                key={w}
                type="button"
                onClick={() => setState(s => ({ ...s, when: w }))}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                  background: isActive ? 'var(--primary)' : 'var(--bg-white)',
                  color: isActive ? 'white' : 'var(--text-gray)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {w === 'asap' ? 'ASAP Early as possible' : 'Schedule for later'}
              </button>
            );
          })}
        </div>
      </div>

      {state.when === 'later' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '24px',
          animation: 'fadeIn 0.3s'
        }}>
          <div style={formGroupStyle}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Date</label>
            <input style={inputStyle} type="date" value={state.date} onChange={e => setState(s => ({ ...s, date: e.target.value }))} />
          </div>
          <div style={formGroupStyle}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Time Slot</label>
            <select style={inputStyle} value={state.slot} onChange={e => setState(s => ({ ...s, slot: e.target.value }))}>
              {timeSlots.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      )}

      <div style={formGroupStyle}>
        <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Technician Assignment</label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['auto', 'choose'].map(m => {
            const isActive = state.providerMode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setState(s => ({ ...s, providerMode: m }))}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                  background: isActive ? 'var(--primary)' : 'var(--bg-white)',
                  color: isActive ? 'white' : 'var(--text-gray)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {m === 'auto' ? 'Auto Assign Nearest' : 'Choose Technician'}
              </button>
            );
          })}
        </div>

        {state.providerMode === 'choose' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            {providerOptions.map(p => {
              const isActive = state.provider === p.name;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setState(s => ({ ...s, provider: p.name }))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    background: isActive ? 'var(--primary-soft)' : 'var(--bg-white)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: 'var(--primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '18px'
                  }}>{p.initials}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: 13 }}>{p.rating} ★ · {p.distance}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div style={formGroupStyle}>
        <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>Payment Method</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
          {[
            {
              id: 'Card', Icon: CreditCard, color: '#0ea5e9',
              label: 'Credit / Debit Card', sub: 'Add Debit / Credit / ATM Card',
              detail: (() => {
                const fieldStyle = {
                  width: '100%', padding: '13px 16px', borderRadius: '8px',
                  border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '14px',
                  fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box',
                  color: '#1e293b', transition: 'border 0.2s',
                };
                const networks = [
                  { name: 'VISA',    bg: '#1a1f71', color: '#fff',    text: 'VISA',     italic: true },
                  { name: 'MC',      bg: '#eb001b', color: '#fff',    text: 'MC',       italic: false },
                  { name: 'MAESTRO', bg: '#0099df', color: '#fff',    text: 'MAE',      italic: false },
                  { name: 'DISC',    bg: '#f76f20', color: '#fff',    text: 'DISC',     italic: false },
                  { name: 'RUPAY',   bg: '#006a4e', color: '#fff',    text: 'Ru⁀Pay',  italic: false },
                  { name: 'AMEX',    bg: '#007ec1', color: '#fff',    text: 'AMEX',     italic: false },
                  { name: 'DINERS',  bg: '#4b4b4b', color: '#fff',    text: 'DIN',      italic: false },
                ];
                return (
                  <div style={{ marginTop: '12px', padding: '20px', background: '#e8f4fb', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0ea5e9' }} />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: '#0c4a6e' }}>Add Debit / Credit / ATM Card</span>
                    </div>

                    {/* Card Network Logos */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {networks.map(n => (
                        <div key={n.name} style={{
                          padding: '4px 8px', borderRadius: '5px', background: n.bg,
                          color: n.color, fontSize: '9px', fontWeight: 800,
                          fontStyle: n.italic ? 'italic' : 'normal',
                          border: '1px solid rgba(255,255,255,0.2)',
                          minWidth: '32px', textAlign: 'center', letterSpacing: '0.3px',
                        }}>{n.text}</div>
                      ))}
                    </div>

                    {/* Name on Card */}
                    <input
                      placeholder="Name on Card"
                      type="text"
                      defaultValue="Rahul Sharma"
                      style={fieldStyle}
                      onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                      onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                    />

                    {/* Card Number */}
                    <input
                      placeholder="Card Number"
                      type="text"
                      defaultValue="4111 1111 1111 4512"
                      maxLength={19}
                      style={fieldStyle}
                      onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                      onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                    />

                    {/* Expiry + CVV */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
                      <input
                        placeholder="Expiry Date (MM/YY)"
                        type="text"
                        defaultValue="08/27"
                        maxLength={5}
                        style={fieldStyle}
                        onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                        onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                      />
                      <input
                        placeholder="CVV"
                        type="password"
                        maxLength={4}
                        style={{ ...fieldStyle, letterSpacing: '4px' }}
                        onFocus={e => e.target.style.borderColor = '#0ea5e9'}
                        onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                      />
                    </div>

                    {/* Checkout Button */}
                    <button type="button" style={{
                      width: '100%', padding: '14px', borderRadius: '8px',
                      background: '#94a3b8', color: '#fff', border: 'none',
                      fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => e.target.style.background = '#0ea5e9'}
                      onMouseLeave={e => e.target.style.background = '#94a3b8'}
                    >
                      Checkout
                    </button>

                    {/* Acceptance text */}
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                      We accept Credit and Debit Cards from Visa, Mastercard, Maestro, Discover, Rupay, American Express &amp; Diners.
                    </p>
                  </div>
                );
              })()
            },
            {
              id: 'Net Banking', Icon: Building2, color: '#10b981',
              label: 'Net Banking', sub: 'All major Indian banks supported',
              detail: (
                <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px' }}>
                  {[
                    { name: 'SBI',    bg: '#1e40af', short: 'SBI' },
                    { name: 'HDFC',   bg: '#dc2626', short: 'HDFC' },
                    { name: 'ICICI',  bg: '#f59e0b', short: 'ICICI' },
                    { name: 'Axis',   bg: '#7c3aed', short: 'AXIS' },
                    { name: 'Canara', bg: '#0891b2', short: 'CAN' },
                    { name: 'Other',  bg: '#6b7280', short: '···' },
                  ].map(bank => (
                    <button key={bank.name} type="button" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #d1fae5', background: '#f0fdf4', cursor: 'pointer', fontWeight: 600, fontSize: '13px', color: '#065f46' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: bank.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '9px', fontWeight: 800 }}>{bank.short}</div>
                      {bank.name}
                    </button>
                  ))}
                </div>
              )
            },
            {
              id: 'Cash', Icon: Banknote, color: '#f59e0b',
              label: 'Cash on Service', sub: 'Pay technician directly after job completion',
              detail: (
                <div style={{ marginTop: '12px', padding: '14px 16px', background: '#fffbeb', borderRadius: '10px', border: '1.5px solid #fde68a', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <ShieldCheck size={18} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>How it works</div>
                    <ul style={{ fontSize: '12px', color: '#78350f', paddingLeft: '16px', margin: '6px 0 0', lineHeight: 1.8 }}>
                      <li>Technician arrives and completes the job</li>
                      <li>You verify the work report</li>
                      <li>Pay the exact amount shown above in cash</li>
                      <li>Technician marks it complete on app</li>
                    </ul>
                  </div>
                </div>
              )
            },
            {
              id: 'Wallet', Icon: Wallet, color: '#e23744',
              label: 'HomeCare Wallet', sub: `Available Balance: ₹${WALLET_BALANCE.toLocaleString('en-IN')}`,
              detail: (
                <div style={{ marginTop: '12px', padding: '16px', background: '#fef2f2', borderRadius: '10px', border: '1.5px solid #fecaca', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#991b1b', fontWeight: 700 }}>Wallet Balance</span>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#e23744' }}>₹{WALLET_BALANCE.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '99px', background: '#fee2e2', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '68%', background: 'linear-gradient(90deg,#e23744,#f87171)', borderRadius: '99px' }} />
                  </div>
                  <div style={{ fontSize: '12px', color: '#b91c1c' }}>68% of your ₹3,600 monthly limit used</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Last credited: ₹1,000 on 14 Apr 2026 · Auto-reload OFF</div>
                </div>
              )
            },
          ].map(m => {
            const isActive = state.payment === m.id;
            return (
              <div key={m.id}>
                <button
                  type="button"
                  onClick={() => setState(s => ({ ...s, payment: m.id }))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px', borderRadius: '14px', width: '100%',
                    border: `2px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                    background: isActive ? 'var(--primary-soft)' : 'var(--bg-white)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    boxShadow: isActive ? '0 0 0 3px rgba(226,55,68,0.08)' : 'none',
                  }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                    background: isActive ? `${m.color}18` : '#f5f5f5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s'
                  }}>
                    <m.Icon size={20} color={isActive ? m.color : '#9ca3af'} strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: isActive ? 'var(--primary)' : 'var(--text-dark)' }}>{m.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '2px' }}>{m.sub}</div>
                  </div>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                    background: isActive ? 'var(--primary)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                  }}>
                    {isActive && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
                  </div>
                </button>
                {isActive && (
                  <div style={{ padding: '0 8px 4px', animation: 'fadeIn 0.2s ease' }}>
                    {m.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step3({ state }) {
  const whenStr = state.when === 'asap' ? 'ASAP' : `${state.date} · ${state.slot}`;
  const tech = state.providerMode === 'auto' ? 'Auto assign nearest' : state.provider;

  const rows = [
    { label: 'Name', value: state.name || '[Empty Name]' },
    { label: 'Address', value: state.address },
    { label: 'Schedule', value: whenStr },
    { label: 'Technician', value: tech },
    { label: 'Payment', value: state.payLater ? 'Pay Later' : state.payment },
    { label: 'Description', value: state.desc || 'No details provided' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <span style={{
        display: 'block', fontFamily: 'Outfit', fontSize: '14px', fontWeight: 700,
        color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px'
      }}>Final Confirmation</span>

      <div style={{ width: '100%' }}>
        <div style={{
          background: 'var(--primary-soft)', padding: '20px',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
          borderBottom: '1px solid var(--primary)',
          textAlign: 'left'
        }}>
          <h4 style={{ margin: 0, color: 'var(--primary)', fontWeight: 700 }}>{state.service} Service</h4>
          <span style={{ fontSize: 14, color: 'var(--text-gray)' }}>{state.sub}</span>
        </div>
        <div style={{
          padding: '0 20px', border: '1px solid var(--border)',
          borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)'
        }}>
          {rows.map((row) => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between', padding: '16px 0',
              borderBottom: '1px solid var(--border)'
            }}>
              <span style={{ color: 'var(--text-gray)', fontSize: '15px' }}>{row.label}</span>
              <span style={{ color: 'var(--text-dark)', fontWeight: 600, fontSize: '15px', textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: 12, alignItems: 'flex-start', color: 'var(--text-light)', fontSize: 13, textAlign: 'left' }}>
        <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
        <p>Final price will be determined after on-site technician inspection. Minimal visit charge of ₹150 is included in estimate.</p>
      </div>
    </div>
  );
}

const defaultState = {
  step: 1,
  name: '', phone: '',
  gps: true, address: '2nd Floor, Rajajinagar, Bangalore',
  landmark: 'Near Rajajinagar Bus Stand', saved: 'Home',
  service: 'Plumbing', sub: 'Pipe Leak',
  desc: '', files: [], urgent: false,
  when: 'asap', date: new Date().toISOString().slice(0, 10),
  slot: timeSlots[0],
  providerMode: 'auto', provider: providerOptions[0].name,
  payment: 'Cash', payLater: false, submitting: false,
  isDispatching: false,
  demandLevel: getGlobalDemand().level,
  surgeMultiplier: getGlobalDemand().multiplier,
};

function BookingFlow({ onBack, onConfirm, initialService, initialSubService }) {
  const [state, setState] = useState(() => ({
    ...defaultState,
    service: initialService || 'Plumbing',
    sub: initialSubService || serviceOptions[initialService || 'Plumbing'][0],
  }));
  const [success, setSuccess] = useState(null);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const { t } = useLanguage();

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Live demand syncing
    const timer = setInterval(() => {
      const d = getGlobalDemand();
      setState(s => ({ ...s, demandLevel: d.level, surgeMultiplier: d.multiplier }));
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (initialService) {
      setState(s => ({
        ...s,
        service: initialService,
        sub: initialSubService || serviceOptions[initialService][0],
      }));
    }
  }, [initialService, initialSubService]);

  const handleConfirm = () => {
    if (state.providerMode === 'auto') {
      setState(s => ({ ...s, isDispatching: true }));
      return;
    }

    setState(s => ({ ...s, submitting: true }));
    setTimeout(() => {
      const selectedProvider = providerOptions.find(p => p.name === state.provider);
      const pricing = calculateDetailedPrice(baseEstimate[state.service], {
        isUrgent: state.urgent,
        isAsap: state.when === 'asap',
        distance: selectedProvider?.distance || '0 km',
        time: state.slot
      });

      const id = `BH-${Math.floor(1000 + Math.random() * 9000)}`;
      const booking = {
        id,
        service: state.service, subService: state.sub,
        status: 'Ongoing',
        date: state.when === 'asap' ? 'ASAP' : state.date,
        time: state.when === 'asap' ? 'ASAP' : state.slot,
        address: state.address,
        technician: state.provider,
        eta: state.urgent ? '20-30 mins' : '30-45 mins',
        price: `₹${pricing.total}`,
        paymentMethod: state.payLater ? 'Pay later' : state.payment,
        urgent: state.urgent,
        description: state.desc,
      };
      setState(s => ({ ...s, submitting: false }));
      setSuccess(booking);
      if (onConfirm) onConfirm(booking);
    }, 1400);
  };

  const handleDispatchComplete = (provider) => {
    // Logic after provider accepts
    setTimeout(() => {
      const pricing = calculateDetailedPrice(baseEstimate[state.service], {
        isUrgent: state.urgent,
        isAsap: state.when === 'asap',
        distance: provider.distance || '1.2 km',
        time: state.slot
      });

      const id = `BH-${Math.floor(1000 + Math.random() * 9000)}`;
      const booking = {
        id,
        service: state.service, subService: state.sub,
        status: 'Ongoing',
        date: state.when === 'asap' ? 'ASAP' : state.date,
        time: state.when === 'asap' ? 'ASAP' : state.slot,
        address: state.address,
        technician: provider.name,
        eta: '15-20 mins',
        price: `₹${pricing.total}`,
        paymentMethod: state.payLater ? 'Pay later' : state.payment,
        urgent: state.urgent,
        description: state.desc,
      };
      setState(s => ({ ...s, isDispatching: false }));
      setSuccess(booking);
      if (onConfirm) onConfirm(booking);
    }, 2000);
  };

  const isTablet = winWidth <= 992;
  const isMobile = winWidth <= 600;

  if (success) {
    return (
      <div style={{ padding: isMobile ? '24px 16px' : '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'var(--bg-white)', borderRadius: 'var(--radius-lg)',
          padding: isMobile ? '36px 20px' : '60px 40px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)',
          maxWidth: 500, margin: '40px auto', textAlign: 'center'
        }}>
          <div style={{
            width: '80px', height: '80px', background: '#dcfce7', color: '#166534',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Check size={40} />
          </div>
          <h2 style={{ fontSize: 24, marginBottom: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: 24 }}>Your request has been placed successfully. A professional will contact you soon.</p>
          <div style={{ background: 'var(--bg-light)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
            <span style={{ fontSize: 14, color: 'var(--text-light)' }}>Booking Reference</span>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)', marginTop: 4 }}>{success.id}</div>
          </div>
          <button
            style={{
              width: isMobile ? '100%' : 'auto',
              padding: '12px 40px', background: 'var(--primary)', color: 'white',
              borderRadius: 'var(--radius-md)', fontWeight: 600, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(226, 55, 68, 0.2)'
            }}
            onClick={() => { setSuccess(null); setState(defaultState); }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: isMobile ? '20px 16px' : '40px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 80px)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'flex-start',
        marginBottom: '40px',
        gap: '20px',
        flexWrap: 'wrap',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <div style={{ textAlign: 'left' }}>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)',
                fontWeight: 600, background: 'none', fontSize: '14px', marginBottom: '12px',
                padding: 0, border: 'none', cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} /> {t.home || 'Back to Home'}
            </button>
          )}
          <h1 style={{ fontSize: '32px', color: 'var(--text-dark)', marginBottom: '8px', fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>{t.bookNow || 'Book a service'}</h1>
          <p style={{ color: 'var(--text-gray)', fontSize: '16px' }}>Get professional help at your doorstep in few simple steps.</p>
        </div>
        <Stepper step={state.step} winWidth={winWidth} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr' : '1fr 340px',
        gap: '40px',
        alignItems: 'start'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            background: 'var(--bg-white)',
            borderRadius: 'var(--radius-lg)',
            padding: isMobile ? '24px' : '40px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border)',
            textAlign: 'left'
          }}>
            {state.step === 1 && <Step1 state={state} setState={setState} winWidth={winWidth} />}
            {state.step === 2 && <Step2 state={state} setState={setState} winWidth={winWidth} />}
            {state.step === 3 && <Step3 state={state} />}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            {state.step > 1 && (
              <button
                type="button"
                onClick={() => setState(s => ({ ...s, step: s.step - 1 }))}
                disabled={state.submitting}
                style={{
                  width: isMobile ? '100%' : 'auto',
                  padding: '12px 32px', background: 'var(--bg-white)',
                  border: '1px solid var(--border)', color: 'var(--text-gray)',
                  borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer'
                }}
              >
                {t.back || 'Back'}
              </button>
            )}
            {state.step < 3 && (
              <button
                type="button"
                onClick={() => setState(s => ({ ...s, step: s.step + 1 }))}
                style={{
                  width: isMobile ? '100%' : 'auto',
                  padding: '12px 40px', background: 'var(--primary)', color: 'white',
                  borderRadius: 'var(--radius-md)', fontWeight: 600, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(226, 55, 68, 0.2)'
                }}
              >
                {t.next || 'Continue'}
              </button>
            )}
            {state.step === 3 && (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={state.submitting}
                style={{
                  width: isMobile ? '100%' : 'auto',
                  padding: '12px 40px', background: 'var(--primary)', color: 'white',
                  borderRadius: 'var(--radius-md)', fontWeight: 600, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(226, 55, 68, 0.2)',
                  opacity: state.submitting ? 0.7 : 1
                }}
              >
                {state.submitting ? 'Searching for technician...' : (t.confirmBooking || 'Confirm My Booking')}
              </button>
            )}
          </div>
        </div>

        <Sidebar state={state} />
      </div>
      {state.isDispatching && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          backdropFilter: 'blur(8px)',
          padding: '20px'
        }}>
          <SmartDispatchSystem
            service={state.service}
            onProviderAssigned={handleDispatchComplete}
            onClose={() => setState(s => ({ ...s, isDispatching: false }))}
          />
        </div>
      )}
    </div>
  );
}

export default BookingFlow;
