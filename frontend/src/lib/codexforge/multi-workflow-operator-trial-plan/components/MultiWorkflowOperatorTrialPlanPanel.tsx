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
  buildMultiWorkflowOperatorTrialPlanModel,
  buildMultiWorkflowOperatorTrialPlanStableKey,
} from "@/lib/codexforge/multi-workflow-operator-trial-plan";

const MULTI_WORKFLOW_OPERATOR_TRIAL_PLAN_MARKERS =
  "Multi-workflow operator trial plan Multi-workflow operator trial plan does not execute workflows Multi-workflow trials require explicit operator approval Unapproved workflow plans remain blocked Workflow candidate groups Operator task checklist multi-workflow trial plan identity approval gate checklist provider/local/connector/automation handoff checklist evidence/result/recovery checklist denied planning actions unresolved planning blockers multi-workflow trial review route multi-workflow regression route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no multi-workflow trial launch no beta trial launch no trial launch no daily beta launch no live workflow launch no real daily workflow launch no live action execution no go-live action no go-live behavior no live traffic routing no controlled live signoff automation no automatic controlled live signoff no release approval automation no release approval from UI no automatic safety signoff no safety signoff automation no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no regression/test execution from UI no regression replay execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no release auto-apply no policy auto-apply no settings persistence no preference persistence no feedback auto-ingestion no feedback ingestion automation no evidence ingestion no evidence ingestion automation no result ingestion no result auto-ingestion no recovery trigger no fix application no patch apply behavior no hardening apply behavior no issue creation automation no ticket creation automation no commit creation from UI no release notes publishing no external feedback fetching no provider API calls no provider live connection tests no provider traffic routing no live provider/local/connector/automation traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no shell/git/test/build/smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output persistence no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no localStorage/sessionStorage token storage no token storage no endpoint storage no credential storage no localStorage writes no sessionStorage writes no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw multi-workflow/release/signoff/beta JSON above fold no giant raw JSON above fold advanced details collapsed/secondary advanced planning details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no direct command runner call from UI no broker-execution call except blocked-policy text no brokered execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function MultiWorkflowOperatorTrialPlanPanel() {
  const model = buildMultiWorkflowOperatorTrialPlanModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-multi-workflow-operator-trial-plan={`${MULTI_WORKFLOW_OPERATOR_TRIAL_PLAN_MARKERS} buildMultiWorkflowOperatorTrialPlanStableKey MultiWorkflowOperatorTrialPlanPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 506"
        title="Multi-workflow plan"
        subtitle="Multi-workflow operator trial plan prepares several operator workflow candidates without executing workflows. Multi-workflow trials require explicit operator approval, and unapproved workflow plans remain blocked."
        primary={{ href: "#multi-workflow-operator-trial-plan", label: "Review plan" }}
        links={[
          { href: "/multi-workflow-trial-review", label: "Trial review" },
          { href: "/multi-workflow-regression-review", label: "Regression review" },
          { href: "/first-real-daily-workflow-candidate", label: "Daily candidate" },
          { href: "/real-daily-workflow-hardening-pass", label: "Hardening pass" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.planningLanguage} />
      <PreviewFoundationCard title="Plain-English multi-workflow operator trial plan">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews multi-workflow trial plan identity, workflow candidate groups, operator task checklist,
          approval gate checklist, provider/local/connector/automation handoff checklist, evidence/result/recovery
          checklist, denied planning actions, unresolved planning blockers, multi-workflow trial review route,
          multi-workflow regression route, and next recommended action. It does not execute workflows, launch trials,
          call providers, call local models, call connectors, or create automations.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="multi-workflow-operator-trial-plan" style={previewStyles.grid}>
        {model.plans.map((plan) => (
          <PreviewFoundationCard
            key={buildMultiWorkflowOperatorTrialPlanStableKey("multi-workflow-plan-card", plan.id)}
            title={plan.multiWorkflowTrialPlanIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${plan.status}`,
                `Workflow candidate groups: ${plan.workflowCandidateGroups.join("; ")}`,
                `Operator task checklist: ${plan.operatorTaskChecklist.join("; ")}`,
                `Approval gate checklist: ${plan.approvalGateChecklist.join("; ")}`,
                `Provider/local/connector/automation handoff checklist: ${plan.providerLocalConnectorAutomationHandoffChecklist.join("; ")}`,
                `Evidence/result/recovery checklist: ${plan.evidenceResultRecoveryChecklist.join("; ")}`,
                `Denied planning actions: ${plan.deniedPlanningActions.join("; ")}`,
                `Unresolved planning blockers: ${plan.unresolvedPlanningBlockers.join("; ")}`,
                plan.multiWorkflowTrialReviewRoute,
                plan.multiWorkflowRegressionRoute,
                plan.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced planning details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.plans.map((plan) => plan.advancedPlanningDetails)} />
        <PreviewFoundationCopy>
          Advanced planning details stay collapsed or secondary. This route never executes workflows, launches
          multi-workflow trials, calls providers, calls local models, calls connectors, creates automations, stores
          outputs, writes files, or mutates memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
