import Image from "next/image"
import { NewsletterForm } from "@/components/layout/newsletter-form"

const socials = [
  { label: "X", href: "https://x.com/zothdotio", icon: "twitter" },
  { label: "YouTube", href: "https://www.youtube.com/@zothdotio", icon: "youtube" },
  { label: "Discord", href: "https://discord.gg/yRyHeR9gfg", icon: "discord" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zoth-io/", icon: "linkedin" },
  { label: "Medium", href: "https://medium.com/@zoth.io", icon: "medium" },
]

const columns = [
  {
    title: "Company",
    links: [
      { label: "Docs", href: "https://docs.zoth.io/zoth/" },
      { label: "Blog", href: "https://www.zoth.io/blog" },
      { label: "Careers", href: "https://www.zoth.io/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Smart-Contract Audit", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Risk Disclosure", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-zoth-border bg-black">
      <div className="mx-auto w-full max-w-[1920px] px-6 pt-16 sm:px-8 lg:px-12 xl:px-[72px] 2xl:px-[96px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-24">
          <div className="max-w-[360px]">
            <p className="text-[13px] leading-5 text-white/50">
              Participate in the $ZOTH IDO on Sonar and help shape the Zoth ecosystem.
            </p>
            <ul className="mt-4 flex items-center gap-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="block opacity-75 transition-opacity hover:opacity-100"
                  >
                    <Image
                      src={`/images/social/${s.icon}.svg`}
                      alt=""
                      width={16}
                      height={16}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-12 sm:gap-24">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-[13px] font-medium tracking-[0.08em] text-white uppercase">
                  {col.title}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[13px] text-white/50 transition-colors hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <p className="max-w-[760px] text-[11px] leading-4 text-white/40">
            Participation in token sales involves risk, including the loss of capital. Nothing on
            this page is financial advice, and availability depends on your jurisdiction. Items marked
            to be confirmed are published once they are final.
          </p>
          <p className="shrink-0 text-[11px] text-white/40">© 2026 ZOTH. All rights reserved.</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-10 px-6 pb-[0.06em] text-left text-[31vw] leading-[0.85] font-bold tracking-[-0.04em] text-[#1a0a05] select-none sm:px-8 lg:px-12 xl:px-[72px] 2xl:px-[96px]"
      >
        <span className="text-zoth-orange">Z</span>OTH
      </p>
    </footer>
  )
}
