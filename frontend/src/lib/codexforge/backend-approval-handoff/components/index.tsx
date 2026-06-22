"use client";

import type { CSSProperties } from "react";
import {
  buildBackendApprovalHandoffRouteModel,
  buildBackendApprovalHandoffStableKey,
  type BackendApprovalHandoffPanelState,
  type BackendApprovalHandoffRouteSlug,
} from "../backend-approval-handoff-model";

export function BackendApprovalHandoffPanel() {
  return <BackendApprovalHandoffRoutePanel routeSlug="codexforge-cockpit" />;
}

export function BackendApprovalHandoffRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: BackendApprovalHandoffRouteSlug;
  embedded?: boolean;
}) {
  const model = buildBackendApprovalHandoffRouteModel(routeSlug);

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-backend-approval-handoff={`${model.route.title} preview-only explicit operator approval required no real file mutation no real command execution no backend execution no model calls no provider calls no connector calls no approval persistence no queue persistence no execution lock release no evidence persistence no result persistence no audit persistence no recovery execution`}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={devBadge}>{model.route.devOnly ? "Dev/test surface only" : "Cockpit backend handoff preview"}</span>
        </div>
        <h2 style={title}>{model.route.title}</h2>
        <p style={summary}>{model.route.summary}</p>
        <p style={safetyLead}>
          This is a backend-owned approval handoff contract preview. The cockpit shows the frontend preview packet,
          backend approval ticket, file-write handoff, command handoff, evidence, result, recovery, audit, queue,
          denied path, operator signoff, go/no-go, security, and failure review contracts while backend execution
          remains blocked.
        </p>
      </header>

      <section style={noticeBand} aria-label="Backend approval handoff safety boundary">
        {model.globalSafetyCopy.map((copy, index) => (
          <p key={buildBackendApprovalHandoffStableKey(["global-safety", model.route.slug, String(index)])} style={noticeText}>
            {copy}
          </p>
        ))}
      </section>

      <section style={markerBand} aria-label="Backend approval handoff markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span key={buildBackendApprovalHandoffStableKey(["marker", model.route.slug, String(index)])} style={markerPill}>
            {marker}
          </span>
        ))}
      </section>

      <section style={splitBand} aria-label="Backend approval handoff approval and denied paths">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Operator Approval Boundary</h3>
          <p style={bodyText}>{model.route.approvalCopy}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Denied Paths</h3>
          <p style={bodyText}>{model.route.deniedCopy}</p>
        </article>
      </section>

      <section style={compactMatrix} aria-label="Backend approval handoff static model">
        <MatrixPanel title="Handoff Flow" values={model.handoffFlow} routeSlug={model.route.slug} namespace="handoff-flow" />
        <MatrixPanel title="Approval Ticket Fields" values={model.approvalTicketFields} routeSlug={model.route.slug} namespace="approval-ticket-field" />
        <MatrixPanel title="Denied Path Matrix" values={model.deniedPathMatrix} routeSlug={model.route.slug} namespace="denied-path" />
        <MatrixPanel title="Result States" values={model.resultStates} routeSlug={model.route.slug} namespace="result-state" />
        <MatrixPanel title="Recovery Requirements" values={model.recoveryRequirements} routeSlug={model.route.slug} namespace="recovery-requirement" />
        <MatrixPanel title="Queue States" values={model.queueStates} routeSlug={model.route.slug} namespace="queue-state" />
        <MatrixPanel title="Future Backend Guards" values={model.futureBackendGuards} routeSlug={model.route.slug} namespace="future-guard" />
        <MatrixPanel title="Build-Anything Scope" values={model.targetFamilies} routeSlug={model.route.slug} namespace="target-family" />
      </section>

      <section style={surfaceStack} aria-label="Backend approval handoff checklist">
        {model.surfaces.map((surface, surfaceIndex) => (
          <article
            key={buildBackendApprovalHandoffStableKey(["surface", model.route.slug, String(surfaceIndex), surface.id])}
            style={surfacePanel}
          >
            <div style={panelHeader}>
              <div>
                <p style={panelEyebrow}>{surface.eyebrow}</p>
                <h3 style={panelTitle}>{surface.title}</h3>
              </div>
              <span style={stateStyle(surface.state)}>{formatState(surface.state)}</span>
            </div>
            <p style={bodyText}>{surface.body}</p>
            <div style={checklistGrid}>
              {surface.checklist.map((checkItem, itemIndex) => (
                <div
                  key={buildBackendApprovalHandoffStableKey(["checklist-item", surface.id, String(itemIndex), checkItem.id])}
                  style={checklistRow}
                >
                  <span style={smallStateStyle(checkItem.state)}>{formatState(checkItem.state)}</span>
                  <div>
                    <p style={checkLabel}>{checkItem.label}</p>
                    <p style={checkDetail}>{checkItem.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={chipRow} aria-label={`${surface.title} placeholders`}>
              {surface.placeholders.map((placeholder, placeholderIndex) => (
                <span
                  key={buildBackendApprovalHandoffStableKey(["placeholder", surface.id, String(placeholderIndex), placeholder])}
                  style={placeholderChip}
                >
                  {placeholder}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      {model.route.devOnly ? (
        <footer style={footerBand}>
          <a style={safeLink} href="/codexforge-cockpit">
            Go to Unified CodexForge Cockpit
          </a>
        </footer>
      ) : null}
    </section>
  );
}

function MatrixPanel({
  title,
  values,
  routeSlug,
  namespace,
}: {
  title: string;
  values: readonly string[];
  routeSlug: string;
  namespace: string;
}) {
  return (
    <article style={plainPanel}>
      <h3 style={sectionTitle}>{title}</h3>
      <div style={chipRow}>
        {values.map((value, index) => (
          <span key={buildBackendApprovalHandoffStableKey([namespace, routeSlug, String(index), value])} style={chip}>
            {value}
          </span>
        ))}
      </div>
    </article>
  );
}

function formatState(state: BackendApprovalHandoffPanelState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "preview-only") return "Preview only";
  if (state === "dev-test-only") return "Dev/test only";
  return "Blocked";
}

function stateStyle(state: BackendApprovalHandoffPanelState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "dev-test-only"
          ? devOnlyBadge
          : previewBadge),
  };
}

function smallStateStyle(state: BackendApprovalHandoffPanelState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "dev-test-only"
          ? devOnlyBadge
          : previewBadge),
  };
}

const page: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 18,
  padding: "28px",
  color: "#172026",
};

const embeddedPage: CSSProperties = {
  ...page,
  padding: "18px 0 0",
};

const hero: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const eyebrowRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
};

const phaseBadge: CSSProperties = {
  border: "1px solid #426377",
  color: "#123243",
  background: "#eef8fc",
  borderRadius: 6,
  padding: "4px 8px",
  fontSize: 12,
  fontWeight: 700,
};

const devBadge: CSSProperties = {
  border: "1px solid #8e6f2f",
  color: "#463408",
  background: "#fff7db",
  borderRadius: 6,
  padding: "4px 8px",
  fontSize: 12,
  fontWeight: 700,
};

const title: CSSProperties = {
  margin: 0,
  fontSize: 28,
  lineHeight: 1.15,
  letterSpacing: 0,
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 980,
  color: "#30404a",
  fontSize: 16,
  lineHeight: 1.55,
};

const safetyLead: CSSProperties = {
  ...summary,
  color: "#4a3420",
};

const noticeBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  border: "1px solid #d3bf8d",
  background: "#fffaf0",
  borderRadius: 8,
  padding: 14,
};

const noticeText: CSSProperties = {
  margin: 0,
  color: "#3b3426",
  fontSize: 13,
  lineHeight: 1.45,
};

const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const markerPill: CSSProperties = {
  border: "1px solid #b9c4ca",
  background: "#f4f7f8",
  color: "#1e2c34",
  borderRadius: 6,
  padding: "6px 8px",
  fontSize: 12,
  fontWeight: 700,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
};

const compactMatrix: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 12,
};

const plainPanel: CSSProperties = {
  border: "1px solid #d9e0e3",
  background: "#ffffff",
  borderRadius: 8,
  padding: 14,
};

const sectionTitle: CSSProperties = {
  margin: "0 0 8px",
  color: "#18262e",
  fontSize: 15,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const bodyText: CSSProperties = {
  margin: 0,
  color: "#33424b",
  fontSize: 14,
  lineHeight: 1.5,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const chip: CSSProperties = {
  border: "1px solid #ced8dd",
  background: "#f7fafb",
  borderRadius: 6,
  padding: "5px 7px",
  fontSize: 12,
  color: "#25343c",
};

const placeholderChip: CSSProperties = {
  ...chip,
  background: "#f6f3ee",
  borderColor: "#d9ccb8",
};

const surfaceStack: CSSProperties = {
  display: "grid",
  gap: 12,
};

const surfacePanel: CSSProperties = {
  border: "1px solid #d7e0e4",
  background: "#ffffff",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 12,
};

const panelHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  flexWrap: "wrap",
};

const panelEyebrow: CSSProperties = {
  margin: "0 0 4px",
  color: "#66727a",
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0,
};

const panelTitle: CSSProperties = {
  margin: 0,
  color: "#16242c",
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const stateBadge: CSSProperties = {
  borderRadius: 6,
  padding: "5px 7px",
  fontSize: 12,
  fontWeight: 800,
  whiteSpace: "nowrap",
};

const smallStateBadge: CSSProperties = {
  ...stateBadge,
  fontSize: 11,
  alignSelf: "flex-start",
};

const blockedBadge: CSSProperties = {
  border: "1px solid #b25b5b",
  background: "#fff1f1",
  color: "#6c1f1f",
};

const approvalBadge: CSSProperties = {
  border: "1px solid #8b7735",
  background: "#fff8df",
  color: "#5b470a",
};

const previewBadge: CSSProperties = {
  border: "1px solid #4f7c90",
  background: "#edf8fc",
  color: "#244b5c",
};

const devOnlyBadge: CSSProperties = {
  border: "1px solid #7a6f85",
  background: "#f5f2f8",
  color: "#453a52",
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 10,
};

const checklistRow: CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "flex-start",
  border: "1px solid #edf0f2",
  background: "#fbfcfc",
  borderRadius: 8,
  padding: 10,
};

const checkLabel: CSSProperties = {
  margin: "0 0 3px",
  color: "#20313a",
  fontSize: 13,
  fontWeight: 800,
};

const checkDetail: CSSProperties = {
  margin: 0,
  color: "#4d5960",
  fontSize: 12,
  lineHeight: 1.45,
};

const footerBand: CSSProperties = {
  borderTop: "1px solid #dce3e6",
  paddingTop: 12,
};

const safeLink: CSSProperties = {
  color: "#174e67",
  fontWeight: 800,
  textDecoration: "none",
};
