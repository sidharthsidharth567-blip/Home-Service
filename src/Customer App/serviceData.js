import plumbingImg from '../assets/services/plumbing.png';
import electricalImg from '../assets/services/electrical.png';
import cleaningImg from '../assets/services/cleaning.png';

// ─── Category List (All 12) ──────────────────────────────────────────────────

export const categoryList = [
  {
    id: 1, name: 'Plumbing', icon: 'Droplets', color: '#0ea5e9', bgColor: '#f0f9ff',
    image: plumbingImg,
    subServices: ['Tap Repair', 'Pipe Leakage', 'Drain Cleaning', 'Bathroom Fittings'],
  },
  {
    id: 2, name: 'Electrical', icon: 'Zap', color: '#f59e0b', bgColor: '#fffbeb',
    image: electricalImg,
    subServices: ['Switch/Plug Repair', 'Wiring Issues', 'Fan & Light Installation', 'Inverter Setup'],
  },
  {
    id: 3, name: 'AC Repair', icon: 'Wind', color: '#06b6d4', bgColor: '#ecfeff',
    image: 'https://images.unsplash.com/photo-1504691342899-4d92b50853e1?q=80&w=800&auto=format&fit=crop',
    subServices: ['AC Service & Gas Refill', 'Fridge Repair', 'Washing Machine Repair', 'Microwave Repair'],
  },
  {
    id: 4, name: 'Cleaning', icon: 'Sparkles', color: '#e23744', bgColor: '#fff1f2',
    image: cleaningImg,
    subServices: ['Home Deep Cleaning', 'Bathroom Cleaning', 'Kitchen Cleaning', 'Sofa/Carpet Cleaning'],
  },
  {
    id: 5, name: 'Carpentry', icon: 'Hammer', color: '#92400e', bgColor: '#fef3c7',
    image: 'https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?q=80&w=800&auto=format&fit=crop',
    subServices: ['Furniture Repair', 'Door/Window Fixing', 'Modular Furniture Assembly'],
  },
  {
    id: 6, name: 'Painting', icon: 'Paintbrush', color: '#7c3aed', bgColor: '#f5f3ff',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    subServices: ['Wall Painting', 'Putty Work', 'Waterproofing'],
  },
  {
    id: 7, name: 'Bathroom', icon: 'ShowerHead', color: '#0891b2', bgColor: '#ecfeff',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop',
    subServices: ['Shower Installation', 'Sink Repair', 'Toilet Fixing'],
  },
  {
    id: 8, name: 'Maintenance', icon: 'Wrench', color: '#64748b', bgColor: '#f8fafc',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a4e5190?q=80&w=800&auto=format&fit=crop',
    subServices: ['General Handyman', 'Minor Repairs', 'Multi-Service Jobs'],
  },
  {
    id: 9, name: 'Electronics', icon: 'Monitor', color: '#1d4ed8', bgColor: '#eff6ff',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?q=80&w=800&auto=format&fit=crop',
    subServices: ['TV Repair', 'CCTV Installation'],
  },
  {
    id: 10, name: 'Installation', icon: 'Package', color: '#059669', bgColor: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop',
    subServices: ['RO Purifier', 'Water Heater (Geyser)', 'Chimney Installation'],
  },
  {
    id: 11, name: 'Outdoor', icon: 'Leaf', color: '#16a34a', bgColor: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop',
    subServices: ['Gardening', 'Pest Control'],
  },
  {
    id: 12, name: 'Vehicle', icon: 'Car', color: '#dc2626', bgColor: '#fef2f2',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop',
    subServices: ['Car Wash', 'Bike Repair (Home Service)'],
  },
];

// ─── Popular Businesses (all categories) ─────────────────────────────────────

export const popularBusinesses = [
  // Plumbing
  {
    id: 1, name: 'QuickFix Plumbing', category: 'Plumbing',
    contactPerson: 'Rajan Kumar', email: 'rajan@quickfix.in',
    address: 'Koramangala, Bangalore', rating: 4.8, reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    price: 199, availability: '7:00 AM – 10:00 PM',
    description: 'Certified plumbers with 8+ years experience. Specializing in tap repair, pipe leakage, drain cleaning, and complete bathroom fittings. Fast response and clean work guaranteed.',
    gallery: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 2, name: 'PipeXpert Services', category: 'Plumbing',
    contactPerson: 'Suresh Pillai', email: 'suresh@pipexpert.in',
    address: 'Indiranagar, Bangalore', rating: 4.7, reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop',
    price: 249, availability: '8:00 AM – 9:00 PM',
    description: 'Expert plumbing solutions for drain blockages, bathroom fittings, and pipe replacements. All materials provided. Transparent pricing.',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Electrical
  {
    id: 3, name: 'VoltPro Electricals', category: 'Electrical',
    contactPerson: 'Anand Menon', email: 'volt@electrical.in',
    address: 'HSR Layout, Bangalore', rating: 4.9, reviewCount: 427,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    price: 299, availability: '8:00 AM – 8:00 PM',
    description: 'Licensed electricians for all wiring, switch repair, fan/light installation, and inverter setup. Safety-first approach with ISI-certified materials.',
    gallery: [
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 4, name: 'SparkTech Electric', category: 'Electrical',
    contactPerson: 'Deepak Nair', email: 'd.nair@sparktech.in',
    address: 'JP Nagar, Bangalore', rating: 4.6, reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=800&auto=format&fit=crop',
    price: 349, availability: '9:00 AM – 7:00 PM',
    description: 'Comprehensive electrical services including MCB upgrades, CCTV wiring, and complete home rewiring projects.',
    gallery: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // AC Repair
  {
    id: 5, name: 'CoolAir Solutions', category: 'AC Repair',
    contactPerson: 'Vinod Sharma', email: 'coolair@service.in',
    address: 'Whitefield, Bangalore', rating: 4.8, reviewCount: 561,
    image: 'https://images.unsplash.com/photo-1504691342899-4d92b50853e1?q=80&w=800&auto=format&fit=crop',
    price: 499, availability: '8:00 AM – 9:00 PM',
    description: 'Expert AC servicing, gas refilling, and all major appliance repairs. Certified technicians for all AC brands — Samsung, LG, Voltas, Daikin and more.',
    gallery: [
      'https://images.unsplash.com/photo-1614380977551-a524d9ced0b3?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 6, name: 'FreezeFix Appliances', category: 'AC Repair',
    contactPerson: 'Mohan Das', email: 'mohan@freezefix.in',
    address: 'Marathahalli, Bangalore', rating: 4.5, reviewCount: 278,
    image: 'https://images.unsplash.com/photo-1584622781564-1d9876a1df8d?q=80&w=800&auto=format&fit=crop',
    price: 599, availability: '9:00 AM – 6:00 PM',
    description: 'Specialists in refrigerator, washing machine, microwave, and AC repairs. Genuine spare parts and 30-day service warranty.',
    gallery: [
      'https://images.unsplash.com/photo-1584622781564-1d9876a1df8d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504691342899-4d92b50853e1?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Cleaning
  {
    id: 7, name: 'SparkleHome Cleaning', category: 'Cleaning',
    contactPerson: 'Priya Verma', email: 'priya@sparklehome.in',
    address: 'Rajajinagar, Bangalore', rating: 4.9, reviewCount: 842,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop',
    price: 849, availability: '7:00 AM – 8:00 PM',
    description: 'Professional deep cleaning services for homes, bathrooms, kitchens, and sofas. Eco-friendly products and trained staff. Satisfaction guaranteed.',
    gallery: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584622781564-1d9876a1df8d?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 8, name: 'CleanNest Pro', category: 'Cleaning',
    contactPerson: 'Rekha Iyer', email: 'rekha@cleannest.in',
    address: 'Electronic City, Bangalore', rating: 4.7, reviewCount: 634,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop',
    price: 699, availability: '8:00 AM – 7:00 PM',
    description: 'Complete home cleaning solutions including carpet shampooing, sofa cleaning, and post-renovation cleanup. Hygienic equipment and certified cleaning agents.',
    gallery: [
      'https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Carpentry
  {
    id: 9, name: 'WoodCraft Masters', category: 'Carpentry',
    contactPerson: 'Ramesh Pillai', email: 'ramesh@woodcraft.in',
    address: 'Jayanagar, Bangalore', rating: 4.8, reviewCount: 249,
    image: 'https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?q=80&w=800&auto=format&fit=crop',
    price: 399, availability: '9:00 AM – 6:00 PM',
    description: 'Expert carpenters for furniture repair, door/window fixing, and modular furniture assembly. 10+ years experience. Premium finish guaranteed.',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 10, name: 'HomeWood Carpentry', category: 'Carpentry',
    contactPerson: 'Sanjay Gupta', email: 'sanjay@homewood.in',
    address: 'BTM Layout, Bangalore', rating: 4.6, reviewCount: 187,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
    price: 449, availability: '8:00 AM – 5:00 PM',
    description: 'Modular kitchen assembly, wardrobe installation, and all types of furniture repair. Quality work with affordable pricing.',
    gallery: [
      'https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Painting
  {
    id: 11, name: 'ColorMaster Paints', category: 'Painting',
    contactPerson: 'Arjun Reddy', email: 'arjun@colormaster.in',
    address: 'MG Road, Bangalore', rating: 4.8, reviewCount: 376,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    price: 799, availability: '8:00 AM – 6:00 PM',
    description: 'Interior and exterior painting with premium Asian Paints / Berger materials. Putty work, waterproofing, and texture painting. Clean and precise finish.',
    gallery: [
      'https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=800&auto=format&fit=crop',
    ],
  },
  {
    id: 12, name: 'WallArt Pro Painters', category: 'Painting',
    contactPerson: 'Kavita Singh', email: 'kavi@wallart.in',
    address: 'Hennur, Bangalore', rating: 4.7, reviewCount: 221,
    image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=800&auto=format&fit=crop',
    price: 999, availability: '9:00 AM – 5:00 PM',
    description: 'Decorative painting, stencil work, putty finishing, and waterproofing. Transform your home with professional color consultation included.',
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Bathroom
  {
    id: 13, name: 'BathFix Experts', category: 'Bathroom',
    contactPerson: 'Vikram Joshi', email: 'vikram@bathfix.in',
    address: 'Yelahanka, Bangalore', rating: 4.7, reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop',
    price: 349, availability: '8:00 AM – 8:00 PM',
    description: 'Complete bathroom sanitary solutions — shower installation, sink repair, toilet fixing, and faucet replacement. High-quality fittings at best prices.',
    gallery: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Maintenance
  {
    id: 14, name: 'HandyMan Plus', category: 'Maintenance',
    contactPerson: 'Manoj Tiwari', email: 'manoj@handyman.in',
    address: 'Basavanagudi, Bangalore', rating: 4.6, reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1581092921461-39b97087559d?q=80&w=800&auto=format&fit=crop',
    price: 299, availability: '24/7 Available',
    description: 'All-in-one home maintenance solutions. Minor repairs, wall fixtures, furniture assembly, door adjustments, and general handyman tasks. Quick turnaround.',
    gallery: [
      'https://images.unsplash.com/photo-1581092921461-39b97087559d?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Electronics
  {
    id: 15, name: 'TechFix Electronics', category: 'Electronics',
    contactPerson: 'Arun Kumar', email: 'arun@techfix.in',
    address: 'Hebbal, Bangalore', rating: 4.7, reviewCount: 284,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?q=80&w=800&auto=format&fit=crop',
    price: 449, availability: '9:00 AM – 8:00 PM',
    description: 'Expert TV repair for all brands, CCTV camera installation, home theatre setup, and DTH installation. Genuine spare parts with 90-day warranty.',
    gallery: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Installation
  {
    id: 16, name: 'InstallPro Services', category: 'Installation',
    contactPerson: 'Rohit Sharma', email: 'rohit@installpro.in',
    address: 'Banashankari, Bangalore', rating: 4.8, reviewCount: 319,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop',
    price: 599, availability: '8:00 AM – 7:00 PM',
    description: 'Professional installation of RO water purifiers, geysers/water heaters, chimneys, and kitchen appliances. All brands. Quick and safe installation.',
    gallery: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Outdoor
  {
    id: 17, name: 'GreenThumb Outdoor', category: 'Outdoor',
    contactPerson: 'Deepa Nair', email: 'deepa@greenthumb.in',
    address: 'Sarjapur, Bangalore', rating: 4.5, reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop',
    price: 799, availability: '7:00 AM – 6:00 PM',
    description: 'Professional gardening, lawn care, plant trimming, and pest control services. Eco-friendly chemicals. Monthly maintenance packages available.',
    gallery: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop',
    ],
  },

  // Vehicle
  {
    id: 18, name: 'DoorStep Vehicle Care', category: 'Vehicle',
    contactPerson: 'Kiran Patel', email: 'kiran@vehiclecare.in',
    address: 'Bellandur, Bangalore', rating: 4.6, reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop',
    price: 299, availability: '8:00 AM – 8:00 PM',
    description: 'Doorstep car wash, bike repair, and vehicle detailing at your home. Premium foam wash, engine clean, and tyre check. No waiting at service centres.',
    gallery: [
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop',
    ],
  },
];

// ─── serviceData map (used by CategoryView) ───────────────────────────────────

export const serviceData = Object.fromEntries(
  categoryList.map(cat => [
    cat.name,
    {
      title: `${cat.name} Services`,
      description: `Professional ${cat.name.toLowerCase()} services from verified experts near you.`,
      subServices: cat.subServices,
      businesses: popularBusinesses.filter(b => b.category === cat.name),
    }
  ])
);
