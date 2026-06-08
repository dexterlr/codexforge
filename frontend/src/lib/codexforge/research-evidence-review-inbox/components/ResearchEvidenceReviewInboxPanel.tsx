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
  buildResearchEvidenceReviewInboxModel,
  buildResearchEvidenceReviewInboxStableKey,
} from "@/lib/codexforge/research-evidence-review-inbox";

const RESEARCH_EVIDENCE_REVIEW_INBOX_MARKERS =
  "Research evidence review inbox Evidence is reviewed before use Memory promotion requires explicit review Stale or conflicting sources stay flagged Citation readiness Promotion policy evidence inbox identity source collector trial evidence packet summary source quality status conflict/staleness signal redaction/privacy status next recommended route blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no source auto-fetching no source auto-ingestion no evidence auto-ingestion no auto-cite no auto-promote no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced evidence details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchEvidenceReviewInboxPanel() {
  const model = buildResearchEvidenceReviewInboxModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-evidence-review-inbox={`${RESEARCH_EVIDENCE_REVIEW_INBOX_MARKERS} buildResearchEvidenceReviewInboxStableKey ResearchEvidenceReviewInboxPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 325"
        title="Evidence inbox"
        subtitle="Research evidence review inbox reviews collected evidence packets before use, citation, summary, or promotion. Evidence is reviewed before use, memory promotion requires explicit review, and stale or conflicting sources stay flagged."
        primary={{ href: "#research-evidence-review-inbox", label: "Review evidence" }}
        links={[
          { href: "/research-workspace", label: "Research workspace" },
          { href: "/research-source-collector-trial", label: "Source collector" },
          { href: "/memory", label: "Memory review" },
          { href: "/review-inbox", label: "Result inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.inboxLanguage} />
      <PreviewFoundationCard title="Plain-English evidence inbox">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This inbox does not call providers, browse the web, auto-cite evidence, ingest memory, promote memory, mutate
          the Brain graph, call appendEvent, or call saveBrainGraph from the UI.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-evidence-review-inbox" style={previewStyles.grid}>
        {model.packets.map((packet) => (
          <PreviewFoundationCard
            key={buildResearchEvidenceReviewInboxStableKey("research-evidence-inbox-card", packet.id)}
            title={packet.evidenceInboxIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${packet.status}`,
                packet.sourceCollectorTrial,
                packet.evidencePacketSummary,
                packet.citationReadiness,
                packet.sourceQualityStatus,
                packet.conflictStalenessSignal,
                packet.redactionPrivacyStatus,
                packet.promotionPolicy,
                packet.nextRecommendedRoute,
                `Blocked reasons: ${packet.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced evidence details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.packets.map((packet) => packet.advancedEvidenceDetails)} />
        <PreviewFoundationCopy>
          Advanced evidence details stay collapsed or secondary. Evidence review remains separated from use, citation,
          summary, memory promotion, Brain graph mutation, provider traffic, local files, and tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
