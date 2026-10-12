"use client"

import { useCountdown } from "@/hooks/use-countdown"
import { pad2 } from "@/lib/format"

const UNITS = ["Days", "Hours", "Mins", "Secs"] as const

export function Countdown({ closesAt }: { closesAt: string }) {
  const { days, hours, minutes, seconds, ready, done } = useCountdown(closesAt)
  const values = [days, hours, minutes, seconds]

  return (
    <div>
      <p className="sr-only">
        {!ready
          ? "Loading countdown"
          : done
            ? "Sale closed"
            : `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds remaining`}
      </p>
      <div aria-hidden="true" className="flex items-center gap-1.5">
        {UNITS.map((unit, i) => (
          <div key={unit} className="flex items-center gap-1.5">
            <div className="flex h-[46px] min-w-[46px] flex-col items-center justify-center border border-zoth-accent-border bg-zoth-brown px-2">
              <span className="font-mono text-[15px] leading-none tabular-nums">
                {ready ? pad2(values[i]) : "--"}
              </span>
              <span className="mt-1 text-[8px] leading-none tracking-[0.1em] text-zoth-text-muted uppercase">
                {unit}
              </span>
            </div>
            {i < UNITS.length - 1 && <span className="text-zoth-muted">:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
