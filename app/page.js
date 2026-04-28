"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ─────────────── Intersection Observer Hook ─────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

/* ─────────────── Counter animation ─────────────── */
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─────────────── SVG Icons ─────────────── */
const icons = {
  droplet: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.97 0-9-3.582-9-8 0-4.418 9-13 9-13s9 8.582 9 13c0 4.418-4.03 8-9 8z" />
    </svg>
  ),
  sparkles: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  briefcase: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  leaf: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  whatsapp: (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  arrowRight: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  arrowDown: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
    </svg>
  ),
  externalLink: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  menu: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
    </svg>
  ),
  close: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

/* ─────────────── Features Data ─────────────── */
const features = [
  {
    icon: icons.droplet,
    title: "Anti Bocor",
    desc: "Seal rapat dengan teknologi anti-bocor, aman di dalam tas tanpa khawatir tumpah.",
  },
  {
    icon: icons.sparkles,
    title: "Desain Modern & Stylish",
    desc: "Tampilan elegan hitam matte bertuliskan SMAKZIE — cocok untuk segala gaya.",
  },
  {
    icon: icons.briefcase,
    title: "Mudah Dibawa",
    desc: "Ukuran pas, ringan, dan ergonomis — teman setia aktivitas harianmu.",
  },
  {
    icon: icons.leaf,
    title: "Ramah Lingkungan",
    desc: "Kurangi sampah plastik. Satu tumbler, ribuan manfaat untuk bumi.",
  },
];

/* ─────────────── Gallery Images ─────────────── */
const galleryImages = [
  { src: "/tumbler-dark.png", alt: "Tumbler Smakzie — Tampak samping dengan background gelap", label: "Product View" },
  { src: "/tumbler-lifestyle.png", alt: "Tumbler Smakzie — Di workspace modern", label: "Workspace" },
  { src: "/tumbler-outdoor.png", alt: "Tumbler Smakzie — Outdoor adventure", label: "Outdoor" },
  { src: "/tumbler-flatlay.png", alt: "Tumbler Smakzie — Flat lay dengan aksesoris", label: "Flat Lay" },
];

/* ═══════════════════════════════════════════════ */
/*            MAIN PAGE COMPONENT                  */
/* ═══════════════════════════════════════════════ */
export default function Home() {
  const [heroRef, heroIn] = useInView();
  const [featRef, featIn] = useInView();
  const [galleryRef, galleryIn] = useInView();
  const [priceRef, priceIn] = useInView();
  const [marketRef, marketIn] = useInView();
  const [statsRef, statsIn] = useInView();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stats
  const satisfied = useCountUp(500, 2000, statsIn);
  const sold = useCountUp(1200, 2000, statsIn);

  return (
    <main className="flex-1 grain-overlay">
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-blur" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="https://zielabs.id" className="flex items-center gap-2 z-10">
            <span className="text-lg font-bold tracking-[0.2em] text-white">
              ◆ ZIE
            </span>
            <span className="text-lg font-bold tracking-[0.2em] gradient-gold">
              LABS
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {["Home", "Features", "Gallery", "Pricing", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[13px] font-medium tracking-[2px] uppercase text-[#888] hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/6281462256193?text=saya%20ingin%20memesan%20tumbler%20smakzie"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-gold !py-3 !px-7 !text-[12px] !tracking-[2px]"
          >
            Order Now
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-white z-10"
            aria-label="Toggle menu"
          >
            {mobileMenu ? icons.close : icons.menu}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 animate-fade-in">
            {["Home", "Features", "Gallery", "Pricing", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenu(false)}
                  className="text-xl font-light tracking-[4px] uppercase text-[#ccc] hover:text-white transition-colors"
                >
                  {item}
                </a>
              )
            )}
            <a
              href="https://wa.me/6281462256193?text=saya%20ingin%20memesan%20tumbler%20smakzie"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-4"
              onClick={() => setMobileMenu(false)}
            >
              Order Now
            </a>
          </div>
        )}
      </nav>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/tumbler-hero.png"
            alt="Tumbler Smakzie hero background"
            fill
            className="object-cover opacity-15"
            priority
            sizes="100vw"
            quality={60}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent" />
        </div>

        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38bdf8]/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-32 md:py-40">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Text */}
            <div
              className={`flex-1 text-center lg:text-left ${
                heroIn ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <div className="section-label">New Release 2026</div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-6">
                <span className="gradient-white">Introducing</span>
                <br />
                <span className="text-shimmer">Tumbler Smakzie</span>
              </h1>
              <p className="text-lg md:text-xl text-[#777] max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12 font-light">
                Stylish, Practical, and Made for Your Daily Life.
                <br />
                Elevate your hydration game with premium craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#pricing"
                  className="btn-gold"
                  id="hero-cta"
                >
                  Pesan Sekarang
                  {icons.arrowRight}
                </a>
                <a href="#gallery" className="btn-outline">
                  Explore
                </a>
              </div>
            </div>

            {/* Hero Product Image */}
            <div
              className={`flex-0 flex justify-center ${
                heroIn ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s", animationFillMode: "both", flexShrink: 0 }}
            >
              <div className="relative" style={{ width: "300px" }}>
                {/* Cyan glow ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
                    animation: "cyan-pulse 4s ease-in-out infinite",
                  }}
                />
                <div className="animate-float">
                  <Image
                    src="/tumbler-removebg.png"
                    alt="Tumbler Smakzie — tumbler hitam elegan bertuliskan SMAKZIE"
                    width={200}
                    height={275}
                    className="product-glow object-contain"
                    style={{ width: "auto", height: "auto", maxWidth: "200px" }}
                    sizes="200px"
                    priority
                    quality={80}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
            <span className="text-[10px] tracking-[3px] uppercase text-[#555]">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#555] to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section ref={statsRef} className="border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: `${satisfied}+`, label: "Pelanggan Puas" },
            { value: `${sold}+`, label: "Unit Terjual" },
            { value: "4.9★", label: "Rating" },
            { value: "100%", label: "Original" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-gold mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] tracking-[2px] uppercase text-[#666]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FEATURES SECTION ═══════════════ */}
      <section id="features" ref={featRef} className="py-28 md:py-36 relative">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38bdf8]/3 rounded-full blur-[200px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          {/* Header */}
          <div
            className={`text-center mb-20 ${
              featIn ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="section-label">Why Choose Us</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-white">Crafted for</span>{" "}
              <span className="gradient-gold">Excellence</span>
            </h2>
            <p className="text-[#666] max-w-lg mx-auto mt-6 font-light leading-relaxed">
              Setiap detail dirancang untuk memberikan pengalaman terbaik dalam
              hidrasi sehari-hari.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className={`luxury-card rounded-xl p-8 md:p-10 ${
                  featIn ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${(i + 1) * 0.12}s`,
                  animationFillMode: "both",
                }}
              >
                <div className="flex items-start gap-5">
                  <div className="feature-icon-dark">{f.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">
                      {f.title}
                    </h3>
                    <p className="text-[#777] leading-relaxed text-sm font-light">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY SECTION ═══════════════ */}
      <section id="gallery" ref={galleryRef} className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div
            className={`text-center mb-16 ${
              galleryIn ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="section-label">Gallery</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-white">Every Angle,</span>{" "}
              <span className="gradient-gold">Every Detail</span>
            </h2>
            <p className="text-[#666] max-w-lg mx-auto mt-6 font-light leading-relaxed">
              Lihat Tumbler Smakzie dari berbagai sudut dan suasana. Dibuat untuk tampil sempurna di mana saja.
            </p>
          </div>

          {/* Gallery Grid */}
          <div
            className={`gallery-grid ${
              galleryIn ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="gallery-item img-hover-zoom rounded-lg overflow-hidden relative group cursor-pointer"
                style={{
                  animationDelay: `${(i + 1) * 0.1}s`,
                  animationFillMode: "both",
                }}
                onClick={() => setLightbox(img)}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={75}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[11px] tracking-[2px] uppercase text-[#38bdf8]">
                      {img.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DETAIL PRODUCT SECTION ═══════════════ */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0d0d]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image */}
            <div className="flex-1">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/tumbler-closeup.png"
                  alt="Tumbler Smakzie — Detail close-up"
                  width={640}
                  height={480}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={80}
                />
              </div>
            </div>
            {/* Text */}
            <div className="flex-1">
              <div className="section-label">Premium Quality</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                <span className="gradient-white">Attention to</span>
                <br />
                <span className="gradient-gold">Every Detail</span>
              </h2>
              <p className="text-[#777] leading-relaxed font-light mb-8">
                Tumbler Smakzie dirancang dengan material premium dan finishing
                matte hitam yang elegan. Setiap detail — dari mekanisme tutup
                anti-bocor hingga ergonomi body yang nyaman digenggam — dibuat
                untuk kesempurnaan.
              </p>
              <div className="space-y-4">
                {[
                  "Material Stainless Steel food-grade",
                  "Finishing matte anti-fingerprint",
                  "Lock mechanism presisi tinggi",
                  "BPA-Free & eco-friendly",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center">
                      <span className="text-[#38bdf8]">{icons.check}</span>
                    </div>
                    <span className="text-[#999] text-sm font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING SECTION ═══════════════ */}
      <section id="pricing" ref={priceRef} className="py-28 md:py-36 relative">
        {/* Decorative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#38bdf8]/3 rounded-full blur-[200px]" />

        <div className="max-w-4xl mx-auto px-6 lg:px-10 relative">
          <div
            className={`text-center ${
              priceIn ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="section-label">Special Price</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-white">Get Yours</span>{" "}
              <span className="gradient-gold">Today</span>
            </h2>
          </div>

          {/* Price Card */}
          <div
            className={`mt-16 glass-card rounded-2xl p-10 md:p-16 text-center max-w-2xl mx-auto ${
              priceIn ? "animate-scale-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <div className="text-[11px] tracking-[3px] uppercase text-[#888] mb-4">
              Tumbler Smakzie — Limited Edition
            </div>

            <div className="text-5xl md:text-7xl font-extrabold tracking-tight gradient-gold mb-2">
              Rp 45.000
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {["Anti Bocor", "Modern Design", "Eco Friendly", "Portable"].map(
                (item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.08)] text-[12px] text-[#999]"
                  >
                    <span className="text-[#38bdf8]">{icons.check}</span>
                    {item}
                  </span>
                )
              )}
            </div>

            <a
              href="https://wa.me/6281462256193?text=saya%20ingin%20memesan%20tumbler%20smakzie"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp animate-pulse-glow justify-center w-full sm:w-auto"
              id="order-whatsapp"
            >
              {icons.whatsapp}
              Order via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ MARKETPLACE SECTION ═══════════════ */}
      <section id="contact" ref={marketRef} className="py-28 md:py-36 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div
            className={`text-center ${
              marketIn ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="section-label">Also Available On</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-white">Marketplace</span>
            </h2>
            <p className="text-[#666] max-w-lg mx-auto mt-6 mb-14 font-light leading-relaxed">
              Temukan Tumbler Smakzie di marketplace favoritmu. Belanja mudah,
              aman, dan terpercaya.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-5 justify-center ${
              marketIn ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <a
              href="https://shopee.co.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-marketplace btn-shopee justify-center"
              id="shopee-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.08c-.292.876-1.168 1.46-2.19 1.46H8.296c-1.022 0-1.898-.584-2.19-1.46L4.5 12.165c-.146-.438.195-.915.66-.915h13.68c.465 0 .806.477.66.915l-1.606 4.915zM12 3.75a3.375 3.375 0 013.375 3.375h-1.5A1.875 1.875 0 0012 5.25a1.875 1.875 0 00-1.875 1.875h-1.5A3.375 3.375 0 0112 3.75z" />
              </svg>
              Shopee
              {icons.externalLink}
            </a>
            <a
              href="https://tokopedia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-marketplace btn-tokopedia justify-center"
              id="tokopedia-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm6 13.5H6v-1.5c0-2.485 3.358-4.5 6-4.5s6 2.015 6 4.5V18z" />
              </svg>
              Tokopedia
              {icons.externalLink}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-[rgba(255,255,255,0.06)]">
        {/* Top Footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            {/* Brand */}
            <div>
              <a href="#" className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold tracking-[0.2em] text-white">
                  ◆ SMAK
                </span>
                <span className="text-lg font-bold tracking-[0.2em] gradient-gold">
                  ZIE
                </span>
              </a>
              <p className="text-[#555] text-sm font-light max-w-xs leading-relaxed">
                Tumbler premium dengan desain elegan dan kualitas terbaik. Dibuat untuk menemani setiap momenmu.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-16">
              <div>
                <h4 className="text-[11px] tracking-[2px] uppercase text-[#888] mb-4">
                  Navigate
                </h4>
                <div className="flex flex-col gap-2">
                  {["Home", "Features", "Gallery", "Pricing"].map((l) => (
                    <a
                      key={l}
                      href={`#${l.toLowerCase()}`}
                      className="text-sm text-[#555] hover:text-white transition-colors font-light"
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[11px] tracking-[2px] uppercase text-[#888] mb-4">
                  Connect
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://wa.me/6281462256193"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#555] hover:text-white transition-colors font-light"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://shopee.co.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#555] hover:text-white transition-colors font-light"
                  >
                    Shopee
                  </a>
                  <a
                    href="https://tokopedia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#555] hover:text-white transition-colors font-light"
                  >
                    Tokopedia
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[rgba(255,255,255,0.04)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-[#444] tracking-wide">
              © 2026 Copyright by{" "}
              <a
                href="https://zielabs.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888] hover:text-[#38bdf8] transition-colors duration-300 font-medium"
                id="footer-zielabs"
              >
                zielabs
              </a>
            </p>
            <a
              href="#home"
              className="text-[11px] tracking-[2px] uppercase text-[#444] hover:text-[#888] transition-colors duration-300 flex items-center gap-2"
            >
              Back to top
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* ═══════════════ LIGHTBOX MODAL ═══════════════ */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            {icons.close}
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-[11px] tracking-[2px] uppercase text-[#38bdf8] bg-black/60 px-4 py-2 rounded-full">
                {lightbox.label}
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
