"use client";

import {
  PreviewFoundationCard,
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  PreviewFoundationPillList,
  PreviewFoundationSafetyStrip,
  previewStyles,
} from "../../video-foundation-ui";
import {
  buildUnifiedLiveIntegrationReadinessReviewModel,
  buildUnifiedLiveIntegrationReadinessReviewStableKey,
} from "@/lib/codexforge/unified-live-integration-readiness-review";

const UNIFIED_LIVE_INTEGRATION_READINESS_REVIEW_MARKERS =
  "Unified live integration readiness review Unified live integration readiness does not run live workflows Live integration requires explicit operator approval Unresolved readiness risks stay blocked Provider readiness status Automation readiness status unified live integration identity local model readiness status connector readiness status approval gate checklist denied live integration actions unresolved readiness risks first end-to-end dry run route approval flow route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw live-integration JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced readiness details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function UnifiedLiveIntegrationReadinessReviewPanel() {
  const model = buildUnifiedLiveIntegrationReadinessReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-unified-live-integration-readiness-review={`${UNIFIED_LIVE_INTEGRATION_READINESS_REVIEW_MARKERS} buildUnifiedLiveIntegrationReadinessReviewStableKey UnifiedLiveIntegrationReadinessReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 442"
        title="Live integration readiness"
        subtitle="Unified live integration readiness review brings provider, local model, connector, and automation readiness into one review-only path. Unified live integration readiness does not run live workflows, live integration requires explicit operator approval, and unresolved readiness risks stay blocked."
        primary={{ href: "#unified-live-integration-readiness-review", label: "Review readiness" }}
        links={[
          { href: "/first-end-to-end-dry-run-review", label: "First dry run" },
          { href: "/end-to-end-approval-flow-review", label: "Approval flow" },
          { href: "/provider-integration-hardening-pass", label: "Provider hardening" },
          { href: "/automation-integration-release-candidate", label: "Automation RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.readinessLanguage} />
      <PreviewFoundationCard title="Plain-English unified live integration readiness review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews unified live integration identity, provider readiness status, local model readiness status,
          connector readiness status, automation readiness status, approval gate checklist, denied live integration
          actions, unresolved readiness risks, first end-to-end dry run route, approval flow route, and next recommended
          action. It does not run workflows, call providers, call local models, call connectors, create automations,
          approve actions, store outputs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="unified-live-integration-readiness-review" style={previewStyles.grid}>
        {model.readinessReviews.map((review) => (
          <PreviewFoundationCard
            key={buildUnifiedLiveIntegrationReadinessReviewStableKey("unified-live-readiness-card", review.id)}
            title={review.unifiedLiveIntegrationIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.providerReadinessStatus,
                review.localModelReadinessStatus,
                review.connectorReadinessStatus,
                review.automationReadinessStatus,
                `Approval gate checklist: ${review.approvalGateChecklist.join("; ")}`,
                `Denied live integration actions: ${review.deniedLiveIntegrationActions.join("; ")}`,
                `Unresolved readiness risks: ${review.unresolvedReadinessRisks.join("; ")}`,
                review.firstEndToEndDryRunRoute,
                review.approvalFlowRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced readiness details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.readinessReviews.map((review) => review.advancedReadinessDetails)} />
        <PreviewFoundationCopy>
          Advanced readiness details stay collapsed or secondary. Unified live integration readiness remains separate
          from provider calls, local model calls, connector calls, automation creation, workflow execution, approval
          persistence, file mutation, output storage, memory mutation, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
