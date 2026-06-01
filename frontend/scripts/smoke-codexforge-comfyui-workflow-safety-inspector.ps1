param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "ComfyUI Workflow Safety Inspector" `
  -ScriptFile "smoke-codexforge-comfyui-workflow-safety-inspector.ps1" `
  -Domain "src\lib\codexforge\comfyui-workflow-safety-inspector" `
  -Route "src\app\comfyui-workflows\safety" `
  -MainPanel "ComfyUiWorkflowSafetyInspectorPanel" `
  -CommandLabel "Go to Workflow Safety" `
  -Modules @("comfyui-workflow-safety-types.ts","workflow-safety-check.ts","workflow-node-risk.ts","workflow-asset-risk.ts","workflow-resource-risk.ts","workflow-output-risk.ts","workflow-safety-decision.ts","workflow-safety-handoff.ts","workflow-safety-summary.ts","index.ts") `
  -Components @("ComfyUiWorkflowSafetyInspectorPanel.tsx","WorkflowSafetyCheckPanel.tsx","WorkflowNodeRiskPanel.tsx","WorkflowAssetRiskPanel.tsx","WorkflowResourceRiskPanel.tsx","WorkflowOutputRiskPanel.tsx","WorkflowSafetyDecisionPanel.tsx","WorkflowSafetyHandoffPanel.tsx","WorkflowSafetySummaryPanel.tsx","WorkflowSafetyInspectorSafetyStrip.tsx","WorkflowSafetyInspectorEmptyState.tsx","index.ts") `
  -Exports @("buildWorkflowSafetyCheck","buildDefaultWorkflowSafetyChecks","buildWorkflowNodeRisk","buildWorkflowAssetRisk","buildWorkflowResourceRisk","buildWorkflowOutputRisk","buildWorkflowSafetyDecision","buildWorkflowSafetyHandoff","buildWorkflowSafetySummary","summarizeWorkflowSafety") `
  -PlainEnglish @("Workflow safety","Check a ComfyUI workflow before any render is allowed.","Inspect workflow safety","unknown custom nodes","missing models","risky output path","approval required","No render button") `
  -ExtraRoutes @("/comfyui-workflows/import","/comfyui-workflows/parameters","/video-recovery")
