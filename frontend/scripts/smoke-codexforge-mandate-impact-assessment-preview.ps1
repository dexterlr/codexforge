param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1823 Mandate Impact Assessment Preview"
  ScriptFile = "smoke-codexforge-mandate-impact-assessment-preview.ps1"
  Domain = "src\lib\codexforge\mandate-impact-assessment-preview"
  Route = "src\app\mandate-impact-assessment-preview"
  CommandLabel = "Go to Mandate Impact Assessment Preview"
  RouteHref = "/mandate-impact-assessment-preview"
  Markers = @("Mandate impact assessment preview", "Mandate impact assessment preview does not change trading mandate approved symbols approved strategies or capital rules from the UI", "Mandate impact assessment preview requires backend-owned mandate review workflow", "Mandate impact assessment preview shows simulated mandate fit simulated approved universe impact simulated strategy class impact simulated capital rule impact simulated evidence requirement and denied frontend mutation", "Denied mandate impact assessment paths remain blocked", "Mandate impact assessment checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params