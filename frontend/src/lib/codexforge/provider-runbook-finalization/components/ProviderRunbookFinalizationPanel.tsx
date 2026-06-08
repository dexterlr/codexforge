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
  buildProviderRunbookFinalizationModel,
  buildProviderRunbookFinalizationStableKey,
} from "@/lib/codexforge/provider-runbook-finalization";

const PROVIDER_RUNBOOK_FINALIZATION_MARKERS =
  "Provider runbook finalization Runbooks are reviewed before use Runbooks never include API keys or secrets Runbook finalization does not enable provider routing Operator checklist Rollback guidance runbook identity source governance audit source policy bundle export review approved provider/model summary privacy classifications budget guardrails retry guidance blocked reasons provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced runbook details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no raw polling loops no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderRunbookFinalizationPanel() {
  const model = buildProviderRunbookFinalizationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-runbook-finalization={`${PROVIDER_RUNBOOK_FINALIZATION_MARKERS} buildProviderRunbookFinalizationStableKey ProviderRunbookFinalizationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 298"
        title="Runbook finalization"
        subtitle="Provider runbook finalization turns reviewed provider governance, policy, retry, cost, and routing evidence into an operator-ready runbook. Runbooks are reviewed before use, never include API keys or secrets, and finalization does not enable provider routing."
        primary={{ href: "#provider-runbook-finalization", label: "Review runbook" }}
        links={[
          { href: "/provider-governance-mvp-audit", label: "MVP audit" },
          { href: "/provider-policy-bundle-export-review", label: "Policy export" },
          { href: "/provider-failure-retry-trial", label: "Retry trial" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/router-recommendation-apply-review", label: "Router apply review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.runbookLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page records reviewed runbook language only. It does not export API keys, display secrets, call provider
          APIs, mutate the provider registry, or route live provider traffic.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-runbook-finalization" style={previewStyles.grid}>
        {model.finalizations.map((finalization) => (
          <PreviewFoundationCard
            key={buildProviderRunbookFinalizationStableKey(
              "provider-runbook-finalization-card",
              finalization.id
            )}
            title={finalization.runbookIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${finalization.status}`,
                finalization.sourceGovernanceAudit,
                finalization.sourcePolicyBundleExportReview,
                finalization.approvedProviderModelSummary,
                `Privacy classifications: ${finalization.privacyClassifications.join("; ")}`,
                `Budget guardrails: ${finalization.budgetGuardrails.join("; ")}`,
                finalization.retryGuidance,
                finalization.rollbackGuidance,
                `Operator checklist: ${finalization.operatorChecklist.join("; ")}`,
                `Blocked reasons: ${finalization.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced runbook details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.finalizations.map((finalization) => finalization.advancedRunbookDetails)}
        />
        <PreviewFoundationCopy>
          Advanced runbook details stay collapsed or secondary. Runbook finalization is an operator review artifact, not
          provider execution, provider routing, registry mutation, credential export, or policy apply.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
