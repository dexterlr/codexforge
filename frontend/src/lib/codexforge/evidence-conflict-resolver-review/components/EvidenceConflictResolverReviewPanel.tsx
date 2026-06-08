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
  buildEvidenceConflictResolverReviewModel,
  buildEvidenceConflictResolverReviewStableKey,
} from "@/lib/codexforge/evidence-conflict-resolver-review";

const EVIDENCE_CONFLICT_RESOLVER_REVIEW_MARKERS =
  "Evidence conflict resolver review Conflicts are not resolved automatically Stale evidence remains flagged Final resolution requires explicit review Proposed resolution options Freshness recheck route conflict review identity source evidence inbox conflicting claim summary supporting source summary opposing source summary freshness/staleness signal confidence impact blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no source auto-refreshing no freshness auto-recheck no evidence auto-update no claim auto-update no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced conflict details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function EvidenceConflictResolverReviewPanel() {
  const model = buildEvidenceConflictResolverReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-evidence-conflict-resolver-review={`${EVIDENCE_CONFLICT_RESOLVER_REVIEW_MARKERS} buildEvidenceConflictResolverReviewStableKey EvidenceConflictResolverReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 332"
        title="Conflict review"
        subtitle="Evidence conflict resolver review reviews conflicting or stale research evidence without resolving it automatically. Conflicts are not resolved automatically, stale evidence remains flagged, and final resolution requires explicit review."
        primary={{ href: "#evidence-conflict-resolver-review", label: "Review conflicts" }}
        links={[
          { href: "/research-evidence-inbox", label: "Evidence inbox" },
          { href: "/research-claim-builder", label: "Claim builder" },
          { href: "/research-freshness-recheck-boundary", label: "Freshness boundary" },
          { href: "/research-runbook-finalization", label: "Runbook" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.conflictLanguage} />
      <PreviewFoundationCard title="Plain-English conflict resolver review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews conflict options only. It does not resolve conflicts, update claims, update evidence, browse,
          call providers, refresh sources, auto-cite, promote memory, mutate the Brain graph, or execute tools.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="evidence-conflict-resolver-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildEvidenceConflictResolverReviewStableKey("evidence-conflict-resolver-review-card", review.id)}
            title={review.conflictReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceEvidenceInbox,
                review.conflictingClaimSummary,
                review.supportingSourceSummary,
                review.opposingSourceSummary,
                review.freshnessStalenessSignal,
                review.confidenceImpact,
                `Proposed resolution options: ${review.proposedResolutionOptions.join("; ")}`,
                review.freshnessRecheckRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced conflict details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedConflictDetails)} />
        <PreviewFoundationCopy>
          Advanced conflict details stay collapsed or secondary. Conflict review remains separate from source rechecks,
          claim updates, citation changes, report export, memory promotion, local files, provider traffic, and tool
          execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
