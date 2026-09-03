import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import {
  Clock,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { COMPANY_CONTACT } from "@/data/servicesData";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const blogTitle = "Security & Smart Automation Guides & Blog | STEC Secure";
const blogDescription =
  "Expert security guides, CCTV camera buying advice, IoT smart automation tips, and maintenance blueprints from STEC Secure engineers in Erode, Tamil Nadu.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: blogTitle },
      { name: "description", content: blogDescription },
      { property: "og:title", content: blogTitle },
      { property: "og:description", content: blogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stec-secure.vercel.app/blog" },
      { property: "og:image", content: "https://stec-secure.vercel.app/blog/home-cctv.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: blogTitle },
      { name: "twitter:description", content: blogDescription },
      { name: "twitter:image", content: "https://stec-secure.vercel.app/blog/home-cctv.jpg" },
      {
        name: "keywords",
        content:
          "CCTV camera blog, home security guide, Hikvision vs Dahua vs CP Plus, CCTV mobile viewing guide, CCTV maintenance checklist, burglar alarm vs CCTV",
      },
    ],
    links: [{ rel: "canonical", href: "https://stec-secure.vercel.app/blog" }],
  }),
  component: BlogPage,
});

interface Article {
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

const ARTICLES: Article[] = [
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

const FILTER_TABS = ["All", "Buying Guide", "Comparison", "Smart Home", "How-To", "Maintenance"];

function BlogPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Close full article on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedArticle(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredArticles = ARTICLES.filter(
    (a) => activeTab === "All" || a.filter === activeTab
  );

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#111827] select-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <SiteNav revealed={true} />

      <main className="relative pt-24 min-h-screen">
        <CyberMeshBackground />

        <div className="relative z-10 pt-[30px] pb-[80px] px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">

            {/* ══════════════════════════════════════════════════════════ */}
            {/* VIEW A: FULL PAGE DEDICATED ARTICLE READER                */}
            {/* ══════════════════════════════════════════════════════════ */}
            {selectedArticle ? (
              <div className="max-w-6xl mx-auto space-y-10">
                
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between border-b border-neutral-200/80 pb-5">
                  <button
                    type="button"
                    onClick={closeArticle}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-neutral-200 text-xs font-bold text-neutral-700 hover:border-[#FF7A00] hover:text-[#FF7A00] transition-colors shadow-sm cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to All Guides</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-[#FFF7ED] text-[#FF7A00] border border-[#FFEDD5] uppercase">
                      {selectedArticle.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedArticle.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Article Header */}
                <div className="space-y-4 border-b border-neutral-200/80 pb-6">
                  <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedArticle.date}</span>
                    <span>·</span>
                    <span>S TEC Engineering Advisory Desk</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-[1.12]">
                    {selectedArticle.title}
                  </h1>
                </div>

                {/* 2-Column Split: Text on Left (7 cols), Image on Right (5 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  
                  {/* Left Column (7 cols): Content & Recommendations */}
                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                      {selectedArticle.content.intro}
                    </p>

                    {/* Key Recommendations Breakdown */}
                    <div className="space-y-4 pt-2">
                      <div className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
                        Key Recommendations &amp; Scope:
                      </div>

                      <div className="space-y-3">
                        {selectedArticle.content.points.map((pt, i) => (
                          <div
                            key={i}
                            className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-1.5 hover:border-[#FF7A00]/50 transition-colors"
                          >
                            <h3 className="text-sm sm:text-base font-extrabold text-[#111827] flex items-center gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                              <span>{pt.title}</span>
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-6.5 font-normal">
                              {pt.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Engineer's Final Verdict */}
                    <div className="p-6 rounded-3xl bg-[#FFF7ED] border-2 border-[#FFEDD5] space-y-2">
                      <div className="text-xs font-mono font-bold tracking-widest text-[#FF7A00] uppercase">
                        ENGINEER&rsquo;S VERDICT
                      </div>
                      <p className="text-xs sm:text-sm text-[#9A3412] font-semibold leading-relaxed">
                        {selectedArticle.content.verdict}
                      </p>
                    </div>
                  </div>

                  {/* Right Column (5 cols): High-Resolution Featured Image */}
                  <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 shadow-md border border-neutral-200/90 group">
                      <img
                        src={selectedArticle.image}
                        alt={selectedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                          {selectedArticle.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-500 flex items-center justify-between font-mono">
                      <span>Field Tested in Tamil Nadu</span>
                      <span className="text-[#FF7A00] font-bold">100% Genuine</span>
                    </div>
                  </div>

                </div>



              </div>
            ) : (
              /* ══════════════════════════════════════════════════════════ */
              /* VIEW B: MAIN BLOG CATALOG (Clean 6-Card Visual Grid)       */
              /* ══════════════════════════════════════════════════════════ */
              <div className="space-y-10">
                {/* ─── 1. Header ─────────────────────────────────────────── */}
                <div className="border-b border-neutral-200/90 pb-8">
                  <div className="inline-flex items-center gap-2 mb-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]" />
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#FF7A00] uppercase">
                      OUR LATEST ARTICLES
                    </span>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                      <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight leading-[1.08]">
                        Security &amp; Automation <span className="text-[#FF7A00]">Journal</span>
                      </h1>
                      <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-normal leading-relaxed">
                        Practical surveillance blueprints, objective hardware benchmarks, and maintenance guides curated by S TEC SECURE specialists.
                      </p>
                    </div>

                    {/* Filter Pills (Single Line) */}
                    <div className="flex items-center gap-2 overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-none py-1">
                      {FILTER_TABS.map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTab(tab)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                            activeTab === tab
                              ? "bg-[#FF7A00] text-white shadow-sm"
                              : "bg-white text-neutral-600 border border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ─── 2. CLEAN VISUAL GRID (6 Large Premium 16:9 Magazine Cards) ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <article
                      key={article.slug}
                      onClick={() => openArticle(article)}
                      className="group rounded-3xl bg-white border border-neutral-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_45px_rgba(255,122,0,0.12)] hover:border-[#FF7A00] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                      <div>
                        {/* 16:10 Ratio High-Resolution Visual */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Top Overlay Badges */}
                          <div className="absolute top-4 left-4">
                            <span className="text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#FF7A00] border border-neutral-200 shadow-sm uppercase">
                              {article.category}
                            </span>
                          </div>

                          <div className="absolute top-4 right-4">
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-7 sm:p-8">
                          <div className="text-xs font-mono text-neutral-400 mb-2 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{article.date}</span>
                          </div>

                          <h3 className="text-xl font-black text-[#111827] group-hover:text-[#FF7A00] transition-colors leading-snug mb-3 tracking-tight">
                            {article.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal line-clamp-3">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer Action */}
                      <div className="px-7 sm:px-8 pb-7 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#FF7A00] uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          <span>Read Full Article</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                        <span className="text-[11px] font-mono font-medium text-neutral-400 group-hover:text-neutral-600">
                          S TEC Advisory
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {/* ─── 3. Clean Bottom Consultation Banner ───────────────── */}
                <div className="rounded-3xl bg-white border border-neutral-200/90 shadow-sm p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-1.5 text-center md:text-left max-w-xl">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF7A00] uppercase block">
                      FREE ON-SITE EVALUATION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                      Need Personalized Security Advice for Your Property?
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      Our certified engineers provide property walk-throughs, camera blind spot mapping, and free quotes across Tamil Nadu.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=Hi%20S-Tec%20Secure%2C%20I%20have%20a%20question%20regarding%20security%20camera%20planning.`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Talk to an Engineer</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
