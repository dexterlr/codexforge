"use client";

import type { CSSProperties } from "react";
import {
  buildControlledExecutionReadinessGateRouteModel,
  buildControlledExecutionReadinessGateStableKey,
  type ControlledExecutionReadinessGatePanelState,
  type ControlledExecutionReadinessGateRouteSlug,
} from "../controlled-execution-readiness-gate-model";

export function ControlledExecutionReadinessGatePanel() {
  return <ControlledExecutionReadinessGateRoutePanel routeSlug="codexforge-cockpit" />;
}

export function ControlledExecutionReadinessGateRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ControlledExecutionReadinessGateRouteSlug;
  embedded?: boolean;
}) {
  const model = buildControlledExecutionReadinessGateRouteModel(routeSlug);

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-controlled-execution-readiness-gate={`${model.route.title} preview-only explicit operator approval required no real file mutation no real command execution no execution lock release no model calls no provider calls no connector calls no evidence persistence no result persistence no recovery execution`}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={devBadge}>{model.route.devOnly ? "Dev/test surface only" : "Cockpit readiness gate preview"}</span>
        </div>
        <h2 style={title}>{model.route.title}</h2>
        <p style={summary}>{model.route.summary}</p>
        <p style={safetyLead}>
          This is a preview-only controlled execution readiness gate. It checks goal lock, plan lock, diff lock,
          command lock, approval lock, evidence lock, result lock, recovery lock, audit lock, safety lock, operator
          signoff, denied path matrix, and go/no-go summary without applying files, running commands, calling models,
          persisting approvals, creating queues, releasing locks, persisting results, or executing recovery.
        </p>
      </header>

      <section style={noticeBand} aria-label="Controlled execution readiness safety boundary">
        {model.globalSafetyCopy.map((copy, index) => (
          <p key={buildControlledExecutionReadinessGateStableKey(["global-safety", model.route.slug, String(index)])} style={noticeText}>
            {copy}
          </p>
        ))}
      </section>

      <section style={markerBand} aria-label="Controlled execution readiness markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span key={buildControlledExecutionReadinessGateStableKey(["marker", model.route.slug, String(index)])} style={markerPill}>
            {marker}
          </span>
        ))}
      </section>

      <section style={splitBand} aria-label="Controlled execution readiness approval and denied paths">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Operator Approval Boundary</h3>
          <p style={bodyText}>{model.route.approvalCopy}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Denied Paths</h3>
          <p style={bodyText}>{model.route.deniedCopy}</p>
        </article>
      </section>

      <section style={compactMatrix} aria-label="Controlled execution readiness static model">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Readiness Checks</h3>
          <div style={chipRow}>
            {model.readinessChecks.map((checkName, index) => (
              <span key={buildControlledExecutionReadinessGateStableKey(["readiness-check", model.route.slug, String(index), checkName])} style={chip}>
                {checkName}
              </span>
            ))}
          </div>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Denied Path Matrix</h3>
          <div style={chipRow}>
            {model.deniedPathMatrix.map((pathName, index) => (
              <span key={buildControlledExecutionReadinessGateStableKey(["denied-path", model.route.slug, String(index), pathName])} style={chip}>
                {pathName}
              </span>
            ))}
          </div>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Result States</h3>
          <div style={chipRow}>
            {model.resultStates.map((stateName, index) => (
              <span key={buildControlledExecutionReadinessGateStableKey(["result-state", model.route.slug, String(index), stateName])} style={chip}>
                {stateName}
              </span>
            ))}
          </div>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Recovery Options</h3>
          <div style={chipRow}>
            {model.recoveryOptions.map((optionName, index) => (
              <span key={buildControlledExecutionReadinessGateStableKey(["recovery-option", model.route.slug, String(index), optionName])} style={chip}>
                {optionName}
              </span>
            ))}
          </div>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Build-Anything Targets</h3>
          <div style={chipRow}>
            {model.targetFamilies.map((targetName, index) => (
              <span key={buildControlledExecutionReadinessGateStableKey(["target-family", model.route.slug, String(index), targetName])} style={chip}>
                {targetName}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={surfaceStack} aria-label="Controlled execution readiness gate checklist">
        {model.surfaces.map((surface, surfaceIndex) => (
          <article
            key={buildControlledExecutionReadinessGateStableKey(["surface", model.route.slug, String(surfaceIndex), surface.id])}
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
                  key={buildControlledExecutionReadinessGateStableKey(["checklist-item", surface.id, String(itemIndex), checkItem.id])}
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
                  key={buildControlledExecutionReadinessGateStableKey(["placeholder", surface.id, String(placeholderIndex), placeholder])}
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

function formatState(state: ControlledExecutionReadinessGatePanelState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "preview-only") return "Preview only";
  if (state === "dev-test-only") return "Dev/test only";
  return "Blocked";
}

function stateStyle(state: ControlledExecutionReadinessGatePanelState): CSSProperties {
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

function smallStateStyle(state: ControlledExecutionReadinessGatePanelState): CSSProperties {
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
  maxWidth: 980,
  fontSize: 16,
  lineHeight: 1.5,
  color: "#344854",
};

const safetyLead: CSSProperties = {
  margin: 0,
  maxWidth: 1000,
  fontSize: 14,
  lineHeight: 1.55,
  color: "#4b5f6b",
};

const noticeBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  padding: 14,
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  background: "#f7fbf9",
};

const noticeText: CSSProperties = {
  margin: 0,
  color: "#27423d",
  fontSize: 13,
  lineHeight: 1.45,
};

const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const markerPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  border: "1px solid #d8dee4",
  borderRadius: 6,
  padding: "7px 9px",
  background: "#ffffff",
  color: "#2f3b43",
  fontSize: 12,
  lineHeight: 1.3,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
};

const compactMatrix: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
};

const plainPanel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
};

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const bodyText: CSSProperties = {
  margin: "8px 0 0",
  color: "#425563",
  fontSize: 14,
  lineHeight: 1.55,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 12,
};

const chip: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #c9d7e3",
  borderRadius: 6,
  padding: "7px 9px",
  background: "#f6f9fc",
  color: "#223645",
  fontSize: 13,
};

const surfaceStack: CSSProperties = {
  display: "grid",
  gap: 14,
};

const surfacePanel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
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
  color: "#60717d",
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0,
};

const panelTitle: CSSProperties = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const stateBadge: CSSProperties = {
  border: "1px solid",
  borderRadius: 6,
  padding: "6px 8px",
  fontSize: 12,
  fontWeight: 700,
};

const smallStateBadge: CSSProperties = {
  ...stateBadge,
  flex: "0 0 auto",
  padding: "4px 6px",
  fontSize: 11,
};

const blockedBadge: CSSProperties = {
  borderColor: "#d29a9a",
  background: "#fff3f1",
  color: "#7d2c26",
};

const approvalBadge: CSSProperties = {
  borderColor: "#c7a553",
  background: "#fff8e6",
  color: "#5c4512",
};

const previewBadge: CSSProperties = {
  borderColor: "#9db8d0",
  background: "#eef6fc",
  color: "#244862",
};

const devOnlyBadge: CSSProperties = {
  borderColor: "#a8aeb8",
  background: "#f4f5f7",
  color: "#4c5561",
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: 10,
  marginTop: 12,
};

const checklistRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr)",
  gap: 10,
  alignItems: "flex-start",
};

const checkLabel: CSSProperties = {
  margin: 0,
  color: "#233746",
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.35,
};

const checkDetail: CSSProperties = {
  margin: "3px 0 0",
  color: "#526472",
  fontSize: 13,
  lineHeight: 1.45,
};

const placeholderChip: CSSProperties = {
  ...chip,
  background: "#fbfcfd",
  color: "#4a5d69",
};

const footerBand: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  borderTop: "1px solid #d8dee4",
  paddingTop: 14,
};

const safeLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  border: "1px solid #a8bdd0",
  borderRadius: 6,
  padding: "8px 10px",
  color: "#204966",
  background: "#f5f9fc",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 13,
};
