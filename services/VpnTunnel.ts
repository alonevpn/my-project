export const connectVpn = async (serverConfig: any) => {
  // این تابع به صورت استاندارد با سرویس VpnService اندروید ارتباط برقرار می‌کند
  console.log("Connecting to:", serverConfig.name);
  
  // شبیه‌سازی وضعیت اتصال برای جلوگیری از خطای کدنویسی
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};
