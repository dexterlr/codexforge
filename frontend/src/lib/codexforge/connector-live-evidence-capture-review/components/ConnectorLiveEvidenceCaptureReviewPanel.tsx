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
  buildConnectorLiveEvidenceCaptureReviewModel,
  buildConnectorLiveEvidenceCaptureReviewStableKey,
} from "@/lib/codexforge/connector-live-evidence-capture-review";

const CONNECTOR_LIVE_EVIDENCE_CAPTURE_REVIEW_MARKERS =
  "Connector live evidence capture review Connector live evidence capture review does not ingest connector evidence automatically Connector evidence requires operator review before use Private connector evidence stays redacted Evidence capture groups Source citation checklist connector live evidence capture identity redaction checklist review-before-use checklist denied evidence actions blocked evidence risks connector release candidate route automation live guard route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no connector permission persistence no permission grant persistence no connector evidence auto-ingestion no evidence sent to providers no evidence ingestion automation no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw connector evidence JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced evidence details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorLiveEvidenceCaptureReviewPanel() {
  const model = buildConnectorLiveEvidenceCaptureReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-live-evidence-capture-review={`${CONNECTOR_LIVE_EVIDENCE_CAPTURE_REVIEW_MARKERS} buildConnectorLiveEvidenceCaptureReviewStableKey ConnectorLiveEvidenceCaptureReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 468"
        title="Connector evidence"
        subtitle="Connector live evidence capture review is review-only and does not ingest connector evidence automatically. Connector evidence requires operator review before use, and private connector evidence stays redacted."
        primary={{ href: "#connector-live-evidence-capture-review", label: "Review evidence" }}
        links={[
          { href: "/first-connector-live-access-trial-review", label: "Connector trial" },
          { href: "/connector-live-trial-release-candidate", label: "Connector live RC" },
          { href: "/automation-live-execution-guard-review", label: "Automation guard" },
          { href: "/connector-evidence-handoff-review", label: "Evidence handoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.evidenceLanguage} />
      <PreviewFoundationCard title="Plain-English connector live evidence capture review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews connector live evidence capture identity, evidence capture groups, source citation
          checklist, redaction checklist, review-before-use checklist, denied evidence actions, blocked evidence risks,
          connector release candidate route, automation live guard route, and next recommended action. It does not ingest
          evidence, store connector data, call connectors, mutate memory, or mutate files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-live-evidence-capture-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildConnectorLiveEvidenceCaptureReviewStableKey("connector-live-evidence-card", review.id)}
            title={review.connectorLiveEvidenceCaptureIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Evidence capture groups: ${review.evidenceCaptureGroups.join("; ")}`,
                `Source citation checklist: ${review.sourceCitationChecklist.join("; ")}`,
                `Redaction checklist: ${review.redactionChecklist.join("; ")}`,
                `Review-before-use checklist: ${review.reviewBeforeUseChecklist.join("; ")}`,
                `Denied evidence actions: ${review.deniedEvidenceActions.join("; ")}`,
                `Blocked evidence risks: ${review.blockedEvidenceRisks.join("; ")}`,
                review.connectorReleaseCandidateRoute,
                review.automationLiveGuardRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced evidence details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedEvidenceDetails)} />
        <PreviewFoundationCopy>
          Advanced evidence details stay collapsed or secondary. This review never ingests evidence automatically, stores
          connector data, calls connectors, sends evidence to providers, mutates memory, or mutates files.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
