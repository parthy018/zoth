import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { CornerTicks } from "@/components/ui/corner-ticks"
import { ActionButton } from "@/components/ui/action-button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ConnectDialog } from "@/components/wallet/connect-dialog"

const links = [
  { label: "Home", href: "#top" },
  { label: "Tokenomics", href: "#sale-details" },
  { label: "Docs", href: "https://docs.zoth.io/zoth/" },
  { label: "Blogs", href: "https://www.zoth.io/blog" },
]

export function Navbar() {
  return (
    <header className="relative z-60 w-full py-3 lg:py-4">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-4 px-6 sm:px-8 lg:px-12 xl:px-18 2xl:px-24">
        <Link href="/" aria-label="Zoth home" className="inline-flex shrink-0">
          <Image
            src="/images/brand/zoth-logo-horizontal.svg"
            alt="Zoth"
            width={111}
            height={35}
            priority
            className="h-7.75 w-24.5 md:h-8.75 md:w-27.75"
          />
        </Link>

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="relative p-0.75">
            <CornerTicks size={7} />
            <nav
              aria-label="Primary"
              className="flex h-10 items-center border border-zoth-border/40 bg-zoth-brown p-2.5"
            >
              <ul className="flex items-center gap-8 xl:gap-11">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[13.97px] leading-tight tracking-[-0.28px] whitespace-nowrap text-white transition-colors hover:text-white/70"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ConnectDialog kind="sonar">
            <ActionButton variant="outline">Connect Sonar</ActionButton>
          </ConnectDialog>
          <ConnectDialog kind="wallet">
            <ActionButton>Connect Wallet</ActionButton>
          </ConnectDialog>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="relative flex size-8.25 items-center justify-center bg-zoth-orange transition-opacity hover:opacity-90 md:hidden"
            >
              <Menu className="size-3.75" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(320px,100vw)] border-l border-zoth-accent-border bg-zoth-brown-dark p-6"
          >
            <div className="flex items-center pr-8">
              <Image
                src="/images/brand/zoth-logo-horizontal.svg"
                alt="Zoth"
                width={90}
                height={28}
                className="h-7 w-auto"
              />
            </div>
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <nav aria-label="Mobile" className="mt-6">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.label} className="border-b border-zoth-border">
                    <a href={l.href} className="block py-4 text-base text-white hover:text-white/70">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <ConnectDialog kind="sonar">
                <ActionButton variant="outline" block>
                  Connect Sonar
                </ActionButton>
              </ConnectDialog>
              <ConnectDialog kind="wallet">
                <ActionButton block>Connect Wallet</ActionButton>
              </ConnectDialog>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
