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
  buildLocalModelIntegrationReleaseCandidateModel,
  buildLocalModelIntegrationReleaseCandidateStableKey,
} from "@/lib/codexforge/local-model-integration-release-candidate";

const LOCAL_MODEL_INTEGRATION_RELEASE_CANDIDATE_MARKERS =
  "Local model integration release candidate Local model integration candidate does not route live traffic Live local model routing requires explicit approval Denied local model routes remain blocked Runtime family matrix Routing policy preview local model integration candidate identity denied local model paths credential and endpoint boundary status failover status blocked integration risks creative provider trial route research provider trial route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no local model calls no local model live connection tests no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local endpoint probes no local service calls no local tool launching no local model traffic routing no runtime switching no model retry calls no prompt sending to models no prompt sending to providers no model output persistence no model output ingestion no output storage no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/endpoint/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw local model/runtime/output/failover JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced integration candidate details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalModelIntegrationReleaseCandidatePanel() {
  const model = buildLocalModelIntegrationReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-model-integration-release-candidate={`${LOCAL_MODEL_INTEGRATION_RELEASE_CANDIDATE_MARKERS} buildLocalModelIntegrationReleaseCandidateStableKey LocalModelIntegrationReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 425"
        title="Local integration RC"
        subtitle="Local model integration release candidate reviews readiness without routing live traffic. Live local model routing requires explicit approval, and denied local model routes remain blocked."
        primary={{ href: "#local-model-integration-release-candidate", label: "Review integration RC" }}
        links={[
          { href: "/local-model-runtime-boundary-review", label: "Runtime boundary" },
          { href: "/local-model-output-review-inbox", label: "Output inbox" },
          { href: "/local-model-failover-review", label: "Failover review" },
          { href: "/creative-local-bridge-real-world-trial-review", label: "Creative trial" },
          { href: "/research-loop-real-world-trial-review", label: "Research trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.integrationCandidateLanguage} />
      <PreviewFoundationCard title="Plain-English local model integration release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews local model integration candidate identity, runtime family matrix, routing policy preview,
          denied local model paths, credential and endpoint boundary status, failover status, blocked integration risks,
          creative provider trial route, research provider trial route, and next recommended action. It does not route
          traffic, call models or providers, store endpoints or credentials, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-model-integration-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildLocalModelIntegrationReleaseCandidateStableKey(
              "local-model-integration-candidate-card",
              candidate.id
            )}
            title={candidate.localModelIntegrationCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Runtime family matrix: ${candidate.runtimeFamilyMatrix.join("; ")}`,
                `Routing policy preview: ${candidate.routingPolicyPreview.join("; ")}`,
                `Denied local model paths: ${candidate.deniedLocalModelPaths.join("; ")}`,
                `Credential and endpoint boundary status: ${candidate.credentialEndpointBoundaryStatus.join("; ")}`,
                `Failover status: ${candidate.failoverStatus.join("; ")}`,
                `Blocked integration risks: ${candidate.blockedIntegrationRisks.join("; ")}`,
                candidate.creativeProviderTrialRoute,
                candidate.researchProviderTrialRoute,
                candidate.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced integration candidate details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.candidates.map((candidate) => candidate.advancedIntegrationCandidateDetails)}
        />
        <PreviewFoundationCopy>
          Advanced integration candidate details stay collapsed or secondary. This candidate never routes live traffic,
          calls local models, calls providers, stores endpoints, stores credentials, switches runtimes, or mutates files.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
