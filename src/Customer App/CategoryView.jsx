import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgePercent,
  Car,
  ChevronLeft,
  ChevronRight,
  Coins,
  Droplets,
  Hammer,
  MapPin,
  Minus,
  Monitor,
  Package,
  Plus,
  Search,
  ShowerHead,
  Sparkles,
  Star,
  UserCircle2,
  Wrench,
  Wind,
  Zap,
} from 'lucide-react';
import { categoryList, serviceData } from './serviceData';
import './CategoryView.css';

const CATEGORY_ICON_MAP = {
  Plumbing: Droplets,
  Electrical: Zap,
  'AC Repair': Wind,
  Cleaning: Sparkles,
  Carpentry: Hammer,
  Painting: Wrench,
  Bathroom: ShowerHead,
  Maintenance: Wrench,
  Electronics: Monitor,
  Installation: Package,
  Outdoor: Sparkles,
  Vehicle: Car,
};

const CITY_AREAS = {
  Kochi: ['Kakkanad', 'Palarivattom', 'Kaloor', 'Edappally', 'Fort Kochi', 'Kadavanthra', 'Panampilly Nagar', 'Aluva', 'Vyttila', 'Thrippunithura', 'Kalamassery', 'Thevara', 'Marine Drive'],
  Trivandrum: ['Kazhakkoottam', 'Technopark', 'Pattom', 'Kowdiar', 'Sasthamangalam', 'Vazhuthacaud', 'Karamana', 'Poojappura', 'Peroorkada', 'Sreekariyam', 'Neyyattinkara', 'Kesavadasapuram'],
  Bengaluru: ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Jayanagar', 'Rajajinagar', 'Marathahalli', 'BTM Layout', 'Yelahanka', 'Electronic City', 'Hebbal', 'JP Nagar'],
  Chennai: ['Adyar', 'Anna Nagar', 'T Nagar', 'Velachery', 'OMR', 'Porur', 'Tambaram', 'Chromepet', 'Vadapalani', 'Nungambakkam'],
  Mumbai: ['Andheri', 'Bandra', 'Powai', 'Thane', 'Navi Mumbai', 'Borivali', 'Dadar', 'Ghatkopar'],
  'Delhi NCR': ['Gurugram', 'Noida', 'Dwarka', 'Rohini', 'Saket', 'Greater Noida', 'Faridabad', 'Ghaziabad'],
  Kozhikode: ['Mavoor Road', 'Nadakkavu', 'Ramanattukara', 'Beypore', 'Kunnamangalam', 'Feroke', 'Chevayur'],
  Thrissur: ['Punkunnam', 'Ayyanthole', 'Ollur', 'Kodungallur', 'Guruvayur', 'Mannuthy', 'Irinjalakuda'],
};

const REVIEW_TEMPLATES = [
  { name: 'ARUN', text: 'Quick arrival, neat work, and very clear explanation before starting the job.' },
  { name: 'AKHIL', text: 'Booking was easy and the service partner handled the issue without any delay.' },
  { name: 'SANITH', text: 'Professional behaviour, fair pricing, and the work area was kept clean.' },
  { name: 'SUDHEER WARRIER', text: 'The technician identified the problem fast and finished the work properly.' },
  { name: 'ANAGHA', text: 'Very satisfied with the response time and the overall service experience.' },
  { name: 'MEERA', text: 'Good support from booking to completion. I would book this service again.' },
];

const EXPERT_VARIATIONS = [
  { suffix: 'Prime', contactPrefix: 'Senior', slotLabel: 'Arrives in 30 mins', priceDelta: 0, ratingDelta: 0, reviewDelta: 0 },
  { suffix: 'Rapid', contactPrefix: 'Lead', slotLabel: 'Evening slots open', priceDelta: 79, ratingDelta: -0.1, reviewDelta: 24 },
  { suffix: 'Plus', contactPrefix: 'Verified', slotLabel: 'Tomorrow morning slot', priceDelta: 149, ratingDelta: 0.1, reviewDelta: 43 },
];

function CategoryView({
  initialCategory,
  initialSearch = '',
  selectedLocation = 'Trivandrum',
  onBookNow,
  onSelectBusiness,
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'Plumbing');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [expandedSection, setExpandedSection] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const categorySwitcherRef = useRef(null);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
      setExpandedSection(null);
    }
  }, [initialCategory]);

  useEffect(() => {
    setSearchQuery(initialSearch || '');
  }, [initialSearch]);

  useEffect(() => {
    const switcherElement = categorySwitcherRef.current;

    if (!switcherElement) return undefined;

    const updateSwitcherButtons = () => {
      const maxScrollLeft = switcherElement.scrollWidth - switcherElement.clientWidth;
      setCanScrollPrev(switcherElement.scrollLeft > 8);
      setCanScrollNext(switcherElement.scrollLeft < maxScrollLeft - 8);
    };

    updateSwitcherButtons();
    switcherElement.addEventListener('scroll', updateSwitcherButtons);
    window.addEventListener('resize', updateSwitcherButtons);

    return () => {
      switcherElement.removeEventListener('scroll', updateSwitcherButtons);
      window.removeEventListener('resize', updateSwitcherButtons);
    };
  }, [activeCategory]);

  const currentCategoryData = serviceData[activeCategory] || { businesses: [], subServices: [], description: '' };
  const activeCategoryMeta = categoryList.find((category) => category.name === activeCategory);
  const activeBusinesses = currentCategoryData.businesses || [];

  const filteredBusinesses = activeBusinesses.filter((business) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return true;

    const searchableParts = [
      business.name,
      business.contactPerson,
      business.address,
      business.description,
      activeCategory,
      ...currentCategoryData.subServices,
    ];

    return searchableParts.some((value) => value.toLowerCase().includes(normalizedQuery));
  });

  const totalReviews = activeBusinesses.reduce((sum, business) => sum + business.reviewCount, 0);
  const averageRating = activeBusinesses.length
    ? (activeBusinesses.reduce((sum, business) => sum + business.rating, 0) / activeBusinesses.length).toFixed(1)
    : '4.8';
  const basePrice = activeBusinesses.length ? Math.min(...activeBusinesses.map((business) => business.price)) : 249;
  const offerCode = `${activeCategory.replace(/\s+/g, '').slice(0, 6).toUpperCase()}75`;
  const categoryIcon = CATEGORY_ICON_MAP[activeCategory] || Search;
  const areaLinks = CITY_AREAS[selectedLocation] || CITY_AREAS.Trivandrum;
  const relatedCategories = categoryList.filter((category) => category.name !== activeCategory).slice(0, 6);
  const spotlightServices = (currentCategoryData.subServices || []).slice(0, 3).join(', ').toLowerCase();
  const reviewCards = REVIEW_TEMPLATES.slice(0, 6);
  const providerCarouselItems = filteredBusinesses.flatMap((business, businessIndex) => {
    const specialties = currentCategoryData.subServices?.length ? currentCategoryData.subServices : [activeCategory];

    return EXPERT_VARIATIONS.map((variation, variationIndex) => {
      const specialty = specialties[(businessIndex + variationIndex) % specialties.length];
      const serviceArea = areaLinks[(businessIndex + variationIndex) % areaLinks.length];
      const adjustedRating = Math.min(5, Math.max(4.3, business.rating + variation.ratingDelta));

      return {
        ...business,
        id: `${business.id}-${variation.suffix.toLowerCase()}`,
        name: variationIndex === 0 ? business.name : `${business.name} ${variation.suffix}`,
        contactPerson: variationIndex === 0 ? business.contactPerson : `${variation.contactPrefix} ${business.contactPerson}`,
        address: `${serviceArea}, ${selectedLocation}`,
        availability: variation.slotLabel,
        price: business.price + variation.priceDelta,
        rating: Number(adjustedRating.toFixed(1)),
        reviewCount: business.reviewCount + variation.reviewDelta,
        highlight: specialty,
      };
    });
  });

  const priceRows = (currentCategoryData.subServices || []).slice(0, 4).map((service, index) => ({
    service,
    price: basePrice + (index * 99),
  }));

  const accordionSections = [
    {
      id: 'rate-chart',
      title: 'Rate Chart',
      content: (
        <div className="category-rate-list">
          {priceRows.map((row) => (
            <div key={row.service} className="category-rate-row">
              <span>{row.service}</span>
              <strong>From Rs. {row.price}</strong>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      content: (
        <ul className="category-info-list">
          <li>HomeCare charges for an initial service unit of 1 hour and every 30 minutes thereafter.</li>
          <li>Material charges are additional. Customers may purchase materials directly or request the service partner to procure them. Material procurement time will be added to the final bill.</li>
          <li>Please ask the service partner for a detailed quotation before starting any quoted work and confirm it before work begins.</li>
          <li>Only maintenance works are carried out at hourly rates. For long-hour schedules, the service partner will help with a quotation.</li>
          <li>If you decide not to continue or reschedule the service after the partner arrives at your premises, an inspection charge of Rs. 150 may apply.</li>
          <li>An additional night service charge of Rs. 150 applies for services scheduled between 07:00 PM and 07:00 AM.</li>
          <li>We offer up to 7 days warranty for recurring issues of the same nature on services completed through HomeCare.</li>
        </ul>
      ),
    },
    {
      id: 'how-it-works',
      title: 'How it works',
      content: (
        <div className="category-steps">
          <div className="category-step-card">
            <span>1</span>
            <p>Select the service or sub-service you need.</p>
          </div>
          <div className="category-step-card">
            <span>2</span>
            <p>Choose your preferred expert and schedule instantly.</p>
          </div>
          <div className="category-step-card">
            <span>3</span>
            <p>Track the booking and pay after the work is completed.</p>
          </div>
        </div>
      ),
    },
  ];

  const CategorySectionIcon = categoryIcon;
  const handleCategorySelect = (categoryName) => {
    setActiveCategory(categoryName);
    setSearchQuery('');
    setExpandedSection(null);
  };

  const handleCategorySwitchScroll = (direction) => {
    const switcherElement = categorySwitcherRef.current;
    if (!switcherElement) return;

    const scrollAmount = Math.max(220, switcherElement.clientWidth * 0.72);
    switcherElement.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="category-page"
      style={{
        '--category-accent': activeCategoryMeta?.color || '#0f172a',
        '--category-soft': activeCategoryMeta?.bgColor || '#fff7ed',
      }}
    >
      <div className="category-page-shell">
        <section className="category-switcher-shell">
          <button
            type="button"
            className="category-switch-nav category-switch-nav-left"
            onClick={() => handleCategorySwitchScroll('left')}
            disabled={!canScrollPrev}
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={18} />
          </button>

          <div ref={categorySwitcherRef} className="category-switcher">
            {categoryList.map((category) => {
              const isActive = category.name === activeCategory;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`category-switch-chip ${isActive ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  {/* <img src={category.image} alt={category.name} /> */}
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="category-switch-nav category-switch-nav-right"
            onClick={() => handleCategorySwitchScroll('right')}
            disabled={!canScrollNext}
            aria-label="Scroll categories right"
          >
            <ChevronRight size={18} />
          </button>
        </section>

        <section className="category-hero-card">
          <div className="category-hero-top">
            <div>
              <p className="category-hero-label">Trusted home service</p>
              <h1>{activeCategory.toUpperCase()}</h1>
              <p className="category-hero-copy">{currentCategoryData.description}</p>
            </div>

            <button
              type="button"
              className="category-book-btn"
              onClick={() => onBookNow?.(activeCategory, currentCategoryData.subServices?.[0] || 'General Service')}
            >
              Book Now
            </button>
          </div>

          <div className="category-offer-row">
            <div className="category-offer-pill">
              <BadgePercent size={18} />
              <span>Use code {offerCode} to get Rs. 75 off</span>
            </div>
            <div className="category-offer-pill">
              <Coins size={18} />
              <span>Redeem HomeCare reward coins to get Rs. 100 off</span>
            </div>
          </div>

          <div className="category-meta-row">
            <div className="category-location-pill">
              <MapPin size={18} />
              <span>Bengaluru</span>
            </div>

            <div className="category-rating-row">
              <div className="category-stars">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={16} fill="#facc15" color="#facc15" />
                ))}
              </div>
              <span>
                ({averageRating}) {totalReviews} Reviews
              </span>
            </div>

            <div className="category-provider-count">
              {activeBusinesses.length} pros available today
            </div>
          </div>
        </section>

        <section className="category-accordion-stack">
          {accordionSections.map((section) => {
            const isOpen = expandedSection === section.id;

            return (
              <article key={section.id} className={`category-accordion-card ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="category-accordion-trigger"
                  onClick={() => setExpandedSection(isOpen ? null : section.id)}
                >
                  <span className="category-accordion-icon">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
                  <span>{section.title}</span>
                </button>

                {isOpen && <div className="category-accordion-content">{section.content}</div>}
              </article>
            );
          })}
        </section>

        <section className="category-story-panel">
          <div className="category-story-copy">
            <h2>
              TRYING TO FIND AN EXPERT IN {activeCategory.toUpperCase()} IN {selectedLocation.toUpperCase()}? WE BRING YOU THE
              BEST {activeCategory.toUpperCase()} PROFESSIONALS.
            </h2>
            <p>
              {selectedLocation} homes and offices often need timely support for {activeCategory.toLowerCase()} needs. With
              regular usage, issues can build up and affect comfort, convenience, and safety. HomeCare helps you book vetted
              experts for {spotlightServices || `trusted ${activeCategory.toLowerCase()} work`} without the stress of searching
              offline.
            </p>
            <hr />
            <h3>Best {activeCategory.toLowerCase()} technicians at your convenience.</h3>
            <p>
              Our network of verified professionals is available across {selectedLocation} for scheduled visits and urgent jobs.
              Every booking is backed by transparent pricing, service support, and experienced partners who can handle both
              short maintenance work and larger quotation-based requests.
            </p>
          </div>
        </section>

        <section className="category-reviews-panel">
          <div className="category-section-heading category-section-heading-tight">
            <div>
              <p>What customers say</p>
              <h2>Customer Reviews</h2>
            </div>
          </div>

          <div className="category-reviews-grid">
            {reviewCards.map((review) => (
              <article key={review.name} className="category-review-card">
                <div className="category-review-user">
                  <UserCircle2 size={18} />
                  <span>{review.name}</span>
                </div>
                <div className="category-review-stars">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={16} fill="#facc15" color="#facc15" />
                  ))}
                </div>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="category-related-panel">
          <div className="category-section-heading category-section-heading-tight">
            <div>
              <p>Explore more</p>
              <h2>Related Services</h2>
            </div>
          </div>

          <div className="category-related-grid">
            {relatedCategories.map((category) => {
              const RelatedIcon = CATEGORY_ICON_MAP[category.name] || Search;

              return (
                <button
                  key={category.id}
                  type="button"
                  className="category-related-card"
                  onClick={() => {
                    setActiveCategory(category.name);
                    setSearchQuery('');
                    setExpandedSection(null);
                  }}
                >
                  <span className="category-related-icon">
                    <RelatedIcon size={28} />
                  </span>
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          <div className="category-area-links">
            {areaLinks.map((area) => (
              <button
                key={area}
                type="button"
                className="category-area-link"
                onClick={() => setSearchQuery(area)}
              >
                {activeCategory} in {area}
              </button>
            ))}
          </div>
        </section>

        <section className="category-app-banner">
          <div className="category-app-banner-icon">
            <CategorySectionIcon size={26} />
          </div>
          <div className="category-app-banner-copy">
            <h3>Get a better HomeCare experience on mobile</h3>
            <p>Download the HomeCare app now for faster booking, updates, and support.</p>
          </div>
          <div className="category-app-banner-actions">
            <button type="button" className="category-app-btn">App Store</button>
            <button type="button" className="category-app-btn">Google Play</button>
          </div>
        </section>

        <section className="category-subservices-panel">
          <div className="category-section-heading">
            <div>
              <p>Popular options</p>
              <h2>Choose your {activeCategory.toLowerCase()} service</h2>
            </div>
          </div>

          <div className="category-subservice-grid">
            {(currentCategoryData.subServices || []).map((subService) => (
              <button
                key={subService}
                type="button"
                className="category-subservice-card"
                onClick={() => onBookNow?.(activeCategory, subService)}
              >
                <span>{subService}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </section>

        <section className="category-providers-panel">
          <div className="category-providers-header">
            <div>
              <p>Verified professionals</p>
              <h2>Available Experts</h2>
            </div>

            <label className="category-search-field">
              <Search size={16} />
              <input
                type="text"
                placeholder={`Search ${activeCategory.toLowerCase()} experts`}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
          </div>

          {filteredBusinesses.length > 0 ? (
            <div
              className="category-provider-carousel"
              style={{ '--provider-carousel-duration': `${Math.max(providerCarouselItems.length * 4.5, 24)}s` }}
            >
              <div className="category-provider-carousel-track">
                {[0, 1].map((loopIndex) => (
                  <div
                    key={loopIndex}
                    className="category-provider-carousel-group"
                    aria-hidden={loopIndex === 1}
                  >
                    {providerCarouselItems.map((business) => (
                      <article
                        key={`${business.id}-${loopIndex}`}
                        className="category-provider-card category-provider-card-carousel"
                        onClick={() => onSelectBusiness?.(business)}
                      >
                        <div className="category-provider-image-wrap">
                          <img src={business.image} alt={business.name} className="category-provider-image" />
                          <span className="category-provider-price">From Rs. {business.price}</span>
                        </div>

                        <div className="category-provider-body">
                          <div className="category-provider-topline">
                            <span className="category-provider-badge">{business.category}</span>
                            <span className="category-provider-availability">{business.availability}</span>
                          </div>

                          <h3>{business.name}</h3>
                          <p className="category-provider-person">{business.contactPerson}</p>

                          <div className="category-provider-rating">
                            <Star size={14} fill="#facc15" color="#facc15" />
                            <span>{business.rating}</span>
                            <small>({business.reviewCount} reviews)</small>
                          </div>

                          <p className="category-provider-address">
                            <MapPin size={14} />
                            {business.address}
                          </p>

                          <div className="category-provider-highlight">{business.highlight}</div>

                          <button
                            type="button"
                            className="category-provider-button"
                            onClick={(event) => {
                              event.stopPropagation();
                              onBookNow?.(activeCategory, business.highlight || currentCategoryData.subServices?.[0] || 'General Service');
                            }}
                          >
                            Book This Expert
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="category-empty-state">
              <h3>No matching experts found</h3>
              <p>Try another keyword or choose one of the popular services above.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CategoryView;
