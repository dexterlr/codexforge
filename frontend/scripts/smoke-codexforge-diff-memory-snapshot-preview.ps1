param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1454 Diff Memory Snapshot Preview" `
  -ScriptFile "smoke-codexforge-diff-memory-snapshot-preview.ps1" `
  -Domain "src\lib\codexforge\diff-memory-snapshot-preview" `
  -Route "src\app\diff-memory-snapshot-preview" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Diff Memory Snapshot Preview" `
  -RouteHref "/diff-memory-snapshot-preview" `
  -Markers @("Diff memory snapshot preview", "Diff memory snapshot preview does not apply diffs", "Diff memory snapshot preview requires explicit operator approval before promotion", "Diff memory snapshot captures proposed file changes path guard status rollback readiness evidence needs and denied paths", "Denied diff memory paths remain blocked", "Diff memory snapshot checklist")
