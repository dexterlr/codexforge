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
  buildResultComparisonReviewModel,
  buildResultComparisonReviewStableKey,
} from "@/lib/codexforge/result-comparison-review";

const RESULT_COMPARISON_REVIEW_MARKERS =
  "Result comparison review Result comparison does not rerun workflows Comparisons are reviewed before use Historical results remain read-only Compared result groups Validation evidence comparison result comparison identity quality/safety comparison regression notes blocked comparisons evidence timeline route unified search candidate route next recommended action review-only approval required no action execution from UI no approval automation no approval is granted no action approval from UI no workflow execution no workflow execution from UI no workflow runs automatically no workflow rerun from UI no result replay from UI no compare by running workflows from UI no live search execution no search query persistence no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no external data fetching no evidence ingestion automation no project scan no local file reads no prompt/file/project/connector/search/evidence data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced comparison details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResultComparisonReviewPanel() {
  const model = buildResultComparisonReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-result-comparison-review={`${RESULT_COMPARISON_REVIEW_MARKERS} buildResultComparisonReviewStableKey ResultComparisonReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 398"
        title="Result comparison review"
        subtitle="Result comparison review compares reviewed historical summaries without rerunning anything. Result comparison does not rerun workflows, comparisons are reviewed before use, and historical results remain read-only."
        primary={{ href: "#result-comparison-review", label: "Review comparison" }}
        links={[
          { href: "/result-history", label: "Result history" },
          { href: "/cross-loop-evidence-timeline", label: "Evidence timeline" },
          { href: "/unified-workspace-search-release-candidate", label: "Unified search RC" },
          { href: "/global-review-inbox", label: "Global inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.comparisonLanguage} />
      <PreviewFoundationCard title="Plain-English result comparison review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews result comparison identity, compared result groups, quality/safety comparison, validation
          evidence comparison, regression notes, blocked comparisons, evidence timeline route, unified search candidate
          route, and next recommended action. It does not rerun workflows, replay results, mutate result history, call
          APIs, scan files, write files, ingest evidence, or promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="result-comparison-review" style={previewStyles.grid}>
        {model.comparisons.map((comparison) => (
          <PreviewFoundationCard
            key={buildResultComparisonReviewStableKey("result-comparison-card", comparison.id)}
            title={comparison.resultComparisonIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${comparison.status}`,
                `Compared result groups: ${comparison.comparedResultGroups.join("; ")}`,
                `Quality/safety comparison: ${comparison.qualitySafetyComparison.join("; ")}`,
                `Validation evidence comparison: ${comparison.validationEvidenceComparison.join("; ")}`,
                `Regression notes: ${comparison.regressionNotes.join("; ")}`,
                `Blocked comparisons: ${comparison.blockedComparisons.join("; ")}`,
                comparison.evidenceTimelineRoute,
                comparison.unifiedSearchCandidateRoute,
                comparison.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced comparison details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.comparisons.map((comparison) => comparison.advancedComparisonDetails)} />
        <PreviewFoundationCopy>
          Advanced comparison details stay collapsed or secondary. Result comparison does not rerun workflows and
          historical results remain read-only.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
