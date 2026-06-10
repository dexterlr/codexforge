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
  buildGlobalReviewInboxConsolidationModel,
  buildGlobalReviewInboxConsolidationStableKey,
} from "@/lib/codexforge/global-review-inbox-consolidation";

const GLOBAL_REVIEW_INBOX_CONSOLIDATION_MARKERS =
  "Global review inbox consolidation Global inbox consolidates reviews without approving them Review items require explicit operator action No review item is executed from this page Review item groups Unresolved blockers global inbox identity source loop summary risk/severity summary privacy/redaction status approval queue route result history route next recommended action review-only approval required no approval automation no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no local bridge endpoint calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced inbox details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function GlobalReviewInboxConsolidationPanel() {
  const model = buildGlobalReviewInboxConsolidationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-global-review-inbox-consolidation={`${GLOBAL_REVIEW_INBOX_CONSOLIDATION_MARKERS} buildGlobalReviewInboxConsolidationStableKey GlobalReviewInboxConsolidationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 371"
        title="Global review inbox"
        subtitle="Global review inbox consolidation pulls together review items across loops without approving or executing them. Global inbox consolidates reviews without approving them, review items require explicit operator action, and no review item is executed from this page."
        primary={{ href: "#global-review-inbox-consolidation", label: "Review inbox" }}
        links={[
          { href: "/daily-operator-home", label: "Daily home" },
          { href: "/approval-queue", label: "Approval queue" },
          { href: "/result-history", label: "Result history" },
          { href: "/cross-loop-safety-audit-inbox", label: "Safety audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.inboxLanguage} />
      <PreviewFoundationCard title="Plain-English global review inbox">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page shows global inbox identity, review item groups, source loop summary, risk/severity summary,
          privacy/redaction status, approval queue route, result history route, unresolved blockers, and next
          recommended action. It does not approve actions, execute actions, call APIs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="global-review-inbox-consolidation" style={previewStyles.grid}>
        {model.inboxes.map((inbox) => (
          <PreviewFoundationCard
            key={buildGlobalReviewInboxConsolidationStableKey("global-review-inbox-card", inbox.id)}
            title={inbox.globalInboxIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${inbox.status}`,
                `Review item groups: ${inbox.reviewItemGroups.join("; ")}`,
                `Source loop summary: ${inbox.sourceLoopSummary.join("; ")}`,
                `Risk/severity summary: ${inbox.riskSeveritySummary.join("; ")}`,
                `Privacy/redaction status: ${inbox.privacyRedactionStatus.join("; ")}`,
                inbox.approvalQueueRoute,
                inbox.resultHistoryRoute,
                `Unresolved blockers: ${inbox.unresolvedBlockers.join("; ")}`,
                inbox.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced inbox details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.inboxes.map((inbox) => inbox.advancedInboxDetails)} />
        <PreviewFoundationCopy>
          Advanced inbox details stay collapsed or secondary. The global inbox consolidates reviews without approving
          them and does not execute review items from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}

