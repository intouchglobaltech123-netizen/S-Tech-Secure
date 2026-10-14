import { Link } from "@tanstack/react-router";
import { ARTICLES } from "@/data/blogArticles";

const latest = ARTICLES.slice(0, 3);

export function LatestArticles() {
  return (
    <section className="relative w-full py-20 sm:py-24" aria-labelledby="blog-heading" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#FF7A00]">From our blog</p>
            <h2 id="blog-heading" className="mt-2 text-[28px] sm:text-4xl font-bold tracking-tight text-[#111827] leading-tight">
              Guides from our engineers
            </h2>
            <p className="mt-3 text-base text-neutral-600 leading-relaxed">
              Simple advice on choosing, installing and looking after your security system.
            </p>
          </div>
          <Link
            to="/blog"
            className="group inline-flex flex-shrink-0 items-center gap-2 self-start sm:self-auto rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0D1C34] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-colors"
          >
            View all articles
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {latest.map((article) => (
            <li key={article.slug}>
              <Link
                to="/blog"
                search={{ article: article.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(13,28,52,0.08)] transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold text-[#FF7A00]">
                    {article.filter} <span className="text-neutral-300">·</span>{" "}
                    <span className="font-medium text-neutral-500">{article.readTime}</span>
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-[#111827] group-hover:text-[#FF7A00] transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-600">{article.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D1C34]">
                    Read article
                    <span aria-hidden className="text-[#FF7A00] transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LatestArticles;
