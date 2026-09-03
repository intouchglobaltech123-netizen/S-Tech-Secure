export function WhatsAppCta() {
  const whatsappUrl =
    "https://wa.me/919600252605?text=Hi%20STEC%20Secure%2C%20I%20need%20a%20free%20site%20visit%20and%20quote%20for%20CCTV%20and%20security%20installation.";

  return (
    <section
      className="relative w-full pt-[50px] pb-[50px] px-4 sm:px-12 lg:px-[100px] overflow-hidden bg-transparent"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] border border-[#BBF7D0] shadow-[0_15px_40px_rgba(37,211,102,0.12)] flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10">
        {/* Left Text Block */}
        <div className="text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#15803D] uppercase">
              FAST WHATSAPP RESPONSE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#14532D] tracking-tight leading-tight mb-3">
            Get a Free Site Visit or Instant Quote on WhatsApp
          </h2>

          <p className="text-[#166534] text-sm sm:text-base leading-relaxed font-medium">
            Our experts are ready to help you choose the right CCTV, automation, or security solution. Chat with us now and get fast support, free consultation, and best-fit packages.
          </p>
        </div>

        {/* Right Action Button */}
        <div className="flex-shrink-0 w-full md:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3.5 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden select-none"
          >
            {/* WhatsApp Logo Icon */}
            <svg
              className="w-6 h-6 fill-white relative z-10"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>

            <span className="relative z-10 font-bold">Chat on WhatsApp</span>
            <span className="relative z-10 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhatsAppCta;
