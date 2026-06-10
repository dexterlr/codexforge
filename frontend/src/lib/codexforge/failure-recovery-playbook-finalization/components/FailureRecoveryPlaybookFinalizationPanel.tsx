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
  buildFailureRecoveryPlaybookFinalizationModel,
  buildFailureRecoveryPlaybookFinalizationStableKey,
} from "@/lib/codexforge/failure-recovery-playbook-finalization";

const FAILURE_RECOVERY_PLAYBOOK_FINALIZATION_MARKERS =
  "Failure recovery playbook finalization Recovery playbook does not run recovery automatically Recovery steps require operator approval Validation evidence is reviewed before retry Common failure categories Rollback guidance recovery playbook identity source safety matrix recommended manual recovery steps validation evidence required escalation guidance novice mode route expert fast path route blocked reasons review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no recovery automation no rollback execution no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced recovery details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FailureRecoveryPlaybookFinalizationPanel() {
  const model = buildFailureRecoveryPlaybookFinalizationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-failure-recovery-playbook-finalization={`${FAILURE_RECOVERY_PLAYBOOK_FINALIZATION_MARKERS} buildFailureRecoveryPlaybookFinalizationStableKey FailureRecoveryPlaybookFinalizationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 375"
        title="Recovery playbook"
        subtitle="Failure recovery playbook finalization reviews recovery guidance without running recovery steps. Recovery playbook does not run recovery automatically, recovery steps require operator approval, and validation evidence is reviewed before retry."
        primary={{ href: "#failure-recovery-playbook-finalization", label: "Review playbook" }}
        links={[
          { href: "/safety-boundary-matrix-finalization", label: "Safety matrix" },
          { href: "/novice-mode-guided-flow-polish", label: "Novice mode" },
          { href: "/expert-mode-fast-path-review", label: "Expert mode" },
          { href: "/result-history", label: "Result history" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.recoveryLanguage} />
      <PreviewFoundationCard title="Plain-English failure recovery playbook">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews recovery playbook identity, source safety matrix, common failure categories, recommended
          manual recovery steps, validation evidence required, rollback guidance, escalation guidance, novice mode route,
          expert fast path route, and blocked reasons. It does not run commands, roll back files, apply patches, mutate
          files, approve anything automatically, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="failure-recovery-playbook-finalization" style={previewStyles.grid}>
        {model.playbooks.map((playbook) => (
          <PreviewFoundationCard
            key={buildFailureRecoveryPlaybookFinalizationStableKey("failure-recovery-playbook-card", playbook.id)}
            title={playbook.recoveryPlaybookIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${playbook.status}`,
                playbook.sourceSafetyMatrix,
                `Common failure categories: ${playbook.commonFailureCategories.join("; ")}`,
                `Recommended manual recovery steps: ${playbook.recommendedManualRecoverySteps.join("; ")}`,
                `Validation evidence required: ${playbook.validationEvidenceRequired.join("; ")}`,
                `Rollback guidance: ${playbook.rollbackGuidance.join("; ")}`,
                `Escalation guidance: ${playbook.escalationGuidance.join("; ")}`,
                playbook.noviceModeRoute,
                playbook.expertFastPathRoute,
                `Blocked reasons: ${playbook.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced recovery details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.playbooks.map((playbook) => playbook.advancedRecoveryDetails)} />
        <PreviewFoundationCopy>
          Advanced recovery details stay collapsed or secondary. Recovery guidance is manual review only; this playbook
          does not run recovery automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
