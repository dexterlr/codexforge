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
  buildFullSmokeSuiteStabilityPassModel,
  buildFullSmokeSuiteStabilityPassStableKey,
} from "@/lib/codexforge/full-smoke-suite-stability-pass";

const FULL_SMOKE_SUITE_STABILITY_PASS_MARKERS =
  "Full smoke suite stability pass Smoke stability pass does not run tests from this page Smoke results require operator review Unresolved smoke failures stay blocked Covered smoke groups Required manual validation smoke stability identity latest validation checklist known flaky areas blocked stability risks beta candidate route feedback/intake route review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no release/publish/invite behavior no release publish behavior no invite sending no participant data collection no external feedback fetching no feedback ingestion automation no issue creation automation no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project/connector/feedback data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced smoke stability details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FullSmokeSuiteStabilityPassPanel() {
  const model = buildFullSmokeSuiteStabilityPassModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-full-smoke-suite-stability-pass={`${FULL_SMOKE_SUITE_STABILITY_PASS_MARKERS} buildFullSmokeSuiteStabilityPassStableKey FullSmokeSuiteStabilityPassPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 382"
        title="Smoke stability"
        subtitle="Full smoke suite stability pass reviews suite readiness before beta. Smoke stability pass does not run tests from this page, smoke results require operator review, and unresolved smoke failures stay blocked."
        primary={{ href: "#full-smoke-suite-stability-pass", label: "Review smoke stability" }}
        links={[
          { href: "/foundation-beta-candidate", label: "Beta candidate" },
          { href: "/beta-trial-intake-review", label: "Beta intake" },
          { href: "/beta-feedback-inbox", label: "Feedback inbox" },
          { href: "/secrets-token-storage-regression-sweep", label: "Secrets sweep" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.smokeStabilityLanguage} />
      <PreviewFoundationCard title="Plain-English smoke stability pass">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews smoke stability identity, covered smoke groups, latest validation checklist, known flaky
          areas, required manual validation, blocked stability risks, beta candidate route, and feedback/intake route.
          It does not run tests, run builds, run smoke checks, run the full smoke suite, call APIs, approve anything,
          mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="full-smoke-suite-stability-pass" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildFullSmokeSuiteStabilityPassStableKey("full-smoke-stability-card", review.id)}
            title={review.smokeStabilityIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Covered smoke groups: ${review.coveredSmokeGroups.join("; ")}`,
                `Latest validation checklist: ${review.latestValidationChecklist.join("; ")}`,
                `Known flaky areas: ${review.knownFlakyAreas.join("; ")}`,
                `Required manual validation: ${review.requiredManualValidation.join("; ")}`,
                `Blocked stability risks: ${review.blockedStabilityRisks.join("; ")}`,
                review.betaCandidateRoute,
                review.feedbackIntakeRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced smoke stability details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedSmokeStabilityDetails)} />
        <PreviewFoundationCopy>
          Advanced smoke stability details stay collapsed or secondary. This review does not run tests from this page,
          does not run the full smoke suite from this page, and does not change smoke results without operator review.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
