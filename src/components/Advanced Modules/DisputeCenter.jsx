import React, { useState } from 'react';
import { 
  AlertOctagon, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  Filter,
  ArrowUpRight,
  ShieldAlert,
  HelpCircle,
  FileText
} from 'lucide-react';

const DisputeCenter = () => {
  const [filter, setFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      id: 'DISP-8821',
      bookingId: 'BH-4592',
      service: 'Kitchen Sink Repair',
      issue: 'Unsatisfactory Work Quality',
      description: 'The pipe started leaking again just 2 hours after the technician left.',
      status: 'In Review',
      date: 'Oct 25, 2024',
      priority: 'High',
      timeline: [
        { label: 'Dispute Filed', date: 'Oct 25, 02:30 PM', completed: true },
        { label: 'Assigned to Resolution Manager', date: 'Oct 25, 04:15 PM', completed: true },
        { label: 'Technical Inspection Scheduled', date: 'Tomorrow, 10:00 AM', completed: false }
      ]
    },
    {
      id: 'DISP-7612',
      bookingId: 'BH-3021',
      service: 'AC Servicing',
      issue: 'Incorrect Billing',
      description: 'Charged for 2 liters of gas refill, but technician only added 0.5 liters.',
      status: 'Open',
      date: 'Oct 23, 2024',
      priority: 'Medium',
      timeline: [
        { label: 'Dispute Filed', date: 'Oct 23, 11:00 AM', completed: true },
        { label: 'Awaiting Admin Approval', date: '-', completed: false }
      ]
    },
    {
      id: 'DISP-6541',
      bookingId: 'BH-1044',
      service: 'House Cleaning',
      issue: 'Missing Item',
      description: 'A small decorative vase was broken/missing after the cleaning session.',
      status: 'Resolved',
      date: 'Oct 15, 2024',
      priority: 'High',
      timeline: [
        { label: 'Dispute Filed', date: 'Oct 15, 09:00 AM', completed: true },
        { label: 'Investigated', date: 'Oct 16, 02:00 PM', completed: true },
        { label: 'Refund Processed', date: 'Oct 17, 10:00 AM', completed: true }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return { bg: '#fef3c7', text: '#92400e', icon: <Clock size={12} /> };
      case 'In Review': return { bg: '#eff6ff', text: '#1e40af', icon: <MessageSquare size={12} /> };
      case 'Resolved': return { bg: '#ecfdf5', text: '#065f46', icon: <CheckCircle2 size={12} /> };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const filteredTickets = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);

  const styles = {
    container: {
      padding: '24px',
      background: '#fff',
      borderRadius: '24px',
      fontFamily: "'Inter', sans-serif"
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '32px'
    },
    statCard: {
      padding: '20px',
      borderRadius: '20px',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    ticketList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    ticketCard: (isSelected) => ({
      padding: '20px',
      borderRadius: '20px',
      border: `1px solid ${isSelected ? '#e23744' : '#f1f5f9'}`,
      background: isSelected ? '#fef2f2' : '#fff',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }),
    badge: (statusColor) => ({
      padding: '4px 10px',
      borderRadius: '99px',
      fontSize: '11px',
      fontWeight: 700,
      background: statusColor.bg,
      color: statusColor.text,
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }),
    timeline: {
      marginTop: '24px',
      paddingLeft: '16px',
      borderLeft: '2px dashed #e2e8f0'
    },
    timelineItem: (isLast) => ({
      position: 'relative',
      paddingBottom: isLast ? 0 : '24px',
      paddingLeft: '24px'
    }),
    dot: (completed) => ({
      position: 'absolute',
      left: '-9px',
      top: '0',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: completed ? '#059669' : '#fff',
      border: `2px solid ${completed ? '#059669' : '#e2e8f0'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', margin: 0 }}>Support & Disputes</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>Manage and track your service complaints centrally.</p>
        </div>
        <button style={{ 
          padding: '12px 24px', background: '#e23744', color: '#fff', 
          border: 'none', borderRadius: '14px', fontWeight: 700, 
          display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
        }}>
          <ShieldAlert size={18} /> File a Dispute
        </button>
      </div>

      {/* Quick Stats */}
      <div style={styles.stats}>
        <div style={{ ...styles.statCard, background: '#f8fafc' }}>
          <div style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Active Tickets</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>02</div>
        </div>
        <div style={{ ...styles.statCard, background: '#f0fdf4' }}>
          <div style={{ color: '#166534', fontSize: '13px', fontWeight: 600 }}>Resolution Rate</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#166534' }}>98.4%</div>
        </div>
        <div style={{ ...styles.statCard, background: '#fef2f2' }}>
          <div style={{ color: '#991b1b', fontSize: '13px', fontWeight: 600 }}>Refunds Processed</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#991b1b' }}>₹4,250</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
        {['All', 'Open', 'In Review', 'Resolved'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setFilter(tab)}
            style={{ 
              background: 'transparent', border: 'none', padding: '8px 16px',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              color: filter === tab ? '#e23744' : '#64748b',
              borderBottom: filter === tab ? '2px solid #e23744' : 'none'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedTicket ? '1fr 1fr' : '1fr', gap: '32px' }}>
        {/* Ticket List */}
        <div style={styles.ticketList}>
          {filteredTickets.map(t => {
            const statusColor = getStatusColor(t.status);
            const isSelected = selectedTicket?.id === t.id;
            return (
              <div 
                key={t.id} 
                style={styles.ticketCard(isSelected)}
                onClick={() => setSelectedTicket(t)}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '14px', 
                    background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: t.priority === 'High' ? '#e23744' : '#64748b'
                  }}>
                    <AlertOctagon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>{t.id} • {t.bookingId}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>{t.issue}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{t.service}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <div style={styles.badge(statusColor)}>
                    {statusColor.icon}
                    {t.status}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Filed on {t.date}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Details Panel */}
        {selectedTicket && (
          <div style={{ 
            background: '#f8fafc', padding: '32px', borderRadius: '24px', 
            border: '1px solid #e2e8f0', animation: 'fadeIn 0.3s ease' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: 0 }}>Ticket Details</h3>
              <button 
                onClick={() => setSelectedTicket(null)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>

            <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>Customer Statement</div>
              <div style={{ fontSize: '15px', color: '#1e293b', lineHeight: 1.5, fontStyle: 'italic' }}>
                "{selectedTicket.description}"
              </div>
            </div>

            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
              Resolution Timeline
            </h4>
            
            <div style={styles.timeline}>
              {selectedTicket.timeline.map((step, i) => (
                <div key={i} style={styles.timelineItem(i === selectedTicket.timeline.length - 1)}>
                  <div style={styles.dot(step.completed)}>
                    {step.completed && <CheckCircle2 size={10} color="#fff" />}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: step.completed ? '#1e293b' : '#94a3b8' }}>{step.label}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{step.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
              <button style={{ 
                flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0',
                background: '#fff', fontSize: '14px', fontWeight: 700, color: '#1e293b', 
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}>
                <MessageSquare size={16} /> Contact Agent
              </button>
              <button style={{ 
                flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
                background: '#1e293b', fontSize: '14px', fontWeight: 700, color: '#fff', 
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}>
                <FileText size={16} /> View Evidence
              </button>
            </div>
          </div>
        )}
      </div>

      {!selectedTicket && (
        <div style={{ 
          marginTop: '32px', padding: '32px', background: '#f8fafc', 
          borderRadius: '24px', textAlign: 'center', border: '1px dashed #e2e8f0' 
        }}>
          <HelpCircle size={40} color="#cbd5e1" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Need help with a booking?</h3>
          <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '400px', margin: '0 auto 24px' }}>
            Our resolution team is available 24/7 to help with quality issues, pricing disputes, or technician behavior.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
             <button style={{ background: 'transparent', border: 'none', color: '#e23744', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Search FAQs</button>
             <button style={{ background: 'transparent', border: 'none', color: '#e23744', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Call Resolution Desk</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeCenter;
