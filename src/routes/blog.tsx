import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CyberMeshBackground } from "@/components/background/CyberMeshBackground";
import { COMPANY_CONTACT } from "@/data/servicesData";
import { ARTICLES, type Article } from "@/data/blogArticles";
import {
  stecLocalBusinessJsonLd,
  createBreadcrumbJsonLd,
  STEC_SITE_URL,
} from "@/lib/structured-data";

const blogTitle = "Security & Smart Automation Technical Guides & Blog | S Tec Secure";
const blogDescription =
  "Expert security guides, CCTV camera buying advice, IoT smart automation tips, and maintenance blueprints from S Tec Secure engineers in Salem, Erode & Tamil Nadu.";

export const Route = createFileRoute("/blog")({
  // ?article=<slug> opens that article, so other pages (and Google) can link straight to it
  validateSearch: (search: Record<string, unknown>): { article?: string } => ({
    article: typeof search.article === "string" ? search.article : undefined,
  }),
  head: () => ({
    meta: [
      { title: blogTitle },
      { name: "description", content: blogDescription },
      {
        name: "keywords",
        content:
          "CCTV camera blog, home security guide Salem, Hikvision vs Dahua vs CP Plus, CCTV mobile viewing guide, CCTV maintenance checklist Erode, burglar alarm vs CCTV Tamil Nadu",
      },
      { name: "author", content: "S Tec Secure" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: blogTitle },
      { property: "og:description", content: blogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${STEC_SITE_URL}/blog` },
      { property: "og:image", content: `${STEC_SITE_URL}/blog/home-cctv.jpg` },
      { property: "og:site_name", content: "S Tec Secure" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: blogTitle },
      { name: "twitter:description", content: blogDescription },
      { name: "twitter:image", content: `${STEC_SITE_URL}/blog/home-cctv.jpg` },
    ],
    links: [{ rel: "canonical", href: `${STEC_SITE_URL}/blog` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(stecLocalBusinessJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          createBreadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Security Knowledge Base", url: "/blog" },
          ])
        ),
      },
    ],
  }),
  component: BlogPage,
});


const FILTER_TABS = ["All", "Buying Guide", "Comparison", "Smart Home", "How-To", "Maintenance"];

const WHATSAPP_ADVICE_URL = `https://wa.me/${COMPANY_CONTACT.phoneRaw}?text=Hi%20S-Tec%20Secure%2C%20I%20have%20a%20question%20regarding%20security%20camera%20planning.`;

/** "BUYING GUIDE" → "Buying Guide" */
function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
    .replace(/^./, (c) => c.toUpperCase());
}

/** "1. Modular Retrofit Touch Switches" → "Modular Retrofit Touch Switches" */
function cleanPointTitle(title: string) {
  return title.replace(/^\d+\.\s*/, "");
}

function Meta({ article, className = "" }: { article: Article; className?: string }) {
  return (
    <p className={`text-xs text-neutral-500 ${className}`}>
      <span className="font-semibold text-[#FF7A00]">{titleCase(article.category)}</span>
      <span className="mx-2 text-neutral-300">/</span>
      {article.date}
      <span className="mx-2 text-neutral-300">/</span>
      {article.readTime}
    </p>
  );
}


function ArticleCard({ article, onOpen }: { article: Article; onOpen: (a: Article) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(article)}
      className="group text-left rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 overflow-hidden flex flex-row sm:flex-col hover:border-[#FF7A00]/60 hover:shadow-[0_20px_50px_-28px_rgba(13,28,52,0.35)] transition-all cursor-pointer"
    >
      <div className="w-28 flex-shrink-0 self-stretch sm:w-auto sm:h-52 xl:h-56 overflow-hidden bg-neutral-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-1 min-w-0">
        <Meta article={article} />
        <h3 className="mt-1.5 sm:mt-2.5 text-[15px] sm:text-lg font-bold tracking-tight leading-snug group-hover:text-[#FF7A00] transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 hidden sm:block text-sm text-neutral-600 leading-relaxed line-clamp-2">{article.summary}</p>
        <span className="hidden sm:inline mt-auto pt-5 text-sm font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 group-hover:decoration-[#FF7A00]">
          Read article
        </span>
      </div>
    </button>
  );
}

function ArticleReader({
  article,
  onClose,
  onOpen,
}: {
  article: Article;
  onClose: () => void;
  onOpen: (a: Article) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [activePoint, setActivePoint] = useState(0);

  const index = ARTICLES.findIndex((a) => a.slug === article.slug);
  const nextArticle = ARTICLES[(index + 1) % ARTICLES.length];
  const keepReading = ARTICLES.filter((a) => a.slug !== article.slug && a.slug !== nextArticle.slug).slice(0, 3);

  // Reading progress + which key point is currently on screen
  useEffect(() => {
    const onScroll = () => {
      const body = document.getElementById("article-body");
      if (body) {
        const rect = body.getBoundingClientRect();
        const total = rect.height - window.innerHeight * 0.5;
        const done = Math.min(Math.max(-rect.top + window.innerHeight * 0.25, 0), Math.max(total, 1));
        setProgress(Math.round((done / Math.max(total, 1)) * 100));
      }
      let current = 0;
      article.content.points.forEach((_, i) => {
        const el = document.getElementById(`point-${i + 1}`);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) current = i;
      });
      setActivePoint(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [article]);

  const jumpTo = (i: number) => {
    const el = document.getElementById(`point-${i + 1}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
  };

  return (
    <article>
      {/* Reading progress */}
      <div className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-[#FF7A00] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-sm font-semibold text-neutral-500 hover:text-[#FF7A00] transition-colors cursor-pointer"
      >
        ← All articles
      </button>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
        {/* Main column */}
        <div id="article-body" className="lg:col-span-8">
          <Meta article={article} />
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.15]">
            {article.title}
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            Written by the <span className="font-semibold text-[#111827]">S TEC SECURE engineering team</span>
          </p>

          <div className="mt-5 sm:mt-7 aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-neutral-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#FF7A00] first-letter:float-left first-letter:mr-2 first-letter:leading-[0.9]">
            {article.content.intro}
          </p>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 sm:gap-4 overflow-hidden sm:overflow-visible rounded-2xl sm:rounded-none border border-neutral-200 sm:border-0 bg-white sm:bg-transparent divide-y divide-neutral-100 sm:divide-y-0">
            {article.content.points.map((pt, i) => (
              <div
                key={i}
                id={`point-${i + 1}`}
                className={`scroll-mt-32 p-5 sm:p-6 sm:rounded-2xl sm:bg-white sm:border transition-colors ${
                  activePoint === i ? "sm:border-[#FF7A00]/60" : "sm:border-neutral-200"
                }`}
              >
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#FFF4E8] px-2 text-sm font-bold text-[#FF7A00] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-base sm:text-lg font-bold text-[#111827] leading-snug">
                  {cleanPointTitle(pt.title)}
                </h2>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>

          {/* Verdict (full width on phones; repeated in the sidebar on desktop) */}
          <div className="mt-6 sm:mt-8 lg:hidden rounded-2xl bg-[#FFF4E8] border-l-4 border-[#FF7A00] px-5 sm:px-6 py-5">
            <p className="text-sm font-semibold text-[#C25E00]">Our verdict</p>
            <p className="mt-1.5 text-base text-[#7C2D12] leading-relaxed">{article.content.verdict}</p>
          </div>

          {/* Next article */}
          <button
            type="button"
            onClick={() => onOpen(nextArticle)}
            className="group mt-8 sm:mt-10 w-full text-left flex items-center gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 p-4 sm:p-5 hover:border-[#FF7A00]/60 transition-colors cursor-pointer"
          >
            <img
              src={nextArticle.image}
              alt=""
              className="h-20 w-28 sm:h-24 sm:w-36 flex-shrink-0 rounded-2xl object-cover bg-neutral-100"
            />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-[#FF7A00]">Next article</span>
              <span className="block mt-1 text-base sm:text-lg font-bold leading-snug text-[#111827] group-hover:text-[#FF7A00] transition-colors">
                {nextArticle.title}
              </span>
              <span className="block mt-1 text-xs text-neutral-500">{nextArticle.readTime}</span>
            </span>
            <span className="hidden sm:block text-2xl text-neutral-300 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all pr-2">
              →
            </span>
          </button>
        </div>

        {/* Sidebar: stays in view while reading */}
        <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 space-y-5">
          <div className="rounded-3xl bg-white border border-neutral-200 p-6">
            <p className="text-sm font-semibold text-[#111827]">In this article</p>
            <ol className="mt-3 space-y-1">
              {article.content.points.map((pt, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    className={`w-full text-left flex gap-3 rounded-xl px-3 py-2 text-sm leading-snug transition-colors cursor-pointer ${
                      activePoint === i
                        ? "bg-[#FFF4E8] text-[#C25E00] font-semibold"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-[#111827]"
                    }`}
                  >
                    <span className="tabular-nums text-xs pt-0.5 opacity-70">{String(i + 1).padStart(2, "0")}</span>
                    <span>{cleanPointTitle(pt.title)}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-4 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
              <div className="h-full rounded-full bg-[#FF7A00] transition-[width] duration-150" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-neutral-400">{progress}% read</p>
          </div>

          <div className="rounded-3xl bg-[#FFF4E8] border border-[#FFE2C2] p-6">
            <p className="text-sm font-semibold text-[#C25E00]">Our verdict</p>
            <p className="mt-2 text-[15px] text-[#7C2D12] leading-relaxed">{article.content.verdict}</p>
          </div>

          <div className="rounded-3xl bg-[#0D1C34] text-white p-6">
            <p className="text-lg font-bold tracking-tight">Need advice for your property?</p>
            <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
              Free site walk-throughs, blind-spot mapping and quotes across Tamil Nadu.
            </p>
            <a
              href={WHATSAPP_ADVICE_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-5 flex items-center justify-center h-11 rounded-xl bg-[#FF7A00] hover:bg-[#E96F00] text-white text-sm font-semibold transition-colors"
            >
              Talk to an engineer
            </a>
          </div>
        </aside>
      </div>

      {/* Keep reading */}
      <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-neutral-200">
        <div className="flex items-end justify-between gap-4">
          <p className="text-xl sm:text-2xl font-bold tracking-tight">Keep reading</p>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 hover:decoration-[#FF7A00] hover:text-[#FF7A00] transition-colors cursor-pointer"
          >
            View all articles
          </button>
        </div>
        <div className="mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {keepReading.map((a) => (
            <ArticleCard key={a.slug} article={a} onOpen={onOpen} />
          ))}
        </div>
      </div>

    </article>
  );
}

function BlogPage() {
  const [activeTab, setActiveTab] = useState("All");
  const { article: articleSlug } = Route.useSearch();
  const navigate = useNavigate();
  const selectedArticle = ARTICLES.find((a) => a.slug === articleSlug) ?? null;

  const openArticle = (article: Article) => {
    navigate({ to: "/blog", search: { article: article.slug } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeArticle = () => {
    navigate({ to: "/blog", search: {} });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Close full article on Escape
  useEffect(() => {
    if (!selectedArticle) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeArticle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArticle]);

  const filteredArticles = ARTICLES.filter((a) => activeTab === "All" || a.filter === activeTab);
  const [featured, ...rest] = filteredArticles;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SiteNav revealed={true} />

      <main className="relative min-h-screen">
        <CyberMeshBackground />

        {/* Same width and side padding as the nav, so everything lines up with the logo */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-24 sm:pt-[104px] lg:pt-28 pb-16 sm:pb-20">
          {selectedArticle ? (
            <ArticleReader article={selectedArticle} onClose={closeArticle} onOpen={openArticle} />
          ) : (
            /* ─────────────── Blog listing ─────────────── */
            <div>
              {/* The single page heading */}
              <div className="flex flex-col gap-1.5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                <h1 className="text-3xl sm:text-4xl lg:text-[34px] font-bold tracking-tight leading-tight">
                  Our <span className="text-[#FF7A00]">Blog</span>
                </h1>
                <p className="text-sm sm:text-base text-neutral-500 lg:text-right lg:pb-1">
                  Practical guides on CCTV, smart homes and maintenance from our engineers.
                </p>
              </div>

              {/* Filters */}
              <div className="mt-5 sm:mt-6 -mx-6 px-6 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    aria-pressed={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#0D1C34] border-[#0D1C34] text-white"
                        : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-[#111827]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Featured (newest) article */}
              {featured && (
                <button
                  type="button"
                  onClick={() => openArticle(featured)}
                  className="group mt-5 sm:mt-8 w-full text-left grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-neutral-200 overflow-hidden hover:border-[#FF7A00]/60 hover:shadow-[0_20px_50px_-28px_rgba(13,28,52,0.35)] transition-all cursor-pointer"
                >
                  <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-neutral-100">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <Meta article={featured} />
                    <h2 className="mt-2 sm:mt-3 text-xl sm:text-[28px] font-bold tracking-tight leading-snug group-hover:text-[#FF7A00] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">{featured.summary}</p>
                    <span className="mt-4 sm:mt-6 text-sm font-semibold text-[#111827] underline decoration-neutral-300 underline-offset-4 group-hover:decoration-[#FF7A00]">
                      Read article
                    </span>
                  </div>
                </button>
              )}

              {/* Other articles */}
              {rest.length > 0 && (
                <div className="mt-3 sm:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {rest.map((article) => (
                    <ArticleCard key={article.slug} article={article} onOpen={openArticle} />
                  ))}
                </div>
              )}

            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
