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
  buildWebResearchProviderBoundaryModel,
  buildWebResearchProviderBoundaryStableKey,
} from "@/lib/codexforge/web-research-provider-boundary";

const WEB_RESEARCH_PROVIDER_BOUNDARY_MARKERS =
  "Web research provider boundary Web research provider calls require explicit approval No web or provider request is sent from this page API keys and secrets are never displayed Allowed source scope Budget rate limit guardrail boundary identity source research workspace provider/search method summary query/privacy classification denied source scope approval requirement source collector route blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced boundary details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function WebResearchProviderBoundaryPanel() {
  const model = buildWebResearchProviderBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-web-research-provider-boundary={`${WEB_RESEARCH_PROVIDER_BOUNDARY_MARKERS} buildWebResearchProviderBoundaryStableKey WebResearchProviderBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 323"
        title="Web boundary"
        subtitle="Web research provider boundary reviews whether a future web, search, or provider research action is allowed. Web research provider calls require explicit approval, no web or provider request is sent from this page, and API keys and secrets are never displayed."
        primary={{ href: "#web-research-provider-boundary", label: "Review boundary" }}
        links={[
          { href: "/research-workspace", label: "Research workspace" },
          { href: "/research-source-collector-trial", label: "Source collector" },
          { href: "/prompt-privacy-classifier", label: "Privacy classifier" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.boundaryLanguage} />
      <PreviewFoundationCard title="Plain-English provider boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page does not send a web or provider request, display API keys or secrets, store credentials in browser
          storage, retry provider requests, auto-spend tokens, or fetch sources automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="web-research-provider-boundary" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildWebResearchProviderBoundaryStableKey("web-research-boundary-card", review.id)}
            title={review.boundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceResearchWorkspace,
                review.providerSearchMethodSummary,
                review.queryPrivacyClassification,
                review.allowedSourceScope,
                review.deniedSourceScope,
                review.budgetRateLimitGuardrail,
                review.approvalRequirement,
                review.sourceCollectorRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced boundary details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedBoundaryDetails)} />
        <PreviewFoundationCopy>
          Advanced boundary details stay collapsed or secondary. Future web research remains approval-gated and returns
          to the source collector for review instead of being used automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
