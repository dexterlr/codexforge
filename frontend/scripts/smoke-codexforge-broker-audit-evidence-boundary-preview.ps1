param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1750 Broker Audit Evidence Boundary Preview" `
  -ScriptFile "smoke-codexforge-broker-audit-evidence-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\broker-audit-evidence-boundary-preview" `
  -Route "src\app\broker-audit-evidence-boundary-preview" `
  -CommandLabel "Go to Broker Audit Evidence Boundary Preview" `
  -RouteHref "/broker-audit-evidence-boundary-preview" `
  -Markers @("Broker audit evidence boundary preview", "Broker audit evidence boundary preview does not persist evidence results audit approvals or broker decisions from the UI", "Broker audit evidence boundary preview requires backend-owned capture", "Broker audit evidence boundary preview shows approval evidence order preview evidence validation evidence dispatch evidence result evidence error evidence redaction and audit continuity", "Denied broker audit evidence paths remain blocked", "Broker audit evidence boundary checklist")
