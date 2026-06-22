"use client";

import type { CSSProperties } from "react";
import {
  buildRealTrialHardeningRouteModel,
  buildRealTrialHardeningStableKey,
  listRealTrialHardeningRouteDefinitions,
  type RealTrialHardeningPanelState,
  type RealTrialHardeningRouteSlug,
} from "../real-trial-hardening-model";

export function RealTrialHardeningPanel() {
  return <RealTrialHardeningRoutePanel routeSlug="codexforge-cockpit" />;
}

export function RealTrialHardeningRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: RealTrialHardeningRouteSlug;
  embedded?: boolean;
}) {
  const model = buildRealTrialHardeningRouteModel(routeSlug);
  const hardening = model.hardening;
  const routeDefinitions = listRealTrialHardeningRouteDefinitions().filter(
    (definition) => definition.slug !== "codexforge-cockpit"
  );

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-real-trial-hardening={`${model.route.title} hardening-only tiny real controlled trial backend-owned guarded execution explicit operator approval no broad execution no direct recovery no direct rollback no direct retry`}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={devBadge}>{model.route.devOnly ? "Dev/test surface only" : "Cockpit hardening preview"}</span>
        </div>
        <h2 style={title}>{model.route.title}</h2>
        <p style={summary}>{model.route.summary}</p>
        <p style={safetyLead}>
          The tiny real trial needs hardening before broader execution because every denied path, denied command,
          expired approval, dirty workspace, preflight failure, backend guard mismatch, capture gap, operator stop,
          manual review, rollback preview, and retry preview must fail closed. Broad execution is still blocked.
        </p>
      </header>

      <section style={noticeBand} aria-label="Real trial hardening safety boundary">
        {model.globalSafetyCopy.map((copy, index) => (
          <p key={buildRealTrialHardeningStableKey(["global-safety", model.route.slug, String(index)])} style={noticeText}>
            {copy}
          </p>
        ))}
      </section>

      <section style={markerBand} aria-label="Real trial hardening markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildRealTrialHardeningStableKey(["marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={splitBand} aria-label="Real trial hardening approval and denied paths">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Operator Approval Boundary</h3>
          <p style={bodyText}>{model.route.approvalCopy}</p>
          <p style={bodyText}>
            Expired and stale approvals are invalid. Any future backend-owned execution must require a fresh explicit
            human approval and must not accept replayed or scope-invalid tickets.
          </p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Denied Paths And Commands</h3>
          <p style={bodyText}>{model.route.deniedCopy}</p>
          <p style={bodyText}>
            Denied path and denied command recovery remains blocked in the cockpit; the UI can only show the denial,
            the review reason, and the next safe operator choice.
          </p>
        </article>
      </section>

      <section style={packetBand} aria-label="Real trial hardening model identity">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Hardening Identity</h3>
          <p style={bodyText}>hardeningId: {hardening.hardeningId}</p>
          <p style={bodyText}>trialId: {hardening.trialId}</p>
          <p style={bodyText}>trialKind: {hardening.trialKind}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Goal</h3>
          <p style={bodyText}>{hardening.goal}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Workspace Boundary</h3>
          <p style={bodyText}>{hardening.workspaceBoundary}</p>
        </article>
      </section>

      <section style={splitBand} aria-label="Real trial hardening failure explanation">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Failure Handling</h3>
          <p style={bodyText}>{model.route.handlingCopy}</p>
          <p style={bodyText}>
            Dirty workspace and preflight failures stop before apply or run. Backend guard mismatch does not release
            execution. Evidence, result, and audit capture failures are represented as backend-owned future capture
            gaps, not UI persistence.
          </p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Recovery Boundary</h3>
          <p style={bodyText}>
            Operator stop and manual review are represented as review states. Rollback, retry, restore,
            explain-failure, safety-stop, partial recovery, and recovery execution remain approval-gated and blocked
            from direct cockpit execution.
          </p>
        </article>
      </section>

      <section style={compactMatrix} aria-label="Real trial hardening model matrices">
        <MatrixPanel title="Hardening Flow" values={model.hardeningFlow} routeSlug={model.route.slug} namespace="hardening-flow" />
        <MatrixPanel title="Failure Scenarios" values={hardening.failureScenarios} routeSlug={model.route.slug} namespace="failure-scenarios" />
        <MatrixPanel title="Denied Path Handling" values={hardening.deniedPathHandling} routeSlug={model.route.slug} namespace="denied-path" />
        <MatrixPanel title="Denied Command Handling" values={hardening.deniedCommandHandling} routeSlug={model.route.slug} namespace="denied-command" />
        <MatrixPanel title="Approval Expiry Handling" values={hardening.approvalExpiryHandling} routeSlug={model.route.slug} namespace="approval-expiry" />
        <MatrixPanel title="Dirty Workspace Handling" values={hardening.dirtyWorkspaceHandling} routeSlug={model.route.slug} namespace="dirty-workspace" />
        <MatrixPanel title="Preflight Failure Handling" values={hardening.preflightFailureHandling} routeSlug={model.route.slug} namespace="preflight" />
        <MatrixPanel title="Backend Guard Mismatch Handling" values={hardening.backendGuardMismatchHandling} routeSlug={model.route.slug} namespace="backend-guard" />
        <MatrixPanel title="Evidence Failure Handling" values={hardening.evidenceFailureHandling} routeSlug={model.route.slug} namespace="evidence" />
        <MatrixPanel title="Result Failure Handling" values={hardening.resultFailureHandling} routeSlug={model.route.slug} namespace="result" />
        <MatrixPanel title="Audit Failure Handling" values={hardening.auditFailureHandling} routeSlug={model.route.slug} namespace="audit" />
        <MatrixPanel title="Operator Stop Handling" values={hardening.operatorStopHandling} routeSlug={model.route.slug} namespace="operator-stop" />
        <MatrixPanel title="Manual Review Handling" values={hardening.manualReviewHandling} routeSlug={model.route.slug} namespace="manual-review" />
        <MatrixPanel title="Recovery Review Packet" values={hardening.recoveryReviewPacket} routeSlug={model.route.slug} namespace="recovery-review" />
        <MatrixPanel title="Rollback Readiness Preview" values={hardening.rollbackReadinessPreview} routeSlug={model.route.slug} namespace="rollback" />
        <MatrixPanel title="Retry Readiness Preview" values={hardening.retryReadinessPreview} routeSlug={model.route.slug} namespace="retry" />
        <MatrixPanel title="Explicit Safety Limits" values={hardening.explicitSafetyLimits} routeSlug={model.route.slug} namespace="safety-limits" />
      </section>

      <section style={decisionBand} aria-label="Controlled real trial hardening go no-go review">
        <h3 style={sectionTitle}>Go/No-Go Decision</h3>
        <p style={bodyText}>{hardening.goNoGoDecision}</p>
      </section>

      <section style={surfaceStack} aria-label="Real trial hardening checklist">
        {model.surfaces.map((surface, surfaceIndex) => (
          <article
            key={buildRealTrialHardeningStableKey(["surface", model.route.slug, String(surfaceIndex), surface.id])}
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
                  key={buildRealTrialHardeningStableKey(["checklist-item", surface.id, String(itemIndex), checkItem.id])}
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
                  key={buildRealTrialHardeningStableKey(["evidence", surface.id, String(itemIndex), item])}
                  style={placeholderChip}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section style={routeBand} aria-label="Real trial hardening phase routes">
        <h3 style={sectionTitle}>Real Trial Hardening Phase Routes</h3>
        <div style={routeGrid}>
          {routeDefinitions.map((definition, index) => (
            <a
              key={buildRealTrialHardeningStableKey(["route-link", String(index), definition.slug])}
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
          <span key={buildRealTrialHardeningStableKey([namespace, routeSlug, String(index), value])} style={chip}>
            {value}
          </span>
        ))}
      </div>
    </article>
  );
}

function formatState(state: RealTrialHardeningPanelState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "manual-review") return "Manual review";
  if (state === "preview-only") return "Preview only";
  return "Blocked";
}

function stateStyle(state: RealTrialHardeningPanelState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "backend-owned"
          ? backendBadge
          : state === "manual-review"
            ? manualBadge
            : previewBadge),
  };
}

function smallStateStyle(state: RealTrialHardeningPanelState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "backend-owned"
          ? backendBadge
          : state === "manual-review"
            ? manualBadge
            : previewBadge),
  };
}

const page: CSSProperties = {
  display: "grid",
  gap: "24px",
  padding: "32px",
};

const embeddedPage: CSSProperties = {
  display: "grid",
  gap: "20px",
  padding: "24px 0",
};

const hero: CSSProperties = {
  display: "grid",
  gap: "12px",
  maxWidth: "980px",
};

const eyebrowRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const phaseBadge: CSSProperties = {
  border: "1px solid #94a3b8",
  borderRadius: "6px",
  color: "#0f172a",
  fontSize: "12px",
  fontWeight: 700,
  padding: "5px 8px",
};

const devBadge: CSSProperties = {
  border: "1px solid #bfdbfe",
  borderRadius: "6px",
  color: "#1d4ed8",
  fontSize: "12px",
  fontWeight: 700,
  padding: "5px 8px",
};

const title: CSSProperties = {
  color: "#0f172a",
  fontSize: "32px",
  lineHeight: 1.1,
  margin: 0,
};

const summary: CSSProperties = {
  color: "#334155",
  fontSize: "16px",
  lineHeight: 1.6,
  margin: 0,
};

const safetyLead: CSSProperties = {
  color: "#475569",
  fontSize: "14px",
  lineHeight: 1.7,
  margin: 0,
};

const noticeBand: CSSProperties = {
  display: "grid",
  gap: "8px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "16px",
  background: "#f8fafc",
};

const noticeText: CSSProperties = {
  color: "#334155",
  fontSize: "13px",
  lineHeight: 1.5,
  margin: 0,
};

const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const markerPill: CSSProperties = {
  border: "1px solid #bae6fd",
  borderRadius: "6px",
  background: "#f0f9ff",
  color: "#075985",
  fontSize: "12px",
  fontWeight: 700,
  padding: "6px 8px",
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
};

const packetBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
};

const compactMatrix: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "16px",
};

const plainPanel: CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "16px",
  background: "#ffffff",
};

const sectionTitle: CSSProperties = {
  color: "#0f172a",
  fontSize: "16px",
  lineHeight: 1.3,
  margin: "0 0 10px",
};

const bodyText: CSSProperties = {
  color: "#334155",
  fontSize: "13px",
  lineHeight: 1.6,
  margin: "0 0 8px",
};

const decisionBand: CSSProperties = {
  border: "1px solid #fecaca",
  borderRadius: "8px",
  padding: "16px",
  background: "#fff7ed",
};

const surfaceStack: CSSProperties = {
  display: "grid",
  gap: "16px",
};

const surfacePanel: CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "16px",
  background: "#ffffff",
};

const panelHeader: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "12px",
};

const panelEyebrow: CSSProperties = {
  color: "#64748b",
  fontSize: "12px",
  fontWeight: 700,
  margin: "0 0 4px",
};

const panelTitle: CSSProperties = {
  color: "#0f172a",
  fontSize: "18px",
  lineHeight: 1.25,
  margin: 0,
};

const stateBadge: CSSProperties = {
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 700,
  padding: "5px 8px",
  whiteSpace: "nowrap",
};

const smallStateBadge: CSSProperties = {
  borderRadius: "6px",
  flex: "0 0 auto",
  fontSize: "11px",
  fontWeight: 700,
  padding: "4px 6px",
  whiteSpace: "nowrap",
};

const blockedBadge: CSSProperties = {
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#991b1b",
};

const approvalBadge: CSSProperties = {
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  color: "#9a3412",
};

const backendBadge: CSSProperties = {
  background: "#ecfdf5",
  border: "1px solid #bbf7d0",
  color: "#166534",
};

const manualBadge: CSSProperties = {
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  color: "#1d4ed8",
};

const previewBadge: CSSProperties = {
  background: "#f8fafc",
  border: "1px solid #cbd5e1",
  color: "#334155",
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: "10px",
  marginTop: "12px",
};

const checklistRow: CSSProperties = {
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
};

const checkLabel: CSSProperties = {
  color: "#0f172a",
  fontSize: "13px",
  fontWeight: 700,
  lineHeight: 1.4,
  margin: 0,
};

const checkDetail: CSSProperties = {
  color: "#64748b",
  fontSize: "12px",
  lineHeight: 1.5,
  margin: "2px 0 0",
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const chip: CSSProperties = {
  border: "1px solid #dbeafe",
  borderRadius: "6px",
  background: "#f8fafc",
  color: "#1e3a8a",
  fontSize: "12px",
  lineHeight: 1.4,
  padding: "6px 8px",
};

const placeholderChip: CSSProperties = {
  ...chip,
  marginTop: "12px",
};

const routeBand: CSSProperties = {
  display: "grid",
  gap: "12px",
};

const routeGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "10px",
};

const routeLink: CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  color: "#0f172a",
  display: "grid",
  gap: "4px",
  padding: "12px",
  textDecoration: "none",
};

const routePhase: CSSProperties = {
  color: "#475569",
  fontSize: "12px",
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  color: "#0f172a",
  fontSize: "14px",
  fontWeight: 700,
};

const routeCommand: CSSProperties = {
  color: "#2563eb",
  fontSize: "12px",
};

const footerBand: CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
};

const safeLink: CSSProperties = {
  border: "1px solid #bfdbfe",
  borderRadius: "8px",
  color: "#1d4ed8",
  fontSize: "13px",
  fontWeight: 700,
  padding: "8px 10px",
  textDecoration: "none",
};
