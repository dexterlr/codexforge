"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  FIRST_LIVE_VIDEO_PROVIDER_CALL_BACKEND_BRIDGE_SHARED_MARKERS,
  buildFirstLiveVideoProviderCallBackendBridgeModel,
  buildFirstLiveVideoProviderCallBackendBridgeStableKey,
  type FirstLiveVideoProviderCallBackendBridgeRouteSlug
} from "../first-live-video-provider-call-backend-bridge-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function FirstLiveVideoProviderCallBackendBridgePageClientShell({ routeSlug }: { routeSlug: FirstLiveVideoProviderCallBackendBridgeRouteSlug }) {
  const model = buildFirstLiveVideoProviderCallBackendBridgeModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      {FirstLiveVideoProviderCallBackendBridgeRoutePanel({ routeSlug: routeSlug })}
    </CodexForgeAppShell>
  );
}

export function FirstLiveVideoProviderCallBackendBridgeCockpitSection() {
  return FirstLiveVideoProviderCallBackendBridgeRoutePanel({ routeSlug: "first-live-video-provider-call-backend-bridge-completion", embedded: true });
}

export function FirstLiveVideoProviderCallBackendBridgeRoutePanel({ routeSlug, embedded = false }: { routeSlug: FirstLiveVideoProviderCallBackendBridgeRouteSlug; embedded?: boolean }) {
  const model = buildFirstLiveVideoProviderCallBackendBridgeModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-first-live-video-provider-call-backend-bridge={FIRST_LIVE_VIDEO_PROVIDER_CALL_BACKEND_BRIDGE_SHARED_MARKERS.join(" | ")} data-codexforge-first-live-video-provider-call-backend-bridge-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "First Live Video Provider Call Backend Bridge" : model.route.phase}</span>
            <span className={styles.safeBadge}>disabled by default</span>
            <span className={styles.blockedBadge}>backend runtime check remains required</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Live Video Provider Call Backend Bridge" : model.route.title}</h1>
          <p className={styles.heroLead}>This is the first tightly controlled live video provider call bridge surface. It prepares one future backend-owned path for video provider only, single approved video provider only, one harmless approved video prompt only, one tiny approved test video artifact only, manual operator approval required before live video provider call, backend-owned credential reference only, tiny duration cap, tiny cost cap, tiny size cap, tiny resolution cap, audit/result capture, and a hard kill switch. The frontend never sees provider keys, provider tokens, or plaintext secrets, and live video call cannot execute until a backend-owned execution runtime exists.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Provider" value="One Video" detail="single approved video provider only" />
            <MetricCard label="Prompt" value="One" detail="Create one tiny neutral test video clip for the approved dry-run id." />
            <MetricCard label="Credential" value="Backend" detail="backend-owned credential reference only" />
            <MetricCard label="Execution" value="Blocked" detail="no frontend video provider execution" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="First live video provider call backend bridge preview">
          <p className={styles.missionLabel}>3306-3337 - First Live Video Provider Call Backend Bridge</p>
          <p className={styles.missionDetail}>Video bridge remains backend-owned. Provider key never exposed to frontend. Provider token never exposed to frontend. Frontend secret exposure remains blocked. No provider key in frontend. No token in frontend. No plaintext secrets. No browser storage for secrets. No frontend process.env provider key reads. No provider SDK imports in frontend. No broad provider execution. No frontend video provider execution. No frontend image provider execution. No frontend audio provider execution. No microphone access. No camera access. No media device access. No recording execution. No playback engine creation. No render execution. No render queue dispatch. No worker execution. No artifact export execution. No publish gateway execution.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="First live video provider call backend bridge safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildFirstLiveVideoProviderCallBackendBridgeStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="First live video provider action review panel">
        <PanelHeading eyebrow="manual operator approval required before live video provider call" title="Action and operator review stay first" badge="Actions disabled" />
        <p className={styles.bodyText}>The main action/review panel appears before technical metadata. This static bridge cannot execute the live video call; it only reviews a future backend-owned request shape for one harmless approved video prompt only and one tiny approved test video artifact only.</p>
        <div className={styles.blockedDeckGrid}>{model.readinessItems.map((item, index) => <button key={buildFirstLiveVideoProviderCallBackendBridgeStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only backend bridge contract</span><small>disabled by default backend runtime check remains required</small></button>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="First live video provider safety state">
        <PanelHeading eyebrow="Safety state" title="Frontend secrets and video execution remain blocked" badge="Required" />
        <div className={styles.contractGrid}>{model.deniedItems.map((denial, index) => <span key={buildFirstLiveVideoProviderCallBackendBridgeStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This static readiness surface does not enable broad provider execution. It does not call video providers from the frontend, image providers, audio providers, microphones, cameras, media devices, recorders, playback engines, renderers, render queues, workers, export paths, publish gateways, platform uploads, download generation, signed URL creation, OAuth flows, webhooks, services, APIs, shell/process/command execution, or file writes from the app.</p>
      </section>
      <section className={styles.glassPanel} aria-label="First live video provider evidence audit panel">
        <PanelHeading eyebrow="Evidence and audit" title="Video result review remains audit backed" badge="Audit backed" />
        <p className={styles.bodyText}>Safety state appears before technical metadata, and evidence/audit appears before technical metadata. Result capture remains review-only, redaction-backed, and tied to the first live video provider audit packet.</p>
        <div className={styles.contractGrid}>{model.evidenceItems.map((item, index) => <span key={buildFirstLiveVideoProviderCallBackendBridgeStableKey(["evidence", String(index), item])} className={styles.contractChip}>{item}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="First live video provider route contract technical metadata">
        <PanelHeading eyebrow="Technical metadata" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary} Technical implementation details remain lower on the page.</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildFirstLiveVideoProviderCallBackendBridgeStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="First live video provider call backend bridge route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3306-3337 first live video provider call backend bridge coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildFirstLiveVideoProviderCallBackendBridgeStableKey(["first-live-video-provider-call-backend-bridge-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
