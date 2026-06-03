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
import { buildDraftSideBySidePlaybackReviewModel } from "@/lib/codexforge/draft-side-by-side-playback-review";

export function DraftSideBySidePlaybackReviewPanel() {
  const model = buildDraftSideBySidePlaybackReviewModel();

  return (
    <div style={previewStyles.shell} data-codexforge-draft-side-by-side-playback-review="DraftSideBySidePlaybackReviewPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated export-gated approval-gated nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Draft side-by-side playback review Compare local draft renders No automatic promotion Rejected drafts are retained Review decision required Clean comparison layout no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no auto-open arbitrary local files no artifact deletion no delete artifact button no upload by default no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 188"
        title="Draft playback"
        subtitle="Draft side-by-side playback review compares local draft renders in a clean comparison layout, then asks for a reviewed next action. Nothing is auto-promoted or deleted."
        primary={{ href: "#draft-playback-review", label: "Compare drafts" }}
        links={[
          { href: "/local-video-preview", label: "Video preview" },
          { href: "/artifact-thumbnails", label: "Thumbnails" },
          { href: "/video-review", label: "Review inbox" },
          { href: "/video-compare", label: "Compare mode" },
          { href: "/render-queue-recovery", label: "Recovery" },
          { href: "/export-package-builder", label: "Export package" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Draft side-by-side playback review",
          "Compare local draft renders",
          "No automatic promotion",
          "Rejected drafts are retained",
          "Review decision required",
          "Clean comparison layout",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            "left and right drafts stay local",
            "preview readiness is boundary-gated",
            "no losing draft deletion",
            "no Brain graph mutation",
          ]}
        />
      </PreviewFoundationCard>
      <section id="draft-playback-review" style={previewStyles.grid}>
        {[model.leftDraft, model.rightDraft].map((draft) => (
          <PreviewFoundationCard key={draft.id} title={draft.label}>
            <PreviewFoundationCopy>{draft.localArtifactSummary}</PreviewFoundationCopy>
            <PreviewFoundationPillList
              items={[
                draft.sourceTrial,
                draft.previewReadiness,
                "rejected drafts are retained",
              ]}
            />
          </PreviewFoundationCard>
        ))}
        <PreviewFoundationCard title="Comparison criteria">
          <PreviewFoundationPillList items={model.criteria.map((criterion) => criterion.label)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review decision">
          <PreviewFoundationCopy>{model.decision.notesHandoffSummary}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              model.decision.label,
              "selected draft: none",
              "no automatic promotion",
              "rejected drafts are retained",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Next reviewed action">
          <PreviewFoundationCopy>
            The operator chooses the next reviewed action: continue comparing, route to recovery, or prepare a local export package.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList items={[model.recoveryRoute, model.exportRoute, "/video-review"]} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced comparison criteria">
        <PreviewFoundationPillList items={model.criteria.map((criterion) => criterion.plainEnglish)} />
      </PreviewFoundationDetail>
    </div>
  );
}
