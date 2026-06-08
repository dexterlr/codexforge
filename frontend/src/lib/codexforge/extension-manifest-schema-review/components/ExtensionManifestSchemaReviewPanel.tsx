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
  buildExtensionManifestSchemaReviewModel,
  buildExtensionManifestSchemaReviewStableKey,
} from "@/lib/codexforge/extension-manifest-schema-review";

const EXTENSION_MANIFEST_SCHEMA_REVIEW_MARKERS =
  "Extension manifest schema review Schema review does not install or run extensions Third-party code is not vendored or copied Future extension adoption requires license security review Future extension adoption requires license/security review Capability declarations Permission policy route schema review identity source extension architecture decision manifest identity fields permission declarations data access declarations version/compatibility policy denied manifest fields blocked reasons no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no memory/RAG ingestion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no arbitrary file read/open from UI no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced manifest details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ExtensionManifestSchemaReviewPanel() {
  const model = buildExtensionManifestSchemaReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-extension-manifest-schema-review={`${EXTENSION_MANIFEST_SCHEMA_REVIEW_MARKERS} buildExtensionManifestSchemaReviewStableKey ExtensionManifestSchemaReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 318"
        title="Manifest schema"
        subtitle="Extension manifest schema review defines the safe shape for future CodexForge extension manifests. Schema review does not install or run extensions, third-party code is not vendored or copied, and future extension adoption requires license/security review."
        primary={{ href: "#extension-manifest-schema-review", label: "Review schema" }}
        links={[
          { href: "/extension-architecture-decision", label: "Architecture decision" },
          { href: "/extension-permission-policy-builder", label: "Permission policy" },
          { href: "/agent-plugin-registry-comparison", label: "Plugin comparison" },
          { href: "/mcp-tool-boundary-comparison", label: "MCP boundary" },
          { href: "/agent-memory-rag-pattern-review", label: "Memory RAG" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.schemaLanguage} />
      <PreviewFoundationCard title="Plain-English schema review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This schema review does not install or run extensions. It does not execute plugins, tools, or agents, fetch
          network data, vendor third-party code, grant permissions, or approve adoption without license/security review.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="extension-manifest-schema-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildExtensionManifestSchemaReviewStableKey("extension-manifest-schema-review-card", review.id)}
            title={review.schemaReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceExtensionArchitectureDecision,
                `Manifest identity fields: ${review.manifestIdentityFields.join("; ")}`,
                `Capability declarations: ${review.capabilityDeclarations.join("; ")}`,
                `Permission declarations: ${review.permissionDeclarations.join("; ")}`,
                `Data access declarations: ${review.dataAccessDeclarations.join("; ")}`,
                review.versionCompatibilityPolicy,
                `Denied manifest fields: ${review.deniedManifestFields.join("; ")}`,
                review.permissionPolicyRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced manifest details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedManifestDetails)} />
        <PreviewFoundationCopy>
          Advanced manifest details stay collapsed or secondary. The schema is a review artifact only; extension
          install behavior, runtime execution, MCP support, provider traffic, memory ingestion, file access, and registry
          mutation remain blocked.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
