'use client';

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import type {
  JarvisTaskPlannerToolRouterPlanRecord,
  JarvisTaskPlannerToolRouterRouteSlug,
} from "../jarvis-task-planner-tool-router-model";
import {
  buildJarvisTaskPlannerToolRouterStableKey,
} from "../jarvis-task-planner-tool-router-model";
import {
  buildJarvisTaskPlannerToolRouterRouteModel,
} from "../jarvis-task-planner-tool-router-routes";
import {
  JARVIS_TASK_PLANNER_TOOL_ROUTER_DENIED_ITEMS,
  JARVIS_TASK_PLANNER_TOOL_ROUTER_EXECUTION_BLOCKS,
  JARVIS_TASK_PLANNER_TOOL_ROUTER_REVIEW_MARKERS,
  JARVIS_TASK_PLANNER_TOOL_ROUTER_SHARED_MARKERS,
  JARVIS_TASK_PLANNER_TOOL_ROUTER_STORAGE_BOUNDARIES,
} from "../jarvis-task-planner-tool-router-safety";

export function JarvisTaskPlannerToolRouterPageClientShell({
  routeSlug,
}: {
  routeSlug: JarvisTaskPlannerToolRouterRouteSlug;
}) {
  const model = buildJarvisTaskPlannerToolRouterRouteModel(routeSlug);

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
      {JarvisTaskPlannerToolRouterRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function JarvisTaskPlannerToolRouterRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: JarvisTaskPlannerToolRouterRouteSlug;
  embedded?: boolean;
}) {
  const model = buildJarvisTaskPlannerToolRouterRouteModel(routeSlug);
  const safetyGuardrails = [
    ...JARVIS_TASK_PLANNER_TOOL_ROUTER_EXECUTION_BLOCKS,
    ...JARVIS_TASK_PLANNER_TOOL_ROUTER_STORAGE_BOUNDARIES,
  ];
  const routeMetadata = [
    ...model.route.markerPhrases,
    ...JARVIS_TASK_PLANNER_TOOL_ROUTER_DENIED_ITEMS,
  ];

  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-task-planner-tool-router={JARVIS_TASK_PLANNER_TOOL_ROUTER_SHARED_MARKERS.join(
        " | "
      )}
      data-codexforge-jarvis-task-planner-tool-router-route={model.route.markerPhrases.join(
        " | "
      )}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {embedded ? "Jarvis Task Planner and Tool Router" : model.route.phase}
            </span>
            <span className={styles.safeBadge}>
              Jarvis task planner and tool router only
            </span>
            <span className={styles.blockedBadge}>disabled by default</span>
          </div>
          <h1 className={styles.heroTitle}>
            {embedded ? "Jarvis Task Planner and Tool Router" : model.route.title}
          </h1>
          <p className={styles.heroLead}>
            Jarvis is the operating system / top-level control plane. The task
            planner sits above the permission and approval engine. The tool
            router sits above the shared backend adapter contract. Feature
            workspaces plug into the shared backend adapter contract while one
            Jarvis brain with shared task planning and one Jarvis brain with
            shared tool routing stay review only. This surface keeps user goal
            review only, request envelope review only, plan graph review only,
            plan step review only, capability selection review only, risk check
            required, permission check required, approval check required,
            dry-run routing required, backend-only route required, approval
            packet request readiness only, audit preview only, result ledger
            preview only, memory boundary preview only, kill switch check
            required, lock manager check required, idempotency check required,
            replay block check required, and human review required before any
            execution without enabling adapters, providers, tools, runtime work,
            or storage mutation.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Mode"
              value="Review only"
              detail="task planner foundation"
            />
            <MetricCard
              label="Routing"
              value="Backend only"
              detail="tool router foundation"
            />
            <MetricCard
              label="Dry run"
              value="Required"
              detail="dry-run routing required"
            />
            <MetricCard
              label="Kill switch"
              value="Hard"
              detail="kill switch check required"
            />
          </div>
        </div>
        <div
          className={styles.missionPreview}
          aria-label="Jarvis task planner and tool router preview"
        >
          <p className={styles.missionLabel}>
            3658-3689 - Jarvis Task Planner and Tool Router
          </p>
          <p className={styles.missionDetail}>
            Jarvis task planner and tool router only. Disabled by default.
            Approval-required. Backend-only. Execution-blocked. Next likely
            batch: 3690-3721 - Jarvis Audit Result Ledger and Status Dashboard.
          </p>
        </div>
      </header>

      <section
        className={styles.markerBand}
        aria-label="Jarvis task planner and tool router safety markers"
      >
        {JARVIS_TASK_PLANNER_TOOL_ROUTER_SHARED_MARKERS.map((marker, index) => (
          <span
            key={buildJarvisTaskPlannerToolRouterStableKey([
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

      <section className={styles.glassPanel} aria-label="Jarvis planner routes">
        <PanelHeading
          eyebrow="Planner catalog"
          title="Reusable route candidates stay manifest-driven and review only"
          badge="No execution"
        />
        <div className={styles.diagnosticGrid}>
          {model.examples.map((plan) => (
            <PlanReviewCard
              key={buildJarvisTaskPlannerToolRouterStableKey([
                "plan",
                plan.capabilityId,
                plan.plannedRouteTarget,
              ])}
              plan={plan}
            />
          ))}
        </div>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis review requirements">
        <PanelHeading
          eyebrow="Review posture"
          title="Planner checks, route previews, and operator gates stay explicit"
          badge="Approval gated"
        />
        <div className={styles.contractGrid}>
          {JARVIS_TASK_PLANNER_TOOL_ROUTER_REVIEW_MARKERS.map((item, index) => (
            <span
              key={buildJarvisTaskPlannerToolRouterStableKey([
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
          Jarvis plans and routes; backend-owned adapters execute only after
          future explicit approval. Review-only planners can inspect user goal
          review only, request envelope review only, plan graph review only,
          plan step review only, capability selection review only, tool router
          contract review only, backend adapter routing review only, and
          blocked action summary only without enabling any live capability.
        </p>
      </section>

      <section className={styles.glassPanel} aria-label="Jarvis execution guardrails">
        <PanelHeading
          eyebrow="Execution guardrails"
          title="Task planner and tool router completion still blocks every live action"
          badge="Hard blocked"
        />
        <div className={styles.contractGrid}>
          {safetyGuardrails.map((item, index) => (
            <span
              key={buildJarvisTaskPlannerToolRouterStableKey([
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
          No direct frontend execution, no frontend execution of backend
          adapters, no live provider call, no provider execution, no live
          provider execution, no tool execution, no autonomous tool execution,
          no network execution, no render execution, no export execution, no
          publish execution, no worker dispatch, no file export, no download
          generation, no archive creation, no signed URL creation, no OAuth
          flow creation, no webhook creation, no API route execution, no
          service creation, no runtime deploy, no file writes from the app, no
          shell/process/command execution from the app, no fetch/network calls,
          no provider SDK imports in frontend, no frontend provider key reads,
          no plaintext secrets, no localStorage, no sessionStorage, no
          IndexedDB, no cookies, and no browser storage for secrets.
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
              key={buildJarvisTaskPlannerToolRouterStableKey([
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

      <section className={styles.diagnosticPanel} aria-label="Jarvis task planner diagnostics">
        <PanelHeading
          eyebrow="Diagnostics"
          title="3658-3689 Jarvis task planner and tool router coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((item) => (
            <a
              key={buildJarvisTaskPlannerToolRouterStableKey(["route", item.slug])}
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

function PlanReviewCard({
  plan,
}: {
  plan: JarvisTaskPlannerToolRouterPlanRecord;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{plan.workspaceLabel}</span>
      <strong className={styles.metricValue}>{plan.capabilityId}</strong>
      <span className={styles.metricDetail}>{plan.permissionDecisionStatus}</span>
      <span className={styles.metricDetail}>{plan.approvalDecisionStatus}</span>
      <span className={styles.metricDetail}>{plan.plannedRouteTarget}</span>
      <span className={styles.metricDetail}>{plan.approvalPacketReadiness}</span>
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
