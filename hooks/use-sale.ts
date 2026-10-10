"use client"

import { useQuery } from "@tanstack/react-query"
import { saleSchema, type Sale } from "@/lib/sale-schema"

async function fetchSale(): Promise<Sale> {
  const res = await fetch("/api/sale")
  if (!res.ok) throw new Error(`Failed to load sale data (${res.status})`)
  return saleSchema.parse(await res.json())
}

export function useSale() {
  return useQuery({ queryKey: ["sale"], queryFn: fetchSale })
}
