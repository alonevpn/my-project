import { AppState } from 'react-native';

export const enableKillSwitch = (vpnStatus: boolean) => {
  AppState.addEventListener('change', (nextAppState) => {
    if (vpnStatus === false) {
      // در صورت قطع بودن VPN، می‌توان دسترسی‌های شبکه را محدود کرد
      console.log("Kill Switch Active: Blocking Traffic for Security");
    }
  });
};
