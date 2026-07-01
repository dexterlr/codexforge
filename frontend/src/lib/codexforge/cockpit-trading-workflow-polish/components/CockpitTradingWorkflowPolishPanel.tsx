"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildCockpitTradingWorkflowPolishRouteModel,
  buildCockpitTradingWorkflowPolishStableKey,
  type CockpitTradingWorkflowPolishItem,
  type CockpitTradingWorkflowPolishRouteSlug,
  type CockpitTradingWorkflowPolishSection,
  type CockpitTradingWorkflowPolishState,
} from "../cockpit-trading-workflow-polish-model";

export function CockpitTradingWorkflowPolishPageClientShell({
  routeSlug,
}: {
  routeSlug: CockpitTradingWorkflowPolishRouteSlug;
}) {
  const model = buildCockpitTradingWorkflowPolishRouteModel(routeSlug);

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
      <CockpitTradingWorkflowPolishRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function CockpitTradingWorkflowPolishCockpitSummaryPanel() {
  const model = buildCockpitTradingWorkflowPolishRouteModel("cockpit-trading-workflow-polish-summary");
  const polish = model.cockpitTradingWorkflowPolish;
  const cockpitCards: readonly { section: CockpitTradingWorkflowPolishSection; stateLabel: string }[] = [
    { section: polish.cockpitTradingWorkspaceMap, stateLabel: "Workspace map" },
    { section: polish.guidedTradingReviewRail, stateLabel: "Review rail" },
    { section: polish.safeNextStepCard, stateLabel: "Next step" },
    { section: polish.tradingReviewStatusStrip, stateLabel: "Status" },
    { section: polish.tradingEvidenceGapSummary, stateLabel: "Evidence gaps" },
    { section: polish.strategyReviewContinuity, stateLabel: "Continuity" },
    { section: polish.paperWorkflowReadinessSummary, stateLabel: "Paper readiness" },
    { section: polish.tradingBlockedActionExplainer, stateLabel: "Blocked actions" },
    { section: polish.operatorDecisionReminder, stateLabel: "Operator" },
    { section: polish.backendPrerequisiteSummary, stateLabel: "Backend" },
    { section: polish.cockpitDiagnosticRouteCleanup, stateLabel: "Diagnostics" },
    { section: polish.noHiddenExecutionAffordanceBoundary, stateLabel: "No hidden execution" },
  ];

  return (
    <section
      style={cockpitPanel}
      aria-label="Cockpit Trading Workflow Polish"
      data-codexforge-cockpit-trading-workflow-polish={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Cockpit Trading Workflow Polish</span>
          <span style={surfaceBadge}>Trading Workspace</span>
          <span style={approvalBadge}>Review-only synthetic cockpit</span>
        </div>
        <h2 style={title}>Cockpit Trading Workflow Polish</h2>
        <p style={summary}>
          Review-only cockpit trading workflow polish keeps the normal cockpit coherent for trading review: workspace
          map, guided trading review rail, safe next step card, trading review status strip, evidence gap summary,
          strategy review continuity, paper workflow readiness, blocked action explainer, operator decision reminder,
          backend prerequisite summary, diagnostic route cleanup, no hidden execution affordance boundary, and denied
          paths. Synthetic data only. No financial advice from the cockpit, no personalised recommendations from the
          cockpit, no buy sell instructions from the cockpit, no strategy auto promotion from the cockpit, no strategy
          auto tuning from the cockpit, no automatic rule mutation from the cockpit, no frontend file mutation, no
          frontend approval persistence, no frontend version persistence, no frontend evidence persistence, no real
          P&amp;L analysis from the cockpit, no live market data calls from the cockpit, no order placement from the
          cockpit, no order dispatch from the cockpit, no broker execution from the cockpit, no paper execution from the
          cockpit, no live execution from the cockpit, no money movement from the cockpit, no trading automation from the
          cockpit, no hidden execution affordances, and no performance guarantees.
        </p>
      </header>

      <section style={summaryGrid} aria-label="Cockpit trading workflow polish summary">
        {polish.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildCockpitTradingWorkflowPolishStableKey([
              "cockpit-trading-workflow-polish-summary",
              String(index),
              item.id,
            ])}
            item={item}
          />
        ))}
      </section>

      <section style={statusStrip} aria-label="Safe cockpit trading workflow status">
        <span style={stateStyle("review-only")}>Review-only cockpit trading workflow polish</span>
        <span style={stateStyle("synthetic-only")}>Synthetic data only</span>
        <span style={stateStyle("backend-owned")}>Backend-owned paper workflow required</span>
        <span style={stateStyle("blocked")}>Trading actions blocked</span>
        <span style={stateStyle("needs-approval")}>Explicit operator approval required</span>
      </section>

      <section style={splitBand} aria-label="Safe next step and backend prerequisites">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Safe Next Step Card</p>
              <h3 style={sectionTitle}>Continue review without recommendation</h3>
            </div>
            <span style={stateStyle("needs-approval")}>Operator review</span>
          </div>
          <p style={bodyText}>
            Simulated safe next step: inspect evidence gaps, read backend prerequisites, and keep the strategy in review.
            This is not a recommendation to buy, sell, promote, tune, mutate, or execute anything.
          </p>
        </article>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Backend Prerequisite Summary</p>
              <h3 style={sectionTitle}>Backend-owned systems still required</h3>
            </div>
            <span style={stateStyle("backend-owned")}>Backend-owned</span>
          </div>
          <p style={bodyText}>
            Paper workflow, promotion workflow, version registry, change workflow, evidence capture, approval capture,
            execution service, risk governor approval, kill switch enforcement, and explicit operator approval remain
            required outside the frontend.
          </p>
        </article>
      </section>

      <section style={sectionGrid} aria-label="Cockpit trading workflow polish cards">
        {cockpitCards.map((card, index) => (
          <SummaryCard
            key={buildCockpitTradingWorkflowPolishStableKey([
              "cockpit-trading-workflow-polish-card",
              String(index),
              card.section.sectionId,
            ])}
            section={card.section}
            stateLabel={card.stateLabel}
          />
        ))}
      </section>

      <section style={noticeBand} aria-label="Cockpit trading workflow polish safety limits">
        {polish.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildCockpitTradingWorkflowPolishStableKey([
              "cockpit-trading-workflow-polish-limit",
              String(index),
              limit,
            ])}
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
          do not expose execution, broker setup, live data, approval persistence, or hidden trading controls.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildCockpitTradingWorkflowPolishStableKey([
                "cockpit-trading-workflow-polish-diagnostic-link",
                String(index),
                route.slug,
              ])}
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

      <a style={safeLink} href="/cockpit-trading-workflow-polish-summary">
        Review Cockpit Trading Workflow Polish Summary
      </a>
    </section>
  );
}

export function CockpitTradingWorkflowPolishRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: CockpitTradingWorkflowPolishRouteSlug;
  embedded?: boolean;
}) {
  const model = buildCockpitTradingWorkflowPolishRouteModel(routeSlug);
  const polish = model.cockpitTradingWorkflowPolish;
  const titleText = embedded ? "Cockpit Trading Workflow Polish" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-cockpit-trading-workflow-polish-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Cockpit Trading Workflow Polish" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Synthetic only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Cockpit Trading Workflow Polish v1 is review-only from the frontend. This is not financial advice,
          personalised recommendation, buy sell instruction, automated strategy optimisation, strategy auto-promotion,
          automatic rule mutation, live trading, paper order placement, paper execution, live execution, broker
          execution, real P&amp;L analysis, live market data, money movement, file mutation from the frontend, approval
          persistence from the frontend, evidence persistence from the frontend, or strategy version persistence from the
          frontend.
        </p>
        <p style={bodyText}>
          Backend-owned paper workflow remains required. Backend-owned promotion workflow remains required. Backend-owned
          version registry remains required. Backend-owned change workflow remains required. Backend-owned evidence
          capture remains required. Backend-owned approval capture remains required. Backend-owned execution service
          remains required. Operator review remains required. Risk governor approval remains required. Kill switch
          enforcement remains required. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Cockpit trading workflow polish page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildCockpitTradingWorkflowPolishStableKey([
              "cockpit-trading-workflow-polish-route-marker",
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

      <section style={identityBand} aria-label="Cockpit trading workflow polish model fields">
        <div>
          <p style={panelEyebrow}>Cockpit trading workflow polish model</p>
          <h2 style={sectionTitle}>
            cockpitTradingWorkflowPolishId: {polish.cockpitTradingWorkflowPolishId}
          </h2>
        </div>
        <p style={bodyText}>cockpitTradingWorkflowPolishKind: {polish.cockpitTradingWorkflowPolishKind}</p>
        <div style={chipRow}>
          {[
            "cockpitTradingWorkflowPolishId",
            "cockpitTradingWorkflowPolishKind",
            "cockpitTradingWorkspaceMap",
            "guidedTradingReviewRail",
            "safeNextStepCard",
            "tradingReviewStatusStrip",
            "tradingEvidenceGapSummary",
            "strategyReviewContinuity",
            "paperWorkflowReadinessSummary",
            "tradingBlockedActionExplainer",
            "operatorDecisionReminder",
            "backendPrerequisiteSummary",
            "cockpitDiagnosticRouteCleanup",
            "noHiddenExecutionAffordanceBoundary",
            "deniedCockpitTradingWorkflowPolishBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span
              key={buildCockpitTradingWorkflowPolishStableKey([
                "cockpit-trading-workflow-polish-field",
                String(index),
                field,
              ])}
              style={chip}
            >
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={sectionGrid} aria-label="Cockpit trading workflow polish route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildCockpitTradingWorkflowPolishStableKey([
              "cockpit-trading-workflow-polish-section",
              model.route.slug,
              String(index),
              section.sectionId,
            ])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Cockpit trading workflow polish summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {polish.cockpitSummary.map((item, index) => (
              <CheckRow
                key={buildCockpitTradingWorkflowPolishStableKey([
                  "cockpit-trading-workflow-polish-route-summary",
                  String(index),
                  item.id,
                ])}
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
            {polish.explicitSafetyLimits.map((limit, index) => (
              <span
                key={buildCockpitTradingWorkflowPolishStableKey([
                  "cockpit-trading-workflow-polish-route-limit",
                  String(index),
                  limit,
                ])}
                style={dangerChip}
              >
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={continuityBand} aria-label="Cockpit trading workflow polish continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Cockpit Trading Workspace Map Guided Trading Review Rail Safe Next Step Card Trading Review Status Strip
              Trading Evidence Gap Summary Strategy Review Continuity Paper Workflow Readiness Summary Trading Blocked
              Action Explainer Operator Decision Reminder Backend Prerequisite Summary Cockpit Diagnostic Route Cleanup
              No Hidden Execution Affordance Boundary
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned paper workflow required</span>
        </div>
        <p style={bodyText}>
          Controlled cockpit trading workflow polish release candidate prepares CodexForge for a coherent review-only
          cockpit trading workspace without frontend mutation, version persistence, approval persistence, evidence
          persistence, auto tuning, auto promotion, paper execution, live execution, hidden execution affordances, broker
          execution, order placement, order dispatch, live market data calls, real P&amp;L calculation, financial advice,
          personalised recommendations, buy sell instructions, or execution. Cockpit trading workflow polish remains
          review-only. Synthetic data only.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Normal users continue to work from /codexforge-cockpit. Cockpit trading workflow polish phase pages remain dev
          test diagnostics only.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildCockpitTradingWorkflowPolishStableKey([
                "cockpit-trading-workflow-polish-diagnostic-route",
                String(index),
                route.slug,
              ])}
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

function SummaryCard({
  section,
  stateLabel,
}: {
  section: CockpitTradingWorkflowPolishSection;
  stateLabel: string;
}) {
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
            key={buildCockpitTradingWorkflowPolishStableKey([
              "cockpit-trading-workflow-polish-summary-output",
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

function SectionCard({ section }: { section: CockpitTradingWorkflowPolishSection }) {
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
            key={buildCockpitTradingWorkflowPolishStableKey([
              "cockpit-trading-workflow-polish-denied-action",
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
            key={buildCockpitTradingWorkflowPolishStableKey([
              "cockpit-trading-workflow-polish-section-check",
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
          key={buildCockpitTradingWorkflowPolishStableKey([
            "cockpit-trading-workflow-polish-field-list",
            label,
            String(index),
            value,
          ])}
          style={fieldValue}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

function CheckRow({ item }: { item: CockpitTradingWorkflowPolishItem }) {
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

function formatState(state: CockpitTradingWorkflowPolishState): string {
  if (state === "synthetic-only") return "Synthetic only";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Approval required";
  if (state === "blocked") return "Blocked";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Review only";
}

function stateStyle(state: CockpitTradingWorkflowPolishState): CSSProperties {
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

function smallStateStyle(state: CockpitTradingWorkflowPolishState): CSSProperties {
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

const page: CSSProperties = { display: "flex", flexDirection: "column", gap: 18, padding: "28px", color: "#172026" };
const embeddedPage: CSSProperties = { display: "flex", flexDirection: "column", gap: 16, color: "#172026" };
const cockpitPanel: CSSProperties = { display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid #d8dee4", paddingTop: 18, color: "#172026" };
const hero: CSSProperties = { display: "flex", flexDirection: "column", gap: 12, padding: "4px 0 10px" };
const eyebrowRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const phaseBadge: CSSProperties = { display: "inline-flex", border: "1px solid #8aa4b8", borderRadius: 6, padding: "5px 8px", fontSize: 12, fontWeight: 700, color: "#233746", background: "#f2f7fa" };
const surfaceBadge: CSSProperties = { ...phaseBadge, borderColor: "#8ab7a3", color: "#24533f", background: "#f0faf5" };
const approvalBadge: CSSProperties = { ...phaseBadge, borderColor: "#c7a553", color: "#5c4512", background: "#fff7df" };
const title: CSSProperties = { margin: 0, fontSize: 34, lineHeight: 1.08, letterSpacing: 0 };
const summary: CSSProperties = { margin: 0, maxWidth: 1080, fontSize: 17, lineHeight: 1.5, color: "#344854" };
const bodyText: CSSProperties = { margin: "8px 0 0", color: "#425563", fontSize: 14, lineHeight: 1.55 };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, border: "1px solid #cfd8df", borderRadius: 8, padding: 14, background: "#f7fafc" };
const sectionGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 };
const splitBand: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 };
const panel: CSSProperties = { border: "1px solid #d8dee4", borderRadius: 8, padding: 16, background: "#ffffff" };
const panelHeader: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" };
const panelEyebrow: CSSProperties = { margin: "0 0 4px", color: "#60717d", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0 };
const sectionTitle: CSSProperties = { margin: 0, fontSize: 20, lineHeight: 1.25, letterSpacing: 0 };
const markerBand: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const markerPill: CSSProperties = { display: "inline-flex", alignItems: "center", border: "1px solid #d8dee4", borderRadius: 6, padding: "7px 9px", background: "#ffffff", color: "#2f3b43", fontSize: 12, lineHeight: 1.3 };
const identityBand: CSSProperties = { border: "1px solid #cfd8df", borderRadius: 8, padding: 14, background: "#f7fafc" };
const statusStrip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, border: "1px solid #cfd8df", borderRadius: 8, padding: 12, background: "#fbfcfd" };
const chipRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 };
const chip: CSSProperties = { border: "1px solid #ccd6dd", borderRadius: 6, padding: "6px 8px", background: "#f7fafc", color: "#2b3b46", fontSize: 12, lineHeight: 1.3 };
const dangerChip: CSSProperties = { ...chip, borderColor: "#d29a9a", background: "#fff3f1", color: "#7d2c26" };
const noticeBand: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, border: "1px solid #d8c7c2", borderRadius: 8, padding: 14, background: "#fff8f6" };
const fieldRow: CSSProperties = { display: "grid", gap: 3, borderTop: "1px solid #edf1f4", paddingTop: 8, marginTop: 8 };
const fieldLabel: CSSProperties = { color: "#60717d", fontSize: 12, fontWeight: 800 };
const fieldValue: CSSProperties = { margin: "7px 0 0", color: "#344854", fontSize: 13, lineHeight: 1.45 };
const checklistGrid: CSSProperties = { display: "grid", gap: 8, marginTop: 12 };
const checkRow: CSSProperties = { display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "start", borderTop: "1px solid #edf1f4", paddingTop: 8 };
const checkLabel: CSSProperties = { margin: 0, color: "#25313a", fontSize: 13, fontWeight: 700 };
const checkDetail: CSSProperties = { margin: "3px 0 0", color: "#526572", fontSize: 13, lineHeight: 1.45 };
const stateBadge: CSSProperties = { border: "1px solid", borderRadius: 6, padding: "6px 8px", fontSize: 12, fontWeight: 700 };
const smallStateBadge: CSSProperties = { ...stateBadge, flex: "0 0 auto", padding: "4px 6px", fontSize: 11 };
const blockedBadge: CSSProperties = { borderColor: "#d29a9a", background: "#fff3f1", color: "#7d2c26" };
const approvalStateBadge: CSSProperties = { borderColor: "#c7a553", background: "#fff8e6", color: "#5c4512" };
const syntheticBadge: CSSProperties = { borderColor: "#91b9a8", background: "#f0faf5", color: "#235342" };
const backendOwnedBadge: CSSProperties = { borderColor: "#81b3c9", background: "#eff8fc", color: "#1f5269" };
const candidateBadge: CSSProperties = { borderColor: "#8aa4b8", background: "#f2f7fa", color: "#233746" };
const continuityBand: CSSProperties = { border: "1px solid #cddbd7", borderRadius: 8, padding: 16, background: "#f8fbfa" };
const diagnosticsDrawer: CSSProperties = { border: "1px solid #d8dee4", borderRadius: 8, padding: 14, background: "#fbfcfd" };
const diagnosticsSummary: CSSProperties = { cursor: "pointer", fontWeight: 800, color: "#263540" };
const routeGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginTop: 12 };
const routeLink: CSSProperties = { display: "grid", gap: 4, border: "1px solid #d8dee4", borderRadius: 8, padding: 12, color: "#25313a", textDecoration: "none", background: "#ffffff" };
const routePhase: CSSProperties = { color: "#60717d", fontSize: 12, fontWeight: 700 };
const routeLabel: CSSProperties = { fontSize: 14, fontWeight: 800 };
const routeCommand: CSSProperties = { color: "#526572", fontSize: 12 };
const safeLink: CSSProperties = { display: "inline-flex", width: "fit-content", border: "1px solid #b7c9d7", borderRadius: 6, padding: "8px 10px", color: "#164666", background: "#ffffff", textDecoration: "none", fontSize: 13, fontWeight: 700, marginTop: 12 };
