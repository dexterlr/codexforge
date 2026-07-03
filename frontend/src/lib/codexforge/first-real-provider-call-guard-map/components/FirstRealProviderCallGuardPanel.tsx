"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  FIRST_REAL_PROVIDER_CALL_GUARD_DENIED_ITEMS,
  FIRST_REAL_PROVIDER_CALL_GUARD_EGRESS_ITEMS,
  FIRST_REAL_PROVIDER_CALL_GUARD_ELIGIBILITY_ITEMS,
  FIRST_REAL_PROVIDER_CALL_GUARD_ENFORCEMENT_ITEMS,
  FIRST_REAL_PROVIDER_CALL_GUARD_ITEMS,
  FIRST_REAL_PROVIDER_CALL_GUARD_RECOVERY_ITEMS,
  FIRST_REAL_PROVIDER_CALL_GUARD_SAFETY_ITEMS,
  FIRST_REAL_PROVIDER_CALL_GUARD_SHARED_MARKERS,
  buildFirstRealProviderCallGuardModel,
  buildFirstRealProviderCallGuardStableKey,
  type FirstRealProviderCallGuardRouteSlug,
} from "../first-real-provider-call-guard-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function FirstRealProviderCallGuardPageClientShell({ routeSlug }: { routeSlug: FirstRealProviderCallGuardRouteSlug }) {
  const model = buildFirstRealProviderCallGuardModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <FirstRealProviderCallGuardRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function FirstRealProviderCallGuardCockpitSection() {
  return <FirstRealProviderCallGuardRoutePanel routeSlug="first-real-provider-call-guard-completion-candidate" embedded />;
}

export function FirstRealProviderCallGuardRoutePanel({ routeSlug, embedded = false }: { routeSlug: FirstRealProviderCallGuardRouteSlug; embedded?: boolean }) {
  const model = buildFirstRealProviderCallGuardModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-first-real-provider-call-guard={FIRST_REAL_PROVIDER_CALL_GUARD_SHARED_MARKERS.join(" | ")} data-codexforge-first-real-provider-call-guard-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "First Real Provider Call Guard" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic real provider call guard data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Real Provider Call Guard" : model.route.title}</h1>
          <p className={styles.heroLead}>Review-only first real provider call guard defines the absolute guardrails required before any future real provider call can be considered. Eligibility checklist, execution lock, backend-only gate, operator approval enforcement, audit enforcement, credential presence, token redaction, prompt transmission, SDK import isolation, network egress, cost, safety, privacy, observability, rollback, and denial visibility remain synthetic and blocked.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Eligibility checklist" value="Required" detail="Review-only guard map" />
            <MetricCard label="Execution lock" value="Locked" detail="Real call lane disabled" />
            <MetricCard label="Backend-only gate" value="Required" detail="No frontend API creation" />
            <MetricCard label="Prompt transmission" value="Blocked" detail="No provider calls" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="First real provider call guard preview">
          <div className={styles.missionOrbOuter}><div className={styles.missionOrbInner}>0%</div></div>
          <p className={styles.missionLabel}>Real provider call</p>
          <p className={styles.missionDetail}>No provider calls. No model calls. Backend-owned provider adapter remains required.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="First real provider call guard safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildFirstRealProviderCallGuardStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="First Real Provider Call Guard Map">
        <PanelHeading eyebrow="First Real Provider Call Guard Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildFirstRealProviderCallGuardStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Real Provider Call Cockpit Readiness Rail">
        <PanelHeading eyebrow="Real Provider Call Cockpit Readiness Rail" title="First real provider call remains blocked" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{FIRST_REAL_PROVIDER_CALL_GUARD_ITEMS.map((item, index) => <button key={buildFirstRealProviderCallGuardStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>Review-only first real provider call guard</span><small>No provider calls no model calls no prompt sending</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Real provider call eligibility and enforcement guard preview">
        <CatalogPanel eyebrow="Real Provider Call Eligibility Checklist" title="Mandatory real call prerequisites" items={FIRST_REAL_PROVIDER_CALL_GUARD_ELIGIBILITY_ITEMS} />
        <CatalogPanel eyebrow="Real Provider Execution Lock" title="Backend-only execution gate remains locked" items={FIRST_REAL_PROVIDER_CALL_GUARD_ENFORCEMENT_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Real provider call prompt SDK egress rate timeout cost safety privacy observability guards">
        <CatalogPanel eyebrow="Real Provider Prompt Transmission Guard" title="SDK import egress rate timeout cost safety privacy observability" items={FIRST_REAL_PROVIDER_CALL_GUARD_EGRESS_ITEMS} />
        <CatalogPanel eyebrow="Real Provider Rollback Guard" title="Recovery and rollback remain backend-owned" items={FIRST_REAL_PROVIDER_CALL_GUARD_RECOVERY_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Disabled Real Provider Call Lane">
        <PanelHeading eyebrow="Disabled Real Provider Call Lane" title="Protected real provider call paths stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{FIRST_REAL_PROVIDER_CALL_GUARD_DENIED_ITEMS.map((denial, index) => <span key={buildFirstRealProviderCallGuardStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>Real provider call remains backend-owned and blocked. No route handlers for live provider execution, service creation, API creation, provider SDK imports, network egress, credential storage, token storage, prompt transmission, response capture persistence, queue dispatch, worker dispatch, approval persistence, audit persistence, or telemetry transmission exists in this guard.</p>
      </section>
      <section className={styles.glassPanel} aria-label="Real provider call safety navigation smoke checkpoint guards">
        <PanelHeading eyebrow="Real Provider Call Safety Regression Guard" title="Fixture prompt credential streaming navigation smoke and checkpoint guards" badge="Review-only" />
        <div className={styles.systemsGrid}>{FIRST_REAL_PROVIDER_CALL_GUARD_SAFETY_ITEMS.map((guard) => <article key={buildFirstRealProviderCallGuardStableKey(["guard", guard.id])} className={styles.systemCard}><span className={styles.systemTier}>Guardrail</span><strong>{guard.label}</strong><p className={styles.systemStatus}>{guard.state}</p></article>)}</div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="First real provider call guard route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2506-2537 first real provider call guard coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildFirstRealProviderCallGuardStableKey(["first-real-provider-call-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}
function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildFirstRealProviderCallGuardStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>Synthetic fixture</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}
function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
