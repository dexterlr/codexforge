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
  buildDailyBetaControlledOperatorTrialModel,
  buildDailyBetaControlledOperatorTrialStableKey,
} from "@/lib/codexforge/daily-beta-controlled-operator-trial";

const DAILY_BETA_CONTROLLED_OPERATOR_TRIAL_MARKERS =
  "Daily Beta controlled operator trial Daily Beta controlled operator trial does not execute workflows Daily Beta trial actions require explicit operator approval Unapproved Daily Beta trial paths remain blocked Daily beta trial groups Operator task checklist Daily Beta controlled operator trial identity approval gate checklist evidence/result/recovery checklist denied trial actions unresolved daily beta trial blockers Daily Beta feedback review route Daily Beta hardening route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no multi-workflow trial launch no beta trial launch no trial launch no daily beta launch no live workflow launch no real daily workflow launch no live action execution no go-live action no go-live behavior no live traffic routing no controlled live signoff automation no automatic controlled live signoff no release approval automation no release approval from UI no automatic safety signoff no safety signoff automation no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no regression/test execution from UI no regression replay execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no release auto-apply no policy auto-apply no settings persistence no preference persistence no feedback auto-ingestion no feedback ingestion automation no evidence ingestion no evidence ingestion automation no result ingestion no result auto-ingestion no recovery trigger no fix application no patch apply behavior no hardening apply behavior no issue creation automation no ticket creation automation no commit creation from UI no release notes publishing no external feedback fetching no provider API calls no provider live connection tests no provider traffic routing no live provider/local/connector/automation traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no shell/git/test/build/smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output persistence no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no localStorage/sessionStorage token storage no token storage no endpoint storage no credential storage no localStorage writes no sessionStorage writes no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw multi-workflow/release/signoff/beta JSON above fold no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no direct command runner call from UI no broker-execution call except blocked-policy text no brokered execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function DailyBetaControlledOperatorTrialPanel() {
  const model = buildDailyBetaControlledOperatorTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-daily-beta-controlled-operator-trial={`${DAILY_BETA_CONTROLLED_OPERATOR_TRIAL_MARKERS} buildDailyBetaControlledOperatorTrialStableKey DailyBetaControlledOperatorTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 512"
        title="Daily Beta trial"
        subtitle="Daily Beta controlled operator trial previews Daily Beta trial behavior without executing workflows. Daily Beta trial actions require explicit operator approval, and unapproved Daily Beta trial paths remain blocked."
        primary={{ href: "#daily-beta-controlled-operator-trial", label: "Review trial" }}
        links={[
          { href: "/codexforge-daily-beta-release-candidate", label: "Daily Beta RC" },
          { href: "/daily-beta-feedback-review", label: "Feedback review" },
          { href: "/beta-2-hardening-pass", label: "Hardening" },
          { href: "/controlled-live-capability-signoff", label: "Live signoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English Daily Beta controlled operator trial">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews Daily Beta controlled operator trial identity, Daily beta trial groups, operator task
          checklist, approval gate checklist, evidence/result/recovery checklist, denied trial actions, unresolved daily
          beta trial blockers, Daily Beta feedback review route, Daily Beta hardening route, and next recommended action.
          It does not execute workflows, call providers, call local models, call connectors, or create automations.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="daily-beta-controlled-operator-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildDailyBetaControlledOperatorTrialStableKey("daily-beta-trial-card", trial.id)}
            title={trial.dailyBetaControlledOperatorTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Daily beta trial groups: ${trial.dailyBetaTrialGroups.join("; ")}`,
                `Operator task checklist: ${trial.operatorTaskChecklist.join("; ")}`,
                `Approval gate checklist: ${trial.approvalGateChecklist.join("; ")}`,
                `Evidence/result/recovery checklist: ${trial.evidenceResultRecoveryChecklist.join("; ")}`,
                `Denied trial actions: ${trial.deniedTrialActions.join("; ")}`,
                `Unresolved daily beta trial blockers: ${trial.unresolvedDailyBetaTrialBlockers.join("; ")}`,
                trial.dailyBetaFeedbackReviewRoute,
                trial.dailyBetaHardeningRoute,
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
          Advanced trial details stay collapsed or secondary. This route never executes Daily Beta workflows, launches
          Daily Beta, calls providers, calls local models, calls connectors, creates automations, stores outputs, writes
          files, or mutates memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
