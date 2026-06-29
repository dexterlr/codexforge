param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1758 Synthetic Order Intent Preview" `
  -ScriptFile "smoke-codexforge-synthetic-order-intent-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-order-intent-preview" `
  -Route "src\app\synthetic-order-intent-preview" `
  -CommandLabel "Go to Synthetic Order Intent Preview" `
  -RouteHref "/synthetic-order-intent-preview" `
  -Markers @("Synthetic order intent preview", "Synthetic order intent preview does not place trades submit orders call brokers or send executable broker instructions from the UI", "Synthetic order intent preview requires review-only order intent packets", "Synthetic order intent preview shows simulated symbol side quantity order type time in force thesis risk note mandate fit and no executable order state", "Denied synthetic order intent paths remain blocked", "Synthetic order intent checklist")
