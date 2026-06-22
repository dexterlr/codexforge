param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1452 Context Memory Snapshot Preview" `
  -ScriptFile "smoke-codexforge-context-memory-snapshot-preview.ps1" `
  -Domain "src\lib\codexforge\context-memory-snapshot-preview" `
  -Route "src\app\context-memory-snapshot-preview" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Context Memory Snapshot Preview" `
  -RouteHref "/context-memory-snapshot-preview" `
  -Markers @("Context memory snapshot preview", "Context memory snapshot preview does not crawl arbitrary files from the UI", "Context memory snapshot preview requires explicit operator approval before promotion", "Context memory snapshot captures workspace identity project map stack files command candidates risks and confidence as review-only memory", "Denied context memory paths remain blocked", "Context memory snapshot checklist")
