"use client";

import type { CSSProperties } from "react";
import {
  buildTinyRealControlledTrialRouteModel,
  buildTinyRealControlledTrialStableKey,
  listTinyRealControlledTrialRouteDefinitions,
  type TinyRealControlledTrialPanelState,
  type TinyRealControlledTrialRouteSlug,
} from "../tiny-real-controlled-trial-model";

export function TinyRealControlledTrialPanel() {
  return <TinyRealControlledTrialRoutePanel routeSlug="codexforge-cockpit" />;
}

export function TinyRealControlledTrialRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: TinyRealControlledTrialRouteSlug;
  embedded?: boolean;
}) {
  const model = buildTinyRealControlledTrialRouteModel(routeSlug);
  const contract = model.contract;
  const routeDefinitions = listTinyRealControlledTrialRouteDefinitions().filter(
    (definition) => definition.slug !== "codexforge-cockpit"
  );

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-tiny-real-controlled-trial={`${model.route.title} tiny real controlled operator trial explicit operator approval backend-owned guarded execution no broad execution no direct file mutation no direct command execution evidence result audit backend-owned recovery approval-gated`}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={devBadge}>{model.route.devOnly ? "Dev/test surface only" : "Cockpit tiny-real preview"}</span>
        </div>
        <h2 style={title}>{model.route.title}</h2>
        <p style={summary}>{model.route.summary}</p>
        <p style={safetyLead}>
          This is the first tiny real controlled trial path. It is intentionally tiny: one sandbox-bounded file write
          candidate, one allowlisted read-only command candidate, one explicit approval ticket, and one backend-owned
          guarded execution boundary. Broad execution is still blocked.
        </p>
      </header>

      <section style={noticeBand} aria-label="Tiny real controlled trial safety boundary">
        {model.globalSafetyCopy.map((copy, index) => (
          <p key={buildTinyRealControlledTrialStableKey(["global-safety", model.route.slug, String(index)])} style={noticeText}>
            {copy}
          </p>
        ))}
      </section>

      <section style={markerBand} aria-label="Tiny real controlled trial markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildTinyRealControlledTrialStableKey(["marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={splitBand} aria-label="Tiny real controlled trial approval and denied paths">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Operator Approval Boundary</h3>
          <p style={bodyText}>{model.route.approvalCopy}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Denied Paths</h3>
          <p style={bodyText}>{model.route.deniedCopy}</p>
        </article>
      </section>

      <section style={packetBand} aria-label="Tiny real controlled trial contract identity">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Trial Identity</h3>
          <p style={bodyText}>trialId: {contract.trialId}</p>
          <p style={bodyText}>trialKind: {contract.trialKind}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Goal</h3>
          <p style={bodyText}>{contract.goal}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Workspace Boundary</h3>
          <p style={bodyText}>{contract.workspaceBoundary}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Backend Execution Hold</h3>
          <p style={bodyText}>{contract.executionHold}</p>
        </article>
      </section>

      <section style={splitBand} aria-label="Tiny real controlled trial candidates">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Sandbox File Write Candidate</h3>
          <p style={bodyText}>path: {contract.sandboxWriteCandidate.path}</p>
          <p style={bodyText}>{contract.sandboxWriteCandidate.diffSummary}</p>
          <p style={bodyText}>{contract.sandboxWriteCandidate.guardStatement}</p>
          <p style={bodyText}>{contract.sandboxWriteCandidate.approvalRequirement}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Allowlisted Command Candidate</h3>
          <p style={bodyText}>command: {contract.commandCandidate.command}</p>
          <p style={bodyText}>workingDirectory: {contract.commandCandidate.workingDirectory}</p>
          <p style={bodyText}>timeout: {contract.commandCandidate.timeout}</p>
          <p style={bodyText}>{contract.commandCandidate.guardStatement}</p>
          <p style={bodyText}>{contract.commandCandidate.approvalRequirement}</p>
        </article>
      </section>

      <section style={compactMatrix} aria-label="Tiny real controlled trial contract matrices">
        <MatrixPanel title="Trial Review Flow" values={model.trialReviewFlow} routeSlug={model.route.slug} namespace="trial-review-flow" />
        <MatrixPanel title="Approval Ticket" values={contract.approvalTicket} routeSlug={model.route.slug} namespace="approval-ticket" />
        <MatrixPanel title="Path Guard" values={contract.pathGuard} routeSlug={model.route.slug} namespace="path-guard" />
        <MatrixPanel title="Command Guard" values={contract.commandGuard} routeSlug={model.route.slug} namespace="command-guard" />
        <MatrixPanel title="Preflight Review" values={contract.preflightReview} routeSlug={model.route.slug} namespace="preflight" />
        <MatrixPanel title="Evidence Capture Contract" values={contract.evidenceCaptureContract} routeSlug={model.route.slug} namespace="evidence" />
        <MatrixPanel title="Result Capture Contract" values={contract.resultCaptureContract} routeSlug={model.route.slug} namespace="result" />
        <MatrixPanel title="Audit Capture Contract" values={contract.auditCaptureContract} routeSlug={model.route.slug} namespace="audit" />
        <MatrixPanel title="Recovery Contract" values={contract.recoveryContract} routeSlug={model.route.slug} namespace="recovery" />
        <MatrixPanel title="Denied Path Matrix" values={contract.deniedPathMatrix} routeSlug={model.route.slug} namespace="denied" />
        <MatrixPanel title="Operator Signoff" values={contract.operatorSignoff} routeSlug={model.route.slug} namespace="signoff" />
        <MatrixPanel title="Explicit Safety Limits" values={contract.explicitSafetyLimits} routeSlug={model.route.slug} namespace="safety" />
      </section>

      <section style={decisionBand} aria-label="Tiny real controlled trial go no-go review">
        <h3 style={sectionTitle}>Go/No-Go Review</h3>
        <p style={bodyText}>{contract.goNoGoDecision}</p>
      </section>

      <section style={surfaceStack} aria-label="Tiny real controlled trial checklist">
        {model.surfaces.map((surface, surfaceIndex) => (
          <article
            key={buildTinyRealControlledTrialStableKey(["surface", model.route.slug, String(surfaceIndex), surface.id])}
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
                  key={buildTinyRealControlledTrialStableKey(["checklist-item", surface.id, String(itemIndex), checkItem.id])}
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
            <div style={chipRow} aria-label={`${surface.title} evidence placeholders`}>
              {surface.evidence.map((item, itemIndex) => (
                <span
                  key={buildTinyRealControlledTrialStableKey(["evidence", surface.id, String(itemIndex), item])}
                  style={placeholderChip}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section style={routeBand} aria-label="Tiny real controlled trial phase routes">
        <h3 style={sectionTitle}>Tiny Real Trial Phase Routes</h3>
        <div style={routeGrid}>
          {routeDefinitions.map((definition, index) => (
            <a
              key={buildTinyRealControlledTrialStableKey(["route-link", String(index), definition.slug])}
              style={routeLink}
              href={definition.href}
            >
              <span style={routePhase}>{definition.phase}</span>
              <span style={routeLabel}>{definition.title}</span>
              <span style={routeCommand}>{definition.commandLabel}</span>
            </a>
          ))}
        </div>
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
          <span key={buildTinyRealControlledTrialStableKey([namespace, routeSlug, String(index), value])} style={chip}>
            {value}
          </span>
        ))}
      </div>
    </article>
  );
}

function formatState(state: TinyRealControlledTrialPanelState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "candidate-only") return "Candidate only";
  if (state === "review-only") return "Review only";
  return "Blocked";
}

function stateStyle(state: TinyRealControlledTrialPanelState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "backend-owned"
          ? backendBadge
          : previewBadge),
  };
}

function smallStateStyle(state: TinyRealControlledTrialPanelState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "backend-owned"
          ? backendBadge
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
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  padding: 14,
  background: "#f7fbf9",
};

const noticeText: CSSProperties = {
  margin: 0,
  color: "#294039",
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

const packetBand: CSSProperties = {
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
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 14,
  background: "#ffffff",
};

const decisionBand: CSSProperties = {
  ...plainPanel,
  borderColor: "#c5d8cc",
  background: "#f7fbf8",
};

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 17,
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
  marginTop: 10,
};

const chip: CSSProperties = {
  border: "1px solid #c9d7e3",
  borderRadius: 6,
  padding: "6px 8px",
  background: "#f6f9fc",
  color: "#223645",
  fontSize: 12,
};

const placeholderChip: CSSProperties = {
  ...chip,
  background: "#fbfcfd",
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

const backendBadge: CSSProperties = {
  borderColor: "#8fb6a7",
  background: "#f0faf5",
  color: "#1f5947",
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
  marginTop: 14,
};

const checklistRow: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  borderTop: "1px solid #edf1f4",
  paddingTop: 10,
};

const checkLabel: CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 700,
  color: "#263640",
};

const checkDetail: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 13,
  lineHeight: 1.45,
  color: "#5a6a76",
};

const routeBand: CSSProperties = {
  borderTop: "1px solid #e1e7ec",
  paddingTop: 14,
};

const routeGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const routeLink: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 12,
  background: "#ffffff",
  color: "#24333d",
  textDecoration: "none",
};

const routePhase: CSSProperties = {
  color: "#677783",
  fontSize: 12,
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
};

const routeCommand: CSSProperties = {
  color: "#51626e",
  fontSize: 12,
  lineHeight: 1.35,
};

const footerBand: CSSProperties = {
  borderTop: "1px solid #e1e7ec",
  paddingTop: 14,
};

const safeLink: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #b7c9d7",
  borderRadius: 6,
  padding: "8px 10px",
  color: "#164666",
  background: "#ffffff",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 700,
};
