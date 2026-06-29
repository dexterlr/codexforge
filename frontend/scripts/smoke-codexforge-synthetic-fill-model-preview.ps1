param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1761 Synthetic Fill Model Preview" `
  -ScriptFile "smoke-codexforge-synthetic-fill-model-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-fill-model-preview" `
  -Route "src\app\synthetic-fill-model-preview" `
  -CommandLabel "Go to Synthetic Fill Model Preview" `
  -RouteHref "/synthetic-fill-model-preview" `
  -Markers @("Synthetic fill model preview", "Synthetic fill model preview does not execute paper trades read live market data route orders or create real fills from the UI", "Synthetic fill model preview requires deterministic synthetic fill assumptions only", "Synthetic fill model preview shows simulated fill price simulated partial fill simulated full fill simulated no-fill simulated timestamp placeholder and denied live execution", "Denied synthetic fill model paths remain blocked", "Synthetic fill model checklist")
