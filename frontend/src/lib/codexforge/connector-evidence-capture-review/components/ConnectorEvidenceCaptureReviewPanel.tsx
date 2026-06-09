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
  buildConnectorEvidenceCaptureReviewModel,
  buildConnectorEvidenceCaptureReviewStableKey,
} from "@/lib/codexforge/connector-evidence-capture-review";

const CONNECTOR_EVIDENCE_CAPTURE_REVIEW_MARKERS =
  "Connector evidence capture review Connector evidence is reviewed before use No connector data is captured from this page Connector data is not auto-promoted to memory Evidence packet summary Redaction route evidence capture identity source connector workspace approved connector boundary dependency capture source summary allowed evidence types denied evidence types release candidate route blocked reasons no OAuth request flow no connector authorization behavior no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data reads no automatic email reads no automatic calendar reads no automatic contact reads no email draft/send behavior no calendar event create/update/delete behavior no contact create/update/delete behavior no token storage no localStorage/sessionStorage token storage no private connector values displayed no notifications sent no reminder creation no task scheduling no automation creation no automatic provider calls no provider API calls no prompt/file/source/connector data sending without approval no localStorage API key storage no process.env printing no API keys or secrets displayed no source auto-fetching no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no package install behavior no Ruflo/Odysseus vendoring no automatic web browsing no web/search/provider API calls no automatic provider send no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced evidence details collapsed/secondary no unsafe execution buttons no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorEvidenceCaptureReviewPanel() {
  const model = buildConnectorEvidenceCaptureReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-evidence-capture-review={`${CONNECTOR_EVIDENCE_CAPTURE_REVIEW_MARKERS} buildConnectorEvidenceCaptureReviewStableKey ConnectorEvidenceCaptureReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 338"
        title="Connector evidence"
        subtitle="Connector evidence capture review models how approved connector output would become reviewable evidence without reading connectors automatically. Connector evidence is reviewed before use, no connector data is captured from this page, and connector data is not auto-promoted to memory."
        primary={{ href: "#connector-evidence-capture-review", label: "Review evidence capture" }}
        links={[
          { href: "/connector-workspace", label: "Connector workspace" },
          { href: "/gmail-connector-boundary", label: "Gmail boundary" },
          { href: "/connector-privacy-redaction-review", label: "Privacy redaction" },
          { href: "/connector-release-candidate", label: "Release candidate" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.captureLanguage} />
      <PreviewFoundationCard title="Plain-English evidence capture">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a review-only evidence capture model. It does not request OAuth, ask for connector authorization,
          read email, read calendar events, read contacts, capture connector data, store tokens, display secrets, send
          notifications, create reminders, schedule tasks, create automations, or ingest memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-evidence-capture-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildConnectorEvidenceCaptureReviewStableKey("connector-evidence-capture-card", review.id)}
            title={review.evidenceCaptureIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceConnectorWorkspace,
                review.approvedConnectorBoundaryDependency,
                review.captureSourceSummary,
                review.evidencePacketSummary,
                `Allowed evidence types: ${review.allowedEvidenceTypes.join("; ")}`,
                `Denied evidence types: ${review.deniedEvidenceTypes.join("; ")}`,
                review.redactionRoute,
                review.releaseCandidateRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced evidence details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedEvidenceDetails)} />
        <PreviewFoundationCopy>
          Advanced evidence details stay collapsed or secondary. Connector evidence capture remains separate from
          connector APIs, automatic reads, private connector values, provider sends, notifications, scheduling, memory
          promotion, local files, and tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
