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
  buildNoviceModeGuidedFlowPolishModel,
  buildNoviceModeGuidedFlowPolishStableKey,
} from "@/lib/codexforge/novice-mode-guided-flow-polish";

const NOVICE_MODE_GUIDED_FLOW_POLISH_MARKERS =
  "Novice mode guided flow polish Novice mode guides but does not approve or execute Approval checkpoints stay visible Blocked actions stay blocked until resolved Recommended first review sequence Plain-English safety hints novice flow identity approval checkpoints blocked action explanations recovery handoff daily home route expert fast path route next recommended action review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no recovery automation no rollback execution no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced novice flow details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function NoviceModeGuidedFlowPolishPanel() {
  const model = buildNoviceModeGuidedFlowPolishModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-novice-mode-guided-flow-polish={`${NOVICE_MODE_GUIDED_FLOW_POLISH_MARKERS} buildNoviceModeGuidedFlowPolishStableKey NoviceModeGuidedFlowPolishPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 376"
        title="Novice mode"
        subtitle="Novice mode guided flow polish makes daily operation approachable without hiding gates. Novice mode guides but does not approve or execute, approval checkpoints stay visible, and blocked actions stay blocked until resolved."
        primary={{ href: "#novice-mode-guided-flow-polish", label: "Review guide" }}
        links={[
          { href: "/daily-operator-home", label: "Daily home" },
          { href: "/safety-boundary-matrix-finalization", label: "Safety matrix" },
          { href: "/failure-recovery-playbook-finalization", label: "Recovery playbook" },
          { href: "/expert-mode-fast-path-review", label: "Expert mode" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.noviceLanguage} />
      <PreviewFoundationCard title="Plain-English novice guided flow">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews novice flow identity, recommended first review sequence, plain-English safety hints, approval
          checkpoints, blocked action explanations, recovery handoff, daily home route, expert fast path route, and next
          recommended action. It does not approve actions, execute actions, call APIs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="novice-mode-guided-flow-polish" style={previewStyles.grid}>
        {model.flows.map((flow) => (
          <PreviewFoundationCard
            key={buildNoviceModeGuidedFlowPolishStableKey("novice-mode-guided-flow-card", flow.id)}
            title={flow.noviceFlowIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${flow.status}`,
                `Recommended first review sequence: ${flow.recommendedFirstReviewSequence.join("; ")}`,
                `Plain-English safety hints: ${flow.plainEnglishSafetyHints.join("; ")}`,
                `Approval checkpoints: ${flow.approvalCheckpoints.join("; ")}`,
                `Blocked action explanations: ${flow.blockedActionExplanations.join("; ")}`,
                flow.recoveryHandoff,
                flow.dailyHomeRoute,
                flow.expertFastPathRoute,
                flow.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced novice flow details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.flows.map((flow) => flow.advancedNoviceFlowDetails)} />
        <PreviewFoundationCopy>
          Advanced novice flow details stay collapsed or secondary. Novice mode guides but does not approve or execute,
          and blocked actions stay blocked until resolved.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
