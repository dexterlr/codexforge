import type { LocalCreativeCapability, LocalCreativeCapabilityId } from "./local-creative-provider-types";

const CAPABILITY_COPY: Record<LocalCreativeCapabilityId, Omit<LocalCreativeCapability, "id">> = {
  "image-generation": { label: "image generation", noviceMeaning: "Create draft still images locally after setup and approval.", previewOnly: true },
  "image-upscale": { label: "image upscale", noviceMeaning: "Make a still image larger or cleaner after the draft is chosen.", previewOnly: true },
  "video-draft": { label: "video draft", noviceMeaning: "Create a short low-cost motion draft locally before any paid final render.", previewOnly: true },
  "video-upscale": { label: "video upscale", noviceMeaning: "Improve a completed video draft later, usually after review.", previewOnly: true },
  "frame-interpolation": { label: "frame interpolation", noviceMeaning: "Add in-between frames to make motion smoother after a clip exists.", previewOnly: true },
  "keyframe-generation": { label: "keyframe generation", noviceMeaning: "Create still frames that define the look of a future video.", previewOnly: true },
  "storyboard-assets": { label: "storyboard assets", noviceMeaning: "Plan shot images and references before rendering video.", previewOnly: true },
  "prompt-planning": { label: "prompt planning", noviceMeaning: "Prepare wording for later review without sending it to any provider.", previewOnly: true },
  "batch-render": { label: "batch render", noviceMeaning: "Queue multiple approved jobs later; this screen only previews the idea.", previewOnly: true },
  "artifact-gallery": { label: "artifact gallery", noviceMeaning: "Review generated files later after a separate approved process supplies them.", previewOnly: true },
};

export function buildLocalCreativeCapability(id: LocalCreativeCapabilityId): LocalCreativeCapability {
  return { id, ...CAPABILITY_COPY[id] };
}
