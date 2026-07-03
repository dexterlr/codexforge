"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  PROVIDER_BACKEND_EXECUTION_BRIDGE_ITEMS,
  PROVIDER_BACKEND_EXECUTION_CONTRACT_ITEMS,
  PROVIDER_BACKEND_EXECUTION_DENIED_ITEMS,
  PROVIDER_BACKEND_EXECUTION_EGRESS_ITEMS,
  PROVIDER_BACKEND_EXECUTION_GUARDS,
  PROVIDER_BACKEND_EXECUTION_PREREQUISITE_MATRIX,
  PROVIDER_BACKEND_EXECUTION_READINESS_ITEMS,
  PROVIDER_BACKEND_EXECUTION_READINESS_SHARED_MARKERS,
  PROVIDER_BACKEND_EXECUTION_RUNTIME_ITEMS,
  buildProviderBackendExecutionReadinessModel,
  buildProviderBackendExecutionReadinessStableKey,
  type ProviderBackendExecutionReadinessRouteSlug,
} from "../provider-backend-execution-readiness-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ProviderBackendExecutionReadinessPageClientShell({ routeSlug }: { routeSlug: ProviderBackendExecutionReadinessRouteSlug }) {
  const model = buildProviderBackendExecutionReadinessModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProviderBackendExecutionReadinessRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ProviderBackendExecutionReadinessCockpitSection() {
  return <ProviderBackendExecutionReadinessRoutePanel routeSlug="provider-backend-execution-completion-candidate" embedded />;
}

export function ProviderBackendExecutionReadinessRoutePanel({ routeSlug, embedded = false }: { routeSlug: ProviderBackendExecutionReadinessRouteSlug; embedded?: boolean }) {
  const model = buildProviderBackendExecutionReadinessModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-provider-backend-execution-readiness={PROVIDER_BACKEND_EXECUTION_READINESS_SHARED_MARKERS.join(" | ")} data-codexforge-provider-backend-execution-readiness-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Provider Backend Execution Readiness" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic provider backend execution readiness data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Provider Backend Execution Readiness" : model.route.title}</h1>
          <p className={styles.heroLead}>Review-only provider backend execution readiness defines the backend prerequisites required before any future real provider call can be attempted. The readiness boundary covers prerequisite matrix review, backend-owned execution contract shape, server runtime boundary, credential injection readiness, token redaction readiness, approval enforcement readiness, audit persistence readiness, SDK isolation readiness, network egress blocking, and a dry-run-to-real bridge while keeping provider execution disabled.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Prerequisite matrix" value="Review-only" detail="Synthetic readiness data" />
            <MetricCard label="Execution contract" value="Backend-owned" detail="No frontend API creation" />
            <MetricCard label="Server runtime" value="Required" detail="No service creation" />
            <MetricCard label="Execution lane" value="Disabled" detail="First real provider call guard next" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Provider backend execution readiness preview">
          <div className={styles.missionOrbOuter}><div className={styles.missionOrbInner}>0%</div></div>
          <p className={styles.missionLabel}>Provider execution</p>
          <p className={styles.missionDetail}>No provider calls. No model calls. Backend-owned provider adapter remains required.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Provider backend execution readiness safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildProviderBackendExecutionReadinessStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Provider Backend Execution Readiness Map">
        <PanelHeading eyebrow="Provider Backend Execution Readiness Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildProviderBackendExecutionReadinessStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Provider Backend Execution Cockpit Readiness Rail">
        <PanelHeading eyebrow="Provider Backend Execution Cockpit Readiness Rail" title="Backend execution prerequisites remain review-only" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{PROVIDER_BACKEND_EXECUTION_READINESS_ITEMS.map((item, index) => <button key={buildProviderBackendExecutionReadinessStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>Review-only provider backend execution readiness</span><small>No provider calls no model calls no prompt sending</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Provider backend execution prerequisite matrix and contract preview">
        <CatalogPanel eyebrow="Provider Execution Prerequisite Matrix" title="Review-only prerequisite matrix" items={PROVIDER_BACKEND_EXECUTION_PREREQUISITE_MATRIX} />
        <CatalogPanel eyebrow="Provider Backend Execution Contract" title="Backend-owned execution contract preview" items={PROVIDER_BACKEND_EXECUTION_CONTRACT_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Provider runtime credential token approval audit readiness">
        <CatalogPanel eyebrow="Provider Server Runtime Boundary" title="Runtime credential token approval audit readiness" items={PROVIDER_BACKEND_EXECUTION_RUNTIME_ITEMS} />
        <CatalogPanel eyebrow="Provider SDK Isolation Readiness" title="SDK egress rate timeout cost safety privacy observability" items={PROVIDER_BACKEND_EXECUTION_EGRESS_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Provider dry run to real bridge and acceptance criteria">
        <CatalogPanel eyebrow="Provider Dry Run To Real Bridge" title="Dry-run-to-real readiness bridge" items={PROVIDER_BACKEND_EXECUTION_BRIDGE_ITEMS} />
        <CatalogPanel eyebrow="Provider Backend Execution Acceptance Criteria" title="Automatic promotion remains blocked" items={PROVIDER_BACKEND_EXECUTION_PREREQUISITE_MATRIX} />
      </section>
      <section className={styles.glassPanel} aria-label="Disabled Provider Backend Execution Lane">
        <PanelHeading eyebrow="Disabled Provider Backend Execution Lane" title="Protected provider backend execution paths stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{PROVIDER_BACKEND_EXECUTION_DENIED_ITEMS.map((denial, index) => <span key={buildProviderBackendExecutionReadinessStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>Backend-owned provider adapter remains required before real provider execution, model execution, prompt transmission, streaming, credential handling, token handling, queue dispatch, worker dispatch, route handler execution, service creation, API creation, approval persistence, audit persistence, or telemetry transmission can exist.</p>
      </section>
      <section className={styles.glassPanel} aria-label="Provider backend execution safety navigation smoke checkpoint guards">
        <PanelHeading eyebrow="Provider Backend Execution Safety Regression Guard" title="Fixture prompt credential streaming navigation smoke and checkpoint guards" badge="Review-only" />
        <div className={styles.systemsGrid}>{PROVIDER_BACKEND_EXECUTION_GUARDS.map((guard) => <article key={buildProviderBackendExecutionReadinessStableKey(["guard", guard.id])} className={styles.systemCard}><span className={styles.systemTier}>Guardrail</span><strong>{guard.label}</strong><p className={styles.systemStatus}>{guard.state}</p></article>)}</div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="Provider backend execution readiness route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2474-2505 provider backend execution readiness coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildProviderBackendExecutionReadinessStableKey(["provider-backend-execution-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}
function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildProviderBackendExecutionReadinessStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>Synthetic fixture</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}
function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
