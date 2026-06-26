/**
 * formatPrice – formats a numeric price for display.
 *
 * @param amount    Numeric price in dollars (e.g. 49)
 * @param currency  ISO 4217 currency code (default "USD")
 * @param locale    BCP 47 locale string (default "en-US")
 *
 * @returns Formatted string, e.g. "$49" or "€49"
 *
 * @example
 *   formatPrice(49)        // "$49"
 *   formatPrice(49, "EUR") // "€49"
 */

export function formatPrice(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
