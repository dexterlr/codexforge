export const JARVIS_OPERATOR_CONTROL_PLANE_FOUNDATION_SHARED_MARKERS = [
  "3562-3593 - Jarvis Operator Control Plane Foundation",
  "3562-3593 - Jarvis Operator Control Plane Foundation Mega Batch v1",
  "Jarvis Operator Control Plane Foundation",
  "Jarvis sits above all CodexForge features",
  "Jarvis control plane only",
  "shared backend adapter system foundation",
  "capability registry foundation",
  "permission posture foundation",
  "approval router foundation",
  "backend adapter contract foundation",
  "feature oversight only",
  "operator control plane only",
  "no direct frontend execution",
  "no live provider call",
  "no provider execution",
  "no video provider execution",
  "no image provider execution",
  "no audio provider execution",
  "no website creation execution",
  "no avatar generation execution",
  "no trading execution",
  "no paper trading execution",
  "no real-money trading execution",
  "video adapter awareness only",
  "website adapter awareness only",
  "avatar adapter awareness only",
  "chatbot brain awareness only",
  "trading adapter awareness only",
  "workflow adapter awareness only",
  "render export publish awareness only",
  "task planner readiness only",
  "human approval gate required",
  "risk tier review only",
  "dry-run first policy required",
  "audit readiness only",
  "observability readiness only",
  "result ledger readiness only",
  "memory boundary review only",
  "kill switch remains enforced",
  "lock manager readiness only",
  "idempotency readiness only",
  "replay block remains required",
  "operator review remains required before any execution",
  "Jarvis foundation completion does not enable provider/render/export/publish/workers/trading/automation",
  "disabled by default",
  "hard kill switch",
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
  "no provider SDK imports in frontend",
  "no frontend provider key reads",
  "no plaintext secrets",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no browser storage for secrets",
  "next likely batch: 3594-3625 - Jarvis Shared Backend Adapter Contract",
] as const;

export const JARVIS_CONTROL_PLANE_SECURITY_BOUNDARIES = [
  "no provider SDK imports in frontend",
  "no frontend provider key reads",
  "no plaintext secrets",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no browser storage for secrets",
] as const;

export const JARVIS_CONTROL_PLANE_DENIED_ITEMS =
  JARVIS_OPERATOR_CONTROL_PLANE_FOUNDATION_SHARED_MARKERS.filter(
    (marker) =>
      marker.startsWith("no ") ||
      marker === "disabled by default" ||
      marker === "hard kill switch" ||
      marker === "kill switch remains enforced" ||
      marker === "lock manager readiness only" ||
      marker === "idempotency readiness only" ||
      marker === "replay block remains required" ||
      marker === "operator review remains required before any execution" ||
      marker ===
        "Jarvis foundation completion does not enable provider/render/export/publish/workers/trading/automation"
  );
