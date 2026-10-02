# StaySphere — India's Arrival-Hub Trip Planning Platform

StaySphere is an India-centric, zero-hidden-charge trip planning and boutique stay platform. It plans complete solo and group itineraries starting directly from major Indian arrival transit hubs (e.g., Chandigarh Railway Station / Airport &rarr; Manali &rarr; Kullu &rarr; Kasol).

---

## 🇮🇳 Project Architecture & Key Requirements Fulfilled

1. **Indian Currency (₹ INR)**: Standardized across all accommodations, meals, chores, and platform fees.
2. **Official Mountain Icon & Updated Sunset Background**:
   - Uses the official mountain illustration (`assets/icon-mountain.webp`) as the brand icon.
   - Hero and auth backgrounds feature the updated sunset mountain-lake reflection landscape (`assets/bg-landscape.jpg` & `assets/bg-landscape.webp`).
3. **Gothic A1 Typography with Stylish 'S'**: Features `<span class="brand-title"><span class="brand-s">S</span>taySphere</span>` in Google Font **Gothic A1** with an oversized decorative italic 'S'. Zero emojis across the UI for an airy, refined feel.
4. **Moving Video-Like Background with Dynamic IST Shader**:
   - The landscape background slowly pans with a smooth cinematic animation.
   - Dynamically shifts color shades in real-time according to Indian Standard Time (IST, UTC+5:30):
     - **Dawn / Morning (05:00 - 11:59)**: Golden sunrise saffron & amber hues.
     - **Afternoon (12:00 - 16:59)**: Daylight azure & mountain stream emerald.
     - **Sunset / Twilight (17:00 - 19:59)**: Saffron, dusty purple & twilight dusk.
     - **Night (20:00 - 04:59)**: Midnight deep indigo & star silver.
   - Includes an interactive manual daypart preview switcher on both login pages for instant testing!
5. **Reduced & Punchy Auth Copy**: Crisp descriptions focused on zero hidden charges and seamless arrival-hub route planning. Single Signup/Login link with modal role chooser.
6. **Unique Bharat Travel Loader**: Custom compass ring, pulsing mountain silhouette, and rotating Indian travel quotes.
7. **Arrival Hub Trip Planner & Dual Route Mapping**:
   - Pick arrival hubs dynamically matched to each destination (Chandigarh Junction / Airport, Delhi IGI, Bhuntar Airport, etc.).
   - **Dual-Route System**:
     - **Solid Emerald Line**: Follows the actual national highway road network and transit corridors.
     - **Dotted Saffron Line**: Dynamically connects user-selected visitable spots in chronological visit order (1 &rarr; 2 &rarr; 3...).
   - Numbered step badges on map pins and sidebar list with one-click ordering controls (&blacktriangle; / &blacktriangledown;) and inclusion toggles.
   - Multi-day tour guides (3, 4, 5, 7 days).
   - Side panel featuring recent Community Recommendations alongside the map.
8. **Off-Season Price Drops**:
   - Highlights discounted seasonal rates 5 sizes bigger (`2.25rem`), with the higher regular rate struck through at low opacity directly beneath it.
9. **Offline Mini Map Download**:
   - Renders a complete high-res route map card onto HTML5 Canvas with waypoints, distances, booked stay info, and official emergency numbers (Himachal Police: 112, Disaster: 1077, StaySphere 24/7 SOS).
   - Generates and downloads `StaySphere_Offline_Map_Manali.png` directly to device storage.
10. **Zero Hidden Charges & Transparent Bifurcated Bill**:
    - Flat ₹500 platform fee declared right at the start.
    - Chores & meal options have clear price tags placed directly beside each checkbox:
      - Homecooked Breakfast: +₹150 /person/day
      - Traditional Lunch: +₹250 /person/day
      - Orchard Dinner: +₹300 /person/day
      - Laundry Service: +₹120 /load
      - Daily Room Cleaning: +₹100 /night
      - Local Guided Walk: +₹450 flat
    - Eliminates cart abandonment by ensuring the checkout total matches the upfront quote exactly.
11. **Dynamic Pricing Formula**:
    - `Base (₹300) × Travelers × Nights × Season Multiplier (0.85x - 1.35x) + Opted Services + ₹500 Flat Fee - Discounts`.
12. **Group Collaboration, Live Polls & In-App Group Wallet**:
    - Add friends to trip.
    - Live polls for spot selection (e.g. "Kasol Parvati River Hike vs Manikaran Hot Springs").
    - Real-time in-trip group chat.
    - Equal group split calculator with in-app wallet balance tracking.
13. **Test Mode Payment Gateway**:
    - Realistic Indian payment modal with Mock UPI QR code (GPay, PhonePe, Paytm), NetBanking, and Cards.
    - Instant booking confirmation and transaction ID generation.
14. **Verified Travel Agency Direct Booking**:
    - 1-click option to bundle a private SUV and verified local coordinator.
15. **Business Portal (Hotels, Resorts & Agencies)**:
    - Business login & registration.
    - Flat 10% platform commission calculation per booked guest.
    - Property / tour package submission form with photo, hub, and pricing.
16. **Past Trips & Community Recommendations**:
    - Log of completed trips with post-trip rating prompt and real destination photos.
    - Community travel tips feed where travelers can publish recommendations.
17. **Explore Circuits**:
    - Dedicated cards for Rajasthan, Manali, Goa, Kerala, Sikkim, Uttarakhand, and Ladakh with arrival hubs and 1-click planner launch.

---

## 🚀 How to Run & Preview

Open the files directly in any web browser:
- **Platform Hub**: `c:\Users\silve\Downloads\StaySphere AG\index.html`
- **Traveler Auth**: `c:\Users\silve\Downloads\StaySphere AG\user-auth.html`
- **Business Auth**: `c:\Users\silve\Downloads\StaySphere AG\business-auth.html`

Or run a local server:
```powershell
npx.cmd serve .
# or
python -m http.server 3000
```
Navigate to `http://localhost:3000`.
