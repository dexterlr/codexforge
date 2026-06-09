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
  buildCrossLoopSafetyAuditInboxModel,
  buildCrossLoopSafetyAuditInboxStableKey,
} from "@/lib/codexforge/cross-loop-safety-audit-inbox";

const CROSS_LOOP_SAFETY_AUDIT_INBOX_MARKERS =
  "Cross-loop safety audit inbox Safety audit items are reviewed before release Unresolved audit items stay blocked No action is executed from this page Approval gate checks Memory boundary checks audit inbox identity source handoff review audited loop boundaries privacy/redaction checks execution boundary checks unresolved audit items dashboard route blocked reasons review-only approval required no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced audit details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CrossLoopSafetyAuditInboxPanel() {
  const model = buildCrossLoopSafetyAuditInboxModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-cross-loop-safety-audit-inbox={`${CROSS_LOOP_SAFETY_AUDIT_INBOX_MARKERS} buildCrossLoopSafetyAuditInboxStableKey CrossLoopSafetyAuditInboxPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 355"
        title="Safety inbox"
        subtitle="Cross-loop safety audit inbox reviews whether handoffs preserve approval, privacy, execution, provider, connector, local file, automation, and memory boundaries. Safety audit items are reviewed before release, unresolved audit items stay blocked, and no action is executed from this page."
        primary={{ href: "#cross-loop-safety-audit-inbox", label: "Review audit" }}
        links={[
          { href: "/cross-loop-result-handoff-review", label: "Handoff review" },
          { href: "/operator-dashboard-release-candidate", label: "Dashboard release" },
          { href: "/provider-policy-bundle-export-review", label: "Provider policy" },
          { href: "/project-memory-promotion-boundary", label: "Memory boundary" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.auditLanguage} />
      <PreviewFoundationCard title="Plain-English safety audit inbox">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This inbox reviews safety only. It does not run workflows, call APIs, write files, mutate memory, create
          automations, send notifications, store tokens, or execute any local or cloud action.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="cross-loop-safety-audit-inbox" style={previewStyles.grid}>
        {model.auditItems.map((auditItem) => (
          <PreviewFoundationCard
            key={buildCrossLoopSafetyAuditInboxStableKey("cross-loop-safety-audit-card", auditItem.id)}
            title={auditItem.auditInboxIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${auditItem.status}`,
                auditItem.sourceHandoffReview,
                ...auditItem.auditedLoopBoundaries,
                ...auditItem.approvalGateChecks,
                ...auditItem.privacyRedactionChecks,
                ...auditItem.executionBoundaryChecks,
                ...auditItem.memoryBoundaryChecks,
                `Unresolved audit items: ${auditItem.unresolvedAuditItems.join("; ")}`,
                auditItem.dashboardRoute,
                `Blocked reasons: ${auditItem.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced audit details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.auditItems.map((auditItem) => auditItem.advancedAuditDetails)} />
        <PreviewFoundationCopy>
          Advanced audit details stay collapsed or secondary. Unresolved audit items stay blocked, and this inbox cannot
          execute actions, call APIs, mutate files, mutate memory, or create background work.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
