"use client";

import type { CSSProperties } from "react";
import {
  buildApplyRunTransactionRouteModel,
  buildApplyRunTransactionStableKey,
  type ApplyRunTransactionItem,
  type ApplyRunTransactionPanelState,
  type ApplyRunTransactionRouteSlug,
  type ApplyRunTransactionSection,
} from "../apply-run-transaction-model";

export function ApplyRunTransactionCockpitSummaryPanel() {
  const model = buildApplyRunTransactionRouteModel("codexforge-cockpit");
  const transaction = model.transaction;

  return (
    <section
      style={cockpitSection}
      data-codexforge-apply-run-transaction={model.cockpitMarkers.join(" | ")}
      aria-label="Apply Run Transaction Boundary"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Apply Run Transaction Boundary</p>
          <h2 style={sectionTitle}>Transaction Preview</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>

      <p style={bodyText}>
        Transaction shows how a future guarded work item becomes a backend-owned apply/run transaction after intent,
        preflight, snapshot readiness, guarded apply, guarded run, validation, evidence, result, audit, rollback, retry,
        recovery, and denied paths are reviewed.
      </p>
      <p style={bodyText}>
        Preflight checks approval freshness, queue state, path guard, command guard, snapshot readiness, evidence
        readiness, result readiness, audit readiness, and recovery readiness before apply or run. Snapshot readiness
        means touched files, rollback references, dirty workspace risk, and manual review needs are known before any
        future guarded apply step.
      </p>
      <p style={bodyText}>
        Apply and Run are separated: apply is the guarded diff and path step, while run is the guarded command step with
        allowlist, arguments, working directory, timeout, stdout, stderr, and exit code. Validate means backend-owned
        build, smoke, lint, test, hygiene, and domain checks can be reviewed before result and audit finalization.
      </p>
      <p style={bodyText}>
        Evidence, Result, and Audit must be captured by backend-owned transaction state. Rollback and Retry are reviewed
        from readiness signals, and Recovery remains approval-gated because it can change workspace state or transaction
        outcome. The cockpit cannot create or execute real transactions directly.
      </p>
      <p style={bodyText}>
        No transaction creation from the cockpit. No transaction persistence from the cockpit. No snapshot creation from
        the cockpit. No apply execution from the cockpit. No command execution from the cockpit. No rollback retry or
        recovery execution from the cockpit. Backend-owned transaction state remains required. Explicit operator approval
        remains required.
      </p>

      <div style={cockpitGrid} aria-label="Apply run transaction cockpit labels">
        {transaction.cockpitSummary.map((item, index) => (
          <SummaryCard
            key={buildApplyRunTransactionStableKey(["cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </div>

      <section style={identityBand} aria-label="Apply run transaction cockpit identity">
        <p style={panelEyebrow}>Transaction identity</p>
        <p style={bodyText}>
          transactionId: {transaction.transactionId}. transactionKind: {transaction.transactionKind}. queueItemRef:{" "}
          {transaction.queueItemRef}. compiledGoalRef: {transaction.compiledGoalRef}. workProposalRef:{" "}
          {transaction.workProposalRef}. approvalRef: {transaction.approvalRef}.
        </p>
      </section>

      <div style={markerBand} aria-label="Apply Run Transaction Boundary cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildApplyRunTransactionStableKey(["cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ApplyRunTransactionRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ApplyRunTransactionRouteSlug;
  embedded?: boolean;
}) {
  const model = buildApplyRunTransactionRouteModel(routeSlug);
  const transaction = model.transaction;
  const titleText = embedded ? "Apply Run Transaction Boundary" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-apply-run-transaction-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Apply Run Transaction Boundary" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Apply Run Transaction Boundary is preview-only from the frontend. It does not create real transactions from
          the UI, persist transaction state from the UI, create real snapshots from the UI, write files from the UI,
          apply diffs from the UI, run commands from the UI, create queue jobs from the UI, persist approvals from the
          UI, persist evidence/results/audit from the UI, execute recovery/rollback/retry from the UI, call
          models/providers/connectors, promote memory automatically, or write browser storage from the cockpit.
        </p>
        <p style={bodyText}>
          It prepares a future backend-owned transactional apply/run path. Backend-owned guarded execution remains
          required for real actions. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Apply run transaction page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildApplyRunTransactionStableKey(["route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Apply run transaction model identity">
        <div>
          <p style={panelEyebrow}>Apply/run transaction model</p>
          <h3 style={sectionTitle}>transactionId: {transaction.transactionId}</h3>
        </div>
        <p style={bodyText}>transactionKind: {transaction.transactionKind}</p>
        <p style={bodyText}>
          queueItemRef: {transaction.queueItemRef}. compiledGoalRef: {transaction.compiledGoalRef}. workProposalRef:{" "}
          {transaction.workProposalRef}. approvalRef: {transaction.approvalRef}.
        </p>
        <div style={chipRow}>
          {[
            "transactionIntent",
            "preflightPreview",
            "workspaceSnapshotPreview",
            "guardedApplyStep",
            "guardedRunStep",
            "validationStep",
            "evidenceCapturePreview",
            "resultCapturePreview",
            "auditCapturePreview",
            "rollbackReadinessPreview",
            "retryReadinessPreview",
            "recoveryDecisionPreview",
            "deniedTransactionBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildApplyRunTransactionStableKey(["transaction-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={cardGrid} aria-label="Apply run transaction sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildApplyRunTransactionStableKey(["section", model.route.slug, String(index), section.id])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Apply run transaction denied boundaries and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Denied Paths</p>
              <h3 style={sectionTitle}>deniedTransactionBoundaries</h3>
            </div>
            <span style={stateStyle("denied")}>Denied</span>
          </div>
          <div style={checklistGrid}>
            {transaction.deniedTransactionBoundaries.map((boundary, index) => (
              <CheckRow
                key={buildApplyRunTransactionStableKey(["denied-boundary", String(index), boundary.id])}
                item={boundary}
              />
            ))}
          </div>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Safety</p>
              <h3 style={sectionTitle}>explicitSafetyLimits</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <div style={chipRow}>
            {transaction.explicitSafetyLimits.map((limit, index) => (
              <span key={buildApplyRunTransactionStableKey(["safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={panel} aria-label="Cockpit transaction summary">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Cockpit</p>
            <h3 style={sectionTitle}>
              Transaction Intent Preflight Snapshot Apply Run Validate Evidence Result Audit Rollback Retry Recovery
              Denied Paths
            </h3>
          </div>
          <span style={stateStyle("review-only")}>Review only</span>
        </div>
        <div style={chipRow}>
          {transaction.cockpitSummary.map((item, index) => (
            <span key={buildApplyRunTransactionStableKey(["route-cockpit", String(index), item.id])} style={chip}>
              {item.label}: {item.detail}
            </span>
          ))}
        </div>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit. broad
          execution still blocked. frontend transaction persistence still blocked.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildApplyRunTransactionStableKey(["diagnostic-route", String(index), route.slug])}
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

function SummaryCard({ item }: { item: ApplyRunTransactionItem }) {
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

function SectionCard({ section }: { section: ApplyRunTransactionSection }) {
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
          <CheckRow key={buildApplyRunTransactionStableKey(["item", section.id, String(index), item.id])} item={item} />
        ))}
      </div>
    </article>
  );
}

function CheckRow({ item }: { item: ApplyRunTransactionItem }) {
  return (
    <div style={checkRow}>
      <span style={smallStateStyle(item.state)}>{formatState(item.state)}</span>
      <div>
        <p style={checkLabel}>{item.label}</p>
        <p style={checkDetail}>{item.detail}</p>
      </div>
    </div>
  );
}

function formatState(state: ApplyRunTransactionPanelState): string {
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "preview-only") return "Preview only";
  if (state === "review-only") return "Review only";
  if (state === "manual-review") return "Manual review";
  if (state === "rollback-ready") return "Rollback ready";
  if (state === "retry-ready") return "Retry ready";
  if (state === "denied") return "Denied";
  return "Blocked";
}

function stateStyle(state: ApplyRunTransactionPanelState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "backend-owned"
      ? backendBadge
      : state === "needs-approval"
        ? approvalBadge
        : state === "preview-only"
          ? previewBadge
          : state === "review-only"
            ? reviewBadge
            : state === "manual-review"
              ? manualBadge
              : state === "rollback-ready" || state === "retry-ready"
                ? readinessBadge
                : blockedBadge),
  };
}

function smallStateStyle(state: ApplyRunTransactionPanelState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "backend-owned"
      ? backendBadge
      : state === "needs-approval"
        ? approvalBadge
        : state === "preview-only"
          ? previewBadge
          : state === "review-only"
            ? reviewBadge
            : state === "manual-review"
              ? manualBadge
              : state === "rollback-ready" || state === "retry-ready"
                ? readinessBadge
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
  maxWidth: 1040,
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

const surfaceBadge: CSSProperties = {
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

const cardGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
};

const cockpitGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
  minHeight: 132,
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

const summaryLabel: CSSProperties = {
  color: "#172026",
  fontSize: 16,
  lineHeight: 1.25,
  letterSpacing: 0,
  margin: 0,
};

const stateBadge: CSSProperties = {
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "currentColor",
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

const backendBadge: CSSProperties = {
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

const manualBadge: CSSProperties = {
  background: "#f5f3ff",
  borderColor: "#b9a7e8",
  color: "#4c3678",
};

const readinessBadge: CSSProperties = {
  background: "#f2faf6",
  borderColor: "#8fb6a7",
  color: "#1f5947",
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
