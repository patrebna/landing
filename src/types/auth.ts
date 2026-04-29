export type TelegramAuthPayload = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

export type TelegramUser = {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  authDate: string;
};

export type UserStats = {
  registrationDate: string | null;
  subscription: string;
  subscriptionEnd: string | null;
  referralsCount: number;
  wallet: number;
  urls: Array<{
    url: string;
    adsCount: number;
    status: boolean;
  }>;
};

export type AuthSession = {
  telegramUser: TelegramUser;
  profile: null;
};
