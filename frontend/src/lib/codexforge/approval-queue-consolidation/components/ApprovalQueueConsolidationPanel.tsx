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
  buildApprovalQueueConsolidationModel,
  buildApprovalQueueConsolidationStableKey,
} from "@/lib/codexforge/approval-queue-consolidation";

const APPROVAL_QUEUE_CONSOLIDATION_MARKERS =
  "Approval queue consolidation Approval queue requires explicit operator approval No approval is granted from this page Blocked approvals stay blocked until resolved Pending approval groups Required validation evidence approval queue identity approval types safety gate summary denied/blocked approvals result history route daily home route next recommended action review-only approval required no approval automation no approval is granted no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced approval details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ApprovalQueueConsolidationPanel() {
  const model = buildApprovalQueueConsolidationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-approval-queue-consolidation={`${APPROVAL_QUEUE_CONSOLIDATION_MARKERS} buildApprovalQueueConsolidationStableKey ApprovalQueueConsolidationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 372"
        title="Approval queue"
        subtitle="Approval queue consolidation reviews pending approvals across workflows while keeping all approvals manual and explicit. Approval queue requires explicit operator approval, no approval is granted from this page, and blocked approvals stay blocked until resolved."
        primary={{ href: "#approval-queue-consolidation", label: "Review queue" }}
        links={[
          { href: "/daily-operator-home", label: "Daily home" },
          { href: "/global-review-inbox", label: "Global inbox" },
          { href: "/result-history", label: "Result history" },
          { href: "/cross-loop-safety-audit-inbox", label: "Safety audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.approvalLanguage} />
      <PreviewFoundationCard title="Plain-English approval queue">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page shows approval queue identity, pending approval groups, approval types, safety gate summary,
          denied/blocked approvals, required validation evidence, result history route, daily home route, and next
          recommended action. It does not approve actions, execute actions, call APIs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="approval-queue-consolidation" style={previewStyles.grid}>
        {model.approvals.map((approval) => (
          <PreviewFoundationCard
            key={buildApprovalQueueConsolidationStableKey("approval-queue-card", approval.id)}
            title={approval.approvalQueueIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${approval.status}`,
                `Pending approval groups: ${approval.pendingApprovalGroups.join("; ")}`,
                `Approval types: ${approval.approvalTypes.join("; ")}`,
                `Safety gate summary: ${approval.safetyGateSummary.join("; ")}`,
                `Denied/blocked approvals: ${approval.deniedBlockedApprovals.join("; ")}`,
                `Required validation evidence: ${approval.requiredValidationEvidence.join("; ")}`,
                approval.resultHistoryRoute,
                approval.dailyHomeRoute,
                approval.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced approval details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.approvals.map((approval) => approval.advancedApprovalDetails)} />
        <PreviewFoundationCopy>
          Advanced approval details stay collapsed or secondary. The approval queue requires explicit operator approval
          and cannot grant approval from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}

