param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1453 Plan Memory Snapshot Preview" `
  -ScriptFile "smoke-codexforge-plan-memory-snapshot-preview.ps1" `
  -Domain "src\lib\codexforge\plan-memory-snapshot-preview" `
  -Route "src\app\plan-memory-snapshot-preview" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Plan Memory Snapshot Preview" `
  -RouteHref "/plan-memory-snapshot-preview" `
  -Markers @("Plan memory snapshot preview", "Plan memory snapshot preview does not execute plans", "Plan memory snapshot preview requires explicit operator approval before promotion", "Plan memory snapshot captures plan steps dependencies risks file impacts command expectations approval scope and done criteria", "Denied plan memory paths remain blocked", "Plan memory snapshot checklist")
