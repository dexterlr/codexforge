"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_SHARED_MARKERS,
  buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeModel,
  buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeStableKey,
  type PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSlug
} from "../primary-navigation-readme-workspace-layout-upgrade-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function PrimaryNavigationReadmeWorkspaceLayoutUpgradePageClientShell({ routeSlug }: { routeSlug: PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSlug }) {
  const model = buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <PrimaryNavigationReadmeWorkspaceLayoutUpgradeRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function PrimaryNavigationReadmeWorkspaceLayoutUpgradeCockpitSection() {
  return <PrimaryNavigationReadmeWorkspaceLayoutUpgradeRoutePanel routeSlug="primary-navigation-readme-workspace-layout-upgrade-completion" embedded />;
}

export function PrimaryNavigationReadmeWorkspaceLayoutUpgradeRoutePanel({ routeSlug, embedded = false }: { routeSlug: PrimaryNavigationReadmeWorkspaceLayoutUpgradeRouteSlug; embedded?: boolean }) {
  const model = buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-primary-navigation-readme-workspace-layout-upgrade={PRIMARY_NAVIGATION_README_WORKSPACE_LAYOUT_UPGRADE_SHARED_MARKERS.join(" | ")} data-codexforge-primary-navigation-readme-workspace-layout-upgrade-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Product shell" : model.route.phase}</span>
            <span className={styles.safeBadge}>review-only</span>
            <span className={styles.blockedBadge}>execution blocked</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "CodexForge Product Shell" : model.route.title}</h1>
          <p className={styles.heroLead}>CodexForge is an operator cockpit for controlled AI/video/workflow/trading development. This god-tier product shell consolidation makes the main operator workflow obvious: user action first, safety state second, evidence audit third, and technical implementation details last. Phase checkpoint routes remain preserved, but phase checkpoint routes do not dominate primary navigation.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Action" value="First" detail="generation chat box appears first on generation pages" />
            <MetricCard label="Safety" value="Second" detail="approval state appears above technical metadata" />
            <MetricCard label="Evidence" value="Third" detail="output preview appears above technical checkpoint details" />
            <MetricCard label="Details" value="Last" detail="technical implementation details last" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="CodexForge primary navigation product areas">
          <p className={styles.missionLabel}>3210-3241 - CodexForge Primary Navigation, README, and Workspace Layout Upgrade</p>
          <p className={styles.missionDetail}>Primary navigation product areas: Home / Operator Cockpit, Generate, Projects, Assets, Providers, Workflows, Trading, Audit / Runs, Settings / Safety, and Developer / Checkpoints. First Live Text Provider Call Backend Bridge remains the latest completed provider bridge after batch 3178-3209; live provider execution remains tightly controlled; provider keys must never be exposed to frontend.</p>
        </div>
      </header>

      <section className={styles.glassPanel} aria-label="Action first request panel">
        <PanelHeading eyebrow="user action first" title="Operator request panel" badge="First" />
        <div className={styles.blockedDeckGrid}>{model.actionItems.map((item, index) => <button key={buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeStableKey(["action", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only navigation and workspace layout consolidation</span><small>no live provider calls, no model calls, no prompt sending</small></button>)}</div>
      </section>

      <section className={styles.glassPanel} aria-label="Primary navigation product areas">
        <PanelHeading eyebrow="primary navigation product areas" title="Operator product map" badge="Primary" />
        <div className={styles.contractGrid}>{model.productAreas.map((area) => <span key={buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeStableKey(["area", area])} className={styles.contractChip}>{area}</span>)}</div>
      </section>

      <section className={styles.glassPanel} aria-label="Safety state second">
        <PanelHeading eyebrow="safety state second" title="Live readiness and approval state" badge="Blocked" />
        <div className={styles.contractGrid}>{model.readinessItems.map((item, index) => <span key={buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeStableKey(["readiness", String(index), item])} className={styles.contractChip}>{item}</span>)}</div>
        <p className={styles.mutedText}>README explains current live readiness status, README explains provider key never exposed to frontend, and README explains first live text provider bridge. The only approved first live text provider prompt remains: Return OK and the approved dry-run id.</p>
      </section>

      <section className={styles.glassPanel} aria-label="Evidence audit third">
        <PanelHeading eyebrow="evidence audit third" title="Output preview and audit evidence" badge="Review" />
        <p className={styles.bodyText}>Generation-style pages put the generation chat box appears first on generation pages, approval state appears above technical metadata, output preview appears above technical checkpoint details, and safety/cost/audit details before lower technical checkpoint metadata.</p>
        <div className={styles.contractGrid}>{model.layoutOrder.map((item) => <span key={buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeStableKey(["layout", item])} className={styles.contractChip}>{item}</span>)}</div>
      </section>

      <section className={styles.glassPanel} aria-label="Denied execution patterns">
        <PanelHeading eyebrow="technical implementation details last" title="Execution boundaries remain blocked" badge="Hard rules" />
        <div className={styles.contractGrid}>{model.deniedItems.map((item, index) => <span key={buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeStableKey(["denied", String(index), item])} className={styles.contractChip}>{item}</span>)}</div>
        <p className={styles.mutedText}>This static product-shell batch does not add live provider calls, model calls, prompt sending, streaming, provider SDK imports, frontend provider key reads, credential exposure, secret storage, browser storage for secrets, network calls, frontend services, frontend APIs, worker execution, or render/export/publish execution.</p>
      </section>

      <section className={styles.diagnosticPanel} aria-label="Technical checkpoint metadata">
        <PanelHeading eyebrow="Developer / Checkpoints" title="Phase checkpoint routes remain preserved" badge="Secondary" />
        <p className={styles.bodyText}>Technical phase and checkpoint pages remain discoverable through Developer / Checkpoints, command search, docs, and secondary navigation. They are no longer the only visible product menu model.</p>
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildPrimaryNavigationReadmeWorkspaceLayoutUpgradeStableKey(["primary-navigation-readme-workspace-layout-upgrade-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
      </section>
    </section>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metricCard}><span className={styles.metricLabel}>{label}</span><strong className={styles.metricValue}>{value}</strong><span className={styles.metricDetail}>{detail}</span></article>;
}

function PanelHeading({ eyebrow, title, badge }: { eyebrow: string; title: string; badge: string }) {
  return <div className={styles.panelHeader}><div><p className={styles.eyebrow}>{eyebrow}</p><h2 className={styles.sectionTitle}>{title}</h2></div><span className={styles.safeBadge}>{badge}</span></div>;
}