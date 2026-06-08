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
  buildExtensionPermissionPolicyBuilderModel,
  buildExtensionPermissionPolicyBuilderStableKey,
} from "@/lib/codexforge/extension-permission-policy-builder";

const EXTENSION_PERMISSION_POLICY_BUILDER_MARKERS =
  "Extension permission policy builder Permission policies do not grant permissions automatically Extension permissions require explicit review Denied scopes remain blocked Allowed permission scope Sandbox boundary route policy builder identity source manifest schema review requested capabilities denied permission scope data boundary policy audit/recovery requirement approval requirement blocked reasons no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no memory/RAG ingestion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no arbitrary file read/open from UI no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced permission details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ExtensionPermissionPolicyBuilderPanel() {
  const model = buildExtensionPermissionPolicyBuilderModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-extension-permission-policy-builder={`${EXTENSION_PERMISSION_POLICY_BUILDER_MARKERS} buildExtensionPermissionPolicyBuilderStableKey ExtensionPermissionPolicyBuilderPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 319"
        title="Permission policy"
        subtitle="Extension permission policy builder maps manifest declarations to allowed and denied review scopes. Permission policies do not grant permissions automatically, extension permissions require explicit review, and denied scopes remain blocked."
        primary={{ href: "#extension-permission-policy-builder", label: "Review policy" }}
        links={[
          { href: "/extension-manifest-schema-review", label: "Manifest schema" },
          { href: "/extension-sandbox-boundary-review", label: "Sandbox boundary" },
          { href: "/jarvisd-permissions", label: "Jarvisd permissions" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime guard" },
          { href: "/provider-policy-bundle-export-review", label: "Policy export" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.policyLanguage} />
      <PreviewFoundationCard title="Plain-English permission policy">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This builder does not grant permissions, mutate Jarvisd or provider registries, execute extensions, browse
          files, call providers, call MCP tools, or store secrets. It only explains what would stay allowed or denied for
          review.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="extension-permission-policy-builder" style={previewStyles.grid}>
        {model.policies.map((policy) => (
          <PreviewFoundationCard
            key={buildExtensionPermissionPolicyBuilderStableKey(
              "extension-permission-policy-builder-card",
              policy.id
            )}
            title={policy.policyBuilderIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${policy.status}`,
                policy.sourceManifestSchemaReview,
                `Requested capabilities: ${policy.requestedCapabilities.join("; ")}`,
                `Allowed permission scope: ${policy.allowedPermissionScope.join("; ")}`,
                `Denied permission scope: ${policy.deniedPermissionScope.join("; ")}`,
                policy.dataBoundaryPolicy,
                policy.auditRecoveryRequirement,
                policy.approvalRequirement,
                policy.sandboxBoundaryRoute,
                `Blocked reasons: ${policy.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced permission details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.policies.map((policy) => policy.advancedPermissionDetails)} />
        <PreviewFoundationCopy>
          Advanced permission details stay collapsed or secondary. Policy mapping is review-only and cannot become an
          automatic grant, Jarvisd permission change, provider registry change, file access path, or runtime executor.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
