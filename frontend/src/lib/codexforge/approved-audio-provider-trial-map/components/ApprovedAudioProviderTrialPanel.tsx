"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  APPROVED_AUDIO_PROVIDER_TRIAL_DENIED_ITEMS,
  APPROVED_AUDIO_PROVIDER_TRIAL_ENVELOPE_ITEMS,
  APPROVED_AUDIO_PROVIDER_TRIAL_GOVERNANCE_ITEMS,
  APPROVED_AUDIO_PROVIDER_TRIAL_ITEMS,
  APPROVED_AUDIO_PROVIDER_TRIAL_PACKET_ITEMS,
  APPROVED_AUDIO_PROVIDER_TRIAL_REVIEW_ITEMS,
  APPROVED_AUDIO_PROVIDER_TRIAL_SHARED_MARKERS,
  buildApprovedAudioProviderTrialModel,
  buildApprovedAudioProviderTrialStableKey,
  type ApprovedAudioProviderTrialRouteSlug
} from "../approved-audio-provider-trial-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ApprovedAudioProviderTrialPageClientShell({ routeSlug }: { routeSlug: ApprovedAudioProviderTrialRouteSlug }) {
  const model = buildApprovedAudioProviderTrialModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ApprovedAudioProviderTrialRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ApprovedAudioProviderTrialCockpitSection() {
  return <ApprovedAudioProviderTrialRoutePanel routeSlug="first-approved-audio-provider-trial-completion" embedded />;
}

export function ApprovedAudioProviderTrialRoutePanel({ routeSlug, embedded = false }: { routeSlug: ApprovedAudioProviderTrialRouteSlug; embedded?: boolean }) {
  const model = buildApprovedAudioProviderTrialModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-approved-audio-provider-trial={APPROVED_AUDIO_PROVIDER_TRIAL_SHARED_MARKERS.join(" | ")} data-codexforge-approved-audio-provider-trial-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "First Approved Audio Provider Trial" : model.route.phase}</span>
            <span className={styles.safeBadge}>synthetic audio provider trial data only</span>
            <span className={styles.blockedBadge}>no live provider calls</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Approved Audio Provider Trial" : model.route.title}</h1>
          <p className={styles.heroLead}>This is a review-only approved audio provider trial for a future backend-owned audio, voice, narration, and transcription provider path. The audio provider trial remains blocked until explicit operator approval, disabled by default, and static for audio brief review, voice plan review, narration script review, transcript packet review, audio prompt packet, synthetic audio result envelope, audio safety review, audio redaction review, audio asset handoff review, operator review, audit, cost, rate, privacy, region, data retention, retry fallback, runner handoff, and completion.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Intent" value="Review-only" detail="approved audio provider intent" />
            <MetricCard label="Provider" value="Static" detail="approved audio provider selection" />
            <MetricCard label="Dry lock" value="Locked" detail="approved audio provider dry lock" />
            <MetricCard label="Execution" value="Blocked" detail="approved audio provider execution remains blocked" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="First approved audio provider trial preview">
          <p className={styles.missionLabel}>3114-3145 - First Approved Audio Provider Trial</p>
          <p className={styles.missionDetail}>No live provider calls. No audio model calls. No transcription model calls. No model calls. No prompt sending. No audio generation. No audio rendering. No audio recording. No microphone access. No media device access. No transcription execution. No voice cloning. No voice synthesis. No playback engine creation. No streaming. No provider SDK imports. No audio provider imports. No transcription provider imports. No network egress. No frontend persistence. No credential storage. No token storage. No provider key storage.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Approved audio provider trial safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildApprovedAudioProviderTrialStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Approved Audio Provider Trial Map">
        <PanelHeading eyebrow="First Approved Audio Provider Trial" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildApprovedAudioProviderTrialStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Approved audio provider trial readiness rail">
        <PanelHeading eyebrow="audio provider trial remains blocked until explicit operator approval" title="review-only approved audio provider trial" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{APPROVED_AUDIO_PROVIDER_TRIAL_ITEMS.map((item, index) => <button key={buildApprovedAudioProviderTrialStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only approved audio provider trial</span><small>no live provider calls no audio model calls no prompt sending</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Approved audio provider trial envelopes and packet lanes">
        <CatalogPanel eyebrow="approved audio provider approval packet" title="Intent approval selection credential token brief voice narration transcript" items={APPROVED_AUDIO_PROVIDER_TRIAL_ENVELOPE_ITEMS} />
        <CatalogPanel eyebrow="approved audio provider prompt envelope" title="Prompt request response error dry lock recording upload download blocks" items={APPROVED_AUDIO_PROVIDER_TRIAL_PACKET_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Approved audio provider trial review governance lanes">
        <CatalogPanel eyebrow="audio safety review remains review-only" title="Safety redaction audit observability and operator review" items={APPROVED_AUDIO_PROVIDER_TRIAL_REVIEW_ITEMS} />
        <CatalogPanel eyebrow="approved audio provider cost estimate" title="Cost rate privacy region retention retry fallback result asset runner handoff" items={APPROVED_AUDIO_PROVIDER_TRIAL_GOVERNANCE_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Disabled approved audio provider trial lane">
        <PanelHeading eyebrow="disabled audio provider trial candidate" title="Protected audio provider paths stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{APPROVED_AUDIO_PROVIDER_TRIAL_DENIED_ITEMS.map((denial, index) => <span key={buildApprovedAudioProviderTrialStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This disabled audio provider trial is review-only and synthetic. It does not call providers, call audio models, call transcription models, call models, send prompts, generate audio, render audio, record audio, access microphones, access media devices, execute transcription, clone voices, synthesize voices, create playback engines, stream, import provider SDKs, use network egress, create services, create APIs from the frontend, persist credentials, persist tokens, persist provider keys, dispatch workers, execute jobs, render, export, publish, bind ports, deploy runtimes, or write browser storage.</p>
      </section>
      <section className={styles.diagnosticPanel} aria-label="First approved audio provider trial route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3114-3145 first approved audio provider trial coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildApprovedAudioProviderTrialStableKey(["approved-audio-provider-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}

function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildApprovedAudioProviderTrialStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>synthetic audio provider trial data only</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
