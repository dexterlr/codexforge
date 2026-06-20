param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 946 Project Scaffold Model-Routed Execution Preview" `
  -ScriptFile "smoke-codexforge-project-scaffold-model-routed-execution-preview.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-model-routed-execution-preview" `
  -Route "src\app\project-scaffold-model-routed-execution-preview" `
  -MainPanel "ProjectScaffoldModelRoutedExecutionPreviewPanel" `
  -CommandLabel "Go to Project Scaffold Model-Routed Execution Preview" `
  -Modules @("project-scaffold-model-routed-execution-preview-model.ts", "index.ts") `
  -Components @("ProjectScaffoldModelRoutedExecutionPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldModelRoutedExecutionPreviewStableKey", "buildProjectScaffoldModelRoutedExecutionPreview", "buildProjectScaffoldModelRoutedExecutionPreviewItems", "buildProjectScaffoldModelRoutedExecutionPreviewBoundary", "buildProjectScaffoldModelRoutedExecutionPreviewModel", "summarizeProjectScaffoldModelRoutedExecutionPreview", "PROJECT_SCAFFOLD_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project scaffold model-routed execution preview", "Project scaffold model-routed execution preview does not scaffold projects", "Project scaffold execution requires explicit operator approval", "Scaffold proposals include model selection rationale", "Denied project scaffold execution paths remain blocked", "Project scaffold model-routed checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project scaffold model-routed execution preview does not scaffold projects", "Project scaffold execution requires explicit operator approval", "Denied project scaffold execution paths remain blocked") `
  -RouteHref "/project-scaffold-model-routed-execution-preview"

Write-Host "[OK] CodexForge Phase 946 Project scaffold model-routed execution preview smoke passed."
