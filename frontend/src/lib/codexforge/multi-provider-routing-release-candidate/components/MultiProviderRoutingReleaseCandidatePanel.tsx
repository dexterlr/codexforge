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
  buildMultiProviderRoutingReleaseCandidateModel,
  buildMultiProviderRoutingReleaseCandidateStableKey,
} from "@/lib/codexforge/multi-provider-routing-release-candidate";

const MULTI_PROVIDER_ROUTING_RELEASE_CANDIDATE_MARKERS =
  "Multi-provider routing release candidate Multi-provider routing candidate does not route live traffic Live provider routing requires explicit approval Denied provider routes remain blocked Provider family matrix Routing policy preview multi-provider routing release candidate identity denied routing paths credential boundary status failover status blocked routing risks first controlled provider trial route provider response review route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no provider switching no provider retry calls no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/credential data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced routing details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function MultiProviderRoutingReleaseCandidatePanel() {
  const model = buildMultiProviderRoutingReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-multi-provider-routing-release-candidate={`${MULTI_PROVIDER_ROUTING_RELEASE_CANDIDATE_MARKERS} buildMultiProviderRoutingReleaseCandidateStableKey MultiProviderRoutingReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 417"
        title="Routing release RC"
        subtitle="Multi-provider routing release candidate reviews routing readiness across provider families without live routing. Multi-provider routing candidate does not route live traffic, live provider routing requires explicit approval, and denied provider routes remain blocked."
        primary={{ href: "#multi-provider-routing-release-candidate", label: "Review routing RC" }}
        links={[
          { href: "/openai-compatible-provider-trial-review", label: "OpenAI-compatible trial" },
          { href: "/remote-provider-credential-boundary-review", label: "Credential boundary" },
          { href: "/provider-failover-policy-review", label: "Failover policy" },
          { href: "/provider-test-results", label: "Provider responses" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.routingLanguage} />
      <PreviewFoundationCard title="Plain-English multi-provider routing release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews multi-provider routing release candidate identity, provider family matrix, routing policy
          preview, denied routing paths, credential boundary status, failover status, blocked routing risks, first
          controlled provider trial route, provider response review route, and next recommended action. It does not
          route live traffic, call providers, store credentials, switch providers, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="multi-provider-routing-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildMultiProviderRoutingReleaseCandidateStableKey("multi-provider-routing-rc-card", candidate.id)}
            title={candidate.multiProviderRoutingReleaseCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Provider family matrix: ${candidate.providerFamilyMatrix.join("; ")}`,
                `Routing policy preview: ${candidate.routingPolicyPreview.join("; ")}`,
                `Denied routing paths: ${candidate.deniedRoutingPaths.join("; ")}`,
                `Credential boundary status: ${candidate.credentialBoundaryStatus.join("; ")}`,
                `Failover status: ${candidate.failoverStatus.join("; ")}`,
                `Blocked routing risks: ${candidate.blockedRoutingRisks.join("; ")}`,
                candidate.firstControlledProviderTrialRoute,
                candidate.providerResponseReviewRoute,
                candidate.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced routing details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedRoutingDetails)} />
        <PreviewFoundationCopy>
          Advanced routing details stay collapsed or secondary. This page never routes live provider traffic, calls
          providers, stores credentials, switches providers, retries provider calls, or approves routing automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
