"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildStrategyVersionReviewRegistryRouteModel,
  buildStrategyVersionReviewRegistryStableKey,
  type StrategyVersionReviewRegistryItem,
  type StrategyVersionReviewRegistryRouteSlug,
  type StrategyVersionReviewRegistrySection,
  type StrategyVersionReviewRegistryState,
} from "../strategy-version-review-registry-model";

export function StrategyVersionReviewRegistryPageClientShell({
  routeSlug,
}: {
  routeSlug: StrategyVersionReviewRegistryRouteSlug;
}) {
  const model = buildStrategyVersionReviewRegistryRouteModel(routeSlug);

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
      <StrategyVersionReviewRegistryRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function StrategyVersionReviewRegistryCockpitSummaryPanel() {
  const model = buildStrategyVersionReviewRegistryRouteModel("cockpit-strategy-version-registry-summary");
  const registry = model.strategyVersionReviewRegistry;

  return (
    <section
      style={cockpitPanel}
      aria-label="Strategy Version Review Registry"
      data-codexforge-strategy-version-review-registry={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Strategy Version Review Registry</span>
          <span style={surfaceBadge}>Trading Workspace</span>
          <span style={approvalBadge}>Review-only synthetic registry</span>
        </div>
        <h2 style={title}>Strategy Version Review Registry</h2>
        <p style={summary}>
          Safe review-only strategy version registry preview for version lineage map, version diff summary, version
          evidence links, version risk status, version mandate status, version approval state, version retirement state,
          version rollback note, version comparison matrix, version review checklist, version registry export boundary,
          no auto promote registry boundary, and denied paths. Synthetic data only. Review-only strategy version
          registry. No financial advice from the cockpit, no personalised recommendations from the cockpit, no buy sell
          instructions from the cockpit, no strategy auto promotion from the cockpit, no strategy auto tuning from the
          cockpit, no automatic rule mutation from the cockpit, no frontend file mutation, no frontend approval
          persistence, no frontend version persistence, no real P&amp;L analysis from the cockpit, no live market data
          calls from the cockpit, no order placement from the cockpit, no order dispatch from the cockpit, no broker
          execution from the cockpit, no money movement from the cockpit, no trading automation from the cockpit, and no
          performance guarantees.
        </p>
      </header>

      <section style={summaryGrid} aria-label="Strategy version review registry cockpit summary">
        {registry.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildStrategyVersionReviewRegistryStableKey([
              "strategy-version-registry-cockpit-summary",
              String(index),
              item.id,
            ])}
            item={item}
          />
        ))}
      </section>

      <section style={sectionGrid} aria-label="Strategy version review registry cockpit cards">
        <SummaryCard section={registry.versionLineageMap} stateLabel="Lineage" />
        <SummaryCard section={registry.versionDiffSummary} stateLabel="Diff" />
        <SummaryCard section={registry.versionEvidenceLinks} stateLabel="Evidence" />
        <SummaryCard section={registry.versionRiskStatus} stateLabel="Risk" />
        <SummaryCard section={registry.versionMandateStatus} stateLabel="Mandate" />
        <SummaryCard section={registry.versionApprovalState} stateLabel="Approval" />
        <SummaryCard section={registry.versionRetirementState} stateLabel="Retirement" />
        <SummaryCard section={registry.versionRollbackNote} stateLabel="Rollback" />
        <SummaryCard section={registry.versionComparisonMatrix} stateLabel="Comparison" />
        <SummaryCard section={registry.versionReviewChecklist} stateLabel="Checklist" />
        <SummaryCard section={registry.versionRegistryExportBoundary} stateLabel="Export" />
        <SummaryCard section={registry.noAutoPromoteRegistryBoundary} stateLabel="No Auto Promote" />
      </section>

      <section style={noticeBand} aria-label="Strategy version review registry safety limits">
        {registry.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildStrategyVersionReviewRegistryStableKey([
              "strategy-version-registry-cockpit-limit",
              String(index),
              limit,
            ])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>

      <a style={safeLink} href="/cockpit-strategy-version-registry-summary">
        Review Strategy Version Registry Summary
      </a>
    </section>
  );
}

export function StrategyVersionReviewRegistryRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: StrategyVersionReviewRegistryRouteSlug;
  embedded?: boolean;
}) {
  const model = buildStrategyVersionReviewRegistryRouteModel(routeSlug);
  const registry = model.strategyVersionReviewRegistry;
  const titleText = embedded ? "Strategy Version Review Registry" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-strategy-version-review-registry-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Strategy Version Registry" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Synthetic only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Strategy Version Review Registry v1 is review-only from the frontend. This is not financial advice,
          personalised recommendation, buy sell instruction, automated strategy optimisation, strategy auto-promotion,
          automatic rule mutation, live trading, real P&amp;L analysis, order placement, broker execution, live market
          data, money movement, file mutation from the frontend, approval persistence from the frontend, or strategy
          version persistence from the frontend.
        </p>
        <p style={bodyText}>
          Backend-owned version registry remains required. Backend-owned change workflow remains required. Backend-owned
          evidence capture remains required. Backend-owned approval capture remains required. Operator review remains
          required. Risk governor approval remains required. Kill switch enforcement remains required. Explicit operator
          approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Strategy version review registry page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildStrategyVersionReviewRegistryStableKey([
              "strategy-version-registry-route-marker",
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

      <section style={identityBand} aria-label="Strategy version review registry model fields">
        <div>
          <p style={panelEyebrow}>Strategy version review registry model</p>
          <h2 style={sectionTitle}>
            strategyVersionReviewRegistryId: {registry.strategyVersionReviewRegistryId}
          </h2>
        </div>
        <p style={bodyText}>strategyVersionReviewRegistryKind: {registry.strategyVersionReviewRegistryKind}</p>
        <div style={chipRow}>
          {[
            "strategyVersionReviewRegistryId",
            "strategyVersionReviewRegistryKind",
            "versionLineageMap",
            "versionDiffSummary",
            "versionEvidenceLinks",
            "versionRiskStatus",
            "versionMandateStatus",
            "versionApprovalState",
            "versionRetirementState",
            "versionRollbackNote",
            "versionComparisonMatrix",
            "versionReviewChecklist",
            "versionRegistryExportBoundary",
            "noAutoPromoteRegistryBoundary",
            "deniedStrategyVersionRegistryBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span
              key={buildStrategyVersionReviewRegistryStableKey([
                "strategy-version-registry-field",
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

      <section style={sectionGrid} aria-label="Strategy version review registry route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildStrategyVersionReviewRegistryStableKey([
              "strategy-version-registry-section",
              model.route.slug,
              String(index),
              section.sectionId,
            ])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Strategy version review registry summary and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {registry.cockpitSummary.map((item, index) => (
              <CheckRow
                key={buildStrategyVersionReviewRegistryStableKey([
                  "strategy-version-registry-route-summary",
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
            {registry.explicitSafetyLimits.map((limit, index) => (
              <span
                key={buildStrategyVersionReviewRegistryStableKey([
                  "strategy-version-registry-route-limit",
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

      <section style={continuityBand} aria-label="Strategy version review registry continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Strategy Version Review Registry Version Lineage Map Version Diff Summary Version Evidence Links Version
              Risk Status Version Mandate Status Version Approval State Version Retirement State Version Rollback Note
              Version Comparison Matrix Version Review Checklist Version Registry Export Boundary No Auto Promote
              Registry Boundary
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned version registry required</span>
        </div>
        <p style={bodyText}>
          Controlled strategy version review registry release candidate prepares CodexForge for backend-owned strategy
          version registry workflows without frontend mutation, version persistence, approval persistence, evidence
          persistence, auto tuning, strategy promotion, rule mutation, file writes, broker execution, order placement,
          order dispatch, live market data calls, real P&amp;L calculation, financial advice, personalised
          recommendations, buy sell instructions, or execution. Strategy version registry remains review-only.
          Synthetic data only.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Normal users continue to work from /codexforge-cockpit. Strategy version review registry phase pages remain
          dev test diagnostics only.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildStrategyVersionReviewRegistryStableKey([
                "strategy-version-registry-diagnostic-route",
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

function SummaryCard({ section, stateLabel }: { section: StrategyVersionReviewRegistrySection; stateLabel: string }) {
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
            key={buildStrategyVersionReviewRegistryStableKey([
              "strategy-version-registry-summary-output",
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

function SectionCard({ section }: { section: StrategyVersionReviewRegistrySection }) {
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
            key={buildStrategyVersionReviewRegistryStableKey([
              "strategy-version-registry-denied-action",
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
            key={buildStrategyVersionReviewRegistryStableKey([
              "strategy-version-registry-section-check",
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
          key={buildStrategyVersionReviewRegistryStableKey([
            "strategy-version-registry-field-list",
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

function CheckRow({ item }: { item: StrategyVersionReviewRegistryItem }) {
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

function formatState(state: StrategyVersionReviewRegistryState): string {
  if (state === "synthetic-only") return "Synthetic only";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Approval required";
  if (state === "blocked") return "Blocked";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Review only";
}

function stateStyle(state: StrategyVersionReviewRegistryState): CSSProperties {
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

function smallStateStyle(state: StrategyVersionReviewRegistryState): CSSProperties {
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
