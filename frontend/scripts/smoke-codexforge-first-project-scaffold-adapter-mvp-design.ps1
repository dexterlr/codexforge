param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 721 First Project Scaffold Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-project-scaffold-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-project-scaffold-adapter-mvp-design" `
  -Route "src\app\first-project-scaffold-adapter-mvp-design" `
  -MainPanel "FirstProjectScaffoldAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Project Scaffold Adapter MVP Design" `
  -Modules @("first-project-scaffold-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstProjectScaffoldAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstProjectScaffoldAdapterMvpDesignStableKey", "buildFirstProjectScaffoldAdapterMvpDesign", "buildFirstProjectScaffoldAdapterMvpDesigns", "buildFirstProjectScaffoldAdapterMvpDesignBoundary", "buildFirstProjectScaffoldAdapterMvpDesignModel", "summarizeFirstProjectScaffoldAdapterMvpDesign", "FIRST_PROJECT_SCAFFOLD_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Project Scaffold Adapter MVP Design", "First project scaffold adapter MVP design does not create projects", "Project scaffold adapter MVP requires explicit operator approval", "Scaffold interface shape", "Target project types", "Template policy", "File write dependency", "Command/runtime dependency", "Evidence/result/recovery policy", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Project Scaffold Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-project-scaffold-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 721 first project scaffold adapter mvp design smoke passed."
