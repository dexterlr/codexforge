"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  DISABLED_PROVIDER_BACKEND_ADAPTER_CATALOG,
  PROVIDER_BACKEND_ADAPTER_ACCOUNTING_CONTRACTS,
  PROVIDER_BACKEND_ADAPTER_BOUNDARY_CONTRACTS,
  PROVIDER_BACKEND_ADAPTER_DENIALS,
  PROVIDER_BACKEND_ADAPTER_INTERFACE_CONTRACT,
  PROVIDER_BACKEND_ADAPTER_MAPPING_CONTRACTS,
  PROVIDER_BACKEND_ADAPTER_READINESS_ITEMS,
  buildProviderBackendAdapterContractModel,
  buildProviderBackendAdapterContractStableKey,
  type ProviderBackendAdapterContractRouteSlug,
} from "../provider-backend-adapter-contract-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ProviderBackendAdapterContractPageClientShell({
  routeSlug,
}: {
  routeSlug: ProviderBackendAdapterContractRouteSlug;
}) {
  const model = buildProviderBackendAdapterContractModel(routeSlug);
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
      <ProviderBackendAdapterContractRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ProviderBackendAdapterContractCockpitSection() {
  return (
    <ProviderBackendAdapterContractRoutePanel
      routeSlug="controlled-provider-backend-adapter-contract-completion-candidate"
      embedded
    />
  );
}

export function ProviderBackendAdapterContractRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ProviderBackendAdapterContractRouteSlug;
  embedded?: boolean;
}) {
  const model = buildProviderBackendAdapterContractModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-provider-backend-adapter-contract={model.safetyMarkers.join(" | ")}
      data-codexforge-provider-backend-adapter-contract-route={model.route.markerPhrases.join(" | ")}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Provider Backend Adapter Contract" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic adapter data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Provider Backend Adapter Contract" : model.route.title}</h1>
          <p className={styles.heroLead}>
            Review-only provider backend adapter contract for interface, manifest, request mapping, response mapping, error
            mapping, audit mapping, approval mapping, credential requirements, token handling, streaming, retry, fallback,
            timeout, sandbox boundaries, disabled backend adapter catalog, and future dry run harness readiness.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Implementation state" value="Blocked" detail="Backend-owned harness required" />
            <MetricCard label="Adapter interface" value="Contract-only" detail="No SDK clients" />
            <MetricCard label="Mappings" value="Synthetic" detail="No prompt sending" />
            <MetricCard label="Next batch" value="2346-2377" detail="First dry run harness" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Provider adapter contract readiness">
          <div className={styles.missionOrbOuter}>
            <div className={styles.missionOrbInner}>0%</div>
          </div>
          <p className={styles.missionLabel}>Adapter implementation</p>
          <p className={styles.missionDetail}>Backend-owned provider adapter remains required. Audit trail required.</p>
        </div>
      </header>

      <section className={styles.markerBand} aria-label="Provider backend adapter contract safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildProviderBackendAdapterContractStableKey(["shared-marker", String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section className={styles.glassPanel} aria-label="Route boundary markers">
        <PanelHeading eyebrow="Provider Backend Adapter Contract Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildProviderBackendAdapterContractStableKey(["route-marker", model.route.slug, String(index), marker])}
              className={styles.contractChip}
            >
              {marker}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Provider Adapter Cockpit Readiness Rail">
        <PanelHeading
          eyebrow="Provider Adapter Cockpit Readiness Rail"
          title="Provider backend adapter contract readiness"
          badge="All actions disabled"
        />
        <div className={styles.blockedDeckGrid}>
          {PROVIDER_BACKEND_ADAPTER_READINESS_ITEMS.map((item, index) => (
            <button
              key={buildProviderBackendAdapterContractStableKey(["readiness-item", String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>Review-only provider backend adapter contract</span>
              <small>No live provider execution</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.cockpitGrid} aria-label="Provider adapter interface and mapping contracts">
        <CatalogPanel eyebrow="Provider Adapter Interface" title="Backend adapter interface shape" items={PROVIDER_BACKEND_ADAPTER_INTERFACE_CONTRACT} />
        <CatalogPanel eyebrow="Provider Adapter Manifest" title="Manifest and mapping contracts" items={PROVIDER_BACKEND_ADAPTER_MAPPING_CONTRACTS} />
        <CatalogPanel eyebrow="Provider Adapter Sandbox Boundary" title="Credential token streaming retry fallback timeout" items={PROVIDER_BACKEND_ADAPTER_BOUNDARY_CONTRACTS} />
        <CatalogPanel eyebrow="Provider Adapter Observability Contract" title="Accounting and harness previews" items={PROVIDER_BACKEND_ADAPTER_ACCOUNTING_CONTRACTS} />
      </section>

      <section className={styles.glassPanel} aria-label="Disabled Provider Backend Adapter Catalog">
        <PanelHeading eyebrow="Disabled Provider Backend Adapter Catalog" title="All backend adapter families disabled" badge="No SDK clients" />
        <div className={styles.systemsGrid}>
          {DISABLED_PROVIDER_BACKEND_ADAPTER_CATALOG.map((adapter) => (
            <article key={buildProviderBackendAdapterContractStableKey(["adapter", adapter.id])} className={styles.systemCard}>
              <span className={styles.systemTier}>Disabled backend adapter</span>
              <strong>{adapter.label}</strong>
              <p className={styles.systemStatus}>{adapter.state}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Denied provider adapter actions">
        <PanelHeading eyebrow="Review-only provider backend adapter contract" title="Protected provider adapter actions stay blocked" badge="No hidden execution" />
        <div className={styles.contractGrid}>
          {PROVIDER_BACKEND_ADAPTER_DENIALS.map((denial, index) => (
            <span key={buildProviderBackendAdapterContractStableKey(["denial", String(index), denial])} className={styles.contractChip}>
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          Backend-owned provider adapter remains required before interface implementation, manifest discovery, request or
          response transformation, credential handling, token handling, streaming, retry, timeout, fallback, sandboxing,
          redaction, observability, audit persistence, or adapter dry run harness behavior can exist.
        </p>
      </section>

      <section className={styles.diagnosticPanel} aria-label="Provider backend adapter contract route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2314-2345 provider backend adapter contract coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((route) => (
            <a key={buildProviderBackendAdapterContractStableKey(["provider-backend-adapter-route", route.slug])} className={styles.diagnosticLink} href={route.href}>
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
          <article key={buildProviderBackendAdapterContractStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}>
            <span className={styles.systemTier}>Review contract</span>
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
