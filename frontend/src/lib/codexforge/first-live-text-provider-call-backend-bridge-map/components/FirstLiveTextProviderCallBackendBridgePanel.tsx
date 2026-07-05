"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  FIRST_LIVE_TEXT_PROVIDER_CALL_BACKEND_BRIDGE_SHARED_MARKERS,
  buildFirstLiveTextProviderCallBackendBridgeModel,
  buildFirstLiveTextProviderCallBackendBridgeStableKey,
  type FirstLiveTextProviderCallBackendBridgeRouteSlug
} from "../first-live-text-provider-call-backend-bridge-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function FirstLiveTextProviderCallBackendBridgePageClientShell({ routeSlug }: { routeSlug: FirstLiveTextProviderCallBackendBridgeRouteSlug }) {
  const model = buildFirstLiveTextProviderCallBackendBridgeModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstLiveTextProviderCallBackendBridgeRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function FirstLiveTextProviderCallBackendBridgeCockpitSection() {
  return <FirstLiveTextProviderCallBackendBridgeRoutePanel routeSlug="first-live-text-provider-call-backend-bridge-completion" embedded />;
}

export function FirstLiveTextProviderCallBackendBridgeRoutePanel({ routeSlug, embedded = false }: { routeSlug: FirstLiveTextProviderCallBackendBridgeRouteSlug; embedded?: boolean }) {
  const model = buildFirstLiveTextProviderCallBackendBridgeModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-first-live-text-provider-call-backend-bridge={FIRST_LIVE_TEXT_PROVIDER_CALL_BACKEND_BRIDGE_SHARED_MARKERS.join(" | ")} data-codexforge-first-live-text-provider-call-backend-bridge-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "First Live Text Provider Call Backend Bridge" : model.route.phase}</span>
            <span className={styles.safeBadge}>disabled by default</span>
            <span className={styles.blockedBadge}>backend runtime check remains required</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Live Text Provider Call Backend Bridge" : model.route.title}</h1>
          <p className={styles.heroLead}>This is the first tightly controlled live text provider call bridge surface. It prepares one future backend-owned path for a single approved text provider only, one harmless approved prompt only, manual operator approval required before live text provider call, backend-owned credential reference only, tiny cost cap, audit/result capture, and a hard kill switch. The frontend never sees provider keys, provider tokens, or plaintext secrets, and live call cannot execute until a backend-owned execution runtime exists.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Provider" value="One Text" detail="single approved text provider only" />
            <MetricCard label="Prompt" value="One" detail="Return OK and the approved dry-run id." />
            <MetricCard label="Credential" value="Backend" detail="backend-owned credential reference only" />
            <MetricCard label="Execution" value="Blocked" detail="no broad provider execution" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="First live text provider call backend bridge preview">
          <p className={styles.missionLabel}>3178-3209 - First Live Text Provider Call Backend Bridge</p>
          <p className={styles.missionDetail}>Provider key never exposed to frontend. Provider token never exposed to frontend. Frontend secret exposure remains blocked. No provider key in frontend. No token in frontend. No plaintext secrets. No browser storage for secrets. No frontend process.env provider key reads. No provider SDK imports in frontend. No image provider calls. No audio provider calls. No video provider calls. No render execution. No artifact export execution. No publish gateway execution.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="First live text provider call backend bridge safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildFirstLiveTextProviderCallBackendBridgeStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="First live text provider route contract">
        <PanelHeading eyebrow="First Live Text Provider Call Backend Bridge" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildFirstLiveTextProviderCallBackendBridgeStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="First live text provider approval rail">
        <PanelHeading eyebrow="manual operator approval required before live text provider call" title="single approved text provider only" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{model.readinessItems.map((item, index) => <button key={buildFirstLiveTextProviderCallBackendBridgeStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only backend bridge contract</span><small>disabled by default backend runtime check remains required</small></button>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="First live text provider denied execution lane">
        <PanelHeading eyebrow="first live text provider readiness gate" title="Broad provider execution and frontend secrets stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{model.deniedItems.map((denial, index) => <span key={buildFirstLiveTextProviderCallBackendBridgeStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This static readiness surface does not enable broad provider execution. It does not call providers, models, image providers, audio providers, or video providers. It does not render, export artifacts, publish, upload to platforms, create OAuth flows, create webhooks, create signed URLs, create frontend services, create frontend APIs, deploy runtimes, run workers, execute commands, spawn processes, write files from the app, expose provider keys, expose provider tokens, store plaintext secrets, or use browser storage for secrets.</p>
      </section>
      <section className={styles.diagnosticPanel} aria-label="First live text provider call backend bridge route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3178-3209 first live text provider call backend bridge coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildFirstLiveTextProviderCallBackendBridgeStableKey(["first-live-text-provider-call-backend-bridge-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
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