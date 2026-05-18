import type { CSSProperties } from "react";
import type { CodexForgeRouteState } from "../navigation-shell-types";
import { CodexForgeRouteSwitcher } from "./CodexForgeRouteSwitcher";
import { CodexForgeShellBreadcrumbs } from "./CodexForgeShellBreadcrumbs";
import type { CodexForgeNavigationRoute } from "../navigation-shell-types";

export function CodexForgeTopbar({
  routeState,
  routes,
}: {
  routeState: CodexForgeRouteState;
  routes: readonly CodexForgeNavigationRoute[];
}) {
  return (
    <header
      data-codexforge-topbar="CodexForgeTopbar renders route switcher safety posture active route"
      style={topbar}
    >
      <div style={copy}>
        <CodexForgeShellBreadcrumbs breadcrumbs={routeState.breadcrumbs} />
        <div style={titleRow}>
          <h1 style={title}>{routeState.workspaceLabel}</h1>
          <span style={pill}>{routeState.activeRoute.readiness}</span>
        </div>
        <p style={subtitle}>{routeState.activeRoute.description}</p>
      </div>
      <CodexForgeRouteSwitcher routes={routes} activeHref={routeState.activeRoute.href} />
    </header>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const topbar: CSSProperties = {
  alignItems: "start",
  border: "1px solid rgba(148,163,184,0.14)",
  background: "linear-gradient(135deg, rgba(8,13,28,0.88), rgba(15,23,42,0.62))",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  gridTemplateColumns: "minmax(0, 1fr) minmax(min(100%, 520px), auto)",
  minWidth: 0,
  padding: 14,
};

const copy: CSSProperties = {
  display: "grid",
  gap: 7,
  minWidth: 0,
};

const titleRow: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  minWidth: 0,
};

const title: CSSProperties = {
  color: "#f8fafc",
  fontSize: 24,
  letterSpacing: 0,
  lineHeight: 1.08,
  margin: 0,
  ...safeText,
};

const subtitle: CSSProperties = {
  color: "#94a3b8",
  fontSize: 13,
  lineHeight: 1.45,
  margin: 0,
  ...safeText,
};

const pill: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.2)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  padding: "5px 7px",
};

