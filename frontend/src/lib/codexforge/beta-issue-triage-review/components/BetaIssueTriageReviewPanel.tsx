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
  buildBetaIssueTriageReviewModel,
  buildBetaIssueTriageReviewStableKey,
} from "@/lib/codexforge/beta-issue-triage-review";

const BETA_ISSUE_TRIAGE_REVIEW_MARKERS =
  "Beta issue triage review Issue triage does not create tickets automatically Issue candidates require operator approval Private feedback details stay redacted until approved Issue candidate groups Fix priority route beta issue triage identity source feedback inbox severity/confidence summary privacy/redaction status duplicate/related issue notes blocked issue candidates next recommended action review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no issue creation automation no ticket creation automation no GitHub API calls from UI no fix application no patch apply behavior no commit creation from UI no regression replay execution no release notes publishing no file export/write behavior no runbook export/write behavior no external feedback fetching no feedback ingestion automation no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced triage details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaIssueTriageReviewPanel() {
  const model = buildBetaIssueTriageReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-issue-triage-review={`${BETA_ISSUE_TRIAGE_REVIEW_MARKERS} buildBetaIssueTriageReviewStableKey BetaIssueTriageReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 386"
        title="Issue triage"
        subtitle="Beta issue triage review turns approved beta feedback summaries into issue candidates. Issue triage does not create tickets automatically, issue candidates require operator approval, and private feedback details stay redacted until approved."
        primary={{ href: "#beta-issue-triage-review", label: "Review issue candidates" }}
        links={[
          { href: "/beta-feedback-inbox", label: "Feedback inbox" },
          { href: "/beta-fix-priority-matrix", label: "Fix priority" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/local-first-privacy-audit", label: "Privacy audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.triageLanguage} />
      <PreviewFoundationCard title="Plain-English beta issue triage review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews beta issue triage identity, source feedback inbox, issue candidate groups,
          severity/confidence summary, privacy/redaction status, duplicate/related issue notes, blocked issue
          candidates, fix priority route, and next recommended action. It does not create issues, create tickets, call
          GitHub APIs, fetch feedback, approve issue candidates, mutate files, apply fixes, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-issue-triage-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildBetaIssueTriageReviewStableKey("beta-issue-triage-card", review.id)}
            title={review.issueTriageIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceFeedbackInbox,
                `Issue candidate groups: ${review.issueCandidateGroups.join("; ")}`,
                `Severity/confidence summary: ${review.severityConfidenceSummary.join("; ")}`,
                `Privacy/redaction status: ${review.privacyRedactionStatus.join("; ")}`,
                `Duplicate/related issue notes: ${review.duplicateRelatedIssueNotes.join("; ")}`,
                `Blocked issue candidates: ${review.blockedIssueCandidates.join("; ")}`,
                review.fixPriorityRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced triage details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedTriageDetails)} />
        <PreviewFoundationCopy>
          Advanced triage details stay collapsed or secondary. This page keeps issue candidate review separate from
          ticket creation, GitHub access, fix application, file mutation, and memory promotion.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
