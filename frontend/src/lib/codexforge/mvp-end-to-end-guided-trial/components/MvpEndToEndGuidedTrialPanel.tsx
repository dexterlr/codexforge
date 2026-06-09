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
  buildMvpEndToEndGuidedTrialModel,
  buildMvpEndToEndGuidedTrialStableKey,
} from "@/lib/codexforge/mvp-end-to-end-guided-trial";

const MVP_END_TO_END_GUIDED_TRIAL_MARKERS =
  "MVP end-to-end guided trial Guided trial is review-only until approved No workflow runs automatically Blocked actions remain blocked Trial scenario summary Expected review gates guided trial identity simulated outcomes blocked actions regression matrix route release candidate route coding provider creative extension research connector automation project knowledge dashboard review-only approval required simulated/review-only until approved no workflow execution no workflow execution from UI no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function MvpEndToEndGuidedTrialPanel() {
  const model = buildMvpEndToEndGuidedTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-mvp-end-to-end-guided-trial={`${MVP_END_TO_END_GUIDED_TRIAL_MARKERS} buildMvpEndToEndGuidedTrialStableKey MvpEndToEndGuidedTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 357"
        title="Guided trial"
        subtitle="MVP end-to-end guided trial walks through the CodexForge foundation loops as a simulated review-only operator trial. Guided trial is review-only until approved, no workflow runs automatically, and blocked actions remain blocked."
        primary={{ href: "#mvp-end-to-end-guided-trial", label: "Review trial" }}
        links={[
          { href: "/operator-dashboard-release-candidate", label: "Dashboard release" },
          { href: "/cross-loop-safety-audit-inbox", label: "Safety audit" },
          { href: "/stabilization", label: "Regression matrix" },
          { href: "/cross-loop-result-handoff-review", label: "Handoff review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English guided trial">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This trial is simulated and review-only until approved. It does not run workflows automatically, run tests
          from UI, call APIs, write files, mutate memory, create automations, or execute tools.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="mvp-end-to-end-guided-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildMvpEndToEndGuidedTrialStableKey("mvp-end-to-end-guided-trial-card", trial.id)}
            title={trial.guidedTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.trialScenarioSummary,
                ...trial.steps.map(
                  (step) =>
                    `${step.loopName}: ${step.stepSummary} ${step.expectedReviewGate} ${step.simulatedOutcome} ${step.route}`
                ),
                `Expected review gates: ${trial.expectedReviewGates.join("; ")}`,
                `Simulated outcomes: ${trial.simulatedOutcomes.join("; ")}`,
                `Blocked actions: ${trial.blockedActions.join("; ")}`,
                trial.regressionMatrixRoute,
                trial.releaseCandidateRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced trial details stay collapsed or secondary. The guided trial is simulated and review-only until
          approved; no workflow runs automatically and blocked actions remain blocked.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
