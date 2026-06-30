param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1796 Simulated Operator Signoff Preview" `
  -ScriptFile "smoke-codexforge-simulated-operator-signoff-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-operator-signoff-preview" `
  -Route "src\app\simulated-operator-signoff-preview" `
  -CommandLabel "Go to Simulated Operator Signoff Preview" `
  -RouteHref "/simulated-operator-signoff-preview" `
  -Markers @("Simulated operator signoff preview", "Simulated operator signoff preview does not approve execution persist approval release locks dispatch workers or write audit state from the UI", "Simulated operator signoff preview requires backend-owned operator signoff capture", "Simulated operator signoff preview shows simulated signoff packet simulated approver placeholder simulated expiry simulated replay protection simulated evidence requirement and denied frontend approval persistence", "Denied simulated operator signoff paths remain blocked", "Simulated operator signoff checklist")
