param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1416 First Project Context Brain Candidate" `
  -ScriptFile "smoke-codexforge-first-project-context-brain-candidate.ps1" `
  -Domain "src\lib\codexforge\first-project-context-brain-candidate" `
  -Route "src\app\first-project-context-brain-candidate" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to First Project Context Brain Candidate" `
  -RouteHref "/first-project-context-brain-candidate" `
  -Markers @("First project context brain candidate", "First project context brain candidate does not execute inspection from the frontend", "First project context brain candidate requires explicit operator approval", "Candidate combines workspace identity project map framework runtime package tooling important files command candidates risk zones evidence result recovery and confidence", "Denied first project context brain paths remain blocked", "First project context brain checklist")
