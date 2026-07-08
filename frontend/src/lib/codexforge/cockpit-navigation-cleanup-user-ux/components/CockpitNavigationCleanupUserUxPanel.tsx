"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { BrokerExecutionBoundaryCockpitSummaryPanel } from "../../broker-execution-boundary/components";
import { PaperBrokerAdapterSimulatorCockpitSummaryPanel } from "../../paper-broker-adapter-simulator/components";
import { PaperTradingResultLedgerCockpitSummaryPanel } from "../../paper-trading-result-ledger/components";
import { PaperTradingReviewDashboardCockpitSummaryPanel } from "../../paper-trading-review-dashboard/components";
import { StrategyPerformanceReviewLoopCockpitSummaryPanel } from "../../strategy-performance-review-loop/components";
import { StrategyChangeControlWorkflowCockpitSummaryPanel } from "../../strategy-change-control-workflow/components";
import { StrategyVersionReviewRegistryCockpitSummaryPanel } from "../../strategy-version-review-registry/components";
import { PaperStrategyPromotionGateCockpitSummaryPanel } from "../../paper-strategy-promotion-gate/components";
import { PaperTradingEndToEndReviewCockpitSummaryPanel } from "../../paper-trading-end-to-end-review/components";
import { CockpitTradingWorkflowPolishCockpitSummaryPanel } from "../../cockpit-trading-workflow-polish/components";
import { ControlledPaperTradingWorkspaceCockpitSummaryPanel } from "../../controlled-paper-trading-workspace/components";
import { AssetAndShotPlanningWorkspaceCockpitSummaryPanel } from "../../asset-and-shot-planning-workspace/components";
import { VoiceoverAndCaptionPlanningWorkspaceCockpitSummaryPanel } from "../../voiceover-and-caption-planning-workspace/components";
import { RenderJobBoundaryCockpitSummaryPanel } from "../../render-job-boundary/components";
import { VideoReviewAndExportBoundaryCockpitSummaryPanel } from "../../video-review-and-export-boundary/components";
import { ControlledVideoCreationWorkspaceCockpitSummaryPanel } from "../../controlled-video-creation-workspace/components";
import { VideoBackendServiceContractBoundaryCockpitSummaryPanel } from "../../video-backend-service-contract-boundary/components";
import { ProviderGatewayContractBoundaryCockpitSummaryPanel } from "../../provider-gateway-contract-boundary/components";
import { AssetStorageContractBoundaryCockpitSummaryPanel } from "../../asset-storage-contract-boundary/components";
import { AudioStorageContractBoundaryCockpitSummaryPanel } from "../../audio-storage-contract-boundary/components";
import { ScriptAndStoryboardWorkspaceCockpitSummaryPanel } from "../../script-and-storyboard-workspace/components";
import { RenderQueueContractBoundaryCockpitSummaryPanel, WorkerOrchestrationContractBoundaryCockpitSummaryPanel } from "../../render-queue-contract-boundary/components";
import { ArtifactExportContractBoundaryCockpitSummaryPanel, PublishGatewayContractBoundaryCockpitSummaryPanel } from "../../artifact-export-contract-boundary/components";
import { ApprovalCaptureContractBoundaryCockpitSummaryPanel, FoundationContractsCompletionCandidateCockpitSummaryPanel, RightsConsentAuditContractBoundaryCockpitSummaryPanel } from "../../approval-capture-contract-boundary/components";
import { VideoCreationDomainCockpitSummaryPanel } from "../../video-creation-domain/components";
import {
  buildCockpitNavigationCleanupRouteModel,
  buildCockpitNavigationCleanupStableKey,
  type CockpitNavigationCleanupItem,
  type CockpitNavigationCleanupRouteFamily,
  type CockpitNavigationCleanupRouteModel,
  type CockpitNavigationCleanupSection,
  type CockpitNavigationCleanupState,
  type CockpitNavigationCleanupUserUxRouteSlug,
} from "../cockpit-navigation-cleanup-user-ux-model";

type CockpitNavigationCleanupRouteSurfaceCard = Readonly<{
  eyebrow: string;
  title: string;
  summary: string;
  tags: readonly string[];
}>;

type CockpitNavigationCleanupRouteSurface = Readonly<{
  shellLabel: string;
  eyebrow: string;
  badge: string;
  title: string;
  summary: string;
  primaryAction: Readonly<{
    href: string;
    label: string;
    summary: string;
  }>;
  cards: readonly CockpitNavigationCleanupRouteSurfaceCard[];
  statusPills: readonly string[];
  blockedActions: readonly string[];
  safetyNotes: readonly string[];
  diagnosticsSummary: string;
  openDiagnosticsByDefault: boolean;
}>;

export function CockpitNavigationCleanupPageClientShell({
  routeSlug,
}: {
  routeSlug: CockpitNavigationCleanupUserUxRouteSlug;
}) {
  const model = buildCockpitNavigationCleanupRouteModel(routeSlug);
  const surface = buildCockpitNavigationCleanupRouteSurface(model);

  return (
    <CodexForgeAppShell
      activePath={model.route.href}
      workspaceLabel={surface.shellLabel}
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitNavigationCleanupRoutePanel routeSlug={routeSlug} />
    </CodexForgeAppShell>
  );
}

export function CockpitNavigationCleanupUserUxCockpitPanel() {
  const model = buildCockpitNavigationCleanupRouteModel("controlled-consolidated-user-ux-release-candidate");
  const ux = model.cockpitNavigationCleanupUserUx;

  return (
    <section
      style={page}
      data-codexforge-cockpit-navigation-cleanup-user-ux={model.cockpitMarkers.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>Cockpit Navigation Cleanup User UX</span>
          <span style={surfaceBadge}>One user cockpit</span>
          <span style={approvalBadge}>Explicit approval required</span>
        </div>
        <h1 style={title}>CodexForge Cockpit</h1>
        <p style={summary}>
          One normal user UX for starting with a goal, reviewing the Trading Workspace, Build Workspace, Creative
          Workspace, Approvals, Evidence & Audit, Next Action, and Developer Diagnostics. Status summary: through phase
          2025 after Controlled Video Creation Workspace Release Candidate v1, layered below Video Review And Export
          Boundary v1, Render Job Boundary v1, Voiceover And Caption Planning Workspace v1, Asset And Shot Planning
          Workspace v1, Script And Storyboard Workspace v1, and Video Creation Domain Boundary v1. Phase pages remain
          dev test diagnostics only.
        </p>
      </header>

      <section style={statusBand} aria-label="Cockpit status summary">
        {ux.cockpitSummary.map((item, index) => (
          <CheckRow
            key={buildCockpitNavigationCleanupStableKey(["cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </section>

      <section style={featureGrid} aria-label="Primary cockpit sections">
        <FeatureCard section={ux.userCockpitHome} href="/codexforge-cockpit" actionLabel="Start here" />
        <FeatureCard section={ux.tradingWorkspaceHub} href="/trading-workspace-hub-preview" actionLabel="Open Trading Workspace" />
        <FeatureCard section={ux.buildWorkspaceHub} href="/build-workspace-hub-preview" actionLabel="Open Build Workspace" />
        <FeatureCard section={ux.approvalsHub} href="/approvals-hub-preview" actionLabel="Review Approvals" />
        <FeatureCard section={ux.evidenceAuditHub} href="/evidence-audit-hub-preview" actionLabel="Review Evidence & Audit" />
        <FeatureCard section={ux.nextActionRailCleanup} href="/next-action-rail-cleanup-preview" actionLabel="Continue Next Action" />
      </section>

      <section style={splitBand} aria-label="Trading and build workspace grouping">
        <WorkspacePanel
          title="Trading Workspace"
          summary="Trading workspace groups research, mandate, risk governor, strategy lab, signal engine, backtest, paper trading, profit lockbox, reinvestment rules, broker execution boundary previews, paper broker adapter simulator previews, paper trading result ledger previews, paper trading review dashboard previews, strategy performance review loop previews, strategy change control workflow previews, strategy version review registry previews, paper strategy promotion gate previews, paper trading end-to-end review previews, cockpit trading workflow polish previews, and controlled paper trading workspace release candidate previews."
          items={ux.tradingWorkspaceHub.featureLabels}
          href="/trading-workspace-hub-preview"
        />
        <WorkspacePanel
          title="Build Workspace"
          summary="Build workspace groups project builder, game server builder, domain packs, generated plans, artifacts, commands, and evidence."
          items={ux.buildWorkspaceHub.featureLabels}
          href="/build-workspace-hub-preview"
        />
        <WorkspacePanel
          title="Creative Workspace"
          summary="Creative Workspace starts with the Video Creation Domain as a review-only, planning-only lane, keeps Script And Storyboard Workspace, Asset And Shot Planning Workspace, Voiceover And Caption Planning Workspace, Render Job Boundary, and Video Review And Export Boundary intact, keeps Controlled Video Creation Workspace and Provider Gateway Contract grouped as backend contract review content, and now adds Asset Storage Contract, Audio Storage Contract, Render Queue Contract, Worker Orchestration Contract, Artifact Export Contract, Publish Gateway Contract, Approval Capture Contract, Rights Consent Audit Contract, and Foundation Contracts Completion summaries. It shows approval request schema, operator attestation, multi-step approval chain, expiration and revocation, evidence packet, denial ledger, escalation policy, approval audit, frontend approval persistence blocked, rights evidence, consent evidence, likeness consent, music rights, brand/legal review, license policy, consent expiration and revocation, immutable audit ledger, audit redaction and retention, frontend rights consent persistence blocked, unified release gate, foundation contracts completion candidate, and denied paths. No upload controls, download controls, storage controls, approval controls, signature controls, rights clearance controls, consent approval controls, license grant controls, legal approval controls, audit persistence controls, export controls, publish controls, render controls, API controls, service controls, command controls, provider controls, model controls, connector controls, token controls, account authorization controls, voice controls, transcription controls, caption controls, or hidden execution affordances are present."
          items={[
            "Video Creation Domain",
            "Script And Storyboard Workspace",
            "Asset And Shot Planning Workspace",
            "Voiceover And Caption Planning Workspace",
            "Render Job Boundary",
            "Video Review And Export Boundary",
            "Controlled Video Creation Workspace",
            "Video Backend Service Contract Boundary",
            "Provider Gateway Contract",
            "Asset Storage Contract",
            "Asset Intake Schema",
            "Asset Metadata Schema",
            "Asset Rights Tagging Contract",
            "Asset Malware Scan",
            "Asset Deduplication",
            "Asset Access Policy",
            "Asset Retention And Redaction",
            "Asset Handoff And Audit",
            "Frontend Asset Persistence Blocked",
            "Audio Storage Contract",
            "Audio Intake Schema",
            "Audio Metadata Schema",
            "Audio Consent And Rights Tagging",
            "Audio Transcript And Caption Links",
            "Audio Redaction Retention Access",
            "Audio Handoff And Audit",
            "Frontend Audio Persistence Blocked",
            "Render Queue Contract",
            "Worker Orchestration Contract",
            "Artifact Export Contract",
            "Publish Gateway Contract",
            "Approval Capture Contract",
            "Approval Request Schema",
            "Operator Attestation",
            "Multi Step Approval Chain",
            "Approval Expiration And Revocation",
            "Approval Evidence Packet",
            "Approval Denial Ledger",
            "Approval Escalation Policy",
            "Approval Audit Event",
            "Frontend Approval Persistence Blocked",
            "Rights Consent Audit Contract",
            "Rights Evidence Schema",
            "Consent Evidence Schema",
            "Likeness Consent Contract",
            "Music Rights Contract",
            "Brand Legal Review Contract",
            "Usage License Policy",
            "Consent Expiration And Revocation",
            "Immutable Audit Ledger",
            "Audit Redaction And Retention",
            "Frontend Rights Consent Persistence Blocked",
            "Unified Approval Rights Audit Release Gate",
            "Controlled Foundation Contracts Completion Candidate",
            "Video Workspace Release Map",
            "Video Workspace Safe State Overview",
            "Video Script Lane Summary",
            "Video Asset Lane Summary",
            "Video Audio Caption Lane Summary",
            "Video Render Lane Summary",
            "Video Review Export Lane Summary",
            "Video Backend Prerequisite Lane",
            "Video Blocked Action Lane",
            "Video Operator Release Checklist",
            "Video Release Readiness Packet",
            "No Hidden Generation Boundary",
            "Render Prerequisite Checklist",
            "Timeline Readiness Packet",
            "Asset Readiness Gate",
            "Caption Readiness Gate",
            "Audio Readiness Gate",
            "Rights Approval Gate",
            "Render Settings Planning",
            "Render Queue Blocked",
            "Worker Dispatch Blocked",
            "Artifact Persistence Blocked",
            "Render Failure Review",
            "Export Handoff Blocked",
            "Narration Brief",
            "Voice Tone And Pace",
            "Voice Consent And Rights",
            "Audio Cue Planning",
            "Caption Style Guide",
            "Subtitle Timing Plan",
            "Lower Third And Supers Plan",
            "Accessibility Caption Note",
            "Transcript Review Lane",
            "Audio Caption Blocker Map",
            "Voice Generation Blocked Boundary",
            "Caption Export Blocked Boundary",
            "Shot List Planning",
            "Scene Asset Map",
            "B-Roll Requirement",
            "Product Shot Requirement",
            "Visual Reference Board",
            "Music And Audio Asset Note",
            "Brand Asset Checklist",
            "Rights And Source Status",
            "Missing Asset Blocker",
            "Asset Handoff Packet",
            "Asset Upload Blocked Boundary",
            "Asset Download Blocked Boundary",
            "Script Brief",
            "Hook And Opening Beat",
            "Scene Beat Outline",
            "Storyboard Card Grid",
            "Shot Intent Notes",
            "Visual Reference Planning",
            "B-Roll And Asset Notes",
            "Caption And Supers Notes",
            "Review Comments",
            "Brand And Rights Notes",
            "Model Generation Blocked",
            "Storyboard Export Blocked",
            "Workspace Intake",
            "Project Brief",
            "Audience And Goal",
            "Format Boundary",
            "Safety And Rights",
            "Asset Planning",
            "Script Planning",
            "Storyboard Planning",
            "Voiceover Planning",
            "Caption Planning",
            "Render Job Blocked",
            "Export Blocked",
          ]}
          href="/cockpit-controlled-video-creation-workspace-summary"
        />
      </section>

      <BrokerExecutionBoundaryCockpitSummaryPanel />
      <PaperBrokerAdapterSimulatorCockpitSummaryPanel />
      <PaperTradingResultLedgerCockpitSummaryPanel />
      <PaperTradingReviewDashboardCockpitSummaryPanel />
      <StrategyPerformanceReviewLoopCockpitSummaryPanel />
      <StrategyChangeControlWorkflowCockpitSummaryPanel />
      <StrategyVersionReviewRegistryCockpitSummaryPanel />
      <PaperStrategyPromotionGateCockpitSummaryPanel />
      <PaperTradingEndToEndReviewCockpitSummaryPanel />
      <CockpitTradingWorkflowPolishCockpitSummaryPanel />
      <ControlledPaperTradingWorkspaceCockpitSummaryPanel />
      <VideoCreationDomainCockpitSummaryPanel />
      <ScriptAndStoryboardWorkspaceCockpitSummaryPanel />
      <AssetAndShotPlanningWorkspaceCockpitSummaryPanel />
      <VoiceoverAndCaptionPlanningWorkspaceCockpitSummaryPanel />
      <RenderJobBoundaryCockpitSummaryPanel />
      <VideoReviewAndExportBoundaryCockpitSummaryPanel />
      <ControlledVideoCreationWorkspaceCockpitSummaryPanel />

      <VideoBackendServiceContractBoundaryCockpitSummaryPanel />
      <ProviderGatewayContractBoundaryCockpitSummaryPanel />
      <AssetStorageContractBoundaryCockpitSummaryPanel />
      <AudioStorageContractBoundaryCockpitSummaryPanel />
      <RenderQueueContractBoundaryCockpitSummaryPanel />
      <WorkerOrchestrationContractBoundaryCockpitSummaryPanel />
      <ArtifactExportContractBoundaryCockpitSummaryPanel />
      <PublishGatewayContractBoundaryCockpitSummaryPanel />
      <ApprovalCaptureContractBoundaryCockpitSummaryPanel />
      <RightsConsentAuditContractBoundaryCockpitSummaryPanel />
      <FoundationContractsCompletionCandidateCockpitSummaryPanel />

      <section style={quickActionBand} aria-label="Cockpit quick actions">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Cockpit Quick Actions</p>
            <h2 style={sectionTitle}>Navigation-only user actions</h2>
          </div>
          <span style={stateStyle("review-only")}>Review only</span>
        </div>
        <div style={quickActionGrid}>
          {ux.quickActions.map((action, index) => (
            <CheckRow
              key={buildCockpitNavigationCleanupStableKey(["quick-action", String(index), action.id])}
              item={action}
            />
          ))}
        </div>
      </section>

      <section style={splitBand} aria-label="Command palette and next action cleanup">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Command Palette Grouping</p>
              <h2 style={sectionTitle}>Feature-first commands</h2>
            </div>
            <a style={safeLink} href="/command-palette-grouping-preview">
              Review grouping
            </a>
          </div>
          <div style={checklistGrid}>
            {ux.featureCommands.map((command, index) => (
              <CheckRow
                key={buildCockpitNavigationCleanupStableKey(["feature-command", String(index), command.id])}
                item={command}
              />
            ))}
          </div>
        </article>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Next Action</p>
              <h2 style={sectionTitle}>Clean current-state rail</h2>
            </div>
            <a style={safeLink} href="/cockpit-status-summary-preview">
              Status summary
            </a>
          </div>
          <p style={bodyText}>
            Current checkpoint: through phase 2185. Latest batch: 2154-2185 - Approval Capture + Rights Consent + Audit Ledger Mega Batch v1. Latest release candidate: Controlled Foundation Contracts Completion Candidate. The
            cockpit now includes safe approval capture, rights consent, audit ledger, unified release gate, and foundation contracts completion previews below Publish Gateway Contract. Controlled video creation workspace remains review-only, video creation remains
            planning-only, and synthetic data only. Frontend generation, prompt sending, provider calls, model calls,
            connector calls, image generation, video generation, voice generation, final script generation, rendering,
            render queue creation, worker dispatch, artifact creation, artifact persistence, export, download, upload,
            publishing, scheduling, file generation, script persistence, storyboard persistence, asset persistence, audio
            persistence, caption persistence, transcript persistence, rights persistence, prompt persistence, job
            persistence, render persistence, export persistence, revision persistence, publish persistence, approval
            persistence, and performance guarantees remain blocked. Backend-owned asset storage, audio storage, render
            service, export service, provider gateway, rights review, consent review, approval capture, script
            persistence, storyboard persistence, caption persistence, render queue, worker orchestration, artifact
            storage, publish gateway, approval capture, rights workflow, consent workflow, legal review, immutable audit ledger, redaction policy, retention policy, paper workflow, promotion workflow, broker adapter, credential vault, and audit
            trail remain required. No approval persistence from frontend, no signature capture from frontend, no identity verification from frontend, no rights clearance from frontend, no consent approval from frontend, no license grant from frontend, no legal approval from frontend, no audit persistence from frontend, no evidence storage from frontend, and no export publish render from frontend. Full smoke is not claimed here unless full smoke has passed.
          </p>
        </article>
      </section>

      <details style={diagnosticsDrawer}>
        <summary style={diagnosticsSummary}>Developer Diagnostics</summary>
        <p style={bodyText}>
          Developer Diagnostics stays available for route families, smoke routes, phase diagnostics, and direct deep
          links. Main menu hides phase spam, diagnostics remain searchable, and direct phase route access remains
          available.
        </p>
        <div style={routeFamilyGrid}>
          {ux.routeFamilies.map((family, index) => (
            <RouteFamilyCard
              key={buildCockpitNavigationCleanupStableKey(["cockpit-route-family", String(index), family.id])}
              family={family}
            />
          ))}
        </div>
        <a style={safeLink} href="/developer-diagnostics-hub-preview">
          Open Developer Diagnostics
        </a>
      </details>

      <section style={noticeBand} aria-label="Explicit cockpit safety limits">
        {ux.explicitSafetyLimits.map((limit, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["cockpit-safety-limit", String(index), limit])}
            style={dangerChip}
          >
            {limit}
          </span>
        ))}
      </section>
    </section>
  );
}

export function CockpitNavigationCleanupRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: CockpitNavigationCleanupUserUxRouteSlug;
  embedded?: boolean;
}) {
  const model = buildCockpitNavigationCleanupRouteModel(routeSlug);
  const ux = model.cockpitNavigationCleanupUserUx;
  const surface = buildCockpitNavigationCleanupRouteSurface(model);
  const diagnosticsLink =
    model.route.slug === "developer-diagnostics-hub-preview"
      ? {
          href: "/codexforge-cockpit",
          label: "Return to CodexForge Cockpit",
        }
      : {
          href: "/developer-diagnostics-hub-preview",
          label: "Open developer diagnostics",
        };

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-cockpit-navigation-cleanup-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>CodexForge</span>
          <span style={surfaceBadge}>{surface.eyebrow}</span>
          <span style={approvalBadge}>{surface.badge}</span>
        </div>
        {embedded ? <h2 style={title}>{surface.title}</h2> : <h1 style={title}>{surface.title}</h1>}
        <p style={summary}>{surface.summary}</p>
        <p style={bodyText}>
          {surface.primaryAction.summary}
        </p>
      </header>

      <section style={statusBand} aria-label={`${surface.title} safety and status`}>
        {surface.statusPills.map((pill, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["route-status", model.route.slug, String(index), pill])}
            style={statusPill}
          >
            {pill}
          </span>
        ))}
      </section>

      <section style={splitBand} aria-label={`${surface.title} next action and safety`}>
        <article style={primaryActionPanel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Primary action</p>
              <h2 style={sectionTitle}>{surface.primaryAction.label}</h2>
            </div>
            <span style={stateStyle("approval-required")}>Start here</span>
          </div>
          <p style={bodyText}>{surface.primaryAction.summary}</p>
          <a style={primaryLink} href={surface.primaryAction.href}>
            {surface.primaryAction.label}
          </a>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Safety and approval</p>
              <h2 style={sectionTitle}>Keep the workspace concise and controlled</h2>
            </div>
            <span style={stateStyle("blocked")}>Locked</span>
          </div>
          <div style={checklistGrid}>
            {surface.safetyNotes.map((note, index) => (
              <div
                key={buildCockpitNavigationCleanupStableKey(["route-safety-note", model.route.slug, String(index), note])}
                style={checkRow}
              >
                <span style={smallStateStyle("review-only")}>Review only</span>
                <p style={checkDetail}>{note}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section style={featureGrid} aria-label={`${surface.title} workspace cards`}>
        {surface.cards.map((card, index) => (
          <SurfaceCard
            key={buildCockpitNavigationCleanupStableKey(["surface-card", model.route.slug, String(index), card.title])}
            card={card}
          />
        ))}
      </section>

      <section style={splitBand} aria-label={`${surface.title} blocked actions and diagnostics`}>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>What stays blocked</p>
              <h2 style={sectionTitle}>No hidden execution from this route</h2>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <div style={chipRow}>
            {surface.blockedActions.map((action, index) => (
              <span
                key={buildCockpitNavigationCleanupStableKey(["route-blocked-action", model.route.slug, String(index), action])}
                style={dangerChip}
              >
                {action}
              </span>
            ))}
          </div>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Secondary diagnostics</p>
              <h2 style={sectionTitle}>Developer detail stays lower down</h2>
            </div>
            <span style={stateStyle("diagnostic")}>Secondary</span>
          </div>
          <p style={bodyText}>{surface.diagnosticsSummary}</p>
          <a style={safeLink} href={diagnosticsLink.href}>
            {diagnosticsLink.label}
          </a>
        </article>
      </section>

      <details
        style={diagnosticsDrawer}
        open={surface.openDiagnosticsByDefault && !embedded}
      >
        <summary style={diagnosticsSummary}>Secondary diagnostics</summary>
        <p style={bodyText}>{surface.diagnosticsSummary}</p>

        <section style={splitBand} aria-label="Diagnostics metadata">
          <article style={identityBand}>
            <div>
              <p style={panelEyebrow}>Route metadata</p>
              <h2 style={sectionTitle}>{model.route.title}</h2>
            </div>
            <div style={fieldRow}>
              <span style={fieldLabel}>Phase marker</span>
              <span style={fieldValue}>{model.route.phase}</span>
            </div>
            <div style={fieldRow}>
              <span style={fieldLabel}>Model id</span>
              <span style={fieldValue}>{ux.cockpitNavigationCleanupUserUxId}</span>
            </div>
            <div style={fieldRow}>
              <span style={fieldLabel}>Model kind</span>
              <span style={fieldValue}>{ux.cockpitNavigationCleanupUserUxKind}</span>
            </div>
            <FieldList label="Section ids" values={model.route.sectionIds} />
          </article>

          <article style={panel}>
            <div style={panelHeader}>
              <div>
                <p style={panelEyebrow}>Marker phrases</p>
                <h2 style={sectionTitle}>Smoke and traceability markers</h2>
              </div>
              <span style={stateStyle("diagnostic")}>Traceable</span>
            </div>
            <div style={markerBand}>
              {model.route.markerPhrases.map((marker, index) => (
                <span
                  key={buildCockpitNavigationCleanupStableKey(["route-marker", model.route.slug, String(index), marker])}
                  style={markerPill}
                >
                  {marker}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section style={routeFamilyGrid} aria-label="Route families">
          {ux.routeFamilies.map((family, index) => (
            <RouteFamilyCard
              key={buildCockpitNavigationCleanupStableKey(["route-family", model.route.slug, String(index), family.id])}
              family={family}
            />
          ))}
        </section>

        <section style={sectionGrid} aria-label="Detailed route sections">
          {model.sections.map((section, index) => (
            <SectionCard
              key={buildCockpitNavigationCleanupStableKey(["section", model.route.slug, String(index), section.sectionId])}
              section={section}
            />
          ))}
        </section>

        <section style={noticeBand} aria-label="Compact safety limit list">
          {ux.explicitSafetyLimits.slice(0, 10).map((limit, index) => (
            <span
              key={buildCockpitNavigationCleanupStableKey(["route-limit", model.route.slug, String(index), limit])}
              style={dangerChip}
            >
              {limit}
            </span>
          ))}
        </section>

        <div style={diagnosticRouteGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a
              key={buildCockpitNavigationCleanupStableKey(["diagnostic-route", String(index), route.slug])}
              style={routeLink}
              href={route.href}
            >
              <span style={routePhase}>{route.phase}</span>
              <span style={routeLabel}>{route.title}</span>
              <span style={routeCommand}>{route.commandLabel}</span>
            </a>
          ))}
        </div>
      </details>
    </section>
  );
}

function buildCockpitNavigationCleanupRouteSurface(
  model: CockpitNavigationCleanupRouteModel
): CockpitNavigationCleanupRouteSurface {
  const { route, cockpitNavigationCleanupUserUx: ux } = model;

  switch (route.slug) {
    case "trading-workspace-hub-preview":
      return {
        shellLabel: "Trading Desk",
        eyebrow: "Trading Desk",
        badge: "Paper-review only",
        title: "Trading Desk",
        summary:
          "Review strategy notes, risk governor posture, paper workflow, and approval state in one premium workspace. Live trading, broker execution, and personalised recommendations stay blocked.",
        primaryAction: {
          href: "/jarvis-trading",
          label: "Open Jarvis Trading",
          summary:
            "Continue with the product-facing trading workspace for strategy review, risk posture, approvals, and paper-only audit trails.",
        },
        cards: [
          buildRouteSurfaceCard(
            "Strategy review",
            "Research and thesis",
            "Research, strategy notes, and scenario review stay visible without turning into a diagnostic wall.",
            ["Research", "Thesis", "Signals", "Scenario review"]
          ),
          buildRouteSurfaceCard(
            "Risk governor",
            "Approval and control",
            "Risk posture, kill switch state, and execution boundaries stay concise and easy to scan.",
            ["Approval state", "Kill switch", "Blocked execution", "Broker boundary"]
          ),
          buildRouteSurfaceCard(
            "Paper ledger",
            "Review-only outcomes",
            "Paper results, review notes, and audit continuity remain visible with no broker execution path.",
            ["Paper ledger", "Review notes", "Audit continuity", "No broker execution"]
          ),
        ],
        statusPills: [
          "Paper-review only",
          "Broker execution blocked",
          "Operator approval required",
          "No financial advice",
        ],
        blockedActions: [
          "No broker execution",
          "No live market data call from the frontend",
          "No buy or sell instructions",
          "No money movement or order dispatch",
        ],
        safetyNotes: [
          "Risk governor approval remains required before any future backend-owned paper workflow.",
          "Credentials, broker access, and execution stay backend-owned.",
          "Diagnostics stay reachable without leading the normal workspace path.",
        ],
        diagnosticsSummary:
          "Legacy preview markers, route families, and traceability details stay grouped here for developers and smoke coverage.",
        openDiagnosticsByDefault: false,
      };
    case "evidence-audit-hub-preview":
      return {
        shellLabel: "Audit and Runs",
        eyebrow: "Audit and Runs",
        badge: "Review-only workspace",
        title: "Audit and Runs",
        summary:
          "Review evidence packets, approvals, blocked actions, and result continuity in one place. Capture, joins, and persistence remain backend-owned.",
        primaryAction: {
          href: "/jarvis-audit",
          label: "Open Jarvis Audit",
          summary:
            "Continue with the product-facing audit workspace to review evidence, approvals, blocked actions, and result ledger posture.",
        },
        cards: [
          buildRouteSurfaceCard(
            "Evidence",
            "Evidence packets",
            "Evidence and supporting notes stay visible without claiming capture or persistence from the frontend.",
            ["Evidence packets", "Review notes", "Redaction", "Continuity"]
          ),
          buildRouteSurfaceCard(
            "Approvals",
            "Approval timeline",
            "Approval history and blocked actions remain visible without becoming a disclaimer wall.",
            ["Approval history", "Blocked actions", "Operator review", "Holds"]
          ),
          buildRouteSurfaceCard(
            "Results",
            "Result review",
            "Result ledger placeholders keep the next review step clear while storage and joins stay backend-owned.",
            ["Result ledger", "Recovery notes", "Audit join", "No persistence"]
          ),
        ],
        statusPills: [
          "Review-only workspace",
          "Backend-owned capture required",
          "Blocked actions visible",
          "No frontend persistence",
        ],
        blockedActions: [
          "No evidence persistence from the frontend",
          "No audit ledger writes",
          "No result or memory persistence",
          "No execution claims beyond review state",
        ],
        safetyNotes: [
          "Evidence capture, run correlation, and approval joins stay backend-owned.",
          "The route remains a review surface and does not persist evidence or results.",
          "Diagnostics stay lower so the audit path remains readable.",
        ],
        diagnosticsSummary:
          "Preview markers, route families, and compact safety limits remain available here for traceability and smoke coverage.",
        openDiagnosticsByDefault: false,
      };
    case "developer-diagnostics-hub-preview":
      return {
        shellLabel: "Developer Diagnostics",
        eyebrow: "Developer Diagnostics",
        badge: "Secondary only",
        title: "Developer Diagnostics",
        summary:
          "Use this secondary hub for route families, smoke coverage, and deep links. It stays out of the normal product path and does not enable execution.",
        primaryAction: {
          href: "/",
          label: "Return to CodexForge",
          summary:
            "Go back to the main product route when you want a user-facing workspace. Use this page only for developer traceability and grouped diagnostics.",
        },
        cards: [
          buildRouteSurfaceCard(
            "Route families",
            "Grouped deep links",
            "Browse grouped diagnostic families instead of hunting through a flat phase list.",
            ["Route families", "Deep links", "Searchable", "Grouped"]
          ),
          buildRouteSurfaceCard(
            "Smoke coverage",
            "Traceability markers",
            "Route markers, smoke references, and preview metadata remain visible for developer review.",
            ["Markers", "Smoke coverage", "Metadata", "Route map"]
          ),
          buildRouteSurfaceCard(
            "Product path",
            "Normal user path stays clean",
            "Diagnostics remain reachable without polluting the home, cockpit, Jarvis, or workspace routes.",
            ["Home", "Cockpit", "Jarvis", "Workspace routes"]
          ),
        ],
        statusPills: [
          "Secondary only",
          "Searchable route families",
          "Normal user path stays clean",
          "No execution from diagnostics",
        ],
        blockedActions: [
          "No execution from diagnostics",
          "No provider or model calls",
          "No persistence or route mutation",
          "No hidden automation or worker dispatch",
        ],
        safetyNotes: [
          "Developer diagnostics remain accessible without becoming the default user journey.",
          "Direct route access and smoke coverage stay preserved.",
          "This route stays review-only and traceability-focused.",
        ],
        diagnosticsSummary:
          "This page is already the secondary diagnostic layer, so route metadata, markers, families, and deep links are expanded by default.",
        openDiagnosticsByDefault: true,
      };
    default: {
      const cards =
        model.sections.length > 0
          ? model.sections.slice(0, 3).map((section, index) =>
              buildRouteSurfaceCard(
                index === 0 ? "Workspace overview" : "Supporting detail",
                section.title,
                section.humanReadableSummary,
                section.featureLabels.slice(0, 4)
              )
            )
          : [
              buildRouteSurfaceCard(
                "Workspace overview",
                stripPreviewSuffix(route.title),
                route.summary,
                ["Review only", "Diagnostics lower down", "Execution blocked"]
              ),
            ];

      return {
        shellLabel: stripPreviewSuffix(route.title),
        eyebrow: route.devOnly ? "Secondary preview" : "Workspace review",
        badge: route.devOnly ? "Review-only route" : "Product route",
        title: stripPreviewSuffix(route.title),
        summary:
          route.summary +
          " The main product path stays clean while developer traceability remains reachable lower down.",
        primaryAction: {
          href: "/codexforge-cockpit",
          label: "Open CodexForge Cockpit",
          summary:
            "Return to the cockpit for the main product journey, then open the workspace or diagnostic route you need.",
        },
        cards,
        statusPills: [
          "Review-only route",
          "Operator approval required",
          "Diagnostics lower down",
          "Execution blocked",
        ],
        blockedActions: [
          "No execution from the frontend",
          "No provider or model calls",
          "No persistence or hidden automation",
          "No route deletion or smoke removal",
        ],
        safetyNotes: [
          "Operator approval remains required.",
          "Backend-owned services remain required before any future execution path.",
          "Direct diagnostic access and smoke coverage stay preserved.",
        ],
        diagnosticsSummary:
          "Markers, grouped route families, safety limits, and preview-only section details stay compact and secondary here.",
        openDiagnosticsByDefault: false,
      };
    }
  }
}

function buildRouteSurfaceCard(
  eyebrow: string,
  title: string,
  summary: string,
  tags: readonly string[]
): CockpitNavigationCleanupRouteSurfaceCard {
  return {
    eyebrow,
    title,
    summary,
    tags,
  };
}

function stripPreviewSuffix(title: string): string {
  return title.replace(/ Preview$/u, "");
}

function FeatureCard({
  section,
  href,
  actionLabel,
}: {
  section: CockpitNavigationCleanupSection;
  href: string;
  actionLabel: string;
}) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{section.label}</p>
          <h2 style={sectionTitle}>{section.title}</h2>
        </div>
        <span style={stateStyle(section.state)}>{formatState(section.state)}</span>
      </div>
      <p style={bodyText}>{section.humanReadableSummary}</p>
      <div style={chipRow}>
        {section.featureLabels.map((label, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["feature-label", section.sectionId, String(index), label])}
            style={chip}
          >
            {label}
          </span>
        ))}
      </div>
      <a style={safeLink} href={href}>
        {actionLabel}
      </a>
    </article>
  );
}

function SurfaceCard({
  card,
}: {
  card: CockpitNavigationCleanupRouteSurfaceCard;
}) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{card.eyebrow}</p>
          <h2 style={sectionTitle}>{card.title}</h2>
        </div>
        <span style={stateStyle("review-only")}>Review only</span>
      </div>
      <p style={bodyText}>{card.summary}</p>
      <div style={chipRow}>
        {card.tags.map((tag, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["surface-card-tag", card.title, String(index), tag])}
            style={chip}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function WorkspacePanel({
  title,
  summary,
  items,
  href,
}: {
  title: string;
  summary: string;
  items: readonly string[];
  href: string;
}) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Workspace hub</p>
          <h2 style={sectionTitle}>{title}</h2>
        </div>
        <a style={safeLink} href={href}>
          Open hub
        </a>
      </div>
      <p style={bodyText}>{summary}</p>
      <div style={chipRow}>
        {items.map((item, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["workspace-item", title, String(index), item])}
            style={chip}
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function SectionCard({ section }: { section: CockpitNavigationCleanupSection }) {
  const featuredInputs = section.plannedInputs.slice(0, 3);
  const featuredOutputs = section.plannedOutputs.slice(0, 3);
  const featuredSafetyNotes = section.safetyNotes.slice(0, 3);
  const featuredDeniedActions = section.deniedActions.slice(0, 2);
  const featuredChecklist = section.checklist.slice(0, 3);

  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{section.label}</p>
          <h2 style={sectionTitle}>{section.title}</h2>
        </div>
        <span style={stateStyle(section.state)}>{formatState(section.state)}</span>
      </div>
      <p style={bodyText}>{section.humanReadableSummary}</p>
      <FieldList label="Highlights" values={section.featureLabels.slice(0, 6)} />
      {featuredInputs.length > 0 ? (
        <FieldList label="Planned inputs" values={featuredInputs} />
      ) : null}
      {featuredOutputs.length > 0 ? (
        <FieldList label="Planned outputs" values={featuredOutputs} />
      ) : null}
      {featuredSafetyNotes.length > 0 ? (
        <FieldList label="Safety notes" values={featuredSafetyNotes} />
      ) : null}
      <div style={chipRow}>
        {featuredDeniedActions.map((action, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["denied-action", section.sectionId, String(index), action])}
            style={dangerChip}
          >
            {action}
          </span>
        ))}
      </div>
      <div style={checklistGrid}>
        {featuredChecklist.map((item, index) => (
          <CheckRow
            key={buildCockpitNavigationCleanupStableKey(["section-check", section.sectionId, String(index), item.id])}
            item={item}
          />
        ))}
      </div>
    </article>
  );
}

function FieldList({ label, values }: { label: string; values: readonly string[] }) {
  return (
    <div style={fieldRow}>
      <span style={fieldLabel}>{label}</span>
      {values.map((value, index) => (
        <span
          key={buildCockpitNavigationCleanupStableKey(["field-list", label, String(index), value])}
          style={fieldValue}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

function CheckRow({ item }: { item: CockpitNavigationCleanupItem }) {
  return (
    <div style={checkRow}>
      <span style={smallStateStyle(item.state)}>{formatState(item.state)}</span>
      <div>
        <p style={checkLabel}>{item.label}</p>
        <p style={checkDetail}>{item.detail}</p>
      </div>
    </div>
  );
}

function RouteFamilyCard({ family }: { family: CockpitNavigationCleanupRouteFamily }) {
  return (
    <article style={familyCard}>
      <p style={panelEyebrow}>{family.label}</p>
      <p style={bodyText}>{family.summary}</p>
      <div style={chipRow}>
        {family.exampleRoutes.map((route, index) => (
          <span
            key={buildCockpitNavigationCleanupStableKey(["family-route", family.id, String(index), route])}
            style={chip}
          >
            {route}
          </span>
        ))}
      </div>
    </article>
  );
}

function formatState(state: CockpitNavigationCleanupState): string {
  if (state === "user-facing") return "User-facing";
  if (state === "diagnostic") return "Diagnostic";
  if (state === "approval-required") return "Approval required";
  if (state === "blocked") return "Blocked";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  return "Review only";
}

function stateStyle(state: CockpitNavigationCleanupState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalStateBadge
        : state === "diagnostic"
          ? diagnosticBadge
          : state === "user-facing"
            ? userFacingBadge
            : state === "candidate" || state === "release-candidate"
              ? candidateBadge
              : reviewBadge),
  };
}

function smallStateStyle(state: CockpitNavigationCleanupState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalStateBadge
        : state === "diagnostic"
          ? diagnosticBadge
          : state === "user-facing"
            ? userFacingBadge
            : state === "candidate" || state === "release-candidate"
              ? candidateBadge
              : reviewBadge),
  };
}

const page: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 18,
  padding: "28px",
  color: "#e2e8f0",
};

const embeddedPage: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  color: "#e2e8f0",
};

const hero: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 20,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45, 212, 191, 0.2)",
  borderRadius: 22,
  background:
    "radial-gradient(circle at 18% 0%, rgba(34, 211, 238, 0.14), transparent 36%), linear-gradient(145deg, rgba(7, 16, 30, 0.94), rgba(9, 18, 34, 0.9) 58%, rgba(15, 23, 42, 0.84))",
  boxShadow: "0 24px 60px rgba(2, 6, 23, 0.3)",
};

const eyebrowRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const phaseBadge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125, 211, 252, 0.26)",
  borderRadius: 999,
  padding: "6px 10px",
  fontSize: 12,
  fontWeight: 700,
  color: "#dbeafe",
  background: "rgba(14, 165, 233, 0.12)",
};

const surfaceBadge: CSSProperties = {
  ...phaseBadge,
  borderColor: "rgba(74, 222, 128, 0.24)",
  color: "#dcfce7",
  background: "rgba(21, 128, 61, 0.16)",
};

const approvalBadge: CSSProperties = {
  ...phaseBadge,
  borderColor: "rgba(250, 204, 21, 0.26)",
  color: "#fef3c7",
  background: "rgba(120, 53, 15, 0.18)",
};

const title: CSSProperties = {
  margin: 0,
  fontSize: 38,
  lineHeight: 1.08,
  letterSpacing: 0,
  color: "#f8fafc",
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 1080,
  fontSize: 18,
  lineHeight: 1.5,
  color: "rgba(226, 232, 240, 0.88)",
};

const bodyText: CSSProperties = {
  margin: "8px 0 0",
  color: "rgba(203, 213, 225, 0.82)",
  fontSize: 14,
  lineHeight: 1.55,
};

const statusBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(74, 222, 128, 0.18)",
  borderRadius: 18,
  padding: 14,
  background: "rgba(9, 20, 34, 0.82)",
};

const featureGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
};

const sectionGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 14,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 14,
};

const panel: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148, 163, 184, 0.16)",
  borderRadius: 18,
  padding: 18,
  background: "rgba(7, 15, 28, 0.78)",
  boxShadow: "0 18px 42px rgba(2, 6, 23, 0.24)",
};

const panelHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  flexWrap: "wrap",
};

const panelEyebrow: CSSProperties = {
  margin: "0 0 4px",
  color: "#8bd2e4",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0.02,
};

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.25,
  letterSpacing: 0,
  color: "#f8fafc",
};

const quickActionBand: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148, 163, 184, 0.16)",
  borderRadius: 18,
  padding: 16,
  background: "rgba(7, 15, 28, 0.78)",
};

const quickActionGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const markerPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125, 211, 252, 0.18)",
  borderRadius: 12,
  padding: "7px 9px",
  background: "rgba(15, 23, 42, 0.82)",
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.3,
};

const identityBand: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148, 163, 184, 0.16)",
  borderRadius: 18,
  padding: 14,
  background: "rgba(7, 15, 28, 0.78)",
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 10,
};

const chip: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125, 211, 252, 0.18)",
  borderRadius: 999,
  padding: "6px 8px",
  background: "rgba(8, 47, 73, 0.24)",
  color: "#e0f2fe",
  fontSize: 12,
  lineHeight: 1.3,
};

const dangerChip: CSSProperties = {
  ...chip,
  borderColor: "rgba(248, 113, 113, 0.24)",
  background: "rgba(127, 29, 29, 0.22)",
  color: "#fecaca",
};

const noticeBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(248, 113, 113, 0.2)",
  borderRadius: 18,
  padding: 14,
  background: "rgba(32, 12, 12, 0.54)",
};

const fieldRow: CSSProperties = {
  display: "grid",
  gap: 3,
  borderTop: "1px solid rgba(148, 163, 184, 0.14)",
  paddingTop: 8,
  marginTop: 8,
};

const fieldLabel: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 12,
  fontWeight: 800,
};

const fieldValue: CSSProperties = {
  margin: "7px 0 0",
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.45,
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: 8,
  marginTop: 12,
};

const checkRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 10,
  alignItems: "start",
  borderTop: "1px solid rgba(148, 163, 184, 0.14)",
  paddingTop: 8,
};

const checkLabel: CSSProperties = {
  margin: 0,
  color: "#f8fafc",
  fontSize: 13,
  fontWeight: 700,
};

const checkDetail: CSSProperties = {
  margin: "3px 0 0",
  color: "rgba(203, 213, 225, 0.82)",
  fontSize: 13,
  lineHeight: 1.45,
};

const stateBadge: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",
  borderRadius: 999,
  padding: "6px 8px",
  fontSize: 12,
  fontWeight: 700,
};

const smallStateBadge: CSSProperties = {
  ...stateBadge,
  flex: "0 0 auto",
  padding: "4px 6px",
  fontSize: 11,
};

const blockedBadge: CSSProperties = {
  borderColor: "rgba(248, 113, 113, 0.24)",
  background: "rgba(127, 29, 29, 0.22)",
  color: "#fecaca",
};

const approvalStateBadge: CSSProperties = {
  borderColor: "rgba(250, 204, 21, 0.26)",
  background: "rgba(120, 53, 15, 0.18)",
  color: "#fef3c7",
};

const reviewBadge: CSSProperties = {
  borderColor: "rgba(74, 222, 128, 0.24)",
  background: "rgba(20, 83, 45, 0.22)",
  color: "#dcfce7",
};

const userFacingBadge: CSSProperties = {
  borderColor: "rgba(125, 211, 252, 0.26)",
  background: "rgba(8, 47, 73, 0.24)",
  color: "#dbeafe",
};

const diagnosticBadge: CSSProperties = {
  borderColor: "rgba(148, 163, 184, 0.24)",
  background: "rgba(30, 41, 59, 0.56)",
  color: "#cbd5e1",
};

const candidateBadge: CSSProperties = {
  borderColor: "rgba(34, 211, 238, 0.24)",
  background: "rgba(12, 74, 110, 0.24)",
  color: "#bae6fd",
};

const diagnosticsDrawer: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148, 163, 184, 0.16)",
  borderRadius: 18,
  padding: 14,
  background: "rgba(6, 11, 22, 0.84)",
};

const diagnosticsSummary: CSSProperties = {
  cursor: "pointer",
  fontWeight: 800,
  color: "#e2e8f0",
};

const routeFamilyGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const familyCard: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148, 163, 184, 0.16)",
  borderRadius: 16,
  padding: 12,
  background: "rgba(7, 15, 28, 0.78)",
};

const diagnosticRouteGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const routeLink: CSSProperties = {
  display: "grid",
  gap: 4,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148, 163, 184, 0.16)",
  borderRadius: 16,
  padding: 12,
  color: "#e2e8f0",
  textDecoration: "none",
  background: "rgba(7, 15, 28, 0.78)",
};

const routePhase: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 12,
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
  color: "#f8fafc",
};

const routeCommand: CSSProperties = {
  color: "rgba(203, 213, 225, 0.72)",
  fontSize: 12,
};

const safeLink: CSSProperties = {
  display: "inline-flex",
  width: "fit-content",
  alignItems: "center",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125, 211, 252, 0.22)",
  borderRadius: 12,
  padding: "8px 10px",
  color: "#dbeafe",
  background: "rgba(8, 47, 73, 0.24)",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 700,
  marginTop: 12,
};

const primaryActionPanel: CSSProperties = {
  ...panel,
  borderColor: "rgba(45, 212, 191, 0.22)",
  background:
    "radial-gradient(circle at 78% 18%, rgba(34, 211, 238, 0.12), transparent 24%), linear-gradient(145deg, rgba(8, 27, 38, 0.94), rgba(9, 18, 34, 0.9))",
};

const primaryLink: CSSProperties = {
  ...safeLink,
  borderColor: "rgba(45, 212, 191, 0.28)",
  background: "rgba(20, 83, 45, 0.22)",
  color: "#dcfce7",
};

const statusPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 42,
  padding: "10px 12px",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(74, 222, 128, 0.18)",
  borderRadius: 14,
  background: "rgba(20, 83, 45, 0.18)",
  color: "#dcfce7",
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.4,
};
