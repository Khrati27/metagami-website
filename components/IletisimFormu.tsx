"use client";

import { useState } from "react";

export default function IletisimFormu() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setResult("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!
    );

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      setResult("✓ Your message has been sent successfully.");
      form.reset();
    } else {
      setResult("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <input
        type="text"
        name="name"
        required
        placeholder="Your Name"
        className="
          w-full
          border
          border-metagami-border
          bg-transparent
          px-5
          py-4
          outline-none
          focus:border-black
          transition
        "
      />

      <input
        type="email"
        name="email"
        required
        placeholder="Your Email"
        className="
          w-full
          border
          border-metagami-border
          bg-transparent
          px-5
          py-4
          outline-none
          focus:border-black
          transition
        "
      />

      <textarea
        name="message"
        required
        rows={7}
        placeholder="Your Message"
        className="
          w-full
          border
          border-metagami-border
          bg-transparent
          px-5
          py-4
          resize-none
          outline-none
          focus:border-black
          transition
        "
      />

      {/* Honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
      />

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          border
          border-black
          py-5
          uppercase
          tracking-[0.35em]
          font-display
          transition-all
          duration-300
          hover:bg-black
          hover:text-white
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading ? "SENDING..." : "SEND MESSAGE"}
      </button>

      {result && (
        <p className="text-center text-sm">
          {result}
        </p>
      )}
    </form>
  );
}