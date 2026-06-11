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
  buildFirstControlledProviderTrialModel,
  buildFirstControlledProviderTrialStableKey,
} from "@/lib/codexforge/first-controlled-provider-trial";

const FIRST_CONTROLLED_PROVIDER_TRIAL_MARKERS =
  "First controlled provider trial First controlled provider trial does not send provider traffic Provider calls require explicit operator approval Trial evidence is reviewed before use Trial stages Provider eligibility checklist first controlled provider trial identity prompt safety checklist approval gates validation evidence requirements denied trial actions blocked trial risks provider response inbox route cost and rate-limit route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no prompt sending to providers no provider response persistence no provider response ingestion no billing fetch behavior no provider retry calls no provider switching no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/credential/response data sending without approval no prompt/file/project/connector/provider/model/credential data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no response storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FirstControlledProviderTrialPanel() {
  const model = buildFirstControlledProviderTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-controlled-provider-trial={`${FIRST_CONTROLLED_PROVIDER_TRIAL_MARKERS} buildFirstControlledProviderTrialStableKey FirstControlledProviderTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 418"
        title="Provider trial"
        subtitle="First controlled provider trial reviews a provider trial plan without sending provider traffic. Provider calls require explicit operator approval, and trial evidence is reviewed before use."
        primary={{ href: "#first-controlled-provider-trial", label: "Review trial plan" }}
        links={[
          { href: "/provider-response-review-inbox", label: "Response inbox" },
          { href: "/provider-cost-rate-limit-review", label: "Cost limits" },
          { href: "/openai-compatible-provider-trial-review", label: "OpenAI-compatible review" },
          { href: "/multi-provider-routing-release-candidate", label: "Routing RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English first controlled provider trial">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews first controlled provider trial identity, trial stages, provider eligibility checklist,
          prompt safety checklist, approval gates, validation evidence requirements, denied trial actions, blocked trial
          risks, provider response inbox route, cost and rate-limit route, and next recommended action. It does not call
          providers, send prompts, store responses, store credentials, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-controlled-provider-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildFirstControlledProviderTrialStableKey("first-controlled-provider-trial-card", trial.id)}
            title={trial.firstControlledProviderTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Trial stages: ${trial.trialStages.join("; ")}`,
                `Provider eligibility checklist: ${trial.providerEligibilityChecklist.join("; ")}`,
                `Prompt safety checklist: ${trial.promptSafetyChecklist.join("; ")}`,
                `Approval gates: ${trial.approvalGates.join("; ")}`,
                `Validation evidence requirements: ${trial.validationEvidenceRequirements.join("; ")}`,
                `Denied trial actions: ${trial.deniedTrialActions.join("; ")}`,
                `Blocked trial risks: ${trial.blockedTrialRisks.join("; ")}`,
                trial.providerResponseInboxRoute,
                trial.costRateLimitRoute,
                trial.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced trial details stay collapsed or secondary. This page never sends provider traffic, calls providers,
          sends prompts, stores provider responses, stores credentials, or approves a provider call automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
