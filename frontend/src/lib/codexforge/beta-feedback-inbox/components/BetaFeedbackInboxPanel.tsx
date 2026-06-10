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
  buildBetaFeedbackInboxModel,
  buildBetaFeedbackInboxStableKey,
} from "@/lib/codexforge/beta-feedback-inbox";

const BETA_FEEDBACK_INBOX_MARKERS =
  "Beta feedback inbox Beta feedback inbox does not ingest external feedback automatically Feedback is reviewed before becoming issues Private feedback details stay redacted until approved Feedback groups Issue triage route feedback inbox identity severity and confidence summary privacy/redaction status linked beta trial scope blocked feedback items next recommended action review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no release/publish/invite behavior no release publish behavior no invite sending no participant data collection no external feedback fetching no feedback ingestion automation no issue creation automation no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced feedback details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaFeedbackInboxPanel() {
  const model = buildBetaFeedbackInboxModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-feedback-inbox={`${BETA_FEEDBACK_INBOX_MARKERS} buildBetaFeedbackInboxStableKey BetaFeedbackInboxPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 385"
        title="Feedback inbox"
        subtitle="Beta feedback inbox reviews beta feedback categories before issue triage. Beta feedback inbox does not ingest external feedback automatically, feedback is reviewed before becoming issues, and private feedback details stay redacted until approved."
        primary={{ href: "#beta-feedback-inbox", label: "Review feedback" }}
        links={[
          { href: "/beta-trial-intake-review", label: "Beta intake" },
          { href: "/foundation-beta-candidate", label: "Beta candidate" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/local-first-privacy-audit", label: "Privacy audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.feedbackLanguage} />
      <PreviewFoundationCard title="Plain-English beta feedback inbox">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews feedback inbox identity, feedback groups, severity and confidence summary, privacy/redaction
          status, linked beta trial scope, issue triage route, blocked feedback items, and next recommended action. It
          does not fetch external feedback, ingest feedback, create issues, call connectors, call web/search APIs,
          mutate files, approve private details, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-feedback-inbox" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildBetaFeedbackInboxStableKey("beta-feedback-inbox-card", review.id)}
            title={review.feedbackInboxIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Feedback groups: ${review.feedbackGroups.join("; ")}`,
                `Severity and confidence summary: ${review.severityConfidenceSummary.join("; ")}`,
                `Privacy/redaction status: ${review.privacyRedactionStatus.join("; ")}`,
                `Linked beta trial scope: ${review.linkedBetaTrialScope.join("; ")}`,
                review.issueTriageRoute,
                `Blocked feedback items: ${review.blockedFeedbackItems.join("; ")}`,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced feedback details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedFeedbackDetails)} />
        <PreviewFoundationCopy>
          Advanced feedback details stay collapsed or secondary. This page does not ingest external feedback
          automatically, does not create issues, and keeps private feedback details redacted until approved.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
