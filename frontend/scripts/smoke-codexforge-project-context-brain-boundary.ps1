param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1402 Project Context Brain Boundary" `
  -ScriptFile "smoke-codexforge-project-context-brain-boundary.ps1" `
  -Domain "src\lib\codexforge\project-context-brain-boundary" `
  -Route "src\app\project-context-brain-boundary" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Project Context Brain Boundary" `
  -RouteHref "/project-context-brain-boundary" `
  -Markers @("Project context brain boundary", "Project context brain boundary does not crawl arbitrary files from the UI", "Project context brain requires explicit operator approval for backend-owned inspection", "Project context brain prepares local project understanding without broad execution", "Denied project context paths remain blocked", "Project context brain checklist")
