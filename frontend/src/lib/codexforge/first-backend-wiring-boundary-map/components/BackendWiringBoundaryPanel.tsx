"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  BACKEND_WIRING_BOUNDARY_DENIALS,
  BACKEND_WIRING_CONTRACTS,
  BACKEND_WIRING_READINESS_ITEMS,
  buildBackendWiringBoundaryModel,
  buildBackendWiringBoundaryStableKey,
  type BackendWiringBoundaryRouteSlug,
} from "../backend-wiring-boundary-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function BackendWiringBoundaryPageClientShell({ routeSlug }: { routeSlug: BackendWiringBoundaryRouteSlug }) {
  const model = buildBackendWiringBoundaryModel(routeSlug);
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
      <BackendWiringBoundaryRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function BackendWiringReadinessCockpitSection() {
  return <BackendWiringBoundaryRoutePanel routeSlug="controlled-first-backend-wiring-boundary-completion-candidate" embedded />;
}

export function BackendWiringBoundaryRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: BackendWiringBoundaryRouteSlug;
  embedded?: boolean;
}) {
  const model = buildBackendWiringBoundaryModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-backend-wiring-boundary={model.safetyMarkers.join(" | ")}
      data-codexforge-backend-wiring-boundary-route={model.route.markerPhrases.join(" | ")}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "First Backend Wiring Boundary" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic data only</span>
            <span className={styles.blockedBadge}>No live backend execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "First Backend Wiring Boundary" : model.route.title}</h1>
          <p className={styles.heroLead}>
            Review-only backend wiring boundary for provider gateway, asset storage, audio storage, render queue,
            worker orchestration, artifact export, publish gateway, approval capture, rights consent audit, endpoint
            inventory, envelopes, idempotency, rate limit, secret handling, and observability.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Boundary state" value="Blocked" detail="No live backend execution" />
            <MetricCard label="Data mode" value="Synthetic" detail="No frontend persistence" />
            <MetricCard label="Approval" value="Required" detail="Explicit operator approval required" />
            <MetricCard label="Next batch" value="2282-2313" detail="Provider Gateway Wiring Mega Batch v1" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Backend wiring boundary readiness">
          <div className={styles.missionOrbOuter}>
            <div className={styles.missionOrbInner}>0%</div>
          </div>
          <p className={styles.missionLabel}>Live backend execution</p>
          <p className={styles.missionDetail}>Backend-owned services remain required. Audit trail required.</p>
        </div>
      </header>

      <section className={styles.markerBand} aria-label="Backend wiring boundary safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildBackendWiringBoundaryStableKey(["shared-marker", String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section className={styles.glassPanel} aria-label="Route boundary markers">
        <PanelHeading eyebrow="Backend Wiring Boundary Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildBackendWiringBoundaryStableKey(["route-marker", model.route.slug, String(index), marker])}
              className={styles.contractChip}
            >
              {marker}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Cockpit Backend Readiness Rail">
        <PanelHeading eyebrow="Cockpit Backend Readiness Rail" title="Blocked backend wiring readiness" badge="All buttons disabled" />
        <div className={styles.blockedDeckGrid}>
          {BACKEND_WIRING_READINESS_ITEMS.map((item, index) => (
            <button
              key={buildBackendWiringBoundaryStableKey(["readiness-item", String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>Review-only backend wiring boundary</span>
              <small>No live backend execution</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Disabled Backend Adapter Layer">
        <PanelHeading eyebrow="Disabled Backend Adapter Layer" title="Backend-owned contracts remain required" badge="No dispatch" />
        <div className={styles.systemsGrid}>
          {BACKEND_WIRING_CONTRACTS.map((contract) => (
            <article key={buildBackendWiringBoundaryStableKey(["contract", contract.id])} className={styles.systemCard}>
              <span className={styles.systemTier}>Blocked contract</span>
              <strong>{contract.label}</strong>
              <p className={styles.systemStatus}>{contract.state}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Denied backend actions">
        <PanelHeading eyebrow="Review-only backend wiring boundary" title="Protected backend actions stay blocked" badge="No hidden execution" />
        <div className={styles.contractGrid}>
          {BACKEND_WIRING_BOUNDARY_DENIALS.map((denial, index) => (
            <span
              key={buildBackendWiringBoundaryStableKey(["denial", String(index), denial])}
              className={styles.contractChip}
            >
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          Backend Error Envelope, Backend Audit Envelope, Backend Permission Envelope, Backend Idempotency Boundary,
          Backend Rate Limit Boundary, Backend Secret Handling Boundary, and Backend Observability Boundary remain
          review-only until backend-owned services exist.
        </p>
      </section>

      <section className={styles.diagnosticPanel} aria-label="Backend wiring route coverage">
        <PanelHeading eyebrow="Diagnostics" title="2250-2281 backend wiring boundary coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((route) => (
            <a
              key={buildBackendWiringBoundaryStableKey(["backend-wiring-route", route.slug])}
              className={styles.diagnosticLink}
              href={route.href}
            >
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
