param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1458 Result Memory Packet" `
  -ScriptFile "smoke-codexforge-result-memory-packet.ps1" `
  -Domain "src\lib\codexforge\result-memory-packet" `
  -Route "src\app\result-memory-packet" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Result Memory Packet" `
  -RouteHref "/result-memory-packet" `
  -Markers @("Result memory packet", "Result memory packet does not persist results from the UI", "Result memory packet requires explicit operator approval before promotion", "Result memory packet captures success blocked denied failed timeout manual-review retryable recovered and operator-accepted outcomes", "Denied result memory paths remain blocked", "Result memory packet checklist")
