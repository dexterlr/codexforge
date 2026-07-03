"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { InteractiveVideoWorkspaceCockpitPanel } from "../../interactive-video-workspace-shell/components";
import { BackendWiringReadinessCockpitSection } from "../../first-backend-wiring-boundary-map/components";
import { ProviderGatewayReadinessCockpitSection } from "../../provider-gateway-wiring-map/components";
import { ProviderBackendAdapterContractCockpitSection } from "../../provider-backend-adapter-contract-map/components";
import { ProviderAdapterDryRunHarnessCockpitSection } from "../../provider-adapter-dry-run-harness-map/components";
import { ProviderMockResultHarnessCockpitSection } from "../../provider-mock-result-harness-map/components";
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
import styles from "./JarvisCockpitVisualPanel.module.css";

type JarvisCommandSurfaceId = (typeof JARVIS_COMMAND_SURFACES)[number]["id"];

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

export function JarvisCockpitVisualRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: JarvisCockpitVisualRouteSlug;
  embedded?: boolean;
}) {
  const model = buildJarvisCockpitVisualModel(routeSlug);
  const [activeSurfaceId, setActiveSurfaceId] = useState<JarvisCommandSurfaceId>("project");
  const activeSurface = useMemo(
    () => JARVIS_COMMAND_SURFACES.find((surface) => surface.id === activeSurfaceId) ?? JARVIS_COMMAND_SURFACES[0],
    [activeSurfaceId]
  );

  // Jarvis cockpit runtime safety: no string-valued React style props.
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-cockpit-visual={model.safetyMarkers.join(" | ")}
      data-codexforge-jarvis-cockpit-visual-route={model.route.markerPhrases.join(" | ")}
    >
      <MissionControlHero embedded={embedded} routeTitle={model.route.title} routePhase={model.route.phase} />
      <section className={styles.markerBand} aria-label="Jarvis cockpit visual safety markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildJarvisCockpitVisualStableKey(["jarvis-marker", model.route.slug, String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>
      <section className={styles.cockpitGrid} aria-label="Premium command centre grid">
        <article className={styles.wideGlassPanel}>
          <PanelHeading eyebrow="Holographic Command Grid" title="Mission surfaces" badge="Local controls only" />
          <div className={styles.commandGrid}>
            {JARVIS_COMMAND_SURFACES.map((surface) => (
              <button
                key={buildJarvisCockpitVisualStableKey(["surface", surface.id])}
                type="button"
                className={surface.id === activeSurface.id ? styles.selectedCommandCard : styles.commandCard}
                onClick={() => setActiveSurfaceId(surface.id)}
              >
                <span className={styles.commandIcon}>{surface.icon}</span>
                <span className={styles.commandLabel}>{surface.label}</span>
                <span className={styles.commandState}>{surface.state}</span>
              </button>
            ))}
          </div>
        </article>
        <article className={styles.glassPanel}>
          <PanelHeading eyebrow="Active Mission" title={activeSurface.label} badge="Synthetic data" />
          <p className={styles.bodyText}>{activeSurface.detail}</p>
          <div className={styles.activeSurfacePanel}>
            <span className={styles.surfaceStatusDot} />
            <span>{activeSurface.state}</span>
          </div>
          <p className={styles.mutedText}>
            Backend wiring required before persistence, provider calls, model calls, connector calls, prompt sending,
            upload, download, render, export, publish, schedule, service creation, API creation, or command execution.
          </p>
        </article>
      </section>
      <BackendWiringReadinessCockpitSection />
      <ProviderGatewayReadinessCockpitSection />
      <ProviderBackendAdapterContractCockpitSection />
      <ProviderAdapterDryRunHarnessCockpitSection />
      <ProviderMockResultHarnessCockpitSection />
      <ReadinessOrbCluster />
      <WorkflowTimeline />
      <section className={styles.cockpitGrid} aria-label="Project brief storyboard and status matrix">
        <ProjectCommandBriefPanel />
        <StoryboardOrbitPanel />
        <AssetAudioStatusMatrix />
      </section>
      <ApprovalRightsSafetyRail />
      <BackendSystemsHealthWall />
      <BlockedActionCommandDeck />
      <section className={styles.workspaceCorePanel} aria-label="Local-state interactive video workspace core">
        <div className={styles.workspaceCoreHeader}>
          <div>
            <p className={styles.eyebrow}>Interactive Video Workspace Core</p>
            <h2 className={styles.sectionTitle}>Existing local-state workspace preserved</h2>
          </div>
          <span className={styles.safeBadge}>No backend execution</span>
        </div>
        <p className={styles.bodyText}>
          The working core remains the phase 2186-2217 interactive video workspace. It still uses local React state only
          and synthetic data only.
        </p>
        <InteractiveVideoWorkspaceCockpitPanel />
      </section>
      <ContractStatusDrawer />
      <section className={styles.summaryPanel} aria-label="Jarvis cockpit high end UX summary">
        <PanelHeading
          eyebrow="Cockpit High End UX Summary"
          title="Premium visual pass complete, backend wiring still required"
          badge="Operator review required"
        />
        <p className={styles.bodyText}>
          Jarvis Cockpit Visual Upgrade makes /codexforge-cockpit feel like a premium AI command centre with a cinematic
          mission-control hero, premium command grid, readiness orb cluster, cinematic workflow timeline, polished
          project brief, storyboard shell, asset and audio status matrix, safety rail, backend systems wall, blocked
          action command deck, and contract status drawer.
        </p>
        <p className={styles.bodyText}>
          No backend execution from frontend. No frontend persistence. No browser storage writes. No provider calls from
          frontend. No model calls from frontend. No connector calls from frontend. No prompt sending from frontend. No
          uploads from frontend. No downloads from frontend. No render/export/publish/schedule from frontend.
        </p>
      </section>
      <section className={styles.diagnosticPanel} aria-label="Jarvis visual diagnostic routes">
        <PanelHeading eyebrow="Diagnostics" title="Jarvis visual route coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((route) => (
            <a key={buildJarvisCockpitVisualStableKey(["jarvis-route", route.slug])} className={styles.diagnosticLink} href={route.href}>
              <span>{route.phase}</span>
              <strong>{route.title}</strong>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}

function MissionControlHero({
  embedded,
  routeTitle,
  routePhase,
}: {
  embedded: boolean;
  routeTitle: string;
  routePhase: string;
}) {
  return (
    <header className={styles.heroPanel}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroContent}>
        <div className={styles.eyebrowRow}>
          <span className={styles.phaseBadge}>{embedded ? "Jarvis Cockpit Visual Upgrade" : routePhase}</span>
          <span className={styles.safeBadge}>Local React state only</span>
          <span className={styles.blockedBadge}>Backend wiring required</span>
        </div>
        <h1 className={styles.heroTitle}>{embedded ? "CodexForge Jarvis Cockpit" : routeTitle}</h1>
        <p className={styles.heroLead}>
          Mission control for a review-ready video workspace: cinematic dark glass, visual readiness systems, protected
          backend actions, and operator-owned approval gates.
        </p>
        <div className={styles.heroMetricGrid}>
          <MetricCard label="Visual readiness" value="Premium" detail="Dark glass command centre" />
          <MetricCard label="Execution state" value="Blocked" detail="Protected paths stay disabled" />
          <MetricCard label="Data mode" value="Synthetic" detail="No network or persistence" />
          <MetricCard label="Next boundary" value="Backend" detail="Operator approval required" />
        </div>
      </div>
      <div className={styles.missionPreview} aria-label="Mission readiness preview">
        <div className={styles.missionOrbOuter}>
          <div className={styles.missionOrbInner}>72%</div>
        </div>
        <p className={styles.missionLabel}>Mission visual readiness</p>
        <p className={styles.missionDetail}>Execution remains blocked until backend-owned contracts are wired.</p>
      </div>
    </header>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
      <span className={styles.metricDetail}>{detail}</span>
    </article>
  );
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return (
    <div className={styles.panelHeader}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <span className={styles.safeBadge}>{badge}</span>
    </div>
  );
}

function ReadinessOrbCluster() {
  return (
    <section className={styles.glassPanel} aria-label="Readiness Orb Cluster">
      <PanelHeading eyebrow="Readiness Orb Cluster" title="Script to publish readiness" badge="Display only" />
      <div className={styles.orbGrid}>
        {JARVIS_READINESS_ORBS.map((orb) => (
          <article key={buildJarvisCockpitVisualStableKey(["orb", orb.id])} className={styles.orbCard}>
            <div className={styles.orbRing} style={buildOrbRingStyle(orb.accent, orb.percent)}>
              <div className={styles.orbCore}>{orb.percent}%</div>
            </div>
            <p className={styles.orbLabel}>{orb.label}</p>
            <p className={styles.orbState}>{orb.state}</p>
            <p className={styles.orbNeed}>{orb.backendNeed}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function buildOrbRingStyle(accent: string, percent: number): CSSProperties {
  return {
    "--orb-accent": accent,
    "--orb-progress": `${percent}%`,
  } as CSSProperties;
}

function WorkflowTimeline() {
  return (
    <section className={styles.glassPanel} aria-label="Cinematic Workflow Timeline">
      <PanelHeading eyebrow="Cinematic Workflow Timeline" title="Brief to controlled release" badge="No jobs created" />
      <div className={styles.timelineGrid}>
        {JARVIS_WORKFLOW_STEPS.map((step, index) => (
          <article key={buildJarvisCockpitVisualStableKey(["timeline", step.id])} className={styles.timelineStep}>
            <span className={styles.timelineIndex}>{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.timelineLine} />
            <h3 className={styles.timelineTitle}>{step.label}</h3>
            <p className={styles.timelineStatus}>{step.status}</p>
            <p className={styles.mutedText}>{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectCommandBriefPanel() {
  return (
    <article className={styles.glassPanel}>
      <PanelHeading eyebrow="Project Command Brief Panel" title="Active mission brief" badge="Local-only copy" />
      <div className={styles.briefList}>
        <BriefRow label="Objective" value="Health insight explainer with operator review before any protected action." />
        <BriefRow label="Audience" value="Wellness user comparing weekly habit signals." />
        <BriefRow label="Safety" value="No medical certainty, no unreviewed claims, no persistence." />
      </div>
    </article>
  );
}

function BriefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.briefRow}>
      <span className={styles.briefLabel}>{label}</span>
      <span className={styles.briefValue}>{value}</span>
    </div>
  );
}

function StoryboardOrbitPanel() {
  return (
    <article className={styles.glassPanel}>
      <PanelHeading eyebrow="Storyboard Orbit Panel" title="Scene shell" badge="Generation blocked" />
      <div className={styles.orbitShell}>
        {["Hook", "Signal", "Review", "Blocked"].map((label, index) => (
          <div key={buildJarvisCockpitVisualStableKey(["orbit", label])} className={styles.orbitCard}>
            <span className={styles.orbitNumber}>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            <small>Synthetic scene state</small>
          </div>
        ))}
      </div>
      <p className={styles.mutedText}>
        Storyboard visual hierarchy is polished, but image generation, media creation, uploads, and scene persistence
        remain blocked.
      </p>
    </article>
  );
}

function AssetAudioStatusMatrix() {
  return (
    <article className={styles.glassPanel}>
      <PanelHeading eyebrow="Asset Audio Status Matrix" title="Media prerequisites" badge="Backend-owned" />
      <div className={styles.matrixGrid}>
        {["Asset source", "Storage scan", "Voice consent", "Transcript", "Caption timing", "Rights evidence"].map(
          (item, index) => (
            <div key={buildJarvisCockpitVisualStableKey(["matrix", item])} className={styles.matrixCell}>
              <span className={styles.matrixSignal}>{index < 2 ? "Ready" : "Required"}</span>
              <strong>{item}</strong>
            </div>
          )
        )}
      </div>
    </article>
  );
}

function ApprovalRightsSafetyRail() {
  return (
    <section className={styles.glassPanel} aria-label="Approval Rights Safety Rail">
      <PanelHeading eyebrow="Approval Rights Safety Rail" title="Operator-owned gates" badge="Explicit approval required" />
      <div className={styles.safetyRail}>
        {["Brand review", "Rights consent", "Legal review", "Operator approval", "Audit ledger", "Release gate"].map((gate) => (
          <article key={buildJarvisCockpitVisualStableKey(["safety", gate])} className={styles.safetyRailCard}>
            <span className={styles.railDot} />
            <strong>{gate}</strong>
            <p className={styles.mutedText}>Backend-owned capture required.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BackendSystemsHealthWall() {
  return (
    <section className={styles.glassPanel} aria-label="Backend Systems Health Wall">
      <PanelHeading eyebrow="Backend Systems Health Wall" title="Contract readiness wall" badge="Static synthetic status" />
      <div className={styles.systemsGrid}>
        {JARVIS_SYSTEM_WALL.map((system) => (
          <article key={buildJarvisCockpitVisualStableKey(["system", system.id])} className={styles.systemCard}>
            <span className={styles.systemTier}>{system.tier}</span>
            <strong>{system.label}</strong>
            <p className={styles.systemStatus}>{system.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlockedActionCommandDeck() {
  return (
    <section className={styles.glassPanel} aria-label="Blocked Action Command Deck">
      <PanelHeading eyebrow="Blocked Action Command Deck" title="Protected actions are intentionally disabled" badge="No hidden execution" />
      <div className={styles.blockedDeckGrid}>
        {JARVIS_BLOCKED_COMMANDS.map((command) => (
          <button
            key={buildJarvisCockpitVisualStableKey(["blocked", command.id])}
            type="button"
            disabled
            className={styles.blockedCommandButton}
            title={command.contract}
          >
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
    <details className={styles.drawerPanel} open>
      <summary className={styles.drawerSummary}>Contract Status Drawer</summary>
      <div className={styles.contractGrid}>
        {JARVIS_CONTRACT_STATUS.map((item) => (
          <span key={buildJarvisCockpitVisualStableKey(["contract", item])} className={styles.contractChip}>
            {item}
          </span>
        ))}
      </div>
    </details>
  );
}
