"use client";

import type { CSSProperties } from "react";
import {
  buildCommandRunnerSafetyV2RouteModel,
  buildCommandRunnerSafetyV2StableKey,
  type CommandRunnerSafetyV2Item,
  type CommandRunnerSafetyV2PanelState,
  type CommandRunnerSafetyV2RouteSlug,
  type CommandRunnerSafetyV2Section,
} from "../command-runner-safety-v2-model";

export function CommandRunnerSafetyV2CockpitSummaryPanel() {
  const model = buildCommandRunnerSafetyV2RouteModel("codexforge-cockpit");
  const commandSafety = model.commandSafety;

  return (
    <section
      style={cockpitSection}
      data-codexforge-command-runner-safety-v2={model.cockpitMarkers.join(" | ")}
      aria-label="Command Runner Safety v2"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Command Runner Safety v2</p>
          <h2 style={sectionTitle}>Command Safety</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>

      <p style={bodyText}>
        Command shows what future backend-owned command candidate would be reviewed. Allowlist explains why the
        candidate is allowlisted, denied, or moved to manual review. Arguments shows how tokens, flags, values,
        traversal, shell operators, chained commands, redirection, encoded payloads, and unknown arguments are guarded.
      </p>
      <p style={bodyText}>
        Working Directory constrains execution to approved workspace and repository boundaries. Environment shows names
        only because values, secrets, tokens, credentials, and keys are redacted. Timeout and Cancel define duration
        limits, manual stop boundaries, and backend-owned process control without starting or canceling processes from
        the cockpit.
      </p>
      <p style={bodyText}>
        Stdout, Stderr, and Exit Code describe capture, truncation, redaction, timestamps, evidence linkage, and
        normalized outcomes. Denied Commands explains why shell escalation, dangerous commands, installs, deploys, port
        binding, and runtime starts remain denied. Evidence and Result remain backend-owned capture contracts only.
      </p>
      <p style={bodyText}>
        No command execution from the cockpit. No process spawning from the cockpit. No environment values from the
        cockpit. No shell escalation from the cockpit. No install deploy port or runtime execution from the cockpit.
        Backend-owned command execution remains required. Explicit operator approval remains required.
      </p>

      <div style={cockpitGrid} aria-label="Command safety cockpit labels">
        {commandSafety.cockpitSummary.map((item, index) => (
          <SummaryCard
            key={buildCommandRunnerSafetyV2StableKey(["cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </div>

      <section style={identityBand} aria-label="Command runner safety cockpit identity">
        <p style={panelEyebrow}>Command safety identity</p>
        <p style={bodyText}>
          commandSafetyId: {commandSafety.commandSafetyId}. commandSafetyKind: {commandSafety.commandSafetyKind}.
          commandCandidateRef: {commandSafety.commandCandidateRef}. transactionRef: {commandSafety.transactionRef}.
          queueItemRef: {commandSafety.queueItemRef}.
        </p>
      </section>

      <div style={markerBand} aria-label="Command Runner Safety v2 cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildCommandRunnerSafetyV2StableKey(["cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function CommandRunnerSafetyV2RoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: CommandRunnerSafetyV2RouteSlug;
  embedded?: boolean;
}) {
  const model = buildCommandRunnerSafetyV2RouteModel(routeSlug);
  const commandSafety = model.commandSafety;
  const titleText = embedded ? "Command Runner Safety v2" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-command-runner-safety-v2-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Command Runner Safety v2" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Command Runner Safety v2 is preview-only from the frontend. It does not run commands from the UI, spawn
          processes from the UI, expose environment values, persist evidence/results/audit from the UI, or release
          execution from the frontend.
        </p>
        <p style={bodyText}>
          It prepares a future backend-owned guarded command path. Backend-owned guarded execution remains required for
          real command execution. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Command runner safety page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildCommandRunnerSafetyV2StableKey(["route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Command runner safety model identity">
        <div>
          <p style={panelEyebrow}>Command runner safety v2 model</p>
          <h3 style={sectionTitle}>commandSafetyId: {commandSafety.commandSafetyId}</h3>
        </div>
        <p style={bodyText}>commandSafetyKind: {commandSafety.commandSafetyKind}</p>
        <p style={bodyText}>
          commandCandidateRef: {commandSafety.commandCandidateRef}. transactionRef: {commandSafety.transactionRef}.
          queueItemRef: {commandSafety.queueItemRef}.
        </p>
        <div style={chipRow}>
          {[
            "commandSafetyId",
            "commandSafetyKind",
            "commandCandidateRef",
            "transactionRef",
            "queueItemRef",
            "allowlistPolicy",
            "argumentParserGuard",
            "workingDirectoryGuard",
            "environmentRedactionGuard",
            "timeoutCancellationGuard",
            "stdoutStderrCaptureContract",
            "exitCodeNormalizationContract",
            "shellEscalationDenial",
            "dangerousCommandDenial",
            "installDeployPortRuntimeDenial",
            "commandEvidencePacket",
            "commandResultPacket",
            "deniedCommandBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildCommandRunnerSafetyV2StableKey(["command-safety-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={cardGrid} aria-label="Command runner safety sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildCommandRunnerSafetyV2StableKey(["section", model.route.slug, String(index), section.id])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Command runner denied boundaries and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Denied Commands</p>
              <h3 style={sectionTitle}>deniedCommandBoundaries</h3>
            </div>
            <span style={stateStyle("denied")}>Denied</span>
          </div>
          <div style={checklistGrid}>
            {commandSafety.deniedCommandBoundaries.map((boundary, index) => (
              <CheckRow
                key={buildCommandRunnerSafetyV2StableKey(["denied-boundary", String(index), boundary.id])}
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
            {commandSafety.explicitSafetyLimits.map((limit, index) => (
              <span key={buildCommandRunnerSafetyV2StableKey(["safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={panel} aria-label="Cockpit command safety summary">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Cockpit</p>
            <h3 style={sectionTitle}>
              Command Allowlist Arguments Working Directory Environment Timeout Cancel Stdout Stderr Exit Code Denied
              Commands Evidence Result
            </h3>
          </div>
          <span style={stateStyle("review-only")}>Review only</span>
        </div>
        <div style={chipRow}>
          {commandSafety.cockpitSummary.map((item, index) => (
            <span key={buildCommandRunnerSafetyV2StableKey(["route-cockpit", String(index), item.id])} style={chip}>
              {item.label}: {item.detail}
            </span>
          ))}
        </div>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit.
          frontend command execution still blocked. backend-owned command execution remains required.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildCommandRunnerSafetyV2StableKey(["diagnostic-route", String(index), route.slug])}
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

function SummaryCard({ item }: { item: CommandRunnerSafetyV2Item }) {
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

function SectionCard({ section }: { section: CommandRunnerSafetyV2Section }) {
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
          <CheckRow
            key={buildCommandRunnerSafetyV2StableKey(["item", section.id, String(index), item.id])}
            item={item}
          />
        ))}
      </div>
    </article>
  );
}

function CheckRow({ item }: { item: CommandRunnerSafetyV2Item }) {
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

function formatState(state: CommandRunnerSafetyV2PanelState): string {
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "preview-only") return "Preview only";
  if (state === "review-only") return "Review only";
  if (state === "manual-review") return "Manual review";
  if (state === "capture-contract") return "Capture contract";
  if (state === "normalized") return "Normalized";
  if (state === "denied") return "Denied";
  return "Blocked";
}

function stateStyle(state: CommandRunnerSafetyV2PanelState): CSSProperties {
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
              : state === "normalized"
                ? normalizedBadge
                : blockedBadge),
  };
}

function smallStateStyle(state: CommandRunnerSafetyV2PanelState): CSSProperties {
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
              : state === "normalized"
                ? normalizedBadge
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

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 10,
};

const chip: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 6,
  background: "#ffffff",
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
  borderRadius: 6,
  border: "1px solid #d8dee4",
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

const normalizedBadge: CSSProperties = {
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
  border: "1px solid #d8dee4",
  borderRadius: 8,
  background: "#fbfcfd",
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
  border: "1px solid #d8dee4",
  borderRadius: 8,
  background: "#ffffff",
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
