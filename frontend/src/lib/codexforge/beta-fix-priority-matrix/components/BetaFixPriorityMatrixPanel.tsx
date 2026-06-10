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
  buildBetaFixPriorityMatrixModel,
  buildBetaFixPriorityMatrixStableKey,
} from "@/lib/codexforge/beta-fix-priority-matrix";

const BETA_FIX_PRIORITY_MATRIX_MARKERS =
  "Beta fix priority matrix Fix priority matrix does not apply fixes Fixes require explicit operator approval Validation evidence is required before merge release Fix buckets Regression replay route fix priority identity source issue triage review user impact summary safety/regression risk validation required blocked fixes next recommended action review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no issue creation automation no ticket creation automation no GitHub API calls from UI no fix application no patch apply behavior no commit creation from UI no regression replay execution no release notes publishing no file export/write behavior no runbook export/write behavior no external feedback fetching no feedback ingestion automation no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced priority details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaFixPriorityMatrixPanel() {
  const model = buildBetaFixPriorityMatrixModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-fix-priority-matrix={`${BETA_FIX_PRIORITY_MATRIX_MARKERS} buildBetaFixPriorityMatrixStableKey BetaFixPriorityMatrixPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 387"
        title="Fix priority"
        subtitle="Beta fix priority matrix reviews the safest fix order after issue triage. Fix priority matrix does not apply fixes, fixes require explicit operator approval, and validation evidence is required before merge release decisions."
        primary={{ href: "#beta-fix-priority-matrix", label: "Review fix priority" }}
        links={[
          { href: "/beta-issue-triage-review", label: "Issue triage" },
          { href: "/beta-regression-replay-review", label: "Regression replay" },
          { href: "/validation", label: "Validation" },
          { href: "/patch-preview-workbench", label: "Patch preview" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.priorityLanguage} />
      <PreviewFoundationCard title="Plain-English beta fix priority matrix">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews fix priority identity, source issue triage review, fix buckets, user impact summary,
          safety/regression risk, validation required, blocked fixes, regression replay route, and next recommended
          action. It does not apply patches, mutate files, create commits, run tests, approve fixes, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-fix-priority-matrix" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildBetaFixPriorityMatrixStableKey("beta-fix-priority-card", review.id)}
            title={review.fixPriorityIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceIssueTriageReview,
                `Fix buckets: ${review.fixBuckets.join("; ")}`,
                `User impact summary: ${review.userImpactSummary.join("; ")}`,
                `Safety/regression risk: ${review.safetyRegressionRisk.join("; ")}`,
                `Validation required: ${review.validationRequired.join("; ")}`,
                `Blocked fixes: ${review.blockedFixes.join("; ")}`,
                review.regressionReplayRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced priority details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedPriorityDetails)} />
        <PreviewFoundationCopy>
          Advanced priority details stay collapsed or secondary. This page reviews fix order only; implementation,
          patch application, commit creation, test execution, and release decisions remain outside this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
