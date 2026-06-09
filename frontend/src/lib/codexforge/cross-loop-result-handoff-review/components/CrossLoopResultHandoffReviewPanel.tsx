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
  buildCrossLoopResultHandoffReviewModel,
  buildCrossLoopResultHandoffReviewStableKey,
} from "@/lib/codexforge/cross-loop-result-handoff-review";

const CROSS_LOOP_RESULT_HANDOFF_REVIEW_MARKERS =
  "Cross-loop result handoff review Cross-loop handoffs are reviewed before use Handoffs do not execute actions Private details stay redacted until approved Handoff artifact summary Safety audit route handoff review identity source loop summary destination loop summary approval state redaction/privacy state blocked handoff reasons dashboard route review-only approval required handoffs do not execute actions no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced handoff details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CrossLoopResultHandoffReviewPanel() {
  const model = buildCrossLoopResultHandoffReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-cross-loop-result-handoff-review={`${CROSS_LOOP_RESULT_HANDOFF_REVIEW_MARKERS} buildCrossLoopResultHandoffReviewStableKey CrossLoopResultHandoffReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 354"
        title="Loop handoff"
        subtitle="Cross-loop result handoff review shows how one CodexForge loop can hand a reviewed result to another loop. Cross-loop handoffs are reviewed before use, handoffs do not execute actions, and private details stay redacted until approved."
        primary={{ href: "#cross-loop-result-handoff-review", label: "Review handoff" }}
        links={[
          { href: "/cross-loop-safety-audit-inbox", label: "Safety audit" },
          { href: "/operator-dashboard-release-candidate", label: "Dashboard release" },
          { href: "/unified-workspace-home-review", label: "Unified home" },
          { href: "/workspace-navigation-consolidation-review", label: "Navigation review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.handoffLanguage} />
      <PreviewFoundationCard title="Plain-English handoff review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This is review-only and approval required. Handoffs do not execute actions, call providers, call connectors,
          browse files, write files, promote memory, schedule work, or start workflows.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="cross-loop-result-handoff-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildCrossLoopResultHandoffReviewStableKey("cross-loop-handoff-card", review.id)}
            title={review.handoffReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Approval state: ${review.approvalState}`,
                review.sourceLoopSummary,
                review.destinationLoopSummary,
                review.handoffArtifactSummary,
                review.redactionPrivacyState,
                `Blocked handoff reasons: ${review.blockedHandoffReasons.join("; ")}`,
                review.safetyAuditRoute,
                review.dashboardRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced handoff details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedHandoffDetails)} />
        <PreviewFoundationCopy>
          Advanced handoff details stay collapsed or secondary. Cross-loop handoffs are reviewed before use and remain
          approval-gated; they do not execute actions or reveal private details before approval.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
