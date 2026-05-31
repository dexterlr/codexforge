import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeNavigationRoute, CodexForgeNavigationSection } from "../navigation-shell-types";
import { CodexForgeShellSafetyNotice } from "./CodexForgeShellSafetyNotice";

const PRIMARY_ROUTE_HREFS = [
  "/",
  "/start",
  "/code-flow",
  "/files",
  "/guarded-apply-mvp",
  "/validation-results",
  "/workflow-results",
  "/run-history",
  "/brain",
  "/demo",
] as const;

const SECONDARY_GROUP_LABELS: Record<string, string> = {
  Brain: "Governance",
  Memory: "Memory",
  Creative: "Creative",
  Audit: "Readiness",
  Advanced: "Admin",
  Build: "Runtime",
  Fix: "Runtime",
  Start: "Runtime",
};

export function CodexForgeSidebar({
  sections,
  activeHref,
  mode = "full",
  showBadges = true,
  showSafetyNotice = true,
}: {
  sections: readonly CodexForgeNavigationSection[];
  activeHref: string;
  mode?: "full" | "compact" | "collapsed";
  showBadges?: boolean;
  showSafetyNotice?: boolean;
}) {
  const compact = mode !== "full";
  const routes = sections.flatMap((section) => section.routes);
  const primaryRoutes = PRIMARY_ROUTE_HREFS.map((href) => routes.find((route) => route.href === href)).filter(
    (route): route is CodexForgeNavigationRoute => Boolean(route)
  );
  const primaryHrefSet = new Set(primaryRoutes.map((route) => route.href));
  const secondarySections = sections
    .map((section) => ({
      ...section,
      label: SECONDARY_GROUP_LABELS[section.group] ?? section.label,
      routes: section.routes.filter((route) => !primaryHrefSet.has(route.href)),
    }))
    .filter((section) => section.routes.length > 0);

  return (
    <aside
      aria-label="CodexForge command-deck navigation"
      data-codexforge-sidebar="CodexForgeSidebar renders home-grade readable sidebar marker; compact sidebar mode remains explicit but focus pages use readable labels; no cramped sidebar; labels never intentionally wrap into vertical fragments; primary routes Home Start Code Flow Files Apply Validate Results History Brain Demo; secondary groups Memory Runtime Creative Governance Admin Readiness"
      style={{ ...sidebar, ...(compact ? compactSidebar : null) }}
    >
      <Link href="/" style={brand}>
        <span aria-hidden="true" style={mark} />
        <span style={{ ...brandText, ...(compact ? visuallyQuietBrand : null) }}>
          <strong style={brandTitle}>CodexForge</strong>
          <span style={brandSubtitle}>Unified shell</span>
        </span>
      </Link>

      <nav style={nav}>
        <div style={sectionBlock}>
          <div style={{ ...sectionLabel, ...(compact ? compactSectionLabel : null) }}>Primary</div>
          {primaryRoutes.map((route) => renderRouteLink(route, activeHref, compact, showBadges))}
        </div>

        <details style={advancedDetails}>
          <summary style={advancedSummary}>Secondary</summary>
          <div style={advancedStack}>
            {secondarySections.map((section) => (
              <div key={`sidebar-${section.id}`} style={sectionBlock}>
                <div style={{ ...sectionLabel, ...(compact ? compactSectionLabel : null) }}>{section.label}</div>
                {section.routes.map((route) => renderRouteLink(route, activeHref, compact, showBadges))}
              </div>
            ))}
          </div>
        </details>
      </nav>

      {showSafetyNotice ? <CodexForgeShellSafetyNotice /> : null}
    </aside>
  );
}

function renderRouteLink(
  route: CodexForgeNavigationRoute,
  activeHref: string,
  compact: boolean,
  showBadges: boolean
) {
  return (
    <Link
      key={`sidebar-${route.href}`}
      href={route.href}
      title={route.description}
      aria-current={route.href === activeHref ? "page" : undefined}
      style={{
        ...(route.href === activeHref ? activeLink : link),
        ...(compact ? compactLink : null),
      }}
    >
      <span style={routeLabel}>{route.shortLabel}</span>
      {showBadges && !compact ? <span style={badge}>{route.badge}</span> : null}
    </Link>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  overflowWrap: "normal",
  wordBreak: "normal",
};

const sidebar: CSSProperties = {
  alignSelf: "start",
  border: "1px solid rgba(148,163,184,0.14)",
  background: "linear-gradient(180deg, rgba(8,13,28,0.94), rgba(2,6,23,0.82))",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  minWidth: 0,
  width: "100%",
  padding: 12,
  position: "sticky",
  top: 12,
  maxHeight: "calc(100vh - 24px)",
  overflowY: "auto",
};

const compactSidebar: CSSProperties = {
  gap: 9,
  padding: 8,
};

const compactLink: CSSProperties = {
  gridTemplateColumns: "minmax(0, 1fr)",
  justifyItems: "center",
  padding: "8px 6px",
  textAlign: "center",
};

const visuallyQuietBrand: CSSProperties = {
  display: "none",
};

const compactSectionLabel: CSSProperties = {
  padding: 0,
  textAlign: "center",
};

const brand: CSSProperties = {
  alignItems: "center",
  color: "#f8fafc",
  display: "flex",
  gap: 9,
  minWidth: 0,
  textDecoration: "none",
};

const mark: CSSProperties = {
  background: "linear-gradient(135deg, rgba(20,184,166,0.95), rgba(14,165,233,0.88))",
  borderRadius: 8,
  boxShadow: "0 12px 36px rgba(20,184,166,0.16)",
  flex: "0 0 auto",
  height: 28,
  width: 28,
};

const brandText: CSSProperties = {
  display: "grid",
  gap: 2,
  lineHeight: 1.1,
  ...safeText,
};

const brandTitle: CSSProperties = {
  fontSize: 15,
  letterSpacing: 0,
  ...safeText,
};

const brandSubtitle: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  fontWeight: 760,
  ...safeText,
};

const nav: CSSProperties = {
  display: "grid",
  gap: 11,
  minWidth: 0,
};

const sectionBlock: CSSProperties = {
  display: "grid",
  gap: 5,
  minWidth: 0,
};

const sectionLabel: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 10,
  fontWeight: 900,
  lineHeight: 1.2,
  padding: "0 6px",
  textTransform: "uppercase",
  ...safeText,
};

const linkBase: CSSProperties = {
  alignItems: "center",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 48px)",
  minWidth: 0,
  padding: "8px 9px",
  textDecoration: "none",
};

const link: CSSProperties = {
  ...linkBase,
  color: "#cbd5e1",
};

const activeLink: CSSProperties = {
  ...linkBase,
  background: "rgba(20,184,166,0.13)",
  border: "1px solid rgba(45,212,191,0.22)",
  color: "#f8fafc",
};

const routeLabel: CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 850,
  lineHeight: 1.25,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ...safeText,
};

const badge: CSSProperties = {
  color: "#94a3b8",
  fontSize: 10,
  fontWeight: 850,
  lineHeight: 1.2,
  maxWidth: 54,
  overflowWrap: "anywhere",
  overflow: "hidden",
  textAlign: "right",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const advancedDetails: CSSProperties = {
  borderTop: "1px solid rgba(148,163,184,0.12)",
  minWidth: 0,
  paddingTop: 8,
};

const advancedSummary: CSSProperties = {
  color: "#cbd5e1",
  cursor: "pointer",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  padding: "0 6px",
  textTransform: "uppercase",
};

const advancedStack: CSSProperties = {
  display: "grid",
  gap: 10,
  marginTop: 9,
  minWidth: 0,
};
