param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1461 Denied Memory Boundary" `
  -ScriptFile "smoke-codexforge-denied-memory-boundary.ps1" `
  -Domain "src\lib\codexforge\denied-memory-boundary" `
  -Route "src\app\denied-memory-boundary" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Denied Memory Boundary" `
  -RouteHref "/denied-memory-boundary" `
  -Markers @("Denied memory boundary", "Denied memory boundary does not mutate memory state", "Denied memory boundary requires explicit operator approval before promotion", "Denied memory boundary blocks secrets environment values credentials tokens private keys arbitrary files hidden approvals hidden memory provider payloads connector payloads and automatic promotion", "Denied memory paths remain blocked", "Denied memory checklist")
