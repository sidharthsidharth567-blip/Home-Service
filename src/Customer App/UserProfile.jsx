import { useState, useEffect, useRef } from 'react';
import { Camera, Mail, Phone, User, X, Check, ShieldCheck, ZoomIn, Wallet as WalletIcon, Languages, Crown, AlertOctagon, Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import WalletSystem from '../components/Advanced Modules/WalletSystem';
import LanguageSupport from '../components/Advanced Modules/LanguageSupport';
import AMCSubscription from '../components/Advanced Modules/AMCSubscription';
import DisputeCenter from '../components/Advanced Modules/DisputeCenter';
import { useLanguage } from '../components/Advanced Modules/LanguageSupport';

const DUMMY_REVIEWS = [
  { id: 1, service: 'AC Repair', technician: 'Amit Sharma', rating: 5, comment: 'Excellent service! The AC is cooling perfectly now. Very professional technician.', date: 'Oct 12, 2024' },
  { id: 2, service: 'Plumbing', technician: 'Rajesh Kumar', rating: 4, comment: 'Found the leak and fixed it quickly. Minor delay in arrival but good work.', date: 'Sep 28, 2024' },
];

const DUMMY_PHOTOS = [
  'https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=400&q=80',
];

const DUMMY_FOLLOWERS = [
  { id: 1, name: 'Amit Sharma', expertise: 'Senior HVAC Specialist', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { id: 2, name: 'Sujith Kumar', expertise: 'Master Plumber', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  { id: 3, name: 'Priya Verma', expertise: 'Cleaning Expert', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
];

const DUMMY_RECENTLY = [
  { id: 1, service: 'Deep Kitchen Cleaning', price: '₹1,499', status: 'Completed', date: 'Yesterday' },
  { id: 2, service: 'Fan Installation', price: '₹250', status: 'Ongoing', date: 'Today' },
  { id: 3, service: 'Fridge Gas Refill', price: '₹1,800', status: 'Completed', date: '3 days ago' },
];

const DUMMY_ADDRESSES = [
  { id: 1, type: 'Home', address: 'Flat 402, Sunshine Apartments, MG Road, Bangalore - 560001', isDefault: true },
  { id: 2, type: 'Office', address: 'Plot 12, Tech Park, Whitefield, Bangalore - 560066', isDefault: false },
];

const profileTheme = {
  zomatoRed: '#e23744',
  zomatoRedHover: '#d12c38',
  zomatoRedLight: '#fef3f4',
  zomatoGreen: '#24963f',
  zomatoBorder: '#e8e8e8',
  textDark: '#1c1c1c',
  textGray: '#696969',
  textLight: '#9c9c9c',
  bgPage: '#ffffff',
  shadowMd: '0 8px 24px rgba(28, 28, 28, 0.12)',
  radiusSm: '6px',
  radiusMd: '12px',
  radiusLg: '20px',
};

function UserProfile({ user, initialTab = 'reviews', onUpdateUser }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isViewPhotoOpen, setIsViewPhotoOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const { t } = useLanguage();

  const fileInputRef = useRef(null);
  const menuRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  );

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarSrc(URL.createObjectURL(file));
    setIsAvatarMenuOpen(false);
  };

  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsAvatarMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = user?.name || 'Sidhu Sidharth';

  useEffect(() => { setActiveTab(initialTab); }, [initialTab]);
  useEffect(() => {
    if (user) setEditData({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
  }, [user]);

  const [notifyAll, setNotifyAll] = useState(false);
  const [notifyNews, setNotifyNews] = useState(true);
  const [notifyPromos, setNotifyPromos] = useState(true);

  const handleToggleAll = (e) => {
    const val = e.target.checked;
    setNotifyAll(val); setNotifyNews(val); setNotifyPromos(val);
  };

  const handleSaveProfile = () => {
    if (onUpdateUser) {
      onUpdateUser({ name: editData.name, email: editData.email, phone: editData.phone });
      alert('Profile updated successfully!');
    }
    setIsEditModalOpen(false);
  };

  const styles = {
    body: { width: '100%', backgroundColor: profileTheme.bgPage, minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
    banner: { position: 'relative', width: '100%', height: isMobile ? '220px' : '300px', background: '#fdfdfd' },
    bannerBg: {
      width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center',
      position: 'absolute', top: 0, left: 0,
      backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80")',
    },
    bannerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' },
    bannerContent: {
      position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', height: '100%',
      display: 'flex', flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      alignItems: isMobile ? 'flex-start' : 'flex-end',
      padding: isMobile ? '20px 20px 40px' : '0 20px 20px', gap: isMobile ? '20px' : '0',
    },
    profileIdentity: {
      display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end',
      flexDirection: isMobile ? 'column' : 'row', gap: '20px', marginBottom: isMobile ? '-40px' : '0',
    },
    avatarWrap: {
      width: isMobile ? '100px' : '140px', height: isMobile ? '100px' : '140px',
      borderRadius: '50%', border: '4px solid white', overflow: 'hidden',
      position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', cursor: 'pointer',
    },
    avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
    userName: { color: 'white', fontSize: isMobile ? '24px' : '28px', fontWeight: 500, marginBottom: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' },
    bannerActions: { display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '20px' },
    editBtn: {
      background: profileTheme.zomatoRed, color: 'white', border: 'none',
      borderRadius: profileTheme.radiusSm, padding: '8px 16px', fontSize: '14px',
      fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center',
      gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    stats: { display: 'flex', alignItems: 'center', gap: '20px', color: 'white' },
    statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.8)' },
    count: { fontSize: '20px', fontWeight: 600 },
    statLabel: { fontSize: '13px', fontWeight: 500 },
    statDivider: { width: '1px', height: '30px', background: 'rgba(255,255,255,0.4)' },
    container: {
      maxWidth: '1100px', margin: '32px auto', padding: '0 20px',
      display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: '40px',
    },
    navGroupTitle: { fontSize: '12px', color: profileTheme.textLight, letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' },
    navItem: (active) => ({
      textAlign: 'left',
      background: active ? `linear-gradient(to right, ${profileTheme.zomatoRedLight} 0%, transparent 100%)` : 'transparent',
      border: 'none', borderLeft: `3px solid ${active ? profileTheme.zomatoRed : 'transparent'}`,
      padding: '12px 16px', fontSize: '16px', color: active ? profileTheme.zomatoRed : profileTheme.textGray,
      fontWeight: active ? 500 : 400, cursor: 'pointer', transition: 'all 0.2s',
    }),
    contentArea: { minHeight: '400px' },
    tabTitle: { fontSize: '24px', fontWeight: 500, color: profileTheme.textDark, marginBottom: '24px' },
    settingsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
    settingsSub: { color: profileTheme.textGray, fontSize: '14px', marginTop: '4px' },
    saveBtn: { background: '#d4d4d4', color: 'white', border: 'none', padding: '8px 24px', borderRadius: profileTheme.radiusSm, fontSize: '15px', cursor: 'pointer', transition: 'background 0.2s' },
    notifyRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px 0', borderBottom: `1px solid ${profileTheme.zomatoBorder}` },
    notifyInfo: { maxWidth: '80%' },
    notifyTitle: { fontSize: '16px', fontWeight: 500, color: profileTheme.textDark, marginBottom: '6px' },
    notifyDesc: { fontSize: '14px', color: profileTheme.textGray, lineHeight: 1.4 },
    emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', textAlign: 'center' },
    emptyText: { fontSize: '20px', color: '#4a4a4a', fontWeight: 400 },
    modalOverlay: {
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)',
    },
    modalContainer: {
      background: '#fff', width: isMobile ? '90%' : '450px', borderRadius: profileTheme.radiusLg,
      overflow: 'hidden', position: 'relative', boxShadow: profileTheme.shadowMd,
      animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    modalHeader: { padding: '24px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    modalTitle: { fontSize: '24px', fontWeight: 700, color: profileTheme.textDark, margin: 0 },
    modalClose: { background: '#f8f8f8', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#696969' },
    modalBody: { padding: '0 24px 24px' },
    inputGroup: { marginBottom: '20px' },
    inputLabel: { display: 'block', fontSize: '13px', fontWeight: 600, color: profileTheme.textLight, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' },
    inputWrap: { display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${profileTheme.zomatoBorder}`, borderRadius: '12px', padding: '12px 16px' },
    modalInput: { border: 'none', width: '100%', fontSize: '16px', color: profileTheme.textDark, outline: 'none', background: 'transparent' },
    modalAction: { width: '100%', background: profileTheme.zomatoRed, color: '#fff', border: 'none', borderRadius: '12px', padding: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', marginTop: '12px', boxShadow: '0 4px 12px rgba(226, 55, 68, 0.3)' },
    
    // New Styles
    reviewCard: { background: '#fff', border: `1px solid ${profileTheme.zomatoBorder}`, borderRadius: profileTheme.radiusMd, padding: '16px', marginBottom: '16px' },
    photoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' },
    photoItem: { width: '100%', height: '140px', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${profileTheme.zomatoBorder}` },
    followerCard: { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderBottom: `1px solid ${profileTheme.zomatoBorder}` },
    addressCard: { 
      padding: '20px', border: `1px solid ${profileTheme.zomatoBorder}`, borderRadius: profileTheme.radiusMd, marginBottom: '16px',
      position: 'relative', background: '#fff'
    },
    historyRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: `1px solid ${profileTheme.zomatoBorder}` },
  };

  const renderContent = () => {
    if (activeTab === 'settings') {
      return (
        <div style={styles.contentArea}>
          <div style={styles.settingsHeader}>
            <div>
              <h2 style={{ ...styles.tabTitle, marginBottom: 0 }}>Notification Preferences</h2>
              <p style={styles.settingsSub}>Receive updates related to order status, promo codes and more</p>
            </div>
            <button style={styles.saveBtn} onMouseOver={(e) => e.target.style.background = '#b0b0b0'} onMouseOut={(e) => e.target.style.background = '#d4d4d4'}>Save</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={styles.notifyRow}>
              <div style={styles.notifyInfo}>
                <h3 style={styles.notifyTitle}>Enable all</h3>
                <p style={styles.notifyDesc}>Activate all notifications across push and email</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '12px', color: profileTheme.textGray, fontSize: '12px', fontWeight: 500, marginBottom: '4px' }}>
                  <span>Push</span><span>Email</span>
                </div>
                <label className="zomato-switch">
                  <input type="checkbox" checked={notifyAll} onChange={handleToggleAll} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div style={styles.notifyRow}>
              <div style={styles.notifyInfo}>
                <h3 style={styles.notifyTitle}>Newsletters</h3>
                <p style={styles.notifyDesc}>Receive newsletter to stay up-to date with whats brewing in home maintenance</p>
              </div>
              <label className="zomato-switch">
                <input type="checkbox" checked={notifyNews} onChange={(e) => setNotifyNews(e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div style={styles.notifyRow}>
              <div style={styles.notifyInfo}>
                <h3 style={styles.notifyTitle}>Promos and offers</h3>
                <p style={styles.notifyDesc}>Receive updates about coupons, promotions and money-saving offers</p>
              </div>
              <label className="zomato-switch">
                <input type="checkbox" checked={notifyPromos} onChange={(e) => setNotifyPromos(e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      );
    }
    if (activeTab === 'wallet') {
      return (
        <div style={styles.contentArea}>
          <WalletSystem balance={2450.00} />
        </div>
      );
    }
    if (activeTab === 'language') {
      return (
        <div style={styles.contentArea}>
          <LanguageSupport />
        </div>
      );
    }
    if (activeTab === 'subscription') {
      return (
        <div style={styles.contentArea}>
          <AMCSubscription />
        </div>
      );
    }
    if (activeTab === 'disputes') {
      return (
        <div style={styles.contentArea}>
          <DisputeCenter />
        </div>
      );
    }
    if (activeTab === 'reviews') {
      return (
        <div style={styles.contentArea}>
          <h2 style={styles.tabTitle}>{t.reviews || 'My Reviews'}</h2>
          {DUMMY_REVIEWS.map(rev => (
            <div key={rev.id} style={styles.reviewCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, color: profileTheme.textDark }}>{rev.service}</span>
                <span style={{ fontSize: '12px', color: profileTheme.textLight }}>{rev.date}</span>
              </div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < rev.rating ? "#FFD700" : "none"} color={i < rev.rating ? "#FFD700" : "#ccc"} />)}
              </div>
              <p style={{ fontSize: '14px', color: profileTheme.textGray, margin: '8px 0' }}>{rev.comment}</p>
              <div style={{ fontSize: '12px', fontWeight: 500, color: profileTheme.zomatoRed }}>Technician: {rev.technician}</div>
            </div>
          ))}
        </div>
      );
    }
    if (activeTab === 'photos') {
      return (
        <div style={styles.contentArea}>
          <h2 style={styles.tabTitle}>Work Photos</h2>
          <div style={styles.photoGrid}>
            {DUMMY_PHOTOS.map((src, i) => (
              <div key={i} style={styles.photoItem}>
                <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Work" />
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (activeTab === 'followers') {
      return (
        <div style={styles.contentArea}>
          <h2 style={styles.tabTitle}>Favorite Technicians</h2>
          <div style={{ background: '#fff', borderRadius: profileTheme.radiusMd, overflow: 'hidden', border: `1px solid ${profileTheme.zomatoBorder}` }}>
            {DUMMY_FOLLOWERS.map(f => (
              <div key={f.id} style={styles.followerCard}>
                <img src={f.avatar} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} alt={f.name} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: profileTheme.textDark }}>{f.name}</div>
                  <div style={{ fontSize: '12px', color: profileTheme.textGray }}>{f.expertise}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: '#24963f' }}>
                    <Star size={14} fill="#24963f" /> {f.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (activeTab === 'recently') {
      return (
        <div style={styles.contentArea}>
          <h2 style={styles.tabTitle}>Recently Viewed</h2>
          <div style={{ background: '#fff', borderRadius: profileTheme.radiusMd, overflow: 'hidden', border: `1px solid ${profileTheme.zomatoBorder}` }}>
            {DUMMY_RECENTLY.map(h => (
              <div key={h.id} style={styles.historyRow}>
                <div>
                  <div style={{ fontWeight: 600, color: profileTheme.textDark }}>{h.service}</div>
                  <div style={{ fontSize: '12px', color: profileTheme.textLight }}>{h.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: profileTheme.textDark }}>{h.price}</div>
                  <div style={{ fontSize: '12px', color: h.status === 'Ongoing' ? '#f59e0b' : '#24963f', fontWeight: 600 }}>{h.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (activeTab === 'addresses') {
      return (
        <div style={styles.contentArea}>
          <h2 style={styles.tabTitle}>Saved Addresses</h2>
          {DUMMY_ADDRESSES.map(addr => (
            <div key={addr.id} style={styles.addressCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <MapPin size={18} color={profileTheme.zomatoRed} />
                <span style={{ fontWeight: 700, fontSize: '16px' }}>{addr.type}</span>
                {addr.isDefault && <span style={{ fontSize: '10px', background: profileTheme.zomatoRedLight, color: profileTheme.zomatoRed, padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>DEFAULT</span>}
              </div>
              <p style={{ fontSize: '14px', color: profileTheme.textGray, marginLeft: '30px', lineHeight: 1.5 }}>{addr.address}</p>
              <button style={{ background: 'none', border: 'none', color: profileTheme.zomatoRed, fontSize: '13px', fontWeight: 600, marginTop: '12px', marginLeft: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Edit Address <ArrowRight size={14} />
              </button>
            </div>
          ))}
          <button style={{ width: '100%', padding: '16px', borderRadius: '12px', border: `2px dashed ${profileTheme.zomatoBorder}`, background: 'none', color: profileTheme.textGray, fontWeight: 600, cursor: 'pointer' }}>
            + Add New Address
          </button>
        </div>
      );
    }
    return (
      <div style={styles.contentArea}>
        <h2 style={styles.tabTitle}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
        <div style={styles.emptyState}>
          <div style={{ width: '250px', marginBottom: '30px' }}>
            <img src="https://b.zmtcdn.com/web/assets/empty_state_image.png" alt="Nothing here yet" style={{ width: '100%' }} />
          </div>
          <h3 style={styles.emptyText}>{t.nothingHere || 'Nothing here yet'}</h3>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.body}>
      <style>{`
        @keyframes modalSlideIn { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .zomato-switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .zomato-switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius: 34px; transition: .4s; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; border-radius: 50%; transition: .4s; }
        input:checked + .slider { background-color: ${profileTheme.zomatoRed}; }
        input:checked + .slider:before { transform: translateX(20px); }
        .avatar-hover-wrap .cam-overlay { opacity: 0; transition: opacity 0.2s; }
        .avatar-hover-wrap:hover .cam-overlay { opacity: 1; }
        .menu-item { width: 100%; text-align: left; background: transparent; border: none; padding: 12px 16px; font-size: 14px; color: ${profileTheme.textDark}; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.15s; }
        .menu-item:hover { background: #f5f5f5; }
      `}</style>

      {/* Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerBg}></div>
        <div style={styles.bannerOverlay}></div>
        <div style={styles.bannerContent}>
          <div style={styles.profileIdentity}>

            {/* Avatar area */}
            <div style={{ position: 'relative' }} ref={menuRef}>
              <div
                className="avatar-hover-wrap"
                style={styles.avatarWrap}
                onClick={() => setIsAvatarMenuOpen((p) => !p)}
              >
                <img src={avatarSrc} alt={userName} style={styles.avatarImg} />
                <div className="cam-overlay" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'white',
                }}>
                  <Camera size={20} />
                </div>
              </div>

              {/* Dropdown */}
              {isAvatarMenuOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', left: 0,
                  background: '#fff', borderRadius: profileTheme.radiusMd,
                  boxShadow: profileTheme.shadowMd, overflow: 'hidden',
                  zIndex: 50, minWidth: '180px',
                  border: `1px solid ${profileTheme.zomatoBorder}`,
                  animation: 'fadeIn 0.15s ease',
                }}>
                  <button className="menu-item" onClick={() => { setIsViewPhotoOpen(true); setIsAvatarMenuOpen(false); }}>
                    <ZoomIn size={16} color={profileTheme.textGray} />
                    View photo
                  </button>
                  <div style={{ height: '1px', background: profileTheme.zomatoBorder }} />
                  <button className="menu-item" onClick={() => { fileInputRef.current?.click(); setIsAvatarMenuOpen(false); }}>
                    <Camera size={16} color={profileTheme.textGray} />
                    Change photo
                  </button>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </div>

            <h1 style={styles.userName}>{userName}</h1>
          </div>

          <div style={styles.bannerActions}>
            <button style={styles.editBtn} onClick={() => setIsEditModalOpen(true)}>
              <Check size={14} /> {t.editProfile || 'Edit profile'}
            </button>
            <div style={styles.stats}>
              <div style={styles.statItem}><span style={styles.count}>{DUMMY_REVIEWS.length}</span><span style={styles.statLabel}>Reviews</span></div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}><span style={styles.count}>{DUMMY_PHOTOS.length}</span><span style={styles.statLabel}>Photos</span></div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}><span style={styles.count}>{DUMMY_FOLLOWERS.length}</span><span style={styles.statLabel}>Following</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div style={styles.container}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={styles.navGroupTitle}>{t.activity || 'ACTIVITY'}</h4>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {['reviews', 'photos', 'followers', 'recently', 'wallet', 'language'].map(tab => (
                <button key={tab} style={styles.navItem(activeTab === tab)} onClick={() => setActiveTab(tab)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {tab === 'wallet' && <WalletIcon size={16} />}
                    {tab === 'language' && <Languages size={16} />}
                    {t[tab === 'followers' ? 'favoriteTechnicians' : tab === 'recently' ? 'recentlyViewed' : tab] || (tab.charAt(0).toUpperCase() + tab.slice(1))}
                  </div>
                </button>
              ))}
            </nav>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={styles.navGroupTitle}>{t.onlineOrdering || 'ONLINE ORDERING'}</h4>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              <button style={styles.navItem(activeTab === 'addresses')} onClick={() => setActiveTab('addresses')}>{t.myAddresses || 'My addresses'}</button>
              <button style={styles.navItem(activeTab === 'subscription')} onClick={() => setActiveTab('subscription')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Crown size={16} /> {t.mySubscription || 'My Subscription'}
                </div>
              </button>
            </nav>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={styles.navGroupTitle}>{t.account || 'ACCOUNT'}</h4>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              <button style={styles.navItem(activeTab === 'settings')} onClick={() => setActiveTab('settings')}>{t.settings || 'Settings'}</button>
            </nav>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={styles.navGroupTitle}>{t.support || 'SUPPORT'}</h4>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              <button style={styles.navItem(activeTab === 'disputes')} onClick={() => setActiveTab('disputes')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertOctagon size={16} /> {t.supportDisputes || 'Support & Disputes'}
                </div>
              </button>
            </nav>
          </div>
        </aside>
        <main style={styles.contentArea}>{renderContent()}</main>
      </div>

      {/* View Photo Modal */}
      {isViewPhotoOpen && (
        <div
          style={{ ...styles.modalOverlay, backgroundColor: 'rgba(0,0,0,0.88)' }}
          onClick={(e) => e.target === e.currentTarget && setIsViewPhotoOpen(false)}
        >
          <div style={{ position: 'relative', animation: 'fadeIn 0.2s ease' }}>
            <button
              onClick={() => setIsViewPhotoOpen(false)}
              style={{
                position: 'absolute', top: '-44px', right: 0,
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                width: '36px', height: '36px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', color: 'white',
              }}
            >
              <X size={20} />
            </button>
            <img
              src={avatarSrc}
              alt={userName}
              style={{
                width: isMobile ? '82vw' : '420px',
                height: isMobile ? '82vw' : '420px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '4px solid rgba(255,255,255,0.2)',
                display: 'block',
              }}
            />
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '16px' }}>
              {userName}
            </p>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div
          style={styles.modalOverlay}
          onClick={(e) => e.target === e.currentTarget && setIsEditModalOpen(false)}
        >
          <div style={styles.modalContainer}>
            <header style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Edit Profile</h2>
              <button style={styles.modalClose} onClick={() => setIsEditModalOpen(false)}><X size={20} /></button>
            </header>
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Full Name</label>
                <div style={styles.inputWrap}>
                  <User size={18} color={profileTheme.zomatoRed} />
                  <input style={styles.modalInput} type="text" value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })} placeholder="Enter your name" />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Email Address</label>
                <div style={styles.inputWrap}>
                  <Mail size={18} color={profileTheme.zomatoRed} />
                  <input style={styles.modalInput} type="email" value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })} placeholder="example@gmail.com" />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Phone Number</label>
                <div style={styles.inputWrap}>
                  <Phone size={18} color={profileTheme.zomatoRed} />
                  <input style={styles.modalInput} type="tel" value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })} placeholder="+91 00000 00000" />
                </div>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#24963f', fontSize: '13px', fontWeight: 600 }}>
                  <ShieldCheck size={16} /> Verified Account
                </div>
              </div>
              <button
                style={styles.modalAction}
                onClick={handleSaveProfile}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = profileTheme.zomatoRedHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = profileTheme.zomatoRed; e.currentTarget.style.transform = 'none'; }}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;