import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { TopBanner } from "@/components/layout/top-banner"
import { Hero } from "@/components/sections/hero"
import { PartnersStrip } from "@/components/sections/partners-strip"
import { SaleDetails } from "@/components/sections/sale-details"

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-70">
        <TopBanner />
      </div>
      <Navbar />
      <main id="main" className="overflow-x-clip bg-black">
        <Hero />
        <PartnersStrip />
        <SaleDetails />
      </main>
      <Footer />
    </>
  )
}
