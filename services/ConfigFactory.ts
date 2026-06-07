export const fetchFreeConfig = async () => {
  // ساختار کانفیگ با پنهان‌سازی فوق‌سریع (WebSocket + TLS)
  const secureConfig = {
    type: 'vless',
    address: 'cloudflare.com', // استفاده از CDN برای پنهان‌سازی ترافیک
    port: 443,
    network: 'ws',
    path: '/ray', // مسیر پنهان برای عبور از فایروال
    tls: 'enable',
    encryption: 'none'
  };
  
  console.log("Secure Obfuscated Config Generated");
  return secureConfig;
};
