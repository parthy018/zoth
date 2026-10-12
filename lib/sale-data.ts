import type { Sale } from "@/lib/sale-schema"

const DAY = 86_400_000
const HOUR = 3_600_000
const MINUTE = 60_000

// In-memory simulation state that persists during server runtime
interface SimulationState {
  startTime: number
  baseTotalSale: number
  baseApplications: number
}

// Global baseline state
const state: SimulationState = {
  startTime: Date.now(),
  baseTotalSale: 501_000,
  baseApplications: 4_709,
}

const TARGET_CAP = 250_000
const ROUND_SIZE = 250_000
const MAX_SALE_ESTIMATE = 650_000

/**
 * Calculates current sale metrics dynamically based on elapsed time.
 */
export function getSale(now = Date.now()): Sale {
  // Simulate live organic growth over elapsed time:
  // ~$150 every 12 seconds, +1 application every 36 seconds
  const elapsedSeconds = Math.max(0, Math.floor((now - state.startTime) / 1000))
  const timeBasedSaleIncrease = Math.floor(elapsedSeconds / 12) * 150
  const timeBasedApplications = Math.floor(elapsedSeconds / 36)

  const totalSale = state.baseTotalSale + timeBasedSaleIncrease
  const totalApplications = state.baseApplications + timeBasedApplications

  // Dynamically calculate subscription multiple (e.g. 501,000 / 250,000 = 2.00x)
  const subscription = Number((totalSale / TARGET_CAP).toFixed(2))

  // Dynamically calculate overall round progress percentage
  const progress = Math.min(100, Math.round((totalSale / MAX_SALE_ESTIMATE) * 100))

  // Dynamically derive allocations for Whitelist (~60%) and Public (~40%) rounds
  const whitelistRaised = Math.round(totalSale * 0.5988)
  const publicRaised = totalSale - whitelistRaised
  const whitelistCap = 125_000
  const publicCap = 125_000

  const whitelistSubscription = Number((whitelistRaised / whitelistCap).toFixed(2))
  const publicSubscription = Number((publicRaised / publicCap).toFixed(2))

  const whitelistProgress = Math.min(100, Math.round((whitelistRaised / (whitelistCap * 3.2)) * 100))
  const publicProgress = Math.min(100, Math.round((publicRaised / (publicCap * 2.6)) * 100))

  return {
    title: "$ZOTH IDO on Sonar",
    token: { name: "ZOTH", symbol: "$ZOTH" },
    status: "live",
    totalSale,
    target: TARGET_CAP,
    roundSize: ROUND_SIZE,
    subscription,
    progress,
    closesAt: new Date(state.startTime + 2 * DAY + 5 * HOUR + 59 * MINUTE + 59_000).toISOString(),
    allocations: [
      {
        label: "Whitelist round",
        subscription: whitelistSubscription,
        progress: whitelistProgress,
        raised: whitelistRaised,
        cap: whitelistCap,
      },
      {
        label: "Public round",
        subscription: publicSubscription,
        progress: publicProgress,
        raised: publicRaised,
        cap: publicCap,
      },
    ],
    launchpad: "SONAR",
    purchaseMethod: "USDC",
    applications: totalApplications,
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
