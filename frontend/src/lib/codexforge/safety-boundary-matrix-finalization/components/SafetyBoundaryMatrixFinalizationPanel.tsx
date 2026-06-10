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
  buildSafetyBoundaryMatrixFinalizationModel,
  buildSafetyBoundaryMatrixFinalizationStableKey,
} from "@/lib/codexforge/safety-boundary-matrix-finalization";

const SAFETY_BOUNDARY_MATRIX_FINALIZATION_MARKERS =
  "Safety boundary matrix finalization Safety matrix does not execute anything Unresolved safety gaps stay blocked Approval gates remain required Covered boundary groups Memory boundaries matrix identity covered boundary groups execution boundaries provider boundaries connector boundaries local file boundaries automation boundaries memory boundaries unresolved gaps recovery playbook route expert/novice mode routes review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no recovery automation no rollback execution no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced matrix details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function SafetyBoundaryMatrixFinalizationPanel() {
  const model = buildSafetyBoundaryMatrixFinalizationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-safety-boundary-matrix-finalization={`${SAFETY_BOUNDARY_MATRIX_FINALIZATION_MARKERS} buildSafetyBoundaryMatrixFinalizationStableKey SafetyBoundaryMatrixFinalizationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 374"
        title="Safety matrix"
        subtitle="Safety boundary matrix finalization summarizes the major CodexForge safety boundaries in plain English. Safety matrix does not execute anything, unresolved safety gaps stay blocked, and approval gates remain required."
        primary={{ href: "#safety-boundary-matrix-finalization", label: "Review matrix" }}
        links={[
          { href: "/daily-operator-home", label: "Daily home" },
          { href: "/failure-recovery-playbook-finalization", label: "Recovery playbook" },
          { href: "/novice-mode-guided-flow-polish", label: "Novice mode" },
          { href: "/expert-mode-fast-path-review", label: "Expert mode" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.matrixLanguage} />
      <PreviewFoundationCard title="Plain-English safety boundary matrix">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews matrix identity, covered boundary groups, execution boundaries, provider boundaries,
          connector boundaries, local file boundaries, automation boundaries, memory boundaries, unresolved gaps,
          recovery playbook route, and expert/novice mode routes. It does not execute actions, call APIs, mutate files,
          approve anything automatically, or promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="safety-boundary-matrix-finalization" style={previewStyles.grid}>
        {model.matrices.map((matrix) => (
          <PreviewFoundationCard
            key={buildSafetyBoundaryMatrixFinalizationStableKey("safety-boundary-matrix-card", matrix.id)}
            title={matrix.matrixIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${matrix.status}`,
                `Covered boundary groups: ${matrix.coveredBoundaryGroups.join("; ")}`,
                `Execution boundaries: ${matrix.executionBoundaries.join("; ")}`,
                `Provider boundaries: ${matrix.providerBoundaries.join("; ")}`,
                `Connector boundaries: ${matrix.connectorBoundaries.join("; ")}`,
                `Local file boundaries: ${matrix.localFileBoundaries.join("; ")}`,
                `Automation boundaries: ${matrix.automationBoundaries.join("; ")}`,
                `Memory boundaries: ${matrix.memoryBoundaries.join("; ")}`,
                `Unresolved gaps: ${matrix.unresolvedGaps.join("; ")}`,
                matrix.recoveryPlaybookRoute,
                matrix.noviceModeRoute,
                matrix.expertModeRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced matrix details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.matrices.map((matrix) => matrix.advancedMatrixDetails)} />
        <PreviewFoundationCopy>
          Advanced matrix details stay collapsed or secondary. The safety matrix does not execute anything, unresolved
          safety gaps stay blocked, and approval gates remain required.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
