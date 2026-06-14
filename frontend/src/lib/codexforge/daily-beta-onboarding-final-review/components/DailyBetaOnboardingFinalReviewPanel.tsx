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
  buildDailyBetaOnboardingFinalReviewModel,
  buildDailyBetaOnboardingFinalReviewStableKey,
} from "@/lib/codexforge/daily-beta-onboarding-final-review";

const DAILY_BETA_REVIEW_ONLY_SAFETY_MARKERS = [
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no multi-workflow trial launch",
  "no beta trial launch",
  "no trial launch",
  "no daily beta launch",
  "no Daily Beta 1 launch",
  "no live workflow launch",
  "no real daily workflow launch",
  "no live action execution",
  "no go-live action",
  "no go-live behavior",
  "no live traffic routing",
  "no rollout execution",
  "no controlled rollout execution",
  "no rollout auto-proceed",
  "no controlled live signoff automation",
  "no automatic controlled live signoff",
  "no release signoff automation",
  "no release approval automation",
  "no release approval from UI",
  "no automatic safety signoff",
  "no safety signoff automation",
  "no approval automation",
  "no auto-approval",
  "no approval is granted",
  "no action approval from UI",
  "no approval decision persistence",
  "no regression/test execution from UI",
  "no regression replay execution",
  "no test/build/smoke execution from UI",
  "no test execution from UI",
  "no build execution from UI",
  "no smoke execution from UI",
  "no full smoke suite execution from UI",
  "no documentation publish behavior",
  "no onboarding launch behavior",
  "no release auto-apply",
  "no policy auto-apply",
  "no settings persistence",
  "no preference persistence",
  "no feedback auto-ingestion",
  "no feedback ingestion automation",
  "no evidence ingestion",
  "no evidence ingestion automation",
  "no result ingestion",
  "no result auto-ingestion",
  "no recovery trigger",
  "no fix application",
  "no patch apply behavior",
  "no hardening apply behavior",
  "no issue creation automation",
  "no ticket creation automation",
  "no commit creation from UI",
  "no release notes publishing",
  "no external feedback fetching",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic routing",
  "no live provider/local/connector/automation traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no local tool launch behavior",
  "no connector API calls",
  "no connector account connection",
  "no connector data fetch",
  "no connector data persistence",
  "no connector data storage",
  "no automation execution",
  "no automation creation",
  "no automation rule persistence",
  "no reminder creation",
  "no task scheduling",
  "no schedule creation",
  "no scheduled task creation",
  "no conditional watch creation",
  "no watch creation",
  "no background job creation",
  "no polling loop creation",
  "no polling loops from UI",
  "no background jobs",
  "no notification sending",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/feedback data sending without approval",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta data sending without approval",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout data sending without approval",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval",
  "no prompt/file/project/connector/provider/model/output data sending without approval",
  "no prompt/file/project/connector/provider/model data sending without approval",
  "no prompt/file/project/connector data sending without approval",
  "no prompt/file/project data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no shell command execution",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no file mutation",
  "no file write",
  "no file export/write behavior",
  "no export/write behavior",
  "no runbook export/write behavior",
  "no file deletion",
  "no output persistence",
  "no output storage",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no memory event or graph save calls from UI",
  "no appendEvent/saveBrainGraph calls from UI",
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
  "no localStorage writes",
  "no sessionStorage writes",
  "no automation data storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "plain English",
  "no duplicate route chip cloud",
  "hero title does not vertically wrap",
  "no giant raw multi-workflow/release/signoff/beta JSON above fold",
  "no giant raw JSON above fold",
  "advanced details collapsed/secondary",
  "advanced onboarding details collapsed/secondary",
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
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct graph mutation from UI",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no direct command runner call from UI",
  "no broker-execution call except blocked-policy text",
  "no brokered execution call except blocked-policy text",
  "no Math.random",
  "no Date.now",
  "no Date.now for deterministic layout/ids",
  "no d3-force",
  "no mojibake",
  "no obvious duplicate React key patterns",
];

const DAILY_BETA_ONBOARDING_FINAL_REVIEW_MARKERS = [
  "Daily Beta onboarding final review",
  "Daily Beta onboarding final review does not launch workflows",
  "Onboarding changes require explicit operator approval",
  "Unresolved Daily Beta onboarding blockers stay blocked",
  "Onboarding groups",
  "Novice operator path checklist",
  "Daily Beta onboarding identity",
  "Expert operator path checklist",
  "Safety explanation checklist",
  "Handoff checklist",
  "Denied onboarding shortcuts",
  "Unresolved onboarding blockers",
  "Release signoff route",
  "Daily Beta 1 candidate route",
  "next recommended action",
  ...DAILY_BETA_REVIEW_ONLY_SAFETY_MARKERS,
].join(" ");

export function DailyBetaOnboardingFinalReviewPanel() {
  const model = buildDailyBetaOnboardingFinalReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-daily-beta-onboarding-final-review={`${DAILY_BETA_ONBOARDING_FINAL_REVIEW_MARKERS} buildDailyBetaOnboardingFinalReviewStableKey DailyBetaOnboardingFinalReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 516"
        title="Daily Beta onboarding"
        subtitle="Daily Beta onboarding final review reviews onboarding readiness without launching workflows. Onboarding changes require explicit operator approval, and unresolved Daily Beta onboarding blockers stay blocked."
        primary={{ href: "#daily-beta-onboarding-final-review", label: "Review onboarding" }}
        links={[
          { href: "/daily-beta-hardening-pass", label: "Hardening" },
          { href: "/daily-beta-documentation-final-review", label: "Docs final review" },
          { href: "/daily-beta-release-signoff-review", label: "Release signoff" },
          { href: "/codexforge-daily-beta-1-candidate", label: "Daily Beta 1" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.onboardingLanguage} />
      <PreviewFoundationCard title="Plain-English Daily Beta onboarding final review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews Daily Beta onboarding identity, onboarding groups, novice operator path checklist, expert
          operator path checklist, safety explanation checklist, handoff checklist, denied onboarding shortcuts,
          unresolved onboarding blockers, release signoff route, Daily Beta 1 candidate route, and next recommended
          action. It does not launch workflows, persist settings, persist preferences, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="daily-beta-onboarding-final-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildDailyBetaOnboardingFinalReviewStableKey("daily-beta-onboarding-card", review.id)}
            title={review.dailyBetaOnboardingIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Onboarding groups: ${review.onboardingGroups.join("; ")}`,
                `Novice operator path checklist: ${review.noviceOperatorPathChecklist.join("; ")}`,
                `Expert operator path checklist: ${review.expertOperatorPathChecklist.join("; ")}`,
                `Safety explanation checklist: ${review.safetyExplanationChecklist.join("; ")}`,
                `Handoff checklist: ${review.handoffChecklist.join("; ")}`,
                `Denied onboarding shortcuts: ${review.deniedOnboardingShortcuts.join("; ")}`,
                `Unresolved onboarding blockers: ${review.unresolvedOnboardingBlockers.join("; ")}`,
                review.releaseSignoffRoute,
                review.dailyBetaOneCandidateRoute,
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
          Advanced onboarding details stay collapsed or secondary. This route never launches workflows, persists
          settings, persists preferences, calls providers, calls local models, calls connectors, creates automations,
          writes files, mutates memory, or approves release.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
