import { Alert } from 'react-native';

// تابع اعتبارسنجی کد هدیه
export const redeemGiftCode = async (code: string, userEmail: string) => {
  // در اینجا درخواست به Firebase می‌رود
  // منطق: بررسی اعتبار کد و اعمال آن روی اکانت کاربر
  const isValid = code === "FREEVPN2026"; // فرض بر این است که این کد معتبر است

  if (isValid) {
    Alert.alert('موفقیت', 'کد هدیه با موفقیت فعال شد! اشتراک شما تمدید شد.');
    return true;
  } else {
    Alert.alert('خطا', 'کد هدیه نامعتبر است.');
    return false;
  }
};
