import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../Advanced Modules/LanguageSupport';
import './Footer.css';

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24h-2.173Z" fill="currentColor" stroke="none"></path>
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);


function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Home<span>Care</span></h3>
          <p>Your trusted home service partner providing quality services at your doorstep.</p>
          <div className="social-links">
            <a href="#facebook" className="social-icon" aria-label="Facebook"><FacebookIcon size={20} /></a>
            <a href="#twitter" className="social-icon" aria-label="Twitter"><XIcon size={20} /></a>
            <a href="#instagram" className="social-icon" aria-label="Instagram"><InstagramIcon size={20} /></a>
            <a href="#linkedin" className="social-icon" aria-label="LinkedIn"><LinkedinIcon size={20} /></a>
            
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">{t.home || 'Home'}</a></li>
            <li><a href="#services">{t.services || 'Services'}</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="#plumbing">Plumbing</a></li>
            <li><a href="#electrical">Electrical</a></li>
            <li><a href="#cleaning">Cleaning</a></li>
            <li><a href="#repairs">Repairs</a></li>
            <li><a href="#maintenance">Maintenance</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t.contactUs || 'Contact Info'}</h4>
          <p className="contact-item">
            <Mail size={18} />
            <span>Email: support@homeserve.com</span>
          </p>
          <p className="contact-item">
            <Phone size={18} />
            <span>Phone: +91 9876543210</span>
          </p>
          <p className="contact-item">
            <MapPin size={18} />
            <span>Address: Tech Park, Bangalore</span>
          </p>
          <h4 style={{ marginTop: '15px' }}>Download App</h4>
          <div className="app-links">
            <button className="app-button">App Store</button>
            <button className="app-button">Play Store</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 HomeServe. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">{t.privacy || 'Privacy Policy'}</a>
          <a href="#terms">{t.terms || 'Terms of Service'}</a>
          <a href="#cookies">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
