import { type TelegramUser } from "@/types/auth";

export function getTelegramDisplayName(user: TelegramUser) {
  return [user.firstName, user.lastName].filter(Boolean).join(" ");
}

export function getProfileInitials(user: TelegramUser) {
  return [user.firstName, user.lastName]
    .filter((part): part is string => Boolean(part))
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
