param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1417 Controlled Project Context Brain Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-project-context-brain-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-project-context-brain-release-candidate" `
  -Route "src\app\controlled-project-context-brain-release-candidate" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Controlled Project Context Brain Release Candidate" `
  -RouteHref "/controlled-project-context-brain-release-candidate" `
  -Markers @("Controlled project context brain release candidate", "Controlled project context brain release candidate does not call models browse arbitrary files write files run commands persist approvals create queues persist evidence results audit or promote memory from the frontend", "Controlled project context brain release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned project context inspection without broad execution", "Denied controlled project context brain paths remain blocked", "Controlled project context brain release checklist")
