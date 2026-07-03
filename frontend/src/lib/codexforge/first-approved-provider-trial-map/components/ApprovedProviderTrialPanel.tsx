"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  APPROVED_PROVIDER_TRIAL_DENIED_ITEMS,
  APPROVED_PROVIDER_TRIAL_GATE_ITEMS,
  APPROVED_PROVIDER_TRIAL_ITEMS,
  APPROVED_PROVIDER_TRIAL_JOIN_ITEMS,
  APPROVED_PROVIDER_TRIAL_PACKET_ITEMS,
  APPROVED_PROVIDER_TRIAL_RECOVERY_ITEMS,
  APPROVED_PROVIDER_TRIAL_SAFETY_ITEMS,
  APPROVED_PROVIDER_TRIAL_SHARED_MARKERS,
  buildApprovedProviderTrialModel,
  buildApprovedProviderTrialStableKey,
  type ApprovedProviderTrialRouteSlug,
} from "../approved-provider-trial-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ApprovedProviderTrialPageClientShell({ routeSlug }: { routeSlug: ApprovedProviderTrialRouteSlug }) {
  const model = buildApprovedProviderTrialModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ApprovedProviderTrialRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ApprovedProviderTrialCockpitSection() {
  return <ApprovedProviderTrialRoutePanel routeSlug="first-approved-provider-trial-completion-candidate" embedded />;
}

export function ApprovedProviderTrialRoutePanel({ routeSlug, embedded = false }: { routeSlug: ApprovedProviderTrialRouteSlug; embedded?: boolean }) {
  const model = buildApprovedProviderTrialModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-first-approved-provider-trial={APPROVED_PROVIDER_TRIAL_SHARED_MARKERS.join(" | ")} data-codexforge-first-approved-provider-trial-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "First Approved Provider Trial" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic approved provider trial data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Approved Provider Trial" : model.route.title}</h1>
          <p className={styles.heroLead}>Review-only first approved provider trial assembles approval join, audit join, credential gate, token redaction gate, prompt boundary gate, SDK isolation gate, network egress gate, rate, timeout, cost, safety, privacy, observability, synthetic trial packet, result placeholder, rollback plan, operator review, and disabled lane readiness without executing providers or models.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Trial intent envelope" value="Synthetic" detail="Review-only packet" />
            <MetricCard label="Approval and audit joins" value="Required" detail="No persistence" />
            <MetricCard label="Prompt and SDK gates" value="Blocked" detail="No transmission" />
            <MetricCard label="Trial lane" value="Disabled" detail="No provider calls" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="First approved provider trial preview">
          <div className={styles.missionOrbOuter}><div className={styles.missionOrbInner}>0%</div></div>
          <p className={styles.missionLabel}>Approved provider trial</p>
          <p className={styles.missionDetail}>No provider calls. No model calls. Trial result placeholder is synthetic only.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="First approved provider trial safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildApprovedProviderTrialStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="First Approved Provider Trial Map">
        <PanelHeading eyebrow="First Approved Provider Trial Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildApprovedProviderTrialStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Approved Provider Trial Cockpit Readiness Rail">
        <PanelHeading eyebrow="Approved Provider Trial Cockpit Readiness Rail" title="First approved provider trial remains blocked" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{APPROVED_PROVIDER_TRIAL_ITEMS.map((item, index) => <button key={buildApprovedProviderTrialStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>Review-only first approved provider trial</span><small>No provider calls no model calls no prompt sending</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Approved provider trial approval audit intent joins">
        <CatalogPanel eyebrow="Approved Provider Trial Intent Envelope" title="Synthetic approved trial envelope" items={APPROVED_PROVIDER_TRIAL_JOIN_ITEMS} />
        <CatalogPanel eyebrow="Approved Provider Trial Gate Summary" title="Credential token prompt SDK egress joins" items={APPROVED_PROVIDER_TRIAL_GATE_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Approved provider trial packet result rollback review">
        <CatalogPanel eyebrow="Approved Provider Trial Synthetic Packet" title="Packet result placeholder rollback review" items={APPROVED_PROVIDER_TRIAL_PACKET_ITEMS} />
        <CatalogPanel eyebrow="Approved Provider Trial Recovery" title="Recovery remains backend-owned and auditable" items={APPROVED_PROVIDER_TRIAL_RECOVERY_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Disabled Approved Provider Trial Lane">
        <PanelHeading eyebrow="Disabled Approved Provider Trial Lane" title="Protected approved provider trial paths stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{APPROVED_PROVIDER_TRIAL_DENIED_ITEMS.map((denial, index) => <span key={buildApprovedProviderTrialStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>Approved provider trial remains backend-owned and blocked. No route handlers for live provider execution, service creation, API creation, provider SDK imports, network egress, credential storage, token storage, prompt transmission, response capture persistence, queue dispatch, worker dispatch, approval persistence, audit persistence, telemetry transmission, streaming, upload, download, render, export, publish, schedule, database writes, or command execution exists in this trial layer.</p>
      </section>
      <section className={styles.glassPanel} aria-label="Approved provider trial safety navigation smoke checkpoint guards">
        <PanelHeading eyebrow="Approved Provider Trial Safety Regression Guard" title="Fixture prompt credential streaming navigation smoke and checkpoint guards" badge="Review-only" />
        <div className={styles.systemsGrid}>{APPROVED_PROVIDER_TRIAL_SAFETY_ITEMS.map((guard) => <article key={buildApprovedProviderTrialStableKey(["guard", guard.id])} className={styles.systemCard}><span className={styles.systemTier}>Guardrail</span><strong>{guard.label}</strong><p className={styles.systemStatus}>{guard.state}</p></article>)}</div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="First approved provider trial route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2538-2569 first approved provider trial coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildApprovedProviderTrialStableKey(["first-approved-provider-trial-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}
function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildApprovedProviderTrialStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>Synthetic fixture</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}
function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
