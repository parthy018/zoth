"use client"

import { useEffect } from "react"
import { Clock } from "lucide-react"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Countdown } from "@/components/sale/countdown"
import { SaleError } from "@/components/sale/sale-error"
import { useSale } from "@/hooks/use-sale"
import { clampPercent, formatCompactUsd, formatUsd } from "@/lib/format"

function SaleCardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading sale data" className="space-y-5">
      <div className="flex items-end justify-between">
        <Skeleton className="h-12 w-44 bg-zoth-brown" />
        <Skeleton className="h-12 w-24 bg-zoth-brown" />
      </div>
      <Skeleton className="h-1.5 w-full bg-zoth-brown" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-[84px] bg-zoth-brown" />
        <Skeleton className="h-[84px] bg-zoth-brown" />
      </div>
      <Skeleton className="h-[76px] w-full bg-zoth-brown" />
      <Skeleton className="h-[72px] w-full bg-zoth-brown" />
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

  return (
    <section aria-label={data.title} className="space-y-5">
      <div>
        <div className="flex items-end justify-between gap-4">
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
          value={clampPercent(data.progress)}
          aria-label="Sale progress"
          className="mt-5 h-1.5 bg-zoth-border"
        />
        <div className="mt-2 flex justify-between text-[11px] text-zoth-text-muted">
          <span>{formatUsd(data.totalSale)}</span>
          <span>Target: {formatCompactUsd(data.target)}</span>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {data.allocations.map((a) => (
          <li key={a.label} className="border border-zoth-border bg-zoth-brown-dark/70 p-3">
            <div className="flex items-center justify-between text-[11px]">
              <span>{a.label}</span>
              <span className="text-zoth-orange">{a.subscription.toFixed(2)}x</span>
            </div>
            <Progress
              value={clampPercent(a.progress)}
              aria-label={`${a.label} progress`}
              className="mt-3 h-1 bg-zoth-border"
            />
            <div className="mt-2 flex justify-between text-[10px] text-zoth-text-muted">
              <span>{formatUsd(a.raised)}</span>
              <span>{formatCompactUsd(a.cap)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="border border-zoth-border bg-black p-4">
        <p className="text-xs text-zoth-text-muted">Round Size</p>
        <p className="mt-1 text-2xl font-medium">{formatUsd(data.roundSize)}</p>
      </div>

      <div className="flex flex-col gap-4 border border-zoth-border bg-zoth-brown-dark/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 size-4 text-zoth-muted" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium">Closes in</p>
            <p className="mt-0.5 text-[11px] text-zoth-text-muted">Subscription window ends soon</p>
          </div>
        </div>
        <Countdown closesAt={data.closesAt} />
      </div>
    </section>
  )
}
