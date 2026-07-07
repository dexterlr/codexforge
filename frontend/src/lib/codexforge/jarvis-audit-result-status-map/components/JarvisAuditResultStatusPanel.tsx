'use client';

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import type {
  JarvisAuditResultStatusReviewSnapshot,
  JarvisAuditResultStatusRouteSlug,
} from "../jarvis-audit-result-status-model";
import {
  buildJarvisAuditResultStatusStableKey,
} from "../jarvis-audit-result-status-model";
import {
  buildJarvisAuditResultStatusRouteModel,
} from "../jarvis-audit-result-status-dashboard";
import {
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_EXAMPLES,
} from "../jarvis-audit-result-status-ledger";
import {
  JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_MARKERS,
  JARVIS_AUDIT_RESULT_STATUS_DENIED_ITEMS,
  JARVIS_AUDIT_RESULT_STATUS_EVENT_MARKERS,
  JARVIS_AUDIT_RESULT_STATUS_EXECUTION_BLOCKS,
  JARVIS_AUDIT_RESULT_STATUS_LEDGER_MARKERS,
  JARVIS_AUDIT_RESULT_STATUS_SHARED_MARKERS,
  JARVIS_AUDIT_RESULT_STATUS_STORAGE_BOUNDARIES,
} from "../jarvis-audit-result-status-safety";

export function JarvisAuditResultStatusPageClientShell({
  routeSlug,
}: {
  routeSlug: JarvisAuditResultStatusRouteSlug;
}) {
  const model = buildJarvisAuditResultStatusRouteModel(routeSlug);

  return (
    <CodexForgeAppShell
      activePath={model.route.href}
      workspaceLabel={model.route.title}
      nextActionContext={{ wantsOperatorOverview: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      {JarvisAuditResultStatusRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function JarvisAuditResultStatusRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: JarvisAuditResultStatusRouteSlug;
  embedded?: boolean;
}) {
  const model = buildJarvisAuditResultStatusRouteModel(routeSlug);
  const safetyGuardrails = [
    ...JARVIS_AUDIT_RESULT_STATUS_EXECUTION_BLOCKS,
    ...JARVIS_AUDIT_RESULT_STATUS_STORAGE_BOUNDARIES,
  ];
  const routeMetadata = [
    ...model.route.markerPhrases,
    ...JARVIS_AUDIT_RESULT_STATUS_DENIED_ITEMS,
  ];

  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-audit-result-status={JARVIS_AUDIT_RESULT_STATUS_SHARED_MARKERS.join(
        " | "
      )}
      data-codexforge-jarvis-audit-result-status-route={model.route.markerPhrases.join(
        " | "
      )}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {embedded
                ? "Jarvis Audit Result Ledger and Status Dashboard"
                : model.route.phase}
            </span>
            <span className={styles.safeBadge}>
              Jarvis audit result ledger and status dashboard only
            </span>
            <span className={styles.blockedBadge}>disabled by default</span>
          </div>
          <h1 className={styles.heroTitle}>
            {embedded
              ? "Jarvis Audit Result Ledger and Status Dashboard"
              : model.route.title}
          </h1>
          <p className={styles.heroLead}>
            Jarvis is the operating system / top-level control plane. The task
            planner creates reviewed plans. The permission engine creates
            permission and approval posture. The shared backend adapter contract
            defines future backend-only adapters. This audit ledger foundation,
            result ledger foundation, and status dashboard foundation sit above
            those layers to keep one Jarvis cockpit with shared evidence,
            audit event review only, approval event review only, permission
            event review only, planner event review only, router event review
            only, blocked action event review only, dry-run record review only,
            approval record review only, blocked record review only, artifact
            placeholder review only, capability status review only, workspace
            status review only, adapter status review only, permission status
            review only, approval status review only, dry-run status review
            only, risk status review only, trading status review only,
            provider status review only, website avatar status review only,
            workflow status review only, memory boundary status review only,
            kill switch status review only, lock manager status review only,
            idempotency status review only, replay block status review only,
            and operator review status required without enabling any live
            execution path.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Mode"
              value="Review only"
              detail="audit ledger foundation"
            />
            <MetricCard
              label="Ledger"
              value="Shared"
              detail="result ledger foundation"
            />
            <MetricCard
              label="Dashboard"
              value="Static"
              detail="status dashboard foundation"
            />
            <MetricCard
              label="Kill switch"
              value="Hard"
              detail="hard kill switch"
            />
          </div>
        </div>
        <div
          className={styles.missionPreview}
          aria-label="Jarvis audit result status preview"
        >
          <p className={styles.missionLabel}>
            3690-3721 - Jarvis Audit Result Ledger and Status Dashboard
          </p>
          <p className={styles.missionDetail}>
            Disabled by default. Approval-required. Backend-only.
            Execution-blocked. No direct frontend execution. Next likely batch:
            3722-3753 - Jarvis Unified Workspace Shells.
          </p>
        </div>
      </header>

      <section
        className={styles.markerBand}
        aria-label="Jarvis audit result status safety markers"
      >
        {JARVIS_AUDIT_RESULT_STATUS_SHARED_MARKERS.map((marker, index) => (
          <span
            key={buildJarvisAuditResultStatusStableKey([
              "shared-marker",
              String(index),
              marker,
            ])}
            className={styles.markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis review examples">
        <PanelHeading
          eyebrow="Evidence map"
          title="Static dashboard and audit examples stay typed and backend-safe"
          badge="No execution"
        />
        <div className={styles.diagnosticGrid}>
          {model.examples.map((example) => (
            <SnapshotReviewCard
              key={buildJarvisAuditResultStatusStableKey([
                "example",
                example.capabilityId,
                example.auditEventId,
              ])}
              snapshot={example}
            />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis event and ledger postures">
        <PanelHeading
          eyebrow="Review posture"
          title="Shared event, ledger, and dashboard postures stay explicit"
          badge="Approval gated"
        />
        <div className={styles.contractGrid}>
          {[...JARVIS_AUDIT_RESULT_STATUS_EVENT_MARKERS, ...JARVIS_AUDIT_RESULT_STATUS_LEDGER_MARKERS].map(
            (item, index) => (
              <span
                key={buildJarvisAuditResultStatusStableKey([
                  "review-posture",
                  String(index),
                  item,
                ])}
                className={styles.contractChip}
              >
                {item}
              </span>
            )
          )}
        </div>
        <p className={styles.bodyText}>
          The audit/result/status layer explains what Jarvis planned, what it
          selected, what permission and approval posture was required, what was
          blocked, what dry-run/result state exists, and what status the
          operator should see. It remains static audit/status/result model and
          review UI only.
        </p>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis status categories">
        <PanelHeading
          eyebrow="Status categories"
          title="Capability, workspace, adapter, risk, memory, lock, replay, and operator status stay shared"
          badge="Shared evidence"
        />
        <div className={styles.contractGrid}>
          {JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_MARKERS.map((item, index) => (
            <span
              key={buildJarvisAuditResultStatusStableKey([
                "status-marker",
                String(index),
                item,
              ])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis execution guardrails">
        <PanelHeading
          eyebrow="Execution guardrails"
          title="Status review never enables providers, tools, runtime work, or storage mutation"
          badge="Hard blocked"
        />
        <div className={styles.contractGrid}>
          {safetyGuardrails.map((item, index) => (
            <span
              key={buildJarvisAuditResultStatusStableKey([
                "guardrail",
                String(index),
                item,
              ])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
        <p className={styles.bodyText}>
          No direct frontend execution, no live provider call, no provider
          execution, no tool execution, no network execution, no render
          execution, no export execution, no publish execution, no worker
          dispatch, no file export, no download generation, no archive
          creation, no signed URL creation, no platform upload, no media
          upload, no OAuth flow creation, no webhook creation, no schedule
          execution, no account authorization execution, no API route
          execution, no service creation, no runtime deploy, no file writes
          from the app, no shell/process/command execution from the app, no
          fetch/network calls, no provider SDK imports in frontend, no frontend
          provider key reads, no plaintext secrets, no localStorage, no
          sessionStorage, no IndexedDB, no cookies, and no browser storage for
          secrets.
        </p>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis route metadata">
        <PanelHeading
          eyebrow="Technical metadata"
          title={model.route.title}
          badge={model.route.phase}
        />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {routeMetadata.map((item, index) => (
            <span
              key={buildJarvisAuditResultStatusStableKey([
                "route-marker",
                model.route.slug,
                String(index),
                item,
              ])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.diagnosticPanel} aria-label="Jarvis audit result status diagnostics">
        <PanelHeading
          eyebrow="Diagnostics"
          title="3690-3721 Jarvis audit result ledger and status dashboard coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((item) => (
            <a
              key={buildJarvisAuditResultStatusStableKey(["route", item.slug])}
              className={styles.diagnosticLink}
              href={item.href}
            >
              <span>{item.phase}</span>
              <strong>{item.title}</strong>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
      <span className={styles.metricDetail}>{detail}</span>
    </article>
  );
}

function SnapshotReviewCard({
  snapshot,
}: {
  snapshot: JarvisAuditResultStatusReviewSnapshot;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{snapshot.workspaceLabel}</span>
      <strong className={styles.metricValue}>{snapshot.capabilityId}</strong>
      <span className={styles.metricDetail}>{snapshot.auditEventType}</span>
      <span className={styles.metricDetail}>{snapshot.permissionStatus}</span>
      <span className={styles.metricDetail}>{snapshot.dryRunStatus}</span>
      <span className={styles.metricDetail}>{snapshot.resultLedgerStatus}</span>
      <span className={styles.metricDetail}>{snapshot.operatorReviewStatus}</span>
    </article>
  );
}

function PanelHeading({
  eyebrow,
  title,
  badge,
}: {
  eyebrow: string;
  title: string;
  badge: string;
}) {
  return (
    <div className={styles.panelHeader}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <span className={styles.contractChip}>{badge}</span>
    </div>
  );
}
