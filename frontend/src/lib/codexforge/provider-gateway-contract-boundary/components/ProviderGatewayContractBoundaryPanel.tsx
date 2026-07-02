"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  PROVIDER_GATEWAY_CONTRACT_MODEL_FIELDS,
  buildProviderGatewayContractRouteModel,
  buildProviderGatewayContractStableKey,
  type ProviderGatewayContractBoundaryRouteSlug,
  type ProviderGatewayContractItem,
  type ProviderGatewayContractSection,
  type ProviderGatewayContractState,
} from "../provider-gateway-contract-boundary-model";

export function ProviderGatewayContractBoundaryPageClientShell({
  routeSlug,
}: {
  routeSlug: ProviderGatewayContractBoundaryRouteSlug;
}) {
  const model = buildProviderGatewayContractRouteModel(routeSlug);

  return (
    <CodexForgeAppShell
      activePath={model.route.href}
      workspaceLabel={model.route.title}
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderGatewayContractBoundaryRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ProviderGatewayContractBoundaryCockpitSummaryPanel() {
  const model = buildProviderGatewayContractRouteModel("cockpit-provider-gateway-contract-summary");
  const workspace = model.providerGatewayContract;
  const cockpitCards: readonly { section: ProviderGatewayContractSection; stateLabel: string }[] = [
    { section: workspace.providerSelectionPolicy, stateLabel: "Provider selection" },
    { section: workspace.modelRoutingPolicy, stateLabel: "Model routing" },
    { section: workspace.promptReviewPacket, stateLabel: "Prompt review" },
    { section: workspace.credentialVaultBoundary, stateLabel: "Credential vault" },
    { section: workspace.generationRequestSchema, stateLabel: "Request schema" },
    { section: workspace.generationResponseSchema, stateLabel: "Response schema" },
    { section: workspace.providerSafetyReview, stateLabel: "Safety review" },
    { section: workspace.providerRateLimitPolicy, stateLabel: "Rate limits" },
    { section: workspace.providerQuotaPolicy, stateLabel: "Quota policy" },
    { section: workspace.providerAuditEvent, stateLabel: "Audit event" },
    { section: workspace.providerFailureRetryBoundary, stateLabel: "Failure retry" },
    { section: workspace.frontendProviderCallBlocked, stateLabel: "Frontend blocked" },
  ];

  return (
    <section
      style={cockpitPanel}
      aria-label="Provider Gateway Contract"
      data-codexforge-provider-gateway-contract={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Provider Gateway Contract</span>
          <span style={surfaceBadge}>Backend Contracts</span>
          <span style={approvalBadge}>Release candidate</span>
        </div>
        <h2 style={title}>Provider Gateway Contract</h2>
        <p style={summary}>
          Review-only provider gateway contract. Synthetic data only. This summary extends the backend contract lane
          below Video Backend Service Contract Boundary and shows provider selection policy, model routing policy, prompt
          review packet, credential vault boundary, generation request schema, generation response schema, provider
          safety review, rate limit policy, quota policy, audit event, failure retry boundary, frontend provider call
          blocked, and denied paths.
        </p>
        <p style={bodyText}>
          No provider buttons, model buttons, connector buttons, prompt buttons, credential buttons, generation buttons,
          backend/API/service buttons, command buttons, persistence controls, or hidden execution affordances are present.
        </p>
        <p style={bodyText}>
          No provider calls from the cockpit, no model calls from the cockpit, no connector calls from the cockpit, no
          prompt sending from the cockpit, no credential storage from the cockpit, no API key storage from the cockpit, no
          generation from the cockpit, no backend implementation from the cockpit, no API creation from the cockpit, no
          service deployment from the cockpit, no command execution from the cockpit, no worker dispatch from the cockpit,
          no render queue creation from the cockpit, no artifact creation from the cockpit, and no frontend persistence.
        </p>
      </header>

      <section style={statusBand} aria-label="Provider gateway contract status">
        <span style={stateStyle("review-only")}>Review-only provider gateway contract</span>
        <span style={stateStyle("synthetic-only")}>Synthetic data only</span>
        <span style={stateStyle("blocked")}>Frontend provider calls blocked</span>
        <span style={stateStyle("backend-owned")}>Backend-owned provider gateway required</span>
        <span style={stateStyle("needs-approval")}>Explicit operator approval required</span>
      </section>

      <section style={summaryGrid} aria-label="Provider gateway cockpit summary">
        {workspace.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildProviderGatewayContractStableKey(["provider-gateway-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </section>

      <section style={sectionGrid} aria-label="Provider gateway contract cockpit cards">
        {cockpitCards.map((card, index) => (
          <SummaryCard
            key={buildProviderGatewayContractStableKey(["provider-gateway-card", String(index), card.section.sectionId])}
            section={card.section}
            stateLabel={card.stateLabel}
          />
        ))}
      </section>

      <section style={noticeBand} aria-label="Provider gateway contract safety limits">
        {workspace.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildProviderGatewayContractStableKey(["provider-gateway-limit", String(index), limit])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>

      <details style={diagnosticsDrawer}>
        <summary style={diagnosticsSummary}>Developer Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Diagnostic links stay secondary to the normal cockpit surface and
          do not expose provider, model, connector, prompt, credential, generation, backend, API, service, command,
          worker, queue, artifact, quota, audit, response persistence, request dispatch, or file mutation controls.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildProviderGatewayContractStableKey(["provider-gateway-diagnostic-link", String(index), route.slug])}
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

      <a style={safeLink} href="/controlled-provider-gateway-contract-release-candidate">
        Review Controlled Provider Gateway Contract Release Candidate
      </a>
    </section>
  );
}

export function ProviderGatewayContractBoundaryRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ProviderGatewayContractBoundaryRouteSlug;
  embedded?: boolean;
}) {
  const model = buildProviderGatewayContractRouteModel(routeSlug);
  const workspace = model.providerGatewayContract;
  const titleText = embedded ? "Provider Gateway Contract" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-provider-gateway-contract-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Provider Gateway Contract" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Provider Gateway Contract is review-only and synthetic-only from the frontend. This is not provider integration,
          model integration, prompt execution, credential vault implementation, backend implementation, API creation,
          service deployment, generation, rendering, export, publishing, scheduling, command execution, request dispatch,
          response persistence, quota mutation, audit persistence, file mutation, or frontend persistence.
        </p>
        <p style={bodyText}>
          Backend-owned provider gateway remains required. Backend-owned credential vault remains required. Backend-owned
          prompt review remains required. Backend-owned safety review remains required. Backend-owned audit trail remains
          required. Backend-owned approval capture remains required. Operator review remains required. Explicit operator
          approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Provider gateway contract page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildProviderGatewayContractStableKey(["provider-gateway-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Provider gateway contract model fields">
        <div>
          <p style={panelEyebrow}>Provider gateway contract model</p>
          <h2 style={sectionTitle}>providerGatewayContractId: {workspace.providerGatewayContractId}</h2>
        </div>
        <p style={bodyText}>providerGatewayContractKind: {workspace.providerGatewayContractKind}</p>
        <div style={chipRow}>
          {PROVIDER_GATEWAY_CONTRACT_MODEL_FIELDS.map((field, index) => (
            <span
              key={buildProviderGatewayContractStableKey(["provider-gateway-field", String(index), field])}
              style={chip}
            >
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={sectionGrid} aria-label="Provider gateway contract route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildProviderGatewayContractStableKey([
              "provider-gateway-section",
              model.route.slug,
              String(index),
              section.sectionId,
            ])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Provider gateway contract summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {workspace.cockpitSummary.map((item, index) => (
              <CheckRow
                key={buildProviderGatewayContractStableKey(["provider-gateway-route-summary", String(index), item.id])}
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
            {workspace.explicitSafetyLimits.map((limit, index) => (
              <span
                key={buildProviderGatewayContractStableKey(["provider-gateway-route-limit", String(index), limit])}
                style={dangerChip}
              >
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={continuityBand} aria-label="Provider gateway contract continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Controlled release candidate</p>
            <h2 style={sectionTitle}>Review-only provider gateway contract lane</h2>
          </div>
          <span style={stateStyle("blocked")}>No frontend provider execution or persistence</span>
        </div>
        <p style={bodyText}>
          {model.summary} Release candidate deepens the provider gateway contract lane as review-only contract planning
          without frontend provider calls, model calls, prompt sending, credential storage, request dispatch, response
          persistence, quota mutation, audit persistence, API creation, service deployment, command execution, generation,
          or file mutation.
        </p>
      </section>

      <a style={safeLink} href="/codexforge-cockpit">
        Back to CodexForge Cockpit
      </a>
    </section>
  );
}

function SummaryCard({
  section,
  stateLabel,
}: {
  section: ProviderGatewayContractSection;
  stateLabel: string;
}) {
  return (
    <article style={summaryCard}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{stateLabel}</p>
          <h3 style={sectionTitle}>{section.label}</h3>
        </div>
        <span style={stateStyle(section.state)}>{formatState(section.state)}</span>
      </div>
      <p style={bodyText}>{section.humanReadableSummary}</p>
    </article>
  );
}

function SectionCard({ section }: { section: ProviderGatewayContractSection }) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{section.label}</p>
          <h2 style={sectionTitle}>{section.title}</h2>
        </div>
        <span style={stateStyle(section.state)}>{formatState(section.state)}</span>
      </div>
      <p style={bodyText}>{section.humanReadableSummary}</p>
      <TextList title="Planned inputs" values={section.plannedInputs} />
      <TextList title="Planned outputs" values={section.plannedOutputs} />
      <div style={checklistGrid}>
        {section.checklist.map((item, index) => (
          <CheckRow
            key={buildProviderGatewayContractStableKey(["provider-gateway-check", section.sectionId, String(index), item.id])}
            item={item}
          />
        ))}
      </div>
      <div style={chipRow}>
        {section.safetyNotes.map((note, index) => (
          <span
            key={buildProviderGatewayContractStableKey(["provider-gateway-safety-note", section.sectionId, String(index), note])}
            style={chip}
          >
            {note}
          </span>
        ))}
      </div>
    </article>
  );
}

function TextList({ title, values }: { title: string; values: readonly string[] }) {
  return (
    <div style={listBlock}>
      <p style={panelEyebrow}>{title}</p>
      <div style={chipRow}>
        {values.map((value, index) => (
          <span
            key={buildProviderGatewayContractStableKey(["provider-gateway-list", title, String(index), value])}
            style={chip}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function CheckRow({ item }: { item: ProviderGatewayContractItem }) {
  return (
    <article style={checkRow}>
      <span style={stateStyle(item.state)}>{formatState(item.state)}</span>
      <div>
        <p style={checkLabel}>{item.label}</p>
        <p style={checkDetail}>{item.detail}</p>
      </div>
    </article>
  );
}

function formatState(state: ProviderGatewayContractState): string {
  if (state === "review-only") return "Review only";
  if (state === "synthetic-only") return "Synthetic";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Blocked";
}

function stateStyle(state: ProviderGatewayContractState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "needs-approval"
        ? approvalStateBadge
        : state === "backend-owned"
          ? backendBadge
          : state === "release-candidate" || state === "candidate"
            ? candidateBadge
            : reviewBadge),
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
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const cockpitPanel: CSSProperties = {
  ...page,
  border: "1px solid #c7d3d6",
  borderRadius: 8,
  background: "#f7f9fa",
};

const hero: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const eyebrowRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const title: CSSProperties = {
  margin: 0,
  fontSize: 32,
  lineHeight: 1.08,
  letterSpacing: 0,
  color: "#10212a",
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 1100,
  color: "#354850",
  fontSize: 15,
  lineHeight: 1.65,
};

const bodyText: CSSProperties = {
  margin: 0,
  color: "#43545b",
  fontSize: 14,
  lineHeight: 1.6,
};

const phaseBadge: CSSProperties = {
  padding: "6px 10px",
  borderRadius: 999,
  background: "#12313a",
  color: "#f7fbfc",
  fontSize: 12,
  fontWeight: 700,
};

const surfaceBadge: CSSProperties = {
  ...phaseBadge,
  background: "#dce9ec",
  color: "#12313a",
};

const approvalBadge: CSSProperties = {
  ...phaseBadge,
  background: "#fff0cc",
  color: "#654710",
};

const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const markerPill: CSSProperties = {
  padding: "7px 9px",
  borderRadius: 6,
  background: "#edf4f5",
  border: "1px solid #c9dadd",
  color: "#283a40",
  fontSize: 12,
  lineHeight: 1.35,
};

const identityBand: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 16,
  border: "1px solid #c9dadd",
  borderRadius: 8,
  background: "#ffffff",
};

const statusBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  padding: 12,
  border: "1px solid #c9dadd",
  borderRadius: 8,
  background: "#ffffff",
};

const summaryGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
};

const sectionGrid: CSSProperties = {
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
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 16,
  border: "1px solid #c9dadd",
  borderRadius: 8,
  background: "#ffffff",
};

const summaryCard: CSSProperties = {
  ...panel,
  minHeight: 168,
};

const panelHeader: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
};

const panelEyebrow: CSSProperties = {
  margin: "0 0 4px",
  color: "#60737a",
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: 0,
  textTransform: "uppercase",
};

const sectionTitle: CSSProperties = {
  margin: 0,
  color: "#10212a",
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const listBlock: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: 10,
};

const checkRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 10,
  alignItems: "start",
  padding: 10,
  border: "1px solid #d8e4e7",
  borderRadius: 8,
  background: "#f9fbfb",
};

const checkLabel: CSSProperties = {
  margin: 0,
  color: "#10212a",
  fontWeight: 800,
  fontSize: 13,
};

const checkDetail: CSSProperties = {
  margin: "3px 0 0",
  color: "#43545b",
  fontSize: 12,
  lineHeight: 1.45,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const chip: CSSProperties = {
  padding: "6px 8px",
  borderRadius: 6,
  background: "#edf4f5",
  border: "1px solid #c9dadd",
  color: "#283a40",
  fontSize: 12,
  lineHeight: 1.35,
};

const noticeBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  padding: 12,
  border: "1px solid #e6d2b5",
  borderRadius: 8,
  background: "#fffaf0",
};

const stateBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  maxWidth: 240,
  padding: "5px 8px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 800,
  lineHeight: 1.2,
  whiteSpace: "normal",
};

const reviewBadge: CSSProperties = {
  background: "#e8f4f0",
  color: "#174c3d",
  border: "1px solid #b8dacf",
};

const backendBadge: CSSProperties = {
  background: "#edf0fb",
  color: "#263b73",
  border: "1px solid #c3cbea",
};

const approvalStateBadge: CSSProperties = {
  background: "#fff3d4",
  color: "#6a4b0f",
  border: "1px solid #efd28f",
};

const blockedBadge: CSSProperties = {
  background: "#fae8e8",
  color: "#702121",
  border: "1px solid #e5b8b8",
};

const candidateBadge: CSSProperties = {
  background: "#eef1f7",
  color: "#2f3a51",
  border: "1px solid #cbd3df",
};

const dangerChip: CSSProperties = {
  ...chip,
  background: "#fff7ed",
  borderColor: "#efd3b3",
  color: "#663f14",
};

const continuityBand: CSSProperties = {
  ...panel,
  background: "#f8fbfb",
};

const diagnosticsDrawer: CSSProperties = {
  ...panel,
  background: "#fbfcfc",
};

const diagnosticsSummary: CSSProperties = {
  cursor: "pointer",
  color: "#10212a",
  fontWeight: 800,
};

const routeGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
};

const routeLink: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 12,
  borderRadius: 8,
  border: "1px solid #d5e0e3",
  background: "#ffffff",
  color: "#10212a",
  textDecoration: "none",
};

const routePhase: CSSProperties = {
  color: "#60737a",
  fontSize: 11,
  fontWeight: 800,
};

const routeLabel: CSSProperties = {
  color: "#10212a",
  fontSize: 13,
  fontWeight: 800,
};

const routeCommand: CSSProperties = {
  color: "#43545b",
  fontSize: 12,
};

const safeLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  padding: "9px 12px",
  borderRadius: 8,
  background: "#12313a",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 800,
};
