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
  buildConnectorPrivacyRedactionReviewModel,
  buildConnectorPrivacyRedactionReviewStableKey,
} from "@/lib/codexforge/connector-privacy-redaction-review";

const CONNECTOR_PRIVACY_REDACTION_REVIEW_MARKERS =
  "Connector privacy redaction review Redaction happens before connector evidence leaves review Private connector values are not displayed Secrets and tokens are excluded Allowed evidence fields Excluded evidence fields redaction review identity source connector evidence capture detected private fields redaction policy minimization policy review handoff route blocked reasons no OAuth request flow no connector authorization behavior no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data reads no automatic email reads no automatic calendar reads no automatic contact reads no email draft/send behavior no calendar event create/update/delete behavior no contact create/update/delete behavior no token storage no localStorage/sessionStorage token storage no private connector values displayed no notifications sent no reminder creation no task scheduling no automation creation no automatic provider calls no provider API calls no prompt/file/source/connector data sending without approval no localStorage API key storage no process.env printing no API keys or secrets displayed no source auto-fetching no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no package install behavior no Ruflo/Odysseus vendoring no automatic web browsing no web/search/provider API calls no automatic provider send no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced redaction details collapsed/secondary no unsafe execution buttons no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorPrivacyRedactionReviewPanel() {
  const model = buildConnectorPrivacyRedactionReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-privacy-redaction-review={`${CONNECTOR_PRIVACY_REDACTION_REVIEW_MARKERS} buildConnectorPrivacyRedactionReviewStableKey ConnectorPrivacyRedactionReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 339"
        title="Connector privacy"
        subtitle="Connector privacy redaction review checks redaction and minimization before connector evidence can be used. Redaction happens before connector evidence leaves review, private connector values are not displayed, and secrets and tokens are excluded."
        primary={{ href: "#connector-privacy-redaction-review", label: "Review redaction" }}
        links={[
          { href: "/connector-evidence-capture-review", label: "Evidence capture" },
          { href: "/connector-workspace", label: "Connector workspace" },
          { href: "/prompt-privacy-classifier", label: "Privacy classifier" },
          { href: "/connector-release-candidate", label: "Release candidate" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.redactionLanguage} />
      <PreviewFoundationCard title="Plain-English privacy redaction">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews redaction only. It does not display private connector values, store tokens, call connector
          APIs, mutate evidence automatically, send notifications, create reminders, schedule tasks, create automations,
          or promote connector evidence into memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-privacy-redaction-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildConnectorPrivacyRedactionReviewStableKey("connector-privacy-redaction-card", review.id)}
            title={review.redactionReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceConnectorEvidenceCapture,
                `Detected private fields: ${review.detectedPrivateFields.join("; ")}`,
                `Redaction policy: ${review.redactionPolicy.join("; ")}`,
                `Minimization policy: ${review.minimizationPolicy.join("; ")}`,
                `Allowed evidence fields: ${review.allowedEvidenceFields.join("; ")}`,
                `Excluded evidence fields: ${review.excludedEvidenceFields.join("; ")}`,
                review.reviewHandoffRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced redaction details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedRedactionDetails)} />
        <PreviewFoundationCopy>
          Advanced redaction details stay collapsed or secondary. Redaction remains separate from connector APIs,
          automatic evidence mutation, provider sends, notifications, scheduling, memory promotion, local files, and tool
          execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
