"use client";

/**
 * Header – sticky top navigation bar.
 *
 * - Transparent on load, frosted-glass after scroll
 * - Desktop: logo + nav links + CTA button
 * - Mobile: logo + hamburger → MobileMenu overlay
 * - Active section tracked via IntersectionObserver (useActiveSection)
 * - Context Lock: scroll state and menu state are isolated from page rerenders
 */

import { useScrolled }       from "@/hooks/useScrolled";
import { useMobileMenu }     from "@/hooks/useMobileMenu";
import { useActiveSection }  from "@/hooks/useActiveSection";
import { MobileMenu }        from "./MobileMenu";
import { NavLink }           from "./NavLink";
import { NAV_ITEMS, CTA, SITE_NAME, SECTION_IDS } from "@/lib/constants";

/* ── Brand logomark ─────────────────────────────────────────────────────── */
function Logo() {
  return (
    <a
      href="/"
      className="header-logo"
      aria-label={`${SITE_NAME} – go to homepage`}
    >
      <span className="header-logo__mark" aria-hidden="true">N</span>
      <span className="header-logo__text">{SITE_NAME}</span>
    </a>
  );
}

/* ── Hamburger button ───────────────────────────────────────────────────── */
function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="header-hamburger"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <span className="header-hamburger__bar" aria-hidden="true" />
      <span className="header-hamburger__bar" aria-hidden="true" />
      <span className="header-hamburger__bar" aria-hidden="true" />
    </button>
  );
}

/* ── Root component ─────────────────────────────────────────────────────── */
export function Header() {
  const scrolled  = useScrolled(20);
  const { isOpen, toggle, close } = useMobileMenu();
  const activeId  = useActiveSection([...SECTION_IDS]);

  const navItems = [...NAV_ITEMS];

  return (
    <>
      <header
        role="banner"
        aria-label="Site header"
        className={[
          "site-header",
          scrolled ? "site-header--scrolled" : "",
        ].filter(Boolean).join(" ")}
      >
        <div className="container header-inner">
          {/* Brand */}
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Primary navigation" className="header-nav">
            <ul role="list" className="header-nav__list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    isActive={activeId === item.href.replace("#", "")}
                    className="header-nav__link"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="header-cta" aria-label="Call to action">
            <a
              href={CTA.secondary.href}
              className="btn btn-ghost btn-sm"
              aria-label={CTA.secondary.label}
            >
              {CTA.secondary.label}
            </a>
            <a
              href={CTA.primary.href}
              className="btn btn-primary btn-sm"
              aria-label={CTA.primary.label}
            >
              {CTA.primary.label}
            </a>
          </div>

          {/* Mobile hamburger */}
          <HamburgerButton isOpen={isOpen} onClick={toggle} />
        </div>
      </header>

      {/* Mobile menu overlay — rendered outside <header> to avoid stacking issues */}
      <MobileMenu
        isOpen={isOpen}
        onClose={close}
        navItems={navItems}
      />
    </>
  );
}
