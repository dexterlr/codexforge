"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { CODEXFORGE_ROUTES, getCodexForgeRoute } from "./codexforge-routes";

type CodexForgeGlobalNavProps = {
  compact?: boolean;
};

export function CodexForgeGlobalNav({ compact = false }: CodexForgeGlobalNavProps) {
  const pathname = usePathname() ?? "/";
  const activeRoute = getCodexForgeRoute(pathname);

  return (
    <nav
      aria-label="CodexForge global navigation"
      data-codexforge-global-nav
      style={{
        ...navShell,
        padding: compact ? "10px 12px" : "12px 14px",
      }}
    >
      <Link href="/" style={brandLink} aria-label="CodexForge home">
        <span aria-hidden="true" style={brandMark} />
        <span style={brandText}>
          <span style={brandTitle}>CodexForge</span>
          <span style={brandSubtitle}>AI operating system</span>
        </span>
      </Link>

      <div style={routeWrap}>
        {CODEXFORGE_ROUTES.map((route) => {
          const active = activeRoute?.path === route.path;

          return (
            <Link
              key={route.path}
              href={route.path}
              title={`${route.group}: ${route.description}`}
              aria-current={active ? "page" : undefined}
              style={active ? activeRoutePill : routePill}
            >
              <span style={routeLabel}>{compact ? route.shortLabel : route.label}</span>
              <span style={groupLabel}>{route.group}</span>
            </Link>
          );
        })}
      </div>

      <div style={statusPill}>local-first / preview-safe / approval-gated</div>
    </nav>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const navShell: CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  borderRadius: 14,
  border: "1px solid rgba(148,163,184,0.18)",
  background:
    "linear-gradient(135deg, rgba(8,13,28,0.86), rgba(15,23,42,0.62)), rgba(2,6,23,0.72)",
  boxShadow: "0 18px 70px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)",
  backdropFilter: "blur(14px)",
  color: "white",
  ...safeText,
};

const brandLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  color: "white",
  textDecoration: "none",
  minWidth: 0,
};

const brandMark: CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 10,
  flex: "0 0 auto",
  background:
    "linear-gradient(135deg, rgba(99,102,241,0.98), rgba(20,184,166,0.90))",
  boxShadow: "0 10px 34px rgba(45,212,191,0.16)",
};

const brandText: CSSProperties = {
  display: "grid",
  gap: 2,
  lineHeight: 1.1,
  ...safeText,
};

const brandTitle: CSSProperties = {
  fontSize: 15,
  fontWeight: 950,
  letterSpacing: 0,
  ...safeText,
};

const brandSubtitle: CSSProperties = {
  fontSize: 11,
  opacity: 0.72,
  ...safeText,
};

const routeWrap: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  flexWrap: "wrap",
  flex: "1 1 520px",
  minWidth: 0,
  maxWidth: "100%",
};

const routePillBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  minWidth: 0,
  maxWidth: "100%",
  padding: "8px 10px",
  borderRadius: 999,
  textDecoration: "none",
  fontSize: 12,
  fontWeight: 850,
  border: "1px solid rgba(255,255,255,0.12)",
  transition: "border-color 160ms ease, background 160ms ease, color 160ms ease",
  ...safeText,
};

const routePill: CSSProperties = {
  ...routePillBase,
  color: "rgba(226,232,240,0.88)",
  background: "rgba(255,255,255,0.045)",
};

const activeRoutePill: CSSProperties = {
  ...routePillBase,
  color: "white",
  border: "1px solid rgba(45,212,191,0.42)",
  background:
    "linear-gradient(135deg, rgba(99,102,241,0.34), rgba(20,184,166,0.22))",
  boxShadow: "0 0 0 1px rgba(45,212,191,0.08), 0 12px 38px rgba(20,184,166,0.10)",
};

const routeLabel: CSSProperties = {
  ...safeText,
};

const groupLabel: CSSProperties = {
  padding: "2px 6px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.07)",
  color: "rgba(226,232,240,0.68)",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: 0,
  ...safeText,
};

const statusPill: CSSProperties = {
  padding: "7px 9px",
  borderRadius: 999,
  border: "1px solid rgba(45,212,191,0.24)",
  background: "rgba(45,212,191,0.08)",
  color: "rgba(204,251,241,0.92)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: 0,
  ...safeText,
};
