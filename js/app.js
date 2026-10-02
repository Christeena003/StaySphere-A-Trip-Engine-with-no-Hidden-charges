/**
 * StaySphere Master Interactive Application Engine
 * Minimalist, Airy UI with Dynamic Arrival Hubs, Dual-Route Map Engine
 * (Solid Roadway Corridor + Dotted Visitable Spots Order), Off-season Slashed Pricing,
 * Customizable Sequence, and Offline Canvas Map Exporter.
 */

// Global State
const StaySphereState = {
  destination: 'manali',
  destinationsData: {
    manali: {
      name: 'Manali, Kullu & Kasol Valley',
      center: [31.95, 77.15],
      zoom: 8,
      hubs: [
        'Chandigarh Junction / IXC Airport',
        'Delhi IGI Airport / Kashmere Gate',
        'Bhuntar Airport (Kullu Valley)'
      ],
      basePrice: 6500,
      offSeasonPrice: 5200,
      isOffSeason: true,
      // Actual Highway Geometry along NH-205, NH-21 & NH-3 (Solid Road Line)
      roadCorridor: [
        [30.7018, 76.8220], // Chandigarh Hub
        [30.9664, 76.5331], // Rupnagar / Ropar
        [31.1800, 76.5600], // Kiratpur Sahib
        [31.2500, 76.6800], // Swarghat Pass
        [31.3300, 76.7600], // Bilaspur NH-205
        [31.5300, 76.8900], // Sundernagar
        [31.7087, 76.9320], // Mandi Town
        [31.6700, 77.0500], // Pandoh Dam
        [31.7400, 77.1600], // Aut Tunnel
        [31.8763, 77.1541], // Bhuntar Junction
        [31.9579, 77.1095], // Kullu Valley
        [32.1460, 77.1700], // Naggar Castle
        [32.2396, 77.1887], // Manali Town / Riverside Stay
        [32.3167, 77.1575], // Solang Valley Snow Point
        [32.3600, 77.1300], // Atal Tunnel South Portal
        [31.8763, 77.1541], // (Fork via Bhuntar to Parvati Valley)
        [31.9800, 77.2600], // Jari
        [32.0100, 77.3150], // Kasol Pine Trail
        [32.0270, 77.3500]  // Manikaran Hot Springs
      ],
      // Visitable Spots with sequence order, timings, fees, altitude, and tips
      allSpots: [
        {
          id: 'hub',
          name: 'Chandigarh Junction (Arrival Hub)',
          coords: [30.7018, 76.8220],
          type: 'hub',
          desc: 'Primary transit terminal. High-frequency AC Volvos and self-drive cabs depart toward Himachal.',
          timings: '24 Hours Open',
          fee: 'Transit Terminal',
          altitude: '321 meters',
          distFromPrev: '0 km (Starting Point)',
          duration: '1 Hour transit',
          active: true
        },
        {
          id: 'dam',
          name: 'Pandoh Dam & Mandi Riverbank',
          coords: [31.6700, 77.0500],
          type: 'sight',
          desc: 'Turquoise Beas river spillway with scenic mountain viewing deck.',
          timings: '08:00 AM - 06:00 PM',
          fee: 'Free Access',
          altitude: '883 meters',
          distFromPrev: '185 km from Chandigarh (approx. 4.5 hrs drive)',
          duration: '45 mins stop',
          active: true
        },
        {
          id: 'naggar',
          name: 'Naggar Ancient Castle & Roerich Estate',
          coords: [32.1460, 77.1700],
          type: 'sight',
          desc: '15th-century wood and stone palace overlooking Kullu valley. Traditional Kathkuni architecture.',
          timings: '09:00 AM - 05:30 PM',
          fee: '₹50 per person',
          altitude: '1,800 meters',
          distFromPrev: '60 km from Mandi (approx. 1.8 hrs drive)',
          duration: '1.5 hours visit',
          active: true
        },
        {
          id: 'stay',
          name: 'Riverside Wooden Homestay (Manali)',
          coords: [32.2396, 77.1887],
          type: 'stay',
          desc: 'Verified local cedar-wood stay with organic apple orchard and direct Beas river access.',
          timings: 'Check-in: 12:00 PM',
          fee: '₹5,200 / room/night (double occupancy; off-season example)',
          altitude: '2,050 meters',
          distFromPrev: '22 km from Naggar (approx. 45 mins drive)',
          duration: 'Overnight Stay',
          active: true
        },
        {
          id: 'solang',
          name: 'Solang Valley Snow Point & Atal Tunnel',
          coords: [32.3167, 77.1575],
          type: 'sight',
          desc: 'Snow sports paradise, paragliding, zorbing, and gateway to Lahaul valley via Atal Tunnel.',
          timings: '09:00 AM - 06:00 PM',
          fee: 'Activity based (Permits required in winter)',
          altitude: '2,560 meters',
          distFromPrev: '14 km from Manali (approx. 35 mins drive)',
          duration: '3 hours visit',
          active: true
        },
        {
          id: 'kasol',
          name: 'Kasol Parvati River Trail',
          coords: [32.0100, 77.3150],
          type: 'sight',
          desc: 'Tranquil riverside pine walking trails, cozy wood-fired bakeries, and suspension bridges.',
          timings: 'All Day Open',
          fee: 'Free Access',
          altitude: '1,580 meters',
          distFromPrev: '75 km from Manali (approx. 2.5 hrs drive)',
          duration: '2.5 hours visit',
          active: true
        },
        {
          id: 'manikaran',
          name: 'Manikaran Sacred Geothermal Hot Springs',
          coords: [32.0270, 77.3500],
          type: 'sight',
          desc: 'Natural healing hot sulphur water baths and historic riverside Gurudwara Sahib.',
          timings: '05:00 AM - 09:00 PM',
          fee: 'Free Access',
          altitude: '1,760 meters',
          distFromPrev: '4.5 km from Kasol (approx. 15 mins drive)',
          duration: '2 hours visit',
          active: true
        }
      ]
    },
    rajasthan: {
      name: 'Jaipur, Udaipur & Kumbhalgarh',
      center: [25.8, 74.5],
      zoom: 7,
      hubs: [
        'Jaipur Junction Railway Station',
        'Jaipur International Airport (JAI)',
        'Udaipur Maharana Pratap Airport (UDR)',
        'Jodhpur Junction'
      ],
      basePrice: 8500,
      offSeasonPrice: 6800,
      isOffSeason: true,
      roadCorridor: [
        [26.9200, 75.7900], // Jaipur
        [26.9855, 75.8513], // Amber Fort
        [26.4499, 74.6399], // Ajmer NH-48
        [25.3475, 74.6408], // Bhilwara
        [24.8887, 74.6269], // Chittorgarh Fort
        [24.5764, 73.6835], // Udaipur
        [25.1479, 73.5875]  // Kumbhalgarh
      ],
      allSpots: [
        {
          id: 'hub',
          name: 'Jaipur Junction (Arrival Hub)',
          coords: [26.9200, 75.7900],
          type: 'hub',
          desc: 'Major pink city railway junction with round-the-clock taxi connectivity.',
          timings: '24 Hours Open',
          fee: 'Transit Terminal',
          altitude: '431 meters',
          distFromPrev: '0 km',
          duration: 'Transit point',
          active: true
        },
        {
          id: 'amber',
          name: 'Amber Fort & Jal Mahal View',
          coords: [26.9855, 75.8513],
          type: 'sight',
          desc: 'Historic Rajput fortress on Cheel ka Teela hill with Sheesh Mahal mirror palace.',
          timings: '08:00 AM - 05:30 PM',
          fee: '₹100 per person',
          altitude: '480 meters',
          distFromPrev: '12 km from Jaipur Junction',
          duration: '2.5 hours',
          active: true
        },
        {
          id: 'pichola',
          name: 'Lake Pichola & City Palace (Udaipur)',
          coords: [24.5764, 73.6835],
          type: 'sight',
          desc: 'Iconic royal palace complex on lake shores with sunset boat rides.',
          timings: '09:00 AM - 06:00 PM',
          fee: '₹300 per person',
          altitude: '598 meters',
          distFromPrev: '395 km from Jaipur via NH-48',
          duration: '3 hours',
          active: true
        },
        {
          id: 'kumbhal',
          name: 'Kumbhalgarh Great Wall & Mewar Citadel',
          coords: [25.1479, 73.5875],
          type: 'sight',
          desc: '36-kilometer continuous defensive stone wall nestled amidst the Aravalli range.',
          timings: '09:00 AM - 06:00 PM',
          fee: '₹40 per person',
          altitude: '1,100 meters',
          distFromPrev: '85 km from Udaipur',
          duration: '2.5 hours',
          active: true
        }
      ]
    },
    goa: {
      name: 'Old Goa & South Heritage Beaches',
      center: [15.35, 73.95],
      zoom: 10,
      hubs: [
        'Dabolim International Airport (GOI)',
        'Manohar International Airport Mopa (GOX)',
        'Madgaon Railway Station (MAO)'
      ],
      basePrice: 7000,
      offSeasonPrice: 5600,
      isOffSeason: true,
      roadCorridor: [
        [15.3800, 73.8300], // Dabolim
        [15.4989, 73.8278], // Fontainhas Panaji
        [15.5009, 73.9116], // Old Goa Churches
        [15.2832, 73.9862], // Madgaon
        [15.0100, 74.0200]  // Palolem Beach
      ],
      allSpots: [
        {
          id: 'hub',
          name: 'Dabolim Airport (Arrival Hub)',
          coords: [15.3800, 73.8300],
          type: 'hub',
          desc: 'Central transit terminal connecting North and South coastal expressways.',
          timings: '24 Hours Open',
          fee: 'Transit Terminal',
          altitude: '56 meters',
          distFromPrev: '0 km',
          duration: 'Transit point',
          active: true
        },
        {
          id: 'fontainhas',
          name: 'Fontainhas Latin Heritage Quarter',
          coords: [15.4989, 73.8278],
          type: 'sight',
          desc: 'Historic Portuguese colonial lanes with pastel-painted villas and traditional bakeries.',
          timings: 'All Day Open',
          fee: 'Free Walking Tour',
          altitude: '10 meters',
          distFromPrev: '28 km from Dabolim',
          duration: '2 hours',
          active: true
        },
        {
          id: 'palolem',
          name: 'Palolem Crescent Beach & Cabanas',
          coords: [15.0100, 74.0200],
          type: 'sight',
          desc: 'Calm bay lined with swaying coconut palms, wooden beach huts, and kayak channels.',
          timings: 'All Day Open',
          fee: 'Free Access',
          altitude: '4 meters',
          distFromPrev: '62 km from Panaji',
          duration: 'Overnight Stay',
          active: true
        }
      ]
    },
    kerala: {
      name: 'Munnar Hills & Alleppey Backwaters',
      center: [9.85, 76.75],
      zoom: 8,
      hubs: [
        'Kochi International Airport (COK)',
        'Ernakulam Junction Railway Station',
        'Trivandrum Airport (TRV)'
      ],
      basePrice: 8000,
      offSeasonPrice: 6400,
      isOffSeason: true,
      roadCorridor: [
        [10.1518, 76.3930], // Kochi Airport
        [10.0500, 76.6200], // Kothamangalam
        [10.0300, 76.8500], // Neriamangalam / Cheeyappara Falls
        [10.0889, 77.0595], // Munnar Tea Estates
        [9.9800, 76.5800],  // Kottayam NH-183
        [9.4981, 76.3388]   // Alleppey Backwaters
      ],
      allSpots: [
        {
          id: 'hub',
          name: 'Kochi International Airport (Arrival Hub)',
          coords: [10.1518, 76.3930],
          type: 'hub',
          desc: 'World first solar-powered international airport with pre-paid hill station cabs.',
          timings: '24 Hours Open',
          fee: 'Transit Terminal',
          altitude: '8 meters',
          distFromPrev: '0 km',
          duration: 'Transit point',
          active: true
        },
        {
          id: 'munnar',
          name: 'Munnar Tea Plantations & Mattupetty',
          coords: [10.0889, 77.0595],
          type: 'sight',
          desc: 'Sprawling high-altitude tea hills, crisp mist, and mountain reservoir boating.',
          timings: '09:00 AM - 05:00 PM',
          fee: '₹125 per person (Tea Museum)',
          altitude: '1,532 meters',
          distFromPrev: '110 km from Kochi (approx. 3.5 hrs drive)',
          duration: 'Overnight Stay',
          active: true
        },
        {
          id: 'alleppey',
          name: 'Alleppey Backwaters & Vembanad Lake',
          coords: [9.4981, 76.3388],
          type: 'sight',
          desc: 'Iconic canals, tranquil palm-fringed lagoons, and traditional houseboat cruises.',
          timings: 'Cruise check-in: 12:00 PM',
          fee: 'Houseboat package based',
          altitude: '1 meter',
          distFromPrev: '160 km from Munnar via western ghats',
          duration: 'Overnight Stay',
          active: true
        }
      ]
    },
    sikkim: {
      name: 'Gangtok, Pelling & Kanchenjunga',
      center: [27.35, 88.5],
      zoom: 9,
      hubs: [
        'Bagdogra International Airport (IXB)',
        'New Jalpaiguri Junction (NJP)',
        'Pakyong Airport (PYG)'
      ],
      basePrice: 6000,
      offSeasonPrice: 4800,
      isOffSeason: true,
      roadCorridor: [
        [26.6812, 88.3286], // Bagdogra
        [26.9000, 88.4200], // Sevoke Teesta Bridge
        [27.1000, 88.5200], // Rangpo Border Checkpost
        [27.3389, 88.6065], // Gangtok
        [27.3742, 88.7619]  // Tsomgo Lake
      ],
      allSpots: [
        {
          id: 'hub',
          name: 'Bagdogra Airport (Arrival Hub)',
          coords: [26.6812, 88.3286],
          type: 'hub',
          desc: 'Transit airport for North Bengal and Sikkim hill corridors.',
          timings: '24 Hours Open',
          fee: 'Transit Terminal',
          altitude: '126 meters',
          distFromPrev: '0 km',
          duration: 'Transit point',
          active: true
        },
        {
          id: 'gangtok',
          name: 'Gangtok Ridge & Enchey Monastery',
          coords: [27.3389, 88.6065],
          type: 'sight',
          desc: 'Clean mountain capital with pedestrian MG Marg and 200-year-old Buddhist sanctuary.',
          timings: '06:00 AM - 06:00 PM',
          fee: 'Free Access',
          altitude: '1,650 meters',
          distFromPrev: '125 km from Bagdogra (approx. 4.5 hrs drive)',
          duration: 'Overnight Stay',
          active: true
        },
        {
          id: 'tsomgo',
          name: 'Tsomgo Glacial Lake (12,400 ft)',
          coords: [27.3742, 88.7619],
          type: 'sight',
          desc: 'Pristine oval-shaped alpine lake fed by melting Himalayan snowpeaks.',
          timings: '08:00 AM - 03:00 PM (Protected Area Permit Required)',
          fee: 'Permit included in tour',
          altitude: '3,753 meters',
          distFromPrev: '40 km from Gangtok',
          duration: '3 hours',
          active: true
        }
      ]
    },
    uttarakhand: {
      name: 'Rishikesh, Mussoorie & Tehri',
      center: [30.25, 78.2],
      zoom: 9,
      hubs: [
        'Dehradun Jolly Grant Airport (DED)',
        'Haridwar Junction Railway Station',
        'Rishikesh Railway Station'
      ],
      basePrice: 5500,
      offSeasonPrice: 4400,
      isOffSeason: true,
      roadCorridor: [
        [30.1897, 78.1803], // Dehradun Airport
        [30.1200, 78.3100], // Rishikesh
        [30.3165, 78.0322], // Dehradun City
        [30.4598, 78.0644]  // Mussoorie Ridge
      ],
      allSpots: [
        {
          id: 'hub',
          name: 'Dehradun Airport (Arrival Hub)',
          coords: [30.1897, 78.1803],
          type: 'hub',
          desc: 'Jolly Grant Airport situated midway between Rishikesh and Dehradun.',
          timings: '24 Hours Open',
          fee: 'Transit Terminal',
          altitude: '550 meters',
          distFromPrev: '0 km',
          duration: 'Transit point',
          active: true
        },
        {
          id: 'rishikesh',
          name: 'Ram Jhula & Ganga Aarti Ghats',
          coords: [30.1200, 78.3100],
          type: 'sight',
          desc: 'Spiritual heart of Garhwal with evening oil-lamp ceremonies on Triveni Ghat.',
          timings: 'Aarti at 06:00 PM',
          fee: 'Free Access',
          altitude: '372 meters',
          distFromPrev: '20 km from Airport',
          duration: 'Evening visit',
          active: true
        },
        {
          id: 'mussoorie',
          name: 'Mussoorie Mall Road & Gun Hill Ridge',
          coords: [30.4598, 78.0644],
          type: 'sight',
          desc: 'Queen of the Hills with colonial walking promenades and views of the snow ranges.',
          timings: 'All Day Open',
          fee: 'Free Access',
          altitude: '2,005 meters',
          distFromPrev: '75 km from Rishikesh',
          duration: 'Overnight Stay',
          active: true
        }
      ]
    },
    ladakh: {
      name: 'Leh, Nubra Valley & Pangong Tso',
      center: [34.15, 77.6],
      zoom: 8,
      hubs: [
        'Kushok Bakula Rimpochee Airport Leh (IXL)',
        'Srinagar International Airport (SXR)',
        'Manali Highway Transit Hub'
      ],
      basePrice: 9000,
      offSeasonPrice: 7200,
      isOffSeason: true,
      roadCorridor: [
        [34.1359, 77.5465], // Leh Airport
        [34.1642, 77.5848], // Leh Main Bazaar & Shanti Stupa
        [34.2787, 77.6047], // Khardung La Pass
        [34.5800, 77.4800], // Diskit & Hunder Sand Dunes
        [33.7595, 78.6674]  // Pangong Tso Lake
      ],
      allSpots: [
        {
          id: 'hub',
          name: 'Leh Airport (Arrival Hub)',
          coords: [34.1359, 77.5465],
          type: 'hub',
          desc: 'High-altitude airfield. Mandatory 24-hour acclimatization rest is advised for all visitors.',
          timings: 'Morning Flights Only',
          fee: 'Transit Terminal',
          altitude: '3,256 meters',
          distFromPrev: '0 km',
          duration: 'Acclimatization day',
          active: true
        },
        {
          id: 'khardungla',
          name: 'Khardung La Pass (17,982 ft)',
          coords: [34.2787, 77.6047],
          type: 'sight',
          desc: 'Legendary mountain pass connecting the Indus and Shyok/Nubra river valleys.',
          timings: 'Daylight transit only',
          fee: 'Inner Line Permit Required',
          altitude: '5,359 meters',
          distFromPrev: '40 km from Leh',
          duration: '30 mins stop (High altitude)',
          active: true
        },
        {
          id: 'pangong',
          name: 'Pangong Tso Endorheic Alpine Lake',
          coords: [33.7595, 78.6674],
          type: 'sight',
          desc: '134-km long saltwater lake famous for shifting shades of cobalt, cyan, and turquoise.',
          timings: 'Daylight visit / Eco-camps',
          fee: 'Eco-fee included in permit',
          altitude: '4,225 meters',
          distFromPrev: '150 km from Leh via Chang La',
          duration: 'Overnight Stay',
          active: true
        }
      ]
    }
  },
  currentArrivalHub: '',
  tripDurationDays: 4,
  travelersCount: 2,
  agencyBooked: false,
  selectedServices: {
    breakfast: true,
    lunch: false,
    dinner: true,
    laundry: false,
    cleaning: true,
    guide: false
  },
  flatPlatformFee: 500, // Always flat ₹500
  discountCode: '',
  discountAmount: 0,
  friends: ['You (Rohan)', 'Aarav', 'Priya'],
  groupWalletBalance: 0,
  mapInstance: null,
  solidRoadPolyline: null,   // Solid Line along Actual Roads
  dottedOrderPolyline: null, // Dotted Line showing Visitable Spots Sequence Order
  markersList: [],
  liveRoutePolyline: null,
  customStops: [],
  livePOIs: [],
  poiMarkers: [],
  poiFilters: { all: true, food: true, stay: true, attraction: true, nature: true },
  finalPathMode: false,
  selectedAccommodationId: 'riverside-cedar',
      adultsCount: 2,
      childrenCount: 0,
      lockedCartQuote: null,
  optimizedRouteStops: [],
  friendsDirectory: [],
  chatMessages: [],
  polls: []
};

document.addEventListener('DOMContentLoaded', () => {
  initUniqueLoader();
  initNavigationTabs();
  initRoleModal();
  initAuthStatus();
  initDynamicDestinationAndHubs();
  initLeafletScrollableMap();
  initLivePOIControls();
  initCustomizableRouteControls();
  initOfflineMapDownloader();
  initCartAndPayment();
  initBusinessDashboard();
  initPastTripsAndReviews();
  initAccommodationSelector();
  initGroupFeatures();
  initPaymentShareFeatures();
  updateTotalCalculations();
});

/* ==================== 0. PERSISTENT LOGIN STATUS ==================== */
function initAuthStatus() {
  const loginBtn = document.querySelector('.btn-header-login');
  const signupBtn = document.querySelector('.btn-header-signup');
  let session = null;
  try { session = JSON.parse(localStorage.getItem('staysphere_session') || 'null'); } catch (_) {}
  if (!session || !session.name) return;
  if (loginBtn) {
    loginBtn.textContent = `Hi, ${session.name}`;
    loginBtn.removeAttribute('data-open-role');
    loginBtn.title = `Signed in as ${session.email || session.name}`;
    loginBtn.onclick = () => showToast(`You're logged in as ${session.name}.`, 'success');
  }
  if (signupBtn) {
    signupBtn.textContent = 'Logout';
    signupBtn.removeAttribute('data-open-role');
    signupBtn.onclick = () => { localStorage.removeItem('staysphere_session'); location.reload(); };
  }
}

/* ==================== 1. MINIMAL LOADER ==================== */
function initUniqueLoader() {
  const loader = document.getElementById('app-unique-loader');
  const quoteEl = document.getElementById('loader-dynamic-quote');
  const btnSkip = document.getElementById('btn-skip-loader');

  const indianTravelQuotes = [
    "Tracing actual road highways and mountain transit corridors...",
    "Defining visitable sequence and local spot waypoints...",
    "Loading verified accommodations with zero hidden fees...",
    "Preparing offline route mini-map and emergency contacts..."
  ];

  let quoteIdx = 0;
  const quoteInterval = setInterval(() => {
    quoteIdx = (quoteIdx + 1) % indianTravelQuotes.length;
    if (quoteEl) quoteEl.textContent = indianTravelQuotes[quoteIdx];
  }, 1200);

  const hideLoader = () => {
    clearInterval(quoteInterval);
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }
  };

  if (btnSkip) btnSkip.addEventListener('click', hideLoader);
  setTimeout(hideLoader, 1800);
}

/* ==================== 2. NAVIGATION TABS ==================== */
function initNavigationTabs() {
  const tabButtons = document.querySelectorAll('.nav-tab-item');
  const views = document.querySelectorAll('.app-view');

  const switchTab = (targetId) => {
    tabButtons.forEach(btn => {
      const match = btn.dataset.view === targetId;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    views.forEach(v => {
      v.classList.toggle('active', v.id === `view-${targetId}`);
    });

    window.location.hash = targetId;
    if (targetId === 'checkout') lockPlannerQuoteForCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetId === 'planner' && StaySphereState.mapInstance) {
      setTimeout(() => {
        StaySphereState.mapInstance.invalidateSize();
      }, 250);
    }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.view));
  });

  const initialHash = window.location.hash.replace('#', '');
  if (['home', 'explore', 'planner', 'checkout', 'pasttrips', 'business'].includes(initialHash)) {
    switchTab(initialHash);
  } else {
    switchTab('home');
  }

  document.querySelectorAll('[data-switch-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(el.dataset.switchTab);
    });
  });
}

/* ==================== 3. SINGLE LOGIN / SIGNUP ROLE MODAL ==================== */
function initRoleModal() {
  const modal = document.getElementById('role-chooser-modal');
  const modalTitle = document.getElementById('role-modal-title');
  const modalSub = document.getElementById('role-modal-subtitle');
  const travelerLink = document.getElementById('role-link-traveler');
  const hostLink = document.getElementById('role-link-host');
  const btnClose = document.getElementById('btn-close-role-modal');

  const openModal = (mode) => {
    if (!modal) return;
    const isSignup = mode === 'signup';
    modalTitle.textContent = isSignup ? 'Create your StaySphere Account' : 'Welcome to StaySphere';
    modalSub.textContent = isSignup
      ? 'Choose whether you are registering as a traveler or a host business'
      : 'Select your portal to sign in to your dashboard';

    travelerLink.href = isSignup ? 'user-auth.html#signup' : 'user-auth.html#signin';
    travelerLink.querySelector('h4').textContent = isSignup ? 'Traveler Sign Up' : 'Traveler Sign In';

    hostLink.href = isSignup ? 'business-auth.html#signup' : 'business-auth.html#signin';
    hostLink.querySelector('h4').textContent = isSignup ? 'Host & Business Registration' : 'Business Partner Portal';

    modal.classList.add('open');
  };

  const closeModal = () => {
    if (modal) modal.classList.remove('open');
  };

  document.querySelectorAll('[data-open-role]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(btn.dataset.openRole);
    });
  });

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/* ==================== 4A. ARRIVAL HUB COORDINATES ==================== */
function getArrivalHubCoords(destData, hubName) {
  if (!destData || !hubName) return null;
  if (destData.hubCoords && destData.hubCoords[hubName]) return destData.hubCoords[hubName];

  const known = {
    'Chandigarh Junction / IXC Airport': [30.7018, 76.8220],
    'Delhi IGI Airport / Kashmere Gate': [28.5562, 77.1000],
    'Bhuntar Airport (Kullu Valley)': [31.8763, 77.1541],
    'Jaipur Junction Railway Station': [26.9196, 75.7878],
    'Jaipur International Airport (JAI)': [26.8242, 75.8122],
    'Udaipur Maharana Pratap Airport (UDR)': [24.6177, 73.8961],
    'Jodhpur Junction': [26.2746, 73.0243],
    'Dabolim International Airport (GOI)': [15.3808, 73.8314],
    'Manohar International Airport Mopa (GOX)': [15.7447, 73.8606],
    'Madgaon Railway Station (MAO)': [15.2993, 74.1239],
    'Kochi International Airport (COK)': [10.1520, 76.3930],
    'Ernakulam Junction Railway Station': [9.9690, 76.2910],
    'Trivandrum Airport (TRV)': [8.4821, 76.9201],
    'Bagdogra International Airport (IXB)': [26.6812, 88.3286],
    'New Jalpaiguri Junction (NJP)': [26.6830, 88.3150],
    'Pakyong Airport (PYG)': [27.2300, 88.5870],
    'Dehradun Jolly Grant Airport (DED)': [30.1897, 78.1803],
    'Haridwar Junction Railway Station': [29.9457, 78.1642],
    'Rishikesh Railway Station': [30.1087, 78.2945],
    'Kushok Bakula Rimpochee Airport Leh (IXL)': [34.1359, 77.5465],
    'Srinagar International Airport (SXR)': [34.0023, 74.7599],
    'Manali Highway Transit Hub': [32.2396, 77.1887]
  };
  if (known[hubName]) return known[hubName];

  const legacyHub = (destData.allSpots || []).find(s => s.type === 'hub');
  return legacyHub ? legacyHub.coords : (destData.roadCorridor ? destData.roadCorridor[0] : null);
}

function getRouteStops() {
  const data = StaySphereState.destinationsData[StaySphereState.destination];
  if (!data) return [];
  const hub = getArrivalHubCoords(data, StaySphereState.currentArrivalHub);
  const stops = hub ? [{ id: 'arrival-hub', name: StaySphereState.currentArrivalHub, coords: hub, type: 'hub' }] : [];

  (data.allSpots || [])
    .filter(s => s.active && s.type !== 'hub')
    .forEach(s => stops.push({ id: s.id, name: s.name, coords: s.coords, type: s.type || 'stop' }));

  // Live restaurants, hotels, resorts and attractions selected by the user are appended
  // after the curated stops, so they become part of the same actual-road route.
  (StaySphereState.livePOIs || [])
    .filter(p => p.selected && Array.isArray(p.coords))
    .forEach(p => stops.push({ ...p, type: 'live-poi' }));

  (StaySphereState.customStops || [])
    .filter(s => s.selected !== false && Array.isArray(s.coords))
    .forEach(s => stops.push(s));

  return stops;
}

async function recalculateRoadRoute() {
  const map = StaySphereState.mapInstance;
  if (!map) return;
  const stops = getRouteStops().filter(s => Array.isArray(s.coords) && s.coords.length === 2);

  if (StaySphereState.liveRoutePolyline) {
    map.removeLayer(StaySphereState.liveRoutePolyline);
    StaySphereState.liveRoutePolyline = null;
  }
  StaySphereState.optimizedRouteStops = stops.slice();

  if (stops.length < 2) {
    updateRouteDurationImpact(0, stops.length);
    return;
  }

  const coordinates = stops.map(s => `${s.coords[1]},${s.coords[0]}`).join(';');
  // OSRM Trip optimizes the intermediate visit order while preserving the arrival hub as the source.
  const url = `https://router.project-osrm.org/trip/v1/driving/${coordinates}?source=first&destination=last&roundtrip=false&overview=full&geometries=geojson&steps=false`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`OSRM HTTP ${response.status}`);
    const payload = await response.json();
    if (payload.code !== 'Ok' || !payload.trips?.[0]?.geometry) throw new Error(payload.code || 'No optimized trip');

    const trip = payload.trips[0];
    const waypointOrder = (payload.waypoints || [])
      .map((wp, index) => ({ index, order: Number(wp.waypoint_index) }))
      .sort((a, b) => a.order - b.order)
      .map(x => stops[x.index]);
    if (waypointOrder.length === stops.length) StaySphereState.optimizedRouteStops = waypointOrder;

    StaySphereState.liveRoutePolyline = L.geoJSON(trip.geometry, {
      style: { color: '#0f766e', weight: 6, opacity: 0.92, lineCap: 'round', lineJoin: 'round' }
    }).addTo(map);

    const durationHours = Number(trip.duration || 0) / 3600;
    updateRouteDurationImpact(durationHours, stops.length);
    drawDualMapRoutes();
    drawLivePOIMarkers();

    const bounds = StaySphereState.liveRoutePolyline.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [30, 30], maxZoom: 12 });
  } catch (error) {
    console.warn('OSRM optimized trip unavailable:', error);
    // Keep every stop covered if the routing service is temporarily unavailable.
    StaySphereState.liveRoutePolyline = L.polyline(stops.map(s => s.coords), {
      color: '#0f766e', weight: 5, opacity: 0.65, dashArray: '10,8'
    }).addTo(map);
    updateRouteDurationImpact(0, stops.length, true);
  }
}

function updateRouteDurationImpact(durationHours = 0, stopCount = 0, fallback = false) {
  const el = document.getElementById('route-duration-impact');
  if (!el) return;
  if (fallback || !durationHours) {
    el.classList.remove('warning');
    el.textContent = `${stopCount} selected places • route recalculates when road data is available`;
    return;
  }
  const stopHours = Math.max(0, stopCount - 1) * 0.55;
  const totalJourneyHours = durationHours + stopHours;
  const estimatedDays = Math.max(1, Math.ceil(totalJourneyHours / 8));
  const plannedDays = Number(StaySphereState.tripDurationDays) || 4;
  const extraDays = Math.max(0, estimatedDays - plannedDays);
  el.classList.toggle('warning', extraDays > 0);
  el.textContent = extraDays > 0
    ? `Adding these places adds about ${extraDays} longer day${extraDays === 1 ? '' : 's'} • ${estimatedDays}-day route needed`
    : `${estimatedDays}-day route estimate • ${Math.max(0, plannedDays - estimatedDays)} day${plannedDays - estimatedDays === 1 ? '' : 's'} spare in your plan`;
}

window.clearUnselectedPlaces = function() {
  const data = StaySphereState.destinationsData[StaySphereState.destination];
  if (data) data.allSpots.forEach(s => { if (s.type !== 'hub') s.active = !!s.active; });
  StaySphereState.finalPathMode = true;
  const btn = document.getElementById('btn-show-final-path');
  if (btn) btn.textContent = 'Edit My Route';
  const status = document.getElementById('final-path-status');
  if (status) status.textContent = 'Showing only selected places and the optimized road path.';
  drawDualMapRoutes();
  drawLivePOIMarkers();
  recalculateRoadRoute();
};

/* ==================== 4. DYNAMIC DESTINATIONS & ARRIVAL HUBS ==================== */
function initDynamicDestinationAndHubs() {
  const destSelect = document.getElementById('select-destination-circuit');
  const hubSelect = document.getElementById('select-arrival-hub');
  const homeDestSelect = document.getElementById('quick-dest');
  const homeHubSelect = document.getElementById('quick-hub');

  const populateHubs = (destKey, targetSelect, selected = '') => {
    const data = StaySphereState.destinationsData[destKey];
    if (!data || !targetSelect) return;
    const hubs = data.hubs || Object.keys(data.hubCoords || {});
    targetSelect.innerHTML = hubs.map((hub, idx) => `<option value="${hub}" ${hub === selected || (!selected && idx === 0) ? 'selected' : ''}>${hub}</option>`).join('');
  };

  const setDestination = async (destKey) => {
    const data = StaySphereState.destinationsData[destKey];
    if (!data) return;
    StaySphereState.destination = destKey;
    StaySphereState.currentArrivalHub = (data.hubs || [])[0] || '';
    populateHubs(destKey, hubSelect, StaySphereState.currentArrivalHub);
    populateHubs(destKey, homeHubSelect, StaySphereState.currentArrivalHub);
    if (destSelect) destSelect.value = destKey;
    if (homeDestSelect) homeDestSelect.value = destKey;
    renderRouteChecklist();
    renderAccommodationOptions();
    if (StaySphereState.mapInstance) {
      StaySphereState.mapInstance.setView(data.center, data.zoom);
      drawDualMapRoutes();
      await loadLivePOIs();
      await recalculateRoadRoute();
    }
    updateTotalCalculations();
  };

  if (destSelect) destSelect.addEventListener('change', e => setDestination(e.target.value));
  if (homeDestSelect) homeDestSelect.addEventListener('change', e => setDestination(e.target.value));

  const hubChanged = async (e) => {
    StaySphereState.currentArrivalHub = e.target.value;
    if (hubSelect) hubSelect.value = e.target.value;
    if (homeHubSelect) homeHubSelect.value = e.target.value;
    const data = StaySphereState.destinationsData[StaySphereState.destination];
    const coords = getArrivalHubCoords(data, StaySphereState.currentArrivalHub);
    if (StaySphereState.mapInstance && coords) {
      StaySphereState.mapInstance.setView(coords, Math.max(data.zoom, 9));
      drawDualMapRoutes();
      await recalculateRoadRoute();
    }
    updateTotalCalculations();
  };

  if (hubSelect) hubSelect.addEventListener('change', hubChanged);
  if (homeHubSelect) homeHubSelect.addEventListener('change', hubChanged);

  document.querySelectorAll('[data-plan-destination]').forEach(btn => {
    btn.addEventListener('click', () => {
      setDestination(btn.dataset.planDestination);
      const plannerTab = document.querySelector('[data-view="planner"]');
      if (plannerTab) plannerTab.click();
    });
  });

  setDestination('manali');
}

/* ==================== 5. DEFINED DUAL-ROUTE MAP ENGINE ==================== */
function initLeafletScrollableMap() {
  const mapContainer = document.getElementById('staysphere-map');
  if (!mapContainer || typeof L === 'undefined') return;

  const data = StaySphereState.destinationsData[StaySphereState.destination];

  // Zoomable, scrollable map per Requirement 10
  const map = L.map('staysphere-map', {
    scrollWheelZoom: true,
    touchZoom: true,
    doubleClickZoom: true,
    dragging: true
  }).setView(data.center, data.zoom);

  // High quality OpenStreetMap tiles with topography & clear roads
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 5
  }).addTo(map);

  StaySphereState.mapInstance = map;
  drawDualMapRoutes();
  recalculateRoadRoute();
}

/**
 * Draws BOTH:
 * 1. Solid Line: Highway / Transit corridor along actual roads
 * 2. Dotted Line: Order of Visitable Places customized by the user
 */
function drawDualMapRoutes() {
  const map = StaySphereState.mapInstance;
  if (!map) return;

  // Clear previous markers & polylines
  StaySphereState.markersList.forEach(m => map.removeLayer(m));
  StaySphereState.markersList = [];

  if (StaySphereState.solidRoadPolyline) {
    map.removeLayer(StaySphereState.solidRoadPolyline);
    StaySphereState.solidRoadPolyline = null;
  }
  if (StaySphereState.dottedOrderPolyline) {
    map.removeLayer(StaySphereState.dottedOrderPolyline);
    StaySphereState.dottedOrderPolyline = null;
  }

  const destData = StaySphereState.destinationsData[StaySphereState.destination];
  if (!destData) return;

  // The actual road route is drawn by recalculateRoadRoute() from the selected hub
  // and active itinerary. The legacy roadCorridor is intentionally not used as the route.
  const selectedHubCoords = getArrivalHubCoords(destData, StaySphereState.currentArrivalHub);
  if (selectedHubCoords) {
    const hubMarker = L.marker(selectedHubCoords, { icon: L.divIcon({ className: 'staysphere-hub-marker', html: '<div style=\"width:30px;height:30px;border-radius:50%;background:#ea580c;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:12px;\">H</div>', iconSize:[30,30], iconAnchor:[15,15] }) }).addTo(map);
    hubMarker.bindPopup(`<strong>Arrival Hub</strong><br>${StaySphereState.currentArrivalHub}`);
    StaySphereState.markersList.push(hubMarker);
  }

  // 2. Draw Pins with Step Number Badges & optimized visit order.
  const optimized = StaySphereState.optimizedRouteStops?.length ? StaySphereState.optimizedRouteStops : getRouteStops();
  const orderMap = new Map(optimized.map((stop, idx) => [stop.id, idx]));
  const activeOrderPoints = optimized.filter(stop => stop.type !== 'hub').map(stop => stop.coords);

  destData.allSpots.forEach((spot) => {
    if (StaySphereState.finalPathMode && spot.type !== 'hub' && !spot.active) return;
    const isHub = spot.type === 'hub';
    const isStay = spot.type === 'stay';
    const color = isHub ? '#ea580c' : (isStay ? '#059669' : '#2563eb');
    const optimizedIndex = orderMap.get(spot.id);
    const badgeNumber = spot.active && Number.isFinite(optimizedIndex) ? optimizedIndex : '-';

    // Custom numbered HTML circular badge marker
    const markerHtml = `
      <div style="
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: ${spot.active ? color : '#94a3b8'};
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-body);
        font-size: 11px;
        font-weight: 800;
        border: 2px solid #ffffff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        ${badgeNumber}
      </div>
    `;

    const customDivIcon = L.divIcon({
      html: markerHtml,
      className: 'staysphere-numbered-marker',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });

    const marker = L.marker(spot.coords, { icon: customDivIcon }).addTo(map);

    // Deeply defined visitable details popup
    const popupHtml = `
      <div style="font-family:var(--font-body); min-width:230px; line-height:1.45;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:${color};">
            ${isHub ? 'Starting Hub' : (isStay ? 'Booked Stay' : `Stop #${badgeNumber}`)}
          </span>
          <span style="font-size:0.7rem; color:#64748b; font-weight:700;">${spot.altitude || ''}</span>
        </div>
        <h4 style="margin:0 0 4px; font-size:1rem; font-weight:800; color:#0f172a;">${spot.name}</h4>
        <p style="font-size:0.8rem; color:#475569; margin:0 0 6px;">${spot.desc}</p>
        
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:6px 8px; font-size:0.74rem; color:#334155; margin-bottom:8px;">
          <div style="margin-bottom:2px;"><strong>Timings:</strong> ${spot.timings || 'Open'}</div>
          <div style="margin-bottom:2px;"><strong>Entry Fee:</strong> ${spot.fee || 'Free'}</div>
          <div style="margin-bottom:2px;"><strong>Recommended Time:</strong> ${spot.duration || '1 Hour'}</div>
          <div><strong>Transit from previous:</strong> ${spot.distFromPrev || 'Direct'}</div>
        </div>

        <button type="button" onclick="toggleSpot('${spot.id}')" style="
          width: 100%;
          background: ${spot.active ? '#fee2e2' : '#ecfdf5'};
          color: ${spot.active ? '#991b1b' : '#065f46'};
          border: 1px solid ${spot.active ? '#fca5a5' : '#a7f3d0'};
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        ">
          ${spot.active ? 'Remove from Route Order' : '+ Include in Route Order'}
        </button>
      </div>
    `;

    marker.bindPopup(popupHtml);
    StaySphereState.markersList.push(marker);

  });

  // 3. Draw TYPE 2: The dotted line showing roadmap and order of places to visit
  if (activeOrderPoints.length > 1) {
    StaySphereState.dottedOrderPolyline = L.polyline(activeOrderPoints, {
      color: '#ea580c', // Distinctive saffron/amber dotted line
      weight: 3.5,
      dashArray: '6, 10', // Dotted line per requirement
      opacity: 0.95,
      lineCap: 'round'
    }).addTo(map);

    StaySphereState.dottedOrderPolyline.bindPopup(
      `<div style="font-family:var(--font-body); font-size:0.85rem; padding:4px;">
        <strong>Custom Visitable Sequence</strong><br>
        <span style="color:#ea580c; font-weight:700;">Chronological Visit Order</span><br>
        Connecting your ${activeOrderPoints.length} selected stops in order of journey.
      </div>`
    );
  }

  // Update Route Metrics Pill in the Legend
  const metricsEl = document.getElementById('map-metrics-pill');
  if (metricsEl) {
    const count = activeOrderPoints.length;
    metricsEl.textContent = `${count} Spots Selected • Solid: Road Network • Dotted: Visit Order`;
  }
}

/* ==================== 5B. LIVE PLACES: HOTELS, RESORTS, FOOD & VISIT SPOTS ==================== */
function initLivePOIControls() {
  renderPOIControls();
  setTimeout(loadLivePOIs, 700);
}

function renderPOIControls() {
  const mapContainer = document.getElementById('staysphere-map');
  if (!mapContainer || document.getElementById('live-poi-toolbar')) return;

  const toolbar = document.createElement('div');
  toolbar.id = 'live-poi-toolbar';
  toolbar.className = 'live-poi-toolbar';
  toolbar.innerHTML = `
    <div class="live-poi-toolbar-title">
      <strong>Explore nearby places</strong>
      <span id="live-poi-status">Loading hotels, resorts, restaurants & visit spots...</span>
    </div>
    <div class="live-poi-filters">
      <button type="button" data-poi-filter="all" class="active">Everything</button>
      <button type="button" data-poi-filter="food">Restaurants & Cafes</button>
      <button type="button" data-poi-filter="stay">Hotels & Resorts</button>
      <button type="button" data-poi-filter="attraction">Visit Spots</button>
      <button type="button" data-poi-filter="nature">Nature</button>
      <button type="button" id="btn-refresh-live-pois">Refresh Places</button>
    </div>
    <div id="selected-poi-list" class="selected-poi-list"></div>
  `;
  mapContainer.parentElement.insertBefore(toolbar, mapContainer);

  toolbar.querySelectorAll('[data-poi-filter]').forEach(btn => btn.addEventListener('click', () => {
    const key = btn.dataset.poiFilter;
    StaySphereState.poiFilters = {
      all: key === 'all',
      food: key === 'all' || key === 'food',
      stay: key === 'all' || key === 'stay',
      attraction: key === 'all' || key === 'attraction',
      nature: key === 'all' || key === 'nature'
    };
    toolbar.querySelectorAll('[data-poi-filter]').forEach(b => b.classList.toggle('active', b === btn));
    drawLivePOIMarkers();
  }));

  document.getElementById('btn-refresh-live-pois')?.addEventListener('click', loadLivePOIs);
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function normalizeLivePOI(element) {
  const tags = element.tags || {};
  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;
  if (!Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon)) || !tags.name) return null;

  let category = 'Attraction';
  if (['restaurant','cafe','fast_food','food_court'].includes(tags.amenity)) category = 'Restaurant / Food';
  else if (['hotel','resort','guest_house','hostel','motel','camp_site'].includes(tags.tourism)) category = 'Stay';
  else if (['waterfall','peak','beach','spring','hot_spring'].includes(tags.natural)) category = 'Nature';
  else if (['attraction','viewpoint','museum','gallery','theme_park'].includes(tags.tourism) || tags.leisure === 'water_park') category = 'Attraction';

  return {
    id: `osm-${element.type}-${element.id}`,
    name: tags.name,
    category,
    coords: [Number(lat), Number(lon)],
    desc: tags.description || tags.cuisine || tags.tourism || tags.amenity || tags.natural || 'Local point of interest',
    address: [tags['addr:housenumber'], tags['addr:street'], tags['addr:city']].filter(Boolean).join(' '),
    website: tags.website || '',
    phone: tags.phone || '',
    rating: tags.stars || '',
    selected: false
  };
}

async function loadLivePOIs() {
  const data = StaySphereState.destinationsData[StaySphereState.destination];
  if (!data) return;
  const status = document.getElementById('live-poi-status');
  if (status) status.textContent = 'Finding nearby hotels, resorts, restaurants & attractions...';

  const [lat, lon] = data.center;
  const radius = 30000;
  const query = `[out:json][timeout:25];(nwr["amenity"~"restaurant|cafe|fast_food|food_court"](around:${radius},${lat},${lon});nwr["tourism"~"hotel|resort|guest_house|hostel|motel|camp_site|attraction|viewpoint|museum"](around:${radius},${lat},${lon});nwr["natural"~"waterfall|peak|beach|spring|hot_spring"](around:${radius},${lat},${lon});nwr["leisure"="water_park"](around:${radius},${lat},${lon}););out center tags;`;

  const previousSelections = new Set((StaySphereState.livePOIs || []).filter(p => p.selected).map(p => p.id));
  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query });
    if (!response.ok) throw new Error(`Overpass HTTP ${response.status}`);
    const result = await response.json();
    StaySphereState.livePOIs = result.elements.map(normalizeLivePOI).filter(Boolean).map(p => ({ ...p, selected: previousSelections.has(p.id) }));
    if (status) status.textContent = `${StaySphereState.livePOIs.length} nearby places loaded. Click a pin to add it to your route.`;
    drawLivePOIMarkers();
    recalculateRoadRoute();
  } catch (error) {
    console.warn('Live POI service unavailable:', error);
    if (status) status.textContent = 'Live places could not be loaded right now. Your built-in spots remain available.';
    drawLivePOIMarkers();
  }
}

function filteredLivePOIs() {
  const f = StaySphereState.poiFilters;
  return (StaySphereState.livePOIs || []).filter(p => f.all ||
    (p.category === 'Restaurant / Food' && f.food) ||
    (p.category === 'Stay' && f.stay) ||
    (p.category === 'Attraction' && f.attraction) ||
    (p.category === 'Nature' && f.nature));
}

function getPOIColor(category) {
  if (category === 'Restaurant / Food') return '#ea580c';
  if (category === 'Stay') return '#7c3aed';
  if (category === 'Nature') return '#059669';
  return '#2563eb';
}

function drawLivePOIMarkers() {
  const map = StaySphereState.mapInstance;
  if (!map) return;
  StaySphereState.poiMarkers.forEach(m => map.removeLayer(m));
  StaySphereState.poiMarkers = [];

  const pois = StaySphereState.finalPathMode
    ? (StaySphereState.livePOIs || []).filter(p => p.selected)
    : filteredLivePOIs();

  pois.forEach(poi => {
    const color = getPOIColor(poi.category);
    const icon = L.divIcon({
      className: 'live-poi-marker',
      html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 7px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:900">${poi.selected ? '✓' : '•'}</div>`,
      iconSize: [28,28], iconAnchor: [14,14]
    });
    const marker = L.marker(poi.coords, { icon }).addTo(map);
    marker.bindPopup(`
      <div style="min-width:245px;font-family:var(--font-body)">
        <div style="font-size:.7rem;text-transform:uppercase;font-weight:800;color:${color};margin-bottom:4px">${escapeHTML(poi.category)}</div>
        <h4 style="margin:0 0 5px;font-size:1rem">${escapeHTML(poi.name)}</h4>
        <p style="margin:0 0 7px;font-size:.78rem;color:#475569">${escapeHTML(poi.desc)}</p>
        ${poi.address ? `<div style="font-size:.72rem;color:#64748b;margin-bottom:7px">${escapeHTML(poi.address)}</div>` : ''}
        ${poi.rating ? `<div style="font-size:.72rem;color:#475569;margin-bottom:7px"><strong>Rating:</strong> ${escapeHTML(poi.rating)}</div>` : ''}
        ${StaySphereState.finalPathMode ? '' : `<button type="button" onclick="toggleLivePOI('${poi.id}')" style="width:100%;padding:8px;border:0;border-radius:7px;background:${poi.selected ? '#b91c1c' : '#047857'};color:white;font-weight:800;cursor:pointer">${poi.selected ? 'Remove from route' : 'Add to my route'}</button>`}
      </div>`);
    StaySphereState.poiMarkers.push(marker);
  });
  renderSelectedPOIList();
}

function renderSelectedPOIList() {
  const el = document.getElementById('selected-poi-list');
  if (!el) return;
  const selected = (StaySphereState.livePOIs || []).filter(p => p.selected);
  el.innerHTML = selected.length
    ? `<strong>Added:</strong> ${selected.map(p => `<span class="selected-poi-chip">${escapeHTML(p.name)} <button type="button" onclick="toggleLivePOI('${p.id}')">×</button></span>`).join('')}`
    : '<span>No extra live places selected yet.</span>';
}

window.toggleLivePOI = function(poiId) {
  if (StaySphereState.finalPathMode) return;
  const poi = (StaySphereState.livePOIs || []).find(p => p.id === poiId);
  if (!poi) return;
  poi.selected = !poi.selected;
  drawLivePOIMarkers();
  renderRouteChecklist();
  drawDualMapRoutes();
  recalculateRoadRoute();
  updateTotalCalculations();
};

window.toggleFinalPath = function() {
  StaySphereState.finalPathMode = !StaySphereState.finalPathMode;
  const btn = document.getElementById('btn-show-final-path');
  if (btn) btn.textContent = StaySphereState.finalPathMode ? 'Edit My Route' : 'Show Final Path';
  const status = document.getElementById('final-path-status');
  if (status) status.textContent = StaySphereState.finalPathMode
    ? 'Final view: only your selected places and final road path are shown.'
    : 'Preview view: browse all available places and edit your route.';
  drawDualMapRoutes();
  drawLivePOIMarkers();
  recalculateRoadRoute();
};

window.toggleSpot = function(spotId) {
  const destData = StaySphereState.destinationsData[StaySphereState.destination];
  if (!destData) return;
  const spot = destData.allSpots.find(s => s.id === spotId);
  if (spot) {
    spot.active = !spot.active;
    renderRouteChecklist();
    drawDualMapRoutes();
    recalculateRoadRoute();
    updateTotalCalculations();
  }
};

window.moveSpotOrder = function(spotId, direction) {
  const destData = StaySphereState.destinationsData[StaySphereState.destination];
  if (!destData) return;
  const idx = destData.allSpots.findIndex(s => s.id === spotId);
  if (idx < 0) return;

  const targetIdx = idx + direction;
  if (targetIdx >= 0 && targetIdx < destData.allSpots.length) {
    const temp = destData.allSpots[idx];
    destData.allSpots[idx] = destData.allSpots[targetIdx];
    destData.allSpots[targetIdx] = temp;

    renderRouteChecklist();
    drawDualMapRoutes();
    recalculateRoadRoute();
    updateTotalCalculations();
  }
};

/* Add/remove real map places to the same itinerary used by OSRM. */
window.addCustomStopToRoute = function(stop) {
  if (!stop || !stop.id || !Array.isArray(stop.coords)) return;
  const existing = StaySphereState.customStops.find(s => s.id === stop.id);
  if (existing) existing.selected = true;
  else StaySphereState.customStops.push({ ...stop, selected: true });
  recalculateRoadRoute();
};
window.removeCustomStopFromRoute = function(stopId) {
  const stop = StaySphereState.customStops.find(s => s.id === stopId);
  if (stop) stop.selected = false;
  recalculateRoadRoute();
};

/* ==================== 6. CUSTOMIZABLE ROUTE CONTROLS ==================== */
function initCustomizableRouteControls() {
  const daysSelect = document.getElementById('select-trip-days');
  const travelersInput = document.getElementById('input-travelers-count');
  const adultsInput = document.getElementById('input-adults-count');
  const childrenInput = document.getElementById('input-children-count');
  const agencyCheckbox = document.getElementById('checkbox-agency-booking');

  if (daysSelect) {
    daysSelect.addEventListener('change', (e) => {
      StaySphereState.tripDurationDays = parseInt(e.target.value) || 4;
      updateTotalCalculations();
    });
  }

  if (travelersInput) {
    travelersInput.addEventListener('input', (e) => {
      const total = Math.max(1, parseInt(e.target.value) || 1);
      StaySphereState.travelersCount = total;
      const adults = Math.min(total, Math.max(1, StaySphereState.adultsCount || 1));
      StaySphereState.adultsCount = adults;
      StaySphereState.childrenCount = Math.max(0, total - adults);
      if (adultsInput) adultsInput.value = adults;
      if (childrenInput) childrenInput.value = StaySphereState.childrenCount;
      renderAccommodationOptions();
      updateTotalCalculations();
    });
  }
  const syncOccupancy = () => {
    const adults = Math.max(1, parseInt(adultsInput?.value) || 1);
    const children = Math.max(0, parseInt(childrenInput?.value) || 0);
    StaySphereState.adultsCount = adults;
    StaySphereState.childrenCount = children;
    StaySphereState.travelersCount = adults + children;
    if (travelersInput) travelersInput.value = StaySphereState.travelersCount;
    renderAccommodationOptions();
    updateTotalCalculations();
  };
  adultsInput?.addEventListener('input', syncOccupancy);
  childrenInput?.addEventListener('input', syncOccupancy);

  if (agencyCheckbox) {
    agencyCheckbox.addEventListener('change', (e) => {
      StaySphereState.agencyBooked = e.target.checked;
      updateTotalCalculations();
    });
  }

  document.querySelectorAll('input[data-service-key]').forEach(chk => {
    chk.addEventListener('change', () => {
      StaySphereState.selectedServices[chk.dataset.serviceKey] = chk.checked;
      updateTotalCalculations();
    });
  });
}

function renderRouteChecklist() {
  const container = document.getElementById('customizable-stops-container');
  if (!container) return;

  const destData = StaySphereState.destinationsData[StaySphereState.destination];
  if (!destData) return;

  let activeIdx = 1;

  container.innerHTML = destData.allSpots.map((spot, i) => {
    const badgeNum = spot.active ? activeIdx++ : '-';
    return `
      <div class="stop-checkbox-row ${spot.active ? 'active' : ''}">
        <span class="stop-step-badge">${badgeNum}</span>
        <input type="checkbox" data-stop-id="${spot.id}" ${spot.active ? 'checked' : ''} style="margin-top:0.25rem;">
        <div class="stop-info-text">
          <h4>${spot.name}</h4>
          <p>${spot.desc}</p>
          <div class="stop-meta-tag">
            ${spot.distFromPrev} &bull; ${spot.altitude || ''} &bull; ${spot.fee || ''}
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:2px; margin-left:auto;">
          <button type="button" onclick="moveSpotOrder('${spot.id}', -1)" title="Move up in visit order" style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; font-size:10px; cursor:pointer; padding:2px 5px;" ${i === 0 ? 'disabled' : ''}>▲</button>
          <button type="button" onclick="moveSpotOrder('${spot.id}', 1)" title="Move down in visit order" style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; font-size:10px; cursor:pointer; padding:2px 5px;" ${i === destData.allSpots.length - 1 ? 'disabled' : ''}>▼</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('input[data-stop-id]').forEach(input => {
    input.addEventListener('change', () => {
      const spotId = input.dataset.stopId;
      const spot = destData.allSpots.find(s => s.id === spotId);
      if (spot) {
        spot.active = input.checked;
        renderRouteChecklist();
        drawDualMapRoutes();
        recalculateRoadRoute();
        updateTotalCalculations();
      }
    });
  });
}

/* ==================== Added Feature: Accommodation Catalog ==================== */
function getAccommodationCatalog(data) {
  const name = data?.name || 'Destination';
  const first = name.split(',')[0];
  const baseOptions = [
    { id:'riverside-cedar', name:`${first} Riverside Cedar Retreat`, type:'Boutique homestay', price:5200, pricing:'perRoom', baseOccupancy:2, maxOccupancy:3, extraAdult:1200, childFee:600, unit:'room', meta:'₹5,200/room/night for 1–2 adults • max 3 guests • +₹1,200 extra adult' },
    { id:'heritage-stay', name:`${first} Heritage House`, type:'Heritage homestay', price:4200, pricing:'perRoom', baseOccupancy:2, maxOccupancy:3, extraAdult:900, childFee:500, unit:'room', meta:'₹4,200/room/night for 1–2 adults • max 3 guests • +₹900 extra adult' },
    { id:'mountain-resort', name:`${first} Mountain View Resort`, type:'Mountain resort', price:6800, pricing:'perRoom', baseOccupancy:2, maxOccupancy:3, extraAdult:1500, childFee:700, unit:'room', meta:'₹6,800/room/night for 1–2 adults • max 3 guests • +₹1,500 extra adult' },
    { id:'family-villa', name:`${first} Family Valley Villa`, type:'Private villa', price:11500, pricing:'perUnit', baseOccupancy:4, maxOccupancy:5, extraAdult:1800, childFee:800, unit:'villa', meta:'₹11,500/villa/night for up to 4 guests • max 5 • +₹1,800 extra adult' },
    { id:'eco-camp', name:`${first} Eco Camp`, type:'Eco stay', price:3500, pricing:'perUnit', baseOccupancy:2, maxOccupancy:2, extraAdult:0, childFee:500, unit:'tent', meta:'₹3,500/tent/night for up to 2 guests • max 2' }
  ];
  const partnerListings = JSON.parse(localStorage.getItem('staysphere_business_listings') || '[]').map((x,i)=>({
    id:`partner-${x.id || i}-${x.name}`,
    name:x.name,
    type:x.type||'Partner stay',
    price:Number(x.price)||4500,
    pricing:'perRoom',
    baseOccupancy:Number(x.baseOccupancy)||2,
    maxOccupancy:Number(x.maxOccupancy)||Number(x.capacity)||2,
    extraAdult:Number(x.extraAdult)||1000,
    childFee:Number(x.childFee)||500,
    unit:x.unit||'room',
    meta:`StaySphere partner • ${x.baseOccupancy||2} guests included • max ${x.maxOccupancy||x.capacity||2} • ${x.description||'Partner listing'}`
  }));
  return [...baseOptions, ...partnerListings];
}
function getSelectedAccommodation(data) {
  const options = getAccommodationCatalog(data);
  return options.find(a => a.id === StaySphereState.selectedAccommodationId) || options[0];
}
function calculateOccupancyBreakdown(accommodation) {
  const adults = Math.max(0, Number(StaySphereState.adultsCount) || 0);
  const children = Math.max(0, Number(StaySphereState.childrenCount) || 0);
  const totalGuests = adults + children;
  const maxOcc = Math.max(1, Number(accommodation.maxOccupancy) || Number(accommodation.baseOccupancy) || 2);
  const baseOcc = Math.max(1, Number(accommodation.baseOccupancy) || 2);
  const rooms = Math.max(1, Math.ceil(totalGuests / maxOcc));
  let remainingAdults = adults;
  let remainingChildren = children;
  let extraAdultCharges = 0;
  let childCharges = 0;
  for (let i=0;i<rooms;i++) {
    const adultsInRoom = Math.min(remainingAdults, baseOcc);
    remainingAdults -= adultsInRoom;
    const remainingCapacity = maxOcc - adultsInRoom;
    const childrenInRoom = Math.min(remainingChildren, Math.max(0, remainingCapacity));
    remainingChildren -= childrenInRoom;
    const extraAdults = Math.max(0, Math.min(remainingAdults + adultsInRoom, 0));
    void extraAdults;
  }
  // Base occupancy is adults-first. Any adults above base occupancy are charged as extras.
  const includedAdultCapacity = rooms * baseOcc;
  const extraAdults = Math.max(0, adults - includedAdultCapacity);
  const includedChildCapacity = Math.max(0, rooms * maxOcc - adults);
  const chargedChildren = Math.max(0, children - includedChildCapacity);
  extraAdultCharges = extraAdults * Number(accommodation.extraAdult || 0);
  childCharges = chargedChildren * Number(accommodation.childFee || 0);
  return { adults, children, totalGuests, rooms, extraAdults, chargedChildren, extraAdultCharges, childCharges };
}
function initAccommodationSelector() { renderAccommodationOptions(); }
function renderAccommodationOptions() {
  const el = document.getElementById('accommodation-options');
  const data = StaySphereState.destinationsData[StaySphereState.destination];
  if (!el || !data) return;
  const options = getAccommodationCatalog(data);
  if (!options.some(o => o.id === StaySphereState.selectedAccommodationId)) StaySphereState.selectedAccommodationId = options[0].id;
  const occ = calculateOccupancyBreakdown(options.find(o => o.id === StaySphereState.selectedAccommodationId) || options[0]);
  el.innerHTML = options.map(o => `
    <button type="button" class="accommodation-option ${o.id === StaySphereState.selectedAccommodationId ? 'selected' : ''}" data-accommodation-id="${o.id}">
      <div class="accommodation-option-head"><div><h4>${escapeHTML(o.name)}</h4><div class="stay-type">${escapeHTML(o.type)}</div></div><div class="accommodation-price">₹${o.price.toLocaleString('en-IN')}<small> /${o.unit}/night</small></div></div>
      <div class="accommodation-meta">${escapeHTML(o.meta)}</div>
    </button>`).join('');
  el.querySelectorAll('[data-accommodation-id]').forEach(btn => btn.addEventListener('click', () => {
    StaySphereState.selectedAccommodationId = btn.dataset.accommodationId;
    renderAccommodationOptions();
    updateTotalCalculations();
  }));
}

/* ==================== 7. DYNAMIC PRICING & SLASHED OFF-SEASON RATE ==================== */
function buildCurrentQuote() {
  const { destination, destinationsData, tripDurationDays, selectedServices, agencyBooked, flatPlatformFee, discountAmount } = StaySphereState;
  const data = destinationsData[destination];
  if (!data) return null;
  const nights = Math.max(1, tripDurationDays - 1);
  const accommodation = getSelectedAccommodation(data);
  const occ = calculateOccupancyBreakdown(accommodation);
  const roomTotal = accommodation.price * occ.rooms * nights;
  const occupancyExtras = (occ.extraAdultCharges + occ.childCharges) * nights;
  const travelers = occ.totalGuests;
  let mealsTotal = 0;
  if (selectedServices.breakfast) mealsTotal += 150 * travelers * nights;
  if (selectedServices.lunch) mealsTotal += 250 * travelers * nights;
  if (selectedServices.dinner) mealsTotal += 300 * travelers * nights;
  let choresTotal = 0;
  if (selectedServices.laundry) choresTotal += 120 * travelers;
  if (selectedServices.cleaning) choresTotal += 100 * nights * occ.rooms;
  if (selectedServices.guide) choresTotal += 450;
  const agencyFee = agencyBooked ? (1200 * travelers) : 0;
  const subtotal = roomTotal + occupancyExtras + mealsTotal + choresTotal + agencyFee + flatPlatformFee;
  const grandTotal = Math.max(0, subtotal - discountAmount);
  return { destination, accommodation, nights, occ, roomTotal, occupancyExtras, mealsTotal, choresTotal, agencyFee, flatPlatformFee, discountAmount, discountCode:StaySphereState.discountCode, grandTotal, travelers, days:tripDurationDays };
}
function updateTotalCalculations() {
  const quote = buildCurrentQuote();
  if (!quote) return;
  const { accommodation, nights, occ, roomTotal, occupancyExtras, mealsTotal, choresTotal, agencyFee, flatPlatformFee, discountAmount, grandTotal, travelers } = quote;
  const priceDisplayContainer = document.getElementById('planner-price-display');
  if (priceDisplayContainer) {
    priceDisplayContainer.innerHTML = `
      <div class="planner-rate-card">
        <div class="planner-rate-main"><span class="planner-rate-kicker">LIVE QUOTE • ${occ.rooms} ${occ.rooms === 1 ? 'ROOM' : 'ROOMS'}</span><strong>₹${grandTotal.toLocaleString('en-IN')}</strong><span>for ${travelers} guests • ${nights} night${nights===1?'':'s'}</span></div>
        <div class="planner-rate-side"><strong>${escapeHTML(accommodation.name)}</strong><span>₹${accommodation.price.toLocaleString('en-IN')} / ${accommodation.unit} / night</span><span>${occ.adults} adults${occ.children ? ` + ${occ.children} children` : ''} • max ${accommodation.maxOccupancy} per ${accommodation.unit}</span></div>
      </div>
    `;
  }
  const plannerTotalEl = document.getElementById('planner-grand-total');
  const plannerBreakupEl = document.getElementById('planner-breakup-text');
  if (plannerTotalEl) plannerTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  if (plannerBreakupEl) plannerBreakupEl.textContent = `${occ.adults} adults${occ.children ? ` + ${occ.children} children` : ''} • ${occ.rooms} ${occ.rooms === 1 ? 'room' : 'rooms'} × ${nights} nights • occupancy charges update instantly`;

  const occupancyEl = document.getElementById('occupancy-pricing-note');
  if (occupancyEl) occupancyEl.innerHTML = `<strong>${occ.rooms} ${occ.rooms === 1 ? 'room' : 'rooms'}</strong> required for ${travelers} guests. ${occ.extraAdults ? `Extra adults: ₹${occ.extraAdultCharges.toLocaleString('en-IN')}/night. ` : ''}${occ.chargedChildren ? `Child charges: ₹${occ.childCharges.toLocaleString('en-IN')}/night. ` : ''}This quote is recalculated in the planner whenever occupancy or selections change.`;

  const cartBody = document.getElementById('cart-bill-body');
  if (cartBody && !StaySphereState.lockedCartQuote) {
    cartBody.innerHTML = `
      <tr><td><strong>${escapeHTML(accommodation.name)}</strong> (${occ.rooms} ${accommodation.unit}${occ.rooms>1?'s':''} × ${nights} nights × ₹${accommodation.price.toLocaleString('en-IN')})</td><td style="text-align:right;font-weight:600;">₹${roomTotal.toLocaleString('en-IN')}</td></tr>
      ${occupancyExtras ? `<tr><td><strong>Occupancy adjustments</strong> (${occ.extraAdults} extra adult${occ.extraAdults!==1?'s':''}${occ.chargedChildren ? `, ${occ.chargedChildren} charged child${occ.chargedChildren!==1?'ren':''}`:''})</td><td style="text-align:right;font-weight:600;">₹${occupancyExtras.toLocaleString('en-IN')}</td></tr>`:''}
      <tr><td><strong>Opted Meals</strong> (${[selectedServices.breakfast&&'Breakfast',selectedServices.lunch&&'Lunch',selectedServices.dinner&&'Dinner'].filter(Boolean).join(', ')||'None'})</td><td style="text-align:right;font-weight:600;">₹${mealsTotal.toLocaleString('en-IN')}</td></tr>
      <tr><td><strong>Opted Services</strong> (${[selectedServices.laundry&&'Laundry',selectedServices.cleaning&&'Cleaning',selectedServices.guide&&'Heritage Guide'].filter(Boolean).join(', ')||'Self Managed'})</td><td style="text-align:right;font-weight:600;">₹${choresTotal.toLocaleString('en-IN')}</td></tr>
      ${agencyFee ? `<tr><td><strong>Verified Travel Agency Assistance</strong></td><td style="text-align:right;font-weight:600;">₹${agencyFee.toLocaleString('en-IN')}</td></tr>`:''}
      <tr><td><strong>Flat StaySphere Platform Fee</strong></td><td style="text-align:right;font-weight:600;">₹${flatPlatformFee.toLocaleString('en-IN')}</td></tr>
      ${discountAmount ? `<tr style="color:#059669;"><td><strong>Promotional Discount (${escapeHTML(StaySphereState.discountCode)})</strong></td><td style="text-align:right;font-weight:600;">-₹${discountAmount.toLocaleString('en-IN')}</td></tr>`:''}
      <tr class="total-row"><td><strong>Total Payable:</strong></td><td style="text-align:right;color:#059669;">₹${grandTotal.toLocaleString('en-IN')}</td></tr>`;
  }
  const friendsCount = Math.max(1, StaySphereState.friends.length);
  const perShare = Math.round(grandTotal / friendsCount);
  const splitPerPersonEl = document.getElementById('cart-split-share'); if (splitPerPersonEl) splitPerPersonEl.textContent = `₹${perShare.toLocaleString('en-IN')}`;
  const remainingDueEl = document.getElementById('cart-wallet-due'); if (remainingDueEl) remainingDueEl.textContent = `₹${Math.max(0, grandTotal-StaySphereState.groupWalletBalance).toLocaleString('en-IN')}`;
  return quote;
}

/* ==================== 8. OFFLINE CANVAS MINI MAP DOWNLOADER ==================== */
function initOfflineMapDownloader() {
  const btn = document.getElementById('btn-download-offline-map');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1500;
    const ctx = canvas.getContext('2d');

    const destData = StaySphereState.destinationsData[StaySphereState.destination];

    // Deep Midnight Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Forest Header
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, canvas.width, 220);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText('StaySphere - OFFLINE MINI MAP & GUIDE', 60, 85);

    ctx.font = '22px sans-serif';
    ctx.fillStyle = '#a7f3d0';
    ctx.fillText(`Arrival Hub: ${StaySphereState.currentArrivalHub} -> ${destData.name}`, 60, 135);

    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Dual Route Guide: Solid Line = Highway Road | Dotted Line = Visitable Sequence', 60, 175);

    // Stops card
    ctx.fillStyle = '#1e293b';
    ctx.roundRect(60, 260, 1080, 600, 16);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('Chronological Visitable Order & Road Trail', 90, 315);

    let y = 370;
    const activeSpots = destData.allSpots.filter(s => s.active);
    activeSpots.forEach((spot, i) => {
      ctx.fillStyle = spot.type === 'hub' ? '#ea580c' : (spot.type === 'stay' ? '#10b981' : '#38bdf8');
      ctx.beginPath();
      ctx.arc(110, y - 8, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`${i + 1}`, 106, y - 3);

      ctx.font = 'bold 22px sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(spot.name, 145, y - 3);

      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`${spot.distFromPrev} • ${spot.timings || ''} • ${spot.altitude || ''}`, 145, y + 24);

      y += 75;
    });

    // Emergency numbers card
    ctx.fillStyle = '#1e293b';
    ctx.roundRect(60, 890, 1080, 240, 16);
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Offline Emergency & Support Helplines', 90, 945);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '19px sans-serif';
    ctx.fillText('• Local Police / Emergency: 112', 90, 990);
    ctx.fillText('• Disaster Management Cell: 1077', 90, 1025);
    ctx.fillText('• StaySphere 24/7 Verified Support SOS: 1800-889-STAY', 90, 1060);
    ctx.fillText('• Nearest Sub-Divisional Civil Hospital: Open 24/7', 90, 1095);

    // Footer guarantee
    ctx.fillStyle = '#10b981';
    ctx.roundRect(60, 1160, 1080, 240, 16);
    ctx.fill();

    ctx.fillStyle = '#064e3b';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('StaySphere Zero-Hidden-Fee Guarantee', 90, 1215);

    ctx.fillStyle = '#065f46';
    ctx.font = '19px sans-serif';
    ctx.fillText('• Flat Rs 500 Platform fee confirmed at start of booking.', 90, 1260);
    ctx.fillText('• No surprise checkout chores or hidden fee deductions.', 90, 1295);
    ctx.fillText('• Show this digital card at check-in for instant host verification.', 90, 1330);

    const link = document.createElement('a');
    link.download = `StaySphere_Offline_Map_${StaySphereState.destination}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    alert('Offline Mini Map downloaded successfully! You can access all route coordinates and emergency numbers without internet.');
  });
}

function calculateCurrentGrandTotal() {
  return Number(StaySphereState.lockedCartQuote?.grandTotal || buildCurrentQuote()?.grandTotal || 0);
}
function buildCurrentBillRows() {
  const q = StaySphereState.lockedCartQuote || buildCurrentQuote();
  if (!q) return [];
  const rows = [[q.accommodation.name, q.roomTotal]];
  if (q.occupancyExtras) rows.push(['Occupancy adjustments', q.occupancyExtras]);
  if (q.mealsTotal) rows.push(['Selected meals', q.mealsTotal]);
  if (q.choresTotal) rows.push(['Selected services', q.choresTotal]);
  if (q.agencyFee) rows.push(['Verified Travel Agency Assistance', q.agencyFee]);
  rows.push(['StaySphere Platform Fee', q.flatPlatformFee]);
  if (q.discountAmount > 0) rows.push([`Promotional Discount (${q.discountCode})`, -q.discountAmount]);
  return rows;
}
function lockPlannerQuoteForCart() {
  if (StaySphereState.lockedCartQuote) { renderLockedCart(); return; }
  const q = buildCurrentQuote();
  if (!q) return;
  StaySphereState.lockedCartQuote = JSON.parse(JSON.stringify(q));
  renderLockedCart();
}
function renderLockedCart() {
  const q = StaySphereState.lockedCartQuote;
  if (!q) return;
  const cartBody = document.getElementById('cart-bill-body');
  if (cartBody) cartBody.innerHTML = buildCurrentBillRows().map(([label,amount])=>`<tr><td><strong>${escapeHTML(label)}</strong></td><td style="text-align:right;font-weight:600;">${amount<0?'-':''}₹${Math.abs(amount).toLocaleString('en-IN')}</td></tr>`).join('') + `<tr class="total-row"><td><strong>Locked Total Payable:</strong></td><td style="text-align:right;color:#059669;">₹${q.grandTotal.toLocaleString('en-IN')}</td></tr>`;
  const totalEl=document.getElementById('planner-grand-total'); if(totalEl) totalEl.textContent=`₹${q.grandTotal.toLocaleString('en-IN')}`;
  const splitEl=document.getElementById('cart-split-share'); if(splitEl) splitEl.textContent=`₹${Math.round(q.grandTotal/Math.max(1,StaySphereState.friends.length)).toLocaleString('en-IN')}`;
  const dueEl=document.getElementById('cart-wallet-due'); if(dueEl) dueEl.textContent=`₹${Math.max(0,q.grandTotal-StaySphereState.groupWalletBalance).toLocaleString('en-IN')}`;
  const lockEl=document.getElementById('cart-price-lock-note'); if(lockEl) lockEl.textContent=`Price locked at ₹${q.grandTotal.toLocaleString('en-IN')} when you entered Cart • ${q.occ.adults} adults${q.occ.children?` + ${q.occ.children} children`:''} • ${q.occ.rooms} ${q.occ.rooms===1?'room':'rooms'} • ${q.nights} nights`;
}

/* ==================== 9. CART & PAYMENT ==================== */
function initCartAndPayment() {
  const couponBtn = document.getElementById('btn-apply-coupon');
  const couponInput = document.getElementById('input-coupon-code');

  if (couponBtn && couponInput) {
    couponBtn.addEventListener('click', () => {
      if (StaySphereState.lockedCartQuote) { showToast('This cart price is locked. Change the trip in Planner before entering Cart again.','info'); return; }
      const code = couponInput.value.trim().toUpperCase();
      if (code === 'FIRSTSTAY') {
        StaySphereState.discountCode = 'FIRSTSTAY';
        StaySphereState.discountAmount = 400;
        alert('Discount applied: Rs 400 off on your first booking.');
      } else if (code === 'FIVE5') {
        StaySphereState.discountCode = 'FIVE5';
        StaySphereState.discountAmount = 650;
        alert('Milestone discount applied: Rs 650 off.');
      } else {
        alert('Invalid coupon. Try FIRSTSTAY for your first trip.');
      }
      updateTotalCalculations();
    });
  }

  const contributeBtn = document.getElementById('btn-contribute-wallet');
  if (contributeBtn) {
    contributeBtn.addEventListener('click', () => {
      const friendsCount = Math.max(1, StaySphereState.friends.length);
      const totalText = document.getElementById('planner-grand-total').textContent.replace(/[^\d]/g, '');
      const grandTotal = parseInt(totalText) || 2800;
      const share = Math.round(grandTotal / friendsCount);

      StaySphereState.groupWalletBalance += share;
      const balEl = document.getElementById('cart-wallet-bal');
      if (balEl) balEl.textContent = `₹${StaySphereState.groupWalletBalance.toLocaleString('en-IN')}`;

      updateTotalCalculations();
      alert(`Aarav added his share of Rs ${share.toLocaleString('en-IN')} to the In-App Group Wallet.`);
    });
  }

  const payBtn = document.getElementById('btn-confirm-test-payment');
  if (payBtn) {
    payBtn.addEventListener('click', () => {
      payBtn.disabled = true;
      payBtn.textContent = 'Processing Test Payment...';

      setTimeout(() => {
        payBtn.disabled = false;
        payBtn.textContent = 'Confirm & Pay (Test Mode)';

        const txnId = 'SS-IN-' + Math.floor(10000000 + Math.random() * 90000000);
        const bookedTrip = {
          id: txnId,
          destination: StaySphereState.destinationsData[StaySphereState.destination].name,
          hub: StaySphereState.currentArrivalHub,
          duration: `${StaySphereState.tripDurationDays} Days / ${StaySphereState.tripDurationDays - 1} Nights`,
          guests: StaySphereState.travelersCount,
          date: new Date().toLocaleDateString('en-IN'),
          photo: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
          rating: '5.0 / 5.0',
          bill: buildCurrentBillRows(),
          total: calculateCurrentGrandTotal(),
          payment: 'UPI',
          status: 'Paid'
        };

        const stored = JSON.parse(localStorage.getItem('staysphere_past_trips') || '[]');
        stored.unshift(bookedTrip);
        localStorage.setItem('staysphere_past_trips', JSON.stringify(stored));

        alert(`BOOKING SUCCESSFUL!\n\nTransaction ID: ${txnId}\nStatus: Confirmed (Test Mode)\n\nZero hidden fees applied. Details sent to your account.`);

        const pastTab = document.querySelector('[data-view="pasttrips"]');
        if (pastTab) pastTab.click();
      }, 1000);
    });
  }
}

/* ==================== 10. PAST TRIPS WITH DESTINATION IMAGES ==================== */
function initPastTripsAndReviews() {
  const container = document.getElementById('past-trips-container');
  if (!container) return;
  const defaultTrips = [
    {id:'SS-IN-88910245',destination:'Manali, Kullu & Kasol Valley',hub:'Chandigarh Railway Station',duration:'4 Days / 3 Nights',guests:2,date:'14 Feb 2026',photo:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',rating:'5.0 / 5.0',bill:[['Riverside Cedar Retreat',4200],['Breakfast & Dinner',2700],['Heritage Guided Walk',450],['StaySphere Platform Fee',500]],payment:'UPI',status:'Paid'},
    {id:'SS-IN-44219012',destination:'Jaipur & Udaipur Lake Palace, Rajasthan',hub:'Jaipur Junction',duration:'3 Days / 2 Nights',guests:4,date:'28 Dec 2025',photo:'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',rating:'4.9 / 5.0',bill:[['Heritage House',5600],['Breakfast',1200],['Local Guide',450],['StaySphere Platform Fee',500]],payment:'Card',status:'Paid'},
    {id:'SS-IN-19284711',destination:'Munnar & Alleppey Backwaters, Kerala',hub:'Kochi International Airport (COK)',duration:'5 Days / 4 Nights',guests:2,date:'10 Nov 2025',photo:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',rating:'5.0 / 5.0',bill:[['Mountain View Resort',8800],['Meals',2600],['Backwater Experience',1800],['StaySphere Platform Fee',500]],payment:'UPI',status:'Paid'}
  ];
  const localTrips = JSON.parse(localStorage.getItem('staysphere_past_trips') || '[]');
  const allTrips = [...localTrips, ...defaultTrips];
  container.innerHTML = allTrips.map((trip, idx) => {
    const bill = trip.bill || [['Trip total', Number(trip.total || 0) || 0]];
    const total = bill.reduce((sum, row) => sum + Number(row[1] || 0), 0);
    return `<article class="past-trip-destination-card">
      <img src="${trip.photo || defaultTrips[0].photo}" alt="${escapeHTML(trip.destination)}" class="past-trip-photo">
      <div class="past-trip-details"><span style="font-size:.75rem;font-weight:700;color:var(--primary-700);text-transform:uppercase;">Completed Trip • ${escapeHTML(trip.id)}</span><h3>${escapeHTML(trip.destination)}</h3><p class="past-trip-meta">Arrival Hub: ${escapeHTML(trip.hub || '')} • ${escapeHTML(trip.duration || '')} • ${trip.guests || 0} Travelers • Traveled on ${escapeHTML(trip.date || '')}</p><span class="past-trip-rating-tag">Rating: ${escapeHTML(trip.rating || '5.0 / 5.0')}</span></div>
      <details class="past-trip-receipt"><summary>Complete bill <strong>₹${total.toLocaleString('en-IN')}</strong></summary><div class="receipt-paper"><div class="receipt-head"><strong>StaySphere Receipt</strong><span>${escapeHTML(trip.id)}</span></div>${bill.map(row => `<div class="receipt-line"><span>${escapeHTML(row[0])}</span><strong>₹${Number(row[1]).toLocaleString('en-IN')}</strong></div>`).join('')}<div class="receipt-total"><span>Total paid</span><strong>₹${total.toLocaleString('en-IN')}</strong></div><div class="receipt-meta">Payment: ${escapeHTML(trip.payment || 'UPI')} • Status: ${escapeHTML(trip.status || 'Paid')}</div></div></details>
    </article>`;
  }).join('');
}

/* ==================== Added Feature: Friends, Chat & Polls ==================== */
function initGroupFeatures() {
  const directory = JSON.parse(localStorage.getItem('staysphere_account_directory') || '[]');
  StaySphereState.friendsDirectory = directory.length ? directory : [
    {name:'Aarav Mehta',email:'aarav@staysphere.demo'}, {name:'Priya Shah',email:'priya@staysphere.demo'}, {name:'Kabir Singh',email:'kabir@staysphere.demo'}, {name:'Ananya Rao',email:'ananya@staysphere.demo'}
  ];
  StaySphereState.friends = JSON.parse(localStorage.getItem('staysphere_friends') || JSON.stringify(StaySphereState.friends));
  StaySphereState.chatMessages = JSON.parse(localStorage.getItem('staysphere_chat') || '[]');
  StaySphereState.polls = JSON.parse(localStorage.getItem('staysphere_polls') || '[]');
  renderFriends(); renderChat(); renderPolls();
  const search = document.getElementById('friend-search');
  search?.addEventListener('input', renderFriendSearch);
  document.getElementById('btn-add-friend')?.addEventListener('click', addSelectedFriend);
  document.getElementById('chat-form')?.addEventListener('submit', e => { e.preventDefault(); const input=document.getElementById('chat-input'); const text=input?.value.trim(); if(!text)return; StaySphereState.chatMessages.push({name:'You',text,time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}); localStorage.setItem('staysphere_chat',JSON.stringify(StaySphereState.chatMessages)); input.value=''; renderChat(); });
  document.getElementById('poll-form')?.addEventListener('submit', e => { e.preventDefault(); const q=document.getElementById('poll-question').value.trim(); const opts=document.getElementById('poll-options').value.split(',').map(x=>x.trim()).filter(Boolean); if(!q||opts.length<2)return; StaySphereState.polls.unshift({id:Date.now(),question:q,options:opts.map(text=>({text,votes:0})),voted:false}); localStorage.setItem('staysphere_polls',JSON.stringify(StaySphereState.polls)); e.target.reset(); renderPolls(); });
}
function renderFriendSearch(){ const q=(document.getElementById('friend-search')?.value||'').toLowerCase(); const el=document.getElementById('friend-search-results'); if(!el)return; const matches=StaySphereState.friendsDirectory.filter(f=>`${f.name} ${f.email}`.toLowerCase().includes(q)&&!StaySphereState.friends.some(x=>x===f.name||x===f.email)).slice(0,5); el.innerHTML=q?matches.map(f=>`<div class="friend-result"><span><strong>${escapeHTML(f.name)}</strong><br><small>${escapeHTML(f.email)}</small></span><button class="btn-portal-secondary" data-add-email="${escapeHTML(f.email)}">Add</button></div>`).join(''):'<div style="font-size:.7rem;color:#94a3b8;padding:.25rem 0;">Search for a StaySphere account.</div>'; el.querySelectorAll('[data-add-email]').forEach(b=>b.addEventListener('click',()=>addFriendByEmail(b.dataset.addEmail))); }
function addSelectedFriend(){ const q=document.getElementById('friend-search')?.value.trim(); const f=StaySphereState.friendsDirectory.find(x=>x.email===q||x.name.toLowerCase()===q.toLowerCase()); if(f)addFriendByEmail(f.email); else renderFriendSearch(); }
function addFriendByEmail(email){ const f=StaySphereState.friendsDirectory.find(x=>x.email===email); if(!f)return; if(!StaySphereState.friends.includes(f.name)) StaySphereState.friends.push(f.name); localStorage.setItem('staysphere_friends',JSON.stringify(StaySphereState.friends)); renderFriends(); renderFriendSearch(); updateTotalCalculations(); showToast(`${f.name} added to your StaySphere group.`, 'success'); }
function renderFriends(){ const el=document.getElementById('friends-list'); if(!el)return; const list=StaySphereState.friends.filter(x=>!String(x).startsWith('You')).map(name=>`<div class="friend-card"><div class="friend-avatar">${escapeHTML(String(name).split(' ').map(x=>x[0]).join('').slice(0,2))}</div><div><strong>${escapeHTML(name)}</strong><span>StaySphere account • Group member</span></div></div>`).join(''); el.innerHTML=list||'<div style="font-size:.75rem;color:#94a3b8;padding:.5rem 0;">No friends added yet.</div>'; }
function renderChat(){ const el=document.getElementById('chat-messages'); if(!el)return; const messages=StaySphereState.chatMessages.length?StaySphereState.chatMessages:[{name:'Aarav',text:'Should we add the valley viewpoint?',time:'10:42 AM'},{name:'Priya',text:'Yes — I voted for it in the poll.',time:'10:44 AM'}]; el.innerHTML=messages.map(m=>`<div class="chat-message ${m.name==='You'?'mine':''}"><small>${escapeHTML(m.name)} • ${escapeHTML(m.time||'')}</small>${escapeHTML(m.text)}</div>`).join(''); el.scrollTop=el.scrollHeight; }
function renderPolls(){ const el=document.getElementById('polls-list'); if(!el)return; const polls=StaySphereState.polls.length?StaySphereState.polls:[{id:'demo',question:'Which spot should we add next?',options:[{text:'Valley viewpoint',votes:3},{text:'Local market',votes:2},{text:'Waterfall trail',votes:1}],voted:false}]; el.innerHTML=polls.map(p=>{const total=p.options.reduce((a,o)=>a+o.votes,0)||1; return `<div class="poll-card"><h4>${escapeHTML(p.question)}</h4>${p.options.map((o,i)=>`<button class="poll-option" data-poll-id="${p.id}" data-option="${i}"><div class="poll-fill" style="width:${Math.round(o.votes/total*100)}%"></div><span><b>${escapeHTML(o.text)}</b><em>${Math.round(o.votes/total*100)}%</em></span></button>`).join('')}<div class="poll-total">${total} vote${total===1?'':'s'}</div></div>`}).join(''); el.querySelectorAll('[data-poll-id]').forEach(b=>b.addEventListener('click',()=>votePoll(b.dataset.pollId,Number(b.dataset.option)))); }
function votePoll(id,index){ const p=StaySphereState.polls.find(x=>String(x.id)===String(id)); if(!p||p.voted)return; p.options[index].votes++; p.voted=true; localStorage.setItem('staysphere_polls',JSON.stringify(StaySphereState.polls)); renderPolls(); }

/* ==================== Added Feature: Share Links & Reciprocal Payment ==================== */
function makeSharePayload(){ const data=StaySphereState.destinationsData[StaySphereState.destination]; const total=calculateCurrentGrandTotal(); const share=Math.round(total/Math.max(1,StaySphereState.friends.length)); return {destination:data.name,hub:StaySphereState.currentArrivalHub,days:StaySphereState.tripDurationDays,travelers:StaySphereState.travelersCount,stops:getRouteStops().map(s=>s.name),accommodation:getSelectedAccommodation(data).name,total,share,createdAt:Date.now()}; }
function encodeShare(payload){ return btoa(unescape(encodeURIComponent(JSON.stringify(payload)))); }
function decodeShare(value){ try{return JSON.parse(decodeURIComponent(escape(atob(value))))}catch(_){return null} }
function createTourPaymentLink(){ const token=encodeShare(makeSharePayload()); const link=`${location.origin}${location.pathname}?staysphereShare=${encodeURIComponent(token)}`; const el=document.getElementById('payment-link-result'); if(el){el.hidden=false; el.innerHTML=`<strong>Share this tour payment link</strong><code>${escapeHTML(link)}</code><button class="btn-portal-secondary" style="margin-top:.45rem" onclick="navigator.clipboard?.writeText(${JSON.stringify(link)}).then(()=>showToast('Payment link copied.','success'))">Copy link</button>`;} return link; }
function showSharedTourFromLink(token){ const p=decodeShare(token); const el=document.getElementById('shared-tour-panel'); if(!p||!el)return; el.hidden=false; el.innerHTML=`<strong>Friend's StaySphere tour</strong><div style="margin-top:.45rem;line-height:1.55"><b>${escapeHTML(p.destination)}</b><br>${escapeHTML(p.days)} days • ${escapeHTML(p.travelers)} travelers • ${escapeHTML(p.accommodation)}<br><span style="color:#64748b">Stops: ${escapeHTML((p.stops||[]).join(' → '))}</span><br><strong>Your share: ₹${Number(p.share||0).toLocaleString('en-IN')}</strong></div><button class="btn-portal-primary" style="margin-top:.65rem" onclick="showToast('Your share payment is recorded in Test Mode.','success')">Pay ₹${Number(p.share||0).toLocaleString('en-IN')} (Test Mode)</button>`; }
function initPaymentShareFeatures(){ document.getElementById('btn-create-payment-link')?.addEventListener('click',createTourPaymentLink); document.getElementById('btn-pay-my-share')?.addEventListener('click',()=>{createTourPaymentLink(); showToast('Your share link is ready to send.','success');}); document.getElementById('btn-pay-group-share')?.addEventListener('click',()=>{const link=prompt('Paste your friend’s StaySphere payment link:'); if(!link)return; try{const token=new URL(link,location.href).searchParams.get('staysphereShare'); showSharedTourFromLink(token);}catch(_){showToast('That link could not be read.','error');}}); const token=new URLSearchParams(location.search).get('staysphereShare'); if(token){const checkoutTab=document.querySelector('[data-view="checkout"]'); checkoutTab?.click(); setTimeout(()=>showSharedTourFromLink(token),100);}}

/* ==================== 11. BUSINESS / HOST DASHBOARD ==================== */
function initBusinessDashboard() {
  const addForm = document.getElementById('form-add-business-property');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('prop-name').value;
      const price = document.getElementById('prop-price').value;
      alert(`Success: Listing "${name}" at Rs ${price}/night submitted to StaySphere admin verification.`);
      addForm.reset();
    });
  }
}
