param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1451 Goal Memory Snapshot Preview" `
  -ScriptFile "smoke-codexforge-goal-memory-snapshot-preview.ps1" `
  -Domain "src\lib\codexforge\goal-memory-snapshot-preview" `
  -Route "src\app\goal-memory-snapshot-preview" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Goal Memory Snapshot Preview" `
  -RouteHref "/goal-memory-snapshot-preview" `
  -Markers @("Goal memory snapshot preview", "Goal memory snapshot preview does not promote memory automatically", "Goal memory snapshot preview requires explicit operator approval before promotion", "Goal memory snapshot captures operator goal normalized goal domain task target and done criteria as review-only memory", "Denied goal memory paths remain blocked", "Goal memory snapshot checklist")
