import { checkSubscription } from './AuthService';
import { fetchFreeConfig } from './ConfigFactory';
import { enableKillSwitch } from './KillSwitch';
import { startVpnTunneling } from './VpnEngine';

export const activateSecureTunnel = async (email: string) => {
  // ۱. چک کردن اشتراک
  const isAllowed = await checkSubscription(email);
  if (!isAllowed) return { success: false, message: 'اشتراک معتبر نیست' };

  // ۲. دریافت کانفیگ رایگان و نامحدود
  const config = await fetchFreeConfig();

  // ۳. فعال‌سازی Kill Switch برای امنیت مطلق
  enableKillSwitch(true);

  // ۴. استارت هسته VPN
  try {
    await startVpnTunneling(JSON.stringify(config));
    return { success: true, message: 'اتصال امن برقرار شد' };
  } catch (error) {
    return { success: false, message: 'خطا در اتصال به سرور' };
  }
};
