"use client"

import { useState, type ReactNode } from "react"
import { toast } from "sonner"
import { ActionButton } from "@/components/ui/action-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const COPY = {
  wallet: {
    title: "Connect Wallet",
    description:
      "Wallet connection is a placeholder in this demo. No real Web3 request is made.",
    toast: "Wallet connection is not available in this demo.",
  },
  sonar: {
    title: "Connect Sonar",
    description:
      "Sonar account linking is a placeholder in this demo. No real request is made.",
    toast: "Sonar connection is not available in this demo.",
  },
} as const

export function ConnectDialog({
  kind,
  children,
}: {
  kind: keyof typeof COPY
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const copy = COPY[kind]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border border-zoth-accent-border bg-zoth-brown-dark p-6 ring-0 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium text-white">{copy.title}</DialogTitle>
          <DialogDescription className="text-zoth-text-muted">{copy.description}</DialogDescription>
        </DialogHeader>

        <div className="border border-dashed border-zoth-border p-6 text-center text-sm text-zoth-muted">
          Placeholder content
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <ActionButton variant="outline" onClick={() => setOpen(false)}>
            Close
          </ActionButton>
          <ActionButton
            onClick={() => {
              toast.info(copy.toast)
              setOpen(false)
            }}
          >
            Continue
          </ActionButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

