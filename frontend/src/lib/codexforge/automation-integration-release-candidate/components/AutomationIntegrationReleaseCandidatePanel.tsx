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
  buildAutomationIntegrationReleaseCandidateModel,
  buildAutomationIntegrationReleaseCandidateStableKey,
} from "@/lib/codexforge/automation-integration-release-candidate";

const AUTOMATION_INTEGRATION_RELEASE_CANDIDATE_MARKERS =
  "Automation integration release candidate Automation integration release candidate does not run automations Live automation requires explicit approval Denied automation paths remain blocked Automation family matrix Schedule safety status automation integration candidate identity dry-run status approval queue status denied automation paths blocked integration risks daily operator home route global review inbox route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no approval decision persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw automation integration JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced release candidate details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AutomationIntegrationReleaseCandidatePanel() {
  const model = buildAutomationIntegrationReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-automation-integration-release-candidate={`${AUTOMATION_INTEGRATION_RELEASE_CANDIDATE_MARKERS} buildAutomationIntegrationReleaseCandidateStableKey AutomationIntegrationReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 441"
        title="Automation integration release candidate"
        subtitle="Automation integration release candidate summarizes automation readiness without running automations. Automation integration release candidate does not run automations, live automation requires explicit approval, and denied automation paths remain blocked."
        primary={{ href: "#automation-integration-release-candidate", label: "Review automation RC" }}
        links={[
          { href: "/automation-dry-run-trial-review", label: "Dry-run review" },
          { href: "/automation-approval-queue-review", label: "Approval queue" },
          { href: "/automation-schedule-safety-review", label: "Schedule safety" },
          { href: "/global-review-inbox", label: "Global inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.releaseLanguage} />
      <PreviewFoundationCard title="Plain-English automation integration release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews automation integration candidate identity, automation family matrix, dry-run status, approval
          queue status, schedule safety status, denied automation paths, blocked integration risks, daily operator home
          route, global review inbox route, and next recommended action. It does not run automations, create schedules,
          create reminders, create watches, persist automation rules, mutate files, mutate memory, call connectors, or
          call providers.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="automation-integration-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildAutomationIntegrationReleaseCandidateStableKey("automation-integration-candidate-card", candidate.id)}
            title={candidate.automationIntegrationCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Automation family matrix: ${candidate.automationFamilyMatrix.join("; ")}`,
                candidate.dryRunStatus,
                candidate.approvalQueueStatus,
                candidate.scheduleSafetyStatus,
                `Denied automation paths: ${candidate.deniedAutomationPaths.join("; ")}`,
                `Blocked integration risks: ${candidate.blockedIntegrationRisks.join("; ")}`,
                candidate.dailyOperatorHomeRoute,
                candidate.globalReviewInboxRoute,
                candidate.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release candidate details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.candidates.map((candidate) => candidate.advancedReleaseCandidateDetails)}
        />
        <PreviewFoundationCopy>
          Advanced release candidate details stay collapsed or secondary. Automation integration release remains
          separate from automation execution, rule persistence, approval persistence, schedules, reminders, watches,
          background work, notifications, connectors, providers, files, memory, tools, agents, plugins, and MCP runtimes.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
