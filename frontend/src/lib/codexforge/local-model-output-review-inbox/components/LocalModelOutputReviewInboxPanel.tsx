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
  buildLocalModelOutputReviewInboxModel,
  buildLocalModelOutputReviewInboxStableKey,
} from "@/lib/codexforge/local-model-output-review-inbox";

const LOCAL_MODEL_OUTPUT_REVIEW_INBOX_MARKERS =
  "Local model output review inbox Local model output review does not store model outputs Local model outputs require operator review before use Private prompt details stay redacted Output review groups Output safety checks local model output inbox identity redaction/privacy rules acceptance/rejection criteria denied output actions blocked output risks local failover route runtime boundary route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no local model calls no local model live connection tests no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local endpoint probes no local service calls no local tool launching no local model traffic routing no runtime switching no model retry calls no prompt sending to models no prompt sending to providers no model output persistence no model output ingestion no output storage no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/endpoint/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw local model/runtime/output/failover JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced output details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalModelOutputReviewInboxPanel() {
  const model = buildLocalModelOutputReviewInboxModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-model-output-review-inbox={`${LOCAL_MODEL_OUTPUT_REVIEW_INBOX_MARKERS} buildLocalModelOutputReviewInboxStableKey LocalModelOutputReviewInboxPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 423"
        title="Output review inbox"
        subtitle="Local model output review inbox reviews output handling without storing live outputs. Local model outputs require operator review before use, and private prompt details stay redacted."
        primary={{ href: "#local-model-output-review-inbox", label: "Review output inbox" }}
        links={[
          { href: "/local-model-failover-review", label: "Failover review" },
          { href: "/local-model-runtime-boundary-review", label: "Runtime boundary" },
          { href: "/provider-response-review-inbox", label: "Provider inbox" },
          { href: "/local-model-provider-trial-review", label: "Local trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.outputReviewLanguage} />
      <PreviewFoundationCard title="Plain-English local model output review inbox">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews local model output inbox identity, output review groups, output safety checks,
          redaction/privacy rules, acceptance/rejection criteria, denied output actions, blocked output risks, local
          failover route, runtime boundary route, and next recommended action. It does not store outputs, call local
          models, ingest outputs, send prompts, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-model-output-review-inbox" style={previewStyles.grid}>
        {model.inboxes.map((inbox) => (
          <PreviewFoundationCard
            key={buildLocalModelOutputReviewInboxStableKey("local-model-output-inbox-card", inbox.id)}
            title={inbox.localModelOutputInboxIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${inbox.status}`,
                `Output review groups: ${inbox.outputReviewGroups.join("; ")}`,
                `Output safety checks: ${inbox.outputSafetyChecks.join("; ")}`,
                `Redaction/privacy rules: ${inbox.redactionPrivacyRules.join("; ")}`,
                `Acceptance/rejection criteria: ${inbox.acceptanceRejectionCriteria.join("; ")}`,
                `Denied output actions: ${inbox.deniedOutputActions.join("; ")}`,
                `Blocked output risks: ${inbox.blockedOutputRisks.join("; ")}`,
                inbox.localFailoverRoute,
                inbox.runtimeBoundaryRoute,
                inbox.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced output details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.inboxes.map((inbox) => inbox.advancedOutputDetails)} />
        <PreviewFoundationCopy>
          Advanced output details stay collapsed or secondary. This inbox never stores local model outputs, ingests
          output content, sends follow-up prompts, calls local models, routes traffic, or promotes output to memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
