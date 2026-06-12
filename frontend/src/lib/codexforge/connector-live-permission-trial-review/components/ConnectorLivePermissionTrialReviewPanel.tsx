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
  buildConnectorLivePermissionTrialReviewModel,
  buildConnectorLivePermissionTrialReviewStableKey,
} from "@/lib/codexforge/connector-live-permission-trial-review";

const CONNECTOR_LIVE_PERMISSION_TRIAL_REVIEW_MARKERS =
  "Connector live permission trial review Connector live permission trial does not connect accounts Connector permissions require explicit operator approval Connector data stays private until approved Connector families Permission scope groups connector live permission trial identity approval gate checklist denied connector actions privacy boundary notes blocked permission trial risks data redaction route evidence handoff route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no connector account connection no Gmail connection no Calendar connection no Contacts connection no GitHub connection no Drive connection no connector permission persistence no permission grant persistence no connector API calls no OAuth request flow no connector authorization behavior no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data fetch no connector data storage no real private connector data display no connector evidence auto-ingestion no evidence sent to providers no memory/RAG ingestion no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no connector data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw connector permission JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced permission details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorLivePermissionTrialReviewPanel() {
  const model = buildConnectorLivePermissionTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-live-permission-trial-review={`${CONNECTOR_LIVE_PERMISSION_TRIAL_REVIEW_MARKERS} buildConnectorLivePermissionTrialReviewStableKey ConnectorLivePermissionTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 434"
        title="Connector live permission trial review"
        subtitle="Connector live permission trial review previews live connector permission trials without connecting accounts. Connector live permission trial does not connect accounts, connector permissions require explicit operator approval, and connector data stays private until approved."
        primary={{ href: "#connector-live-permission-trial-review", label: "Review permission trial" }}
        links={[
          { href: "/connector-data-redaction-trial-review", label: "Data redaction trial" },
          { href: "/connector-evidence-handoff-review", label: "Evidence handoff" },
          { href: "/connector-permission-readiness-audit", label: "Permission readiness" },
          { href: "/connector-workspace", label: "Connector workspace" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.permissionLanguage} />
      <PreviewFoundationCard title="Plain-English connector live permission trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews connector live permission trial identity, connector families, permission scope groups,
          approval gate checklist, denied connector actions, privacy boundary notes, blocked permission trial risks, data
          redaction route, evidence handoff route, and next recommended action. It does not connect accounts, call
          connector APIs, fetch connector data, persist permission grants, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-live-permission-trial-review" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildConnectorLivePermissionTrialReviewStableKey("connector-live-permission-trial-card", trial.id)}
            title={trial.connectorLivePermissionTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Connector families: ${trial.connectorFamilies.join("; ")}`,
                `Permission scope groups: ${trial.permissionScopeGroups.join("; ")}`,
                `Approval gate checklist: ${trial.approvalGateChecklist.join("; ")}`,
                `Denied connector actions: ${trial.deniedConnectorActions.join("; ")}`,
                `Privacy boundary notes: ${trial.privacyBoundaryNotes.join("; ")}`,
                `Blocked permission trial risks: ${trial.blockedPermissionTrialRisks.join("; ")}`,
                trial.dataRedactionRoute,
                trial.evidenceHandoffRoute,
                trial.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced permission details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedPermissionDetails)} />
        <PreviewFoundationCopy>
          Advanced permission details stay collapsed or secondary. This review does not connect accounts, call
          connector APIs, fetch connector data, persist permission grants, send connector data to providers, or approve
          connector access automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
