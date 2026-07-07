export const JARVIS_PERMISSION_APPROVAL_ENGINE_DECISION_MARKERS = [
  "allowed for review only",
  "dry-run only decision",
  "approval required decision",
  "blocked decision",
  "kill-switch blocked decision",
  "unsupported decision",
  "human operator review required",
] as const;

export const JARVIS_PERMISSION_APPROVAL_ENGINE_POLICY_REQUIREMENTS = [
  "capability permission policy required",
  "adapter permission policy required",
  "workspace permission policy required",
  "operator role review only",
  "human approval gate required",
  "dry-run required before execution",
  "approval mode required",
  "deny reason required",
  "blocked action category required",
  "approval packet readiness only",
  "cost limit posture required",
  "rate limit posture required",
  "timeout posture required",
  "data sensitivity posture required",
  "secret boundary posture required",
] as const;

export const JARVIS_PERMISSION_APPROVAL_ENGINE_RISK_MARKERS = [
  "trading risk remains critical",
  "provider risk remains approval-gated",
  "website creation risk remains approval-gated",
  "avatar risk remains approval-gated",
  "workflow risk remains approval-gated",
] as const;

export const JARVIS_PERMISSION_APPROVAL_ENGINE_HOOK_MARKERS = [
  "audit hook readiness only",
  "result ledger hook readiness only",
  "memory boundary hook readiness only",
  "kill switch hook required",
  "replay block hook required",
  "operator review required before any execution",
  "permission and approval engine completion does not enable provider/render/export/publish/workers/trading/automation",
] as const;

export const JARVIS_PERMISSION_APPROVAL_ENGINE_EXECUTION_BLOCKS = [
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

export const JARVIS_PERMISSION_APPROVAL_ENGINE_STORAGE_BOUNDARIES = [
  "no provider SDK imports in frontend",
  "no frontend provider key reads",
  "no plaintext secrets",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no browser storage for secrets",
] as const;

export const JARVIS_PERMISSION_APPROVAL_ENGINE_SHARED_MARKERS = [
  "3626-3657 - Jarvis Permission and Approval Engine",
  "3626-3657 - Jarvis Permission and Approval Engine Mega Batch v1",
  "Jarvis Permission and Approval Engine",
  "Jarvis permission and approval engine only",
  "permission engine foundation",
  "approval engine foundation",
  "centralized permission decision model",
  "one Jarvis brain with shared permissions",
  ...JARVIS_PERMISSION_APPROVAL_ENGINE_DECISION_MARKERS,
  ...JARVIS_PERMISSION_APPROVAL_ENGINE_POLICY_REQUIREMENTS,
  ...JARVIS_PERMISSION_APPROVAL_ENGINE_RISK_MARKERS,
  ...JARVIS_PERMISSION_APPROVAL_ENGINE_HOOK_MARKERS,
  "disabled by default",
  "hard kill switch",
  ...JARVIS_PERMISSION_APPROVAL_ENGINE_EXECUTION_BLOCKS,
  ...JARVIS_PERMISSION_APPROVAL_ENGINE_STORAGE_BOUNDARIES,
  "next likely batch: 3658-3689 - Jarvis Task Planner and Tool Router",
] as const;

export const JARVIS_PERMISSION_APPROVAL_ENGINE_DENIED_ITEMS =
  JARVIS_PERMISSION_APPROVAL_ENGINE_SHARED_MARKERS.filter(
    (marker) =>
      marker.startsWith("no ") ||
      marker === "approval required decision" ||
      marker === "blocked decision" ||
      marker === "kill-switch blocked decision" ||
      marker === "unsupported decision" ||
      marker === "human operator review required" ||
      marker === "human approval gate required" ||
      marker === "dry-run required before execution" ||
      marker === "blocked action category required" ||
      marker === "cost limit posture required" ||
      marker === "rate limit posture required" ||
      marker === "timeout posture required" ||
      marker === "data sensitivity posture required" ||
      marker === "secret boundary posture required" ||
      marker === "trading risk remains critical" ||
      marker === "provider risk remains approval-gated" ||
      marker === "website creation risk remains approval-gated" ||
      marker === "avatar risk remains approval-gated" ||
      marker === "workflow risk remains approval-gated" ||
      marker === "kill switch hook required" ||
      marker === "replay block hook required" ||
      marker === "operator review required before any execution" ||
      marker ===
        "permission and approval engine completion does not enable provider/render/export/publish/workers/trading/automation" ||
      marker === "disabled by default" ||
      marker === "hard kill switch"
  );
