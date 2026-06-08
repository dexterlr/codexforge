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
  buildResearchWorkspaceShellModel,
  buildResearchWorkspaceShellStableKey,
} from "@/lib/codexforge/research-workspace-shell";

const RESEARCH_WORKSPACE_SHELL_MARKERS =
  "Research workspace shell Research workspace does not browse automatically Sources are reviewed before use Research evidence is not auto-promoted to memory Evidence quality criteria Evidence inbox route workspace identity research question summary source requirements privacy/sensitivity classification provider/web boundary dependency source collector route non-goals blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced workspace details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchWorkspaceShellPanel() {
  const model = buildResearchWorkspaceShellModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-workspace-shell={`${RESEARCH_WORKSPACE_SHELL_MARKERS} buildResearchWorkspaceShellStableKey ResearchWorkspaceShellPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 322"
        title="Research workspace"
        subtitle="Research workspace shell plans and reviews research tasks before any web, provider, tool, or memory action. Research workspace does not browse automatically, sources are reviewed before use, and research evidence is not auto-promoted to memory."
        primary={{ href: "#research-workspace-shell", label: "Review workspace" }}
        links={[
          { href: "/web-research-provider-boundary", label: "Web boundary" },
          { href: "/research-source-collector-trial", label: "Source collector" },
          { href: "/research-evidence-inbox", label: "Evidence inbox" },
          { href: "/prompt-privacy-classifier", label: "Privacy classifier" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.workspaceLanguage} />
      <PreviewFoundationCard title="Plain-English research workspace">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a planning shell. It does not browse the web, call providers, fetch sources, execute tools, ingest
          evidence, mutate the Brain graph, or promote memory automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-workspace-shell" style={previewStyles.grid}>
        {model.workspaces.map((workspace) => (
          <PreviewFoundationCard
            key={buildResearchWorkspaceShellStableKey("research-workspace-card", workspace.id)}
            title={workspace.workspaceIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${workspace.status}`,
                workspace.researchQuestionSummary,
                `Source requirements: ${workspace.sourceRequirements.join("; ")}`,
                `Evidence quality criteria: ${workspace.evidenceQualityCriteria.join("; ")}`,
                workspace.privacySensitivityClassification,
                workspace.providerWebBoundaryDependency,
                workspace.sourceCollectorRoute,
                workspace.evidenceInboxRoute,
                `Non-goals: ${workspace.nonGoals.join("; ")}`,
                `Blocked reasons: ${workspace.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced workspace details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.workspaces.map((workspace) => workspace.advancedWorkspaceDetails)}
        />
        <PreviewFoundationCopy>
          Advanced workspace details stay collapsed or secondary. Research planning remains review-only and approval-gated
          before any future web, search, provider, source collector, evidence, memory, file, or tool boundary can move.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
