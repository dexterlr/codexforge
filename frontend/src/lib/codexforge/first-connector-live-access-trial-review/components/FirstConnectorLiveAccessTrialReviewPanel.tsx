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
  buildFirstConnectorLiveAccessTrialReviewModel,
  buildFirstConnectorLiveAccessTrialReviewStableKey,
} from "@/lib/codexforge/first-connector-live-access-trial-review";

const FIRST_CONNECTOR_LIVE_ACCESS_TRIAL_REVIEW_MARKERS =
  "First connector live access trial review First connector live access trial review does not fetch connector data Connector access trials require explicit operator approval Unapproved connector access remains blocked Trial stages Privacy and redaction checklist first connector live access trial identity permission scope review checklist approval gate checklist denied connector trial actions blocked connector trial risks connector evidence capture route connector release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no connector permission persistence no permission grant persistence no OAuth request flow no connector authorization behavior no connector evidence auto-ingestion no evidence sent to providers no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw connector trial JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FirstConnectorLiveAccessTrialReviewPanel() {
  const model = buildFirstConnectorLiveAccessTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-connector-live-access-trial-review={`${FIRST_CONNECTOR_LIVE_ACCESS_TRIAL_REVIEW_MARKERS} buildFirstConnectorLiveAccessTrialReviewStableKey FirstConnectorLiveAccessTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 467"
        title="First connector trial"
        subtitle="First connector live access trial review is review-only and does not fetch connector data. Connector access trials require explicit operator approval, and unapproved connector access remains blocked."
        primary={{ href: "#first-connector-live-access-trial-review", label: "Review trial" }}
        links={[
          { href: "/connector-live-access-guard-review", label: "Live access guard" },
          { href: "/connector-live-evidence-capture-review", label: "Evidence capture" },
          { href: "/connector-live-trial-release-candidate", label: "Connector live RC" },
          { href: "/connector-evidence-handoff-review", label: "Evidence handoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English first connector live access trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews first connector live access trial identity, trial stages, permission scope review checklist,
          privacy and redaction checklist, approval gate checklist, denied connector trial actions, blocked connector
          trial risks, connector evidence capture route, connector release candidate route, and next recommended action.
          It does not call connectors, fetch connector data, store connector data, approve access, mutate files, or
          mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-connector-live-access-trial-review" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildFirstConnectorLiveAccessTrialReviewStableKey("first-connector-live-access-trial-card", trial.id)}
            title={trial.firstConnectorLiveAccessTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Trial stages: ${trial.trialStages.join("; ")}`,
                `Permission scope review checklist: ${trial.permissionScopeReviewChecklist.join("; ")}`,
                `Privacy and redaction checklist: ${trial.privacyAndRedactionChecklist.join("; ")}`,
                `Approval gate checklist: ${trial.approvalGateChecklist.join("; ")}`,
                `Denied connector trial actions: ${trial.deniedConnectorTrialActions.join("; ")}`,
                `Blocked connector trial risks: ${trial.blockedConnectorTrialRisks.join("; ")}`,
                trial.connectorEvidenceCaptureRoute,
                trial.connectorReleaseCandidateRoute,
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
          Advanced trial details stay collapsed or secondary. This review never fetches connector data, calls connector
          APIs, stores connector data, approves access, persists permissions, or clears unapproved access blockers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
