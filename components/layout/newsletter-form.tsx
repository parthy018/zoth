"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterForm() {
  const [email, setEmail] = useState("")

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) {
      toast.error("Enter a valid email address.")
      return
    }
    toast.success("Thanks for subscribing.")
    setEmail("")
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full max-w-[360px]">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-[42px] min-w-0 flex-1 border border-r-0 border-zoth-border bg-zoth-brown-dark px-3 text-xs text-white placeholder:text-zoth-muted focus-visible:outline-offset-0"
      />
      <button
        type="submit"
        className="h-[42px] shrink-0 bg-zoth-orange px-5 text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-zoth-orange-hover"
      >
        Subscribe
      </button>
    </form>
  )
}
