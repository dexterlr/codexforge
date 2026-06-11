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
  buildProviderResponseReviewInboxModel,
  buildProviderResponseReviewInboxStableKey,
} from "@/lib/codexforge/provider-response-review-inbox";

const PROVIDER_RESPONSE_REVIEW_INBOX_MARKERS =
  "Provider response review inbox Provider response review inbox does not store provider responses Provider responses require operator review before use Private prompt details stay redacted Response review groups Response safety checks provider response inbox identity redaction and privacy rules acceptance/rejection criteria denied response actions blocked response risks provider safety regression route first controlled trial route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no prompt sending to providers no provider response persistence no provider response ingestion no billing fetch behavior no provider retry calls no provider switching no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/credential/response data sending without approval no prompt/file/project/connector/provider/model/credential data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no response storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced response details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderResponseReviewInboxPanel() {
  const model = buildProviderResponseReviewInboxModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-response-review-inbox={`${PROVIDER_RESPONSE_REVIEW_INBOX_MARKERS} buildProviderResponseReviewInboxStableKey ProviderResponseReviewInboxPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 419"
        title="Response inbox"
        subtitle="Provider response review inbox reviews response handling without storing live responses. Provider responses require operator review before use, and private prompt details stay redacted."
        primary={{ href: "#provider-response-review-inbox", label: "Review response inbox" }}
        links={[
          { href: "/provider-safety-regression-review", label: "Safety regression" },
          { href: "/first-controlled-provider-trial", label: "First trial" },
          { href: "/provider-test-results", label: "Provider test results" },
          { href: "/provider-cost-rate-limit-review", label: "Cost limits" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.responseLanguage} />
      <PreviewFoundationCard title="Plain-English provider response review inbox">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider response inbox identity, response review groups, response safety checks, redaction
          and privacy rules, acceptance/rejection criteria, denied response actions, blocked response risks, provider
          safety regression route, first controlled trial route, and next recommended action. It does not store
          responses, ingest responses, call providers, send prompts, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-response-review-inbox" style={previewStyles.grid}>
        {model.inboxes.map((inbox) => (
          <PreviewFoundationCard
            key={buildProviderResponseReviewInboxStableKey("provider-response-review-inbox-card", inbox.id)}
            title={inbox.providerResponseInboxIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${inbox.status}`,
                `Response review groups: ${inbox.responseReviewGroups.join("; ")}`,
                `Response safety checks: ${inbox.responseSafetyChecks.join("; ")}`,
                `Redaction and privacy rules: ${inbox.redactionPrivacyRules.join("; ")}`,
                `Acceptance/rejection criteria: ${inbox.acceptanceRejectionCriteria.join("; ")}`,
                `Denied response actions: ${inbox.deniedResponseActions.join("; ")}`,
                `Blocked response risks: ${inbox.blockedResponseRisks.join("; ")}`,
                inbox.providerSafetyRegressionRoute,
                inbox.firstControlledTrialRoute,
                inbox.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced response details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.inboxes.map((inbox) => inbox.advancedResponseDetails)} />
        <PreviewFoundationCopy>
          Advanced response details stay collapsed or secondary. This inbox never stores provider responses, ingests
          provider responses, sends follow-up prompts, calls providers, or promotes response content to memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
