"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  CONTROLLED_PAPER_TRADING_WORKSPACE_MODEL_FIELDS,
  buildControlledPaperTradingWorkspaceRouteModel,
  buildControlledPaperTradingWorkspaceStableKey,
  type ControlledPaperTradingWorkspaceItem,
  type ControlledPaperTradingWorkspaceRouteSlug,
  type ControlledPaperTradingWorkspaceSection,
  type ControlledPaperTradingWorkspaceState,
} from "../controlled-paper-trading-workspace-model";

export function ControlledPaperTradingWorkspacePageClientShell({
  routeSlug,
}: {
  routeSlug: ControlledPaperTradingWorkspaceRouteSlug;
}) {
  const model = buildControlledPaperTradingWorkspaceRouteModel(routeSlug);

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
      <ControlledPaperTradingWorkspaceRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ControlledPaperTradingWorkspaceCockpitSummaryPanel() {
  const model = buildControlledPaperTradingWorkspaceRouteModel("cockpit-controlled-paper-trading-workspace-summary");
  const workspace = model.controlledPaperTradingWorkspace;
  const cockpitCards: readonly { section: ControlledPaperTradingWorkspaceSection; stateLabel: string }[] = [
    { section: workspace.paperTradingWorkspaceReleaseMap, stateLabel: "Release map" },
    { section: workspace.paperTradingSafeStateOverview, stateLabel: "Safe state" },
    { section: workspace.paperTradingReviewLaneSummary, stateLabel: "Review lane" },
    { section: workspace.paperTradingEvidenceLaneSummary, stateLabel: "Evidence lane" },
    { section: workspace.paperTradingStrategyLaneSummary, stateLabel: "Strategy lane" },
    { section: workspace.paperTradingRiskLaneSummary, stateLabel: "Risk lane" },
    { section: workspace.paperTradingPromotionLaneSummary, stateLabel: "Promotion lane" },
    { section: workspace.paperTradingBackendPrerequisiteLane, stateLabel: "Backend prerequisites" },
    { section: workspace.paperTradingBlockedExecutionLane, stateLabel: "Blocked execution" },
    { section: workspace.paperTradingOperatorReleaseChecklist, stateLabel: "Operator checklist" },
    { section: workspace.paperTradingReleaseReadinessPacket, stateLabel: "Readiness packet" },
    { section: workspace.noLiveTransitionBoundary, stateLabel: "No live transition" },
  ];

  return (
    <section
      style={cockpitPanel}
      aria-label="Controlled Paper Trading Workspace"
      data-codexforge-controlled-paper-trading-workspace={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Controlled Paper Trading Workspace</span>
          <span style={surfaceBadge}>Trading Workspace</span>
          <span style={approvalBadge}>Release candidate review</span>
        </div>
        <h2 style={title}>Controlled Paper Trading Workspace Release Candidate</h2>
        <p style={summary}>
          Review-only controlled paper trading workspace. Synthetic data only. The cockpit now shows current paper
          trading workspace status, review-only state, synthetic-only state, backend prerequisites, no-live-transition
          boundary, blocked execution lane, operator release checklist, release readiness packet, and diagnostic phase
          links as secondary content. No financial advice from the cockpit, no personalised recommendations from the
          cockpit, no buy sell instructions from the cockpit, no strategy auto promotion from the cockpit, no strategy
          auto tuning from the cockpit, no automatic rule mutation from the cockpit, no frontend file mutation, no
          frontend approval persistence, no frontend version persistence, no frontend evidence persistence, no frontend
          queue persistence, no frontend worker dispatch, no real P&amp;L analysis from the cockpit, no live market data
          calls from the cockpit, no order placement from the cockpit, no order dispatch from the cockpit, no broker
          execution from the cockpit, no paper execution from the cockpit, no live execution from the cockpit, no live
          transition from the cockpit, no money movement from the cockpit, no trading automation from the cockpit, no
          hidden execution affordances, and no performance guarantees.
        </p>
      </header>

      <section style={statusBand} aria-label="Controlled paper trading workspace status">
        <span style={stateStyle("review-only")}>Review-only controlled paper trading workspace</span>
        <span style={stateStyle("synthetic-only")}>Synthetic data only</span>
        <span style={stateStyle("backend-owned")}>Backend-owned paper workflow required</span>
        <span style={stateStyle("blocked")}>Trading actions blocked</span>
        <span style={stateStyle("needs-approval")}>Explicit operator approval required</span>
      </section>

      <section style={summaryGrid} aria-label="Controlled paper trading cockpit summary">
        {workspace.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildControlledPaperTradingWorkspaceStableKey([
              "controlled-paper-trading-workspace-summary",
              String(index),
              item.id,
            ])}
            item={item}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Paper trading release state and blocked execution">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Paper Trading Safe State Overview</p>
              <h3 style={sectionTitle}>Release candidate remains review-only</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <p style={bodyText}>
            Simulated status only: review-only, synthetic-only, no paper execution, no live execution, no live
            transition, backend-owned paper workflow required, and no performance guarantee.
          </p>
        </article>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Paper Trading Blocked Execution Lane</p>
              <h3 style={sectionTitle}>Trading actions stay visibly blocked</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <p style={bodyText}>
            No execution buttons, broker setup buttons, live data buttons, approval persistence buttons, credential
            storage buttons, order controls, paper execution controls, or live transition affordances are present.
          </p>
        </article>
      </section>

      <section style={sectionGrid} aria-label="Controlled paper trading workspace cards">
        {cockpitCards.map((card, index) => (
          <SummaryCard
            key={buildControlledPaperTradingWorkspaceStableKey([
              "controlled-paper-trading-workspace-card",
              String(index),
              card.section.sectionId,
            ])}
            section={card.section}
            stateLabel={card.stateLabel}
          />
        ))}
      </section>

      <section style={noticeBand} aria-label="Controlled paper trading workspace safety limits">
        {workspace.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildControlledPaperTradingWorkspaceStableKey([
              "controlled-paper-trading-workspace-limit",
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
          do not expose execution, broker setup, live data, approval persistence, credential storage, or live transition
          controls.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildControlledPaperTradingWorkspaceStableKey([
                "controlled-paper-trading-workspace-diagnostic-link",
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

      <a style={safeLink} href="/controlled-paper-trading-workspace-release-candidate">
        Review Controlled Paper Trading Workspace Release Candidate
      </a>
    </section>
  );
}

export function ControlledPaperTradingWorkspaceRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ControlledPaperTradingWorkspaceRouteSlug;
  embedded?: boolean;
}) {
  const model = buildControlledPaperTradingWorkspaceRouteModel(routeSlug);
  const workspace = model.controlledPaperTradingWorkspace;
  const titleText = embedded ? "Controlled Paper Trading Workspace" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-controlled-paper-trading-workspace-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Controlled Paper Trading Workspace" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Synthetic only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Controlled Paper Trading Workspace v1 is review-only from the frontend. This is not financial advice,
          personalised recommendation, buy sell instruction, automated strategy optimisation, strategy auto-promotion,
          automatic rule mutation, live trading, paper order placement, paper execution, live execution, broker
          execution, real P&amp;L analysis, live market data, money movement, file mutation from the frontend, approval
          persistence from the frontend, evidence persistence from the frontend, strategy version persistence from the
          frontend, queue persistence from the frontend, worker dispatch from the frontend, or live transition from the
          frontend.
        </p>
        <p style={bodyText}>
          Backend-owned paper workflow remains required. Backend-owned promotion workflow remains required. Backend-owned
          version registry remains required. Backend-owned change workflow remains required. Backend-owned evidence
          capture remains required. Backend-owned approval capture remains required. Backend-owned execution service
          remains required. Backend-owned broker adapter remains required. Backend-owned credential vault remains
          required. Backend-owned audit trail remains required. Operator review remains required. Risk governor approval
          remains required. Kill switch enforcement remains required. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Controlled paper trading workspace page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildControlledPaperTradingWorkspaceStableKey([
              "controlled-paper-trading-workspace-route-marker",
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

      <section style={identityBand} aria-label="Controlled paper trading workspace model fields">
        <div>
          <p style={panelEyebrow}>Controlled paper trading workspace model</p>
          <h2 style={sectionTitle}>
            controlledPaperTradingWorkspaceId: {workspace.controlledPaperTradingWorkspaceId}
          </h2>
        </div>
        <p style={bodyText}>
          controlledPaperTradingWorkspaceKind: {workspace.controlledPaperTradingWorkspaceKind}
        </p>
        <div style={chipRow}>
          {CONTROLLED_PAPER_TRADING_WORKSPACE_MODEL_FIELDS.map((field, index) => (
            <span
              key={buildControlledPaperTradingWorkspaceStableKey([
                "controlled-paper-trading-workspace-field",
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

      <section style={sectionGrid} aria-label="Controlled paper trading workspace route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildControlledPaperTradingWorkspaceStableKey([
              "controlled-paper-trading-workspace-section",
              model.route.slug,
              String(index),
              section.sectionId,
            ])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Controlled paper trading workspace summary and safety limits">
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
                key={buildControlledPaperTradingWorkspaceStableKey([
                  "controlled-paper-trading-workspace-route-summary",
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
            {workspace.explicitSafetyLimits.map((limit, index) => (
              <span
                key={buildControlledPaperTradingWorkspaceStableKey([
                  "controlled-paper-trading-workspace-route-limit",
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

      <section style={continuityBand} aria-label="Controlled paper trading workspace continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Controlled release candidate</p>
            <h2 style={sectionTitle}>No live transition from the cockpit</h2>
          </div>
          <span style={stateStyle("blocked")}>No live transition</span>
        </div>
        <p style={bodyText}>
          {model.summary} Release candidate completes the review-only frontend paper trading workspace and prepares
          CodexForge to switch to the Video Creation Domain Pack without enabling frontend mutation, version persistence,
          approval persistence, evidence persistence, auto tuning, auto promotion, paper execution, live execution,
          hidden execution affordances, broker execution, or live transition.
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
  section: ControlledPaperTradingWorkspaceSection;
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

function SectionCard({ section }: { section: ControlledPaperTradingWorkspaceSection }) {
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
            key={buildControlledPaperTradingWorkspaceStableKey([
              "controlled-paper-trading-workspace-check",
              section.sectionId,
              String(index),
              item.id,
            ])}
            item={item}
          />
        ))}
      </div>
      <div style={chipRow}>
        {section.safetyNotes.map((note, index) => (
          <span
            key={buildControlledPaperTradingWorkspaceStableKey([
              "controlled-paper-trading-workspace-safety-note",
              section.sectionId,
              String(index),
              note,
            ])}
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
            key={buildControlledPaperTradingWorkspaceStableKey([
              "controlled-paper-trading-workspace-list",
              title,
              String(index),
              value,
            ])}
            style={chip}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function CheckRow({ item }: { item: ControlledPaperTradingWorkspaceItem }) {
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

function formatState(state: ControlledPaperTradingWorkspaceState): string {
  if (state === "review-only") return "Review only";
  if (state === "synthetic-only") return "Synthetic";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Blocked";
}

function stateStyle(state: ControlledPaperTradingWorkspaceState): CSSProperties {
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
  border: "1px solid #b8c7bd",
  borderRadius: 8,
  background: "#f6f8f5",
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
  color: "#102019",
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 1100,
  color: "#33463c",
  fontSize: 15,
  lineHeight: 1.65,
};

const bodyText: CSSProperties = {
  margin: 0,
  color: "#43554d",
  fontSize: 14,
  lineHeight: 1.6,
};

const phaseBadge: CSSProperties = {
  padding: "6px 10px",
  borderRadius: 999,
  background: "#123027",
  color: "#f6fff9",
  fontSize: 12,
  fontWeight: 700,
};

const surfaceBadge: CSSProperties = {
  ...phaseBadge,
  background: "#dce9e2",
  color: "#153127",
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
  background: "#edf3ef",
  border: "1px solid #c8d8ce",
  color: "#25382f",
  fontSize: 12,
  lineHeight: 1.35,
};

const identityBand: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 16,
  border: "1px solid #c8d8ce",
  borderRadius: 8,
  background: "#ffffff",
};

const statusBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  padding: 12,
  border: "1px solid #c8d8ce",
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
  border: "1px solid #c8d8ce",
  borderRadius: 8,
  background: "#ffffff",
};

const summaryCard: CSSProperties = {
  ...panel,
  minHeight: 180,
};

const panelHeader: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
};

const panelEyebrow: CSSProperties = {
  margin: "0 0 4px",
  color: "#5b6b63",
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
};

const sectionTitle: CSSProperties = {
  margin: 0,
  color: "#17261f",
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 10,
};

const checkRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 10,
  alignItems: "flex-start",
  padding: 12,
  border: "1px solid #d8e2db",
  borderRadius: 8,
  background: "#fbfdfb",
};

const checkLabel: CSSProperties = {
  margin: 0,
  color: "#182820",
  fontSize: 14,
  fontWeight: 700,
};

const checkDetail: CSSProperties = {
  margin: "3px 0 0",
  color: "#4c5d55",
  fontSize: 13,
  lineHeight: 1.5,
};

const listBlock: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const chip: CSSProperties = {
  padding: "6px 8px",
  border: "1px solid #d8e2db",
  borderRadius: 6,
  background: "#f7faf8",
  color: "#314138",
  fontSize: 12,
  lineHeight: 1.35,
};

const dangerChip: CSSProperties = {
  ...chip,
  borderColor: "#efc8c8",
  background: "#fff7f7",
  color: "#6c1e1e",
};

const noticeBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  padding: 12,
  border: "1px solid #e6d6bd",
  borderRadius: 8,
  background: "#fffaf0",
};

const diagnosticsDrawer: CSSProperties = {
  padding: 14,
  border: "1px solid #d8e2db",
  borderRadius: 8,
  background: "#ffffff",
};

const diagnosticsSummary: CSSProperties = {
  cursor: "pointer",
  color: "#17261f",
  fontWeight: 800,
};

const routeGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const routeLink: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 12,
  border: "1px solid #d8e2db",
  borderRadius: 8,
  background: "#fbfdfb",
  color: "#17261f",
  textDecoration: "none",
};

const routePhase: CSSProperties = {
  color: "#6b796f",
  fontSize: 12,
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  color: "#17261f",
  fontSize: 14,
  fontWeight: 800,
};

const routeCommand: CSSProperties = {
  color: "#526259",
  fontSize: 12,
};

const safeLink: CSSProperties = {
  display: "inline-flex",
  alignSelf: "flex-start",
  padding: "9px 12px",
  borderRadius: 6,
  background: "#123027",
  color: "#f6fff9",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 800,
};

const continuityBand: CSSProperties = {
  ...panel,
  background: "#f7faf8",
};

const stateBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  padding: "5px 8px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 800,
};

const blockedBadge: CSSProperties = {
  background: "#fee2e2",
  color: "#7f1d1d",
};

const approvalStateBadge: CSSProperties = {
  background: "#fef3c7",
  color: "#78350f",
};

const backendBadge: CSSProperties = {
  background: "#dbeafe",
  color: "#1e3a8a",
};

const candidateBadge: CSSProperties = {
  background: "#dcfce7",
  color: "#14532d",
};

const reviewBadge: CSSProperties = {
  background: "#e7f1eb",
  color: "#1f3f32",
};
