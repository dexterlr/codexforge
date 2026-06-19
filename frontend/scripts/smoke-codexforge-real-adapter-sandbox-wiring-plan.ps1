param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 788 Real Adapter Sandbox Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-adapter-sandbox-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-adapter-sandbox-wiring-plan" `
  -Route "src\app\real-adapter-sandbox-wiring-plan" `
  -MainPanel "RealAdapterSandboxWiringPlanPanel" `
  -CommandLabel "Go to Real Adapter Sandbox Wiring Plan" `
  -Modules @("real-adapter-sandbox-wiring-plan-model.ts", "index.ts") `
  -Components @("RealAdapterSandboxWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealAdapterSandboxWiringPlanStableKey", "buildRealAdapterSandboxWiringPlan", "buildRealAdapterSandboxWiringPlanItems", "buildRealAdapterSandboxWiringPlanBoundary", "buildRealAdapterSandboxWiringPlanModel", "summarizeRealAdapterSandboxWiringPlan", "REAL_ADAPTER_SANDBOX_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Adapter Sandbox Wiring Plan", "Real adapter sandbox wiring plan does not run adapters", "Adapter sandbox wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "sandbox allowed paths", "denied paths", "process policy", "network policy", "provider/connector/automation exclusions", "file/command/runtime boundaries", "evidence/result boundaries", "unresolved blockers") `
  -PlainEnglish @("Real Adapter Sandbox Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real adapter sandbox wiring plan does not run adapters") `
  -RouteHref "/real-adapter-sandbox-wiring-plan"

Write-Host "[OK] CodexForge Phase 788 real adapter sandbox wiring plan smoke passed."
