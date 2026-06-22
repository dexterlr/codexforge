"use client";

import type { CSSProperties } from "react";
import {
  buildGoalCompilerRouteModel,
  buildGoalCompilerStableKey,
  type GoalCompilerItem,
  type GoalCompilerRouteSlug,
  type GoalCompilerSection,
  type GoalCompilerState,
} from "../goal-compiler-model";

export function GoalCompilerCockpitSummaryPanel() {
  const model = buildGoalCompilerRouteModel("codexforge-cockpit");
  const compiler = model.goalCompiler;

  return (
    <section
      style={cockpitSection}
      data-codexforge-goal-compiler={model.cockpitMarkers.join(" | ")}
      aria-label="Goal Compiler v1"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Goal Compiler v1</p>
          <h2 style={sectionTitle}>Cockpit goal compiler</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>
      <p style={bodyText}>
        Goal Compiler v1 shows what the operator asked for, what domain CodexForge thinks it belongs to, what task
        type it appears to be, what artifact/result is expected, what context is needed, what files and commands may
        be impacted, what risk and approval scope apply, what evidence/result/done criteria matter, what recovery
        implications exist, and what model/tool routing hints are visible.
      </p>
      <p style={bodyText}>
        No model calls from the cockpit. No provider calls from the cockpit. No connector calls from the cockpit. No
        goal execution from the cockpit. No automatic memory promotion from the cockpit. Backend-owned goal compilation
        remains required. Explicit operator approval remains required.
      </p>

      <div style={cockpitGrid} aria-label="Goal compiler cockpit labels">
        {compiler.cockpitSummary.map((item, index) => (
          <GoalSummaryCard key={buildGoalCompilerStableKey(["cockpit-summary", String(index), item.id])} item={item} />
        ))}
      </div>

      <section style={blockedBand} aria-label="Why no model provider connector calls happen yet">
        <h3 style={smallHeading}>Why no model/provider/connector calls happen yet</h3>
        <p style={bodyText}>
          Goal Compiler v1 is deterministic review content. Future backend-owned and model-assisted compilation must
          still enforce explicit operator approval, safety boundaries, evidence capture, result handling, and recovery
          contracts before real actions can exist.
        </p>
      </section>

      <div style={markerBand} aria-label="Goal Compiler v1 cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildGoalCompilerStableKey(["cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function GoalCompilerRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: GoalCompilerRouteSlug;
  embedded?: boolean;
}) {
  const model = buildGoalCompilerRouteModel(routeSlug);
  const compiler = model.goalCompiler;
  const titleText = embedded ? "Goal Compiler v1" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-goal-compiler-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Goal Compiler v1" : model.route.phase}</span>
          <span style={normalSurfaceBadge}>
            {model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}
          </span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Goal Compiler v1 is preview-only. It does not call models, call providers, call connectors, execute the
          goal, scaffold projects, write files, run commands, persist approvals, or promote memory automatically.
        </p>
      </header>

      <section style={markerBand} aria-label="Goal compiler page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildGoalCompilerStableKey(["route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Goal compiler identity">
        <div>
          <p style={panelEyebrow}>Goal compiler</p>
          <h3 style={sectionTitle}>{compiler.goalCompilerId}</h3>
        </div>
        <p style={bodyText}>
          Raw goal: {compiler.rawGoal} Normalized goal: {compiler.normalizedGoal} Backend-owned guarded execution
          remains required for real actions. Explicit operator approval remains required.
        </p>
      </section>

      <section style={cardGrid} aria-label="Goal compiler sections">
        {model.sections.map((section, index) => (
          <GoalSectionCard
            key={buildGoalCompilerStableKey(["section", model.route.slug, String(index), section.id])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Goal compiler safety and cockpit summary">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Safety</p>
              <h3 style={sectionTitle}>Explicit safety limits</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <div style={chipRow}>
            {compiler.explicitSafetyLimits.map((limit, index) => (
              <span key={buildGoalCompilerStableKey(["safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>Goal Domain Task Target Context Files Commands Risk Approval Evidence Done Recovery Model Tool Hints</h3>
            </div>
            <span style={stateStyle("preview-only")}>Review only</span>
          </div>
          <div style={chipRow}>
            {compiler.cockpitSummary.map((item, index) => (
              <span key={buildGoalCompilerStableKey(["route-cockpit", String(index), item.id])} style={chip}>
                {item.label}: {item.detail}
              </span>
            ))}
          </div>
        </article>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildGoalCompilerStableKey(["diagnostic-route", String(index), route.slug])}
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

function GoalSummaryCard({ item }: { item: GoalCompilerItem }) {
  return (
    <article style={summaryCard}>
      <div style={panelHeader}>
        <h3 style={summaryLabel}>{item.label}</h3>
        <span style={smallStateStyle(item.state)}>{formatState(item.state)}</span>
      </div>
      <p style={bodyText}>{item.detail}</p>
    </article>
  );
}

function GoalSectionCard({ section }: { section: GoalCompilerSection }) {
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
      <div style={checklistGrid}>
        {section.items.map((item, index) => (
          <div key={buildGoalCompilerStableKey(["item", section.id, String(index), item.id])} style={checkRow}>
            <span style={smallStateStyle(item.state)}>{formatState(item.state)}</span>
            <div>
              <p style={checkLabel}>{item.label}</p>
              <p style={checkDetail}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function formatState(state: GoalCompilerState): string {
  if (state === "needs-approval") return "Needs approval";
  if (state === "preview-only") return "Preview only";
  if (state === "inferred") return "Inferred";
  if (state === "expected") return "Expected";
  return "Blocked";
}

function stateStyle(state: GoalCompilerState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "inferred"
      ? inferredBadge
      : state === "expected"
        ? expectedBadge
        : state === "needs-approval"
          ? approvalBadge
          : state === "preview-only"
            ? previewBadge
            : blockedBadge),
  };
}

function smallStateStyle(state: GoalCompilerState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "inferred"
      ? inferredBadge
      : state === "expected"
        ? expectedBadge
        : state === "needs-approval"
          ? approvalBadge
          : state === "preview-only"
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

const cockpitSection: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  background: "#ffffff",
  color: "#172026",
  display: "grid",
  gap: 16,
  padding: 18,
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

const identityBand: CSSProperties = {
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  background: "#f8fbfa",
  display: "grid",
  gap: 4,
  padding: 16,
};

const blockedBand: CSSProperties = {
  border: "1px solid #ead1cf",
  borderRadius: 8,
  background: "#fff8f7",
  padding: 14,
};

const cardGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
};

const cockpitGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: 12,
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

const summaryCard: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  background: "#fbfcfd",
  minHeight: 126,
  padding: 14,
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

const smallHeading: CSSProperties = {
  color: "#172026",
  fontSize: 16,
  lineHeight: 1.25,
  letterSpacing: 0,
  margin: 0,
};

const summaryLabel: CSSProperties = {
  color: "#172026",
  fontSize: 16,
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

const inferredBadge: CSSProperties = {
  background: "#eef6fc",
  borderColor: "#9db8d0",
  color: "#244862",
};

const expectedBadge: CSSProperties = {
  background: "#f2faf6",
  borderColor: "#8fb6a7",
  color: "#1f5947",
};

const approvalBadge: CSSProperties = {
  background: "#fff8e6",
  borderColor: "#c7a553",
  color: "#5c4512",
};

const previewBadge: CSSProperties = {
  background: "#f7fbf9",
  borderColor: "#9cc8bc",
  color: "#245a4a",
};

const blockedBadge: CSSProperties = {
  background: "#fff3f1",
  borderColor: "#d29a9a",
  color: "#7d2c26",
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
