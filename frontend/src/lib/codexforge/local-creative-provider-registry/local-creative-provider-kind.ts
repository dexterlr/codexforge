import type { LocalCreativeProviderKind, LocalCreativeProviderKindId } from "./local-creative-provider-types";

const KIND_COPY: Record<LocalCreativeProviderKindId, Omit<LocalCreativeProviderKind, "id">> = {
  "comfyui-local": { label: "ComfyUI local", plainEnglish: "A node-based local image and video workflow tool that can run on your own workstation after you install it.", setupStatus: "manual-setup-required" },
  "automatic1111-local": { label: "AUTOMATIC1111 local", plainEnglish: "A local Stable Diffusion web interface for image drafts and experiments.", setupStatus: "manual-setup-required" },
  "forge-local": { label: "Forge local", plainEnglish: "A local image generation web interface tuned for Stable Diffusion workflows.", setupStatus: "manual-setup-required" },
  "invoke-local": { label: "Invoke local", plainEnglish: "A local creative workspace for image generation and asset iteration.", setupStatus: "manual-setup-required" },
  "blender-local": { label: "Blender local", plainEnglish: "A local 3D and animation tool for scenes, frames, and rendered assets.", setupStatus: "planned-local-tool" },
  "ffmpeg-local": { label: "FFmpeg local", plainEnglish: "A local video processing tool for assembling, resizing, and converting video files later.", setupStatus: "planned-local-tool" },
  "local-upscaler": { label: "Local upscaler", plainEnglish: "A local tool that can enlarge images or video frames after a draft exists.", setupStatus: "catalog-only" },
  "local-interpolator": { label: "Local interpolator", plainEnglish: "A local tool that can create in-between frames for smoother motion after approval.", setupStatus: "catalog-only" },
  "custom-local-http": { label: "Custom local HTTP", plainEnglish: "A local-only service you install and approve before CodexForge can plan checks around it.", setupStatus: "manual-setup-required" },
  "manual-workflow": { label: "Manual workflow", plainEnglish: "A human-reviewed checklist for creative work that remains outside automated execution.", setupStatus: "catalog-only" },
};

export function buildLocalCreativeProviderKind(id: LocalCreativeProviderKindId): LocalCreativeProviderKind {
  return { id, ...KIND_COPY[id] };
}
