param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1793 Simulated Ledger Timeline Preview" `
  -ScriptFile "smoke-codexforge-simulated-ledger-timeline-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-ledger-timeline-preview" `
  -Route "src\app\simulated-ledger-timeline-preview" `
  -CommandLabel "Go to Simulated Ledger Timeline Preview" `
  -RouteHref "/simulated-ledger-timeline-preview" `
  -Markers @("Simulated ledger timeline preview", "Simulated ledger timeline preview does not read live broker timelines persist ledger state or write audit logs from the UI", "Simulated ledger timeline preview requires deterministic synthetic timeline entries only", "Simulated ledger timeline preview shows simulated intent timeline simulated validation timeline simulated fill timeline simulated rejection timeline simulated risk event timeline and evidence continuity note", "Denied simulated ledger timeline paths remain blocked", "Simulated ledger timeline checklist")
