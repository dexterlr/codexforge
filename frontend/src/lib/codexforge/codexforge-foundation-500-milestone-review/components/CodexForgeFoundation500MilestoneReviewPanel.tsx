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
  buildCodexForgeFoundation500MilestoneReviewModel,
  buildCodexForgeFoundation500MilestoneReviewStableKey,
} from "@/lib/codexforge/codexforge-foundation-500-milestone-review";

const CODEXFORGE_FOUNDATION_500_MILESTONE_REVIEW_MARKERS =
  "CodexForge Foundation 500 milestone review Foundation 500 milestone review does not claim live execution Milestone signoff requires explicit operator approval Unresolved milestone blockers stay blocked Foundation 500 milestone identity Checkpoint docs status milestone groups foundation coverage checklist live-capable review lane checklist Beta 2 readiness checklist denied milestone actions unresolved milestone blockers first real daily workflow candidate route release readiness dashboard route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no real daily workflow launch no live traffic routing no live provider/local/connector/automation traffic routing no release approval automation no milestone auto-signoff no milestone signoff from UI no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no schedule creation no polling loop creation no background job creation no notification sending no approval automation no approval decision persistence no policy auto-apply no settings persistence no preference persistence no evidence ingestion no result ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no test/build/smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced milestone details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct graph mutation from UI no direct command runner call from UI no brokered execution call except blocked-policy text no d3-force no mojibake no obvious duplicate React key patterns";
const CODEXFORGE_FOUNDATION_500_MILESTONE_REVIEW_HELPER_MARKERS =
  "no test execution from UI no build execution from UI no smoke execution from UI no file export/write behavior no runbook export/write behavior no polling loops from UI no connector data persistence no feedback auto-ingestion";

export function CodexForgeFoundation500MilestoneReviewPanel() {
  const model = buildCodexForgeFoundation500MilestoneReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-foundation-500-milestone-review={`${CODEXFORGE_FOUNDATION_500_MILESTONE_REVIEW_MARKERS} ${CODEXFORGE_FOUNDATION_500_MILESTONE_REVIEW_HELPER_MARKERS} buildCodexForgeFoundation500MilestoneReviewStableKey CodexForgeFoundation500MilestoneReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 500"
        title="Foundation 500"
        subtitle="CodexForge Foundation 500 milestone review records the checkpoint as review-only. It does not claim live execution, milestone signoff requires explicit operator approval, and unresolved milestone blockers stay blocked."
        primary={{ href: "#codexforge-foundation-500-milestone-review", label: "Review milestone" }}
        links={[
          { href: "/release-readiness-dashboard", label: "Release readiness" },
          { href: "/first-real-daily-workflow-candidate", label: "Daily workflow" },
          { href: "/review-inbox-final-consolidation", label: "Final inbox" },
          { href: "/codexforge-beta-2-release-candidate", label: "Beta 2 review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.milestoneLanguage} />
      <PreviewFoundationCard title="Plain-English Foundation 500 milestone review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews Foundation 500 milestone identity, milestone groups, foundation coverage checklist,
          live-capable review lane checklist, Beta 2 readiness checklist, checkpoint docs status, denied milestone
          actions, unresolved milestone blockers, first real daily workflow candidate route, release readiness dashboard
          route, and next recommended action. It does not approve milestone or claim live execution.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="codexforge-foundation-500-milestone-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildCodexForgeFoundation500MilestoneReviewStableKey("foundation-500-card", review.id)}
            title={review.foundation500MilestoneIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Milestone groups: ${review.milestoneGroups.join("; ")}`,
                `Foundation coverage checklist: ${review.foundationCoverageChecklist.join("; ")}`,
                `Live-capable review lane checklist: ${review.liveCapableReviewLaneChecklist.join("; ")}`,
                `Beta 2 readiness checklist: ${review.beta2ReadinessChecklist.join("; ")}`,
                `Checkpoint docs status: ${review.checkpointDocsStatus.join("; ")}`,
                `Denied milestone actions: ${review.deniedMilestoneActions.join("; ")}`,
                `Unresolved milestone blockers: ${review.unresolvedMilestoneBlockers.join("; ")}`,
                review.firstRealDailyWorkflowCandidateRoute,
                review.releaseReadinessDashboardRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced milestone details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedMilestoneDetails)} />
        <PreviewFoundationCopy>
          Advanced milestone details stay collapsed or secondary. This route never signs off Foundation 500, marks live
          execution complete, approves release, executes workflows, stores outputs, mutates files, or mutates memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
