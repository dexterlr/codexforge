"use client";

import type { CSSProperties } from "react";
import {
  buildGuardedApplyRunDryRunRouteModel,
  buildGuardedApplyRunDryRunStableKey,
  type GuardedApplyRunDryRunPanelState,
  type GuardedApplyRunDryRunRouteSlug,
} from "../guarded-apply-run-dry-run-model";

export function GuardedApplyRunDryRunPanel() {
  return <GuardedApplyRunDryRunRoutePanel routeSlug="codexforge-cockpit" />;
}

export function GuardedApplyRunDryRunRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: GuardedApplyRunDryRunRouteSlug;
  embedded?: boolean;
}) {
  const model = buildGuardedApplyRunDryRunRouteModel(routeSlug);
  const packet = model.packet;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-guarded-apply-run-dry-run={`${model.route.title} dry-run packet preview-only explicit operator approval required not executable from the UI no real file mutation no real command execution no backend execution no apply or run execution no approval persistence no queue persistence no evidence persistence no result persistence no audit persistence no recovery execution`}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={devBadge}>{model.route.devOnly ? "Dev/test surface only" : "Cockpit dry-run packet preview"}</span>
        </div>
        <h2 style={title}>{model.route.title}</h2>
        <p style={summary}>{model.route.summary}</p>
        <p style={safetyLead}>
          This cockpit layer shows the proposed apply packet, proposed command packet, guard results, approval
          verification, queue preview, evidence/result/recovery preview, audit preview, go/no-go decision, and why
          execution is still held. Dry-run packet is not executable from the UI.
        </p>
      </header>

      <section style={noticeBand} aria-label="Guarded apply run dry-run safety boundary">
        {model.globalSafetyCopy.map((copy, index) => (
          <p key={buildGuardedApplyRunDryRunStableKey(["global-safety", model.route.slug, String(index)])} style={noticeText}>
            {copy}
          </p>
        ))}
      </section>

      <section style={markerBand} aria-label="Guarded apply run dry-run markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildGuardedApplyRunDryRunStableKey(["marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={splitBand} aria-label="Guarded apply run dry-run approval and denied paths">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Operator Approval Boundary</h3>
          <p style={bodyText}>{model.route.approvalCopy}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Denied Paths</h3>
          <p style={bodyText}>{model.route.deniedCopy}</p>
        </article>
      </section>

      <section style={packetBand} aria-label="Guarded apply run dry-run packet shape">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Packet Identity</h3>
          <p style={bodyText}>packetId: {packet.packetId}</p>
          <p style={bodyText}>packetKind: {packet.packetKind}</p>
          <p style={bodyText}>approvalState: {packet.approvalState}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Goal</h3>
          <p style={bodyText}>{packet.goal}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Workspace Boundary</h3>
          <p style={bodyText}>{packet.workspaceBoundary}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Go No-Go Decision</h3>
          <p style={bodyText}>{packet.goNoGoDecision}</p>
        </article>
      </section>

      <section style={compactMatrix} aria-label="Guarded apply run dry-run packet review flow">
        <MatrixPanel title="Packet Review Flow" values={model.packetReviewFlow} routeSlug={model.route.slug} namespace="packet-review-flow" />
        <MatrixPanel title="Apply Preview" values={packet.applyPreview} routeSlug={model.route.slug} namespace="apply-preview" />
        <MatrixPanel title="Run Preview" values={packet.runPreview} routeSlug={model.route.slug} namespace="run-preview" />
        <MatrixPanel title="Path Guard Evaluation" values={packet.pathGuardEvaluation} routeSlug={model.route.slug} namespace="path-guard" />
        <MatrixPanel title="Command Guard Evaluation" values={packet.commandGuardEvaluation} routeSlug={model.route.slug} namespace="command-guard" />
        <MatrixPanel title="Evidence Preview" values={packet.evidencePreview} routeSlug={model.route.slug} namespace="evidence-preview" />
        <MatrixPanel title="Result Preview" values={packet.resultPreview} routeSlug={model.route.slug} namespace="result-preview" />
        <MatrixPanel title="Recovery Preview" values={packet.recoveryPreview} routeSlug={model.route.slug} namespace="recovery-preview" />
        <MatrixPanel title="Audit Preview" values={packet.auditPreview} routeSlug={model.route.slug} namespace="audit-preview" />
        <MatrixPanel title="Queue Preview" values={packet.queuePreview} routeSlug={model.route.slug} namespace="queue-preview" />
        <MatrixPanel title="Denied Path Matrix" values={packet.deniedPathMatrix} routeSlug={model.route.slug} namespace="denied-path" />
        <MatrixPanel title="Build-Anything Scope" values={model.targetFamilies} routeSlug={model.route.slug} namespace="target-family" />
        <MatrixPanel
          title="Explicit Non-Execution Guarantees"
          values={packet.explicitNonExecutionGuarantees}
          routeSlug={model.route.slug}
          namespace="non-execution"
        />
      </section>

      <section style={surfaceStack} aria-label="Guarded apply run dry-run checklist">
        {model.surfaces.map((surface, surfaceIndex) => (
          <article
            key={buildGuardedApplyRunDryRunStableKey(["surface", model.route.slug, String(surfaceIndex), surface.id])}
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
                  key={buildGuardedApplyRunDryRunStableKey(["checklist-item", surface.id, String(itemIndex), checkItem.id])}
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
                  key={buildGuardedApplyRunDryRunStableKey(["placeholder", surface.id, String(placeholderIndex), placeholder])}
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
          <span key={buildGuardedApplyRunDryRunStableKey([namespace, routeSlug, String(index), value])} style={chip}>
            {value}
          </span>
        ))}
      </div>
    </article>
  );
}

function formatState(state: GuardedApplyRunDryRunPanelState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "dry-run-only") return "Dry-run only";
  if (state === "preview-only") return "Preview only";
  if (state === "dev-test-only") return "Dev/test only";
  return "Blocked";
}

function stateStyle(state: GuardedApplyRunDryRunPanelState): CSSProperties {
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

function smallStateStyle(state: GuardedApplyRunDryRunPanelState): CSSProperties {
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

const devOnlyBadge: CSSProperties = {
  borderColor: "#a8aeb8",
  background: "#f4f5f7",
  color: "#3f4852",
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
