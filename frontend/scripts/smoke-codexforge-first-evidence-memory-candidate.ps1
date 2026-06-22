param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1464 First Evidence Memory Candidate" `
  -ScriptFile "smoke-codexforge-first-evidence-memory-candidate.ps1" `
  -Domain "src\lib\codexforge\first-evidence-memory-candidate" `
  -Route "src\app\first-evidence-memory-candidate" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to First Evidence Memory Candidate" `
  -RouteHref "/first-evidence-memory-candidate" `
  -Markers @("First evidence memory candidate", "First evidence memory candidate does not persist memory automatically", "First evidence memory candidate requires explicit operator approval", "Candidate combines goal context plan diff command approval evidence result recovery audit denied memory and promotion review", "Denied first evidence memory paths remain blocked", "First evidence memory checklist")
