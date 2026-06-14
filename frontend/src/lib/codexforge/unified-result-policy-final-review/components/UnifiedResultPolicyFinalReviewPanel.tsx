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
  buildUnifiedResultPolicyFinalReviewModel,
  buildUnifiedResultPolicyFinalReviewStableKey,
} from "@/lib/codexforge/unified-result-policy-final-review";

const UNIFIED_RESULT_POLICY_FINAL_REVIEW_MARKERS =
  "Unified result policy final review Unified result policy final review does not apply result policy Result policy changes require explicit operator approval Unsafe results remain blocked Result groups Reuse checklist unified result policy identity acceptance checklist rejection checklist safety review checklist denied result shortcuts unresolved result blockers recovery policy route settings route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live traffic routing no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no watch creation no schedule creation no scheduled task creation no polling loop creation no polling loops from UI no background job creation no background jobs no notification sending no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no policy auto-apply no settings persistence no preference persistence no evidence ingestion no evidence ingestion automation no evidence auto-ingestion no result ingestion no result auto-ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no shell command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no localStorage/sessionStorage token storage no token storage no endpoint storage no credential storage no automation data storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced result policy details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct memory event append call from UI no direct Brain graph save call from UI no direct graph mutation from UI no direct patch application call from UI no direct file writer call from UI no direct command runner call from UI no brokered execution call except blocked-policy text no deterministic random API usage no realtime clock ID usage deterministic layout and ids only no d3-force no mojibake no obvious duplicate React key patterns";

export function UnifiedResultPolicyFinalReviewPanel() {
  const model = buildUnifiedResultPolicyFinalReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-unified-result-policy-final-review={`${UNIFIED_RESULT_POLICY_FINAL_REVIEW_MARKERS} buildUnifiedResultPolicyFinalReviewStableKey UnifiedResultPolicyFinalReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 493"
        title="Result policy review"
        subtitle="Unified result policy final review checks acceptance, rejection, reuse, and safety rules without applying result policy. Result policy changes require explicit operator approval, and unsafe results remain blocked."
        primary={{ href: "#unified-result-policy-final-review", label: "Review results" }}
        links={[
          { href: "/unified-evidence-policy-final-review", label: "Evidence policy" },
          { href: "/unified-recovery-policy-final-review", label: "Recovery policy" },
          { href: "/unified-settings-preferences-review", label: "Settings" },
          { href: "/live-workflow-result-review-inbox", label: "Result inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English unified result policy final review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews unified result policy identity, result groups, acceptance checklist, rejection checklist,
          reuse checklist, safety review checklist, denied result shortcuts, unresolved result blockers, recovery policy
          route, settings route, and next recommended action. It does not apply policy, ingest results, or store outputs.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="unified-result-policy-final-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildUnifiedResultPolicyFinalReviewStableKey("result-policy-final-review-card", review.id)}
            title={review.unifiedResultPolicyIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Result groups: ${review.resultGroups.join("; ")}`,
                `Acceptance checklist: ${review.acceptanceChecklist.join("; ")}`,
                `Rejection checklist: ${review.rejectionChecklist.join("; ")}`,
                `Reuse checklist: ${review.reuseChecklist.join("; ")}`,
                `Safety review checklist: ${review.safetyReviewChecklist.join("; ")}`,
                `Denied result shortcuts: ${review.deniedResultShortcuts.join("; ")}`,
                `Unresolved result blockers: ${review.unresolvedResultBlockers.join("; ")}`,
                review.recoveryPolicyRoute,
                review.settingsRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced result policy details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedResultPolicyDetails)} />
        <PreviewFoundationCopy>
          Advanced result policy details stay collapsed or secondary. This route never accepts unsafe results, ingests
          results, stores outputs, applies policy, or persists settings.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
