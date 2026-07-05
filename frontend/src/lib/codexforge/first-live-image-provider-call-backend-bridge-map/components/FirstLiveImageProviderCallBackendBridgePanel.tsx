"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  FIRST_LIVE_IMAGE_PROVIDER_CALL_BACKEND_BRIDGE_SHARED_MARKERS,
  buildFirstLiveImageProviderCallBackendBridgeModel,
  buildFirstLiveImageProviderCallBackendBridgeStableKey,
  type FirstLiveImageProviderCallBackendBridgeRouteSlug
} from "../first-live-image-provider-call-backend-bridge-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function FirstLiveImageProviderCallBackendBridgePageClientShell({ routeSlug }: { routeSlug: FirstLiveImageProviderCallBackendBridgeRouteSlug }) {
  const model = buildFirstLiveImageProviderCallBackendBridgeModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLiveImageProviderCallBackendBridgeRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function FirstLiveImageProviderCallBackendBridgeCockpitSection() {
  return <FirstLiveImageProviderCallBackendBridgeRoutePanel routeSlug="first-live-image-provider-call-backend-bridge-completion" embedded />;
}

export function FirstLiveImageProviderCallBackendBridgeRoutePanel({ routeSlug, embedded = false }: { routeSlug: FirstLiveImageProviderCallBackendBridgeRouteSlug; embedded?: boolean }) {
  const model = buildFirstLiveImageProviderCallBackendBridgeModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-first-live-image-provider-call-backend-bridge={FIRST_LIVE_IMAGE_PROVIDER_CALL_BACKEND_BRIDGE_SHARED_MARKERS.join(" | ")} data-codexforge-first-live-image-provider-call-backend-bridge-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "First Live Image Provider Call Backend Bridge" : model.route.phase}</span>
            <span className={styles.safeBadge}>disabled by default</span>
            <span className={styles.blockedBadge}>backend runtime check remains required</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Live Image Provider Call Backend Bridge" : model.route.title}</h1>
          <p className={styles.heroLead}>This is the first tightly controlled live image provider call bridge surface. It prepares one future backend-owned path for image provider only, single approved image provider only, one harmless approved image prompt only, one tiny approved test image only, manual operator approval required before live image provider call, backend-owned credential reference only, tiny cost cap, first live image provider size cap, audit/result capture, and a hard kill switch. The frontend never sees provider keys, provider tokens, or plaintext secrets, and live image call cannot execute until a backend-owned execution runtime exists.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Provider" value="One Image" detail="single approved image provider only" />
            <MetricCard label="Prompt" value="One" detail="Create one tiny neutral test image for the approved dry-run id." />
            <MetricCard label="Credential" value="Backend" detail="backend-owned credential reference only" />
            <MetricCard label="Execution" value="Blocked" detail="no frontend image provider execution" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="First live image provider call backend bridge preview">
          <p className={styles.missionLabel}>3242-3273 - First Live Image Provider Call Backend Bridge</p>
          <p className={styles.missionDetail}>Image bridge remains backend-owned. Provider key never exposed to frontend. Provider token never exposed to frontend. Frontend secret exposure remains blocked. No provider key in frontend. No token in frontend. No plaintext secrets. No browser storage for secrets. No frontend process.env provider key reads. No provider SDK imports in frontend. No broad provider execution. No frontend image provider execution. No audio provider calls. No video provider calls. No render execution. No artifact export execution. No publish gateway execution.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="First live image provider call backend bridge safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildFirstLiveImageProviderCallBackendBridgeStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="First live image provider action review panel">
        <PanelHeading eyebrow="manual operator approval required before live image provider call" title="Action and operator review stay first" badge="Actions disabled" />
        <p className={styles.bodyText}>The main action/review panel appears before technical metadata. This static bridge cannot execute the live image call; it only reviews a future backend-owned request shape for one harmless approved image prompt only and one tiny approved test image only.</p>
        <div className={styles.blockedDeckGrid}>{model.readinessItems.map((item, index) => <button key={buildFirstLiveImageProviderCallBackendBridgeStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only backend bridge contract</span><small>disabled by default backend runtime check remains required</small></button>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="First live image provider safety state">
        <PanelHeading eyebrow="Safety state" title="Frontend secrets and provider execution remain blocked" badge="Required" />
        <div className={styles.contractGrid}>{model.deniedItems.map((denial, index) => <span key={buildFirstLiveImageProviderCallBackendBridgeStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This static readiness surface does not enable broad provider execution. It does not call image providers from the frontend, audio providers, video providers, renderers, export paths, publish gateways, platform uploads, download generation, signed URL creation, OAuth flows, webhooks, workers, services, APIs, shell/process/command execution, or file writes from the app.</p>
      </section>
      <section className={styles.glassPanel} aria-label="First live image provider evidence audit panel">
        <PanelHeading eyebrow="Evidence and audit" title="Image result review remains audit backed" badge="Audit backed" />
        <p className={styles.bodyText}>Safety state appears before technical metadata, and evidence/audit appears before technical metadata. Result capture remains review-only, redaction-backed, and tied to the first live image provider audit packet.</p>
        <div className={styles.contractGrid}>{model.evidenceItems.map((item, index) => <span key={buildFirstLiveImageProviderCallBackendBridgeStableKey(["evidence", String(index), item])} className={styles.contractChip}>{item}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="First live image provider route contract technical metadata">
        <PanelHeading eyebrow="Technical metadata" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary} Technical implementation details remain lower on the page.</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildFirstLiveImageProviderCallBackendBridgeStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="First live image provider call backend bridge route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3242-3273 first live image provider call backend bridge coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildFirstLiveImageProviderCallBackendBridgeStableKey(["first-live-image-provider-call-backend-bridge-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
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
