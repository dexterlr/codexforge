param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 714 First File Write Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-file-write-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-file-write-adapter-mvp-design" `
  -Route "src\app\first-file-write-adapter-mvp-design" `
  -MainPanel "FirstFileWriteAdapterMvpDesignPanel" `
  -CommandLabel "Go to First File Write Adapter MVP Design" `
  -Modules @("first-file-write-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstFileWriteAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstFileWriteAdapterMvpDesignStableKey", "buildFirstFileWriteAdapterMvpDesign", "buildFirstFileWriteAdapterMvpDesigns", "buildFirstFileWriteAdapterMvpDesignBoundary", "buildFirstFileWriteAdapterMvpDesignModel", "summarizeFirstFileWriteAdapterMvpDesign", "FIRST_FILE_WRITE_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First File Write Adapter MVP Design", "First file write adapter MVP design does not write files", "File write adapter MVP requires explicit operator approval", "MVP interface shape", "Allowed operations", "Denied operations", "Path policy", "Diff policy", "Rollback policy", "Audit policy", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First File Write Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-file-write-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 714 first file write adapter mvp design smoke passed."
