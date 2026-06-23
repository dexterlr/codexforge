"use client";

import type { CSSProperties } from "react";
import {
  buildCockpitDomainWorkspaceRouteModel,
  buildCockpitDomainWorkspaceStableKey,
  type CockpitDomainCard,
  type CockpitDomainWorkspaceItem,
  type CockpitDomainWorkspaceRouteSlug,
  type CockpitDomainWorkspaceSection,
  type CockpitDomainWorkspaceState,
} from "../cockpit-domain-workspace-model";

export function CockpitDomainWorkspaceCockpitPanel() {
  const model = buildCockpitDomainWorkspaceRouteModel("codexforge-cockpit");
  const workspace = model.cockpitDomainWorkspace;

  return (
    <section
      style={cockpitWorkspace}
      aria-label="Cockpit Domain Workspace"
      data-codexforge-cockpit-domain-workspace={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Cockpit Domain Workspace</span>
          <span style={surfaceBadge}>Preview only</span>
          <span style={approvalBadge}>Hold Before Execution</span>
        </div>
        <h2 style={title}>Cockpit Domain Workspace</h2>
        <p style={summary}>
          Normal users start with a goal, choose a domain pack, inspect the generated plan, review worker routing,
          approvals, artifacts, commands, evidence, results, recovery, audit, and memory context, then hold before
          execution. No execution happens from the cockpit.
        </p>
      </header>

      <section style={missionBand} aria-label="Cockpit Domain Workspace mission">
        <article style={missionPanel}>
          <p style={panelEyebrow}>Start with a goal</p>
          <h3 style={sectionTitle}>Goal composer preview</h3>
          <p style={goalText}>
            Build a Minecraft roleplay server for friends with factions, economy, quests, regions, roles, permissions,
            validation, evidence, recovery, and audit.
          </p>
          <p style={bodyText}>
            Front goal composer preview helps users start with a goal choose domain hints define done criteria risk level
            artifacts commands evidence and recovery needs. It does not send prompts or create jobs from the UI.
          </p>
        </article>
        <article style={missionPanel}>
          <p style={panelEyebrow}>Choose a domain</p>
          <h3 style={sectionTitle}>Game Server Builder is available</h3>
          <p style={bodyText}>
            Game Server Builder is available as the first domain pack. Trading Automation Research is upcoming and will
            be capital-limited, paper-first, backtested, risk-governed, and broker-approval bounded.
          </p>
        </article>
      </section>

      <section style={domainGrid} aria-label="Choose a domain">
        {workspace.domainCards.map((domainCard, index) => (
          <DomainCard
            key={buildCockpitDomainWorkspaceStableKey(["cockpit-domain-card", String(index), domainCard.id])}
            domainCard={domainCard}
          />
        ))}
      </section>

      <section style={activeWorkspaceGrid} aria-label="Active Workspace">
        <WorkspaceSummary section={workspace.activeDomainWorkspace} stateLabel="Active Workspace" />
        <WorkspaceSummary section={workspace.generatedPlanWorkspace} stateLabel="Generated Plan" />
        <WorkspaceSummary section={workspace.workerRouteWorkspace} stateLabel="Worker Route" />
        <WorkspaceSummary section={workspace.approvalGatesWorkspace} stateLabel="Approval Gates" />
      </section>

      <section style={workspaceGrid} aria-label="Cockpit Domain Workspace panels">
        <WorkspaceSummary section={workspace.artifactCommandWorkspace} stateLabel="Artifacts Commands" />
        <WorkspaceSummary section={workspace.evidenceResultWorkspace} stateLabel="Evidence Results" />
        <WorkspaceSummary section={workspace.recoveryAuditWorkspace} stateLabel="Recovery Audit" />
        <WorkspaceSummary section={workspace.memoryContextWorkspace} stateLabel="Memory Context" />
      </section>

      <section style={splitBand} aria-label="Domain workspace previews">
        <WorkspaceSummary section={workspace.gameServerBuilderWorkspace} stateLabel="Game Server Builder" />
        <WorkspaceSummary section={workspace.tradingAutomationDomainTeaser} stateLabel="Trading Automation Research" />
      </section>

      <section style={nextActionBand} aria-label="Next Action">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Next Action</p>
            <h3 style={sectionTitle}>Hold Before Execution</h3>
          </div>
          <span style={stateStyle("needs-approval")}>Explicit approval required</span>
        </div>
        <div style={railGrid}>
          {workspace.nextActionRail.plannedOutputs.map((action, index) => (
            <span
              key={buildCockpitDomainWorkspaceStableKey(["next-action-output", String(index), action])}
              style={railStep}
            >
              {action}
            </span>
          ))}
        </div>
        <p style={bodyText}>
          Review goal, choose domain, inspect plan, review approvals, inspect artifacts, inspect commands, inspect
          evidence, hold before execution, and use manual next steps only.
        </p>
      </section>

      <section style={safetyBand} aria-label="Cockpit Domain Workspace safety limits">
        {workspace.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildCockpitDomainWorkspaceStableKey(["cockpit-safety-limit", String(index), limit])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>

      <section style={markerBand} aria-label="Cockpit Domain Workspace markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildCockpitDomainWorkspaceStableKey(["cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </section>
    </section>
  );
}

export function CockpitDomainWorkspaceRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: CockpitDomainWorkspaceRouteSlug;
  embedded?: boolean;
}) {
  const model = buildCockpitDomainWorkspaceRouteModel(routeSlug);
  const workspace = model.cockpitDomainWorkspace;
  const titleText = embedded ? "Cockpit Domain Workspace" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-cockpit-domain-workspace-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Cockpit Domain Workspace" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Front user-facing workspace"}</span>
          <span style={approvalBadge}>Hold Before Execution</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Cockpit Domain Workspace v1 is preview-only from the frontend. It does not execute domain packs from the UI.
          It does not dispatch workers from the UI. It does not call models, local models, providers, or connectors from
          the UI. It does not send prompts from the UI. It does not run commands from the UI.
        </p>
        <p style={bodyText}>
          It does not write generated artifacts from the UI. It does not connect brokers or place trades from the UI. It
          prepares a future backend-owned domain workspace. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Cockpit Domain Workspace page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildCockpitDomainWorkspaceStableKey(["workspace-route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Cockpit Domain Workspace model fields">
        <div>
          <p style={panelEyebrow}>Cockpit domain workspace model</p>
          <h2 style={sectionTitle}>cockpitDomainWorkspaceId: {workspace.cockpitDomainWorkspaceId}</h2>
        </div>
        <p style={bodyText}>cockpitDomainWorkspaceKind: {workspace.cockpitDomainWorkspaceKind}</p>
        <div style={chipRow}>
          {[
            "cockpitDomainWorkspaceId",
            "cockpitDomainWorkspaceKind",
            "frontGoalComposer",
            "domainCards",
            "activeDomainWorkspace",
            "generatedPlanWorkspace",
            "workerRouteWorkspace",
            "approvalGatesWorkspace",
            "artifactCommandWorkspace",
            "evidenceResultWorkspace",
            "recoveryAuditWorkspace",
            "memoryContextWorkspace",
            "tradingAutomationDomainTeaser",
            "gameServerBuilderWorkspace",
            "nextActionRail",
            "deniedCockpitWorkspaceBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildCockpitDomainWorkspaceStableKey(["workspace-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={domainGrid} aria-label="Domain Cards Preview">
        {workspace.domainCards.map((domainCard, index) => (
          <DomainCard
            key={buildCockpitDomainWorkspaceStableKey(["route-domain-card", model.route.slug, String(index), domainCard.id])}
            domainCard={domainCard}
          />
        ))}
      </section>

      <section style={workspaceGrid} aria-label="Cockpit Domain Workspace sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildCockpitDomainWorkspaceStableKey(["workspace-section", model.route.slug, String(index), section.sectionId])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Cockpit summary and explicit safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {workspace.cockpitSummary.map((summary, index) => (
              <CheckRow
                key={buildCockpitDomainWorkspaceStableKey(["workspace-cockpit-summary", String(index), summary.id])}
                item={summary}
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
                key={buildCockpitDomainWorkspaceStableKey(["workspace-explicit-limit", String(index), limit])}
                style={dangerChip}
              >
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={continuityBand} aria-label="Cockpit Domain Workspace continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Cockpit Domain Workspace Start with a goal Choose a domain Active Workspace Generated Plan Worker Route
              Approval Gates Artifacts Commands Evidence Results Recovery Audit Memory Context Next Action Hold Before
              Execution
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned</span>
        </div>
        <p style={bodyText}>
          Release candidate makes the cockpit a clearer front user-facing workspace without frontend execution. Phase
          pages remain dev test diagnostics only. frontend domain execution still blocked.
          frontend broker connection and trade placement still blocked. backend-owned domain workspace remains required.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Normal users continue to work from /codexforge-cockpit. Phase pages remain dev test diagnostics only.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildCockpitDomainWorkspaceStableKey(["workspace-diagnostic-route", String(index), route.slug])}
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

function DomainCard({ domainCard }: { domainCard: CockpitDomainCard }) {
  return (
    <article style={domainCardStyle}>
      <div style={panelHeader}>
        <h3 style={cardTitle}>{domainCard.label}</h3>
        <span style={smallStateStyle(domainCard.status === "available-preview" ? "preview-only" : "manual-review")}>
          {domainCard.status === "available-preview" ? "Available preview" : "Upcoming preview"}
        </span>
      </div>
      <p style={bodyText}>{domainCard.summary}</p>
      <p style={fieldValue}>{domainCard.sampleGoal}</p>
      <p style={fieldValue}>{domainCard.safetyPosture}</p>
    </article>
  );
}

function WorkspaceSummary({ section, stateLabel }: { section: CockpitDomainWorkspaceSection; stateLabel: string }) {
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
        {section.plannedOutputs.slice(0, 6).map((output, index) => (
          <span key={buildCockpitDomainWorkspaceStableKey(["workspace-output", section.sectionId, String(index), output])} style={chip}>
            {output}
          </span>
        ))}
      </div>
    </article>
  );
}

function SectionCard({ section }: { section: CockpitDomainWorkspaceSection }) {
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
            key={buildCockpitDomainWorkspaceStableKey(["workspace-denied-action", section.sectionId, String(index), action])}
            style={dangerChip}
          >
            {action}
          </span>
        ))}
      </div>

      <div style={checklistGrid}>
        {section.checklist.map((check, index) => (
          <CheckRow
            key={buildCockpitDomainWorkspaceStableKey(["workspace-check-row", section.sectionId, String(index), check.id])}
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
        <span key={buildCockpitDomainWorkspaceStableKey(["workspace-field-list", label, String(index), value])} style={fieldValue}>
          {value}
        </span>
      ))}
    </div>
  );
}

function CheckRow({ item }: { item: CockpitDomainWorkspaceItem }) {
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

function formatState(state: CockpitDomainWorkspaceState): string {
  if (state === "preview-only") return "Preview only";
  if (state === "review-only") return "Review only";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "blocked") return "Blocked";
  if (state === "denied") return "Denied";
  if (state === "manual-review") return "Manual review";
  if (state === "candidate") return "Candidate";
  return "Release candidate";
}

function stateStyle(state: CockpitDomainWorkspaceState): CSSProperties {
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
            : state === "manual-review"
              ? manualBadge
              : state === "candidate" || state === "release-candidate"
                ? candidateBadge
                : previewBadge),
  };
}

function smallStateStyle(state: CockpitDomainWorkspaceState): CSSProperties {
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
            : state === "manual-review"
              ? manualBadge
              : state === "candidate" || state === "release-candidate"
                ? candidateBadge
                : previewBadge),
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

const cockpitWorkspace: CSSProperties = {
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

const missionBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
};

const missionPanel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
};

const activeWorkspaceGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
};

const workspaceGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 14,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 14,
};

const nextActionBand: CSSProperties = {
  border: "1px solid #cddbd7",
  borderRadius: 8,
  padding: 16,
  background: "#f8fbfa",
};

const railGrid: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 12,
};

const railStep: CSSProperties = {
  border: "1px solid #c9d7e3",
  borderRadius: 6,
  padding: "7px 9px",
  background: "#ffffff",
  color: "#24333d",
  fontSize: 13,
  fontWeight: 700,
};

const domainGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
};

const domainCardStyle: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 14,
  background: "#ffffff",
};

const identityBand: CSSProperties = {
  border: "1px solid #cfd8df",
  borderRadius: 8,
  padding: 14,
  background: "#f7fafc",
};

const safetyBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  border: "1px solid #d8c7c2",
  borderRadius: 8,
  padding: 14,
  background: "#fff8f6",
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

const cardTitle: CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const bodyText: CSSProperties = {
  margin: "8px 0 0",
  color: "#425563",
  fontSize: 14,
  lineHeight: 1.55,
};

const goalText: CSSProperties = {
  margin: "8px 0 0",
  color: "#24343e",
  fontSize: 15,
  lineHeight: 1.55,
  fontWeight: 650,
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

const previewBadge: CSSProperties = {
  borderColor: "#9db8d0",
  background: "#eef6fc",
  color: "#244862",
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

const manualBadge: CSSProperties = {
  borderColor: "#c7a553",
  background: "#fff7df",
  color: "#604912",
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
