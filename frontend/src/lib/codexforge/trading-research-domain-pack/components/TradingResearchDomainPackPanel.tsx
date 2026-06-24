"use client";

import type { CSSProperties } from "react";
import {
  buildTradingResearchDomainRouteModel,
  buildTradingResearchDomainStableKey,
  type TradingResearchDomainItem,
  type TradingResearchDomainRouteSlug,
  type TradingResearchDomainSection,
  type TradingResearchDomainState,
} from "../trading-research-domain-pack-model";

export function TradingResearchDomainPackCockpitPanel() {
  const model = buildTradingResearchDomainRouteModel("cockpit-trading-research-summary");
  const tradingResearchDomain = model.tradingResearchDomain;

  return (
    <section
      style={cockpitPanel}
      aria-label="Trading Research Domain Pack"
      data-codexforge-trading-research-domain-pack={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Trading Research Domain Pack</span>
          <span style={surfaceBadge}>Research only</span>
          <span style={approvalBadge}>Explicit approval required</span>
        </div>
        <h2 style={title}>Trading Research</h2>
        <p style={summary}>
          Safe review-only research workflow for goals, watchlists, theses, catalysts, risks, strategy candidates,
          backtest readiness, paper-trade readiness, profit lockbox concepts, mandate drafts, broker boundaries,
          evidence, and audit. The cockpit does not connect brokers, place trades, fetch live market data, provide
          financial advice, or make guaranteed profit claims.
        </p>
      </header>

      <section style={summaryGrid} aria-label="Trading research cockpit summary">
        {tradingResearchDomain.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildTradingResearchDomainStableKey(["cockpit-trading-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </section>

      <section style={sectionGrid} aria-label="Trading research cockpit cards">
        <SummaryCard section={tradingResearchDomain.researchGoalIntake} stateLabel="Research Goal" />
        <SummaryCard section={tradingResearchDomain.watchlistPreview} stateLabel="Watchlist" />
        <SummaryCard section={tradingResearchDomain.thesisBuilderPreview} stateLabel="Thesis Builder" />
        <SummaryCard section={tradingResearchDomain.catalystTrackerPreview} stateLabel="Catalyst Tracker" />
        <SummaryCard section={tradingResearchDomain.riskNotesPreview} stateLabel="Risk Notes" />
        <SummaryCard section={tradingResearchDomain.strategyCandidatePreview} stateLabel="Strategy Candidates" />
        <SummaryCard section={tradingResearchDomain.backtestReadinessPreview} stateLabel="Backtest Readiness" />
        <SummaryCard section={tradingResearchDomain.paperTradeReadinessPreview} stateLabel="Paper Trade Readiness" />
        <SummaryCard section={tradingResearchDomain.profitLockboxPreview} stateLabel="Profit Lockbox" />
        <SummaryCard section={tradingResearchDomain.tradingMandateDraftPreview} stateLabel="Trading Mandate Draft" />
        <SummaryCard section={tradingResearchDomain.brokerBoundaryPreview} stateLabel="Broker Boundary" />
        <SummaryCard section={tradingResearchDomain.evidenceAuditPreview} stateLabel="Evidence Audit" />
      </section>

      <section style={noticeBand} aria-label="Trading research cockpit boundaries">
        {tradingResearchDomain.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildTradingResearchDomainStableKey(["trading-cockpit-limit", String(index), limit])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>

      <section style={markerBand} aria-label="Trading research cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span
            key={buildTradingResearchDomainStableKey(["trading-cockpit-marker", String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>
    </section>
  );
}

export function TradingResearchDomainRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: TradingResearchDomainRouteSlug;
  embedded?: boolean;
}) {
  const model = buildTradingResearchDomainRouteModel(routeSlug);
  const tradingResearchDomain = model.tradingResearchDomain;
  const titleText = embedded ? "Trading Research Domain Pack" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-trading-research-domain-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Trading Research" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Trading Research Domain Pack v1 is research-only and review-only from the frontend. It is not live trading,
          broker execution, financial advice, personalised investment recommendation, buy sell instruction, automated
          trading, signal execution, or order placement.
        </p>
        <p style={bodyText}>
          The UI does not connect brokers, fetch live market data, run backtests, place paper trades, automate trading,
          call models, call providers, call connectors, send prompts, run commands, write files, persist approvals,
          persist evidence, persist results, persist audit, store credentials, or write browser storage.
        </p>
      </header>

      <section style={markerBand} aria-label="Trading research page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildTradingResearchDomainStableKey(["trading-route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Trading research model fields">
        <div>
          <p style={panelEyebrow}>Trading research model</p>
          <h2 style={sectionTitle}>tradingResearchDomainId: {tradingResearchDomain.tradingResearchDomainId}</h2>
        </div>
        <p style={bodyText}>tradingResearchDomainKind: {tradingResearchDomain.tradingResearchDomainKind}</p>
        <div style={chipRow}>
          {[
            "tradingResearchDomainId",
            "tradingResearchDomainKind",
            "researchGoalIntake",
            "watchlistPreview",
            "thesisBuilderPreview",
            "catalystTrackerPreview",
            "riskNotesPreview",
            "strategyCandidatePreview",
            "backtestReadinessPreview",
            "paperTradeReadinessPreview",
            "profitLockboxPreview",
            "tradingMandateDraftPreview",
            "brokerBoundaryPreview",
            "evidenceAuditPreview",
            "cockpitSummary",
            "deniedTradingResearchBoundaries",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildTradingResearchDomainStableKey(["trading-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={sectionGrid} aria-label="Trading research route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildTradingResearchDomainStableKey(["trading-section", model.route.slug, String(index), section.sectionId])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Trading research summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {tradingResearchDomain.cockpitSummary.map((item, index) => (
              <CheckRow
                key={buildTradingResearchDomainStableKey(["trading-route-summary", String(index), item.id])}
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
            {tradingResearchDomain.explicitSafetyLimits.map((limit, index) => (
              <span
                key={buildTradingResearchDomainStableKey(["trading-route-limit", String(index), limit])}
                style={dangerChip}
              >
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={continuityBand} aria-label="Trading research continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Trading Research Domain Pack Research Goal Watchlist Thesis Builder Catalyst Tracker Risk Notes Strategy
              Candidates Backtest Readiness Paper Trade Readiness Profit Lockbox Trading Mandate Draft Broker Boundary
              Evidence Audit
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned future workflow</span>
        </div>
        <p style={bodyText}>
          Release candidate prepares CodexForge for backend-owned trading research workflows without frontend trading
          execution. Phase pages remain dev test diagnostics only. The cockpit remains the normal user surface.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Normal users continue to work from /codexforge-cockpit. Trading research phase pages remain dev test
          diagnostics only.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildTradingResearchDomainStableKey(["trading-diagnostic-route", String(index), route.slug])}
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

function SummaryCard({ section, stateLabel }: { section: TradingResearchDomainSection; stateLabel: string }) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{stateLabel}</p>
          <h3 style={sectionTitle}>{section.label}</h3>
        </div>
        <span style={stateStyle(section.state)}>{formatState(section.state)}</span>
      </div>
      <p style={bodyText}>{section.humanReadableSummary}</p>
      <div style={chipRow}>
        {section.plannedOutputs.slice(0, 5).map((output, index) => (
          <span
            key={buildTradingResearchDomainStableKey(["summary-output", section.sectionId, String(index), output])}
            style={chip}
          >
            {output}
          </span>
        ))}
      </div>
    </article>
  );
}

function SectionCard({ section }: { section: TradingResearchDomainSection }) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{section.label}</p>
          <h3 style={sectionTitle}>{section.title}</h3>
        </div>
        <span style={stateStyle(section.state)}>{formatState(section.state)}</span>
      </div>
      <p style={bodyText}>{section.humanReadableSummary}</p>

      <FieldList label="plannedInputs" values={section.plannedInputs} />
      <FieldList label="plannedOutputs" values={section.plannedOutputs} />
      <FieldList label="reviewOnlyNotes" values={section.reviewOnlyNotes} />
      <FieldList label="safetyNotes" values={section.safetyNotes} />

      <div style={chipRow}>
        {section.deniedActions.map((action, index) => (
          <span
            key={buildTradingResearchDomainStableKey(["trading-denied-action", section.sectionId, String(index), action])}
            style={dangerChip}
          >
            {action}
          </span>
        ))}
      </div>

      <div style={checklistGrid}>
        {section.checklist.map((check, index) => (
          <CheckRow
            key={buildTradingResearchDomainStableKey(["trading-check-row", section.sectionId, String(index), check.id])}
            item={check}
          />
        ))}
      </div>
    </article>
  );
}

function FieldList({ label, values }: { label: string; values: readonly string[] }) {
  return (
    <div style={fieldRow}>
      <span style={fieldLabel}>{label}</span>
      {values.map((value, index) => (
        <span key={buildTradingResearchDomainStableKey(["trading-field-list", label, String(index), value])} style={fieldValue}>
          {value}
        </span>
      ))}
    </div>
  );
}

function CheckRow({ item }: { item: TradingResearchDomainItem }) {
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

function formatState(state: TradingResearchDomainState): string {
  if (state === "research-only") return "Research only";
  if (state === "review-only") return "Review only";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "blocked") return "Blocked";
  if (state === "denied") return "Denied";
  if (state === "candidate") return "Candidate";
  return "Release candidate";
}

function stateStyle(state: TradingResearchDomainState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked" || state === "denied"
      ? blockedBadge
      : state === "needs-approval"
        ? approvalStateBadge
        : state === "review-only" || state === "research-only"
          ? reviewBadge
          : state === "backend-owned"
            ? backendBadge
            : candidateBadge),
  };
}

function smallStateStyle(state: TradingResearchDomainState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked" || state === "denied"
      ? blockedBadge
      : state === "needs-approval"
        ? approvalStateBadge
        : state === "review-only" || state === "research-only"
          ? reviewBadge
          : state === "backend-owned"
            ? backendBadge
            : candidateBadge),
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
  color: "#172026",
};

const cockpitPanel: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  border: "1px solid #cdd9df",
  borderRadius: 8,
  padding: 18,
  background: "#fbfcfd",
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
  borderColor: "#8ab7a3",
  color: "#24533f",
  background: "#f0faf5",
};

const approvalBadge: CSSProperties = {
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
  maxWidth: 980,
  fontSize: 18,
  lineHeight: 1.5,
  color: "#344854",
};

const summaryGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
};

const sectionGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 14,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 14,
};

const noticeBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  border: "1px solid #d8c7c2",
  borderRadius: 8,
  padding: 14,
  background: "#fff8f6",
};

const identityBand: CSSProperties = {
  border: "1px solid #cfd8df",
  borderRadius: 8,
  padding: 14,
  background: "#f7fafc",
};

const panel: CSSProperties = {
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

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
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
  margin: "7px 0 0",
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

const continuityBand: CSSProperties = {
  border: "1px solid #cfd8df",
  borderRadius: 8,
  padding: 16,
  background: "#f7fafc",
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

const approvalStateBadge: CSSProperties = {
  borderColor: "#c7a553",
  background: "#fff8e6",
  color: "#5c4512",
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
