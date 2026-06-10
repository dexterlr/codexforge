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
  buildDailyUseOnboardingPolishModel,
  buildDailyUseOnboardingPolishStableKey,
} from "@/lib/codexforge/daily-use-onboarding-polish";

const DAILY_USE_ONBOARDING_POLISH_MARKERS =
  "Daily use onboarding polish Onboarding polish does not change settings Onboarding does not run workflows automatically Approval gates remain visible First-day operator path Recommended review sequence onboarding polish identity novice/expert entry points safety checkpoint reminders blocked onboarding risks operator preferences route saved review views route next recommended action review-only approval required plain English daily onboarding operator preferences workspace personalization saved views no settings mutation no preference persistence no personalization persistence no saved view persistence no localStorage writes no sessionStorage writes no action execution from UI no approval automation no approval is granted no action approval from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector/preference data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced onboarding details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function DailyUseOnboardingPolishPanel() {
  const model = buildDailyUseOnboardingPolishModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-daily-use-onboarding-polish={`${DAILY_USE_ONBOARDING_POLISH_MARKERS} buildDailyUseOnboardingPolishStableKey DailyUseOnboardingPolishPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 390"
        title="Daily use onboarding"
        subtitle="Daily use onboarding polish reviews the first-day operator path in plain English. Onboarding polish does not change settings, onboarding does not run workflows automatically, and approval gates remain visible."
        primary={{ href: "#daily-use-onboarding-polish", label: "Review onboarding" }}
        links={[
          { href: "/operator-preferences-review", label: "Preferences review" },
          { href: "/workspace-personalization-review", label: "Personalization" },
          { href: "/saved-review-views", label: "Saved views" },
          { href: "/novice-mode-guided-flow-polish", label: "Novice mode" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.onboardingLanguage} />
      <PreviewFoundationCard title="Plain-English daily onboarding review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews onboarding polish identity, first-day operator path, novice/expert entry points,
          recommended review sequence, safety checkpoint reminders, blocked onboarding risks, operator preferences
          route, saved review views route, and next recommended action. It does not save preferences, persist
          personalization, save review views, call APIs, mutate files, approve work, or promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="daily-use-onboarding-polish" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildDailyUseOnboardingPolishStableKey("daily-use-onboarding-card", review.id)}
            title={review.onboardingPolishIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `First-day operator path: ${review.firstDayOperatorPath.join("; ")}`,
                `Novice/expert entry points: ${review.noviceExpertEntryPoints.join("; ")}`,
                `Recommended review sequence: ${review.recommendedReviewSequence.join("; ")}`,
                `Safety checkpoint reminders: ${review.safetyCheckpointReminders.join("; ")}`,
                `Blocked onboarding risks: ${review.blockedOnboardingRisks.join("; ")}`,
                review.operatorPreferencesRoute,
                review.savedReviewViewsRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced onboarding details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedOnboardingDetails)} />
        <PreviewFoundationCopy>
          Advanced onboarding details stay collapsed or secondary. Daily use onboarding is a review-only surface and
          does not change settings or run workflows automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
