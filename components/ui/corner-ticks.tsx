import { cn } from "@/lib/utils"

const corners = [
  "left-0 top-0",
  "right-0 top-0",
  "bottom-0 left-0",
  "bottom-0 right-0",
] as const

export function CornerTicks({ className, size = 7 }: { className?: string; size?: number }) {
  return (
    <>
      {corners.map((pos) => (
        <span key={pos} aria-hidden="true" className={cn("pointer-events-none absolute", pos, className)}>
          <span
            className={cn(
              "absolute block bg-zoth-orange",
              pos.includes("top") ? "top-0" : "bottom-0",
              pos.includes("left") ? "left-0" : "right-0"
            )}
            style={{ width: 1, height: size }}
          />
          <span
            className={cn(
              "absolute block bg-zoth-orange",
              pos.includes("top") ? "top-0" : "bottom-0",
              pos.includes("left") ? "left-0" : "right-0"
            )}
            style={{ width: size, height: 1 }}
          />
        </span>
      ))}
    </>
  )
}
