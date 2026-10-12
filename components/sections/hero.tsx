import { CornerTicks } from "@/components/ui/corner-ticks"
import { PositionPanel } from "@/components/sale/position-panel"
import { SaleCard } from "@/components/sale/sale-card"
import { Reveal } from "@/components/sections/reveal"

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/brand/herobg.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 bottom-0 -z-10 h-[calc(100%+5rem)] w-full object-cover object-top"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-1/3 -z-10 hidden size-[640px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,69,9,0.22),transparent_70%)] lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-[1920px] items-start gap-12 px-6 py-12 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12 lg:py-16 xl:px-[72px] 2xl:px-[96px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-12 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-zoth-border to-transparent lg:block"
        />
        <Reveal>
          <span className="relative inline-block px-3 py-1.5 text-[11px] font-medium tracking-[0.1em] text-zoth-orange uppercase">
            <span
              aria-hidden="true"
              className="absolute inset-0 border border-zoth-orange/60"
            />
            <CornerTicks size={5} />
            <span className="relative">IDO coming soon</span>
          </span>
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.25rem,8vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.02em]"
          >
            $ZOTH is coming
          </h1>
          <p className="mt-5 mb-8 max-w-[520px] text-[15px] leading-[1.4] text-zoth-text-muted">
            $ZOTH captures value across the Zoth ecosystem. Stake it to receive
            sZOTH and unlock better fees, rewards, and product benefits.
          </p>
          <SaleCard />
        </Reveal>

        <Reveal
          delay={0.1}
          className="w-full lg:max-w-[680px] lg:justify-self-end"
        >
          <PositionPanel />
        </Reveal>
      </div>
    </section>
  )
}
