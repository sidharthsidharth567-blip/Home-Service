import { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CreditCard, 
  Search, 
  Filter, 
  ArrowLeft,
  Wrench,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileSearch,
  Map
} from 'lucide-react';
import { useLanguage } from '../components/Advanced Modules/LanguageSupport';

const FILTERS = ['All', 'Ongoing', 'Completed', 'Cancelled'];

function Bookings({ onBack, bookings = [], onTrack, onViewDocumentation }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [hoveredChip, setHoveredChip] = useState(null);
  const [hoveredBookingId, setHoveredBookingId] = useState(null);
  const [hoveredBack, setHoveredBack] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredBookings = useMemo(() => {
    let result = filter === 'All' ? bookings : bookings.filter(b => b.status === filter);
    if (searchQuery) {
      result = result.filter(b => 
        b.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.technician.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [bookings, filter, searchQuery]);

  const StatusIcon = ({ status }) => {
    switch (status.toLowerCase()) {
      case 'ongoing': return <Clock size={14} />;
      case 'completed': return <CheckCircle size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing': return { bg: '#fef3c7', text: '#92400e' };
      case 'completed': return { bg: '#dcfce7', text: '#166534' };
      case 'cancelled': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: 'var(--bg-light)', text: 'var(--text-gray)' };
    }
  };

  const isMobile = winWidth <= 768;
  const isCompact = winWidth <= 480;

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: isMobile ? '24px auto' : '40px auto', 
      padding: isCompact ? '0 12px' : (isMobile ? '0 16px' : '0 24px'),
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '40px', 
        gap: '20px', 
        flexWrap: 'wrap' 
      }}>
        <div style={{ textAlign: 'left' }}>
          {onBack && (
            <button 
              onMouseEnter={() => setHoveredBack(true)}
              onMouseLeave={() => setHoveredBack(false)}
              onClick={onBack}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontSize: '14px', 
                fontWeight: 600, 
                marginBottom: '16px',
                padding: 0,
                transform: hoveredBack ? 'translateX(-4px)' : 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} /> {t.home || 'Back to Home'}
            </button>
          )}
          <h1 style={{ fontSize: isMobile ? '28px' : '32px', color: 'var(--text-dark)', marginBottom: '8px', fontFamily: "'Outfit', sans-serif" }}>{t.bookings || 'My Bookings'}</h1>
          <p style={{ color: 'var(--text-gray)', fontSize: isMobile ? '15px' : '16px' }}>Manage and track all your service requests in one place.</p>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px', 
        gap: '16px', 
        flexWrap: 'wrap' 
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {FILTERS.map(f => {
            const isActive = filter === f;
            const isHovered = hoveredChip === f;
            return (
              <button
                key={f}
                type="button"
                onMouseEnter={() => setHoveredChip(f)}
                onMouseLeave={() => setHoveredChip(null)}
                onClick={() => setFilter(f)}
                style={{ 
                  padding: '8px 16px', 
                  borderRadius: '100px', 
                  border: `1px solid ${isActive ? 'var(--primary)' : (isHovered ? 'var(--primary)' : 'var(--border)')}`, 
                  background: isActive ? 'var(--primary)' : 'var(--bg-white)', 
                  color: isActive ? 'white' : (isHovered ? 'var(--primary)' : 'var(--text-gray)'), 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 12px rgba(226, 55, 68, 0.2)' : 'none',
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-light)' }} />
          <input 
            type="text" 
            placeholder="Search by ID or service..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              padding: '10px 16px 10px 40px', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border)',
              fontSize: '14px',
              width: isMobile ? '100%' : '260px',
              outline: 'none',
              background: 'var(--bg-white)',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
      </div>

      {filteredBookings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredBookings.map((b) => {
            const isHovered = hoveredBookingId === b.id;
            const statusStyle = getStatusColor(b.status);
            return (
              <div 
                key={b.id} 
                onMouseEnter={() => setHoveredBookingId(b.id)}
                onMouseLeave={() => setHoveredBookingId(null)}
                style={{ 
                  background: 'var(--bg-white)', 
                  borderRadius: 'var(--radius-lg)', 
                  border: `1px solid ${isHovered ? 'var(--secondary)' : 'var(--border)'}`, 
                  padding: isCompact ? '18px' : '24px', 
                  boxShadow: isHovered ? 'var(--shadow-md)' : 'var(--shadow-sm)', 
                  transition: 'all 0.3s', 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr auto', 
                  gap: '24px', 
                  alignItems: 'center',
                  transform: isHovered ? 'translateY(-2px)' : 'none',
                  textAlign: isMobile ? 'center' : 'left'
                }}
              >
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'var(--primary-soft)', 
                  color: 'var(--primary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: isMobile ? '0 auto' : '0'
                }}>
                  <Wrench size={32} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)', margin: 0, fontFamily: "'Outfit', sans-serif" }}>{b.service}</h3>
                    <span style={{ fontSize: 12, color: 'var(--text-light)', background: 'var(--bg-light)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {b.id}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-gray)' }}>{b.subService}</div>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: isMobile ? '12px' : '20px', 
                    marginTop: '12px', 
                    flexWrap: 'wrap',
                    justifyContent: isMobile ? 'center' : 'flex-start'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-light)' }}>
                      <Calendar size={14} />
                      <span>{b.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-light)' }}>
                      <Clock size={14} />
                      <span>{b.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-light)' }}>
                      <MapPin size={14} />
                      <span style={{ wordBreak: 'break-word' }}>{b.address}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-light)' }}>
                      <User size={14} />
                      <span style={{ wordBreak: 'break-word' }}>Technician: <strong style={{ color: 'var(--text-gray)' }}>{b.technician}</strong></span>
                    </div>
                  </div>

                  {b.description && (
                    <div style={{ 
                      marginTop: '16px', 
                      padding: '12px 16px', 
                      background: '#fcfcfc', 
                      borderRadius: '8px', 
                      border: '1px solid #f0f0f0',
                      borderLeft: '3px solid var(--primary)',
                      fontSize: '13px', 
                      color: 'var(--text-gray)',
                      fontStyle: 'italic',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {b.description.includes('\n') ? b.description : `"${b.description}"`}
                    </div>
                  )}
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: isMobile ? 'center' : 'flex-end', 
                  gap: '12px',
                  borderTop: isMobile ? '1px solid var(--border)' : 'none',
                  paddingTop: isMobile ? '20px' : '0'
                }}>
                  <div style={{ 
                    padding: '6px 16px', 
                    borderRadius: '100px', 
                    fontSize: '12px', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    background: statusStyle.bg,
                    color: statusStyle.text
                  }}>
                    <StatusIcon status={b.status} />
                    <span>{b.status}</span>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)' }}>{b.price}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-light)' }}>
                    <CreditCard size={14} />
                    <span>{b.paymentMethod}</span>
                  </div>
                  {b.status === 'Ongoing' && b.eta && (
                    <>
                      <div style={{ fontSize: 12, color: '#92400e', background: '#fef3c7', padding: '4px 10px', borderRadius: '4px', fontWeight: 600, marginTop: 4 }}>
                        ETA: {b.eta}
                      </div>
                      <button 
                        style={{ 
                          marginTop: '8px',
                          padding: '8px 16px',
                          background: 'var(--primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'var(--primary-hover)';
                          e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'var(--primary)';
                          e.target.style.transform = 'translateY(0)';
                        }}
                        onClick={() => onTrack && onTrack(b)}
                      >
                        <Map size={14} /> Track Service
                      </button>
                    </>
                  )}
                  {b.status === 'Completed' && (
                    <button 
                      style={{ 
                        marginTop: '8px',
                        padding: '8px 16px',
                        background: '#f8fafc',
                        color: 'var(--text-dark)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#f1f5f9';
                        e.target.style.borderColor = 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#f8fafc';
                        e.target.style.borderColor = 'var(--border)';
                      }}
                      onClick={() => onViewDocumentation && onViewDocumentation(b)}
                    >
                      <FileSearch size={14} /> View Proof
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: isCompact ? '36px 18px' : '60px', 
          background: 'var(--bg-white)', 
          borderRadius: 'var(--radius-lg)', 
          border: '1px dashed var(--border)' 
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
          <h3 style={{ fontSize: 20, color: 'var(--text-dark)', marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>No bookings found</h3>
          <p style={{ color: 'var(--text-light)' }}>
            We couldn't find any {filter === 'All' ? '' : filter.toLowerCase()} bookings matching your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default Bookings;
