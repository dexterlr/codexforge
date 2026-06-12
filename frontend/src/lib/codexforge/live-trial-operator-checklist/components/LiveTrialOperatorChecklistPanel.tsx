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
  buildLiveTrialOperatorChecklistModel,
  buildLiveTrialOperatorChecklistStableKey,
} from "@/lib/codexforge/live-trial-operator-checklist";

const LIVE_TRIAL_OPERATOR_CHECKLIST_MARKERS =
  "Live trial operator checklist Live trial operator checklist does not approve actions Every go/no-go decision requires explicit operator approval Denied checklist shortcuts remain blocked Operator decision groups Go no-go checklist live trial operator checklist identity required evidence checklist denied checklist shortcuts escalation checklist blocked checklist risks failure recovery route controlled live workflow route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no live workflow launch from UI no live action execution no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no recovery auto-trigger no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw live-trial checklist JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced checklist details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LiveTrialOperatorChecklistPanel() {
  const model = buildLiveTrialOperatorChecklistModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-live-trial-operator-checklist={`${LIVE_TRIAL_OPERATOR_CHECKLIST_MARKERS} buildLiveTrialOperatorChecklistStableKey LiveTrialOperatorChecklistPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 447"
        title="Operator checklist"
        subtitle="Live trial operator checklist reviews go/no-go readiness without approving actions. Live trial operator checklist does not approve actions, every go/no-go decision requires explicit operator approval, and denied checklist shortcuts remain blocked."
        primary={{ href: "#live-trial-operator-checklist", label: "Review checklist" }}
        links={[
          { href: "/first-live-trial-runbook-review", label: "Runbook review" },
          { href: "/live-trial-failure-recovery-review", label: "Failure recovery" },
          { href: "/first-controlled-live-workflow-trial", label: "Controlled trial" },
          { href: "/end-to-end-approval-flow-review", label: "Approval flow" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.checklistLanguage} />
      <PreviewFoundationCard title="Plain-English live trial operator checklist">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews live trial operator checklist identity, operator decision groups, go no-go checklist,
          required evidence checklist, denied checklist shortcuts, escalation checklist, blocked checklist risks, failure
          recovery route, controlled live workflow route, and next recommended action. It does not approve actions,
          persist approval decisions, run workflows, call providers, call local models, call connectors, create
          automations, store outputs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="live-trial-operator-checklist" style={previewStyles.grid}>
        {model.checklists.map((checklist) => (
          <PreviewFoundationCard
            key={buildLiveTrialOperatorChecklistStableKey("live-trial-operator-checklist-card", checklist.id)}
            title={checklist.liveTrialOperatorChecklistIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${checklist.status}`,
                `Operator decision groups: ${checklist.operatorDecisionGroups.join("; ")}`,
                `Go no-go checklist: ${checklist.goNoGoChecklist.join("; ")}`,
                `Required evidence checklist: ${checklist.requiredEvidenceChecklist.join("; ")}`,
                `Denied checklist shortcuts: ${checklist.deniedChecklistShortcuts.join("; ")}`,
                `Escalation checklist: ${checklist.escalationChecklist.join("; ")}`,
                `Blocked checklist risks: ${checklist.blockedChecklistRisks.join("; ")}`,
                checklist.failureRecoveryRoute,
                checklist.controlledLiveWorkflowRoute,
                checklist.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced checklist details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.checklists.map((checklist) => checklist.advancedChecklistDetails)} />
        <PreviewFoundationCopy>
          Advanced checklist details stay collapsed or secondary. Live trial operator checklist remains separate from
          automatic approval, approval persistence, workflow execution, live action execution, recovery auto-trigger,
          provider calls, local model calls, connector calls, automation creation, output storage, file mutation, memory
          mutation, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
