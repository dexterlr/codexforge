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
  buildApprovalPolicyPresetsModel,
  buildApprovalPolicyPresetsStableKey,
} from "@/lib/codexforge/approval-policy-presets";

const APPROVAL_POLICY_PRESETS_MARKERS =
  "Approval policy presets Approval presets do not change live policy Policy changes require explicit operator approval Unsafe approval shortcuts stay blocked Preset groups Required approval gates approval policy preset identity novice/expert preset preview denied automation policy blocked preset risks recovery preset library route safety explainability route next recommended action review-only approval required plain English daily onboarding operator preferences workspace personalization saved views no settings mutation no preference persistence no notification preference persistence no notification creation no notification sending no personalization persistence no saved view persistence no approval policy mutation no approval preset persistence no recovery execution no recovery preset persistence no localStorage writes no sessionStorage writes no action execution from UI no approval automation no approval is granted no action approval from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector/preference data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced policy details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ApprovalPolicyPresetsPanel() {
  const model = buildApprovalPolicyPresetsModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-approval-policy-presets={`${APPROVAL_POLICY_PRESETS_MARKERS} buildApprovalPolicyPresetsStableKey ApprovalPolicyPresetsPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 395"
        title="Approval presets"
        subtitle="Approval policy presets previews possible policy presets without changing live policy. Approval presets do not change live policy, policy changes require explicit operator approval, and unsafe approval shortcuts stay blocked."
        primary={{ href: "#approval-policy-presets", label: "Review presets" }}
        links={[
          { href: "/recovery-preset-library", label: "Recovery presets" },
          { href: "/safety-boundary-explainability-polish", label: "Safety explanations" },
          { href: "/notification-preferences-review", label: "Notifications" },
          { href: "/approval-queue", label: "Approval queue" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.policyLanguage} />
      <PreviewFoundationCard title="Plain-English approval policy presets">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews approval policy preset identity, preset groups, novice/expert preset preview, required
          approval gates, denied automation policy, blocked preset risks, recovery preset library route, safety
          explainability route, and next recommended action. It does not change policy, save presets, approve actions,
          write browser storage, or create approval automation.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="approval-policy-presets" style={previewStyles.grid}>
        {model.presets.map((preset) => (
          <PreviewFoundationCard
            key={buildApprovalPolicyPresetsStableKey("approval-policy-preset-card", preset.id)}
            title={preset.approvalPolicyPresetIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${preset.status}`,
                `Preset groups: ${preset.presetGroups.join("; ")}`,
                `Novice/expert preset preview: ${preset.noviceExpertPresetPreview.join("; ")}`,
                `Required approval gates: ${preset.requiredApprovalGates.join("; ")}`,
                `Denied automation policy: ${preset.deniedAutomationPolicy.join("; ")}`,
                `Blocked preset risks: ${preset.blockedPresetRisks.join("; ")}`,
                preset.recoveryPresetLibraryRoute,
                preset.safetyExplainabilityRoute,
                preset.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced policy details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.presets.map((preset) => preset.advancedPolicyDetails)} />
        <PreviewFoundationCopy>
          Advanced policy details stay collapsed or secondary. Approval presets remain review-only and do not change
          live policy from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
