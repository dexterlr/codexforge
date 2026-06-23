param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-provider-approval-gate-smoke-helper.ps1") `
  -SmokeName "Phase 1557 Provider Evidence Capture Preview" `
  -ScriptFile "smoke-codexforge-provider-evidence-capture-preview.ps1" `
  -Domain "src\lib\codexforge\provider-evidence-capture-preview" `
  -Route "src\app\provider-evidence-capture-preview" `
  -MainPanel "ProviderApprovalGateRoutePanel" `
  -CommandLabel "Go to Provider Evidence Capture Preview" `
  -RouteHref "/provider-evidence-capture-preview" `
  -Markers @("Provider evidence capture preview", "Provider evidence capture preview does not persist evidence from the UI", "Provider evidence capture preview requires backend-owned evidence capture", "Provider evidence capture preview shows provider request prompt payload redaction approval provider class model class response reference and audit linkage", "Denied provider evidence paths remain blocked", "Provider evidence capture checklist")
