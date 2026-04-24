// src/utils/pricingEngine.js

const scenarios = {
  Normal: { multiplier: 1.0, color: '#64748b', label: 'Standard', providers: 24, activeJobs: 12 },
  High: { multiplier: 1.4, color: '#f59e0b', label: 'High Demand', providers: 8, activeJobs: 42 },
  Peak: { multiplier: 1.8, color: '#ef4444', label: 'Peak Hours', providers: 3, activeJobs: 65 }
};

/**
 * Mock Admin Settings (these could be fetched from a database later)
 */
export const adminSettings = {
  nightChargePercent: 20,
  urgentFixedFee: 350,
  distanceFeePerKm: 20,
  visitLogisticFee: 150,
  nightStartTime: 20, // 8 PM
  nightEndTime: 6     // 6 AM
};

export const getGlobalDemand = () => {
  const seconds = new Date().getSeconds();
  
  // Live Simulation logic
  let demand = 'Normal';
  if (seconds >= 20 && seconds < 40) demand = 'High';
  else if (seconds >= 40) demand = 'Peak';

  return {
    level: demand,
    ...scenarios[demand],
    isSurge: scenarios[demand].multiplier > 1,
    lastUpdate: new Date().toLocaleTimeString()
  };
};

/**
 * Calculates itemized breakdown for advanced pricing
 */
export const calculateDetailedPrice = (base, options = {}) => {
  const { isUrgent, isAsap, distance = 0, time = null } = options;
  const demand = getGlobalDemand();
  
  // 1. Demand Surge
  const surgeCharge = Math.round(base * (demand.multiplier - 1));
  
  // 2. Night Surcharge (8PM+)
  let isNight = false;
  if (isAsap) {
    const currentHour = new Date().getHours();
    isNight = currentHour >= 20 || currentHour < 6;
  } else if (time) {
    const startPart = time.split('–')[0].trim(); // e.g., "09:00 PM"
    const hour = parseInt(startPart.split(':')[0]);
    const isPM = startPart.toLowerCase().includes('pm');
    const militaryHour = isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
    isNight = militaryHour >= adminSettings.nightStartTime || militaryHour < adminSettings.nightEndTime;
  }
  
  const nightCharge = isNight ? Math.round(base * (adminSettings.nightChargePercent / 100)) : 0;
  
  // 3. Urgent / ASAP Fee
  const urgentCharge = (isUrgent || isAsap) ? adminSettings.urgentFixedFee : 0;
  
  // 4. Distance Fee
  const distNum = parseFloat(distance) || 0;
  const distanceCharge = Math.round(distNum * adminSettings.distanceFeePerKm);
  
  const visitCharge = adminSettings.visitLogisticFee;
  const total = base + surgeCharge + nightCharge + urgentCharge + distanceCharge + visitCharge;

  return {
    base,
    surgeCharge,
    nightCharge,
    urgentCharge,
    distanceCharge,
    visitCharge,
    total,
    isNight,
    multiplier: demand.multiplier,
    demandLevel: demand.level
  };
};
