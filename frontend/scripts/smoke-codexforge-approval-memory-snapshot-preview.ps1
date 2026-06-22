param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1456 Approval Memory Snapshot Preview" `
  -ScriptFile "smoke-codexforge-approval-memory-snapshot-preview.ps1" `
  -Domain "src\lib\codexforge\approval-memory-snapshot-preview" `
  -Route "src\app\approval-memory-snapshot-preview" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Approval Memory Snapshot Preview" `
  -RouteHref "/approval-memory-snapshot-preview" `
  -Markers @("Approval memory snapshot preview", "Approval memory snapshot preview does not persist approvals", "Approval memory snapshot preview requires explicit human approval before promotion", "Approval memory snapshot captures approval scope expiry operator identity files commands model tool needs risk level and denied paths", "Denied approval memory paths remain blocked", "Approval memory snapshot checklist")
