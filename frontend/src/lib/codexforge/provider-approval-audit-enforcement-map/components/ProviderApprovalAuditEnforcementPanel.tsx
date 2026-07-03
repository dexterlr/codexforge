"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  DISABLED_PROVIDER_APPROVAL_AUDIT_EXECUTION_LANE,
  PROVIDER_APPROVAL_AUDIT_BOUNDARY_CHECKS,
  PROVIDER_APPROVAL_AUDIT_DECISION_ENVELOPE,
  PROVIDER_APPROVAL_AUDIT_DENIAL_MATRIX,
  PROVIDER_APPROVAL_AUDIT_GUARDS,
  PROVIDER_APPROVAL_AUDIT_INTENT_ENVELOPE,
  PROVIDER_APPROVAL_AUDIT_POST_RESULT_CHECKLIST,
  PROVIDER_APPROVAL_AUDIT_PREFLIGHT_CHECKLIST,
  PROVIDER_APPROVAL_AUDIT_READINESS_ITEMS,
  PROVIDER_APPROVAL_AUDIT_REQUEST_ENVELOPE,
  PROVIDER_APPROVAL_AUDIT_RESULT_ENVELOPE,
  PROVIDER_APPROVAL_AUDIT_STATE_BRIDGE_RECOVERY,
  buildProviderApprovalAuditEnforcementModel,
  buildProviderApprovalAuditEnforcementStableKey,
  type ProviderApprovalAuditEnforcementRouteSlug,
} from "../provider-approval-audit-enforcement-model";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";

export function ProviderApprovalAuditEnforcementPageClientShell({
  routeSlug,
}: {
  routeSlug: ProviderApprovalAuditEnforcementRouteSlug;
}) {
  const model = buildProviderApprovalAuditEnforcementModel(routeSlug);
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
      <ProviderApprovalAuditEnforcementRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function ProviderApprovalAuditEnforcementCockpitSection() {
  return (
    <ProviderApprovalAuditEnforcementRoutePanel
      routeSlug="controlled-provider-approval-audit-completion-candidate"
      embedded
    />
  );
}

export function ProviderApprovalAuditEnforcementRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: ProviderApprovalAuditEnforcementRouteSlug;
  embedded?: boolean;
}) {
  const model = buildProviderApprovalAuditEnforcementModel(routeSlug);
  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-provider-approval-audit-enforcement={model.safetyMarkers.join(" | ")}
      data-codexforge-provider-approval-audit-route={model.route.markerPhrases.join(" | ")}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>{embedded ? "Provider Approval Audit Enforcement" : model.route.phase}</span>
            <span className={styles.safeBadge}>Synthetic provider approval audit data only</span>
            <span className={styles.blockedBadge}>No live provider execution</span>
          </div>
          <h1 className={styles.heroTitle}>{embedded ? "Provider Approval Audit Enforcement" : model.route.title}</h1>
          <p className={styles.heroLead}>
            Review-only provider approval audit enforcement for approval request envelope previews, approval decision envelope previews, audit intent envelope previews, audit result envelope previews, explicit operator approval gates, denial visibility, expiry and revocation policy boundaries, audit redaction, audit integrity, replay prevention, disabled approval execution lanes, and result review before any future controlled provider dry run candidate. Provider approval audit handling remains backend-owned.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard label="Approval request" value="Synthetic" detail="No live provider execution" />
            <MetricCard label="Decision envelope" value="Review-only" detail="No approval persistence" />
            <MetricCard label="Audit trail" value="Required" detail="No audit persistence" />
            <MetricCard label="Next batch" value="2442-2473" detail="First controlled dry run" />
          </div>
        </div>
        <div className={styles.missionPreview} aria-label="Provider approval audit enforcement readiness">
          <div className={styles.missionOrbOuter}>
            <div className={styles.missionOrbInner}>0%</div>
          </div>
          <p className={styles.missionLabel}>Provider execution</p>
          <p className={styles.missionDetail}>Approval execution lane disabled. Explicit operator approval and audit trail required.</p>
        </div>
      </header>

      <section className={styles.markerBand} aria-label="Provider approval audit enforcement safety markers">
        {model.safetyMarkers.map((marker, index) => (
          <span
            key={buildProviderApprovalAuditEnforcementStableKey(["shared-marker", String(index), marker])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section className={styles.glassPanel} aria-label="Provider Approval Audit Enforcement Map">
        <PanelHeading eyebrow="Provider Approval Audit Enforcement Map" title={model.route.title} badge={model.route.phase} />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {model.route.markerPhrases.map((marker, index) => (
            <span
              key={buildProviderApprovalAuditEnforcementStableKey(["route-marker", model.route.slug, String(index), marker])}
              className={styles.contractChip}
            >
              {marker}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Provider Approval Audit Cockpit Readiness Rail">
        <PanelHeading
          eyebrow="Provider Approval Audit Cockpit Readiness Rail"
          title="Provider approval audit enforcement readiness"
          badge="All actions disabled"
        />
        <div className={styles.blockedDeckGrid}>
          {PROVIDER_APPROVAL_AUDIT_READINESS_ITEMS.map((item, index) => (
            <button
              key={buildProviderApprovalAuditEnforcementStableKey(["readiness-item", String(index), item])}
              type="button"
              disabled
              className={styles.blockedCommandButton}
            >
              <strong>{item}</strong>
              <span>Review-only provider approval audit enforcement</span>
              <small>No provider calls no model calls no prompt sending</small>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.cockpitGrid} aria-label="Provider approval and audit envelopes">
        <CatalogPanel eyebrow="Provider Approval Request Envelope" title="Synthetic approval request envelope preview" items={PROVIDER_APPROVAL_AUDIT_REQUEST_ENVELOPE} />
        <CatalogPanel eyebrow="Provider Approval Decision Envelope" title="Review-only approval decision envelope preview" items={PROVIDER_APPROVAL_AUDIT_DECISION_ENVELOPE} />
        <CatalogPanel eyebrow="Provider Audit Intent Envelope" title="Required audit intent envelope preview" items={PROVIDER_APPROVAL_AUDIT_INTENT_ENVELOPE} />
        <CatalogPanel eyebrow="Provider Audit Result Envelope" title="Required audit result envelope preview" items={PROVIDER_APPROVAL_AUDIT_RESULT_ENVELOPE} />
      </section>

      <section className={styles.cockpitGrid} aria-label="Provider preflight post result and boundary checks">
        <CatalogPanel eyebrow="Provider Preflight Approval Checklist" title="Preflight approval checklist preview" items={PROVIDER_APPROVAL_AUDIT_PREFLIGHT_CHECKLIST} />
        <CatalogPanel eyebrow="Provider Post Result Audit Checklist" title="Post-result audit checklist preview" items={PROVIDER_APPROVAL_AUDIT_POST_RESULT_CHECKLIST} />
        <CatalogPanel eyebrow="Provider Audit Redaction Integrity Replay" title="Redaction integrity replay expiry revocation boundaries" items={PROVIDER_APPROVAL_AUDIT_BOUNDARY_CHECKS} />
        <CatalogPanel eyebrow="Disabled Provider Approval Execution Lane" title="Approval execution lane disabled" items={DISABLED_PROVIDER_APPROVAL_AUDIT_EXECUTION_LANE} />
      </section>

      <section className={styles.cockpitGrid} aria-label="Provider approval audit state bridge and recovery previews">
        <CatalogPanel eyebrow="Provider Approval Audit State" title="State dry run bridge mock result bridge and recovery" items={PROVIDER_APPROVAL_AUDIT_STATE_BRIDGE_RECOVERY} />
      </section>

      <section className={styles.glassPanel} aria-label="Provider Denial Enforcement Matrix">
        <PanelHeading eyebrow="Provider Denial Enforcement Matrix" title="Protected provider approval audit actions stay blocked" badge="Required" />
        <div className={styles.contractGrid}>
          {PROVIDER_APPROVAL_AUDIT_DENIAL_MATRIX.map((denial, index) => (
            <span key={buildProviderApprovalAuditEnforcementStableKey(["denial", String(index), denial])} className={styles.contractChip}>
              {denial}
            </span>
          ))}
        </div>
        <p className={styles.mutedText}>
          Backend-owned provider adapter remains required before any real provider approval audit handling, model execution, prompt transmission, streaming, credential handling, token handling, route handler execution, queue dispatch, worker dispatch, telemetry transmission, audit persistence, approval persistence, service creation, or API creation can exist.
        </p>
      </section>

      <section className={styles.glassPanel} aria-label="Provider approval audit safety navigation smoke checkpoint guards">
        <PanelHeading eyebrow="Provider Approval Audit Safety Regression Guard" title="Fixture safety prompt credential streaming navigation smoke and checkpoint guards" badge="Review-only" />
        <div className={styles.systemsGrid}>
          {PROVIDER_APPROVAL_AUDIT_GUARDS.map((guard) => (
            <article key={buildProviderApprovalAuditEnforcementStableKey(["guard", guard.id])} className={styles.systemCard}>
              <span className={styles.systemTier}>Guardrail</span>
              <strong>{guard.label}</strong>
              <p className={styles.systemStatus}>{guard.state}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.diagnosticPanel} aria-label="Provider approval audit enforcement route diagnostics">
        <PanelHeading eyebrow="Diagnostics" title="2410-2441 provider approval audit enforcement coverage" badge="Phase pages secondary" />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((route) => (
            <a key={buildProviderApprovalAuditEnforcementStableKey(["provider-approval-audit-route", route.slug])} className={styles.diagnosticLink} href={route.href}>
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
          <article key={buildProviderApprovalAuditEnforcementStableKey(["catalog", eyebrow, item.id])} className={styles.systemCard}>
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
