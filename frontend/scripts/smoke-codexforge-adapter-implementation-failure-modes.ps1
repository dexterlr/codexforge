param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 741 Adapter Implementation Failure Modes" `
  -ScriptFile "smoke-codexforge-adapter-implementation-failure-modes.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-failure-modes" `
  -Route "src\app\adapter-implementation-failure-modes" `
  -MainPanel "AdapterImplementationFailureModesPanel" `
  -CommandLabel "Go to Adapter Implementation Failure Modes" `
  -Modules @("adapter-implementation-failure-modes-model.ts", "index.ts") `
  -Components @("AdapterImplementationFailureModesPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationFailureModesStableKey", "buildAdapterImplementationFailureModes", "buildAdapterImplementationFailureModesItems", "buildAdapterImplementationFailureModesBoundary", "buildAdapterImplementationFailureModesModel", "summarizeAdapterImplementationFailureModes", "ADAPTER_IMPLEMENTATION_FAILURE_MODES_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Failure Modes", "Adapter implementation failure modes do not trigger recovery or retry", "Failure-mode handling requires explicit operator approval", "File write failure class", "Command runner failure class", "Local runtime failure class", "Evidence store failure class", "Result store failure class", "Recovery failure class", "Packaging failure class", "Project scaffold failure class") `
  -PlainEnglish @("Adapter Implementation Failure Modes identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "failure handling is not implemented yet") `
  -RouteHref "/adapter-implementation-failure-modes"

Write-Host "[OK] CodexForge Phase 741 adapter implementation failure modes smoke passed."
