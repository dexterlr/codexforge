"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  APPROVED_TEXT_PLANNING_TRIAL_DENIED_ITEMS,
  APPROVED_TEXT_PLANNING_TRIAL_ENVELOPE_ITEMS,
  APPROVED_TEXT_PLANNING_TRIAL_GOVERNANCE_ITEMS,
  APPROVED_TEXT_PLANNING_TRIAL_ITEMS,
  APPROVED_TEXT_PLANNING_TRIAL_PLANNING_ITEMS,
  APPROVED_TEXT_PLANNING_TRIAL_REVIEW_ITEMS,
  APPROVED_TEXT_PLANNING_TRIAL_SHARED_MARKERS,
  buildApprovedTextPlanningTrialModel,
  buildApprovedTextPlanningTrialStableKey,
  type ApprovedTextPlanningTrialRouteSlug,
} from "../approved-text-planning-provider-trial-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ApprovedTextPlanningTrialPageClientShell({ routeSlug }: { routeSlug: ApprovedTextPlanningTrialRouteSlug }) {
  const model = buildApprovedTextPlanningTrialModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ApprovedTextPlanningTrialRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ApprovedTextPlanningTrialCockpitSection() {
  return <ApprovedTextPlanningTrialRoutePanel routeSlug="first-approved-text-planning-provider-trial-completion" embedded />;
}

export function ApprovedTextPlanningTrialRoutePanel({ routeSlug, embedded = false }: { routeSlug: ApprovedTextPlanningTrialRouteSlug; embedded?: boolean }) {
  const model = buildApprovedTextPlanningTrialModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-approved-text-planning-trial={APPROVED_TEXT_PLANNING_TRIAL_SHARED_MARKERS.join(" | ")} data-codexforge-approved-text-planning-trial-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "First Approved Text Planning Provider Trial" : model.route.phase}</span>
            <span className={styles.safeBadge}>synthetic text planning provider trial data only</span>
            <span className={styles.blockedBadge}>no live provider calls</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Approved Text Planning Provider Trial" : model.route.title}</h1>
          <p className={styles.heroLead}>This is a review-only approved text planning provider trial for a future backend-owned text planning provider path. The text planning provider trial remains blocked until explicit operator approval, and the surface stays static for idea expansion, video outline, prompt plan, storyboard text plan, metadata plan, risk review, safety review, redaction review, audit, observability, cost, rate, privacy, region, data retention, retry fallback, result review, runner handoff, readiness, and completion.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Intent" value="Review-only" detail="approved text planning intent" />
            <MetricCard label="Provider" value="Static" detail="approved text planning provider selection" />
            <MetricCard label="Dry lock" value="Locked" detail="approved text planning dry lock" />
            <MetricCard label="Execution" value="Blocked" detail="approved text planning execution remains blocked" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="First approved text planning provider trial preview">
          <p className={styles.missionLabel}>3050-3081 - First Approved Text Planning Provider Trial</p>
          <p className={styles.missionDetail}>No live provider calls. No text model calls. No model calls. No prompt sending. No streaming. No provider SDK imports. No text provider imports. No network egress. No frontend persistence. No credential storage. No token storage. No provider key storage.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Approved text planning provider trial safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildApprovedTextPlanningTrialStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Approved Text Planning Provider Trial Map">
        <PanelHeading eyebrow="First Approved Text Planning Provider Trial" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildApprovedTextPlanningTrialStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Approved text planning trial readiness rail">
        <PanelHeading eyebrow="approved text planning readiness gate" title="text planning provider trial remains blocked until explicit operator approval" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{APPROVED_TEXT_PLANNING_TRIAL_ITEMS.map((item, index) => <button key={buildApprovedTextPlanningTrialStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only approved text planning provider trial</span><small>no live provider calls no text model calls no prompt sending</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Approved text planning provider trial envelopes and planning lanes">
        <CatalogPanel eyebrow="approved text planning prompt envelope" title="Intent approval provider credential token and envelope boundaries" items={APPROVED_TEXT_PLANNING_TRIAL_ENVELOPE_ITEMS} />
        <CatalogPanel eyebrow="idea expansion remains synthetic" title="Idea expansion video outline prompt plan storyboard text plan metadata plan" items={APPROVED_TEXT_PLANNING_TRIAL_PLANNING_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Approved text planning provider trial review governance lanes">
        <CatalogPanel eyebrow="risk review remains review-only" title="Risk safety redaction audit and observability review" items={APPROVED_TEXT_PLANNING_TRIAL_REVIEW_ITEMS} />
        <CatalogPanel eyebrow="approved text planning cost estimate" title="Cost rate privacy region retention retry fallback result readiness" items={APPROVED_TEXT_PLANNING_TRIAL_GOVERNANCE_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Disabled approved text planning provider trial lane">
        <PanelHeading eyebrow="disabled provider trial candidate" title="Protected text planning provider paths stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{APPROVED_TEXT_PLANNING_TRIAL_DENIED_ITEMS.map((denial, index) => <span key={buildApprovedTextPlanningTrialStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This disabled text planning provider trial is review-only and synthetic. It does not call providers, call text models, call models, send prompts, stream, import provider SDKs, use network egress, create services, create APIs from the frontend, persist credentials, persist tokens, persist provider keys, dispatch workers, execute jobs, render, export, publish, bind ports, deploy runtimes, or write browser storage.</p>
      </section>
      <section className={styles.diagnosticPanel} aria-label="First approved text planning provider trial route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3050-3081 first approved text planning provider trial coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildApprovedTextPlanningTrialStableKey(["approved-text-planning-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}

function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildApprovedTextPlanningTrialStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>synthetic text planning provider trial data only</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
