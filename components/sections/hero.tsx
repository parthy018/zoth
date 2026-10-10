import { CornerTicks } from "@/components/ui/corner-ticks"
import { PositionPanel } from "@/components/sale/position-panel"
import { SaleCard } from "@/components/sale/sale-card"
import { Reveal } from "@/components/sections/reveal"

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/brand/herobg.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 bottom-0 -z-10 h-[calc(100%+5rem)] w-full object-cover object-top"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-1/2 -z-10 hidden size-[640px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,69,9,0.22),transparent_70%)] lg:block"
      />

      <div className="mx-auto grid w-full max-w-[1920px] items-center gap-10 px-6 py-12 sm:px-8 lg:min-h-[640px] lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-16 xl:px-[72px] 2xl:px-[96px]">
        <Reveal className="lg:col-span-5">
          <span className="relative inline-block px-3 py-1.5 text-[11px] font-medium tracking-[0.1em] text-zoth-orange uppercase">
            <span aria-hidden="true" className="absolute inset-0 border border-zoth-orange/60" />
            <CornerTicks size={5} />
            <span className="relative">IDO coming soon</span>
          </span>
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.25rem,8vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.02em]"
          >
            $ZOTH is coming
          </h1>
          <p className="mt-5 max-w-[400px] text-[15px] leading-[1.4] text-zoth-text-muted">
            $ZOTH captures value across the Zoth ecosystem. Stake it to receive sZOTH and unlock
            better fees, rewards, and product benefits.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex w-full flex-col gap-4 lg:col-span-6 lg:col-start-7 lg:max-w-[640px] lg:justify-self-end">
          <SaleCard />
          <PositionPanel />
        </Reveal>
      </div>
    </section>
  )
}
