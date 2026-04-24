import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Users, 
  Clock,
  ShieldCheck,
  Timer,
  BarChart3
} from 'lucide-react';
import { getGlobalDemand, calculateDetailedPrice } from '../../utils/pricingEngine';

const DynamicPricing = ({ basePrice = 1200, serviceName = 'Plumbing' }) => {
  const [demandInfo, setDemandInfo] = useState(getGlobalDemand());
  const [trendData, setTrendData] = useState([40, 45, 60, 55, 70, 85, 80]); // Mock trend points

  // Sync with global engine
  useEffect(() => {
    const timer = setInterval(() => {
      setDemandInfo(getGlobalDemand());
      // Slightly randomize trend data for effect
      setTrendData(prev => [...prev.slice(1), Math.floor(Math.random() * (90 - 30) + 30)]);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentPrice = Math.round(basePrice * demandInfo.multiplier);

  return (
    <div style={{
      padding: '24px',
      background: '#fff',
      borderRadius: '24px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
      maxWidth: '450px',
      fontFamily: "'Inter', sans-serif",
      border: `1px solid ${demandInfo.isSurge ? 'rgba(245, 158, 11, 0.2)' : '#f1f5f9'}`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Surge Indicator Badge */}
      {demandInfo.isSurge && (
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          background: demandInfo.color, color: '#fff',
          padding: '4px 10px', borderRadius: '12px',
          fontSize: '10px', fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: '0.5px',
          display: 'flex', alignItems: 'center', gap: '4px',
          animation: 'pulse 2s infinite', zIndex: 10
        }}>
          <Zap size={10} fill="white" />
          Surge Active
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={20} color={demandInfo.color} />
          Dynamic Pricing
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Live adjustments for {serviceName}</p>
      </div>

      {/* Pricing Comparison */}
      <div style={{ 
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        background: '#f8fafc', padding: '20px', borderRadius: '20px', marginBottom: '24px'
      }}>
        <div>
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Standard Price</span>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#94a3b8', textDecoration: demandInfo.isSurge ? 'line-through' : 'none' }}>₹{basePrice}</div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <span style={{ 
            fontSize: '11px', color: demandInfo.color, fontWeight: 800, 
            textTransform: 'uppercase', display: 'block'
          }}>
            Current Rate (x{demandInfo.multiplier})
          </span>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#1e293b' }}>₹{currentPrice}</div>
        </div>
      </div>

      {/* Trend Chart (SVG) */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <BarChart3 size={16} color="#64748b" />
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>DEMAND TREND (30m)</span>
        </div>
        <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
          {trendData.map((val, i) => (
            <div 
              key={i} 
              style={{ 
                flex: 1, 
                height: `${val}%`, 
                background: i === trendData.length - 1 ? demandInfo.color : '#e2e8f0',
                borderRadius: '4px',
                transition: 'all 0.5s ease',
                minWidth: '10px'
              }} 
            />
          ))}
        </div>
      </div>

      {/* Demand Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: '#fff', border: '1px solid #f1f5f9', padding: '12px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Users size={14} color="#64748b" />
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Available</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>{demandInfo.providers} Pros</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #f1f5f9', padding: '12px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Clock size={14} color="#64748b" />
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Active Jobs</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>{demandInfo.activeJobs}+</div>
        </div>
      </div>

      {/* Surge Notice */}
      {demandInfo.isSurge && (
        <div style={{ 
          background: `${demandInfo.color}10`, border: `1px solid ${demandInfo.color}30`,
          padding: '16px', borderRadius: '16px', display: 'flex', gap: '12px', marginBottom: '20px'
        }}>
          <AlertTriangle size={20} color={demandInfo.color} style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: demandInfo.color, margin: '0 0 4px 0' }}>
              Why is the price higher?
            </h4>
            <p style={{ fontSize: '12px', color: '#444', lineHeight: 1.5, margin: 0 }}>
              Demand is currently **{demandInfo.level.toLowerCase()}**. Extra fees are applied to incentivize more providers to accept jobs quickly.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '16px', 
        borderTop: '1px solid #f1f5f9', fontSize: '11px', color: '#94a3b8', fontWeight: 600
      }}>
        <ShieldCheck size={14} color="#10b981" />
        Price locked while booking
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Timer size={12} />
          <span>Last sync: {demandInfo.lastUpdate}</span>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default DynamicPricing;
