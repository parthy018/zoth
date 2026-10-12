"use client"

import { useState } from "react"

const LETTERS = ["Z", "O", "T", "H"]

export function FooterWatermark() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <p
      aria-hidden="true"
      onMouseLeave={() => setHoveredIndex(null)}
      className="mt-10 flex px-6 pb-[0.06em] text-left text-[31vw] leading-[0.85] font-bold tracking-[-0.04em] select-none sm:px-8 lg:px-12 xl:px-18 2xl:px-24"
    >
      {LETTERS.map((char, index) => {
        const isHovered = hoveredIndex !== null
        const isDefaultOrange = index === 0
        const isLit = isHovered || isDefaultOrange

        // Calculate wave delay based on absolute distance from the hovered character
        const distance = isHovered ? Math.abs(index - hoveredIndex) : 0
        const delay = isHovered ? distance * 120 : 0

        return (
          <span
            key={char}
            onMouseEnter={() => setHoveredIndex(index)}
            style={{
              transitionDelay: `${delay}ms`,
            }}
            className={`cursor-default transition-all duration-400 ease-out ${
              isLit
                ? "text-zoth-orange drop-shadow-[0_0_35px_rgba(255,69,9,0.35)]"
                : "text-[#1a0a05]"
            } ${hoveredIndex === index ? "brightness-125" : ""}`}
          >
            {char}
          </span>
        )
      })}
    </p>
  )
}
