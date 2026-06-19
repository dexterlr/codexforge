param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 869 Model Credential Boundary Preview" `
  -ScriptFile "smoke-codexforge-model-credential-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\model-credential-boundary-preview" `
  -Route "src\app\model-credential-boundary-preview" `
  -MainPanel "ModelCredentialBoundaryPreviewPanel" `
  -CommandLabel "Go to Model Credential Boundary Preview" `
  -Modules @("model-credential-boundary-preview-model.ts", "index.ts") `
  -Components @("ModelCredentialBoundaryPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelCredentialBoundaryPreviewStableKey", "buildModelCredentialBoundaryPreview", "buildModelCredentialBoundaryPreviewItems", "buildModelCredentialBoundaryPreviewBoundary", "buildModelCredentialBoundaryPreviewModel", "summarizeModelCredentialBoundaryPreview", "MODEL_CREDENTIAL_BOUNDARY_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model credential boundary preview", "Model credential boundary preview does not read credentials", "Credential access requires explicit operator approval", "Model credentials are never displayed or stored in browser storage", "Denied credential paths remain blocked", "Model credential boundary checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model credential boundary preview does not read credentials", "Credential access requires explicit operator approval", "Denied credential paths remain blocked") `
  -RouteHref "/model-credential-boundary-preview"

Write-Host "[OK] CodexForge Phase 869 Model credential boundary preview smoke passed."
