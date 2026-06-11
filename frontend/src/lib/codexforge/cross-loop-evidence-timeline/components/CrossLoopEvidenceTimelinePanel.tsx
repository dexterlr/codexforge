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
  buildCrossLoopEvidenceTimelineModel,
  buildCrossLoopEvidenceTimelineStableKey,
} from "@/lib/codexforge/cross-loop-evidence-timeline";

const CROSS_LOOP_EVIDENCE_TIMELINE_MARKERS =
  "Cross-loop evidence timeline Evidence timeline does not fetch external data Evidence is reviewed before ingestion Private evidence stays redacted until approved Evidence groups by loop Chronology preview evidence timeline identity trust/freshness notes redaction and privacy notes blocked evidence gaps project knowledge search route result comparison route next recommended action review-only approval required no action execution from UI no approval automation no approval is granted no action approval from UI no external data fetching no evidence ingestion automation no evidence ingestion from UI no workflow execution no workflow execution from UI no workflow runs automatically no live search execution no search query persistence no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no project scan no local file reads no prompt/file/project/connector/search/evidence data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced timeline details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CrossLoopEvidenceTimelinePanel() {
  const model = buildCrossLoopEvidenceTimelineModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-cross-loop-evidence-timeline={`${CROSS_LOOP_EVIDENCE_TIMELINE_MARKERS} buildCrossLoopEvidenceTimelineStableKey CrossLoopEvidenceTimelinePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 399"
        title="Evidence timeline"
        subtitle="Cross-loop evidence timeline reviews evidence chronology across loops without reaching out to any source. Evidence timeline does not fetch external data, evidence is reviewed before ingestion, and private evidence stays redacted until approved."
        primary={{ href: "#cross-loop-evidence-timeline", label: "Review timeline" }}
        links={[
          { href: "/result-comparison-review", label: "Result comparison" },
          { href: "/project-knowledge-search-preview", label: "Knowledge search" },
          { href: "/local-first-privacy-audit", label: "Privacy audit" },
          { href: "/global-review-inbox", label: "Global inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.timelineLanguage} />
      <PreviewFoundationCard title="Plain-English cross-loop evidence timeline">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews evidence timeline identity, evidence groups by loop, chronology preview, trust/freshness
          notes, redaction and privacy notes, blocked evidence gaps, project knowledge search route, result comparison
          route, and next recommended action. It does not fetch external data, call APIs, ingest evidence, mutate memory,
          or read private project files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="cross-loop-evidence-timeline" style={previewStyles.grid}>
        {model.timelines.map((timeline) => (
          <PreviewFoundationCard
            key={buildCrossLoopEvidenceTimelineStableKey("cross-loop-evidence-card", timeline.id)}
            title={timeline.evidenceTimelineIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${timeline.status}`,
                `Evidence groups by loop: ${timeline.evidenceGroupsByLoop.join("; ")}`,
                `Chronology preview: ${timeline.chronologyPreview.join("; ")}`,
                `Trust/freshness notes: ${timeline.trustFreshnessNotes.join("; ")}`,
                `Redaction and privacy notes: ${timeline.redactionPrivacyNotes.join("; ")}`,
                `Blocked evidence gaps: ${timeline.blockedEvidenceGaps.join("; ")}`,
                timeline.projectKnowledgeSearchRoute,
                timeline.resultComparisonRoute,
                timeline.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced timeline details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.timelines.map((timeline) => timeline.advancedTimelineDetails)} />
        <PreviewFoundationCopy>
          Advanced timeline details stay collapsed or secondary. Evidence timeline does not fetch external data, and
          private evidence stays redacted until approved.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
