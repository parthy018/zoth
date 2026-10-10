"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { SaleError } from "@/components/sale/sale-error"
import { useSale } from "@/hooks/use-sale"
import { clampPercent, formatCompactUsd, formatUsd } from "@/lib/format"
import type { Sale } from "@/lib/sale-schema"

const STATUS_LABEL: Record<Sale["status"], string> = {
  upcoming: "SOON",
  live: "LIVE",
  ended: "ENDED",
}

function SaleCardSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading sale data"
      className="border border-zoth-accent-border bg-zoth-brown-dark/80 p-5 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36 bg-zoth-brown" />
        <Skeleton className="h-5 w-14 bg-zoth-brown" />
      </div>
      <div className="mt-8 flex items-end justify-between">
        <Skeleton className="h-10 w-40 bg-zoth-brown" />
        <Skeleton className="h-10 w-20 bg-zoth-brown" />
      </div>
      <Skeleton className="mt-5 h-1.5 w-full bg-zoth-brown" />
      <Skeleton className="mt-8 h-[76px] w-full bg-zoth-brown" />
    </div>
  )
}

export function SaleCard() {
  const { data, isPending, isError, refetch } = useSale()

  useEffect(() => {
    if (isError) toast.error("Could not load sale data.")
  }, [isError])

  if (isPending) return <SaleCardSkeleton />
  if (isError) return <SaleError onRetry={() => refetch()} className="min-h-[300px]" />

  const progress = clampPercent(data.progress)

  return (
    <article
      aria-labelledby="sale-card-title"
      className="relative border border-zoth-accent-border bg-zoth-brown-dark/80 p-5 backdrop-blur-sm sm:p-6"
    >
      <header className="flex items-center justify-between gap-3">
        <h2 id="sale-card-title" className="text-[13px] text-white">
          {data.title}
        </h2>
        <span className="inline-flex items-center gap-1.5 border border-zoth-orange px-2 py-0.5 text-[10px] font-medium tracking-[0.1em] text-zoth-orange">
          <span
            aria-hidden="true"
            className={
              "size-1.5 bg-zoth-orange " + (data.status === "live" ? "animate-pulse motion-reduce:animate-none" : "")
            }
          />
          {STATUS_LABEL[data.status]}
        </span>
      </header>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-zoth-text-muted">Total Sale</p>
          <p className="mt-1 text-3xl leading-none font-medium tracking-tight sm:text-[40px]">
            {formatUsd(data.totalSale)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zoth-text-muted">Subscription Status</p>
          <p className="mt-1 text-3xl leading-none font-medium tracking-tight text-zoth-orange sm:text-[40px]">
            {data.subscription.toFixed(2)}x
          </p>
        </div>
      </div>

      <Progress
        value={progress}
        aria-label="Sale progress"
        className="mt-5 h-1.5 bg-zoth-border"
      />
      <div className="mt-2 flex justify-between text-[11px] text-zoth-text-muted">
        <span>{formatUsd(data.totalSale)}</span>
        <span>Target: {formatCompactUsd(data.target)}</span>
      </div>

      <div className="mt-5 border border-zoth-border bg-black p-4">
        <p className="text-xs text-zoth-text-muted">Round Size</p>
        <p className="mt-1 text-2xl font-medium">{formatUsd(data.roundSize)}</p>
      </div>
    </article>
  )
}
