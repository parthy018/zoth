"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { useAnimate, useReducedMotion } from "framer-motion"

const partners = [
  { name: "Borderless", src: "/images/partners/borderless.svg", w: 120 },
  { name: "Taisu Ventures", src: "/images/partners/taisu.svg", w: 100 },
  { name: "Blockchain Founders Fund", src: "/images/partners/BFF.svg", w: 120 },
  { name: "Chainlink", src: "/images/partners/chainlink.svg", w: 100 },
  { name: "Coinbase", src: "/images/partners/coinbase.svg", w: 110 },
  { name: "Singularity", src: "/images/partners/singularity.svg", w: 120 },
  { name: "SOSV", src: "/images/partners/SOSV.svg", w: 90 },
]

export function PartnersStrip() {
  const shouldReduceMotion = useReducedMotion()
  const [scope, animate] = useAnimate()
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null)

  // Quadruple the list to seamlessly loop across all screen sizes without gaps
  const displayPartners = shouldReduceMotion
    ? partners
    : [...partners, ...partners, ...partners, ...partners]

  useEffect(() => {
    if (shouldReduceMotion || !scope.current) return

    controlsRef.current = animate(
      scope.current,
      { x: ["0%", "-50%"] },
      {
        duration: 48,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      }
    )

    return () => {
      controlsRef.current?.stop()
    }
  }, [animate, scope, shouldReduceMotion])

  return (
    <section
      aria-label="Partners and backers"
      className="border-y border-zoth-border bg-zoth-brown-dark"
    >
      <div className="mx-auto w-full max-w-[1920px] px-6 sm:px-8 lg:px-12 xl:px-18 2xl:px-24">
        <div className="relative flex items-stretch gap-6">
          <div className="relative flex shrink-0 items-center border-x border-zoth-accent-border px-5 py-3">
            <p className="text-[11px] leading-tight font-medium tracking-[0.08em] text-zoth-text-muted uppercase">
              Partners
              <br />
              &amp; Backers
            </p>
          </div>

          <div
            className={`relative flex min-h-18 flex-1 items-center overflow-hidden ${
              shouldReduceMotion
                ? "overflow-x-auto snap-x scrollbar-none"
                : "mask-[linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]"
            }`}
          >
            <ul
              ref={scope}
              onMouseEnter={() => controlsRef.current?.pause()}
              onMouseLeave={() => controlsRef.current?.play()}
              className="flex w-max items-center"
            >
              {displayPartners.map((p, idx) => (
                <li
                  key={`${p.name}-${idx}`}
                  className="flex h-18 min-w-37.5 shrink-0 items-center justify-center px-6 sm:min-w-42.5"
                >
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={p.w}
                    height={40}
                    className="h-16 w-auto max-w-30 opacity-70 grayscale transition-opacity duration-300 hover:opacity-100"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
