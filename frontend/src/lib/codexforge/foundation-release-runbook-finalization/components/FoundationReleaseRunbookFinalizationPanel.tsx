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
  buildFoundationReleaseRunbookFinalizationModel,
  buildFoundationReleaseRunbookFinalizationStableKey,
} from "@/lib/codexforge/foundation-release-runbook-finalization";

const FOUNDATION_RELEASE_RUNBOOK_FINALIZATION_MARKERS =
  "Foundation release runbook finalization Release runbooks are reviewed before use No release runbook file is written from this page Secrets and private values are excluded Release checklist Operator handoff checklist release runbook identity source foundation release candidate validation checklist rollback/recovery checklist privacy/secrets checklist first real workflow route blocked reasons review-only approval required no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced runbook details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FoundationReleaseRunbookFinalizationPanel() {
  const model = buildFoundationReleaseRunbookFinalizationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-foundation-release-runbook-finalization={`${FOUNDATION_RELEASE_RUNBOOK_FINALIZATION_MARKERS} buildFoundationReleaseRunbookFinalizationStableKey FoundationReleaseRunbookFinalizationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 360"
        title="Release runbook"
        subtitle="Foundation release runbook finalization reviews the operator release runbook before any export or handoff. Release runbooks are reviewed before use, no release runbook file is written from this page, and secrets and private values are excluded."
        primary={{ href: "#foundation-release-runbook-finalization", label: "Review runbook" }}
        links={[
          { href: "/codexforge-foundation-release-candidate", label: "Foundation RC" },
          { href: "/mvp-hardening-regression-matrix", label: "Hardening matrix" },
          { href: "/cross-loop-safety-audit-inbox", label: "Safety audit" },
          { href: "/first-real-operator-workflow-trial", label: "Real trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.runbookLanguage} />
      <PreviewFoundationCard title="Plain-English release runbook">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews checklist language only. It does not write or export a runbook file, execute release
          actions, display secrets, run validation commands, mutate files, mutate memory, or start a workflow trial.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="foundation-release-runbook-finalization" style={previewStyles.grid}>
        {model.runbooks.map((runbook) => (
          <PreviewFoundationCard
            key={buildFoundationReleaseRunbookFinalizationStableKey(
              "foundation-release-runbook-finalization-card",
              runbook.id
            )}
            title={runbook.releaseRunbookIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${runbook.status}`,
                runbook.sourceFoundationReleaseCandidate,
                `Release checklist: ${runbook.releaseChecklist.join("; ")}`,
                `Validation checklist: ${runbook.validationChecklist.join("; ")}`,
                `Rollback/recovery checklist: ${runbook.rollbackRecoveryChecklist.join("; ")}`,
                `Privacy/secrets checklist: ${runbook.privacySecretsChecklist.join("; ")}`,
                `Operator handoff checklist: ${runbook.operatorHandoffChecklist.join("; ")}`,
                runbook.firstRealWorkflowRoute,
                `Blocked reasons: ${runbook.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced runbook details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.runbooks.map((runbook) => runbook.advancedRunbookDetails)} />
        <PreviewFoundationCopy>
          Advanced runbook details stay collapsed or secondary. Runbook finalization remains separate from file export,
          file writes, release execution, validation execution, secret display, memory promotion, and workflow execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
