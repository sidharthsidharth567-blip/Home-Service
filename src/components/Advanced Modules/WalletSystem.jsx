import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  History, 
  CheckCircle2, 
  Clock, 
  Gift, 
  Zap, 
  CreditCard,
  ChevronRight
} from 'lucide-react';

const WalletSystem = ({ balance = 2450.00 }) => {
  const transactions = [
    { id: 1, type: 'cashback', title: 'Cashback: Electrical Service', amount: 45.00, date: 'Oct 24, 2023', status: 'completed' },
    { id: 2, type: 'refund', title: 'Refund: Cancelled Order #1234', amount: 849.00, date: 'Oct 22, 2023', status: 'completed' },
    { id: 3, type: 'spent', title: 'Plumbing Service Payment', amount: -1250.00, date: 'Oct 20, 2023', status: 'completed' },
    { id: 4, type: 'cashback', title: 'Cashback: Deep Cleaning', amount: 120.00, date: 'Oct 15, 2023', status: 'pending' },
    { id: 5, type: 'refund', title: 'Refund: Duplicate Charge Fix', amount: 299.00, date: 'Oct 12, 2023', status: 'completed' },
  ];

  const styles = {
    container: {
      padding: '24px',
      background: '#fff',
      borderRadius: '24px',
      fontFamily: "'Inter', sans-serif",
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 800,
      color: '#1e293b',
      margin: 0,
    },
    balanceCard: {
      background: 'linear-gradient(135deg, #e23744 0%, #ff5e62 100%)',
      padding: '32px',
      borderRadius: '24px',
      color: '#fff',
      marginBottom: '32px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(226, 55, 68, 0.2)',
    },
    balanceLabel: {
      fontSize: '14px',
      fontWeight: 600,
      opacity: 0.9,
      marginBottom: '8px',
      display: 'block',
    },
    balanceAmount: {
      fontSize: '42px',
      fontWeight: 900,
      margin: 0,
    },
    actions: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '32px',
    },
    actionBtn: (primary) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '16px',
      borderRadius: '16px',
      border: primary ? 'none' : '1px solid #e2e8f0',
      background: primary ? '#e23744' : '#fff',
      color: primary ? '#fff' : '#1e293b',
      fontWeight: 700,
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    transactionItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px 0',
      borderBottom: '1px solid #f1f5f9',
    },
    iconWrap: (type) => ({
      width: '48px',
      height: '48px',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 
        type === 'cashback' ? '#f0fdf4' : 
        type === 'refund' ? '#eff6ff' : 
        '#fef2f2',
      color: 
        type === 'cashback' ? '#16a34a' : 
        type === 'refund' ? '#2563eb' : 
        '#dc2626',
    }),
    txInfo: {
      flex: 1,
    },
    txTitle: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#1e293b',
      marginBottom: '4px',
    },
    txMeta: {
      fontSize: '13px',
      color: '#64748b',
    },
    txPrice: (amount) => ({
      fontSize: '16px',
      fontWeight: 700,
      color: amount > 0 ? '#16a34a' : '#1e293b',
      textAlign: 'right',
    }),
    promoCard: {
      background: '#fff7ed',
      border: '1px dashed #fb923c',
      padding: '20px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginTop: '24px',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.title}>My Wallet</h2>
        <div style={{ padding: '8px 16px', background: '#f8fafc', borderRadius: '12px', fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
          ID: WAL-98234
        </div>
      </header>

      {/* Balance Card */}
      <div style={styles.balanceCard}>
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }}>
          <Wallet size={160} />
        </div>
        <span style={styles.balanceLabel}>Available Balance</span>
        <h3 style={styles.balanceAmount}>₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
        <div style={{ marginTop: '20px', display: 'flex', gap: '16px' }}>
           <div style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '99px' }}>
             Earned this month: ₹420
           </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.actions}>
        <button style={styles.actionBtn(true)}>
          <Plus size={18} />
          Add Money
        </button>
        <button style={styles.actionBtn(false)}>
          <ArrowUpRight size={18} />
          Withdraw
        </button>
      </div>

      {/* Transactions Section */}
      <div>
        <h4 style={styles.sectionTitle}>
          <History size={20} color="#e23744" />
          Transaction History
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {transactions.map(tx => (
            <div key={tx.id} style={styles.transactionItem}>
              <div style={styles.iconWrap(tx.type)}>
                {tx.type === 'cashback' ? <Gift size={20} /> : 
                 tx.type === 'refund' ? <ArrowDownLeft size={20} /> : 
                 <ArrowUpRight size={20} />}
              </div>
              <div style={styles.txInfo}>
                <div style={styles.txTitle}>{tx.title}</div>
                <div style={styles.txMeta}>
                  {tx.date} • {tx.status === 'completed' ? 
                    <span style={{ color: '#16a34a', fontWeight: 600 }}>Completed</span> : 
                    <span style={{ color: '#f59e0b', fontWeight: 600 }}>Pending</span>
                  }
                </div>
              </div>
              <div style={styles.txPrice(tx.amount)}>
                {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount)}
              </div>
            </div>
          ))}
        </div>
        <button style={{ 
          width: '100%', padding: '16px', background: 'none', border: 'none', 
          color: '#e23744', fontWeight: 700, cursor: 'pointer', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', gap: '4px' 
        }}>
          View all transactions <ChevronRight size={16} />
        </button>
      </div>

      {/* Promo Card */}
      <div style={styles.promoCard}>
        <div style={{ 
          width: '44px', height: '44px', borderRadius: '12px', 
          background: '#fb923c', color: '#fff', display: 'flex', 
          alignItems: 'center', justifyContent: 'center' 
        }}>
          <Zap size={22} fill="white" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#9a3412', marginBottom: '2px' }}>
            5% Cashback Offer!
          </div>
          <div style={{ fontSize: '12px', color: '#c2410c' }}>
            Get up to ₹200 back on your next Plumbing service.
          </div>
        </div>
        <ChevronRight size={18} color="#9a3412" />
      </div>

    </div>
  );
};

export default WalletSystem;
