"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  CONTROLLED_RENDER_ARTIFACT_ASSEMBLY_TRIAL_SHARED_MARKERS,
  buildControlledRenderArtifactAssemblyTrialModel,
  buildControlledRenderArtifactAssemblyTrialStableKey,
  type ControlledRenderArtifactAssemblyTrialRouteSlug
} from "../controlled-render-artifact-assembly-trial-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ControlledRenderArtifactAssemblyTrialPageClientShell({ routeSlug }: { routeSlug: ControlledRenderArtifactAssemblyTrialRouteSlug }) {
  const model = buildControlledRenderArtifactAssemblyTrialModel(routeSlug);
  return (
    <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      {ControlledRenderArtifactAssemblyTrialRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function ControlledRenderArtifactAssemblyTrialCockpitSection() {
  return ControlledRenderArtifactAssemblyTrialRoutePanel({ routeSlug: "controlled-render-artifact-assembly-trial-completion", embedded: true });
}

export function ControlledRenderArtifactAssemblyTrialRoutePanel({ routeSlug, embedded = false }: { routeSlug: ControlledRenderArtifactAssemblyTrialRouteSlug; embedded?: boolean }) {
  const model = buildControlledRenderArtifactAssemblyTrialModel(routeSlug);
  return (
    <section className={embedded ? styles.cockpitShell : styles.routeShell} data-codexforge-controlled-render-artifact-assembly-trial={CONTROLLED_RENDER_ARTIFACT_ASSEMBLY_TRIAL_SHARED_MARKERS.join(" | ")} data-codexforge-controlled-render-artifact-assembly-trial-route={model.route.markerPhrases.join(" | ")}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Controlled Render Artifact Assembly Trial" : model.route.phase}</span>
            <span className={styles.safeBadge}>assembly plan only</span>
            <span className={styles.blockedBadge}>backend-owned runtime check remains required</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Controlled Render Artifact Assembly Trial" : model.route.title}</h1>
          <p className={styles.heroLead}>This review-only controlled render artifact assembly trial models assembly of already-approved source references into an artifact assembly plan only. It keeps approved text, image, audio, and video references together with approved timeline, scene-order, duration, resolution, size, and cost boundaries. Render artifact assembly remains blocked until explicit operator approval. Operator review remains required before artifact assembly execution. The frontend provides no render execution, no export execution, no publish execution, no worker dispatch, no file export, no download generation, no archive creation, no signed URL creation, no platform upload, no OAuth flow creation, no webhook creation, no file writes from the app, and no shell/process/command execution from the app.</p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Inputs" value="Approved Refs" detail="already-approved source references only" />
            <MetricCard label="Plan" value="Assembly Only" detail="assembly plan only" />
            <MetricCard label="Runtime" value="Blocked" detail="no render execution" />
            <MetricCard label="Review" value="Required" detail="operator review remains required before artifact assembly execution" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Controlled render artifact assembly trial preview">
          <p className={styles.missionLabel}>3338-3369 - Controlled Render Artifact Assembly Trial</p>
          <p className={styles.missionDetail}>Controlled Render Artifact Assembly Trial is review-only, assembly plan only, and disabled by default. Render artifact assembly remains blocked until explicit operator approval. Backend-owned runtime check remains required. Controlled render artifact assembly trial completion does not enable render/export/publish/workers. No provider execution. No network execution. No render execution. No export execution. No publish execution. No worker dispatch. No file export. No download generation. No archive creation. No signed URL creation. No platform upload. No OAuth flow creation. No webhook creation.</p>
        </div>
      </header>
      <section className={styles.markerBand} aria-label="Controlled render artifact assembly trial safety markers">
        {model.safetyMarkers.map((marker, index) => <span key={buildControlledRenderArtifactAssemblyTrialStableKey(["shared-marker", String(index), marker])} className={styles.markerPill}>{marker}</span>)}
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact assembly trial action review panel">
        <PanelHeading eyebrow="Operator review stays first" title="Assembly planning stays review-only" badge="Actions disabled" />
        <p className={styles.bodyText}>The main action and operator review panel stays ahead of technical metadata. This static trial does not render, export, publish, upload, download, dispatch workers, write files, call providers, call networks, or execute runtime work. It only reviews how already-approved source references could assemble into an artifact assembly plan.</p>
        <div className={styles.blockedDeckGrid}>{model.readinessItems.map((item, index) => <button key={buildControlledRenderArtifactAssemblyTrialStableKey(["readiness-item", String(index), item])} type="button" disabled className={styles.blockedCommandButton}><strong>{item}</strong><span>review-only assembly plan contract</span><small>render artifact assembly remains blocked until explicit operator approval</small></button>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact assembly safety state">
        <PanelHeading eyebrow="Safety state" title="Render, export, publish, workers, and file writes remain blocked" badge="Required" />
        <div className={styles.contractGrid}>{model.deniedItems.map((denial, index) => <span key={buildControlledRenderArtifactAssemblyTrialStableKey(["denial", String(index), denial])} className={styles.contractChip}>{denial}</span>)}</div>
        <p className={styles.mutedText}>This static trial performs no provider execution, no network execution, no render execution, no export execution, no publish execution, no worker dispatch, no file export, no download generation, no archive creation, no signed URL creation, no platform upload, no OAuth flow creation, no webhook creation, no file writes from the app, and no shell/process/command execution from the app. Browser storage for secrets stays blocked, and no localStorage, no sessionStorage, no IndexedDB, and no cookies are introduced.</p>
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact assembly lineage and audit">
        <PanelHeading eyebrow="Lineage and audit" title="Assembly evidence stays review-backed" badge="Audit backed" />
        <p className={styles.bodyText}>Safety state appears before technical metadata, and lineage and audit appear before technical metadata. Result preview and result review remain static review surfaces backed by lineage, audit, and observability markers only.</p>
        <div className={styles.contractGrid}>{model.evidenceItems.map((item, index) => <span key={buildControlledRenderArtifactAssemblyTrialStableKey(["evidence", String(index), item])} className={styles.contractChip}>{item}</span>)}</div>
      </section>
      <section className={styles.glassPanel} aria-label="Controlled render artifact assembly route contract technical metadata">
        <PanelHeading eyebrow="Technical metadata" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary} Technical implementation details remain lower on the page.</p>
        <div className={styles.contractGrid}>{model.route.markerPhrases.map((marker, index) => <span key={buildControlledRenderArtifactAssemblyTrialStableKey(["route-marker", model.route.slug, String(index), marker])} className={styles.contractChip}>{marker}</span>)}</div>
      </section>
      <section className={styles.diagnosticPanel} aria-label="Controlled render artifact assembly trial route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="3338-3369 controlled render artifact assembly trial coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>{model.routes.map((item) => <a key={buildControlledRenderArtifactAssemblyTrialStableKey(["controlled-render-artifact-assembly-trial-route", item.slug])} className={styles.diagnosticLink} href={item.href}><span>{item.phase}</span><strong>{item.title}</strong></a>)}</div>
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
