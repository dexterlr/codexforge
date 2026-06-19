param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 810 Backend Adapter Implementation Scaffold" `
  -ScriptFile "smoke-codexforge-backend-adapter-implementation-scaffold.ps1" `
  -Domain "src\lib\codexforge\backend-adapter-implementation-scaffold" `
  -Route "src\app\backend-adapter-implementation-scaffold" `
  -MainPanel "BackendAdapterImplementationScaffoldPanel" `
  -CommandLabel "Go to Backend Adapter Implementation Scaffold" `
  -Modules @("backend-adapter-implementation-scaffold-model.ts", "index.ts") `
  -Components @("BackendAdapterImplementationScaffoldPanel.tsx", "index.ts") `
  -Exports @("buildBackendAdapterImplementationScaffoldStableKey", "buildBackendAdapterImplementationScaffold", "buildBackendAdapterImplementationScaffoldItems", "buildBackendAdapterImplementationScaffoldBoundary", "buildBackendAdapterImplementationScaffoldModel", "summarizeBackendAdapterImplementationScaffold", "BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_LANGUAGE") `
  -PhaseMarkers @("Backend adapter implementation scaffold", "Backend adapter implementation scaffold does not run adapters", "Adapter implementation remains preview-only", "Implementation requires explicit operator approval", "Denied adapter implementation paths remain blocked", "Adapter scaffold groups", "Backend implementation checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend adapter implementation scaffold does not run adapters", "Implementation requires explicit operator approval", "Denied adapter implementation paths remain blocked") `
  -RouteHref "/backend-adapter-implementation-scaffold"

Write-Host "[OK] CodexForge Phase 810 Backend adapter implementation scaffold smoke passed."
