param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 881 Model Health Probe Preview" `
  -ScriptFile "smoke-codexforge-model-health-probe-preview.ps1" `
  -Domain "src\lib\codexforge\model-health-probe-preview" `
  -Route "src\app\model-health-probe-preview" `
  -MainPanel "ModelHealthProbePreviewPanel" `
  -CommandLabel "Go to Model Health Probe Preview" `
  -Modules @("model-health-probe-preview-model.ts", "index.ts") `
  -Components @("ModelHealthProbePreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelHealthProbePreviewStableKey", "buildModelHealthProbePreview", "buildModelHealthProbePreviewItems", "buildModelHealthProbePreviewBoundary", "buildModelHealthProbePreviewModel", "summarizeModelHealthProbePreview", "MODEL_HEALTH_PROBE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model health probe preview", "Model health probe preview does not probe live models", "Model health probes require explicit operator approval", "Health status remains preview-only until approved", "Denied health probe paths remain blocked", "Model health checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model health probe preview does not probe live models", "Model health probes require explicit operator approval", "Denied health probe paths remain blocked") `
  -RouteHref "/model-health-probe-preview"

Write-Host "[OK] CodexForge Phase 881 Model health probe preview smoke passed."
