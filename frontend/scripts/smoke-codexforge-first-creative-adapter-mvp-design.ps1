param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 722 First Creative Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-creative-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-creative-adapter-mvp-design" `
  -Route "src\app\first-creative-adapter-mvp-design" `
  -MainPanel "FirstCreativeAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Creative Adapter MVP Design" `
  -Modules @("first-creative-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstCreativeAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstCreativeAdapterMvpDesignStableKey", "buildFirstCreativeAdapterMvpDesign", "buildFirstCreativeAdapterMvpDesigns", "buildFirstCreativeAdapterMvpDesignBoundary", "buildFirstCreativeAdapterMvpDesignModel", "summarizeFirstCreativeAdapterMvpDesign", "FIRST_CREATIVE_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Creative Adapter MVP Design", "First creative adapter MVP design does not generate images, video, or 3D assets", "Creative adapter MVP requires explicit operator approval", "Creative interface shape", "Brief/storyboard policy", "Prompt policy", "Provider/local tool dependency", "Output review", "Packaging dependency", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Creative Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-creative-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 722 first creative adapter mvp design smoke passed."
