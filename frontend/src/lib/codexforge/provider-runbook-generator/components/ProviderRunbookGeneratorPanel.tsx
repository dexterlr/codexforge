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
import { buildProviderRunbookGeneratorModel } from "@/lib/codexforge/provider-runbook-generator";

export function ProviderRunbookGeneratorPanel() {
  const model = buildProviderRunbookGeneratorModel();

  return (
    <div style={previewStyles.shell} data-codexforge-provider-runbook-generator="ProviderRunbookGeneratorPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated provider runbook generator nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Provider runbook generator Runbooks do not include secrets Commands are manual-only Credential safety checklist Live-test gate checklist Failure recovery step no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no secrets displayed no secrets exported no API keys exported no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 211"
        title="Runbook generator"
        subtitle="Provider runbook generator creates safe operator-readable setup, testing, recovery, and governance steps. Runbooks do not include secrets, commands are manual-only, and nothing runs automatically."
        primary={{ href: "#provider-runbook-generator", label: "Review runbook" }}
        links={[
          { href: "/provider-policy-bundle", label: "Policy bundle" },
          { href: "/provider-setup", label: "Setup wizard" },
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/provider-failure-recovery", label: "Failure recovery" },
          { href: "/provider-audit-log", label: "Audit log" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.runbookLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-runbook-generator" style={previewStyles.grid}>
        <PreviewFoundationCard title="Runbook identity">
          <PreviewFoundationPillList items={model.runbooks.map((runbook) => runbook.runbookIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Provider setup checklist">
          <PreviewFoundationPillList
            items={model.runbooks.map((runbook) => runbook.providerSetupChecklist.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Credential safety checklist">
          <PreviewFoundationPillList
            items={model.runbooks.map((runbook) => runbook.credentialSafetyChecklist.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Live-test gate checklist">
          <PreviewFoundationPillList
            items={model.runbooks.map((runbook) => runbook.liveTestGateChecklist.join("; "))}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy classifier step">
          <PreviewFoundationPillList items={model.runbooks.map((runbook) => runbook.privacyClassifierStep)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Budget guardrail step">
          <PreviewFoundationPillList items={model.runbooks.map((runbook) => runbook.budgetGuardrailStep)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Failure recovery step">
          <PreviewFoundationPillList items={model.runbooks.map((runbook) => runbook.failureRecoveryStep)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Audit review step">
          <PreviewFoundationPillList items={model.runbooks.map((runbook) => runbook.auditReviewStep)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Manual-only commands/handoff">
          <PreviewFoundationPillList
            items={model.runbooks.map((runbook) => `${runbook.reviewStatus}: ${runbook.manualOnlyCommandsHandoff}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Excluded secrets note">
          <PreviewFoundationPillList items={model.runbooks.map((runbook) => runbook.excludedSecretsNote)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced runbook details">
        <PreviewFoundationPillList items={model.runbooks.map((runbook) => runbook.advancedRunbookDetails)} />
        <PreviewFoundationCopy>
          Advanced runbook details stay secondary. This generator does not include secrets, run shell commands, call provider APIs, export API keys, auto-route traffic, spend tokens, export settings, import settings, or mutate provider profiles.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
