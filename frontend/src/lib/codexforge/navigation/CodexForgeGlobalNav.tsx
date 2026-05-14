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
  const primaryRoutes = CODEXFORGE_ROUTES.filter(
    (route) => route.showInGlobalNav && route.priority === "primary"
  );
  const secondaryRoutes = CODEXFORGE_ROUTES.filter(
    (route) => route.showInGlobalNav && route.priority === "secondary"
  );

  function renderRoutePill(route: (typeof CODEXFORGE_ROUTES)[number]) {
    const active = activeRoute?.path === route.path;

    return (
      <Link
        key={route.path}
        href={route.path}
        title={route.description}
        aria-current={active ? "page" : undefined}
        style={active ? activeRoutePill : routePill}
      >
        <span style={routeLabel}>{compact ? route.shortLabel : route.label}</span>
      </Link>
    );
  }

  return (
    <nav
      aria-label="CodexForge global navigation"
      data-codexforge-global-nav
      style={{
        ...navShell,
        padding: compact ? "8px 10px" : "10px 12px",
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
        <div aria-label="Primary CodexForge routes" style={primaryRouteGroup}>
          {primaryRoutes.map(renderRoutePill)}
        </div>
        <span aria-hidden="true" style={routeDivider} />
        <div aria-label="Secondary CodexForge routes" style={secondaryRouteGroup}>
          {secondaryRoutes.map(renderRoutePill)}
        </div>
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
  gap: 8,
  flexWrap: "wrap",
  borderRadius: 10,
  border: "1px solid rgba(148,163,184,0.16)",
  background:
    "linear-gradient(135deg, rgba(8,13,28,0.88), rgba(15,23,42,0.58)), rgba(2,6,23,0.72)",
  boxShadow: "0 14px 58px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.045)",
  backdropFilter: "blur(16px)",
  color: "white",
  fontFamily:
    'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  ...safeText,
};

const brandLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  color: "white",
  textDecoration: "none",
  minWidth: "max-content",
  flex: "0 0 auto",
};

const brandMark: CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: 7,
  flex: "0 0 auto",
  background:
    "linear-gradient(135deg, rgba(99,102,241,0.92), rgba(20,184,166,0.84))",
  boxShadow: "0 8px 28px rgba(45,212,191,0.14)",
};

const brandText: CSSProperties = {
  display: "grid",
  gap: 2,
  lineHeight: 1.1,
  ...safeText,
};

const brandTitle: CSSProperties = {
  fontSize: 13,
  fontWeight: 760,
  letterSpacing: 0,
  ...safeText,
};

const brandSubtitle: CSSProperties = {
  fontSize: 10,
  opacity: 0.58,
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

const routeGroupBase: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  flexWrap: "wrap",
  minWidth: 0,
  maxWidth: "100%",
};

const primaryRouteGroup: CSSProperties = {
  ...routeGroupBase,
  flex: "0 1 auto",
};

const secondaryRouteGroup: CSSProperties = {
  ...routeGroupBase,
  flex: "0 1 auto",
};

const routeDivider: CSSProperties = {
  width: 1,
  height: 18,
  flex: "0 0 auto",
  background: "rgba(148,163,184,0.16)",
};

const routePillBase: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  minWidth: 0,
  maxWidth: "100%",
  minHeight: 26,
  padding: "4px 8px",
  borderRadius: 999,
  textDecoration: "none",
  fontSize: 12,
  lineHeight: 1.15,
  fontWeight: 620,
  border: "1px solid transparent",
  transition:
    "border-color 160ms ease, background 160ms ease, color 160ms ease, box-shadow 160ms ease",
  ...safeText,
};

const routePill: CSSProperties = {
  ...routePillBase,
  color: "rgba(226,232,240,0.74)",
  background: "rgba(255,255,255,0.025)",
};

const activeRoutePill: CSSProperties = {
  ...routePillBase,
  color: "white",
  border: "1px solid rgba(45,212,191,0.38)",
  background:
    "linear-gradient(135deg, rgba(14,165,233,0.18), rgba(20,184,166,0.12))",
  boxShadow: "0 0 0 1px rgba(45,212,191,0.06), 0 8px 28px rgba(20,184,166,0.10)",
};

const routeLabel: CSSProperties = {
  ...safeText,
};

const statusPill: CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(45,212,191,0.055)",
  color: "rgba(204,251,241,0.76)",
  fontSize: 10,
  fontWeight: 620,
  letterSpacing: 0,
  flex: "0 1 auto",
  ...safeText,
};
