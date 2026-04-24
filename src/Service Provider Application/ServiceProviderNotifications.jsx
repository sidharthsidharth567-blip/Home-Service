import { useEffect, useMemo, useState } from 'react';

const DATA = [
  { id: 'n1', cat: 'basic', title: 'New booking request', msg: 'Ananya Singh requested Plumbing at 14B MG Road. Respond within 10 minutes.', ico: '📋', time: '2 min ago', unread: true, pri: 'high', meta: { customer: 'Ananya Singh', amount: '₹850', job: 'JOB-201' } },
  { id: 'n2', cat: 'basic', title: 'Booking confirmed', msg: 'Vikram Joshi confirmed Tap Installation at Koramangala 5th Block.', ico: '✅', time: '18 min ago', unread: true, pri: 'normal', meta: { customer: 'Vikram Joshi', amount: '₹450', job: 'JOB-202' } },
  { id: 'n3', cat: 'basic', title: 'Booking cancelled', msg: 'Meera Iyer cancelled JOB-199 (Drain Cleaning). Reason: "Resolved on my own."', ico: '❌', time: '45 min ago', unread: false, pri: 'normal', meta: { customer: 'Meera Iyer', job: 'JOB-199' } },
  { id: 'n4', cat: 'schedule', title: 'Upcoming job reminder', msg: 'JOB-202 with Vikram Joshi starts in 30 minutes at Koramangala. Get ready!', ico: '⏰', time: '30 min ago', unread: true, pri: 'high', meta: { customer: 'Vikram Joshi', job: 'JOB-202' } },
  { id: 'n5', cat: 'schedule', title: 'Reschedule update', msg: 'Suresh Nair rescheduled JOB-198 from 10:00 AM to 2:30 PM today.', ico: '🗓️', time: '1 hr ago', unread: true, pri: 'high', meta: { customer: 'Suresh Nair', job: 'JOB-198' } },
  { id: 'n6', cat: 'payment', title: 'Payment received', msg: '₹1,200 received from Kavya Menon via UPI for Water Heater Repair.', ico: '💰', time: '2 hr ago', unread: false, pri: 'normal', meta: { amount: '₹1,200', customer: 'Kavya Menon' } },
  { id: 'n7', cat: 'payment', title: 'Weekly earnings summary', msg: 'You earned ₹8,750 from 7 jobs this week. Monthly total: ₹32,400.', ico: '📊', time: '3 hr ago', unread: false, pri: 'normal', meta: { amount: '₹8,750' } },
  { id: 'n8', cat: 'payment', title: 'Pending payment reminder', msg: '₹650 from Rohit Das (JOB-195) pending for 3 days. Send a reminder?', ico: '⚠️', time: '5 hr ago', unread: true, pri: 'high', meta: { amount: '₹650', customer: 'Rohit Das', job: 'JOB-195' } },
  { id: 'n9', cat: 'reviews', title: 'New 5★ rating', msg: 'Ananya Singh rated you 5 ★ — "Excellent work, very professional!"', ico: '⭐', time: '6 hr ago', unread: false, pri: 'normal', meta: { customer: 'Ananya Singh', rating: 5 } },
  { id: 'n10', cat: 'reviews', title: 'Low rating alert', msg: 'Divya Nair rated you 2 ★ for JOB-193. Reason: "Arrived 45 minutes late."', ico: '🔴', time: '8 hr ago', unread: true, pri: 'high', meta: { customer: 'Divya Nair', rating: 2, job: 'JOB-193' } },
  { id: 'n11', cat: 'messages', title: 'New message from customer', msg: 'Vikram Joshi: "Can you bring extra fittings? Tap size is 3/4 inch."', ico: '💬', time: '10 hr ago', unread: true, pri: 'normal', meta: { customer: 'Vikram Joshi' } },
  { id: 'n12', cat: 'messages', title: 'Missed call reminder', msg: 'Missed call from Meera Iyer (+91 98765 00123) regarding JOB-201.', ico: '📞', time: 'Yesterday', unread: true, pri: 'high', meta: { customer: 'Meera Iyer' } },
  { id: 'n13', cat: 'system', title: 'Profile incomplete', msg: 'Your profile is 70% complete. Add Aadhaar and service photos.', ico: '👤', time: 'Yesterday', unread: false, pri: 'normal', meta: { completion: 70 } },
  { id: 'n14', cat: 'system', title: 'Document verified', msg: 'Your uploaded ID proof verified successfully. Profile is now trusted.', ico: '🪪', time: '2 days ago', unread: false, pri: 'normal', meta: {} },
  { id: 'n15', cat: 'system', title: 'App update available', msg: 'Version 3.2.1 — faster job matching, improved maps, bug fixes.', ico: '🔄', time: '2 days ago', unread: false, pri: 'low', meta: { version: '3.2.1' } },
  { id: 'n16', cat: 'smart', title: 'Nearby job alert', msg: 'Electrical repair 1.4 km away at Indiranagar. ₹900 · High priority.', ico: '📍', time: '3 days ago', unread: false, pri: 'high', meta: { distance: '1.4 km', amount: '₹900' } },
  { id: 'n17', cat: 'smart', title: 'Peak demand alert', msg: 'High demand in your area 6–9 PM today. Stay online for priority jobs.', ico: '📈', time: '3 days ago', unread: false, pri: 'normal', meta: {} },
  { id: 'n18', cat: 'smart', title: 'Inactivity reminder', msg: "You haven't logged in for 4 days. Customers are looking for plumbers!", ico: '😴', time: '4 days ago', unread: false, pri: 'normal', meta: {} },
  { id: 'n19', cat: 'security', title: 'Login from new device', msg: 'New login: Samsung Galaxy S24 · Chennai · 11:34 PM. Not you?', ico: '🔐', time: '5 days ago', unread: false, pri: 'high', meta: { device: 'Samsung Galaxy S24' } },
  { id: 'n20', cat: 'security', title: 'Password changed', msg: 'Password changed successfully. If this was not you, contact support.', ico: '🔑', time: '5 days ago', unread: false, pri: 'normal', meta: {} },
];

const CATS = [
  { key: 'all', label: 'All', ico: '🔔' },
  { key: 'basic', label: 'Bookings', ico: '📋' },
  { key: 'schedule', label: 'Schedule', ico: '⏰' },
  { key: 'payment', label: 'Payments', ico: '💰' },
  { key: 'reviews', label: 'Reviews', ico: '⭐' },
  { key: 'messages', label: 'Messages', ico: '💬' },
  { key: 'system', label: 'System', ico: '⚙️' },
  { key: 'smart', label: 'Smart alerts', ico: '🎯' },
  { key: 'security', label: 'Security', ico: '🔐' },
];

const CAT_COLORS = {
  basic:    { bg: '#f5f3ff', txt: '#5b21b6', border: '#8b5cf6', icoBg: '#ede9fe' },
  schedule: { bg: '#fffbeb', txt: '#92400e', border: '#f59e0b', icoBg: '#fef3c7' },
  payment:  { bg: '#ecfdf5', txt: '#065f46', border: '#10b981', icoBg: '#d1fae5' },
  reviews:  { bg: '#fffbeb', txt: '#92400e', border: '#f59e0b', icoBg: '#fef3c7' },
  messages: { bg: '#eff6ff', txt: '#1e40af', border: '#3b82f6', icoBg: '#dbeafe' },
  system:   { bg: '#f9fafb', txt: '#374151', border: '#9ca3af', icoBg: '#f3f4f6' },
  smart:    { bg: '#f5f3ff', txt: '#5b21b6', border: '#8b5cf6', icoBg: '#ede9fe' },
  security: { bg: '#fef3f2', txt: '#991b1b', border: '#ef4444', icoBg: '#fee2e2' },
};

const PUSH = [
  { id: 'p1', cat: 'basic',    ico: '📋', title: 'New booking request',   msg: 'Priya Verma sent a Cleaning request at Whitefield. ₹600.',      pri: 'high' },
  { id: 'p2', cat: 'schedule', ico: '⏰', title: 'Job starts in 15 min',  msg: 'JOB-203 with Arjun Mehta begins soon. Head out!',                pri: 'high' },
  { id: 'p3', cat: 'payment',  ico: '💰', title: 'Payment received',       msg: '₹750 received from Kiran Rao via cash for JOB-200.',            pri: 'normal' },
  { id: 'p4', cat: 'reviews',  ico: '⭐', title: 'New 5★ review',          msg: 'Suresh Nair rated you 5 ★ — "Best plumber in the area!"',       pri: 'normal' },
  { id: 'p5', cat: 'messages', ico: '💬', title: 'New message',            msg: 'Ananya Singh: "Are you available at 4 PM instead?"',            pri: 'normal' },
  { id: 'p6', cat: 'smart',    ico: '📍', title: 'Nearby urgent job',      msg: 'Pipe burst 0.8 km away — Indiranagar. ₹1,500.',                 pri: 'high' },
  { id: 'p7', cat: 'security', ico: '🔐', title: 'New device login',       msg: 'Login from iPhone 15 · Mumbai · Just now.',                     pri: 'high' },
  { id: 'p8', cat: 'payment',  ico: '📊', title: 'Monthly summary ready',  msg: 'October earnings report ready. ₹32,400 total.',                 pri: 'low' },
];

// ─── Chip helpers ─────────────────────────────────────────────────────────────

const chipStyle = (bg, color) => ({
  display: 'inline-flex', padding: '2px 8px', borderRadius: 999,
  fontSize: 10, fontWeight: 600, background: bg, color,
  marginRight: 4, marginBottom: 4,
});

function MetaChips({ meta }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 8 }}>
      {meta.amount    && <span style={chipStyle('#ecfdf5', '#065f46')}>{meta.amount}</span>}
      {meta.customer  && <span style={chipStyle('#f3f4f6', '#374151')}>{meta.customer}</span>}
      {meta.job       && <span style={chipStyle('#eff6ff', '#1e40af')}>{meta.job}</span>}
      {meta.rating    && <span style={chipStyle('#fffbeb', '#92400e')}>{meta.rating} ★</span>}
      {meta.distance  && <span style={chipStyle('#f5f3ff', '#5b21b6')}>{meta.distance}</span>}
      {meta.version   && <span style={chipStyle('#f3f4f6', '#374151')}>v{meta.version}</span>}
      {meta.device    && <span style={chipStyle('#fef3f2', '#991b1b')}>{meta.device}</span>}
      {meta.completion && <span style={chipStyle('#fffbeb', '#92400e')}>{meta.completion}% done</span>}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div style={{ position: 'fixed', top: 64, right: 16, width: 'min(300px, calc(100vw - 24px))', display: 'flex', flexDirection: 'column', gap: 7, zIndex: 999, pointerEvents: 'none' }}>
      <style>{`@keyframes tin{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
      {toasts.map(t => {
        const cc = CAT_COLORS[t.cat] || CAT_COLORS.system;
        return (
          <div key={t.id} style={{ background: '#fff', border: '1px solid #eaecf0', borderLeft: `3px solid ${cc.border}`, borderRadius: 10, padding: '11px 13px', display: 'flex', gap: 9, alignItems: 'flex-start', pointerEvents: 'auto', animation: 'tin .25s ease' }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: cc.icoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{t.ico}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#111827', marginBottom: 2 }}>{t.title}</div>
              <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.5 }}>{t.msg.slice(0, 68)}{t.msg.length > 68 ? '...' : ''}</div>
            </div>
            <button onClick={() => onDismiss(t.id)} style={{ background: 'none', border: 'none', color: '#d1d5db', cursor: 'pointer', fontSize: 16, padding: 0, flexShrink: 0, lineHeight: 1 }}>×</button>
          </div>
        );
      })}
    </div>
  );
}

// ─── Notification Card ────────────────────────────────────────────────────────

function NotifCard({ n, onRead, onDismiss }) {
  const cc = CAT_COLORS[n.cat] || CAT_COLORS.system;
  const catLabel = CATS.find(c => c.key === n.cat)?.label || n.cat;
  const hasMeta = Object.keys(n.meta).length > 0;

  const cardStyle = {
    background: '#fff',
    border: '1px solid #eaecf0',
    borderLeft: n.unread ? `3px solid ${cc.border}` : '1px solid #eaecf0',
    borderRadius: 12,
    padding: '14px 16px',
    paddingLeft: n.unread ? 13 : 16,
    display: 'flex',
    gap: 12,
  };

  return (
    <div style={cardStyle}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: cc.icoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
        {n.ico}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: n.unread ? 600 : 400, color: n.unread ? '#111827' : '#6b7280', lineHeight: 1.4 }}>{n.title}</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
            <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: cc.bg, color: cc.txt }}>{catLabel}</span>
            {n.pri === 'high' && <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: '#fef3f2', color: '#991b1b' }}>Urgent</span>}
            {n.unread && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4f46e5', flexShrink: 0 }} />}
          </div>
        </div>

        {/* Message */}
        <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginBottom: 8 }}>{n.msg}</div>

        {/* Meta chips */}
        {hasMeta && <MetaChips meta={n.meta} />}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#d1d5db' }}>{n.time}</span>
          <div style={{ display: 'flex', gap: 5 }}>
            {n.unread && (
              <button onClick={() => onRead(n.id)} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: '#eef2ff', color: '#4338ca' }}>
                Mark read
              </button>
            )}
            <button onClick={() => onDismiss(n.id)} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', border: '1px solid #e5e7eb', background: '#f9fafb', color: '#9ca3af' }}>
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function NotificationCenter() {
  const [notifs, setNotifs] = useState(DATA);
  const [toasts, setToasts] = useState([]);
  const [activeCat, setActiveCat] = useState('all');
  const [priFilter, setPriFilter] = useState('all');
  const [sending, setSending] = useState(false);
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  // Background auto-alerts
  useEffect(() => {
    const timers = [
      setTimeout(() => fireNotif(PUSH[0], true), 8000),
      setTimeout(() => fireNotif(PUSH[5], true), 18000),
      setTimeout(() => fireNotif(PUSH[2], true), 30000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addToast = (n) => {
    const tid = 'T' + Date.now();
    setToasts(p => [{ ...n, id: tid }, ...p].slice(0, 5));
    setTimeout(() => setToasts(p => p.filter(t => t.id !== tid)), 4800);
  };

  const fireNotif = (tmpl, isBg = false) => {
    const n = { id: 'x' + Date.now(), cat: tmpl.cat, title: tmpl.title, msg: tmpl.msg, ico: tmpl.ico, time: isBg ? 'Just now (background)' : 'Now', unread: true, pri: tmpl.pri, meta: {} };
    setNotifs(p => [n, ...p]);
    addToast(n);
  };

  const sendPush = (tmpl) => {
    if (sending) return;
    setSending(true);
    setTimeout(() => { fireNotif(tmpl, false); setSending(false); }, 500);
  };

  const markRead   = (id) => setNotifs(p => p.map(n => n.id === id ? { ...n, unread: false } : n));
  const markAll    = ()   => setNotifs(p => p.map(n => ({ ...n, unread: false })));
  const dismiss    = (id) => setNotifs(p => p.filter(n => n.id !== id));
  const clearAll   = ()   => setNotifs([]);

  const unreadCount = useMemo(() => notifs.filter(n => n.unread).length, [notifs]);

  const filtered = useMemo(() => notifs.filter(n =>
    (activeCat === 'all' || n.cat === activeCat) &&
    (priFilter === 'all' || n.pri === priFilter)
  ), [notifs, activeCat, priFilter]);

  const byCat    = useMemo(() => { const m = {}; notifs.forEach(n => { m[n.cat] = (m[n.cat] || 0) + 1; }); return m; }, [notifs]);
  const unrByCat = useMemo(() => { const m = {}; notifs.filter(n => n.unread).forEach(n => { m[n.cat] = (m[n.cat] || 0) + 1; }); return m; }, [notifs]);

  const activeCatLabel = CATS.find(c => c.key === activeCat)?.label || 'All';
  const isTablet = winWidth <= 1100;
  const isMobile = winWidth <= 768;

  // ─── Styles ─────────────────────────────────────────────────────────────────

  const S = {
    root:    { fontFamily: "'Inter','DM Sans',system-ui,sans-serif", background: '#f5f6fa', minHeight: '100vh', fontSize: 13, color: '#1a1a2e' },
    topbar:  { background: '#fff', borderBottom: '1px solid #eaecf0', padding: isMobile ? '10px 16px' : '0 24px', minHeight: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
    body:    { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '220px 1fr' : '220px 1fr 280px'), minHeight: 'calc(100vh - 56px)' },
    sidebar: { background: '#fff', borderRight: isMobile ? 'none' : '1px solid #eaecf0', borderBottom: isMobile ? '1px solid #eaecf0' : 'none', padding: '16px 12px', overflowY: 'auto' },
    main:    { background: '#f5f6fa', padding: isMobile ? 16 : 20, display: 'flex', flexDirection: 'column', gap: 12 },
    right:   { background: '#fff', borderLeft: isTablet ? 'none' : '1px solid #eaecf0', borderTop: isTablet ? '1px solid #eaecf0' : 'none', padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 },
  };

  const sItem = (active) => ({
    display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 8,
    cursor: 'pointer', border: 'none', background: active ? '#eef2ff' : 'none',
    fontFamily: 'inherit', fontSize: 12, width: '100%', textAlign: 'left',
    color: active ? '#4338ca' : '#6b7280', fontWeight: active ? 500 : 400, marginBottom: 2,
  });

  const sIco = (active) => ({
    width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 13, flexShrink: 0,
    background: active ? '#e0e7ff' : '#f3f4f6',
  });

  const fChip = (active) => ({
    padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500,
    cursor: 'pointer', fontFamily: 'inherit',
    border: active ? 'none' : '1px solid #e5e7eb',
    background: active ? '#4f46e5' : '#fff',
    color: active ? '#fff' : '#6b7280',
  });

  const hBtn = (danger) => ({
    padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500,
    cursor: 'pointer', fontFamily: 'inherit',
    border: danger ? '1px solid #fecaca' : '1px solid #e5e7eb',
    background: danger ? '#fef3f2' : '#fff',
    color: danger ? '#b91c1c' : '#374151',
  });

  return (
    <div style={S.root}>
      <Toast toasts={toasts} onDismiss={id => setToasts(p => p.filter(t => t.id !== id))} />

      {/* ── Top bar ── */}
      <div style={S.topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="#fff"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 106 0 3 3 0 00-6 0z" /></svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>Notifications <span style={{ color: '#9ca3af', fontWeight: 400 }}>/ worker app</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> Live
          </span>
          {unreadCount > 0 && (
            <span style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: '#fef3f2', color: '#991b1b', border: '1px solid #fecaca' }}>{unreadCount} unread</span>
          )}
          <button onClick={markAll}  style={hBtn(false)}>Mark all read</button>
          <button onClick={clearAll} style={hBtn(true)}>Clear all</button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={S.body}>

        {/* ── Sidebar ── */}
        <div style={S.sidebar}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: 4 }}>Overview</div>
          <div style={{ padding: '0 10px 14px', fontSize: 11, color: '#6b7280' }}>{notifs.length} total · {unreadCount} unread</div>

          <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: 6 }}>Categories</div>
          {CATS.map(c => {
            const cnt = c.key === 'all' ? notifs.length : (byCat[c.key] || 0);
            const unr = c.key === 'all' ? unreadCount : (unrByCat[c.key] || 0);
            const active = activeCat === c.key;
            return (
              <button key={c.key} onClick={() => setActiveCat(c.key)} style={sItem(active)}>
                <span style={sIco(active)}>{c.ico}</span>
                <span style={{ flex: 1 }}>{c.label}</span>
                {cnt > 0 && (
                  <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 999, background: active ? '#c7d2fe' : '#f3f4f6', color: active ? '#3730a3' : '#9ca3af' }}>{cnt}</span>
                )}
                {unr > 0 && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />}
              </button>
            );
          })}

          <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', margin: '14px 0 6px' }}>Priority</div>
          {[{ k: 'all', l: 'All', col: '#6366f1' }, { k: 'high', l: 'High', col: '#ef4444' }, { k: 'normal', l: 'Normal', col: '#3b82f6' }, { k: 'low', l: 'Low', col: '#9ca3af' }].map(p => (
            <button key={p.k} onClick={() => setPriFilter(p.k)} style={sItem(priFilter === p.k)}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.col, flexShrink: 0, marginLeft: 6 }} />
              <span style={{ flex: 1 }}>{p.l}</span>
            </button>
          ))}
        </div>

        {/* ── Main feed ── */}
        <div style={S.main}>
          <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 10 }}>
            <div>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{activeCatLabel}</span>
              <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 6 }}>{filtered.length} notifications</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['all', 'high', 'normal', 'low'].map(p => (
                <button key={p} onClick={() => setPriFilter(p)} style={fChip(priFilter === p)}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0
            ? <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}><div style={{ fontSize: 32, marginBottom: 10 }}>🔔</div><div>No notifications here.</div></div>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filtered.map(n => <NotifCard key={n.id} n={n} onRead={markRead} onDismiss={dismiss} />)}
              </div>
          }
        </div>

        {/* ── Right panel ── */}
        <div style={S.right}>
          {/* Push simulator */}
          <div style={{ border: '1px solid #eaecf0', borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 2 }}>Send push alert</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 12 }}>Simulate a notification</div>
            {PUSH.map(t => {
              const cc = CAT_COLORS[t.cat] || CAT_COLORS.system;
              return (
                <button key={t.id} onClick={() => sendPush(t)} disabled={sending} style={{ display: 'flex', gap: 9, alignItems: 'center', padding: '8px 10px', borderRadius: 8, cursor: sending ? 'not-allowed' : 'pointer', border: '1px solid #f3f4f6', background: '#fafafa', marginBottom: 6, fontFamily: 'inherit', width: '100%', textAlign: 'left', opacity: sending ? 0.5 : 1 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, background: cc.icoBg }}>{t.ico}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#374151', marginBottom: 1 }}>{t.title}</div>
                    <div style={{ fontSize: 10, color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 148 }}>{t.msg}</div>
                  </div>
                  {t.pri === 'high' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>

          {/* Stats */}
          <div style={{ border: '1px solid #eaecf0', borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 10 }}>Stats</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
              {[
                { l: 'Total',    v: notifs.length,                                        col: '#4f46e5' },
                { l: 'Unread',   v: unreadCount,                                          col: '#ef4444' },
                { l: 'Urgent',   v: notifs.filter(n => n.pri === 'high').length,          col: '#ef4444' },
                { l: 'Bookings', v: notifs.filter(n => n.cat === 'basic').length,         col: '#4f46e5' },
                { l: 'Payments', v: notifs.filter(n => n.cat === 'payment').length,       col: '#10b981' },
                { l: 'Security', v: notifs.filter(n => n.cat === 'security').length,      col: '#ef4444' },
              ].map(s => (
                <div key={s.l} style={{ borderRadius: 8, padding: '10px 12px', background: '#f9fafb', border: '1px solid #f3f4f6' }}>
                  <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 3 }}>{s.l}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: s.col }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Background alerts info */}
          <div style={{ border: '1px solid #eaecf0', borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 4 }}>Background alerts</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10 }}>Auto-fire to simulate push delivery</div>
            {[{ l: 'New booking request', d: '~8s' }, { l: 'Nearby urgent job', d: '~18s' }, { l: 'Payment received', d: '~30s' }].map((x, i, arr) => (
              <div key={x.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <span style={{ fontSize: 11, color: '#6b7280' }}>{x.l}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#f59e0b' }}>{x.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
