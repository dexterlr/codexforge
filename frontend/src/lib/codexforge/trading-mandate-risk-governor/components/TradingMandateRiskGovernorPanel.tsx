"use client";

import type { CSSProperties } from "react";
import {
  buildTradingMandateRiskGovernorRouteModel,
  buildTradingMandateRiskGovernorStableKey,
  type TradingMandateRiskGovernorItem,
  type TradingMandateRiskGovernorRouteSlug,
  type TradingMandateRiskGovernorSection,
  type TradingMandateRiskGovernorState,
} from "../trading-mandate-risk-governor-model";

export function TradingMandateRiskGovernorCockpitPanel() {
  const model = buildTradingMandateRiskGovernorRouteModel("controlled-trading-mandate-risk-governor-release-candidate");
  const tradingMandateRiskGovernor = model.tradingMandateRiskGovernor;

  return (
    <section
      style={cockpitPanel}
      aria-label="Trading Mandate Risk Governor"
      data-codexforge-trading-mandate-risk-governor={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Trading Mandate Risk Governor</span>
          <span style={surfaceBadge}>Review only</span>
          <span style={approvalBadge}>Explicit approval required</span>
        </div>
        <h2 style={title}>Trading Mandate + Risk Governor</h2>
        <p style={summary}>
          Safe review-only mandate and risk-control workspace for capital allocation, active capital, protected profit,
          reinvestable profit, daily loss, drawdown, position risk, approved markets, approved symbols, approved
          strategies, trade thesis, evidence, kill switch, and backend-owned broker boundary prerequisites. The cockpit
          does not connect brokers, place trades, fetch live market data, provide financial advice, or automate trading.
        </p>
      </header>

      <section style={summaryGrid} aria-label="Trading mandate risk governor cockpit summary">
        {tradingMandateRiskGovernor.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildTradingMandateRiskGovernorStableKey(["cockpit-mandate-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </section>

      <section style={sectionGrid} aria-label="Trading mandate risk governor cockpit cards">
        <SummaryCard section={tradingMandateRiskGovernor.capitalAllocationRules} stateLabel="Capital Allocation" />
        <SummaryCard section={tradingMandateRiskGovernor.activeCapitalLedger} stateLabel="Active Capital" />
        <SummaryCard section={tradingMandateRiskGovernor.protectedProfitBucket} stateLabel="Protected Profit" />
        <SummaryCard section={tradingMandateRiskGovernor.reinvestableProfitRules} stateLabel="Reinvestable Profit" />
        <SummaryCard section={tradingMandateRiskGovernor.maxDailyLossGuard} stateLabel="Max Daily Loss" />
        <SummaryCard section={tradingMandateRiskGovernor.maxDrawdownGuard} stateLabel="Max Drawdown" />
        <SummaryCard section={tradingMandateRiskGovernor.positionRiskGuard} stateLabel="Position Risk" />
        <SummaryCard section={tradingMandateRiskGovernor.approvedMarketUniverse} stateLabel="Approved Markets" />
        <SummaryCard section={tradingMandateRiskGovernor.approvedSymbolUniverse} stateLabel="Approved Symbols" />
        <SummaryCard section={tradingMandateRiskGovernor.approvedStrategyClasses} stateLabel="Approved Strategies" />
        <SummaryCard section={tradingMandateRiskGovernor.forbiddenStrategyClasses} stateLabel="Forbidden Strategies" />
        <SummaryCard section={tradingMandateRiskGovernor.tradeThesisRequirement} stateLabel="Trade Thesis Required" />
        <SummaryCard section={tradingMandateRiskGovernor.tradingEvidenceRequirement} stateLabel="Evidence Required" />
        <SummaryCard section={tradingMandateRiskGovernor.tradingKillSwitch} stateLabel="Kill Switch" />
      </section>

      <section style={noticeBand} aria-label="Trading mandate risk governor cockpit boundaries">
        {tradingMandateRiskGovernor.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildTradingMandateRiskGovernorStableKey(["mandate-cockpit-limit", String(index), limit])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>

      <section style={markerBand} aria-label="Trading mandate risk governor cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span
            key={buildTradingMandateRiskGovernorStableKey(["mandate-cockpit-marker", String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>
    </section>
  );
}

export function TradingMandateRiskGovernorRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: TradingMandateRiskGovernorRouteSlug;
  embedded?: boolean;
}) {
  const model = buildTradingMandateRiskGovernorRouteModel(routeSlug);
  const tradingMandateRiskGovernor = model.tradingMandateRiskGovernor;
  const titleText = embedded ? "Trading Mandate Risk Governor" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-trading-mandate-risk-governor-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Trading Mandate" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Trading Mandate Risk Governor v1 is review-only from the frontend. It is not trading execution, broker
          integration, financial advice, personalised investment recommendation, order placement, automated trading,
          live market data, signal execution, paper trading, backtesting, or money movement.
        </p>
        <p style={bodyText}>
          The UI does not connect brokers, place trades, fetch live market data, provide financial advice, provide
          personalised recommendations, issue buy sell instructions, size orders, monitor live accounts, move money,
          automate trading, call models, call providers, call connectors, send prompts, run commands, write files,
          persist approvals, persist evidence, persist audit, create queues, create transactions, store credentials,
          or write browser storage.
        </p>
      </header>

      <section style={markerBand} aria-label="Trading mandate risk governor page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildTradingMandateRiskGovernorStableKey(["mandate-route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Trading mandate risk governor model fields">
        <div>
          <p style={panelEyebrow}>Trading mandate risk governor model</p>
          <h2 style={sectionTitle}>
            tradingMandateRiskGovernorId: {tradingMandateRiskGovernor.tradingMandateRiskGovernorId}
          </h2>
        </div>
        <p style={bodyText}>
          tradingMandateRiskGovernorKind: {tradingMandateRiskGovernor.tradingMandateRiskGovernorKind}
        </p>
        <div style={chipRow}>
          {[
            "tradingMandateRiskGovernorId",
            "tradingMandateRiskGovernorKind",
            "capitalAllocationRules",
            "activeCapitalLedger",
            "protectedProfitBucket",
            "reinvestableProfitRules",
            "maxDailyLossGuard",
            "maxDrawdownGuard",
            "positionRiskGuard",
            "approvedMarketUniverse",
            "approvedSymbolUniverse",
            "approvedStrategyClasses",
            "forbiddenStrategyClasses",
            "tradeThesisRequirement",
            "tradingEvidenceRequirement",
            "tradingKillSwitch",
            "deniedTradingMandateBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildTradingMandateRiskGovernorStableKey(["mandate-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={sectionGrid} aria-label="Trading mandate risk governor route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildTradingMandateRiskGovernorStableKey(["mandate-section", model.route.slug, String(index), section.sectionId])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Trading mandate risk governor summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {tradingMandateRiskGovernor.cockpitSummary.map((item, index) => (
              <CheckRow
                key={buildTradingMandateRiskGovernorStableKey(["mandate-route-summary", String(index), item.id])}
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
            {tradingMandateRiskGovernor.explicitSafetyLimits.map((limit, index) => (
              <span
                key={buildTradingMandateRiskGovernorStableKey(["mandate-route-limit", String(index), limit])}
                style={dangerChip}
              >
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={continuityBand} aria-label="Trading mandate risk governor continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Trading Mandate Risk Governor Capital Allocation Active Capital Protected Profit Reinvestable Profit Max
              Daily Loss Max Drawdown Position Risk Approved Markets Approved Symbols Approved Strategies Forbidden
              Strategies Trade Thesis Required Evidence Required Kill Switch
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned future workflow</span>
        </div>
        <p style={bodyText}>
          Release candidate prepares CodexForge for backend-owned trading mandate and risk-governor workflows without
          frontend trading execution. Phase pages remain dev test diagnostics only. The cockpit remains the normal user
          surface.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Normal users continue to work from /codexforge-cockpit. Trading mandate and risk-governor phase pages remain
          dev test diagnostics only.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildTradingMandateRiskGovernorStableKey(["mandate-diagnostic-route", String(index), route.slug])}
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

function SummaryCard({ section, stateLabel }: { section: TradingMandateRiskGovernorSection; stateLabel: string }) {
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
            key={buildTradingMandateRiskGovernorStableKey(["mandate-summary-output", section.sectionId, String(index), output])}
            style={chip}
          >
            {output}
          </span>
        ))}
      </div>
    </article>
  );
}

function SectionCard({ section }: { section: TradingMandateRiskGovernorSection }) {
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
            key={buildTradingMandateRiskGovernorStableKey(["mandate-denied-action", section.sectionId, String(index), action])}
            style={dangerChip}
          >
            {action}
          </span>
        ))}
      </div>

      <div style={checklistGrid}>
        {section.checklist.map((check, index) => (
          <CheckRow
            key={buildTradingMandateRiskGovernorStableKey(["mandate-check-row", section.sectionId, String(index), check.id])}
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
        <span
          key={buildTradingMandateRiskGovernorStableKey(["mandate-field-list", label, String(index), value])}
          style={fieldValue}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

function CheckRow({ item }: { item: TradingMandateRiskGovernorItem }) {
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

function formatState(state: TradingMandateRiskGovernorState): string {
  if (state === "review-only") return "Review only";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "blocked") return "Blocked";
  if (state === "denied") return "Denied";
  if (state === "candidate") return "Candidate";
  return "Release candidate";
}

function stateStyle(state: TradingMandateRiskGovernorState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked" || state === "denied"
      ? blockedBadge
      : state === "needs-approval"
        ? approvalStateBadge
        : state === "review-only"
          ? reviewBadge
          : state === "backend-owned"
            ? backendBadge
            : candidateBadge),
  };
}

function smallStateStyle(state: TradingMandateRiskGovernorState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked" || state === "denied"
      ? blockedBadge
      : state === "needs-approval"
        ? approvalStateBadge
        : state === "review-only"
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
