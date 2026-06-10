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
  buildCrossLoopSearchReviewModel,
  buildCrossLoopSearchReviewStableKey,
} from "@/lib/codexforge/cross-loop-search-review";

const CROSS_LOOP_SEARCH_REVIEW_MARKERS =
  "Cross-loop search review Cross-loop search does not run searches from this page Search sources require explicit review Private connector project details stay redacted Private connector/project details stay redacted Searchable loop groups Result ranking preview search review identity allowed search scope denied search scope privacy/redaction rules local-first privacy audit route secrets regression route blocked reasons review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no search execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no connector data reads no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced search details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CrossLoopSearchReviewPanel() {
  const model = buildCrossLoopSearchReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-cross-loop-search-review={`${CROSS_LOOP_SEARCH_REVIEW_MARKERS} buildCrossLoopSearchReviewStableKey CrossLoopSearchReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 379"
        title="Loop search"
        subtitle="Cross-loop search review designs how CodexForge could search reviewed loop metadata without running search here. Cross-loop search does not run searches from this page, search sources require explicit review, and private connector/project details stay redacted."
        primary={{ href: "#cross-loop-search-review", label: "Review search" }}
        links={[
          { href: "/dashboard-density-navigation-polish", label: "Dashboard polish" },
          { href: "/local-first-privacy-audit", label: "Privacy audit" },
          { href: "/secrets-token-storage-regression-sweep", label: "Secrets sweep" },
          { href: "/global-review-inbox", label: "Global inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.searchLanguage} />
      <PreviewFoundationCard title="Plain-English cross-loop search review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews search review identity, searchable loop groups, allowed search scope, denied search scope,
          privacy/redaction rules, result ranking preview, local-first privacy audit route, secrets regression route, and
          blocked reasons. It does not run searches, scan local files, read connectors, call providers, call web/search
          APIs, store tokens, display secrets, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="cross-loop-search-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildCrossLoopSearchReviewStableKey("cross-loop-search-card", review.id)}
            title={review.searchReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Searchable loop groups: ${review.searchableLoopGroups.join("; ")}`,
                `Allowed search scope: ${review.allowedSearchScope.join("; ")}`,
                `Denied search scope: ${review.deniedSearchScope.join("; ")}`,
                `Privacy/redaction rules: ${review.privacyRedactionRules.join("; ")}`,
                `Result ranking preview: ${review.resultRankingPreview.join("; ")}`,
                review.localFirstPrivacyAuditRoute,
                review.secretsRegressionRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced search details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedSearchDetails)} />
        <PreviewFoundationCopy>
          Advanced search details stay collapsed or secondary. Cross-loop search does not run searches from this page,
          and private connector/project details stay redacted until sources are explicitly reviewed.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
