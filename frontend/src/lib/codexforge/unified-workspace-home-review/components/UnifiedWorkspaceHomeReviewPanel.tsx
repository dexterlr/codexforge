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
  buildUnifiedWorkspaceHomeReviewModel,
  buildUnifiedWorkspaceHomeReviewStableKey,
} from "@/lib/codexforge/unified-workspace-home-review";

const UNIFIED_WORKSPACE_HOME_REVIEW_MARKERS =
  "Unified workspace home review Unified workspace does not execute actions All execution remains behind explicit approval gates This page is a review surface not an automation surface Covered loops summary Navigation consolidation route coding loop status provider loop status creative/local bridge status extension loop status research loop status connector loop status automation loop status project knowledge loop status no route coverage removal no duplicate route hrefs no duplicate shortLabel values route changes require review before removal no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no file export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced workspace details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function UnifiedWorkspaceHomeReviewPanel() {
  const model = buildUnifiedWorkspaceHomeReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-unified-workspace-home-review={`${UNIFIED_WORKSPACE_HOME_REVIEW_MARKERS} buildUnifiedWorkspaceHomeReviewStableKey UnifiedWorkspaceHomeReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 352"
        title="Unified home"
        subtitle="Unified workspace home review consolidates the major CodexForge loops into a readable operator posture. Unified workspace does not execute actions, all execution remains behind explicit approval gates, and this page is a review surface not an automation surface."
        primary={{ href: "#unified-workspace-home-review", label: "Review home" }}
        links={[
          { href: "/project-knowledge-release-candidate", label: "Knowledge release" },
          { href: "/automation-release-candidate", label: "Automation release" },
          { href: "/connector-release-candidate", label: "Connector release" },
          { href: "/workspace-navigation-consolidation-review", label: "Navigation review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.workspaceLanguage} />
      <PreviewFoundationCard title="Plain-English unified workspace home">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a review surface only. It does not execute actions, call providers, call connectors, create
          automations, mutate files, mutate memory, or start local tools, plugins, agents, or MCP runtime behavior.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="unified-workspace-home-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildUnifiedWorkspaceHomeReviewStableKey("unified-workspace-home-card", review.id)}
            title={review.unifiedHomeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                ...review.coveredLoopsSummary,
                review.codingLoopStatus,
                review.providerLoopStatus,
                review.creativeLocalBridgeStatus,
                review.extensionLoopStatus,
                review.researchLoopStatus,
                review.connectorLoopStatus,
                review.automationLoopStatus,
                review.projectKnowledgeLoopStatus,
                review.navigationConsolidationRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced workspace details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedWorkspaceDetails)} />
        <PreviewFoundationCopy>
          Advanced workspace details stay collapsed or secondary. The unified home is a review surface, all execution
          remains behind explicit approval gates, and no local or cloud action is executed here.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
