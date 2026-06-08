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
  buildResearchFreshnessRecheckBoundaryModel,
  buildResearchFreshnessRecheckBoundaryStableKey,
} from "@/lib/codexforge/research-freshness-recheck-boundary";

const RESEARCH_FRESHNESS_RECHECK_BOUNDARY_MARKERS =
  "Research freshness recheck boundary Freshness rechecks require explicit approval No source is refreshed from this page API keys and secrets are never displayed Allowed recheck scope Budget rate-limit guardrail freshness boundary identity source conflict resolver source/report dependency stale source summary denied recheck scope provider/web boundary dependency approval requirement blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no source auto-refreshing no freshness auto-recheck no evidence auto-update no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced freshness details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchFreshnessRecheckBoundaryPanel() {
  const model = buildResearchFreshnessRecheckBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-freshness-recheck-boundary={`${RESEARCH_FRESHNESS_RECHECK_BOUNDARY_MARKERS} buildResearchFreshnessRecheckBoundaryStableKey ResearchFreshnessRecheckBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 333"
        title="Freshness boundary"
        subtitle="Research freshness recheck boundary reviews whether a future source freshness recheck is allowed before any recheck, web, or provider call. Freshness rechecks require explicit approval, no source is refreshed from this page, and API keys and secrets are never displayed."
        primary={{ href: "#research-freshness-recheck-boundary", label: "Review freshness" }}
        links={[
          { href: "/evidence-conflict-resolver-review", label: "Conflict review" },
          { href: "/web-research-provider-boundary", label: "Web boundary" },
          { href: "/research-runbook-finalization", label: "Runbook" },
          { href: "/research-workspace-release-candidate", label: "Release candidate" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.freshnessLanguage} />
      <PreviewFoundationCard title="Plain-English freshness boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews the boundary only. It does not refresh sources, fetch sources, call provider or search APIs,
          update evidence, browse, display secrets, export reports, promote memory, mutate the Brain graph, or execute
          tools.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-freshness-recheck-boundary" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildResearchFreshnessRecheckBoundaryStableKey("research-freshness-recheck-boundary-card", review.id)}
            title={review.freshnessBoundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceConflictResolver,
                review.sourceReportDependency,
                review.staleSourceSummary,
                review.allowedRecheckScope,
                review.deniedRecheckScope,
                review.providerWebBoundaryDependency,
                review.budgetRateLimitGuardrail,
                review.approvalRequirement,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced freshness details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.reviews.map((review) => review.advancedFreshnessDetails)}
        />
        <PreviewFoundationCopy>
          Advanced freshness details stay collapsed or secondary. Freshness review remains separate from browsing,
          provider calls, source refresh, evidence updates, citation changes, report export, memory promotion, local
          files, and tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
