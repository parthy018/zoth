"use client"

import { useQuery } from "@tanstack/react-query"
import { saleSchema, type Sale } from "@/lib/sale-schema"

async function fetchSale(): Promise<Sale> {
  const res = await fetch("/api/sale")
  if (!res.ok) throw new Error(`Failed to load sale data (${res.status})`)
  return saleSchema.parse(await res.json())
}

export function useSale() {
  return useQuery({
    queryKey: ["sale"],
    queryFn: fetchSale,
    staleTime: 4_000,
    refetchInterval: 8_000, // Polls every 8s to reflect simulated real-time activity
    refetchIntervalInBackground: false,
  })
}


