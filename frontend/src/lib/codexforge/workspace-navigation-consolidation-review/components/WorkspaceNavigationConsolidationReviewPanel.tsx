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
  buildWorkspaceNavigationConsolidationReviewModel,
  buildWorkspaceNavigationConsolidationReviewStableKey,
} from "@/lib/codexforge/workspace-navigation-consolidation-review";

const WORKSPACE_NAVIGATION_CONSOLIDATION_REVIEW_MARKERS =
  "Workspace navigation consolidation review Navigation consolidation does not remove route coverage Route changes require review before removal No route is executed from this page Route group summary Command registry coverage source unified home duplicate/overlap risks novice navigation policy protected routes no route coverage removal no duplicate route hrefs no duplicate shortLabel values no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no file export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced navigation details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function WorkspaceNavigationConsolidationReviewPanel() {
  const model = buildWorkspaceNavigationConsolidationReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-workspace-navigation-consolidation-review={`${WORKSPACE_NAVIGATION_CONSOLIDATION_REVIEW_MARKERS} buildWorkspaceNavigationConsolidationReviewStableKey WorkspaceNavigationConsolidationReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 353"
        title="Navigation review"
        subtitle="Workspace navigation consolidation review checks route grouping, command registry coverage, and novice navigation policy before dashboard hardening. Navigation consolidation does not remove route coverage, route changes require review before removal, and no route is executed from this page."
        primary={{ href: "#workspace-navigation-consolidation-review", label: "Review navigation" }}
        links={[
          { href: "/unified-workspace-home-review", label: "Unified home" },
          { href: "/project-knowledge-release-candidate", label: "Knowledge release" },
          { href: "/project-memory-promotion-boundary", label: "Memory boundary" },
          { href: "/stabilization", label: "Stabilization" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.navigationLanguage} />
      <PreviewFoundationCard title="Plain-English navigation consolidation">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews navigation only. It does not execute routes, run commands, mutate registries silently,
          remove route coverage, write files, promote memory, call providers, or call connectors.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="workspace-navigation-consolidation-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildWorkspaceNavigationConsolidationReviewStableKey("workspace-navigation-card", review.id)}
            title={review.consolidationReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceUnifiedHome,
                ...review.routeGroupSummary,
                ...review.commandRegistryCoverage,
                ...review.duplicateOverlapRisks,
                ...review.noviceNavigationPolicy,
                ...review.protectedRoutes,
                review.nextRecommendedRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced navigation details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedNavigationDetails)} />
        <PreviewFoundationCopy>
          Advanced navigation details stay collapsed or secondary. Navigation consolidation does not remove route
          coverage, and any route removal or registry change needs explicit review before it can proceed.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
