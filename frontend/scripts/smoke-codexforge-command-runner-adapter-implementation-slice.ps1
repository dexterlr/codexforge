param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 732 Command Runner Adapter Implementation Slice" `
  -ScriptFile "smoke-codexforge-command-runner-adapter-implementation-slice.ps1" `
  -Domain "src\lib\codexforge\command-runner-adapter-implementation-slice" `
  -Route "src\app\command-runner-adapter-implementation-slice" `
  -MainPanel "CommandRunnerAdapterImplementationSlicePanel" `
  -CommandLabel "Go to Command Runner Adapter Implementation Slice" `
  -Modules @("command-runner-adapter-implementation-slice-model.ts", "index.ts") `
  -Components @("CommandRunnerAdapterImplementationSlicePanel.tsx", "index.ts") `
  -Exports @("buildCommandRunnerAdapterImplementationSliceStableKey", "buildCommandRunnerAdapterImplementationSlice", "buildCommandRunnerAdapterImplementationSliceItems", "buildCommandRunnerAdapterImplementationSliceBoundary", "buildCommandRunnerAdapterImplementationSliceModel", "summarizeCommandRunnerAdapterImplementationSlice", "COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE") `
  -PhaseMarkers @("Command Runner Adapter Implementation Slice", "Command runner adapter implementation slice does not run commands", "Command runner adapter implementation requires explicit operator approval", "Slice inputs", "Slice outputs", "Working-directory policy", "Env/secrets policy", "Timeout policy", "Stdout/stderr policy", "Exit-code policy", "Sandbox boundary", "Validation matrix", "Unresolved blockers") `
  -PlainEnglish @("Command Runner Adapter Implementation Slice identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "command profiles") `
  -RouteHref "/command-runner-adapter-implementation-slice"

Write-Host "[OK] CodexForge Phase 732 command runner adapter implementation slice smoke passed."
