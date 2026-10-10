"use client"

import type { ReactNode } from "react"
import { toast } from "sonner"
import {
  CircleDollarSign,
  Clock,
  Lock,
  Rocket,
  ShieldQuestion,
  Target,
  Users,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table"
import { SaleError } from "@/components/sale/sale-error"
import { Reveal } from "@/components/sections/reveal"
import { useCountdown } from "@/hooks/use-countdown"
import { useSale } from "@/hooks/use-sale"
import { formatNumber, formatUsd, pad2 } from "@/lib/format"
import type { Sale } from "@/lib/sale-schema"
import { cn } from "@/lib/utils"

function Timeline({ steps }: { steps: Sale["timeline"] }) {
  return (
    <ol aria-label="Token sale timeline" className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:gap-0">
      {steps.map((step, i) => {
        const active = step.state === "next"
        return (
          <li key={step.label} className="relative flex gap-4 sm:block">
            <div className="relative flex shrink-0 flex-col items-center sm:block">
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 block size-3 rounded-full border bg-black",
                  active ? "border-zoth-orange" : "border-zoth-accent-border"
                )}
              >
                {active && <span className="absolute inset-[2px] rounded-full bg-zoth-orange" />}
              </span>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-[5px] h-[calc(100%+1.5rem)] w-px bg-zoth-border sm:top-[5px] sm:left-3 sm:h-px sm:w-[calc(100%-12px)]"
                />
              )}
            </div>
            <div className="sm:mt-3">
              <p
                aria-hidden={!active}
                className={cn(
                  "mb-1 hidden h-3 text-[10px] leading-3 font-medium tracking-[0.1em] text-zoth-orange uppercase sm:block",
                  !active && "invisible"
                )}
              >
                Next
              </p>
              {active && <p className="sr-only sm:hidden">Next</p>}
              <p className="text-[13px] font-medium text-white">{step.label}</p>
              <p className="mt-0.5 text-[11px] text-zoth-text-muted">
                {step.date ?? "To be announced"}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function CountdownBoxes({ closesAt }: { closesAt: string }) {
  const { days, hours, minutes, seconds, ready, done } = useCountdown(closesAt)
  const parts = [days, hours, minutes, seconds]
  const labels = ["days", "hours", "minutes", "seconds"]

  return (
    <div className="flex items-center justify-end gap-1">
      <span className="sr-only">
        {!ready
          ? "Loading"
          : done
            ? "Sale closed"
            : `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`}
      </span>
      <div aria-hidden="true" className="flex gap-1">
        {parts.map((value, i) => (
          <span
            key={labels[i]}
            title={labels[i]}
            className="flex h-6 min-w-6 items-center justify-center border border-zoth-accent-border bg-zoth-brown px-1 font-mono text-[11px] tabular-nums"
          >
            {ready ? pad2(value) : "--"}
          </span>
        ))}
      </div>
    </div>
  )
}

function Row({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <TableRow className="h-11 border-zoth-border hover:bg-transparent">
      <TableCell className="px-0 text-[13px] text-zoth-text-muted">
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="text-zoth-muted [&_svg]:size-3.5">
            {icon}
          </span>
          {label}
        </span>
      </TableCell>
      <TableCell className="px-0 text-right text-[13px] text-white">{children}</TableCell>
    </TableRow>
  )
}

function DetailsTable({ sale }: { sale: Sale }) {
  return (
    <Table>
      <TableCaption className="sr-only">{sale.title} details</TableCaption>
      <TableBody>
        <Row icon={<Clock />} label="Closes in">
          <CountdownBoxes closesAt={sale.closesAt} />
        </Row>
        <Row icon={<Rocket />} label="Launchpad">
          {sale.launchpad}
        </Row>
        <Row icon={<CircleDollarSign />} label="Purchase method">
          {sale.purchaseMethod}
        </Row>
        <Row icon={<Users />} label="Applications">
          {formatNumber(sale.applications)}
        </Row>
        <Row icon={<Target />} label="Target">
          {formatUsd(sale.target)}
        </Row>
        <Row icon={<ShieldQuestion />} label="Hard cap">
          {sale.hardCap ? (
            formatUsd(sale.hardCap)
          ) : (
            <span className="text-zoth-text-muted">To be confirmed</span>
          )}
        </Row>
        <Row icon={<Lock />} label="Unlock period">
          <button
            type="button"
            onClick={() => toast.info("Unlock terms will be published once they are final.")}
            className="underline underline-offset-4 transition-colors hover:text-zoth-orange"
          >
            Show terms
          </button>
        </Row>
      </TableBody>
    </Table>
  )
}

function ReadBeforeCommit({ links }: { links: Sale["readBeforeCommit"] }) {
  return (
    <section
      aria-labelledby="rbc-title"
      className="border border-zoth-border bg-zoth-brown-dark/60 p-5"
    >
      <h3 id="rbc-title" className="text-[13px] font-medium text-white">
        Read before you commit
      </h3>
      <ul className="mt-3">
        {links.map((l) => (
          <li key={l.label} className="border-t border-zoth-border first:border-t-0">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-9 items-center justify-between text-[11px] text-zoth-text-muted transition-colors hover:text-white"
            >
              {l.label}
              <span className="underline underline-offset-4 group-hover:text-zoth-orange">
                View<span className="sr-only"> {l.label}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function DetailsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading sale details" className="space-y-6">
      <Skeleton className="h-14 w-full bg-zoth-brown" />
      <Skeleton className="h-[308px] w-full bg-zoth-brown" />
    </div>
  )
}

export function SaleDetails() {
  const { data, isPending, isError, refetch } = useSale()

  return (
    <section
      id="sale-details"
      aria-labelledby="details-title"
      className="mx-auto w-full max-w-[1920px] scroll-mt-24 px-6 py-16 sm:px-8 lg:px-12 lg:py-24 xl:px-[72px] 2xl:px-[96px]"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <h2
            id="details-title"
            className="text-[clamp(1.75rem,5vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.02em]"
          >
            Token sale details
          </h2>
          <p className="mt-4 max-w-[360px] text-[15px] leading-[1.4] text-zoth-text-muted">
            The terms of the $ZOTH IDO on Sonar. Items marked to be confirmed are published here
            once they are final.
          </p>
          <div className="mt-10">
            {data ? (
              <ReadBeforeCommit links={data.readBeforeCommit} />
            ) : (
              <Skeleton className="h-[160px] w-full bg-zoth-brown" />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          {isPending && <DetailsSkeleton />}
          {isError && <SaleError onRetry={() => refetch()} className="min-h-[300px]" />}
          {data && (
            <div className="space-y-10">
              <Timeline steps={data.timeline} />
              <DetailsTable sale={data} />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
