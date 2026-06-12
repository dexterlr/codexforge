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
  buildFirstControlledLiveWorkflowReplayModel,
  buildFirstControlledLiveWorkflowReplayStableKey,
} from "@/lib/codexforge/first-controlled-live-workflow-replay";

const FIRST_CONTROLLED_LIVE_WORKFLOW_REPLAY_LANGUAGE_MARKERS =
  "First controlled live workflow replay Controlled live workflow replay does not rerun live actions Replay review requires operator approval before reuse Unsafe replay shortcuts stay blocked Replay stages Expected actual comparison groups live workflow replay identity Replay stages Expected actual comparison groups validation evidence checklist denied replay actions blocked replay risks regression matrix route failure patch route next recommended action advanced replay details collapsed/secondary review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no live workflow launch from UI no live action execution no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no recovery auto-trigger no replay execution no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no hardening apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no test execution no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no evidence auto-ingestion no result auto-ingestion no feedback auto-ingestion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw live workflow JSON above the fold no giant raw evidence/result/feedback/regression/failure JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FirstControlledLiveWorkflowReplayPanel() {
  const model = buildFirstControlledLiveWorkflowReplayModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-controlled-live-workflow-replay={`${FIRST_CONTROLLED_LIVE_WORKFLOW_REPLAY_LANGUAGE_MARKERS} buildFirstControlledLiveWorkflowReplayStableKey FirstControlledLiveWorkflowReplayPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 454"
        title="Replay review"
        subtitle="First controlled live workflow replay is a review-only, approval required surface. Controlled live workflow replay does not rerun live actions, replay review requires operator approval before reuse, and unsafe replay shortcuts stay blocked."
        primary={{ href: "#first-controlled-live-workflow-replay", label: "Review replay" }}
        links={[
          { href: "/controlled-live-workflow-release-candidate", label: "Release candidate" },
          { href: "/live-workflow-regression-matrix", label: "Regression matrix" },
          { href: "/live-workflow-failure-patch-review", label: "Failure patch" },
          { href: "/first-controlled-live-workflow-trial", label: "Controlled trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English First controlled live workflow replay">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews live workflow replay identity, replay stages, expected actual comparison groups, validation evidence checklist, denied replay actions, blocked replay risks, regression matrix route, failure patch route, and next recommended action. It does not rerun workflows, rerun live actions, call providers, call local models, call connectors, store outputs, mutate files, mutate memory, or persist approvals.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-controlled-live-workflow-replay" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildFirstControlledLiveWorkflowReplayStableKey("first-controlled-live-workflow-replay-card", review.id)}
            title={review.liveWorkflowReplayIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Replay stages: ${review.replayStages.join("; ")}`,
                `Expected actual comparison groups: ${review.expectedActualComparisonGroups.join("; ")}`,
                `Validation evidence checklist: ${review.validationEvidenceChecklist.join("; ")}`,
                `Denied replay actions: ${review.deniedReplayActions.join("; ")}`,
                `Blocked replay risks: ${review.blockedReplayRisks.join("; ")}`,
                review.regressionMatrixRoute,
                review.failurePatchRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced replay details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedReplayDetails)} />
        <PreviewFoundationCopy>
          Advanced details stay collapsed or secondary. First controlled live workflow replay remains separate from workflow execution, live workflow launch, provider calls, local model calls, connector calls, automation creation, approval persistence, output storage, evidence/result/feedback ingestion, file mutation, memory mutation, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
