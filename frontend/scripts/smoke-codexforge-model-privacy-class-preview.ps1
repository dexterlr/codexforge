param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1536 Model Privacy Class Preview" `
  -ScriptFile "smoke-codexforge-model-privacy-class-preview.ps1" `
  -Domain "src\lib\codexforge\model-privacy-class-preview" `
  -Route "src\app\model-privacy-class-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Model Privacy Class Preview" `
  -RouteHref "/model-privacy-class-preview" `
  -Markers @("Model privacy class preview", "Model privacy class preview does not send private content to providers", "Model privacy class preview requires explicit operator approval", "Model privacy class preview shows local-only private project-sensitive provider-allowed and blocked privacy classes", "Denied model privacy paths remain blocked", "Model privacy class checklist")
