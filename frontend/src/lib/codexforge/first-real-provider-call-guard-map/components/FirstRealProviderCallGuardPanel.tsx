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
  return <FirstRealProviderCallGuardRoutePanel routeSlug="first-real-provider-call-guard-completion" embedded />;
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
            <span className={styles.safeBadge}>synthetic first real provider call guard data only</span>
            <span className={styles.blockedBadge}>no live provider calls</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Real Provider Call Guard" : model.route.title}</h1>
          <p className={styles.heroLead}>This is a review-only first real provider call guard for a future backend-owned, explicitly approved, single real provider call. The first real provider call remains blocked until explicit operator approval while provider call intent, approval packet, credential and token reference boundaries, request response and error envelopes, dry lock, preflight checklist, prompt redaction preview, cost and rate estimates, privacy and safety gates, region and data retention policy, timeout retry fallback recovery policy, audit packet, observability trace, result review, handoffs, operator review, readiness gate, and completion stay synthetic.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Intent" value="Review-only" detail="provider call intent" />
            <MetricCard label="Approval" value="Required" detail="provider call approval packet" />
            <MetricCard label="Dry lock" value="Locked" detail="provider call dry lock" />
            <MetricCard label="Execution" value="Blocked" detail="provider call execution remains blocked" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="First real provider call guard preview">
          <p className={styles.missionLabel}>3018-3049 - First Real Provider Call Guard</p>
          <p className={styles.missionDetail}>No live provider calls. No model calls. No prompt sending. No streaming. No provider SDK imports. No network egress. No frontend persistence. No credential storage. No token storage. No provider key storage.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="First real provider call guard safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildFirstRealProviderCallGuardStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="First Real Provider Call Guard Map">
        <PanelHeading eyebrow="First Real Provider Call Guard" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildFirstRealProviderCallGuardStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Real Provider Call Cockpit Readiness Rail">
        <PanelHeading eyebrow="First real provider call readiness gate" title="first real provider call remains blocked until explicit operator approval" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{FIRST_REAL_PROVIDER_CALL_GUARD_ITEMS.map((item, index) => <button key={buildFirstRealProviderCallGuardStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only first real provider call guard</span><small>no live provider calls no model calls no prompt sending</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Provider call intent approval credential token request response error preflight redaction preview">
        <CatalogPanel eyebrow="provider call intent" title="Approval credential token and envelope guard surfaces" items={FIRST_REAL_PROVIDER_CALL_GUARD_ELIGIBILITY_ITEMS} />
        <CatalogPanel eyebrow="provider call dry lock" title="Execution privacy safety region and data retention gates" items={FIRST_REAL_PROVIDER_CALL_GUARD_ENFORCEMENT_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Provider call cost rate timeout retry fallback recovery audit observability result handoff review">
        <CatalogPanel eyebrow="provider call cost estimate" title="Rate timeout retry fallback recovery audit observability result review" items={FIRST_REAL_PROVIDER_CALL_GUARD_EGRESS_ITEMS} />
        <CatalogPanel eyebrow="operator review remains required before first real provider call" title="Registry routing bridge runner and readiness handoffs" items={FIRST_REAL_PROVIDER_CALL_GUARD_RECOVERY_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Disabled Real Provider Call Lane">
        <PanelHeading eyebrow="disabled live-call candidate" title="Protected real provider call paths stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{FIRST_REAL_PROVIDER_CALL_GUARD_DENIED_ITEMS.map((denial, index) => <span key={buildFirstRealProviderCallGuardStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This disabled live-call candidate is review-only and synthetic. It does not call providers, call models, send prompts, stream, import provider SDKs, use network egress, create services, create APIs from the frontend, persist credentials, persist tokens, persist provider keys, dispatch workers, execute jobs, render, export, publish, bind ports, or deploy runtimes.</p>
      </section>
      <section className={styles.glassPanel} aria-label="Real provider call safety navigation smoke checkpoint guards">
        <PanelHeading eyebrow="Audit and observability packets" title="Handoff review and completion stay synthetic" badge="Review-only" />
        <div className={styles.systemsGrid}>{FIRST_REAL_PROVIDER_CALL_GUARD_SAFETY_ITEMS.map((guard) => <article key={buildFirstRealProviderCallGuardStableKey(["guard", guard.id])} className={styles.systemCard}><span className={styles.systemTier}>Guardrail</span><strong>{guard.label}</strong><p className={styles.systemStatus}>{guard.state}</p></article>)}</div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="First real provider call guard route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3018-3049 first real provider call guard coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildFirstRealProviderCallGuardStableKey(["first-real-provider-call-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}
function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildFirstRealProviderCallGuardStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>synthetic first real provider call guard data only</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}
function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
