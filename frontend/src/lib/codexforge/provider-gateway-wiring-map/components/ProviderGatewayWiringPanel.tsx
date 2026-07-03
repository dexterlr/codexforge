"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  DISABLED_PROVIDER_ADAPTER_REGISTRY,
  PROVIDER_GATEWAY_BOUNDARY_POLICIES,
  PROVIDER_GATEWAY_CAPABILITY_CATALOG,
  PROVIDER_GATEWAY_MODEL_FAMILIES,
  PROVIDER_GATEWAY_READINESS_ITEMS,
  PROVIDER_GATEWAY_REQUEST_ENVELOPE,
  PROVIDER_GATEWAY_RESPONSE_ENVELOPE,
  PROVIDER_GATEWAY_WIRING_DENIALS,
  buildProviderGatewayWiringModel,
  buildProviderGatewayWiringStableKey,
  type ProviderGatewayWiringRouteSlug,
} from "../provider-gateway-wiring-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ProviderGatewayWiringPageClientShell({ routeSlug }: { routeSlug: ProviderGatewayWiringRouteSlug }) {
  const model = buildProviderGatewayWiringModel(routeSlug);
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
      <ProviderGatewayWiringRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ProviderGatewayReadinessCockpitSection() {
  return <ProviderGatewayWiringRoutePanel routeSlug="controlled-provider-gateway-wiring-completion-candidate" embedded />;
}

export function ProviderGatewayWiringRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ProviderGatewayWiringRouteSlug;
  embedded?: boolean;
}) {
  const model = buildProviderGatewayWiringModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-provider-gateway-wiring={model.safetyMarkers.join(" | ")}
      data-codexforge-provider-gateway-wiring-route={model.route.markerPhrases.join(" | ")}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Provider Gateway Wiring" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic provider data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Provider Gateway Wiring" : model.route.title}</h1>
          <p className={styles.heroLead}>
            Review-only provider gateway wiring for request envelopes, response envelopes, capability catalog, model family
            catalog, selection policy, privacy, cost, rate limit, approval, audit, credentials, tokens, streaming, retry,
            timeout, fallback, observability, and disabled adapters.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Execution state" value="Blocked" detail="No provider calls" />
            <MetricCard label="Request envelope" value="Review-only" detail="No prompt sending" />
            <MetricCard label="Response envelope" value="Synthetic" detail="No streaming" />
            <MetricCard label="Next batch" value="2314-2345" detail="Backend adapter contract" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Provider gateway readiness">
          <div className={styles.missionOrbOuter}>
            <div className={styles.missionOrbInner}>0%</div>
          </div>
          <p className={styles.missionLabel}>Live provider execution</p>
          <p className={styles.missionDetail}>Backend-owned provider gateway remains required. Audit trail required.</p>
        </div>
      </header>

      <section className={styles.markerBand} aria-label="Provider gateway wiring safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildProviderGatewayWiringStableKey(["shared-marker", String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section className={styles.glassPanel} aria-label="Route boundary markers">
        <PanelHeading eyebrow="Provider Gateway Wiring Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildProviderGatewayWiringStableKey(["route-marker", model.route.slug, String(index), marker])}
              className={styles.contractChip}
            >
              {marker}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Provider Gateway Cockpit Readiness Rail">
        <PanelHeading eyebrow="Provider Gateway Cockpit Readiness Rail" title="Provider gateway readiness" badge="All actions disabled" />
        <div className={styles.blockedDeckGrid}>
          {PROVIDER_GATEWAY_READINESS_ITEMS.map((item, index) => (
            <button
              key={buildProviderGatewayWiringStableKey(["readiness-item", String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>Review-only provider gateway wiring</span>
              <small>No live provider execution</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.cockpitGrid} aria-label="Provider gateway envelopes and catalogs">
        <CatalogPanel eyebrow="Provider Request Envelope" title="Future request envelope" items={PROVIDER_GATEWAY_REQUEST_ENVELOPE} />
        <CatalogPanel eyebrow="Provider Response Envelope" title="Synthetic response envelope" items={PROVIDER_GATEWAY_RESPONSE_ENVELOPE} />
        <CatalogPanel eyebrow="Provider Capability Catalog" title="Capability catalog preview" items={PROVIDER_GATEWAY_CAPABILITY_CATALOG} />
        <CatalogPanel eyebrow="Provider Model Family Catalog" title="Model family preview" items={PROVIDER_GATEWAY_MODEL_FAMILIES} />
      </section>

      <section className={styles.glassPanel} aria-label="Disabled Provider Adapter Registry">
        <PanelHeading eyebrow="Disabled Provider Adapter Registry" title="Adapters remain disabled" badge="No SDK clients" />
        <div className={styles.systemsGrid}>
          {DISABLED_PROVIDER_ADAPTER_REGISTRY.map((adapter) => (
            <article key={buildProviderGatewayWiringStableKey(["adapter", adapter.id])} className={styles.systemCard}>
              <span className={styles.systemTier}>Disabled adapter</span>
              <strong>{adapter.label}</strong>
              <p className={styles.systemStatus}>{adapter.state}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Provider gateway boundary policies">
        <PanelHeading eyebrow="Provider Selection Policy" title="Policy-only provider boundaries" badge="Backend-owned" />
        <div className={styles.systemsGrid}>
          {PROVIDER_GATEWAY_BOUNDARY_POLICIES.map((policy) => (
            <article key={buildProviderGatewayWiringStableKey(["policy", policy.id])} className={styles.systemCard}>
              <span className={styles.systemTier}>Review policy</span>
              <strong>{policy.label}</strong>
              <p className={styles.systemStatus}>{policy.state}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Denied provider actions">
        <PanelHeading eyebrow="Review-only provider gateway wiring" title="Protected provider actions stay blocked" badge="No hidden execution" />
        <div className={styles.contractGrid}>
          {PROVIDER_GATEWAY_WIRING_DENIALS.map((denial, index) => (
            <span
              key={buildProviderGatewayWiringStableKey(["denial", String(index), denial])}
              className={styles.contractChip}
            >
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          Backend-owned provider gateway remains required before prompt handling, credential handling, token handling,
          streaming, retry, timeout, fallback, observability, audit persistence, or adapter implementation can exist.
        </p>
      </section>

      <section className={styles.diagnosticPanel} aria-label="Provider gateway route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2282-2313 provider gateway wiring coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((route) => (
            <a
              key={buildProviderGatewayWiringStableKey(["provider-gateway-route", route.slug])}
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

function CatalogPanel({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: readonly { id: string; label: string; state: string }[];
}) {
  return (
    <article className={styles.glassPanel}>
      <PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" />
      <div className={styles.systemsGrid}>
        {items.map((item) => (
          <article key={buildProviderGatewayWiringStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}>
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
