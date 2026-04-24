import { useMemo, useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Wallet,
  HelpCircle,
  Bell,
  Settings,
  Search,
  Download,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Ban,
  AlertTriangle,
  LogOut,
  FileText,
  PieChart,
  Server,
  MessageSquare,
  BadgeCheck,
  RefreshCcw,
} from 'lucide-react';
import VerificationSystem from './VerificationSystem';
import CommissionManagement from './CommissionManagement';
import DisputeResolution from './DisputeResolution';
import FinancialAnalytics from '../Financial Module/FinancialAnalytics';
import InvoicingSystem from '../Financial Module/InvoicingSystem';
import EscrowSystem from '../Financial Module/EscrowSystem';
import RefundSystem from '../Financial Module/RefundSystem';
import './AdminPanel.css';

const DUMMY_STATS = [
  { id: 'accounts', label: 'Total Accounts', value: '2,840', trend: '3.5%', trendUp: true, icon: Users, color: '#e23744' },
  { id: 'completed', label: 'Jobs Completed', value: '1,293', trend: '2.5%', trendUp: false, icon: CheckCircle2, color: '#3b82f6' },
  { id: 'revenue', label: 'Revenue Generated', value: 'Rs 75,000', trend: '12%', trendUp: true, icon: Wallet, color: '#10b981' },
  { id: 'blocked', label: 'Blocked Accounts', value: '42', trend: '24%', trendUp: true, icon: Ban, color: '#f59e0b' },
];

const INITIAL_RECORDS = [
  { id: 'CUS-1001', name: 'Aisha Rahman', type: 'customer', status: 'active', joinedOn: '12 Apr 2026', phone: '+91 98765 41230', email: 'aisha.rahman@example.com', location: 'Kochi, Kerala', bookings: 18, age: '28 yrs', avatar: 'AR' },
  { id: 'CUS-1002', name: 'Rohan Menon', type: 'customer', status: 'inactive', joinedOn: '04 Apr 2026', phone: '+91 98951 23341', email: 'rohan.menon@example.com', location: 'Thrissur, Kerala', bookings: 7, age: '34 yrs', avatar: 'RM' },
  { id: 'PRV-2041', name: 'SmartFix Plumbing', type: 'provider', status: 'active', joinedOn: '09 Apr 2026', phone: '+91 97461 88990', email: 'contact@smartfix.com', location: 'Ernakulam, Kerala', category: 'Plumbing', rating: 4.8, avatar: 'SP' },
  { id: 'PRV-2042', name: 'BrightSpark Elec', type: 'provider', status: 'suspended', joinedOn: '28 Mar 2026', phone: '+91 96330 71522', email: 'hello@brightspark.com', location: 'Trivandrum, Kerala', category: 'Electrical', rating: 2.4, avatar: 'BE' },
  { id: 'PRV-2043', name: 'CleanNest Services', type: 'provider', status: 'active', joinedOn: '17 Mar 2026', phone: '+91 95622 44109', email: 'support@cleannest.com', location: 'Kannur, Kerala', category: 'Cleaning', rating: 4.9, avatar: 'CN' },
];

function SidebarItem({ icon: Icon, label, active, onClick, isMobile }) {
  return (
    <div
      onClick={onClick}
      className={`admin-sidebar-item${active ? ' active' : ''}${isMobile ? ' mobile' : ''}`}
    >
      <span className="admin-sidebar-icon">
        <Icon size={18} strokeWidth={active ? 2.35 : 2} />
      </span>
      <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="admin-stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ padding: '10px', backgroundColor: `${stat.color}14`, borderRadius: '14px', color: stat.color }}>
          <Icon size={22} />
        </div>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            backgroundColor: stat.trendUp ? '#f0fdf4' : '#fef2f2',
            color: stat.trendUp ? '#166534' : '#991b1b',
          }}
        >
          {stat.trendUp ? '+' : '-'} {stat.trend}
        </span>
      </div>
      <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '4px' }}>{stat.label}</p>
      <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#111827' }}>{stat.value}</h3>
      <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '6px' }}>Last 7 days</p>
    </div>
  );
}

function DashboardOverview({ winWidth }) {
  const isMobile = winWidth <= 768;
  const isTablet = winWidth <= 1024;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        {DUMMY_STATS.map((stat) => <StatCard key={stat.id} stat={stat} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr', gap: '20px' }}>
        <div className="admin-panel-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '700' }}>Statistics Overview</h3>
            <select className="admin-select">
              <option>Yearly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div style={{ height: '200px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 500 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e23744" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#e23744" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" y1={y + 25} x2="500" y2={y + 25} stroke="#f1f5f9" strokeWidth="1" />
              ))}

              <path
                d="M0,120 L50,110 L100,125 L150,80 L200,95 L250,70 L300,110 L350,90 L400,60 L450,85 L500,75 L500,150 L0,150 Z"
                fill="url(#lineGrad)"
              />

              <polyline
                fill="none"
                stroke="#e23744"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,120 50,110 100,125 150,80 200,95 250,70 300,110 350,90 400,60 450,85 500,75"
              />

              {[
                [0, 120], [50, 110], [100, 125], [150, 80], [200, 95], [250, 70], [300, 110], [350, 90], [400, 60], [450, 85], [500, 75],
              ].map(([x, y], index) => (
                <circle key={index} cx={x} cy={y} r="4" fill="#fff" stroke="#e23744" strokeWidth="2" />
              ))}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', color: '#94a3b8', fontSize: '11px', fontWeight: '600' }}>
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
            </div>
          </div>
        </div>

        <div className="admin-panel-card">
          <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '16px' }}>Spending Overview</h3>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '24px', fontWeight: '800' }}>
              Rs 1,67,467.00
              <span style={{ fontSize: '12px', color: '#10b981', background: '#f0fdf4', padding: '2px 8px', borderRadius: '99px', marginLeft: '8px' }}>+1.8%</span>
            </div>
          </div>
          <div style={{ height: '10px', background: '#f3f4f6', borderRadius: '99px', overflow: 'hidden', display: 'flex', marginBottom: '20px' }}>
            <div style={{ width: '40%', background: '#3b82f6' }} />
            <div style={{ width: '25%', background: '#8b5cf6' }} />
            <div style={{ width: '20%', background: '#10b981' }} />
            <div style={{ width: '15%', background: '#fbbf24' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Providers', value: 'Rs 71,000', color: '#3b82f6' },
              { label: 'Platform', value: 'Rs 43,000', color: '#8b5cf6' },
              { label: 'Marketing', value: 'Rs 29,000', color: '#10b981' },
              { label: 'Others', value: 'Rs 24,467', color: '#fbbf24' },
            ].map((item) => (
              <div key={item.label} style={{ fontSize: '12px' }}>
                <div style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
                  {item.label}
                </div>
                <div style={{ fontWeight: '700', marginTop: 2 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserProviderManagement({ adminUser, onLogout }) {
  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem('adminActiveTab') || 'dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  const isMobile = winWidth <= 768;
  const adminName = adminUser?.name || 'Admin';
  const adminHeroStats = [
    { label: 'Accounts monitored', value: DUMMY_STATS[0].value },
    { label: 'Flagged cases', value: '12' },
    { label: 'Open disputes', value: '04' },
  ];

  const pageTitles = {
    dashboard: 'Report & Analytics',
    accounts: 'User & Provider Management',
    finances: 'Commission Controls',
    analytics: 'Financial Intelligence',
    invoices: 'Invoicing Center',
    escrow: 'Secure Escrow System',
    refunds: 'Reversal Management',
    disputes: 'Dispute Resolution',
    verify: 'Verification Desk',
    settings: 'System Settings',
    help: 'Admin Help Center',
    notifications: 'Platform Notifications',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview winWidth={winWidth} />;
      case 'accounts':
        return <AccountsTable records={INITIAL_RECORDS} searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
      case 'finances':
        return <CommissionManagement onBack={() => setActiveTab('dashboard')} />;
      case 'analytics':
        return <FinancialAnalytics />;
      case 'invoices':
        return <InvoicingSystem />;
      case 'escrow':
        return <EscrowSystem />;
      case 'refunds':
        return <RefundSystem />;
      case 'disputes':
        return <DisputeResolution onBack={() => setActiveTab('dashboard')} />;
      case 'verify':
        return <VerificationSystem onBack={() => setActiveTab('dashboard')} />;
      case 'help':
        return <AdminHelpCenter />;
      case 'notifications':
        return <AdminNotifications />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardOverview winWidth={winWidth} />;
    }
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="admin-brand-title">Home Service</div>
            <div className="admin-brand-subtitle">Admin console</div>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <SidebarItem isMobile={isMobile} icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem isMobile={isMobile} icon={Users} label="Accounts" active={activeTab === 'accounts'} onClick={() => setActiveTab('accounts')} />
          <SidebarItem isMobile={isMobile} icon={PieChart} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarItem isMobile={isMobile} icon={Wallet} label="Commissions" active={activeTab === 'finances'} onClick={() => setActiveTab('finances')} />
          <SidebarItem isMobile={isMobile} icon={FileText} label="Invoices" active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} />
          <SidebarItem isMobile={isMobile} icon={ShieldCheck} label="Escrow" active={activeTab === 'escrow'} onClick={() => setActiveTab('escrow')} />
          <SidebarItem isMobile={isMobile} icon={RefreshCcw} label="Refunds" active={activeTab === 'refunds'} onClick={() => setActiveTab('refunds')} />
          <SidebarItem isMobile={isMobile} icon={AlertTriangle} label="Disputes" active={activeTab === 'disputes'} onClick={() => setActiveTab('disputes')} />
          <SidebarItem isMobile={isMobile} icon={BadgeCheck} label="Verify" active={activeTab === 'verify'} onClick={() => setActiveTab('verify')} />
        </nav>

        <div className="admin-sidebar-footer-links">
          <SidebarItem isMobile={isMobile} icon={HelpCircle} label="Help & Support" active={activeTab === 'help'} onClick={() => setActiveTab('help')} />
          <SidebarItem isMobile={isMobile} icon={Bell} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
          <SidebarItem isMobile={isMobile} icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>

        <div className="admin-sidebar-footer">
          <div className="admin-profile-card">
            <div className="admin-profile-avatar">{adminName.slice(0, 2).toUpperCase()}</div>
            <div>
              <div className="admin-profile-name">{adminName}</div>
              <div className="admin-profile-role">Platform administrator</div>
            </div>
          </div>
          <button type="button" onClick={onLogout} className="admin-logout">
            <LogOut size={18} />
            <span style={{ fontSize: '14px' }}>Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-hero">
          <div style={{ flex: 1 }}>
            <div className="admin-kicker">Home Service control room</div>
            <h1 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: '800', color: '#111827' }}>{pageTitles[activeTab]}</h1>
            <p style={{ color: '#475569', fontSize: '14px', marginTop: 6, maxWidth: '620px' }}>
              Monitor bookings, provider trust, finance flows, and urgent platform actions from one polished workspace.
            </p>
            <div className="admin-hero-chips">
              {adminHeroStats.map((item) => (
                <div key={item.label} className="admin-hero-chip">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-hero-actions">
            <button className="admin-action-button admin-action-button-secondary">
              <Download size={16} />
              Export
            </button>
            <button className="admin-action-button admin-action-button-primary">
              <Upload size={16} />
              Import Data
            </button>
            <button type="button" className="admin-action-button admin-action-button-danger" onClick={onLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <div className="admin-content-stack">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function AccountsTable({ records, searchQuery, onSearchChange }) {
  const filteredRecords = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return records;

    return records.filter((record) => (
      record.name.toLowerCase().includes(query)
      || record.id.toLowerCase().includes(query)
      || record.phone.toLowerCase().includes(query)
      || record.location.toLowerCase().includes(query)
      || record.type.toLowerCase().includes(query)
    ));
  }, [records, searchQuery]);

  return (
    <div className="admin-panel-card" style={{ overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: '17px', fontWeight: '700' }}>All Accounts</h3>
        <div className="admin-search-field">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead style={{ backgroundColor: '#f9fafb', fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>
            <tr>
              <th style={{ padding: '14px 20px' }}>User / Provider</th>
              <th style={{ padding: '14px 20px' }}>Joined Date</th>
              <th style={{ padding: '14px 20px' }}>Contact</th>
              <th style={{ padding: '14px 20px' }}>Location</th>
              <th style={{ padding: '14px 20px' }}>Status</th>
              <th style={{ padding: '14px 20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} style={{ borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #ffe2e8, #ffd1b8)', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                      {record.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#111827' }}>{record.name}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>{record.type.toUpperCase()} - {record.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', color: '#374151' }}>{record.joinedOn}</td>
                <td style={{ padding: '14px 20px', color: '#374151' }}>{record.phone}</td>
                <td style={{ padding: '14px 20px', color: '#374151' }}>{record.location}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: '700', backgroundColor: record.status === 'active' ? '#ecfdf5' : '#fef2f2', color: record.status === 'active' ? '#065f46' : '#991b1b', textTransform: 'capitalize' }}>
                    {record.status}
                  </span>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <button style={{ background: 'none', border: 'none', color: '#c2410c', fontWeight: '700', cursor: 'pointer' }}>View Details</button>
                </td>
              </tr>
            ))}
            {!filteredRecords.length && (
              <tr>
                <td colSpan="6" style={{ padding: '28px 20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                  No accounts matched your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminHelpCenter() {
  const categories = [
    { icon: Users, title: 'Account Issues', desc: 'Resolve common login, onboarding, and access issues.' },
    { icon: Wallet, title: 'Payout Support', desc: 'Track payout delays and finance bottlenecks for providers.' },
    { icon: ShieldCheck, title: 'Security', desc: 'Review trust, verification, and platform protection actions.' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      <div className="admin-panel-card" style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>Admin Knowledge Base</h3>
        <div className="admin-help-grid">
          {categories.map((category) => (
            <div key={category.title} className="admin-help-card">
              <div style={{ width: '42px', height: '42px', background: '#fef2f2', color: '#e23744', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <category.icon size={20} />
              </div>
              <h4 style={{ fontWeight: '700', marginBottom: '6px' }}>{category.title}</h4>
              <p style={{ fontSize: '13px', color: '#64748b' }}>{category.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-panel-card">
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Quick Support</h3>
        <button className="admin-action-button admin-action-button-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}>Raise Support Ticket</button>
        <button className="admin-action-button admin-action-button-secondary" style={{ width: '100%', justifyContent: 'center' }}>Chat with Tech Team</button>
      </div>
    </div>
  );
}

function AdminNotifications() {
  const logs = [
    { title: 'New Provider Signup', desc: 'SmartFix Plumbing has applied for verification.', time: '2 mins ago', color: '#3b82f6' },
    { title: 'Payment Alert', desc: 'High volume of failed payments detected on UPI.', time: '1 hr ago', color: '#ef4444' },
    { title: 'System Update', desc: 'Scheduled maintenance at 02:00 AM tonight.', time: '3 hrs ago', color: '#8b5cf6' },
    { title: 'New Dispute', desc: 'A customer has raised a dispute against Job #TX-882.', time: 'Yesterday', color: '#f59e0b' },
  ];

  return (
    <div className="admin-panel-card" style={{ overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800' }}>System Notifications</h3>
        <button style={{ fontSize: '13px', color: '#e23744', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer' }}>Mark all as read</button>
      </div>
      {logs.map((log) => (
        <div key={log.title} className="admin-notification-row">
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: log.color, marginTop: '5px', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', gap: '12px', flexWrap: 'wrap' }}>
              <h4 style={{ fontWeight: '700', fontSize: '14px' }}>{log.title}</h4>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{log.time}</span>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b' }}>{log.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminSettings() {
  const settings = [
    { label: 'Cloud Mode', desc: 'Run compute on remote servers', icon: Server },
    { label: 'Developer Logs', desc: 'Show technical error logs in console', icon: MessageSquare },
    { label: 'Security Lockdown', desc: 'Enforce 2FA for all admin accounts', icon: ShieldCheck },
  ];

  return (
    <div className="admin-panel-card" style={{ maxWidth: '640px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>Admin Settings</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {settings.map((setting) => (
          <div key={setting.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff4f2', color: '#e23744', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <setting.icon size={18} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{setting.label}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{setting.desc}</div>
              </div>
            </div>
            <div style={{ width: '40px', height: '22px', background: '#e2e8f0', borderRadius: '99px', position: 'relative', flexShrink: 0 }}>
              <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
