'use client';

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import {
  buildJarvisPermissionApprovalEngineDecisionCatalog,
  describeJarvisPermissionApprovalEngineDecisionStatus,
} from "../jarvis-permission-approval-engine-decisions";
import type {
  JarvisPermissionApprovalEngineDecisionRecord,
  JarvisPermissionApprovalEnginePolicyRecord,
  JarvisPermissionApprovalEngineRouteSlug,
} from "../jarvis-permission-approval-engine-model";
import {
  buildJarvisPermissionApprovalEngineRouteModel,
  buildJarvisPermissionApprovalEngineStableKey,
} from "../jarvis-permission-approval-engine-model";
import {
  JARVIS_PERMISSION_APPROVAL_ENGINE_POLICIES,
  JARVIS_PERMISSION_APPROVAL_ENGINE_POLICY_SUMMARY,
} from "../jarvis-permission-approval-engine-policies";
import {
  JARVIS_PERMISSION_APPROVAL_ENGINE_DENIED_ITEMS,
  JARVIS_PERMISSION_APPROVAL_ENGINE_EXECUTION_BLOCKS,
  JARVIS_PERMISSION_APPROVAL_ENGINE_HOOK_MARKERS,
  JARVIS_PERMISSION_APPROVAL_ENGINE_POLICY_REQUIREMENTS,
  JARVIS_PERMISSION_APPROVAL_ENGINE_RISK_MARKERS,
  JARVIS_PERMISSION_APPROVAL_ENGINE_SHARED_MARKERS,
  JARVIS_PERMISSION_APPROVAL_ENGINE_STORAGE_BOUNDARIES,
} from "../jarvis-permission-approval-engine-safety";

export function JarvisPermissionApprovalEnginePageClientShell({
  routeSlug,
}: {
  routeSlug: JarvisPermissionApprovalEngineRouteSlug;
}) {
  const model = buildJarvisPermissionApprovalEngineRouteModel(routeSlug);

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
      {JarvisPermissionApprovalEngineRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function JarvisPermissionApprovalEngineRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: JarvisPermissionApprovalEngineRouteSlug;
  embedded?: boolean;
}) {
  const model = buildJarvisPermissionApprovalEngineRouteModel(routeSlug);
  const decisionCatalog = buildJarvisPermissionApprovalEngineDecisionCatalog();
  const reviewMarkers = [
    ...JARVIS_PERMISSION_APPROVAL_ENGINE_POLICY_REQUIREMENTS,
    ...JARVIS_PERMISSION_APPROVAL_ENGINE_RISK_MARKERS,
    ...JARVIS_PERMISSION_APPROVAL_ENGINE_HOOK_MARKERS,
  ];
  const safetyGuardrails = [
    ...JARVIS_PERMISSION_APPROVAL_ENGINE_EXECUTION_BLOCKS,
    ...JARVIS_PERMISSION_APPROVAL_ENGINE_STORAGE_BOUNDARIES,
  ];
  const routeMetadata = [...model.route.markerPhrases, ...JARVIS_PERMISSION_APPROVAL_ENGINE_DENIED_ITEMS];

  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-permission-approval-engine={JARVIS_PERMISSION_APPROVAL_ENGINE_SHARED_MARKERS.join(
        " | "
      )}
      data-codexforge-jarvis-permission-approval-engine-route={model.route.markerPhrases.join(
        " | "
      )}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {embedded
                ? "Jarvis Permission and Approval Engine"
                : model.route.phase}
            </span>
            <span className={styles.safeBadge}>
              Jarvis permission and approval engine only
            </span>
            <span className={styles.blockedBadge}>disabled by default</span>
          </div>
          <h1 className={styles.heroTitle}>
            {embedded
              ? "Jarvis Permission and Approval Engine"
              : model.route.title}
          </h1>
          <p className={styles.heroLead}>
            Jarvis Permission and Approval Engine is a centralized permission
            decision model that sits above the shared backend adapter contract.
            One Jarvis brain with shared permissions keeps permission engine
            foundation, approval engine foundation, review-only policy records,
            approval packet readiness only, backend-only posture, execution
            blocked posture, hard kill switch, and operator review required
            before any execution all in one place. It produces allowed for
            review only, dry-run only decision, approval required decision,
            blocked decision, kill-switch blocked decision, unsupported
            decision, and human operator review required without executing
            providers, adapters, network calls, render flows, publish flows,
            worker dispatch, trading, website creation, or avatar generation.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Mode"
              value="Review only"
              detail="centralized permission decision model"
            />
            <MetricCard
              label="Approval"
              value="Required"
              detail="human approval gate required"
            />
            <MetricCard
              label="Dry run"
              value="First"
              detail="dry-run required before execution"
            />
            <MetricCard
              label="Kill switch"
              value="Hard"
              detail="kill switch hook required"
            />
          </div>
        </div>
        <div
          className={styles.missionPreview}
          aria-label="Jarvis permission and approval engine preview"
        >
          <p className={styles.missionLabel}>
            3626-3657 - Jarvis Permission and Approval Engine
          </p>
          <p className={styles.missionDetail}>
            Jarvis permission and approval engine only. Disabled by default.
            Backend-only. Execution-blocked. Next likely batch: 3658-3689 -
            Jarvis Task Planner and Tool Router.
          </p>
        </div>
      </header>

      <section
        className={styles.markerBand}
        aria-label="Jarvis permission and approval engine safety markers"
      >
        {JARVIS_PERMISSION_APPROVAL_ENGINE_SHARED_MARKERS.map((marker, index) => (
          <span
            key={buildJarvisPermissionApprovalEngineStableKey([
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

      <section
        className={styles.glassPanel}
        aria-label="Jarvis permission policy model"
      >
        <PanelHeading
          eyebrow="Policy model"
          title="Reusable manifest-driven policies define review-only readiness"
          badge="Foundation"
        />
        <p className={styles.bodyText}>
          Capability permission policy required, adapter permission policy
          required, workspace permission policy required, operator role review
          only, human approval gate required, dry-run required before
          execution, approval mode required, deny reason required, blocked
          action category required, approval packet readiness only, cost limit
          posture required, rate limit posture required, timeout posture
          required, data sensitivity posture required, and secret boundary
          posture required now live in one reusable map instead of isolated
          feature logic.
        </p>
        <div className={styles.contractGrid}>
          {JARVIS_PERMISSION_APPROVAL_ENGINE_POLICY_SUMMARY.map((item, index) => (
            <span
              key={buildJarvisPermissionApprovalEngineStableKey([
                "policy-summary",
                String(index),
                item,
              ])}
              className={styles.contractChip}
            >
              {item}
            </span>
          ))}
        </div>
        <div className={styles.diagnosticGrid}>
          {JARVIS_PERMISSION_APPROVAL_ENGINE_POLICIES.map((policy) => (
            <PolicyCard
              key={buildJarvisPermissionApprovalEngineStableKey([
                "policy",
                policy.capabilityId,
              ])}
              policy={policy}
            />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis permission decision outcomes"
      >
        <PanelHeading
          eyebrow="Decision layer"
          title="The frontend can review decisions without executing anything"
          badge="Side effect free"
        />
        <div className={styles.diagnosticGrid}>
          {decisionCatalog.map((decision) => (
            <DecisionCard
              key={buildJarvisPermissionApprovalEngineStableKey([
                "decision",
                decision.capabilityId,
                decision.status,
              ])}
              decision={decision}
            />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis approval posture and risk posture"
      >
        <PanelHeading
          eyebrow="Approval posture"
          title="Risk tiers, hook readiness, and human review stay centralized"
          badge="Approval gated"
        />
        <div className={styles.contractGrid}>
          {reviewMarkers.map((item, index) => (
            <span
              key={buildJarvisPermissionApprovalEngineStableKey([
                "review-marker",
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
          Trading risk remains critical. Provider risk remains approval-gated.
          Website creation risk remains approval-gated. Avatar risk remains
          approval-gated. Workflow risk remains approval-gated. Audit hook
          readiness only, result ledger hook readiness only, memory boundary
          hook readiness only, kill switch hook required, replay block hook
          required, and operator review required before any execution stay
          visible without unlocking adapters, provider calls, or runtime work.
        </p>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis permission approval execution guardrails"
      >
        <PanelHeading
          eyebrow="Execution guardrails"
          title="Permission and approval engine completion still blocks every live action"
          badge="Hard blocked"
        />
        <div className={styles.contractGrid}>
          {safetyGuardrails.map((item, index) => (
            <span
              key={buildJarvisPermissionApprovalEngineStableKey([
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
        <p className={styles.mutedText}>
          No direct frontend execution, no live provider call, no provider
          execution, no video provider execution, no image provider execution,
          no audio provider execution, no website creation execution, no avatar
          generation execution, no chatbot autonomous execution, no trading
          execution, no paper trading execution, no real-money trading
          execution, no network execution, no render execution, no export
          execution, no publish execution, no worker dispatch, no file export,
          no download generation, no archive creation, no signed URL creation,
          no platform upload, no media upload, no OAuth flow creation, no
          webhook creation, no schedule execution, no account authorization
          execution, no API route execution, no service creation, no runtime
          deploy, no file writes from the app, no shell/process/command
          execution from the app, no fetch/network calls, no provider SDK
          imports in frontend, no frontend provider key reads, no plaintext
          secrets, no localStorage, no sessionStorage, no IndexedDB, no
          cookies, and no browser storage for secrets.
        </p>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis permission approval route metadata"
      >
        <PanelHeading
          eyebrow="Technical metadata"
          title={model.route.title}
          badge={model.route.phase}
        />
        <p className={styles.bodyText}>{model.route.summary}</p>
        <div className={styles.contractGrid}>
          {routeMetadata.map((item, index) => (
            <span
              key={buildJarvisPermissionApprovalEngineStableKey([
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

      <section
        className={styles.diagnosticPanel}
        aria-label="Jarvis permission approval diagnostics"
      >
        <PanelHeading
          eyebrow="Diagnostics"
          title="3626-3657 Jarvis permission and approval engine coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((item) => (
            <a
              key={buildJarvisPermissionApprovalEngineStableKey([
                "route",
                item.slug,
              ])}
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

function PolicyCard({
  policy,
}: {
  policy: JarvisPermissionApprovalEnginePolicyRecord;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{policy.featureDomain}</span>
      <strong className={styles.metricValue}>{policy.capabilityId}</strong>
      <span className={styles.metricDetail}>
        {describeJarvisPermissionApprovalEngineDecisionStatus(
          policy.permissionPosture
        )}
      </span>
      <span className={styles.metricDetail}>{policy.riskTier}</span>
      <span className={styles.metricDetail}>{policy.approvalPacketReadiness}</span>
    </article>
  );
}

function DecisionCard({
  decision,
}: {
  decision: JarvisPermissionApprovalEngineDecisionRecord;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{decision.requestedAction}</span>
      <strong className={styles.metricValue}>{decision.capabilityId}</strong>
      <span className={styles.metricDetail}>{decision.summary}</span>
      <span className={styles.metricDetail}>{decision.approvalPacketReadiness}</span>
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
