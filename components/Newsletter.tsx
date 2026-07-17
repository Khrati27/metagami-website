"use client";

import { useState } from "react";

export default function Newsletter() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData,
      }
    );

    setLoading(false);

    if (response.ok) {
      setSuccess(true);

      form.reset();

      setTimeout(() => {
        setSuccess(false);
      }, 3500);
    }
  }

  return (
    <section className="border-t border-metagami-border py-16 md:py-20 px-6">

      <div className="max-w-2xl mx-auto text-center">

        <p className="text-[10px] tracking-[0.45em] uppercase text-metagami-muted font-display">
          Newsletter
        </p>

        <h2 className="mt-4 text-3xl md:text-5xl font-display font-black uppercase tracking-tight">
          Stay Connected
        </h2>

        <p className="mt-5 text-sm text-metagami-muted leading-7 max-w-lg mx-auto">
          Receive exclusive releases, limited editions and architectural
          inspirations from Metagami Studio.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >

          <input
  type="hidden"
  name="access_key"
  value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
/>

          <input
            type="hidden"
            name="subject"
            value="Newsletter Subscription"
          />

          <input
            type="hidden"
            name="from_name"
            value="Metagami Studio"
          />

          <div className="border-t border-b border-metagami-border py-6">

            <div className="flex flex-col md:flex-row md:items-center gap-5">

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="
                  flex-1
                  bg-transparent
                  text-lg
                  md:text-xl
                  border-none
                  outline-none
                  placeholder:text-metagami-muted/40
                "
              />

              <button
                disabled={loading}
                className="
                  group
                  uppercase
                  tracking-[0.35em]
                  font-display
                  flex
                  items-center
                  justify-center
                  gap-3
                  hover:gap-5
                  transition-all
                  duration-300
                "
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Subscribe
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </>
                )}
              </button>

            </div>

          </div>

        </form>

        <div className="mt-5 h-6">

          {success && (

            <p className="text-green-600 text-sm tracking-[0.25em] uppercase">

              ✓ Thank you for subscribing.

            </p>

          )}

        </div>

        <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-metagami-muted">
          Exclusive releases. No unnecessary emails.
        </p>

      </div>

    </section>
  );
}