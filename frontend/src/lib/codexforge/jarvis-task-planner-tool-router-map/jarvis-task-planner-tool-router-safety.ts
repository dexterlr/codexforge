export const JARVIS_TASK_PLANNER_TOOL_ROUTER_REVIEW_MARKERS = [
  "task planner foundation",
  "tool router foundation",
  "one Jarvis brain with shared task planning",
  "one Jarvis brain with shared tool routing",
  "user goal review only",
  "request envelope review only",
  "plan graph review only",
  "plan step review only",
  "capability selection review only",
  "risk check required",
  "permission check required",
  "approval check required",
  "dry-run routing required",
  "dry-run route required",
  "backend-only route required",
  "tool router contract review only",
  "backend adapter routing review only",
  "video route review only",
  "website route review only",
  "avatar route review only",
  "chatbot brain route review only",
  "trading route review only",
  "workflow route review only",
  "render publish route review only",
  "operator decision preview only",
  "blocked action summary only",
  "approval packet request readiness only",
  "audit preview only",
  "result ledger preview only",
  "memory boundary preview only",
  "kill switch check required",
  "lock manager check required",
  "idempotency check required",
  "replay block check required",
  "human review required before any execution",
  "task planner and tool router completion does not enable provider/render/export/publish/workers/trading/automation",
] as const;

export const JARVIS_TASK_PLANNER_TOOL_ROUTER_EXECUTION_BLOCKS = [
  "no direct frontend execution",
  "no frontend execution of backend adapters",
  "no live provider call",
  "no provider execution",
  "no live provider execution",
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

export const JARVIS_TASK_PLANNER_TOOL_ROUTER_STORAGE_BOUNDARIES = [
  "no provider SDK imports in frontend",
  "no frontend provider key reads",
  "no frontend secrets",
  "no plaintext secrets",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no browser storage for secrets",
] as const;

export const JARVIS_TASK_PLANNER_TOOL_ROUTER_SHARED_MARKERS = [
  "3658-3689 - Jarvis Task Planner and Tool Router",
  "3658-3689 - Jarvis Task Planner and Tool Router Mega Batch v1",
  "Jarvis Task Planner and Tool Router",
  "Jarvis task planner and tool router only",
  ...JARVIS_TASK_PLANNER_TOOL_ROUTER_REVIEW_MARKERS,
  "disabled by default",
  "hard kill switch",
  ...JARVIS_TASK_PLANNER_TOOL_ROUTER_EXECUTION_BLOCKS,
  ...JARVIS_TASK_PLANNER_TOOL_ROUTER_STORAGE_BOUNDARIES,
  "next likely batch: 3690-3721 - Jarvis Audit Result Ledger and Status Dashboard",
] as const;

export const JARVIS_TASK_PLANNER_TOOL_ROUTER_DENIED_ITEMS =
  JARVIS_TASK_PLANNER_TOOL_ROUTER_SHARED_MARKERS.filter(
    (marker) =>
      marker.startsWith("no ") ||
      marker.endsWith("required") ||
      marker === "disabled by default" ||
      marker === "hard kill switch" ||
      marker ===
        "task planner and tool router completion does not enable provider/render/export/publish/workers/trading/automation"
  );
