param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1446 Model Tool Handoff Preview" `
  -ScriptFile "smoke-codexforge-model-tool-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\model-tool-handoff-preview" `
  -Route "src\app\model-tool-handoff-preview" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Model Tool Handoff Preview" `
  -RouteHref "/model-tool-handoff-preview" `
  -Markers @("Model tool handoff preview", "Model tool handoff preview does not call models providers connectors or tools", "Model tool handoff preview requires explicit operator approval", "Model tool handoff preview explains local private cheapest capable paid pro specialist and domain-fit routing handoff without executing calls", "Denied model tool handoff paths remain blocked", "Model tool handoff checklist")
