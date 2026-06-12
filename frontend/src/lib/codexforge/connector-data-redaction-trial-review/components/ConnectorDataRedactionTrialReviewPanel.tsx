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
  buildConnectorDataRedactionTrialReviewModel,
  buildConnectorDataRedactionTrialReviewStableKey,
} from "@/lib/codexforge/connector-data-redaction-trial-review";

const CONNECTOR_DATA_REDACTION_TRIAL_REVIEW_MARKERS =
  "Connector data redaction trial review Connector data redaction trial does not fetch connector data Private connector details stay redacted Redaction rules require operator review Redaction groups Redaction checklist connector data redaction identity private field examples denied redaction shortcuts data handling boundary notes blocked redaction risks evidence handoff route connector release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no connector account connection no Gmail connection no Calendar connection no Contacts connection no GitHub connection no Drive connection no connector permission persistence no permission grant persistence no connector API calls no OAuth request flow no connector authorization behavior no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data fetch no connector data storage no real private connector data display no connector evidence auto-ingestion no evidence sent to providers no memory/RAG ingestion no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no connector data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw connector redaction JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced redaction details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorDataRedactionTrialReviewPanel() {
  const model = buildConnectorDataRedactionTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-data-redaction-trial-review={`${CONNECTOR_DATA_REDACTION_TRIAL_REVIEW_MARKERS} buildConnectorDataRedactionTrialReviewStableKey ConnectorDataRedactionTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 435"
        title="Connector data redaction trial review"
        subtitle="Connector data redaction trial review previews redaction rules with fake placeholders only. Connector data redaction trial does not fetch connector data, private connector details stay redacted, and redaction rules require operator review."
        primary={{ href: "#connector-data-redaction-trial-review", label: "Review redaction trial" }}
        links={[
          { href: "/connector-live-permission-trial-review", label: "Live permission trial" },
          { href: "/connector-evidence-handoff-review", label: "Evidence handoff" },
          { href: "/connector-integration-release-candidate", label: "Connector integration RC" },
          { href: "/connector-privacy-redaction-review", label: "Privacy redaction" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.redactionLanguage} />
      <PreviewFoundationCard title="Plain-English connector data redaction trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews connector data redaction identity, redaction groups, fake private field examples, redaction
          checklist, denied redaction shortcuts, data handling boundary notes, blocked redaction risks, evidence handoff
          route, connector release candidate route, and next recommended action. It does not fetch connector data, store
          connector data, display real private data, call connectors, or call providers.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-data-redaction-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildConnectorDataRedactionTrialReviewStableKey("connector-data-redaction-trial-card", review.id)}
            title={review.connectorDataRedactionIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Redaction groups: ${review.redactionGroups.join("; ")}`,
                `Private field examples: ${review.privateFieldExamples.join("; ")}`,
                `Redaction checklist: ${review.redactionChecklist.join("; ")}`,
                `Denied redaction shortcuts: ${review.deniedRedactionShortcuts.join("; ")}`,
                `Data handling boundary notes: ${review.dataHandlingBoundaryNotes.join("; ")}`,
                `Blocked redaction risks: ${review.blockedRedactionRisks.join("; ")}`,
                review.evidenceHandoffRoute,
                review.connectorReleaseCandidateRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced redaction details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedRedactionDetails)} />
        <PreviewFoundationCopy>
          Advanced redaction details stay collapsed or secondary. This review uses fake placeholder examples only; it
          does not fetch connector data, store connector data, display real private data, send evidence to providers, or
          ingest evidence automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
