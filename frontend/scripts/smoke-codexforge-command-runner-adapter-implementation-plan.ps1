param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 700 Command Runner Adapter Implementation Plan" `
  -ScriptFile "smoke-codexforge-command-runner-adapter-implementation-plan.ps1" `
  -Domain "src\lib\codexforge\command-runner-adapter-implementation-plan" `
  -Route "src\app\command-runner-adapter-implementation-plan" `
  -MainPanel "CommandRunnerAdapterImplementationPlanPanel" `
  -CommandLabel "Go to Command Runner Adapter Implementation Plan" `
  -Modules @("command-runner-adapter-implementation-plan-model.ts", "index.ts") `
  -Components @("CommandRunnerAdapterImplementationPlanPanel.tsx", "index.ts") `
  -Exports @("buildCommandRunnerAdapterImplementationPlanStableKey", "buildCommandRunnerAdapterImplementationPlan", "buildCommandRunnerAdapterImplementationPlans", "buildCommandRunnerAdapterImplementationPlanBoundary", "buildCommandRunnerAdapterImplementationPlanModel", "summarizeCommandRunnerAdapterImplementationPlan", "COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE") `
  -PhaseMarkers @("Command Runner Adapter Implementation Plan", "Command runner adapter implementation plan does not run commands", "Command runner adapter implementation requires explicit operator approval", "Implementation inputs", "Implementation outputs", "Working directory policy", "Env/secrets policy", "Timeout policy", "Stdout/stderr policy", "Exit-code policy", "Recovery policy", "Tests/smokes", "Denied actions") `
  -PlainEnglish @("Command runner adapter implementation plan identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/command-runner-adapter-implementation-plan"

Write-Host "[OK] CodexForge Phase 700 command runner adapter implementation plan smoke passed."
