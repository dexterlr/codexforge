param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1431 Model Tool Routing Hint Preview" `
  -ScriptFile "smoke-codexforge-model-tool-routing-hint-preview.ps1" `
  -Domain "src\lib\codexforge\model-tool-routing-hint-preview" `
  -Route "src\app\model-tool-routing-hint-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Model Tool Routing Hint Preview" `
  -RouteHref "/model-tool-routing-hint-preview" `
  -Markers @("Model tool routing hint preview", "Model tool routing hint preview does not call models providers or tools", "Model tool routing hint preview requires explicit operator approval", "Model tool routing hint preview explains cheapest capable local private paid pro specialist and domain-fit routing hints without executing calls", "Denied model tool routing hint paths remain blocked", "Model tool routing hint checklist")
