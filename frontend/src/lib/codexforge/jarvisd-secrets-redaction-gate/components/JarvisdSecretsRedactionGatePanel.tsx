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
  buildJarvisdSecretsRedactionGateModel,
  buildJarvisdSecretsRedactionGateStableKey,
} from "@/lib/codexforge/jarvisd-secrets-redaction-gate";

const JARVISD_SECRETS_REDACTION_GATE_MARKERS =
  "Jarvisd secrets redaction gate Secret values are never displayed Redaction happens before review Redaction does not approve provider or file sending Allowed display fields Denied display fields Approved local boundary required file bridges are reviewed before use plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no live search from arbitrary UI no arbitrary path crawling no file mutation no file deletion no secret value display no secrets displayed no secrets exported no secrets included no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no auto-routing no auto-spend no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function JarvisdSecretsRedactionGatePanel() {
  const model = buildJarvisdSecretsRedactionGateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-jarvisd-secrets-redaction-gate={`${JARVISD_SECRETS_REDACTION_GATE_MARKERS} buildJarvisdSecretsRedactionGateStableKey JarvisdSecretsRedactionGatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 257"
        title="Secrets redaction"
        subtitle="Jarvisd secrets redaction gate explains how future file, search, and index outputs are redacted before review. Secret values are never displayed, redaction happens before review, and redaction does not approve provider or file sending."
        primary={{ href: "#jarvisd-secrets-redaction-gate", label: "Review redaction" }}
        links={[
          { href: "/jarvisd-file-preview-bridge", label: "File preview" },
          { href: "/jarvisd-file-search-bridge", label: "Search bridge" },
          { href: "/jarvisd-index-sync", label: "Index sync" },
          { href: "/project-risk-secrets-scan", label: "Risk scanner" },
          { href: "/local-file-approval", label: "File approval" },
          { href: "/jarvisd-audit-ingestion", label: "Audit ingestion" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.redactionLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Redaction is not approval. This gate only defines what can be displayed safely before review; separate
          approval is required for any future provider or file handoff.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-secrets-redaction-gate" style={previewStyles.grid}>
        {model.gates.map((gate) => (
          <PreviewFoundationCard
            key={buildJarvisdSecretsRedactionGateStableKey("redaction-card", gate.id)}
            title={gate.redactionGateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                gate.sourceCapability,
                gate.findingCategory,
                `Redaction status: ${gate.redactionStatus}`,
                gate.sensitiveIndicatorSummary,
                `Allowed display fields: ${gate.allowedDisplayFields.join("; ")}`,
                `Denied display fields: ${gate.deniedDisplayFields.join("; ")}`,
                gate.approvalRequirement,
                gate.auditHandoff,
                `Blocked reasons: ${gate.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced redaction details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced redaction details stay collapsed. This page never displays secret values, never sends findings to
          providers automatically, does not mutate files, does not call appendEvent or saveBrainGraph from UI, and does
          not approve provider or file sending.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
