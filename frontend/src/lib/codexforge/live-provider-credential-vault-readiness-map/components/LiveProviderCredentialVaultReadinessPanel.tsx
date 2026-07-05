"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_APPROVAL_ITEMS,
  LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_BOUNDARY_ITEMS,
  LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_DENIED_ITEMS,
  LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_EXECUTION_ITEMS,
  LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_ITEMS,
  LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_POLICY_ITEMS,
  LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_REVIEW_ITEMS,
  LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_SHARED_MARKERS,
  buildLiveProviderCredentialVaultReadinessModel,
  buildLiveProviderCredentialVaultReadinessStableKey,
  type LiveProviderCredentialVaultReadinessRouteSlug
} from "../live-provider-credential-vault-readiness-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function LiveProviderCredentialVaultReadinessPageClientShell({ routeSlug }: { routeSlug: LiveProviderCredentialVaultReadinessRouteSlug }) {
  const model = buildLiveProviderCredentialVaultReadinessModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LiveProviderCredentialVaultReadinessRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function LiveProviderCredentialVaultReadinessCockpitSection() {
  return <LiveProviderCredentialVaultReadinessRoutePanel routeSlug="live-provider-credential-vault-readiness-completion" embedded />;
}

export function LiveProviderCredentialVaultReadinessRoutePanel({ routeSlug, embedded = false }: { routeSlug: LiveProviderCredentialVaultReadinessRouteSlug; embedded?: boolean }) {
  const model = buildLiveProviderCredentialVaultReadinessModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-live-provider-credential-vault-readiness={LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_SHARED_MARKERS.join(" | ")} data-codexforge-live-provider-credential-vault-readiness-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Live Provider Credential Vault Readiness" : model.route.phase}</span>
            <span className={styles.safeBadge}>synthetic credential vault readiness data only</span>
            <span className={styles.blockedBadge}>no credential storage</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Live Provider Credential Vault Readiness" : model.route.title}</h1>
          <p className={styles.heroLead}>This is a review-only live provider credential vault readiness surface. It prepares backend-only credential vault boundary and provider secret reference contract language for a future backend-owned bridge, while live provider credential vault readiness remains blocked until explicit operator approval. Provider keys and provider tokens are never exposed to frontend code, no credentials or secrets are stored, no prompts are sent, and no provider calls are made.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Vault" value="Review-only" detail="backend-only credential vault boundary" />
            <MetricCard label="Reference" value="Synthetic" detail="provider secret reference contract" />
            <MetricCard label="Secrets" value="Blocked" detail="frontend secret exposure remains blocked" />
            <MetricCard label="Execution" value="Blocked" detail="no live provider calls" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Live provider credential vault readiness preview">
          <p className={styles.missionLabel}>3146-3177 - Live Provider Credential Vault Readiness</p>
          <p className={styles.missionDetail}>No credential storage. No token storage. No provider key storage. No secret storage. No plaintext secrets. No environment variable reads from frontend. No process.env provider key reads from frontend. No live provider calls. No model calls. No prompt sending. No streaming. No provider SDK imports. No network egress. No fetch/network calls. No frontend persistence.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Live provider credential vault readiness safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildLiveProviderCredentialVaultReadinessStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Live Provider Credential Vault Readiness Map">
        <PanelHeading eyebrow="Live Provider Credential Vault Readiness" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildLiveProviderCredentialVaultReadinessStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Live provider credential vault readiness rail">
        <PanelHeading eyebrow="live provider credential vault readiness remains blocked until explicit operator approval" title="review-only live provider credential vault readiness" badge="Actions disabled" />
        <div className={styles.blockedDeckGrid}>{LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_ITEMS.map((item, index) => <button key={buildLiveProviderCredentialVaultReadinessStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>synthetic credential vault readiness data only</span><small>no credential storage no provider key storage no live provider calls</small></button>)}</div>
      </section>
      <section className={styles.cockpitGrid} aria-label="Live provider credential vault boundary and approval lanes">
        <CatalogPanel eyebrow="backend-only credential vault boundary" title="Vault boundary secret references key token frontend exposure blocks" items={LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_BOUNDARY_ITEMS} />
        <CatalogPanel eyebrow="credential use requires explicit operator approval" title="Backend references credential scope token scope operator approval" items={LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_APPROVAL_ITEMS} />
      </section>
      <section className={styles.cockpitGrid} aria-label="Live provider credential vault policy and gate lanes">
        <CatalogPanel eyebrow="secret rotation policy" title="Rotation revocation environment dev prod region retention" items={LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_POLICY_ITEMS} />
        <CatalogPanel eyebrow="live provider audit packet" title="Audit redaction observability cost rate privacy safety" items={LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_REVIEW_ITEMS} />
      </section>
      <section className={styles.glassPanel} aria-label="Live provider call readiness remains blocked">
        <PanelHeading eyebrow="live call eligibility remains review-only" title="Timeout retry fallback kill switch and runner handoff" badge="Required" />
        <div className={styles.systemsGrid}>{LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_EXECUTION_ITEMS.map((item) => <article key={buildLiveProviderCredentialVaultReadinessStableKey(["execution", item.id])} className={styles.systemCard}><span className={styles.systemTier}>review-only live provider credential vault readiness</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Disabled live provider credential vault readiness lane">
        <PanelHeading eyebrow="blocked live provider call candidate" title="Protected credential and live-call paths stay blocked" badge="Required" />
        <div className={styles.contractGrid}>{LIVE_PROVIDER_CREDENTIAL_VAULT_READINESS_DENIED_ITEMS.map((denial, index) => <span key={buildLiveProviderCredentialVaultReadinessStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This disabled live provider credential vault readiness surface is static, review-only, and synthetic. It does not store credentials, store tokens, store provider keys, store secrets, expose plaintext secrets, read environment variables from frontend code, read process.env provider keys from frontend code, call providers, call models, send prompts, stream, import provider SDKs, use network egress, create services, create APIs from the frontend, persist to browser storage, dispatch workers, execute jobs, render, export, publish, bind ports, deploy runtimes, or write files from the app.</p>
      </section>
      <section className={styles.diagnosticPanel} aria-label="Live provider credential vault readiness route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3146-3177 live provider credential vault readiness coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildLiveProviderCredentialVaultReadinessStableKey(["live-provider-credential-vault-readiness-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}

function CatalogPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { id: string; label: string; state: string }[] }) {
  return <article className={styles.glassPanel}><PanelHeading eyebrow={eyebrow} title={title} badge="Preview only" /><div className={styles.systemsGrid}>{items.map((item) => <article key={buildLiveProviderCredentialVaultReadinessStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}><span className={styles.systemTier}>synthetic credential vault readiness data only</span><strong>{item.label}</strong><p className={styles.systemStatus}>{item.state}</p></article>)}</div></article>;
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}
