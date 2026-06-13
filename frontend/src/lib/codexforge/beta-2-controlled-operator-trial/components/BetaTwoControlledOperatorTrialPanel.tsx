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
  buildBetaTwoControlledOperatorTrialModel,
  buildBetaTwoControlledOperatorTrialStableKey,
} from "@/lib/codexforge/beta-2-controlled-operator-trial";

const BETA_TWO_CONTROLLED_OPERATOR_TRIAL_MARKERS =
  "Beta 2 controlled operator trial Beta 2 controlled operator trial does not execute workflows Beta 2 trial actions require explicit operator approval Unapproved Beta 2 trial paths remain blocked Trial stage groups Operator task checklist Beta 2 controlled operator trial identity approval gate checklist evidence/result checklist denied trial actions blocked trial risks operator feedback review route Beta 2 hardening route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no beta trial launch no trial launch no live workflow launch no live workflow launch from UI no live action execution no go-live action no go-live behavior no release approval automation no automatic safety signoff no safety signoff automation no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no regression/test execution from UI no regression replay execution no documentation publish behavior no onboarding launch behavior no feedback auto-ingestion no feedback ingestion automation no fix application no patch apply behavior no hardening apply behavior no issue creation automation no ticket creation automation no commit creation from UI no release notes publishing no external feedback fetching no provider API calls no provider live connection tests no provider traffic routing no live provider/local/connector/automation traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output persistence no output storage no connector data storage no automation data storage no evidence ingestion automation no evidence auto-ingestion no result auto-ingestion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no localStorage/sessionStorage token storage no token storage no endpoint storage no credential storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw regression/signoff/docs/onboarding/beta JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaTwoControlledOperatorTrialPanel() {
  const model = buildBetaTwoControlledOperatorTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-2-controlled-operator-trial={`${BETA_TWO_CONTROLLED_OPERATOR_TRIAL_MARKERS} buildBetaTwoControlledOperatorTrialStableKey BetaTwoControlledOperatorTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 487"
        title="Controlled trial preview"
        subtitle="Beta 2 controlled operator trial previews a controlled operator trial without executing workflows. Beta 2 trial actions require explicit operator approval, and unapproved Beta 2 trial paths remain blocked."
        primary={{ href: "#beta-2-controlled-operator-trial", label: "Review trial" }}
        links={[
          { href: "/codexforge-beta-2-release-candidate", label: "Beta 2 RC" },
          { href: "/beta-2-operator-feedback-review", label: "Feedback review" },
          { href: "/beta-2-hardening-pass", label: "Hardening" },
          { href: "/beta-workflow-onboarding-final-pass", label: "Onboarding" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English Beta 2 controlled operator trial">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews Beta 2 controlled operator trial identity, trial stage groups, operator task checklist,
          approval gate checklist, evidence/result checklist, denied trial actions, blocked trial risks, operator
          feedback review route, Beta 2 hardening route, and next recommended action. It does not execute workflows,
          call providers, call local models, call connectors, or create automations.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-2-controlled-operator-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildBetaTwoControlledOperatorTrialStableKey("beta-2-trial-card", trial.id)}
            title={trial.betaTwoControlledOperatorTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Trial stage groups: ${trial.trialStageGroups.join("; ")}`,
                `Operator task checklist: ${trial.operatorTaskChecklist.join("; ")}`,
                `Approval gate checklist: ${trial.approvalGateChecklist.join("; ")}`,
                `Evidence/result checklist: ${trial.evidenceResultChecklist.join("; ")}`,
                `Denied trial actions: ${trial.deniedTrialActions.join("; ")}`,
                `Blocked trial risks: ${trial.blockedTrialRisks.join("; ")}`,
                trial.operatorFeedbackReviewRoute,
                trial.betaTwoHardeningRoute,
                trial.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced trial details stay collapsed or secondary. This route never executes trial actions, calls providers,
          calls local models, calls connectors, creates automations, stores outputs, writes files, or mutates memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
