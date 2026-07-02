"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  VIDEO_REVIEW_AND_EXPORT_BOUNDARY_MODEL_FIELDS,
  buildVideoReviewAndExportBoundaryRouteModel,
  buildVideoReviewAndExportBoundaryStableKey,
  type VideoReviewAndExportBoundaryItem,
  type VideoReviewAndExportBoundaryRouteSlug,
  type VideoReviewAndExportBoundarySection,
  type VideoReviewAndExportBoundaryState,
} from "../video-review-and-export-boundary-model";

export function VideoReviewAndExportBoundaryPageClientShell({
  routeSlug,
}: {
  routeSlug: VideoReviewAndExportBoundaryRouteSlug;
}) {
  const model = buildVideoReviewAndExportBoundaryRouteModel(routeSlug);

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
      <VideoReviewAndExportBoundaryRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function VideoReviewAndExportBoundaryCockpitSummaryPanel() {
  const model = buildVideoReviewAndExportBoundaryRouteModel("cockpit-video-review-and-export-summary");
  const workspace = model.videoReviewAndExportBoundary;
  const cockpitCards: readonly { section: VideoReviewAndExportBoundarySection; stateLabel: string }[] = [
    { section: workspace.videoReviewPacketPreview, stateLabel: "Review packet" },
    { section: workspace.reviewDecisionChecklistPreview, stateLabel: "Decision checklist" },
    { section: workspace.rightsClearanceReviewPreview, stateLabel: "Rights" },
    { section: workspace.brandApprovalReviewPreview, stateLabel: "Brand" },
    { section: workspace.captionAndAudioReviewPreview, stateLabel: "Captions and audio" },
    { section: workspace.exportReadinessSummaryPreview, stateLabel: "Readiness" },
    { section: workspace.exportSettingsReviewPreview, stateLabel: "Settings" },
    { section: workspace.exportArtifactBlockedPreview, stateLabel: "Artifacts blocked" },
    { section: workspace.downloadBlockedPreview, stateLabel: "Download blocked" },
    { section: workspace.publishBlockedPreview, stateLabel: "Publish blocked" },
    { section: workspace.scheduleBlockedPreview, stateLabel: "Schedule blocked" },
    { section: workspace.revisionRequestPreview, stateLabel: "Revisions" },
  ];

  return (
    <section
      style={cockpitPanel}
      aria-label="Video Review And Export Boundary"
      data-codexforge-video-review-and-export-boundary={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Video Review And Export Boundary</span>
          <span style={surfaceBadge}>Creative Workspace</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        <h2 style={title}>Video Review And Export Boundary</h2>
        <p style={summary}>
          Review-only video review and export boundary. Synthetic data only. The cockpit now shows video review packet,
          review decision checklist, rights clearance, brand approval, caption and audio review, export readiness,
          export settings, export artifact blocked, download blocked, publish blocked, schedule blocked, revision
          request, and denied paths as planning-only content.
        </p>
        <p style={bodyText}>
          No export controls, download controls, upload controls, publish controls, schedule controls, render controls,
          artifact controls, provider controls, model controls, connector controls, prompt sending controls, approval
          persistence controls, revision persistence controls, or hidden execution affordances are present.
        </p>
        <p style={bodyText}>
          No export from the cockpit, no download from the cockpit, no upload from the cockpit, no publishing from the
          cockpit, no scheduling from the cockpit, no rendering from the cockpit, no render queue creation from the
          cockpit, no worker dispatch from the cockpit, no artifact creation from the cockpit, no artifact persistence
          from the cockpit, no frontend export persistence, no frontend revision persistence, no frontend approval
          persistence, no frontend artifact persistence, no frontend caption persistence, no frontend transcript
          persistence, no frontend audio persistence, no frontend asset persistence, no frontend rights persistence, no
          frontend prompt persistence, no frontend job persistence, no provider calls from the cockpit, no model calls
          from the cockpit, no connector calls from the cockpit, and no prompt sending from the cockpit.
        </p>
      </header>

      <section style={statusBand} aria-label="Video review and export status">
        <span style={stateStyle("review-only")}>Review-only video review and export boundary</span>
        <span style={stateStyle("synthetic-only")}>Synthetic data only</span>
        <span style={stateStyle("backend-owned")}>Backend-owned workflows required</span>
        <span style={stateStyle("blocked")}>Export, download, publish, schedule, render, and artifact paths blocked</span>
        <span style={stateStyle("needs-approval")}>Explicit operator approval required</span>
      </section>

      <section style={summaryGrid} aria-label="Video review and export cockpit summary">
        {workspace.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildVideoReviewAndExportBoundaryStableKey(["video-review-export-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Video review and export blocked state">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Export Artifact Blocked</p>
              <h3 style={sectionTitle}>Artifacts, downloads, and exports stay backend-owned</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <p style={bodyText}>
            Simulated status only: artifact creation, artifact persistence, media storage, export, download, upload, and
            browser storage writes remain blocked from the cockpit.
          </p>
        </article>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Publish And Schedule Blocked</p>
              <h3 style={sectionTitle}>Release channels require backend approval</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <p style={bodyText}>
            No publishing, social posting, scheduling, connector call, provider call, prompt sending, approval
            persistence, or job persistence controls are present in the cockpit.
          </p>
        </article>
      </section>

      <section style={sectionGrid} aria-label="Video review and export workflow surface">
        {cockpitCards.map((card, index) => (
          <SummaryCard
            key={buildVideoReviewAndExportBoundaryStableKey([
              "video-review-export-card",
              String(index),
              card.section.sectionId,
            ])}
            section={card.section}
            stateLabel={card.stateLabel}
          />
        ))}
      </section>

      <section style={noticeBand} aria-label="Video review and export safety limits">
        {workspace.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildVideoReviewAndExportBoundaryStableKey(["video-review-export-limit", String(index), limit])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>

      <details style={diagnosticsDrawer}>
        <summary style={diagnosticsSummary}>Developer Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Diagnostic links stay secondary to the normal cockpit surface
          and do not expose export, download, upload, publish, schedule, render, artifact, provider, model, connector,
          prompt sending, persistence, or file mutation controls.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildVideoReviewAndExportBoundaryStableKey([
                "video-review-export-diagnostic-link",
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

      <a style={safeLink} href="/controlled-video-review-and-export-boundary-release-candidate">
        Review Controlled Video Review And Export Boundary Release Candidate
      </a>
    </section>
  );
}

export function VideoReviewAndExportBoundaryRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: VideoReviewAndExportBoundaryRouteSlug;
  embedded?: boolean;
}) {
  const model = buildVideoReviewAndExportBoundaryRouteModel(routeSlug);
  const workspace = model.videoReviewAndExportBoundary;
  const titleText = embedded ? "Video Review And Export Boundary" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-video-review-and-export-boundary-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Video Review And Export Boundary" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Video Review And Export Boundary v1 is review-only and synthetic-only from the frontend. This is not export,
          download, upload, publishing, scheduling, rendering, render queue creation, worker dispatch, artifact creation,
          artifact persistence, provider execution, model execution, connector execution, prompt sending, approval
          persistence, revision persistence, caption persistence, transcript persistence, audio persistence, asset
          persistence, rights persistence, prompt persistence, job persistence, or file mutation.
        </p>
        <p style={bodyText}>
          Backend-owned export workflow remains required. Backend-owned render workflow remains required. Backend-owned
          artifact workflow remains required. Backend-owned publish workflow remains required. Backend-owned approval
          workflow remains required. Backend-owned rights review remains required. Backend-owned caption workflow remains
          required. Backend-owned asset storage remains required. Operator review remains required. Explicit operator
          approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Video review and export page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildVideoReviewAndExportBoundaryStableKey([
              "video-review-export-route-marker",
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

      <section style={identityBand} aria-label="Video review and export model fields">
        <div>
          <p style={panelEyebrow}>Video review and export boundary model</p>
          <h2 style={sectionTitle}>videoReviewAndExportBoundaryId: {workspace.videoReviewAndExportBoundaryId}</h2>
        </div>
        <p style={bodyText}>videoReviewAndExportBoundaryKind: {workspace.videoReviewAndExportBoundaryKind}</p>
        <div style={chipRow}>
          {VIDEO_REVIEW_AND_EXPORT_BOUNDARY_MODEL_FIELDS.map((field, index) => (
            <span
              key={buildVideoReviewAndExportBoundaryStableKey(["video-review-export-field", String(index), field])}
              style={chip}
            >
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={sectionGrid} aria-label="Video review and export route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildVideoReviewAndExportBoundaryStableKey([
              "video-review-export-section",
              model.route.slug,
              String(index),
              section.sectionId,
            ])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Video review and export summary and safety limits">
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
                key={buildVideoReviewAndExportBoundaryStableKey([
                  "video-review-export-route-summary",
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
                key={buildVideoReviewAndExportBoundaryStableKey([
                  "video-review-export-route-limit",
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

      <section style={continuityBand} aria-label="Video review and export continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Controlled release candidate</p>
            <h2 style={sectionTitle}>Review-only video review and export boundary</h2>
          </div>
          <span style={stateStyle("blocked")}>No export, download, upload, publish, schedule, render, or artifacts</span>
        </div>
        <p style={bodyText}>
          {model.summary} Release candidate adds the Video Review And Export Boundary as a review-only planning
          workspace without frontend export, download, upload, publish, schedule, render, artifact creation, provider
          calls, model calls, connector calls, prompt sending, persistence, or file mutation.
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
  section: VideoReviewAndExportBoundarySection;
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

function SectionCard({ section }: { section: VideoReviewAndExportBoundarySection }) {
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
            key={buildVideoReviewAndExportBoundaryStableKey([
              "video-review-export-check",
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
            key={buildVideoReviewAndExportBoundaryStableKey([
              "video-review-export-safety-note",
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
            key={buildVideoReviewAndExportBoundaryStableKey([
              "video-review-export-list",
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

function CheckRow({ item }: { item: VideoReviewAndExportBoundaryItem }) {
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

function formatState(state: VideoReviewAndExportBoundaryState): string {
  if (state === "review-only") return "Review only";
  if (state === "synthetic-only") return "Synthetic";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Blocked";
}

function stateStyle(state: VideoReviewAndExportBoundaryState): CSSProperties {
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
