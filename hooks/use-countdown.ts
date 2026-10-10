"use client"

import { useEffect, useState } from "react"

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  ready: boolean
  done: boolean
}

const EMPTY: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0, ready: false, done: false }

function derive(target: number, now: number): Countdown {
  const total = Math.max(0, Math.floor((target - now) / 1000))
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
    ready: true,
    done: total === 0,
  }
}

export function useCountdown(targetISO?: string): Countdown {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => setNow(Date.now())
    const first = setTimeout(tick, 0)
    const id = setInterval(tick, 1000)
    document.addEventListener("visibilitychange", tick)

    return () => {
      clearTimeout(first)
      clearInterval(id)
      document.removeEventListener("visibilitychange", tick)
    }
  }, [])

  const target = targetISO ? new Date(targetISO).getTime() : NaN
  if (now === null || Number.isNaN(target)) return EMPTY
  return derive(target, now)
}
