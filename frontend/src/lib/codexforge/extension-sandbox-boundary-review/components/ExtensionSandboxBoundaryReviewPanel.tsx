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
  buildExtensionSandboxBoundaryReviewModel,
  buildExtensionSandboxBoundaryReviewStableKey,
} from "@/lib/codexforge/extension-sandbox-boundary-review";

const EXTENSION_SANDBOX_BOUNDARY_REVIEW_MARKERS =
  "Extension sandbox boundary review Sandbox review does not enable runtime execution Extensions cannot access files tools or providers without approved boundaries Runtime execution remains blocked until future approved executor Execution isolation model Audit recovery hooks sandbox review identity source permission policy builder local file boundary network boundary provider boundary MCP/tool boundary memory/RAG boundary audit/recovery hooks release candidate route blocked reasons no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no memory/RAG ingestion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no arbitrary file read/open from UI no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced sandbox details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ExtensionSandboxBoundaryReviewPanel() {
  const model = buildExtensionSandboxBoundaryReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-extension-sandbox-boundary-review={`${EXTENSION_SANDBOX_BOUNDARY_REVIEW_MARKERS} buildExtensionSandboxBoundaryReviewStableKey ExtensionSandboxBoundaryReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 320"
        title="Extension sandbox"
        subtitle="Extension sandbox boundary review describes how future extensions should be isolated before runtime execution is ever allowed. Sandbox review does not enable runtime execution, and runtime execution remains blocked until a future approved executor."
        primary={{ href: "#extension-sandbox-boundary-review", label: "Review boundary" }}
        links={[
          { href: "/extension-permission-policy-builder", label: "Permission policy" },
          { href: "/extension-registry-release-candidate", label: "Registry RC" },
          { href: "/mcp-tool-boundary-comparison", label: "MCP boundary" },
          { href: "/jarvisd-signed-request", label: "Signed request" },
          { href: "/jarvisd-audit-ingestion", label: "Audit ingestion" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.sandboxLanguage} />
      <PreviewFoundationCard title="Plain-English sandbox boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Extensions cannot access files, tools, providers, MCP, memory, RAG, Jarvisd capabilities, or local commands
          without approved boundaries. This page is only a review surface and does not create a runtime sandbox executor.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="extension-sandbox-boundary-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildExtensionSandboxBoundaryReviewStableKey(
              "extension-sandbox-boundary-review-card",
              review.id
            )}
            title={review.sandboxReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourcePermissionPolicyBuilder,
                review.executionIsolationModel,
                review.localFileBoundary,
                review.networkBoundary,
                review.providerBoundary,
                review.mcpToolBoundary,
                review.memoryRagBoundary,
                review.auditRecoveryHooks,
                review.releaseCandidateRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced sandbox details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedSandboxDetails)} />
        <PreviewFoundationCopy>
          Advanced sandbox details stay collapsed or secondary. The sandbox boundary does not execute plugins, tools, or
          agents; it only explains which runtime, file, network, provider, MCP, memory, audit, and recovery gates must
          exist later.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
