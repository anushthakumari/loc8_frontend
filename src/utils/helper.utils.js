export function cleanString(str = "") {
  return str.trim().toLowerCase();
}

export function formatPricing(value = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
}
