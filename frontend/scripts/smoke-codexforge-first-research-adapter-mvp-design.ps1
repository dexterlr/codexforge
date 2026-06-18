param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 723 First Research Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-research-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-research-adapter-mvp-design" `
  -Route "src\app\first-research-adapter-mvp-design" `
  -MainPanel "FirstResearchAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Research Adapter MVP Design" `
  -Modules @("first-research-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstResearchAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstResearchAdapterMvpDesignStableKey", "buildFirstResearchAdapterMvpDesign", "buildFirstResearchAdapterMvpDesigns", "buildFirstResearchAdapterMvpDesignBoundary", "buildFirstResearchAdapterMvpDesignModel", "summarizeFirstResearchAdapterMvpDesign", "FIRST_RESEARCH_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Research Adapter MVP Design", "First research adapter MVP design does not browse, search, or fetch sources", "Research adapter MVP requires explicit operator approval", "Research interface shape", "Source scope policy", "Live research policy", "Connector/web/search dependency", "Citation/contradiction policy", "Evidence/result dependency", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Research Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-research-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 723 first research adapter mvp design smoke passed."
