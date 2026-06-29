param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1759 Synthetic Order Validation Preview" `
  -ScriptFile "smoke-codexforge-synthetic-order-validation-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-order-validation-preview" `
  -Route "src\app\synthetic-order-validation-preview" `
  -CommandLabel "Go to Synthetic Order Validation Preview" `
  -RouteHref "/synthetic-order-validation-preview" `
  -Markers @("Synthetic order validation preview", "Synthetic order validation preview does not fetch live quotes validate real broker constraints or approve real execution from the UI", "Synthetic order validation preview requires deterministic simulator validation only", "Synthetic order validation preview shows synthetic mandate validation synthetic risk governor validation synthetic kill switch validation synthetic buying power validation and denied real validation", "Denied synthetic order validation paths remain blocked", "Synthetic order validation checklist")
