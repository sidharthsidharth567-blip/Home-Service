import { useState, useEffect } from 'react';
import { MapPin, Mail, Share, User, Clock, Notebook } from 'lucide-react';
import { popularBusinesses } from './serviceData';
import { useLanguage } from '../components/Advanced Modules/LanguageSupport';

function ServiceDetail({ business, onBack, onBookNow }) {
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [hoveredShare, setHoveredShare] = useState(false);
  const [hoveredGallery, setHoveredGallery] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(false);
  const [hoveredSimilar, setHoveredSimilar] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!business) return null;

  // Filter similar businesses (same category, excluding current)
  const similarBusinesses = popularBusinesses
    .filter(b => b.category === business.category && b.id !== business.id)
    .slice(0, 3);

  const isTablet = winWidth <= 992;
  const isMobile = winWidth <= 600;
  const isCompact = winWidth <= 420;

  // Shared Styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: isMobile ? '24px auto' : '40px auto',
    padding: isCompact ? '0 12px' : (isMobile ? '0 16px' : '0 24px'),
    fontFamily: "'Inter', sans-serif"
  };

  const sectionTitleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: 'var(--text-dark)',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 700
  };

  return (
    <div style={containerStyle}>
      {/* Redesigned Header Part */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: isTablet ? 'flex-start' : 'flex-start',
        flexDirection: isTablet ? 'column' : 'row',
        background: 'var(--bg-white)', 
        padding: isMobile ? '30px 20px' : '40px', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-sm)', 
        marginBottom: '40px',
        gap: isTablet ? '32px' : '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '20px' : '32px', 
          alignItems: isMobile ? 'center' : 'flex-start',
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left',
          width: '100%'
        }}>
          <div style={{ 
            width: isMobile ? '120px' : '160px', 
            height: isMobile ? '120px' : '160px', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: '4px solid var(--primary-soft)', 
            flexShrink: 0 
          }}>
            <img src={business.image} alt={business.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '6px 16px', 
              background: 'var(--primary-soft)', 
              color: 'var(--primary)', 
              borderRadius: '100px', 
              fontSize: '13px', 
              fontWeight: 600, 
              width: 'fit-content',
              margin: isMobile ? '0 auto' : '0'
            }}>{business.category}</span>
            <h1 style={{ fontSize: isMobile ? '28px' : '36px', color: 'var(--text-dark)', margin: 0, fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>{business.name}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-gray)', fontSize: '15px', justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                <MapPin size={18} style={{ color: 'var(--primary)' }} />
                <span>{business.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-gray)', fontSize: '15px', justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap', wordBreak: 'break-word' }}>
                <Mail size={18} style={{ color: 'var(--primary)' }} />
                <span>{business.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: isTablet ? 'flex-start' : 'flex-end', 
          gap: '20px' 
        }}>
          <button 
            onMouseEnter={() => setHoveredShare(true)}
            onMouseLeave={() => setHoveredShare(false)}
            style={{ 
              background: hoveredShare ? 'var(--primary)' : 'var(--primary-soft)', 
              color: hoveredShare ? 'white' : 'var(--primary)', 
              padding: '10px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              transition: 'all 0.2s',
              border: 'none',
              cursor: 'pointer'
            }} 
            title="Share"
          >
            <Share size={20} />
          </button>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: isTablet ? 'flex-start' : 'flex-end', 
            gap: '8px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 500, fontSize: '15px' }}>
              <User size={18} />
              <span>{business.contactPerson}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-gray)', fontWeight: 400, fontSize: '15px' }}>
              <Clock size={18} />
              <span>{t.available || 'Available'} {business.availability}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr', 
          gap: isMobile ? '28px' : '40px' 
        }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '28px' : '40px', minWidth: 0 }}>
          <section>
            <h2 style={sectionTitleStyle}>{t.description || 'Description'}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-gray)' }}>{business.description}</p>
          </section>

          <section>
            <h2 style={sectionTitleStyle}>Gallery</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(auto-fit, minmax(${isCompact ? '140px' : '180px'}, 1fr))`, 
              gap: '16px' 
            }}>
              {business.gallery?.map((img, index) => (
                <div 
                  key={index} 
                  onMouseEnter={() => setHoveredGallery(index)}
                  onMouseLeave={() => setHoveredGallery(null)}
                  style={{ 
                    height: '150px', 
                    borderRadius: 'var(--radius-md)', 
                    overflow: 'hidden' 
                  }}
                >
                  <img src={img} alt={`Gallery ${index}`} style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    transition: 'transform 0.3s',
                    transform: hoveredGallery === index ? 'scale(1.05)' : 'scale(1)'
                  }} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '24px' : '32px', minWidth: 0 }}>
          <button 
            onMouseEnter={() => setHoveredBook(true)}
            onMouseLeave={() => setHoveredBook(false)}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: hoveredBook ? 'var(--primary-hover)' : 'var(--primary)', 
              color: 'white', 
              borderRadius: 'var(--radius-md)', 
              fontSize: '16px', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px', 
              boxShadow: '0 4px 12px rgba(226, 55, 68, 0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              transform: hoveredBook ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onClick={() => onBookNow(business.category, business.name)}
          >
            <Notebook size={20} />
            {t.bookNow || 'Book Appointment'}
          </button>

          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--text-dark)', fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>Similar Business</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {similarBusinesses.map((item) => (
                <div 
                  key={item.id} 
                  onMouseEnter={() => setHoveredSimilar(item.id)}
                  onMouseLeave={() => setHoveredSimilar(null)}
                  style={{ 
                    display: 'flex', 
                    flexDirection: isCompact ? 'column' : 'row',
                    alignItems: isCompact ? 'flex-start' : 'center',
                    gap: '16px', 
                    padding: '12px', 
                    background: 'var(--bg-white)', 
                    borderRadius: 'var(--radius-md)', 
                    transition: 'all 0.2s', 
                    cursor: 'pointer', 
                    border: `1px solid ${hoveredSimilar === item.id ? 'var(--primary)' : 'var(--border)'}`,
                    boxShadow: hoveredSimilar === item.id ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  <img src={item.image} alt={item.name} style={{ width: isCompact ? '100%' : '80px', height: isCompact ? '160px' : '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-dark)', margin: 0 }}>{item.name}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--primary)', margin: 0, fontWeight: 500 }}>{item.contactPerson}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0, wordBreak: 'break-word' }}>{item.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ServiceDetail;
