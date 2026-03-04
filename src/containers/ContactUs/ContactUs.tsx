'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactUs() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40)
    return () => clearTimeout(t)
  }, [])

  const validate = () => {
    if (!name.trim()) return 'Please enter your name.'
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email.'
    if (!message.trim()) return 'Please enter a message.'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    const v = validate()
    if (v) {
      setErrorMsg(v)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        const data = await res.json().catch(() => null)
        setErrorMsg((data && data.error) || 'Failed to send message. Try again later.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again later.')
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  return (
    <main className="bg-white flex items-start justify-center text-black pt-15 md:py-30 px-4">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-2xl text-center"
      >
        <div className="mx-auto w-fit">
          <div className="h-1 w-14 rounded-md bg-gradient-to-r from-[#ABA7F9] to-[#4EE2C1] mb-4" aria-hidden />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ABA7F9] to-[#4EE2C1]">Us</span>
        </h1>

        <p className="mt-3 text-slate-500 max-w-xl mx-auto">Ready for a new amazing project? Get your free quote today!</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-4">
          <label className="sr-only" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a7bff]/30"
            required
            aria-required
          />

          <label className="sr-only" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a7bff]/30"
            required
            aria-required
          />

          <label className="sr-only" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm resize-y min-h-[10rem] focus:outline-none focus:ring-2 focus:ring-[#8a7bff]/30"
            required
            aria-required
          />

          {errorMsg ? (
            <div role="alert" className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-3 py-2 text-left">
              {errorMsg}
            </div>
          ) : null}

          {status === 'success' ? (
            <div role="status" className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2 text-left">
              We received your email and will get back to you as soon as possible. Thank you!
            </div>
          ) : null}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.995 }}
            disabled={status === 'sending'}
            className="mt-1 w-full rounded-lg px-4 py-3 font-semibold text-white bg-gradient-to-r from-[#ABA7F9] to-[#4EE2C1] shadow-lg disabled:opacity-70"
            aria-busy={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Submit'}
          </motion.button>
        </form>
      </motion.section>
    </main>
  )
}
