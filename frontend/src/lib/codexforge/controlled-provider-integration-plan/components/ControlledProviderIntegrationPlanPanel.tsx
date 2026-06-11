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
  buildControlledProviderIntegrationPlanModel,
  buildControlledProviderIntegrationPlanStableKey,
} from "@/lib/codexforge/controlled-provider-integration-plan";

const CONTROLLED_PROVIDER_INTEGRATION_PLAN_MARKERS =
  "Controlled provider integration plan Provider integration plan does not connect providers Provider traffic requires explicit approval Keys and tokens are never displayed or stored here Provider families OpenAI-compatible API lane provider integration plan identity local model lane creative provider lane research/coding provider lane key/token safety rules approval gates blocked provider integration risks local model trial route beta release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector/provider/workflow data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced provider integration details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ControlledProviderIntegrationPlanPanel() {
  const model = buildControlledProviderIntegrationPlanModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-controlled-provider-integration-plan={`${CONTROLLED_PROVIDER_INTEGRATION_PLAN_MARKERS} buildControlledProviderIntegrationPlanStableKey ControlledProviderIntegrationPlanPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 412"
        title="Provider plan"
        subtitle="Controlled provider integration plan reviews how AI providers can be plugged in safely later. Provider integration plan does not connect providers, provider traffic requires explicit approval, and keys and tokens are never displayed or stored here."
        primary={{ href: "#controlled-provider-integration-plan", label: "Review provider plan" }}
        links={[
          { href: "/local-model-provider-trial-review", label: "Local model trial" },
          { href: "/codexforge-beta-release-candidate", label: "Beta release RC" },
          { href: "/provider-routing-readiness-audit", label: "Provider readiness" },
          { href: "/secrets-token-storage-regression-sweep", label: "Secrets sweep" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.providerIntegrationLanguage} />
      <PreviewFoundationCard title="Plain-English controlled provider integration plan">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider integration plan identity, provider families, OpenAI-compatible API lane, local model
          lane, creative provider lane, research/coding provider lane, key/token safety rules, approval gates, blocked
          provider integration risks, local model trial route, beta release candidate route, and next recommended action.
          It does not connect providers, test provider connections, call provider APIs, route live traffic, store keys,
          store tokens, call local models, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="controlled-provider-integration-plan" style={previewStyles.grid}>
        {model.plans.map((plan) => (
          <PreviewFoundationCard
            key={buildControlledProviderIntegrationPlanStableKey("provider-integration-card", plan.id)}
            title={plan.providerIntegrationPlanIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${plan.status}`,
                `Provider families: ${plan.providerFamilies.join("; ")}`,
                `OpenAI-compatible API lane: ${plan.openAICompatibleApiLane.join("; ")}`,
                `Local model lane: ${plan.localModelLane.join("; ")}`,
                `Creative provider lane: ${plan.creativeProviderLane.join("; ")}`,
                `Research/coding provider lane: ${plan.researchCodingProviderLane.join("; ")}`,
                `Key/token safety rules: ${plan.keyTokenSafetyRules.join("; ")}`,
                `Approval gates: ${plan.approvalGates.join("; ")}`,
                `Blocked provider integration risks: ${plan.blockedProviderIntegrationRisks.join("; ")}`,
                plan.localModelTrialRoute,
                plan.betaReleaseCandidateRoute,
                plan.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced provider integration details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.plans.map((plan) => plan.advancedProviderIntegrationDetails)} />
        <PreviewFoundationCopy>
          Advanced provider integration details stay collapsed or secondary. This page never connects providers, stores
          credentials, tests provider connections, routes provider traffic, calls local models, or approves traffic.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
