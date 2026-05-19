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
  const dedupedRoutes = routes.filter(
    (route, index, allRoutes) => allRoutes.findIndex((candidate) => candidate.href === route.href) === index
  );

  return (
    <nav
      aria-label="CodexForge route switcher"
      data-codexforge-route-switcher="CodexForgeRouteSwitcher renders AI Workspace Brain Files Stabilization dedupes route entries by href"
      style={wrap}
    >
      {dedupedRoutes.map((route) => {
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
  gap: 5,
  justifyContent: "flex-end",
  maxHeight: 76,
  minWidth: 0,
  width: "100%",
  overflowY: "auto",
};

const baseLink: CSSProperties = {
  alignItems: "center",
  borderRadius: 8,
  display: "inline-flex",
  fontSize: 12,
  fontWeight: 850,
  lineHeight: 1.2,
  minHeight: 28,
  maxWidth: 96,
  padding: "5px 8px",
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
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
