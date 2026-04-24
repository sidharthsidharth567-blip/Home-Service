import { useState, useMemo } from 'react';

// Dummy data for provider availability
const dummyProvider = {
  id: 1,
  name: 'Amit Sharma',
  specialty: 'Plumbing',
  currentStatus: 'online', // 'online', 'offline', 'busy'
  workingHours: {
    monday: { enabled: true, start: '09:00', end: '18:00' },
    tuesday: { enabled: true, start: '09:00', end: '18:00' },
    wednesday: { enabled: true, start: '09:00', end: '18:00' },
    thursday: { enabled: true, start: '09:00', end: '18:00' },
    friday: { enabled: true, start: '09:00', end: '18:00' },
    saturday: { enabled: true, start: '09:00', end: '16:00' },
    sunday: { enabled: false, start: '09:00', end: '18:00' },
  },
  timeSlots: [
    { id: 1, label: '9:00 AM - 11:00 AM', enabled: true },
    { id: 2, label: '11:00 AM - 1:00 PM', enabled: true },
    { id: 3, label: '2:00 PM - 4:00 PM', enabled: true },
    { id: 4, label: '4:00 PM - 6:00 PM', enabled: true },
  ],
  serviceAreas: [
    { name: 'Rajajinagar', radius: 5, enabled: true },
    { name: 'Koramangala', radius: 8, enabled: true },
    { name: 'Indiranagar', radius: 6, enabled: true },
    { name: 'Whitefield', radius: 10, enabled: false },
  ],
  smartSettings: {
    autoOffline: { enabled: true, inactiveMinutes: 30 },
    bufferTime: 15, // minutes between jobs
    maxJobsPerDay: 8,
    maxJobsPerHour: 2,
    emergencyPause: false,
  },
  blockedDates: ['2026-04-15', '2026-04-16'], // vacation dates
  specialDates: ['2026-04-20'], // extra working days
};

const styles = {
  page: {
    fontFamily: 'Inter, system-ui, sans-serif',
    minHeight: '100vh',
    background: '#f8fafc',
    color: '#111827',
    padding: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
  },
  subtitle: {
    margin: '8px 0 0',
    maxWidth: 640,
    lineHeight: 1.6,
    color: '#4b5563',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    margin: '0 0 16px',
    fontSize: 20,
    fontWeight: 700,
  },
  card: {
    background: '#ffffff',
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
  },
  statusCard: {
    background: '#ffffff',
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    padding: 20,
    marginBottom: 16,
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
    borderLeft: '4px solid #10b981',
  },
  badge: (bg, color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background: bg,
    color,
  }),
  button: (bg, color) => ({
    border: 'none',
    borderRadius: 12,
    padding: '12px 18px',
    background: bg,
    color,
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 14,
  }),
  toggle: (on) => ({
    width: 52,
    height: 28,
    borderRadius: 999,
    background: on ? '#10b981' : '#d1d5db',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background 0.25s',
  }),
  toggleThumb: (on) => ({
    position: 'absolute',
    top: 3,
    left: on ? 26 : 3,
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: '#fff',
    transition: 'left 0.25s',
    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
  }),
  input: {
    border: '1px solid #d1d5db',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
    width: '100%',
    boxSizing: 'border-box',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 16,
  },
  dayRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  timeInput: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  slotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 12,
  },
  areaCard: {
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    background: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emergencyCard: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
};

function Toggle({ value, onChange, disabled }) {
  return (
    <div
      style={{ ...styles.toggle(value), opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
      onClick={() => !disabled && onChange(!value)}
    >
      <div style={styles.toggleThumb(value)} />
    </div>
  );
}

function ProviderAvailability() {
  const [provider, setProvider] = useState(dummyProvider);
  const [emergencyPause, setEmergencyPause] = useState(false);

  const updateWorkingHours = (day, field, value) => {
    setProvider(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: { ...prev.workingHours[day], [field]: value }
      }
    }));
  };

  const toggleDay = (day) => {
    setProvider(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: { ...prev.workingHours[day], enabled: !prev.workingHours[day].enabled }
      }
    }));
  };

  const toggleTimeSlot = (slotId) => {
    setProvider(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.map(slot =>
        slot.id === slotId ? { ...slot, enabled: !slot.enabled } : slot
      )
    }));
  };

  const toggleServiceArea = (areaName) => {
    setProvider(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.map(area =>
        area.name === areaName ? { ...area, enabled: !area.enabled } : area
      )
    }));
  };

  const updateSmartSetting = (key, value) => {
    setProvider(prev => ({
      ...prev,
      smartSettings: { ...prev.smartSettings, [key]: value }
    }));
  };

  const statusColor = {
    online: '#10b981',
    offline: '#6b7280',
    busy: '#f59e0b'
  };

  const statusText = {
    online: 'Available for new bookings',
    offline: 'Not accepting new bookings',
    busy: 'Currently busy, limited availability'
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Provider Availability</h1>
          <p style={styles.subtitle}>
            Control your online status, working hours, service areas, and smart scheduling features with dummy data for complete availability management.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={styles.badge(statusColor[provider.currentStatus], '#ffffff')}>
            {provider.currentStatus.toUpperCase()}
          </span>
          <span style={{ fontSize: 12, color: '#6b7280' }}>
            {statusText[provider.currentStatus]}
          </span>
        </div>
      </header>

      {/* Emergency Controls */}
      <div style={styles.emergencyCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#dc2626' }}>Emergency Pause</h3>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: '#7f1d1d' }}>
              Temporarily stop all new bookings for urgent situations
            </p>
          </div>
          <Toggle
            value={emergencyPause}
            onChange={setEmergencyPause}
          />
        </div>
      </div>

      {/* Basic Availability */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Basic Availability</h2>

        <div style={styles.statusCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Online Status</h3>
              <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: 14 }}>
                Control your availability for new bookings
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {emergencyPause ? 'Emergency Pause' : provider.currentStatus === 'online' ? 'Available' : 'Not Available'}
              </span>
              <Toggle
                value={provider.currentStatus === 'online' && !emergencyPause}
                onChange={(val) => setProvider(prev => ({ ...prev, currentStatus: val ? 'online' : 'offline' }))}
                disabled={emergencyPause}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              style={styles.button(provider.currentStatus === 'online' ? '#10b981' : '#f3f4f6', provider.currentStatus === 'online' ? '#ffffff' : '#374151')}
              onClick={() => setProvider(prev => ({ ...prev, currentStatus: 'online' }))}
              disabled={emergencyPause}
            >
              🟢 Online
            </button>
            <button
              style={styles.button(provider.currentStatus === 'busy' ? '#f59e0b' : '#f3f4f6', provider.currentStatus === 'busy' ? '#ffffff' : '#374151')}
              onClick={() => setProvider(prev => ({ ...prev, currentStatus: 'busy' }))}
              disabled={emergencyPause}
            >
              🟡 Busy
            </button>
            <button
              style={styles.button(provider.currentStatus === 'offline' ? '#6b7280' : '#f3f4f6', provider.currentStatus === 'offline' ? '#ffffff' : '#374151')}
              onClick={() => setProvider(prev => ({ ...prev, currentStatus: 'offline' }))}
              disabled={emergencyPause}
            >
              ⚫ Offline
            </button>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>Working Hours</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {Object.entries(provider.workingHours).map(([day, config]) => (
              <div key={day} style={styles.dayRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Toggle value={config.enabled} onChange={() => toggleDay(day)} />
                  <span style={{ fontWeight: 600, textTransform: 'capitalize', minWidth: 80 }}>
                    {day}
                  </span>
                </div>
                <div style={styles.timeInput}>
                  <input
                    type="time"
                    value={config.start}
                    onChange={(e) => updateWorkingHours(day, 'start', e.target.value)}
                    disabled={!config.enabled}
                    style={{ ...styles.input, width: 120, opacity: config.enabled ? 1 : 0.5 }}
                  />
                  <span style={{ color: '#6b7280' }}>to</span>
                  <input
                    type="time"
                    value={config.end}
                    onChange={(e) => updateWorkingHours(day, 'end', e.target.value)}
                    disabled={!config.enabled}
                    style={{ ...styles.input, width: 120, opacity: config.enabled ? 1 : 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Scheduling */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Advanced Scheduling</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>Time Slots</h3>
            <div style={styles.slotGrid}>
              {provider.timeSlots.map(slot => (
                <div key={slot.id} style={styles.areaCard}>
                  <span style={{ fontWeight: 600 }}>{slot.label}</span>
                  <Toggle value={slot.enabled} onChange={() => toggleTimeSlot(slot.id)} />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>Custom Dates</h3>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Blocked Dates (Vacation/Leave)
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {provider.blockedDates.map(date => (
                  <span key={date} style={styles.badge('#ef4444', '#ffffff')}>
                    {new Date(date).toLocaleDateString()} ✕
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Special Working Days
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {provider.specialDates.map(date => (
                  <span key={date} style={styles.badge('#10b981', '#ffffff')}>
                    {new Date(date).toLocaleDateString()} ✓
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location-based Availability */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Service Areas</h2>
        <div style={styles.card}>
          <p style={{ margin: '0 0 16px', color: '#6b7280', fontSize: 14 }}>
            Select areas where you provide services. Bookings outside these areas will be auto-rejected.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {provider.serviceAreas.map(area => (
              <div key={area.name} style={styles.areaCard}>
                <div>
                  <span style={{ fontWeight: 600 }}>{area.name}</span>
                  <span style={{ marginLeft: 8, fontSize: 12, color: '#6b7280' }}>
                    {area.radius} km radius
                  </span>
                </div>
                <Toggle value={area.enabled} onChange={() => toggleServiceArea(area.name)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Features */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Smart Features</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>Auto Offline</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 14 }}>Enable auto offline when inactive</span>
              <Toggle
                value={provider.smartSettings.autoOffline.enabled}
                onChange={(val) => updateSmartSetting('autoOffline', { ...provider.smartSettings.autoOffline, enabled: val })}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>Inactive for</label>
              <input
                type="number"
                value={provider.smartSettings.autoOffline.inactiveMinutes}
                onChange={(e) => updateSmartSetting('autoOffline', { ...provider.smartSettings.autoOffline, inactiveMinutes: parseInt(e.target.value) })}
                disabled={!provider.smartSettings.autoOffline.enabled}
                style={{ ...styles.input, width: 80, opacity: provider.smartSettings.autoOffline.enabled ? 1 : 0.5 }}
              />
              <span style={{ fontSize: 14, color: '#6b7280' }}>minutes</span>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>Job Limits</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600, minWidth: 120 }}>Max jobs per day</label>
                <input
                  type="number"
                  value={provider.smartSettings.maxJobsPerDay}
                  onChange={(e) => updateSmartSetting('maxJobsPerDay', parseInt(e.target.value))}
                  style={{ ...styles.input, width: 80 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600, minWidth: 120 }}>Max jobs per hour</label>
                <input
                  type="number"
                  value={provider.smartSettings.maxJobsPerHour}
                  onChange={(e) => updateSmartSetting('maxJobsPerHour', parseInt(e.target.value))}
                  style={{ ...styles.input, width: 80 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ fontSize: 14, fontWeight: 600, minWidth: 120 }}>Buffer time</label>
                <input
                  type="number"
                  value={provider.smartSettings.bufferTime}
                  onChange={(e) => updateSmartSetting('bufferTime', parseInt(e.target.value))}
                  style={{ ...styles.input, width: 80 }}
                />
                <span style={{ fontSize: 14, color: '#6b7280' }}>minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>Peak Time Suggestions</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ padding: 12, background: '#eff6ff', borderRadius: 8, border: '1px solid #dbeafe' }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e40af' }}>
                📈 High demand: 2:00 PM - 4:00 PM (Mon-Fri)
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#3730a3' }}>
                40% higher earnings potential during peak hours
              </p>
            </div>
            <div style={{ padding: 12, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#166534' }}>
                💡 Suggestion: Enable Saturday slots for 25% extra income
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProviderAvailability;
