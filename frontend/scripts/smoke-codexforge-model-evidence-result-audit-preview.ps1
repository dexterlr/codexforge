param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1542 Model Evidence Result Audit Preview" `
  -ScriptFile "smoke-codexforge-model-evidence-result-audit-preview.ps1" `
  -Domain "src\lib\codexforge\model-evidence-result-audit-preview" `
  -Route "src\app\model-evidence-result-audit-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Model Evidence Result Audit Preview" `
  -RouteHref "/model-evidence-result-audit-preview" `
  -Markers @("Model evidence result audit preview", "Model evidence result audit preview does not persist evidence results or audit from the UI", "Model evidence result audit preview requires backend-owned capture", "Model evidence result audit preview shows prompt payload approval provider model output result redaction evidence and audit references", "Denied model evidence result audit paths remain blocked", "Model evidence result audit checklist")
