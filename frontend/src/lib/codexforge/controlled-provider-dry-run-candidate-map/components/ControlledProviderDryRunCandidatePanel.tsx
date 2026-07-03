"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  CONTROLLED_PROVIDER_DRY_RUN_APPROVAL_AUDIT_PACKETS,
  CONTROLLED_PROVIDER_DRY_RUN_CANDIDATE_SHARED_MARKERS,
  CONTROLLED_PROVIDER_DRY_RUN_DENIED_EXECUTION,
  CONTROLLED_PROVIDER_DRY_RUN_FIXTURE_TRANSCRIPT_HANDOFF,
  CONTROLLED_PROVIDER_DRY_RUN_GUARDS,
  CONTROLLED_PROVIDER_DRY_RUN_INTENT_PACKET,
  CONTROLLED_PROVIDER_DRY_RUN_PREFLIGHT_GATES,
  CONTROLLED_PROVIDER_DRY_RUN_READINESS_ITEMS,
  buildControlledProviderDryRunCandidateModel,
  buildControlledProviderDryRunCandidateStableKey,
  type ControlledProviderDryRunCandidateRouteSlug,
} from "../controlled-provider-dry-run-candidate-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ControlledProviderDryRunCandidatePageClientShell({
  routeSlug,
}: {
  routeSlug: ControlledProviderDryRunCandidateRouteSlug;
}) {
  const model = buildControlledProviderDryRunCandidateModel(routeSlug);
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
      <ControlledProviderDryRunCandidateRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ControlledProviderDryRunCandidateCockpitSection() {
  return <ControlledProviderDryRunCandidateRoutePanel routeSlug="controlled-provider-dry-run-completion-candidate" embedded />;
}

export function ControlledProviderDryRunCandidateRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ControlledProviderDryRunCandidateRouteSlug;
  embedded?: boolean;
}) {
  const model = buildControlledProviderDryRunCandidateModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-controlled-provider-dry-run-candidate={CONTROLLED_PROVIDER_DRY_RUN_CANDIDATE_SHARED_MARKERS.join(" | ")}
      data-codexforge-controlled-provider-dry-run-route={model.route.markerPhrases.join(" | ")}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Controlled Provider Dry Run Candidate" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic controlled provider dry run data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Controlled Provider Dry Run Candidate" : model.route.title}</h1>
          <p className={styles.heroLead}>
            Review-only controlled provider dry run candidate connecting provider gateway review, backend adapter contracts, dry run harness data, mock result handoff, approval-bound packets, audit-bound packets, preflight visibility, denied execution summaries, and disabled operator review actions. Provider dry run remains backend-owned with no provider calls, model calls, prompt sending, streaming, credential storage, token storage, persistence, queue dispatch, worker dispatch, service creation, or route handlers for live provider execution.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Run intent packet" value="Synthetic" detail="No prompt sending" />
            <MetricCard label="Approval-bound packet" value="Review-only" detail="No approval persistence" />
            <MetricCard label="Audit-bound packet" value="Review-only" detail="No audit persistence" />
            <MetricCard label="Execution lane" value="Disabled" detail="Backend readiness required" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Controlled provider dry run readiness">
          <div className={styles.missionOrbOuter}>
            <div className={styles.missionOrbInner}>0%</div>
          </div>
          <p className={styles.missionLabel}>Provider execution</p>
          <p className={styles.missionDetail}>No live provider execution. Backend-owned provider adapter remains required.</p>
        </div>
      </header>

      <section className={styles.markerBand} aria-label="Controlled provider dry run safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span key={buildControlledProviderDryRunCandidateStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>
            {marker}
          </span>
        ))}
      </section>

      <section className={styles.glassPanel} aria-label="Controlled Provider Dry Run Candidate Map">
        <PanelHeading eyebrow="Controlled Provider Dry Run Candidate Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span key={buildControlledProviderDryRunCandidateStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>
              {marker}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Controlled Provider Dry Run Cockpit Readiness Rail">
        <PanelHeading eyebrow="Controlled Provider Dry Run Cockpit Readiness Rail" title="Controlled provider dry run readiness" badge="All actions disabled" />
        <div className={styles.blockedDeckGrid}>
          {CONTROLLED_PROVIDER_DRY_RUN_READINESS_ITEMS.map((item, index) => (
            <button key={buildControlledProviderDryRunCandidateStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}>
              <strong>{item}</strong>
              <span>Review-only controlled provider dry run candidate</span>
              <small>No provider calls no model calls no prompt sending</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.cockpitGrid} aria-label="Controlled provider packets and preflight summary">
        <CatalogPanel eyebrow="Controlled Provider Run Intent Packet" title="Synthetic controlled run intent packet" items={CONTROLLED_PROVIDER_DRY_RUN_INTENT_PACKET} />
        <CatalogPanel eyebrow="Controlled Provider Approval Bound Packet" title="Review-only approval-bound packet" items={CONTROLLED_PROVIDER_DRY_RUN_APPROVAL_AUDIT_PACKETS} />
        <CatalogPanel eyebrow="Controlled Provider Audit Bound Packet" title="Review-only audit-bound packet" items={CONTROLLED_PROVIDER_DRY_RUN_APPROVAL_AUDIT_PACKETS} />
        <CatalogPanel eyebrow="Controlled Provider Preflight Summary" title="Required dry run preflight summary" items={CONTROLLED_PROVIDER_DRY_RUN_PREFLIGHT_GATES} />
      </section>

      <section className={styles.cockpitGrid} aria-label="Controlled provider fixture transcript mock handoff and operator review">
        <CatalogPanel eyebrow="Controlled Provider Dry Run Fixture Selection" title="Synthetic fixture selection preview" items={CONTROLLED_PROVIDER_DRY_RUN_FIXTURE_TRANSCRIPT_HANDOFF} />
        <CatalogPanel eyebrow="Controlled Provider Dry Run Transcript Assembly" title="Deterministic transcript assembly preview" items={CONTROLLED_PROVIDER_DRY_RUN_FIXTURE_TRANSCRIPT_HANDOFF} />
        <CatalogPanel eyebrow="Controlled Provider Mock Result Handoff" title="Mock result handoff summary" items={CONTROLLED_PROVIDER_DRY_RUN_FIXTURE_TRANSCRIPT_HANDOFF} />
        <CatalogPanel eyebrow="Controlled Provider Operator Review Panel" title="Operator review actions disabled" items={CONTROLLED_PROVIDER_DRY_RUN_PREFLIGHT_GATES} />
      </section>

      <section className={styles.glassPanel} aria-label="Controlled Provider Denied Execution Summary">
        <PanelHeading eyebrow="Controlled Provider Denied Execution Summary" title="Protected controlled provider actions stay blocked" badge="Required" />
        <div className={styles.contractGrid}>
          {CONTROLLED_PROVIDER_DRY_RUN_DENIED_EXECUTION.map((denial, index) => (
            <span key={buildControlledProviderDryRunCandidateStableKey(["denial", String(index), denial])} className={styles.contractChip}>
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          Backend-owned provider adapter remains required before any real provider dry run, model execution, prompt transmission, streaming, credential handling, token handling, route handler execution, queue dispatch, worker dispatch, telemetry transmission, audit persistence, approval persistence, service creation, or API creation can exist.
        </p>
      </section>

      <section className={styles.glassPanel} aria-label="Controlled provider dry run safety navigation smoke checkpoint guards">
        <PanelHeading eyebrow="Controlled Provider Dry Run Safety Regression Guard" title="Fixture safety prompt credential streaming navigation smoke and checkpoint guards" badge="Review-only" />
        <div className={styles.systemsGrid}>
          {CONTROLLED_PROVIDER_DRY_RUN_GUARDS.map((guard) => (
            <article key={buildControlledProviderDryRunCandidateStableKey(["guard", guard.id])} className={styles.systemCard}>
              <span className={styles.systemTier}>Guardrail</span>
              <strong>{guard.label}</strong>
              <p className={styles.systemStatus}>{guard.state}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.diagnosticPanel} aria-label="Controlled provider dry run candidate route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2442-2473 controlled provider dry run candidate coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((route) => (
            <a key={buildControlledProviderDryRunCandidateStableKey(["controlled-provider-dry-run-route", route.slug])} className={styles.diagnosticLink} href={route.href}>
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
          <article key={buildControlledProviderDryRunCandidateStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}>
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
