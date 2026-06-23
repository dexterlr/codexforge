param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1537 Model Cost Class Preview" `
  -ScriptFile "smoke-codexforge-model-cost-class-preview.ps1" `
  -Domain "src\lib\codexforge\model-cost-class-preview" `
  -Route "src\app\model-cost-class-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Model Cost Class Preview" `
  -RouteHref "/model-cost-class-preview" `
  -Markers @("Model cost class preview", "Model cost class preview does not spend tokens or call providers", "Model cost class preview requires explicit operator approval", "Model cost class preview shows free local low cost paid pro specialist unknown and blocked cost classes", "Denied model cost paths remain blocked", "Model cost class checklist")
