"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  RENDER_JOB_BOUNDARY_MODEL_FIELDS,
  buildRenderJobBoundaryRouteModel,
  buildRenderJobBoundaryStableKey,
  type RenderJobBoundaryItem,
  type RenderJobBoundaryRouteSlug,
  type RenderJobBoundarySection,
  type RenderJobBoundaryState,
} from "../render-job-boundary-model";

export function RenderJobBoundaryPageClientShell({ routeSlug }: { routeSlug: RenderJobBoundaryRouteSlug }) {
  const model = buildRenderJobBoundaryRouteModel(routeSlug);

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
      <RenderJobBoundaryRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function RenderJobBoundaryCockpitSummaryPanel() {
  const model = buildRenderJobBoundaryRouteModel("cockpit-render-job-boundary-summary");
  const workspace = model.renderJobBoundary;
  const cockpitCards: readonly { section: RenderJobBoundarySection; stateLabel: string }[] = [
    { section: workspace.renderPrerequisiteChecklist, stateLabel: "Prerequisites" },
    { section: workspace.timelineReadinessPacket, stateLabel: "Timeline" },
    { section: workspace.assetReadinessGate, stateLabel: "Assets" },
    { section: workspace.captionReadinessGate, stateLabel: "Captions" },
    { section: workspace.audioReadinessGate, stateLabel: "Audio" },
    { section: workspace.rightsApprovalGate, stateLabel: "Rights" },
    { section: workspace.renderSettingsPlanning, stateLabel: "Settings" },
    { section: workspace.renderQueueBlocked, stateLabel: "Queue blocked" },
    { section: workspace.workerDispatchBlocked, stateLabel: "Workers blocked" },
    { section: workspace.artifactPersistenceBlocked, stateLabel: "Artifacts blocked" },
    { section: workspace.renderFailureReview, stateLabel: "Failure review" },
    { section: workspace.exportHandoffBlocked, stateLabel: "Export blocked" },
  ];

  return (
    <section
      style={cockpitPanel}
      aria-label="Render Job Boundary"
      data-codexforge-render-job-boundary={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Render Job Boundary</span>
          <span style={surfaceBadge}>Creative Workspace</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        <h2 style={title}>Render Job Boundary</h2>
        <p style={summary}>
          Review-only render job boundary. Synthetic data only. The cockpit now shows render prerequisite checklist,
          timeline readiness packet, asset readiness gate, caption readiness gate, audio readiness gate, rights approval
          gate, render settings planning, render queue blocked, worker dispatch blocked, artifact persistence blocked,
          render failure review, export handoff blocked, and denied paths as planning-only content.
        </p>
        <p style={bodyText}>
          No render buttons, queue buttons, worker buttons, artifact buttons, export buttons, upload controls, download
          controls, provider controls, model controls, connector controls, publishing controls, scheduling controls, or
          hidden execution affordances are present.
        </p>
        <p style={bodyText}>
          No video rendering from the cockpit, no render queue creation from the cockpit, no worker dispatch from the
          cockpit, no artifact creation from the cockpit, no artifact persistence from the cockpit, no timeline rendering
          from the cockpit, no video export from the cockpit, no file generation from the cockpit, no frontend file
          mutation, no frontend render job persistence, no frontend queue persistence, no frontend worker dispatch, no
          frontend artifact persistence, no frontend asset persistence, no frontend audio persistence, no frontend caption
          persistence, no frontend transcript persistence, no frontend rights persistence, no frontend approval
          persistence, no frontend prompt persistence, no frontend job persistence, no provider calls from the cockpit, no
          model calls from the cockpit, no connector calls from the cockpit, no image generation calls from the cockpit,
          no video generation calls from the cockpit, no voice generation calls from the cockpit, no publishing from the
          cockpit, no social posting from the cockpit, no scheduling from the cockpit, no copyright clearance from the
          cockpit, no consent clearance from the cockpit, no automated brand approval from the cockpit, and no performance
          guarantees.
        </p>
      </header>

      <section style={statusBand} aria-label="Render job boundary status">
        <span style={stateStyle("review-only")}>Review-only render job boundary</span>
        <span style={stateStyle("synthetic-only")}>Synthetic data only</span>
        <span style={stateStyle("backend-owned")}>Backend-owned render service required</span>
        <span style={stateStyle("blocked")}>Queue, worker, artifact, and export paths blocked</span>
        <span style={stateStyle("needs-approval")}>Explicit operator approval required</span>
      </section>

      <section style={summaryGrid} aria-label="Render job boundary cockpit summary">
        {workspace.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildRenderJobBoundaryStableKey(["render-job-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Render job boundary blocked state">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Render Queue Blocked</p>
              <h3 style={sectionTitle}>Queue and worker orchestration stay backend-owned</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <p style={bodyText}>
            Simulated status only: frontend queue creation, job persistence, worker dispatch, retry paths, runtime
            starts, process spawn, command execution, and service start remain blocked.
          </p>
        </article>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Artifact And Export Blocked</p>
              <h3 style={sectionTitle}>Artifacts, files, and export stay backend-owned</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <p style={bodyText}>
            No artifact creation, media storage, file write, browser storage write, asset persistence, video export,
            download, upload, publishing, or scheduling controls are present in the cockpit.
          </p>
        </article>
      </section>

      <section style={sectionGrid} aria-label="Render readiness workflow surface">
        {cockpitCards.map((card, index) => (
          <SummaryCard
            key={buildRenderJobBoundaryStableKey(["render-job-card", String(index), card.section.sectionId])}
            section={card.section}
            stateLabel={card.stateLabel}
          />
        ))}
      </section>

      <section style={noticeBand} aria-label="Render job boundary safety limits">
        {workspace.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildRenderJobBoundaryStableKey(["render-job-limit", String(index), limit])}
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
          do not expose rendering, queue creation, worker dispatch, artifact creation, export, upload, download, provider,
          model, connector, publishing, scheduling, persistence, or file mutation controls.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildRenderJobBoundaryStableKey(["render-job-diagnostic-link", String(index), route.slug])}
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

      <a style={safeLink} href="/controlled-render-job-boundary-release-candidate">
        Review Controlled Render Job Boundary Release Candidate
      </a>
    </section>
  );
}

export function RenderJobBoundaryRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: RenderJobBoundaryRouteSlug;
  embedded?: boolean;
}) {
  const model = buildRenderJobBoundaryRouteModel(routeSlug);
  const workspace = model.renderJobBoundary;
  const titleText = embedded ? "Render Job Boundary" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-render-job-boundary-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Render Job Boundary" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Render Job Boundary v1 is review-only and synthetic-only from the frontend. This is not video rendering, render
          queue creation, worker dispatch, artifact creation, artifact persistence, timeline rendering, video export,
          asset upload, asset download, file generation, provider execution, model execution, connector execution, prompt
          sending, publishing, scheduling, copyright clearance, consent clearance, automated brand approval, frontend
          render job persistence, frontend queue persistence, frontend artifact persistence, frontend asset persistence,
          frontend audio persistence, frontend caption persistence, frontend transcript persistence, frontend rights
          persistence, frontend prompt persistence, frontend job persistence, frontend approval persistence, or performance
          guarantee.
        </p>
        <p style={bodyText}>
          Backend-owned asset storage remains required. Backend-owned audio storage remains required. Backend-owned render
          service remains required. Backend-owned export service remains required. Backend-owned provider gateway remains
          required. Backend-owned rights review remains required. Backend-owned consent review remains required.
          Backend-owned approval capture remains required. Backend-owned script persistence remains required.
          Backend-owned storyboard persistence remains required. Backend-owned caption persistence remains required.
          Backend-owned render queue remains required. Backend-owned worker orchestration remains required. Backend-owned
          artifact storage remains required. Operator review remains required. Explicit operator approval remains
          required.
        </p>
      </header>

      <section style={markerBand} aria-label="Render job boundary page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildRenderJobBoundaryStableKey(["render-job-route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Render job boundary model fields">
        <div>
          <p style={panelEyebrow}>Render job boundary model</p>
          <h2 style={sectionTitle}>renderJobBoundaryId: {workspace.renderJobBoundaryId}</h2>
        </div>
        <p style={bodyText}>renderJobBoundaryKind: {workspace.renderJobBoundaryKind}</p>
        <div style={chipRow}>
          {RENDER_JOB_BOUNDARY_MODEL_FIELDS.map((field, index) => (
            <span key={buildRenderJobBoundaryStableKey(["render-job-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={sectionGrid} aria-label="Render job boundary route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildRenderJobBoundaryStableKey(["render-job-section", model.route.slug, String(index), section.sectionId])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Render job boundary summary and safety limits">
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
                key={buildRenderJobBoundaryStableKey(["render-job-route-summary", String(index), item.id])}
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
                key={buildRenderJobBoundaryStableKey(["render-job-route-limit", String(index), limit])}
                style={dangerChip}
              >
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={continuityBand} aria-label="Render job boundary continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Controlled release candidate</p>
            <h2 style={sectionTitle}>Review-only render job boundary</h2>
          </div>
          <span style={stateStyle("blocked")}>No rendering, queue creation, worker dispatch, artifacts, or export</span>
        </div>
        <p style={bodyText}>
          {model.summary} Release candidate adds the Render Job Boundary as a review-only planning workspace without
          frontend rendering, queue creation, worker dispatch, artifact persistence, export, provider calls, model calls,
          media persistence, rights persistence, prompt persistence, job persistence, approval persistence, publishing,
          scheduling, or file mutation.
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
  section: RenderJobBoundarySection;
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

function SectionCard({ section }: { section: RenderJobBoundarySection }) {
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
            key={buildRenderJobBoundaryStableKey(["render-job-check", section.sectionId, String(index), item.id])}
            item={item}
          />
        ))}
      </div>
      <div style={chipRow}>
        {section.safetyNotes.map((note, index) => (
          <span
            key={buildRenderJobBoundaryStableKey(["render-job-safety-note", section.sectionId, String(index), note])}
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
          <span key={buildRenderJobBoundaryStableKey(["render-job-list", title, String(index), value])} style={chip}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function CheckRow({ item }: { item: RenderJobBoundaryItem }) {
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

function formatState(state: RenderJobBoundaryState): string {
  if (state === "review-only") return "Review only";
  if (state === "synthetic-only") return "Synthetic";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Blocked";
}

function stateStyle(state: RenderJobBoundaryState): CSSProperties {
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
  border: "1px solid #beced6",
  borderRadius: 8,
  background: "#f7f9fa",
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
  color: "#10212a",
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 1100,
  color: "#354850",
  fontSize: 15,
  lineHeight: 1.65,
};

const bodyText: CSSProperties = {
  margin: 0,
  color: "#43545b",
  fontSize: 14,
  lineHeight: 1.6,
};

const phaseBadge: CSSProperties = {
  padding: "6px 10px",
  borderRadius: 999,
  background: "#12313a",
  color: "#f7fbfc",
  fontSize: 12,
  fontWeight: 700,
};

const surfaceBadge: CSSProperties = {
  ...phaseBadge,
  background: "#dce9ec",
  color: "#12313a",
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
  background: "#edf4f5",
  border: "1px solid #c9dadd",
  color: "#283a40",
  fontSize: 12,
  lineHeight: 1.35,
};

const identityBand: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 16,
  border: "1px solid #c9dadd",
  borderRadius: 8,
  background: "#ffffff",
};

const statusBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  padding: 12,
  border: "1px solid #c9dadd",
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
  border: "1px solid #c9dadd",
  borderRadius: 8,
  background: "#ffffff",
};

const summaryCard: CSSProperties = {
  ...panel,
  minHeight: 168,
};

const panelHeader: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
};

const panelEyebrow: CSSProperties = {
  margin: "0 0 4px",
  color: "#60737a",
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: 0,
  textTransform: "uppercase",
};

const sectionTitle: CSSProperties = {
  margin: 0,
  color: "#10212a",
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const listBlock: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: 10,
};

const checkRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 10,
  alignItems: "start",
  padding: 10,
  border: "1px solid #d8e4e7",
  borderRadius: 8,
  background: "#f9fbfb",
};

const checkLabel: CSSProperties = {
  margin: 0,
  color: "#10212a",
  fontWeight: 800,
  fontSize: 13,
};

const checkDetail: CSSProperties = {
  margin: "3px 0 0",
  color: "#43545b",
  fontSize: 12,
  lineHeight: 1.45,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const chip: CSSProperties = {
  padding: "6px 8px",
  borderRadius: 6,
  background: "#edf4f5",
  border: "1px solid #c9dadd",
  color: "#283a40",
  fontSize: 12,
  lineHeight: 1.35,
};

const noticeBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  padding: 12,
  border: "1px solid #e6d2b5",
  borderRadius: 8,
  background: "#fffaf0",
};

const stateBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  maxWidth: 220,
  padding: "5px 8px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 800,
  lineHeight: 1.2,
  whiteSpace: "normal",
};

const reviewBadge: CSSProperties = {
  background: "#e8f4f0",
  color: "#174c3d",
  border: "1px solid #b8dacf",
};

const backendBadge: CSSProperties = {
  background: "#edf0fb",
  color: "#263b73",
  border: "1px solid #c3cbea",
};

const approvalStateBadge: CSSProperties = {
  background: "#fff3d4",
  color: "#6a4b0f",
  border: "1px solid #efd28f",
};

const blockedBadge: CSSProperties = {
  background: "#fae8e8",
  color: "#702121",
  border: "1px solid #e5b8b8",
};

const candidateBadge: CSSProperties = {
  background: "#eef1f7",
  color: "#2f3a51",
  border: "1px solid #cbd3df",
};

const dangerChip: CSSProperties = {
  ...chip,
  background: "#fff7ed",
  borderColor: "#efd3b3",
  color: "#663f14",
};

const continuityBand: CSSProperties = {
  ...panel,
  background: "#f8fbfb",
};

const diagnosticsDrawer: CSSProperties = {
  ...panel,
  background: "#fbfcfc",
};

const diagnosticsSummary: CSSProperties = {
  cursor: "pointer",
  color: "#10212a",
  fontWeight: 800,
};

const routeGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
};

const routeLink: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 12,
  borderRadius: 8,
  border: "1px solid #d5e0e3",
  background: "#ffffff",
  color: "#10212a",
  textDecoration: "none",
};

const routePhase: CSSProperties = {
  color: "#60737a",
  fontSize: 11,
  fontWeight: 800,
};

const routeLabel: CSSProperties = {
  color: "#10212a",
  fontSize: 13,
  fontWeight: 800,
};

const routeCommand: CSSProperties = {
  color: "#43545b",
  fontSize: 12,
};

const safeLink: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  padding: "9px 12px",
  borderRadius: 8,
  background: "#12313a",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 800,
};

