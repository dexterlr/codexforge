"use client";

import type { CSSProperties } from "react";
import {
  buildDailyTestableCockpitMvpRouteModel,
  buildDailyTestableCockpitMvpStableKey,
  type DailyTestableCockpitMvpRouteSlug,
  type DailyTestableCockpitMvpSection,
  type DailyTestableCockpitMvpState,
} from "../daily-testable-cockpit-mvp-model";

export function DailyTestableCockpitMvpPanel({ embedded = false }: { embedded?: boolean }) {
  return <DailyTestableCockpitMvpRoutePanel routeSlug="codexforge-cockpit" embedded={embedded} />;
}

export function DailyTestableCockpitMvpRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: DailyTestableCockpitMvpRouteSlug;
  embedded?: boolean;
}) {
  const model = buildDailyTestableCockpitMvpRouteModel(routeSlug);
  const mvp = model.cockpitMvp;
  const titleText = embedded ? "Daily-testable cockpit MVP" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-daily-testable-cockpit-mvp={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Cockpit MVP" : model.route.phase}</span>
          <span style={normalSurfaceBadge}>
            {model.route.devOnly ? "Dev/test diagnostics only" : "One cockpit for normal users"}
          </span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>
          One cockpit for normal users: Goal, Plan, Files, Commands, Approval, Run State, Evidence, Result, Recovery,
          Timeline, Safety, and Diagnostics.
        </p>
        <p style={bodyText}>
          Phase pages are dev test diagnostics only. No broad execution from the cockpit. Backend-owned guarded
          execution remains required. Explicit operator approval remains required.
        </p>
      </header>

      {!embedded ? (
        <section style={markerBand} aria-label="Daily-testable cockpit MVP page markers">
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildDailyTestableCockpitMvpStableKey(["marker", model.route.slug, String(index), marker])}
              style={markerPill}
            >
              {marker}
            </span>
          ))}
        </section>
      ) : null}

      <section style={goalBand} aria-label="Daily cockpit goal">
        <div>
          <p style={panelEyebrow}>Goal</p>
          <h3 style={sectionTitle}>Build safely from one cockpit</h3>
        </div>
        <p style={bodyText}>
          The cockpit holds goal intake, plan review, file and command previews, approval, run state, evidence, result,
          recovery, timeline, safety, diagnostics, and readiness in one daily-testable view.
        </p>
      </section>

      <section style={cardGrid} aria-label="Daily-testable cockpit cards">
        {model.sections
          .filter((section) => section.id !== "dev-diagnostics-drawer" && section.id !== "empty-loading-error-states")
          .map((section, index) => (
            <CockpitMvpCard
              key={buildDailyTestableCockpitMvpStableKey(["mvp-card", model.route.slug, String(index), section.id])}
              section={section}
            />
          ))}
      </section>

      <section style={splitBand} aria-label="Cockpit status and trust copy">
        <CockpitMvpCard section={mvp.emptyLoadingErrorStates} />
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Trust</p>
              <h3 style={sectionTitle}>Copy you can trust</h3>
            </div>
            <span style={stateStyle("preview-held")}>Preview held</span>
          </div>
          <div style={chipRow}>
            {mvp.trustCopy.map((copy, index) => (
              <span key={buildDailyTestableCockpitMvpStableKey(["trust-copy", String(index), copy])} style={chip}>
                {copy}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={splitBand} aria-label="Daily cockpit readiness and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Daily MVP</p>
              <h3 style={sectionTitle}>{mvp.releaseReadiness.title}</h3>
            </div>
            <span style={stateStyle("daily-ready")}>Daily ready</span>
          </div>
          <p style={bodyText}>{mvp.releaseReadiness.summary}</p>
          <Checklist items={mvp.releaseReadiness.checklist} namespace="release-readiness" />
          <Checklist items={mvp.dailyTestChecklist} namespace="daily-test-checklist" />
        </article>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Safety</p>
              <h3 style={sectionTitle}>Explicit safety limits</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <div style={chipRow}>
            {mvp.explicitSafetyLimits.map((limit, index) => (
              <span key={buildDailyTestableCockpitMvpStableKey(["safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>{mvp.devDiagnosticsDrawer.operatorCopy}</p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildDailyTestableCockpitMvpStableKey(["diagnostic-route", String(index), route.slug])}
              style={routeLink}
              href={route.href}
            >
              <span style={routePhase}>{route.phase}</span>
              <span style={routeLabel}>{route.title}</span>
              <span style={routeCommand}>{route.commandLabel}</span>
            </a>
          ))}
        </div>
      </details>
    </section>
  );
}

function CockpitMvpCard({ section }: { section: DailyTestableCockpitMvpSection }) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{section.label}</p>
          <h3 style={sectionTitle}>{section.title}</h3>
        </div>
        <span style={stateStyle(section.state)}>{formatState(section.state)}</span>
      </div>
      <p style={bodyText}>{section.summary}</p>
      <p style={bodyText}>{section.operatorCopy}</p>
      <Checklist items={section.checklist} namespace={section.id} />
      <div style={chipRow} aria-label={`${section.title} evidence`}>
        {section.evidence.map((evidence, index) => (
          <span key={buildDailyTestableCockpitMvpStableKey(["evidence", section.id, String(index), evidence])} style={chip}>
            {evidence}
          </span>
        ))}
      </div>
    </article>
  );
}

function Checklist({
  items,
  namespace,
}: {
  items: readonly { id: string; label: string; detail: string; state: DailyTestableCockpitMvpState }[];
  namespace: string;
}) {
  return (
    <div style={checklistGrid}>
      {items.map((check, index) => (
        <div key={buildDailyTestableCockpitMvpStableKey(["check", namespace, String(index), check.id])} style={checkRow}>
          <span style={smallStateStyle(check.state)}>{formatState(check.state)}</span>
          <div>
            <p style={checkLabel}>{check.label}</p>
            <p style={checkDetail}>{check.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatState(state: DailyTestableCockpitMvpState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "dev-diagnostics") return "Diagnostics";
  if (state === "daily-ready") return "Daily ready";
  if (state === "preview-held") return "Preview held";
  return "Blocked";
}

function stateStyle(state: DailyTestableCockpitMvpState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "approval-required"
      ? approvalBadge
      : state === "backend-owned"
        ? backendBadge
        : state === "dev-diagnostics"
          ? diagnosticsBadge
          : state === "daily-ready"
            ? readyBadge
            : state === "preview-held"
              ? previewBadge
              : blockedBadge),
  };
}

function smallStateStyle(state: DailyTestableCockpitMvpState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "approval-required"
      ? approvalBadge
      : state === "backend-owned"
        ? backendBadge
        : state === "dev-diagnostics"
          ? diagnosticsBadge
          : state === "daily-ready"
            ? readyBadge
            : state === "preview-held"
              ? previewBadge
              : blockedBadge),
  };
}

const page: CSSProperties = {
  display: "grid",
  gap: 18,
  padding: 28,
  color: "#172026",
};

const embeddedPage: CSSProperties = {
  display: "grid",
  gap: 18,
  padding: "8px 0 16px",
  color: "#172026",
};

const hero: CSSProperties = {
  display: "grid",
  gap: 10,
  maxWidth: 980,
};

const eyebrowRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const phaseBadge: CSSProperties = {
  border: "1px solid #9db8d0",
  borderRadius: 6,
  background: "#eef6fc",
  color: "#244862",
  fontSize: 12,
  fontWeight: 700,
  padding: "5px 8px",
};

const normalSurfaceBadge: CSSProperties = {
  border: "1px solid #8fb6a7",
  borderRadius: 6,
  background: "#f2faf6",
  color: "#1f5947",
  fontSize: 12,
  fontWeight: 700,
  padding: "5px 8px",
};

const title: CSSProperties = {
  margin: 0,
  fontSize: 32,
  lineHeight: 1.12,
  letterSpacing: 0,
};

const summary: CSSProperties = {
  margin: 0,
  color: "#344854",
  fontSize: 17,
  lineHeight: 1.5,
};

const bodyText: CSSProperties = {
  margin: "8px 0 0",
  color: "#425563",
  fontSize: 14,
  lineHeight: 1.55,
};

const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const markerPill: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 6,
  background: "#ffffff",
  color: "#2f3b43",
  fontSize: 12,
  lineHeight: 1.35,
  padding: "6px 8px",
};

const goalBand: CSSProperties = {
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  background: "#f8fbfa",
  display: "grid",
  gap: 4,
  padding: 16,
};

const cardGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
};

const panel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  background: "#ffffff",
  padding: 16,
};

const panelHeader: CSSProperties = {
  alignItems: "flex-start",
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  justifyContent: "space-between",
};

const panelEyebrow: CSSProperties = {
  color: "#60717d",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0,
  margin: "0 0 4px",
  textTransform: "uppercase",
};

const sectionTitle: CSSProperties = {
  color: "#172026",
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
  margin: 0,
};

const stateBadge: CSSProperties = {
  border: "1px solid",
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 700,
  padding: "6px 8px",
  whiteSpace: "nowrap",
};

const smallStateBadge: CSSProperties = {
  ...stateBadge,
  flex: "0 0 auto",
  fontSize: 11,
  padding: "4px 6px",
};

const previewBadge: CSSProperties = {
  background: "#eef6fc",
  borderColor: "#9db8d0",
  color: "#244862",
};

const approvalBadge: CSSProperties = {
  background: "#fff8e6",
  borderColor: "#c7a553",
  color: "#5c4512",
};

const backendBadge: CSSProperties = {
  background: "#f2faf6",
  borderColor: "#8fb6a7",
  color: "#1f5947",
};

const blockedBadge: CSSProperties = {
  background: "#fff3f1",
  borderColor: "#d29a9a",
  color: "#7d2c26",
};

const diagnosticsBadge: CSSProperties = {
  background: "#f4f5f7",
  borderColor: "#a8aeb8",
  color: "#3f4852",
};

const readyBadge: CSSProperties = {
  background: "#f7fbf9",
  borderColor: "#9cc8bc",
  color: "#245a4a",
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: 10,
  marginTop: 12,
};

const checkRow: CSSProperties = {
  alignItems: "flex-start",
  borderTop: "1px solid #edf1f4",
  display: "flex",
  gap: 10,
  paddingTop: 10,
};

const checkLabel: CSSProperties = {
  color: "#263640",
  fontSize: 14,
  fontWeight: 700,
  margin: 0,
};

const checkDetail: CSSProperties = {
  color: "#5a6a76",
  fontSize: 13,
  lineHeight: 1.45,
  margin: "4px 0 0",
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 12,
};

const chip: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 6,
  background: "#fbfcfd",
  color: "#40505c",
  fontSize: 12,
  lineHeight: 1.35,
  padding: "6px 8px",
};

const diagnosticsDrawer: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  background: "#ffffff",
  padding: 16,
};

const diagnosticsSummary: CSSProperties = {
  color: "#172026",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 700,
};

const routeGrid: CSSProperties = {
  display: "grid",
  gap: 10,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  marginTop: 14,
};

const routeLink: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  color: "#24333d",
  display: "grid",
  gap: 4,
  minHeight: 92,
  padding: 12,
  textDecoration: "none",
};

const routePhase: CSSProperties = {
  color: "#677783",
  fontSize: 12,
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  color: "#24333d",
  fontSize: 14,
  fontWeight: 700,
};

const routeCommand: CSSProperties = {
  color: "#51626e",
  fontSize: 12,
  lineHeight: 1.35,
};
