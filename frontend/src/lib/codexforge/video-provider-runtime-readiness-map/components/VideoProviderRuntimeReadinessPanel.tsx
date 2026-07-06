"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  VIDEO_PROVIDER_RUNTIME_READINESS_SHARED_MARKERS,
  buildVideoProviderRuntimeReadinessModel,
  buildVideoProviderRuntimeReadinessStableKey,
  type VideoProviderRuntimeReadinessRouteSlug,
} from "../video-provider-runtime-readiness-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function VideoProviderRuntimeReadinessPageClientShell({
  routeSlug,
}: {
  routeSlug: VideoProviderRuntimeReadinessRouteSlug;
}) {
  const model = buildVideoProviderRuntimeReadinessModel(routeSlug);
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
      {VideoProviderRuntimeReadinessRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function VideoProviderRuntimeReadinessCockpitSection() {
  return VideoProviderRuntimeReadinessRoutePanel({
    routeSlug: "video-provider-runtime-readiness-completion",
    embedded: true,
  });
}

export function VideoProviderRuntimeReadinessRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: VideoProviderRuntimeReadinessRouteSlug;
  embedded?: boolean;
}) {
  const model = buildVideoProviderRuntimeReadinessModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-video-provider-runtime-readiness={VIDEO_PROVIDER_RUNTIME_READINESS_SHARED_MARKERS.join(
        " | "
      )}
      data-codexforge-video-provider-runtime-readiness-route={model.route.markerPhrases.join(" | ")}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {embedded ? "Backend-Owned Video Provider Execution Runtime Readiness" : model.route.phase}
            </span>
            <span className={styles.safeBadge}>backend runtime readiness only</span>
            <span className={styles.blockedBadge}>controlled video provider execution remains blocked</span>
          </div>
          <h1 className={styles.heroTitle}>
            {embedded ? "Backend-Owned Video Provider Execution Runtime Readiness" : model.route.title}
          </h1>
          <p className={styles.heroLead}>
            This review-only backend-owned video provider execution runtime readiness surface keeps
            backend-owned video runtime only, video provider runtime readiness only, and backend
            runtime readiness only. It reviews approved video provider only, approved credential
            reference only, approved token reference only, approved request envelope only,
            approved response envelope only, approved error envelope only, approved prompt
            redaction gate only, approved cost guard only, approved rate guard only, approved
            timeout guard only, and approved duration resolution size cap only. Controlled video
            provider execution remains blocked. Backend-owned runtime check remains required.
            Server-only boundary remains required. Operator review remains required before video
            provider execution. The frontend provides no provider execution, no video provider
            execution, no network execution, no render execution, no export execution, no publish
            execution, no worker dispatch, no file export, no download generation, no archive
            creation, no signed URL creation, no platform upload, no media upload, no OAuth flow
            creation, no webhook creation, no schedule execution, no account authorization
            execution, no API route execution, no service creation, no runtime deploy, no file
            writes from the app, and no shell/process/command execution from the app.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Provider" value="Approved" detail="approved video provider only" />
            <MetricCard label="Boundary" value="Server only" detail="server-only boundary remains required" />
            <MetricCard label="Runtime" value="Blocked" detail="no video provider execution" />
            <MetricCard
              label="Review"
              value="Required"
              detail="operator review remains required before video provider execution"
            />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Video provider runtime readiness preview">
          <p className={styles.missionLabel}>
            3434-3465 - Backend-Owned Video Provider Execution Runtime Readiness
          </p>
          <p className={styles.missionDetail}>
            Backend-Owned Video Provider Execution Runtime Readiness is review-only backend-owned
            video provider execution runtime readiness, backend-owned video runtime only, video
            provider runtime readiness only, backend runtime readiness only, disabled by default,
            and protected by a hard kill switch. Controlled video provider execution remains
            blocked. Backend-owned runtime check remains required. Server-only boundary remains
            required. Backend-owned video provider execution runtime readiness completion does not
            enable provider/render/export/publish/workers.
          </p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Video provider runtime readiness safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildVideoProviderRuntimeReadinessStableKey(["shared-marker", String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>
      <section className={styles.glassPanel} aria-label="Video provider runtime readiness action panel">
        <PanelHeading eyebrow="Operator review stays first" title="Backend-owned runtime readiness stays review-only" badge="Actions disabled" />
        <p className={styles.bodyText}>
          The main action and operator review panel stays ahead of technical metadata. This static
          readiness batch does not call providers, execute video providers, fetch networks, render,
          export, publish, dispatch workers, create files, create downloads, create archives,
          create signed URLs, upload media, create OAuth flows, create webhooks, create schedules,
          authorize accounts, create API routes, create services, deploy runtimes, write files, or
          execute shell/process/command actions from the app. It only reviews the backend-only
          runtime path that must exist before a first real controlled video provider execution can
          exist.
        </p>
        <div className={styles.blockedDeckGrid}>
          {model.readinessItems.map((item, index) => (
            <button
              key={buildVideoProviderRuntimeReadinessStableKey(["readiness-item", String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>review-only backend-owned video provider execution runtime readiness</span>
              <small>controlled video provider execution remains blocked</small>
            </button>
          ))}
        </div>
      </section>
      <section className={styles.glassPanel} aria-label="Video provider runtime readiness safety state">
        <PanelHeading
          eyebrow="Safety state"
          title="Server-only boundary, secret boundaries, execution block, kill switch, lock, and replay block remain enforced"
          badge="Required"
        />
        <div className={styles.contractGrid}>
          {model.deniedItems.map((denial, index) => (
            <span
              key={buildVideoProviderRuntimeReadinessStableKey(["denial", String(index), denial])}
              className={styles.contractChip}
            >
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          This static readiness batch keeps no fetch/network calls, no provider SDK imports in
          frontend, no frontend provider key reads, no plaintext secrets, no localStorage, no
          sessionStorage, no IndexedDB, no cookies, and no browser storage for secrets. It also
          keeps no provider execution, no video provider execution, no network execution, no render
          execution, no export execution, no publish execution, no worker dispatch, no file export,
          no download generation, no archive creation, no signed URL creation, no platform upload,
          no media upload, no OAuth flow creation, no webhook creation, no schedule execution, no
          account authorization execution, no API route execution, no service creation, no runtime
          deploy, no file writes from the app, and no shell/process/command execution from the
          app.
        </p>
      </section>
      <section className={styles.glassPanel} aria-label="Video provider runtime readiness lineage and audit">
        <PanelHeading eyebrow="Lineage and audit" title="Runtime readiness evidence stays review-backed" badge="Audit backed" />
        <p className={styles.bodyText}>
          Safety state appears before technical metadata, and lineage and audit appear before
          technical metadata. Result capture readiness and artifact handoff readiness remain static
          review surfaces backed by lineage, audit, observability, and operator review markers
          only.
        </p>
        <div className={styles.contractGrid}>
          {model.evidenceItems.map((item, index) => (
            <span
              key={buildVideoProviderRuntimeReadinessStableKey(["evidence", String(index), item])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
      </section>
      <section className={styles.glassPanel} aria-label="Video provider runtime readiness route contract technical metadata">
        <PanelHeading eyebrow="Technical metadata" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>
          {model.route.summary} Technical implementation details remain lower on the page.
        </p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildVideoProviderRuntimeReadinessStableKey([
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
      <section className={styles.diagnosticPanel} aria-label="Video provider runtime readiness route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3434-3465 backend-owned runtime readiness coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((item) => (
            <a
              key={buildVideoProviderRuntimeReadinessStableKey(["video-provider-runtime-readiness-route", item.slug])}
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
