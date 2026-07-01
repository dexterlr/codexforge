"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { BrokerExecutionBoundaryCockpitSummaryPanel } from "../../broker-execution-boundary/components";
import { PaperBrokerAdapterSimulatorCockpitSummaryPanel } from "../../paper-broker-adapter-simulator/components";
import { PaperTradingResultLedgerCockpitSummaryPanel } from "../../paper-trading-result-ledger/components";
import { PaperTradingReviewDashboardCockpitSummaryPanel } from "../../paper-trading-review-dashboard/components";
import { StrategyPerformanceReviewLoopCockpitSummaryPanel } from "../../strategy-performance-review-loop/components";
import { StrategyChangeControlWorkflowCockpitSummaryPanel } from "../../strategy-change-control-workflow/components";
import { StrategyVersionReviewRegistryCockpitSummaryPanel } from "../../strategy-version-review-registry/components";
import { PaperStrategyPromotionGateCockpitSummaryPanel } from "../../paper-strategy-promotion-gate/components";
import { PaperTradingEndToEndReviewCockpitSummaryPanel } from "../../paper-trading-end-to-end-review/components";
import { CockpitTradingWorkflowPolishCockpitSummaryPanel } from "../../cockpit-trading-workflow-polish/components";
import { ControlledPaperTradingWorkspaceCockpitSummaryPanel } from "../../controlled-paper-trading-workspace/components";
import {
  buildCockpitNavigationCleanupRouteModel,
  buildCockpitNavigationCleanupStableKey,
  type CockpitNavigationCleanupItem,
  type CockpitNavigationCleanupRouteFamily,
  type CockpitNavigationCleanupSection,
  type CockpitNavigationCleanupState,
  type CockpitNavigationCleanupUserUxRouteSlug,
} from "../cockpit-navigation-cleanup-user-ux-model";

export function CockpitNavigationCleanupPageClientShell({
  routeSlug,
}: {
  routeSlug: CockpitNavigationCleanupUserUxRouteSlug;
}) {
  const model = buildCockpitNavigationCleanupRouteModel(routeSlug);

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
      <CockpitNavigationCleanupRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function CockpitNavigationCleanupUserUxCockpitPanel() {
  const model = buildCockpitNavigationCleanupRouteModel("controlled-consolidated-user-ux-release-candidate");
  const ux = model.cockpitNavigationCleanupUserUx;

  return (
    <section
      style={page}
      data-codexforge-cockpit-navigation-cleanup-user-ux={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Cockpit Navigation Cleanup User UX</span>
          <span style={surfaceBadge}>One user cockpit</span>
          <span style={approvalBadge}>Explicit approval required</span>
        </div>
        <h1 style={title}>CodexForge Cockpit</h1>
        <p style={summary}>
          One normal user UX for starting with a goal, reviewing the Trading Workspace, Build Workspace, Approvals,
          Evidence & Audit, Next Action, and Developer Diagnostics. Status summary: through phase 1913 after Controlled
          Paper Trading Workspace Release Candidate v1, layered below Cockpit Trading Workflow Polish v1. Phase pages
          remain dev test diagnostics only.
        </p>
      </header>

      <section style={statusBand} aria-label="Cockpit status summary">
        {ux.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildCockpitNavigationCleanupStableKey(["cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </section>

      <section style={featureGrid} aria-label="Primary cockpit sections">
        <FeatureCard section={ux.userCockpitHome} href="/codexforge-cockpit" actionLabel="Start here" />
        <FeatureCard section={ux.tradingWorkspaceHub} href="/trading-workspace-hub-preview" actionLabel="Open Trading Workspace" />
        <FeatureCard section={ux.buildWorkspaceHub} href="/build-workspace-hub-preview" actionLabel="Open Build Workspace" />
        <FeatureCard section={ux.approvalsHub} href="/approvals-hub-preview" actionLabel="Review Approvals" />
        <FeatureCard section={ux.evidenceAuditHub} href="/evidence-audit-hub-preview" actionLabel="Review Evidence & Audit" />
        <FeatureCard section={ux.nextActionRailCleanup} href="/next-action-rail-cleanup-preview" actionLabel="Continue Next Action" />
      </section>

      <section style={splitBand} aria-label="Trading and build workspace grouping">
        <WorkspacePanel
          title="Trading Workspace"
          summary="Trading workspace groups research, mandate, risk governor, strategy lab, signal engine, backtest, paper trading, profit lockbox, reinvestment rules, broker execution boundary previews, paper broker adapter simulator previews, paper trading result ledger previews, paper trading review dashboard previews, strategy performance review loop previews, strategy change control workflow previews, strategy version review registry previews, paper strategy promotion gate previews, paper trading end-to-end review previews, cockpit trading workflow polish previews, and controlled paper trading workspace release candidate previews."
          items={ux.tradingWorkspaceHub.featureLabels}
          href="/trading-workspace-hub-preview"
        />
        <WorkspacePanel
          title="Build Workspace"
          summary="Build workspace groups project builder, game server builder, domain packs, generated plans, artifacts, commands, and evidence."
          items={ux.buildWorkspaceHub.featureLabels}
          href="/build-workspace-hub-preview"
        />
      </section>

      <BrokerExecutionBoundaryCockpitSummaryPanel />
      <PaperBrokerAdapterSimulatorCockpitSummaryPanel />
      <PaperTradingResultLedgerCockpitSummaryPanel />
      <PaperTradingReviewDashboardCockpitSummaryPanel />
      <StrategyPerformanceReviewLoopCockpitSummaryPanel />
      <StrategyChangeControlWorkflowCockpitSummaryPanel />
      <StrategyVersionReviewRegistryCockpitSummaryPanel />
      <PaperStrategyPromotionGateCockpitSummaryPanel />
      <PaperTradingEndToEndReviewCockpitSummaryPanel />
      <CockpitTradingWorkflowPolishCockpitSummaryPanel />
      <ControlledPaperTradingWorkspaceCockpitSummaryPanel />

      <section style={quickActionBand} aria-label="Cockpit quick actions">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Cockpit Quick Actions</p>
            <h2 style={sectionTitle}>Navigation-only user actions</h2>
          </div>
          <span style={stateStyle("review-only")}>Review only</span>
        </div>
        <div style={quickActionGrid}>
          {ux.quickActions.map((action, index) => (
            <CheckRow
              key={buildCockpitNavigationCleanupStableKey(["quick-action", String(index), action.id])}
              item={action}
            />
          ))}
        </div>
      </section>

      <section style={splitBand} aria-label="Command palette and next action cleanup">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Command Palette Grouping</p>
              <h2 style={sectionTitle}>Feature-first commands</h2>
            </div>
            <a style={safeLink} href="/command-palette-grouping-preview">
              Review grouping
            </a>
          </div>
          <div style={checklistGrid}>
            {ux.featureCommands.map((command, index) => (
              <CheckRow
                key={buildCockpitNavigationCleanupStableKey(["feature-command", String(index), command.id])}
                item={command}
              />
            ))}
          </div>
        </article>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Next Action</p>
              <h2 style={sectionTitle}>Clean current-state rail</h2>
            </div>
            <a style={safeLink} href="/cockpit-status-summary-preview">
              Status summary
            </a>
          </div>
          <p style={bodyText}>
            Current checkpoint: through phase 1913. Latest batch: 1898-1913 - Controlled Paper Trading Workspace Release
            Candidate v1. Latest release candidate: Controlled Paper Trading Workspace Release Candidate. Controlled
            paper trading workspace remains review-only, synthetic-only, and frontend strategy auto tuning, strategy auto
            promotion, rule mutation, file writes, version persistence, approval persistence, evidence persistence, queue
            persistence, worker dispatch, broker execution, order placement, order dispatch, paper execution, live
            execution, live transition, live market data calls, real P&amp;L calculation, financial advice, personalised
            recommendations, buy sell instructions, hidden execution affordances, and performance guarantees remain
            blocked. Backend-owned paper workflow, promotion workflow, version registry, change workflow, evidence
            capture, approval capture, execution service, broker adapter, credential vault, and audit trail remain
            required. Full smoke is not claimed here unless full smoke has passed.
          </p>
        </article>
      </section>

      <details style={diagnosticsDrawer}>
        <summary style={diagnosticsSummary}>Developer Diagnostics</summary>
        <p style={bodyText}>
          Developer Diagnostics stays available for route families, smoke routes, phase diagnostics, and direct deep
          links. Main menu hides phase spam, diagnostics remain searchable, and direct phase route access remains
          available.
        </p>
        <div style={routeFamilyGrid}>
          {ux.routeFamilies.map((family, index) => (
            <RouteFamilyCard
              key={buildCockpitNavigationCleanupStableKey(["cockpit-route-family", String(index), family.id])}
              family={family}
            />
          ))}
        </div>
        <a style={safeLink} href="/developer-diagnostics-hub-preview">
          Open Developer Diagnostics
        </a>
      </details>

      <section style={noticeBand} aria-label="Explicit cockpit safety limits">
        {ux.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["cockpit-safety-limit", String(index), limit])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>
    </section>
  );
}

export function CockpitNavigationCleanupRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: CockpitNavigationCleanupUserUxRouteSlug;
  embedded?: boolean;
}) {
  const model = buildCockpitNavigationCleanupRouteModel(routeSlug);
  const ux = model.cockpitNavigationCleanupUserUx;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-cockpit-navigation-cleanup-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        {embedded ? <h2 style={title}>{model.route.title}</h2> : <h1 style={title}>{model.route.title}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Cockpit Navigation Cleanup User UX is navigation and UX only. Phase routes remain diagnostics, phase pages
          remain dev test diagnostics only, normal users start at /codexforge-cockpit, feature labels replace phase
          labels, main menu hides phase spam, diagnostics remain searchable, direct phase route access remains available,
          smoke coverage remains preserved, and command palette groups diagnostics.
        </p>
      </header>

      <section style={markerBand} aria-label="Cockpit navigation cleanup markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Cockpit navigation cleanup model fields">
        <div>
          <p style={panelEyebrow}>Model fields</p>
          <h2 style={sectionTitle}>
            cockpitNavigationCleanupUserUxId: {ux.cockpitNavigationCleanupUserUxId}
          </h2>
        </div>
        <p style={bodyText}>cockpitNavigationCleanupUserUxKind: {ux.cockpitNavigationCleanupUserUxKind}</p>
        <div style={chipRow}>
          {[
            "cockpitNavigationCleanupUserUxId",
            "cockpitNavigationCleanupUserUxKind",
            "userCockpitHome",
            "tradingWorkspaceHub",
            "buildWorkspaceHub",
            "approvalsHub",
            "evidenceAuditHub",
            "developerDiagnosticsHub",
            "phaseRouteGrouping",
            "userFeatureLabelMap",
            "cockpitQuickActions",
            "nextActionRailCleanup",
            "commandPaletteGrouping",
            "cockpitStatusSummary",
            "cockpitOnboardingHelp",
            "deniedNavigationCleanupBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span
              key={buildCockpitNavigationCleanupStableKey(["field", String(index), field])}
              style={chip}
            >
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={sectionGrid} aria-label="Cockpit navigation cleanup route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildCockpitNavigationCleanupStableKey(["section", model.route.slug, String(index), section.sectionId])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Cockpit navigation cleanup summary and route families">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit Summary</p>
              <h2 style={sectionTitle}>Current checkpoint/status summary</h2>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {ux.cockpitSummary.map((item, index) => (
              <CheckRow
                key={buildCockpitNavigationCleanupStableKey(["route-summary", String(index), item.id])}
                item={item}
              />
            ))}
          </div>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Developer Diagnostics</p>
              <h2 style={sectionTitle}>Route families, not flat phase spam</h2>
            </div>
            <span style={stateStyle("diagnostic")}>Searchable</span>
          </div>
          <div style={routeFamilyGrid}>
            {ux.routeFamilies.map((family, index) => (
              <RouteFamilyCard
                key={buildCockpitNavigationCleanupStableKey(["route-family", String(index), family.id])}
                family={family}
              />
            ))}
          </div>
        </article>
      </section>

      <section style={noticeBand} aria-label="Cockpit navigation cleanup explicit safety limits">
        {ux.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["route-limit", String(index), limit])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Phase diagnostics</summary>
        <p style={bodyText}>
          Direct phase route access remains available. Phase pages remain dev test diagnostics only. Smoke coverage
          remains preserved.
        </p>
        <div style={diagnosticRouteGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildCockpitNavigationCleanupStableKey(["diagnostic-route", String(index), route.slug])}
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

function FeatureCard({
  section,
  href,
  actionLabel,
}: {
  section: CockpitNavigationCleanupSection;
  href: string;
  actionLabel: string;
}) {
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
      <div style={chipRow}>
        {section.featureLabels.map((label, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["feature-label", section.sectionId, String(index), label])}
            style={chip}
          >
            {label}
          </span>
        ))}
      </div>
      <a style={safeLink} href={href}>
        {actionLabel}
      </a>
    </article>
  );
}

function WorkspacePanel({
  title,
  summary,
  items,
  href,
}: {
  title: string;
  summary: string;
  items: readonly string[];
  href: string;
}) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Workspace hub</p>
          <h2 style={sectionTitle}>{title}</h2>
        </div>
        <a style={safeLink} href={href}>
          Open hub
        </a>
      </div>
      <p style={bodyText}>{summary}</p>
      <div style={chipRow}>
        {items.map((item, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["workspace-item", title, String(index), item])}
            style={chip}
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function SectionCard({ section }: { section: CockpitNavigationCleanupSection }) {
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
      <FieldList label="featureLabels" values={section.featureLabels} />
      <FieldList label="plannedInputs" values={section.plannedInputs} />
      <FieldList label="plannedOutputs" values={section.plannedOutputs} />
      <FieldList label="safetyNotes" values={section.safetyNotes} />
      <div style={chipRow}>
        {section.deniedActions.map((action, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["denied-action", section.sectionId, String(index), action])}
            style={dangerChip}
          >
            {action}
          </span>
        ))}
      </div>
      <div style={checklistGrid}>
        {section.checklist.map((item, index) => (
          <CheckRow
            key={buildCockpitNavigationCleanupStableKey(["section-check", section.sectionId, String(index), item.id])}
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
          key={buildCockpitNavigationCleanupStableKey(["field-list", label, String(index), value])}
          style={fieldValue}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

function CheckRow({ item }: { item: CockpitNavigationCleanupItem }) {
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

function RouteFamilyCard({ family }: { family: CockpitNavigationCleanupRouteFamily }) {
  return (
    <article style={familyCard}>
      <p style={panelEyebrow}>{family.label}</p>
      <p style={bodyText}>{family.summary}</p>
      <div style={chipRow}>
        {family.exampleRoutes.map((route, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["family-route", family.id, String(index), route])}
            style={chip}
          >
            {route}
          </span>
        ))}
      </div>
    </article>
  );
}

function formatState(state: CockpitNavigationCleanupState): string {
  if (state === "user-facing") return "User-facing";
  if (state === "diagnostic") return "Diagnostic";
  if (state === "approval-required") return "Approval required";
  if (state === "blocked") return "Blocked";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Review only";
}

function stateStyle(state: CockpitNavigationCleanupState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalStateBadge
        : state === "diagnostic"
          ? diagnosticBadge
          : state === "user-facing"
            ? userFacingBadge
            : state === "candidate" || state === "release-candidate"
              ? candidateBadge
              : reviewBadge),
  };
}

function smallStateStyle(state: CockpitNavigationCleanupState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalStateBadge
        : state === "diagnostic"
          ? diagnosticBadge
          : state === "user-facing"
            ? userFacingBadge
            : state === "candidate" || state === "release-candidate"
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
  fontSize: 38,
  lineHeight: 1.08,
  letterSpacing: 0,
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 1080,
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

const statusBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
  border: "1px solid #cfd8df",
  borderRadius: 8,
  padding: 14,
  background: "#f7fafc",
};

const featureGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
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

const quickActionBand: CSSProperties = {
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  padding: 16,
  background: "#f8fbfa",
};

const quickActionGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 10,
  marginTop: 12,
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

const reviewBadge: CSSProperties = {
  borderColor: "#91b9a8",
  background: "#f0faf5",
  color: "#235342",
};

const userFacingBadge: CSSProperties = {
  borderColor: "#81b3c9",
  background: "#eff8fc",
  color: "#1f5269",
};

const diagnosticBadge: CSSProperties = {
  borderColor: "#a8aeb8",
  background: "#f4f5f7",
  color: "#3f4852",
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

const routeFamilyGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const familyCard: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 12,
  background: "#ffffff",
};

const diagnosticRouteGrid: CSSProperties = {
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
