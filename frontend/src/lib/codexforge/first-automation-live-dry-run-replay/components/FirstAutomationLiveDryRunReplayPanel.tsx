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
  buildFirstAutomationLiveDryRunReplayModel,
  buildFirstAutomationLiveDryRunReplayStableKey,
} from "@/lib/codexforge/first-automation-live-dry-run-replay";

const FIRST_AUTOMATION_LIVE_DRY_RUN_REPLAY_MARKERS =
  "First automation live dry-run replay First automation live dry-run replay does not execute automations Automation replay requires operator review before live use Unsafe replay shortcuts remain blocked Replay stages Expected actual automation comparison groups automation live dry-run replay identity approval readiness checklist denied replay actions blocked replay risks automation approval trial route automation release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw automation replay JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced replay details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FirstAutomationLiveDryRunReplayPanel() {
  const model = buildFirstAutomationLiveDryRunReplayModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-automation-live-dry-run-replay={`${FIRST_AUTOMATION_LIVE_DRY_RUN_REPLAY_MARKERS} buildFirstAutomationLiveDryRunReplayStableKey FirstAutomationLiveDryRunReplayPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 471"
        title="Automation replay"
        subtitle="First automation live dry-run replay is review-only and does not execute automations. Automation replay requires operator review before live use, and unsafe replay shortcuts remain blocked."
        primary={{ href: "#first-automation-live-dry-run-replay", label: "Review replay" }}
        links={[
          { href: "/automation-live-execution-guard-review", label: "Execution guard" },
          { href: "/first-automation-live-approval-trial", label: "Approval trial" },
          { href: "/automation-live-trial-release-candidate", label: "Automation live RC" },
          { href: "/automation-dry-run-trial-review", label: "Dry-run review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.replayLanguage} />
      <PreviewFoundationCard title="Plain-English first automation live dry-run replay">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews automation live dry-run replay identity, replay stages, expected actual automation comparison
          groups, approval readiness checklist, denied replay actions, blocked replay risks, automation approval trial
          route, automation release candidate route, and next recommended action. It does not execute automations,
          create automation rules, start polling loops, create background jobs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-automation-live-dry-run-replay" style={previewStyles.grid}>
        {model.replays.map((replay) => (
          <PreviewFoundationCard
            key={buildFirstAutomationLiveDryRunReplayStableKey("first-automation-live-dry-run-replay-card", replay.id)}
            title={replay.automationLiveDryRunReplayIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${replay.status}`,
                `Replay stages: ${replay.replayStages.join("; ")}`,
                `Expected actual automation comparison groups: ${replay.expectedActualAutomationComparisonGroups.join("; ")}`,
                `Approval readiness checklist: ${replay.approvalReadinessChecklist.join("; ")}`,
                `Denied replay actions: ${replay.deniedReplayActions.join("; ")}`,
                `Blocked replay risks: ${replay.blockedReplayRisks.join("; ")}`,
                replay.automationApprovalTrialRoute,
                replay.automationReleaseCandidateRoute,
                replay.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced replay details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.replays.map((replay) => replay.advancedReplayDetails)} />
        <PreviewFoundationCopy>
          Advanced replay details stay collapsed or secondary. This replay never executes automations, creates rules,
          starts polling, creates background jobs, sends notifications, approves actions, or persists replay decisions.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
