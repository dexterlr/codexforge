param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 744 Adapter Implementation Release Handoff" `
  -ScriptFile "smoke-codexforge-adapter-implementation-release-handoff.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-release-handoff" `
  -Route "src\app\adapter-implementation-release-handoff" `
  -MainPanel "AdapterImplementationReleaseHandoffPanel" `
  -CommandLabel "Go to Adapter Implementation Release Handoff" `
  -Modules @("adapter-implementation-release-handoff-model.ts", "index.ts") `
  -Components @("AdapterImplementationReleaseHandoffPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationReleaseHandoffStableKey", "buildAdapterImplementationReleaseHandoff", "buildAdapterImplementationReleaseHandoffItems", "buildAdapterImplementationReleaseHandoffBoundary", "buildAdapterImplementationReleaseHandoffModel", "summarizeAdapterImplementationReleaseHandoff", "ADAPTER_IMPLEMENTATION_RELEASE_HANDOFF_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Release Handoff", "Adapter implementation release handoff does not release or execute adapters", "Release handoff requires explicit operator approval", "Operator responsibilities", "Validation commands", "Rollback readiness", "Unresolved blockers", "Release notes checklist", "Next action") `
  -PlainEnglish @("Adapter Implementation Release Handoff identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "release handoff is not implemented yet") `
  -RouteHref "/adapter-implementation-release-handoff"

Write-Host "[OK] CodexForge Phase 744 adapter implementation release handoff smoke passed."
