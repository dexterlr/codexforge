param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1404 Project Map Preview" `
  -ScriptFile "smoke-codexforge-project-map-preview.ps1" `
  -Domain "src\lib\codexforge\project-map-preview" `
  -Route "src\app\project-map-preview" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Project Map Preview" `
  -RouteHref "/project-map-preview" `
  -Markers @("Project map preview", "Project map preview does not browse arbitrary files from the UI", "Project map preview requires explicit operator approval for backend-owned inspection", "Project map previews app folders source folders config folders scripts docs tests and diagnostics without live UI crawling", "Denied project map paths remain blocked", "Project map checklist")
