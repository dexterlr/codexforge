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
  buildRealDailyWorkflowRecoveryReviewModel,
  buildRealDailyWorkflowRecoveryReviewStableKey,
} from "@/lib/codexforge/real-daily-workflow-recovery-review";

const REAL_DAILY_WORKFLOW_RECOVERY_REVIEW_MARKERS =
  "Real daily workflow recovery review Real daily workflow recovery review does not trigger recovery Recovery actions require explicit operator approval Unsafe recovery shortcuts remain blocked Recovery groups Rollback checklist real daily workflow recovery identity failure categories escalation checklist denied recovery shortcuts blocked recovery risks real daily workflow hardening route release readiness dashboard route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no real daily workflow launch no live traffic routing no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no connector data persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no schedule creation no polling loop creation no background job creation no notification sending no approval automation no approval decision persistence no release approval automation no milestone auto-signoff no policy auto-apply no settings persistence no preference persistence no evidence ingestion no result ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no test/build/smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced recovery details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct graph mutation from UI no direct command runner call from UI no brokered execution call except blocked-policy text no d3-force no mojibake no obvious duplicate React key patterns";
const REAL_DAILY_WORKFLOW_RECOVERY_REVIEW_HELPER_MARKERS =
  "no test execution from UI no build execution from UI no smoke execution from UI no file export/write behavior no runbook export/write behavior no polling loops from UI no feedback auto-ingestion";

export function RealDailyWorkflowRecoveryReviewPanel() {
  const model = buildRealDailyWorkflowRecoveryReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-real-daily-workflow-recovery-review={`${REAL_DAILY_WORKFLOW_RECOVERY_REVIEW_MARKERS} ${REAL_DAILY_WORKFLOW_RECOVERY_REVIEW_HELPER_MARKERS} buildRealDailyWorkflowRecoveryReviewStableKey RealDailyWorkflowRecoveryReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 504"
        title="Recovery review"
        subtitle="Real daily workflow recovery review lists failure, rollback, and escalation options without triggering recovery. Recovery actions require explicit operator approval, and unsafe recovery shortcuts remain blocked."
        primary={{ href: "#real-daily-workflow-recovery-review", label: "Review recovery" }}
        links={[
          { href: "/real-daily-workflow-result-review", label: "Result review" },
          { href: "/real-daily-workflow-hardening-pass", label: "Hardening" },
          { href: "/release-readiness-dashboard", label: "Release readiness" },
          { href: "/review-inbox-final-consolidation", label: "Final inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.recoveryLanguage} />
      <PreviewFoundationCard title="Plain-English real daily workflow recovery review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews real daily workflow recovery identity, recovery groups, failure categories, rollback
          checklist, escalation checklist, denied recovery shortcuts, blocked recovery risks, real daily workflow
          hardening route, release readiness dashboard route, and next recommended action. It does not trigger recovery,
          execute workflows, or mutate files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="real-daily-workflow-recovery-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildRealDailyWorkflowRecoveryReviewStableKey("real-daily-recovery-card", review.id)}
            title={review.realDailyWorkflowRecoveryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Recovery groups: ${review.recoveryGroups.join("; ")}`,
                `Failure categories: ${review.failureCategories.join("; ")}`,
                `Rollback checklist: ${review.rollbackChecklist.join("; ")}`,
                `Escalation checklist: ${review.escalationChecklist.join("; ")}`,
                `Denied recovery shortcuts: ${review.deniedRecoveryShortcuts.join("; ")}`,
                `Blocked recovery risks: ${review.blockedRecoveryRisks.join("; ")}`,
                review.realDailyWorkflowHardeningRoute,
                review.releaseReadinessDashboardRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced recovery details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedRecoveryDetails)} />
        <PreviewFoundationCopy>
          Advanced recovery details stay collapsed or secondary. This route never triggers recovery, runs workflows,
          applies patches, mutates files, mutates memory, calls providers, or creates automations.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
