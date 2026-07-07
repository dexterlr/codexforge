export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_REQUIRED_FIELDS = [
  "capability id required",
  "feature domain required",
  "risk tier required",
  "permission posture required",
  "approval mode required",
  "dry-run mode required",
  "backend-only mode required",
  "input envelope review only",
  "output envelope review only",
  "error envelope review only",
  "credential reference policy only",
  "token reference policy only",
  "execution policy remains blocked",
] as const;

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_HOOK_POSTURES = [
  "audit hook readiness only",
  "observability hook readiness only",
  "result ledger hook readiness only",
  "memory boundary hook readiness only",
  "kill switch hook required",
  "lock manager hook required",
  "idempotency hook required",
  "replay block hook required",
  "operator review required before adapter execution",
] as const;

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_WORKSPACE_MARKERS = [
  "video workspace plugs into shared adapter contract",
  "website workspace plugs into shared adapter contract",
  "avatar workspace plugs into shared adapter contract",
  "chatbot brain plugs into shared adapter contract",
  "trading workspace plugs into shared adapter contract",
  "workflow workspace plugs into shared adapter contract",
  "render export publish plugs into shared adapter contract",
] as const;

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_EXECUTION_BLOCKS = [
  "no direct frontend execution",
  "no live provider call",
  "no provider execution",
  "no video provider execution",
  "no image provider execution",
  "no audio provider execution",
  "no website creation execution",
  "no avatar generation execution",
  "no chatbot autonomous execution",
  "no trading execution",
  "no paper trading execution",
  "no real-money trading execution",
  "no network execution",
  "no render execution",
  "no export execution",
  "no publish execution",
  "no worker dispatch",
  "no file export",
  "no download generation",
  "no archive creation",
  "no signed URL creation",
  "no platform upload",
  "no media upload",
  "no OAuth flow creation",
  "no webhook creation",
  "no schedule execution",
  "no account authorization execution",
  "no API route execution",
  "no service creation",
  "no runtime deploy",
  "no file writes from the app",
  "no shell/process/command execution from the app",
  "no fetch/network calls",
] as const;

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_STORAGE_BOUNDARIES = [
  "no provider SDK imports in frontend",
  "no frontend provider key reads",
  "no plaintext secrets",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no browser storage for secrets",
] as const;

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_SHARED_MARKERS = [
  "3594-3625 - Jarvis Shared Backend Adapter Contract",
  "3594-3625 - Jarvis Shared Backend Adapter Contract Mega Batch v1",
  "Jarvis Shared Backend Adapter Contract",
  "Jarvis shared backend adapter contract only",
  "shared adapter contract foundation",
  "manifest-driven adapter registry",
  "one Jarvis brain with specialist workspaces",
  "Jarvis operating system with feature workspaces",
  ...JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_WORKSPACE_MARKERS,
  ...JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_REQUIRED_FIELDS,
  ...JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_HOOK_POSTURES,
  "shared backend adapter contract completion does not enable provider/render/export/publish/workers/trading/automation",
  "disabled by default",
  "hard kill switch",
  ...JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_EXECUTION_BLOCKS,
  ...JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_STORAGE_BOUNDARIES,
  "next likely batch: 3626-3657 - Jarvis Permission and Approval Engine",
] as const;

export const JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_DENIED_ITEMS =
  JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_SHARED_MARKERS.filter(
    (marker) =>
      marker.startsWith("no ") ||
      marker === "disabled by default" ||
      marker === "hard kill switch" ||
      marker === "approval mode required" ||
      marker === "dry-run mode required" ||
      marker === "backend-only mode required" ||
      marker === "execution policy remains blocked" ||
      marker === "kill switch hook required" ||
      marker === "lock manager hook required" ||
      marker === "idempotency hook required" ||
      marker === "replay block hook required" ||
      marker === "operator review required before adapter execution" ||
      marker ===
        "shared backend adapter contract completion does not enable provider/render/export/publish/workers/trading/automation"
  );
