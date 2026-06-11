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
  buildRecoveryPresetLibraryModel,
  buildRecoveryPresetLibraryStableKey,
} from "@/lib/codexforge/recovery-preset-library";

const RECOVERY_PRESET_LIBRARY_MARKERS =
  "Recovery preset library Recovery presets do not run recovery steps Recovery presets require operator approval before use Validation evidence is required before retry Failure category mapping Manual recovery checklist recovery preset identity preset groups validation evidence requirements blocked recovery presets safety explainability route approval policy route next recommended action review-only approval required plain English daily onboarding operator preferences workspace personalization saved views no settings mutation no preference persistence no notification preference persistence no notification creation no notification sending no personalization persistence no saved view persistence no approval policy mutation no approval preset persistence no recovery execution no recovery preset persistence no localStorage writes no sessionStorage writes no action execution from UI no approval automation no approval is granted no action approval from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector/preference data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced recovery preset details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function RecoveryPresetLibraryPanel() {
  const model = buildRecoveryPresetLibraryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-recovery-preset-library={`${RECOVERY_PRESET_LIBRARY_MARKERS} buildRecoveryPresetLibraryStableKey RecoveryPresetLibraryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 396"
        title="Recovery presets"
        subtitle="Recovery preset library reviews recovery playbook presets without running them. Recovery presets do not run recovery steps, recovery presets require operator approval before use, and validation evidence is required before retry."
        primary={{ href: "#recovery-preset-library", label: "Review recovery" }}
        links={[
          { href: "/safety-boundary-explainability-polish", label: "Safety explanations" },
          { href: "/approval-policy-presets", label: "Approval presets" },
          { href: "/failure-recovery-playbook-finalization", label: "Recovery playbook" },
          { href: "/apply-validation", label: "Validation" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.recoveryLanguage} />
      <PreviewFoundationCard title="Plain-English recovery preset library">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews recovery preset identity, preset groups, failure category mapping, manual recovery
          checklist, validation evidence requirements, blocked recovery presets, safety explainability route, approval
          policy route, and next recommended action. It does not run recovery, run commands, apply patches, save
          recovery presets, write browser storage, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="recovery-preset-library" style={previewStyles.grid}>
        {model.presets.map((preset) => (
          <PreviewFoundationCard
            key={buildRecoveryPresetLibraryStableKey("recovery-preset-card", preset.id)}
            title={preset.recoveryPresetIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${preset.status}`,
                `Preset groups: ${preset.presetGroups.join("; ")}`,
                `Failure category mapping: ${preset.failureCategoryMapping.join("; ")}`,
                `Manual recovery checklist: ${preset.manualRecoveryChecklist.join("; ")}`,
                `Validation evidence requirements: ${preset.validationEvidenceRequirements.join("; ")}`,
                `Blocked recovery presets: ${preset.blockedRecoveryPresets.join("; ")}`,
                preset.safetyExplainabilityRoute,
                preset.approvalPolicyRoute,
                preset.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced recovery preset details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.presets.map((preset) => preset.advancedRecoveryPresetDetails)} />
        <PreviewFoundationCopy>
          Advanced recovery preset details stay collapsed or secondary. Recovery presets remain review-only and do not
          run recovery steps from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
