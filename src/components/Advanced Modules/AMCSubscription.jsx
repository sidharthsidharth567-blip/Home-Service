import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Crown, 
  Check, 
  Clock, 
  Headphones, 
  Wrench, 
  Gift,
  ChevronRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';

const AMCSubscription = () => {
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' | 'active'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'bronze',
      name: 'Bronze Plan',
      price: 2999,
      icon: <ShieldCheck size={28} />,
      color: '#cd7f32',
      benefits: [
        '2 Free Maintenance Visits',
        '15% Discount on Spare Parts',
        'Standard Support (24h TAT)',
        'Basic Health Checkup'
      ]
    },
    {
      id: 'silver',
      name: 'Silver Plan',
      price: 4999,
      icon: <Zap size={28} />,
      color: '#94a3b8',
      popular: true,
      benefits: [
        '4 Free Maintenance Visits',
        '25% Discount on Spare Parts',
        'Priority Support (12h TAT)',
        'Free Appliance Health Record',
        'Unlimited Tap Leakage Fixes'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Plan',
      price: 7999,
      icon: <Crown size={28} />,
      color: '#fbbf24',
      benefits: [
        'Unlimited Maintenance Visits',
        '50% Discount on Spare Parts',
        'VIP Emergency Support (2h TAT)',
        'Complete Home Wellness Audit',
        'Zero Visit Charges Forever',
        'Personal Relationship Manager'
      ]
    }
  ];

  const styles = {
    container: {
      padding: '24px',
      background: '#fff',
      borderRadius: '24px',
      fontFamily: "'Inter', sans-serif",
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 800,
      color: '#1e293b',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '15px',
      color: '#64748b',
    },
    planGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '40px',
    },
    planCard: (isActive, color, popular) => ({
      padding: '32px 24px',
      borderRadius: '24px',
      border: `2px solid ${isActive ? color : '#f1f5f9'}`,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: isActive ? `0 20px 40px ${color}15` : '0 4px 12px rgba(0,0,0,0.03)',
      transform: isActive ? 'translateY(-8px)' : 'none',
    }),
    popularBadge: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#e23744',
      color: '#fff',
      padding: '4px 16px',
      borderRadius: '99px',
      fontSize: '11px',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    benefitList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      margin: '24px 0',
      flex: 1,
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      fontSize: '13px',
      color: '#475569',
      lineHeight: 1.4,
    },
    priceTag: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '4px',
      marginTop: '16px',
    },
    priceVal: {
      fontSize: '32px',
      fontWeight: 900,
      color: '#1e293b',
    },
    promoSection: {
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      padding: '24px',
      borderRadius: '24px',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '32px',
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Annual Maintenance Plans</h2>
        <p style={styles.subtitle}>Peace of mind for your home, all year round.</p>
        
        <div style={{ 
          display: 'inline-flex', background: '#f1f5f9', padding: '4px', 
          borderRadius: '12px', marginTop: '24px' 
        }}>
          <button 
            onClick={() => setActiveTab('plans')}
            style={{ 
              padding: '8px 20px', borderRadius: '10px', border: 'none',
              background: activeTab === 'plans' ? '#fff' : 'transparent',
              fontWeight: 700, fontSize: '14px', cursor: 'pointer',
              color: activeTab === 'plans' ? '#1e293b' : '#64748b',
              boxShadow: activeTab === 'plans' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            All Plans
          </button>
          <button 
            onClick={() => setActiveTab('active')}
            style={{ 
              padding: '8px 20px', borderRadius: '10px', border: 'none',
              background: activeTab === 'active' ? '#fff' : 'transparent',
              fontWeight: 700, fontSize: '14px', cursor: 'pointer',
              color: activeTab === 'active' ? '#1e293b' : '#64748b',
              boxShadow: activeTab === 'active' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            My Subscription
          </button>
        </div>
      </div>

      {activeTab === 'plans' ? (
        <>
          <div style={styles.planGrid}>
            {plans.map(plan => (
              <div 
                key={plan.id} 
                style={styles.planCard(selectedPlan === plan.id, plan.color, plan.popular)}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && <div style={styles.popularBadge}>Most Trusted</div>}
                
                <div style={{ 
                  width: '56px', height: '56px', borderRadius: '16px', 
                  background: `${plan.color}15`, color: plan.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {plan.icon}
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: 0 }}>{plan.name}</h3>
                
                <div style={styles.priceTag}>
                  <span style={styles.priceVal}>₹{plan.price.toLocaleString()}</span>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>/ year</span>
                </div>

                <div style={styles.benefitList}>
                  {plan.benefits.map((b, i) => (
                    <div key={i} style={styles.benefitItem}>
                      <Check size={14} color={plan.color} strokeWidth={4} style={{ marginTop: '2px' }} />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <button style={{ 
                  width: '100%', padding: '14px', borderRadius: '14px', border: 'none',
                  background: selectedPlan === plan.id ? plan.color : '#f1f5f9',
                  color: selectedPlan === plan.id ? '#fff' : '#1e293b',
                  fontWeight: 800, fontSize: '14px', cursor: 'pointer',
                  transition: 'all 0.2s', marginTop: '12px'
                }}>
                  {selectedPlan === plan.id ? 'Get Started' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          <div style={styles.promoSection}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Headphones size={24} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>Corporate or Bulk AMC?</div>
                <div style={{ fontSize: '13px', opacity: 0.8 }}>Custom pricing for offices and societies.</div>
              </div>
            </div>
            <button style={{ 
              background: '#fff', color: '#1e293b', padding: '10px 20px', 
              borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' 
            }}>
              Connect Sales
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', background: '#f8fafc',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
          }}>
            <TrendingUp size={32} color="#cbd5e1" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>No Active Subscription</h3>
          <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '300px', margin: '0 auto 24px' }}>
            Upgrade to an AMC plan today and save up to ₹4,500 annually on repairs.
          </p>
          <button 
            onClick={() => setActiveTab('plans')}
            style={{ 
              background: '#e23744', color: '#fff', padding: '12px 32px', 
              borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer'
            }}
          >
            Explore Plans
          </button>
        </div>
      )}

      {/* Trust Badges */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
        marginTop: '48px', padding: '24px 0', borderTop: '1px solid #f1f5f9'
      }}>
         <div style={{ textAlign: 'center' }}>
           <Wrench size={20} color="#64748b" style={{ marginBottom: '8px' }} />
           <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase' }}>Expert Team</div>
         </div>
         <div style={{ textAlign: 'center' }}>
           <Gift size={20} color="#64748b" style={{ marginBottom: '8px' }} />
           <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase' }}>Loyalty Bonus</div>
         </div>
         <div style={{ textAlign: 'center' }}>
           <CreditCard size={20} color="#64748b" style={{ marginBottom: '8px' }} />
           <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase' }}>Cashback</div>
         </div>
      </div>
    </div>
  );
};

export default AMCSubscription;
