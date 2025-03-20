export const formatCurrency = (value: string | number): string => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numericValue)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericValue / 100);
};

export const parseCurrency = (value: string): number => {
  const rawValue = value.replace(/\D/g, "");
  return parseInt(rawValue, 10) || 0;
};
