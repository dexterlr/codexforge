param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 733 Local Runtime Adapter Implementation Slice" `
  -ScriptFile "smoke-codexforge-local-runtime-adapter-implementation-slice.ps1" `
  -Domain "src\lib\codexforge\local-runtime-adapter-implementation-slice" `
  -Route "src\app\local-runtime-adapter-implementation-slice" `
  -MainPanel "LocalRuntimeAdapterImplementationSlicePanel" `
  -CommandLabel "Go to Local Runtime Adapter Implementation Slice" `
  -Modules @("local-runtime-adapter-implementation-slice-model.ts", "index.ts") `
  -Components @("LocalRuntimeAdapterImplementationSlicePanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeAdapterImplementationSliceStableKey", "buildLocalRuntimeAdapterImplementationSlice", "buildLocalRuntimeAdapterImplementationSliceItems", "buildLocalRuntimeAdapterImplementationSliceBoundary", "buildLocalRuntimeAdapterImplementationSliceModel", "summarizeLocalRuntimeAdapterImplementationSlice", "LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE") `
  -PhaseMarkers @("Local Runtime Adapter Implementation Slice", "Local runtime adapter implementation slice does not start local runtimes", "Local runtime adapter implementation requires explicit operator approval", "Slice inputs", "Slice outputs", "Port/network policy", "Process lifecycle policy", "Stop policy", "Logging policy", "Sandbox boundary", "Validation matrix", "Unresolved blockers") `
  -PlainEnglish @("Local Runtime Adapter Implementation Slice identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "runtime profile registry") `
  -RouteHref "/local-runtime-adapter-implementation-slice"

Write-Host "[OK] CodexForge Phase 733 local runtime adapter implementation slice smoke passed."
