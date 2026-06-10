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
  buildCodingLoopRealWorldTrialReviewModel,
  buildCodingLoopRealWorldTrialReviewStableKey,
} from "@/lib/codexforge/coding-loop-real-world-trial-review";

const CODING_LOOP_REAL_WORLD_TRIAL_REVIEW_MARKERS =
  "Coding loop real-world trial review Coding trial review does not execute actions Patches and commits require explicit approval Validation evidence is reviewed before use Proposed coding task Patch apply boundaries real-world trial review review-only approval required real evidence is reviewed before use Memory promotion remains blocked until approved coding trial identity source first real operator workflow trial operator scenario expected approval gates validation evidence summary blocked real actions trial outcome notes next loop route advanced coding trial details collapsed/secondary no action execution from UI no workflow execution no coding task execution no test/build/smoke execution from UI no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no patch apply behavior no commit creation from UI no provider API calls no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no web/search API calls no source fetching/browsing no OAuth request flow no connector authorization behavior no token storage no localStorage/sessionStorage token storage no automatic email/calendar/contact reads no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CodingLoopRealWorldTrialReviewPanel() {
  const model = buildCodingLoopRealWorldTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-coding-loop-real-world-trial-review={`${CODING_LOOP_REAL_WORLD_TRIAL_REVIEW_MARKERS} buildCodingLoopRealWorldTrialReviewStableKey CodingLoopRealWorldTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 362"
        title="Coding trial review"
        subtitle="Coding loop real-world trial review prepares a real operator coding trial for review only. Coding trial review does not execute actions, patches and commits require explicit approval, and validation evidence is reviewed before use."
        primary={{ href: "#coding-loop-real-world-trial-review", label: "Review coding trial" }}
        links={[
          { href: "/first-real-operator-workflow-trial", label: "Source real trial" },
          { href: "/code-flow", label: "Safe code flow" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/research-loop-real-world-trial-review", label: "Next research review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialReviewLanguage} />
      <PreviewFoundationCard title="Plain-English coding trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews the coding trial identity, proposed coding task, gates, patch apply boundaries, validation
          evidence summary, blocked actions, and outcome notes. It does not run commands, apply patches, create commits,
          mutate files, call APIs, read connectors, schedule work, or promote memory.
        </PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Real evidence is reviewed before use, and memory promotion remains blocked until approved.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="coding-loop-real-world-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildCodingLoopRealWorldTrialReviewStableKey(
              "coding-loop-real-world-trial-review-card",
              review.id
            )}
            title={review.codingTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceFirstRealOperatorWorkflowTrial,
                review.operatorScenario,
                review.proposedCodingTask,
                `Expected approval gates: ${review.expectedApprovalGates.join("; ")}`,
                `Patch apply boundaries: ${review.patchApplyBoundaries.join("; ")}`,
                review.validationEvidenceSummary,
                `Blocked real actions: ${review.blockedRealActions.join("; ")}`,
                `Trial outcome notes: ${review.trialOutcomeNotes.join("; ")}`,
                review.nextLoopRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced coding trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedCodingTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced coding trial details stay collapsed or secondary. Coding real-world trial review remains separate from
          execution, commands, patch apply behavior, commits, file mutation, provider calls, connector reads, automations,
          and memory promotion.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
