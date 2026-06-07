import V2RayCore from 'react-native-v2ray-core';

export const startVpnTunneling = async (configJson: string) => {
  try {
    // تبدیل کانفیگ سرور به فرمت استاندارد V2Ray
    const config = JSON.parse(configJson);
    
    // شروع سرویس VPN
    await V2RayCore.start(config);
    console.log("VPN Tunnel Started Successfully");
  } catch (error) {
    console.error("VPN Connection Error:", error);
    throw error;
  }
};

export const stopVpnTunneling = async () => {
  await V2RayCore.stop();
};
