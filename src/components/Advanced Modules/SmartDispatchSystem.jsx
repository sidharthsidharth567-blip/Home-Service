import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  UserCheck, 
  MapPin, 
  Maximize, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Navigation,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';

const SmartDispatchSystem = ({ onProviderAssigned }) => {
  const [radius, setRadius] = useState(5);
  const [isExpanding, setIsExpanding] = useState(false);
  const [searching, setSearching] = useState(true);
  const [foundProviders, setFoundProviders] = useState([]);
  const [acceptedProvider, setAcceptedProvider] = useState(null);
  const [countdown, setCountdown] = useState(15); // Countdown for auto-expansion or first-accept

  // Dummy Data for Providers
  const allProviders = [
    { id: 1, name: 'Sujith Kumar', service: 'Electrical', rating: 4.8, distance: 3.2, jobs: 120, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sujith' },
    { id: 2, name: 'Rahul Varma', service: 'Plumbing', rating: 4.6, distance: 4.5, jobs: 85, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
    { id: 3, name: 'Anjali Nair', service: 'Cleaning', rating: 4.9, distance: 7.8, jobs: 210, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali' },
    { id: 4, name: 'Faisal Khan', service: 'Appliance Repair', rating: 4.7, distance: 9.1, jobs: 156, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faisal' },
    { id: 5, name: 'Deepak Das', service: 'Electrical', rating: 4.5, distance: 2.1, jobs: 92, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak' },
  ];

  useEffect(() => {
    let timer;
    if (searching && !acceptedProvider) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Logic for Expansion
            if (radius === 5) {
              setRadius(10);
              setIsExpanding(true);
              setTimeout(() => setIsExpanding(false), 2000);
              return 15; // Reset countdown for the 10km radius
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [searching, radius, acceptedProvider]);

  useEffect(() => {
    // Filter providers based on current radius
    const filtered = allProviders.filter(p => p.distance <= radius);
    setFoundProviders(filtered);

    // Simulate "First Accept" after finding providers in the radius
    if (filtered.length > 0 && searching && !acceptedProvider) {
      const acceptTimer = setTimeout(() => {
        // Randomly pick one from found providers to "Accept" first
        const randomIndex = Math.floor(Math.random() * filtered.length);
        const winner = filtered[randomIndex];
        setAcceptedProvider(winner);
        setSearching(false);
        if (onProviderAssigned) onProviderAssigned(winner);
      }, 4000); // 4 seconds delay to simulate "waiting for response"
      return () => clearTimeout(acceptTimer);
    }
  }, [radius, searching, acceptedProvider]);

  return (
    <div style={{
      padding: '24px',
      background: '#fff',
      borderRadius: '24px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
      maxWidth: '500px',
      margin: '20px auto',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow Effect */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(226,55,68,0.05) 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* Header Section */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: 0 }}>Smart Dispatch</h2>
          <div style={{ 
            background: acceptedProvider ? '#ecfdf5' : '#fff1f2', 
            color: acceptedProvider ? '#10b981' : '#e11d48',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            {acceptedProvider ? <CheckCircle2 size={14} /> : <Radar size={14} className={searching ? "animate-spin" : ""} />}
            <span>{acceptedProvider ? 'Assigned' : 'Searching...'}</span>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
          {acceptedProvider ? `Job secured by ${acceptedProvider.name}` : `Finding nearest providers within ${radius}km`}
        </p>
      </div>

      {/* Scanner Visualizer */}
      {!acceptedProvider && (
        <div style={{
          height: '240px',
          background: '#f8fafc',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginBottom: '24px',
          border: '1px solid #f1f5f9',
          overflow: 'hidden'
        }}>
          {/* Scanning Animation */}
          <div style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '2px solid rgba(226, 55, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, transparent, rgba(226, 55, 68, 0.2))',
              animation: 'spin 2s linear infinite'
            }} />
          </div>

          <MapPin size={32} color="#e11d48" fill="rgba(226,55,68,0.2)" style={{ position: 'relative', zIndex: 2 }} />
          
          <div style={{ marginTop: '20px', textAlign: 'center', zIndex: 2 }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Expanding Radius logic active
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <div style={{
                padding: '4px 10px',
                background: radius === 5 ? '#e11d48' : '#e2e8f0',
                color: radius === 5 ? '#fff' : '#64748b',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                transition: 'all 0.3s'
              }}>5km</div>
              <ChevronRight size={14} color="#cbd5e1" />
              <div style={{
                padding: '4px 10px',
                background: radius === 10 ? '#e11d48' : '#e2e8f0',
                color: radius === 10 ? '#fff' : '#64748b',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                transition: 'all 0.3s'
              }}>10km</div>
            </div>
          </div>

          {isExpanding && (
            <div style={{
              position: 'absolute',
              bottom: '12px',
              padding: '6px 16px',
              background: '#1e293b',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 600,
              animation: 'fadeInUp 0.3s ease-out'
            }}>
              Expanding search to 10km...
            </div>
          )}
        </div>
      )}

      {/* Provider List / Result Section */}
      <div style={{ zIndex: 1, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#334155', margin: 0 }}>
            {acceptedProvider ? 'Assigned Provider' : `Pinged Providers (${foundProviders.length})`}
          </h3>
          {!acceptedProvider && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '12px' }}>
              <Clock size={12} />
              <span>Auto-expand in {countdown}s</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(acceptedProvider ? [acceptedProvider] : foundProviders).map((provider) => (
            <div key={provider.id} style={{
              padding: '16px',
              background: acceptedProvider ? '#f0fdf4' : '#fff',
              borderRadius: '16px',
              border: acceptedProvider ? '1.5px solid #86efac' : '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s ease',
              animation: 'slideIn 0.4s ease-out'
            }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={provider.image} 
                  alt={provider.name} 
                  style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8fafc' }} 
                />
                {acceptedProvider && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    right: '-4px',
                    background: '#10b981',
                    borderRadius: '50%',
                    padding: '2px',
                    border: '2px solid #fff'
                  }}>
                    <UserCheck size={10} color="#fff" />
                  </div>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', margin: 0 }}>{provider.name}</h4>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>{provider.distance} km</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>
                    <Star size={10} fill="#f59e0b" />
                    <span>{provider.rating}</span>
                  </div>
                  <span style={{ color: '#cbd5e1' }}>•</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>{provider.jobs} Jobs completed</span>
                </div>
              </div>

              {acceptedProvider ? (
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: '#10b981', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Navigation size={14} color="#fff" />
                </div>
              ) : (
                <div style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#64748b',
                  background: '#f1f5f9',
                  padding: '4px 8px',
                  borderRadius: '6px',
                }}>
                  PENDING
                </div>
              )}
            </div>
          ))}

          {foundProviders.length === 0 && !acceptedProvider && (
            <div style={{ 
              padding: '30px', 
              textAlign: 'center', 
              background: '#fff7ed', 
              borderRadius: '16px', 
              border: '1px dashed #fdba74' 
            }}>
              <AlertCircle size={24} color="#f97316" style={{ margin: '0 auto 8px' }} />
              <p style={{ fontSize: '13px', color: '#9a3412', fontWeight: 600, margin: 0 }}>
                No providers found within {radius}km.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-spin {
            animation: spin 2s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default SmartDispatchSystem;
