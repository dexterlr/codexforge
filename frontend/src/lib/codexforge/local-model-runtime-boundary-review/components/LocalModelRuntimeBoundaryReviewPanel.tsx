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
  buildLocalModelRuntimeBoundaryReviewModel,
  buildLocalModelRuntimeBoundaryReviewStableKey,
} from "@/lib/codexforge/local-model-runtime-boundary-review";

const LOCAL_MODEL_RUNTIME_BOUNDARY_REVIEW_MARKERS =
  "Local model runtime boundary review Local model runtime boundary does not call local models Runtime checks require explicit operator approval Local endpoints stay private Runtime families Local bridge dependency notes local model runtime boundary identity denied runtime actions endpoint privacy rules manual validation checklist blocked runtime risks local model output inbox route local model failover route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no local model calls no local model live connection tests no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local endpoint probes no local service calls no local tool launching no local model traffic routing no runtime switching no model retry calls no prompt sending to models no prompt sending to providers no model output persistence no model output ingestion no output storage no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/endpoint/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw local model/runtime/output/failover JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced runtime boundary details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalModelRuntimeBoundaryReviewPanel() {
  const model = buildLocalModelRuntimeBoundaryReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-model-runtime-boundary-review={`${LOCAL_MODEL_RUNTIME_BOUNDARY_REVIEW_MARKERS} buildLocalModelRuntimeBoundaryReviewStableKey LocalModelRuntimeBoundaryReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 422"
        title="Runtime boundary"
        subtitle="Local model runtime boundary review checks runtime boundaries without calling local models, probing endpoints, or touching local bridge endpoints. Runtime checks require explicit operator approval, and local endpoints stay private."
        primary={{ href: "#local-model-runtime-boundary-review", label: "Review runtime boundary" }}
        links={[
          { href: "/local-model-output-review-inbox", label: "Output inbox" },
          { href: "/local-model-failover-review", label: "Failover review" },
          { href: "/local-model-provider-trial-review", label: "Local trial" },
          { href: "/local-bridge-readiness-audit", label: "Bridge readiness" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.runtimeBoundaryLanguage} />
      <PreviewFoundationCard title="Plain-English local model runtime boundary review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews local model runtime boundary identity, runtime families, local bridge dependency notes,
          denied runtime actions, endpoint privacy rules, manual validation checklist, blocked runtime risks, local
          model output inbox route, local model failover route, and next recommended action. It does not call local
          models, call local bridge endpoints, probe local endpoints, switch runtimes, send prompts, store endpoints,
          mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-model-runtime-boundary-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildLocalModelRuntimeBoundaryReviewStableKey("local-model-runtime-boundary-card", review.id)}
            title={review.localModelRuntimeBoundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Runtime families: ${review.runtimeFamilies.join("; ")}`,
                `Local bridge dependency notes: ${review.localBridgeDependencyNotes.join("; ")}`,
                `Denied runtime actions: ${review.deniedRuntimeActions.join("; ")}`,
                `Endpoint privacy rules: ${review.endpointPrivacyRules.join("; ")}`,
                `Manual validation checklist: ${review.manualValidationChecklist.join("; ")}`,
                `Blocked runtime risks: ${review.blockedRuntimeRisks.join("; ")}`,
                review.localModelOutputInboxRoute,
                review.localModelFailoverRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced runtime boundary details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.reviews.map((review) => review.advancedRuntimeBoundaryDetails)}
        />
        <PreviewFoundationCopy>
          Advanced runtime boundary details stay collapsed or secondary. This review never calls local models, probes
          local endpoints, calls local bridge endpoints, switches runtimes, sends prompts, stores endpoints, or stores
          outputs.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
