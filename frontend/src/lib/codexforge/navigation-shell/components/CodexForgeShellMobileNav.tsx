import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeNavigationRoute } from "../navigation-shell-types";

export function CodexForgeShellMobileNav({
  routes,
  activeHref,
}: {
  routes: readonly CodexForgeNavigationRoute[];
  activeHref: string;
}) {
  return (
    <>
      <style>{`
        @media (min-width: 860px) {
          [data-codexforge-shell-mobile-nav] {
            display: none !important;
          }
        }
      `}</style>
      <details
        data-codexforge-shell-mobile-nav="CodexForgeShellMobileNav renders responsive command-deck navigation only on compact screens; desktop shell avoids duplicate top Routes clutter"
        style={details}
      >
        <summary style={summary}>Routes</summary>
        <nav aria-label="CodexForge mobile navigation" style={nav}>
          {routes.map((route) => (
            <Link
              key={`mobile-${route.href}`}
              href={route.href}
              aria-current={route.href === activeHref ? "page" : undefined}
              style={route.href === activeHref ? activeLink : link}
            >
              {route.shortLabel}
            </Link>
          ))}
        </nav>
      </details>
    </>
  );
}

const details: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(255,255,255,0.035)",
  borderRadius: 8,
  color: "#f8fafc",
  minWidth: 0,
  padding: 10,
};

const summary: CSSProperties = {
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 900,
  lineHeight: 1.25,
};

const nav: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  marginTop: 10,
  minWidth: 0,
};

const linkBase: CSSProperties = {
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 820,
  lineHeight: 1.2,
  maxWidth: "100%",
  minWidth: 0,
  overflowWrap: "anywhere",
  padding: "7px 9px",
  textDecoration: "none",
};

const link: CSSProperties = {
  ...linkBase,
  border: "1px solid rgba(148,163,184,0.13)",
  color: "#cbd5e1",
};

const activeLink: CSSProperties = {
  ...linkBase,
  border: "1px solid rgba(45,212,191,0.25)",
  background: "rgba(20,184,166,0.12)",
  color: "#ccfbf1",
};
