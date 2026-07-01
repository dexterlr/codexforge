"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_MODEL_FIELDS,
  buildVoiceoverAndCaptionPlanningWorkspaceRouteModel,
  buildVoiceoverAndCaptionPlanningWorkspaceStableKey,
  type VoiceoverAndCaptionPlanningWorkspaceItem,
  type VoiceoverAndCaptionPlanningWorkspaceRouteSlug,
  type VoiceoverAndCaptionPlanningWorkspaceSection,
  type VoiceoverAndCaptionPlanningWorkspaceState,
} from "../voiceover-and-caption-planning-workspace-model";

export function VoiceoverAndCaptionPlanningWorkspacePageClientShell({
  routeSlug,
}: {
  routeSlug: VoiceoverAndCaptionPlanningWorkspaceRouteSlug;
}) {
  const model = buildVoiceoverAndCaptionPlanningWorkspaceRouteModel(routeSlug);

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
      <VoiceoverAndCaptionPlanningWorkspaceRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function VoiceoverAndCaptionPlanningWorkspaceCockpitSummaryPanel() {
  const model = buildVoiceoverAndCaptionPlanningWorkspaceRouteModel(
    "cockpit-voiceover-and-caption-planning-summary"
  );
  const workspace = model.voiceoverAndCaptionPlanningWorkspace;
  const cockpitCards: readonly { section: VoiceoverAndCaptionPlanningWorkspaceSection; stateLabel: string }[] = [
    { section: workspace.narrationBrief, stateLabel: "Narration" },
    { section: workspace.voiceToneAndPace, stateLabel: "Tone and pace" },
    { section: workspace.voiceConsentAndRights, stateLabel: "Consent and rights" },
    { section: workspace.audioCuePlanning, stateLabel: "Audio cues" },
    { section: workspace.captionStyleGuide, stateLabel: "Caption style" },
    { section: workspace.subtitleTimingPlan, stateLabel: "Subtitle timing" },
    { section: workspace.lowerThirdAndSupersPlan, stateLabel: "Lower thirds" },
    { section: workspace.accessibilityCaptionNote, stateLabel: "Accessibility" },
    { section: workspace.transcriptReviewLane, stateLabel: "Transcript review" },
    { section: workspace.audioCaptionBlockerMap, stateLabel: "Blockers" },
    { section: workspace.voiceGenerationBlockedBoundary, stateLabel: "Voice blocked" },
    { section: workspace.captionExportBlockedBoundary, stateLabel: "Caption export blocked" },
  ];

  return (
    <section
      style={cockpitPanel}
      aria-label="Voiceover And Caption Planning Workspace"
      data-codexforge-voiceover-and-caption-planning-workspace={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Voiceover And Caption Planning Workspace</span>
          <span style={surfaceBadge}>Creative Workspace</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        <h2 style={title}>Voiceover And Caption Planning Workspace</h2>
        <p style={summary}>
          Review-only voiceover and caption planning workspace. Synthetic data only. The cockpit now shows narration
          brief, voice tone and pace, consent and rights, audio cues, caption style guide, subtitle timing plan, lower
          thirds and supers, accessibility caption notes, transcript review lane, audio caption blockers, voice
          generation blocked boundary, caption export blocked boundary, and denied paths as planning-only content.
        </p>
        <p style={bodyText}>
          No voice generation buttons, voice cloning buttons, audio synthesis buttons, transcription buttons, caption
          export buttons, render buttons, export buttons, upload controls, download controls, provider controls, model
          controls, connector controls, publishing controls, scheduling controls, or hidden execution affordances are
          present.
        </p>
        <p style={bodyText}>
          No voice generation from the cockpit, no voice cloning from the cockpit, no audio synthesis from the cockpit,
          no transcription from the cockpit, no caption export from the cockpit, no subtitle file generation from the
          cockpit, no audio upload from the cockpit, no audio download from the cockpit, no video rendering from the
          cockpit, no video export from the cockpit, no file generation from the cockpit, no frontend file mutation, no
          frontend voice persistence, no frontend caption persistence, no frontend transcript persistence, no frontend
          audio persistence, no frontend asset persistence, no frontend rights persistence, no frontend approval
          persistence, no frontend prompt persistence, no frontend job persistence, no provider calls from the cockpit,
          no model calls from the cockpit, no connector calls from the cockpit, no image generation calls from the
          cockpit, no video generation calls from the cockpit, no voice generation calls from the cockpit, no publishing
          from the cockpit, no social posting from the cockpit, no scheduling from the cockpit, no copyright clearance
          from the cockpit, no consent clearance from the cockpit, no automated brand approval from the cockpit, and no
          performance guarantees.
        </p>
      </header>

      <section style={statusBand} aria-label="Voiceover and caption planning workspace status">
        <span style={stateStyle("review-only")}>Review-only voiceover and caption planning workspace</span>
        <span style={stateStyle("synthetic-only")}>Synthetic data only</span>
        <span style={stateStyle("backend-owned")}>Backend-owned audio and caption workflows required</span>
        <span style={stateStyle("blocked")}>Voice generation and caption export blocked</span>
        <span style={stateStyle("needs-approval")}>Explicit operator approval required</span>
      </section>

      <section style={summaryGrid} aria-label="Voiceover and caption cockpit summary">
        {workspace.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
              "voiceover-and-caption-summary",
              String(index),
              item.id,
            ])}
            item={item}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Voiceover and caption blocked state">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Voice Generation Blocked Boundary</p>
              <h3 style={sectionTitle}>Voice synthesis stays backend-owned and approval-gated</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <p style={bodyText}>
            Simulated status only: frontend voice cloning, frontend audio synthesis, frontend provider calls, frontend
            model calls, frontend prompt sending, frontend audio persistence, and frontend consent persistence remain
            blocked.
          </p>
        </article>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Caption Export Blocked Boundary</p>
              <h3 style={sectionTitle}>Caption files and subtitle export stay backend-owned</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <p style={bodyText}>
            No subtitle export, caption file write, transcription, download, upload, artifact creation, publishing, or
            scheduling controls are present in the cockpit.
          </p>
        </article>
      </section>

      <section style={sectionGrid} aria-label="Voiceover and caption planning cards">
        {cockpitCards.map((card, index) => (
          <SummaryCard
            key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
              "voiceover-and-caption-card",
              String(index),
              card.section.sectionId,
            ])}
            section={card.section}
            stateLabel={card.stateLabel}
          />
        ))}
      </section>

      <section style={noticeBand} aria-label="Voiceover and caption planning safety limits">
        {workspace.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
              "voiceover-and-caption-limit",
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
          do not expose voice generation, voice cloning, transcription, caption export, audio upload, audio download,
          rendering, export, provider, model, connector, publishing, scheduling, persistence, or file mutation controls.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
                "voiceover-and-caption-diagnostic-link",
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

      <a style={safeLink} href="/controlled-voiceover-and-caption-planning-workspace-release-candidate">
        Review Controlled Voiceover And Caption Planning Workspace Release Candidate
      </a>
    </section>
  );
}

export function VoiceoverAndCaptionPlanningWorkspaceRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: VoiceoverAndCaptionPlanningWorkspaceRouteSlug;
  embedded?: boolean;
}) {
  const model = buildVoiceoverAndCaptionPlanningWorkspaceRouteModel(routeSlug);
  const workspace = model.voiceoverAndCaptionPlanningWorkspace;
  const titleText = embedded ? "Voiceover And Caption Planning Workspace" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-voiceover-and-caption-planning-workspace-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Voiceover And Caption Planning Workspace" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span>
          <span style={approvalBadge}>Review only</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Voiceover And Caption Planning Workspace v1 is review-only and synthetic-only from the frontend. This is not
          voice generation, voice cloning, audio synthesis, transcription, caption export, subtitle file generation,
          video rendering, video export, asset upload, asset download, provider execution, model execution, connector
          execution, prompt sending, publishing, scheduling, copyright clearance, consent clearance, automated brand
          approval, frontend voice persistence, frontend caption persistence, frontend transcript persistence, frontend
          audio persistence, frontend rights persistence, frontend prompt persistence, frontend job persistence, frontend
          approval persistence, or performance guarantee.
        </p>
        <p style={bodyText}>
          Backend-owned asset storage remains required. Backend-owned audio storage remains required. Backend-owned render
          service remains required. Backend-owned export service remains required. Backend-owned provider gateway remains
          required. Backend-owned rights review remains required. Backend-owned consent review remains required.
          Backend-owned approval capture remains required. Backend-owned script persistence remains required.
          Backend-owned storyboard persistence remains required. Backend-owned caption persistence remains required.
          Operator review remains required. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Voiceover and caption planning workspace page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
              "voiceover-and-caption-route-marker",
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

      <section style={identityBand} aria-label="Voiceover and caption planning workspace model fields">
        <div>
          <p style={panelEyebrow}>Voiceover and caption planning workspace model</p>
          <h2 style={sectionTitle}>
            voiceoverAndCaptionPlanningWorkspaceId: {workspace.voiceoverAndCaptionPlanningWorkspaceId}
          </h2>
        </div>
        <p style={bodyText}>
          voiceoverAndCaptionPlanningWorkspaceKind: {workspace.voiceoverAndCaptionPlanningWorkspaceKind}
        </p>
        <div style={chipRow}>
          {VOICEOVER_AND_CAPTION_PLANNING_WORKSPACE_MODEL_FIELDS.map((field, index) => (
            <span
              key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
                "voiceover-and-caption-field",
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

      <section style={sectionGrid} aria-label="Voiceover and caption planning workspace route sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
              "voiceover-and-caption-section",
              model.route.slug,
              String(index),
              section.sectionId,
            ])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Voiceover and caption planning workspace summary and safety limits">
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
                key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
                  "voiceover-and-caption-route-summary",
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
                key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
                  "voiceover-and-caption-route-limit",
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

      <section style={continuityBand} aria-label="Voiceover and caption planning workspace continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Controlled release candidate</p>
            <h2 style={sectionTitle}>Review-only voiceover and caption planning workspace</h2>
          </div>
          <span style={stateStyle("blocked")}>No voice generation, transcription, caption export, or file mutation</span>
        </div>
        <p style={bodyText}>
          {model.summary} Release candidate adds the Voiceover And Caption Planning Workspace as a review-only planning
          workspace without frontend voice generation, caption export, transcription, rendering, export, provider calls,
          model calls, audio persistence, caption persistence, rights persistence, prompt persistence, job persistence,
          approval persistence, publishing, scheduling, or file mutation.
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
  section: VoiceoverAndCaptionPlanningWorkspaceSection;
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

function SectionCard({ section }: { section: VoiceoverAndCaptionPlanningWorkspaceSection }) {
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
            key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
              "voiceover-and-caption-check",
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
            key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
              "voiceover-and-caption-safety-note",
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
            key={buildVoiceoverAndCaptionPlanningWorkspaceStableKey([
              "voiceover-and-caption-list",
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

function CheckRow({ item }: { item: VoiceoverAndCaptionPlanningWorkspaceItem }) {
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

function formatState(state: VoiceoverAndCaptionPlanningWorkspaceState): string {
  if (state === "review-only") return "Review only";
  if (state === "synthetic-only") return "Synthetic";
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Blocked";
}

function stateStyle(state: VoiceoverAndCaptionPlanningWorkspaceState): CSSProperties {
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

