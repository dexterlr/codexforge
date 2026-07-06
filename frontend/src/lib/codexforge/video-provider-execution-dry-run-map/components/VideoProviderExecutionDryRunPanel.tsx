"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  VIDEO_PROVIDER_EXECUTION_DRY_RUN_SHARED_MARKERS,
  buildVideoProviderExecutionDryRunModel,
  buildVideoProviderExecutionDryRunStableKey,
  type VideoProviderExecutionDryRunRouteSlug,
} from "../video-provider-execution-dry-run-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function VideoProviderExecutionDryRunPageClientShell({
  routeSlug,
}: {
  routeSlug: VideoProviderExecutionDryRunRouteSlug;
}) {
  const model = buildVideoProviderExecutionDryRunModel(routeSlug);
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
      {VideoProviderExecutionDryRunRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function VideoProviderExecutionDryRunCockpitSection() {
  return VideoProviderExecutionDryRunRoutePanel({
    routeSlug: "video-provider-dry-run-completion",
    embedded: true,
  });
}

export function VideoProviderExecutionDryRunRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: VideoProviderExecutionDryRunRouteSlug;
  embedded?: boolean;
}) {
  const model = buildVideoProviderExecutionDryRunModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-video-provider-execution-dry-run={VIDEO_PROVIDER_EXECUTION_DRY_RUN_SHARED_MARKERS.join(
        " | "
      )}
      data-codexforge-video-provider-execution-dry-run-route={model.route.markerPhrases.join(" | ")}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {embedded ? "First Backend-Owned Video Provider Execution Dry Run" : model.route.phase}
            </span>
            <span className={styles.safeBadge}>backend-owned dry run only</span>
            <span className={styles.blockedBadge}>controlled video provider execution remains synthetic</span>
          </div>
          <h1 className={styles.heroTitle}>
            {embedded ? "First Backend-Owned Video Provider Execution Dry Run" : model.route.title}
          </h1>
          <p className={styles.heroLead}>
            This synthetic backend-owned video provider execution dry run surface keeps
            backend-owned dry run only, synthetic provider response only, synthetic provider
            error only, no live provider call, no real video generation, and no live video
            generation. Controlled video provider execution remains synthetic. It reviews
            approved dry-run id only, approved video provider reference only, credential
            reference remains blocked, token reference remains blocked, approved request
            envelope dry run only, prompt redaction preview only, guard snapshot only, cost
            simulation only, rate limit simulation only, timeout simulation only, duration
            resolution size simulation only, backend-owned dry-run privacy gate snapshot,
            backend-owned dry-run safety gate snapshot, backend-owned dry-run lineage packet,
            backend-owned dry-run audit packet, backend-owned dry-run observability trace,
            synthetic provider response review, synthetic provider error review, backend-owned
            dry-run result capture readiness, backend-owned dry-run artifact handoff
            readiness, hard kill switch remains enforced, single-call lock remains
            preview-only, idempotency key remains preview-only, backend-owned dry-run replay
            remains blocked, retry policy remains review-only, and fallback policy remains
            review-only. Backend-owned runtime check remains required. Server-only boundary
            remains required. Operator review remains required before real video provider
            execution.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Mode" value="Synthetic" detail="synthetic backend-owned video provider execution dry run" />
            <MetricCard label="Provider" value="Ref only" detail="approved video provider reference only" />
            <MetricCard label="Guard" value="Enforced" detail="hard kill switch remains enforced" />
            <MetricCard
              label="Review"
              value="Required"
              detail="operator review remains required before real video provider execution"
            />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Video provider dry run preview">
          <p className={styles.missionLabel}>
            3466-3497 - First Backend-Owned Video Provider Execution Dry Run
          </p>
          <p className={styles.missionDetail}>
            First Backend-Owned Video Provider Execution Dry Run is a synthetic
            backend-owned video provider execution dry run. It stays backend-owned dry run
            only, disabled by default, behind a hard kill switch, and blocked until explicit
            operator approval. Controlled video provider execution remains synthetic.
            Backend-owned runtime check remains required. Server-only boundary remains
            required. First backend-owned video provider execution dry run completion does not
            enable live provider/render/export/publish/workers.
          </p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Video provider dry run safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildVideoProviderExecutionDryRunStableKey(["shared-marker", String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>
      <section className={styles.glassPanel} aria-label="Video provider dry run action panel">
        <PanelHeading eyebrow="Operator review stays first" title="Backend-owned dry run stays synthetic and disabled" badge="Actions disabled" />
        <p className={styles.bodyText}>
          The main action and operator review panel stays ahead of technical metadata. This
          synthetic backend-owned video provider execution dry run does not call providers,
          execute video providers, fetch networks, render, export, publish, dispatch workers,
          create files, create downloads, create archives, create signed URLs, upload media,
          create OAuth flows, create webhooks, create schedules, authorize accounts, create
          API routes, create services, deploy runtimes, write files, or execute
          shell/process/command actions from the app. It only proves the first backend-owned
          execution envelope with synthetic provider response review and synthetic provider
          error review.
        </p>
        <div className={styles.blockedDeckGrid}>
          {model.readinessItems.map((item, index) => (
            <button
              key={buildVideoProviderExecutionDryRunStableKey(["readiness-item", String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>synthetic backend-owned video provider execution dry run</span>
              <small>controlled video provider execution remains synthetic</small>
            </button>
          ))}
        </div>
      </section>
      <section className={styles.glassPanel} aria-label="Video provider dry run safety state">
        <PanelHeading
          eyebrow="Safety state"
          title="Server-only boundary, blocked secret refs, kill switch, lock preview, and replay block stay enforced"
          badge="Required"
        />
        <div className={styles.contractGrid}>
          {model.deniedItems.map((denial, index) => (
            <span
              key={buildVideoProviderExecutionDryRunStableKey(["denial", String(index), denial])}
              className={styles.contractChip}
            >
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          This synthetic dry run keeps no fetch/network calls, no provider SDK imports in
          frontend, no frontend provider key reads, no plaintext secrets, no localStorage, no
          sessionStorage, no IndexedDB, no cookies, and no browser storage for secrets. It
          also keeps no provider execution, no live provider execution, no video provider
          execution, no network execution, no render execution, no export execution, no
          publish execution, no worker dispatch, no file export, no download generation, no
          archive creation, no signed URL creation, no platform upload, no media upload, no
          OAuth flow creation, no webhook creation, no schedule execution, no account
          authorization execution, no API route execution, no service creation, no runtime
          deploy, no file writes from the app, and no shell/process/command execution from the
          app.
        </p>
      </section>
      <section className={styles.glassPanel} aria-label="Video provider dry run lineage and audit">
        <PanelHeading eyebrow="Lineage and audit" title="Synthetic response review, synthetic error review, and handoff readiness stay audit-backed" badge="Audit backed" />
        <p className={styles.bodyText}>
          Safety state appears before technical metadata, and lineage and audit appear before
          technical metadata. Result capture readiness and artifact handoff readiness remain
          static review surfaces backed by lineage, audit, observability, and operator review
          markers only.
        </p>
        <div className={styles.contractGrid}>
          {model.evidenceItems.map((item, index) => (
            <span
              key={buildVideoProviderExecutionDryRunStableKey(["evidence", String(index), item])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
      </section>
      <section className={styles.glassPanel} aria-label="Video provider dry run technical metadata">
        <PanelHeading eyebrow="Technical metadata" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>
          {model.route.summary} Technical implementation details remain lower on the page.
        </p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildVideoProviderExecutionDryRunStableKey([
                "route-marker",
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
      <section className={styles.diagnosticPanel} aria-label="Video provider dry run diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3466-3497 backend-owned video provider dry run coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((item) => (
            <a
              key={buildVideoProviderExecutionDryRunStableKey(["video-provider-execution-dry-run-route", item.slug])}
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
