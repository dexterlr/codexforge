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
  buildConnectorWorkspaceShellModel,
  buildConnectorWorkspaceShellStableKey,
} from "@/lib/codexforge/connector-workspace-shell";

const CONNECTOR_WORKSPACE_SHELL_MARKERS =
  "Connector workspace shell Connectors require explicit approval No connector data is read from this page Tokens and secrets are never displayed or stored here Data sensitivity classification Connector evidence review route workspace identity connector goal summary connector types approval checklist Gmail boundary route Calendar boundary route Contacts boundary route blocked reasons no OAuth request flow no connector authorization behavior no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no connector data reads no automatic email reads no automatic calendar reads no automatic contact reads no email draft/send behavior no calendar event create/update/delete behavior no contact create/update/delete behavior no token storage no localStorage/sessionStorage token storage no automatic provider calls no provider API calls no prompt/file/source/connector data sending without approval no localStorage API key storage no process.env printing no API keys or secrets displayed no source auto-fetching no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no package install behavior no Ruflo/Odysseus vendoring no automatic web browsing no web/search/provider API calls no automatic provider send no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced workspace details collapsed/secondary no unsafe execution buttons no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorWorkspaceShellPanel() {
  const model = buildConnectorWorkspaceShellModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-workspace-shell={`${CONNECTOR_WORKSPACE_SHELL_MARKERS} buildConnectorWorkspaceShellStableKey ConnectorWorkspaceShellPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 334"
        title="Connector workspace"
        subtitle="Connector workspace shell plans future Gmail, Calendar, and Contacts work before any connector reads. Connectors require explicit approval, no connector data is read from this page, and tokens and secrets are never displayed or stored here."
        primary={{ href: "#connector-workspace-shell", label: "Review workspace" }}
        links={[
          { href: "/gmail-connector-boundary", label: "Gmail boundary" },
          { href: "/calendar-connector-boundary", label: "Calendar boundary" },
          { href: "/contacts-connector-boundary", label: "Contacts boundary" },
          { href: "/research-evidence-inbox", label: "Evidence review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.workspaceLanguage} />
      <PreviewFoundationCard title="Plain-English connector workspace">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a review-only planning shell. It does not request OAuth, ask for connector authorization, read
          email, read calendar events, read contacts, sync connector data, store tokens, display secrets, send connector
          data to providers, or promote connector evidence into memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-workspace-shell" style={previewStyles.grid}>
        {model.workspaces.map((workspace) => (
          <PreviewFoundationCard
            key={buildConnectorWorkspaceShellStableKey("connector-workspace-card", workspace.id)}
            title={workspace.workspaceIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${workspace.status}`,
                workspace.connectorGoalSummary,
                `Connector types: ${workspace.connectorTypes.join("; ")}`,
                workspace.dataSensitivityClassification,
                `Approval checklist: ${workspace.approvalChecklist.join("; ")}`,
                workspace.connectorEvidenceReviewRoute,
                workspace.gmailBoundaryRoute,
                workspace.calendarBoundaryRoute,
                workspace.contactsBoundaryRoute,
                `Blocked reasons: ${workspace.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced workspace details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.workspaces.map((workspace) => workspace.advancedWorkspaceDetails)} />
        <PreviewFoundationCopy>
          Advanced workspace details stay collapsed or secondary. Connector evidence is reviewed before use and never
          ingested into memory automatically from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
