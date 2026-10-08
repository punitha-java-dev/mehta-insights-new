"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Program", href: "#program" },
  { label: "About", href: "#about" },
  { label: "FAQs", href: "#faqs" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [applicationCue, setApplicationCue] = useState(false);
  const [cuePulse, setCuePulse] = useState(false);

  useEffect(() => {
    function handleApplicationCue(event: Event) {
      const active = (event as CustomEvent<boolean>).detail;
      setApplicationCue(active);
      if (active) {
        setCuePulse(false);
        requestAnimationFrame(() => setCuePulse(true));
        window.setTimeout(() => setCuePulse(false), 850);
      } else {
        setCuePulse(false);
      }
    }
    window.addEventListener("about-application-cue", handleApplicationCue);
    return () => window.removeEventListener("about-application-cue", handleApplicationCue);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          aria-label="Mehta Insights home"
          className="brand"
          href="#home"
          onClick={closeMenu}
        >
          <Image
            alt="Mehta Insights — Chart to Trade"
            className="brand-logo"
            height={667}
            priority
            src="/images/mehta-insights-logo.png"
            style={{ height: "auto", objectFit: "contain" }}
            width={2000}
            sizes="(max-width: 760px) 160px, 205px"
          />
        </a>

        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className={`button button-dark header-cta${applicationCue ? " is-application-cued" : ""}${cuePulse ? " has-cue-pulse" : ""}`} href="#application">
          Apply for the Program <ArrowUpRight aria-hidden="true" size={16} />
        </a>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <nav aria-label="Mobile navigation" className="mobile-nav">
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a
            className={`mobile-nav-cta${applicationCue ? " is-application-cued" : ""}${cuePulse ? " has-cue-pulse" : ""}`}
            href="#application"
            onClick={closeMenu}
          >
            Apply for the Program <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}
