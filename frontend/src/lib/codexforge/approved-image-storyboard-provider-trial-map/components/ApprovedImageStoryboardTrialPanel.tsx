"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  APPROVED_IMAGE_STORYBOARD_TRIAL_DENIED_ITEMS,
  APPROVED_IMAGE_STORYBOARD_TRIAL_ENVELOPE_ITEMS,
  APPROVED_IMAGE_STORYBOARD_TRIAL_GOVERNANCE_ITEMS,
  APPROVED_IMAGE_STORYBOARD_TRIAL_ITEMS,
  APPROVED_IMAGE_STORYBOARD_TRIAL_PLANNING_ITEMS,
  APPROVED_IMAGE_STORYBOARD_TRIAL_REVIEW_ITEMS,
  APPROVED_IMAGE_STORYBOARD_TRIAL_SHARED_MARKERS,
  buildApprovedImageStoryboardTrialModel,
  buildApprovedImageStoryboardTrialStableKey,
  type ApprovedImageStoryboardTrialRouteSlug
} from "../approved-image-storyboard-provider-trial-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ApprovedImageStoryboardTrialPageClientShell({ routeSlug }: { routeSlug: ApprovedImageStoryboardTrialRouteSlug }) {
  const model = buildApprovedImageStoryboardTrialModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ApprovedImageStoryboardTrialRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ApprovedImageStoryboardTrialCockpitSection() {
  return <ApprovedImageStoryboardTrialRoutePanel routeSlug="first-approved-image-storyboard-provider-trial-completion" embedded />;
}

export function ApprovedImageStoryboardTrialRoutePanel({ routeSlug, embedded = false }: { routeSlug: ApprovedImageStoryboardTrialRouteSlug; embedded?: boolean }) {
  const model = buildApprovedImageStoryboardTrialModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-approved-image-storyboard-trial={APPROVED_IMAGE_STORYBOARD_TRIAL_SHARED_MARKERS.join(" | ")} data-codexforge-approved-image-storyboard-trial-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "First Approved Image Storyboard Provider Trial" : model.route.phase}</span>
            <span className={styles.safeBadge}>synthetic image storyboard provider trial data only</span>
            <span className={styles.blockedBadge}>no live provider calls</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Approved Image Storyboard Provider Trial" : model.route.title}</h1>
          <p className={styles.heroLead}>This is a review-only approved image storyboard provider trial for a future backend-owned image and storyboard provider path. The image storyboard provider trial remains blocked until explicit operator approval, and the surface stays static for visual brief review, storyboard frame plan, image prompt packet, keyframe candidate review, visual safety review, image provider selection, synthetic image result envelope, operator review, audit, redaction, cost, rate, privacy, safety, region, data retention, retry fallback, asset storage handoff, runner handoff, readiness, and completion.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Intent" value="Review-only" detail="approved image storyboard intent" />
            <MetricCard label="Provider" value="Static" detail="approved image storyboard provider selection" />
            <MetricCard label="Dry lock" value="Locked" detail="approved image storyboard dry lock" />
            <MetricCard label="Execution" value="Blocked" detail="approved image storyboard execution remains blocked" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="First approved image storyboard provider trial preview">
          <p className={styles.missionLabel}>3082-3113 - First Approved Image Storyboard Provider Trial</p>
          <p className={styles.missionDetail}>No live provider calls. No image model calls. No model calls. No prompt sending. No image generation. No keyframe generation. No storyboard execution. No streaming. No provider SDK imports. No image provider imports. No network egress. No frontend persistence. No credential storage. No token storage. No provider key storage.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Approved image storyboard provider trial safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildApprovedImageStoryboardTrialStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Approved Image Storyboard Provider Trial Map">
        <PanelHeading eyebrow="First Approved Image Storyboard Provider Trial" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildApprovedImageStoryboardTrialStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Approved image storyboard trial readiness rail">
        <PanelHeading eyebrow="approved image storyboard readiness gate" title="image storyboard provider trial remains blocked until explicit operator approval" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{APPROVED_IMAGE_STORYBOARD_TRIAL_ITEMS.map((item, index) => <button key={buildApprovedImageStoryboardTrialStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only approved image storyboard provider trial</span><small>no live provider calls no image model calls no prompt sending</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Approved image storyboard provider trial envelopes and planning lanes">
        <CatalogPanel eyebrow="approved image storyboard prompt envelope" title="Intent approval provider credential token visual brief and envelope boundaries" items={APPROVED_IMAGE_STORYBOARD_TRIAL_ENVELOPE_ITEMS} />
        <CatalogPanel eyebrow="storyboard frame plan remains synthetic" title="Frame plan keyframe candidate style guide and shot list" items={APPROVED_IMAGE_STORYBOARD_TRIAL_PLANNING_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Approved image storyboard provider trial review governance lanes">
        <CatalogPanel eyebrow="visual safety review remains review-only" title="Visual safety redaction audit and observability review" items={APPROVED_IMAGE_STORYBOARD_TRIAL_REVIEW_ITEMS} />
        <CatalogPanel eyebrow="approved image storyboard cost estimate" title="Cost rate privacy region retention retry fallback result asset readiness" items={APPROVED_IMAGE_STORYBOARD_TRIAL_GOVERNANCE_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Disabled approved image storyboard provider trial lane">
        <PanelHeading eyebrow="disabled image storyboard provider trial candidate" title="Protected image storyboard provider paths stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{APPROVED_IMAGE_STORYBOARD_TRIAL_DENIED_ITEMS.map((denial, index) => <span key={buildApprovedImageStoryboardTrialStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This disabled image storyboard provider trial is review-only and synthetic. It does not call providers, call image models, call models, send prompts, generate images, generate keyframes, execute storyboards, stream, import provider SDKs, use network egress, create services, create APIs from the frontend, persist credentials, persist tokens, persist provider keys, dispatch workers, execute jobs, render, export, publish, bind ports, deploy runtimes, or write browser storage.</p>
      </section>
      <section className={styles.diagnosticPanel} aria-label="First approved image storyboard provider trial route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3082-3113 first approved image storyboard provider trial coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildApprovedImageStoryboardTrialStableKey(["approved-image-storyboard-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}

function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildApprovedImageStoryboardTrialStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>synthetic image storyboard provider trial data only</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}