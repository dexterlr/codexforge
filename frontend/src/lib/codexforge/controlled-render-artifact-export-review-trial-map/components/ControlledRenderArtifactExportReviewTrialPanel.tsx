'use client';

import { CodexForgeAppShell } from '@/lib/codexforge/navigation-shell';
import {
  CONTROLLED_RENDER_ARTIFACT_EXPORT_REVIEW_TRIAL_SHARED_MARKERS,
  buildControlledRenderArtifactExportReviewTrialModel,
  buildControlledRenderArtifactExportReviewTrialStableKey,
  type ControlledRenderArtifactExportReviewTrialRouteSlug
} from '../controlled-render-artifact-export-review-trial-model';
import styles from '../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css';

export function ControlledRenderArtifactExportReviewTrialPageClientShell({ routeSlug }: { routeSlug: ControlledRenderArtifactExportReviewTrialRouteSlug }) {
  const model = buildControlledRenderArtifactExportReviewTrialModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      {ControlledRenderArtifactExportReviewTrialRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function ControlledRenderArtifactExportReviewTrialCockpitSection() {
  return ControlledRenderArtifactExportReviewTrialRoutePanel({ routeSlug: 'controlled-render-artifact-export-review-trial-completion', embedded: true });
}

export function ControlledRenderArtifactExportReviewTrialRoutePanel({ routeSlug, embedded = false }: { routeSlug: ControlledRenderArtifactExportReviewTrialRouteSlug; embedded?: boolean }) {
  const model = buildControlledRenderArtifactExportReviewTrialModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-controlled-render-artifact-export-review-trial={CONTROLLED_RENDER_ARTIFACT_EXPORT_REVIEW_TRIAL_SHARED_MARKERS.join(' | ')} data-codexforge-controlled-render-artifact-export-review-trial-route={model.route.markerPhrases.join(' | ')}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? 'Controlled Render Artifact Export Review Trial' : model.route.phase}</span>
            <span className={styles.safeBadge}>export review only</span>
            <span className={styles.blockedBadge}>backend-owned runtime check remains required</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? 'Controlled Render Artifact Export Review Trial' : model.route.title}</h1>
          <p className={styles.heroLead}>This review-only controlled render artifact export review trial models review, gating, export eligibility, packaging policy, and operator approval for export readiness only. It keeps an approved assembly reference together with approved export format, container, codec, resolution, duration, size, and cost policies. Render artifact export remains blocked until explicit operator approval. Operator review remains required before artifact export execution. The frontend provides no provider execution, no network execution, no render execution, no export execution, no publish execution, no worker dispatch, no file export, no download generation, no archive creation, no signed URL creation, no platform upload, no OAuth flow creation, no webhook creation, no file writes from the app, and no shell/process/command execution from the app.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Assembly" value="Approved Ref" detail="approved assembly reference only" />
            <MetricCard label="Policy" value="Packaging" detail="approved export format policy only" />
            <MetricCard label="Runtime" value="Blocked" detail="no export execution" />
            <MetricCard label="Review" value="Required" detail="operator review remains required before artifact export execution" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Controlled render artifact export review trial preview">
          <p className={styles.missionLabel}>3370-3401 - Controlled Render Artifact Export Review Trial</p>
          <p className={styles.missionDetail}>Controlled Render Artifact Export Review Trial is review-only, export review only, export eligibility only, and disabled by default. Render artifact export remains blocked until explicit operator approval. Backend-owned runtime check remains required. Controlled render artifact export review trial completion does not enable render/export/publish/workers. No provider execution. No network execution. No render execution. No export execution. No publish execution. No worker dispatch. No file export. No download generation. No archive creation. No signed URL creation. No platform upload. No OAuth flow creation. No webhook creation.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Controlled render artifact export review trial safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildControlledRenderArtifactExportReviewTrialStableKey(['shared-marker', String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact export review action panel">
        <PanelHeading eyebrow="Operator review stays first" title="Export readiness stays review-only" badge="Actions disabled" />
        <p className={styles.bodyText}>The main action and operator review panel stays ahead of technical metadata. This static trial does not export, render, publish, upload, download, archive, create signed URLs, dispatch workers, write files, call providers, call networks, or execute runtime work. It only reviews whether an approved assembly reference and approved packaging policies satisfy export readiness.</p>
        <div className={styles.blockedDeckGrid}>{model.readinessItems.map((item, index) => <button key={buildControlledRenderArtifactExportReviewTrialStableKey(['readiness-item', String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only export readiness contract</span><small>render artifact export remains blocked until explicit operator approval</small></button>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact export safety state">
        <PanelHeading eyebrow="Safety state" title="Download, archive, signed URL, platform upload, publish, workers, and execution remain blocked" badge="Required" />
        <div className={styles.contractGrid}>{model.deniedItems.map((denial, index) => <span key={buildControlledRenderArtifactExportReviewTrialStableKey(['denial', String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This static trial performs no provider execution, no network execution, no render execution, no export execution, no publish execution, no worker dispatch, no file export, no download generation, no archive creation, no signed URL creation, no platform upload, no OAuth flow creation, no webhook creation, no file writes from the app, and no shell/process/command execution from the app. Browser storage for secrets stays blocked, and no localStorage, no sessionStorage, no IndexedDB, and no cookies are introduced.</p>
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact export lineage and audit">
        <PanelHeading eyebrow="Lineage and audit" title="Export review evidence stays review-backed" badge="Audit backed" />
        <p className={styles.bodyText}>Safety state appears before technical metadata, and lineage and audit appear before technical metadata. Result preview and result review remain static review surfaces backed by lineage, audit, and observability markers only.</p>
        <div className={styles.contractGrid}>{model.evidenceItems.map((item, index) => <span key={buildControlledRenderArtifactExportReviewTrialStableKey(['evidence', String(index), item])} className={styles.contractChip}>{item}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact export route contract technical metadata">
        <PanelHeading eyebrow="Technical metadata" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary} Technical implementation details remain lower on the page.</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildControlledRenderArtifactExportReviewTrialStableKey(['route-marker', model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="Controlled render artifact export review trial route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3370-3401 controlled render artifact export review trial coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildControlledRenderArtifactExportReviewTrialStableKey(['controlled-render-artifact-export-review-trial-route', item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}