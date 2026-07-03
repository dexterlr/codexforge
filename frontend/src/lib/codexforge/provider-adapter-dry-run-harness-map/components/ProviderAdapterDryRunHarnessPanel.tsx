"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  DISABLED_PROVIDER_DRY_RUN_ADAPTER_LANE,
  PROVIDER_ADAPTER_DRY_RUN_READINESS_ITEMS,
  PROVIDER_DRY_RUN_DENIAL_MATRIX,
  PROVIDER_DRY_RUN_FIXTURE_REGISTRY,
  PROVIDER_DRY_RUN_GUARDS,
  PROVIDER_DRY_RUN_REQUEST_PACKET,
  PROVIDER_DRY_RUN_RESPONSE_PACKET,
  PROVIDER_DRY_RUN_REVIEW_PACKETS,
  PROVIDER_DRY_RUN_STATE_REVIEW,
  PROVIDER_DRY_RUN_TRANSCRIPT_STEPS,
  PROVIDER_DRY_RUN_VALIDATION_MATRIX,
  buildProviderAdapterDryRunHarnessModel,
  buildProviderAdapterDryRunHarnessStableKey,
  type ProviderAdapterDryRunHarnessRouteSlug,
} from "../provider-adapter-dry-run-harness-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ProviderAdapterDryRunHarnessPageClientShell({
  routeSlug,
}: {
  routeSlug: ProviderAdapterDryRunHarnessRouteSlug;
}) {
  const model = buildProviderAdapterDryRunHarnessModel(routeSlug);
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
      <ProviderAdapterDryRunHarnessRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ProviderAdapterDryRunHarnessCockpitSection() {
  return (
    <ProviderAdapterDryRunHarnessRoutePanel
      routeSlug="controlled-provider-adapter-dry-run-completion-candidate"
      embedded
    />
  );
}

export function ProviderAdapterDryRunHarnessRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ProviderAdapterDryRunHarnessRouteSlug;
  embedded?: boolean;
}) {
  const model = buildProviderAdapterDryRunHarnessModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-provider-adapter-dry-run-harness={model.safetyMarkers.join(" | ")}
      data-codexforge-provider-adapter-dry-run-route={model.route.markerPhrases.join(" | ")}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Provider Adapter Dry Run Harness" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic provider dry run data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Provider Adapter Dry Run Harness" : model.route.title}</h1>
          <p className={styles.heroLead}>
            Review-only provider adapter dry run harness for synthetic request packets, response packets, fixture registry, transcript preview, validation matrix, denial matrix, audit packet, approval packet, redaction, cost, rate, timeout, retry, fallback, observability, result review, recovery, and disabled dry run adapter lanes.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Prompt transmission" value="Blocked" detail="Synthetic review only" />
            <MetricCard label="Credentials tokens" value="Blocked" detail="Backend-only future gate" />
            <MetricCard label="Streaming" value="Blocked" detail="No token channels" />
            <MetricCard label="Next batch" value="2378-2409" detail="Mock result harness" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Provider adapter dry run harness readiness">
          <div className={styles.missionOrbOuter}>
            <div className={styles.missionOrbInner}>0%</div>
          </div>
          <p className={styles.missionLabel}>Provider execution</p>
          <p className={styles.missionDetail}>Synthetic fixture diagnostics only. Explicit operator approval and audit trail required.</p>
        </div>
      </header>

      <section className={styles.markerBand} aria-label="Provider adapter dry run harness safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildProviderAdapterDryRunHarnessStableKey(["shared-marker", String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section className={styles.glassPanel} aria-label="Provider Adapter Dry Run Harness Map">
        <PanelHeading eyebrow="Provider Adapter Dry Run Harness Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildProviderAdapterDryRunHarnessStableKey(["route-marker", model.route.slug, String(index), marker])}
              className={styles.contractChip}
            >
              {marker}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Provider Dry Run Cockpit Readiness Rail">
        <PanelHeading
          eyebrow="Provider Dry Run Cockpit Readiness Rail"
          title="Provider adapter dry run harness readiness"
          badge="All actions disabled"
        />
        <div className={styles.blockedDeckGrid}>
          {PROVIDER_ADAPTER_DRY_RUN_READINESS_ITEMS.map((item, index) => (
            <button
              key={buildProviderAdapterDryRunHarnessStableKey(["readiness-item", String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>Review-only provider adapter dry run harness</span>
              <small>No provider calls no model calls no prompt sending</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.cockpitGrid} aria-label="Synthetic provider dry run packets">
        <CatalogPanel eyebrow="Provider Dry Run Request Packet" title="Synthetic request packet preview" items={PROVIDER_DRY_RUN_REQUEST_PACKET} />
        <CatalogPanel eyebrow="Provider Dry Run Response Packet" title="Synthetic response packet preview" items={PROVIDER_DRY_RUN_RESPONSE_PACKET} />
        <CatalogPanel eyebrow="Provider Dry Run Fixture Registry" title="Safe mock fixture registry" items={PROVIDER_DRY_RUN_FIXTURE_REGISTRY} />
        <CatalogPanel eyebrow="Provider Dry Run Transcript" title="Local deterministic transcript preview" items={PROVIDER_DRY_RUN_TRANSCRIPT_STEPS} />
      </section>

      <section className={styles.cockpitGrid} aria-label="Provider dry run validation and review previews">
        <CatalogPanel eyebrow="Provider Dry Run Validation Matrix" title="Review-only validation matrix" items={PROVIDER_DRY_RUN_VALIDATION_MATRIX} />
        <CatalogPanel eyebrow="Provider Dry Run Audit Approval Redaction Cost Rate Timeout Retry Fallback Observability" title="Preview packets and controls" items={PROVIDER_DRY_RUN_REVIEW_PACKETS} />
        <CatalogPanel eyebrow="Disabled Provider Dry Run Adapter Lane" title="All adapter lanes disabled" items={DISABLED_PROVIDER_DRY_RUN_ADAPTER_LANE} />
        <CatalogPanel eyebrow="Provider Dry Run Harness State" title="State result review and recovery" items={PROVIDER_DRY_RUN_STATE_REVIEW} />
      </section>

      <section className={styles.glassPanel} aria-label="Provider Dry Run Denial Matrix">
        <PanelHeading eyebrow="Provider Dry Run Denial Matrix" title="Protected provider dry run actions stay blocked" badge="Required" />
        <div className={styles.contractGrid}>
          {PROVIDER_DRY_RUN_DENIAL_MATRIX.map((denial, index) => (
            <span key={buildProviderAdapterDryRunHarnessStableKey(["denial", String(index), denial])} className={styles.contractChip}>
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          Backend-owned provider adapter remains required before any real provider dry run, model execution, prompt transmission, streaming, credential handling, token handling, route handler execution, queue dispatch, worker dispatch, telemetry transmission, audit persistence, or service creation can exist.
        </p>
      </section>

      <section className={styles.glassPanel} aria-label="Provider dry run safety navigation smoke checkpoint guards">
        <PanelHeading eyebrow="Provider Dry Run Safety Regression Guard" title="Fixture safety navigation smoke and checkpoint guards" badge="Review-only" />
        <div className={styles.systemsGrid}>
          {PROVIDER_DRY_RUN_GUARDS.map((guard) => (
            <article key={buildProviderAdapterDryRunHarnessStableKey(["guard", guard.id])} className={styles.systemCard}>
              <span className={styles.systemTier}>Guardrail</span>
              <strong>{guard.label}</strong>
              <p className={styles.systemStatus}>{guard.state}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.diagnosticPanel} aria-label="Provider adapter dry run harness route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2346-2377 provider adapter dry run harness coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((route) => (
            <a key={buildProviderAdapterDryRunHarnessStableKey(["provider-dry-run-route", route.slug])} className={styles.diagnosticLink} href={route.href}>
              <span>{route.phase}</span>
              <strong>{route.title}</strong>
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

function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return (
    <article className={styles.glassPanel}>
      <PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" />
      <div className={styles.systemsGrid}>
        {items.map((item) => (
          <article key={buildProviderAdapterDryRunHarnessStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}>
            <span className={styles.systemTier}>Synthetic fixture</span>
            <strong>{item.label}</strong>
            <p className={styles.systemStatus}>{item.state}</p>
          </article>
        ))}
      </div>
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
