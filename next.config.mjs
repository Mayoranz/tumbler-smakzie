/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Format prioritas: AVIF (45% lebih kecil) > WebP > original
    formats: ["image/avif", "image/webp"],
    // Device sizes sesuai breakpoint yang digunakan
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Cache gambar 30 hari di browser
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Daftarkan semua quality values yang dipakai di <Image quality={...}>
    qualities: [60, 75, 80],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
