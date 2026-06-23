"use client";

import type { CSSProperties } from "react";
import {
  buildReleaseGradeAuditTrailRouteModel,
  buildReleaseGradeAuditTrailStableKey,
  type ReleaseGradeAuditTrailItem,
  type ReleaseGradeAuditTrailRecord,
  type ReleaseGradeAuditTrailRouteSlug,
  type ReleaseGradeAuditTrailState,
} from "../release-grade-audit-trail-model";

export function ReleaseGradeAuditTrailCockpitSummaryPanel() {
  const model = buildReleaseGradeAuditTrailRouteModel("codexforge-cockpit");
  const auditTrail = model.auditTrail;

  return (
    <section
      style={cockpitSection}
      data-codexforge-release-grade-audit-trail={model.cockpitMarkers.join(" | ")}
      aria-label="Release-Grade Audit Trail"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Release-Grade Audit Trail</p>
          <h2 style={sectionTitle}>Audit Trail</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>

      <p style={bodyText}>
        Goal, Context, Compiler, and Proposal records show how raw operator intent becomes a reviewed work proposal.
        The cockpit can preview that chain, but it cannot call models, crawl arbitrary files, create real audit records,
        or claim execution happened.
      </p>
      <p style={bodyText}>
        Approval and Queue records connect only through explicit operator approval and backend-owned queue capture. The
        cockpit cannot persist approvals, create queue jobs, hide approvals, or release execution from the frontend.
      </p>
      <p style={bodyText}>
        Transaction, Apply, and Command records connect future backend-owned transaction intent to guarded apply paths,
        path guards, diffs, command allowlists, arguments, working directories, timeouts, stdout, stderr, exit codes, and
        denied commands without writing files or running commands from the cockpit.
      </p>
      <p style={bodyText}>
        Evidence, Result, and Recovery records connect evidence references, redaction, normalized outcomes, operator
        accepted state, rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery
        decisions. Memory promotion review is audited separately and never promoted automatically.
      </p>
      <p style={bodyText}>
        Denied Paths records show why files, commands, models, providers, connectors, secrets, installs, deploys, ports,
        runtimes, persistence, recovery, memory, and frontend execution remain blocked. No audit persistence from the
        cockpit. No execution claims from the cockpit. No hidden approval from the cockpit. No hidden memory promotion
        from the cockpit. Backend-owned audit capture remains required. Explicit operator approval remains required.
      </p>
      <p style={bodyText}>
        The cockpit cannot persist audit logs directly because frontend preview copy is not the trust boundary and audit
        copy must not overclaim execution. Release-grade capture remains backend-owned so future append-only records can
        be tied to guarded execution, evidence, results, recovery decisions, and operator-visible timelines.
      </p>

      <div style={cockpitGrid} aria-label="Release-grade audit cockpit labels">
        {auditTrail.cockpitSummary.map((item, index) => (
          <SummaryCard
            key={buildReleaseGradeAuditTrailStableKey(["cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </div>

      <section style={identityBand} aria-label="Release-grade audit trail cockpit identity">
        <p style={panelEyebrow}>Audit trail identity</p>
        <p style={bodyText}>
          auditTrailId: {auditTrail.auditTrailId}. auditTrailKind: {auditTrail.auditTrailKind}. Records: Goal, Context,
          Compiler, Proposal, Approval, Queue, Transaction, Apply, Command, Evidence, Result, Recovery, Memory, Denied
          Paths, and Operator Timeline.
        </p>
      </section>

      <div style={markerBand} aria-label="Release-Grade Audit Trail cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildReleaseGradeAuditTrailStableKey(["cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ReleaseGradeAuditTrailRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ReleaseGradeAuditTrailRouteSlug;
  embedded?: boolean;
}) {
  const model = buildReleaseGradeAuditTrailRouteModel(routeSlug);
  const auditTrail = model.auditTrail;
  const titleText = embedded ? "Release-Grade Audit Trail" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-release-grade-audit-trail-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Release-Grade Audit Trail" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Release-Grade Audit Trail is preview-only from the frontend. It does not persist audit logs from the UI, create
          real audit records from the UI, claim execution happened, persist approvals from the UI, persist
          evidence/results/memory from the UI, or release execution from the frontend.
        </p>
        <p style={bodyText}>
          It prepares a future backend-owned audit capture path. Backend-owned guarded execution remains required for
          real actions. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Release-grade audit trail page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildReleaseGradeAuditTrailStableKey(["route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Release-grade audit trail model identity">
        <div>
          <p style={panelEyebrow}>Release-grade audit trail model</p>
          <h3 style={sectionTitle}>auditTrailId: {auditTrail.auditTrailId}</h3>
        </div>
        <p style={bodyText}>auditTrailKind: {auditTrail.auditTrailKind}</p>
        <div style={chipRow}>
          {[
            "auditTrailId",
            "auditTrailKind",
            "goalAuditRecord",
            "contextAuditRecord",
            "compilerAuditRecord",
            "proposalAuditRecord",
            "approvalAuditRecord",
            "queueAuditRecord",
            "transactionAuditRecord",
            "applyCommandAuditRecord",
            "evidenceResultAuditRecord",
            "recoveryAuditRecord",
            "memoryAuditRecord",
            "deniedPathAuditRecord",
            "operatorTimeline",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildReleaseGradeAuditTrailStableKey(["audit-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={cardGrid} aria-label="Release-grade audit records">
        {model.records.map((record, index) => (
          <RecordCard
            key={buildReleaseGradeAuditTrailStableKey(["record", model.route.slug, String(index), record.id])}
            record={record}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Release-grade audit summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {auditTrail.cockpitSummary.map((item, index) => (
              <CheckRow
                key={buildReleaseGradeAuditTrailStableKey(["cockpit-item", String(index), item.id])}
                item={item}
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
            {auditTrail.explicitSafetyLimits.map((limit, index) => (
              <span key={buildReleaseGradeAuditTrailStableKey(["safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={panel} aria-label="Release-grade audit trail continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Goal Context Compiler Proposal Approval Queue Transaction Apply Command Evidence Result Recovery Memory
              Denied Paths Operator Timeline
            </h3>
          </div>
          <span style={stateStyle("continuity")}>Continuity</span>
        </div>
        <p style={bodyText}>
          The release-grade audit trail summary is a deterministic preview of future backend-owned capture. It keeps
          cockpit copy sober: no real audit records are created, no execution happened, and no approvals, evidence,
          results, memory, queue state, transaction state, or browser storage are persisted from the frontend.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit.
          frontend audit persistence still blocked. backend-owned audit capture remains required.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildReleaseGradeAuditTrailStableKey(["diagnostic-route", String(index), route.slug])}
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

function SummaryCard({ item }: { item: ReleaseGradeAuditTrailItem }) {
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

function RecordCard({ record }: { record: ReleaseGradeAuditTrailRecord }) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{record.label}</p>
          <h3 style={sectionTitle}>{record.title}</h3>
        </div>
        <span style={stateStyle(record.state)}>{formatState(record.state)}</span>
      </div>
      <p style={bodyText}>{record.summary}</p>
      <div style={checklistGrid}>
        {record.items.map((item, index) => (
          <CheckRow
            key={buildReleaseGradeAuditTrailStableKey(["record-item", record.id, String(index), item.id])}
            item={item}
          />
        ))}
      </div>
    </article>
  );
}

function CheckRow({ item }: { item: ReleaseGradeAuditTrailItem }) {
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

function formatState(state: ReleaseGradeAuditTrailState): string {
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "preview-only") return "Preview only";
  if (state === "review-only") return "Review only";
  if (state === "manual-review") return "Manual review";
  if (state === "capture-contract") return "Capture contract";
  if (state === "continuity") return "Continuity";
  if (state === "denied") return "Denied";
  return "Blocked";
}

function stateStyle(state: ReleaseGradeAuditTrailState): CSSProperties {
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
            : state === "capture-contract"
              ? captureBadge
              : state === "continuity"
                ? continuityBadge
                : blockedBadge),
  };
}

function smallStateStyle(state: ReleaseGradeAuditTrailState): CSSProperties {
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
            : state === "capture-contract"
              ? captureBadge
              : state === "continuity"
                ? continuityBadge
                : blockedBadge),
  };
}

const page: CSSProperties = {
  color: "#172026",
  display: "grid",
  gap: 18,
  padding: 28,
};

const embeddedPage: CSSProperties = {
  color: "#172026",
  display: "grid",
  gap: 18,
  padding: "8px 0 16px",
};

const cockpitSection: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #d8dee4",
  borderRadius: 8,
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
  background: "#eef6fc",
  border: "1px solid #9db8d0",
  borderRadius: 6,
  color: "#244862",
  fontSize: 12,
  fontWeight: 700,
  padding: "5px 8px",
};

const surfaceBadge: CSSProperties = {
  background: "#f2faf6",
  border: "1px solid #8fb6a7",
  borderRadius: 6,
  color: "#1f5947",
  fontSize: 12,
  fontWeight: 700,
  padding: "5px 8px",
};

const title: CSSProperties = {
  fontSize: 32,
  letterSpacing: 0,
  lineHeight: 1.12,
  margin: 0,
};

const summary: CSSProperties = {
  color: "#344854",
  fontSize: 17,
  lineHeight: 1.5,
  margin: 0,
};

const bodyText: CSSProperties = {
  color: "#425563",
  fontSize: 14,
  lineHeight: 1.55,
  margin: "8px 0 0",
};

const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const markerPill: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #d8dee4",
  borderRadius: 6,
  color: "#2f3b43",
  fontSize: 12,
  lineHeight: 1.35,
  padding: "6px 8px",
};

const identityBand: CSSProperties = {
  background: "#f8fbfa",
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  display: "grid",
  gap: 4,
  padding: 16,
};

const cardGrid: CSSProperties = {
  display: "grid",
  gap: 14,
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
};

const cockpitGrid: CSSProperties = {
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
};

const splitBand: CSSProperties = {
  display: "grid",
  gap: 14,
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
};

const panel: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
};

const summaryCard: CSSProperties = {
  background: "#fbfcfd",
  border: "1px solid #d8dee4",
  borderRadius: 8,
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
  letterSpacing: 0,
  lineHeight: 1.25,
  margin: 0,
};

const summaryLabel: CSSProperties = {
  color: "#172026",
  fontSize: 16,
  letterSpacing: 0,
  lineHeight: 1.25,
  margin: 0,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 10,
};

const chip: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #d8dee4",
  borderRadius: 6,
  color: "#2f3b43",
  fontSize: 12,
  lineHeight: 1.35,
  padding: "6px 8px",
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: 10,
  marginTop: 12,
};

const checkRow: CSSProperties = {
  alignItems: "flex-start",
  display: "grid",
  gap: 10,
  gridTemplateColumns: "auto 1fr",
};

const checkLabel: CSSProperties = {
  color: "#172026",
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.35,
  margin: 0,
};

const checkDetail: CSSProperties = {
  color: "#536674",
  fontSize: 13,
  lineHeight: 1.45,
  margin: "3px 0 0",
};

const stateBadge: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1,
  padding: "6px 8px",
};

const smallStateBadge: CSSProperties = {
  ...stateBadge,
  alignSelf: "start",
  fontSize: 11,
  padding: "5px 7px",
  whiteSpace: "nowrap",
};

const backendBadge: CSSProperties = {
  background: "#eef6fc",
  borderColor: "#9db8d0",
  color: "#244862",
};

const approvalBadge: CSSProperties = {
  background: "#fff7df",
  borderColor: "#d5b96a",
  color: "#5c4512",
};

const previewBadge: CSSProperties = {
  background: "#f2faf6",
  borderColor: "#8fb6a7",
  color: "#1f5947",
};

const reviewBadge: CSSProperties = {
  background: "#f7f5ff",
  borderColor: "#b9acd9",
  color: "#40316c",
};

const captureBadge: CSSProperties = {
  background: "#fff6f1",
  borderColor: "#d7aa89",
  color: "#6f3d18",
};

const continuityBadge: CSSProperties = {
  background: "#f1f7ff",
  borderColor: "#a7bee1",
  color: "#28446b",
};

const blockedBadge: CSSProperties = {
  background: "#fff3f1",
  borderColor: "#d8a39d",
  color: "#7b2f28",
};

const diagnosticsDrawer: CSSProperties = {
  background: "#fbfcfd",
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 14,
};

const diagnosticsSummary: CSSProperties = {
  color: "#172026",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 700,
};

const routeGrid: CSSProperties = {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  marginTop: 12,
};

const routeLink: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #d8dee4",
  borderRadius: 8,
  color: "#172026",
  display: "grid",
  gap: 4,
  padding: 12,
  textDecoration: "none",
};

const routePhase: CSSProperties = {
  color: "#60717d",
  fontSize: 12,
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  color: "#172026",
  fontSize: 14,
  fontWeight: 700,
};

const routeCommand: CSSProperties = {
  color: "#536674",
  fontSize: 12,
  lineHeight: 1.35,
};
