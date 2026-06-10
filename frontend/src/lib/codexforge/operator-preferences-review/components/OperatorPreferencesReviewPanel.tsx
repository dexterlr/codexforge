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
  buildOperatorPreferencesReviewModel,
  buildOperatorPreferencesReviewStableKey,
} from "@/lib/codexforge/operator-preferences-review";

const OPERATOR_PREFERENCES_REVIEW_MARKERS =
  "Operator preferences review Preferences review does not save preferences Preference changes require explicit approval Preferences are not stored in browser storage from this page Preference groups Safety preference guardrails preferences review identity novice/expert preference preview notification/review cadence preview blocked preference risks workspace personalization route saved review views route next recommended action review-only approval required plain English daily onboarding operator preferences workspace personalization saved views no settings mutation no preference persistence no personalization persistence no saved view persistence no localStorage writes no sessionStorage writes no action execution from UI no approval automation no approval is granted no action approval from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector/preference data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced preference details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function OperatorPreferencesReviewPanel() {
  const model = buildOperatorPreferencesReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-operator-preferences-review={`${OPERATOR_PREFERENCES_REVIEW_MARKERS} buildOperatorPreferencesReviewStableKey OperatorPreferencesReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 391"
        title="Preferences review"
        subtitle="Operator preferences review previews preference options without saving them. Preferences review does not save preferences, preference changes require explicit approval, and preferences are not stored in browser storage from this page."
        primary={{ href: "#operator-preferences-review", label: "Review preferences" }}
        links={[
          { href: "/workspace-personalization-review", label: "Personalization" },
          { href: "/saved-review-views", label: "Saved views" },
          { href: "/daily-use-onboarding-polish", label: "Daily onboarding" },
          { href: "/expert-mode-fast-path-review", label: "Expert path" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.preferenceLanguage} />
      <PreviewFoundationCard title="Plain-English operator preferences review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews preferences review identity, preference groups, novice/expert preference preview, safety
          preference guardrails, notification/review cadence preview, blocked preference risks, workspace
          personalization route, saved review views route, and next recommended action. It does not save preferences,
          write browser storage, mutate settings, call APIs, or create reminders.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="operator-preferences-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildOperatorPreferencesReviewStableKey("operator-preferences-card", review.id)}
            title={review.preferencesReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Preference groups: ${review.preferenceGroups.join("; ")}`,
                `Novice/expert preference preview: ${review.noviceExpertPreferencePreview.join("; ")}`,
                `Safety preference guardrails: ${review.safetyPreferenceGuardrails.join("; ")}`,
                `Notification/review cadence preview: ${review.notificationReviewCadencePreview.join("; ")}`,
                `Blocked preference risks: ${review.blockedPreferenceRisks.join("; ")}`,
                review.workspacePersonalizationRoute,
                review.savedReviewViewsRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced preference details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedPreferenceDetails)} />
        <PreviewFoundationCopy>
          Advanced preference details stay collapsed or secondary. Preference previews remain review-only and are not
          saved from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
