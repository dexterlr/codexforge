param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 836 Model Capability Registry Preview" `
  -ScriptFile "smoke-codexforge-model-capability-registry-preview.ps1" `
  -Domain "src\lib\codexforge\model-capability-registry-preview" `
  -Route "src\app\model-capability-registry-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Model Capability Registry Preview" `
  -RouteHref "/model-capability-registry-preview" `
  -Markers @("Model capability registry preview", "Model capability registry preview does not query providers", "Model capability registry preview requires explicit operator approval before provider use", "Model capability registry previews coding reasoning research creative image video local private paid pro specialist and domain-fit capabilities", "Denied model capability registry paths remain blocked", "Model capability registry checklist")
