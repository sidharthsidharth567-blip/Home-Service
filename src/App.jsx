import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Loyout/Navbar';
import Footer from './components/Loyout/Footer';
import Home from './Customer App/Home';
import CategoryView from './Customer App/CategoryView';
import ServiceDetail from './Customer App/ServiceDetail';
import BookingFlow from './Customer App/BookingFlow';
import Bookings from './Customer App/Bookings';
import { categoryList } from './Customer App/serviceData';
import Login from './components/Auth/Login';
import ServiceProviderDashboard from './Service Provider Application/ServiceProviderDashboard';
import AppLiveTracking from './Customer App/AppLiveTracking';
import UserProfile from './Customer App/UserProfile';
import UserProviderManagement from './components/Admin Panel/UserProviderManagement';
import JobDocumentation from './components/Advanced Modules/JobDocumentation';
import './App.css';

const resolveCategoryFromTerm = (term) => {
  if (!term) return 'Plumbing';

  const normalizedTerm = term.toLowerCase();
  const exactCategory = categoryList.find((category) => category.name.toLowerCase() === normalizedTerm);
  if (exactCategory) return exactCategory.name;

  const partialCategory = categoryList.find((category) =>
    normalizedTerm.includes(category.name.toLowerCase()) ||
    category.name.toLowerCase().includes(normalizedTerm)
  );
  if (partialCategory) return partialCategory.name;

  const categoryBySubService = categoryList.find((category) =>
    category.subServices?.some((subService) => subService.toLowerCase().includes(normalizedTerm))
  );
  if (categoryBySubService) return categoryBySubService.name;

  if (normalizedTerm.includes('appliance') || normalizedTerm.includes('fridge') || normalizedTerm.includes('washing')) {
    return 'AC Repair';
  }

  return 'Plumbing';
};

function App() {
  const [preAuthPage, setPreAuthPage] = useState('home');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'tech', text: 'Hi! I am on my way. Will be there in about 8 minutes.' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [activePage, setActivePage] = useState(() => {
    return sessionStorage.getItem('activePage') || 'home';
  });
  const [scrollTarget, setScrollTarget] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('appTheme') || 'light');
  const [activeCategory, setActiveCategory] = useState('Cleaning');
  const [selectedLocation, setSelectedLocation] = useState('Trivandrum');
  const [categorySearchSeed, setCategorySearchSeed] = useState('');
  const [activeBusiness, setActiveBusiness] = useState(null);
  const [trackingBooking, setTrackingBooking] = useState(null);
  const [bookingInit, setBookingInit] = useState({
    service: 'Plumbing',
    subService: 'Pipe Leak',
  });
  const [profileTab, setProfileTab] = useState('reviews');
  const [bookings, setBookings] = useState([
    {
      id: 'BH-1024',
      service: 'Plumbing',
      subService: 'Pipe Leak',
      status: 'Ongoing',
      date: 'ASAP',
      time: 'ASAP',
      address: '2nd Floor, Rajajinagar, Bangalore',
      technician: 'Amit Sharma',
      eta: '20-30 mins',
      price: '₹1,250',
      paymentMethod: 'Cash',
    },
    {
      id: 'BH-4592',
      service: 'Kitchen Sink Repair',
      subService: 'Main Pipe Leakage',
      status: 'Completed',
      date: 'Oct 24, 2023',
      time: '11:00 AM',
      address: 'Indiranagar, Bangalore',
      technician: 'Sujith Kumar',
      price: '₹1,100',
      paymentMethod: 'UPI',
    },
    {
      id: 'BH-3891',
      service: 'AC Repair',
      subService: 'Gas Condenser Leak',
      status: 'Cancelled',
      date: 'Sep 15, 2026',
      time: '10:00 AM',
      address: 'Koramangala, Bangalore',
      technician: 'Ravi Kumar',
      price: '₹1,850',
      paymentMethod: 'Credit Card',
      description: 'Cancellation Reason: Customer requested cancellation due to personal emergency.\nRefund Status: Initiated.\nNotes: Please call user next time.',
    },
  ]);

  const [showDocumentation, setShowDocumentation] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Persist session changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    sessionStorage.setItem('activePage', activePage);
  }, [activePage]);

  // Theme logic
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLoginClick = () => {
    setPreAuthPage(activePage);
    setActivePage('auth');
  };
  const handleCloseLogin = () => {
    setActivePage(preAuthPage === 'auth' ? 'home' : preAuthPage);
  };
  const handleLoginSuccess = (name, userType) => {
    setUser({ name, userType });
    setActivePage('home');
    if (userType === 'provider') {
      setActivePage('providerDashboard');
      return;
    }
    if (userType === 'admin') {
      setActivePage('adminManagement');
    }
  };

  const handleSendChat = useCallback(() => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages(prev => [
      ...prev,
      { from: 'user', text },
      { from: 'tech', text: 'Got it! I will be there shortly.' },
    ]);
    setChatInput('');
  }, [chatInput]);

  const handleLogout = () => {
    setUser(null);
    setActivePage('home');
    sessionStorage.clear();
  };

  const handleUpdateUser = (updatedInfo) => {
    setUser((prev) => ({ ...prev, ...updatedInfo }));
  };

  const handleNavigate = (target, tab = 'reviews') => {
    if (target === 'services') {
      const resolvedCategory = resolveCategoryFromTerm(tab);
      setActiveCategory(resolvedCategory);
      setCategorySearchSeed(tab && tab.toLowerCase() !== resolvedCategory.toLowerCase() ? tab : '');
      setActivePage('categoryView');
      setScrollTarget(null);
      return;
    }

    if (['bookings', 'bookingFlow', 'liveTracking', 'providerDashboard', 'adminManagement', 'profile'].includes(target)) {
      setActivePage(target);
      if (target === 'profile') setProfileTab(tab);
      setScrollTarget(null);
      return;
    }
    setActivePage('home');
    setScrollTarget(target);
  };

  const handleSelectCategory = (categoryName) => {
    setActiveCategory(categoryName);
    setCategorySearchSeed('');
    setActivePage('categoryView');
    setActiveBusiness(null);
    setScrollTarget(null);
  };

  const handleSelectBusiness = (business) => {
    setActiveBusiness(business);
    setActivePage('serviceDetail');
    setScrollTarget(null);
  };

  const handleBookFromCategory = (serviceName, subServiceName) => {
    if (!user) {
      setPreAuthPage(activePage);
      setActivePage('auth');
      return;
    }
    setBookingInit({
      service: serviceName,
      subService: subServiceName || 'General Service',
    });
    setActivePage('bookingFlow');
    setScrollTarget(null);
  };

  const handleConfirmBooking = (booking) => {
    setBookings((prev) => [booking, ...prev]);
    setActivePage('bookings');
  };

  const handleTrackBooking = (booking) => {
    setTrackingBooking(booking);
    setActivePage('liveTracking');
  };

  const handleCancelBooking = (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmCancel) {
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: 'Cancelled', description: 'Cancellation Note:\n- Cancelled by customer via Live Tracking view.\n- Service fee refunded successfully.' } : b
      ));
      setActivePage('bookings');
    }
  };

  const handleOpenDoc = (booking) => {
    setSelectedDoc(booking);
    setShowDocumentation(true);
  };

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    if (activePage === 'home' && scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollTarget(null);
    }
  }, [activePage, scrollTarget]);

  // Protect booking flow – redirect unauthenticated users
  useEffect(() => {
    if (activePage === 'bookingFlow' && !user) {
      setPreAuthPage('home');
      setActivePage('auth');
    }
  }, [activePage, user]);

  return (
    <div className="app">
      {activePage !== 'providerDashboard' && activePage !== 'adminManagement' && activePage !== 'auth' && (
        <Navbar
          onNavigate={handleNavigate}
          onLoginClick={handleLoginClick}
          user={user}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />
      )}

      <main className="app-main">
        {activePage === 'home' ? (
          <Home onSelectService={handleSelectCategory} onSelectBusiness={handleSelectBusiness} />
        ) : activePage === 'auth' ? (
          <Login onLoginSuccess={handleLoginSuccess} onClose={handleCloseLogin} />
        ) : activePage === 'categoryView' ? (
          <CategoryView
            initialCategory={activeCategory}
            initialSearch={categorySearchSeed}
            selectedLocation={selectedLocation}
            onBookNow={handleBookFromCategory}
            onSelectBusiness={handleSelectBusiness}
          />
        ) : activePage === 'serviceDetail' ? (
          <ServiceDetail
            business={activeBusiness}
            onBack={() => setActivePage('home')}
            onBookNow={handleBookFromCategory}
          />
        ) : activePage === 'bookingFlow' ? (
          <BookingFlow
            initialService={bookingInit.service}
            initialSubService={bookingInit.subService}
            onBack={() => setActivePage('home')}
            onConfirm={handleConfirmBooking}
          />
        ) : activePage === 'providerDashboard' ? (
          <ServiceProviderDashboard onBack={() => setActivePage('home')} />
        ) : activePage === 'adminManagement' ? (
          <UserProviderManagement
            onBack={() => setActivePage('home')}
            adminUser={user}
            onLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
          />
        ) : activePage === 'liveTracking' ? (
          <AppLiveTracking
            booking={{
              ...trackingBooking,
              onMessage: () => setShowChat(true),
              onCall: () => alert(`Calling ${trackingBooking?.technician}…`),
              onShare: () => alert('Location link copied!'),
              onCancel: () => handleCancelBooking(trackingBooking?.id),
            }}
            onBack={() => setActivePage('bookings')}
          />
        ) : activePage === 'profile' ? (
          <UserProfile
            user={user}
            initialTab={profileTab}
            onBack={() => setActivePage('home')}
            onUpdateUser={handleUpdateUser}
          />
        ) : (
          <Bookings
            onBack={() => setActivePage('home')}
            bookings={bookings}
            onTrack={handleTrackBooking}
            onViewDocumentation={handleOpenDoc}
          />
        )}
      </main>

      {showDocumentation && (
        <JobDocumentation
          jobId={selectedDoc?.id}
          service={selectedDoc?.service}
          technician={selectedDoc?.technician}
          onClose={() => setShowDocumentation(false)}
        />
      )}

      {activePage !== 'providerDashboard' && activePage !== 'adminManagement' && activePage !== 'auth' && <Footer />}

      {/* ── Chat Modal ── */}
      {showChat && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }} onClick={(e) => e.target === e.currentTarget && setShowChat(false)}>
          <div style={{
            width: '100%', maxWidth: 480,
            background: '#fff', borderRadius: '24px 24px 0 0',
            display: 'flex', flexDirection: 'column',
            maxHeight: '70vh', overflow: 'hidden',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.18)',
            animation: 'slideUp 0.3s ease',
          }}>
            <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
            {/* header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 20px', borderBottom: '1px solid #f1f5f9',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: '#e8f0fe', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#185FA5',
              }}>
                {trackingBooking?.technician?.split(' ').map(w => w[0]).join('').slice(0,2) || 'TK'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1c1c1c' }}>{trackingBooking?.technician || 'Technician'}</div>
                <div style={{ fontSize: 12, color: '#34a853', fontWeight: 600 }}>● Online</div>
              </div>
              <button onClick={() => setShowChat(false)} style={{
                background: '#f1f5f9', border: 'none', borderRadius: '50%',
                width: 34, height: 34, cursor: 'pointer', fontSize: 18, color: '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>×</button>
            </div>
            {/* messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '78%', padding: '10px 14px', borderRadius: 16,
                    background: msg.from === 'user' ? '#e23744' : '#f1f5f9',
                    color: msg.from === 'user' ? '#fff' : '#1c1c1c',
                    fontSize: 14, lineHeight: 1.5,
                    borderBottomRightRadius: msg.from === 'user' ? 4 : 16,
                    borderBottomLeftRadius: msg.from === 'tech' ? 4 : 16,
                  }}>{msg.text}</div>
                </div>
              ))}
            </div>
            {/* input */}
            <div style={{
              display: 'flex', gap: 10, padding: '12px 16px',
              borderTop: '1px solid #f1f5f9',
            }}>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                placeholder="Type a message…"
                style={{
                  flex: 1, padding: '10px 16px', border: '1.5px solid #e2e8f0',
                  borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'inherit',
                }}
              />
              <button
                onClick={handleSendChat}
                style={{
                  padding: '10px 20px', background: '#e23744', color: '#fff',
                  border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}
              >Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
