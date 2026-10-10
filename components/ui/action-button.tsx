import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CornerTicks } from "@/components/ui/corner-ticks"
import { cn } from "@/lib/utils"

const actionButton = cva(
  "group/ab relative isolate inline-flex h-[39px] min-w-[148px] items-center justify-center overflow-hidden px-8 text-[14.7px] font-medium leading-none tracking-[-0.18px] whitespace-nowrap text-white transition-colors disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-zoth-orange dotted-orange",
        outline:
          "border border-zoth-orange bg-transparent hover:border-white hover:bg-white/5",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", block: false },
  }
)

type ActionButtonProps = React.ComponentProps<"button"> & VariantProps<typeof actionButton>

export function ActionButton({ className, variant, block, children, ...props }: ActionButtonProps) {
  return (
    <button type="button" className={cn(actionButton({ variant, block }), className)} {...props}>
      {variant !== "outline" && (
        <span
          aria-hidden="true"
          className="dotted-orange absolute inset-0 -z-10 origin-bottom translate-y-full bg-zoth-orange-hover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover/ab:translate-y-0"
        />
      )}
      {variant === "outline" && <CornerTicks size={6} />}
      <span className="relative">{children}</span>
    </button>
  )
}
