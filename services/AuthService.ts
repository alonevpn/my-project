import { Alert } from 'react-native';

export const checkSubscription = async (userEmail: string) => {
  // در اینجا یک درخواست به Firebase ارسال می‌شود
  // نمونه شبیه‌سازی شده:
  const userData = { subscriptionActive: true, currentDevices: 1, maxDevices: 2 };

  if (!userData.subscriptionActive) {
    Alert.alert('خطا', 'اشتراک شما منقضی شده است.');
    return false;
  }

  if (userData.currentDevices >= userData.maxDevices) {
    Alert.alert('خطا', 'شما بیش از حد مجاز از دستگاه‌های خود استفاده کرده‌اید.');
    return false;
  }

  return true; // کاربر مجاز است
};
