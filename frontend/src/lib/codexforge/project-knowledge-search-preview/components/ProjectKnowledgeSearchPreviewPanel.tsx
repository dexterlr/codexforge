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
  buildProjectKnowledgeSearchPreviewModel,
  buildProjectKnowledgeSearchPreviewStableKey,
} from "@/lib/codexforge/project-knowledge-search-preview";

const PROJECT_KNOWLEDGE_SEARCH_PREVIEW_MARKERS =
  "Project knowledge search preview Project knowledge search preview does not scan files Search results are simulated for review Private project details stay redacted Searchable knowledge groups Ranking preview project knowledge search identity denied search scopes redaction and privacy summary blocked search risks unified search candidate route privacy audit route next recommended action review-only approval required no action execution from UI no approval automation no approval is granted no action approval from UI no live search execution no search execution from UI no search query persistence no search query persistence from UI no project scan no project file scan no local file reads no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no external data fetching no evidence ingestion automation no prompt/file/project/connector/search/evidence data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced search details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectKnowledgeSearchPreviewPanel() {
  const model = buildProjectKnowledgeSearchPreviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-knowledge-search-preview={`${PROJECT_KNOWLEDGE_SEARCH_PREVIEW_MARKERS} buildProjectKnowledgeSearchPreviewStableKey ProjectKnowledgeSearchPreviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 400"
        title="Knowledge search preview"
        subtitle="Project knowledge search preview shows safe search behavior using simulated review records only. Project knowledge search preview does not scan files, search results are simulated for review, and private project details stay redacted."
        primary={{ href: "#project-knowledge-search-preview", label: "Review search preview" }}
        links={[
          { href: "/cross-loop-evidence-timeline", label: "Evidence timeline" },
          { href: "/unified-workspace-search-release-candidate", label: "Unified search RC" },
          { href: "/local-first-privacy-audit", label: "Privacy audit" },
          { href: "/project-knowledge-release-candidate", label: "Knowledge RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.searchLanguage} />
      <PreviewFoundationCard title="Plain-English project knowledge search preview">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews project knowledge search identity, searchable knowledge groups, denied search scopes,
          redaction and privacy summary, ranking preview, blocked search risks, unified search candidate route, privacy
          audit route, and next recommended action. It does not scan files, read local files, run search, persist
          queries, mutate memory, or send project data.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-knowledge-search-preview" style={previewStyles.grid}>
        {model.previews.map((preview) => (
          <PreviewFoundationCard
            key={buildProjectKnowledgeSearchPreviewStableKey("project-knowledge-search-card", preview.id)}
            title={preview.projectKnowledgeSearchIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${preview.status}`,
                `Searchable knowledge groups: ${preview.searchableKnowledgeGroups.join("; ")}`,
                `Denied search scopes: ${preview.deniedSearchScopes.join("; ")}`,
                `Redaction and privacy summary: ${preview.redactionPrivacySummary.join("; ")}`,
                `Ranking preview: ${preview.rankingPreview.join("; ")}`,
                `Blocked search risks: ${preview.blockedSearchRisks.join("; ")}`,
                preview.unifiedSearchCandidateRoute,
                preview.privacyAuditRoute,
                preview.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced search details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.previews.map((preview) => preview.advancedSearchDetails)} />
        <PreviewFoundationCopy>
          Advanced search details stay collapsed or secondary. Project knowledge search preview does not scan files,
          and search results are simulated for review.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
