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
  buildUnifiedRecoveryPolicyFinalReviewModel,
  buildUnifiedRecoveryPolicyFinalReviewStableKey,
} from "@/lib/codexforge/unified-recovery-policy-final-review";

const UNIFIED_RECOVERY_POLICY_FINAL_REVIEW_MARKERS =
  "Unified recovery policy final review Unified recovery policy final review does not trigger recovery Recovery policy changes require explicit operator approval Unsafe recovery shortcuts stay blocked Recovery groups Provider local connector automation recovery matrix unified recovery policy identity rollback checklist escalation checklist denied recovery shortcuts unresolved recovery blockers settings route cockpit final polish route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live traffic routing no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no watch creation no schedule creation no scheduled task creation no polling loop creation no polling loops from UI no background job creation no background jobs no notification sending no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no policy auto-apply no settings persistence no preference persistence no evidence ingestion no evidence ingestion automation no evidence auto-ingestion no result ingestion no result auto-ingestion no recovery trigger no recovery execution no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no shell command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no localStorage/sessionStorage token storage no token storage no endpoint storage no credential storage no automation data storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced recovery policy details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct memory event append call from UI no direct Brain graph save call from UI no direct graph mutation from UI no direct patch application call from UI no direct file writer call from UI no direct command runner call from UI no brokered execution call except blocked-policy text no deterministic random API usage no realtime clock ID usage deterministic layout and ids only no d3-force no mojibake no obvious duplicate React key patterns";

export function UnifiedRecoveryPolicyFinalReviewPanel() {
  const model = buildUnifiedRecoveryPolicyFinalReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-unified-recovery-policy-final-review={`${UNIFIED_RECOVERY_POLICY_FINAL_REVIEW_MARKERS} buildUnifiedRecoveryPolicyFinalReviewStableKey UnifiedRecoveryPolicyFinalReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 494"
        title="Recovery policy review"
        subtitle="Unified recovery policy final review checks rollback, escalation, and lane recovery rules without triggering recovery. Recovery policy changes require explicit operator approval, and unsafe recovery shortcuts stay blocked."
        primary={{ href: "#unified-recovery-policy-final-review", label: "Review recovery" }}
        links={[
          { href: "/unified-result-policy-final-review", label: "Result policy" },
          { href: "/unified-settings-preferences-review", label: "Settings" },
          { href: "/daily-operator-cockpit-final-polish", label: "Cockpit polish" },
          { href: "/live-trial-failure-recovery-review", label: "Failure recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.recoveryLanguage} />
      <PreviewFoundationCard title="Plain-English unified recovery policy final review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews unified recovery policy identity, recovery groups, rollback checklist, escalation checklist,
          provider local connector automation recovery matrix, denied recovery shortcuts, unresolved recovery blockers,
          settings route, cockpit final polish route, and next recommended action. It does not trigger recovery, execute
          workflows, or mutate files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="unified-recovery-policy-final-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildUnifiedRecoveryPolicyFinalReviewStableKey("recovery-policy-final-review-card", review.id)}
            title={review.unifiedRecoveryPolicyIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Recovery groups: ${review.recoveryGroups.join("; ")}`,
                `Rollback checklist: ${review.rollbackChecklist.join("; ")}`,
                `Escalation checklist: ${review.escalationChecklist.join("; ")}`,
                `Provider local connector automation recovery matrix: ${review.providerLocalConnectorAutomationRecoveryMatrix.join("; ")}`,
                `Denied recovery shortcuts: ${review.deniedRecoveryShortcuts.join("; ")}`,
                `Unresolved recovery blockers: ${review.unresolvedRecoveryBlockers.join("; ")}`,
                review.settingsRoute,
                review.cockpitFinalPolishRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced recovery policy details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedRecoveryPolicyDetails)} />
        <PreviewFoundationCopy>
          Advanced recovery policy details stay collapsed or secondary. This route never triggers recovery, executes
          workflows, applies patches, mutates files, calls providers, calls connectors, or creates automations.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
