param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1406 Package Tooling Detection Preview" `
  -ScriptFile "smoke-codexforge-package-tooling-detection-preview.ps1" `
  -Domain "src\lib\codexforge\package-tooling-detection-preview" `
  -Route "src\app\package-tooling-detection-preview" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Package Tooling Detection Preview" `
  -RouteHref "/package-tooling-detection-preview" `
  -Markers @("Package tooling detection preview", "Package tooling detection preview does not install packages or run package scripts", "Package tooling detection preview requires explicit operator approval", "Package tooling detection previews package manager scripts build commands smoke commands lint commands and dependency risk hints", "Denied package tooling paths remain blocked", "Package tooling checklist")
