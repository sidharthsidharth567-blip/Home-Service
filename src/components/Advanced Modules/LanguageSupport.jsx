import React, { createContext, useContext, useState } from 'react';
import { 
  Globe, 
  Check, 
  Languages, 
  ArrowRight,
  MessageSquare,
  LayoutGrid,
  Search,
  ChevronRight
} from 'lucide-react';

// Translation Dictionary
const translations = {
  en: {
    home: 'Home', services: 'Services', bookings: 'Bookings', wallet: 'Wallet', profile: 'Profile', settings: 'Settings', help: 'Help', logout: 'Log out',
    bookNow: 'Book Now', nearYou: 'Near You', viewAll: 'View All',
    searchPlaceholder: 'Search for cleaning, plumbing...', changeLanguage: 'Change Language', selectLanguage: 'Select Language',
    welcome: 'Welcome back!', helpText: 'How can we help you today?', featuredServices: 'Featured Services',
    activity: 'ACTIVITY', onlineOrdering: 'ONLINE ORDERING', account: 'ACCOUNT', support: 'SUPPORT',
    reviews: 'Reviews', photos: 'Photos', favoriteTechnicians: 'Favorite Technicians', recentlyViewed: 'Recently Viewed', language: 'Language',
    myAddresses: 'My Addresses', mySubscription: 'My Subscription', supportDisputes: 'Support & Disputes',
    editProfile: 'Edit profile', following: 'Following', nothingHere: 'Nothing here yet',
    myBookings: 'My Bookings', manageBookings: 'Manage and track all your service requests in one place.', tracking: 'Track Service',
    confirmBooking: 'Confirm Booking', selectDate: 'Select Date & Time', payment: 'Payment Method', back: 'Back', next: 'Next',
    aboutUs: 'About Us', contactUs: 'Contact Us', terms: 'Terms of Service', privacy: 'Privacy Policy', followUs: 'Follow Us',
    rating: 'rating', reviewCount: 'reviews', basePrice: 'Base Price', description: 'Description', duration: 'Duration', contactPerson: 'Contact Person', available: 'Available'
  },
  ml: {
    home: 'ഹോം', services: 'സേവനങ്ങൾ', bookings: 'ബുക്കിംഗുകൾ', wallet: 'വാലറ്റ്', profile: 'പ്രൊഫൈൽ', settings: 'ക്രമീകരണങ്ങൾ', help: 'സഹായം', logout: 'പുറത്തുകടക്കുക',
    bookNow: 'ഇപ്പോൾ ബുക്ക് ചെയ്യുക', nearYou: 'നിങ്ങളുടെ അടുത്ത്', viewAll: 'എല്ലാം കാണുക',
    searchPlaceholder: 'ക്ലീനിംഗ്, പ്ലംബിംഗ് തിരയുക...', changeLanguage: 'ഭാഷ മാറ്റുക', selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    welcome: 'വീണ്ടും സ്വാഗതം!', helpText: 'ഇന്ന് ഞങ്ങൾ എങ്ങനെ സഹായിക്കും?', featuredServices: 'പ്രധാന സേവനങ്ങൾ',
    activity: 'പ്രവർത്തനങ്ങൾ', onlineOrdering: 'ഓൺലൈൻ ഓർഡറിംഗ്', account: 'അക്കൗണ്ട്', support: 'പിന്തുണ',
    reviews: 'റിവ്യൂകൾ', photos: 'ഫോട്ടോകൾ', favoriteTechnicians: 'പ്രിയപ്പെട്ട ടെക്നീഷ്യന്മാർ', recentlyViewed: 'അടുത്തിടെ കണ്ടവ', language: 'ഭാഷ',
    myAddresses: 'എന്റെ വിലാസങ്ങൾ', mySubscription: 'എന്റെ സബ്സ്ക്രിപ്ഷൻ', supportDisputes: 'പരാതികൾ & പിന്തുണ',
    editProfile: 'പ്രൊഫൈൽ തിരുത്തുക', following: 'പിന്തുടരുന്നവർ', nothingHere: 'ഇവിടെ ഒന്നുമില്ല',
    myBookings: 'എന്റെ ബുക്കിംഗുകൾ', manageBookings: 'നിങ്ങളുടെ സേവനങ്ങൾ ഇവിടെ കൈകാര്യം ചെയ്യുക.', tracking: 'ട്രാക്ക് ചെയ്യുക',
    confirmBooking: 'ബുക്കിംഗ് ഉറപ്പാക്കുക', selectDate: 'തിയ്യതിയും സമയവും', payment: 'പണമടയ്ക്കൽ രീതി', back: 'പുറകോട്ട്', next: 'തുടരുക',
    aboutUs: 'ഞങ്ങളെ കുറിച്ച്', contactUs: 'ബന്ധപ്പെടുക', terms: 'നിബന്ധനകൾ', privacy: 'സ്വകാര്യതാ നയം', followUs: 'ഞങ്ങളെ പിന്തുടരുക',
    rating: 'റേറ്റിംഗ്', reviewCount: 'റിവ്യൂകൾ', basePrice: 'അടിസ്ഥാന വില', description: 'വിവരണം', duration: 'സമയം', contactPerson: 'വ്യക്തി', available: 'ലഭ്യമാണ്'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('appLang') || 'en');
  const t = translations[lang] || translations['en'];

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

const LanguageSupport = () => {
  const { lang: activeLang, setLang: setActiveLang, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', native: 'English', icon: '🇺🇸' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', icon: '🇮🇳' }
  ];

  const styles = {
    container: {
      padding: '24px',
      background: '#fff',
      borderRadius: '24px',
      fontFamily: "'Inter', sans-serif",
      maxWidth: '500px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
    },
    title: {
      fontSize: '20px',
      fontWeight: 800,
      color: '#1e293b',
      margin: 0,
    },
    langList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '32px',
    },
    langItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      borderRadius: '16px',
      border: `2px solid ${isActive ? '#e23744' : '#f1f5f9'}`,
      background: isActive ? '#fef2f2' : '#fff',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    langInfo: {
      display: 'flex',
      alignItems: 'center', gap: '16px',
    },
    langFlag: { fontSize: '24px' },
    langName: { fontSize: '16px', fontWeight: 700, color: '#1e293b' },
    langNative: { fontSize: '13px', color: '#64748b', marginLeft: '4px' },
    previewSection: {
      background: '#f8fafc',
      padding: '24px',
      borderRadius: '20px',
      border: '1px solid #e2e8f0',
    },
    previewTitle: {
      fontSize: '12px',
      fontWeight: 800,
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    mockUi: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    mockSearch: {
      padding: '12px 16px',
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      color: '#94a3b8',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    mockGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    mockCard: {
      background: '#fff',
      padding: '12px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      textAlign: 'center',
    },
    mockButton: {
      background: '#e23744',
      color: '#fff',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 700,
      marginTop: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ padding: '10px', background: '#fef2f2', borderRadius: '12px', color: '#e23744' }}>
          <Languages size={24} />
        </div>
        <div>
          <h2 style={styles.title}>{t.changeLanguage}</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Select your preferred language</p>
        </div>
      </header>

      {/* Language Selection List */}
      <div style={styles.langList}>
        {languages.map(l => (
          <div 
            key={l.code} 
            style={styles.langItem(activeLang === l.code)}
            onClick={() => setActiveLang(l.code)}
          >
            <div style={styles.langInfo}>
              <span style={styles.langFlag}>{l.icon}</span>
              <div>
                <span style={styles.langName}>{l.name}</span>
                <span style={styles.langNative}>({l.native})</span>
              </div>
            </div>
            {activeLang === l.code && (
              <div style={{ width: '24px', height: '24px', background: '#e23744', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Check size={14} strokeWidth={4} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Live Preview Section */}
      <div style={styles.previewSection}>
        <div style={styles.previewTitle}>
          <LayoutGrid size={14} />
          Live Preview
        </div>
        
        <div style={styles.mockUi}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>{t.welcome}</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{t.helpText}</div>
          </div>

          <div style={styles.mockSearch}>
            <Search size={16} />
            {t.searchPlaceholder}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{t.featuredServices}</span>
              <span style={{ fontSize: '12px', color: '#e23744', fontWeight: 700 }}>{t.viewAll}</span>
            </div>
            <div style={styles.mockGrid}>
              <div style={styles.mockCard}>
                <div style={{ width: '100%', height: '60px', borderRadius: '8px', background: '#eff6ff', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe size={20} color="#3b82f6" opacity={0.5} />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{t.services}</div>
                <div style={styles.mockButton}>
                  {t.bookNow}
                </div>
              </div>
              <div style={styles.mockCard}>
                <div style={{ width: '100%', height: '60px', borderRadius: '8px', background: '#fef2f2', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={20} color="#e23744" opacity={0.5} />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>Help</div>
                <div style={{ ...styles.mockButton, background: '#f1f5f9', color: '#1e293b' }}>
                  Chat
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '24px', textAlign: 'center', 
        fontSize: '12px', color: '#94a3b8', fontStyle: 'italic'
      }}>
        Selection will be applied across and persists in local storage.
      </div>

    </div>
  );
};

export default LanguageSupport;
