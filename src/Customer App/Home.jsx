import React, { useState, useEffect } from 'react';
import { categoryList, popularBusinesses } from './serviceData';
import { useLanguage } from '../components/Advanced Modules/LanguageSupport';
import { MapPin, Phone, MessageCircle, Calendar } from 'lucide-react';
import './Home.css';

// SVG Line Art Icons to match screenshot
const IconSVG = ({ type }) => {
  switch (type) {
    case 'electrician':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <path d="M20 10 L20 20 L10 20 L30 40 L30 30 L40 30 Z" stroke="#333" fill="#fef08a" />
        </svg>
      );
    case 'plumber':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <path d="M15 15 L35 15 L35 25 Q35 35 25 35 Q15 35 15 25 Z" stroke="#333" />
          <path d="M25 15 L25 5 L35 5" stroke="#333" />
          <circle cx="25" cy="40" r="3" fill="#fbbf24" stroke="#fbbf24" />
        </svg>
      );
    case 'ac':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <rect x="10" y="15" width="30" height="15" rx="2" stroke="#333" />
          <line x1="15" y1="20" x2="35" y2="20" stroke="#333" />
          <line x1="15" y1="25" x2="35" y2="25" stroke="#333" />
          <path d="M40 22 L45 22" stroke="#333" />
        </svg>
      );
    case 'deep-cleaning':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <rect x="20" y="20" width="10" height="20" stroke="#333" fill="#e0f2fe" />
          <path d="M20 20 L25 10 L30 20" stroke="#333" />
          <path d="M10 40 L40 40" stroke="#333" />
          <line x1="15" y1="35" x2="15" y2="40" stroke="#333" />
          <line x1="35" y1="35" x2="35" y2="40" stroke="#333" />
        </svg>
      );
    case 'carpenter':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <path d="M10 25 L40 25" stroke="#333" />
          <path d="M15 25 L15 15 L35 15 L35 25" stroke="#333" fill="#fef3c7" />
          <line x1="10" y1="30" x2="40" y2="30" stroke="#333" />
        </svg>
      );
    case 'kitchen':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <rect x="10" y="20" width="30" height="20" stroke="#333" />
          <line x1="10" y1="25" x2="40" y2="25" stroke="#333" />
          <circle cx="18" cy="15" r="5" stroke="#333" />
          <circle cx="32" cy="15" r="5" stroke="#333" />
        </svg>
      );
    case 'beauty':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <circle cx="25" cy="20" r="10" stroke="#333" fill="#fce7f3" />
          <path d="M15 40 Q25 30 35 40" stroke="#333" />
          <line x1="25" y1="25" x2="25" y2="30" stroke="#333" />
        </svg>
      );
    case 'shoe':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <path d="M10 20 L25 15 L40 20 L40 25 Q25 30 10 25 Z" stroke="#333" fill="#e0e7ff" />
          <path d="M10 25 L10 35 Q25 40 40 35 L40 25" stroke="#333" />
        </svg>
      );
    case 'painter':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <path d="M15 35 L35 15 L40 20 L20 40 Z" stroke="#333" fill="#fef08a" />
          <path d="M15 35 L10 40 L20 40 Z" stroke="#333" />
        </svg>
      );
    case 'packers':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <rect x="5" y="20" width="30" height="20" stroke="#333" fill="#fef08a" />
          <circle cx="15" cy="40" r="4" stroke="#333" />
          <circle cx="25" cy="40" r="4" stroke="#333" />
          <path d="M35 25 L45 25 L45 40 L35 40" stroke="#333" />
          <circle cx="40" cy="40" r="4" stroke="#333" />
        </svg>
      );
    case 'watertank':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <rect x="15" y="10" width="20" height="30" rx="3" stroke="#333" fill="#fef08a" />
          <line x1="15" y1="15" x2="35" y2="15" stroke="#333" />
          <line x1="15" y1="20" x2="35" y2="20" stroke="#333" />
          <line x1="15" y1="25" x2="35" y2="25" stroke="#333" />
        </svg>
      );
    case 'more':
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
          <path d="M15 15 L25 25 L15 35" stroke="#333" />
          <path d="M25 15 L35 25 L25 35" stroke="#333" />
        </svg>
      );
    default:
      return null;
  }
};

const smallGridServices = [
  { id: 'electrical', label: 'ELECTRICIAN', icon: 'electrician', badge: '₹100 off' },
  { id: 'plumbing', label: 'PLUMBER', icon: 'plumber', badge: '₹100 off' },
  { id: 'ac', label: 'AC SERVICE', icon: 'ac', badge: '₹50 OFF' },
  { id: 'cleaning', label: 'DEEP CLEANING', icon: 'deep-cleaning', badge: '₹100 off' },
  { id: 'carpentry', label: 'CARPENTER', icon: 'carpenter' },
  { id: 'kitchen', label: 'KITCHEN\nCLEANING', icon: 'kitchen' },
  { id: 'beauty', label: 'BEAUTY\nSERVICES', icon: 'beauty', badge: 'Rs 100\nOFF' },
  { id: 'shoe', label: 'SHOE LAUNDRY', icon: 'shoe' },
  { id: 'painting', label: 'PAINTER', icon: 'painter' },
  { id: 'packers', label: 'PACKERS &\nMOVERS', icon: 'packers' },
  { id: 'watertank', label: 'WATER TANK\nCLEANING', icon: 'watertank' },
  { id: 'more', label: 'MORE SERVICES', icon: 'more' },
];

const footerFinderCards = [
  {
    title: 'Electrical',
    description: 'Expert electrical repairs at your fingertips with dependable doorstep support.',
    image: categoryList.find((category) => category.name === 'Electrical')?.image,
    target: 'Electrical',
  },
  {
    title: 'Plumbing',
    description: 'Most plumbing needs are urgent, so book skilled plumbers without the wait.',
    image: categoryList.find((category) => category.name === 'Plumbing')?.image,
    target: 'Plumbing',
  },
  {
    title: 'AC Repair',
    description: 'Get experienced experts for AC service, installation, uninstallation, and gas refill.',
    image: categoryList.find((category) => category.name === 'AC Repair')?.image,
    target: 'AC Repair',
  },
  {
    title: 'Deep Cleaning',
    description: 'Affordable home deep cleaning from trained professionals for every room and surface.',
    image: categoryList.find((category) => category.name === 'Cleaning')?.image,
    target: 'Cleaning',
  },
];

function Home({ onSelectService, onSelectBusiness }) {
  const { t } = useLanguage();

  return (
    <div className="home-container">
      
      {/* ── Top Announcement Banner ────────────────────────────────────────── */}
      <div className="announcement-banner">
         <span className="badge-yellow">Expert home and local services at your convenience! Download the HomeCare app now!</span>
         <span className="badge-transparent">Carpenter services now available in Trivandrum.</span>
      </div>

      <div className="content-wrapper">
        {/* ── Large Cards Row ─────────────────────────────────────────────── */}
        <section className="most-used-section">
          <h2 className="most-used-title">MOST USED SERVICES</h2>
          
          <div className="large-cards-container">
            {/* Card 1: Cleaning */}
            <div className="large-card" onClick={() => onSelectService('Cleaning')}>
              <div className="img-container">
                <img src={categoryList.find(c => c.name === 'Cleaning')?.image} alt="Cleaning" />
              </div>
              <div className="card-text">CLEANING<br/>SERVICES</div>
            </div>

            {/* Card 2: Beauty / Painting (Mapping to Painting since Beauty isn't in original data) */}
            <div className="large-card" onClick={() => onSelectService('Painting')}>
              <div className="badge-new">New!</div>
              <div className="img-container">
                <img src={categoryList.find(c => c.name === 'Painting')?.image} alt="Painting" />
              </div>
              <div className="card-text">PAINTING<br/>SERVICES</div>
            </div>

            {/* Card 3: Appliance Repairs */}
            <div className="large-card" onClick={() => onSelectService('AC Repair')}>
              <div className="img-container">
                <img src={categoryList.find(c => c.name === 'AC Repair')?.image} alt="Appliance Repair" />
              </div>
              <div className="card-text">APPLIANCE<br/>REPAIRS</div>
            </div>
          </div>
        </section>

        {/* ── Small Circular Icons Grid ───────────────────────────────────── */}
        <section className="small-grid-section">
          <div className="small-grid-container">
            {smallGridServices.map((service, index) => (
              <div 
                key={index} 
                className="grid-item"
                onClick={() => onSelectService(
                  service.id === 'electrical' ? 'Electrical' : 
                  service.id === 'plumbing' ? 'Plumbing' : 
                  service.id === 'ac' ? 'AC Repair' : 
                  service.id === 'cleaning' ? 'Cleaning' : 
                  service.id === 'carpentry' ? 'Carpentry' : 
                  service.id === 'painting' ? 'Painting' :
                  'Maintenance'
                )}
              >
                <div className="icon-wrapper">
                  {service.badge && (
                    <div className="icon-badge">
                      {service.badge.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                    </div>
                  )}
                  <IconSVG type={service.icon} />
                </div>
                <div className="item-label">
                  {service.label.split('\n').map((text, i) => <React.Fragment key={i}>{text}<br/></React.Fragment>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Promotional Banners Section ─────────────────────────────────── */}
        <section className="promo-banners-section">
          {/* Top Full Width Banner */}
          <div className="promo-banner-main">
            <div className="promo-main-content">
              <div className="promo-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="#333" fill="#333"/>
                  <path d="M12 18h.01" stroke="#fff" />
                  <path d="M12 7v5l2-2m-2 2l-2-2" stroke="#fff" />
                  <rect x="8" y="10" width="12" height="10" rx="2" fill="#ef4444" stroke="#ef4444" />
                  <path d="M14 17l-3-3m3 3l3-3m-3 3v-6" stroke="#fff" />
                </svg>
              </div>
              <span className="promo-main-text">Get a Better HomeCare Experience on Mobile Download the HOMECARE app now!</span>
            </div>
            <div className="promo-main-buttons">
              <button className="store-btn">
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.78-.06 1.88-.84 3.39-.71 1.48.06 2.65.62 3.4 1.7-2.92 1.76-2.43 5.86.41 7.03-.68 1.75-1.55 3.39-2.28 4.17Zm-3.18-13.82c.28-1.78-.97-3.32-2.58-3.46-.38 1.84 1.15 3.48 2.58 3.46Z"/></svg>
                <div className="store-text"><span>Download</span><span>App Store</span></div>
              </button>
              <button className="store-btn">
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M3 20.5V3.5C3 2.67 3.67 2 4.5 2h.06c.24 0 .48.07.66.21l14.28 10.42c.49.36.49 1.09 0 1.45L5.22 24.5a1.11 1.11 0 0 1-1.3-.08A1.5 1.5 0 0 1 3 23.36v-2.86Z"/><path d="m4.5 2 10.74 10.74L4.5 23.48V2Z" fill="#fff" opacity="0.1"/></svg>
                <div className="store-text"><span>Download</span><span>Google Play</span></div>
              </button>
            </div>
          </div>

          <div className="promo-banners-row">
            {/* Left Corporate Banner */}
            <div className="promo-banner-half promo-corporate">
              <div className="promo-half-left">
                <div className="promo-circle-icon icon-corporate">
                   <svg viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" width="40" height="40"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <div className="promo-half-content">
                  <p>Get on demand services for your offices with our corporate service plans.</p>
                  <button className="promo-btn-yellow">VISIT PORTAL</button>
                </div>
              </div>
            </div>

            {/* Right Referral Banner */}
            <div className="promo-banner-half promo-referral">
              <div className="promo-half-left">
                <div className="promo-circle-icon icon-referral">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="40" height="40"><rect x="3" y="11" width="18" height="10" rx="2" fill="#fbbf24" stroke="#fbbf24"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#9ca3af"/><circle cx="12" cy="16" r="2" fill="#fff"/></svg>
                </div>
                <div className="promo-half-content">
                  <p>Tell your friends about HomeCare and earn cashback and other benefits. Earn upto 750 coins for each referral!!</p>
                  <button className="promo-btn-black">REFER NOW!</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="footer-finder-section">
          <h2 className="footer-finder-title">WHAT DO YOU NEED TO FIND ?</h2>
          <div className="footer-finder-grid">
            {footerFinderCards.map((card) => (
              <article
                key={card.title}
                className="footer-finder-card"
                onClick={() => onSelectService(card.target)}
              >
                <div className="footer-finder-image-wrap">
                  <img src={card.image} alt={card.title} className="footer-finder-image" />
                </div>
                <div className="footer-finder-body">
                  <p>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="fab fab-whatsapp">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>
        <button className="fab fab-calendar">
          <Calendar color="white" size={24} />
        </button>
      </div>

    </div>
  );
}

export default Home;
