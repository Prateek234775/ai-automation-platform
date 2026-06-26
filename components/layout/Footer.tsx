/**
 * Footer – full-bleed site footer.
 *
 * Sections:
 *   1. Brand column  – logo, tagline, social icons
 *   2. Link columns  – Product, Company, Legal
 *   3. Newsletter    – email input + subscribe CTA
 *   4. Bottom bar    – copyright, status
 *
 * SVG social icons use paths from the supplied public/svg assets.
 * No external icon library.
 */

import { SOCIAL_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

/* ─── Social icons (inline SVG from supplied assets) ─────────────────── */

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className="footer-social__icon">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className="footer-social__icon">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className="footer-social__icon">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/>
    </svg>
  );
}

/* ─── Brand logo ─────────────────────────────────────────────────────── */

function FooterLogo() {
  return (
    <a href="/" className="footer-brand__logo" aria-label={`${SITE_NAME} home`}>
      <span className="footer-brand__logo-mark" aria-hidden="true">N</span>
      <span className="footer-brand__logo-text">{SITE_NAME}</span>
    </a>
  );
}

/* ─── Link group ─────────────────────────────────────────────────────── */

interface FooterLink {
  label: string;
  href:  string;
  external?: boolean;
}

interface FooterLinkGroupProps {
  heading: string;
  links:   FooterLink[];
}

function FooterLinkGroup({ heading, links }: FooterLinkGroupProps) {
  return (
    <div className="footer-links">
      <h3 className="footer-links__heading">{heading}</h3>
      <ul role="list" className="footer-links__list">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="footer-links__item"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={link.external ? `${link.label} (opens in new tab)` : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Newsletter form ────────────────────────────────────────────────── */

function NewsletterForm() {
  return (
    <div className="footer-newsletter">
      <h3 className="footer-newsletter__heading">Stay in the loop</h3>
      <p className="footer-newsletter__desc">
        Product updates, AI automation insights, and early access to new features.
        No spam — unsubscribe any time.
      </p>

      {/* This form submits to a server action in production.
          Rendered as a plain HTML form so it works without JS. */}
      <form
        className="footer-newsletter__form"
        action="/api/newsletter"
        method="post"
        aria-label="Newsletter signup"
      >
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <div className="footer-newsletter__row">
          <input
            id="footer-email"
            type="email"
            name="email"
            className="footer-newsletter__input input"
            placeholder="you@company.com"
            required
            autoComplete="email"
            aria-required="true"
            aria-describedby="footer-email-hint"
          />
          <button
            type="submit"
            className="footer-newsletter__btn btn btn-primary btn-md"
            aria-label="Subscribe to newsletter"
          >
            Subscribe
          </button>
        </div>
        <p id="footer-email-hint" className="footer-newsletter__hint text-caption">
          By subscribing you agree to our{" "}
          <a href="/privacy" className="footer-newsletter__link">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
}

/* ─── Link data ──────────────────────────────────────────────────────── */

const PRODUCT_LINKS: FooterLink[] = [
  { label: "Features",      href: "#features"       },
  { label: "Pricing",       href: "#pricing"        },
  { label: "Integrations",  href: "/integrations"   },
  { label: "Changelog",     href: "/changelog"      },
  { label: "Roadmap",       href: "/roadmap"        },
  { label: "Documentation", href: "/docs"           },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About",     href: "/about"   },
  { label: "Blog",      href: "/blog"    },
  { label: "Careers",   href: "/careers" },
  { label: "Press",     href: "/press"   },
  { label: "Contact",   href: "/contact" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy",    href: "/privacy"     },
  { label: "Terms of Service",  href: "/terms"       },
  { label: "Cookie Policy",     href: "/cookies"     },
  { label: "Security",          href: "/security"    },
  { label: "SOC 2 Report",      href: "/soc2", external: true },
];

/* ─── Root component ─────────────────────────────────────────────────── */

// Build-time constant — avoids hydration mismatch from Date() differing
// between server render and client hydration.
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="site-footer"
    >
      {/* Top separator */}
      <div className="footer-separator" aria-hidden="true" />

      <div className="container">
        {/* ── Main grid ── */}
        <div className="footer-grid">

          {/* Brand + social */}
          <div className="footer-brand">
            <FooterLogo />

            <p className="footer-brand__tagline">
              {SITE_TAGLINE}
            </p>

            <nav
              aria-label="Social media links"
              className="footer-social"
            >
              <ul role="list" className="footer-social__list">
                <li>
                  <a
                    href={SOCIAL_LINKS.twitter}
                    className="footer-social__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on X (Twitter)"
                  >
                    <TwitterIcon />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.github}
                    className="footer-social__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View our GitHub organisation"
                  >
                    <GitHubIcon />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    className="footer-social__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect on LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                </li>
              </ul>
            </nav>

            {/* Status pill */}
            <a
              href="https://status.your-domain.com"
              className="footer-status"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="All systems operational — view status page"
            >
              <span className="footer-status__dot" aria-hidden="true" />
              All systems operational
            </a>
          </div>

          {/* Link columns */}
          <nav aria-label="Product links" className="footer-nav-col">
            <FooterLinkGroup heading="Product" links={PRODUCT_LINKS} />
          </nav>

          <nav aria-label="Company links" className="footer-nav-col">
            <FooterLinkGroup heading="Company" links={COMPANY_LINKS} />
          </nav>

          <nav aria-label="Legal links" className="footer-nav-col">
            <FooterLinkGroup heading="Legal" links={LEGAL_LINKS} />
          </nav>

          {/* Newsletter */}
          <div className="footer-newsletter-col">
            <NewsletterForm />
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p className="footer-bottom__copy text-caption">
            © {CURRENT_YEAR} {SITE_NAME}, Inc. All rights reserved.
          </p>

          <div className="footer-bottom__badges" aria-label="Compliance certifications">
            <span className="footer-badge">SOC 2 Type II</span>
            <span className="footer-badge">GDPR Ready</span>
            <span className="footer-badge">HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
