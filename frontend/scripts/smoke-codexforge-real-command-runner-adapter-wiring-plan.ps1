param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 779 Real Command Runner Adapter Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-command-runner-adapter-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-command-runner-adapter-wiring-plan" `
  -Route "src\app\real-command-runner-adapter-wiring-plan" `
  -MainPanel "RealCommandRunnerAdapterWiringPlanPanel" `
  -CommandLabel "Go to Real Command Runner Adapter Wiring Plan" `
  -Modules @("real-command-runner-adapter-wiring-plan-model.ts", "index.ts") `
  -Components @("RealCommandRunnerAdapterWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealCommandRunnerAdapterWiringPlanStableKey", "buildRealCommandRunnerAdapterWiringPlan", "buildRealCommandRunnerAdapterWiringPlanItems", "buildRealCommandRunnerAdapterWiringPlanBoundary", "buildRealCommandRunnerAdapterWiringPlanModel", "summarizeRealCommandRunnerAdapterWiringPlan", "REAL_COMMAND_RUNNER_ADAPTER_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Command Runner Adapter Wiring Plan", "Real command runner adapter wiring plan does not run commands", "Command runner adapter wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "command preview", "working directory", "env/secrets redaction", "timeout", "stdout/stderr", "exit-code", "recovery", "unresolved blockers") `
  -PlainEnglish @("Real Command Runner Adapter Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real command runner adapter wiring plan does not run commands") `
  -RouteHref "/real-command-runner-adapter-wiring-plan"

Write-Host "[OK] CodexForge Phase 779 real command runner adapter wiring plan smoke passed."
