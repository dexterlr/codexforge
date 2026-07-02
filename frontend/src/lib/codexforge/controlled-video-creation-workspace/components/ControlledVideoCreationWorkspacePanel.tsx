"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  CONTROLLED_VIDEO_CREATION_WORKSPACE_MODEL_FIELDS,
  buildControlledVideoCreationWorkspaceRouteModel,
  buildControlledVideoCreationWorkspaceStableKey,
  type ControlledVideoCreationWorkspaceItem,
  type ControlledVideoCreationWorkspaceRouteSlug,
  type ControlledVideoCreationWorkspaceSection,
  type ControlledVideoCreationWorkspaceState,
} from "../controlled-video-creation-workspace-model";

export function ControlledVideoCreationWorkspacePageClientShell({
  routeSlug,
}: {
  routeSlug: ControlledVideoCreationWorkspaceRouteSlug;
}) {
  const model = buildControlledVideoCreationWorkspaceRouteModel(routeSlug);

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
      <ControlledVideoCreationWorkspaceRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ControlledVideoCreationWorkspaceCockpitSummaryPanel() {
  const model = buildControlledVideoCreationWorkspaceRouteModel("cockpit-controlled-video-creation-workspace-summary");
  const workspace = model.controlledVideoCreationWorkspace;
  const cockpitCards: readonly { section: ControlledVideoCreationWorkspaceSection; stateLabel: string }[] = [
    { section: workspace.videoWorkspaceReleaseMap, stateLabel: "Release map" },
    { section: workspace.videoWorkspaceSafeStateOverview, stateLabel: "Safe state" },
    { section: workspace.videoScriptLaneSummary, stateLabel: "Script lane" },
    { section: workspace.videoAssetLaneSummary, stateLabel: "Asset lane" },
    { section: workspace.videoAudioCaptionLaneSummary, stateLabel: "Audio and captions" },
    { section: workspace.videoRenderLaneSummary, stateLabel: "Render lane" },
    { section: workspace.videoReviewExportLaneSummary, stateLabel: "Review and export" },
    { section: workspace.videoBackendPrerequisiteLane, stateLabel: "Backend prerequisites" },
    { section: workspace.videoBlockedActionLane, stateLabel: "Blocked actions" },
    { section: workspace.videoOperatorReleaseChecklist, stateLabel: "Operator checklist" },
    { section: workspace.videoReleaseReadinessPacket, stateLabel: "Readiness packet" },
    { section: workspace.noHiddenGenerationBoundary, stateLabel: "No hidden generation" },
  ];

  return (
    <section
      style={cockpitPanel}
      aria-label="Controlled Video Creation Workspace"
      data-codexforge-controlled-video-creation-workspace={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Controlled Video Creation Workspace</span>
          <span style={surfaceBadge}>Creative Workspace</span>
          <span style={approvalBadge}>Release candidate</span>
        </div>
        <h2 style={title}>Controlled Video Creation Workspace</h2>
        <p style={summary}>
          Review-only controlled video creation workspace. Synthetic data only. This final video RC summary ties together
          the release map, safe state overview, script lane, asset lane, audio and caption lane, render lane, review and
          export lane, backend prerequisites, blocked actions, operator release checklist, release readiness packet, no
          hidden generation boundary, and denied paths.
        </p>
        <p style={bodyText}>
          No generation buttons, prompt buttons, provider buttons, model buttons, connector buttons, render buttons,
          queue buttons, worker buttons, artifact buttons, export buttons, download buttons, upload buttons, publish
          buttons, schedule buttons, or hidden execution affordances are present.
        </p>
        <p style={bodyText}>
          No video generation from the cockpit, no image generation from the cockpit, no voice generation from the
          cockpit, no final script generation from the cockpit, no provider calls from the cockpit, no model calls from
          the cockpit, no connector calls from the cockpit, no prompt sending from the cockpit, no video rendering from
          the cockpit, no render queue creation from the cockpit, no worker dispatch from the cockpit, no artifact
          creation from the cockpit, no artifact persistence from the cockpit, no video export from the cockpit, no file
          download from the cockpit, no file upload from the cockpit, no publishing from the cockpit, no social posting
          from the cockpit, and no scheduling from the cockpit.
        </p>
      </header>

      <section style={statusBand} aria-label="Controlled video creation workspace status">
        <span style={stateStyle("review-only")}>Review-only controlled video creation workspace</span>
        <span style={stateStyle("synthetic-only")}>Synthetic data only</span>
        <span style={stateStyle("blocked")}>Generation, render, export, publish, and persistence paths blocked</span>
        <span style={stateStyle("backend-owned")}>Backend-owned services required</span>
        <span style={stateStyle("needs-approval")}>Explicit operator approval required</span>
      </section>

      <section style={summaryGrid} aria-label="Controlled video creation cockpit summary">
        {workspace.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildControlledVideoCreationWorkspaceStableKey([
              "controlled-video-creation-summary",
              String(index),
              item.id,
            ])}
            item={item}
          />
        ))}
      </section>

      <section style={sectionGrid} aria-label="Controlled video creation workspace lanes">
        {cockpitCards.map((card, index) => (
          <SummaryCard
            key={buildControlledVideoCreationWorkspaceStableKey([
              "controlled-video-creation-card",
              String(index),
              card.section.sectionId,
            ])}
            section={card.section}
            stateLabel={card.stateLabel}
          />
        ))}
      </section>

      <section style={noticeBand} aria-label="Controlled video creation workspace safety limits">
        {workspace.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildControlledVideoCreationWorkspaceStableKey(["controlled-video-creation-limit", String(index), limit])}
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
          do not expose generation, prompt sending, provider, model, connector, render, queue, worker, artifact, export,
          download, upload, publish, schedule, persistence, or file mutation controls.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildControlledVideoCreationWorkspaceStableKey([
                "controlled-video-creation-diagnostic-link",
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

      <a style={safeLink} href="/controlled-video-creation-workspace-release-candidate">
        Review Controlled Video Creation Workspace Release Candidate
      </a>
    </section>
  );
}

export function ControlledVideoCreationWorkspaceRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ControlledVideoCreationWorkspaceRouteSlug;
  embedded?: boolean;
}) {
  const model = buildControlledVideoCreationWorkspaceRouteModel(routeSlug);
  const workspace = model.controlledVideoCreationWorkspace;
  const titleText = embedded ? "Controlled Video Creation Workspace" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-controlled-video-creation-workspace-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Controlled Video Creation Workspace" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Controlled Video Creation Workspace Release Candidate is review-only and synthetic-only from the frontend. This
          is not video generation, image generation, voice generation, final script generation, provider execution, model
          execution, connector execution, prompt sending, video rendering, render queue creation, worker dispatch,
          artifact creation, video export, file download, file upload, publishing, scheduling, frontend persistence, or
          file mutation.
        </p>
        <p style={bodyText}>
          Backend-owned asset storage remains required. Backend-owned audio storage remains required. Backend-owned
          render service remains required. Backend-owned export service remains required. Backend-owned provider gateway
          remains required. Backend-owned rights review remains required. Backend-owned consent review remains required.
          Backend-owned approval capture remains required. Backend-owned script persistence remains required.
          Backend-owned storyboard persistence remains required. Backend-owned caption persistence remains required.
          Backend-owned render queue remains required. Backend-owned worker orchestration remains required. Backend-owned
          artifact storage remains required. Backend-owned publish gateway remains required. Operator review remains
          required. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Controlled video creation workspace page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildControlledVideoCreationWorkspaceStableKey([
              "controlled-video-creation-route-marker",
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

      <section style={identityBand} aria-label="Controlled video creation workspace model fields">
        <div>
          <p style={panelEyebrow}>Controlled video creation workspace model</p>
          <h2 style={sectionTitle}>
            controlledVideoCreationWorkspaceId: {workspace.controlledVideoCreationWorkspaceId}
          </h2>
        </div>
        <p style={bodyText}>
          controlledVideoCreationWorkspaceKind: {workspace.controlledVideoCreationWorkspaceKind}
        </p>
        <div style={chipRow}>
          {CONTROLLED_VIDEO_CREATION_WORKSPACE_MODEL_FIELDS.map((field, index) => (
            <span
              key={buildControlledVideoCreationWorkspaceStableKey([
                "controlled-video-creation-field",
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

      <section style={sectionGrid} aria-label="Controlled video creation workspace route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildControlledVideoCreationWorkspaceStableKey([
              "controlled-video-creation-section",
              model.route.slug,
              String(index),
              section.sectionId,
            ])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Controlled video creation workspace summary and safety limits">
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
                key={buildControlledVideoCreationWorkspaceStableKey([
                  "controlled-video-creation-route-summary",
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
                key={buildControlledVideoCreationWorkspaceStableKey([
                  "controlled-video-creation-route-limit",
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

      <section style={continuityBand} aria-label="Controlled video creation workspace continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Controlled release candidate</p>
            <h2 style={sectionTitle}>Review-only controlled video creation workspace</h2>
          </div>
          <span style={stateStyle("blocked")}>No generation, rendering, export, publishing, or persistence</span>
        </div>
        <p style={bodyText}>
          {model.summary} Release candidate completes the Video Creation Domain Pack as a review-only planning workspace
          without frontend generation, prompt sending, provider calls, rendering, queue creation, worker dispatch,
          artifact persistence, export, download, upload, publishing, scheduling, media persistence, rights persistence,
          prompt persistence, job persistence, approval persistence, or file mutation.
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
  section: ControlledVideoCreationWorkspaceSection;
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

function SectionCard({ section }: { section: ControlledVideoCreationWorkspaceSection }) {
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
            key={buildControlledVideoCreationWorkspaceStableKey([
              "controlled-video-creation-check",
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
            key={buildControlledVideoCreationWorkspaceStableKey([
              "controlled-video-creation-safety-note",
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
            key={buildControlledVideoCreationWorkspaceStableKey([
              "controlled-video-creation-list",
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

function CheckRow({ item }: { item: ControlledVideoCreationWorkspaceItem }) {
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

function formatState(state: ControlledVideoCreationWorkspaceState): string {
  if (state === "review-only") return "Review only";
  if (state === "synthetic-only") return "Synthetic";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Blocked";
}

function stateStyle(state: ControlledVideoCreationWorkspaceState): CSSProperties {
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
  maxWidth: 240,
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

