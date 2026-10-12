import { NextResponse } from "next/server"
import { getSale } from "@/lib/sale-data"

const LATENCY_MS = 600

export async function GET(request: Request) {
  const shouldFail = new URL(request.url).searchParams.has("fail")

  await new Promise((resolve) => setTimeout(resolve, LATENCY_MS))

  if (shouldFail) {
    return NextResponse.json({ error: "Sale service unavailable" }, { status: 500 })
  }

  return NextResponse.json(getSale(), { headers: { "Cache-Control": "no-store" } })
}


