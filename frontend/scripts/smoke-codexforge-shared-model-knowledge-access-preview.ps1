param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 844 Shared Model Knowledge Access Preview" `
  -ScriptFile "smoke-codexforge-shared-model-knowledge-access-preview.ps1" `
  -Domain "src\lib\codexforge\shared-model-knowledge-access-preview" `
  -Route "src\app\shared-model-knowledge-access-preview" `
  -MainPanel "SharedModelKnowledgeAccessPreviewPanel" `
  -CommandLabel "Go to Shared Model Knowledge Access Preview" `
  -Modules @("shared-model-knowledge-access-preview-model.ts", "index.ts") `
  -Components @("SharedModelKnowledgeAccessPreviewPanel.tsx", "index.ts") `
  -Exports @("buildSharedModelKnowledgeAccessPreviewStableKey", "buildSharedModelKnowledgeAccessPreview", "buildSharedModelKnowledgeAccessPreviewItems", "buildSharedModelKnowledgeAccessPreviewBoundary", "buildSharedModelKnowledgeAccessPreviewModel", "summarizeSharedModelKnowledgeAccessPreview", "SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Shared model knowledge access preview", "Shared model knowledge access preview does not query live knowledge", "Knowledge access requires explicit operator approval", "Models share one CodexForge knowledge layer", "Denied knowledge access paths remain blocked", "Shared knowledge checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Shared model knowledge access preview does not query live knowledge", "Knowledge access requires explicit operator approval", "Denied knowledge access paths remain blocked") `
  -RouteHref "/shared-model-knowledge-access-preview"

Write-Host "[OK] CodexForge Phase 844 Shared model knowledge access preview smoke passed."
