"use client"

import { useState } from "react"
import { ArrowRight, X } from "lucide-react"

export function TopBanner() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  const close = (
    <button
      type="button"
      aria-label="Close announcement"
      onClick={() => setOpen(false)}
      className="flex size-8 shrink-0 items-center justify-center text-white/90 transition-opacity hover:opacity-70"
    >
      <X className="size-3.5" aria-hidden="true" />
    </button>
  )

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative z-[70] flex min-h-[59px] items-center bg-zoth-orange px-4 md:px-[34px]"
    >
      <div className="hidden md:block">{close}</div>
      <p className="flex min-w-0 flex-1 items-center justify-between gap-2 text-[15px] leading-[21px] md:justify-center md:gap-3">
        <span>IDO Soon.</span>
        <a
          href="#sale-details"
          className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-base underline underline-offset-2 transition-opacity hover:opacity-90"
        >
          Read more
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </p>
      <div className="md:hidden">{close}</div>
    </div>
  )
}
