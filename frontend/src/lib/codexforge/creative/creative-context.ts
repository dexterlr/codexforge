import { buildComfyUIWorkflowPlan } from "./comfyui-plan";
import { buildCreativeArtifactGallery } from "./artifact-gallery";
import { buildCreativeApprovalBoundary } from "./creative-safety";
import { buildCreativeBrief } from "./creative-brief";
import { buildCreativePatchHandoff } from "./creative-patch-handoff";
import { buildCreativeProductionPlan } from "./production-plan";
import { buildBlenderScenePlan } from "./scene-plan";
import { buildRenderQueuePreview } from "./render-queue";
import { buildStoryboard } from "./storyboard";
import type { CreativeBriefInput, CreativeContext } from "./creative-types";
import { buildUnrealLevelPlan } from "./unreal-plan";

export function buildCreativeContext(input: CreativeBriefInput = {}): CreativeContext {
  const brief = buildCreativeBrief(input);
  const productionPlan = buildCreativeProductionPlan(brief);
  const storyboard = buildStoryboard(brief);
  const blenderScenePlan = buildBlenderScenePlan(brief);
  const comfyuiWorkflowPlan = buildComfyUIWorkflowPlan(brief, storyboard);
  const unrealLevelPlan = buildUnrealLevelPlan(brief, storyboard);
  const renderQueuePreview = buildRenderQueuePreview(productionPlan);
  const artifactGallery = buildCreativeArtifactGallery(productionPlan);
  const approvalBoundary = buildCreativeApprovalBoundary();
  const patchHandoff = buildCreativePatchHandoff(productionPlan, storyboard, artifactGallery);

  return {
    brief,
    productionPlan,
    storyboard,
    blenderScenePlan,
    comfyuiWorkflowPlan,
    unrealLevelPlan,
    renderQueuePreview,
    artifactGallery,
    approvalBoundary,
    patchHandoff,
  };
}
