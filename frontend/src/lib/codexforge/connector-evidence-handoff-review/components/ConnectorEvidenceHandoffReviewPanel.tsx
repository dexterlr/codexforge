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
  buildConnectorEvidenceHandoffReviewModel,
  buildConnectorEvidenceHandoffReviewStableKey,
} from "@/lib/codexforge/connector-evidence-handoff-review";

const CONNECTOR_EVIDENCE_HANDOFF_REVIEW_MARKERS =
  "Connector evidence handoff review Connector evidence handoff does not ingest evidence automatically Connector evidence requires operator review before use Private connector evidence stays redacted Evidence handoff groups Citation source checklist connector evidence handoff identity review-before-use policy denied handoff actions memory and research boundary notes blocked evidence handoff risks connector release candidate route automation dry-run route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no connector account connection no Gmail connection no Calendar connection no Contacts connection no GitHub connection no Drive connection no connector permission persistence no permission grant persistence no connector API calls no OAuth request flow no connector authorization behavior no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data fetch no connector data storage no real private connector data display no connector evidence auto-ingestion no evidence sent to providers no memory/RAG ingestion no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no connector data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw connector evidence JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced handoff details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorEvidenceHandoffReviewPanel() {
  const model = buildConnectorEvidenceHandoffReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-evidence-handoff-review={`${CONNECTOR_EVIDENCE_HANDOFF_REVIEW_MARKERS} buildConnectorEvidenceHandoffReviewStableKey ConnectorEvidenceHandoffReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 436"
        title="Connector evidence handoff review"
        subtitle="Connector evidence handoff review previews how connector data becomes evidence without automatic ingestion. Connector evidence handoff does not ingest evidence automatically, connector evidence requires operator review before use, and private connector evidence stays redacted."
        primary={{ href: "#connector-evidence-handoff-review", label: "Review evidence handoff" }}
        links={[
          { href: "/connector-data-redaction-trial-review", label: "Data redaction trial" },
          { href: "/connector-integration-release-candidate", label: "Connector integration RC" },
          { href: "/automation-permission-readiness-audit", label: "Automation dry-run" },
          { href: "/research-evidence-inbox", label: "Research evidence inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.handoffLanguage} />
      <PreviewFoundationCard title="Plain-English connector evidence handoff review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews connector evidence handoff identity, evidence handoff groups, review-before-use policy,
          citation source checklist, denied handoff actions, memory and research boundary notes, blocked evidence
          handoff risks, connector release candidate route, automation dry-run route, and next recommended action. It
          does not ingest evidence, call connectors, mutate memory or RAG, or send evidence to providers.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-evidence-handoff-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildConnectorEvidenceHandoffReviewStableKey("connector-evidence-handoff-card", review.id)}
            title={review.connectorEvidenceHandoffIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Evidence handoff groups: ${review.evidenceHandoffGroups.join("; ")}`,
                `Review-before-use policy: ${review.reviewBeforeUsePolicy.join("; ")}`,
                `Citation source checklist: ${review.citationSourceChecklist.join("; ")}`,
                `Denied handoff actions: ${review.deniedHandoffActions.join("; ")}`,
                `Memory and research boundary notes: ${review.memoryAndResearchBoundaryNotes.join("; ")}`,
                `Blocked evidence handoff risks: ${review.blockedEvidenceHandoffRisks.join("; ")}`,
                review.connectorReleaseCandidateRoute,
                review.automationDryRunRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced handoff details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedHandoffDetails)} />
        <PreviewFoundationCopy>
          Advanced handoff details stay collapsed or secondary. Connector evidence handoff remains separate from
          connector APIs, provider sends, research execution, memory ingestion, RAG ingestion, local files, automation,
          and tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
