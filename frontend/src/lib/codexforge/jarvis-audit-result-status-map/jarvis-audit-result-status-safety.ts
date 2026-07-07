export const JARVIS_AUDIT_RESULT_STATUS_EVENT_MARKERS = [
  "audit event review only",
  "approval event review only",
  "permission event review only",
  "planner event review only",
  "router event review only",
  "blocked action event review only",
] as const;

export const JARVIS_AUDIT_RESULT_STATUS_LEDGER_MARKERS = [
  "audit ledger foundation",
  "result ledger foundation",
  "dry-run record review only",
  "approval record review only",
  "blocked record review only",
  "artifact placeholder review only",
] as const;

export const JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_MARKERS = [
  "status dashboard foundation",
  "one Jarvis cockpit with shared evidence",
  "capability status review only",
  "workspace status review only",
  "adapter status review only",
  "permission status review only",
  "approval status review only",
  "dry-run status review only",
  "risk status review only",
  "trading status review only",
  "provider status review only",
  "website avatar status review only",
  "workflow status review only",
  "memory boundary status review only",
  "kill switch status review only",
  "lock manager status review only",
  "idempotency status review only",
  "replay block status review only",
  "operator review status required",
  "audit result status completion does not enable provider/render/export/publish/workers/trading/automation",
] as const;

export const JARVIS_AUDIT_RESULT_STATUS_EXECUTION_BLOCKS = [
  "no direct frontend execution",
  "no frontend execution of backend adapters",
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
  "no tool execution",
  "no autonomous tool execution",
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

export const JARVIS_AUDIT_RESULT_STATUS_STORAGE_BOUNDARIES = [
  "no provider SDK imports in frontend",
  "no frontend provider key reads",
  "no plaintext secrets",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no browser storage for secrets",
] as const;

export const JARVIS_AUDIT_RESULT_STATUS_SHARED_MARKERS = [
  "3690-3721 - Jarvis Audit Result Ledger and Status Dashboard",
  "3690-3721 - Jarvis Audit Result Ledger and Status Dashboard Mega Batch v1",
  "Jarvis Audit Result Ledger and Status Dashboard",
  "Jarvis audit result ledger and status dashboard only",
  ...JARVIS_AUDIT_RESULT_STATUS_EVENT_MARKERS,
  ...JARVIS_AUDIT_RESULT_STATUS_LEDGER_MARKERS,
  ...JARVIS_AUDIT_RESULT_STATUS_DASHBOARD_MARKERS,
  "disabled by default",
  "hard kill switch",
  ...JARVIS_AUDIT_RESULT_STATUS_EXECUTION_BLOCKS,
  ...JARVIS_AUDIT_RESULT_STATUS_STORAGE_BOUNDARIES,
  "next likely batch: 3722-3753 - Jarvis Unified Workspace Shells",
] as const;

export const JARVIS_AUDIT_RESULT_STATUS_DENIED_ITEMS =
  JARVIS_AUDIT_RESULT_STATUS_SHARED_MARKERS.filter(
    (marker) =>
      marker.startsWith("no ") ||
      marker === "disabled by default" ||
      marker === "hard kill switch" ||
      marker === "lock manager status review only" ||
      marker === "idempotency status review only" ||
      marker === "operator review status required" ||
      marker ===
        "audit result status completion does not enable provider/render/export/publish/workers/trading/automation"
  );
