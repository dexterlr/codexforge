param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 716 First Local Runtime Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-local-runtime-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-local-runtime-adapter-mvp-design" `
  -Route "src\app\first-local-runtime-adapter-mvp-design" `
  -MainPanel "FirstLocalRuntimeAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Local Runtime Adapter MVP Design" `
  -Modules @("first-local-runtime-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstLocalRuntimeAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstLocalRuntimeAdapterMvpDesignStableKey", "buildFirstLocalRuntimeAdapterMvpDesign", "buildFirstLocalRuntimeAdapterMvpDesigns", "buildFirstLocalRuntimeAdapterMvpDesignBoundary", "buildFirstLocalRuntimeAdapterMvpDesignModel", "summarizeFirstLocalRuntimeAdapterMvpDesign", "FIRST_LOCAL_RUNTIME_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Local Runtime Adapter MVP Design", "First local runtime adapter MVP design does not start local runtimes", "Local runtime adapter MVP requires explicit operator approval", "Runtime interface shape", "Port/network policy", "Process lifecycle policy", "Stop policy", "Logging policy", "Recovery policy", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Local Runtime Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-local-runtime-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 716 first local runtime adapter mvp design smoke passed."
