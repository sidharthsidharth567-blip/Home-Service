import { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Moon, Sun, MapPin, Search, X, Navigation, LogOut } from 'lucide-react';
import { useLanguage } from '../Advanced Modules/LanguageSupport';

// SVG Landmark icons for each city (line-art style like Joboy)
const CityIcon = ({ city }) => {
  const icons = {
    Chennai: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <rect x="8" y="28" width="32" height="14" rx="1"/>
        <rect x="14" y="20" width="20" height="8"/>
        <polygon points="24,6 36,20 12,20"/>
        <line x1="20" y1="28" x2="20" y2="42"/>
        <line x1="28" y1="28" x2="28" y2="42"/>
      </svg>
    ),
    Kochi: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <path d="M24 8 L24 36"/>
        <path d="M24 14 L36 28 L12 28 Z"/>
        <ellipse cx="24" cy="40" rx="16" ry="4"/>
        <path d="M10 36 Q24 34 38 36"/>
      </svg>
    ),
    Bengaluru: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <rect x="6" y="30" width="36" height="12" rx="1"/>
        <rect x="10" y="22" width="28" height="8"/>
        <rect x="16" y="14" width="16" height="8"/>
        <rect x="20" y="8" width="8" height="6"/>
        <line x1="16" y1="30" x2="16" y2="42"/>
        <line x1="32" y1="30" x2="32" y2="42"/>
      </svg>
    ),
    Trivandrum: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <rect x="8" y="30" width="32" height="12" rx="1"/>
        <path d="M14 30 L14 22 Q14 18 18 18 L30 18 Q34 18 34 22 L34 30"/>
        <path d="M18 18 Q24 8 30 18"/>
        <circle cx="24" cy="13" r="3"/>
        <line x1="18" y1="30" x2="18" y2="42"/>
        <line x1="30" y1="30" x2="30" y2="42"/>
      </svg>
    ),
    Mumbai: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <rect x="8" y="32" width="8" height="10"/>
        <rect x="20" y="20" width="8" height="22"/>
        <rect x="32" y="26" width="8" height="16"/>
        <rect x="4" y="42" width="40" height="2"/>
        <line x1="22" y1="20" x2="22" y2="14"/>
        <line x1="26" y1="20" x2="26" y2="14"/>
      </svg>
    ),
    'Delhi NCR': (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <path d="M24 6 L24 18"/>
        <circle cx="24" cy="20" r="4"/>
        <path d="M14 26 Q24 22 34 26"/>
        <rect x="10" y="26" width="28" height="4" rx="2"/>
        <rect x="6" y="30" width="36" height="12" rx="1"/>
        <line x1="16" y1="30" x2="16" y2="42"/>
        <line x1="32" y1="30" x2="32" y2="42"/>
      </svg>
    ),
    Kozhikode: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <rect x="6" y="34" width="36" height="8" rx="1"/>
        <rect x="10" y="26" width="10" height="8"/>
        <rect x="28" y="26" width="10" height="8"/>
        <rect x="16" y="18" width="16" height="8"/>
        <path d="M20 18 L20 12 Q24 8 28 12 L28 18"/>
        <line x1="14" y1="34" x2="14" y2="42"/>
        <line x1="34" y1="34" x2="34" y2="42"/>
      </svg>
    ),
    Thrissur: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <path d="M12 42 L12 28 Q12 20 24 16 Q36 20 36 28 L36 42"/>
        <path d="M18 42 L18 32 Q18 28 24 26 Q30 28 30 32 L30 42"/>
        <path d="M8 42 L40 42"/>
        <path d="M24 16 L24 8"/>
        <path d="M20 10 L28 10"/>
      </svg>
    ),
  };
  return icons[city] || (
    <svg viewBox="0 0 48 48" width="40" height="40">
      <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  );
};

const POPULAR_CITIES = [
  { name: 'Chennai' },
  { name: 'Kochi' },
  { name: 'Bengaluru' },
  { name: 'Trivandrum' },
  { name: 'Mumbai' },
  { name: 'Delhi NCR' },
  { name: 'Kozhikode' },
  { name: 'Thrissur' },
];

const SEARCH_SUGGESTIONS = [
  'Plumbing repair',
  'Electrical work',
  'House cleaning',
  'Painting',
  'AC service',
  'Carpentry',
  'Pest control',
  'Appliance repair',
  'Waterproofing',
  'Interior design',
];

const NAV_ITEMS = [
  { label: 'Home', target: 'home' },
];

const navbarStyles = String.raw`
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: var(--bg-white);
  padding: 16px 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-decoration: none;
}

.logo-text {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
}

.logo-text span {
  color: var(--primary);
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 1 1 auto;
  justify-content: center;
  min-width: 0;
}

.nav-link {
  color: var(--text-dark);
  font-size: 15px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  position: relative;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.navbar-auth {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.login-btn {
  background: var(--primary);
  color: white;
  padding: 10px 24px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s;
}

.login-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(226, 55, 68, 0.25);
}

.provider-btn {
  background: transparent;
  color: var(--primary);
  padding: 9px 20px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 14px;
  border: 1.5px solid var(--primary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.provider-btn:hover {
  background: var(--primary);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(226, 55, 68, 0.25);
}

@media (max-width: 768px) {
  .provider-btn {
    display: none;
  }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-dark);
}

.hamburger {
  display: none;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 12px;
  background: var(--primary-soft);
  color: var(--primary);
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }

  .hamburger {
    display: block;
  }

  .navbar-auth .login-btn {
    padding: 8px 16px;
    font-size: 14px;
  }
}

.navbar-search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0;
  flex: 0 1 240px;
  min-width: 0;
}

.navbar-search-form {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.navbar-search-pill {
  background: #f7f3ee;
  border: 1px solid #ddd4cb;
  border-radius: 999px;
  padding: 4px 8px 4px 16px;
  gap: 10px;
  min-height: 42px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.navbar-search-form:focus-within {
  border-color: #c9beb3;
  box-shadow: 0 0 0 3px rgba(201, 190, 179, 0.22);
  background: #fff;
}

.navbar-search-icon {
  color: #1f2937;
  flex-shrink: 0;
}

.navbar-search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  outline: none;
  min-width: 0;
}

.navbar-search-input::placeholder {
  color: #1f2937;
  opacity: 1;
}

.navbar-search-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #1f2937;
  width: 34px;
  height: 34px;
  padding: 0;
  margin-right: 2px;
  border-radius: 50%;
  transition: transform 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
}

.navbar-search-submit:hover {
  transform: scale(1.06);
  color: #000;
}

.search-suggestions-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 1002;
  overflow: hidden;
  animation: dropdownFade 0.15s ease-out;
}

.search-suggestion-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: none;
  border: none;
  padding: 10px 14px;
  font-size: 14px;
  color: var(--text-dark, #1c1c1c);
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
  border-bottom: 1px solid #f5f5f5;
}

.search-suggestion-item:last-child {
  border-bottom: none;
}

.search-suggestion-item:hover {
  background: #fff5f6;
  color: var(--primary);
}

.suggestion-icon {
  color: var(--text-gray, #aaa);
  flex-shrink: 0;
}

.search-suggestion-item:hover .suggestion-icon {
  color: var(--primary);
}

@media (max-width: 768px) {
  .navbar-search-wrapper {
    display: none;
  }
}

.mobile-search-bar {
  display: none;
  position: relative;
  padding: 0 16px 12px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .mobile-search-bar {
    display: block;
  }
}

.mobile-search-form {
  display: flex;
  align-items: center;
  background: var(--bg-light, #f5f7fa);
  border: 1.5px solid var(--border, #e0e0e0);
  border-radius: 24px;
  padding: 8px 14px;
  gap: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.mobile-search-form:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(226, 55, 68, 0.1);
  background: #fff;
}

.mobile-search-icon {
  color: var(--text-gray, #888);
  flex-shrink: 0;
}

.mobile-search-form:focus-within .mobile-search-icon {
  color: var(--primary);
}

.mobile-search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--text-dark);
  outline: none;
}

.mobile-search-input::placeholder {
  color: var(--text-gray, #aaa);
}

.mobile-search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-gray, #999);
  padding: 2px;
  border-radius: 50%;
  transition: background 0.2s;
}

.mobile-search-clear:hover {
  background: #efefef;
}

.mobile-suggestions {
  position: absolute;
  left: 16px;
  right: 16px;
  top: calc(100% - 8px);
}

.navbar-profile-dropdown {
  position: relative;
}

.avatar-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.avatar-trigger:hover, .avatar-trigger.active {
  background: #f8fafc;
}

.nav-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.nav-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav-user-name {
  font-size: 15px;
  font-weight: 500;
  color: #1c1c1c;
}

.chevron-icon {
  color: #696969;
  transition: transform 0.2s;
}

.chevron-icon.rotate {
  transform: rotate(180deg);
}

.profile-dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 180px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 8px 0;
  z-index: 1001;
  border: 1px solid #efefef;
  animation: dropdownFade 0.2s ease-out;
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.dropdown-item {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  color: #4a4a4a;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #fdfdfd;
  color: #1c1c1c;
}

.dropdown-item.logout {
  border-top: 1px solid #efefef;
  margin-top: 4px;
  padding-top: 12px;
}

@keyframes dropdownFade {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-divider {
  height: 1px;
  background: #efefef;
  margin: 4px 0;
}

.dark-mode-toggle {
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
}

.dark-mode-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.theme-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--primary);
}

input:checked + .slider:before {
  transform: translateX(14px);
}

.slider.round {
  border-radius: 20px;
}

.slider.round:before {
  border-radius: 50%;
}

.navbar-location-picker {
  position: relative;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .navbar-location-picker {
    display: none;
  }
}

.location-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background-color: var(--primary);
  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  transition: all 0.2s ease;
  box-shadow: 0 8px 18px rgba(226, 55, 68, 0.24);
}

.location-trigger:hover, .location-trigger.active {
  background-color: var(--primary-hover);
  box-shadow: 0 12px 22px rgba(226, 55, 68, 0.28);
}

.location-pin-icon {
  color: #fff;
}

.location-text {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.location-trigger .chevron-icon {
  color: #fff;
}

.loc-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInBackdrop 0.2s ease;
}

@keyframes fadeInBackdrop {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.loc-modal {
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 560px;
  padding: 40px 36px 32px;
  position: relative;
  box-shadow: 0 24px 60px rgba(0,0,0,0.25);
  animation: slideUpModal 0.25s ease;
}

@keyframes slideUpModal {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.loc-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: background 0.2s;
}

.loc-modal-close:hover {
  background: #f0f0f0;
  color: #111;
}

.loc-modal-title {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #1a1a1a;
  margin-bottom: 28px;
}

.loc-search-row {
  margin-bottom: 28px;
}

.loc-search-box {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
  gap: 10px;
  transition: border-color 0.2s;
}

.loc-search-box:focus-within {
  border-color: var(--primary, #e23744);
}

.loc-search-icon {
  color: var(--primary, #e23744);
  flex-shrink: 0;
}

.loc-search-box input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  color: #1a1a1a;
  background: transparent;
}

.loc-search-box input::placeholder {
  color: #aaa;
}

.loc-gps-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary, #e23744);
  display: flex;
  align-items: center;
  padding: 0;
  transition: transform 0.2s;
}

.loc-gps-btn:hover {
  transform: scale(1.15);
}

.loc-section-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #333;
  margin-bottom: 16px;
}

.loc-cities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.loc-city-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 10px 14px;
  border: 1.5px solid #e8e8e8;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #fafafa;
}

.loc-city-card:hover {
  border-color: var(--primary, #e23744);
  background: #fff5f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(226, 55, 68, 0.12);
}

.loc-city-card.active {
  border-color: var(--primary, #e23744);
  background: #fff0f1;
}

.loc-city-icon {
  font-size: 32px;
  line-height: 1;
}

.loc-city-name {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #2a2a2a;
  text-align: center;
}

.loc-not-listed {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.42);
  z-index: 999;
}

.mobile-menu-panel {
  display: none;
}

@media (max-width: 1100px) {
  .navbar-container {
    padding: 0 18px;
    gap: 12px;
  }

  .navbar-menu {
    gap: 18px;
  }

  .location-text,
  .nav-user-name {
    display: none;
  }

  .navbar-search-wrapper {
    flex-basis: 190px;
  }
}

@media (max-width: 480px) {
  .loc-modal {
    padding: 32px 20px 24px;
    border-radius: 12px;
  }

  .loc-cities-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .loc-modal-title {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 12px 0;
  }

  .navbar-container {
    padding: 0 16px;
  }

  .navbar-menu,
  .navbar-search-wrapper,
  .navbar-location-picker {
    display: none;
  }

  .hamburger {
    display: inline-flex;
  }

  .navbar-auth .login-btn {
    padding: 9px 16px;
    font-size: 14px;
  }

  .mobile-search-bar {
    padding: 0 16px 12px;
  }

  .mobile-menu-panel {
    position: fixed;
    top: 72px;
    left: 16px;
    right: 16px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 18px;
    border-radius: 20px;
    background: var(--bg-white);
    border: 1px solid var(--border);
    box-shadow: 0 22px 48px rgba(15, 23, 42, 0.18);
    z-index: 1000;
  }

  .mobile-menu-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mobile-menu-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 14px;
    background: #f8fafc;
    color: var(--text-dark);
    font-size: 14px;
    font-weight: 600;
  }

  .mobile-menu-row.nav {
    justify-content: flex-start;
    background: transparent;
    border: 1px solid var(--border);
  }

  .mobile-menu-row.nav:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .mobile-menu-section-title {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-light);
  }

  .mobile-menu-actions {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .mobile-login-btn,
  .mobile-provider-btn,
  .mobile-theme-button {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 700;
  }

  .mobile-login-btn {
    background: var(--primary);
    color: #fff;
  }

  .mobile-provider-btn,
  .mobile-theme-button {
    background: var(--bg-light);
    color: var(--text-dark);
    border: 1px solid var(--border);
  }

  .mobile-user-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 16px;
    background: var(--primary-soft);
    color: var(--text-dark);
    font-size: 14px;
    font-weight: 700;
  }
}
`;

function Navbar({
  onNavigate,
  onLoginClick,
  user,
  onLogout,
  theme,
  toggleTheme,
  selectedLocation = 'Trivandrum',
  onLocationChange,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const searchWrapperRef = useRef(null);

  const { t } = useLanguage();

  const handleNavClick = (sectionId, tab = null) => {
    if (onNavigate) onNavigate(sectionId, tab);
    setIsMobileMenuOpen(false);
  };

  const handleCitySelect = (city) => {
    onLocationChange?.(city);
    setIsLocationModalOpen(false);
    setLocationSearch('');
  };

  const filteredCities = POPULAR_CITIES.filter(c =>
    c.name.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredSuggestions = searchQuery.trim().length > 0
    ? SEARCH_SUGGESTIONS.filter(s =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_SUGGESTIONS;

  const handleSearchSelect = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    if (onNavigate) onNavigate('services', suggestion);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      if (onNavigate) onNavigate('services', searchQuery.trim());
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <style>{navbarStyles}</style>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo" onClick={() => handleNavClick('home')}>
            <h1 className="logo-text">Home<span>Care</span></h1>
          </div>

          <div className="navbar-menu">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                className="nav-link"
                onClick={() => handleNavClick(item.target, item.tab)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Location Trigger Button */}
          <div className="navbar-location-picker">
            <div
              className={`location-trigger ${isLocationModalOpen ? 'active' : ''}`}
              onClick={() => setIsLocationModalOpen(true)}
            >
              <MapPin size={16} className="location-pin-icon" />
              <span className="location-text">{selectedLocation}</span>
              <ChevronDown size={14} className="chevron-icon" />
            </div>
          </div>

          {/* Search Bar (desktop) */}
          <div
            ref={searchWrapperRef}
            className="navbar-search-wrapper"
          >
            <form className="navbar-search-form navbar-search-pill" onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                type="text"
                className="navbar-search-input"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                autoComplete="off"
              />
              <button type="submit" className="navbar-search-submit" aria-label="Search">
                <Search size={20} className="navbar-search-icon" />
              </button>

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="search-suggestions-dropdown">
                  {filteredSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="search-suggestion-item"
                      onMouseDown={() => handleSearchSelect(s)}
                    >
                      <Search size={13} className="suggestion-icon" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Auth Area */}
          <div className="navbar-auth">
            {user ? (
              <div className="navbar-profile-dropdown">
                <div
                  className={`avatar-trigger ${isDropdownOpen ? 'active' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="nav-avatar">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
                      alt="Profile"
                    />
                  </div>
                  <span className="nav-user-name">{user.name || 'User'}</span>
                  <ChevronDown size={14} className={`chevron-icon ${isDropdownOpen ? 'rotate' : ''}`} />
                </div>

                {isDropdownOpen && (
                  <>
                    <div className="dropdown-overlay" onClick={() => setIsDropdownOpen(false)}></div>
                    <div className="profile-dropdown-menu">
                      <button
                        onClick={() => { handleNavClick('profile', 'recently'); setIsDropdownOpen(false); }}
                        className="dropdown-item"
                      >
                        {t.profile || 'Profile'}
                      </button>
                      <button
                        onClick={() => { handleNavClick('profile', 'settings'); setIsDropdownOpen(false); }}
                        className="dropdown-item"
                      >
                        {t.settings || 'Settings'}
                      </button>
                      <div className="dropdown-divider"></div>
                      <div
                        className="dropdown-item dark-mode-toggle"
                        onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                      >
                        <div className="dark-mode-label">
                          {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                          <span>Dark Mode</span>
                        </div>
                        <label className="theme-switch" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" checked={theme === 'dark'} onChange={() => {}} />
                          <span className="slider round" onClick={() => toggleTheme()}></span>
                        </label>
                      </div>
                      <button
                        onClick={() => { onLogout(); setIsDropdownOpen(false); }}
                        className="dropdown-item logout"
                      >
                        Log out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button className="login-btn" onClick={onLoginClick}>
                Login
              </button>
            )}

            <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mobile-search-bar">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <Search size={16} className="mobile-search-icon" />
            <input
              type="text"
              className="mobile-search-input"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              autoComplete="off"
            />
            {searchQuery && (
              <button type="button" className="mobile-search-clear" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </form>

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="search-suggestions-dropdown mobile-suggestions">
              {filteredSuggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="search-suggestion-item"
                  onMouseDown={() => handleSearchSelect(s)}
                >
                  <Search size={13} className="suggestion-icon" />
                  <span>{s}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {isMobileMenuOpen && <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)} />}

        {isMobileMenuOpen && (
          <div className="mobile-menu-panel">
            {user ? (
              <div className="mobile-user-chip">
                <div className="nav-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
                    alt="Profile"
                  />
                </div>
                <span>{user.name || 'User'}</span>
              </div>
            ) : null}

            <div className="mobile-menu-section-title">Navigate</div>
            <div className="mobile-menu-links">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="mobile-menu-row nav"
                  onClick={() => handleNavClick(item.target, item.tab)}
                >
                  {item.label}
                </button>
              ))}
              {user && (
                <button
                  type="button"
                  className="mobile-menu-row nav"
                  onClick={() => handleNavClick('profile', 'recently')}
                >
                  {t.profile || 'Profile'}
                </button>
              )}
            </div>

            <button
              type="button"
              className="mobile-menu-row"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLocationModalOpen(true);
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={16} />
                Location
              </span>
              <strong>{selectedLocation}</strong>
            </button>

            <div className="mobile-menu-actions">
              <button type="button" className="mobile-theme-button" onClick={toggleTheme}>
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              {user ? (
                <button
                  type="button"
                  className="mobile-provider-btn"
                  onClick={() => {
                    onLogout?.();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Log out</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="mobile-login-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLoginClick?.();
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="loc-modal-backdrop" onClick={() => setIsLocationModalOpen(false)}>
          <div className="loc-modal" onClick={(e) => e.stopPropagation()}>
            <button className="loc-modal-close" onClick={() => setIsLocationModalOpen(false)}>
              <X size={22} />
            </button>

            <h2 className="loc-modal-title">SELECT YOUR LOCATION TO CONTINUE</h2>

            <div className="loc-search-row">
              <div className="loc-search-box">
                <Search size={18} className="loc-search-icon" />
                <input
                  type="text"
                  placeholder="Search Your location!"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  autoFocus
                />
                <button className="loc-gps-btn" title="Use current location">
                  <Navigation size={18} />
                </button>
              </div>
            </div>

            <h3 className="loc-section-title">POPULAR CITIES</h3>
            <div className="loc-cities-grid">
              {filteredCities.map((city) => (
                <div
                  key={city.name}
                  className={`loc-city-card ${selectedLocation === city.name ? 'active' : ''}`}
                  onClick={() => handleCitySelect(city.name)}
                >
                  <span className="loc-city-icon"><CityIcon city={city.name} /></span>
                  <span className="loc-city-name">{city.name.toUpperCase()}</span>
                </div>
              ))}
            </div>

            <div className="loc-not-listed"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;