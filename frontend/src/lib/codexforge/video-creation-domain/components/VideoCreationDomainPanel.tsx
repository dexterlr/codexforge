"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  VIDEO_CREATION_DOMAIN_MODEL_FIELDS,
  buildVideoCreationDomainRouteModel,
  buildVideoCreationDomainStableKey,
  type VideoCreationDomainItem,
  type VideoCreationDomainRouteSlug,
  type VideoCreationDomainSection,
  type VideoCreationDomainState,
} from "../video-creation-domain-model";

export function VideoCreationDomainPageClientShell({
  routeSlug,
}: {
  routeSlug: VideoCreationDomainRouteSlug;
}) {
  const model = buildVideoCreationDomainRouteModel(routeSlug);

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
      <VideoCreationDomainRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function VideoCreationDomainCockpitSummaryPanel() {
  const model = buildVideoCreationDomainRouteModel("cockpit-video-creation-domain-summary");
  const workspace = model.videoCreationDomain;
  const cockpitCards: readonly { section: VideoCreationDomainSection; stateLabel: string }[] = [
    { section: workspace.videoWorkspaceIntake, stateLabel: "Workspace intake" },
    { section: workspace.videoProjectBrief, stateLabel: "Project brief" },
    { section: workspace.videoAudienceAndGoal, stateLabel: "Audience and goal" },
    { section: workspace.videoFormatBoundary, stateLabel: "Format boundary" },
    { section: workspace.videoSafetyAndRightsBoundary, stateLabel: "Safety and rights" },
    { section: workspace.videoAssetPlanningBoundary, stateLabel: "Asset planning" },
    { section: workspace.videoScriptPlanningBoundary, stateLabel: "Script planning" },
    { section: workspace.videoStoryboardPlanningBoundary, stateLabel: "Storyboard planning" },
    { section: workspace.videoVoiceoverPlanningBoundary, stateLabel: "Voiceover planning" },
    { section: workspace.videoCaptionPlanningBoundary, stateLabel: "Caption planning" },
    { section: workspace.videoRenderJobBlockedBoundary, stateLabel: "Render blocked" },
    { section: workspace.videoExportBlockedBoundary, stateLabel: "Export blocked" },
  ];

  return (
    <section
      style={cockpitPanel}
      aria-label="Video Creation Domain"
      data-codexforge-video-creation-domain={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Video Creation Domain</span>
          <span style={surfaceBadge}>Creative Workspace</span>
          <span style={approvalBadge}>Planning only</span>
        </div>
        <h2 style={title}>Video Creation Domain Boundary</h2>
        <p style={summary}>
          Review-only video creation domain. Synthetic data only. The cockpit now shows workspace intake, project brief,
          audience and goal, format boundary, safety and rights, asset planning, script planning, storyboard planning,
          voiceover planning, caption planning, render job blocked, export blocked, and denied video creation paths as
          planning-only content. No video rendering from the cockpit, no video export from the cockpit, no asset upload
          from the cockpit, no asset download from the cockpit, no file generation from the cockpit, no frontend file
          mutation, no frontend asset persistence, no frontend approval persistence, no frontend prompt persistence, no
          frontend job persistence, no provider calls from the cockpit, no model calls from the cockpit, no connector
          calls from the cockpit, no image generation calls from the cockpit, no video generation calls from the cockpit,
          no voice generation calls from the cockpit, no publishing from the cockpit, no social posting from the cockpit,
          no scheduling from the cockpit, no copyright clearance from the cockpit, no automated brand approval from the
          cockpit, and no performance guarantees.
        </p>
      </header>

      <section style={statusBand} aria-label="Video creation domain status">
        <span style={stateStyle("review-only")}>Review-only video creation domain</span>
        <span style={stateStyle("synthetic-only")}>Synthetic data only</span>
        <span style={stateStyle("backend-owned")}>Backend-owned services required</span>
        <span style={stateStyle("blocked")}>Render and export blocked</span>
        <span style={stateStyle("needs-approval")}>Explicit operator approval required</span>
      </section>

      <section style={summaryGrid} aria-label="Video creation cockpit summary">
        {workspace.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildVideoCreationDomainStableKey(["video-creation-domain-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Video render and export blocked state">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Video Render Job Blocked Boundary</p>
              <h3 style={sectionTitle}>Render jobs stay backend-owned</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <p style={bodyText}>
            Simulated status only: frontend render queues, frontend worker dispatch, frontend provider calls, frontend
            file writes, frontend export jobs, and frontend artifact persistence remain blocked.
          </p>
        </article>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Video Export Blocked Boundary</p>
              <h3 style={sectionTitle}>Export and posting actions stay blocked</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <p style={bodyText}>
            No export controls, upload controls, download controls, publishing controls, social posting controls, or
            scheduling controls are present in the cockpit.
          </p>
        </article>
      </section>

      <section style={sectionGrid} aria-label="Video creation planning cards">
        {cockpitCards.map((card, index) => (
          <SummaryCard
            key={buildVideoCreationDomainStableKey(["video-creation-domain-card", String(index), card.section.sectionId])}
            section={card.section}
            stateLabel={card.stateLabel}
          />
        ))}
      </section>

      <section style={noticeBand} aria-label="Video creation safety limits">
        {workspace.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildVideoCreationDomainStableKey(["video-creation-domain-limit", String(index), limit])}
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
          do not expose rendering, export, upload, download, provider, model, connector, publishing, scheduling,
          persistence, or file mutation controls.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildVideoCreationDomainStableKey(["video-creation-domain-diagnostic-link", String(index), route.slug])}
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

      <a style={safeLink} href="/controlled-video-creation-domain-boundary-release-candidate">
        Review Controlled Video Creation Domain Boundary Release Candidate
      </a>
    </section>
  );
}

export function VideoCreationDomainRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: VideoCreationDomainRouteSlug;
  embedded?: boolean;
}) {
  const model = buildVideoCreationDomainRouteModel(routeSlug);
  const workspace = model.videoCreationDomain;
  const titleText = embedded ? "Video Creation Domain" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-video-creation-domain-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Video Creation Domain" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Planning only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Video Creation Domain v1 is review-only and planning-only from the frontend. This is not video rendering,
          video export, asset upload, asset download, file generation, provider execution, model execution, connector
          execution, prompt sending, image generation, video generation, voice generation, publishing, social posting,
          scheduling, copyright clearance, automated brand approval, frontend asset persistence, frontend prompt
          persistence, frontend job persistence, frontend approval persistence, or performance guarantee.
        </p>
        <p style={bodyText}>
          Backend-owned asset storage remains required. Backend-owned render service remains required. Backend-owned
          export service remains required. Backend-owned provider gateway remains required. Backend-owned rights review
          remains required. Backend-owned approval capture remains required. Operator review remains required. Explicit
          operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Video creation domain page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildVideoCreationDomainStableKey(["video-creation-domain-route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Video creation domain model fields">
        <div>
          <p style={panelEyebrow}>Video creation domain model</p>
          <h2 style={sectionTitle}>videoCreationDomainId: {workspace.videoCreationDomainId}</h2>
        </div>
        <p style={bodyText}>videoCreationDomainKind: {workspace.videoCreationDomainKind}</p>
        <div style={chipRow}>
          {VIDEO_CREATION_DOMAIN_MODEL_FIELDS.map((field, index) => (
            <span
              key={buildVideoCreationDomainStableKey(["video-creation-domain-field", String(index), field])}
              style={chip}
            >
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={sectionGrid} aria-label="Video creation domain route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildVideoCreationDomainStableKey(["video-creation-domain-section", model.route.slug, String(index), section.sectionId])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Video creation domain summary and safety limits">
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
                key={buildVideoCreationDomainStableKey(["video-creation-domain-route-summary", String(index), item.id])}
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
                key={buildVideoCreationDomainStableKey(["video-creation-domain-route-limit", String(index), limit])}
                style={dangerChip}
              >
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={continuityBand} aria-label="Video creation domain continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Controlled release candidate</p>
            <h2 style={sectionTitle}>Planning workspace only</h2>
          </div>
          <span style={stateStyle("blocked")}>No rendering or export</span>
        </div>
        <p style={bodyText}>
          {model.summary} Release candidate starts the Video Creation Domain Pack as a review-only planning workspace
          without frontend rendering, export, provider calls, model calls, asset persistence, prompt persistence, job
          persistence, approval persistence, publishing, scheduling, or file mutation.
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
  section: VideoCreationDomainSection;
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

function SectionCard({ section }: { section: VideoCreationDomainSection }) {
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
            key={buildVideoCreationDomainStableKey(["video-creation-domain-check", section.sectionId, String(index), item.id])}
            item={item}
          />
        ))}
      </div>
      <div style={chipRow}>
        {section.safetyNotes.map((note, index) => (
          <span
            key={buildVideoCreationDomainStableKey(["video-creation-domain-safety-note", section.sectionId, String(index), note])}
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
            key={buildVideoCreationDomainStableKey(["video-creation-domain-list", title, String(index), value])}
            style={chip}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function CheckRow({ item }: { item: VideoCreationDomainItem }) {
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

function formatState(state: VideoCreationDomainState): string {
  if (state === "review-only") return "Review only";
  if (state === "synthetic-only") return "Synthetic";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Blocked";
}

function stateStyle(state: VideoCreationDomainState): CSSProperties {
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
  border: "1px solid #bed1d4",
  borderRadius: 8,
  background: "#f6f8f8",
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
  color: "#5f6f75",
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
};

const sectionTitle: CSSProperties = {
  margin: 0,
  color: "#17272d",
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
  border: "1px solid #d7e4e6",
  borderRadius: 8,
  background: "#fbfdfd",
};

const checkLabel: CSSProperties = {
  margin: 0,
  color: "#17272d",
  fontSize: 14,
  fontWeight: 700,
};

const checkDetail: CSSProperties = {
  margin: "3px 0 0",
  color: "#4d5e64",
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
  border: "1px solid #d7e4e6",
  borderRadius: 6,
  background: "#f8fbfb",
  color: "#32434a",
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
  border: "1px solid #d7e4e6",
  borderRadius: 8,
  background: "#ffffff",
};

const diagnosticsSummary: CSSProperties = {
  cursor: "pointer",
  color: "#17272d",
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
  border: "1px solid #d7e4e6",
  borderRadius: 8,
  background: "#fbfdfd",
  color: "#17272d",
  textDecoration: "none",
};

const routePhase: CSSProperties = {
  color: "#66767c",
  fontSize: 12,
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  color: "#17272d",
  fontSize: 14,
  fontWeight: 800,
};

const routeCommand: CSSProperties = {
  color: "#53646a",
  fontSize: 12,
};

const safeLink: CSSProperties = {
  display: "inline-flex",
  alignSelf: "flex-start",
  padding: "9px 12px",
  borderRadius: 6,
  background: "#12313a",
  color: "#f7fbfc",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 800,
};

const continuityBand: CSSProperties = {
  ...panel,
  background: "#f8fbfb",
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
  background: "#e6f2f4",
  color: "#1c3e47",
};
