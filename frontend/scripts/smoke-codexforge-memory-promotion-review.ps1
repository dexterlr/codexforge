param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1462 Memory Promotion Review" `
  -ScriptFile "smoke-codexforge-memory-promotion-review.ps1" `
  -Domain "src\lib\codexforge\memory-promotion-review" `
  -Route "src\app\memory-promotion-review" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Memory Promotion Review" `
  -RouteHref "/memory-promotion-review" `
  -Markers @("Memory promotion review", "Memory promotion review does not promote memory automatically", "Memory promotion review requires explicit operator approval", "Memory promotion review shows proposed memory scope retention risk redaction evidence support operator approval and rollback implications", "Denied memory promotion paths remain blocked", "Memory promotion checklist")
