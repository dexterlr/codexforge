param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 956 Project Domain Classifier Preview" `
  -ScriptFile "smoke-codexforge-project-domain-classifier-preview.ps1" `
  -Domain "src\lib\codexforge\project-domain-classifier-preview" `
  -Route "src\app\project-domain-classifier-preview" `
  -MainPanel "ProjectDomainClassifierPreviewPanel" `
  -CommandLabel "Go to Project Domain Classifier Preview" `
  -Modules @("project-domain-classifier-preview-model.ts", "index.ts") `
  -Components @("ProjectDomainClassifierPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectDomainClassifierPreviewStableKey", "buildProjectDomainClassifierPreview", "buildProjectDomainClassifierPreviewItems", "buildProjectDomainClassifierPreviewBoundary", "buildProjectDomainClassifierPreviewModel", "summarizeProjectDomainClassifierPreview", "PROJECT_DOMAIN_CLASSIFIER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project domain classifier preview", "Project domain classifier preview does not call models", "Domain classification requires explicit operator approval", "Project domains drive model and adapter selection", "Denied project domain classification paths remain blocked", "Project domain classifier checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project domain classifier preview does not call models", "Domain classification requires explicit operator approval", "Denied project domain classification paths remain blocked") `
  -RouteHref "/project-domain-classifier-preview"

Write-Host "[OK] CodexForge Phase 956 Project domain classifier preview smoke passed."
