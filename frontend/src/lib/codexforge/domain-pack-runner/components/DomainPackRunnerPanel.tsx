"use client";

import type { CSSProperties } from "react";
import {
  buildDomainPackRunnerRouteModel,
  buildDomainPackRunnerStableKey,
  type DomainPackRunnerItem,
  type DomainPackRunnerRouteSlug,
  type DomainPackRunnerSection,
  type DomainPackRunnerState,
  type DomainPackRunnerShellStep,
  type SupportedDomainPack,
} from "../domain-pack-runner-model";

export function DomainPackRunnerCockpitSummaryPanel() {
  const model = buildDomainPackRunnerRouteModel("codexforge-cockpit");
  const runner = model.domainPackRunner;

  return (
    <section
      style={cockpitSection}
      data-codexforge-domain-pack-runner={model.cockpitMarkers.join(" | ")}
      aria-label="Domain Pack Runner"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Domain Pack Runner</p>
          <h2 style={sectionTitle}>Domain Pack Runner</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>

      <p style={bodyText}>
        Choose Domain starts the flow. The user chooses Game Server Builder, Trading Research, Web App Builder, Docs
        Pack, Data Analysis Pack, or Creative Campaign Pack. Goal Intake shapes the goal into a domain workflow, then
        Domain Classifier chooses the pack and task type as a review-only preview.
      </p>
      <p style={bodyText}>
        Worker Route previews specialist workers but does not dispatch them. Model, provider, connector, and local
        routes are previewed but not called. Plan, Artifacts, Commands, Approvals, Evidence, Results, Audit, and
        Recovery are shown before execution.
      </p>
      <p style={bodyText}>
        Front User-Facing Runner Shell is the product-facing direction for normal users. Start with a goal, Pick a
        domain pack, Review generated plan, Review worker route, Review approval gates, Review artifacts and commands,
        Review evidence and recovery, and Hold Before Execution. No domain execution from the cockpit. No worker
        dispatch from the cockpit. No model calls from the cockpit. No provider calls from the cockpit. No command
        execution from the cockpit. Backend-owned domain pack runner remains required. Explicit operator approval
        remains required.
      </p>

      <section style={shellBand} aria-label="Front User-Facing Runner Shell">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Front User-Facing Runner Shell</p>
            <h3 style={shellTitle}>Start with a goal</h3>
          </div>
          <span style={stateStyle("needs-approval")}>Hold Before Execution</span>
        </div>
        <p style={goalText}>{runner.frontUserFacingShell.sampleGoal}</p>
        <p style={goalText}>{runner.frontUserFacingShell.upcomingTradingSampleGoal}</p>
        <div style={stepGrid}>
          {runner.frontUserFacingShell.steps.map((step, index) => (
            <ShellStepCard
              key={buildDomainPackRunnerStableKey(["cockpit-shell-step", String(index), step.id])}
              step={step}
            />
          ))}
        </div>
      </section>

      <div style={domainGrid} aria-label="Choose Domain">
        {runner.supportedDomainPacks.map((domainPack, index) => (
          <DomainPackCard
            key={buildDomainPackRunnerStableKey(["cockpit-domain-pack", String(index), domainPack.id])}
            domainPack={domainPack}
          />
        ))}
      </div>

      <div style={cockpitGrid} aria-label="Domain Pack Runner cockpit labels">
        {runner.cockpitSummary.map((item, index) => (
          <SummaryCard
            key={buildDomainPackRunnerStableKey(["domain-runner-cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </div>

      <section style={identityBand} aria-label="Domain Pack Runner model identity">
        <p style={panelEyebrow}>Domain pack runner model</p>
        <p style={bodyText}>
          domainPackRunnerId: {runner.domainPackRunnerId}. domainPackRunnerKind: {runner.domainPackRunnerKind}.
          selectedDomainPack: {runner.selectedDomainPack.label}. Execution remains backend-owned, preview-only, and
          approval-gated from the frontend.
        </p>
      </section>

      <div style={markerBand} aria-label="Domain Pack Runner cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildDomainPackRunnerStableKey(["domain-runner-cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function DomainPackRunnerRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: DomainPackRunnerRouteSlug;
  embedded?: boolean;
}) {
  const model = buildDomainPackRunnerRouteModel(routeSlug);
  const runner = model.domainPackRunner;
  const titleText = embedded ? "Domain Pack Runner" : model.route.title;
  const isFrontShell = model.route.slug === "front-user-facing-runner-shell";

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-domain-pack-runner-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Domain Pack Runner" : model.route.phase}</span>
          <span style={surfaceBadge}>{isFrontShell ? "Product-facing preview" : model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Domain Pack Runner Preview is preview-only from the frontend. It does not execute domain packs from the UI.
          It does not dispatch workers from the UI. It does not call models from the UI. It does not call local models
          from the UI.
        </p>
        <p style={bodyText}>
          It does not call providers from the UI. It does not call connectors from the UI. It does not send prompts
          from the UI. It does not run commands from the UI. It does not write generated artifacts from the UI. It
          prepares a future backend-owned domain pack runner path. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Domain Pack Runner page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildDomainPackRunnerStableKey(["domain-runner-route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      {isFrontShell ? <FrontUserFacingShellReview /> : null}

      <section style={identityBand} aria-label="Domain Pack Runner model fields">
        <div>
          <p style={panelEyebrow}>Domain pack runner model</p>
          <h3 style={sectionTitle}>domainPackRunnerId: {runner.domainPackRunnerId}</h3>
        </div>
        <p style={bodyText}>domainPackRunnerKind: {runner.domainPackRunnerKind}</p>
        <p style={bodyText}>selectedDomainPack: {runner.selectedDomainPack.label}</p>
        <div style={chipRow}>
          {[
            "domainPackRunnerId",
            "domainPackRunnerKind",
            "selectedDomainPack",
            "supportedDomainPacks",
            "goalIntake",
            "domainClassifier",
            "specialistWorkerRoute",
            "modelRouterRoute",
            "providerApprovalRoute",
            "localModelBridgeRoute",
            "domainPlan",
            "artifactPlan",
            "commandPlan",
            "approvalGatePlan",
            "evidenceResultPlan",
            "auditTrailPlan",
            "recoveryRoute",
            "deniedDomainRunnerBoundaries",
            "cockpitSummary",
            "frontUserFacingShell",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildDomainPackRunnerStableKey(["domain-runner-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={domainGrid} aria-label="Supported domain packs">
        {runner.supportedDomainPacks.map((domainPack, index) => (
          <DomainPackCard
            key={buildDomainPackRunnerStableKey(["route-domain-pack", model.route.slug, String(index), domainPack.id])}
            domainPack={domainPack}
          />
        ))}
      </section>

      <section style={cardGrid} aria-label="Domain Pack Runner sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildDomainPackRunnerStableKey(["domain-runner-section", model.route.slug, String(index), section.sectionId])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Domain Pack Runner cockpit and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {runner.cockpitSummary.map((item, index) => (
              <CheckRow key={buildDomainPackRunnerStableKey(["domain-runner-cockpit-item", String(index), item.id])} item={item} />
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
            {runner.explicitSafetyLimits.map((limit, index) => (
              <span key={buildDomainPackRunnerStableKey(["domain-runner-safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={panel} aria-label="Domain Pack Runner continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Choose Domain Goal Intake Domain Classifier Worker Route Plan Artifacts Commands Approvals Evidence
              Results Audit Recovery Hold Before Execution
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned</span>
        </div>
        <p style={bodyText}>
          Domain Pack Runner prepares CodexForge for backend-owned domain pack workflows while keeping the cockpit as
          the normal user surface. Phase pages remain dev test diagnostics only. frontend domain pack execution still
          blocked. backend-owned domain pack runner remains required.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit.
          frontend domain pack execution still blocked. backend-owned domain pack runner remains required.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a key={buildDomainPackRunnerStableKey(["domain-runner-diagnostic-route", String(index), route.slug])} style={routeLink} href={route.href}>
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

function FrontUserFacingShellReview() {
  const model = buildDomainPackRunnerRouteModel("front-user-facing-runner-shell");
  const shell = model.domainPackRunner.frontUserFacingShell;

  return (
    <section style={frontShell} aria-label="Front User-Facing Runner Shell preview">
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Front User-Facing Runner Shell</p>
          <h2 style={shellTitle}>Start with a goal</h2>
        </div>
        <span style={stateStyle("needs-approval")}>Hold before execution</span>
      </div>
      <div style={goalGrid}>
        <article style={goalCard}>
          <p style={panelEyebrow}>Game Server Builder</p>
          <p style={goalText}>{shell.sampleGoal}</p>
        </article>
        <article style={goalCard}>
          <p style={panelEyebrow}>Trading Research upcoming preview</p>
          <p style={goalText}>{shell.upcomingTradingSampleGoal}</p>
        </article>
      </div>
      <div style={disabledControlRow} aria-label="Review-only controls">
        {["Pick a domain pack", "Review generated plan", "Review worker route", "Review approval gates", "Hold before execution"].map(
          (label, index) => (
            <button
              key={buildDomainPackRunnerStableKey(["disabled-shell-control", String(index), label])}
              style={disabledButton}
              type="button"
              disabled
            >
              {label}
            </button>
          )
        )}
      </div>
      <div style={stepGrid}>
        {shell.steps.map((step, index) => (
          <ShellStepCard key={buildDomainPackRunnerStableKey(["front-shell-step", String(index), step.id])} step={step} />
        ))}
      </div>
      <div style={chipRow}>
        {shell.reviewOnlyCopy.map((copy, index) => (
          <span key={buildDomainPackRunnerStableKey(["front-shell-copy", String(index), copy])} style={chip}>
            {copy}
          </span>
        ))}
      </div>
    </section>
  );
}

function DomainPackCard({ domainPack }: { domainPack: SupportedDomainPack }) {
  return (
    <article style={domainCard}>
      <div style={panelHeader}>
        <h3 style={summaryLabel}>{domainPack.label}</h3>
        <span style={smallStateStyle(domainPack.status === "available-preview" ? "preview-only" : "manual-review")}>
          {domainPack.status === "available-preview" ? "Available preview" : "Upcoming preview"}
        </span>
      </div>
      <p style={bodyText}>{domainPack.summary}</p>
      <p style={fieldValue}>{domainPack.sampleGoal}</p>
      <p style={fieldValue}>{domainPack.safetyPosture}</p>
    </article>
  );
}

function SummaryCard({ item }: { item: DomainPackRunnerItem }) {
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

function ShellStepCard({ step }: { step: DomainPackRunnerShellStep }) {
  return (
    <article style={stepCard}>
      <div style={panelHeader}>
        <h3 style={summaryLabel}>{step.label}</h3>
        <span style={smallStateStyle(step.state)}>{formatState(step.state)}</span>
      </div>
      <p style={bodyText}>{step.detail}</p>
    </article>
  );
}

function SectionCard({ section }: { section: DomainPackRunnerSection }) {
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
          <span key={buildDomainPackRunnerStableKey(["denied-action", section.sectionId, String(index), action])} style={dangerChip}>
            {action}
          </span>
        ))}
      </div>

      <div style={checklistGrid}>
        {section.checklist.map((item, index) => (
          <CheckRow key={buildDomainPackRunnerStableKey(["check-row", section.sectionId, String(index), item.id])} item={item} />
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
        <span key={buildDomainPackRunnerStableKey(["field-list", label, String(index), value])} style={fieldValue}>
          {value}
        </span>
      ))}
    </div>
  );
}

function CheckRow({ item }: { item: DomainPackRunnerItem }) {
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

function formatState(state: DomainPackRunnerState): string {
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

function stateStyle(state: DomainPackRunnerState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked" || state === "denied"
      ? blockedBadge
      : state === "needs-approval"
        ? approvalBadge
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

function smallStateStyle(state: DomainPackRunnerState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked" || state === "denied"
      ? blockedBadge
      : state === "needs-approval"
        ? approvalBadge
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

const cockpitSection: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  border: "1px solid #cfd8df",
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
  maxWidth: 940,
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

const shellBand: CSSProperties = {
  border: "1px solid #b7cbd2",
  borderRadius: 8,
  padding: 16,
  background: "#f6fbfc",
};

const frontShell: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  border: "1px solid #b7cbd2",
  borderRadius: 8,
  padding: 18,
  background: "#f6fbfc",
};

const shellTitle: CSSProperties = {
  margin: 0,
  fontSize: 22,
  lineHeight: 1.2,
  letterSpacing: 0,
};

const goalGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
};

const goalCard: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 14,
  background: "#ffffff",
};

const goalText: CSSProperties = {
  margin: "8px 0 0",
  color: "#24343e",
  fontSize: 15,
  lineHeight: 1.55,
  fontWeight: 650,
};

const disabledControlRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const disabledButton: CSSProperties = {
  border: "1px solid #cbd6dc",
  borderRadius: 6,
  padding: "8px 10px",
  background: "#eef3f6",
  color: "#657682",
  fontSize: 13,
  fontWeight: 700,
};

const stepGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: 10,
  marginTop: 10,
};

const stepCard: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 14,
  background: "#ffffff",
};

const domainGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
};

const domainCard: CSSProperties = {
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

const cockpitGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: 10,
};

const cardGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 14,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
};

const panel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
};

const summaryCard: CSSProperties = {
  ...panel,
  padding: 14,
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

const summaryLabel: CSSProperties = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.25,
  letterSpacing: 0,
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

const approvalBadge: CSSProperties = {
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
