param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1457 Evidence Memory Packet" `
  -ScriptFile "smoke-codexforge-evidence-memory-packet.ps1" `
  -Domain "src\lib\codexforge\evidence-memory-packet" `
  -Route "src\app\evidence-memory-packet" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Evidence Memory Packet" `
  -RouteHref "/evidence-memory-packet" `
  -Markers @("Evidence memory packet", "Evidence memory packet does not persist evidence from the UI", "Evidence memory packet requires explicit operator approval before promotion", "Evidence memory packet captures diff command stdout stderr exit code approval result audit recovery and model tool evidence references", "Denied evidence memory packet paths remain blocked", "Evidence memory packet checklist")
