"use client";

import type { CSSProperties } from "react";
import {
  buildRealControlledOperatorTrialPacketRouteModel,
  buildRealControlledOperatorTrialPacketStableKey,
  type RealControlledOperatorTrialPacketPanelState,
  type RealControlledOperatorTrialPacketRouteSlug,
} from "../real-controlled-operator-trial-packet-model";

export function RealControlledOperatorTrialPacketPanel() {
  return <RealControlledOperatorTrialPacketRoutePanel routeSlug="codexforge-cockpit" />;
}

export function RealControlledOperatorTrialPacketRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: RealControlledOperatorTrialPacketRouteSlug;
  embedded?: boolean;
}) {
  const model = buildRealControlledOperatorTrialPacketRouteModel(routeSlug);

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-real-controlled-operator-trial-packet={`${model.route.title} preview-only explicit operator approval required no real file mutation no real command execution no real operator trial execution no model calls no provider calls no connector calls no approval persistence no queue persistence no execution lock release no evidence persistence no result persistence no recovery execution`}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={devBadge}>{model.route.devOnly ? "Dev/test surface only" : "Cockpit trial packet preview"}</span>
        </div>
        <h2 style={title}>{model.route.title}</h2>
        <p style={summary}>{model.route.summary}</p>
        <p style={safetyLead}>
          This is the first real controlled operator trial packet, not actual real execution. It previews the goal,
          project context, proposed file write, proposed command, approval packet, execution hold, evidence capture,
          result capture, recovery plan, audit packet, operator checklist, denied path checklist, and go/no-go review
          while the real trial remains blocked.
        </p>
      </header>

      <section style={noticeBand} aria-label="Real controlled operator trial safety boundary">
        {model.globalSafetyCopy.map((copy, index) => (
          <p
            key={buildRealControlledOperatorTrialPacketStableKey(["global-safety", model.route.slug, String(index)])}
            style={noticeText}
          >
            {copy}
          </p>
        ))}
      </section>

      <section style={markerBand} aria-label="Real controlled operator trial markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildRealControlledOperatorTrialPacketStableKey(["marker", model.route.slug, String(index)])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={splitBand} aria-label="Real controlled operator trial approval and denied paths">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Operator Approval Boundary</h3>
          <p style={bodyText}>{model.route.approvalCopy}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Denied Paths</h3>
          <p style={bodyText}>{model.route.deniedCopy}</p>
        </article>
      </section>

      <section style={compactMatrix} aria-label="Real controlled operator trial static model">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Packet Flow</h3>
          <div style={chipRow}>
            {model.packetFlow.map((flowName, index) => (
              <span
                key={buildRealControlledOperatorTrialPacketStableKey(["packet-flow", model.route.slug, String(index), flowName])}
                style={chip}
              >
                {flowName}
              </span>
            ))}
          </div>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Denied Path Checklist</h3>
          <div style={chipRow}>
            {model.deniedPathMatrix.map((pathName, index) => (
              <span
                key={buildRealControlledOperatorTrialPacketStableKey(["denied-path", model.route.slug, String(index), pathName])}
                style={chip}
              >
                {pathName}
              </span>
            ))}
          </div>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Result States</h3>
          <div style={chipRow}>
            {model.resultStates.map((stateName, index) => (
              <span
                key={buildRealControlledOperatorTrialPacketStableKey(["result-state", model.route.slug, String(index), stateName])}
                style={chip}
              >
                {stateName}
              </span>
            ))}
          </div>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Recovery Options</h3>
          <div style={chipRow}>
            {model.recoveryOptions.map((optionName, index) => (
              <span
                key={buildRealControlledOperatorTrialPacketStableKey(["recovery-option", model.route.slug, String(index), optionName])}
                style={chip}
              >
                {optionName}
              </span>
            ))}
          </div>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Future Backend Guards</h3>
          <div style={chipRow}>
            {model.futureBackendGuards.map((guardName, index) => (
              <span
                key={buildRealControlledOperatorTrialPacketStableKey(["future-guard", model.route.slug, String(index), guardName])}
                style={chip}
              >
                {guardName}
              </span>
            ))}
          </div>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Build-Anything Scope</h3>
          <div style={chipRow}>
            {model.targetFamilies.map((targetName, index) => (
              <span
                key={buildRealControlledOperatorTrialPacketStableKey(["target-family", model.route.slug, String(index), targetName])}
                style={chip}
              >
                {targetName}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={surfaceStack} aria-label="Real controlled operator trial packet checklist">
        {model.surfaces.map((surface, surfaceIndex) => (
          <article
            key={buildRealControlledOperatorTrialPacketStableKey(["surface", model.route.slug, String(surfaceIndex), surface.id])}
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
                  key={buildRealControlledOperatorTrialPacketStableKey(["checklist-item", surface.id, String(itemIndex), checkItem.id])}
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
                  key={buildRealControlledOperatorTrialPacketStableKey(["placeholder", surface.id, String(placeholderIndex), placeholder])}
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

function formatState(state: RealControlledOperatorTrialPacketPanelState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "preview-only") return "Preview only";
  if (state === "dev-test-only") return "Dev/test only";
  return "Blocked";
}

function stateStyle(state: RealControlledOperatorTrialPacketPanelState): CSSProperties {
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

function smallStateStyle(state: RealControlledOperatorTrialPacketPanelState): CSSProperties {
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
};

const phaseBadge: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #8aa4b8",
  borderRadius: 6,
  padding: "5px 8px",
  fontSize: 12,
  fontWeight: 700,
  color: "#233746",
  background: "#f2f7fa",
};

const devBadge: CSSProperties = {
  ...phaseBadge,
  borderColor: "#c7a553",
  color: "#5c4512",
  background: "#fff7df",
};

const title: CSSProperties = {
  margin: 0,
  fontSize: 28,
  lineHeight: 1.15,
  letterSpacing: 0,
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 900,
  fontSize: 17,
  lineHeight: 1.5,
  color: "#33424c",
};

const safetyLead: CSSProperties = {
  ...summary,
  fontSize: 15,
  color: "#4c5f68",
};

const noticeBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  padding: 14,
  border: "1px solid #d9e5ea",
  borderRadius: 8,
  background: "#f7fafb",
};

const noticeText: CSSProperties = {
  margin: 0,
  fontSize: 13,
  lineHeight: 1.45,
  color: "#33424c",
};

const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const markerPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: 28,
  border: "1px solid #ccd9df",
  borderRadius: 6,
  padding: "5px 8px",
  fontSize: 12,
  fontWeight: 700,
  color: "#263943",
  background: "#ffffff",
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
};

const compactMatrix: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
};

const plainPanel: CSSProperties = {
  border: "1px solid #d7e2e7",
  borderRadius: 8,
  padding: 14,
  background: "#ffffff",
};

const sectionTitle: CSSProperties = {
  margin: "0 0 8px",
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const bodyText: CSSProperties = {
  margin: 0,
  color: "#3f4f58",
  fontSize: 14,
  lineHeight: 1.5,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
};

const chip: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #d7e2e7",
  borderRadius: 6,
  padding: "5px 7px",
  fontSize: 12,
  fontWeight: 700,
  color: "#31434c",
  background: "#f8fbfc",
};

const surfaceStack: CSSProperties = {
  display: "grid",
  gap: 12,
};

const surfacePanel: CSSProperties = {
  border: "1px solid #d7e2e7",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
};

const panelHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
  marginBottom: 10,
};

const panelEyebrow: CSSProperties = {
  margin: 0,
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 0,
  color: "#5b6e77",
};

const panelTitle: CSSProperties = {
  margin: "2px 0 0",
  fontSize: 20,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const stateBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 28,
  borderRadius: 6,
  padding: "5px 8px",
  fontSize: 12,
  fontWeight: 800,
  whiteSpace: "nowrap",
};

const smallStateBadge: CSSProperties = {
  ...stateBadge,
  minHeight: 24,
  fontSize: 11,
};

const blockedBadge: CSSProperties = {
  border: "1px solid #d7a2a2",
  color: "#7b1f1f",
  background: "#fff2f2",
};

const approvalBadge: CSSProperties = {
  border: "1px solid #c7a553",
  color: "#5c4512",
  background: "#fff7df",
};

const previewBadge: CSSProperties = {
  border: "1px solid #8aa4b8",
  color: "#233746",
  background: "#f2f7fa",
};

const devOnlyBadge: CSSProperties = {
  border: "1px solid #ac9fc8",
  color: "#47386b",
  background: "#f7f3ff",
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: 9,
  marginTop: 12,
  marginBottom: 12,
};

const checklistRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  gap: 10,
  alignItems: "start",
};

const checkLabel: CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 800,
  color: "#263943",
};

const checkDetail: CSSProperties = {
  margin: "2px 0 0",
  fontSize: 13,
  lineHeight: 1.45,
  color: "#52656e",
};

const placeholderChip: CSSProperties = {
  ...chip,
  background: "#fbf9f0",
  borderColor: "#e4d7a9",
  color: "#5c4a16",
};

const footerBand: CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
};

const safeLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: 34,
  borderRadius: 6,
  border: "1px solid #204a5a",
  padding: "7px 10px",
  color: "#143340",
  background: "#eef7fa",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 800,
};
