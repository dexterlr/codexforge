import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeNavigationRoute, CodexForgeNavigationRouteHref, CodexForgeNavigationSection } from "../navigation-shell-types";
import { CODEXFORGE_PRIMARY_PRODUCT_AREAS, CODEXFORGE_PRIMARY_PRODUCT_AREA_HREFS } from "../primary-product-area-model";
import { CodexForgeShellSafetyNotice } from "./CodexForgeShellSafetyNotice";

const USER_NAV_ROUTE_HREFS: ReadonlySet<CodexForgeNavigationRouteHref> = new Set(CODEXFORGE_PRIMARY_PRODUCT_AREA_HREFS);
const SECONDARY_USER_ROUTE_HREFS: ReadonlySet<CodexForgeNavigationRouteHref> = new Set([
  "/files",
  "/patch-preview-workbench",
  "/validation",
]);
const DEVELOPER_ONLY_ROUTE_HREFS: ReadonlySet<CodexForgeNavigationRouteHref> = new Set([
  "/developer-diagnostics-hub-preview",
  "/codexforge-cockpit",
  "/ai",
]);

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
  const primaryAreaRoutes = CODEXFORGE_PRIMARY_PRODUCT_AREAS.map((area) => ({
    area,
    route: routes.find((route) => route.href === area.href),
  })).filter((entry): entry is { area: (typeof CODEXFORGE_PRIMARY_PRODUCT_AREAS)[number]; route: CodexForgeNavigationRoute } => Boolean(entry.route));
  const primaryHrefSet = new Set(primaryAreaRoutes.map((entry) => entry.route.href));
  const secondarySections = sections
    .map((section) => ({
      ...section,
      label: SECONDARY_GROUP_LABELS[section.group] ?? section.label,
      routes: section.routes.filter(
        (route) =>
          SECONDARY_USER_ROUTE_HREFS.has(route.href) &&
          !primaryHrefSet.has(route.href) &&
          !isPhaseDiagnosticRoute(route) &&
          !DEVELOPER_ONLY_ROUTE_HREFS.has(route.href)
      ),
    }))
    .filter((section) => section.routes.length > 0);
  const developerCompatibilityRoutes = ["/codexforge-cockpit"].flatMap((href) => {
    const route = routes.find((candidate) => candidate.href === href);
    return route ? [route] : [];
  });

  return (
    <aside
      aria-label="CodexForge command-deck navigation"
      data-codexforge-sidebar="CodexForgeSidebar renders CodexForge Primary Navigation, README, and Workspace Layout Upgrade markers; god-tier product shell consolidation; primary navigation product areas: Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, Developer / Checkpoints; phase checkpoint routes remain preserved; phase checkpoint routes do not dominate primary navigation"
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
          {primaryAreaRoutes.map((entry) => renderPrimaryAreaLink(entry.area, entry.route, activeHref, compact, showBadges))}
        </div>

        {secondarySections.length > 0 ? (
          <details style={advancedDetails}>
            <summary style={advancedSummary}>More product areas</summary>
            <div style={advancedStack}>
              {secondarySections.map((section) => (
                <div key={`sidebar-${section.id}`} style={sectionBlock}>
                  <div style={{ ...sectionLabel, ...(compact ? compactSectionLabel : null) }}>{section.label}</div>
                  {section.routes.map((route) => renderRouteLink(route, activeHref, compact, showBadges))}
                </div>
              ))}
            </div>
          </details>
        ) : null}

        <details style={advancedDetails}>
          <summary style={advancedSummary}>Developer Diagnostics</summary>
          <div style={diagnosticsBlock}>
            <p style={diagnosticsText}>
              Wiring, smoke, and traceability routes stay grouped here after the
              main product path.
            </p>
            {renderRouteLink(
              routes.find((route) => route.href === "/developer-diagnostics-hub-preview") ??
                ({
                  href: "/developer-diagnostics-hub-preview",
                  label: "Developer Diagnostics",
                  shortLabel: "Developer Diagnostics",
                  description: "Grouped phase route diagnostics.",
                  badge: "Diagnostics",
                } as CodexForgeNavigationRoute),
              activeHref,
              compact,
              showBadges
            )}
            {developerCompatibilityRoutes.map((route) =>
              renderRouteLink(route, activeHref, compact, showBadges)
            )}
          </div>
        </details>
      </nav>

      {showSafetyNotice ? <CodexForgeShellSafetyNotice /> : null}
    </aside>
  );
}

function isPhaseDiagnosticRoute(route: CodexForgeNavigationRoute): boolean {
  return route.badge.startsWith("Phase ") && !USER_NAV_ROUTE_HREFS.has(route.href);
}

function renderPrimaryAreaLink(
  area: (typeof CODEXFORGE_PRIMARY_PRODUCT_AREAS)[number],
  route: CodexForgeNavigationRoute,
  activeHref: string,
  compact: boolean,
  showBadges: boolean
) {
  return (
    <Link
      key={`primary-product-area-${route.href}`}
      href={route.href}
      title={`${area.label}: ${area.summary}`}
      aria-current={route.href === activeHref ? "page" : undefined}
      data-codexforge-primary-product-area={area.label}
      style={{
        ...(route.href === activeHref ? activeLink : link),
        ...(compact ? compactLink : null),
      }}
    >
      <span style={routeLabel}>{area.label}</span>
      {showBadges && !compact ? <span style={badge}>{area.badge}</span> : null}
    </Link>
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

const diagnosticsBlock: CSSProperties = {
  display: "grid",
  gap: 8,
  marginTop: 9,
  minWidth: 0,
};

const diagnosticsText: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  lineHeight: 1.4,
  margin: "0 6px",
  overflowWrap: "anywhere",
};
