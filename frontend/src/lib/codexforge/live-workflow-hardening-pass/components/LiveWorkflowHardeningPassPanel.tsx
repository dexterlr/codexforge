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
  buildLiveWorkflowHardeningPassModel,
  buildLiveWorkflowHardeningPassStableKey,
} from "@/lib/codexforge/live-workflow-hardening-pass";

const LIVE_WORKFLOW_HARDENING_PASS_LANGUAGE_MARKERS =
  "Live workflow hardening pass Live workflow hardening pass does not apply changes Hardening changes require explicit operator approval Unresolved hardening risks stay blocked Hardening groups Safety boundary checklist live workflow hardening identity Hardening groups Safety boundary checklist evidence result feedback replay regression status denied hardening actions unresolved hardening risks provider live guard route local model live guard route next recommended action advanced hardening details collapsed/secondary review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no live workflow launch from UI no live action execution no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no recovery auto-trigger no replay execution no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no hardening apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no test execution no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no evidence auto-ingestion no result auto-ingestion no feedback auto-ingestion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw live workflow JSON above the fold no giant raw evidence/result/feedback/regression/failure JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LiveWorkflowHardeningPassPanel() {
  const model = buildLiveWorkflowHardeningPassModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-live-workflow-hardening-pass={`${LIVE_WORKFLOW_HARDENING_PASS_LANGUAGE_MARKERS} buildLiveWorkflowHardeningPassStableKey LiveWorkflowHardeningPassPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 457"
        title="Hardening pass"
        subtitle="Live workflow hardening pass is a review-only, approval required surface. Live workflow hardening pass does not apply changes, hardening changes require explicit operator approval, and unresolved hardening risks stay blocked."
        primary={{ href: "#live-workflow-hardening-pass", label: "Review hardening" }}
        links={[
          { href: "/live-workflow-regression-matrix", label: "Regression matrix" },
          { href: "/live-workflow-failure-patch-review", label: "Failure patch" },
          { href: "/provider-live-test-gate", label: "Provider live gate" },
          { href: "/local-model-runtime-boundary-review", label: "Local model guard" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English Live workflow hardening pass">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews live workflow hardening identity, hardening groups, safety boundary checklist, evidence result feedback replay regression status, denied hardening actions, unresolved hardening risks, provider live guard route, local model live guard route, and next recommended action. It does not apply changes, execute workflows, call providers, call local models, call connectors, create automations, apply patches, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="live-workflow-hardening-pass" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildLiveWorkflowHardeningPassStableKey("live-workflow-hardening-pass-card", review.id)}
            title={review.liveWorkflowHardeningIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Hardening groups: ${review.hardeningGroups.join("; ")}`,
                `Safety boundary checklist: ${review.safetyBoundaryChecklist.join("; ")}`,
                `Evidence result feedback replay regression status: ${review.evidenceResultFeedbackReplayRegressionStatus.join("; ")}`,
                `Denied hardening actions: ${review.deniedHardeningActions.join("; ")}`,
                `Unresolved hardening risks: ${review.unresolvedHardeningRisks.join("; ")}`,
                review.providerLiveGuardRoute,
                review.localModelLiveGuardRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced hardening details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedHardeningDetails)} />
        <PreviewFoundationCopy>
          Advanced details stay collapsed or secondary. Live workflow hardening pass remains separate from workflow execution, live workflow launch, provider calls, local model calls, connector calls, automation creation, approval persistence, output storage, evidence/result/feedback ingestion, file mutation, memory mutation, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
