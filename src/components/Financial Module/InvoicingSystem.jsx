import { useState } from 'react';
import { 
  FileText, Download, Send, Plus, 
  Clock, CheckCircle, AlertCircle, Search, 
  Calendar, Printer, Mail, Share2, X,
  ArrowUpRight, ExternalLink, ShieldCheck, CheckCircle2,
  CreditCard, Wallet, Landmark, Smartphone
} from 'lucide-react';

const zomatoTheme = {
  primary: '#e23744',
  success: '#24963f',
  warning: '#f5a623',
  error: '#ef4444',
  textDark: '#1c1c1c',
  textGray: '#696969',
  textLight: '#9c9c9c',
  border: '#e8e8e8',
  bgPage: '#f8f8f8',
  white: '#ffffff'
};

const DUMMY_INVOICES = [
  { id: 'INV-8841', customer: 'Bessie Cooper', email: 'bessie.c@example.com', service: 'Plumbing Repair', date: '15 Apr', due: '22 Apr', amount: '₹1,200', subtotal: '₹1,016', tax: '₹184', status: 'Paid', paymentMethod: 'UPI', paymentLabel: 'GPay UPI', paymentRef: 'upi-4438', items: [{ desc: 'Pipe Leak Repair', qty: 1, rate: '₹800' }, { desc: 'Material Charges', qty: 1, rate: '₹400' }] },
  { id: 'INV-8842', customer: 'Leslie Alexander', email: 'leslie.alex@gmail.com', service: 'AC Servicing', date: '14 Apr', due: '21 Apr', amount: '₹2,450', subtotal: '₹2,076', tax: '₹374', status: 'Overdue', paymentMethod: 'Card', paymentLabel: 'Visa ending 8821', paymentRef: 'card-8821', items: [{ desc: 'AC Deep Cleaning', qty: 1, rate: '₹1,500' }, { desc: 'Gas Refill', qty: 1, rate: '₹950' }] },
  { id: 'INV-8843', customer: 'Albert Flores', email: 'albert.f@work.com', service: 'Electrical Wiring', date: '12 Apr', due: '19 Apr', amount: '₹8,900', subtotal: '₹7,542', tax: '₹1,358', status: 'Pending', paymentMethod: 'Bank Transfer', paymentLabel: 'HDFC NetBanking', paymentRef: 'bank-2194', items: [{ desc: 'Phase 2 Rewiring', qty: 1, rate: '₹7,500' }] },
  { id: 'INV-8844', customer: 'Ananya Singh', email: 'ananya.s@mail.in', service: 'Full Home Cleaning', date: '10 Apr', due: '17 Apr', amount: '₹4,200', subtotal: '₹3,559', tax: '₹641', status: 'Paid', paymentMethod: 'Wallet', paymentLabel: 'Z Wallet', paymentRef: 'wallet-7004', items: [{ desc: 'Deep Cleaning 2BHK', qty: 1, rate: '₹4,200' }] },
];

const PAYMENT_METHODS = {
  UPI: {
    icon: Smartphone,
    label: 'UPI',
    accent: '#ffe8ea',
    iconColor: '#e23744',
    caption: 'Instant mobile payment'
  },
  Card: {
    icon: CreditCard,
    label: 'Card',
    accent: '#edf4ff',
    iconColor: '#2563eb',
    caption: 'Credit or debit card'
  },
  Wallet: {
    icon: Wallet,
    label: 'Wallet',
    accent: '#eefbf1',
    iconColor: '#24963f',
    caption: 'Fast wallet checkout'
  },
  'Bank Transfer': {
    icon: Landmark,
    label: 'Bank',
    accent: '#fff4e6',
    iconColor: '#d97706',
    caption: 'Direct bank transfer'
  }
};

const PAYMENT_FORM_FIELDS = {
  UPI: [
    { key: 'payerName', label: 'Payer Name', placeholder: 'e.g. Rahul Sharma' },
    { key: 'upiId', label: 'UPI ID', placeholder: 'name@okaxis' },
    { key: 'mobile', label: 'Mobile Number', placeholder: '+91 98765 43210' }
  ],
  Card: [
    { key: 'firstName', label: 'First Name', placeholder: 'Jenny' },
    { key: 'lastName', label: 'Last Name', placeholder: 'Hawkins' },
    { key: 'cardNumber', label: 'Card Number', placeholder: '4890 5235 6628 8804' },
    { key: 'expiry', label: 'Expiry', placeholder: '04/28' },
    { key: 'cvv', label: 'CVV / CVC', placeholder: '452' }
  ],
  Wallet: [
    { key: 'walletProvider', label: 'Wallet Provider', placeholder: 'Paytm Wallet' },
    { key: 'mobile', label: 'Mobile Number', placeholder: '+91 98765 43210' },
    { key: 'walletRef', label: 'Wallet Ref', placeholder: 'WALLET-2204' }
  ],
  'Bank Transfer': [
    { key: 'accountName', label: 'Account Name', placeholder: 'Rahul Sharma' },
    { key: 'bankName', label: 'Bank Name', placeholder: 'HDFC Bank' },
    { key: 'ifsc', label: 'IFSC Code', placeholder: 'HDFC0001256' },
    { key: 'accountLast4', label: 'A/C Last 4', placeholder: '8821' }
  ]
};

const DEFAULT_PAYMENT_DETAILS = {
  payerName: '',
  upiId: '',
  mobile: '',
  firstName: '',
  lastName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  walletProvider: '',
  walletRef: '',
  accountName: '',
  bankName: '',
  ifsc: '',
  accountLast4: ''
};

export default function InvoicingSystem() {
  const [invoices, setInvoices] = useState(DUMMY_INVOICES);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ customer: '', email: '', service: '', amount: '', paymentMethod: 'UPI' });
  const [paymentDetails, setPaymentDetails] = useState(DEFAULT_PAYMENT_DETAILS);

  const stats = [
    { label: 'Total Billed', value: '₹45,300', icon: FileText, color: zomatoTheme.textDark },
    { label: 'Paid', value: '₹32,400', icon: CheckCircle2, color: zomatoTheme.success },
    { label: 'Pending', value: '₹10,450', icon: Clock, color: zomatoTheme.warning },
    { label: 'Overdue', value: '₹2,450', icon: AlertCircle, color: zomatoTheme.primary },
  ];

  const handleDownload = (inv) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Invoice ${inv.id} downloaded!`);
    }, 1200);
  };

  const handleCreateInvoice = () => {
    if (!newInvoice.customer || !newInvoice.service || !newInvoice.amount) return;
    const today = new Date();
    const due = new Date(today); due.setDate(due.getDate() + 7);
    const fmt = (d) => d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    const rawAmount = parseFloat(newInvoice.amount.replace(/[^0-9.]/g, '')) || 0;
    const subtotal = Math.round(rawAmount / 1.18);
    const tax = rawAmount - subtotal;
    const id = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
    const paymentLabel =
      newInvoice.paymentMethod === 'Card'
        ? `Visa ending ${(paymentDetails.cardNumber || '2408').replace(/\s+/g, '').slice(-4) || '2408'}`
        : newInvoice.paymentMethod === 'Wallet'
          ? paymentDetails.walletProvider || 'Z Wallet'
          : newInvoice.paymentMethod === 'Bank Transfer'
            ? paymentDetails.bankName || 'ICICI NetBanking'
            : paymentDetails.upiId || 'PhonePe UPI';
    const created = {
      id,
      customer: newInvoice.customer,
      email: newInvoice.email || 'N/A',
      service: newInvoice.service,
      date: fmt(today),
      due: fmt(due),
      amount: `₹${rawAmount.toLocaleString('en-IN')}`,
      subtotal: `₹${subtotal.toLocaleString('en-IN')}`,
      tax: `₹${tax.toLocaleString('en-IN')}`,
      status: 'Pending',
      paymentMethod: newInvoice.paymentMethod,
      paymentLabel,
      paymentRef: `${newInvoice.paymentMethod.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [{ desc: newInvoice.service, qty: 1, rate: `₹${rawAmount.toLocaleString('en-IN')}` }],
    };
    setInvoices(prev => [created, ...prev]);
    setNewInvoice({ customer: '', email: '', service: '', amount: '', paymentMethod: 'UPI' });
    setPaymentDetails(DEFAULT_PAYMENT_DETAILS);
    setShowCreateModal(false);
  };

  const filtered = invoices.filter(inv => {
    const matchesSearch = inv.id.includes(search) || inv.customer.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || inv.status === filter;
    return matchesSearch && matchesFilter;
  });

  const styles = {
    card: { background: zomatoTheme.white, borderRadius: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', overflow: 'hidden', border: `1px solid ${zomatoTheme.border}` },
    buttonPrimary: { background: zomatoTheme.primary, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 },
    buttonGhost: { background: '#f8f8f8', color: zomatoTheme.textDark, border: `1px solid ${zomatoTheme.border}`, padding: '10px 20px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' },
    badge: (status) => ({
      padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase',
      backgroundColor: status === 'Paid' ? '#e7f5ec' : (status === 'Overdue' ? '#fef0f1' : '#fff7ed'),
      color: status === 'Paid' ? zomatoTheme.success : (status === 'Overdue' ? zomatoTheme.primary : zomatoTheme.warning)
    })
  };

  const selectedPaymentMeta = selectedInvoice ? PAYMENT_METHODS[selectedInvoice.paymentMethod] || PAYMENT_METHODS.UPI : PAYMENT_METHODS.UPI;
  const createPaymentMeta = PAYMENT_METHODS[newInvoice.paymentMethod] || PAYMENT_METHODS.UPI;
  const paymentFields = PAYMENT_FORM_FIELDS[newInvoice.paymentMethod] || PAYMENT_FORM_FIELDS.UPI;
  const rawAmount = parseFloat(newInvoice.amount.replace(/[^0-9.]/g, '')) || 0;
  const estimatedTax = rawAmount ? rawAmount - Math.round(rawAmount / 1.18) : 0;
  const summaryTotal = rawAmount ? rawAmount + 49 : 49;
  const SelectedPaymentIcon = selectedPaymentMeta.icon;
  const CreatePaymentIcon = createPaymentMeta.icon;

  return (
    <div style={{ backgroundColor: zomatoTheme.bgPage, minHeight: '100%' }}>
      {/* Animated Loader */}
      {isGenerating && (
        <div style={{ position:'fixed', inset:0, background:'rgba(255,255,255,0.7)', backdropFilter:'blur(4px)', display:'grid', placeItems:'center', zIndex:2000 }}>
          <div style={{ width:40, height:40, border:`4px solid ${zomatoTheme.primary}20`, borderTop:`4px solid ${zomatoTheme.primary}`, borderRadius:'50%', animation:'spin 1s linear infinite' }} />
        </div>
      )}

      {/* Stats Summary - Zomato Style */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: zomatoTheme.border, borderRadius: '20px', overflow: 'hidden', border: `1px solid ${zomatoTheme.border}`, marginBottom: '32px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#fff', padding: '24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: zomatoTheme.textLight, fontSize: '12px', fontWeight: 800, marginBottom: '8px' }}>
              <s.icon size={14} color={s.color} /> {s.label}
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <div style={{ padding: '24px', borderBottom: `1px solid ${zomatoTheme.border}`, display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: zomatoTheme.textDark }}>Billing History</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', width: '100%', maxWidth: '450px' }}>
             <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: zomatoTheme.textLight }} />
                <input 
                  style={{ padding: '12px 16px 12px 48px', borderRadius: '12px', border: `1px solid ${zomatoTheme.border}`, outline: 'none', fontSize: 14, width: '100%', background: '#fcfcfc' }}
                  placeholder="Search invoice or client..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
             </div>
             <button onClick={() => setShowCreateModal(true)} style={styles.buttonPrimary}><Plus size={18}/> Create</button>
          </div>
        </div>

        <div style={{ padding: '0 24px 24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fcfcfc' }}>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>ID</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>CLIENT</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>SERVICE</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>AMOUNT</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>STATUS</th>
                <th style={{ textAlign: 'right', padding: '16px', fontSize: 12, color: zomatoTheme.textLight, fontWeight: 800 }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id} style={{ borderBottom: `1px solid ${zomatoTheme.border}` }}>
                  <td style={{ padding: '20px 16px' }}>
                    <div style={{ fontWeight: 900 }}>{inv.id}</div>
                    <div style={{ fontSize: 11, color: zomatoTheme.textLight }}>{inv.date}</div>
                  </td>
                  <td style={{ padding: '20px 16px' }}>
                    <div style={{ fontWeight: 700 }}>{inv.customer}</div>
                    <div style={{ fontSize: 11, color: zomatoTheme.textLight }}>{inv.email}</div>
                  </td>
                  <td style={{ padding: '20px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{inv.service}</div>
                    <div style={{ fontSize: 11, color: inv.status==='Overdue'?zomatoTheme.primary:zomatoTheme.textLight }}>Due: {inv.due}</div>
                  </td>
                  <td style={{ padding: '20px 16px' }}>
                    <div style={{ fontWeight: 900, color: zomatoTheme.textDark }}>{inv.amount}</div>
                  </td>
                  <td style={{ padding: '20px 16px' }}>
                    <span style={styles.badge(inv.status)}>{inv.status}</span>
                  </td>
                  <td style={{ padding: '20px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                       <button onClick={() => setSelectedInvoice(inv)} style={{ ...styles.buttonGhost, padding: 8 }}><Printer size={16}/></button>
                       <button onClick={() => handleDownload(inv)} style={{ ...styles.buttonGhost, padding: 8, background: zomatoTheme.primary, color: '#fff', border: 'none' }}><Download size={16}/></button>
                       <button style={{ ...styles.buttonGhost, padding: 8 }}><Mail size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Zomato Style Professional Invoice Modal */}
      {selectedInvoice && (
        <div style={{ position:'fixed', inset:0, background:'rgba(28,28,28,0.6)', backdropFilter:'blur(12px)', display:'grid', placeItems:'center', zIndex:1000, padding: '20px' }}>
          <div style={{ background:'#fff', width:'100%', maxWidth:'850px', borderRadius:'24px', overflow:'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.4)', display:'flex', flexDirection:'column', maxHeight: '95vh' }}>
             <div style={{ padding:'20px 32px', borderBottom:`1px solid ${zomatoTheme.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fcfcfc' }}>
                <h3 style={{ fontWeight:900, color: zomatoTheme.textDark }}>Digital Invoice Preview</h3>
                <div style={{ display:'flex', gap:12 }}>
                   <button onClick={() => handleDownload(selectedInvoice)} style={styles.buttonPrimary}><Download size={16}/> Save as PDF</button>
                   <button onClick={() => setSelectedInvoice(null)} style={{ background:'none', border:'none', cursor:'pointer', color:zomatoTheme.textLight }}><X size={24}/></button>
                </div>
             </div>
             
             <div style={{ flex: 1, overflowY: 'auto', padding: '60px 80px', background: '#fff' }}>
                <div style={{ border: `1px solid ${zomatoTheme.border}`, padding: '60px', borderRadius: '4px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', minHeight: '1000px' }}>
                   <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'60px' }}>
                      <div>
                         <div style={{ fontSize:'32px', fontWeight:900, color: zomatoTheme.primary, letterSpacing: '-1px' }}>MEDTRACKR</div>
                         <div style={{ fontSize:'13px', color:zomatoTheme.textLight, marginTop: 4, lineHeight: 1.5 }}>Premium Home Logistics<br/>GSTIN: 32ABCDE1234F1Z<br/>Ernakulam, Kerala</div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                         <div style={{ fontSize:'48px', fontWeight:900, color:zomatoTheme.textDark, lineHeight: 1 }}>INVOICE</div>
                         <div style={{ fontSize:'14px', color:zomatoTheme.textLight, marginTop: 12 }}>REF: <span style={{fontWeight:800, color:zomatoTheme.textDark}}>{selectedInvoice.id}</span></div>
                      </div>
                   </div>

                   <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, marginBottom:'60px' }}>
                      <div>
                         <div style={{ fontSize:'11px', fontWeight:900, color:zomatoTheme.textLight, textTransform:'uppercase', marginBottom:12, letterSpacing: 1 }}>Billed To</div>
                         <div style={{ fontSize:'18px', fontWeight:900 }}>{selectedInvoice.customer}</div>
                         <div style={{ fontSize:'14px', color:zomatoTheme.textLight, marginTop:4 }}>{selectedInvoice.email}</div>
                         <div style={{ fontSize:'13px', color:zomatoTheme.textLight, marginTop:2 }}>Kerala, India</div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                         <div style={{ fontSize:'11px', fontWeight:900, color:zomatoTheme.textLight, textTransform:'uppercase', marginBottom:12, letterSpacing: 1 }}>Payment Summary</div>
                         <div style={{ fontSize:'13px', color:zomatoTheme.textDark, fontWeight: 700 }}>Generated: {selectedInvoice.date}</div>
                         <div style={{ fontSize:'13px', color:zomatoTheme.primary, fontWeight: 800, marginTop:4 }}>Due Date: {selectedInvoice.due}</div>
                      </div>
                   </div>

                   <div style={{ marginBottom:'44px', border:`1px solid ${zomatoTheme.border}`, borderRadius:'22px', overflow:'hidden', background:'linear-gradient(135deg, #fff 0%, #fff7f8 100%)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 26px', borderBottom:`1px solid ${zomatoTheme.border}` }}>
                         <div>
                            <div style={{ fontSize:'11px', fontWeight:900, color:zomatoTheme.textLight, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>Payment Method</div>
                            <div style={{ fontSize:'24px', fontWeight:900, color:zomatoTheme.textDark }}>{selectedInvoice.paymentMethod || 'UPI'}</div>
                            <div style={{ fontSize:'13px', color:zomatoTheme.textGray, marginTop:4 }}>{selectedInvoice.paymentLabel || 'PhonePe UPI'}</div>
                         </div>
                         <div style={{ width:64, height:64, borderRadius:'20px', background:selectedPaymentMeta.accent, display:'grid', placeItems:'center' }}>
                            <SelectedPaymentIcon size={30} color={selectedPaymentMeta.iconColor} />
                         </div>
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1px', background:zomatoTheme.border }}>
                         <div style={{ background:'#fff', padding:'18px 22px' }}>
                            <div style={{ fontSize:'11px', fontWeight:900, color:zomatoTheme.textLight, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>Channel</div>
                            <div style={{ fontSize:'15px', fontWeight:800, color:zomatoTheme.textDark }}>{selectedPaymentMeta.caption}</div>
                         </div>
                         <div style={{ background:'#fff', padding:'18px 22px' }}>
                            <div style={{ fontSize:'11px', fontWeight:900, color:zomatoTheme.textLight, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>Reference</div>
                            <div style={{ fontSize:'15px', fontWeight:800, color:zomatoTheme.textDark }}>{selectedInvoice.paymentRef || `${selectedInvoice.id.toLowerCase()}-pay`}</div>
                         </div>
                         <div style={{ background:'#fff', padding:'18px 22px' }}>
                            <div style={{ fontSize:'11px', fontWeight:900, color:zomatoTheme.textLight, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>Collection Status</div>
                            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 12px', borderRadius:'999px', background:selectedInvoice.status === 'Paid' ? '#e7f5ec' : '#fff7ed', color:selectedInvoice.status === 'Paid' ? zomatoTheme.success : zomatoTheme.warning, fontSize:'13px', fontWeight:900 }}>
                               <CheckCircle2 size={14} /> {selectedInvoice.status === 'Paid' ? 'Settled' : 'Awaiting payment'}
                            </div>
                         </div>
                      </div>
                   </div>

                   <table style={{ width:'100%', marginBottom:40, borderCollapse: 'collapse' }}>
                      <thead style={{ borderBottom:`3px solid ${zomatoTheme.textDark}` }}>
                         <tr>
                            <th style={{ textAlign:'left', padding:'16px 0', fontSize:12, fontWeight:900 }}>DESCRIPTION</th>
                            <th style={{ textAlign:'center', padding:'16px 0', fontSize:12, fontWeight:900 }}>QTY</th>
                            <th style={{ textAlign:'right', padding:'16px 0', fontSize:12, fontWeight:900 }}>TOTAL</th>
                         </tr>
                      </thead>
                      <tbody>
                         {selectedInvoice.items?.map((item, i) => (
                           <tr key={i} style={{ borderBottom:`1px solid ${zomatoTheme.border}` }}>
                             <td style={{ padding:'20px 0', fontSize:15, fontWeight:700 }}>{item.desc}</td>
                             <td style={{ padding:'20px 0', fontSize:15, textAlign:'center', fontWeight:700 }}>{item.qty}</td>
                             <td style={{ padding:'20px 0', fontSize:15, textAlign:'right', fontWeight:900 }}>{item.rate}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>

                   <div style={{ display:'flex', justifyContent:'flex-end' }}>
                      <div style={{ width:'300px' }}>
                         <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                            <span style={{ color:zomatoTheme.textLight, fontSize:15, fontWeight: 700 }}>Subtotal</span>
                            <span style={{ fontWeight:900, fontSize: 16 }}>{selectedInvoice.subtotal}</span>
                         </div>
                         <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                            <span style={{ color:zomatoTheme.textLight, fontSize:15, fontWeight: 700 }}>Service GST (18%)</span>
                            <span style={{ fontWeight:900, fontSize: 16 }}>{selectedInvoice.tax}</span>
                         </div>
                         <div style={{ display:'flex', justifyContent:'space-between', borderTop:`4px solid ${zomatoTheme.textDark}`, paddingTop:20, marginTop: 10 }}>
                            <span style={{ fontWeight:900, fontSize:22 }}>Grand Total</span>
                            <span style={{ fontWeight:900, fontSize:26, color:zomatoTheme.primary }}>{selectedInvoice.amount}</span>
                         </div>
                      </div>
                   </div>

                   <div style={{ marginTop:120, textAlign:'center' }}>
                      <div style={{ borderTop: `1px solid ${zomatoTheme.border}`, paddingTop: 32, display:'flex', alignItems:'center', justifyContent:'center', gap:8, color:zomatoTheme.textLight, fontSize:11, fontWeight:800 }}>
                         <ShieldCheck size={16} color={zomatoTheme.success} /> DIGITAL AUTHENTICATION COMPLIANT • TRANSACTION ID: {selectedInvoice.id}X99
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(28,28,28,0.55)', backdropFilter:'blur(10px)', display:'grid', placeItems:'center', zIndex:1000, padding:'20px' }}>
          <div style={{ background:'#fff', width:'100%', maxWidth:'920px', borderRadius:'24px', overflow:'hidden', boxShadow:'0 30px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ padding:'24px 32px', borderBottom:`1px solid ${zomatoTheme.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <h3 style={{ fontWeight:900, fontSize:20, color:zomatoTheme.textDark, margin:0 }}>New Invoice</h3>
                <p style={{ fontSize:13, color:zomatoTheme.textLight, margin:'4px 0 0' }}>Choose a payment card and fill in the details to generate an invoice</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:zomatoTheme.textLight }}><X size={22}/></button>
            </div>
            <div style={{ padding:'32px', display:'grid', gridTemplateColumns:'minmax(0, 1.4fr) minmax(280px, 0.8fr)', gap:28, alignItems:'start' }}>
              <div>
                <div style={{ marginBottom:28 }}>
                  <div style={{ fontSize:11, fontWeight:900, color:zomatoTheme.textLight, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Invoice Details</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:16 }}>
                    {[{ label:'Client Name *', key:'customer', type:'text', placeholder:'e.g. Rahul Sharma' },
                      { label:'Email', key:'email', type:'email', placeholder:'e.g. rahul@email.com' },
                      { label:'Service *', key:'service', type:'text', placeholder:'e.g. AC Servicing' },
                      { label:'Amount (₹) *', key:'amount', type:'number', placeholder:'e.g. 2500' }]
                      .map(field => (
                        <div key={field.key} style={{ gridColumn: field.key === 'service' ? 'span 2' : 'span 1' }}>
                          <label style={{ display:'block', fontSize:12, fontWeight:800, color:zomatoTheme.textLight, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8 }}>{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={newInvoice[field.key]}
                            onChange={e => setNewInvoice(prev => ({ ...prev, [field.key]: e.target.value }))}
                            style={{ width:'100%', padding:'14px 16px', borderRadius:'12px', border:`1.5px solid ${zomatoTheme.border}`, outline:'none', fontSize:15, fontFamily:'inherit', boxSizing:'border-box', transition:'border 0.2s', background:'#fff' }}
                            onFocus={e => e.target.style.borderColor = zomatoTheme.primary}
                            onBlur={e => e.target.style.borderColor = zomatoTheme.border}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div style={{ marginBottom:24 }}>
                  <label style={{ display:'block', fontSize:12, fontWeight:800, color:zomatoTheme.textLight, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:10 }}>Choose Payment Card</label>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12 }}>
                  {Object.entries(PAYMENT_METHODS).map(([key, method]) => {
                    const MethodIcon = method.icon;
                    const isActive = newInvoice.paymentMethod === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setNewInvoice(prev => ({ ...prev, paymentMethod: key }))}
                        style={{
                          border: isActive ? `1.5px solid ${zomatoTheme.primary}` : `1.5px solid ${zomatoTheme.border}`,
                          background: isActive ? '#fff5f6' : '#fff',
                          borderRadius:'16px',
                          padding:'14px 16px',
                          display:'flex',
                          alignItems:'center',
                          gap:12,
                          cursor:'pointer',
                          textAlign:'left',
                          boxShadow: isActive ? '0 10px 24px rgba(226,55,68,0.12)' : 'none'
                        }}
                      >
                        <div style={{ width:42, height:42, borderRadius:'14px', background:method.accent, display:'grid', placeItems:'center', flexShrink:0 }}>
                          <MethodIcon size={20} color={method.iconColor} />
                        </div>
                        <div>
                          <div style={{ fontSize:14, fontWeight:800, color:zomatoTheme.textDark }}>{key}</div>
                          <div style={{ fontSize:11, color:zomatoTheme.textLight, marginTop:2 }}>{method.caption}</div>
                        </div>
                      </button>
                    );
                  })}
                  </div>
                </div>

                <div style={{ border:`1px solid ${zomatoTheme.border}`, borderRadius:'22px', padding:'24px', background:'linear-gradient(180deg, #fff 0%, #fcfcfc 100%)' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                    <div>
                      <div style={{ fontSize:11, fontWeight:900, color:zomatoTheme.textLight, textTransform:'uppercase', letterSpacing:1, marginBottom:6 }}>Pay With {newInvoice.paymentMethod}</div>
                      <div style={{ fontSize:24, fontWeight:900, color:zomatoTheme.textDark }}>{createPaymentMeta.label} Details</div>
                    </div>
                    <div style={{ width:56, height:56, borderRadius:'18px', background:createPaymentMeta.accent, display:'grid', placeItems:'center' }}>
                      <CreatePaymentIcon size={28} color={createPaymentMeta.iconColor} />
                    </div>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:16 }}>
                    {paymentFields.map(field => (
                      <div key={field.key} style={{ gridColumn: field.key === 'cardNumber' || field.key === 'walletProvider' || field.key === 'accountName' ? 'span 2' : 'span 1' }}>
                        <label style={{ display:'block', fontSize:12, fontWeight:800, color:zomatoTheme.textLight, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8 }}>{field.label}</label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={paymentDetails[field.key]}
                          onChange={e => setPaymentDetails(prev => ({ ...prev, [field.key]: e.target.value }))}
                          style={{ width:'100%', padding:'14px 16px', borderRadius:'12px', border:`1.5px solid ${zomatoTheme.border}`, outline:'none', fontSize:15, fontFamily:'inherit', boxSizing:'border-box', background:'#fff' }}
                          onFocus={e => e.target.style.borderColor = zomatoTheme.primary}
                          onBlur={e => e.target.style.borderColor = zomatoTheme.border}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop:18, display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:'14px', background:'#fff7f8', color:zomatoTheme.textGray, fontSize:13, lineHeight:1.5 }}>
                    <ShieldCheck size={16} color={zomatoTheme.primary} />
                    Clicking the selected payment card reveals these fields, so the modal feels like the upload reference while keeping our invoice flow intact.
                  </div>
                </div>
              </div>

              <div style={{ position:'sticky', top:0 }}>
                <div style={{ border:`1px solid ${zomatoTheme.border}`, borderRadius:'22px', background:'#fff', boxShadow:'0 16px 36px rgba(28,28,28,0.08)', overflow:'hidden' }}>
                  <div style={{ padding:'22px 22px 18px', borderBottom:`1px solid ${zomatoTheme.border}` }}>
                    <div style={{ fontSize:20, fontWeight:900, color:zomatoTheme.textDark }}>Purchase Summary</div>
                    <div style={{ fontSize:13, color:zomatoTheme.textLight, marginTop:6 }}>{newInvoice.service || 'Selected service will appear here'}</div>
                  </div>

                  <div style={{ padding:'18px 22px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:14 }}>
                      <span style={{ color:zomatoTheme.textGray }}>Service Fee</span>
                      <span style={{ fontWeight:800, color:zomatoTheme.textDark }}>₹{rawAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:14 }}>
                      <span style={{ color:zomatoTheme.textGray }}>Sales Tax</span>
                      <span style={{ fontWeight:800, color:zomatoTheme.textDark }}>₹{estimatedTax.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:18, fontSize:14 }}>
                      <span style={{ color:zomatoTheme.textGray }}>Processing Fee</span>
                      <span style={{ fontWeight:800, color:zomatoTheme.textDark }}>₹49</span>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', paddingTop:16, borderTop:`1px solid ${zomatoTheme.border}` }}>
                      <span style={{ fontSize:16, fontWeight:900, color:zomatoTheme.textDark }}>Total you will pay</span>
                      <span style={{ fontSize:22, fontWeight:900, color:zomatoTheme.primary }}>₹{summaryTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div style={{ margin:'0 22px 16px', padding:'12px 14px', borderRadius:'14px', background:'#fcfcfc', color:zomatoTheme.textGray, fontSize:12, lineHeight:1.5 }}>
                    Your selected payment card will be used for invoice collection, and these details stay visible only after you click a payment option.
                  </div>

                  <div style={{ padding:'0 22px 22px' }}>
                    <button
                      onClick={handleCreateInvoice}
                      disabled={!newInvoice.customer || !newInvoice.service || !newInvoice.amount}
                      style={{ ...styles.buttonPrimary, width:'100%', justifyContent:'center', padding:'16px', fontSize:16, opacity:(!newInvoice.customer || !newInvoice.service || !newInvoice.amount) ? 0.5 : 1 }}
                    >
                      <Plus size={18}/> Generate Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }`}</style>
    </div>
  );
}
