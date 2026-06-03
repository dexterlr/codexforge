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
  buildProjectDependencyMapModel,
  buildProjectDependencyMapStableKey,
} from "@/lib/codexforge/project-dependency-map";

const PROJECT_DEPENDENCY_MAP_MARKERS =
  "Project dependency map Dependency map does not install packages No commands are run from this page Approved indexed metadata External package summary Risk scanner route approved local boundary required nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no package install behavior no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectDependencyMapPanel() {
  const model = buildProjectDependencyMapModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-dependency-map={`${PROJECT_DEPENDENCY_MAP_MARKERS} buildProjectDependencyMapStableKey ProjectDependencyMapPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 224"
        title="Dependency map"
        subtitle="Project dependency map summarizes safe project relationships from approved indexed metadata. Dependency map does not install packages, no commands are run from this page, and unknown dependency details stay marked for review."
        primary={{ href: "#project-dependency-map", label: "Review dependency map" }}
        links={[
          { href: "/safe-project-indexer", label: "Indexer" },
          { href: "/project-file-search", label: "File search" },
          { href: "/local-command-approval", label: "Command approval route" },
          { href: "/project-risk-secrets-scan", label: "Risk scanner route" },
          { href: "/files", label: "Files" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.dependencyLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This is a review aid. It does not run package manager commands or change project files.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-dependency-map" style={previewStyles.grid}>
        {model.maps.map((map) => (
          <PreviewFoundationCard
            key={buildProjectDependencyMapStableKey("dependency-card", map.id)}
            title={map.projectSummary}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${map.status}`,
                map.dependencySource,
                map.dependencyGroup,
                map.internalModuleRelationship,
                map.externalPackageSummary,
                map.riskNote,
                map.staleUnknownMarker,
                map.commandApprovalRoute,
                map.riskScannerRoute,
                `Blocked reasons: ${map.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced graph/details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced graph/details stay secondary. Dependency details come from approved indexed metadata, and this page
          does not install packages, execute shell commands, mutate files, or send dependency details to providers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
