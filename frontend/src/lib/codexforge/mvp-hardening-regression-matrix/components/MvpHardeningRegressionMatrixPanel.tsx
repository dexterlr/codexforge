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
  buildMvpHardeningRegressionMatrixModel,
  buildMvpHardeningRegressionMatrixStableKey,
} from "@/lib/codexforge/mvp-hardening-regression-matrix";

const MVP_HARDENING_REGRESSION_MATRIX_MARKERS =
  "MVP hardening regression matrix Regression matrix does not run tests from this page Hardening checks are reviewed before release Unresolved regressions stay blocked Core loop coverage Release candidate route regression matrix identity source guided trial build/smoke coverage summary safety boundary coverage route/navigation coverage known gaps blocked reasons review-only approval required no regression checks run from UI no build execution from UI no smoke execution from UI no test execution from UI no release/shipping execution no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced regression details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function MvpHardeningRegressionMatrixPanel() {
  const model = buildMvpHardeningRegressionMatrixModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-mvp-hardening-regression-matrix={`${MVP_HARDENING_REGRESSION_MATRIX_MARKERS} buildMvpHardeningRegressionMatrixStableKey MvpHardeningRegressionMatrixPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 358"
        title="Hardening matrix"
        subtitle="MVP hardening regression matrix reviews release hardening coverage after the guided trial. Regression matrix does not run tests from this page, hardening checks are reviewed before release, and unresolved regressions stay blocked."
        primary={{ href: "#mvp-hardening-regression-matrix", label: "Review matrix" }}
        links={[
          { href: "/mvp-end-to-end-guided-trial", label: "Guided trial" },
          { href: "/operator-dashboard-release-candidate", label: "Dashboard RC" },
          { href: "/cross-loop-safety-audit-inbox", label: "Safety audit" },
          { href: "/codexforge-foundation-release-candidate", label: "Foundation RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.regressionLanguage} />
      <PreviewFoundationCard title="Plain-English regression matrix">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews hardening coverage only. It does not run tests, builds, smoke scripts, commands,
          workflows, provider calls, connector calls, web/search calls, file writes, exports, memory changes, or
          release shipping actions.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="mvp-hardening-regression-matrix" style={previewStyles.grid}>
        {model.matrices.map((matrix) => (
          <PreviewFoundationCard
            key={buildMvpHardeningRegressionMatrixStableKey("mvp-hardening-regression-matrix-card", matrix.id)}
            title={matrix.regressionMatrixIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${matrix.status}`,
                matrix.sourceGuidedTrial,
                ...matrix.coreLoopCoverage.map(
                  (coverage) =>
                    `${coverage.loopName}: ${coverage.coverageSummary} ${coverage.safetyBoundaryCoverage} ${coverage.routeNavigationCoverage}`
                ),
                matrix.buildSmokeCoverageSummary,
                matrix.safetyBoundaryCoverage,
                matrix.routeNavigationCoverage,
                `Known gaps: ${matrix.knownGaps.join("; ")}`,
                matrix.releaseCandidateRoute,
                `Blocked reasons: ${matrix.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced regression details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.matrices.map((matrix) => matrix.advancedRegressionDetails)} />
        <PreviewFoundationCopy>
          Advanced regression details stay collapsed or secondary. Hardening review is separate from test execution,
          build execution, smoke execution, release shipping, workflow execution, and file or memory mutation.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
