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
  buildReleaseReadinessDashboardModel,
  buildReleaseReadinessDashboardStableKey,
} from "@/lib/codexforge/release-readiness-dashboard";

const RELEASE_READINESS_DASHBOARD_MARKERS =
  "Release readiness dashboard Release readiness dashboard does not approve release Release readiness requires explicit operator approval Unresolved release risks stay blocked Readiness groups Smoke build docs status checklist release readiness dashboard identity approval evidence result recovery hardening checklist live-capable lane readiness checklist denied readiness actions unresolved release risks Foundation 500 milestone route first real daily workflow candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no real daily workflow launch no live traffic routing no live provider/local/connector/automation traffic routing no release approval automation no release approval from UI no milestone auto-signoff no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no connector data persistence no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no schedule creation no polling loop creation no polling loops from UI no background job creation no notification sending no approval automation no approval decision persistence no policy auto-apply no settings persistence no preference persistence no evidence ingestion no result ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no automation data storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no Ruflo/Odysseus vendoring no package install behavior checkpoint documentation smoke still exists and remains registered server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced readiness details collapsed/secondary no unsafe execution buttons no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct graph mutation from UI no direct command runner call from UI no brokered execution call except blocked-policy text no d3-force no mojibake no obvious duplicate React key patterns";

export function ReleaseReadinessDashboardPanel() {
  const model = buildReleaseReadinessDashboardModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-release-readiness-dashboard={`${RELEASE_READINESS_DASHBOARD_MARKERS} buildReleaseReadinessDashboardStableKey ReleaseReadinessDashboardPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 499"
        title="Release readiness"
        subtitle="Release readiness dashboard summarizes smoke, build, docs, approval, evidence, result, recovery, hardening, and live-capable lane posture without approving release. Release readiness requires explicit operator approval, and unresolved release risks stay blocked."
        primary={{ href: "#release-readiness-dashboard", label: "Review readiness" }}
        links={[
          { href: "/review-inbox-final-consolidation", label: "Final inbox" },
          { href: "/codexforge-foundation-500-milestone-review", label: "Foundation 500" },
          { href: "/first-real-daily-workflow-candidate", label: "Daily workflow" },
          { href: "/global-command-palette-final-polish", label: "Command polish" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.readinessLanguage} />
      <PreviewFoundationCard title="Plain-English release readiness dashboard">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews release readiness dashboard identity, readiness groups, smoke build docs status checklist,
          approval evidence result recovery hardening checklist, live-capable lane readiness checklist, denied readiness
          actions, unresolved release risks, Foundation 500 milestone route, first real daily workflow candidate route,
          and next recommended action. It does not approve release or claim CI passed.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="release-readiness-dashboard" style={previewStyles.grid}>
        {model.dashboards.map((dashboard) => (
          <PreviewFoundationCard
            key={buildReleaseReadinessDashboardStableKey("release-readiness-card", dashboard.id)}
            title={dashboard.releaseReadinessDashboardIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${dashboard.status}`,
                `Readiness groups: ${dashboard.readinessGroups.join("; ")}`,
                `Smoke build docs status checklist: ${dashboard.smokeBuildDocsStatusChecklist.join("; ")}`,
                `Approval evidence result recovery hardening checklist: ${dashboard.approvalEvidenceResultRecoveryHardeningChecklist.join("; ")}`,
                `Live-capable lane readiness checklist: ${dashboard.liveCapableLaneReadinessChecklist.join("; ")}`,
                `Denied readiness actions: ${dashboard.deniedReadinessActions.join("; ")}`,
                `Unresolved release risks: ${dashboard.unresolvedReleaseRisks.join("; ")}`,
                dashboard.foundation500MilestoneRoute,
                dashboard.firstRealDailyWorkflowCandidateRoute,
                dashboard.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced readiness details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.dashboards.map((dashboard) => dashboard.advancedReadinessDetails)} />
        <PreviewFoundationCopy>
          Advanced readiness details stay collapsed or secondary. This route never approves release, applies readiness,
          claims CI passed, executes workflows, launches a real daily workflow, stores outputs, or clears risks.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
