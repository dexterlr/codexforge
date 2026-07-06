'use client';

import { CodexForgeAppShell } from '@/lib/codexforge/navigation-shell';
import {
  VIDEO_PROVIDER_EXECUTION_ADAPTER_READINESS_SHARED_MARKERS,
  buildVideoProviderExecutionAdapterReadinessModel,
  buildVideoProviderExecutionAdapterReadinessStableKey,
  type VideoProviderExecutionAdapterReadinessRouteSlug,
} from '../video-provider-execution-adapter-readiness-model';
import styles from '../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css';

export function VideoProviderExecutionAdapterReadinessPageClientShell({
  routeSlug,
}: {
  routeSlug: VideoProviderExecutionAdapterReadinessRouteSlug;
}) {
  const model = buildVideoProviderExecutionAdapterReadinessModel(routeSlug);
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
      {VideoProviderExecutionAdapterReadinessRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function VideoProviderExecutionAdapterReadinessCockpitSection() {
  return VideoProviderExecutionAdapterReadinessRoutePanel({
    routeSlug: 'video-provider-adapter-readiness-completion',
    embedded: true,
  });
}

export function VideoProviderExecutionAdapterReadinessRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: VideoProviderExecutionAdapterReadinessRouteSlug;
  embedded?: boolean;
}) {
  const model = buildVideoProviderExecutionAdapterReadinessModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-video-provider-execution-adapter-readiness={VIDEO_PROVIDER_EXECUTION_ADAPTER_READINESS_SHARED_MARKERS.join(
        ' | '
      )}
      data-codexforge-video-provider-execution-adapter-readiness-route={model.route.markerPhrases.join(
        ' | '
      )}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {embedded
                ? 'First Backend-Owned Video Provider Execution Adapter Readiness'
                : model.route.phase}
            </span>
            <span className={styles.safeBadge}>adapter readiness only</span>
            <span className={styles.blockedBadge}>
              blocked until explicit operator approval
            </span>
          </div>
          <h1 className={styles.heroTitle}>
            {embedded
              ? 'First Backend-Owned Video Provider Execution Adapter Readiness'
              : model.route.title}
          </h1>
          <p className={styles.heroLead}>
            This backend-owned video provider execution adapter readiness surface
            stays adapter readiness only, backend-owned adapter contract only, no
            live provider call, no real video generation, no live video generation,
            and real video provider execution remains blocked. It defines provider
            adapter identity, approved provider reference required, credential
            reference only, token reference only, dry-run reference required,
            approval packet reference required, request envelope readiness only,
            response envelope readiness only, error envelope readiness only, prompt
            redaction gate readiness only, cost guard readiness only, rate guard
            readiness only, timeout guard readiness only, duration resolution size
            guard readiness only, backend-owned adapter privacy gate readiness,
            backend-owned adapter safety gate readiness, backend-owned adapter
            lineage packet readiness, backend-owned adapter audit packet readiness,
            backend-owned adapter observability trace readiness, backend-owned
            adapter result capture readiness, backend-owned adapter artifact
            handoff readiness, hard kill switch remains enforced, single-call lock
            remains required, idempotency key remains required, replay block
            remains required, retry policy remains review-only, fallback policy
            remains review-only, backend-owned runtime check remains required,
            server-only boundary remains required, and operator review remains
            required before real video provider execution.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Mode"
              value="Adapter readiness"
              detail="backend-owned adapter contract only"
            />
            <MetricCard
              label="Provider"
              value="Identity + ref"
              detail="approved provider reference required"
            />
            <MetricCard
              label="Guard"
              value="Enforced"
              detail="hard kill switch remains enforced"
            />
            <MetricCard
              label="Review"
              value="Required"
              detail="operator review remains required before real video provider execution"
            />
          </div>
        </div>
        <div
          className={styles.missionPreview}
          aria-label="Video provider adapter readiness preview"
        >
          <p className={styles.missionLabel}>
            3530-3561 - First Backend-Owned Video Provider Execution Adapter
            Readiness
          </p>
          <p className={styles.missionDetail}>
            First Backend-Owned Video Provider Execution Adapter Readiness is a
            backend-owned video provider execution adapter readiness surface. It
            stays disabled by default, behind a hard kill switch, and blocked until
            explicit operator approval. Server-only boundary remains required. First
            backend-owned video provider execution adapter readiness completion does
            not enable live provider/render/export/publish/workers.
          </p>
        </div>
      </header>
      <section
        className={styles.markerBand}
        aria-label="Video provider adapter readiness safety markers"
      >
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildVideoProviderExecutionAdapterReadinessStableKey([
              'shared-marker',
              String(index),
              marker,
            ])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>
      <section
        className={styles.glassPanel}
        aria-label="Video provider adapter readiness action panel"
      >
        <PanelHeading
          eyebrow="Operator review stays first"
          title="Backend-owned adapter readiness stays review-only and disabled"
          badge="Actions disabled"
        />
        <p className={styles.bodyText}>
          The main action and operator review panel stays ahead of technical
          metadata. This backend-owned video provider execution adapter readiness
          surface does not call providers, execute video providers, fetch networks,
          render, export, publish, dispatch workers, create files, create
          downloads, create archives, create signed URLs, upload media, create
          OAuth flows, create webhooks, create schedules, authorize accounts,
          create API routes, create services, deploy runtimes, write files, or
          execute shell/process/command actions from the app. It only proves the
          backend-owned adapter contract, readiness links, guard evaluation
          readiness, and operator review posture before any real backend-owned
          video provider execution can happen.
        </p>
        <div className={styles.blockedDeckGrid}>
          {model.readinessItems.map((item, index) => (
            <button
              key={buildVideoProviderExecutionAdapterReadinessStableKey([
                'readiness-item',
                String(index),
                item,
              ])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>backend-owned video provider execution adapter readiness</span>
              <small>adapter readiness only</small>
            </button>
          ))}
        </div>
      </section>
      <section
        className={styles.glassPanel}
        aria-label="Video provider adapter readiness safety state"
      >
        <PanelHeading
          eyebrow="Safety state"
          title="Server-only boundary, kill switch, lock, replay block, and runtime check stay enforced"
          badge="Required"
        />
        <div className={styles.contractGrid}>
          {model.deniedItems.map((denial, index) => (
            <span
              key={buildVideoProviderExecutionAdapterReadinessStableKey([
                'denial',
                String(index),
                denial,
              ])}
              className={styles.contractChip}
            >
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          This adapter readiness surface keeps no fetch/network calls, no provider
          SDK imports in frontend, no frontend provider key reads, no plaintext
          secrets, no localStorage, no sessionStorage, no IndexedDB, no cookies,
          and no browser storage for secrets. It also keeps no provider execution,
          no live provider execution, no video provider execution, no network
          execution, no render execution, no export execution, no publish
          execution, no worker dispatch, no file export, no download generation, no
          archive creation, no signed URL creation, no platform upload, no media
          upload, no OAuth flow creation, no webhook creation, no schedule
          execution, no account authorization execution, no API route execution, no
          service creation, no runtime deploy, no file writes from the app, and no
          shell/process/command execution from the app.
        </p>
      </section>
      <section
        className={styles.glassPanel}
        aria-label="Video provider adapter readiness lineage and audit"
      >
        <PanelHeading
          eyebrow="Lineage and audit"
          title="Dry-run linkage, approval packet linkage, and observability stay audit-backed"
          badge="Audit backed"
        />
        <p className={styles.bodyText}>
          Safety state appears before technical metadata, and lineage and audit
          appear before technical metadata. Dry-run reference required, approval
          packet reference required, result capture readiness, and artifact handoff
          readiness remain static review surfaces backed by lineage, audit,
          observability, and operator review markers only.
        </p>
        <div className={styles.contractGrid}>
          {model.evidenceItems.map((item, index) => (
            <span
              key={buildVideoProviderExecutionAdapterReadinessStableKey([
                'evidence',
                String(index),
                item,
              ])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
      </section>
      <section
        className={styles.glassPanel}
        aria-label="Video provider adapter readiness technical metadata"
      >
        <PanelHeading
          eyebrow="Technical metadata"
          title={model.route.title}
          badge={model.route.phase}
        />
        <p className={styles.bodyText}>
          {model.route.summary} Technical implementation details remain lower on the
          page.
        </p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildVideoProviderExecutionAdapterReadinessStableKey([
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
      <section
        className={styles.diagnosticPanel}
        aria-label="Video provider adapter readiness diagnostics"
      >
        <PanelHeading
          eyebrow="Diagnostics"
          title="3530-3561 backend-owned video provider adapter readiness coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((item) => (
            <a
              key={buildVideoProviderExecutionAdapterReadinessStableKey([
                'video-provider-execution-adapter-readiness-route',
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

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
      <span className={styles.metricDetail}>{detail}</span>
    </article>
  );
}

function PanelHeading({
  eyebrow,
  title,
  badge,
}: {
  eyebrow: string;
  title: string;
  badge: string;
}) {
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
