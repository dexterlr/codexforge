param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2172 Music Rights Contract Preview"
  ScriptFile = "smoke-codexforge-music-rights-contract-preview.ps1"
  Domain = "src\lib\codexforge\music-rights-contract-preview"
  Route = "src\app\music-rights-contract-preview"
  CommandLabel = "Go to Music Rights Contract Preview"
  RouteHref = "/music-rights-contract-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Music rights contract preview", "Music rights contract preview does not clear music rights upload audio publish content persist licenses or call platforms from the UI", "Music rights contract preview requires backend-owned music rights review license evidence storage approval capture and audit trail", "Music rights contract preview shows simulated track reference simulated license type simulated territory note simulated usage limit simulated denied frontend music clearance", "Denied music rights paths remain blocked", "Music rights contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
