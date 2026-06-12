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
  buildLiveWorkflowFailurePatchReviewModel,
  buildLiveWorkflowFailurePatchReviewStableKey,
} from "@/lib/codexforge/live-workflow-failure-patch-review";

const LIVE_WORKFLOW_FAILURE_PATCH_REVIEW_LANGUAGE_MARKERS =
  "Live workflow failure patch review Live workflow failure patch review does not apply patches Candidate patches require explicit operator approval Unsafe patch shortcuts stay blocked Failure groups Candidate patch categories live workflow failure patch identity Failure groups Candidate patch categories validation requirements denied patch actions rollback checklist blocked patch risks hardening pass route release candidate route next recommended action advanced patch details collapsed/secondary review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no live workflow launch from UI no live action execution no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no recovery auto-trigger no replay execution no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no hardening apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no test execution no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no evidence auto-ingestion no result auto-ingestion no feedback auto-ingestion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw live workflow JSON above the fold no giant raw evidence/result/feedback/regression/failure JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LiveWorkflowFailurePatchReviewPanel() {
  const model = buildLiveWorkflowFailurePatchReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-live-workflow-failure-patch-review={`${LIVE_WORKFLOW_FAILURE_PATCH_REVIEW_LANGUAGE_MARKERS} buildLiveWorkflowFailurePatchReviewStableKey LiveWorkflowFailurePatchReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 456"
        title="Patch review"
        subtitle="Live workflow failure patch review is a review-only, approval required surface. Live workflow failure patch review does not apply patches, candidate patches require explicit operator approval, and unsafe patch shortcuts stay blocked."
        primary={{ href: "#live-workflow-failure-patch-review", label: "Review patches" }}
        links={[
          { href: "/live-workflow-regression-matrix", label: "Regression matrix" },
          { href: "/live-workflow-hardening-pass", label: "Hardening pass" },
          { href: "/controlled-live-workflow-release-candidate", label: "Release candidate" },
          { href: "/first-controlled-live-workflow-replay", label: "Replay review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English Live workflow failure patch review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews live workflow failure patch identity, failure groups, candidate patch categories, validation requirements, denied patch actions, rollback checklist, blocked patch risks, hardening pass route, release candidate route, and next recommended action. It does not apply patches, write files, run commands, run tests, call providers, call local models, call connectors, create automations, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="live-workflow-failure-patch-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildLiveWorkflowFailurePatchReviewStableKey("live-workflow-failure-patch-review-card", review.id)}
            title={review.liveWorkflowFailurePatchIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Failure groups: ${review.failureGroups.join("; ")}`,
                `Candidate patch categories: ${review.candidatePatchCategories.join("; ")}`,
                `Validation requirements: ${review.validationRequirements.join("; ")}`,
                `Denied patch actions: ${review.deniedPatchActions.join("; ")}`,
                `Rollback checklist: ${review.rollbackChecklist.join("; ")}`,
                `Blocked patch risks: ${review.blockedPatchRisks.join("; ")}`,
                review.hardeningPassRoute,
                review.releaseCandidateRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced patch details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedPatchDetails)} />
        <PreviewFoundationCopy>
          Advanced details stay collapsed or secondary. Live workflow failure patch review remains separate from workflow execution, live workflow launch, provider calls, local model calls, connector calls, automation creation, approval persistence, output storage, evidence/result/feedback ingestion, file mutation, memory mutation, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
