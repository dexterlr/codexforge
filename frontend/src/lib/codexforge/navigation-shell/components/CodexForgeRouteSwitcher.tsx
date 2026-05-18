import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeNavigationRoute } from "../navigation-shell-types";

export function CodexForgeRouteSwitcher({
  routes,
  activeHref,
}: {
  routes: readonly CodexForgeNavigationRoute[];
  activeHref: string;
}) {
  return (
    <nav
      aria-label="CodexForge route switcher"
      data-codexforge-route-switcher="CodexForgeRouteSwitcher renders AI Workspace Brain Files Stabilization"
      style={wrap}
    >
      {routes.map((route) => {
        const active = route.href === activeHref;
        return (
          <Link
            key={route.href}
            href={route.href}
            title={route.description}
            aria-current={active ? "page" : undefined}
            style={active ? activeLink : link}
          >
            <span style={label}>{route.shortLabel}</span>
          </Link>
        );
      })}
    </nav>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const wrap: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  justifyContent: "flex-end",
  minWidth: 0,
};

const baseLink: CSSProperties = {
  alignItems: "center",
  borderRadius: 8,
  display: "inline-flex",
  fontSize: 12,
  fontWeight: 850,
  lineHeight: 1.2,
  minHeight: 30,
  padding: "6px 9px",
  textDecoration: "none",
  ...safeText,
};

const link: CSSProperties = {
  ...baseLink,
  background: "rgba(255,255,255,0.035)",
  border: "1px solid rgba(148,163,184,0.14)",
  color: "rgba(226,232,240,0.76)",
};

const activeLink: CSSProperties = {
  ...baseLink,
  background: "linear-gradient(135deg, rgba(20,184,166,0.18), rgba(14,165,233,0.12))",
  border: "1px solid rgba(45,212,191,0.35)",
  color: "#f8fafc",
};

const label: CSSProperties = {
  ...safeText,
};

