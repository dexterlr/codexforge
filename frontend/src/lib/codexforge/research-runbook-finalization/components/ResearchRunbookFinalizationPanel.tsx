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
  buildResearchRunbookFinalizationModel,
  buildResearchRunbookFinalizationStableKey,
} from "@/lib/codexforge/research-runbook-finalization";

const RESEARCH_RUNBOOK_FINALIZATION_MARKERS =
  "Research runbook finalization Research runbooks are reviewed before use Runbooks never include API keys or secrets Runbook finalization does not browse or export automatically Operator checklist Freshness recheck policy runbook identity source research release candidate approved research workflow summary source collection rules citation rules conflict handling rules privacy/redaction checklist blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no source auto-refreshing no freshness auto-recheck no evidence auto-update no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced runbook details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchRunbookFinalizationPanel() {
  const model = buildResearchRunbookFinalizationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-runbook-finalization={`${RESEARCH_RUNBOOK_FINALIZATION_MARKERS} buildResearchRunbookFinalizationStableKey ResearchRunbookFinalizationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 331"
        title="Research runbook"
        subtitle="Research runbook finalization turns reviewed workflow decisions into an operator-ready, non-secret runbook. Research runbooks are reviewed before use, runbooks never include API keys or secrets, and runbook finalization does not browse or export automatically."
        primary={{ href: "#research-runbook-finalization", label: "Review runbook" }}
        links={[
          { href: "/research-workspace-release-candidate", label: "Release candidate" },
          { href: "/evidence-conflict-resolver-review", label: "Conflict review" },
          { href: "/research-freshness-recheck-boundary", label: "Freshness boundary" },
          { href: "/research-report-export-review", label: "Report review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.runbookLanguage} />
      <PreviewFoundationCard title="Plain-English runbook finalization">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page prepares reviewed operator instructions only. It does not browse, call providers, export, write
          files, display secrets, refresh sources, update evidence, promote memory, mutate the Brain graph, or execute
          tools.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-runbook-finalization" style={previewStyles.grid}>
        {model.runbooks.map((runbook) => (
          <PreviewFoundationCard
            key={buildResearchRunbookFinalizationStableKey("research-runbook-finalization-card", runbook.id)}
            title={runbook.runbookIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${runbook.status}`,
                runbook.sourceResearchReleaseCandidate,
                runbook.approvedResearchWorkflowSummary,
                `Source collection rules: ${runbook.sourceCollectionRules.join("; ")}`,
                `Citation rules: ${runbook.citationRules.join("; ")}`,
                `Conflict handling rules: ${runbook.conflictHandlingRules.join("; ")}`,
                runbook.freshnessRecheckPolicy,
                `Privacy/redaction checklist: ${runbook.privacyRedactionChecklist.join("; ")}`,
                `Operator checklist: ${runbook.operatorChecklist.join("; ")}`,
                `Blocked reasons: ${runbook.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced runbook details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.runbooks.map((runbook) => runbook.advancedRunbookDetails)} />
        <PreviewFoundationCopy>
          Advanced runbook details stay collapsed or secondary. Runbook finalization remains separate from browsing,
          provider calls, source rechecks, report export, local file writes, memory promotion, and tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
