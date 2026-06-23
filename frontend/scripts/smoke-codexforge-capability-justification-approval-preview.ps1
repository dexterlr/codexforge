param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1553 Capability Justification Approval Preview" `
  -ScriptFile "smoke-codexforge-capability-justification-approval-preview.ps1" `
  -Domain "src\lib\codexforge\capability-justification-approval-preview" `
  -Route "src\app\capability-justification-approval-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Capability Justification Approval Preview" `
  -RouteHref "/capability-justification-approval-preview" `
  -Markers @("Capability justification approval preview", "Capability justification approval preview does not call models", "Capability justification approval preview requires explicit operator approval", "Capability justification approval preview explains capability gap domain fit cheaper alternatives local alternatives privacy tradeoff cost class and expected benefit", "Denied capability justification paths remain blocked", "Capability justification approval checklist")
