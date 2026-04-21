import { LucideIcon } from "lucide-react";
import {
  BellRing,
  ShieldCheck,
  Sparkles,
  Timer,
  SlidersHorizontal,
} from "lucide-react";

interface IadvantageItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const advantageItems: IadvantageItem[] = [
  {
    title: "Получай первым новые объявления",
    description:
      "Бот отслеживает свежие публикации на Kufar в реальном времени и присылает уведомление.",
    icon: BellRing,
  },
  {
    title: "Гибкие фильтры поиска",
    description:
      "Настраивай категории, цену, регион и ключевые слова под свои цели.",
    icon: SlidersHorizontal,
  },
  {
    title: "Экономия времени",
    description:
      "Не нужно вручную обновлять сайт. Все объявления приходят в личную переписку с ботом.",
    icon: Timer,
  },
  {
    title: "Уведомления 24/7",
    description: "Бот работает круглосуточно и отслеживает новые объявления.",
    icon: Sparkles,
  },
  {
    title: "Безопасность",
    description:
      "Бот не запрашивает номер телефона, коды подтверждения или другие персональные данные для начала работы.",
    icon: ShieldCheck,
  },
];
