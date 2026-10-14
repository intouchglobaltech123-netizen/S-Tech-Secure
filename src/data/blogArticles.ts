/** Blog articles, shared by the blog page and the home page "Latest from the blog" section. */

export interface Article {
  slug: string;
  category: string;
  filter: string;
  readTime: string;
  date: string;
  title: string;
  summary: string;
  image: string;
  badge: string;
  content: {
    intro: string;
    points: {
      title: string;
      desc: string;
    }[];
    verdict: string;
  };
}

export const ARTICLES: Article[] = [
  {
    slug: "how-many-cctv-cameras-for-home",
    category: "BUYING GUIDE",
    filter: "Buying Guide",
    readTime: "4 min read",
    date: "Sep 2026",
    title: "How Many CCTV Cameras Do You Need for a 3BHK Home?",
    summary:
      "A complete zone-by-zone placement strategy for independent houses and villas: covering main gates, car porches, front doors, and terrace staircases.",
    image: "/blog/home-cctv.jpg",
    badge: "RECOMMENDED SETUP",
    content: {
      intro:
        "When planning CCTV security for an independent 3BHK residence or villa in Tamil Nadu, the primary objective is comprehensive perimeter visibility without violating indoor privacy or overspending on redundant cameras.",
      points: [
        {
          title: "Zone 1 — Main Gate & Street Entrance",
          desc: "Mount an outdoor weatherproof bullet camera at 7–8 feet height pointing toward the street. Captures clear facial features and vehicle license plates before visitors step onto the property.",
        },
        {
          title: "Zone 2 — Car Porch & Driveway",
          desc: "Install a wide 2.8mm focal lens camera to achieve 105° corner-to-corner visibility over parked cars, two-wheelers, and exterior walkways.",
        },
        {
          title: "Zone 3 — Main Entrance Foyer",
          desc: "Mount a discreet dome camera directly above or beside the front entryway to monitor couriers, delivery agents, and callers up close at eye level.",
        },
        {
          title: "Zone 4 — Rear Backyard or Terrace Staircase",
          desc: "Terraces and rear doors are prime vulnerable approach paths. A dedicated night-vision camera ensures no dark blind spots remain.",
        },
      ],
      verdict:
        "A 4-channel Full HD or 4K system with a 1TB surveillance hard drive provides 100% perimeter protection for 3BHK homes with 15–20 days of continuous recording and zero monthly fees.",
    },
  },
  {
    slug: "hikvision-vs-dahua-vs-cp-plus",
    category: "HARDWARE BENCHMARK",
    filter: "Comparison",
    readTime: "5 min read",
    date: "Aug 2026",
    title: "Hikvision vs Dahua vs CP Plus — 2026 Brand Benchmark",
    summary:
      "An objective evaluation of true-color night vision (ColorVu), AI human/vehicle analytics, mobile app stability, and warranty support across Tamil Nadu.",
    image: "/blog/brand-benchmark.jpg",
    badge: "FIELD TESTED",
    content: {
      intro:
        "Hikvision, Dahua, and CP Plus account for over 80% of surveillance setups in India. Here is an objective, field-tested engineering evaluation of how they compare in real-world installations.",
      points: [
        {
          title: "Hikvision: The Market Benchmark",
          desc: "Industry-leading ColorVu technology that records vivid full-color video even in pitch-black midnight darkness. Highly stable mobile streaming app (Hik-Connect).",
        },
        {
          title: "Dahua: Leader in AI Analytics",
          desc: "Exceptional built-in AI that accurately classifies humans and motor vehicles while filtering out 95% of false alerts from rain, dogs, or shadows.",
        },
        {
          title: "CP Plus: Best for Value-Conscious Projects",
          desc: "Widely accessible with competitive entry-level pricing. Well-suited for basic rental properties and small retail counters on a budget.",
        },
        {
          title: "Local Warranty & Service Centers",
          desc: "All three vendors offer 2-year manufacturer warranties with authorized service facilities in Erode, Coimbatore, and Salem.",
        },
      ],
      verdict:
        "For villas and critical outdoor night vision, Hikvision remains our top recommendation. For commercial facilities requiring AI intrusion analytics, Dahua excels.",
    },
  },
  {
    slug: "smart-home-automation-india",
    category: "SMART LIVING",
    filter: "Smart Home",
    readTime: "4 min read",
    date: "Aug 2026",
    title: "Smart Home Automation: What's Truly Worth Your Money?",
    summary:
      "Modular retrofit touch switches, motorized sliding gate automation, and video door phone intercoms — what genuinely saves time versus what to skip.",
    image: "/blog/smart-automation.jpg",
    badge: "HIGH ROI TECH",
    content: {
      intro:
        "Smart home technology in India has transitioned from expensive showpieces into dependable, energy-saving everyday tools. Here is what is genuinely worth installing first.",
      points: [
        {
          title: "1. Modular Retrofit Touch Switches",
          desc: "Fit straight into standard electrical gang boxes with zero rewiring. Control geysers, ACs, and lights remotely or via automated schedules from your phone.",
        },
        {
          title: "2. Motorized Sliding Gate Automation",
          desc: "Open heavy entry gates automatically via phone or remote before pulling in. Highly convenient during heavy monsoon rain.",
        },
        {
          title: "3. Smart Video Door Phone Intercom",
          desc: "Screen delivery couriers and visitors at the gate from your smartphone, with 1-tap remote electric door unlocking.",
        },
        {
          title: "4. What to Skip First: Smart Appliances",
          desc: "Smart refrigerators and automated curtains are costly to maintain. Allocate your budget first to security, perimeter gates, and lighting.",
        },
      ],
      verdict:
        "Start with modular smart lighting and sliding gate automation — they provide 90% of everyday convenience at a fraction of full-villa remodeling costs.",
    },
  },
  {
    slug: "remote-viewing-cctv-on-phone",
    category: "HOW-TO GUIDE",
    filter: "How-To",
    readTime: "3 min read",
    date: "Jul 2026",
    title: "How to View Your CCTV Cameras on Mobile in 10 Minutes",
    summary:
      "Step-by-step instructions for streaming encrypted live video over 4G/5G to iPhone and Android devices using Hik-Connect and DMSS with zero cloud fees.",
    image: "/blog/mobile-viewing.jpg",
    badge: "10-MIN SETUP",
    content: {
      intro:
        "Modern CCTV recorders utilize secure peer-to-peer (P2P) encrypted cloud relays. You no longer need costly static IP addresses or complicated router port forwarding.",
      points: [
        {
          title: "Step 1: Connect Recorder to Router",
          desc: "Plug a standard Cat6 Ethernet cable from your home internet router into the LAN network port on the back of your DVR or NVR unit.",
        },
        {
          title: "Step 2: Install Official Vendor App",
          desc: "Download Hik-Connect (for Hikvision) or DMSS (for Dahua) from the iOS App Store or Google Play Store and create a free user account.",
        },
        {
          title: "Step 3: Scan P2P Cloud QR Code",
          desc: "Open DVR Menu > Platform Access. In your phone app, tap '+' and scan the on-screen QR code to pair your device instantly.",
        },
        {
          title: "Step 4: Enable Real-Time Push Alerts",
          desc: "Turn on motion alerts so your smartphone chimes immediately whenever movement occurs during scheduled off-hours.",
        },
      ],
      verdict:
        "Once paired, multiple family members can view simultaneous live feeds and playback from anywhere in the world with zero monthly subscription fees.",
    },
  },
  {
    slug: "cctv-maintenance-annual-checklist",
    category: "PREVENTIVE HEALTH",
    filter: "Maintenance",
    readTime: "3 min read",
    date: "Jul 2026",
    title: "Annual CCTV Maintenance Checklist for Maximum Uptime",
    summary:
      "Hard drive health audits, optical lens cleaning, 12V SMPS power testing, and weatherproof junction box checks to prevent unexpected recording loss.",
    image: "/blog/cctv-maintenance.jpg",
    badge: "MAX UPTIME",
    content: {
      intro:
        "Surveillance hardware operates 24/7 through extreme heat, rain, and dust. Following this systematic inspection schedule prevents sudden footage loss when you need evidence most.",
      points: [
        {
          title: "1. Hard Drive Health & Loop Overwrite",
          desc: "Confirm that storage status reads 'Normal' and recordings are overwriting continuously without skipping calendar dates or corrupting files.",
        },
        {
          title: "2. Optical Lens & Night IR Glass Cleaning",
          desc: "Wipe camera lenses with a microfiber cloth. Clear dust and cobwebs so nighttime infrared LEDs do not cause glare on the video feed.",
        },
        {
          title: "3. 12V SMPS Power Supply Testing",
          desc: "Test voltage output on power adapters. Aging adapters cause cameras to reboot or go offline when nighttime IR lights activate.",
        },
        {
          title: "4. Weatherproof Junction Box Inspection",
          desc: "Inspect outdoor BNC and RJ45 cable junction boxes. Ensure rubber seals remain watertight before monsoon rains begin.",
        },
      ],
      verdict:
        "Conducting this simple audit every 6 months or enrolling in an Annual Maintenance Contract (AMC) protects your investment and ensures system longevity beyond 7 years.",
    },
  },
  {
    slug: "burglar-alarm-vs-cctv",
    category: "SECURITY ARCHITECTURE",
    filter: "Buying Guide",
    readTime: "4 min read",
    date: "Jun 2026",
    title: "Burglar Alarm vs CCTV Cameras: Why You Truly Need Both",
    summary:
      "CCTV records post-incident evidence while burglar alarms provide active 110dB deterrence. Why combining both creates an impenetrable hybrid defense.",
    image: "/blog/burglar-alarm.jpg",
    badge: "HYBRID DEFENSE",
    content: {
      intro:
        "Many property owners mistakenly assume CCTV cameras alone provide complete home security. While cameras record valuable evidence, they cannot physically deter an active intruder in real-time.",
      points: [
        {
          title: "CCTV Cameras: Passive Surveillance",
          desc: "Cameras record video evidence for playback and investigation. Unless someone monitors screens 24/7, an intruder can breach a property in minutes.",
        },
        {
          title: "Burglar Alarms: Active Deterrence",
          desc: "Magnetic door sensors detect unauthorized opening instantly. A 110dB outdoor siren immediately panics intruders and alerts neighbors.",
        },
        {
          title: "Automated GSM Emergency Dialing",
          desc: "When triggered, the central control panel automatically dials up to 5 family phone numbers simultaneously via GSM SIM card.",
        },
        {
          title: "The Recommended Hybrid Setup",
          desc: "Combine exterior cameras for 360° perimeter tracking with indoor door magnetic sensors for active break-in deterrence.",
        },
      ],
      verdict:
        "Pairing exterior cameras with interior magnetic alarm sensors creates a comprehensive security shield that active criminals cannot easily bypass.",
    },
  },
];
