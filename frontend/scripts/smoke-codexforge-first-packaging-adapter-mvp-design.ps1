param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 720 First Packaging Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-packaging-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-packaging-adapter-mvp-design" `
  -Route "src\app\first-packaging-adapter-mvp-design" `
  -MainPanel "FirstPackagingAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Packaging Adapter MVP Design" `
  -Modules @("first-packaging-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstPackagingAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstPackagingAdapterMvpDesignStableKey", "buildFirstPackagingAdapterMvpDesign", "buildFirstPackagingAdapterMvpDesigns", "buildFirstPackagingAdapterMvpDesignBoundary", "buildFirstPackagingAdapterMvpDesignModel", "summarizeFirstPackagingAdapterMvpDesign", "FIRST_PACKAGING_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Packaging Adapter MVP Design", "First packaging adapter MVP design does not create packages or exports", "Packaging adapter MVP requires explicit operator approval", "Packaging interface shape", "Bundle policy", "Artifact policy", "Destination policy", "Redaction/license policy", "Handoff/rollback policy", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Packaging Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-packaging-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 720 first packaging adapter mvp design smoke passed."
