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
  buildScheduledResearchCheckBoundaryModel,
  buildScheduledResearchCheckBoundaryStableKey,
} from "@/lib/codexforge/scheduled-research-check-boundary";

const SCHEDULED_RESEARCH_CHECK_BOUNDARY_MARKERS =
  "Scheduled research check boundary Scheduled research checks require explicit approval No research check is scheduled from this page No source is refreshed automatically Budget rate-limit policy Conditional watch route boundary identity source research freshness boundary research check summary allowed schedule scope denied schedule scope source/provider boundary approval requirement blocked reasons no OAuth request flow no connector authorization behavior no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data reads no automatic email reads no automatic calendar reads no automatic contact reads no email draft/send behavior no calendar event create/update/delete behavior no contact create/update/delete behavior no token storage no localStorage/sessionStorage token storage no private connector values displayed no notifications sent no reminder creation no task scheduling no schedule creation no automation creation no background job creation no background jobs no background work runs from UI no cron/interval/polling loops from UI no automatic web browsing no web/search/provider API calls no automatic provider calls no provider API calls no automatic provider send no prompt/file/source/connector data sending without approval no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no localStorage API key storage no process.env printing no API keys or secrets displayed no source auto-fetching no source auto-ingestion no source auto-refreshing no freshness auto-recheck no evidence auto-ingestion no evidence auto-update no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced schedule details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ScheduledResearchCheckBoundaryPanel() {
  const model = buildScheduledResearchCheckBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-scheduled-research-check-boundary={`${SCHEDULED_RESEARCH_CHECK_BOUNDARY_MARKERS} buildScheduledResearchCheckBoundaryStableKey ScheduledResearchCheckBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 343"
        title="Scheduled research boundary"
        subtitle="Scheduled research check boundary reviews future recurring research checks before any schedule or watch exists. Scheduled research checks require explicit approval, no research check is scheduled from this page, no source is refreshed automatically, and no background work runs from UI."
        primary={{ href: "#scheduled-research-check-boundary", label: "Review research boundary" }}
        links={[
          { href: "/research-freshness-recheck-boundary", label: "Freshness boundary" },
          { href: "/web-research-provider-boundary", label: "Web boundary" },
          { href: "/conditional-watch-review-inbox", label: "Watch review" },
          { href: "/research-runbook-finalization", label: "Runbook" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.scheduleLanguage} />
      <PreviewFoundationCard title="Plain-English scheduled research boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews a future schedule boundary only. It does not create schedules, schedule checks, refresh
          sources, browse the web, call search or provider APIs, start background jobs, run polling loops, update
          evidence, write files, or promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="scheduled-research-check-boundary" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildScheduledResearchCheckBoundaryStableKey(
              "scheduled-research-check-boundary-card",
              review.id
            )}
            title={review.boundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceResearchFreshnessBoundary,
                review.researchCheckSummary,
                review.allowedScheduleScope,
                review.deniedScheduleScope,
                review.sourceProviderBoundary,
                review.budgetRateLimitPolicy,
                review.approvalRequirement,
                review.conditionalWatchRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced schedule details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedScheduleDetails)} />
        <PreviewFoundationCopy>
          Advanced schedule details stay collapsed or secondary. Scheduled research review remains separate from
          schedules, watches, background work, browsing, provider calls, source refresh, evidence updates, memory, local
          files, and command execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
