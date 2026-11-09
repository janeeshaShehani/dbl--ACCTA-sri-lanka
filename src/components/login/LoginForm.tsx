"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="bg-accta-surface px-5 py-12 md:py-20">
      <div className="mx-auto max-w-lg rounded-md border border-accta-border border-t-4 border-t-accta-maroon bg-white p-6 shadow-sm sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accta-surface text-accta-maroon">
          <LockKeyhole aria-hidden="true" size={24} />
        </div>
        <p className="mt-6 text-xs font-bold tracking-[0.18em] text-accta-maroon">ACCTA SRI LANKA</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-accta-navy">Member login</h1>
        <p id="login-availability" className="mt-4 text-sm leading-6 text-accta-muted">
          Member login is not available yet. You can explore membership information or contact ACCTA for assistance.
        </p>

        {/* The preview never sends or stores credentials; authentication is outside this release. */}
        <form onSubmit={(event) => event.preventDefault()} aria-describedby="login-availability" className="mt-8 space-y-5">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-accta-ink">Email address</label>
            <input id="login-email" type="email" autoComplete="username" placeholder="you@example.com" className="min-h-11 w-full rounded border border-accta-border px-4 py-3 text-base" />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-accta-ink">Password</label>
            <div className="relative">
              <input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" className="min-h-11 w-full rounded border border-accta-border py-3 pr-14 pl-4 text-base" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded text-accta-muted hover:text-accta-maroon">
                {showPassword ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <label className="flex min-h-11 items-center gap-2 text-accta-muted"><input type="checkbox" disabled className="h-4 w-4" /> Remember me</label>
            <button type="button" disabled className="min-h-11 cursor-not-allowed text-accta-muted" title="Password reset will be available when member login opens">Forgot password?</button>
          </div>
          <button type="submit" disabled className="min-h-12 w-full cursor-not-allowed rounded bg-accta-maroon/70 px-5 py-3 font-semibold text-white">Sign in</button>
          <p className="text-center text-xs leading-5 text-accta-muted">Sign-in and password reset will be enabled when member access opens.</p>
        </form>
        <div className="mt-8 border-t border-accta-border pt-6 text-center text-sm leading-6">
          <p className="text-accta-muted">Interested in joining ACCTA?</p>
          <Link href="/membership" className="inline-block py-2 font-semibold text-accta-maroon underline underline-offset-4">Explore membership</Link>
          <p><Link href="/contact" className="inline-block py-2 text-accta-navy underline underline-offset-4">Contact ACCTA</Link></p>
        </div>
      </div>
    </section>
  );
}
