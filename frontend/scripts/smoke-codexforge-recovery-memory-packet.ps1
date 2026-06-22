param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1459 Recovery Memory Packet" `
  -ScriptFile "smoke-codexforge-recovery-memory-packet.ps1" `
  -Domain "src\lib\codexforge\recovery-memory-packet" `
  -Route "src\app\recovery-memory-packet" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Recovery Memory Packet" `
  -RouteHref "/recovery-memory-packet" `
  -Markers @("Recovery memory packet", "Recovery memory packet does not execute recovery", "Recovery memory packet requires explicit operator approval before promotion", "Recovery memory packet captures rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery options", "Denied recovery memory paths remain blocked", "Recovery memory packet checklist")
