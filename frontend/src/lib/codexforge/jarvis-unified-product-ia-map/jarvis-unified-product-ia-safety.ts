export type JarvisUnifiedProductSafetyPosture = Readonly<{
  killSwitchState: string;
  permissionMode: string;
  riskState: string;
  credentialBoundary: string;
  storageBoundary: string;
  blockedExecutionState: string;
  markerPhrases: readonly string[];
}>;

export const JARVIS_UNIFIED_PRODUCT_IA_SAFETY_MARKERS = [
  "Jarvis unified product IA only",
  "normal user path is primary",
  "developer diagnostics are secondary",
  "phase pages remain diagnostics only",
  "placeholders are intentional",
  "no direct frontend execution",
  "no live provider call",
  "no provider execution",
  "no live provider execution",
  "no video provider execution",
  "no real video generation",
  "no live video generation",
  "no image provider execution",
  "no audio provider execution",
  "no website creation execution",
  "no avatar generation execution",
  "no chatbot autonomous execution",
  "no trading execution",
  "no paper trading execution",
  "no real-money trading execution",
  "no financial advice",
  "no personalised recommendations",
  "no buy sell instructions",
  "no broker execution",
  "no live market data calls",
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
  "no provider SDK imports in frontend",
  "no frontend provider key reads",
  "no plaintext secrets",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no browser storage for secrets",
] as const;

export const JARVIS_UNIFIED_PRODUCT_SAFETY_POSTURE = {
  killSwitchState: "Global kill switch engaged by default",
  permissionMode: "Approval required for every future backend execution path",
  riskState: "Video stays review-only, trading stays paper-review-only, and automation stays blocked",
  credentialBoundary: "Credentials remain backend-only and no frontend provider key reads are allowed",
  storageBoundary:
    "Browser storage for secrets remains blocked across localStorage, sessionStorage, IndexedDB, and cookies",
  blockedExecutionState:
    "All provider, network, render, export, publish, worker, broker, and runtime actions remain execution-blocked",
  markerPhrases: JARVIS_UNIFIED_PRODUCT_IA_SAFETY_MARKERS,
} as const satisfies JarvisUnifiedProductSafetyPosture;

