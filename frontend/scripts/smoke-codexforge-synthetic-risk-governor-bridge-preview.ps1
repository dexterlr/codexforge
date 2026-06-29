param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1766 Synthetic Risk Governor Bridge Preview" `
  -ScriptFile "smoke-codexforge-synthetic-risk-governor-bridge-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-risk-governor-bridge-preview" `
  -Route "src\app\synthetic-risk-governor-bridge-preview" `
  -CommandLabel "Go to Synthetic Risk Governor Bridge Preview" `
  -RouteHref "/synthetic-risk-governor-bridge-preview" `
  -Markers @("Synthetic risk governor bridge preview", "Synthetic risk governor bridge preview does not override risk governor decisions place trades approve execution or mutate capital from the UI", "Synthetic risk governor bridge preview requires backend-owned risk governor simulation", "Synthetic risk governor bridge preview shows synthetic mandate fit max daily loss max drawdown position risk approved symbols approved strategies kill switch state and denied override", "Denied synthetic risk governor bridge paths remain blocked", "Synthetic risk governor bridge checklist")
