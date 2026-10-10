import { z } from "zod"

export const saleSchema = z.object({
  title: z.string(),
  token: z.object({ name: z.string(), symbol: z.string() }),
  status: z.enum(["upcoming", "live", "ended"]),
  totalSale: z.number().nonnegative(),
  target: z.number().positive(),
  roundSize: z.number().nonnegative(),
  subscription: z.number().nonnegative(),
  progress: z.number().min(0).max(100),
  closesAt: z.iso.datetime(),
  launchpad: z.string(),
  purchaseMethod: z.string(),
  applications: z.number().int().nonnegative(),
  hardCap: z.number().positive().nullable(),
  timeline: z.array(
    z.object({
      label: z.string(),
      date: z.string().nullable(),
      state: z.enum(["next", "upcoming"]),
    })
  ),
  readBeforeCommit: z.array(z.object({ label: z.string(), href: z.string() })),
})

export type Sale = z.infer<typeof saleSchema>
