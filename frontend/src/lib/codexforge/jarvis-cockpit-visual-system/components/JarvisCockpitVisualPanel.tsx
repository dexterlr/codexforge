"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { InteractiveVideoWorkspaceCockpitPanel } from "../../interactive-video-workspace-shell/components";
import {
  JARVIS_BLOCKED_COMMANDS,
  JARVIS_COMMAND_SURFACES,
  JARVIS_CONTRACT_STATUS,
  JARVIS_READINESS_ORBS,
  JARVIS_SYSTEM_WALL,
  JARVIS_WORKFLOW_STEPS,
  buildJarvisCockpitVisualModel,
  buildJarvisCockpitVisualStableKey,
  type JarvisCockpitVisualRouteSlug,
} from "../jarvis-cockpit-visual-model";

export function JarvisCockpitVisualPageClientShell({ routeSlug }: { routeSlug: JarvisCockpitVisualRouteSlug }) {
  const model = buildJarvisCockpitVisualModel(routeSlug);
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
      <JarvisCockpitVisualRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function JarvisCockpitVisualCockpitPanel() {
  return <JarvisCockpitVisualRoutePanel routeSlug="controlled-jarvis-cockpit-completion-candidate" embedded />;
}

export function JarvisCockpitVisualRoutePanel({ routeSlug, embedded = false }: { routeSlug: JarvisCockpitVisualRouteSlug; embedded?: boolean }) {
  const model = buildJarvisCockpitVisualModel(routeSlug);
  const [activeSurfaceId, setActiveSurfaceId] = useState(JARVIS_COMMAND_SURFACES[0].id);
  const activeSurface = useMemo(
    () => JARVIS_COMMAND_SURFACES.find((surface) => surface.id === activeSurfaceId) ?? JARVIS_COMMAND_SURFACES[0],
    [activeSurfaceId]
  );

  return (
    <section
      style={embedded ? cockpitShell : routeShell}
      data-codexforge-jarvis-cockpit-visual={model.safetyMarkers.join(" | ")}
      data-codexforge-jarvis-cockpit-visual-route={model.route.markerPhrases.join(" | ")}
    >
      <MissionControlHero embedded={embedded} routeTitle={model.route.title} routePhase={model.route.phase} />
      <section style={markerBand} aria-label="Jarvis cockpit visual safety markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span key={buildJarvisCockpitVisualStableKey(["jarvis-marker", model.route.slug, String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </section>
      <section style={cockpitGrid} aria-label="Premium command centre grid">
        <article style={wideGlassPanel}>
          <PanelHeading eyebrow="Holographic Command Grid" title="Mission surfaces" badge="Local controls only" />
          <div style={commandGrid}>
            {JARVIS_COMMAND_SURFACES.map((surface) => (
              <button
                key={buildJarvisCockpitVisualStableKey(["surface", surface.id])}
                type="button"
                style={surface.id === activeSurface.id ? selectedCommandCard : commandCard}
                onClick={() => setActiveSurfaceId(surface.id)}
              >
                <span style={commandIcon}>{surface.icon}</span>
                <span style={commandLabel}>{surface.label}</span>
                <span style={commandState}>{surface.state}</span>
              </button>
            ))}
          </div>
        </article>
        <article style={glassPanel}>
          <PanelHeading eyebrow="Active Mission" title={activeSurface.label} badge="Synthetic data" />
          <p style={bodyText}>{activeSurface.detail}</p>
          <div style={activeSurfacePanel}>
            <span style={surfaceStatusDot} />
            <span>{activeSurface.state}</span>
          </div>
          <p style={mutedText}>Backend wiring required before persistence, provider calls, model calls, connector calls, prompt sending, upload, download, render, export, publish, schedule, service creation, API creation, or command execution.</p>
        </article>
      </section>
      <ReadinessOrbCluster />
      <WorkflowTimeline />
      <section style={cockpitGrid} aria-label="Project brief storyboard and status matrix">
        <ProjectCommandBriefPanel />
        <StoryboardOrbitPanel />
        <AssetAudioStatusMatrix />
      </section>
      <ApprovalRightsSafetyRail />
      <BackendSystemsHealthWall />
      <BlockedActionCommandDeck />
      <section style={workspaceCorePanel} aria-label="Local-state interactive video workspace core">
        <div style={workspaceCoreHeader}>
          <div>
            <p style={eyebrow}>Interactive Video Workspace Core</p>
            <h2 style={sectionTitle}>Existing local-state workspace preserved</h2>
          </div>
          <span style={safeBadge}>No backend execution</span>
        </div>
        <p style={bodyText}>The working core remains the phase 2186-2217 interactive video workspace. It still uses local React state only and synthetic data only.</p>
        <InteractiveVideoWorkspaceCockpitPanel />
      </section>
      <ContractStatusDrawer />
      <section style={summaryPanel} aria-label="Jarvis cockpit high end UX summary">
        <PanelHeading eyebrow="Cockpit High End UX Summary" title="Premium visual pass complete, backend wiring still required" badge="Operator review required" />
        <p style={bodyText}>Jarvis Cockpit Visual Upgrade makes /codexforge-cockpit feel like a premium AI command centre with a cinematic mission-control hero, premium command grid, readiness orb cluster, cinematic workflow timeline, polished project brief, storyboard shell, asset and audio status matrix, safety rail, backend systems wall, blocked action command deck, and contract status drawer.</p>
        <p style={bodyText}>No backend execution from frontend. No frontend persistence. No browser storage writes. No provider calls from frontend. No model calls from frontend. No connector calls from frontend. No prompt sending from frontend. No uploads from frontend. No downloads from frontend. No render/export/publish/schedule from frontend.</p>
      </section>
      <section style={diagnosticPanel} aria-label="Jarvis visual diagnostic routes">
        <PanelHeading eyebrow="Diagnostics" title="Jarvis visual route coverage" badge="Phase pages secondary" />
        <div style={diagnosticGrid}>
          {model.routes.map((route) => (
            <a key={buildJarvisCockpitVisualStableKey(["jarvis-route", route.slug])} style={diagnosticLink} href={route.href}>
              <span>{route.phase}</span>
              <strong>{route.title}</strong>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}

function MissionControlHero({ embedded, routeTitle, routePhase }: { embedded: boolean; routeTitle: string; routePhase: string }) {
  return (
    <header style={heroPanel}>
      <div style={heroGlow} aria-hidden="true" />
      <div style={heroContent}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Jarvis Cockpit Visual Upgrade" : routePhase}</span>
          <span style={safeBadge}>Local React state only</span>
          <span style={blockedBadge}>Backend wiring required</span>
        </div>
        <h1 style={heroTitle}>{embedded ? "CodexForge Jarvis Cockpit" : routeTitle}</h1>
        <p style={heroLead}>Mission control for a review-ready video workspace: cinematic dark glass, visual readiness systems, protected backend actions, and operator-owned approval gates.</p>
        <div style={heroMetricGrid}>
          <MetricCard label="Visual readiness" value="Premium" detail="Dark glass command centre" />
          <MetricCard label="Execution state" value="Blocked" detail="Protected paths stay disabled" />
          <MetricCard label="Data mode" value="Synthetic" detail="No network or persistence" />
          <MetricCard label="Next boundary" value="Backend" detail="Operator approval required" />
        </div>
      </div>
      <div style={missionPreview} aria-label="Mission readiness preview">
        <div style={missionOrbOuter}>
          <div style={missionOrbInner}>72%</div>
        </div>
        <p style={missionLabel}>Mission visual readiness</p>
        <p style={missionDetail}>Execution remains blocked until backend-owned contracts are wired.</p>
      </div>
    </header>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article style={metricCard}>
      <span style={metricLabel}>{label}</span>
      <strong style={metricValue}>{value}</strong>
      <span style={metricDetail}>{detail}</span>
    </article>
  );
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return (
    <div style={panelHeader}>
      <div>
        <p style={eyebrow}>{eyebrow}</p>
        <h2 style={sectionTitle}>{title}</h2>
      </div>
      <span style={safeBadge}>{badge}</span>
    </div>
  );
}

function ReadinessOrbCluster() {
  return (
    <section style={glassPanel} aria-label="Readiness Orb Cluster">
      <PanelHeading eyebrow="Readiness Orb Cluster" title="Script to publish readiness" badge="Display only" />
      <div style={orbGrid}>
        {JARVIS_READINESS_ORBS.map((orb) => (
          <article key={buildJarvisCockpitVisualStableKey(["orb", orb.id])} style={orbCard}>
            <div style={{ ...orbRing, background: "conic-gradient(" + orb.accent + " " + orb.percent + "%, rgba(148, 163, 184, 0.18) 0)" }}>
              <div style={orbCore}>{orb.percent}%</div>
            </div>
            <p style={orbLabel}>{orb.label}</p>
            <p style={orbState}>{orb.state}</p>
            <p style={orbNeed}>{orb.backendNeed}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WorkflowTimeline() {
  return (
    <section style={glassPanel} aria-label="Cinematic Workflow Timeline">
      <PanelHeading eyebrow="Cinematic Workflow Timeline" title="Brief to controlled release" badge="No jobs created" />
      <div style={timelineGrid}>
        {JARVIS_WORKFLOW_STEPS.map((step, index) => (
          <article key={buildJarvisCockpitVisualStableKey(["timeline", step.id])} style={timelineStep}>
            <span style={timelineIndex}>{String(index + 1).padStart(2, "0")}</span>
            <div style={timelineLine} />
            <h3 style={timelineTitle}>{step.label}</h3>
            <p style={timelineStatus}>{step.status}</p>
            <p style={mutedText}>{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectCommandBriefPanel() {
  return (
    <article style={glassPanel}>
      <PanelHeading eyebrow="Project Command Brief Panel" title="Active mission brief" badge="Local-only copy" />
      <div style={briefList}>
        <BriefRow label="Objective" value="Health insight explainer with operator review before any protected action." />
        <BriefRow label="Audience" value="Wellness user comparing weekly habit signals." />
        <BriefRow label="Safety" value="No medical certainty, no unreviewed claims, no persistence." />
      </div>
    </article>
  );
}

function BriefRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={briefRow}>
      <span style={briefLabel}>{label}</span>
      <span style={briefValue}>{value}</span>
    </div>
  );
}

function StoryboardOrbitPanel() {
  return (
    <article style={glassPanel}>
      <PanelHeading eyebrow="Storyboard Orbit Panel" title="Scene shell" badge="Generation blocked" />
      <div style={orbitShell}>
        {["Hook", "Signal", "Review", "Blocked"].map((label, index) => (
          <div key={buildJarvisCockpitVisualStableKey(["orbit", label])} style={orbitCard}>
            <span style={orbitNumber}>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            <small>Synthetic scene state</small>
          </div>
        ))}
      </div>
      <p style={mutedText}>Storyboard visual hierarchy is polished, but image generation, media creation, uploads, and scene persistence remain blocked.</p>
    </article>
  );
}

function AssetAudioStatusMatrix() {
  return (
    <article style={glassPanel}>
      <PanelHeading eyebrow="Asset Audio Status Matrix" title="Media prerequisites" badge="Backend-owned" />
      <div style={matrixGrid}>
        {["Asset source", "Storage scan", "Voice consent", "Transcript", "Caption timing", "Rights evidence"].map((item, index) => (
          <div key={buildJarvisCockpitVisualStableKey(["matrix", item])} style={matrixCell}>
            <span style={matrixSignal}>{index < 2 ? "Ready" : "Required"}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}

function ApprovalRightsSafetyRail() {
  return (
    <section style={glassPanel} aria-label="Approval Rights Safety Rail">
      <PanelHeading eyebrow="Approval Rights Safety Rail" title="Operator-owned gates" badge="Explicit approval required" />
      <div style={safetyRail}>
        {["Brand review", "Rights consent", "Legal review", "Operator approval", "Audit ledger", "Release gate"].map((gate) => (
          <article key={buildJarvisCockpitVisualStableKey(["safety", gate])} style={safetyRailCard}>
            <span style={railDot} />
            <strong>{gate}</strong>
            <p style={mutedText}>Backend-owned capture required.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BackendSystemsHealthWall() {
  return (
    <section style={glassPanel} aria-label="Backend Systems Health Wall">
      <PanelHeading eyebrow="Backend Systems Health Wall" title="Contract readiness wall" badge="Static synthetic status" />
      <div style={systemsGrid}>
        {JARVIS_SYSTEM_WALL.map((system) => (
          <article key={buildJarvisCockpitVisualStableKey(["system", system.id])} style={systemCard}>
            <span style={systemTier}>{system.tier}</span>
            <strong>{system.label}</strong>
            <p style={systemStatus}>{system.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlockedActionCommandDeck() {
  return (
    <section style={glassPanel} aria-label="Blocked Action Command Deck">
      <PanelHeading eyebrow="Blocked Action Command Deck" title="Protected actions are intentionally disabled" badge="No hidden execution" />
      <div style={blockedDeckGrid}>
        {JARVIS_BLOCKED_COMMANDS.map((command) => (
          <button key={buildJarvisCockpitVisualStableKey(["blocked", command.id])} type="button" disabled style={blockedCommandButton} title={command.contract}>
            <strong>{command.label}</strong>
            <span>{command.contract}</span>
            <small>{command.reason}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function ContractStatusDrawer() {
  return (
    <details style={drawerPanel} open>
      <summary style={drawerSummary}>Contract Status Drawer</summary>
      <div style={contractGrid}>
        {JARVIS_CONTRACT_STATUS.map((item) => (
          <span key={buildJarvisCockpitVisualStableKey(["contract", item])} style={contractChip}>{item}</span>
        ))}
      </div>
    </details>
  );
}

const routeShell: CSSProperties = { display: "flex", flexDirection: "column", gap: 18, padding: 24, color: "#e5f6ff", background: "radial-gradient(circle at top left, rgba(34, 211, 238, 0.18), transparent 30%), radial-gradient(circle at top right, rgba(168, 85, 247, 0.16), transparent 34%), #030712" };
const cockpitShell: CSSProperties = { ...routeShell, padding: 20, border: "1px solid rgba(125, 211, 252, 0.22)", borderRadius: 8, boxShadow: "0 24px 80px rgba(2, 6, 23, 0.48)" };
const heroPanel: CSSProperties = { position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, overflow: "hidden", border: "1px solid rgba(125, 211, 252, 0.24)", borderRadius: 8, padding: 22, background: "linear-gradient(135deg, rgba(15, 23, 42, 0.94), rgba(17, 24, 39, 0.9) 52%, rgba(30, 41, 59, 0.82))" };
const heroGlow: CSSProperties = { position: "absolute", inset: 0, background: "radial-gradient(circle at 22% 12%, rgba(56, 189, 248, 0.22), transparent 28%), radial-gradient(circle at 88% 28%, rgba(192, 132, 252, 0.18), transparent 30%)", pointerEvents: "none" };
const heroContent: CSSProperties = { position: "relative", display: "flex", flexDirection: "column", gap: 14, minWidth: 0 };
const eyebrowRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const phaseBadge: CSSProperties = { display: "inline-flex", width: "fit-content", border: "1px solid rgba(34, 211, 238, 0.45)", borderRadius: 999, padding: "7px 10px", color: "#cffafe", background: "rgba(8, 47, 73, 0.72)", fontSize: 12, fontWeight: 800 };
const safeBadge: CSSProperties = { ...phaseBadge, borderColor: "rgba(74, 222, 128, 0.42)", color: "#dcfce7", background: "rgba(20, 83, 45, 0.52)" };
const blockedBadge: CSSProperties = { ...phaseBadge, borderColor: "rgba(251, 146, 60, 0.52)", color: "#ffedd5", background: "rgba(124, 45, 18, 0.54)" };
const heroTitle: CSSProperties = { margin: 0, maxWidth: 940, color: "#f8fafc", fontSize: 42, lineHeight: 1.05, letterSpacing: 0 };
const heroLead: CSSProperties = { margin: 0, maxWidth: 920, color: "#b7d7e8", fontSize: 17, lineHeight: 1.55 };
const heroMetricGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 };
const metricCard: CSSProperties = { border: "1px solid rgba(148, 163, 184, 0.24)", borderRadius: 8, padding: 12, background: "rgba(15, 23, 42, 0.68)" };
const metricLabel: CSSProperties = { display: "block", color: "#8fb6c8", fontSize: 12, fontWeight: 800 };
const metricValue: CSSProperties = { display: "block", marginTop: 4, color: "#ffffff", fontSize: 20, lineHeight: 1.2 };
const metricDetail: CSSProperties = { display: "block", marginTop: 4, color: "#a9c4d3", fontSize: 12, lineHeight: 1.35 };
const missionPreview: CSSProperties = { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 260, border: "1px solid rgba(125, 211, 252, 0.22)", borderRadius: 8, background: "linear-gradient(180deg, rgba(8, 47, 73, 0.58), rgba(15, 23, 42, 0.72))" };
const missionOrbOuter: CSSProperties = { display: "grid", placeItems: "center", width: 164, height: 164, borderRadius: 999, background: "conic-gradient(#22d3ee 72%, rgba(148, 163, 184, 0.18) 0)", boxShadow: "0 0 44px rgba(34, 211, 238, 0.28)" };
const missionOrbInner: CSSProperties = { display: "grid", placeItems: "center", width: 118, height: 118, borderRadius: 999, color: "#f8fafc", background: "#020617", border: "1px solid rgba(125, 211, 252, 0.28)", fontSize: 28, fontWeight: 900 };
const missionLabel: CSSProperties = { margin: 0, color: "#ecfeff", fontWeight: 900 };
const missionDetail: CSSProperties = { margin: 0, maxWidth: 260, textAlign: "center", color: "#a7c4d7", fontSize: 13, lineHeight: 1.45 };
const markerBand: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const markerPill: CSSProperties = { border: "1px solid rgba(125, 211, 252, 0.22)", borderRadius: 999, padding: "7px 10px", background: "rgba(15, 23, 42, 0.72)", color: "#dbeafe", fontSize: 12, lineHeight: 1.35 };
const cockpitGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 };
const glassPanel: CSSProperties = { minWidth: 0, border: "1px solid rgba(125, 211, 252, 0.2)", borderRadius: 8, padding: 16, background: "linear-gradient(180deg, rgba(15, 23, 42, 0.86), rgba(2, 6, 23, 0.78))", boxShadow: "0 18px 60px rgba(2, 6, 23, 0.34)" };
const wideGlassPanel: CSSProperties = { ...glassPanel };
const panelHeader: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 12 };
const eyebrow: CSSProperties = { margin: "0 0 5px", color: "#67e8f9", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const sectionTitle: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 22, lineHeight: 1.2, letterSpacing: 0 };
const bodyText: CSSProperties = { margin: 0, color: "#c6d9e8", fontSize: 14, lineHeight: 1.58 };
const mutedText: CSSProperties = { margin: "8px 0 0", color: "#93aebf", fontSize: 13, lineHeight: 1.5 };
const commandGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(142px, 1fr))", gap: 10 };
const commandCard: CSSProperties = { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, minHeight: 118, border: "1px solid rgba(148, 163, 184, 0.22)", borderRadius: 8, padding: 12, color: "#dbeafe", background: "rgba(15, 23, 42, 0.64)", textAlign: "left", cursor: "pointer" };
const selectedCommandCard: CSSProperties = { ...commandCard, borderColor: "rgba(34, 211, 238, 0.72)", background: "linear-gradient(180deg, rgba(8, 47, 73, 0.72), rgba(30, 41, 59, 0.72))", boxShadow: "0 0 26px rgba(34, 211, 238, 0.16)" };
const commandIcon: CSSProperties = { display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: 999, color: "#ecfeff", background: "rgba(14, 165, 233, 0.22)", border: "1px solid rgba(125, 211, 252, 0.26)", fontWeight: 900 };
const commandLabel: CSSProperties = { color: "#f8fafc", fontSize: 15, fontWeight: 900 };
const commandState: CSSProperties = { color: "#a9c4d3", fontSize: 12, lineHeight: 1.35 };
const activeSurfacePanel: CSSProperties = { display: "flex", alignItems: "center", gap: 8, marginTop: 12, padding: 10, border: "1px solid rgba(74, 222, 128, 0.24)", borderRadius: 8, color: "#dcfce7", background: "rgba(20, 83, 45, 0.22)", fontSize: 13, fontWeight: 800 };
const surfaceStatusDot: CSSProperties = { width: 9, height: 9, borderRadius: 999, background: "#4ade80", boxShadow: "0 0 18px rgba(74, 222, 128, 0.7)" };
const orbGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 };
const orbCard: CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 7, border: "1px solid rgba(148, 163, 184, 0.18)", borderRadius: 8, padding: 12, background: "rgba(2, 6, 23, 0.42)" };
const orbRing: CSSProperties = { display: "grid", placeItems: "center", width: 92, height: 92, borderRadius: 999 };
const orbCore: CSSProperties = { display: "grid", placeItems: "center", width: 64, height: 64, borderRadius: 999, color: "#f8fafc", background: "#020617", border: "1px solid rgba(226, 232, 240, 0.14)", fontSize: 15, fontWeight: 900 };
const orbLabel: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 14, fontWeight: 900 };
const orbState: CSSProperties = { margin: 0, color: "#bae6fd", fontSize: 12, fontWeight: 800 };
const orbNeed: CSSProperties = { margin: 0, color: "#9fb6c6", fontSize: 12, lineHeight: 1.35 };
const timelineGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 };
const timelineStep: CSSProperties = { position: "relative", minHeight: 150, border: "1px solid rgba(148, 163, 184, 0.18)", borderRadius: 8, padding: 12, background: "rgba(2, 6, 23, 0.42)" };
const timelineIndex: CSSProperties = { color: "#67e8f9", fontSize: 12, fontWeight: 900 };
const timelineLine: CSSProperties = { height: 2, margin: "9px 0", background: "linear-gradient(90deg, rgba(34, 211, 238, 0.8), rgba(168, 85, 247, 0.18))" };
const timelineTitle: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 16, lineHeight: 1.25 };
const timelineStatus: CSSProperties = { margin: "6px 0 0", color: "#bae6fd", fontSize: 12, fontWeight: 900 };
const briefList: CSSProperties = { display: "grid", gap: 10 };
const briefRow: CSSProperties = { display: "grid", gridTemplateColumns: "110px minmax(0, 1fr)", gap: 10, borderTop: "1px solid rgba(148, 163, 184, 0.16)", paddingTop: 10 };
const briefLabel: CSSProperties = { color: "#67e8f9", fontSize: 12, fontWeight: 900 };
const briefValue: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.45 };
const orbitShell: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 };
const orbitCard: CSSProperties = { display: "flex", flexDirection: "column", gap: 4, minHeight: 82, border: "1px solid rgba(125, 211, 252, 0.18)", borderRadius: 8, padding: 10, background: "linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(168, 85, 247, 0.12))", color: "#e0f2fe" };
const orbitNumber: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900 };
const matrixGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 };
const matrixCell: CSSProperties = { border: "1px solid rgba(148, 163, 184, 0.18)", borderRadius: 8, padding: 10, background: "rgba(15, 23, 42, 0.58)", color: "#e2e8f0" };
const matrixSignal: CSSProperties = { display: "block", marginBottom: 5, color: "#fde68a", fontSize: 11, fontWeight: 900 };
const safetyRail: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))", gap: 10 };
const safetyRailCard: CSSProperties = { display: "flex", flexDirection: "column", gap: 7, border: "1px solid rgba(251, 191, 36, 0.22)", borderRadius: 8, padding: 12, background: "rgba(69, 26, 3, 0.18)", color: "#fef3c7" };
const railDot: CSSProperties = { width: 10, height: 10, borderRadius: 999, background: "#fbbf24", boxShadow: "0 0 18px rgba(251, 191, 36, 0.52)" };
const systemsGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 };
const systemCard: CSSProperties = { border: "1px solid rgba(125, 211, 252, 0.18)", borderRadius: 8, padding: 12, background: "rgba(2, 6, 23, 0.44)", color: "#e0f2fe" };
const systemTier: CSSProperties = { display: "block", color: "#67e8f9", fontSize: 11, fontWeight: 900, marginBottom: 6 };
const systemStatus: CSSProperties = { margin: "6px 0 0", color: "#9fb6c6", fontSize: 12, lineHeight: 1.4 };
const blockedDeckGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10 };
const blockedCommandButton: CSSProperties = { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, minHeight: 128, textAlign: "left", border: "1px solid rgba(251, 146, 60, 0.28)", borderRadius: 8, padding: 12, color: "#fed7aa", background: "linear-gradient(180deg, rgba(124, 45, 18, 0.24), rgba(15, 23, 42, 0.7))", opacity: 1 };
const workspaceCorePanel: CSSProperties = { ...glassPanel, background: "linear-gradient(180deg, rgba(2, 6, 23, 0.86), rgba(15, 23, 42, 0.82))" };
const workspaceCoreHeader: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 12 };
const drawerPanel: CSSProperties = { border: "1px solid rgba(148, 163, 184, 0.2)", borderRadius: 8, padding: 14, background: "rgba(15, 23, 42, 0.7)", color: "#dbeafe" };
const drawerSummary: CSSProperties = { cursor: "pointer", color: "#f8fafc", fontSize: 16, fontWeight: 900 };
const contractGrid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 };
const contractChip: CSSProperties = { border: "1px solid rgba(125, 211, 252, 0.2)", borderRadius: 999, padding: "7px 10px", background: "rgba(2, 6, 23, 0.46)", color: "#bfdbfe", fontSize: 12, fontWeight: 800 };
const summaryPanel: CSSProperties = { ...glassPanel, borderColor: "rgba(74, 222, 128, 0.22)" };
const diagnosticPanel: CSSProperties = { ...glassPanel, borderColor: "rgba(148, 163, 184, 0.16)" };
const diagnosticGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 };
const diagnosticLink: CSSProperties = { display: "flex", flexDirection: "column", gap: 5, border: "1px solid rgba(148, 163, 184, 0.2)", borderRadius: 8, padding: 10, color: "#dbeafe", background: "rgba(2, 6, 23, 0.38)", textDecoration: "none", fontSize: 12 };
