export const formatDate = (date: Date) => {
  const isToday = date.toDateString() === new Date().toDateString();
  if (isToday) {
    return `Сегодня, ${date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return date.toLocaleDateString("ru-RU");
};

const formatPrice = (value: number): string => {
  const num = value / 100;
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: num < 1 ? 1 : 0,
    maximumFractionDigits: num < 1 ? 2 : 0,
  }).format(num);
};

export const getPriceText = (
  price: number | string,
  remunerationType?: string,
) => {
  const numericPrice = Number(price);

  if (remunerationType === "1") {
    if (numericPrice > 0) {
      return formatPrice(numericPrice);
    }
    return "Договорная";
  }

  if (remunerationType === "2") {
    return "Бесплатно";
  }

  return numericPrice > 0 ? formatPrice(numericPrice) : "Бесплатно";
};

export const showCurrency = (
  price: number | string,
  remunerationType?: string,
) => remunerationType !== "2" && Number(price) > 0;
