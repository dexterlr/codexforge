param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-result-ledger-smoke-helper.ps1") `
  -SmokeName "Phase 1780 Simulated Audit Packet Preview" `
  -ScriptFile "smoke-codexforge-simulated-audit-packet-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-audit-packet-preview" `
  -Route "src\app\simulated-audit-packet-preview" `
  -CommandLabel "Go to Simulated Audit Packet Preview" `
  -RouteHref "/simulated-audit-packet-preview" `
  -Markers @("Simulated audit packet preview", "Simulated audit packet preview does not persist audit approvals queues transactions evidence results or broker decisions from the UI", "Simulated audit packet preview requires backend-owned synthetic audit capture", "Simulated audit packet preview shows simulated intent evidence simulated validation evidence simulated fill evidence simulated rejection evidence simulated P&L evidence redaction and audit continuity", "Denied simulated audit packet paths remain blocked", "Simulated audit packet checklist")
