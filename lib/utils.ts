export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function formatPriceCurrency(price: number, currency?: string) {
  if (price > 1000) {
    return `${price / 1000}K ${currency}`;
  } else if (price > 1000000) {
    return `${price / 1000000}M ${currency}`;
  } else if (price > 1000000000) {
    return `${price / 1000000000}B ${currency}`;
  }

  return `${price} ${currency}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  }
