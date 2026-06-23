"use client";

import type { CSSProperties } from "react";
import {
  buildModelRouterV2RouteModel,
  buildModelRouterV2StableKey,
  type ModelRouterV2Item,
  type ModelRouterV2Record,
  type ModelRouterV2RouteSlug,
  type ModelRouterV2State,
} from "../model-router-v2-model";

export function ModelRouterV2CockpitSummaryPanel() {
  const model = buildModelRouterV2RouteModel("codexforge-cockpit");
  const router = model.modelRouter;

  return (
    <section
      style={cockpitSection}
      data-codexforge-model-router-v2={model.cockpitMarkers.join(" | ")}
      aria-label="Model Router v2"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Model Router v2</p>
          <h2 style={sectionTitle}>Model Router</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>

      <p style={bodyText}>
        Capability shows which model class would be considered and why it fits the work. Local Private is preferred when
        project context is sensitive and a local/private class can satisfy the task.
      </p>
      <p style={bodyText}>
        Cheapest Capable wins by default after capability, Privacy, Cost, Prompt Preview, Evidence, Result, and Audit
        requirements are satisfied. Paid Pro is justified only when cheaper classes cannot meet the requirement and the
        capability gap, privacy tradeoff, cost class, expected benefit, and denied alternatives are visible.
      </p>
      <p style={bodyText}>
        Specialist classes need domain-fit justification before use. Coding, research, creative, image, video, trading,
        data, game server, and domain-specific routing stay review-only until backend-owned provider gating exists.
      </p>
      <p style={bodyText}>
        Privacy means local-only, private, project-sensitive, provider-allowed, or blocked. Cost means free, local,
        low-cost, paid, pro, specialist, unknown, or blocked. Prompt Preview shows what payload would be reviewed before
        any provider use, including redaction and denied payload sections.
      </p>
      <p style={bodyText}>
        Approval is required before any model call because model choice, provider class, privacy class, cost class,
        prompt payload, fallback, denied state, Evidence, Result, and Audit capture must be operator-visible first. No
        model calls from the cockpit. No provider calls from the cockpit. No connector calls from the cockpit. No prompt
        sending from the cockpit. No credential storage from the cockpit. Backend-owned model routing remains required.
        Explicit operator approval remains required.
      </p>

      <div style={cockpitGrid} aria-label="Model router cockpit labels">
        {router.cockpitSummary.map((item, index) => (
          <SummaryCard
            key={buildModelRouterV2StableKey(["cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </div>

      <section style={identityBand} aria-label="Model router identity">
        <p style={panelEyebrow}>Router identity</p>
        <p style={bodyText}>
          modelRouterId: {router.modelRouterId}. modelRouterKind: {router.modelRouterKind}. Capability, Local Private,
          Cheapest Capable, Paid Pro, Specialist, Privacy, Cost, Prompt Preview, Approval, Fallback, Denied, Evidence,
          Result, and Audit are visible before use.
        </p>
      </section>

      <div style={markerBand} aria-label="Model Router v2 cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildModelRouterV2StableKey(["cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ModelRouterV2RoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ModelRouterV2RouteSlug;
  embedded?: boolean;
}) {
  const model = buildModelRouterV2RouteModel(routeSlug);
  const router = model.modelRouter;
  const titleText = embedded ? "Model Router v2" : model.route.title;

  return (
    <section style={embedded ? embeddedPage : page} data-codexforge-model-router-v2-route={model.route.markerPhrases.join(" | ")}>
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Model Router v2" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Model Router v2 is preview-only from the frontend. It does not call models from the UI. It does not call
          providers from the UI. It does not call connectors from the UI. It does not send prompts from the UI.
        </p>
        <p style={bodyText}>
          It does not read secrets or API keys. It does not store credentials in browser storage. It does not hide model
          choice, cost class, or privacy class. It does not persist routing decisions from the UI. It prepares a future
          backend-owned provider-gated model routing path. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Model Router v2 page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildModelRouterV2StableKey(["route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Model Router v2 model identity">
        <div>
          <p style={panelEyebrow}>Model router v2 model</p>
          <h3 style={sectionTitle}>modelRouterId: {router.modelRouterId}</h3>
        </div>
        <p style={bodyText}>modelRouterKind: {router.modelRouterKind}</p>
        <div style={chipRow}>
          {[
            "modelRouterId",
            "modelRouterKind",
            "goalRef",
            "projectContextRef",
            "workProposalRef",
            "capabilityRegistry",
            "localPrivatePreference",
            "cheapestCapablePolicy",
            "paidProJustification",
            "specialistDomainFit",
            "privacyClass",
            "costClass",
            "promptPayloadPreview",
            "approvalGate",
            "fallbackRoute",
            "denialRoute",
            "evidenceResultAuditPreview",
            "deniedModelBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildModelRouterV2StableKey(["model-router-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={cardGrid} aria-label="Model router records">
        {model.records.map((record, index) => (
          <RecordCard key={buildModelRouterV2StableKey(["record", model.route.slug, String(index), record.id])} record={record} />
        ))}
      </section>

      <section style={splitBand} aria-label="Model router summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {router.cockpitSummary.map((item, index) => (
              <CheckRow key={buildModelRouterV2StableKey(["cockpit-item", String(index), item.id])} item={item} />
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
            {router.explicitSafetyLimits.map((limit, index) => (
              <span key={buildModelRouterV2StableKey(["safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={panel} aria-label="Model router continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Capability Local Private Cheapest Capable Paid Pro Specialist Privacy Cost Prompt Preview Approval
              Fallback Denied Evidence Result Audit
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned</span>
        </div>
        <p style={bodyText}>
          The model router v2 summary is a deterministic preview of future backend-owned provider-gated model routing.
          It shows model choice, privacy class, cost class, capability fit, prompt payload, fallback, denial, evidence,
          result, and audit requirements before use. It does not call models, providers, or connectors from the cockpit.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit.
          frontend model/provider/connector calls still blocked. backend-owned provider-gated model routing remains
          required.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildModelRouterV2StableKey(["diagnostic-route", String(index), route.slug])}
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

function SummaryCard({ item }: { item: ModelRouterV2Item }) {
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

function RecordCard({ record }: { record: ModelRouterV2Record }) {
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
          <CheckRow key={buildModelRouterV2StableKey(["record-item", record.id, String(index), item.id])} item={item} />
        ))}
      </div>
    </article>
  );
}

function CheckRow({ item }: { item: ModelRouterV2Item }) {
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

function formatState(state: ModelRouterV2State): string {
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

function stateStyle(state: ModelRouterV2State): CSSProperties {
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

function smallStateStyle(state: ModelRouterV2State): CSSProperties {
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

const manualBadge: CSSProperties = {
  background: "#fff6f1",
  borderColor: "#d7aa89",
  color: "#6f3d18",
};

const candidateBadge: CSSProperties = {
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
