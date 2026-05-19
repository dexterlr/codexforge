"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { CodexForgeCommandPalette } from "@/lib/codexforge/command-palette";
import { buildCodexForgeNavigationRoutes } from "../navigation-route-registry";
import { buildCodexForgeNavigationSections } from "../navigation-section-model";
import { buildCodexForgeNavigationSafetyPosture } from "../navigation-safety-posture";
import { buildCodexForgeShellNextActionPlan } from "../navigation-next-action";
import { buildCodexForgeRouteState } from "../navigation-route-state";
import {
  buildCodexForgeNavigationShellSummary,
  summarizeCodexForgeNavigationShellSession,
} from "../navigation-shell-summary";
import type { CodexForgeAppShellProps } from "../navigation-shell-types";
import { CodexForgeNextActionDock } from "./CodexForgeNextActionDock";
import { CodexForgeSafetyPostureStrip } from "./CodexForgeSafetyPostureStrip";
import { CodexForgeShellMobileNav } from "./CodexForgeShellMobileNav";
import { CodexForgeSidebar } from "./CodexForgeSidebar";
import { CodexForgeTopbar } from "./CodexForgeTopbar";
import { CodexForgeWorkspaceMap } from "./CodexForgeWorkspaceMap";

export function buildCodexForgeShellStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function CodexForgeAppShell({
  children,
  activePath,
  workspaceLabel,
  routeAvailability,
  nextActionContext,
  contentMaxWidth = 1680,
}: CodexForgeAppShellProps) {
  const pathname = usePathname() ?? "/";
  const resolvedPath = activePath ?? pathname;
  const routes = useMemo(
    () => buildCodexForgeNavigationRoutes(routeAvailability),
    [routeAvailability]
  );
  const sections = useMemo(() => buildCodexForgeNavigationSections(routes), [routes]);
  const safetyPosture = useMemo(() => buildCodexForgeNavigationSafetyPosture(), []);
  const routeState = useMemo(
    () =>
      buildCodexForgeRouteState({
        pathname: resolvedPath,
        routes,
        safetyPosture,
        workspaceLabel,
      }),
    [resolvedPath, routes, safetyPosture, workspaceLabel]
  );
  const nextActionPlan = useMemo(
    () =>
      buildCodexForgeShellNextActionPlan({
        activeHref: routeState.activeRoute.href,
        routeAvailability,
        ...nextActionContext,
      }),
    [nextActionContext, routeAvailability, routeState.activeRoute.href]
  );
  const sessionSummary = useMemo(
    () =>
      buildCodexForgeNavigationShellSummary({
        routes,
        sections,
        routeState,
        safetyPosture,
        nextAction: nextActionPlan.selected,
      }),
    [nextActionPlan.selected, routeState, routes, safetyPosture, sections]
  );
  const summaryText = summarizeCodexForgeNavigationShellSession(sessionSummary);

  return (
    <main
      data-codexforge-app-shell="CodexForgeAppShell renders unified navigation shell local-first operator-safe no auto-fix no command execution without approval no file writes without approval preserve latest-message authority"
      style={page}
    >
      <div style={{ ...shell, maxWidth: contentMaxWidth }}>
        <CodexForgeSidebar sections={sections} activeHref={routeState.activeRoute.href} />
        <div style={mainColumn}>
          <CodexForgeShellMobileNav routes={routes} activeHref={routeState.activeRoute.href} />
          <div style={paletteDock}>
            <CodexForgeCommandPalette routeAvailability={routeAvailability} />
          </div>
          <CodexForgeTopbar routeState={routeState} routes={routes} />
          <CodexForgeSafetyPostureStrip posture={safetyPosture} />
          <div style={deck}>
            <div style={content} data-codexforge-shell-content-key={buildCodexForgeShellStableKey([routeState.activeRoute.href, routeState.activeGroup])}>
              {children}
            </div>
            <aside style={sideRail}>
              <CodexForgeNextActionDock action={nextActionPlan.selected} />
              <CodexForgeWorkspaceMap sections={sections} activeHref={routeState.activeRoute.href} />
              <section style={sessionPanel}>
                <span style={sessionLabel}>Shell summary</span>
                <p style={sessionText}>{summaryText}</p>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "normal",
  wordBreak: "normal",
};

const safeBodyText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const page: CSSProperties = {
  background:
    "radial-gradient(760px 460px at 10% 5%, rgba(20,184,166,0.16), transparent 58%)," +
    "radial-gradient(860px 520px at 84% 8%, rgba(14,165,233,0.14), transparent 58%)," +
    "linear-gradient(180deg, #02040a 0%, #050814 100%)",
  color: "#f8fafc",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
  minHeight: "100vh",
  padding: "16px min(2.5vw, 28px) 24px",
  ...safeText,
};

const shell: CSSProperties = {
  alignItems: "start",
  display: "grid",
  gap: 16,
  gridTemplateColumns: "clamp(260px, 20vw, 320px) minmax(0, 1fr)",
  margin: "0 auto",
  minWidth: 0,
  width: "100%",
};

const mainColumn: CSSProperties = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const paletteDock: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  minWidth: 0,
};

const deck: CSSProperties = {
  alignItems: "start",
  display: "grid",
  gap: 16,
  gridTemplateColumns: "minmax(0, 1fr) clamp(260px, 19vw, 320px)",
  minWidth: 0,
  width: "100%",
};

const content: CSSProperties = {
  display: "grid",
  gap: 16,
  minWidth: 0,
  width: "100%",
};

const sideRail: CSSProperties = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const sessionPanel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.13)",
  background: "rgba(255,255,255,0.035)",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  minWidth: 0,
  padding: 11,
};

const sessionLabel: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  textTransform: "uppercase",
};

const sessionText: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  ...safeBodyText,
};
