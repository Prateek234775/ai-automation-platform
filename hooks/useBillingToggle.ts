"use client";

/**
 * useBillingToggle – manages monthly / annual pricing toggle state.

import { useState } from "react";
import type { Cycle } from "@/lib/pricingMatrix";

type BillingCycle = Cycle;

interface UseBillingToggleReturn {
  cycle:    BillingCycle;
  setCycle: (c: BillingCycle) => void;
  isAnnual: boolean;
}

export function useBillingToggle(
  initialCycle: BillingCycle = "monthly"
): UseBillingToggleReturn {
  const [cycle, setCycle] = useState<BillingCycle>(initialCycle);

  return {
    cycle,
    setCycle,
    isAnnual: cycle === "annual",
  };
}
