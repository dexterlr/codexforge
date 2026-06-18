param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 742 Adapter Implementation Sandbox Boundary" `
  -ScriptFile "smoke-codexforge-adapter-implementation-sandbox-boundary.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-sandbox-boundary" `
  -Route "src\app\adapter-implementation-sandbox-boundary" `
  -MainPanel "AdapterImplementationSandboxBoundaryPanel" `
  -CommandLabel "Go to Adapter Implementation Sandbox Boundary" `
  -Modules @("adapter-implementation-sandbox-boundary-model.ts", "index.ts") `
  -Components @("AdapterImplementationSandboxBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationSandboxBoundaryStableKey", "buildAdapterImplementationSandboxBoundary", "buildAdapterImplementationSandboxBoundaryItems", "buildAdapterImplementationSandboxBoundaryBoundary", "buildAdapterImplementationSandboxBoundaryModel", "summarizeAdapterImplementationSandboxBoundary", "ADAPTER_IMPLEMENTATION_SANDBOX_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Sandbox Boundary", "Adapter implementation sandbox boundary does not run adapters", "Sandbox execution requires explicit operator approval", "Sandbox constraints", "Allowed paths", "Denied paths", "Process policy", "Network policy", "Provider/connector/automation exclusions", "Unresolved blockers") `
  -PlainEnglish @("Adapter Implementation Sandbox Boundary identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "sandbox execution is not implemented yet") `
  -RouteHref "/adapter-implementation-sandbox-boundary"

Write-Host "[OK] CodexForge Phase 742 adapter implementation sandbox boundary smoke passed."
