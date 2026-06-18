param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 728 First Adapter Implementation Operator Handoff" `
  -ScriptFile "smoke-codexforge-first-adapter-implementation-operator-handoff.ps1" `
  -Domain "src\lib\codexforge\first-adapter-implementation-operator-handoff" `
  -Route "src\app\first-adapter-implementation-operator-handoff" `
  -MainPanel "FirstAdapterImplementationOperatorHandoffPanel" `
  -CommandLabel "Go to First Adapter Implementation Operator Handoff" `
  -Modules @("first-adapter-implementation-operator-handoff-model.ts", "index.ts") `
  -Components @("FirstAdapterImplementationOperatorHandoffPanel.tsx", "index.ts") `
  -Exports @("buildFirstAdapterImplementationOperatorHandoffStableKey", "buildFirstAdapterImplementationOperatorHandoff", "buildFirstAdapterImplementationOperatorHandoffs", "buildFirstAdapterImplementationOperatorHandoffBoundary", "buildFirstAdapterImplementationOperatorHandoffModel", "summarizeFirstAdapterImplementationOperatorHandoff", "FIRST_ADAPTER_IMPLEMENTATION_OPERATOR_HANDOFF_LANGUAGE") `
  -PhaseMarkers @("First Adapter Implementation Operator Handoff", "First adapter implementation operator handoff does not execute adapters", "Adapter implementation handoff requires explicit operator approval", "Handoff checklist", "Operator responsibilities", "Approval review", "Validation commands", "Rollback readiness", "Unresolved blockers", "Implementation blockers") `
  -PlainEnglish @("First Adapter Implementation Operator Handoff identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-adapter-implementation-operator-handoff"

Write-Host "[OK] CodexForge Phase 728 first adapter implementation operator handoff smoke passed."
