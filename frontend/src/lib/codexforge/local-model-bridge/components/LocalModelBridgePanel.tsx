"use client";

import type { CSSProperties } from "react";
import {
  buildLocalModelBridgeRouteModel,
  buildLocalModelBridgeStableKey,
  type LocalModelBridgeItem,
  type LocalModelBridgeRecord,
  type LocalModelBridgeRouteSlug,
  type LocalModelBridgeState,
} from "../local-model-bridge-model";

export function LocalModelBridgeCockpitSummaryPanel() {
  const model = buildLocalModelBridgeRouteModel("codexforge-cockpit");
  const bridge = model.localModelBridge;

  return (
    <section
      style={cockpitSection}
      data-codexforge-local-model-bridge={model.cockpitMarkers.join(" | ")}
      aria-label="Local Model Bridge"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Local Model Bridge v1</p>
          <h2 style={sectionTitle}>Local Model Bridge</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>

      <p style={bodyText}>
        Runtime shows which local runtime class would be used later: Ollama, LM Studio, llama.cpp, vLLM,
        OpenAI-compatible localhost, or manual runtime class. Model Registry shows the reviewed registry shape: model
        name, capability class, privacy class, context window, tool support status, and denied registry states.
      </p>
      <p style={bodyText}>
        Endpoint means a backend-owned localhost-only allowlist with port policy, timeout boundary, and denied endpoint
        states. Prompt Handoff shows goal, context, files, commands, evidence, redaction, privacy class, and approval
        references without sending prompts.
      </p>
      <p style={bodyText}>
        Redaction protects private data by blocking secrets, tokens, credentials, keys, environment values, private
        files, denied paths, and unapproved project context. Capability fit checks coding, reasoning, research,
        creative, game, server, data, docs, and domain fit before any future local model use.
      </p>
      <p style={bodyText}>
        Timeout and Cancel show timeout limits, cancellation boundaries, manual stop, backend-owned process control, and
        evidence requirements. Response capture connects to Evidence, Result, and Audit through backend-owned response
        references, redaction, token metadata, status, fallback references, evidence linkage, and audit linkage.
      </p>
      <p style={bodyText}>
        Fallback and Denied states exist so smaller local fallback, safer local fallback, manual-review fallback,
        unavailable runtime, unsupported capability, secret payload, stale approval, disallowed port, timeout risk, and
        prompt denied states remain visible and blocked when required.
      </p>
      <p style={bodyText}>
        No local model calls from the cockpit. No runtime starts from the cockpit. No localhost probing from the
        cockpit. No port binding from the cockpit. No prompt sending from the cockpit. No credential storage from the
        cockpit. Backend-owned local model bridge remains required. Explicit operator approval remains required.
      </p>

      <div style={cockpitGrid} aria-label="Local model bridge cockpit labels">
        {bridge.cockpitSummary.map((item, index) => (
          <SummaryCard
            key={buildLocalModelBridgeStableKey(["local-bridge-cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </div>

      <section style={identityBand} aria-label="Local model bridge identity">
        <p style={panelEyebrow}>Local model bridge model</p>
        <p style={bodyText}>
          localModelBridgeId: {bridge.localModelBridgeId}. localModelBridgeKind: {bridge.localModelBridgeKind}. Runtime,
          Model Registry, Endpoint, Prompt Handoff, Redaction, Capability, Timeout, Cancel, Response, Fallback, Denied,
          Evidence, Result, and Audit are visible before local model use.
        </p>
      </section>

      <div style={markerBand} aria-label="Local Model Bridge cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildLocalModelBridgeStableKey(["local-bridge-cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function LocalModelBridgeRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: LocalModelBridgeRouteSlug;
  embedded?: boolean;
}) {
  const model = buildLocalModelBridgeRouteModel(routeSlug);
  const bridge = model.localModelBridge;
  const titleText = embedded ? "Local Model Bridge v1" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-local-model-bridge-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Local Model Bridge v1" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Local Model Bridge v1 is preview-only from the frontend. It does not call local models from the UI. It does
          not start local runtimes from the UI. It does not probe localhost from the UI. It does not bind ports from the
          UI. It does not send prompts from the UI.
        </p>
        <p style={bodyText}>
          It does not read secrets or API keys. It does not store credentials in browser storage. It does not persist
          model responses from the UI. It does not persist local model evidence/results/audit from the UI. It does not
          persist provider approvals from the UI. It does not release execution from the frontend. It does not hide local
          model selection. It does not hide prompt payload. It prepares a future backend-owned local model bridge path.
          Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Local Model Bridge page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildLocalModelBridgeStableKey(["local-bridge-route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Local Model Bridge model identity">
        <div>
          <p style={panelEyebrow}>Local model bridge model</p>
          <h3 style={sectionTitle}>localModelBridgeId: {bridge.localModelBridgeId}</h3>
        </div>
        <p style={bodyText}>localModelBridgeKind: {bridge.localModelBridgeKind}</p>
        <div style={chipRow}>
          {[
            "localModelBridgeId",
            "localModelBridgeKind",
            "modelRouterRef",
            "providerApprovalRef",
            "goalRef",
            "projectContextRef",
            "localRuntimeIdentityPreview",
            "localModelRegistryPreview",
            "localEndpointBoundaryPreview",
            "localPromptHandoffPreview",
            "localContextRedactionPreview",
            "localCapabilityFitPreview",
            "localTimeoutCancellationPreview",
            "localResponseCapturePreview",
            "localFallbackRoutePreview",
            "localDenialRoutePreview",
            "localEvidenceCapturePreview",
            "localResultAuditPreview",
            "deniedLocalModelBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildLocalModelBridgeStableKey(["local-bridge-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={cardGrid} aria-label="Local model bridge records">
        {model.records.map((record, index) => (
          <RecordCard
            key={buildLocalModelBridgeStableKey(["local-bridge-record", model.route.slug, String(index), record.id])}
            record={record}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Local model bridge summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {bridge.cockpitSummary.map((item, index) => (
              <CheckRow key={buildLocalModelBridgeStableKey(["local-bridge-cockpit-item", String(index), item.id])} item={item} />
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
            {bridge.explicitSafetyLimits.map((limit, index) => (
              <span key={buildLocalModelBridgeStableKey(["local-bridge-safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={panel} aria-label="Local model bridge continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Runtime Model Registry Endpoint Prompt Handoff Redaction Capability Timeout Cancel Response Fallback Denied
              Evidence Result Audit
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned</span>
        </div>
        <p style={bodyText}>
          Local Model Bridge v1 is a deterministic preview of future backend-owned local/private model integration. It
          shows local runtime identity, local model registry shape, endpoint boundary, prompt handoff, context redaction,
          capability fit, timeout, cancellation, response capture, fallback, denial, evidence, result, and audit
          requirements before use. It does not call local models from the cockpit.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit.
          frontend local model calls still blocked. backend-owned local model bridge remains required.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildLocalModelBridgeStableKey(["local-bridge-diagnostic-route", String(index), route.slug])}
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

function SummaryCard({ item }: { item: LocalModelBridgeItem }) {
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

function RecordCard({ record }: { record: LocalModelBridgeRecord }) {
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
          <CheckRow key={buildLocalModelBridgeStableKey(["local-bridge-record-item", record.id, String(index), item.id])} item={item} />
        ))}
      </div>
    </article>
  );
}

function CheckRow({ item }: { item: LocalModelBridgeItem }) {
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

function formatState(state: LocalModelBridgeState): string {
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "preview-only") return "Preview only";
  if (state === "review-only") return "Review only";
  if (state === "manual-review") return "Manual review";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  if (state === "redacted") return "Redacted";
  if (state === "denied") return "Denied";
  return "Blocked";
}

function stateStyle(state: LocalModelBridgeState): CSSProperties {
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
            : state === "manual-review" || state === "redacted"
              ? manualBadge
              : state === "candidate" || state === "release-candidate"
                ? candidateBadge
                : blockedBadge),
  };
}

function smallStateStyle(state: LocalModelBridgeState): CSSProperties {
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
            : state === "manual-review" || state === "redacted"
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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
