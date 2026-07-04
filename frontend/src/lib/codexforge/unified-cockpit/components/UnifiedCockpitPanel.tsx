"use client";
import type { CSSProperties } from "react";
import { ApplyRunTransactionCockpitSummaryPanel } from "../../apply-run-transaction/components";
import { BackendExecutionQueueCockpitSummaryPanel } from "../../backend-execution-queue/components";
import { CockpitDomainWorkspaceCockpitPanel } from "../../cockpit-domain-workspace/components";
import { CommandRunnerSafetyV2CockpitSummaryPanel } from "../../command-runner-safety-v2/components";
import { DailyTestableCockpitMvpPanel } from "../../daily-testable-cockpit-mvp/components";
import { DomainPackRunnerCockpitSummaryPanel } from "../../domain-pack-runner/components";
import { EvidenceMemoryCockpitSummaryPanel } from "../../evidence-memory/components";
import { GameServerBuilderCockpitSummaryPanel } from "../../game-server-builder/components";
import { GoalCompilerCockpitSummaryPanel } from "../../goal-compiler/components";
import { LocalModelBridgeCockpitSummaryPanel } from "../../local-model-bridge/components";
import { ModelRouterV2CockpitSummaryPanel } from "../../model-router-v2/components";
import { PlanDiffCommandComposerCockpitSummaryPanel } from "../../plan-diff-command-composer/components";
import { ProviderApprovalGateCockpitSummaryPanel } from "../../provider-approval-gate/components";
import { ProjectContextBrainCockpitSummaryPanel } from "../../project-context-brain/components";
import { ReleaseGradeAuditTrailCockpitSummaryPanel } from "../../release-grade-audit-trail/components";
import { SpecialistWorkerRegistryCockpitSummaryPanel } from "../../specialist-worker-registry/components";
import { BacktestPaperTradingEngineCockpitPanel } from "../../backtest-paper-trading-engine/components";
import { BrokerExecutionBoundaryCockpitSummaryPanel } from "../../broker-execution-boundary/components";
import { CockpitNavigationCleanupUserUxCockpitPanel } from "../../cockpit-navigation-cleanup-user-ux/components";
import { PaperBrokerAdapterSimulatorCockpitSummaryPanel } from "../../paper-broker-adapter-simulator/components";
import { PaperTradingResultLedgerCockpitSummaryPanel } from "../../paper-trading-result-ledger/components";
import { PaperTradingReviewDashboardCockpitSummaryPanel } from "../../paper-trading-review-dashboard/components";
import { ProfitLockboxReinvestmentRulesCockpitPanel } from "../../profit-lockbox-reinvestment-rules/components";
import { StrategyLabSignalEngineCockpitPanel } from "../../strategy-lab-signal-engine/components";
import { StrategyPerformanceReviewLoopCockpitSummaryPanel } from "../../strategy-performance-review-loop/components";
import { StrategyChangeControlWorkflowCockpitSummaryPanel } from "../../strategy-change-control-workflow/components";
import { StrategyVersionReviewRegistryCockpitSummaryPanel } from "../../strategy-version-review-registry/components";
import { PaperStrategyPromotionGateCockpitSummaryPanel } from "../../paper-strategy-promotion-gate/components";
import { PaperTradingEndToEndReviewCockpitSummaryPanel } from "../../paper-trading-end-to-end-review/components";
import { CockpitTradingWorkflowPolishCockpitSummaryPanel } from "../../cockpit-trading-workflow-polish/components";
import { ControlledPaperTradingWorkspaceCockpitSummaryPanel } from "../../controlled-paper-trading-workspace/components";
import { ScriptAndStoryboardWorkspaceCockpitSummaryPanel } from "../../script-and-storyboard-workspace/components";
import { AssetAndShotPlanningWorkspaceCockpitSummaryPanel } from "../../asset-and-shot-planning-workspace/components";
import { VoiceoverAndCaptionPlanningWorkspaceCockpitSummaryPanel } from "../../voiceover-and-caption-planning-workspace/components";
import { RenderJobBoundaryCockpitSummaryPanel } from "../../render-job-boundary/components";
import { VideoReviewAndExportBoundaryCockpitSummaryPanel } from "../../video-review-and-export-boundary/components";
import { ControlledVideoCreationWorkspaceCockpitSummaryPanel } from "../../controlled-video-creation-workspace/components";
import { VideoBackendServiceContractBoundaryCockpitSummaryPanel } from "../../video-backend-service-contract-boundary/components";
import { ProviderGatewayContractBoundaryCockpitSummaryPanel } from "../../provider-gateway-contract-boundary/components";
import { AssetStorageContractBoundaryCockpitSummaryPanel } from "../../asset-storage-contract-boundary/components";
import { AudioStorageContractBoundaryCockpitSummaryPanel } from "../../audio-storage-contract-boundary/components";
import { RenderQueueContractBoundaryCockpitSummaryPanel, WorkerOrchestrationContractBoundaryCockpitSummaryPanel } from "../../render-queue-contract-boundary/components";
import { ArtifactExportContractBoundaryCockpitSummaryPanel, PublishGatewayContractBoundaryCockpitSummaryPanel } from "../../artifact-export-contract-boundary/components";
import { ApprovalCaptureContractBoundaryCockpitSummaryPanel, FoundationContractsCompletionCandidateCockpitSummaryPanel, RightsConsentAuditContractBoundaryCockpitSummaryPanel } from "../../approval-capture-contract-boundary/components";
import { JarvisCockpitVisualCockpitPanel } from "../../jarvis-cockpit-visual-system/components";
import { ApprovedProviderTrialCockpitSection } from "../../first-approved-provider-trial-map/components";
import { ProviderResultReviewRecoveryCockpitSection } from "../../provider-result-review-recovery-map/components";
import { ProviderGatewayHardeningCockpitSection } from "../../provider-gateway-hardening-map/components";
import { AssetStorageBackendWiringCockpitSection } from "../../asset-storage-backend-wiring-map/components";
import { AudioStorageBackendWiringCockpitSection } from "../../audio-storage-backend-wiring-map/components";
import { RenderQueueBackendWiringCockpitSection } from "../../render-queue-backend-wiring-map/components";
import { WorkerOrchestrationBackendWiringCockpitSection } from "../../worker-orchestration-backend-wiring-map/components";
import { ArtifactExportBackendWiringCockpitSection } from "../../artifact-export-backend-wiring-map/components";
import { PublishGatewayBackendWiringCockpitSection } from "../../publish-gateway-backend-wiring-map/components";
import { EndToEndVideoCreationDryRunCockpitSection } from "../../end-to-end-video-creation-dry-run-map/components";
import { FirstRealProviderCallGuardCockpitSection } from "../../first-real-provider-call-guard-map/components";
import { VideoCreationDomainCockpitSummaryPanel } from "../../video-creation-domain/components";
import { TradingMandateRiskGovernorCockpitPanel } from "../../trading-mandate-risk-governor/components";
import { TradingResearchDomainPackCockpitPanel } from "../../trading-research-domain-pack/components";
import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  type UnifiedCockpitPanelState,
  type UnifiedCockpitRouteSlug,
} from "../unified-cockpit-model";
import styles from "./UnifiedCockpitPanel.module.css";
export function UnifiedCodexForgeCockpitPanel() {
  return (
    <section
      className={styles.mainCockpitStack}
      data-codexforge-main-pages-god-tier-ux="Main Pages God Tier UX Upgrade premium command center Jarvis-ready cockpit review-only UX upgrade no live provider calls no model calls no network egress no command execution from the app no browser storage writes"
      data-codexforge-asset-storage-backend-wiring="2634?2665 ? Asset Storage Backend Wiring Mega Batch v1 Asset Storage Backend Wiring review-only asset storage diagnostic blocked asset storage execution protected asset storage boundary asset storage contract asset metadata envelope asset validation boundary asset classification boundary asset path policy asset namespace guard upload blocked download blocked storage mutation blocked asset persistence blocked no live asset storage no upload/download no file system writes from the app no frontend persistence no browser storage writes no live provider calls no model calls no prompt sending no streaming no provider SDK imports no storage provider imports no network egress no fetch/network calls no connector calls no render/export/publish/schedule no command execution from the app no service creation no API creation from frontend no queue dispatch no worker dispatch no process spawning no port binding no runtime deploy no credential storage no token storage approval and audit enforcement redaction boundary observability trace markers retry and fallback policy rate guard cost guard privacy guard safety guard asset state asset recovery operator review completion guard next likely batch: 2666?2697 ? Audio Storage Backend Wiring"
      data-codexforge-audio-storage-backend-wiring="2666?2697 ? Audio Storage Backend Wiring Mega Batch v1 Audio Storage Backend Wiring review-only audio storage diagnostic blocked audio storage execution protected audio storage boundary audio storage contract audio metadata envelope audio validation boundary audio classification boundary audio codec policy audio duration guard waveform metadata boundary transcript linkage boundary asset linkage boundary audio upload blocked audio download blocked audio recording blocked microphone access blocked media device access blocked playback blocked transcoding blocked audio rendering blocked storage mutation blocked audio persistence blocked no live audio storage no upload/download no file system writes from the app no frontend persistence no browser storage writes no live provider calls no model calls no prompt sending no streaming no provider SDK imports no audio provider imports no storage provider imports no network egress no fetch/network calls no connector calls no render/export/publish/schedule no command execution from the app no service creation no API creation from frontend no queue dispatch no worker dispatch no process spawning no port binding no runtime deploy no credential storage no token storage approval and audit enforcement redaction boundary observability trace markers retry and fallback policy rate guard cost guard privacy guard safety guard audio state audio recovery operator review completion guard next likely batch: 2698?2729 ? Render Queue Backend Wiring"
      data-codexforge-render-queue-backend-wiring="2698?2729 ? Render Queue Backend Wiring Mega Batch v1 Render Queue Backend Wiring review-only render queue diagnostic blocked render queue execution protected render queue boundary render queue contract render job envelope render validation boundary asset dependency boundary audio dependency boundary timeline dependency boundary render priority policy render scheduling policy render queue dispatch blocked worker dispatch blocked worker execution blocked job execution blocked scheduler execution blocked render execution blocked video rendering blocked transcoding blocked render persistence blocked no live render queue no live rendering no queue dispatch no worker dispatch no worker execution no job execution no scheduler execution no process spawning no file system writes from the app no frontend persistence no browser storage writes no live provider calls no model calls no prompt sending no streaming no provider SDK imports no audio provider imports no storage provider imports no render provider imports no network egress no fetch/network calls no connector calls no upload/download no render/export/publish/schedule no command execution from the app no service creation no API creation from frontend no port binding no runtime deploy no credential storage no token storage approval and audit enforcement redaction boundary observability trace markers retry and fallback policy rate guard cost guard privacy guard safety guard render queue state render queue recovery operator review completion guard next likely batch: 2730?2761 ? Worker Orchestration Backend Wiring"
      data-codexforge-worker-orchestration-backend-wiring="2730?2761 ? Worker Orchestration Backend Wiring Mega Batch v1 Worker Orchestration Backend Wiring review-only worker orchestration diagnostic blocked worker orchestration execution protected worker orchestration boundary worker orchestration contract worker job envelope worker validation boundary worker capability policy worker isolation policy queue handoff boundary scheduler handoff boundary worker dispatch blocked worker execution blocked process spawning blocked service creation blocked port binding blocked runtime deploy blocked worker persistence blocked no live worker orchestration no queue dispatch no worker dispatch no worker execution no job execution no scheduler execution no orchestration execution no worker pool creation no service creation no daemon creation no subprocess creation no process spawning no shell execution no command execution from the app no file system writes from the app no frontend persistence no browser storage writes no live provider calls no model calls no prompt sending no streaming no provider SDK imports no audio provider imports no storage provider imports no render provider imports no worker provider imports no network egress no fetch/network calls no connector calls no upload/download no render/export/publish/schedule no API creation from frontend no port binding no runtime deploy no credential storage no token storage approval and audit enforcement redaction boundary observability trace markers retry and fallback policy rate guard cost guard privacy guard safety guard worker orchestration state worker orchestration recovery operator review completion guard next likely batch: 2762?2793 ? Artifact Export Backend Wiring"
      data-codexforge-cockpit-interactive-video-workspace="Jarvis Cockpit Visual Upgrade Interactive Video Workspace Cockpit Interactive Video Workspace Summary Provider Gateway Wiring Provider Gateway Cockpit Readiness Rail request envelope review-only response envelope synthetic only provider capability catalog preview only model family catalog preview only approval gate required audit envelope required credential boundary backend-only token boundary backend-only streaming boundary blocked fallback retry timeout policy-only adapter registry disabled execution state blocked Local React state only Synthetic data only No backend execution No frontend persistence No browser storage writes No provider calls No model calls No connector calls No prompt sending No upload No download No render No export No publish No schedule Backend wiring required Backend-owned provider gateway remains required Operator review required Explicit operator approval required Audit trail required Provider Backend Adapter Contract Provider Adapter Cockpit Readiness Rail adapter interface contract-only adapter manifest review-only request mapping synthetic only response mapping synthetic only error mapping policy-only audit mapping required approval mapping required credential requirement backend-only token handling backend-only streaming blocked retry fallback timeout contract-only sandbox boundary required disabled adapter catalog all disabled implementation state blocked next batch 2346-2377 First Provider Adapter Dry Run Harness Mega Batch v1 Backend-owned provider adapter remains required Provider Adapter Dry Run Harness request packet synthetic only response packet synthetic only fixture registry safe mock data only transcript preview local deterministic copy only validation matrix review-only denial matrix required audit packet preview only approval packet preview only prompt transmission blocked credentials tokens blocked streaming blocked dry run adapter lane disabled result review synthetic only failure recovery policy-only next batch 2378-2409 Provider Adapter Mock Result Harness Mega Batch v1 dry run harness remains synthetic and review-only provider dry run remains backend-owned Provider Adapter Mock Result Harness mock output packet synthetic only fixture catalog safe deterministic outputs only quality review review-only safety review required redaction review required audit packet preview only approval packet preview only rejection path review-only recovery path policy-only prompt leakage blocked credentials tokens blocked streaming blocked mock result lane disabled next batch 2410-2441 Provider Approval Audit Enforcement Boundary Mega Batch v1 mock result harness remains synthetic and review-only provider mock result handling remains backend-owned Provider Approval Audit Enforcement approval request envelope synthetic only approval decision envelope review-only audit intent envelope required audit result envelope required operator approval gate required denial enforcement matrix required approval execution lane disabled next batch 2442-2473 First Controlled Provider Dry Run Candidate Mega Batch v1 approval audit enforcement remains synthetic and review-only provider approval audit handling remains backend-owned Controlled Provider Dry Run Candidate run intent packet synthetic only approval-bound packet review-only audit-bound packet review-only preflight summary required fixture selection synthetic only transcript assembly deterministic only mock result handoff review-only denied execution summary required operator review panel disabled actions execution lane disabled next batch 2474-2505 Provider Backend Execution Readiness Mega Batch v1 controlled provider dry run candidate remains synthetic and review-only provider dry run remains backend-owned Provider Backend Execution Readiness prerequisite matrix review-only execution contract backend-owned server runtime boundary required credential injection readiness backend-only token redaction readiness required approval enforcement readiness required audit persistence readiness required SDK isolation readiness required network egress readiness blocked execution lane disabled next batch 2506-2537 First Real Provider Call Guard Mega Batch v1 provider backend execution readiness remains synthetic and review-only backend execution remains backend-owned First Real Provider Call Guard eligibility checklist required execution lock locked backend-only gate required operator approval enforcement required audit enforcement required credential presence guard backend-only token redaction guard required prompt transmission guard blocked SDK import guard blocked network egress guard blocked real call lane disabled next batch 2538-2569 First Approved Provider Trial Mega Batch v1 first real provider call guard remains synthetic and review-only real provider call remains backend-owned and blocked First Approved Provider Trial trial intent envelope synthetic only approval join required audit join required credential gate backend-only token redaction gate required prompt boundary gate blocked SDK isolation gate blocked network egress gate blocked trial lane disabled result placeholder synthetic only rollback plan review-only next batch 2570-2601 Provider Result Review + Recovery Mega Batch v1 approved provider trial remains synthetic and review-only approved provider trial remains backend-owned and blocked Provider Result Review + Recovery result review envelope synthetic only safety review required privacy review required redaction review required audit join required approval join required rejection workflow review-only recovery plan review-only promotion lane disabled persistence export publish blocked next batch 2602-2633 Provider Gateway Hardening Mega Batch v1 provider result review recovery remains synthetic and review-only provider result promotion remains backend-owned and blocked 2602?2633 ? Provider Gateway Hardening Mega Batch v1 Provider Gateway Hardening review-only provider gateway diagnostic blocked provider execution protected provider boundary no live provider calls no model calls no prompt sending no streaming no provider SDK imports no network egress no fetch/network calls no frontend persistence no browser storage writes no connector calls no upload/download no render/export/publish/schedule no command execution from the app no service creation no API creation from frontend no queue dispatch no worker dispatch no process spawning no port binding no runtime deploy no credential storage no token storage approval and audit enforcement denial handling redaction boundary observability trace markers retry and fallback policy rate guard cost guard safety guard privacy guard gateway state gateway recovery completion guard next likely batch: 2634?2665 ? Asset Storage Backend Wiring"
    >
      <JarvisCockpitVisualCockpitPanel />
      <section className={styles.contractStatusStack} aria-label="Lower priority backend contract and diagnostic status">
        <div className={styles.contractStatusHeader}>
          <p className={styles.contractStatusEyebrow}>Contract Status Drawer</p>
          <h2 className={styles.contractStatusTitle}>Backend foundation status remains visible below the premium cockpit</h2>
          <p className={styles.contractStatusText}>
            Provider gateway, asset and audio storage, render queue, worker orchestration, artifact export, publish
            gateway, approval capture, rights consent, audit ledger, foundation completion, and diagnostic navigation
            remain preserved as secondary status surfaces.
          </p>
        </div>
        <CockpitNavigationCleanupUserUxCockpitPanel />
        <VideoBackendServiceContractBoundaryCockpitSummaryPanel />
        <ProviderGatewayContractBoundaryCockpitSummaryPanel />
        <AssetStorageContractBoundaryCockpitSummaryPanel />
        <AudioStorageContractBoundaryCockpitSummaryPanel />
        <RenderQueueContractBoundaryCockpitSummaryPanel />
        <WorkerOrchestrationContractBoundaryCockpitSummaryPanel />
        <ArtifactExportContractBoundaryCockpitSummaryPanel />
        <PublishGatewayContractBoundaryCockpitSummaryPanel />
        <PublishGatewayBackendWiringCockpitSection />
        <EndToEndVideoCreationDryRunCockpitSection />
        <ApprovalCaptureContractBoundaryCockpitSummaryPanel />
        <RightsConsentAuditContractBoundaryCockpitSummaryPanel />
        <FoundationContractsCompletionCandidateCockpitSummaryPanel />
        <FirstRealProviderCallGuardCockpitSection />
        <ApprovedProviderTrialCockpitSection />
        <ProviderResultReviewRecoveryCockpitSection />
        <ProviderGatewayHardeningCockpitSection />
        <AssetStorageBackendWiringCockpitSection />
        <AudioStorageBackendWiringCockpitSection />
        <RenderQueueBackendWiringCockpitSection />
        <WorkerOrchestrationBackendWiringCockpitSection />
        <ArtifactExportBackendWiringCockpitSection />
      </section>
    </section>
  );
}
export function UnifiedCockpitRoutePanel({ routeSlug }: { routeSlug: UnifiedCockpitRouteSlug }) {
  const model = buildUnifiedCockpitRouteModel(routeSlug);
  const isMainCockpit = model.route.slug === "codexforge-cockpit";
  return (
    <section
      style={page}
      data-codexforge-unified-cockpit={`${model.route.title} ${model.route.summary} review-only no command execution no file mutation no model calls no provider calls no connector calls no runtime execution no adapter execution no hidden approvals`}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={devBadge}>{model.route.devOnly ? "Dev/test surface only" : "Preferred normal user cockpit"}</span>
        </div>
        <h1 style={title}>{model.route.title}</h1>
        <p style={summary}>{model.route.summary}</p>
        <p style={safetyLead}>
          Normal operation should happen in this cockpit. Phase pages are dev/test surfaces only. File writes remain
          blocked until explicit operator approval. Commands remain blocked until explicit operator approval.
        </p>
      </header>
      <section style={noticeBand} aria-label="Unified cockpit safety boundary">
        {model.globalSafetyCopy.map((copy, index) => (
          <p key={buildUnifiedCockpitStableKey(["global-safety", model.route.slug, String(index)])} style={noticeText}>
            {copy}
          </p>
        ))}
      </section>
      <section style={markerBand} aria-label="Page-level cockpit markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span key={buildUnifiedCockpitStableKey(["marker", model.route.slug, String(index)])} style={markerPill}>
            {marker}
          </span>
        ))}
      </section>
      <section style={splitBand} aria-label="Approval and denied paths">
        <article style={plainPanel}>
          <h2 style={sectionTitle}>Operator Approval Boundary</h2>
          <p style={bodyText}>{model.route.approvalCopy}</p>
        </article>
        <article style={plainPanel}>
          <h2 style={sectionTitle}>Denied Paths</h2>
          <p style={bodyText}>{model.route.deniedCopy}</p>
        </article>
      </section>
      {isMainCockpit ? <CockpitDomainWorkspaceCockpitPanel /> : null}
      {isMainCockpit ? <TradingResearchDomainPackCockpitPanel /> : null}
      {isMainCockpit ? <TradingMandateRiskGovernorCockpitPanel /> : null}
      {isMainCockpit ? <StrategyLabSignalEngineCockpitPanel /> : null}
      {isMainCockpit ? <BacktestPaperTradingEngineCockpitPanel /> : null}
      {isMainCockpit ? <ProfitLockboxReinvestmentRulesCockpitPanel /> : null}
      {isMainCockpit ? <BrokerExecutionBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <PaperBrokerAdapterSimulatorCockpitSummaryPanel /> : null}
      {isMainCockpit ? <PaperTradingResultLedgerCockpitSummaryPanel /> : null}
      {isMainCockpit ? <PaperTradingReviewDashboardCockpitSummaryPanel /> : null}
      {isMainCockpit ? <StrategyPerformanceReviewLoopCockpitSummaryPanel /> : null}
      {isMainCockpit ? <StrategyChangeControlWorkflowCockpitSummaryPanel /> : null}
      {isMainCockpit ? <StrategyVersionReviewRegistryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <PaperStrategyPromotionGateCockpitSummaryPanel /> : null}
      {isMainCockpit ? <PaperTradingEndToEndReviewCockpitSummaryPanel /> : null}
      {isMainCockpit ? <CockpitTradingWorkflowPolishCockpitSummaryPanel /> : null}
      {isMainCockpit ? <ControlledPaperTradingWorkspaceCockpitSummaryPanel /> : null}
      {isMainCockpit ? <VideoCreationDomainCockpitSummaryPanel /> : null}
      {isMainCockpit ? <ScriptAndStoryboardWorkspaceCockpitSummaryPanel /> : null}
      {isMainCockpit ? <AssetAndShotPlanningWorkspaceCockpitSummaryPanel /> : null}
      {isMainCockpit ? <VoiceoverAndCaptionPlanningWorkspaceCockpitSummaryPanel /> : null}
      {isMainCockpit ? <RenderJobBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <VideoReviewAndExportBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <ControlledVideoCreationWorkspaceCockpitSummaryPanel /> : null}
      {isMainCockpit ? <VideoBackendServiceContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <ProviderGatewayContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <AssetStorageContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <AudioStorageContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <RenderQueueContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <WorkerOrchestrationContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <ArtifactExportContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <PublishGatewayContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <ApprovalCaptureContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <RightsConsentAuditContractBoundaryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <FoundationContractsCompletionCandidateCockpitSummaryPanel /> : null}
      {isMainCockpit ? <FirstRealProviderCallGuardCockpitSection /> : null}
      {isMainCockpit ? <ApprovedProviderTrialCockpitSection /> : null}
      {isMainCockpit ? <ProviderResultReviewRecoveryCockpitSection /> : null}
      {isMainCockpit ? <ProviderGatewayHardeningCockpitSection /> : null}
      {isMainCockpit ? <AssetStorageBackendWiringCockpitSection /> : null}
      {isMainCockpit ? <AudioStorageBackendWiringCockpitSection /> : null}
      {isMainCockpit ? <RenderQueueBackendWiringCockpitSection /> : null}
      {isMainCockpit ? <WorkerOrchestrationBackendWiringCockpitSection /> : null}
      {isMainCockpit ? <ArtifactExportBackendWiringCockpitSection /> : null}
      {isMainCockpit ? <PublishGatewayBackendWiringCockpitSection /> : null}
      {isMainCockpit ? <EndToEndVideoCreationDryRunCockpitSection /> : null}
      {isMainCockpit ? <DailyTestableCockpitMvpPanel embedded /> : null}
      {isMainCockpit ? <ProjectContextBrainCockpitSummaryPanel /> : null}
      {isMainCockpit ? <GoalCompilerCockpitSummaryPanel /> : null}
      {isMainCockpit ? <PlanDiffCommandComposerCockpitSummaryPanel /> : null}
      {isMainCockpit ? <EvidenceMemoryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <BackendExecutionQueueCockpitSummaryPanel /> : null}
      {isMainCockpit ? <ApplyRunTransactionCockpitSummaryPanel /> : null}
      {isMainCockpit ? <CommandRunnerSafetyV2CockpitSummaryPanel /> : null}
      {isMainCockpit ? <ReleaseGradeAuditTrailCockpitSummaryPanel /> : null}
      {isMainCockpit ? <ModelRouterV2CockpitSummaryPanel /> : null}
      {isMainCockpit ? <ProviderApprovalGateCockpitSummaryPanel /> : null}
      {isMainCockpit ? <LocalModelBridgeCockpitSummaryPanel /> : null}
      {isMainCockpit ? <SpecialistWorkerRegistryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <GameServerBuilderCockpitSummaryPanel /> : null}
      {isMainCockpit ? <DomainPackRunnerCockpitSummaryPanel /> : null}
      {!isMainCockpit ? (
        <>
          <section style={panelStack} aria-label="Unified cockpit checklist">
            {model.panels.map((panel, panelIndex) => (
              <article key={buildUnifiedCockpitStableKey(["cockpit-panel", model.route.slug, String(panelIndex), panel.id])} style={panelBlock}>
                <div style={panelHeader}>
                  <div>
                    <p style={panelEyebrow}>{panel.eyebrow}</p>
                    <h2 style={panelTitle}>{panel.title}</h2>
                  </div>
                  <span style={stateStyle(panel.state)}>{formatState(panel.state)}</span>
                </div>
                <p style={bodyText}>{panel.body}</p>
                <div style={checklistGrid}>
                  {panel.checklist.map((item, itemIndex) => (
                    <div
                      key={buildUnifiedCockpitStableKey(["checklist-item", panel.id, String(itemIndex), item.id])}
                      style={checklistRow}
                    >
                      <span style={smallStateStyle(item.state)}>{formatState(item.state)}</span>
                      <div>
                        <p style={checkLabel}>{item.label}</p>
                        <p style={checkDetail}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={evidenceRail} aria-label={`${panel.title} evidence placeholders`}>
                  {panel.evidence.map((evidence, evidenceIndex) => (
                    <span key={buildUnifiedCockpitStableKey(["evidence", panel.id, String(evidenceIndex)])} style={evidenceChip}>
                      {evidence}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>
          <section style={integrationBand} aria-label="Guarded spine cockpit integration">
            <h2 style={sectionTitle}>Guarded Spine Integration</h2>
            <p style={bodyText}>
              File-write and command-runner slices feed this cockpit as review/dev surface language only. Future real file
              write or command execution must remain behind explicit operator approval, guards, evidence capture, result
              capture, and recovery contract.
            </p>
            <div style={linkRow}>
              <a style={safeLink} href="/controlled-real-guarded-file-write-mvp-release-candidate">
                Controlled real guarded file-write review
              </a>
              <a style={safeLink} href="/controlled-real-guarded-command-mvp-release-candidate">
                Controlled real guarded command review
              </a>
            </div>
          </section>
          <section style={devDrawer} aria-label="Cockpit dev surface drawer">
            <div style={panelHeader}>
              <div>
                <p style={panelEyebrow}>Dev/test surface drawer</p>
                <h2 style={sectionTitle}>Phase pages are dev/test surfaces only</h2>
              </div>
              <a style={mainCockpitLink} href="/codexforge-cockpit">
                Go to Unified CodexForge Cockpit
              </a>
            </div>
            <p style={bodyText}>
              Dev surface drawer requires explicit operator intent to browse dev/test routes. Normal users should use the
              cockpit instead of phase pages.
            </p>
            <div style={devRouteGrid}>
              {model.devRoutes.map((route, routeIndex) => (
                <a
                  key={buildUnifiedCockpitStableKey(["dev-route", String(routeIndex), route.slug])}
                  style={devRouteLink}
                  href={route.href}
                >
                  <span style={routePhase}>Phase {route.phase}</span>
                  <span style={routeLabel}>{route.label}</span>
                  <span style={routeCommand}>{route.commandLabel}</span>
                </a>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </section>
  );
}
function formatState(state: UnifiedCockpitPanelState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "preview-only") return "Preview only";
  if (state === "dev-test-only") return "Dev/test only";
  return "Blocked";
}
function stateStyle(state: UnifiedCockpitPanelState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "dev-test-only"
          ? devOnlyBadge
          : previewBadge),
  };
}
function smallStateStyle(state: UnifiedCockpitPanelState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "dev-test-only"
          ? devOnlyBadge
          : previewBadge),
  };
}
const page: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 18,
  padding: "28px",
  color: "#172026",
};
const hero: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "4px 0 10px",
};
const eyebrowRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};
const phaseBadge: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #8aa4b8",
  borderRadius: 6,
  padding: "5px 8px",
  fontSize: 12,
  fontWeight: 700,
  color: "#233746",
  background: "#f2f7fa",
};
const devBadge: CSSProperties = {
  ...phaseBadge,
  borderColor: "#c7a553",
  color: "#5c4512",
  background: "#fff7df",
};
const title: CSSProperties = {
  margin: 0,
  fontSize: 34,
  lineHeight: 1.08,
  letterSpacing: 0,
};
const summary: CSSProperties = {
  margin: 0,
  maxWidth: 920,
  fontSize: 18,
  lineHeight: 1.5,
  color: "#344854",
};
const safetyLead: CSSProperties = {
  margin: 0,
  maxWidth: 980,
  fontSize: 15,
  lineHeight: 1.55,
  color: "#4b5f6b",
};
const noticeBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  padding: 14,
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  background: "#f7fbf9",
};
const noticeText: CSSProperties = {
  margin: 0,
  color: "#27423d",
  fontSize: 13,
  lineHeight: 1.45,
};
const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};
const markerPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  border: "1px solid #d8dee4",
  borderRadius: 6,
  padding: "7px 9px",
  background: "#ffffff",
  color: "#2f3b43",
  fontSize: 12,
  lineHeight: 1.3,
};
const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
};
const plainPanel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
};
const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};
const bodyText: CSSProperties = {
  margin: "8px 0 0",
  color: "#425563",
  fontSize: 14,
  lineHeight: 1.55,
};
const targetBand: CSSProperties = {
  borderTop: "1px solid #e1e7ec",
  borderBottom: "1px solid #e1e7ec",
  padding: "16px 0",
};
const targetGrid: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 12,
};
const targetPill: CSSProperties = {
  border: "1px solid #c9d7e3",
  borderRadius: 6,
  padding: "7px 9px",
  background: "#f6f9fc",
  color: "#223645",
  fontSize: 13,
};
const panelStack: CSSProperties = {
  display: "grid",
  gap: 14,
};
const panelBlock: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
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
  color: "#60717d",
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0,
};
const panelTitle: CSSProperties = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.25,
  letterSpacing: 0,
};
const stateBadge: CSSProperties = {
  border: "1px solid",
  borderRadius: 6,
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
  borderColor: "#d29a9a",
  background: "#fff3f1",
  color: "#7d2c26",
};
const approvalBadge: CSSProperties = {
  borderColor: "#c7a553",
  background: "#fff8e6",
  color: "#5c4512",
};
const previewBadge: CSSProperties = {
  borderColor: "#9db8d0",
  background: "#eef6fc",
  color: "#244862",
};
const devOnlyBadge: CSSProperties = {
  borderColor: "#a8aeb8",
  background: "#f4f5f7",
  color: "#3f4852",
};
const checklistGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
  marginTop: 14,
};
const checklistRow: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  borderTop: "1px solid #edf1f4",
  paddingTop: 10,
};
const checkLabel: CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 700,
  color: "#263640",
};
const checkDetail: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 13,
  lineHeight: 1.45,
  color: "#5a6a76",
};
const evidenceRail: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 14,
};
const evidenceChip: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #d8dee4",
  borderRadius: 6,
  padding: "6px 8px",
  background: "#fbfcfd",
  color: "#40505c",
  fontSize: 12,
};
const integrationBand: CSSProperties = {
  border: "1px solid #cddbd7",
  borderRadius: 8,
  padding: 16,
  background: "#f8fbfa",
};
const linkRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 12,
};
const safeLink: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #b7c9d7",
  borderRadius: 6,
  padding: "8px 10px",
  color: "#164666",
  background: "#ffffff",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 700,
};
const devDrawer: CSSProperties = {
  borderTop: "2px solid #d8dee4",
  paddingTop: 16,
};
const mainCockpitLink: CSSProperties = {
  ...safeLink,
  borderColor: "#8fb6a7",
  color: "#1f5947",
};
const devRouteGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 14,
};
const devRouteLink: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minHeight: 92,
  justifyContent: "center",
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 12,
  background: "#ffffff",
  color: "#24333d",
  textDecoration: "none",
};
const routePhase: CSSProperties = {
  color: "#677783",
  fontSize: 12,
  fontWeight: 700,
};
const routeLabel: CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
};
const routeCommand: CSSProperties = {
  color: "#51626e",
  fontSize: 12,
  lineHeight: 1.35,
};




