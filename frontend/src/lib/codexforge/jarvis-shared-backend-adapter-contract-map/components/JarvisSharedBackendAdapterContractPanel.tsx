'use client';

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import styles from "../../jarvis-cockpit-visual-system/components/JarvisCockpitVisualPanel.module.css";
import type { JarvisSharedBackendAdapterContractManifestRecord } from "../jarvis-shared-backend-adapter-contract-manifest";
import {
  buildJarvisSharedBackendAdapterContractModel,
  buildJarvisSharedBackendAdapterContractStableKey,
  type JarvisSharedBackendAdapterContractRouteSlug,
} from "../jarvis-shared-backend-adapter-contract-model";

export function JarvisSharedBackendAdapterContractPageClientShell({
  routeSlug,
}: {
  routeSlug: JarvisSharedBackendAdapterContractRouteSlug;
}) {
  const model = buildJarvisSharedBackendAdapterContractModel(routeSlug);

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
      {JarvisSharedBackendAdapterContractRoutePanel({ routeSlug })}
    </CodexForgeAppShell>
  );
}

export function JarvisSharedBackendAdapterContractRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: JarvisSharedBackendAdapterContractRouteSlug;
  embedded?: boolean;
}) {
  const model = buildJarvisSharedBackendAdapterContractModel(routeSlug);
  const contractPosture = [...model.requiredFields, ...model.hookPostures];
  const safetyGuardrails = [
    ...model.executionBlocks,
    ...model.storageBoundaries,
  ];
  const routeMetadata = [...model.route.markerPhrases, ...model.deniedItems];

  return (
    <section
      className={embedded ? styles.cockpitShell : styles.routeShell}
      data-codexforge-jarvis-shared-backend-adapter-contract={model.sharedMarkers.join(
        " | "
      )}
      data-codexforge-jarvis-shared-backend-adapter-contract-route={model.route.markerPhrases.join(
        " | "
      )}
    >
      <header className={styles.heroPanel}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.eyebrowRow}>
            <span className={styles.phaseBadge}>
              {embedded
                ? "Jarvis Shared Backend Adapter Contract"
                : model.route.phase}
            </span>
            <span className={styles.safeBadge}>
              Jarvis shared backend adapter contract only
            </span>
            <span className={styles.blockedBadge}>disabled by default</span>
          </div>
          <h1 className={styles.heroTitle}>
            {embedded
              ? "Jarvis Shared Backend Adapter Contract"
              : model.route.title}
          </h1>
          <p className={styles.heroLead}>
            Jarvis Shared Backend Adapter Contract keeps one Jarvis brain with
            specialist workspaces and Jarvis operating system with feature
            workspaces. It stays shared adapter contract foundation,
            manifest-driven adapter registry, approval-required, backend-only,
            and execution-blocked. Video workspace plugs into shared adapter
            contract, website workspace plugs into shared adapter contract,
            avatar workspace plugs into shared adapter contract, chatbot brain
            plugs into shared adapter contract, trading workspace plugs into
            shared adapter contract, workflow workspace plugs into shared
            adapter contract, and render export publish plugs into shared
            adapter contract. Operator review remains required before adapter
            execution and shared backend adapter contract completion does not
            enable provider/render/export/publish/workers/trading/automation.
          </p>
          <div className={styles.heroMetricGrid}>
            <MetricCard
              label="Mode"
              value="Adapter contract"
              detail="manifest-driven adapter registry"
            />
            <MetricCard
              label="Approval"
              value="Required"
              detail="operator review required before adapter execution"
            />
            <MetricCard
              label="Backend"
              value="Only"
              detail="backend-only mode required"
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
          aria-label="Jarvis shared backend adapter contract preview"
        >
          <p className={styles.missionLabel}>
            3594-3625 - Jarvis Shared Backend Adapter Contract
          </p>
          <p className={styles.missionDetail}>
            Jarvis shared backend adapter contract only. Disabled by default.
            Backend-only. Execution-blocked. Next likely batch: 3626-3657 -
            Jarvis Permission and Approval Engine.
          </p>
        </div>
      </header>

      <section
        className={styles.markerBand}
        aria-label="Jarvis shared backend adapter contract safety markers"
      >
        {model.sharedMarkers.map((marker, index) => (
          <span
            key={buildJarvisSharedBackendAdapterContractStableKey([
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
        aria-label="Manifest driven adapter registry"
      >
        <PanelHeading
          eyebrow="Manifest registry"
          title="One Jarvis brain with specialist workspaces"
          badge="Review only"
        />
        <p className={styles.bodyText}>
          The shared manifest defines frontend-safe review-only capability
          adapter records for video.generate, website.create, avatar.prepare,
          chatbot.plan, trading.paperReview, workflow.prepare, and
          render.publishReview. Every specialist workspace plugs into the same
          approval, audit, result ledger, memory boundary, lock, replay,
          idempotency, and kill switch contract instead of creating isolated
          readiness islands.
        </p>
        <div className={styles.contractGrid}>
          {model.manifestDomains.map((item, index) => (
            <span
              key={buildJarvisSharedBackendAdapterContractStableKey([
                "manifest-domain",
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
          {model.manifest.map((record) => (
            <ManifestCard
              key={buildJarvisSharedBackendAdapterContractStableKey([
                "manifest",
                record.capabilityId,
              ])}
              record={record}
            />
          ))}
        </div>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Contract requirements and hooks"
      >
        <PanelHeading
          eyebrow="Contract posture"
          title="Required fields, blocked execution, and shared hooks stay explicit"
          badge="Approval required"
        />
        <div className={styles.contractGrid}>
          {contractPosture.map((item, index) => (
            <span
              key={buildJarvisSharedBackendAdapterContractStableKey([
                "contract-posture",
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
          Capability id required, feature domain required, risk tier required,
          permission posture required, approval mode required, dry-run mode
          required, backend-only mode required, input envelope review only,
          output envelope review only, error envelope review only, credential
          reference policy only, token reference policy only, and execution
          policy remains blocked all stay shared contract requirements. Audit
          hook readiness only, observability hook readiness only, result ledger
          hook readiness only, memory boundary hook readiness only, kill switch
          hook required, lock manager hook required, idempotency hook required,
          replay block hook required, and operator review required before
          adapter execution stay mandatory across every adapter record.
        </p>
      </section>

      <section
        className={styles.glassPanel}
        aria-label="Jarvis adapter contract execution guardrails"
      >
        <PanelHeading
          eyebrow="Execution guardrails"
          title="Shared backend adapter contract completion does not enable execution"
          badge="Hard blocked"
        />
        <div className={styles.contractGrid}>
          {safetyGuardrails.map((item, index) => (
            <span
              key={buildJarvisSharedBackendAdapterContractStableKey([
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
        aria-label="Jarvis shared backend adapter contract route metadata"
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
              key={buildJarvisSharedBackendAdapterContractStableKey([
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
        aria-label="Jarvis shared backend adapter contract diagnostics"
      >
        <PanelHeading
          eyebrow="Diagnostics"
          title="3594-3625 Jarvis shared backend adapter contract coverage"
          badge="Phase pages secondary"
        />
        <div className={styles.diagnosticGrid}>
          {model.routes.map((item) => (
            <a
              key={buildJarvisSharedBackendAdapterContractStableKey([
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

function ManifestCard({
  record,
}: {
  record: JarvisSharedBackendAdapterContractManifestRecord;
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{record.workspaceLabel}</span>
      <strong className={styles.metricValue}>{record.capabilityId}</strong>
      <span className={styles.metricDetail}>{record.adapterId}</span>
      <div className={styles.contractGrid}>
        <span className={styles.markerPill}>{record.featureDomain}</span>
        <span className={styles.markerPill}>{record.riskTier}</span>
        <span className={styles.markerPill}>{record.permissionPosture}</span>
        <span className={styles.markerPill}>{record.approvalMode}</span>
        <span className={styles.markerPill}>{record.dryRunMode}</span>
        <span className={styles.markerPill}>{record.backendOnlyMode}</span>
      </div>
      <p className={styles.mutedText}>
        {record.workspacePlugStatement}. {record.inputEnvelopeName},{" "}
        {record.outputEnvelopeName}, and {record.errorEnvelopeName} stay review
        only. {record.credentialReferencePosture}, {record.tokenReferencePosture}
        , {record.executionPosture}, {record.auditHookPosture},{" "}
        {record.observabilityHookPosture}, {record.resultLedgerHookPosture},{" "}
        {record.memoryBoundaryPosture}, {record.killSwitchPosture},{" "}
        {record.lockManagerPosture}, {record.idempotencyPosture},{" "}
        {record.replayBlockPosture}, and {record.operatorReviewPosture}.
      </p>
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
      <span className={styles.markerPill}>{badge}</span>
    </div>
  );
}
