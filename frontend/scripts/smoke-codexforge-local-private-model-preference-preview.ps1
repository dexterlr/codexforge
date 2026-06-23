param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1532 Local Private Model Preference Preview" `
  -ScriptFile "smoke-codexforge-local-private-model-preference-preview.ps1" `
  -Domain "src\lib\codexforge\local-private-model-preference-preview" `
  -Route "src\app\local-private-model-preference-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Local Private Model Preference Preview" `
  -RouteHref "/local-private-model-preference-preview" `
  -Markers @("Local private model preference preview", "Local private model preference preview does not call local models from the UI", "Local private model preference preview requires explicit operator approval", "Local private model preference prioritizes private local execution when capability fit and context sensitivity require it", "Denied local private model paths remain blocked", "Local private model preference checklist")
