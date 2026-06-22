param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1407 Important Files Preview" `
  -ScriptFile "smoke-codexforge-important-files-preview.ps1" `
  -Domain "src\lib\codexforge\important-files-preview" `
  -Route "src\app\important-files-preview" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Important Files Preview" `
  -RouteHref "/important-files-preview" `
  -Markers @("Important files preview", "Important files preview does not open arbitrary files from the UI", "Important files preview requires explicit operator approval", "Important files preview highlights package config routes cockpit modules smoke scripts checkpoint docs and safety files", "Denied important file paths remain blocked", "Important files checklist")
