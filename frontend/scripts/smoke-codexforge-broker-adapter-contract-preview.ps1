param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1739 Broker Adapter Contract Preview" `
  -ScriptFile "smoke-codexforge-broker-adapter-contract-preview.ps1" `
  -Domain "src\lib\codexforge\broker-adapter-contract-preview" `
  -Route "src\app\broker-adapter-contract-preview" `
  -CommandLabel "Go to Broker Adapter Contract Preview" `
  -RouteHref "/broker-adapter-contract-preview" `
  -Markers @("Broker adapter contract preview", "Broker adapter contract preview does not import broker SDKs call broker APIs or create live connections from the UI", "Broker adapter contract preview requires explicit operator approval", "Broker adapter contract preview shows backend-owned adapter name supported capabilities denied capabilities auth boundary account boundary order boundary result boundary and audit requirement", "Denied broker adapter contract paths remain blocked", "Broker adapter contract checklist")
