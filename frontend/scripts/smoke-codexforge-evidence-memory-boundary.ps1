param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1450 Evidence Memory Boundary" `
  -ScriptFile "smoke-codexforge-evidence-memory-boundary.ps1" `
  -Domain "src\lib\codexforge\evidence-memory-boundary" `
  -Route "src\app\evidence-memory-boundary" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Evidence Memory Boundary" `
  -RouteHref "/evidence-memory-boundary" `
  -Markers @("Evidence memory boundary", "Evidence memory boundary does not persist memory from the UI", "Evidence memory requires explicit operator approval before promotion", "Evidence memory prepares reviewable run memory without hidden persistence", "Denied evidence memory paths remain blocked", "Evidence memory checklist")
