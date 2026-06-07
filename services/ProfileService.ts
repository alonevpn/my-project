export const getUserProfile = async (email: string) => {
  // شبیه‌سازی دریافت اطلاعات از دیتابیس
  return {
    email: email,
    subscriptionActive: true,
    expiresAt: "2026-12-31",
    remainingDays: 180
  };
};
