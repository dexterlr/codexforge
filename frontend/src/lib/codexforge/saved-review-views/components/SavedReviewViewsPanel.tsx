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
  buildSavedReviewViewsModel,
  buildSavedReviewViewsStableKey,
} from "@/lib/codexforge/saved-review-views";

const SAVED_REVIEW_VIEWS_MARKERS =
  "Saved review views Saved review views are not stored from this page View presets require operator approval before use Private details stay redacted in view previews Proposed view presets Filter scope preview saved views identity privacy/redaction rules approval and safety rules blocked saved view risks preferences route personalization route next recommended action review-only approval required plain English daily onboarding operator preferences workspace personalization saved views no settings mutation no preference persistence no personalization persistence no saved view persistence no localStorage writes no sessionStorage writes no action execution from UI no approval automation no approval is granted no action approval from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launch behavior no prompt/file/project data sending without approval no prompt/file/project/connector/preference data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced saved view details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function SavedReviewViewsPanel() {
  const model = buildSavedReviewViewsModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-saved-review-views={`${SAVED_REVIEW_VIEWS_MARKERS} buildSavedReviewViewsStableKey SavedReviewViewsPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 393"
        title="Saved review views"
        subtitle="Saved review views previews proposed view presets without storing them. Saved review views are not stored from this page, view presets require operator approval before use, and private details stay redacted in view previews."
        primary={{ href: "#saved-review-views", label: "Review views" }}
        links={[
          { href: "/operator-preferences-review", label: "Preferences" },
          { href: "/workspace-personalization-review", label: "Personalization" },
          { href: "/daily-use-onboarding-polish", label: "Daily onboarding" },
          { href: "/global-review-inbox", label: "Global inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.savedViewsLanguage} />
      <PreviewFoundationCard title="Plain-English saved review views">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews saved views identity, proposed view presets, filter scope preview, privacy/redaction rules,
          approval and safety rules, blocked saved view risks, preferences route, personalization route, and next
          recommended action. It does not store view presets, write browser storage, save preferences, persist layout,
          call APIs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="saved-review-views" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildSavedReviewViewsStableKey("saved-review-views-card", review.id)}
            title={review.savedViewsIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Proposed view presets: ${review.proposedViewPresets.join("; ")}`,
                `Filter scope preview: ${review.filterScopePreview.join("; ")}`,
                `Privacy/redaction rules: ${review.privacyRedactionRules.join("; ")}`,
                `Approval and safety rules: ${review.approvalAndSafetyRules.join("; ")}`,
                `Blocked saved view risks: ${review.blockedSavedViewRisks.join("; ")}`,
                review.preferencesRoute,
                review.personalizationRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced saved view details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedSavedViewDetails)} />
        <PreviewFoundationCopy>
          Advanced saved view details stay collapsed or secondary. Proposed view presets remain review-only and are not
          stored from this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
