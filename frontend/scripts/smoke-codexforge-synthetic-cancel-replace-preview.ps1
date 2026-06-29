param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-broker-adapter-simulator-smoke-helper.ps1") `
  -SmokeName "Phase 1764 Synthetic Cancel Replace Preview" `
  -ScriptFile "smoke-codexforge-synthetic-cancel-replace-preview.ps1" `
  -Domain "src\lib\codexforge\synthetic-cancel-replace-preview" `
  -Route "src\app\synthetic-cancel-replace-preview" `
  -CommandLabel "Go to Synthetic Cancel Replace Preview" `
  -RouteHref "/synthetic-cancel-replace-preview" `
  -Markers @("Synthetic cancel replace preview", "Synthetic cancel replace preview does not cancel real orders replace real orders mutate broker state or call broker endpoints from the UI", "Synthetic cancel replace preview requires review-only synthetic cancel replace packets", "Synthetic cancel replace preview shows simulated cancel request simulated replace request simulated denied live mutation simulated approval requirement and backend-owned simulator boundary", "Denied synthetic cancel replace paths remain blocked", "Synthetic cancel replace checklist")
