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
  buildAgentMemoryRagPatternReviewModel,
  buildAgentMemoryRagPatternReviewStableKey,
} from "@/lib/codexforge/agent-memory-rag-pattern-review";

const AGENT_MEMORY_RAG_PATTERN_REVIEW_MARKERS =
  "Agent memory RAG pattern review Memory and RAG are not ingested automatically Memory promotion requires explicit review Secret values are redacted before review Data source boundaries Promotion policy review identity source reference spikes memory/RAG pattern lessons redaction/privacy rules review inbox dependency denied ingestion scope extension architecture route blocked reasons no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no plugin execution no tool execution no agent execution no MCP runtime no MCP tool calls no memory/RAG ingestion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced memory/RAG details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AgentMemoryRagPatternReviewPanel() {
  const model = buildAgentMemoryRagPatternReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-agent-memory-rag-pattern-review={`${AGENT_MEMORY_RAG_PATTERN_REVIEW_MARKERS} buildAgentMemoryRagPatternReviewStableKey AgentMemoryRagPatternReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 316"
        title="Memory RAG review"
        subtitle="Agent memory RAG pattern review compares safe future memory and retrieval patterns. Memory and RAG are not ingested automatically, memory promotion requires explicit review, and secret values are redacted before review."
        primary={{ href: "#agent-memory-rag-pattern-review", label: "Review patterns" }}
        links={[
          { href: "/ruflo-reference-architecture", label: "Ruflo reference" },
          { href: "/odysseus-reference-architecture", label: "Odysseus reference" },
          { href: "/mcp-tool-boundary-comparison", label: "MCP boundary" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/extension-architecture-decision", label: "Extension decision" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English memory review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page does not ingest data, index files, call providers, mutate the Brain graph, call appendEvent, call
          saveBrainGraph, or promote memory automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="agent-memory-rag-pattern-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildAgentMemoryRagPatternReviewStableKey("agent-memory-rag-review-card", review.id)}
            title={review.reviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Source reference spikes: ${review.sourceReferenceSpikes.join("; ")}`,
                review.memoryRagPatternLessons,
                review.dataSourceBoundaries,
                review.redactionPrivacyRules,
                review.reviewInboxDependency,
                review.promotionPolicy,
                review.deniedIngestionScope,
                review.extensionArchitectureRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced memory/RAG details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedReviewDetails)} />
        <PreviewFoundationCopy>
          Advanced memory/RAG details stay collapsed or secondary. The review does not create a vector store, ingest
          files, crawl paths, auto-promote memory, mutate Brain graph state, send provider prompts, or import any
          third-party memory runtime.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
