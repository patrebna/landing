interface TariffFeature {
  label: string;
  available: boolean;
}

type TariffName = "Бесплатный" | "Базовый" | "Основной";

interface Tariff {
  name: TariffName;
  price: number;
  tag: string;
  description: string;
  note: string;
  features: TariffFeature[];
}

export const plans: Tariff[] = [
  {
    name: "Бесплатный",
    price: 0,
    tag: "Старт",
    description:
      "Отличный способ начать пользоваться ботом и оценить его возможности.",
    note: "Легкий старт",
    features: [
      { label: "Обновления раз в 60 минут", available: true },
      { label: "Отслеживание 1 ссылки", available: true },
      { label: "Приоритетная поддержка", available: false },
      { label: "Отсутствие рекламы", available: false },
      { label: "Описание к каждому объявлению", available: false },
      {
        label: "Дополнительные параметры к объявлениям",
        available: false,
      },
      { label: "Просмотр на карте объектов недвижимости", available: false },
      { label: "Ранний доступ к новым функциям", available: false },
      { label: "Эксклюзивные возможности", available: false },
    ],
  },
  {
    name: "Базовый",
    price: 5,
    tag: "Выбор",
    description: "Базовый формат объявлений со средней частотой обновления.",
    note: "Регулярное использование",
    features: [
      { label: "Обновления раз в 30 минут", available: true },
      { label: "Отслеживание 1 ссылки", available: true },
      { label: "Приоритетная поддержка", available: true },
      { label: "Отсутствие рекламы", available: false },
      { label: "Описание к каждому объявлению", available: false },
      {
        label: "Дополнительные параметры к объявлениям",
        available: false,
      },

      { label: "Просмотр на карте объектов недвижимости", available: false },

      { label: "Ранний доступ к новым функциям", available: false },
      { label: "Эксклюзивные возможности", available: false },
    ],
  },
  {
    name: "Основной",
    price: 25,
    tag: "Максимум",
    description:
      "Максимальная скорость, расширенные возможности и никакой рекламы.",
    note: "Максимальные возможности",
    features: [
      { label: "Обновления раз в 5 минут", available: true },
      { label: "Отслеживание до 3 ссылок", available: true },
      { label: "Приоритетная поддержка", available: true },
      { label: "Отсутствие рекламы", available: true },
      { label: "Описание к каждому объявлению", available: true },
      {
        label: "Дополнительные параметры к обявлениям",
        available: true,
      },
      { label: "Просмотр на карте объектов недвижимости", available: true },
      { label: "Ранний доступ к новым функциям", available: true },
      { label: "Эксклюзивные возможности", available: true },
    ],
  },
];
