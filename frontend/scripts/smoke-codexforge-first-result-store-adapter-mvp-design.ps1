param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 718 First Result Store Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-result-store-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-result-store-adapter-mvp-design" `
  -Route "src\app\first-result-store-adapter-mvp-design" `
  -MainPanel "FirstResultStoreAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Result Store Adapter MVP Design" `
  -Modules @("first-result-store-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstResultStoreAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstResultStoreAdapterMvpDesignStableKey", "buildFirstResultStoreAdapterMvpDesign", "buildFirstResultStoreAdapterMvpDesigns", "buildFirstResultStoreAdapterMvpDesignBoundary", "buildFirstResultStoreAdapterMvpDesignModel", "summarizeFirstResultStoreAdapterMvpDesign", "FIRST_RESULT_STORE_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Result Store Adapter MVP Design", "First result store adapter MVP design does not store or reuse results", "Result store adapter MVP requires explicit operator approval", "Result interface shape", "Acceptance/rejection policy", "Reuse policy", "Privacy/safety policy", "Retention/audit policy", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Result Store Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-result-store-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 718 first result store adapter mvp design smoke passed."
