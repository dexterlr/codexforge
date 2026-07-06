'use client';

import { CodexForgeAppShell } from '@/lib/codexforge/navigation-shell';
import {
  CONTROLLED_RENDER_ARTIFACT_PUBLISH_REVIEW_TRIAL_SHARED_MARKERS,
  buildControlledRenderArtifactPublishReviewTrialModel,
  buildControlledRenderArtifactPublishReviewTrialStableKey,
  type ControlledRenderArtifactPublishReviewTrialRouteSlug,
} from '../controlled-render-artifact-publish-review-trial-model';
import styles from '../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css';

export function ControlledRenderArtifactPublishReviewTrialPageClientShell({
  routeSlug,
}: {
  routeSlug: ControlledRenderArtifactPublishReviewTrialRouteSlug;
}) {
  const model = buildControlledRenderArtifactPublishReviewTrialModel(routeSlug);
  return (
    <CodexForgeAppShell
      activePath={model.route.href}
      workspaceLabel={model.route.title}
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      {ControlledRenderArtifactPublishReviewTrialRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function ControlledRenderArtifactPublishReviewTrialCockpitSection() {
  return ControlledRenderArtifactPublishReviewTrialRoutePanel({
    routeSlug: 'controlled-render-artifact-publish-review-trial-completion',
    embedded: true,
  });
}

export function ControlledRenderArtifactPublishReviewTrialRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ControlledRenderArtifactPublishReviewTrialRouteSlug;
  embedded?: boolean;
}) {
  const model = buildControlledRenderArtifactPublishReviewTrialModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-controlled-render-artifact-publish-review-trial={CONTROLLED_RENDER_ARTIFACT_PUBLISH_REVIEW_TRIAL_SHARED_MARKERS.join(
        ' | '
      )}
      data-codexforge-controlled-render-artifact-publish-review-trial-route={model.route.markerPhrases.join(
        ' | '
      )}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {embedded ? 'Controlled Render Artifact Publish Review Trial' : model.route.phase}
            </span>
            <span className={styles.safeBadge}>publish review only</span>
            <span className={styles.blockedBadge}>backend-owned runtime check remains required</span>
          </div>
          <h1 className={styles.heroTitle}>
            {embedded ? 'Controlled Render Artifact Publish Review Trial' : model.route.title}
          </h1>
          <p className={styles.heroLead}>
            This review-only controlled render artifact publish review trial models review, gating,
            publish eligibility, platform policy, account authorization review, scheduling policy,
            metadata readiness, upload/publish blocking, operator approval, and backend runtime
            readiness only. It keeps an approved export reference together with approved
            destination, platform, account authorization review, metadata, caption, thumbnail, and
            schedule policies. Render artifact publish remains blocked until explicit operator
            approval. Operator review remains required before artifact publish execution. The
            frontend provides no provider execution, no network execution, no render execution, no
            export execution, no publish execution, no worker dispatch, no file export, no download
            generation, no archive creation, no signed URL creation, no platform upload, no media
            upload, no OAuth flow creation, no webhook creation, no schedule execution, no account
            authorization execution, no file writes from the app, and no
            shell/process/command execution from the app.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Export Ref" value="Approved" detail="approved export reference only" />
            <MetricCard label="Policy" value="Publish" detail="approved platform policy only" />
            <MetricCard label="Runtime" value="Blocked" detail="no publish execution" />
            <MetricCard
              label="Review"
              value="Required"
              detail="operator review remains required before artifact publish execution"
            />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Controlled render artifact publish review trial preview">
          <p className={styles.missionLabel}>3402-3433 - Controlled Render Artifact Publish Review Trial</p>
          <p className={styles.missionDetail}>
            Controlled Render Artifact Publish Review Trial is review-only, publish review only,
            publish eligibility only, and disabled by default. Render artifact publish remains
            blocked until explicit operator approval. Backend-owned runtime check remains required.
            Controlled render artifact publish review trial completion does not enable
            render/export/publish/workers. No provider execution. No network execution. No render
            execution. No export execution. No publish execution. No worker dispatch. No file
            export. No download generation. No archive creation. No signed URL creation. No
            platform upload. No media upload. No OAuth flow creation. No webhook creation. No
            schedule execution. No account authorization execution.
          </p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Controlled render artifact publish review trial safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildControlledRenderArtifactPublishReviewTrialStableKey(['shared-marker', String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact publish review action panel">
        <PanelHeading eyebrow="Operator review stays first" title="Publish readiness stays review-only" badge="Actions disabled" />
        <p className={styles.bodyText}>
          The main action and operator review panel stays ahead of technical metadata. This static
          trial does not publish, upload, schedule, call platforms, create OAuth flows, create
          webhooks, create signed URLs, dispatch workers, write files, call providers, call
          networks, or execute runtime work. It only reviews whether an approved export reference
          and approved publish policies satisfy publish readiness.
        </p>
        <div className={styles.blockedDeckGrid}>
          {model.readinessItems.map((item, index) => (
            <button
              key={buildControlledRenderArtifactPublishReviewTrialStableKey(['readiness-item', String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>review-only publish readiness contract</span>
              <small>render artifact publish remains blocked until explicit operator approval</small>
            </button>
          ))}
        </div>
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact publish safety state">
        <PanelHeading
          eyebrow="Safety state"
          title="Media upload, account authorization, OAuth, webhook, scheduling, workers, and execution remain blocked"
          badge="Required"
        />
        <div className={styles.contractGrid}>
          {model.deniedItems.map((denial, index) => (
            <span
              key={buildControlledRenderArtifactPublishReviewTrialStableKey(['denial', String(index), denial])}
              className={styles.contractChip}
            >
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          This static trial performs no provider execution, no network execution, no render
          execution, no export execution, no publish execution, no worker dispatch, no file export,
          no download generation, no archive creation, no signed URL creation, no platform upload,
          no media upload, no OAuth flow creation, no webhook creation, no schedule execution, no
          account authorization execution, no file writes from the app, and no
          shell/process/command execution from the app. Browser storage for secrets stays blocked,
          and no localStorage, no sessionStorage, no IndexedDB, and no cookies are introduced.
        </p>
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact publish lineage and audit">
        <PanelHeading eyebrow="Lineage and audit" title="Publish review evidence stays review-backed" badge="Audit backed" />
        <p className={styles.bodyText}>
          Safety state appears before technical metadata, and lineage and audit appear before
          technical metadata. Result preview and result review remain static review surfaces backed
          by lineage, audit, and observability markers only.
        </p>
        <div className={styles.contractGrid}>
          {model.evidenceItems.map((item, index) => (
            <span
              key={buildControlledRenderArtifactPublishReviewTrialStableKey(['evidence', String(index), item])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact publish route contract technical metadata">
        <PanelHeading eyebrow="Technical metadata" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary} Technical implementation details remain lower on the page.</p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildControlledRenderArtifactPublishReviewTrialStableKey([
                'route-marker',
                model.route.slug,
                String(index),
                marker,
              ])}
              className={styles.contractChip}
            >
              {marker}
            </span>
          ))}
        </div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="Controlled render artifact publish review trial route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3402-3433 controlled render artifact publish review trial coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((item) => (
            <a
              key={buildControlledRenderArtifactPublishReviewTrialStableKey([
                'controlled-render-artifact-publish-review-trial-route',
                item.slug,
              ])}
              className={styles.diagnosticLink}
              href={item.href}
            >
              <span>{item.phase}</span>
              <strong>{item.title}</strong>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
      <span className={styles.metricDetail}>{detail}</span>
    </article>
  );
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return (
    <div className={styles.panelHeader}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <span className={styles.safeBadge}>{badge}</span>
    </div>
  );
}
