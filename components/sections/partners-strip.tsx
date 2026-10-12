import Image from "next/image"
import { CornerTicks } from "@/components/ui/corner-ticks"

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
  return (
    <section
      aria-label="Partners and backers"
      className="border-y border-zoth-border bg-zoth-brown-dark"
    >
      <div className="mx-auto w-full max-w-[1920px] px-6 sm:px-8 lg:px-12 xl:px-18 2xl:px-24">
        <div className="relative flex items-stretch gap-6">
          <CornerTicks size={8} className="-my-0.75" />
          <div className="relative my-3 flex shrink-0 items-center px-5 py-2">
            <CornerTicks size={6} />
            <p className="text-[11px] leading-tight font-medium tracking-[0.08em] text-zoth-text-muted uppercase">
              Partners
              <br />
              &amp; Backers
            </p>
          </div>
          <ul className="flex min-h-18 flex-1 snap-x snap-mandatory items-center gap-0 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
            {partners.map((p) => (
              <li
                key={p.name}
                className="flex h-full min-w-37.5 flex-1 snap-start items-center justify-center border-l border-zoth-border px-6 first:border-l-0 sm:min-w-42.5"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={p.w}
                  height={40}
                  className="h-8 w-auto max-w-30 opacity-70 grayscale transition-opacity duration-300 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
