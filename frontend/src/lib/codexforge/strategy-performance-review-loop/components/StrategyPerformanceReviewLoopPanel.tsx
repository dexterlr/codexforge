"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildStrategyPerformanceReviewLoopRouteModel,
  buildStrategyPerformanceReviewLoopStableKey,
  type StrategyPerformanceReviewLoopItem,
  type StrategyPerformanceReviewLoopRouteSlug,
  type StrategyPerformanceReviewLoopSection,
  type StrategyPerformanceReviewLoopState,
} from "../strategy-performance-review-loop-model";

export function StrategyPerformanceReviewLoopPageClientShell({
  routeSlug,
}: {
  routeSlug: StrategyPerformanceReviewLoopRouteSlug;
}) {
  const model = buildStrategyPerformanceReviewLoopRouteModel(routeSlug);

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
      <StrategyPerformanceReviewLoopRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function StrategyPerformanceReviewLoopCockpitSummaryPanel() {
  const model = buildStrategyPerformanceReviewLoopRouteModel("cockpit-strategy-performance-review-summary");
  const loop = model.strategyPerformanceReviewLoop;

  return (
    <section
      style={cockpitPanel}
      aria-label="Strategy Performance Review Loop"
      data-codexforge-strategy-performance-review-loop={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Strategy Performance Review Loop</span>
          <span style={surfaceBadge}>Trading Workspace</span>
          <span style={approvalBadge}>Synthetic review only</span>
        </div>
        <h2 style={title}>Strategy Performance Review Loop</h2>
        <p style={summary}>
          Safe review-only strategy feedback preview for simulated strategy scorecard, rule outcome review, entry rule
          review, exit rule review, risk rule review, invalidation review, evidence feedback, hypothesis update,
          watchlist feedback, operator review decision, strategy change request, no auto tune boundary, and denied paths.
          Synthetic data only. Review-only strategy feedback. No financial advice from the cockpit, no personalised
          recommendations from the cockpit, no buy sell instructions from the cockpit, no strategy auto promotion from
          the cockpit, no strategy auto tuning from the cockpit, no real P&amp;L analysis from the cockpit, no live
          market data calls from the cockpit, no order placement from the cockpit, no order dispatch from the cockpit,
          no broker execution from the cockpit, no money movement from the cockpit, no trading automation from the
          cockpit, and no performance guarantees.
        </p>
      </header>

      <section style={summaryGrid} aria-label="Strategy performance review loop cockpit summary">
        {loop.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildStrategyPerformanceReviewLoopStableKey(["strategy-review-cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </section>

      <section style={sectionGrid} aria-label="Strategy performance review loop cockpit cards">
        <SummaryCard section={loop.simulatedStrategyScorecard} stateLabel="Scorecard" />
        <SummaryCard section={loop.simulatedRuleOutcomeReview} stateLabel="Rule Outcomes" />
        <SummaryCard section={loop.simulatedEntryRuleReview} stateLabel="Entry Rules" />
        <SummaryCard section={loop.simulatedExitRuleReview} stateLabel="Exit Rules" />
        <SummaryCard section={loop.simulatedRiskRuleReview} stateLabel="Risk Rules" />
        <SummaryCard section={loop.simulatedInvalidationReview} stateLabel="Invalidation" />
        <SummaryCard section={loop.simulatedEvidenceFeedback} stateLabel="Evidence" />
        <SummaryCard section={loop.simulatedHypothesisUpdate} stateLabel="Hypothesis" />
        <SummaryCard section={loop.simulatedWatchlistFeedback} stateLabel="Watchlist" />
        <SummaryCard section={loop.simulatedOperatorReviewDecision} stateLabel="Operator" />
        <SummaryCard section={loop.simulatedStrategyChangeRequest} stateLabel="Change Request" />
        <SummaryCard section={loop.simulatedNoAutoTuneBoundary} stateLabel="No Auto Tune" />
      </section>

      <section style={noticeBand} aria-label="Strategy performance review loop safety limits">
        {loop.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildStrategyPerformanceReviewLoopStableKey(["strategy-review-cockpit-limit", String(index), limit])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>

      <a style={safeLink} href="/cockpit-strategy-performance-review-summary">
        Review Strategy Performance Review Summary
      </a>
    </section>
  );
}

export function StrategyPerformanceReviewLoopRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: StrategyPerformanceReviewLoopRouteSlug;
  embedded?: boolean;
}) {
  const model = buildStrategyPerformanceReviewLoopRouteModel(routeSlug);
  const loop = model.strategyPerformanceReviewLoop;
  const titleText = embedded ? "Strategy Performance Review Loop" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-strategy-performance-review-loop-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Strategy Review Loop" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Synthetic only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Strategy Performance Review Loop v1 is review-only from the frontend. This is not financial advice,
          personalised recommendation, buy sell instruction, automated strategy optimisation, live trading, real
          P&amp;L analysis, model-driven trade selection, strategy auto-promotion, order placement, broker execution,
          live market data, or money movement.
        </p>
        <p style={bodyText}>
          Synthetic data only. Review-only strategy feedback. Backend-owned review workflow remains required.
          Backend-owned evidence capture remains required. Operator review remains required. Risk governor approval
          remains required. Kill switch enforcement remains required. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Strategy performance review loop page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildStrategyPerformanceReviewLoopStableKey([
              "strategy-review-route-marker",
              model.route.slug,
              String(index),
              marker,
            ])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Strategy performance review loop model fields">
        <div>
          <p style={panelEyebrow}>Strategy performance review loop model</p>
          <h2 style={sectionTitle}>
            strategyPerformanceReviewLoopId: {loop.strategyPerformanceReviewLoopId}
          </h2>
        </div>
        <p style={bodyText}>strategyPerformanceReviewLoopKind: {loop.strategyPerformanceReviewLoopKind}</p>
        <div style={chipRow}>
          {[
            "strategyPerformanceReviewLoopId",
            "strategyPerformanceReviewLoopKind",
            "simulatedStrategyScorecard",
            "simulatedRuleOutcomeReview",
            "simulatedEntryRuleReview",
            "simulatedExitRuleReview",
            "simulatedRiskRuleReview",
            "simulatedInvalidationReview",
            "simulatedEvidenceFeedback",
            "simulatedHypothesisUpdate",
            "simulatedWatchlistFeedback",
            "simulatedOperatorReviewDecision",
            "simulatedStrategyChangeRequest",
            "simulatedNoAutoTuneBoundary",
            "deniedStrategyPerformanceReviewBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span
              key={buildStrategyPerformanceReviewLoopStableKey(["strategy-review-field", String(index), field])}
              style={chip}
            >
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={sectionGrid} aria-label="Strategy performance review loop route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildStrategyPerformanceReviewLoopStableKey([
              "strategy-review-section",
              model.route.slug,
              String(index),
              section.sectionId,
            ])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Strategy performance review loop summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {loop.cockpitSummary.map((item, index) => (
              <CheckRow
                key={buildStrategyPerformanceReviewLoopStableKey(["strategy-review-route-summary", String(index), item.id])}
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
            {loop.explicitSafetyLimits.map((limit, index) => (
              <span
                key={buildStrategyPerformanceReviewLoopStableKey(["strategy-review-route-limit", String(index), limit])}
                style={dangerChip}
              >
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={continuityBand} aria-label="Strategy performance review loop continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Strategy Performance Review Loop Simulated Strategy Scorecard Simulated Rule Outcome Review Simulated
              Entry Rule Review Simulated Exit Rule Review Simulated Risk Rule Review Simulated Invalidation Review
              Simulated Evidence Feedback Simulated Hypothesis Update Simulated Watchlist Feedback Simulated Operator
              Review Decision Simulated Strategy Change Request Simulated No Auto Tune Boundary
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned review workflow required</span>
        </div>
        <p style={bodyText}>
          Controlled strategy performance review loop release candidate prepares CodexForge for backend-owned strategy
          performance review workflows without frontend execution, auto tuning, strategy promotion, or evidence
          persistence. Strategy feedback remains review-only. Synthetic data only. Frontend strategy auto tuning still
          blocked. Frontend strategy auto promotion still blocked. Frontend broker execution still blocked. Frontend
          order placement and dispatch still blocked. Frontend live market data calls still blocked. Frontend real
          P&amp;L calculation still blocked. Frontend financial advice still blocked. Frontend personalised
          recommendations still blocked. Frontend buy sell instructions still blocked. Frontend evidence persistence
          still blocked. Frontend export/file writes still blocked. Backend-owned review workflow remains required.
          Backend-owned evidence capture remains required. Operator review remains required. Risk governor approval
          remains required. Kill switch enforcement remains required. Explicit operator approval remains required.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Normal users continue to work from /codexforge-cockpit. Strategy performance review loop phase pages remain
          dev test diagnostics only.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildStrategyPerformanceReviewLoopStableKey(["strategy-review-diagnostic-route", String(index), route.slug])}
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

function SummaryCard({ section, stateLabel }: { section: StrategyPerformanceReviewLoopSection; stateLabel: string }) {
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
        {section.plannedOutputs.slice(0, 4).map((output, index) => (
          <span
            key={buildStrategyPerformanceReviewLoopStableKey([
              "strategy-review-summary-output",
              section.sectionId,
              String(index),
              output,
            ])}
            style={chip}
          >
            {output}
          </span>
        ))}
      </div>
    </article>
  );
}

function SectionCard({ section }: { section: StrategyPerformanceReviewLoopSection }) {
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
      <FieldList label="plannedInputs" values={section.plannedInputs} />
      <FieldList label="plannedOutputs" values={section.plannedOutputs} />
      <FieldList label="reviewOnlyNotes" values={section.reviewOnlyNotes} />
      <FieldList label="safetyNotes" values={section.safetyNotes} />
      <div style={chipRow}>
        {section.deniedActions.map((action, index) => (
          <span
            key={buildStrategyPerformanceReviewLoopStableKey([
              "strategy-review-denied-action",
              section.sectionId,
              String(index),
              action,
            ])}
            style={dangerChip}
          >
            {action}
          </span>
        ))}
      </div>
      <div style={checklistGrid}>
        {section.checklist.map((item, index) => (
          <CheckRow
            key={buildStrategyPerformanceReviewLoopStableKey([
              "strategy-review-section-check",
              section.sectionId,
              String(index),
              item.id,
            ])}
            item={item}
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
          key={buildStrategyPerformanceReviewLoopStableKey(["strategy-review-field-list", label, String(index), value])}
          style={fieldValue}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

function CheckRow({ item }: { item: StrategyPerformanceReviewLoopItem }) {
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

function formatState(state: StrategyPerformanceReviewLoopState): string {
  if (state === "synthetic-only") return "Synthetic only";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Approval required";
  if (state === "blocked") return "Blocked";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Review only";
}

function stateStyle(state: StrategyPerformanceReviewLoopState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "needs-approval"
        ? approvalStateBadge
        : state === "backend-owned"
          ? backendOwnedBadge
          : state === "candidate" || state === "release-candidate"
            ? candidateBadge
            : syntheticBadge),
  };
}

function smallStateStyle(state: StrategyPerformanceReviewLoopState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "needs-approval"
        ? approvalStateBadge
        : state === "backend-owned"
          ? backendOwnedBadge
          : state === "candidate" || state === "release-candidate"
            ? candidateBadge
            : syntheticBadge),
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
  borderTop: "1px solid #d8dee4",
  paddingTop: 18,
  color: "#172026",
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
  maxWidth: 1080,
  fontSize: 17,
  lineHeight: 1.5,
  color: "#344854",
};

const bodyText: CSSProperties = {
  margin: "8px 0 0",
  color: "#425563",
  fontSize: 14,
  lineHeight: 1.55,
};

const summaryGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
  border: "1px solid #cfd8df",
  borderRadius: 8,
  padding: 14,
  background: "#f7fafc",
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
  fontSize: 20,
  lineHeight: 1.25,
  letterSpacing: 0,
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

const noticeBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  border: "1px solid #d8c7c2",
  borderRadius: 8,
  padding: 14,
  background: "#fff8f6",
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

const syntheticBadge: CSSProperties = {
  borderColor: "#91b9a8",
  background: "#f0faf5",
  color: "#235342",
};

const backendOwnedBadge: CSSProperties = {
  borderColor: "#81b3c9",
  background: "#eff8fc",
  color: "#1f5269",
};

const candidateBadge: CSSProperties = {
  borderColor: "#8aa4b8",
  background: "#f2f7fa",
  color: "#233746",
};

const continuityBand: CSSProperties = {
  border: "1px solid #cddbd7",
  borderRadius: 8,
  padding: 16,
  background: "#f8fbfa",
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

const safeLink: CSSProperties = {
  display: "inline-flex",
  width: "fit-content",
  border: "1px solid #b7c9d7",
  borderRadius: 6,
  padding: "8px 10px",
  color: "#164666",
  background: "#ffffff",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 700,
  marginTop: 12,
};
