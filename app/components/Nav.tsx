"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Product", href: "/" },
  { label: "Why Camunda", href: "/" },
  { label: "Customers", href: "/" },
  { label: "Resources", href: "/" },
  { label: "Newsroom", href: "/press" },
  { label: "Events", href: "/events" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          CAMUNDA
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-[#A0A0A0] transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-[#A0A0A0] transition-colors hover:text-white"
              >
                {l.label}
              </a>
            )
          )}
        </div>

        {/* CTA */}
        <a
          href="/#cta"
          className="hidden rounded-full bg-[#FF6314] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:inline-block"
        >
          Get a demo
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[#2A2A2A] px-6 pb-6 pt-4 md:hidden">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.label}
                href={l.href}
                className="block py-2 text-sm font-medium text-[#A0A0A0]"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="block py-2 text-sm font-medium text-[#A0A0A0]"
              >
                {l.label}
              </a>
            )
          )}
          <a
            href="/#cta"
            className="mt-4 inline-block rounded-full bg-[#FF6314] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Get a demo
          </a>
        </div>
      )}
    </nav>
  );
}
