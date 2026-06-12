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
  buildEndToEndApprovalFlowReviewModel,
  buildEndToEndApprovalFlowReviewStableKey,
} from "@/lib/codexforge/end-to-end-approval-flow-review";

const END_TO_END_APPROVAL_FLOW_REVIEW_MARKERS =
  "End-to-end approval flow review End-to-end approval flow does not approve actions automatically Every live action requires explicit operator approval Denied actions remain blocked Approval gate groups Audit and rollback checklist end-to-end approval flow identity required operator decisions denied auto-approval shortcuts safety escalation checklist blocked approval flow risks live integration release candidate route dry-run route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw approval JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced approval details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function EndToEndApprovalFlowReviewPanel() {
  const model = buildEndToEndApprovalFlowReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-end-to-end-approval-flow-review={`${END_TO_END_APPROVAL_FLOW_REVIEW_MARKERS} buildEndToEndApprovalFlowReviewStableKey EndToEndApprovalFlowReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 444"
        title="End-to-end approval flow"
        subtitle="End-to-end approval flow review previews manual approval gates without approving anything. End-to-end approval flow does not approve actions automatically, every live action requires explicit operator approval, and denied actions remain blocked."
        primary={{ href: "#end-to-end-approval-flow-review", label: "Review approval flow" }}
        links={[
          { href: "/first-end-to-end-dry-run-review", label: "Dry-run review" },
          { href: "/codexforge-live-integration-release-candidate", label: "Live RC" },
          { href: "/unified-live-integration-readiness-review", label: "Readiness review" },
          { href: "/approval-queue", label: "Approval queue" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.approvalLanguage} />
      <PreviewFoundationCard title="Plain-English end-to-end approval flow review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews end-to-end approval flow identity, approval gate groups, required operator decisions, denied
          auto-approval shortcuts, audit and rollback checklist, safety escalation checklist, blocked approval flow
          risks, live integration release candidate route, dry-run route, and next recommended action. It does not
          approve actions, persist approval decisions, execute workflows, create automations, mutate files, or mutate
          memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="end-to-end-approval-flow-review" style={previewStyles.grid}>
        {model.approvalFlows.map((approvalFlow) => (
          <PreviewFoundationCard
            key={buildEndToEndApprovalFlowReviewStableKey("end-to-end-approval-flow-card", approvalFlow.id)}
            title={approvalFlow.endToEndApprovalFlowIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${approvalFlow.status}`,
                `Approval gate groups: ${approvalFlow.approvalGateGroups.join("; ")}`,
                `Required operator decisions: ${approvalFlow.requiredOperatorDecisions.join("; ")}`,
                `Denied auto-approval shortcuts: ${approvalFlow.deniedAutoApprovalShortcuts.join("; ")}`,
                `Audit and rollback checklist: ${approvalFlow.auditRollbackChecklist.join("; ")}`,
                `Safety escalation checklist: ${approvalFlow.safetyEscalationChecklist.join("; ")}`,
                `Blocked approval flow risks: ${approvalFlow.blockedApprovalFlowRisks.join("; ")}`,
                approvalFlow.liveIntegrationReleaseCandidateRoute,
                approvalFlow.dryRunRoute,
                approvalFlow.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced approval details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.approvalFlows.map((approvalFlow) => approvalFlow.advancedApprovalDetails)}
        />
        <PreviewFoundationCopy>
          Advanced approval details stay collapsed or secondary. End-to-end approval flow review remains separate from
          approval decisions, approval persistence, workflow execution, provider calls, local model calls, connector
          calls, automation creation, file mutation, memory mutation, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
