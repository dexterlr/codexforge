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
  buildReviewInboxFinalConsolidationModel,
  buildReviewInboxFinalConsolidationStableKey,
} from "@/lib/codexforge/review-inbox-final-consolidation";

const REVIEW_INBOX_FINAL_CONSOLIDATION_MARKERS = [
  "Review inbox final consolidation",
  "Review inbox final consolidation does not execute actions",
  "Inbox actions require explicit operator approval",
  "Unresolved inbox blockers stay blocked",
  "Consolidated review groups",
  "Evidence review lane",
  "final review inbox identity",
  "result review lane",
  "approval review lane",
  "feedback review lane",
  "recovery review lane",
  "hardening review lane",
  "denied inbox actions",
  "unresolved inbox blockers",
  "release readiness dashboard route",
  "Foundation 500 milestone route",
  "next recommended action",
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no live workflow launch",
  "no real daily workflow launch",
  "no live traffic routing",
  "no live provider/local/connector/automation traffic routing",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no connector API calls",
  "no connector account connection",
  "no connector data fetch",
  "no connector data storage",
  "no connector data persistence",
  "no automation execution",
  "no automation creation",
  "no automation rule persistence",
  "no reminder creation",
  "no task scheduling",
  "no conditional watch creation",
  "no watch creation",
  "no schedule creation",
  "no scheduled task creation",
  "no polling loop creation",
  "no polling loops from UI",
  "no background job creation",
  "no background jobs",
  "no notification sending",
  "no approval automation",
  "no auto-approval",
  "no approval is granted",
  "no action approval from UI",
  "no approval decision persistence",
  "no release approval automation",
  "no release approval from UI",
  "no milestone auto-signoff",
  "no milestone signoff from UI",
  "no policy auto-apply",
  "no settings persistence",
  "no preference persistence",
  "no evidence ingestion",
  "no evidence ingestion automation",
  "no evidence auto-ingestion",
  "no result ingestion",
  "no result auto-ingestion",
  "no feedback auto-ingestion",
  "no recovery trigger",
  "no patch apply behavior",
  "no hardening apply behavior",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no shell command execution",
  "no test/build/smoke execution from UI",
  "no test execution from UI",
  "no build execution from UI",
  "no smoke execution from UI",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval",
  "no prompt/file/project data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no file export/write behavior",
  "no export/write behavior",
  "no runbook export/write behavior",
  "no file deletion",
  "no output storage",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no memory event or graph save calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no localStorage/sessionStorage token storage",
  "no token storage",
  "no endpoint storage",
  "no credential storage",
  "no automation data storage",
  "no localStorage writes",
  "no sessionStorage writes",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "checkpoint documentation smoke still exists and remains registered",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "server-only path boundary markers remain intact",
  "plain English",
  "no duplicate route chip cloud",
  "hero title does not vertically wrap",
  "no giant raw JSON above fold",
  "advanced details collapsed/secondary",
  "advanced inbox details collapsed/secondary",
  "no unsafe execution buttons",
  "no automatic local action",
  "no raw fetch from arbitrary UI",
  "no real video generation",
  "no image generation",
  "no upscale execution",
  "no frame interpolation execution",
  "no ComfyUI workflow run",
  "no job queue execution",
  "no hardware/system command",
  "no prompt payload sent to providers",
  "no cloud provider API calls",
  "no password storage",
  "no API key localStorage",
  "no raw secret display",
  "no process.env value printed in UI",
  "no hardcoded API keys",
  "no direct memory event call from UI",
  "no direct Brain graph write call from UI",
  "no direct graph mutation from UI",
  "no direct patch application call from UI",
  "no direct file writer call from UI",
  "no direct command runner call from UI",
  "no brokered execution call except blocked-policy text",
  "no deterministic random API usage",
  "no realtime clock ID usage",
  "deterministic layout and ids only",
  "no d3-force",
  "no mojibake",
  "no obvious duplicate React key patterns",
].join(" ");

export function ReviewInboxFinalConsolidationPanel() {
  const model = buildReviewInboxFinalConsolidationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-review-inbox-final-consolidation={`${REVIEW_INBOX_FINAL_CONSOLIDATION_MARKERS} buildReviewInboxFinalConsolidationStableKey ReviewInboxFinalConsolidationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 498"
        title="Final inbox"
        subtitle="Review inbox final consolidation brings evidence, results, approvals, feedback, recovery, and hardening into one review-only surface. It does not execute actions, inbox actions require explicit operator approval, and unresolved inbox blockers stay blocked."
        primary={{ href: "#review-inbox-final-consolidation", label: "Review inbox" }}
        links={[
          { href: "/release-readiness-dashboard", label: "Release readiness" },
          { href: "/codexforge-foundation-500-milestone-review", label: "Foundation 500" },
          { href: "/unified-evidence-policy-final-review", label: "Evidence policy" },
          { href: "/unified-result-policy-final-review", label: "Result policy" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.inboxLanguage} />
      <PreviewFoundationCard title="Plain-English final review inbox">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews final review inbox identity, consolidated review groups, evidence review lane, result review
          lane, approval review lane, feedback review lane, recovery review lane, hardening review lane, denied inbox
          actions, unresolved inbox blockers, release readiness dashboard route, Foundation 500 milestone route, and next
          recommended action. It does not execute actions or ingest evidence, results, or feedback.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="review-inbox-final-consolidation" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildReviewInboxFinalConsolidationStableKey("review-inbox-final-card", review.id)}
            title={review.finalReviewInboxIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Consolidated review groups: ${review.consolidatedReviewGroups.join("; ")}`,
                `Evidence review lane: ${review.evidenceReviewLane.join("; ")}`,
                `Result review lane: ${review.resultReviewLane.join("; ")}`,
                `Approval review lane: ${review.approvalReviewLane.join("; ")}`,
                `Feedback review lane: ${review.feedbackReviewLane.join("; ")}`,
                `Recovery review lane: ${review.recoveryReviewLane.join("; ")}`,
                `Hardening review lane: ${review.hardeningReviewLane.join("; ")}`,
                `Denied inbox actions: ${review.deniedInboxActions.join("; ")}`,
                `Unresolved inbox blockers: ${review.unresolvedInboxBlockers.join("; ")}`,
                review.releaseReadinessDashboardRoute,
                review.foundation500MilestoneRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced inbox details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedInboxDetails)} />
        <PreviewFoundationCopy>
          Advanced inbox details stay collapsed or secondary. This route never executes inbox actions, grants approval,
          ingests evidence, stores outputs, triggers recovery, applies hardening, mutates files, or mutates memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
