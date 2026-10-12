import type { Sale } from "@/lib/sale-schema"

const DAY = 86_400_000
const HOUR = 3_600_000
const MINUTE = 60_000

export function getSale(now = Date.now()): Sale {
  return {
    title: "$ZOTH IDO on Sonar",
    token: { name: "ZOTH", symbol: "$ZOTH" },
    status: "live",
    totalSale: 501_000,
    target: 250_000,
    roundSize: 250_000,
    subscription: 2.01,
    progress: 44,
    closesAt: new Date(now + 2 * DAY + 5 * HOUR + 59 * MINUTE + 59_000).toISOString(),
    allocations: [
      { label: "Whitelist round", subscription: 2.4, progress: 82, raised: 300_000, cap: 125_000 },
      { label: "Public round", subscription: 1.61, progress: 64, raised: 201_000, cap: 125_000 },
    ],
    launchpad: "SONAR",
    purchaseMethod: "USDC",
    applications: 4_709,
    hardCap: null,
    timeline: [
      { label: "Whitelist opens", date: "20 October 2026", state: "next" },
      { label: "IDO", date: null, state: "upcoming" },
      { label: "Reviewing", date: null, state: "upcoming" },
      { label: "TGE", date: null, state: "upcoming" },
    ],
    readBeforeCommit: [
      { label: "Smart-contract audit", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Risk Disclosure", href: "#" },
    ],
  }
}
