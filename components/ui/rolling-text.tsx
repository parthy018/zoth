import * as React from "react"
import { cn } from "@/lib/utils"

export interface RollingTextProps {
  text: string
  className?: string
}

export function RollingText({ text, className }: RollingTextProps) {
  const chars = React.useMemo(() => Array.from(text), [text])  //  gives charaters

  return (
    <span className={cn("relative inline-flex overflow-hidden py-0.5 -my-0.5 leading-none", className)}>
      {/* Primary layer: visible by default, slides up on button hover */}
      <span className="inline-flex">
        {chars.map((char, index) => (
          <span
            key={`char-1-${index}`}
            style={{ transitionDelay: `${index * 25}ms` }}
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-120%] motion-reduce:transform-none"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>

      {/* Duplicate layer: starts below, slides into place on button hover */}
      <span aria-hidden="true" className="absolute inset-0 inline-flex">
        {chars.map((char, index) => (
          <span
            key={`char-2-${index}`}
            style={{ transitionDelay: `${index * 25}ms` }}
            className="inline-block translate-y-[120%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:transform-none"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </span>
  )
}
