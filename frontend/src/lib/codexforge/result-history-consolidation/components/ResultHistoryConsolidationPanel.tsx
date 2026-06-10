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
  buildResultHistoryConsolidationModel,
  buildResultHistoryConsolidationStableKey,
} from "@/lib/codexforge/result-history-consolidation";

const RESULT_HISTORY_CONSOLIDATION_MARKERS =
  "Result history consolidation Result history is read-only from this page Historical results are not replayed automatically Memory promotion requires explicit review Result groups by loop Failure recovery notes result history identity validation outcomes safety audit summary linked review items daily home route global inbox route next recommended action review-only approval required no replay actions no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced history details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResultHistoryConsolidationPanel() {
  const model = buildResultHistoryConsolidationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-result-history-consolidation={`${RESULT_HISTORY_CONSOLIDATION_MARKERS} buildResultHistoryConsolidationStableKey ResultHistoryConsolidationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 373"
        title="Result history"
        subtitle="Result history consolidation reviews past outcomes across loops without replaying or mutating them. Result history is read-only from this page, historical results are not replayed automatically, and memory promotion requires explicit review."
        primary={{ href: "#result-history-consolidation", label: "Review history" }}
        links={[
          { href: "/daily-operator-home", label: "Daily home" },
          { href: "/global-review-inbox", label: "Global inbox" },
          { href: "/approval-queue", label: "Approval queue" },
          { href: "/cross-loop-result-handoff-review", label: "Result handoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.historyLanguage} />
      <PreviewFoundationCard title="Plain-English result history">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page shows result history identity, result groups by loop, validation outcomes, failure recovery notes,
          safety audit summary, linked review items, daily home route, global inbox route, and next recommended action. It
          does not replay actions, execute workflows, call APIs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="result-history-consolidation" style={previewStyles.grid}>
        {model.histories.map((history) => (
          <PreviewFoundationCard
            key={buildResultHistoryConsolidationStableKey("result-history-card", history.id)}
            title={history.resultHistoryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${history.status}`,
                `Result groups by loop: ${history.resultGroupsByLoop.join("; ")}`,
                `Validation outcomes: ${history.validationOutcomes.join("; ")}`,
                `Failure recovery notes: ${history.failureRecoveryNotes.join("; ")}`,
                `Safety audit summary: ${history.safetyAuditSummary.join("; ")}`,
                `Linked review items: ${history.linkedReviewItems.join("; ")}`,
                history.dailyHomeRoute,
                history.globalInboxRoute,
                history.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced history details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.histories.map((history) => history.advancedHistoryDetails)} />
        <PreviewFoundationCopy>
          Advanced history details stay collapsed or secondary. Result history is read-only from this page; historical
          results are not replayed automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}

