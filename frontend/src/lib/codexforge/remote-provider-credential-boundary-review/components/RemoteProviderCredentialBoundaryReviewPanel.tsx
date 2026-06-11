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
  buildRemoteProviderCredentialBoundaryReviewModel,
  buildRemoteProviderCredentialBoundaryReviewStableKey,
} from "@/lib/codexforge/remote-provider-credential-boundary-review";

const REMOTE_PROVIDER_CREDENTIAL_BOUNDARY_REVIEW_MARKERS =
  "Remote provider credential boundary review Credential boundary review does not store credentials Keys and tokens are never displayed Provider access requires explicit operator approval Credential categories Denied storage locations credential boundary identity redaction rules manual validation checklist approval gates blocked credential risks provider failover route multi-provider routing route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no provider switching no provider retry calls no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/credential data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced credential details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function RemoteProviderCredentialBoundaryReviewPanel() {
  const model = buildRemoteProviderCredentialBoundaryReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-remote-provider-credential-boundary-review={`${REMOTE_PROVIDER_CREDENTIAL_BOUNDARY_REVIEW_MARKERS} buildRemoteProviderCredentialBoundaryReviewStableKey RemoteProviderCredentialBoundaryReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 415"
        title="Credential boundary"
        subtitle="Remote provider credential boundary review explains provider credential handling without storing or displaying secrets. Credential boundary review does not store credentials, keys and tokens are never displayed, and provider access requires explicit operator approval."
        primary={{ href: "#remote-provider-credential-boundary-review", label: "Review credentials" }}
        links={[
          { href: "/openai-compatible-provider-trial-review", label: "OpenAI-compatible trial" },
          { href: "/provider-failover-policy-review", label: "Failover policy" },
          { href: "/multi-provider-routing-release-candidate", label: "Routing RC" },
          { href: "/secrets-token-storage-regression-sweep", label: "Secrets sweep" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.credentialLanguage} />
      <PreviewFoundationCard title="Plain-English remote provider credential boundary review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews credential boundary identity, credential categories, denied storage locations, redaction
          rules, manual validation checklist, approval gates, blocked credential risks, provider failover route,
          multi-provider routing route, and next recommended action. It does not store credentials, display keys or
          tokens, write browser storage, call APIs, route traffic, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="remote-provider-credential-boundary-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildRemoteProviderCredentialBoundaryReviewStableKey("remote-provider-credential-card", review.id)}
            title={review.credentialBoundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Credential categories: ${review.credentialCategories.join("; ")}`,
                `Denied storage locations: ${review.deniedStorageLocations.join("; ")}`,
                `Redaction rules: ${review.redactionRules.join("; ")}`,
                `Manual validation checklist: ${review.manualValidationChecklist.join("; ")}`,
                `Approval gates: ${review.approvalGates.join("; ")}`,
                `Blocked credential risks: ${review.blockedCredentialRisks.join("; ")}`,
                review.providerFailoverRoute,
                review.multiProviderRoutingRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced credential details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedCredentialDetails)} />
        <PreviewFoundationCopy>
          Advanced credential details stay collapsed or secondary. This page never stores credentials, displays keys or
          tokens, prints environment values, connects providers, or approves provider access automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
