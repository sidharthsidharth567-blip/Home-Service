import { useState, useCallback } from 'react';

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const PROVIDER = {
  name: 'Amit Sharma',
  initials: 'AS',
  specialty: 'Plumber',
  city: 'Bangalore',
  phone: '+91 98765 43210',
  rating: 4.9,
  reviews: 245,
  completedJobs: 320,
  experience: 6,
  todayEarnings: 2850,
  weekEarnings: 18400,
  monthEarnings: 67200,
  totalEarnings: 125400,
  pendingPayment: 5600,
};

const INITIAL_BOOKINGS = [
  { id: 'JOB-101', ini: 'AN', customer: 'Ananya Singh', service: 'Pipe leak fix', addr: 'MG Road', time: '09:00 AM', day: 'today', status: 'Completed', amount: 850, phone: '+919900123456' },
  { id: 'JOB-102', ini: 'VJ', customer: 'Vikram Joshi', service: 'Tap installation', addr: 'Koramangala', time: '11:30 AM', day: 'today', status: 'Ongoing', amount: 450, phone: '+919812345678' },
  { id: 'JOB-103', ini: 'MI', customer: 'Meera Iyer', service: 'Water heater repair', addr: 'Indiranagar', time: '02:00 PM', day: 'today', status: 'Pending', amount: 1200, phone: '+919765432101' },
  { id: 'JOB-104', ini: 'SN', customer: 'Suresh Nair', service: 'Drain cleaning', addr: 'Whitefield', time: '04:30 PM', day: 'today', status: 'Accepted', amount: 650, phone: '+919654321098' },
  { id: 'JOB-098', ini: 'KM', customer: 'Kavya Menon', service: 'Shower head replace', addr: 'JP Nagar', time: '3:00 PM', day: 'yesterday', status: 'Completed', amount: 550, phone: '+919543210987' },
  { id: 'JOB-097', ini: 'AR', customer: 'Arjun Reddy', service: 'Pipe burst emergency', addr: 'HSR Layout', time: '10:00 AM', day: 'yesterday', status: 'Completed', amount: 1800, phone: '+919432109876' },
];

const NEARBY_JOBS = [
  { id: 'NR-001', ini: 'PM', customer: 'Priya Menon', service: 'Pipe leak', addr: 'Brigade Road', dist: 1.2, eta: 8, amount: 1400, x: 58, y: 42, desc: 'Kitchen pipe leaking badly. Urgent.' },
  { id: 'NR-002', ini: 'RK', customer: 'Rajesh Kumar', service: 'Tap installation', addr: 'Ulsoor Lake', dist: 2.8, eta: 18, amount: 750, x: 74, y: 35, desc: '2 bathroom taps need fitting.' },
  { id: 'NR-003', ini: 'NG', customer: 'Neha Gupta', service: 'Drain blockage', addr: 'Indiranagar', dist: 4.5, eta: 28, amount: 550, x: 84, y: 56, desc: 'Kitchen drain completely blocked.' },
  { id: 'NR-004', ini: 'SP', customer: 'Sanjay Pillai', service: 'Water heater repair', addr: 'Koramangala', dist: 3.1, eta: 22, amount: 1100, x: 36, y: 64, desc: 'Geyser not heating water.' },
];

const INITIAL_MESSAGES = [
  { id: 1, ini: 'AN', name: 'Ananya Singh', preview: 'Thanks for the great work!', time: '2 hrs ago', unread: 0 },
  { id: 2, ini: 'VJ', name: 'Vikram Joshi', preview: 'Can you come earlier?', time: '15 min ago', unread: 2 },
  { id: 3, ini: 'MI', name: 'Meera Iyer', preview: 'What is your ETA?', time: '5 min ago', unread: 1 },
];

const INITIAL_THREADS = {
  1: [{ from: 'c', text: 'Hi, when will you arrive?' }, { from: 'm', text: 'On my way, ~10 mins' }, { from: 'c', text: 'Thanks for the great work!' }],
  2: [{ from: 'c', text: 'Can you come earlier?' }, { from: 'c', text: 'I need it done by 11 AM' }],
  3: [{ from: 'c', text: 'What is your ETA?' }],
};

const REVIEWS = [
  { ini: 'KM', name: 'Kavya Menon', rating: 5, comment: 'Excellent work, very professional. Fixed the pipe quickly.', date: 'Today' },
  { ini: 'RD', name: 'Rohit Das', rating: 4, comment: 'Good service, arrived on time. Clean work.', date: 'Yesterday' },
  { ini: 'AR', name: 'Arjun Reddy', rating: 5, comment: 'Emergency handled perfectly. Very reliable provider.', date: '2 days ago' },
  { ini: 'SP', name: 'Sanjay Pillai', rating: 4, comment: 'Reasonable price, knew exactly what to do.', date: '3 days ago' },
  { ini: 'NK', name: 'Nisha Kumar', rating: 5, comment: 'Superb service, very professional and tidy.', date: '4 days ago' },
];

const WITHDRAWALS = [
  { id: 'TXN-003', amount: 8500, date: 'Apr 8, 2025', method: 'UPI **4321' },
  { id: 'TXN-002', amount: 5000, date: 'Apr 1, 2025', method: 'UPI **4321' },
  { id: 'TXN-001', amount: 6200, date: 'Mar 25, 2025', method: 'Bank **7890' },
];

const WEEKLY_DATA = [12200, 15400, 9800, 18400, 14200, 11600, 18400];
const WEEKLY_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const RATING_DIST = [180, 45, 12, 5, 3];
const PERF_ROWS = [
  ['Jobs done', '14', '18', 78],
  ['On-time arrival', '92%', '95%', 92],
  ['Rating', '4.9', '5.0', 98],
  ['Response rate', '87%', '90%', 87],
];
const SETTINGS_ROWS = [
  ['Edit profile', 'Name, photo, bio'],
  ['Service categories', 'Plumbing, waterproofing'],
  ['Availability', 'Working hours & days'],
  ['Notifications', 'Job alerts, payments'],
  ['Language', 'English'],
  ['Security', 'Password, login devices'],
  ['Support', 'Help center, raise ticket'],
  ['Terms & policies', ''],
];
const QUICK_REPLIES = ['On my way', '~10 min', 'Reached', 'Completed', 'Need more time', 'Please wait'];
const JOB_FILTERS = ['All', 'Pending', 'Accepted', 'Ongoing', 'Completed', 'Cancelled'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_BADGE = {
  Completed: { bg: '#EAF3DE', color: '#27500A' },
  Ongoing:   { bg: '#FAEEDA', color: '#633806' },
  Pending:   { bg: '#FCEBEB', color: '#791F1F' },
  Accepted:  { bg: '#E6F1FB', color: '#0C447C' },
  Cancelled: { bg: '#F1EFE8', color: '#5F5E5A' },
};

function Badge({ status }) {
  const s = STATUS_BADGE[status] || STATUS_BADGE.Cancelled;
  return (
    <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

function Avi({ ini, size = 36 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: '#E6F1FB', color: '#0C447C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 500, flexShrink: 0 }}>
      {ini}
    </div>
  );
}

function navTo(addr) {
  const q = encodeURIComponent(addr + ', Bangalore');
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=driving`, '_blank');
}

function callCust(phone) {
  if (phone) window.open(`tel:${phone}`);
}

// ─── Sub-screens ──────────────────────────────────────────────────────────────

function HomeTab({ statuses, setStatuses }) {
  const completed = INITIAL_BOOKINGS.filter(b => statuses[b.id] === 'Completed').length;
  const ongoing   = INITIAL_BOOKINGS.filter(b => statuses[b.id] === 'Ongoing').length;
  const today     = INITIAL_BOOKINGS.filter(b => b.day === 'today');
  const max = Math.max(...WEEKLY_DATA);

  function doAction(action, id) {
    setStatuses(prev => ({ ...prev, [id]: action === 'accept' ? 'Accepted' : action === 'reject' ? 'Cancelled' : 'Completed' }));
  }

  return (
    <div>
      {/* Stats */}
      <Section title="Today's overview">
        <div style={g2}>
          <MetricCard label="Completed" value={completed} />
          <MetricCard label="Ongoing" value={ongoing} valueColor="#854F0B" />
          <MetricCard label="Today earnings" value={`₹${PROVIDER.todayEarnings.toLocaleString()}`} />
          <MetricCard label="Rating" value={<>4.9 <span style={{ fontSize: 14, color: '#f59e0b' }}>★</span></>} />
        </div>
      </Section>

      {/* Today bookings */}
      <Section title="Today's bookings">
        {today.map(job => {
          const s = statuses[job.id];
          return (
            <Card key={job.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={jt}>{job.service}</div>
                  <div style={jm}>{job.customer}</div>
                  <div style={jm}>{job.addr} · {job.time}</div>
                </div>
                <Badge status={s} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6 }}>₹{job.amount}</div>
              <ActRow>
                {s === 'Pending' && <>
                  <Btn variant="blue" onClick={() => doAction('accept', job.id)}>Accept</Btn>
                  <Btn variant="red" onClick={() => doAction('reject', job.id)}>Reject</Btn>
                </>}
                {(s === 'Accepted' || s === 'Ongoing') && <>
                  {s === 'Accepted' && <Btn variant="green" onClick={() => doAction('complete', job.id)}>Mark complete</Btn>}
                  <Btn onClick={() => navTo(job.addr)}>Navigate ↗</Btn>
                  <Btn onClick={() => callCust(job.phone)}>Call</Btn>
                </>}
              </ActRow>
            </Card>
          );
        })}
      </Section>

      {/* Weekly performance */}
      <Section title="Weekly performance">
        <Card>
          {PERF_ROWS.map(([label, val, target, pct]) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13 }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{val} <span style={{ fontWeight: 400, color: 'var(--color-text-tertiary, #999)' }}>/ {target}</span></span>
              </div>
              <div style={{ background: 'var(--color-background-secondary, #f8f8f8)', borderRadius: 999, height: 6 }}>
                <div style={{ width: `${pct}%`, height: 6, borderRadius: 999, background: '#185FA5' }} />
              </div>
            </div>
          ))}
        </Card>
      </Section>

      {/* Weekly chart */}
      <Section title="Weekly earnings trend">
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 72 }}>
            {WEEKLY_DATA.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', borderRadius: '3px 3px 0 0', height: Math.round(v / max * 56), background: i === 6 ? '#185FA5' : 'var(--color-background-secondary, #f8f8f8)' }} />
                <span style={{ fontSize: 10, color: 'var(--color-text-tertiary, #999)' }}>{WEEKLY_DAYS[i]}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
}

function JobsTab({ statuses, setStatuses }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? INITIAL_BOOKINGS : INITIAL_BOOKINGS.filter(b => statuses[b.id] === filter);

  function doAction(action, id) {
    setStatuses(prev => ({ ...prev, [id]: action === 'accept' ? 'Accepted' : action === 'reject' ? 'Cancelled' : 'Completed' }));
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 7, marginBottom: 14, overflowX: 'auto', paddingBottom: 4 }}>
        {JOB_FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 12px', borderRadius: 999, border: '0.5px solid', borderColor: filter === f ? 'transparent' : 'rgba(0,0,0,0.1)', background: filter === f ? '#E6F1FB' : 'var(--color-background-primary, #fff)', color: filter === f ? '#0C447C' : 'var(--color-text-secondary, #666)', cursor: 'pointer', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--color-text-tertiary, #999)', fontSize: 13 }}>No jobs in this category</div>}

      {filtered.map(job => {
        const s = statuses[job.id];
        return (
          <Card key={job.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Avi ini={job.ini} size={34} />
                <div>
                  <div style={jt}>{job.service}</div>
                  <div style={jm}>{job.customer}</div>
                  <div style={jm}>{job.addr} · {job.time}</div>
                  <div style={jm}>{job.day === 'today' ? 'Today' : 'Yesterday'}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge status={s} />
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6 }}>₹{job.amount}</div>
              </div>
            </div>
            <ActRow>
              {s === 'Pending' && <>
                <Btn variant="blue" onClick={() => doAction('accept', job.id)}>Accept</Btn>
                <Btn variant="red" onClick={() => doAction('reject', job.id)}>Reject</Btn>
              </>}
              {s === 'Accepted' && <Btn variant="green" onClick={() => doAction('complete', job.id)}>Mark complete</Btn>}
              {(s === 'Accepted' || s === 'Ongoing') && <Btn onClick={() => navTo(job.addr)}>Navigate ↗</Btn>}
              {(s === 'Accepted' || s === 'Ongoing' || s === 'Completed') && <Btn onClick={() => callCust(job.phone)}>Call</Btn>}
            </ActRow>
          </Card>
        );
      })}
    </div>
  );
}

function MapTab() {
  const [selId, setSelId] = useState(null);
  const sel = NEARBY_JOBS.find(n => n.id === selId);

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary, #666)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Nearby requests ({NEARBY_JOBS.length})
      </div>

      {/* SVG Map */}
      <div style={{ height: 200, background: '#f0f4f8', borderRadius: 12, marginBottom: 12, position: 'relative', overflow: 'hidden', border: '0.5px solid rgba(0,0,0,0.1)' }}>
        <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%' }}>
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M10 0L0 0 0 10" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100" height="80" fill="#f0f4f8" />
          <rect width="100" height="80" fill="url(#grid)" />
          <ellipse cx="50" cy="55" rx="38" ry="18" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.6" />
          <path d="M20,20 Q45,8 75,22 Q92,38 78,62 Q55,78 25,65 Q4,50 20,20" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
          <path d="M30,14 L35,28 L55,40 L60,58 L76,62" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
          <path d="M14,42 L38,38 L55,40 L72,42 L86,46" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
          {sel && <line x1="55" y1="40" x2={sel.x} y2={sel.y} stroke="#185FA5" strokeWidth="0.8" strokeDasharray="2,1.5" />}
          {NEARBY_JOBS.map((j, i) => {
            const isSel = selId === j.id;
            return (
              <g key={j.id} onClick={() => setSelId(isSel ? null : j.id)} style={{ cursor: 'pointer' }}>
                <circle cx={j.x} cy={j.y} r={isSel ? 5 : 3.8} fill={isSel ? '#185FA5' : '#854F0B'} stroke={isSel ? '#0C447C' : '#633806'} strokeWidth="0.8" />
                <text x={j.x} y={j.y + 1.3} textAnchor="middle" fontSize="3" fill={isSel ? '#E6F1FB' : '#FAEEDA'} fontWeight="500">{i + 1}</text>
              </g>
            );
          })}
          <circle cx="55" cy="40" r="3.5" fill="#185FA5" stroke="#0C447C" strokeWidth="0.8" />
          <text x="55" y="41.5" textAnchor="middle" fontSize="2.8" fill="#E6F1FB" fontWeight="500">You</text>
        </svg>
        <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 10, color: '#666', background: 'rgba(255,255,255,0.9)', padding: '3px 7px', borderRadius: 999 }}>Bangalore</div>
      </div>

      {NEARBY_JOBS.map((job, i) => {
        const isSel = selId === job.id;
        return (
          <Card key={job.id} selected={isSel} onClick={() => setSelId(isSel ? null : job.id)} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#FAEEDA', color: '#633806', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{i + 1}</div>
                <div>
                  <div style={jt}>{job.service}</div>
                  <div style={jm}>{job.customer} · {job.addr}</div>
                  <div style={{ ...jm, color: '#0C447C' }}>{job.dist} km · ~{job.eta} min ETA</div>
                  {isSel && <div style={{ ...jm, marginTop: 3 }}>{job.desc}</div>}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>₹{job.amount}</div>
                <ActRow style={{ justifyContent: 'flex-end', marginTop: 6 }}>
                  <Btn variant="green" small onClick={e => { e.stopPropagation(); alert(`Job accepted: ${job.service} at ${job.addr}`); navTo(job.addr); }}>Accept</Btn>
                  <Btn small onClick={e => { e.stopPropagation(); navTo(job.addr); }}>Nav ↗</Btn>
                </ActRow>
              </div>
            </div>
            {isSel && (
              <div style={{ marginTop: 9, padding: '9px 12px', background: '#E6F1FB', borderRadius: 8, fontSize: 12, color: '#0C447C' }}>
                Route: ~{Math.round(job.dist * 1.35 * 10) / 10} km via main road · Est. ₹{Math.round(job.dist * 12)} fare
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function ChatTab() {
  const [msgs, setMsgs] = useState(INITIAL_MESSAGES);
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [curChat, setCurChat] = useState(null);
  const [input, setInput] = useState('');

  const openChat = id => {
    setCurChat(id);
    setMsgs(prev => prev.map(m => m.id === id ? { ...m, unread: 0 } : m));
  };

  const sendMsg = useCallback(text => {
    const t = text || input.trim();
    if (!t) return;
    setThreads(prev => ({ ...prev, [curChat]: [...(prev[curChat] || []), { from: 'm', text: t }] }));
    if (!text) setInput('');
    setTimeout(() => {
      const el = document.getElementById('msgs-scroll');
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }, [curChat, input]);

  if (curChat !== null) {
    const conv = msgs.find(m => m.id === curChat);
    const thread = threads[curChat] || [];
    return (
      <div>
        <div onClick={() => setCurChat(null)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-secondary, #666)', cursor: 'pointer', marginBottom: 14, padding: '6px 0' }}>
          ← Back to messages
        </div>
        <div style={{ border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '11px 14px', background: 'var(--color-background-secondary, #f8f8f8)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <Avi ini={conv.ini} size={32} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{conv.name}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-secondary, #666)' }}>Active job</div>
              </div>
            </div>
            <Btn variant="green" onClick={() => callCust('')}>Call</Btn>
          </div>
          <div id="msgs-scroll" style={{ padding: 12, height: 180, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--color-background-primary, #fff)' }}>
            {thread.map((m, i) => (
              <div key={i} style={{ padding: '8px 12px', borderRadius: 12, fontSize: 13, maxWidth: '78%', wordBreak: 'break-word', alignSelf: m.from === 'm' ? 'flex-end' : 'flex-start', background: m.from === 'm' ? '#E6F1FB' : 'var(--color-background-secondary, #f8f8f8)', color: m.from === 'm' ? '#0C447C' : 'inherit' }}>
                {m.text}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, padding: '8px 12px', overflowX: 'auto', borderTop: '0.5px solid rgba(0,0,0,0.1)', background: 'var(--color-background-primary, #fff)' }}>
            {QUICK_REPLIES.map(q => (
              <button key={q} onClick={() => sendMsg(q)} style={{ padding: '5px 10px', borderRadius: 999, border: '0.5px solid rgba(0,0,0,0.15)', fontSize: 11, background: 'var(--color-background-primary, #fff)', cursor: 'pointer', whiteSpace: 'nowrap', color: 'var(--color-text-secondary, #666)' }}>
                {q}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderTop: '0.5px solid rgba(0,0,0,0.1)', background: 'var(--color-background-primary, #fff)' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder="Type a message..."
              style={{ flex: 1, padding: '8px 12px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: 999, fontSize: 13, background: 'var(--color-background-secondary, #f8f8f8)', color: 'var(--color-text-primary, #111)', outline: 'none' }}
            />
            <Btn variant="blue" onClick={() => sendMsg()}>Send</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Section title="Messages">
      <Card style={{ padding: '4px 13px' }}>
        {msgs.map(m => (
          <div key={m.id} onClick={() => openChat(m.id)} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 0', borderBottom: '0.5px solid rgba(0,0,0,0.07)', cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-background-secondary, #f8f8f8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary, #666)', flexShrink: 0 }}>{m.ini}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{m.name}</span>
                <span style={{ fontSize: 11, color: 'var(--color-text-tertiary, #999)' }}>{m.time}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary, #666)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>{m.preview}</div>
            </div>
            {m.unread > 0 && (
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#E6F1FB', color: '#0C447C', fontSize: 10, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{m.unread}</div>
            )}
          </div>
        ))}
      </Card>
    </Section>
  );
}

function EarnTab() {
  const max = Math.max(...WEEKLY_DATA);
  return (
    <div>
      <Section title="">
        <div style={g2}>
          <MetricCard label="Today" value={`₹${PROVIDER.todayEarnings.toLocaleString()}`} />
          <MetricCard label="This week" value="₹18.4k" />
          <MetricCard label="This month" value="₹67.2k" />
          <MetricCard label="Pending" value={`₹${PROVIDER.pendingPayment.toLocaleString()}`} valueColor="#854F0B" />
        </div>
      </Section>
      <Section title="Weekly trend">
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 72 }}>
            {WEEKLY_DATA.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', borderRadius: '3px 3px 0 0', height: Math.round(v / max * 56), background: i === 6 ? '#185FA5' : 'var(--color-background-secondary, #f8f8f8)' }} />
                <span style={{ fontSize: 10, color: 'var(--color-text-tertiary, #999)' }}>{WEEKLY_DAYS[i]}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>
      <Section title="Payout history">
        <Card style={{ padding: '4px 13px' }}>
          {WITHDRAWALS.map(w => (
            <div key={w.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>₹{w.amount.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary, #666)', marginTop: 2 }}>{w.date} · {w.method}</div>
              </div>
              <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: '#EAF3DE', color: '#27500A' }}>Paid</span>
            </div>
          ))}
        </Card>
        <Btn variant="blue" style={{ width: '100%', padding: 10, fontSize: 13, marginTop: 10 }} onClick={() => alert('Withdrawal request submitted!')}>
          Request withdrawal
        </Btn>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-text-tertiary, #999)', marginTop: 7 }}>Processed within 24 hours</div>
      </Section>
      <Section title="Lifetime">
        <div style={{ background: 'var(--color-background-secondary, #f8f8f8)', borderRadius: 8, padding: '14px' }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary, #999)', marginBottom: 4 }}>Total earnings</div>
          <div style={{ fontSize: 26, fontWeight: 500 }}>₹{PROVIDER.totalEarnings.toLocaleString()}</div>
        </div>
      </Section>
    </div>
  );
}

function ProfileTab() {
  const total = REVIEWS.length;
  const ratingDist = [180, 45, 12, 5, 3];
  return (
    <div>
      <Section title="">
        <Card>
          <div style={{ textAlign: 'center', paddingBottom: 16, borderBottom: '0.5px solid rgba(0,0,0,0.08)', marginBottom: 14 }}>
            <div style={{ width: 62, height: 62, borderRadius: '50%', background: '#E6F1FB', color: '#0C447C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 500, margin: '0 auto 10px' }}>AS</div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>{PROVIDER.name}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary, #666)', marginTop: 3 }}>{PROVIDER.specialty} · {PROVIDER.experience} years experience</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 10 }}>
              {[[PROVIDER.rating, 'Rating'], [PROVIDER.reviews, 'Reviews'], [PROVIDER.completedJobs, 'Jobs']].map(([v, l], i) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  {i > 0 && <div style={{ width: '0.5px', height: 28, background: 'rgba(0,0,0,0.1)' }} />}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 500 }}>{v}</div>
                    <div style={{ fontSize: 10, color: 'var(--color-text-tertiary, #999)', marginTop: 1 }}>{l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary, #666)', marginBottom: 8 }}>Rating breakdown</div>
            {[5, 4, 3, 2, 1].map((r, i) => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary, #666)', width: 14, textAlign: 'right', flexShrink: 0 }}>{r}</span>
                <div style={{ flex: 1, background: 'var(--color-background-secondary, #f8f8f8)', borderRadius: 999, height: 6 }}>
                  <div style={{ width: `${Math.round(ratingDist[i] / 245 * 100)}%`, height: 6, borderRadius: 999, background: '#185FA5' }} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--color-text-tertiary, #999)', width: 22, flexShrink: 0 }}>{ratingDist[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary, #666)', marginBottom: 8 }}>Verification</div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {['PAN ✓', 'Aadhaar ✓', 'KYC verified', 'Background ✓'].map(v => (
              <span key={v} style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: '#EAF3DE', color: '#27500A' }}>{v}</span>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Recent reviews">
        {REVIEWS.slice(0, 3).map((r, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avi ini={r.ini} size={30} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</span>
              </div>
              <div>
                <span style={{ color: '#f59e0b', fontSize: 13 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <span style={{ fontSize: 11, color: 'var(--color-text-tertiary, #999)', marginLeft: 5 }}>{r.date}</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary, #666)' }}>{r.comment}</div>
          </Card>
        ))}
      </Section>

      <Section title="Settings">
        <Card style={{ padding: '0 13px' }}>
          {SETTINGS_ROWS.map(([label, sub]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '0.5px solid rgba(0,0,0,0.07)', cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: 14 }}>{label}</div>
                {sub && <div style={{ fontSize: 11, color: 'var(--color-text-tertiary, #999)', marginTop: 2 }}>{sub}</div>}
              </div>
              <span style={{ fontSize: 16, color: 'var(--color-text-tertiary, #999)' }}>›</span>
            </div>
          ))}
        </Card>
      </Section>
    </div>
  );
}

// ─── Shared UI Primitives ─────────────────────────────────────────────────────

const g2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 };
const jt = { fontSize: 14, fontWeight: 500 };
const jm = { fontSize: 12, color: 'var(--color-text-secondary, #666)', marginTop: 2 };

const BTN_VARIANTS = {
  default: { border: '0.5px solid rgba(0,0,0,0.15)', background: 'var(--color-background-primary, #fff)', color: 'var(--color-text-primary, #111)' },
  blue:    { border: 'none', background: '#E6F1FB', color: '#0C447C' },
  green:   { border: 'none', background: '#EAF3DE', color: '#27500A' },
  red:     { border: 'none', background: '#FCEBEB', color: '#791F1F' },
  amber:   { border: 'none', background: '#FAEEDA', color: '#633806' },
};

function Btn({ children, variant = 'default', small = false, style = {}, onClick }) {
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.default;
  return (
    <button onClick={onClick} style={{ ...v, borderRadius: 8, padding: small ? '5px 9px' : '7px 12px', cursor: 'pointer', fontSize: small ? 11 : 12, fontWeight: 500, ...style }}>
      {children}
    </button>
  );
}

function ActRow({ children, style = {} }) {
  return <div style={{ display: 'flex', gap: 7, marginTop: 10, flexWrap: 'wrap', ...style }}>{children}</div>;
}

function Card({ children, selected = false, onClick, style = {} }) {
  return (
    <div onClick={onClick} style={{ background: 'var(--color-background-primary, #fff)', border: selected ? '1.5px solid #185FA5' : '0.5px solid rgba(0,0,0,0.1)', borderRadius: 12, padding: 13, marginBottom: 9, ...style }}>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {title && <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary, #666)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</div>}
      {children}
    </div>
  );
}

function MetricCard({ label, value, valueColor }) {
  return (
    <div style={{ background: 'var(--color-background-secondary, #f8f8f8)', borderRadius: 8, padding: '12px 14px' }}>
      <div style={{ fontSize: 11, color: 'var(--color-text-tertiary, #999)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 500, color: valueColor || 'var(--color-text-primary, #111)' }}>{value}</div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'home', icon: '⌂', label: 'Home' },
  { id: 'jobs', icon: '📋', label: 'Jobs' },
  { id: 'map',  icon: '◎', label: 'Map' },
  { id: 'chat', icon: '💬', label: 'Chat' },
  { id: 'earn', icon: '₹', label: 'Earn' },
  { id: 'prof', icon: '◉', label: 'Profile' },
];

export default function ProviderDashboard() {
  const [tab, setTab] = useState('home');
  const [isOnline, setIsOnline] = useState(true);
  const [statuses, setStatuses] = useState(() => {
    const s = {};
    INITIAL_BOOKINGS.forEach(b => { s[b.id] = b.status; });
    return s;
  });

  const screens = {
    home: <HomeTab statuses={statuses} setStatuses={setStatuses} />,
    jobs: <JobsTab statuses={statuses} setStatuses={setStatuses} />,
    map:  <MapTab />,
    chat: <ChatTab />,
    earn: <EarnTab />,
    prof: <ProfileTab />,
  };

  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--color-background-primary, #fff)', color: 'var(--color-text-primary, #111)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.1)', flexShrink: 0, background: 'var(--color-background-primary, #fff)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avi ini="AS" size={36} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{PROVIDER.name}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary, #666)', marginTop: 1 }}>{PROVIDER.specialty} · {PROVIDER.city}</div>
          </div>
        </div>
        <button onClick={() => setIsOnline(p => !p)} style={{ padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer', background: isOnline ? '#EAF3DE' : '#F1EFE8', color: isOnline ? '#27500A' : '#5F5E5A' }}>
          {isOnline ? '● Online' : '○ Offline'}
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 0' }}>
        {screens[tab]}
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', borderTop: '0.5px solid rgba(0,0,0,0.1)', background: 'var(--color-background-primary, #fff)', flexShrink: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '9px 2px 7px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, borderTop: tab === t.id ? '2px solid #185FA5' : '2px solid transparent', color: tab === t.id ? '#0C447C' : 'var(--color-text-tertiary, #999)', fontSize: 10, fontWeight: 500, transition: 'color 0.1s' }}>
            <span style={{ fontSize: 17, lineHeight: 1 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}