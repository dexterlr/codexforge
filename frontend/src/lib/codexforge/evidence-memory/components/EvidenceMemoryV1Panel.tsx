"use client";

import type { CSSProperties } from "react";
import {
  buildEvidenceMemoryRouteModel,
  buildEvidenceMemoryV1StableKey,
  type EvidenceMemoryItem,
  type EvidenceMemoryRouteSlug,
  type EvidenceMemorySection,
  type EvidenceMemoryState,
} from "../evidence-memory-v1-model";

export function EvidenceMemoryCockpitSummaryPanel() {
  const model = buildEvidenceMemoryRouteModel("codexforge-cockpit");
  const memory = model.memory;

  return (
    <section
      style={cockpitSection}
      data-codexforge-evidence-memory={model.cockpitMarkers.join(" | ")}
      aria-label="Evidence Memory v1"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Evidence Memory v1</p>
          <h2 style={sectionTitle}>Run Memory Preview</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>
      <p style={bodyText}>
        Evidence Memory v1 shows what could be remembered from a run: the operator goal, context used, proposed plan,
        expected files and commands, approval scope, evidence, result, recovery options, audit records, and denied
        memory. It prepares a future backend-owned evidence memory path without hidden persistence.
      </p>
      <p style={bodyText}>
        Secrets and environment values are blocked because credentials, tokens, private keys, and raw environment
        values are not reusable project memory and create leakage risk. Memory promotion is explicit so scope,
        retention, redaction, evidence support, and rollback implications stay reviewable before anything is kept.
      </p>
      <p style={bodyText}>
        Evidence, result, recovery, and audit memory helps future runs by showing what was expected, what happened,
        what recovery was available, and what timeline matters. Backend-owned evidence capture, redaction, persistence,
        guard enforcement, and promotion remain required. The cockpit does not persist memory directly.
      </p>
      <p style={bodyText}>
        No automatic memory promotion from the cockpit. No memory persistence from the cockpit. No browser storage
        writes from the cockpit. No secret memory from the cockpit. Backend-owned evidence memory remains required.
        Explicit operator approval remains required.
      </p>

      <div style={cockpitGrid} aria-label="Evidence memory labels">
        {memory.cockpitSummary.map((item, index) => (
          <MemorySummaryCard key={buildEvidenceMemoryV1StableKey(["cockpit-summary", String(index), item.id])} item={item} />
        ))}
      </div>

      <section style={blockedBand} aria-label="Denied memory explanation">
        <h3 style={smallHeading}>What must not be remembered</h3>
        <p style={bodyText}>
          Denied Memory blocks secrets, environment values, credentials, tokens, private keys, arbitrary files, hidden
          approvals, hidden memory promotion, provider payloads, connector payloads, browser credential storage, and
          automatic promotion. Backend-owned guarded execution remains required for real actions.
        </p>
      </section>

      <div style={markerBand} aria-label="Evidence Memory v1 cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildEvidenceMemoryV1StableKey(["cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function EvidenceMemoryRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: EvidenceMemoryRouteSlug;
  embedded?: boolean;
}) {
  const model = buildEvidenceMemoryRouteModel(routeSlug);
  const memory = model.memory;
  const titleText = embedded ? "Evidence Memory v1" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-evidence-memory-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Evidence Memory v1" : model.route.phase}</span>
          <span style={normalSurfaceBadge}>
            {model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}
          </span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Evidence Memory v1 is preview-only. It does not persist memory from the UI, promote memory automatically,
          write browser storage, store secrets, call models, call providers, call connectors, execute commands, write
          files, apply diffs, persist approvals, or persist evidence/results/audit from the UI.
        </p>
      </header>

      <section style={markerBand} aria-label="Evidence memory page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span key={buildEvidenceMemoryV1StableKey(["route-marker", model.route.slug, String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Evidence memory identity">
        <div>
          <p style={panelEyebrow}>Memory shape</p>
          <h3 style={sectionTitle}>{memory.evidenceMemoryId}</h3>
        </div>
        <p style={bodyText}>
          Evidence memory kind: {memory.evidenceMemoryKind}. Memory promotion must be explicit, scoped, reviewable,
          and operator-approved. Backend-owned guarded execution remains required for real actions.
        </p>
      </section>

      <section style={cardGrid} aria-label="Evidence memory sections">
        {model.sections.map((section, index) => (
          <MemorySectionCard key={buildEvidenceMemoryV1StableKey(["section", model.route.slug, String(index), section.id])} section={section} />
        ))}
      </section>

      <section style={splitBand} aria-label="Evidence memory safety and cockpit summary">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Safety</p>
              <h3 style={sectionTitle}>Explicit safety limits</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <div style={chipRow}>
            {memory.explicitSafetyLimits.map((limit, index) => (
              <span key={buildEvidenceMemoryV1StableKey(["safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>Remembered Goal Context Plan Files Commands Approval Evidence Result Recovery Audit Review Denied</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={chipRow}>
            {memory.cockpitSummary.map((item, index) => (
              <span key={buildEvidenceMemoryV1StableKey(["route-cockpit", String(index), item.id])} style={chip}>
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
          broad execution still blocked. automatic memory promotion still blocked.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a key={buildEvidenceMemoryV1StableKey(["diagnostic-route", String(index), route.slug])} style={routeLink} href={route.href}>
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

function MemorySummaryCard({ item }: { item: EvidenceMemoryItem }) {
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

function MemorySectionCard({ section }: { section: EvidenceMemorySection }) {
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
          <div key={buildEvidenceMemoryV1StableKey(["item", section.id, String(index), item.id])} style={checkRow}>
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

function formatState(state: EvidenceMemoryState): string {
  if (state === "needs-approval") return "Needs approval";
  if (state === "preview-only") return "Preview only";
  if (state === "review-only") return "Review only";
  if (state === "expected") return "Expected";
  return "Blocked";
}

function stateStyle(state: EvidenceMemoryState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "expected"
      ? expectedBadge
      : state === "needs-approval"
        ? approvalBadge
        : state === "preview-only"
          ? previewBadge
          : state === "review-only"
            ? reviewBadge
            : blockedBadge),
  };
}

function smallStateStyle(state: EvidenceMemoryState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "expected"
      ? expectedBadge
      : state === "needs-approval"
        ? approvalBadge
        : state === "preview-only"
          ? previewBadge
          : state === "review-only"
            ? reviewBadge
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
  background: "#eef6fc",
  borderColor: "#9db8d0",
  color: "#244862",
};

const reviewBadge: CSSProperties = {
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
