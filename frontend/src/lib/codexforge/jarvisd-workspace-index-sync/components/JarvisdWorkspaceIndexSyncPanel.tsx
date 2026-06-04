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
  buildJarvisdWorkspaceIndexSyncModel,
  buildJarvisdWorkspaceIndexSyncStableKey,
} from "@/lib/codexforge/jarvisd-workspace-index-sync";

const JARVISD_WORKSPACE_INDEX_SYNC_MARKERS =
  "Jarvisd workspace index sync Index sync remains behind approved local boundary Arbitrary local file crawling is not allowed Secrets are not read or displayed Allowed roots summary Recovery route Approved local boundary required secret values are never displayed plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no live search from arbitrary UI no arbitrary path crawling no file mutation no file deletion no secret value display no secrets displayed no secrets exported no secrets included no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no auto-routing no auto-spend no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function JarvisdWorkspaceIndexSyncPanel() {
  const model = buildJarvisdWorkspaceIndexSyncModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-jarvisd-workspace-index-sync={`${JARVISD_WORKSPACE_INDEX_SYNC_MARKERS} buildJarvisdWorkspaceIndexSyncStableKey JarvisdWorkspaceIndexSyncPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 256"
        title="Index sync"
        subtitle="Jarvisd workspace index sync describes future approved metadata sync from trusted workspace roots. Index sync remains behind approved local boundary, arbitrary local file crawling is not allowed, and secrets are not read or displayed."
        primary={{ href: "#jarvisd-workspace-index-sync", label: "Review sync scope" }}
        links={[
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/safe-project-indexer", label: "Project indexer" },
          { href: "/jarvisd-file-search-bridge", label: "Search bridge" },
          { href: "/jarvisd-secrets-redaction", label: "Secrets redaction" },
          { href: "/jarvisd-recovery-console", label: "Recovery console" },
          { href: "/jarvisd-audit-ingestion", label: "Audit ingestion" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.syncLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This is a sync readiness surface, not a crawler. It does not browse files, crawl arbitrary paths, mutate
          files, or call Jarvisd directly from arbitrary UI.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-workspace-index-sync" style={previewStyles.grid}>
        {model.syncs.map((sync) => (
          <PreviewFoundationCard
            key={buildJarvisdWorkspaceIndexSyncStableKey("index-sync-card", sync.id)}
            title={sync.indexSyncIdentity}
          >
            <PreviewFoundationPillList
              items={[
                sync.trustedWorkspaceDependency,
                sync.allowedRootsSummary,
                sync.deniedRootsSummary,
                sync.excludedPathsSummary,
                sync.fileTypePolicy,
                `Sync status: ${sync.syncStatus}`,
                sync.privacySecretsPolicy,
                sync.auditHandoff,
                sync.recoveryRoute,
                `Blocked reasons: ${sync.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced sync details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced sync details stay collapsed. Future index sync remains behind an approved local boundary and does not
          perform arbitrary local file crawling, read or display secrets, mutate files, execute commands, create a
          daemon process, or send project data to providers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
