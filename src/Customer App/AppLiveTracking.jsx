import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
  Wrench,
  CheckCircle2,
  MapPin,
  Car,
  Zap,
  Share2,
  Crosshair,
  Maximize2,
  X,
} from 'lucide-react';

const STEPS = [
  { id: 'confirmed', label: 'Confirmed', Icon: CheckCircle2 },
  { id: 'on_the_way', label: 'On the way', Icon: Car },
  { id: 'arrived', label: 'Arrived', Icon: MapPin },
  { id: 'in_service', label: 'In service', Icon: Wrench },
  { id: 'done', label: 'Done', Icon: Zap },
];

const SPEEDS = [35, 28, 22, 18, 30, 25, 20, 15, 24, 28];
const INITIAL_ETA = 8;

const getSafeBooking = (booking = {}) => ({
  ...booking,
  id: booking?.id || 'N/A',
  technician: booking?.technician || 'Assigned Technician',
  service: booking?.service || 'Home Service',
  address: booking?.address || 'Rajajinagar, Bangalore',
  startPoint: booking?.startPoint || booking?.technicianAddress || 'Technician Location',
  endPoint: booking?.endPoint || booking?.address || 'Rajajinagar, Bangalore',
  timeSlot: booking?.timeSlot || booking?.time || '10-11 AM',
  price: booking?.price || 'Rs. 0',
});

const RouteOverlay = ({ progress, startPoint, endPoint, technician }) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const start = { x: 56, y: 232 };
  const control1 = { x: 138, y: 188 };
  const control2 = { x: 228, y: 126 };
  const end = { x: 314, y: 76 };

  const getPointOnCurve = (t) => {
    const inverse = 1 - t;
    const x =
      (inverse ** 3) * start.x +
      3 * (inverse ** 2) * t * control1.x +
      3 * inverse * (t ** 2) * control2.x +
      (t ** 3) * end.x;
    const y =
      (inverse ** 3) * start.y +
      3 * (inverse ** 2) * t * control1.y +
      3 * inverse * (t ** 2) * control2.y +
      (t ** 3) * end.y;

    return { x, y };
  };

  const markerPoint = getPointOnCurve(clampedProgress);
  const nextPoint = getPointOnCurve(Math.min(clampedProgress + 0.02, 1));
  const markerAngle = Math.atan2(nextPoint.y - markerPoint.y, nextPoint.x - markerPoint.x) * (180 / Math.PI);
  const routePath = `M ${start.x} ${start.y} C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${end.x} ${end.y}`;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 14,
          bottom: 64,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          borderRadius: 16,
          background: 'rgba(15, 23, 42, 0.82)',
          color: '#fff',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 10px 26px rgba(15, 23, 42, 0.28)',
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 0 5px rgba(34, 197, 94, 0.18)',
          }}
        />
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.74 }}>
            Start Point
          </div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>{startPoint}</div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 14,
          top: 118,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.92)',
          color: '#0f172a',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 10px 26px rgba(15, 23, 42, 0.18)',
        }}
      >
        <MapPin size={15} color="#ef4444" />
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748b' }}>
            Destination
          </div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>{endPoint}</div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 360 300" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <linearGradient id="routeStroke" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          <path
            d={routePath}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d={routePath}
            fill="none"
            stroke="url(#routeStroke)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="10 9"
            opacity="0.95"
          />

          <circle cx={start.x} cy={start.y} r="16" fill="rgba(34,197,94,0.18)" />
          <circle cx={start.x} cy={start.y} r="8" fill="#22c55e" stroke="#fff" strokeWidth="3" />

          <circle cx={end.x} cy={end.y} r="18" fill="rgba(239,68,68,0.18)" />
          <circle cx={end.x} cy={end.y} r="10" fill="#ef4444" stroke="#fff" strokeWidth="3" />

          <g transform={`translate(${markerPoint.x} ${markerPoint.y}) rotate(${markerAngle})`}>
            <circle r="16" fill="rgba(59,130,246,0.18)" />
            <circle r="12" fill="#3b82f6" stroke="#fff" strokeWidth="3" />
            <g transform="translate(-6 -6)">
              <Car size={12} color="#fff" />
            </g>
          </g>
        </svg>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 18,
          transform: 'translateX(-50%)',
          zIndex: 2,
          padding: '8px 14px',
          borderRadius: 999,
          background: 'rgba(255, 255, 255, 0.94)',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
          color: '#0f172a',
          fontSize: 12,
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {technician} moving to destination
      </div>
    </>
  );
};

const StepTracker = ({ activeStep }) => (
  <div
    style={{
      padding: '14px 16px 10px',
      borderBottom: '0.5px solid var(--color-border-tertiary)',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {STEPS.map(({ id, label, Icon }, i) => {
      const isDone = i < activeStep;
      const isActive = i === activeStep;

      return (
        <React.Fragment key={id}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              flex: 1,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: isDone ? '#e6f4ea' : isActive ? '#e8f0fe' : 'var(--color-background-secondary)',
                border: isActive
                  ? '2px solid #4285f4'
                  : isDone
                    ? '0.5px solid #34a853'
                    : '0.5px solid var(--color-border-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: !isDone && !isActive ? 0.4 : 1,
              }}
            >
              {isDone ? (
                <CheckCircle2 size={14} color="#34a853" />
              ) : (
                <Icon size={13} color={isActive ? '#4285f4' : 'var(--color-text-secondary)'} />
              )}
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                color: isDone ? '#34a853' : isActive ? '#4285f4' : 'var(--color-text-secondary)',
                opacity: !isDone && !isActive ? 0.5 : 1,
              }}
            >
              {label}
            </span>
          </div>

          {i < STEPS.length - 1 && (
            <div
              style={{
                height: 2,
                flex: 1,
                borderRadius: 2,
                marginBottom: 18,
                background: i < activeStep ? '#34a853' : 'var(--color-border-tertiary)',
              }}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const AddressCard = ({ booking }) => (
  <div style={{ padding: '14px 16px 0' }}>
    <div
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 16,
        padding: 16,
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#64748b',
          marginBottom: 12,
        }}
      >
        Saved Address
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <MapPin size={16} color="#dc2626" />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Destination</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: '#475569' }}>{booking.address}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Car size={16} color="#16a34a" />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Starting Point</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: '#475569' }}>{booking.startPoint}</div>
        </div>
      </div>
    </div>
  </div>
);

const TechnicianCard = ({ booking }) => {
  const safeBooking = getSafeBooking(booking);
  const technicianInitials = safeBooking.technician
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AT';

  return (
  <div style={{ padding: '14px 16px 20px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 16,
            background: '#e8f0fe',
            border: '0.5px solid #b5d4f4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 500,
            color: '#185FA5',
          }}
        >
          {technicianInitials}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#e6f4ea',
            border: '2px solid var(--color-background-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircle2 size={10} color="#34a853" />
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>{safeBooking.technician}</span>
          <span
            style={{
              background: '#e6f4ea',
              color: '#137333',
              fontSize: 10,
              fontWeight: 500,
              padding: '2px 7px',
              borderRadius: 6,
            }}
          >
            Verified
          </span>
        </div>

        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
          {safeBooking.service} Specialist
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <Star size={12} fill="#fbbc04" color="#fbbc04" />
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-primary)' }}>4.9</span>
          <span style={{ fontSize: 10, color: 'var(--color-border-secondary)' }}>|</span>
          <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>182 jobs</span>
          <span style={{ fontSize: 10, color: 'var(--color-border-secondary)' }}>|</span>
          <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>5 yrs exp</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button
          onClick={() => safeBooking.onMessage?.()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            border: '0.5px solid var(--color-border-tertiary)',
            background: 'var(--color-background-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Message technician"
        >
          <MessageCircle size={17} color="var(--color-text-primary)" />
        </button>

        <button
          onClick={() => safeBooking.onCall?.()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            border: 'none',
            background: '#4285f4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Call technician"
        >
          <Phone size={17} color="#fff" />
        </button>
      </div>
    </div>

    <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)', margin: '0 0 12px' }} />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
        gap: 10,
        marginBottom: 12,
      }}
    >
      {[
        { label: 'Service', value: safeBooking.service },
        { label: 'Time slot', value: safeBooking.timeSlot },
        { label: 'Est. cost', value: safeBooking.price },
      ].map(({ label, value }) => (
        <div
          key={label}
          style={{
            background: 'var(--color-background-secondary)',
            borderRadius: 10,
            padding: '10px 12px',
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              marginBottom: 3,
            }}
          >
            {label}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>{value}</div>
        </div>
      ))}
    </div>

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: '#e8f0fe',
        borderRadius: 10,
        padding: '10px 13px',
        marginBottom: 12,
      }}
    >
      <ShieldCheck size={16} color="#185FA5" style={{ flexShrink: 0 }} />
      <span style={{ fontSize: 11, color: '#0C447C', fontWeight: 500, lineHeight: 1.5 }}>
        Background verified | ID checked | Trained professional
      </span>
    </div>

    <div style={{ display: 'flex', gap: 8 }}>
      <button
        onClick={() => safeBooking.onShare?.()}
        style={{
          flex: 1,
          padding: '10px 0',
          borderRadius: 10,
          border: '0.5px solid var(--color-border-tertiary)',
          background: 'var(--color-background-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
        }}
      >
        <Share2 size={13} />
        Share location
      </button>

      <button
        onClick={() => safeBooking.onCancel?.()}
        style={{
          flex: 1,
          padding: '10px 0',
          borderRadius: 10,
          border: '0.5px solid #e24b4a',
          background: 'transparent',
          fontSize: 12,
          fontWeight: 500,
          color: '#e24b4a',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <X size={13} />
        Cancel booking
      </button>
    </div>
  </div>
  );
};

const AppLiveTracking = ({ booking, onBack }) => {
  const [eta, setEta] = useState(INITIAL_ETA);
  const [distance, setDistance] = useState(2.1);
  const [speed, setSpeed] = useState(28);
  const [arrived, setArrived] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (!booking) return undefined;

    setEta(INITIAL_ETA);
    setDistance(2.1);
    setSpeed(28);
    setArrived(false);
    setActiveStep(1);

    const id = setInterval(() => {
      setEta((currentEta) => {
        const nextEta = Math.max(0, currentEta - 1);

        if (nextEta === 0) {
          setDistance(0);
          setSpeed(0);
          setArrived(true);
          setActiveStep(2);
        } else {
          setDistance(parseFloat((nextEta * 0.26).toFixed(1)));
          const baseSpeed = SPEEDS[(INITIAL_ETA - nextEta) % SPEEDS.length];
          const jitter = Math.round((Math.random() - 0.5) * 4);
          setSpeed(Math.max(12, baseSpeed + jitter));
        }

        return nextEta;
      });
    }, 2200);

    return () => clearInterval(id);
  }, [booking]);

  if (!booking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-secondary)',
        }}
      >
        Booking not found
      </div>
    );
  }

  const safeBooking = getSafeBooking(booking);

  const blinkStyle = {
    display: 'inline-block',
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: arrived ? '#34a853' : '#4285f4',
    animation: 'lt-blink 1.4s ease-in-out infinite',
  };

  const destinationAddress = safeBooking.address;
  const mapQuery = encodeURIComponent(`${destinationAddress}, India`);
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const googleMapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const routeProgress = arrived ? 1 : Math.max(0, Math.min(1, (INITIAL_ETA - eta) / INITIAL_ETA));
  const openGoogleMap = () => {
    window.open(googleMapsOpenUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-background-tertiary)',
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        @keyframes lt-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes lt-flash-green {
          0%, 100% { background: #34a853; }
          50% { background: #25873f; }
        }
        @keyframes lt-slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'var(--color-background-primary)',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            border: '0.5px solid var(--color-border-tertiary)',
            background: 'var(--color-background-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Go back"
        >
          <ArrowLeft size={16} color="var(--color-text-primary)" />
        </button>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-text-primary)' }}>Live tracking</div>
          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
            Order #{safeBooking.id} | {arrived ? 'Technician arrived' : 'Technician en route'}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: arrived ? '#e6f4ea' : '#e8f0fe',
            borderRadius: 20,
            padding: '4px 10px',
          }}
        >
          <span style={{ ...blinkStyle, background: arrived ? '#34a853' : '#4285f4' }} />
          <span style={{ fontSize: 11, fontWeight: 500, color: arrived ? '#137333' : '#1a73e8' }}>
            {arrived ? 'Arrived' : 'Live'}
          </span>
        </div>
      </div>

      {arrived && (
        <div
          style={{
            background: '#34a853',
            color: '#fff',
            textAlign: 'center',
            padding: '10px',
            fontSize: 13,
            fontWeight: 500,
            animation: 'lt-flash-green 2s ease infinite',
          }}
        >
          {safeBooking.technician} has arrived at your location!
        </div>
      )}

      <div style={{ position: 'relative', height: 300, overflow: 'hidden', background: '#eef2ff' }}>
        <iframe
          title="Google Maps live tracking"
          src={googleMapsEmbedUrl}
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <RouteOverlay
          progress={routeProgress}
          startPoint={safeBooking.startPoint}
          endPoint={safeBooking.endPoint}
          technician={safeBooking.technician}
        />

        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: '#fff',
            borderRadius: 12,
            padding: '10px 14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: '#5f6368',
              fontWeight: 500,
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
            }}
          >
            Arrives in
          </div>
          <div style={{ fontSize: 26, fontWeight: 500, color: '#202124', lineHeight: 1.1 }}>
            {arrived ? (
              <span style={{ fontSize: 15, color: '#34a853', fontWeight: 500 }}>Here now</span>
            ) : (
              <>
                {eta} <span style={{ fontSize: 13, color: '#5f6368' }}>min</span>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: '#fff',
            borderRadius: 12,
            padding: '10px 14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            textAlign: 'right',
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: '#5f6368',
              fontWeight: 500,
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
            }}
          >
            Away
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, color: '#202124', lineHeight: 1.1 }}>
            {arrived ? (
              <span style={{ fontSize: 15, color: '#34a853', fontWeight: 500 }}>0 km</span>
            ) : (
              <>
                {distance} <span style={{ fontSize: 13, color: '#5f6368' }}>km</span>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 12,
            background: '#fff',
            borderRadius: 12,
            padding: '8px 12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            textAlign: 'center',
            minWidth: 72,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 500, color: '#202124' }}>{speed}</div>
          <div style={{ fontSize: 10, color: '#5f6368' }}>km/h</div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fff',
            borderRadius: 20,
            padding: '5px 12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.14)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 500,
            color: '#202124',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ ...blinkStyle, background: arrived ? '#34a853' : '#4285f4', width: 8, height: 8 }} />
          {arrived ? `${safeBooking.technician} has arrived` : `${safeBooking.technician} is on the way`}
        </div>

        <button
          type="button"
          onClick={openGoogleMap}
          style={{
            position: 'absolute',
            bottom: 14,
            left: 14,
            background: '#1f2937',
            color: '#fff',
            borderRadius: 18,
            padding: '8px 14px',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Open in Google Maps
        </button>

        <button
          type="button"
          onClick={openGoogleMap}
          style={{
            position: 'absolute',
            bottom: 60,
            right: 12,
            background: '#fff',
            borderRadius: '50%',
            width: 38,
            height: 38,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            cursor: 'pointer',
          }}
          aria-label="Open map location"
        >
          <Crosshair size={16} color="#5f6368" />
        </button>

        <button
          type="button"
          onClick={openGoogleMap}
          style={{
            position: 'absolute',
            bottom: 14,
            right: 12,
            background: '#fff',
            borderRadius: '50%',
            width: 38,
            height: 38,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            cursor: 'pointer',
          }}
          aria-label="Expand map"
        >
          <Maximize2 size={16} color="#5f6368" />
        </button>
      </div>

      <div
        style={{
          background: 'var(--color-background-primary)',
          borderRadius: '24px 24px 0 0',
          marginTop: -16,
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 2,
          animation: 'lt-slide-up 0.4s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--color-border-tertiary)' }} />
        </div>

        <StepTracker activeStep={activeStep} />
        <AddressCard booking={safeBooking} />
        <TechnicianCard booking={safeBooking} />
      </div>
    </div>
  );
};

export default AppLiveTracking;

export const Demo = () => (
  <AppLiveTracking
    booking={{
      id: 'TK-8821',
      technician: 'Arjun Kumar',
      service: 'AC Repair',
      address: '2nd Floor, Rajajinagar, Bangalore',
      timeSlot: '10-11 AM',
      price: 'Rs. 850',
      onCall: () => alert('Calling Arjun...'),
      onMessage: () => alert('Opening chat...'),
      onShare: () => alert('Sharing location...'),
      onCancel: () => alert('Cancel booking?'),
    }}
    onBack={() => alert('Going back')}
  />
);
