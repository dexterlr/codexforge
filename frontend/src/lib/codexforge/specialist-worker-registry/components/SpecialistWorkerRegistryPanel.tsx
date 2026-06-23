"use client";

import type { CSSProperties } from "react";
import {
  buildSpecialistWorkerRegistryRouteModel,
  buildSpecialistWorkerRegistryStableKey,
  type SpecialistWorkerProfile,
  type SpecialistWorkerRegistryItem,
  type SpecialistWorkerRegistryRecord,
  type SpecialistWorkerRegistryRouteSlug,
  type SpecialistWorkerRegistryState,
} from "../specialist-worker-registry-model";

export function SpecialistWorkerRegistryCockpitSummaryPanel() {
  const model = buildSpecialistWorkerRegistryRouteModel("codexforge-cockpit");
  const registry = model.specialistWorkerRegistry;

  return (
    <section
      style={cockpitSection}
      data-codexforge-specialist-worker-registry={model.cockpitMarkers.join(" | ")}
      aria-label="Specialist Worker Registry"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Specialist Worker Registry</p>
          <h2 style={sectionTitle}>Specialist Worker Registry</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>

      <p style={bodyText}>
        Coding, Research, Game Server, Web App, Docs, Data, Creative, Video, Trading Analysis, QA Validation,
        Audit, and Recovery worker types exist as review-only profiles. They describe what each worker is for, what
        model/provider/local route each worker may need later, and what evidence, result, audit, and recovery each
        worker must produce.
      </p>
      <p style={bodyText}>
        Worker Routing and Capability Fit stay explicit: future backend-owned routing must match goal domain, task
        type, capability, privacy, cost, Model Router v2, Provider Approval, Local Model Bridge, evidence, and denied
        worker paths before execution.
      </p>
      <p style={bodyText}>
        Denied Workers remain visible. No worker dispatch from the cockpit. No model calls from the cockpit. No
        provider calls from the cockpit. No connector calls from the cockpit. No command execution from the cockpit.
        Backend-owned worker routing remains required. Explicit operator approval remains required.
      </p>

      <div style={cockpitGrid} aria-label="Specialist worker cockpit labels">
        {registry.cockpitSummary.map((item, index) => (
          <SummaryCard
            key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </div>

      <section style={identityBand} aria-label="Specialist worker registry identity">
        <p style={panelEyebrow}>Specialist worker registry model</p>
        <p style={bodyText}>
          specialistWorkerRegistryId: {registry.specialistWorkerRegistryId}. specialistWorkerRegistryKind:{" "}
          {registry.specialistWorkerRegistryKind}. Future routing remains backend-owned, approval-gated, and blocked
          from cockpit dispatch.
        </p>
      </section>

      <div style={markerBand} aria-label="Specialist Worker Registry cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span
            key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-cockpit-marker", String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function SpecialistWorkerRegistryRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: SpecialistWorkerRegistryRouteSlug;
  embedded?: boolean;
}) {
  const model = buildSpecialistWorkerRegistryRouteModel(routeSlug);
  const registry = model.specialistWorkerRegistry;
  const titleText = embedded ? "Specialist Worker Registry" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-specialist-worker-registry-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Specialist Worker Registry" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Specialist Worker Registry is preview-only from the frontend. It does not dispatch workers from the UI. It
          does not call models from the UI. It does not call local models from the UI. It does not call providers from
          the UI. It does not call connectors from the UI.
        </p>
        <p style={bodyText}>
          It does not send prompts from the UI. It does not execute commands from the UI. It does not start runtimes
          from the UI. It does not persist worker decisions from the UI. It does not persist evidence/results/audit
          from the UI. It prepares a future backend-owned specialist worker routing path. Explicit operator approval
          remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Specialist Worker Registry page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Specialist Worker Registry model identity">
        <div>
          <p style={panelEyebrow}>Specialist worker registry model</p>
          <h3 style={sectionTitle}>specialistWorkerRegistryId: {registry.specialistWorkerRegistryId}</h3>
        </div>
        <p style={bodyText}>specialistWorkerRegistryKind: {registry.specialistWorkerRegistryKind}</p>
        <div style={chipRow}>
          {[
            "specialistWorkerRegistryId",
            "specialistWorkerRegistryKind",
            "goalRef",
            "projectContextRef",
            "modelRouterRef",
            "providerApprovalRef",
            "localModelBridgeRef",
            "workerProfiles",
            "codingWorkerProfile",
            "researchWorkerProfile",
            "gameServerWorkerProfile",
            "webAppWorkerProfile",
            "docsWorkerProfile",
            "dataWorkerProfile",
            "creativeWorkerProfile",
            "videoWorkerProfile",
            "tradingAnalysisWorkerProfile",
            "qaValidationWorkerProfile",
            "auditWorkerProfile",
            "recoveryWorkerProfile",
            "workerRoutingFit",
            "deniedWorkerBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={cardGrid} aria-label="Specialist worker profiles">
        {model.profiles.map((profile, index) => (
          <WorkerProfileCard
            key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-profile", model.route.slug, String(index), profile.workerId])}
            profile={profile}
          />
        ))}
      </section>

      <section style={cardGrid} aria-label="Specialist worker registry records">
        {model.records.map((record, index) => (
          <RecordCard
            key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-record", model.route.slug, String(index), record.id])}
            record={record}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Specialist worker summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {registry.cockpitSummary.map((item, index) => (
              <CheckRow
                key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-cockpit-item", String(index), item.id])}
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
            {registry.explicitSafetyLimits.map((limit, index) => (
              <span key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={panel} aria-label="Specialist worker continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Coding Research Game Server Web App Docs Data Creative Video Trading Analysis QA Validation Audit
              Recovery Worker Routing Capability Fit Denied Workers
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned</span>
        </div>
        <p style={bodyText}>
          Specialist Worker Registry prepares CodexForge for backend-owned worker routing while keeping the cockpit
          review-only. It shows worker purpose, route needs, evidence needs, result needs, audit needs, recovery needs,
          denied actions, model/tool fit, and explicit operator approval before any worker could run.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit.
          frontend worker dispatch still blocked. backend-owned specialist worker routing remains required.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-diagnostic-route", String(index), route.slug])}
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

function SummaryCard({ item }: { item: SpecialistWorkerRegistryItem }) {
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

function WorkerProfileCard({ profile }: { profile: SpecialistWorkerProfile }) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{profile.workerDomain}</p>
          <h3 style={sectionTitle}>{profile.workerName}</h3>
        </div>
        <span style={stateStyle("review-only")}>Review only</span>
      </div>
      <p style={bodyText}>workerId: {profile.workerId}</p>
      <FieldRow label="capabilityFit" value={profile.capabilityFit} />
      <FieldRow label="defaultModelRoute" value={profile.defaultModelRoute} />
      <FieldRow label="approvalNeeds" value={profile.approvalNeeds} />
      <FieldRow label="fileScope" value={profile.fileScope} />
      <FieldRow label="commandScope" value={profile.commandScope} />
      <FieldRow label="evidenceNeeds" value={profile.evidenceNeeds} />
      <FieldRow label="resultNeeds" value={profile.resultNeeds} />
      <FieldRow label="auditNeeds" value={profile.auditNeeds} />
      <FieldRow label="recoveryNeeds" value={profile.recoveryNeeds} />
      <div style={chipRow}>
        {profile.deniedActions.map((action, index) => (
          <span key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-denied-action", profile.workerId, String(index), action])} style={dangerChip}>
            {action}
          </span>
        ))}
      </div>
      <div style={chipRow}>
        {profile.safetyNotes.map((note, index) => (
          <span key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-safety-note", profile.workerId, String(index), note])} style={chip}>
            {note}
          </span>
        ))}
      </div>
    </article>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={fieldRow}>
      <span style={fieldLabel}>{label}</span>
      <span style={fieldValue}>{value}</span>
    </div>
  );
}

function RecordCard({ record }: { record: SpecialistWorkerRegistryRecord }) {
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
            key={buildSpecialistWorkerRegistryStableKey(["specialist-worker-record-item", record.id, String(index), item.id])}
            item={item}
          />
        ))}
      </div>
    </article>
  );
}

function CheckRow({ item }: { item: SpecialistWorkerRegistryItem }) {
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

function formatState(state: SpecialistWorkerRegistryState): string {
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "preview-only") return "Preview only";
  if (state === "review-only") return "Review only";
  if (state === "manual-review") return "Manual review";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  if (state === "denied") return "Denied";
  return "Blocked";
}

function stateStyle(state: SpecialistWorkerRegistryState): CSSProperties {
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
              : state === "candidate" || state === "release-candidate"
                ? candidateBadge
                : blockedBadge),
  };
}

function smallStateStyle(state: SpecialistWorkerRegistryState): CSSProperties {
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
              : state === "candidate" || state === "release-candidate"
                ? candidateBadge
                : blockedBadge),
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
  padding: 0,
};

const cockpitSection: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  borderTop: "1px solid #d8dee4",
  paddingTop: 18,
};

const hero: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "4px 0 10px",
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

const surfaceBadge: CSSProperties = {
  ...phaseBadge,
  borderColor: "#c7a553",
  color: "#5c4512",
  background: "#fff7df",
};

const title: CSSProperties = {
  margin: 0,
  fontSize: 34,
  lineHeight: 1.08,
  letterSpacing: 0,
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 940,
  fontSize: 18,
  lineHeight: 1.5,
  color: "#344854",
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

const identityBand: CSSProperties = {
  border: "1px solid #cfd8df",
  borderRadius: 8,
  padding: 14,
  background: "#f7fafc",
};

const cockpitGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: 10,
};

const cardGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 14,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
};

const panel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
};

const summaryCard: CSSProperties = {
  ...panel,
  padding: 14,
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

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const summaryLabel: CSSProperties = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const fieldRow: CSSProperties = {
  display: "grid",
  gap: 3,
  borderTop: "1px solid #edf1f4",
  paddingTop: 8,
  marginTop: 8,
};

const fieldLabel: CSSProperties = {
  color: "#60717d",
  fontSize: 12,
  fontWeight: 800,
};

const fieldValue: CSSProperties = {
  color: "#344854",
  fontSize: 13,
  lineHeight: 1.45,
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: 8,
  marginTop: 12,
};

const checkRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 10,
  alignItems: "start",
  borderTop: "1px solid #edf1f4",
  paddingTop: 8,
};

const checkLabel: CSSProperties = {
  margin: 0,
  color: "#25313a",
  fontSize: 13,
  fontWeight: 700,
};

const checkDetail: CSSProperties = {
  margin: "3px 0 0",
  color: "#526572",
  fontSize: 13,
  lineHeight: 1.45,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 10,
};

const chip: CSSProperties = {
  border: "1px solid #ccd6dd",
  borderRadius: 6,
  padding: "6px 8px",
  background: "#f7fafc",
  color: "#2b3b46",
  fontSize: 12,
  lineHeight: 1.3,
};

const dangerChip: CSSProperties = {
  ...chip,
  borderColor: "#d29a9a",
  background: "#fff3f1",
  color: "#7d2c26",
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

const reviewBadge: CSSProperties = {
  borderColor: "#91b9a8",
  background: "#f0faf5",
  color: "#235342",
};

const backendBadge: CSSProperties = {
  borderColor: "#a9a0cc",
  background: "#f5f3ff",
  color: "#43326f",
};

const manualBadge: CSSProperties = {
  borderColor: "#c7a553",
  background: "#fff7df",
  color: "#604912",
};

const candidateBadge: CSSProperties = {
  borderColor: "#8aa4b8",
  background: "#f2f7fa",
  color: "#233746",
};

const diagnosticsDrawer: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 14,
  background: "#fbfcfd",
};

const diagnosticsSummary: CSSProperties = {
  cursor: "pointer",
  fontWeight: 800,
  color: "#263540",
};

const routeGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const routeLink: CSSProperties = {
  display: "grid",
  gap: 4,
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 12,
  color: "#25313a",
  textDecoration: "none",
  background: "#ffffff",
};

const routePhase: CSSProperties = {
  color: "#60717d",
  fontSize: 12,
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
};

const routeCommand: CSSProperties = {
  color: "#526572",
  fontSize: 12,
};
