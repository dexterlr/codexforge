param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1573 Local Evidence Capture Preview" `
  -ScriptFile "smoke-codexforge-local-evidence-capture-preview.ps1" `
  -Domain "src\lib\codexforge\local-evidence-capture-preview" `
  -Route "src\app\local-evidence-capture-preview" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Local Evidence Capture Preview" `
  -RouteHref "/local-evidence-capture-preview" `
  -Markers @("Local evidence capture preview", "Local evidence capture preview does not persist evidence from the UI", "Local evidence capture preview requires backend-owned evidence capture", "Local evidence capture preview shows local request prompt payload redaction approval runtime class model class response reference fallback and audit linkage", "Denied local evidence paths remain blocked", "Local evidence capture checklist")
