"use client";

/**
 * PricingContext
 * ─────────────────────────────────────────────────────────────────────────────
 * Carries the two volatile pieces of pricing state — cycle and currency —
 * to any descendant that needs them, WITHOUT triggering rerenders in
 * components that don't consume the context.
 *
 * Why context instead of prop-drilling?
 * ──────────────────────────────────────
 * If cycle/currency were passed as props all the way down to PriceDisplay,
 * every intermediate component (PricingGrid, PricingCard) would need to
 * accept those props, causing them to receive new prop objects on every
 * state change and therefore rerender — even with React.memo — because
 * React.memo bails out only when props are referentially equal.
 *
 * With context, PricingGrid and PricingCard receive NO volatile props.
 * React.memo can fully skip them. Only PriceDisplay — the tiny leaf that
 * actually calls formatMatrixPrice — subscribes to the context and rerenders.
 *
 * Shape:
 *   PricingStateContext  → { cycle, currency }          (read by PriceDisplay)
 *   PricingActionsContext → { setCycle, setCurrency }    (read by PricingControls)
 *
 * Split into two contexts so that PricingControls — which only needs the
 * setters — doesn't rerender when cycle/currency values change.  Setters are
 * stable (created once by useState) so PricingActionsContext value never changes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { Cycle, Currency } from "@/lib/pricingMatrix";

// ─── State context (volatile — changes on every toggle/select) ───────────────

interface PricingState {
  cycle:    Cycle;
  currency: Currency;
}

const PricingStateContext = createContext<PricingState>({
  cycle:    "monthly",
  currency: "USD",
});

// ─── Actions context (stable — setters never change identity) ────────────────

interface PricingActions {
  setCycle:    (c: Cycle)    => void;
  setCurrency: (c: Currency) => void;
}

const PricingActionsContext = createContext<PricingActions>({
  setCycle:    () => {},
  setCurrency: () => {},
});

// ─── Provider ────────────────────────────────────────────────────────────────

interface PricingProviderProps {
  children: ReactNode;
}

export function PricingProvider({ children }: PricingProviderProps) {
  const [cycle,    setCycleRaw]    = useState<Cycle>("monthly");
  const [currency, setCurrencyRaw] = useState<Currency>("USD");

  // useCallback keeps setter identities stable across renders.
  // This is the key reason PricingActionsContext value never triggers
  // consumer rerenders — the object reference is memoised.
  const setCycle    = useCallback((c: Cycle)    => setCycleRaw(c),    []);
  const setCurrency = useCallback((c: Currency) => setCurrencyRaw(c), []);

  // Memoised state value — only a new object when cycle or currency actually
  // change, preventing unnecessary context consumer rerenders.
  const stateValue = useMemo<PricingState>(
    () => ({ cycle, currency }),
    [cycle, currency],
  );

  // Actions value is created once and never changes (stable setter refs).
  // We use useMemo with an empty dep array to guarantee a single object identity.
  const actionsValue = useMemo<PricingActions>(
    () => ({ setCycle, setCurrency }),
    [setCycle, setCurrency],
  );

  return (
    <PricingActionsContext.Provider value={actionsValue}>
      <PricingStateContext.Provider value={stateValue}>
        {children}
      </PricingStateContext.Provider>
    </PricingActionsContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/**
 * usePricingState
 * Subscribe to cycle + currency values.
 * Use only in components that render price strings (PriceDisplay).
 * Every consumer rerenders when cycle or currency changes.
 */
export function usePricingState(): PricingState {
  return useContext(PricingStateContext);
}

/**
 * usePricingActions
 * Subscribe to stable setter functions.
 * Use only in PricingControls. Never triggers a rerender on value change
 * because the actions object is referentially stable for the component lifetime.
 */
export function usePricingActions(): PricingActions {
  return useContext(PricingActionsContext);
}
