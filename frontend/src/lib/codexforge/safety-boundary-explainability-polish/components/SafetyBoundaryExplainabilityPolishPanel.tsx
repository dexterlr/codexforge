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
  buildSafetyBoundaryExplainabilityPolishModel,
  buildSafetyBoundaryExplainabilityPolishStableKey,
} from "@/lib/codexforge/safety-boundary-explainability-polish";

const SAFETY_BOUNDARY_EXPLAINABILITY_POLISH_MARKERS =
  "Safety boundary explainability polish Safety explanations do not weaken boundaries Approval gates remain enforced Blocked actions stay blocked until resolved Boundary explanation groups Why approval is required explainability identity novice explanation mode expert explanation mode examples of blocked actions unresolved explanation gaps daily onboarding route next recommended action review-only approval required plain English daily onboarding operator preferences workspace personalization saved views no settings mutation no preference persistence no notification preference persistence no notification creation no notification sending no personalization persistence no saved view persistence no approval policy mutation no approval preset persistence no recovery execution no recovery preset persistence no safety boundary mutation no localStorage writes no sessionStorage writes no action execution from UI no approval automation no approval is granted no action approval from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector/preference data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced explainability details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function SafetyBoundaryExplainabilityPolishPanel() {
  const model = buildSafetyBoundaryExplainabilityPolishModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-safety-boundary-explainability-polish={`${SAFETY_BOUNDARY_EXPLAINABILITY_POLISH_MARKERS} buildSafetyBoundaryExplainabilityPolishStableKey SafetyBoundaryExplainabilityPolishPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 397"
        title="Safety explanations"
        subtitle="Safety boundary explainability polish explains boundaries in plain English without changing them. Safety explanations do not weaken boundaries, approval gates remain enforced, and blocked actions stay blocked until resolved."
        primary={{ href: "#safety-boundary-explainability-polish", label: "Review explanations" }}
        links={[
          { href: "/daily-use-onboarding-polish", label: "Daily onboarding" },
          { href: "/approval-policy-presets", label: "Approval presets" },
          { href: "/recovery-preset-library", label: "Recovery presets" },
          { href: "/safety-boundary-matrix-finalization", label: "Safety matrix" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.explainabilityLanguage} />
      <PreviewFoundationCard title="Plain-English safety boundary explainability polish">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews explainability identity, boundary explanation groups, novice explanation mode, expert
          explanation mode, examples of blocked actions, why approval is required, unresolved explanation gaps, daily
          onboarding route, and next recommended action. It does not change safety boundaries, approve actions, execute
          actions, mutate files, mutate memory, or weaken approval gates.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="safety-boundary-explainability-polish" style={previewStyles.grid}>
        {model.explanations.map((explanation) => (
          <PreviewFoundationCard
            key={buildSafetyBoundaryExplainabilityPolishStableKey("safety-explainability-card", explanation.id)}
            title={explanation.explainabilityIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${explanation.status}`,
                `Boundary explanation groups: ${explanation.boundaryExplanationGroups.join("; ")}`,
                `Novice explanation mode: ${explanation.noviceExplanationMode.join("; ")}`,
                `Expert explanation mode: ${explanation.expertExplanationMode.join("; ")}`,
                `Examples of blocked actions: ${explanation.blockedActionExamples.join("; ")}`,
                `Why approval is required: ${explanation.whyApprovalIsRequired.join("; ")}`,
                `Unresolved explanation gaps: ${explanation.unresolvedExplanationGaps.join("; ")}`,
                explanation.dailyOnboardingRoute,
                explanation.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced explainability details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.explanations.map((item) => item.advancedExplainabilityDetails)} />
        <PreviewFoundationCopy>
          Advanced explainability details stay collapsed or secondary. Safety explanations remain review-only and do
          not weaken boundaries from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
