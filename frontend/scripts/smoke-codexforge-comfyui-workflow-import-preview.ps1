param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "ComfyUI Workflow Import Preview" `
  -ScriptFile "smoke-codexforge-comfyui-workflow-import-preview.ps1" `
  -Domain "src\lib\codexforge\comfyui-workflow-import-preview" `
  -Route "src\app\comfyui-workflows\import" `
  -MainPanel "ComfyUiWorkflowImportPreviewPanel" `
  -CommandLabel "Go to ComfyUI Workflow Import" `
  -Modules @("comfyui-workflow-import-types.ts","comfyui-workflow-source.ts","comfyui-workflow-import-plan.ts","comfyui-workflow-node-summary.ts","comfyui-workflow-asset-reference.ts","comfyui-workflow-import-safety.ts","comfyui-workflow-import-handoff.ts","comfyui-workflow-import-summary.ts","index.ts") `
  -Components @("ComfyUiWorkflowImportPreviewPanel.tsx","ComfyUiWorkflowSourcePanel.tsx","ComfyUiWorkflowImportPlanPanel.tsx","ComfyUiWorkflowNodeSummaryPanel.tsx","ComfyUiWorkflowAssetReferencePanel.tsx","ComfyUiWorkflowImportSafetyPanel.tsx","ComfyUiWorkflowImportHandoffPanel.tsx","ComfyUiWorkflowImportSummaryPanel.tsx","ComfyUiWorkflowImportSafetyStrip.tsx","ComfyUiWorkflowImportEmptyState.tsx","index.ts") `
  -Exports @("buildComfyUiWorkflowSource","buildDefaultComfyUiWorkflowSources","buildComfyUiWorkflowImportPlan","buildComfyUiWorkflowNodeSummary","buildComfyUiWorkflowAssetReference","buildComfyUiWorkflowImportSafety","buildComfyUiWorkflowImportHandoff","buildComfyUiWorkflowImportSummary","summarizeComfyUiWorkflowImport") `
  -PlainEnglish @("Import ComfyUI workflow","Preview a workflow safely before using it.","Review workflow import","A ComfyUI workflow is a saved recipe","Copy import handoff allowed","Raw JSON preview","No file upload parser","No ComfyUI API call") `
  -ExtraRoutes @("/comfyui-workflows/safety","/comfyui-workflows/parameters","/comfyui-jobs/package")
