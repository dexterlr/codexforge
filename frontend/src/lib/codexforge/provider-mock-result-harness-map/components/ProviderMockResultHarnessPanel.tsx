"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  DISABLED_PROVIDER_MOCK_RESULT_LANE,
  PROVIDER_MOCK_OUTPUT_PACKET,
  PROVIDER_MOCK_RESULT_DENIAL_MATRIX,
  PROVIDER_MOCK_RESULT_FIXTURE_CATALOG,
  PROVIDER_MOCK_RESULT_GUARDS,
  PROVIDER_MOCK_RESULT_READINESS_ITEMS,
  PROVIDER_MOCK_RESULT_REVIEW_PACKETS,
  PROVIDER_MOCK_RESULT_STATE_REVIEW,
  PROVIDER_MOCK_RESULT_TRANSCRIPT_STEPS,
  buildProviderMockResultHarnessModel,
  buildProviderMockResultHarnessStableKey,
  type ProviderMockResultHarnessRouteSlug,
} from "../provider-mock-result-harness-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ProviderMockResultHarnessPageClientShell({
  routeSlug,
}: {
  routeSlug: ProviderMockResultHarnessRouteSlug;
}) {
  const model = buildProviderMockResultHarnessModel(routeSlug);
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
      <ProviderMockResultHarnessRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ProviderMockResultHarnessCockpitSection() {
  return (
    <ProviderMockResultHarnessRoutePanel
      routeSlug="controlled-provider-mock-result-harness-completion-candidate"
      embedded
    />
  );
}

export function ProviderMockResultHarnessRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ProviderMockResultHarnessRouteSlug;
  embedded?: boolean;
}) {
  const model = buildProviderMockResultHarnessModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-provider-mock-result-harness={model.safetyMarkers.join(" | ")}
      data-codexforge-provider-mock-result-route={model.route.markerPhrases.join(" | ")}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Provider Adapter Mock Result Harness" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic provider mock result data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Provider Adapter Mock Result Harness" : model.route.title}</h1>
          <p className={styles.heroLead}>
            Review-only provider mock result harness for mock output packet previews, fixture catalog review, transcript preview, quality review, safety review, redaction review, audit packet, approval packet, rejection path, recovery path, cost, rate, timeout, fallback, observability, comparison, acceptance criteria, and disabled mock result lanes. Provider mock result handling remains backend-owned.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Mock output packet" value="Synthetic" detail="No model output received" />
            <MetricCard label="Fixture catalog" value="Safe" detail="Deterministic outputs only" />
            <MetricCard label="Safety redaction" value="Required" detail="Backend-owned future gate" />
            <MetricCard label="Next batch" value="2410-2441" detail="Approval audit enforcement" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Provider mock result harness readiness">
          <div className={styles.missionOrbOuter}>
            <div className={styles.missionOrbInner}>0%</div>
          </div>
          <p className={styles.missionLabel}>Provider execution</p>
          <p className={styles.missionDetail}>Review-only synthetic fixtures. Explicit operator approval and audit trail required.</p>
        </div>
      </header>

      <section className={styles.markerBand} aria-label="Provider mock result harness safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildProviderMockResultHarnessStableKey(["shared-marker", String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section className={styles.glassPanel} aria-label="Provider Mock Result Harness Map">
        <PanelHeading eyebrow="Provider Mock Result Harness Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildProviderMockResultHarnessStableKey(["route-marker", model.route.slug, String(index), marker])}
              className={styles.contractChip}
            >
              {marker}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Provider Mock Result Cockpit Readiness Rail">
        <PanelHeading
          eyebrow="Provider Mock Result Cockpit Readiness Rail"
          title="Provider adapter mock result harness readiness"
          badge="All actions disabled"
        />
        <div className={styles.blockedDeckGrid}>
          {PROVIDER_MOCK_RESULT_READINESS_ITEMS.map((item, index) => (
            <button
              key={buildProviderMockResultHarnessStableKey(["readiness-item", String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>Review-only provider mock result harness</span>
              <small>No provider calls no model calls no prompt sending</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.cockpitGrid} aria-label="Synthetic provider mock result packets">
        <CatalogPanel eyebrow="Provider Mock Output Packet" title="Synthetic mock output packet preview" items={PROVIDER_MOCK_OUTPUT_PACKET} />
        <CatalogPanel eyebrow="Provider Mock Result Fixture Catalog" title="Safe deterministic fixture catalog" items={PROVIDER_MOCK_RESULT_FIXTURE_CATALOG} />
        <CatalogPanel eyebrow="Provider Mock Result Transcript" title="Local deterministic transcript preview" items={PROVIDER_MOCK_RESULT_TRANSCRIPT_STEPS} />
        <CatalogPanel eyebrow="Provider Mock Result Quality Safety Redaction Audit Approval Rejection Recovery" title="Review packets and controls" items={PROVIDER_MOCK_RESULT_REVIEW_PACKETS} />
      </section>

      <section className={styles.cockpitGrid} aria-label="Provider mock result lane state and review previews">
        <CatalogPanel eyebrow="Disabled Provider Mock Result Lane" title="All mock result lanes disabled" items={DISABLED_PROVIDER_MOCK_RESULT_LANE} />
        <CatalogPanel eyebrow="Provider Mock Result State" title="State comparison and acceptance" items={PROVIDER_MOCK_RESULT_STATE_REVIEW} />
      </section>

      <section className={styles.glassPanel} aria-label="Provider Mock Result Denial Matrix">
        <PanelHeading eyebrow="Provider Mock Result Denial Matrix" title="Protected provider mock result actions stay blocked" badge="Required" />
        <div className={styles.contractGrid}>
          {PROVIDER_MOCK_RESULT_DENIAL_MATRIX.map((denial, index) => (
            <span key={buildProviderMockResultHarnessStableKey(["denial", String(index), denial])} className={styles.contractChip}>
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          Backend-owned provider adapter remains required before any real provider result handling, model execution, prompt transmission, streaming, credential handling, token handling, route handler execution, queue dispatch, worker dispatch, telemetry transmission, audit persistence, service creation, or API creation can exist.
        </p>
      </section>

      <section className={styles.glassPanel} aria-label="Provider mock result safety navigation smoke checkpoint guards">
        <PanelHeading eyebrow="Provider Mock Result Safety Regression Guard" title="Fixture safety navigation smoke and checkpoint guards" badge="Review-only" />
        <div className={styles.systemsGrid}>
          {PROVIDER_MOCK_RESULT_GUARDS.map((guard) => (
            <article key={buildProviderMockResultHarnessStableKey(["guard", guard.id])} className={styles.systemCard}>
              <span className={styles.systemTier}>Guardrail</span>
              <strong>{guard.label}</strong>
              <p className={styles.systemStatus}>{guard.state}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.diagnosticPanel} aria-label="Provider mock result harness route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2378-2409 provider mock result harness coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((route) => (
            <a key={buildProviderMockResultHarnessStableKey(["provider-mock-result-route", route.slug])} className={styles.diagnosticLink} href={route.href}>
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
          <article key={buildProviderMockResultHarnessStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}>
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
