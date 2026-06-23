"use client";

import type { CSSProperties } from "react";
import {
  buildBackendExecutionQueueRouteModel,
  buildBackendExecutionQueueStableKey,
  type BackendExecutionQueueItem,
  type BackendExecutionQueuePanelState,
  type BackendExecutionQueueRouteSlug,
  type BackendExecutionQueueSection,
  type BackendExecutionQueueTransition,
} from "../backend-execution-queue-v1-model";

export function BackendExecutionQueueCockpitSummaryPanel() {
  const model = buildBackendExecutionQueueRouteModel("codexforge-cockpit");
  const queue = model.queue;

  return (
    <section
      style={cockpitSection}
      data-codexforge-backend-execution-queue={model.cockpitMarkers.join(" | ")}
      aria-label="Backend Execution Queue v1"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Backend Execution Queue v1</p>
          <h2 style={sectionTitle}>Queue State Preview</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>

      <p style={bodyText}>
        Backend Execution Queue v1 shows how a future work item moves from preview to needs approval, approved, queued,
        preflight, apply, run, evidence capture, result capture, audit capture, completed, blocked, denied, failed,
        canceled, manual review, and recovered. The cockpit is the normal user surface; phase pages remain dev test
        diagnostics only.
      </p>
      <p style={bodyText}>
        Preview-only states are visible here for review. Queue creation, durable queue persistence, execution release,
        apply, run, evidence capture, result capture, audit capture, and recovery require backend-owned guarded state.
        The cockpit cannot create real queue jobs directly because that would bypass durable policy, approval, guards,
        evidence, result, audit, recovery, and memory boundaries.
      </p>
      <p style={bodyText}>
        No queue creation from the cockpit. No queue persistence from the cockpit. No execution release from the
        cockpit. No direct file mutation from the cockpit. No direct command execution from the cockpit. Backend-owned
        queue state remains required. Explicit operator approval remains required.
      </p>

      <div style={cockpitGrid} aria-label="Backend queue cockpit labels">
        {queue.cockpitSummary.map((item, index) => (
          <QueueSummaryCard
            key={buildBackendExecutionQueueStableKey(["cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </div>

      <section style={transitionBand} aria-label="Backend queue cockpit transition summary">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Transitions</p>
            <h3 style={smallHeading}>Allowed and denied movement</h3>
          </div>
          <span style={stateStyle("review-only")}>Review only</span>
        </div>
        <p style={bodyText}>
          Allowed transitions are future backend-owned moves: preview to needs approval, needs approval to approved,
          approved to queued, queued to preflight, preflight to applying, applying to running, running to evidence,
          evidence to result, result to audit, audit to completed, and manual review to recovered. Denied transitions
          block frontend queue creation, queue persistence, execution release, file mutation, command execution, hidden
          approvals, direct recovery, and automatic memory promotion.
        </p>
      </section>

      <div style={markerBand} aria-label="Backend Execution Queue v1 cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildBackendExecutionQueueStableKey(["cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function BackendExecutionQueueRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: BackendExecutionQueueRouteSlug;
  embedded?: boolean;
}) {
  const model = buildBackendExecutionQueueRouteModel(routeSlug);
  const queue = model.queue;
  const titleText = embedded ? "Backend Execution Queue v1" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-backend-execution-queue-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Backend Execution Queue v1" : model.route.phase}</span>
          <span style={normalSurfaceBadge}>
            {model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}
          </span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Backend Execution Queue v1 is preview-only from the frontend. It does not create real queue jobs from the UI,
          persist queue state from the UI, release execution from the frontend, write files from the frontend, run
          commands from the frontend, call models/providers/connectors, persist approvals, persist evidence/results/audit
          from the UI, execute recovery/rollback/retry from the UI, promote memory automatically, or write browser
          storage from the cockpit.
        </p>
      </header>

      <section style={markerBand} aria-label="Backend execution queue page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildBackendExecutionQueueStableKey(["route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Backend execution queue identity">
        <div>
          <p style={panelEyebrow}>Queue model</p>
          <h3 style={sectionTitle}>queueModelId: {queue.queueModelId}</h3>
        </div>
        <p style={bodyText}>queueModelKind: {queue.queueModelKind}</p>
        <p style={bodyText}>
          queueItem: {queue.queueItem.label}. The item links goal context, plan diff commands, approval, evidence,
          result, audit, recovery, and memory references without UI persistence.
        </p>
      </section>

      <section style={splitBand} aria-label="Queue item and lifecycle states">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Queue Item</p>
              <h3 style={sectionTitle}>{queue.queueItem.id}</h3>
            </div>
            <span style={stateStyle(queue.queueItem.state)}>{formatState(queue.queueItem.state)}</span>
          </div>
          <div style={chipRow}>
            {[
              queue.queueItem.goalContextReference,
              queue.queueItem.planDiffCommandReference,
              queue.queueItem.approvalReference,
              queue.queueItem.evidenceReference,
              queue.queueItem.resultReference,
              queue.queueItem.auditReference,
              queue.queueItem.recoveryReference,
              queue.queueItem.memoryReference,
            ].map((reference, index) => (
              <span key={buildBackendExecutionQueueStableKey(["queue-item-reference", String(index), reference])} style={chip}>
                {reference}
              </span>
            ))}
          </div>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Queue states</p>
              <h3 style={sectionTitle}>Lifecycle</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={chipRow}>
            {queue.queueStates.map((state, index) => (
              <span key={buildBackendExecutionQueueStableKey(["queue-state", String(index), state])} style={chip}>
                {state}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={cardGrid} aria-label="Backend execution queue sections">
        {model.sections.map((section, index) => (
          <QueueSectionCard
            key={buildBackendExecutionQueueStableKey(["section", model.route.slug, String(index), section.id])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Backend queue transitions">
        <TransitionList title="Allowed transitions" transitions={queue.allowedTransitions} namespace="allowed" />
        <TransitionList title="Denied transitions" transitions={queue.deniedTransitions} namespace="denied" />
      </section>

      <section style={splitBand} aria-label="Backend queue safety and cockpit summary">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Safety</p>
              <h3 style={sectionTitle}>explicitSafetyLimits</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <div style={chipRow}>
            {queue.explicitSafetyLimits.map((limit, index) => (
              <span key={buildBackendExecutionQueueStableKey(["safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>Queue Item Approval Preflight Apply Run Evidence Result Audit Blocked Denied Failed Canceled Manual Review Recovery Transitions</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={chipRow}>
            {queue.cockpitSummary.map((item, index) => (
              <span key={buildBackendExecutionQueueStableKey(["route-cockpit", String(index), item.id])} style={chip}>
                {item.label}: {item.detail}
              </span>
            ))}
          </div>
        </article>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit. broad
          execution still blocked. frontend queue persistence still blocked.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildBackendExecutionQueueStableKey(["diagnostic-route", String(index), route.slug])}
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

function QueueSummaryCard({ item }: { item: BackendExecutionQueueItem }) {
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

function QueueSectionCard({ section }: { section: BackendExecutionQueueSection }) {
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
          <div key={buildBackendExecutionQueueStableKey(["item", section.id, String(index), item.id])} style={checkRow}>
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

function TransitionList({
  title,
  transitions,
  namespace,
}: {
  title: string;
  transitions: readonly BackendExecutionQueueTransition[];
  namespace: string;
}) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Transitions</p>
          <h3 style={sectionTitle}>{title}</h3>
        </div>
        <span style={stateStyle(namespace === "allowed" ? "allowed" : "denied")}>
          {namespace === "allowed" ? "Allowed" : "Denied"}
        </span>
      </div>
      <div style={checklistGrid}>
        {transitions.map((transition, index) => (
          <div
            key={buildBackendExecutionQueueStableKey(["transition", namespace, String(index), transition.id])}
            style={checkRow}
          >
            <span style={smallStateStyle(transition.state)}>{formatState(transition.state)}</span>
            <div>
              <p style={checkLabel}>{transition.label}</p>
              <p style={checkDetail}>
                {transition.from} to {transition.to}. {transition.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function formatState(state: BackendExecutionQueuePanelState): string {
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "preview-only") return "Preview only";
  if (state === "review-only") return "Review only";
  if (state === "manual-review") return "Manual review";
  if (state === "allowed") return "Allowed";
  if (state === "denied") return "Denied";
  if (state === "failed") return "Failed";
  if (state === "canceled") return "Canceled";
  if (state === "recovered") return "Recovered";
  return "Blocked";
}

function stateStyle(state: BackendExecutionQueuePanelState): CSSProperties {
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
              : state === "allowed" || state === "recovered"
                ? allowedBadge
                : state === "failed" || state === "canceled"
                  ? failedBadge
                  : blockedBadge),
  };
}

function smallStateStyle(state: BackendExecutionQueuePanelState): CSSProperties {
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
              : state === "allowed" || state === "recovered"
                ? allowedBadge
                : state === "failed" || state === "canceled"
                  ? failedBadge
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

const transitionBand: CSSProperties = {
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  background: "#f8fbfa",
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

const allowedBadge: CSSProperties = {
  background: "#f2faf6",
  borderColor: "#8fb6a7",
  color: "#1f5947",
};

const failedBadge: CSSProperties = {
  background: "#fff8e6",
  borderColor: "#c7a553",
  color: "#5c4512",
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
