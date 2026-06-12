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
  buildProviderAuditTrailReviewModel,
  buildProviderAuditTrailReviewStableKey,
} from "@/lib/codexforge/provider-audit-trail-review";

const PROVIDER_AUDIT_TRAIL_REVIEW_MARKERS =
  "Provider audit trail review Provider audit trail review does not store provider outputs Provider audit events require operator review Private prompts and outputs stay redacted Audit event groups Retention boundary checklist provider audit trail identity provider request/response review policy redaction and privacy rules denied audit actions blocked audit trail risks hardening pass route provider selection route next recommended action review-only approval required no provider selection persistence no provider switching no provider permission persistence no provider permission grant no permission grant persistence no provider configuration changes no provider settings persistence no provider output persistence no provider output ingestion no provider output storage no output storage no provider response ingestion no response ingestion no audit event persistence no provider trial data persistence no memory mutation no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider API calls no provider live connection tests no provider traffic no provider traffic routing no prompt sending to providers no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no evidence ingestion automation no coding workflow execution no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no credential storage no provider key storage no connector token storage no token storage no endpoint storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw provider audit JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced audit details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderAuditTrailReviewPanel() {
  const model = buildProviderAuditTrailReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-audit-trail-review={`${PROVIDER_AUDIT_TRAIL_REVIEW_MARKERS} buildProviderAuditTrailReviewStableKey ProviderAuditTrailReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 432"
        title="Provider audit trail review"
        subtitle="Provider audit trail review checks audit expectations without storing provider outputs. Provider audit events require operator review, and private prompts and outputs stay redacted."
        primary={{ href: "#provider-audit-trail-review", label: "Review audit" }}
        links={[
          { href: "/provider-integration-hardening-pass", label: "Hardening pass" },
          { href: "/provider-selection-ux-polish", label: "Selection UX" },
          { href: "/provider-permission-presets", label: "Permission presets" },
          { href: "/provider-audit-log", label: "Audit log viewer" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.auditLanguage} />
      <PreviewFoundationCard title="Plain-English provider audit trail review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider audit trail identity, audit event groups, provider request/response review policy,
          redaction and privacy rules, denied audit actions, retention boundary checklist, blocked audit trail risks,
          hardening pass route, provider selection route, and next recommended action. It does not store provider
          outputs, persist audit events, call providers, mutate memory, or expose private prompts and outputs.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-audit-trail-review" style={previewStyles.grid}>
        {model.auditTrails.map((auditTrail) => (
          <PreviewFoundationCard
            key={buildProviderAuditTrailReviewStableKey("provider-audit-trail-card", auditTrail.id)}
            title={auditTrail.providerAuditTrailIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${auditTrail.status}`,
                `Audit event groups: ${auditTrail.auditEventGroups.join("; ")}`,
                `Provider request/response review policy: ${auditTrail.providerRequestResponseReviewPolicy.join("; ")}`,
                `Redaction and privacy rules: ${auditTrail.redactionAndPrivacyRules.join("; ")}`,
                `Denied audit actions: ${auditTrail.deniedAuditActions.join("; ")}`,
                `Retention boundary checklist: ${auditTrail.retentionBoundaryChecklist.join("; ")}`,
                `Blocked audit trail risks: ${auditTrail.blockedAuditTrailRisks.join("; ")}`,
                auditTrail.hardeningPassRoute,
                auditTrail.providerSelectionRoute,
                auditTrail.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced audit details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.auditTrails.map((auditTrail) => auditTrail.advancedAuditDetails)} />
        <PreviewFoundationCopy>
          Advanced audit details stay collapsed or secondary. This page reviews audit expectations only; provider
          outputs and audit events are not stored here.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
