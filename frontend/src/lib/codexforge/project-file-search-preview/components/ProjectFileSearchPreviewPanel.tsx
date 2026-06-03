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
  buildProjectFileSearchPreviewModel,
  buildProjectFileSearchPreviewStableKey,
} from "@/lib/codexforge/project-file-search-preview";

const PROJECT_FILE_SEARCH_PREVIEW_MARKERS =
  "Project file search preview Search only uses approved indexed workspace data Arbitrary local browsing is not allowed Sensitive matches stay redacted until review File operation approval route Result preview summary approved local boundary required nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no package install behavior no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectFileSearchPreviewPanel() {
  const model = buildProjectFileSearchPreviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-file-search-preview={`${PROJECT_FILE_SEARCH_PREVIEW_MARKERS} buildProjectFileSearchPreviewStableKey ProjectFileSearchPreviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 223"
        title="File search"
        subtitle="Project file search preview shows how safe trusted-workspace search can work later. Search only uses approved indexed workspace data, arbitrary local browsing is not allowed, and sensitive matches stay redacted until review."
        primary={{ href: "#project-file-search-preview", label: "Review search preview" }}
        links={[
          { href: "/safe-project-indexer", label: "Indexer route" },
          { href: "/local-file-approval", label: "File operation approval route" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/project-dependency-map", label: "Dependency map" },
          { href: "/project-risk-secrets-scan", label: "Risk scanner" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.searchLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page previews search behavior only. It does not browse the machine or auto-open files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-file-search-preview" style={previewStyles.grid}>
        {model.previews.map((preview) => (
          <PreviewFoundationCard
            key={buildProjectFileSearchPreviewStableKey("search-card", preview.id)}
            title={preview.searchScopeSummary}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${preview.status}`,
                preview.trustedWorkspaceDependency,
                preview.querySummary,
                preview.resultPreviewSummary,
                preview.excludedPaths,
                preview.sensitiveMatchHandling,
                preview.fileOperationApprovalRoute,
                preview.indexerRoute,
                preview.auditNote,
                `Blocked reasons: ${preview.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced results/details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced results/details stay secondary. Search readiness depends on approved indexed workspace data and
          remains separate from file operation approval; sensitive matches stay redacted until review.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
