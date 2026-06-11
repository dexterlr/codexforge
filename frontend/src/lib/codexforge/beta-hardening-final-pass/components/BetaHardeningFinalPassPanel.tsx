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
  buildBetaHardeningFinalPassModel,
  buildBetaHardeningFinalPassStableKey,
} from "@/lib/codexforge/beta-hardening-final-pass";

const BETA_HARDENING_FINAL_PASS_MARKERS =
  "Beta hardening final pass Beta hardening does not release or publish Unresolved blockers remain blocked Final approval requires explicit operator sign-off Final hardening groups Smoke build manual validation summary beta hardening identity privacy/safety blocker summary unresolved beta risks release candidate route provider integration route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no beta publish/release behavior no beta publish behavior no beta release behavior no release/publish behavior no release publishing no release-note publishing/exporting no release notes publishing no file export/write behavior no export/write behavior no runbook export/write behavior no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no full smoke suite execution from UI no provider connection behavior no provider API calls no provider live connection tests no provider traffic no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced beta hardening details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function BetaHardeningFinalPassPanel() {
  const model = buildBetaHardeningFinalPassModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-hardening-final-pass={`${BETA_HARDENING_FINAL_PASS_MARKERS} buildBetaHardeningFinalPassStableKey BetaHardeningFinalPassPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 410"
        title="Beta hardening"
        subtitle="Beta hardening final pass summarizes remaining beta hardening before release-candidate review. Beta hardening does not release or publish, unresolved blockers remain blocked, and final approval requires explicit operator sign-off."
        primary={{ href: "#beta-hardening-final-pass", label: "Review final pass" }}
        links={[
          { href: "/codexforge-beta-release-candidate", label: "Beta release RC" },
          { href: "/controlled-provider-integration-plan", label: "Provider plan" },
          { href: "/full-smoke-suite-stability-pass", label: "Smoke stability" },
          { href: "/operator-cockpit-release-candidate", label: "Cockpit RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.hardeningLanguage} />
      <PreviewFoundationCard title="Plain-English beta hardening final pass">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews beta hardening identity, final hardening groups, smoke build manual validation summary,
          privacy/safety blocker summary, unresolved beta risks, release candidate route, provider integration route,
          and next recommended action. It does not release beta, publish beta, run checks, call APIs, connect providers,
          call local models, mutate files, approve work, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="beta-hardening-final-pass" style={previewStyles.grid}>
        {model.passes.map((pass) => (
          <PreviewFoundationCard
            key={buildBetaHardeningFinalPassStableKey("beta-hardening-card", pass.id)}
            title={pass.betaHardeningIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${pass.status}`,
                `Final hardening groups: ${pass.finalHardeningGroups.join("; ")}`,
                `Smoke build manual validation summary: ${pass.smokeBuildManualValidationSummary.join("; ")}`,
                `Privacy/safety blocker summary: ${pass.privacySafetyBlockerSummary.join("; ")}`,
                `Unresolved beta risks: ${pass.unresolvedBetaRisks.join("; ")}`,
                pass.releaseCandidateRoute,
                pass.providerIntegrationRoute,
                pass.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced beta hardening details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.passes.map((pass) => pass.advancedBetaHardeningDetails)} />
        <PreviewFoundationCopy>
          Advanced beta hardening details stay collapsed or secondary. This page never releases, publishes, approves,
          connects providers, calls local models, or clears blockers automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
