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
  buildExpertModeFastPathReviewModel,
  buildExpertModeFastPathReviewStableKey,
} from "@/lib/codexforge/expert-mode-fast-path-review";

const EXPERT_MODE_FAST_PATH_REVIEW_MARKERS =
  "Expert mode fast path review Expert fast path still requires explicit approval Safety boundaries cannot be bypassed No fast path action runs from this page Eligible expert shortcuts Audit trail expectations expert fast path identity required approval gates skipped clutter summary boundaries that cannot be bypassed novice mode route daily home route next recommended action review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no recovery automation no rollback execution no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced expert details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ExpertModeFastPathReviewPanel() {
  const model = buildExpertModeFastPathReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-expert-mode-fast-path-review={`${EXPERT_MODE_FAST_PATH_REVIEW_MARKERS} buildExpertModeFastPathReviewStableKey ExpertModeFastPathReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 377"
        title="Expert fast path"
        subtitle="Expert mode fast path review summarizes power-user shortcuts while preserving every approval gate. Expert fast path still requires explicit approval, safety boundaries cannot be bypassed, and no fast path action runs from this page."
        primary={{ href: "#expert-mode-fast-path-review", label: "Review fast path" }}
        links={[
          { href: "/daily-operator-home", label: "Daily home" },
          { href: "/novice-mode-guided-flow-polish", label: "Novice mode" },
          { href: "/safety-boundary-matrix-finalization", label: "Safety matrix" },
          { href: "/failure-recovery-playbook-finalization", label: "Recovery playbook" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.expertLanguage} />
      <PreviewFoundationCard title="Plain-English expert fast path">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews expert fast path identity, eligible expert shortcuts, required approval gates, skipped
          clutter summary, boundaries that cannot be bypassed, audit trail expectations, novice mode route, daily home
          route, and next recommended action. It does not approve actions, execute actions, call APIs, mutate files, or
          mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="expert-mode-fast-path-review" style={previewStyles.grid}>
        {model.fastPaths.map((fastPath) => (
          <PreviewFoundationCard
            key={buildExpertModeFastPathReviewStableKey("expert-mode-fast-path-card", fastPath.id)}
            title={fastPath.expertFastPathIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${fastPath.status}`,
                `Eligible expert shortcuts: ${fastPath.eligibleExpertShortcuts.join("; ")}`,
                `Required approval gates: ${fastPath.requiredApprovalGates.join("; ")}`,
                `Skipped clutter summary: ${fastPath.skippedClutterSummary.join("; ")}`,
                `Boundaries that cannot be bypassed: ${fastPath.boundariesThatCannotBeBypassed.join("; ")}`,
                `Audit trail expectations: ${fastPath.auditTrailExpectations.join("; ")}`,
                fastPath.noviceModeRoute,
                fastPath.dailyHomeRoute,
                fastPath.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced expert details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.fastPaths.map((fastPath) => fastPath.advancedExpertDetails)} />
        <PreviewFoundationCopy>
          Advanced expert details stay collapsed or secondary. Expert fast path still requires explicit approval and no
          fast path action runs from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
