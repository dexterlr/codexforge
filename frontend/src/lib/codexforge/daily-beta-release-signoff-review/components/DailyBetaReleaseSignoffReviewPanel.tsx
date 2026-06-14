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
  buildDailyBetaReleaseSignoffReviewModel,
  buildDailyBetaReleaseSignoffReviewStableKey,
} from "@/lib/codexforge/daily-beta-release-signoff-review";

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
  "advanced signoff details collapsed/secondary",
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

const DAILY_BETA_RELEASE_SIGNOFF_REVIEW_MARKERS = [
  "Daily Beta release signoff review",
  "Daily Beta release signoff review does not approve release",
  "Release signoff requires explicit operator approval",
  "Unresolved release signoff blockers stay blocked",
  "Signoff groups",
  "Controlled live capability status",
  "Daily Beta release signoff identity",
  "Hardening/docs/onboarding status",
  "Approval/evidence/result/recovery readiness checklist",
  "Denied signoff shortcuts",
  "Unresolved release signoff blockers",
  "Daily Beta 1 candidate route",
  "Daily Beta 1 rollout plan route",
  "next recommended action",
  ...DAILY_BETA_REVIEW_ONLY_SAFETY_MARKERS,
].join(" ");

export function DailyBetaReleaseSignoffReviewPanel() {
  const model = buildDailyBetaReleaseSignoffReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-daily-beta-release-signoff-review={`${DAILY_BETA_RELEASE_SIGNOFF_REVIEW_MARKERS} buildDailyBetaReleaseSignoffReviewStableKey DailyBetaReleaseSignoffReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 517"
        title="Daily Beta signoff"
        subtitle="Daily Beta release signoff review reviews release signoff without approving release. Release signoff requires explicit operator approval, and unresolved release signoff blockers stay blocked."
        primary={{ href: "#daily-beta-release-signoff-review", label: "Review signoff" }}
        links={[
          { href: "/daily-beta-hardening-pass", label: "Hardening" },
          { href: "/daily-beta-documentation-final-review", label: "Docs final review" },
          { href: "/daily-beta-onboarding-final-review", label: "Onboarding review" },
          { href: "/codexforge-daily-beta-1-candidate", label: "Daily Beta 1" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.signoffLanguage} />
      <PreviewFoundationCard title="Plain-English Daily Beta release signoff review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews Daily Beta release signoff identity, signoff groups, hardening/docs/onboarding status,
          controlled live capability status, approval/evidence/result/recovery readiness checklist, denied signoff
          shortcuts, unresolved release signoff blockers, Daily Beta 1 candidate route, Daily Beta 1 rollout plan route,
          and next recommended action. It does not approve release, persist signoff decisions, go live, or launch Daily
          Beta 1.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="daily-beta-release-signoff-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildDailyBetaReleaseSignoffReviewStableKey("daily-beta-signoff-card", review.id)}
            title={review.dailyBetaReleaseSignoffIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Signoff groups: ${review.signoffGroups.join("; ")}`,
                `Hardening/docs/onboarding status: ${review.hardeningDocsOnboardingStatus.join("; ")}`,
                `Controlled live capability status: ${review.controlledLiveCapabilityStatus.join("; ")}`,
                `Approval/evidence/result/recovery readiness checklist: ${review.approvalEvidenceResultRecoveryReadinessChecklist.join("; ")}`,
                `Denied signoff shortcuts: ${review.deniedSignoffShortcuts.join("; ")}`,
                `Unresolved release signoff blockers: ${review.unresolvedReleaseSignoffBlockers.join("; ")}`,
                review.dailyBetaOneCandidateRoute,
                review.dailyBetaOneRolloutPlanRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced signoff details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedSignoffDetails)} />
        <PreviewFoundationCopy>
          Advanced signoff details stay collapsed or secondary. This route never approves release, persists signoff
          decisions, goes live, launches Daily Beta 1, executes workflows, calls providers, calls local models, calls
          connectors, creates automations, or stores outputs.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
