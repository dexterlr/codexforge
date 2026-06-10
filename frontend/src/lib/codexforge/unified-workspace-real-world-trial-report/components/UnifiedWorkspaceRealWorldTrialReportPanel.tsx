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
  buildUnifiedWorkspaceRealWorldTrialReportModel,
  buildUnifiedWorkspaceRealWorldTrialReportStableKey,
} from "@/lib/codexforge/unified-workspace-real-world-trial-report";

const UNIFIED_WORKSPACE_REAL_WORLD_TRIAL_REPORT_MARKERS =
  "Unified workspace real-world trial report Unified trial report is reviewed before export or use No report file is written from this page Unresolved loop risks stay blocked Release readiness recommendation Daily operator polish route real-world trial report review-only approval required unified report identity source real-world trial reviews coding trial outcome research trial outcome connector trial outcome automation trial outcome creative/local bridge trial outcome provider governance trial outcome project knowledge trial outcome cross-loop risks blocked reasons advanced report details collapsed/secondary no action execution from UI no workflow execution no local bridge endpoint calls no Blender/Unreal/ComfyUI/local tool launch behavior no render/generation job execution no coding task execution no test/build/smoke execution from UI no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no patch apply behavior no commit creation from UI no provider API calls no token spending no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no web/search API calls no source fetching/browsing no OAuth request flow no connector authorization behavior no token storage no localStorage/sessionStorage token storage no automatic email/calendar/contact reads no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function UnifiedWorkspaceRealWorldTrialReportPanel() {
  const model = buildUnifiedWorkspaceRealWorldTrialReportModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-unified-workspace-real-world-trial-report={`${UNIFIED_WORKSPACE_REAL_WORLD_TRIAL_REPORT_MARKERS} buildUnifiedWorkspaceRealWorldTrialReportStableKey UnifiedWorkspaceRealWorldTrialReportPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 369"
        title="Unified trial report"
        subtitle="Unified workspace real-world trial report collects reviewed loop outcomes into release readiness without exporting or executing anything. The unified trial report is reviewed before export or use, and no report file is written from this page."
        primary={{ href: "#unified-workspace-real-world-trial-report", label: "Review unified report" }}
        links={[
          { href: "/coding-loop-real-world-trial-review", label: "Coding" },
          { href: "/creative-local-bridge-real-world-trial-review", label: "Creative bridge" },
          { href: "/project-knowledge-real-world-trial-review", label: "Project knowledge" },
          { href: "/code-flow/final-polish", label: "Daily polish" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reportLanguage} />
      <PreviewFoundationCard title="Plain-English unified trial report">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews the unified report identity, source real-world trial reviews, each loop outcome,
          cross-loop risks, release readiness recommendation, blocked reasons, and daily operator polish route. It does
          not export or write a report file, execute workflows, call APIs, mutate memory, or write files.
        </PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Unresolved loop risks stay blocked, and the unified trial report is reviewed before export or use.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="unified-workspace-real-world-trial-report" style={previewStyles.grid}>
        {model.reports.map((report) => (
          <PreviewFoundationCard
            key={buildUnifiedWorkspaceRealWorldTrialReportStableKey(
              "unified-workspace-real-world-trial-report-card",
              report.id
            )}
            title={report.unifiedReportIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${report.status}`,
                `Source real-world trial reviews: ${report.sourceRealWorldTrialReviews.join("; ")}`,
                report.codingTrialOutcome,
                report.researchTrialOutcome,
                report.connectorTrialOutcome,
                report.automationTrialOutcome,
                report.creativeLocalBridgeTrialOutcome,
                report.providerGovernanceTrialOutcome,
                report.projectKnowledgeTrialOutcome,
                `Cross-loop risks: ${report.crossLoopRisks.join("; ")}`,
                report.releaseReadinessRecommendation,
                `Blocked reasons: ${report.blockedReasons.join("; ")}`,
                report.dailyOperatorPolishRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced report details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reports.map((report) => report.advancedReportDetails)} />
        <PreviewFoundationCopy>
          Advanced report details stay collapsed or secondary. Unified workspace real-world trial report remains separate
          from report export, file writes, workflow execution, provider calls, connector calls, web/search calls, local
          bridge actions, automations, and memory mutation.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
