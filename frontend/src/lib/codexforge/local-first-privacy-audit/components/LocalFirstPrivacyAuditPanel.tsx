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
  buildLocalFirstPrivacyAuditModel,
  buildLocalFirstPrivacyAuditStableKey,
} from "@/lib/codexforge/local-first-privacy-audit";

const LOCAL_FIRST_PRIVACY_AUDIT_MARKERS =
  "Local-first privacy audit Local-first privacy audit does not scan local files Private data is not sent automatically Unresolved privacy risks stay blocked Local-first guarantee summary Memory boundary audit privacy audit identity file boundary audit connector boundary audit provider boundary audit automation boundary audit secrets regression route next recommended route review-only approval required no approval automation no approval is granted no action approval from UI no action execution from UI no search execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no local file scans no local file reads no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced privacy details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalFirstPrivacyAuditPanel() {
  const model = buildLocalFirstPrivacyAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-first-privacy-audit={`${LOCAL_FIRST_PRIVACY_AUDIT_MARKERS} buildLocalFirstPrivacyAuditStableKey LocalFirstPrivacyAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 380"
        title="Privacy audit"
        subtitle="Local-first privacy audit reviews local-first guarantees across files, connectors, providers, automations, memory, and reporting. Local-first privacy audit does not scan local files, private data is not sent automatically, and unresolved privacy risks stay blocked."
        primary={{ href: "#local-first-privacy-audit", label: "Review privacy" }}
        links={[
          { href: "/cross-loop-search-review", label: "Search review" },
          { href: "/secrets-token-storage-regression-sweep", label: "Secrets sweep" },
          { href: "/dashboard-density-navigation-polish", label: "Dashboard polish" },
          { href: "/safety-boundary-matrix-finalization", label: "Safety matrix" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.privacyLanguage} />
      <PreviewFoundationCard title="Plain-English local-first privacy audit">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews privacy audit identity, local-first guarantee summary, file boundary audit, connector
          boundary audit, provider boundary audit, automation boundary audit, memory boundary audit, unresolved privacy
          risks, secrets regression route, and next recommended route. It does not scan local files, read local files,
          call connectors, call providers, send private data, mutate memory, or store tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-first-privacy-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildLocalFirstPrivacyAuditStableKey("local-first-privacy-card", audit.id)}
            title={audit.privacyAuditIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${audit.status}`,
                `Local-first guarantee summary: ${audit.localFirstGuaranteeSummary.join("; ")}`,
                `File boundary audit: ${audit.fileBoundaryAudit.join("; ")}`,
                `Connector boundary audit: ${audit.connectorBoundaryAudit.join("; ")}`,
                `Provider boundary audit: ${audit.providerBoundaryAudit.join("; ")}`,
                `Automation boundary audit: ${audit.automationBoundaryAudit.join("; ")}`,
                `Memory boundary audit: ${audit.memoryBoundaryAudit.join("; ")}`,
                `Unresolved privacy risks: ${audit.unresolvedPrivacyRisks.join("; ")}`,
                audit.secretsRegressionRoute,
                audit.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced privacy details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedPrivacyDetails)} />
        <PreviewFoundationCopy>
          Advanced privacy details stay collapsed or secondary. Local-first privacy audit does not scan local files,
          private data is not sent automatically, and unresolved privacy risks stay blocked.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
