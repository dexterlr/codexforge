param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 818 Project Scaffold Backend Adapter Preview" `
  -ScriptFile "smoke-codexforge-project-scaffold-backend-adapter-preview.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-backend-adapter-preview" `
  -Route "src\app\project-scaffold-backend-adapter-preview" `
  -MainPanel "ProjectScaffoldBackendAdapterPreviewPanel" `
  -CommandLabel "Go to Project Scaffold Backend Adapter Preview" `
  -Modules @("project-scaffold-backend-adapter-preview-model.ts", "index.ts") `
  -Components @("ProjectScaffoldBackendAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldBackendAdapterPreviewStableKey", "buildProjectScaffoldBackendAdapterPreview", "buildProjectScaffoldBackendAdapterPreviewItems", "buildProjectScaffoldBackendAdapterPreviewBoundary", "buildProjectScaffoldBackendAdapterPreviewModel", "summarizeProjectScaffoldBackendAdapterPreview", "PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project scaffold backend adapter preview", "Project scaffold backend adapter preview does not create projects", "Project scaffold creation requires explicit operator approval", "Denied scaffold paths remain blocked", "Project scaffold adapter groups", "Project scaffold preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project scaffold backend adapter preview does not create projects", "Project scaffold creation requires explicit operator approval", "Denied scaffold paths remain blocked") `
  -RouteHref "/project-scaffold-backend-adapter-preview"

Write-Host "[OK] CodexForge Phase 818 Project scaffold backend adapter preview smoke passed."
