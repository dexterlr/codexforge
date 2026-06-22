param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1460 Audit Memory Packet" `
  -ScriptFile "smoke-codexforge-audit-memory-packet.ps1" `
  -Domain "src\lib\codexforge\audit-memory-packet" `
  -Route "src\app\audit-memory-packet" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Audit Memory Packet" `
  -RouteHref "/audit-memory-packet" `
  -Markers @("Audit memory packet", "Audit memory packet does not persist audit logs from the UI", "Audit memory packet requires explicit operator approval before promotion", "Audit memory packet captures goal context plan diff command approval evidence result recovery model tool operator and denied-path records", "Denied audit memory paths remain blocked", "Audit memory packet checklist")
