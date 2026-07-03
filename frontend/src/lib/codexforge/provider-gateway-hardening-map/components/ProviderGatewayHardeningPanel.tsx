"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  PROVIDER_GATEWAY_HARDENING_BLOCKED_ACTION_ITEMS,
  PROVIDER_GATEWAY_HARDENING_CONTROL_ITEMS,
  PROVIDER_GATEWAY_HARDENING_PROTECTED_BOUNDARY_ITEMS,
  PROVIDER_GATEWAY_HARDENING_SHARED_MARKERS,
  buildProviderGatewayHardeningModel,
  buildProviderGatewayHardeningStableKey,
  type ProviderGatewayHardeningRouteSlug,
} from "../provider-gateway-hardening-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ProviderGatewayHardeningPageClientShell({ routeSlug }: { routeSlug: ProviderGatewayHardeningRouteSlug }) {
  const model = buildProviderGatewayHardeningModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProviderGatewayHardeningRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ProviderGatewayHardeningCockpitSection() {
  return <ProviderGatewayHardeningRoutePanel routeSlug="provider-gateway-hardening-completion" embedded />;
}

export function ProviderGatewayHardeningRoutePanel({ routeSlug, embedded = false }: { routeSlug: ProviderGatewayHardeningRouteSlug; embedded?: boolean }) {
  const model = buildProviderGatewayHardeningModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-provider-gateway-hardening={PROVIDER_GATEWAY_HARDENING_SHARED_MARKERS.join(" | ")} data-codexforge-provider-gateway-hardening-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Provider Gateway Hardening" : model.route.phase}</span>
            <span className={styles.safeBadge}>review-only provider gateway diagnostic</span>
            <span className={styles.blockedBadge}>blocked provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Provider Gateway Hardening" : model.route.title}</h1>
          <p className={styles.heroLead}>This route is a review-only provider gateway diagnostic and is blocked from live provider execution. It hardens request and response envelopes, approval and audit enforcement, denial handling, redaction boundary, observability trace markers, retry and fallback policy, rate guard, cost guard, safety guard, privacy guard, gateway state, gateway recovery, and completion guard without provider execution, model calls, prompt egress, network egress, SDK imports, credentials, tokens, persistence, browser storage, connectors, upload/download, render/export/publish/schedule, command execution, services, API creation, queues, workers, process spawning, port binding, or runtime deploy.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Route slug" value={model.route.slug} detail={model.route.href} />
            <MetricCard label="Boundary" value="Protected" detail="protected provider boundary" />
            <MetricCard label="Execution" value="Blocked" detail="no live provider calls" />
            <MetricCard label="Next batch" value="2634?2665" detail="Asset Storage Backend Wiring" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Provider gateway hardening preview">
          <div className={styles.missionOrbOuter}><div className={styles.missionOrbInner}>0%</div></div>
          <p className={styles.missionLabel}>Live provider execution</p>
          <p className={styles.missionDetail}>Blocked. No live provider calls. No model calls. No prompt sending. No streaming.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Provider gateway hardening shared markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildProviderGatewayHardeningStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Provider Gateway Hardening Route Map">
        <PanelHeading eyebrow="Provider Gateway Hardening" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildProviderGatewayHardeningStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Provider gateway blocked action matrix">
        <PanelHeading eyebrow="Blocked Action Matrix" title="Provider execution and runtime dispatch stay blocked" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{PROVIDER_GATEWAY_HARDENING_BLOCKED_ACTION_ITEMS.map((item) => <button key={buildProviderGatewayHardeningStableKey(["blocked", item.id])} type="button" disabled className={styles.blockedCommandButton}><strong>{item.label}</strong><span>{item.state}</span><small>Review-only provider gateway diagnostic</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Provider gateway protected boundary and controls">
        <CatalogPanel eyebrow="Protected Provider Boundary" title="Approval audit denial redaction and observability controls" items={PROVIDER_GATEWAY_HARDENING_PROTECTED_BOUNDARY_ITEMS} />
        <CatalogPanel eyebrow="Gateway Control Coverage" title="Envelope handoff checkpoint and smoke hardening" items={PROVIDER_GATEWAY_HARDENING_CONTROL_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Provider gateway completion guard">
        <PanelHeading eyebrow="Completion Guard" title="2602?2633 ? Provider Gateway Hardening Mega Batch v1" badge="Phase 2633" />
        <p className={styles.mutedText}>Provider Gateway Hardening is a review-only provider gateway diagnostic with blocked provider execution, protected provider boundary, no live provider calls, no model calls, no prompt sending, no streaming, no provider SDK imports, no network egress, no fetch/network calls, no frontend persistence, no browser storage writes, no connector calls, no upload/download, no render/export/publish/schedule, no command execution from the app, no service creation, no API creation from frontend, no queue dispatch, no worker dispatch, no process spawning, no port binding, no runtime deploy, no credential storage, no token storage, approval and audit enforcement, denial handling, redaction boundary, observability trace markers, retry and fallback policy, rate guard, cost guard, safety guard, privacy guard, gateway state, gateway recovery, completion guard, and next likely batch: 2634?2665 ? Asset Storage Backend Wiring.</p>
      </section>
      <section className={styles.diagnosticPanel} aria-label="Provider gateway hardening diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2602?2633 provider gateway hardening coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildProviderGatewayHardeningStableKey(["provider-gateway-hardening-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}

function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Review only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildProviderGatewayHardeningStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>Protected boundary</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}