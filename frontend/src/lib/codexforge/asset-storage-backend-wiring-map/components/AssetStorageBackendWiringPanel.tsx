"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  ASSET_STORAGE_BACKEND_WIRING_BLOCKED_ACTION_ITEMS,
  ASSET_STORAGE_BACKEND_WIRING_CONTROL_ITEMS,
  ASSET_STORAGE_BACKEND_WIRING_PROTECTED_BOUNDARY_ITEMS,
  ASSET_STORAGE_BACKEND_WIRING_SHARED_MARKERS,
  buildAssetStorageBackendWiringModel,
  buildAssetStorageBackendWiringStableKey,
  type AssetStorageBackendWiringRouteSlug,
} from "../asset-storage-backend-wiring-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function AssetStorageBackendWiringPageClientShell({ routeSlug }: { routeSlug: AssetStorageBackendWiringRouteSlug }) {
  const model = buildAssetStorageBackendWiringModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <AssetStorageBackendWiringRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function AssetStorageBackendWiringCockpitSection() {
  return <AssetStorageBackendWiringRoutePanel routeSlug="asset-storage-backend-wiring-completion" embedded />;
}

export function AssetStorageBackendWiringRoutePanel({ routeSlug, embedded = false }: { routeSlug: AssetStorageBackendWiringRouteSlug; embedded?: boolean }) {
  const model = buildAssetStorageBackendWiringModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-asset-storage-backend-wiring={ASSET_STORAGE_BACKEND_WIRING_SHARED_MARKERS.join(" | ")} data-codexforge-asset-storage-backend-wiring-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Asset Storage Backend Wiring" : model.route.phase}</span>
            <span className={styles.safeBadge}>review-only asset storage diagnostic</span>
            <span className={styles.blockedBadge}>blocked asset storage execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Asset Storage Backend Wiring" : model.route.title}</h1>
          <p className={styles.heroLead}>This route is a review-only asset storage diagnostic and is blocked from live asset storage execution. It protects upload, download, storage mutation, asset persistence, file system writes from the app, provider calls, model calls, prompt egress, network egress, fetch/network calls, SDK/provider imports, storage provider imports, credentials, tokens, browser storage, frontend persistence, connectors, render/export/publish/schedule, command execution, services, API creation, queues, workers, process spawning, port binding, and runtime deploy. Do not claim live asset storage exists. Do not claim live upload/download exists.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Route slug" value={model.route.slug} detail={model.route.href} />
            <MetricCard label="Boundary" value="Protected" detail="protected asset storage boundary" />
            <MetricCard label="Execution" value="Blocked" detail="no live asset storage" />
            <MetricCard label="Next batch" value="2666?2697" detail="Audio Storage Backend Wiring" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Asset storage backend wiring preview">
          <div className={styles.missionOrbOuter}><div className={styles.missionOrbInner}>0%</div></div>
          <p className={styles.missionLabel}>Live asset storage</p>
          <p className={styles.missionDetail}>Blocked. No live asset storage. No upload/download. Upload blocked. Download blocked.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Asset storage backend wiring shared markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildAssetStorageBackendWiringStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Asset Storage Backend Wiring Route Map">
        <PanelHeading eyebrow="Asset Storage Backend Wiring" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildAssetStorageBackendWiringStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Asset storage blocked action matrix">
        <PanelHeading eyebrow="Blocked Action Matrix" title="Asset storage execution and runtime dispatch stay blocked" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{ASSET_STORAGE_BACKEND_WIRING_BLOCKED_ACTION_ITEMS.map((item) => <button key={buildAssetStorageBackendWiringStableKey(["blocked", item.id])} type="button" disabled className={styles.blockedCommandButton}><strong>{item.label}</strong><span>{item.state}</span><small>Review-only asset storage diagnostic</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Asset storage protected boundary and controls">
        <CatalogPanel eyebrow="Protected Asset Storage Boundary" title="Contract metadata validation path namespace approval audit and recovery controls" items={ASSET_STORAGE_BACKEND_WIRING_PROTECTED_BOUNDARY_ITEMS} />
        <CatalogPanel eyebrow="Asset Storage Control Coverage" title="Blocked upload download checkpoint and smoke wiring" items={ASSET_STORAGE_BACKEND_WIRING_CONTROL_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Asset storage completion guard">
        <PanelHeading eyebrow="Completion Guard" title="2634?2665 ? Asset Storage Backend Wiring Mega Batch v1" badge="Phase 2665" />
        <p className={styles.mutedText}>Asset Storage Backend Wiring is a review-only asset storage diagnostic with blocked asset storage execution, protected asset storage boundary, asset storage contract, asset metadata envelope, asset validation boundary, asset classification boundary, asset path policy, asset namespace guard, upload blocked, download blocked, storage mutation blocked, asset persistence blocked, no live asset storage, no upload/download, no file system writes from the app, no frontend persistence, no browser storage writes, no live provider calls, no model calls, no prompt sending, no streaming, no provider SDK imports, no storage provider imports, no network egress, no fetch/network calls, no connector calls, no render/export/publish/schedule, no command execution from the app, no service creation, no API creation from frontend, no queue dispatch, no worker dispatch, no process spawning, no port binding, no runtime deploy, no credential storage, no token storage, approval and audit enforcement, redaction boundary, observability trace markers, retry and fallback policy, rate guard, cost guard, privacy guard, safety guard, asset state, asset recovery, operator review, completion guard, and next likely batch: 2666?2697 ? Audio Storage Backend Wiring. Do not claim live asset storage exists. Do not claim live upload/download exists.</p>
      </section>
      <section className={styles.diagnosticPanel} aria-label="Asset storage backend wiring diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2634?2665 asset storage backend wiring coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildAssetStorageBackendWiringStableKey(["asset-storage-backend-wiring-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}

function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Review only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildAssetStorageBackendWiringStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>Protected boundary</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
