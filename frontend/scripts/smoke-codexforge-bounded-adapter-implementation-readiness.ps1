param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 698 Bounded Adapter Implementation Readiness" `
  -ScriptFile "smoke-codexforge-bounded-adapter-implementation-readiness.ps1" `
  -Domain "src\lib\codexforge\bounded-adapter-implementation-readiness" `
  -Route "src\app\bounded-adapter-implementation-readiness" `
  -MainPanel "BoundedAdapterImplementationReadinessPanel" `
  -CommandLabel "Go to Bounded Adapter Implementation Readiness" `
  -Modules @("bounded-adapter-implementation-readiness-model.ts", "index.ts") `
  -Components @("BoundedAdapterImplementationReadinessPanel.tsx", "index.ts") `
  -Exports @("buildBoundedAdapterImplementationReadinessStableKey", "buildBoundedAdapterImplementationReadiness", "buildBoundedAdapterImplementationReadinesses", "buildBoundedAdapterImplementationReadinessBoundary", "buildBoundedAdapterImplementationReadinessModel", "summarizeBoundedAdapterImplementationReadiness", "BOUNDED_ADAPTER_IMPLEMENTATION_READINESS_LANGUAGE") `
  -PhaseMarkers @("Bounded Adapter Implementation Readiness", "Bounded adapter implementation readiness does not implement or run adapters", "Bounded adapter implementation requires explicit operator approval", "Backend boundary", "Local bridge boundary", "File write boundary", "Command runner boundary", "Runtime boundary", "Provider/model boundary", "Connector boundary", "Automation boundary", "Evidence/result store boundary", "Recovery boundary", "Packaging boundary", "Denied implementation actions", "Unresolved implementation blockers") `
  -PlainEnglish @("Bounded adapter implementation readiness identity", "Implementation readiness only", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/bounded-adapter-implementation-readiness"

Write-Host "[OK] CodexForge Phase 698 bounded adapter implementation readiness smoke passed."
