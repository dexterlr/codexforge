param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "ComfyUI Live Health Probe Gate" `
  -ScriptFile "smoke-codexforge-comfyui-live-health-probe-gate.ps1" `
  -Domain "src\lib\codexforge\comfyui-live-health-probe-gate" `
  -Route "src\app\comfyui-health\gate" `
  -MainPanel "ComfyUiLiveHealthProbeGatePanel" `
  -CommandLabel "Go to ComfyUI Health Gate" `
  -Modules @("comfyui-live-health-gate-types.ts","live-health-probe-request.ts","live-health-probe-policy.ts","live-health-probe-safety.ts","live-health-probe-readiness.ts","live-health-probe-decision.ts","live-health-probe-handoff.ts","live-health-probe-summary.ts","index.ts") `
  -Components @("ComfyUiLiveHealthProbeGatePanel.tsx","LiveHealthProbeRequestPanel.tsx","LiveHealthProbePolicyPanel.tsx","LiveHealthProbeSafetyPanel.tsx","LiveHealthProbeReadinessPanel.tsx","LiveHealthProbeDecisionPanel.tsx","LiveHealthProbeHandoffPanel.tsx","LiveHealthProbeSummaryPanel.tsx","LiveHealthProbeSafetyStrip.tsx","LiveHealthProbeEmptyState.tsx","index.ts") `
  -Exports @("buildLiveHealthProbeRequest","buildDefaultLiveHealthProbeRequest","buildLiveHealthProbePolicy","isLiveHealthProbeAllowed","buildLiveHealthProbeSafety","buildLiveHealthProbeReadiness","buildLiveHealthProbeDecision","buildLiveHealthProbeHandoff","buildLiveHealthProbeSummary","summarizeLiveHealthProbeGate") `
  -PlainEnglish @("ComfyUI health gate","Check if a future local health probe is safe before anything contacts ComfyUI.","Review health gate","Nothing contacts ComfyUI","local-only base URL","no prompt payload","no workflow payload","no queue mutation","no file write","no API key","no cloud URL","explicit approval posture","metadata-only intention","no-auto-run guarantee","preview-only","ready-for-future-approved-probe","blocked-nonlocal-url","blocked-missing-base-url","blocked-policy","unknown","health checks are not render jobs","no ComfyUI queue submit","no job queue mutation") `
  -ExtraRoutes @("/comfyui-health","/comfyui-metadata","/local-provider-probes","/provider-tests","/render-queue")
