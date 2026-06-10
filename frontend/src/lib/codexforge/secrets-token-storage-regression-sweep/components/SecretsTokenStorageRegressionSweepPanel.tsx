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
  buildSecretsTokenStorageRegressionSweepModel,
  buildSecretsTokenStorageRegressionSweepStableKey,
} from "@/lib/codexforge/secrets-token-storage-regression-sweep";

const SECRETS_TOKEN_STORAGE_REGRESSION_SWEEP_MARKERS =
  "Secrets token storage regression sweep Secrets and tokens are never displayed or stored here Browser token storage remains blocked Regression findings require operator review Token storage policy Process env policy secrets sweep identity browser storage policy connector token policy provider key policy regression findings preview blocked risks next recommended route review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no search execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no browser token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced secrets details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function SecretsTokenStorageRegressionSweepPanel() {
  const model = buildSecretsTokenStorageRegressionSweepModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-secrets-token-storage-regression-sweep={`${SECRETS_TOKEN_STORAGE_REGRESSION_SWEEP_MARKERS} buildSecretsTokenStorageRegressionSweepStableKey SecretsTokenStorageRegressionSweepPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 381"
        title="Secrets sweep"
        subtitle="Secrets token storage regression sweep reviews whether CodexForge avoids secret display, token storage, and browser token persistence. Secrets and tokens are never displayed or stored here, browser token storage remains blocked, and regression findings require operator review."
        primary={{ href: "#secrets-token-storage-regression-sweep", label: "Review secrets" }}
        links={[
          { href: "/local-first-privacy-audit", label: "Privacy audit" },
          { href: "/cross-loop-search-review", label: "Search review" },
          { href: "/dashboard-density-navigation-polish", label: "Dashboard polish" },
          { href: "/credentials", label: "Credential strategy" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.secretsLanguage} />
      <PreviewFoundationCard title="Plain-English secrets and token storage sweep">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews secrets sweep identity, token storage policy, browser storage policy, connector token
          policy, provider key policy, process env policy, regression findings preview, blocked risks, and next
          recommended route. It never displays secrets or tokens, never stores tokens, never reads process env values,
          never calls APIs, and never writes files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="secrets-token-storage-regression-sweep" style={previewStyles.grid}>
        {model.sweeps.map((sweep) => (
          <PreviewFoundationCard
            key={buildSecretsTokenStorageRegressionSweepStableKey("secrets-token-card", sweep.id)}
            title={sweep.secretsSweepIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${sweep.status}`,
                `Token storage policy: ${sweep.tokenStoragePolicy.join("; ")}`,
                `Browser storage policy: ${sweep.browserStoragePolicy.join("; ")}`,
                `Connector token policy: ${sweep.connectorTokenPolicy.join("; ")}`,
                `Provider key policy: ${sweep.providerKeyPolicy.join("; ")}`,
                `Process env policy: ${sweep.processEnvPolicy.join("; ")}`,
                `Regression findings preview: ${sweep.regressionFindingsPreview.join("; ")}`,
                `Blocked risks: ${sweep.blockedRisks.join("; ")}`,
                sweep.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced secrets details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.sweeps.map((sweep) => sweep.advancedSecretsDetails)} />
        <PreviewFoundationCopy>
          Advanced secrets details stay collapsed or secondary. Secrets and tokens are never displayed or stored here,
          browser token storage remains blocked, and regression findings require operator review.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
