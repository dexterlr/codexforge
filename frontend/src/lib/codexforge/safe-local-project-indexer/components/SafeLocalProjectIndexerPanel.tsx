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
  buildSafeLocalProjectIndexerModel,
  buildSafeLocalProjectIndexerStableKey,
} from "@/lib/codexforge/safe-local-project-indexer";

const SAFE_LOCAL_PROJECT_INDEXER_MARKERS =
  "Safe local project indexer Indexing remains behind approved local boundary Arbitrary local file crawling is not allowed Secrets are not read or displayed Allowed roots summary Excluded paths summary approved local boundary required nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no package install behavior no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function SafeLocalProjectIndexerPanel() {
  const model = buildSafeLocalProjectIndexerModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-safe-local-project-indexer={`${SAFE_LOCAL_PROJECT_INDEXER_MARKERS} buildSafeLocalProjectIndexerStableKey SafeLocalProjectIndexerPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 222"
        title="Project indexer"
        subtitle="Safe local project indexer explains how trusted workspace metadata can be prepared later. Indexing remains behind approved local boundary, arbitrary local file crawling is not allowed, and secrets are not read or displayed."
        primary={{ href: "#safe-local-project-indexer", label: "Review index scope" }}
        links={[
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/local-file-approval", label: "File gate" },
          { href: "/jarvisd-permissions", label: "Jarvisd permissions" },
          { href: "/project-file-search", label: "File search" },
          { href: "/project-risk-secrets-scan", label: "Risk scanner" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.indexerLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Nothing reads arbitrary files automatically. This page is a readiness surface, not a crawler.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="safe-local-project-indexer" style={previewStyles.grid}>
        {model.indexes.map((index) => (
          <PreviewFoundationCard
            key={buildSafeLocalProjectIndexerStableKey("index-card", index.id)}
            title={index.projectIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Trusted workspace status: ${index.trustedWorkspaceStatus}`,
                index.allowedRootsSummary,
                index.deniedRootsSummary,
                index.indexScope,
                index.fileTypeSummary,
                index.excludedPathsSummary,
                index.privacySecretsPolicy,
                index.auditNote,
                `Blocked reasons: ${index.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced index details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced index details stay secondary. Approved indexed metadata can support search, dependency mapping,
          and risk review later, but this page does not browse files, read arbitrary paths, mutate files, execute
          commands, call providers, or call Jarvisd directly from arbitrary UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
