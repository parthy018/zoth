import Image from "next/image"
import Link from "next/link"

const links = [
  { label: "Smart-Contract Audit", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Risk Disclosure", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-zoth-border bg-black">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-6 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 xl:px-[72px] 2xl:px-[96px]">
        <Link href="/" aria-label="Zoth home" className="inline-flex">
          <Image
            src="/images/brand/zoth-logo-horizontal.svg"
            alt="Zoth"
            width={111}
            height={35}
            className="h-[31px] w-[98px]"
          />
        </Link>
        <nav aria-label="Legal">
          <ul className="flex flex-col gap-3 sm:flex-row sm:gap-10">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-xs text-zoth-text-muted transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-zoth-text-muted">© 2026 ZOTH. All rights reserved.</p>
      </div>
    </footer>
  )
}
