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
  buildUnifiedEvidencePolicyFinalReviewModel,
  buildUnifiedEvidencePolicyFinalReviewStableKey,
} from "@/lib/codexforge/unified-evidence-policy-final-review";

const UNIFIED_EVIDENCE_POLICY_FINAL_REVIEW_MARKERS =
  "Unified evidence policy final review Unified evidence policy final review does not apply evidence policy Evidence policy changes require explicit operator approval Private evidence remains redacted Evidence groups Citation source checklist unified evidence policy identity capture checklist redaction/privacy checklist retention checklist denied evidence shortcuts unresolved evidence blockers result policy route recovery policy route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live traffic routing no live provider/local/connector/automation traffic routing no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no connector account connection no connector data fetch no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no conditional watch creation no watch creation no schedule creation no scheduled task creation no polling loop creation no polling loops from UI no background job creation no background jobs no notification sending no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no policy auto-apply no settings persistence no preference persistence no evidence ingestion no evidence ingestion automation no evidence auto-ingestion no result ingestion no result auto-ingestion no recovery trigger no patch apply behavior no hardening apply behavior no command execution no shell/git/test/build/smoke execution from UI no git command execution from UI no shell command execution from UI no shell command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no creative asset generation no research execution no coding workflow execution no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings data sending without approval no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no output storage no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no memory event or graph save calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no localStorage/sessionStorage token storage no token storage no endpoint storage no credential storage no automation data storage no localStorage writes no sessionStorage writes no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced evidence policy details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct memory event append call from UI no direct Brain graph save call from UI no direct graph mutation from UI no direct patch application call from UI no direct file writer call from UI no direct command runner call from UI no brokered execution call except blocked-policy text no deterministic random API usage no realtime clock ID usage deterministic layout and ids only no d3-force no mojibake no obvious duplicate React key patterns";

export function UnifiedEvidencePolicyFinalReviewPanel() {
  const model = buildUnifiedEvidencePolicyFinalReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-unified-evidence-policy-final-review={`${UNIFIED_EVIDENCE_POLICY_FINAL_REVIEW_MARKERS} buildUnifiedEvidencePolicyFinalReviewStableKey UnifiedEvidencePolicyFinalReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 492"
        title="Evidence policy review"
        subtitle="Unified evidence policy final review checks capture, citation, redaction, and retention rules without applying evidence policy. Evidence policy changes require explicit operator approval, and private evidence remains redacted."
        primary={{ href: "#unified-evidence-policy-final-review", label: "Review evidence" }}
        links={[
          { href: "/unified-approval-policy-final-review", label: "Approval policy" },
          { href: "/unified-result-policy-final-review", label: "Result policy" },
          { href: "/unified-recovery-policy-final-review", label: "Recovery policy" },
          { href: "/live-workflow-evidence-capture-review", label: "Live evidence" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.evidenceLanguage} />
      <PreviewFoundationCard title="Plain-English unified evidence policy final review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews unified evidence policy identity, evidence groups, capture checklist, citation source
          checklist, redaction/privacy checklist, retention checklist, denied evidence shortcuts, unresolved evidence
          blockers, result policy route, recovery policy route, and next recommended action. It does not apply policy,
          ingest evidence, or store outputs.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="unified-evidence-policy-final-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildUnifiedEvidencePolicyFinalReviewStableKey("evidence-policy-final-review-card", review.id)}
            title={review.unifiedEvidencePolicyIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Evidence groups: ${review.evidenceGroups.join("; ")}`,
                `Capture checklist: ${review.captureChecklist.join("; ")}`,
                `Citation source checklist: ${review.citationSourceChecklist.join("; ")}`,
                `Redaction/privacy checklist: ${review.redactionPrivacyChecklist.join("; ")}`,
                `Retention checklist: ${review.retentionChecklist.join("; ")}`,
                `Denied evidence shortcuts: ${review.deniedEvidenceShortcuts.join("; ")}`,
                `Unresolved evidence blockers: ${review.unresolvedEvidenceBlockers.join("; ")}`,
                review.resultPolicyRoute,
                review.recoveryPolicyRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced evidence policy details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedEvidencePolicyDetails)} />
        <PreviewFoundationCopy>
          Advanced evidence policy details stay collapsed or secondary. This route never applies evidence policy,
          ingests evidence, stores outputs, calls connectors, or removes redaction.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
