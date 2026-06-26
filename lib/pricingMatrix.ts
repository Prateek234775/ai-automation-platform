/**
 * pricingMatrix.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all pricing data.
 *
 * HOW THE MATRIX IS BUILT
 * ──────────────────────────────────────────────────────────────────────────
 * 1.  BASE_PRICES_USD  – monthly USD prices for each plan tier.
 *     These are the only hardcoded numbers in the entire system.
 *
 * 2.  ANNUAL_DISCOUNT  – the fraction taken off for annual billing (0.20 = 20%).
 *     Annual = monthly × (1 − ANNUAL_DISCOUNT), rounded to nearest whole unit.
 *
 * 3.  CURRENCY_CONFIG  – per-currency metadata:
 *       • multiplier : regional FX rate relative to USD.
 *         INR ≈ 83.5×, EUR ≈ 0.92×  (update when rates drift significantly).
 *       • locale     : BCP-47 locale string for Intl.NumberFormat.
 *       • rounding   : nearest multiple to round to (keeps prices clean).
 *         e.g. INR prices are rounded to the nearest ₹100.
 *
 * 4.  buildMatrix()   – pure function that computes the full
 *     { cycle → currency → tier → price } matrix from the above inputs.
 *     The UI never does arithmetic – it just reads values from the matrix.
 *
 * ADDING A NEW CURRENCY
 * ──────────────────────────────────────────────────────────────────────────
 * Add one entry to CURRENCY_CONFIG.  The matrix rebuilds automatically.
 *
 * ADDING A NEW TIER
 * ──────────────────────────────────────────────────────────────────────────
 * Add one entry to BASE_PRICES_USD.  All currencies and cycles update.
 *
 * CHANGING ANNUAL DISCOUNT
 * ──────────────────────────────────────────────────────────────────────────
 * Change ANNUAL_DISCOUNT.  Every price in every currency recalculates.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Tier identifiers ────────────────────────────────────────────────────────

export type TierId   = "starter" | "pro" | "enterprise";
export type Currency = "USD" | "INR" | "EUR";
export type Cycle    = "monthly" | "annual";

// ─── Monthly USD base prices ─────────────────────────────────────────────────
// These are the ONLY hardcoded numbers. Everything else is derived.

const BASE_PRICES_USD: Record<TierId, number> = {
  starter:    20,
  pro:        49,
  enterprise: 99,
};

// ─── Annual discount ──────────────────────────────────────────────────────────

export const ANNUAL_DISCOUNT = 0.20; // 20% off

/** The display label shown next to the annual toggle */
export const ANNUAL_SAVINGS_LABEL = `Save ${Math.round(ANNUAL_DISCOUNT * 100)}%`;

// ─── Currency config ──────────────────────────────────────────────────────────

interface CurrencyConfig {
  /** Exchange rate multiplier relative to USD */
  multiplier: number;
  /** BCP-47 locale for Intl.NumberFormat */
  locale: string;
  /** Round final price to nearest multiple of this value (keeps prices clean) */
  rounding: number;
}

const CURRENCY_CONFIG: Record<Currency, CurrencyConfig> = {
  USD: { multiplier: 1,     locale: "en-US", rounding: 1   },
  EUR: { multiplier: 0.92,  locale: "de-DE", rounding: 1   },
  INR: { multiplier: 83.5,  locale: "en-IN", rounding: 100 },
};

// ─── Derived types ────────────────────────────────────────────────────────────

export type TierPrices    = Record<TierId,    number>;
export type CurrencyPrices = Record<Currency, TierPrices>;
export type PricingMatrix  = Record<Cycle,    CurrencyPrices>;

// ─── Build function ───────────────────────────────────────────────────────────

function roundTo(value: number, multiple: number): number {
  return Math.round(value / multiple) * multiple;
}

function buildMatrix(): PricingMatrix {
  const cycles: Cycle[]    = ["monthly", "annual"];
  const currencies          = Object.keys(CURRENCY_CONFIG) as Currency[];
  const tiers               = Object.keys(BASE_PRICES_USD) as TierId[];

  const matrix = {} as PricingMatrix;

  for (const cycle of cycles) {
    matrix[cycle] = {} as CurrencyPrices;
    const cycleFactor = cycle === "annual" ? (1 - ANNUAL_DISCOUNT) : 1;

    for (const currency of currencies) {
      const { multiplier, rounding } = CURRENCY_CONFIG[currency];
      matrix[cycle][currency] = {} as TierPrices;

      for (const tier of tiers) {
        const raw      = BASE_PRICES_USD[tier] * cycleFactor * multiplier;
        const rounded  = roundTo(raw, rounding);
        // Enforce a minimum of 1 so no price accidentally becomes 0
        matrix[cycle][currency][tier] = Math.max(1, rounded);
      }
    }
  }

  return matrix;
}

/**
 * The fully-computed pricing matrix.
 * Evaluated once at module load — zero runtime overhead for consumers.
 *
 * Shape:
 *   pricingMatrix.monthly.USD.starter  → 20
 *   pricingMatrix.annual.INR.pro       → 3300  (49 × 0.8 × 83.5, rounded to ₹100)
 */
export const pricingMatrix: PricingMatrix = buildMatrix();

// ─── Currency metadata (re-exported for UI consumers) ────────────────────────

export interface CurrencyMeta {
  code:   Currency;
  label:  string;
  symbol: string;
  locale: string;
}

export const CURRENCIES: CurrencyMeta[] = [
  { code: "USD", label: "USD ($)", symbol: "$",  locale: "en-US" },
  { code: "EUR", label: "EUR (€)", symbol: "€",  locale: "de-DE" },
  { code: "INR", label: "INR (₹)", symbol: "₹",  locale: "en-IN" },
];

// ─── Helper: resolve a single price ──────────────────────────────────────────

export function getPrice(
  cycle:    Cycle,
  currency: Currency,
  tier:     TierId,
): number {
  return pricingMatrix[cycle][currency][tier];
}

// ─── Helper: format a price using the correct locale & currency ───────────────

export function formatMatrixPrice(
  amount:   number,
  currency: Currency,
): string {
  const { locale } = CURRENCY_CONFIG[currency];
  return new Intl.NumberFormat(locale, {
    style:                 "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Helper: annual per-month price (for "billed as X/yr" callout) ────────────

export function getAnnualTotal(currency: Currency, tier: TierId): number {
  return pricingMatrix.annual[currency][tier] * 12;
}
