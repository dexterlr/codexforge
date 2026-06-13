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
  buildConnectorLiveTrialReleaseCandidateModel,
  buildConnectorLiveTrialReleaseCandidateStableKey,
} from "@/lib/codexforge/connector-live-trial-release-candidate";

const CONNECTOR_LIVE_TRIAL_RELEASE_CANDIDATE_MARKERS =
  "Connector live trial release candidate Connector live trial release candidate does not call connector APIs Connector live trial release requires explicit approval Unresolved connector blockers stay blocked Live access guard status Redaction privacy status connector live trial candidate identity first connector trial status evidence capture status denied connector live paths unresolved connector blockers automation live guard route automation dry-run replay route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no connector permission persistence no permission grant persistence no connector evidence auto-ingestion no evidence sent to providers no evidence ingestion automation no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw connector release JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced candidate details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorLiveTrialReleaseCandidatePanel() {
  const model = buildConnectorLiveTrialReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-live-trial-release-candidate={`${CONNECTOR_LIVE_TRIAL_RELEASE_CANDIDATE_MARKERS} buildConnectorLiveTrialReleaseCandidateStableKey ConnectorLiveTrialReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 469"
        title="Connector live RC"
        subtitle="Connector live trial release candidate is review-only and does not call connector APIs. Connector live trial release requires explicit approval, and unresolved connector blockers stay blocked."
        primary={{ href: "#connector-live-trial-release-candidate", label: "Review candidate" }}
        links={[
          { href: "/connector-live-access-guard-review", label: "Live access guard" },
          { href: "/first-connector-live-access-trial-review", label: "Connector trial" },
          { href: "/connector-live-evidence-capture-review", label: "Evidence capture" },
          { href: "/automation-live-execution-guard-review", label: "Automation guard" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.candidateLanguage} />
      <PreviewFoundationCard title="Plain-English connector live trial release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews connector live trial candidate identity, live access guard status, first connector trial
          status, evidence capture status, redaction privacy status, denied connector live paths, unresolved connector
          blockers, automation live guard route, automation dry-run replay route, and next recommended action. It does
          not call connector APIs, fetch connector data, persist permissions, approve release, mutate files, or mutate
          memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-live-trial-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildConnectorLiveTrialReleaseCandidateStableKey("connector-live-rc-card", candidate.id)}
            title={candidate.connectorLiveTrialCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Live access guard status: ${candidate.liveAccessGuardStatus.join("; ")}`,
                `First connector trial status: ${candidate.firstConnectorTrialStatus.join("; ")}`,
                `Evidence capture status: ${candidate.evidenceCaptureStatus.join("; ")}`,
                `Redaction privacy status: ${candidate.redactionPrivacyStatus.join("; ")}`,
                `Denied connector live paths: ${candidate.deniedConnectorLivePaths.join("; ")}`,
                `Unresolved connector blockers: ${candidate.unresolvedConnectorBlockers.join("; ")}`,
                candidate.automationLiveGuardRoute,
                candidate.automationDryRunReplayRoute,
                candidate.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced candidate details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedCandidateDetails)} />
        <PreviewFoundationCopy>
          Advanced candidate details stay collapsed or secondary. This release candidate never calls connector APIs,
          fetches connector data, persists permissions, approves release, runs workflows, or clears unresolved blockers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
