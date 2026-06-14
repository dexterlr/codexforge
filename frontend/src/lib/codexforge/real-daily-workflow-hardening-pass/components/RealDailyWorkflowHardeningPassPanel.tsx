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
  buildRealDailyWorkflowHardeningPassModel,
  buildRealDailyWorkflowHardeningPassStableKey,
} from "@/lib/codexforge/real-daily-workflow-hardening-pass";

const REAL_DAILY_WORKFLOW_HARDENING_PASS_MARKERS =
  "Real daily workflow hardening pass Real daily workflow hardening pass does not apply changes Hardening changes require explicit operator approval Unresolved hardening blockers stay blocked Hardening groups Approval safety readiness checklist real daily workflow hardening identity evidence result recovery readiness status denied hardening actions unresolved hardening blockers multi-workflow trial plan route release readiness dashboard route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no real daily workflow launch no live traffic routing no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no connector data persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no schedule creation no polling loop creation no background job creation no notification sending no approval automation no approval decision persistence no release approval automation no milestone auto-signoff no policy auto-apply no settings persistence no preference persistence no evidence ingestion no result ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no test/build/smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced hardening details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct graph mutation from UI no direct command runner call from UI no brokered execution call except blocked-policy text no d3-force no mojibake no obvious duplicate React key patterns";
const REAL_DAILY_WORKFLOW_HARDENING_PASS_HELPER_MARKERS =
  "no test execution from UI no build execution from UI no smoke execution from UI no file export/write behavior no runbook export/write behavior no polling loops from UI no feedback auto-ingestion";

export function RealDailyWorkflowHardeningPassPanel() {
  const model = buildRealDailyWorkflowHardeningPassModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-real-daily-workflow-hardening-pass={`${REAL_DAILY_WORKFLOW_HARDENING_PASS_MARKERS} ${REAL_DAILY_WORKFLOW_HARDENING_PASS_HELPER_MARKERS} buildRealDailyWorkflowHardeningPassStableKey RealDailyWorkflowHardeningPassPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 505"
        title="Workflow hardening"
        subtitle="Real daily workflow hardening pass reviews hardening groups and blockers without applying changes. Hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked."
        primary={{ href: "#real-daily-workflow-hardening-pass", label: "Review hardening" }}
        links={[
          { href: "/real-daily-workflow-evidence-review", label: "Evidence review" },
          { href: "/real-daily-workflow-result-review", label: "Result review" },
          { href: "/real-daily-workflow-recovery-review", label: "Recovery review" },
          { href: "/release-readiness-dashboard", label: "Release readiness" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.hardeningLanguage} />
      <PreviewFoundationCard title="Plain-English real daily workflow hardening pass">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews real daily workflow hardening identity, hardening groups, evidence result recovery readiness
          status, approval safety readiness checklist, denied hardening actions, unresolved hardening blockers,
          multi-workflow trial plan route, release readiness dashboard route, and next recommended action. It does not
          apply changes or mutate files or memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="real-daily-workflow-hardening-pass" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildRealDailyWorkflowHardeningPassStableKey("real-daily-hardening-card", review.id)}
            title={review.realDailyWorkflowHardeningIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Hardening groups: ${review.hardeningGroups.join("; ")}`,
                `Evidence result recovery readiness status: ${review.evidenceResultRecoveryReadinessStatus.join("; ")}`,
                `Approval safety readiness checklist: ${review.approvalSafetyReadinessChecklist.join("; ")}`,
                `Denied hardening actions: ${review.deniedHardeningActions.join("; ")}`,
                `Unresolved hardening blockers: ${review.unresolvedHardeningBlockers.join("; ")}`,
                review.multiWorkflowTrialPlanRoute,
                review.releaseReadinessDashboardRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced hardening details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedHardeningDetails)} />
        <PreviewFoundationCopy>
          Advanced hardening details stay collapsed or secondary. This route never applies hardening, executes
          workflows, applies patches, persists settings, mutates files, mutates memory, or clears unresolved blockers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
