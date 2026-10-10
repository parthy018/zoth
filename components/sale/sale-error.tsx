"use client"

import { AlertTriangle } from "lucide-react"
import { ActionButton } from "@/components/ui/action-button"

export function SaleError({
  onRetry,
  className,
}: {
  onRetry: () => void
  className?: string
}) {
  return (
    <div
      role="alert"
      className={
        "flex flex-col items-center justify-center gap-4 border border-zoth-accent-border bg-zoth-brown-dark/80 p-8 text-center " +
        (className ?? "")
      }
    >
      <AlertTriangle className="size-6 text-zoth-orange" aria-hidden="true" />
      <div>
        <p className="font-medium">We could not load the sale data</p>
        <p className="mt-1 text-sm text-zoth-text-muted">Check your connection and try again.</p>
      </div>
      <ActionButton onClick={onRetry}>Retry</ActionButton>
    </div>
  )
}
