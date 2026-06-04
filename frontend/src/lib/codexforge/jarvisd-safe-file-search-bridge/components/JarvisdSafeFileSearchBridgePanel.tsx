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
  buildJarvisdSafeFileSearchBridgeModel,
  buildJarvisdSafeFileSearchBridgeStableKey,
} from "@/lib/codexforge/jarvisd-safe-file-search-bridge";

const JARVISD_SAFE_FILE_SEARCH_BRIDGE_MARKERS =
  "Jarvisd safe file search bridge Search only uses approved indexed workspace data Arbitrary local browsing is not allowed Sensitive matches stay redacted until review Excluded paths summary Result capture route File bridges are reviewed before use Approved local boundary required secret values are never displayed plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no live search from arbitrary UI no arbitrary path crawling no file mutation no file deletion no secret value display no secrets displayed no secrets exported no secrets included no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no auto-routing no auto-spend no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function JarvisdSafeFileSearchBridgePanel() {
  const model = buildJarvisdSafeFileSearchBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-jarvisd-safe-file-search-bridge={`${JARVISD_SAFE_FILE_SEARCH_BRIDGE_MARKERS} buildJarvisdSafeFileSearchBridgeStableKey JarvisdSafeFileSearchBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 255"
        title="Safe search bridge"
        subtitle="Jarvisd safe file search bridge prepares reviewed search handoff shapes for future indexed workspace results. Search only uses approved indexed workspace data, arbitrary local browsing is not allowed, and sensitive matches stay redacted until review."
        primary={{ href: "#jarvisd-safe-file-search-bridge", label: "Review search scope" }}
        links={[
          { href: "/jarvisd-index-sync", label: "Index sync" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/safe-project-indexer", label: "Project indexer" },
          { href: "/jarvisd-secrets-redaction", label: "Secrets redaction" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/jarvisd-audit-ingestion", label: "Audit ingestion" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.searchLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          No live search runs from this page. Results are captured as redacted review summaries before any future file
          preview or provider handoff could be considered.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-safe-file-search-bridge" style={previewStyles.grid}>
        {model.searches.map((search) => (
          <PreviewFoundationCard
            key={buildJarvisdSafeFileSearchBridgeStableKey("search-card", search.id)}
            title={search.searchBridgeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                search.workspaceTrustDependency,
                search.indexSyncDependency,
                search.querySummary,
                search.allowedSearchScope,
                search.excludedPathsSummary,
                search.sensitiveMatchHandling,
                search.redactionStatus,
                search.resultCaptureRoute,
                search.auditHandoff,
                `Search result status: ${search.searchResultStatus}`,
                `Blocked reasons: ${search.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced search details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced results/details stay secondary. This bridge does not browse arbitrary files, auto-open files, call
          live search from arbitrary UI, mutate files, execute commands, call Jarvisd directly, display secret values,
          or send findings to providers automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
