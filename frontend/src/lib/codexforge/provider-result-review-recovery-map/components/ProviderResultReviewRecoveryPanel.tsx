"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  PROVIDER_RESULT_REVIEW_DENIED_ITEMS,
  PROVIDER_RESULT_REVIEW_ENVELOPE_ITEMS,
  PROVIDER_RESULT_REVIEW_JOIN_ITEMS,
  PROVIDER_RESULT_REVIEW_PROMOTION_ITEMS,
  PROVIDER_RESULT_REVIEW_RECOVERY_ITEMS,
  PROVIDER_RESULT_REVIEW_RETRY_ITEMS,
  PROVIDER_RESULT_REVIEW_SAFETY_ITEMS,
  PROVIDER_RESULT_REVIEW_RECOVERY_SHARED_MARKERS,
  buildProviderResultReviewRecoveryModel,
  buildProviderResultReviewRecoveryStableKey,
  type ProviderResultReviewRecoveryRouteSlug,
} from "../provider-result-review-recovery-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ProviderResultReviewRecoveryPageClientShell({ routeSlug }: { routeSlug: ProviderResultReviewRecoveryRouteSlug }) {
  const model = buildProviderResultReviewRecoveryModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ProviderResultReviewRecoveryRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ProviderResultReviewRecoveryCockpitSection() {
  return <ProviderResultReviewRecoveryRoutePanel routeSlug="provider-result-review-recovery-completion-candidate" embedded />;
}

export function ProviderResultReviewRecoveryRoutePanel({ routeSlug, embedded = false }: { routeSlug: ProviderResultReviewRecoveryRouteSlug; embedded?: boolean }) {
  const model = buildProviderResultReviewRecoveryModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-provider-result-review-recovery={PROVIDER_RESULT_REVIEW_RECOVERY_SHARED_MARKERS.join(" | ")} data-codexforge-provider-result-review-recovery-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Provider Result Review + Recovery" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic provider result review data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Provider Result Review + Recovery" : model.route.title}</h1>
          <p className={styles.heroLead}>Review-only provider result review recovery assembles result review envelope, safety review, privacy review, redaction review, audit join, approval join, rejection workflow, recovery plan, retry, fallback, timeout, cost, rate, observability, rollback, promotion criteria, disabled promotion lane, persistence blocker, export publish blocker, navigation guard, smoke coverage, and checkpoint readiness without executing providers or processing real model outputs.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Result review envelope" value="Synthetic" detail="No real output" />
            <MetricCard label="Safety privacy redaction" value="Required" detail="Review only" />
            <MetricCard label="Audit approval joins" value="Required" detail="No persistence" />
            <MetricCard label="Promotion lane" value="Disabled" detail="Backend-owned" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Provider result review recovery preview">
          <div className={styles.missionOrbOuter}><div className={styles.missionOrbInner}>0%</div></div>
          <p className={styles.missionLabel}>Result promotion</p>
          <p className={styles.missionDetail}>Blocked. No provider calls. No model calls. No result persistence.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Provider result review recovery safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildProviderResultReviewRecoveryStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Provider Result Review Recovery Map">
        <PanelHeading eyebrow="Provider Result Review Recovery Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildProviderResultReviewRecoveryStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Provider Result Review Cockpit Readiness Rail">
        <PanelHeading eyebrow="Provider Result Review Cockpit Readiness Rail" title="Provider result review and recovery remains blocked" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{PROVIDER_RESULT_REVIEW_RECOVERY_ITEMS.map((item, index) => <button key={buildProviderResultReviewRecoveryStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>Review-only provider result review recovery</span><small>No provider calls no model calls no result persistence</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Provider result review envelope and joins">
        <CatalogPanel eyebrow="Provider Result Review Envelope" title="Synthetic result envelope and required reviews" items={PROVIDER_RESULT_REVIEW_ENVELOPE_ITEMS} />
        <CatalogPanel eyebrow="Provider Result Audit Approval Joins" title="Audit approval rejection and recovery joins" items={PROVIDER_RESULT_REVIEW_JOIN_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Provider result retry fallback timeout cost rate observability rollback">
        <CatalogPanel eyebrow="Provider Result Retry Fallback Review" title="Retry fallback timeout cost rate observability rollback" items={PROVIDER_RESULT_REVIEW_RETRY_ITEMS} />
        <CatalogPanel eyebrow="Provider Result Promotion Criteria" title="Promotion remains disabled and backend-owned" items={PROVIDER_RESULT_REVIEW_PROMOTION_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Disabled Provider Result Promotion Lane">
        <PanelHeading eyebrow="Disabled Provider Result Promotion Lane" title="Protected provider result paths stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{PROVIDER_RESULT_REVIEW_DENIED_ITEMS.map((denial, index) => <span key={buildProviderResultReviewRecoveryStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>Provider result promotion remains backend-owned and blocked. No route handlers for live provider execution, service creation, API creation, provider SDK imports, network egress, credential storage, token storage, prompt transmission, streaming, result persistence, frontend persistence, browser storage writes, queue dispatch, worker dispatch, approval persistence, audit persistence, telemetry transmission, upload, download, render, export, publish, schedule, database writes, or command execution exists in this review layer.</p>
      </section>
      <section className={styles.glassPanel} aria-label="Provider result safety navigation smoke checkpoint guards">
        <PanelHeading eyebrow="Provider Result Safety Regression Guard" title="Fixture prompt credential streaming persistence export navigation smoke and checkpoint guards" badge="Review-only" />
        <div className={styles.systemsGrid}>{PROVIDER_RESULT_REVIEW_SAFETY_ITEMS.map((guard) => <article key={buildProviderResultReviewRecoveryStableKey(["guard", guard.id])} className={styles.systemCard}><span className={styles.systemTier}>Guardrail</span><strong>{guard.label}</strong><p className={styles.systemStatus}>{guard.state}</p></article>)}</div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="Provider result review recovery route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2570-2601 provider result review recovery coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildProviderResultReviewRecoveryStableKey(["provider-result-review-recovery-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}
function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildProviderResultReviewRecoveryStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>Synthetic fixture</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}
function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
