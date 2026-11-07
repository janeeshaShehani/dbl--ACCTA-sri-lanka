"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Globe } from "lucide-react";

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Placeholder until the backend/contact email service is connected
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section className="bg-accta-surface py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5">
        {/* Main Contact Area */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
              CONTACT INFORMATION
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
              Get in touch with ACCTA
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-accta-muted">
              Contact the Association for general enquiries or for guidance
              about membership, qualifications and professional activities.
            </p>

            <div className="mt-8 space-y-4">
              {/* Phone */}
              <div className="flex gap-4 rounded-md border border-accta-border bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accta-surface text-accta-maroon">
                  <Phone size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-accta-navy">
                    Telephone
                  </h3>

                  <a
                    href="tel:+94777148839"
                    className="mt-1 block text-sm text-accta-muted transition hover:text-accta-maroon"
                  >
                    +94 777 148 839
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 rounded-md border border-accta-border bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accta-surface text-accta-maroon">
                  <Mail size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-accta-navy">
                    Email
                  </h3>

                  <a
                    href="mailto:info@acctasl.com"
                    className="mt-1 block text-sm text-accta-muted transition hover:text-accta-maroon"
                  >
                    info@acctasl.com
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex gap-4 rounded-md border border-accta-border bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accta-surface text-accta-maroon">
                  <Globe size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-accta-navy">
                    Website
                  </h3>

                  <a
                    href="https://acctasl.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm text-accta-muted transition hover:text-accta-maroon"
                  >
                    acctasl.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 rounded-md border border-accta-border bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accta-surface text-accta-maroon">
                  <MapPin size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-accta-navy">
                    Registered office
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-accta-muted">
                    ACCTA Sri Lanka
                    <br />
                    101, Olcott Mawatha,
                    <br />
                    Colombo 11, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4 rounded-md border border-accta-border bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accta-surface text-accta-maroon">
                  <Clock size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-accta-navy">
                    Office hours
                  </h3>

                  <p className="mt-1 text-sm text-accta-muted">
                    Monday to Friday · 9:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-md border border-accta-border bg-white p-6 md:p-8">
            <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
              SEND AN ENQUIRY
            </p>

            <h2 className="mt-3 font-serif text-2xl font-bold text-accta-navy">
              How can we help?
            </h2>

            <p className="mt-3 text-sm leading-6 text-accta-muted">
              Complete the form below and our team will respond to your enquiry.
            </p>

            {submitted && (
              <div className="mt-5 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                Thank you for contacting us. Your enquiry has been received.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-accta-ink">
                  Full name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded border border-accta-border px-4 py-3 text-sm outline-none transition focus:border-accta-maroon"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-accta-ink">
                  Email address
                </label>

                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded border border-accta-border px-4 py-3 text-sm outline-none transition focus:border-accta-maroon"
                />
              </div>

              {/* Enquiry Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-accta-ink">
                  Enquiry type
                </label>

                <select
                  required
                  defaultValue=""
                  className="w-full rounded border border-accta-border px-4 py-3 text-sm outline-none transition focus:border-accta-maroon"
                >
                  <option value="" disabled>
                    Select an enquiry type
                  </option>
                  <option>General enquiry</option>
                  <option>Membership</option>
                  <option>Qualification</option>
                  <option>CPD & Events</option>
                  <option>Professional conduct</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-accta-ink">
                  Message
                </label>

                <textarea
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded border border-accta-border px-4 py-3 text-sm outline-none transition focus:border-accta-maroon"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded bg-accta-maroon px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Send enquiry
              </button>
            </form>
          </div>
        </div>

        {/* Quick Enquiry Cards */}
        <div className="mt-16">
          <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
            QUICK LINKS
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
            Looking for something specific?
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            <article className="rounded-md border border-accta-border bg-white p-6">
              <h3 className="font-serif text-xl font-bold text-accta-navy">
                Membership
              </h3>

              <p className="mt-3 text-sm leading-6 text-accta-muted">
                Get help with membership applications, renewals and member
                services.
              </p>
            </article>

            <article className="rounded-md border border-accta-border bg-white p-6">
              <h3 className="font-serif text-xl font-bold text-accta-navy">
                Qualification
              </h3>

              <p className="mt-3 text-sm leading-6 text-accta-muted">
                Ask about student registration, examinations and the CCTA
                qualification pathway.
              </p>
            </article>

            <article className="rounded-md border border-accta-border bg-white p-6">
              <h3 className="font-serif text-xl font-bold text-accta-navy">
                CPD & Events
              </h3>

              <p className="mt-3 text-sm leading-6 text-accta-muted">
                Get support with professional development records and upcoming
                ACCTA events.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}