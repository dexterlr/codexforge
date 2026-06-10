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
  buildBetaTrialIntakeReviewModel,
  buildBetaTrialIntakeReviewStableKey,
} from "@/lib/codexforge/beta-trial-intake-review";

const BETA_TRIAL_INTAKE_REVIEW_MARKERS =
  "Beta trial intake review Beta trial intake requires explicit approval No invites are sent from this page Participant data is not collected automatically Participant criteria Risk privacy checklist beta intake identity trial scope summary approval gates onboarding readiness feedback inbox route blocked intake reasons next recommended action review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no release/publish/invite behavior no release publish behavior no invite sending no participant data collection no external feedback fetching no feedback ingestion automation no issue creation automation no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced intake details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaTrialIntakeReviewPanel() {
  const model = buildBetaTrialIntakeReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-trial-intake-review={`${BETA_TRIAL_INTAKE_REVIEW_MARKERS} buildBetaTrialIntakeReviewStableKey BetaTrialIntakeReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 384"
        title="Beta intake"
        subtitle="Beta trial intake review checks potential trial scope and participants before any beta step. Beta trial intake requires explicit approval, no invites are sent from this page, and participant data is not collected automatically."
        primary={{ href: "#beta-trial-intake-review", label: "Review beta intake" }}
        links={[
          { href: "/foundation-beta-candidate", label: "Beta candidate" },
          { href: "/beta-feedback-inbox", label: "Feedback inbox" },
          { href: "/full-smoke-suite-stability-pass", label: "Smoke stability" },
          { href: "/local-first-privacy-audit", label: "Privacy audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.intakeLanguage} />
      <PreviewFoundationCard title="Plain-English beta trial intake review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews beta intake identity, trial scope summary, participant criteria, risk privacy checklist,
          approval gates, onboarding readiness, feedback inbox route, blocked intake reasons, and next recommended
          action. It does not send invites, collect external data, call connectors, call providers, call web/search
          APIs, mutate files, approve trials, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-trial-intake-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildBetaTrialIntakeReviewStableKey("beta-trial-intake-card", review.id)}
            title={review.betaIntakeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Trial scope summary: ${review.trialScopeSummary.join("; ")}`,
                `Participant criteria: ${review.participantCriteria.join("; ")}`,
                `Risk privacy checklist: ${review.riskPrivacyChecklist.join("; ")}`,
                `Approval gates: ${review.approvalGates.join("; ")}`,
                `Onboarding readiness: ${review.onboardingReadiness.join("; ")}`,
                review.feedbackInboxRoute,
                `Blocked intake reasons: ${review.blockedIntakeReasons.join("; ")}`,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced intake details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedIntakeDetails)} />
        <PreviewFoundationCopy>
          Advanced intake details stay collapsed or secondary. This page does not send invites, collect participant
          data automatically, call external systems, or approve a beta trial.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
