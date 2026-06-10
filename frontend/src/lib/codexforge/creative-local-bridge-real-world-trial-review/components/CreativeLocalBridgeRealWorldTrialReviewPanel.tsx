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
  buildCreativeLocalBridgeRealWorldTrialReviewModel,
  buildCreativeLocalBridgeRealWorldTrialReviewStableKey,
} from "@/lib/codexforge/creative-local-bridge-real-world-trial-review";

const CREATIVE_LOCAL_BRIDGE_REAL_WORLD_TRIAL_REVIEW_MARKERS =
  "Creative local bridge real-world trial review Creative local bridge trial review does not launch local tools Render and generation jobs require explicit approval Artifacts are reviewed before use Local bridge tool readiness summary Provider governance trial route real-world trial review review-only approval required creative trial identity source first real operator workflow trial operator creative scenario Blender/Unreal/ComfyUI boundary summary render/generation approval gates artifact review checklist blocked real actions trial outcome notes advanced creative trial details collapsed/secondary no action execution from UI no workflow execution no local bridge endpoint calls no Blender/Unreal/ComfyUI/local tool launch behavior no render/generation job execution no coding task execution no test/build/smoke execution from UI no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no patch apply behavior no commit creation from UI no provider API calls no token spending no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no web/search API calls no source fetching/browsing no OAuth request flow no connector authorization behavior no token storage no localStorage/sessionStorage token storage no automatic email/calendar/contact reads no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CreativeLocalBridgeRealWorldTrialReviewPanel() {
  const model = buildCreativeLocalBridgeRealWorldTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-creative-local-bridge-real-world-trial-review={`${CREATIVE_LOCAL_BRIDGE_REAL_WORLD_TRIAL_REVIEW_MARKERS} buildCreativeLocalBridgeRealWorldTrialReviewStableKey CreativeLocalBridgeRealWorldTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 366"
        title="Creative bridge trial review"
        subtitle="Creative local bridge real-world trial review reviews a real local creative workflow without launching tools. Render and generation jobs require explicit approval, and artifacts are reviewed before use."
        primary={{ href: "#creative-local-bridge-real-world-trial-review", label: "Review creative trial" }}
        links={[
          { href: "/first-real-operator-workflow-trial", label: "Source real trial" },
          { href: "/creative-bridge", label: "Creative bridge" },
          { href: "/creative-sandbox", label: "Sandbox review" },
          { href: "/provider-governance-real-world-trial-review", label: "Next provider review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialReviewLanguage} />
      <PreviewFoundationCard title="Plain-English creative trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews the creative trial identity, operator creative scenario, local bridge tool readiness summary,
          Blender/Unreal/ComfyUI boundaries, render and generation approval gates, artifact checklist, blocked actions,
          and outcome notes. It does not launch local tools, call local bridge endpoints, run jobs, write files, or call
          providers.
        </PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Render and generation jobs require explicit approval, and artifacts are reviewed before use.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="creative-local-bridge-real-world-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildCreativeLocalBridgeRealWorldTrialReviewStableKey(
              "creative-local-bridge-real-world-trial-review-card",
              review.id
            )}
            title={review.creativeTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceFirstRealOperatorWorkflowTrial,
                review.operatorCreativeScenario,
                review.localBridgeToolReadinessSummary,
                review.blenderUnrealComfyUiBoundarySummary,
                `Render/generation approval gates: ${review.renderGenerationApprovalGates.join("; ")}`,
                `Artifact review checklist: ${review.artifactReviewChecklist.join("; ")}`,
                `Blocked real actions: ${review.blockedRealActions.join("; ")}`,
                `Trial outcome notes: ${review.trialOutcomeNotes.join("; ")}`,
                review.providerGovernanceTrialRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced creative trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedCreativeTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced creative trial details stay collapsed or secondary. Creative local bridge real-world trial review
          remains separate from local bridge endpoint calls, local tool launches, render and generation jobs, file
          mutation, provider calls, connector calls, automations, and memory promotion.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
