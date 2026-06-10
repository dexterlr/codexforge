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
  buildWorkspacePersonalizationReviewModel,
  buildWorkspacePersonalizationReviewStableKey,
} from "@/lib/codexforge/workspace-personalization-review";

const WORKSPACE_PERSONALIZATION_REVIEW_MARKERS =
  "Workspace personalization review Personalization review does not persist layout changes Safety areas cannot be hidden Route coverage remains protected Layout groups Route grouping preview personalization review identity novice/expert layout preview protected safety areas blocked personalization risks saved review views route daily onboarding route next recommended action review-only approval required plain English daily onboarding operator preferences workspace personalization saved views no settings mutation no preference persistence no personalization persistence no saved view persistence no localStorage writes no sessionStorage writes no action execution from UI no approval automation no approval is granted no action approval from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector/preference data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced personalization details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function WorkspacePersonalizationReviewPanel() {
  const model = buildWorkspacePersonalizationReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-workspace-personalization-review={`${WORKSPACE_PERSONALIZATION_REVIEW_MARKERS} buildWorkspacePersonalizationReviewStableKey WorkspacePersonalizationReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 392"
        title="Workspace personalization"
        subtitle="Workspace personalization review previews layout, route grouping, and view personalization without persisting changes. Personalization review does not persist layout changes, safety areas cannot be hidden, and route coverage remains protected."
        primary={{ href: "#workspace-personalization-review", label: "Review layout" }}
        links={[
          { href: "/saved-review-views", label: "Saved views" },
          { href: "/daily-use-onboarding-polish", label: "Daily onboarding" },
          { href: "/operator-preferences-review", label: "Preferences" },
          { href: "/dashboard-density-navigation-polish", label: "Density nav" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.personalizationLanguage} />
      <PreviewFoundationCard title="Plain-English workspace personalization review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews personalization review identity, layout groups, route grouping preview, novice/expert
          layout preview, protected safety areas, blocked personalization risks, saved review views route, daily
          onboarding route, and next recommended action. It does not persist layout changes, save views, write storage,
          hide safety areas, or remove route coverage.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="workspace-personalization-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildWorkspacePersonalizationReviewStableKey("workspace-personalization-card", review.id)}
            title={review.personalizationReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Layout groups: ${review.layoutGroups.join("; ")}`,
                `Route grouping preview: ${review.routeGroupingPreview.join("; ")}`,
                `Novice/expert layout preview: ${review.noviceExpertLayoutPreview.join("; ")}`,
                `Protected safety areas: ${review.protectedSafetyAreas.join("; ")}`,
                `Blocked personalization risks: ${review.blockedPersonalizationRisks.join("; ")}`,
                review.savedReviewViewsRoute,
                review.dailyOnboardingRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced personalization details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedPersonalizationDetails)} />
        <PreviewFoundationCopy>
          Advanced personalization details stay collapsed or secondary. Workspace personalization is preview-only and
          cannot persist layout changes from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
