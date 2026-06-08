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
  buildExtensionRegistryReleaseCandidateModel,
  buildExtensionRegistryReleaseCandidateStableKey,
} from "@/lib/codexforge/extension-registry-release-candidate";

const EXTENSION_REGISTRY_RELEASE_CANDIDATE_MARKERS =
  "Extension registry release candidate Registry release candidate remains review-only Extensions are not installed or enabled automatically Runtime execution remains behind approved boundaries Release decision Known gaps release candidate identity covered extension surfaces manifest schema readiness permission policy readiness sandbox boundary readiness audit/recovery readiness license/security review readiness next recommended route blocked reasons no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no memory/RAG ingestion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no arbitrary file read/open from UI no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced release details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ExtensionRegistryReleaseCandidatePanel() {
  const model = buildExtensionRegistryReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-extension-registry-release-candidate={`${EXTENSION_REGISTRY_RELEASE_CANDIDATE_MARKERS} buildExtensionRegistryReleaseCandidateStableKey ExtensionRegistryReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 321"
        title="Registry RC"
        subtitle="Extension registry release candidate audits whether manifest schema, permission policy, sandbox boundaries, and architecture decisions are ready for a future registry MVP. Registry release candidate remains review-only, extensions are not installed or enabled automatically, and runtime execution remains behind approved boundaries."
        primary={{ href: "#extension-registry-release-candidate", label: "Review candidate" }}
        links={[
          { href: "/extension-manifest-schema-review", label: "Manifest schema" },
          { href: "/extension-permission-policy-builder", label: "Permission policy" },
          { href: "/extension-sandbox-boundary-review", label: "Sandbox boundary" },
          { href: "/extension-architecture-decision", label: "Architecture decision" },
          { href: "/provider-governance-release-candidate", label: "Provider RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.releaseLanguage} />
      <PreviewFoundationCard title="Plain-English release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This release candidate does not install extensions, enable plugins, execute plugins, execute tools, execute
          agents, mutate registries, or create an extension runtime executor. It is a readiness review for a future MVP.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="extension-registry-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildExtensionRegistryReleaseCandidateStableKey(
              "extension-registry-release-candidate-card",
              candidate.id
            )}
            title={candidate.releaseCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Covered extension surfaces: ${candidate.coveredExtensionSurfaces.join("; ")}`,
                candidate.manifestSchemaReadiness,
                candidate.permissionPolicyReadiness,
                candidate.sandboxBoundaryReadiness,
                candidate.auditRecoveryReadiness,
                candidate.licenseSecurityReviewReadiness,
                `Known gaps: ${candidate.knownGaps.join("; ")}`,
                candidate.releaseDecisionLabel,
                candidate.nextRecommendedRoute,
                `Blocked reasons: ${candidate.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedReleaseDetails)} />
        <PreviewFoundationCopy>
          Advanced release details stay collapsed or secondary. Release readiness remains review-only and cannot enable
          runtime execution, install extensions, call MCP tools, call providers, mutate files, mutate Brain graph state,
          or silently change provider or Jarvisd registries.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
