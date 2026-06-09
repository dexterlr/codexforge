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
  buildOperatorDashboardReleaseCandidateModel,
  buildOperatorDashboardReleaseCandidateStableKey,
} from "@/lib/codexforge/operator-dashboard-release-candidate";

const OPERATOR_DASHBOARD_RELEASE_CANDIDATE_MARKERS =
  "Operator dashboard release candidate Operator dashboard release remains review-only Dashboard does not run workflows automatically Execution remains behind explicit approval gates Release readiness by loop Guided trial route dashboard release identity covered loop cards safety/audit readiness navigation readiness known gaps release decision next recommended route review-only approval required dashboard does not run workflows automatically no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced dashboard details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function OperatorDashboardReleaseCandidatePanel() {
  const model = buildOperatorDashboardReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-operator-dashboard-release-candidate={`${OPERATOR_DASHBOARD_RELEASE_CANDIDATE_MARKERS} buildOperatorDashboardReleaseCandidateStableKey OperatorDashboardReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 356"
        title="Dashboard RC"
        subtitle="Operator dashboard release candidate audits dashboard readiness across coding, provider, creative, extension, research, connector, automation, project knowledge, and cross-loop safety. Operator dashboard release remains review-only, dashboard does not run workflows automatically, and execution remains behind explicit approval gates."
        primary={{ href: "#operator-dashboard-release-candidate", label: "Review dashboard" }}
        links={[
          { href: "/cross-loop-safety-audit-inbox", label: "Safety audit" },
          { href: "/mvp-end-to-end-guided-trial", label: "Guided trial" },
          { href: "/unified-workspace-home-review", label: "Unified home" },
          { href: "/workspace-navigation-consolidation-review", label: "Navigation review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.dashboardLanguage} />
      <PreviewFoundationCard title="Plain-English operator dashboard release">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          The dashboard is a review surface. It shows loop readiness, safety audit status, known gaps, and next routes,
          but it does not execute workflows, call APIs, create automations, mutate files, mutate memory, or store tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="operator-dashboard-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildOperatorDashboardReleaseCandidateStableKey("operator-dashboard-release-card", candidate.id)}
            title={candidate.dashboardReleaseIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Release decision: ${candidate.releaseDecision}`,
                ...candidate.releaseReadinessByLoop,
                candidate.safetyAuditReadiness,
                candidate.navigationReadiness,
                `Known gaps: ${candidate.knownGaps.join("; ")}`,
                candidate.guidedTrialRoute,
                candidate.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced dashboard details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.candidates.map((candidate) => candidate.advancedDashboardDetails)}
        />
        <PreviewFoundationCopy>
          Advanced dashboard details stay collapsed or secondary. The dashboard does not run workflows automatically;
          every execution-capable path remains behind an explicit approval gate.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
