const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export const formatUsd = (n: number) => usd.format(n)

export const formatCompactUsd = (n: number) =>
  `$${new Intl.NumberFormat("en-US", { notation: "compact" }).format(n).toUpperCase()}`

export const formatNumber = (n: number) => new Intl.NumberFormat("en-US").format(n)

export const pad2 = (n: number) => String(n).padStart(2, "0")

export const clampPercent = (n: number) => Math.min(100, Math.max(0, Number.isFinite(n) ? n : 0))
