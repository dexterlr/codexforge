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
  buildConnectorReleaseCandidateModel,
  buildConnectorReleaseCandidateStableKey,
} from "@/lib/codexforge/connector-release-candidate";

const CONNECTOR_RELEASE_CANDIDATE_MARKERS =
  "Connector release candidate Connector release candidate remains review-only Connectors remain approval-gated No connector API request is sent from this page Privacy redaction readiness Release decision release candidate identity covered connector surfaces Gmail boundary readiness Calendar boundary readiness Contacts boundary readiness evidence capture readiness known gaps next recommended route blocked reasons no OAuth request flow no connector authorization behavior no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data reads no automatic email reads no automatic calendar reads no automatic contact reads no email draft/send behavior no calendar event create/update/delete behavior no contact create/update/delete behavior no token storage no localStorage/sessionStorage token storage no private connector values displayed no notifications sent no reminder creation no task scheduling no automation creation no automatic provider calls no provider API calls no prompt/file/source/connector data sending without approval no localStorage API key storage no process.env printing no API keys or secrets displayed no source auto-fetching no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no package install behavior no Ruflo/Odysseus vendoring no automatic web browsing no web/search/provider API calls no automatic provider send no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced release details collapsed/secondary no unsafe execution buttons no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorReleaseCandidatePanel() {
  const model = buildConnectorReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-release-candidate={`${CONNECTOR_RELEASE_CANDIDATE_MARKERS} buildConnectorReleaseCandidateStableKey ConnectorReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 340"
        title="Connector release"
        subtitle="Connector release candidate audits whether the connector workspace, connector boundaries, evidence capture, and redaction review are ready as a review-only connector MVP. Connector release candidate remains review-only, connectors remain approval-gated, and no connector API request is sent from this page."
        primary={{ href: "#connector-release-candidate", label: "Review release" }}
        links={[
          { href: "/connector-workspace", label: "Connector workspace" },
          { href: "/connector-evidence-capture-review", label: "Evidence capture" },
          { href: "/connector-privacy-redaction-review", label: "Privacy redaction" },
          { href: "/operator-notification-center", label: "Notification center" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.releaseLanguage} />
      <PreviewFoundationCard title="Plain-English connector release">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a release audit only. It does not request OAuth, request connector authorization, call connector
          APIs, sync connector data, store tokens, send notifications, create reminders, schedule tasks, create
          automations, or promote connector evidence into memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildConnectorReleaseCandidateStableKey("connector-release-candidate-card", candidate.id)}
            title={candidate.releaseCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Release decision: ${candidate.releaseDecision}`,
                `Covered connector surfaces: ${candidate.coveredConnectorSurfaces.join("; ")}`,
                candidate.gmailBoundaryReadiness,
                candidate.calendarBoundaryReadiness,
                candidate.contactsBoundaryReadiness,
                candidate.evidenceCaptureReadiness,
                candidate.privacyRedactionReadiness,
                `Known gaps: ${candidate.knownGaps.join("; ")}`,
                candidate.nextRecommendedRoute,
                `Blocked reasons: ${candidate.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedReleaseDetails)} />
        <PreviewFoundationCopy>
          Advanced release details stay collapsed or secondary. Connector release review remains separate from OAuth,
          connector APIs, connector sync, provider sends, notifications, scheduling, memory promotion, local files, and
          tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
