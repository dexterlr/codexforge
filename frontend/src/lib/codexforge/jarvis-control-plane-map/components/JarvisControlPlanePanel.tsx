'use client';

import { CodexForgeAppShell } from '@/lib/codexforge/navigation-shell';
import styles from '../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css';
import {
  buildJarvisControlPlaneModel,
  buildJarvisControlPlaneStableKey,
  type JarvisControlPlaneRouteSlug,
} from '../jarvis-control-plane-model';

export function JarvisControlPlanePageClientShell({
  routeSlug,
}: {
  routeSlug: JarvisControlPlaneRouteSlug;
}) {
  const model = buildJarvisControlPlaneModel(routeSlug);
  return (
    <CodexForgeAppShell
      activePath={model.route.href}
      workspaceLabel={model.route.title}
      nextActionContext={{ wantsOperatorOverview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      {JarvisControlPlaneRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function JarvisControlPlaneRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: JarvisControlPlaneRouteSlug;
  embedded?: boolean;
}) {
  const model = buildJarvisControlPlaneModel(routeSlug);
  const reviewAreas = [...model.approvalAreas, ...model.auditAreas];
  const executionGuardrails = [
    ...model.executionBlocks,
    ...model.securityBoundaries,
  ];
  const routeMetadata = [...model.route.markerPhrases, ...model.deniedItems];

  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-control-plane={model.sharedMarkers.join(' | ')}
      data-codexforge-jarvis-control-plane-route={model.route.markerPhrases.join(
        ' | '
      )}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {embedded ? 'Jarvis Operator Control Plane Foundation' : model.route.phase}
            </span>
            <span className={styles.safeBadge}>Jarvis control plane only</span>
            <span className={styles.blockedBadge}>disabled by default</span>
          </div>
          <h1 className={styles.heroTitle}>
            {embedded ? 'Jarvis Operator Control Plane Foundation' : model.route.title}
          </h1>
          <p className={styles.heroLead}>
            Jarvis sits above all CodexForge features. This shared backend adapter
            system foundation stays Jarvis control plane only, operator control
            plane only, feature oversight only, and no direct frontend execution.
            It defines capability registry foundation, permission posture
            foundation, approval router foundation, backend adapter contract
            foundation, video adapter awareness only, website adapter awareness
            only, avatar adapter awareness only, chatbot brain awareness only,
            trading adapter awareness only, workflow adapter awareness only,
            render export publish awareness only, task planner readiness only,
            human approval gate required, risk tier review only, dry-run first
            policy required, audit readiness only, observability readiness only,
            result ledger readiness only, memory boundary review only, kill switch
            remains enforced, lock manager readiness only, idempotency readiness
            only, replay block remains required, and operator review remains
            required before any execution.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Mode"
              value="Control plane"
              detail="shared backend adapter system foundation"
            />
            <MetricCard
              label="Registry"
              value="Readiness"
              detail="capability registry foundation"
            />
            <MetricCard
              label="Approval"
              value="Required"
              detail="human approval gate required"
            />
            <MetricCard
              label="Kill switch"
              value="Enforced"
              detail="hard kill switch"
            />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Jarvis control plane preview">
          <p className={styles.missionLabel}>
            3562-3593 - Jarvis Operator Control Plane Foundation
          </p>
          <p className={styles.missionDetail}>
            Jarvis foundation completion does not enable
            provider/render/export/publish/workers/trading/automation. Jarvis
            control plane only. No direct frontend execution. Next likely batch:
            3594-3625 - Jarvis Shared Backend Adapter Contract.
          </p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Jarvis control plane safety markers">
        {model.sharedMarkers.map((marker, index) => (
          <span
            key={buildJarvisControlPlaneStableKey(['shared-marker', String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>
      <section className={styles.glassPanel} aria-label="Jarvis capability registry and feature oversight">
        <PanelHeading
          eyebrow="Capability registry"
          title="Jarvis oversees shared readiness instead of executing features"
          badge="Execution blocked"
        />
        <p className={styles.bodyText}>
          Jarvis control plane only means the frontend may review registry
          posture, permission posture, approval routing, backend adapter
          awareness, audit readiness, result ledger readiness, kill switch
          posture, task planning readiness, feature oversight, and operator
          review. It does not execute providers, websites, avatars, trading,
          workflows, render/export/publish flows, workers, schedules, uploads,
          or any live automation.
        </p>
        <div className={styles.blockedDeckGrid}>
          {model.capabilityAreas.map((item, index) => (
            <button
              key={buildJarvisControlPlaneStableKey(['capability', String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>Jarvis control plane only</span>
              <small>no direct frontend execution</small>
            </button>
          ))}
        </div>
      </section>
      <section className={styles.glassPanel} aria-label="Jarvis adapter awareness">
        <PanelHeading
          eyebrow="Adapter awareness"
          title="Future adapters plug into shared backend adapter system foundation"
          badge="Awareness only"
        />
        <div className={styles.contractGrid}>
          {model.adapterAwarenessAreas.map((item, index) => (
            <span
              key={buildJarvisControlPlaneStableKey(['awareness', String(index), item])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          Video adapter awareness only, website adapter awareness only, avatar
          adapter awareness only, chatbot brain awareness only, trading adapter
          awareness only, workflow adapter awareness only, and render export
          publish awareness only stay reviewable without direct frontend
          execution or live backend invocation.
        </p>
      </section>
      <section className={styles.glassPanel} aria-label="Jarvis approval and audit posture">
        <PanelHeading
          eyebrow="Approval posture"
          title="Human approval, dry-run-first policy, audit readiness, and replay protection stay mandatory"
          badge="Review required"
        />
        <div className={styles.contractGrid}>
          {reviewAreas.map((item, index) => (
            <span
              key={buildJarvisControlPlaneStableKey(['approval-audit', String(index), item])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
        <p className={styles.bodyText}>
          Human approval gate required, risk tier review only, dry-run first
          policy required, audit readiness only, observability readiness only,
          result ledger readiness only, memory boundary review only, lock
          manager readiness only, idempotency readiness only, replay block
          remains required, and operator review remains required before any
          execution all remain first-class Jarvis review surfaces.
        </p>
      </section>
      <section className={styles.glassPanel} aria-label="Jarvis execution guardrails">
        <PanelHeading
          eyebrow="Execution guardrails"
          title="Every live action remains blocked from this frontend foundation"
          badge="Hard blocked"
        />
        <div className={styles.contractGrid}>
          {executionGuardrails.map((item, index) => (
            <span
              key={buildJarvisControlPlaneStableKey(['execution-block', String(index), item])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          No live provider call, no provider execution, no video provider
          execution, no image provider execution, no audio provider execution,
          no website creation execution, no avatar generation execution, no
          trading execution, no paper trading execution, no real-money trading
          execution, no network execution, no render execution, no export
          execution, no publish execution, no worker dispatch, no file export,
          no download generation, no archive creation, no signed URL creation,
          no platform upload, no media upload, no OAuth flow creation, no
          webhook creation, no schedule execution, no account authorization
          execution, no API route execution, no service creation, no runtime
          deploy, no file writes from the app, and no shell/process/command
          execution from the app.
        </p>
      </section>
      <section className={styles.glassPanel} aria-label="Jarvis route metadata">
        <PanelHeading
          eyebrow="Technical metadata"
          title={model.route.title}
          badge={model.route.phase}
        />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {routeMetadata.map((item, index) => (
            <span
              key={buildJarvisControlPlaneStableKey([
                'route-marker',
                model.route.slug,
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
      <section className={styles.diagnosticPanel} aria-label="Jarvis control plane diagnostics">
        <PanelHeading
          eyebrow="Diagnostics"
          title="3562-3593 Jarvis operator control plane coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((item) => (
            <a
              key={buildJarvisControlPlaneStableKey(['route', item.slug])}
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
