import type { LocalVideoWorkflow, LocalVideoWorkflowType } from "./local-video-workflow-types";
import { buildLocalVideoWorkflowRequirement } from "./local-video-workflow-requirement";
import { buildLocalVideoWorkflowRisk } from "./local-video-workflow-risk";
import { buildLocalVideoWorkflowRouting } from "./local-video-workflow-routing";
import { buildLocalVideoWorkflowStep } from "./local-video-workflow-step";

type WorkflowInput = {
  type: LocalVideoWorkflowType;
  title: string;
  whenToUse: string;
};

const BASE_REQUIREMENTS = [
  buildLocalVideoWorkflowRequirement({ id: "manual-tool-setup", label: "Manual tool setup", manualSetup: "Install and configure local creative tools yourself before any approved executor exists." }),
  buildLocalVideoWorkflowRequirement({ id: "disk-space", label: "Disk space", manualSetup: "Keep room for frames, drafts, and review artifacts." }),
];

const BASE_RISKS = [
  buildLocalVideoWorkflowRisk({ id: "gpu-time", label: "GPU and time cost", mitigation: "Start with local low-res drafts and short durations before final work." }),
  buildLocalVideoWorkflowRisk({ id: "review-needed", label: "Wrong workflow choice", mitigation: "Review the workflow and job preview before anything renders." }),
];

export function buildLocalVideoWorkflow(input: WorkflowInput): LocalVideoWorkflow {
  const id = input.type;
  return {
    id,
    type: input.type,
    title: input.title,
    whenToUse: input.whenToUse,
    steps: [
      buildLocalVideoWorkflowStep({ id: `${id}-review`, label: "Review intent", plainEnglish: "Decide what the video should show before anything runs.", order: 1 }),
      buildLocalVideoWorkflowStep({ id: `${id}-local-draft`, label: "Plan local draft", plainEnglish: "Use the workstation first for cheap, private draft work.", order: 2 }),
      buildLocalVideoWorkflowStep({ id: `${id}-approve-later`, label: "Approve later", plainEnglish: "A future job still needs review before rendering.", order: 3 }),
    ],
    requirements: BASE_REQUIREMENTS,
    risks: BASE_RISKS,
    routing: buildLocalVideoWorkflowRouting({
      id: `${id}-routing`,
      localFirstReason: "Local drafts reduce cloud spend and let the operator inspect motion, style, and timing first.",
      cloudFallbackRule: "Use paid cloud only later for a reviewed final or capability gap.",
      approvalBoundary: "This catalog has no generation buttons and cannot start a workflow.",
    }),
  };
}

export function buildDefaultLocalVideoWorkflows(): LocalVideoWorkflow[] {
  return [
    buildLocalVideoWorkflow({ type: "prompt-to-keyframe", title: "Prompt to keyframe", whenToUse: "Start with still frames to lock the look before any video draft." }),
    buildLocalVideoWorkflow({ type: "keyframe-to-short-video-draft", title: "Keyframe to short video draft", whenToUse: "Turn approved keyframes into a short motion test later." }),
    buildLocalVideoWorkflow({ type: "image-to-video-draft", title: "Image to video draft", whenToUse: "Use an existing image as the visual anchor for a short local draft." }),
    buildLocalVideoWorkflow({ type: "low-res-video-draft", title: "Low-res video draft", whenToUse: "Test timing cheaply before high-resolution work." }),
    buildLocalVideoWorkflow({ type: "upscale-video", title: "Upscale video", whenToUse: "Improve a reviewed draft after the motion is acceptable." }),
    buildLocalVideoWorkflow({ type: "interpolate-frames", title: "Interpolate frames", whenToUse: "Smooth motion after a clip exists and review says it needs more frames." }),
    buildLocalVideoWorkflow({ type: "storyboard-to-shots", title: "Storyboard to shots", whenToUse: "Break a concept into shots before local generation planning." }),
    buildLocalVideoWorkflow({ type: "batch-render-queue", title: "Batch render queue", whenToUse: "Prepare multiple reviewed jobs for later queueing without auto-starting them." }),
    buildLocalVideoWorkflow({ type: "local-draft-then-cloud-final", title: "Local draft then cloud final", whenToUse: "Use local drafts to save money, then optionally review a paid final fallback." }),
  ];
}
