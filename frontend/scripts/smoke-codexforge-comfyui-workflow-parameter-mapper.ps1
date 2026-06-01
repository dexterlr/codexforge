param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "ComfyUI Workflow Parameter Mapper" `
  -ScriptFile "smoke-codexforge-comfyui-workflow-parameter-mapper.ps1" `
  -Domain "src\lib\codexforge\comfyui-workflow-parameter-mapper" `
  -Route "src\app\comfyui-workflows\parameters" `
  -MainPanel "ComfyUiWorkflowParameterMapperPanel" `
  -CommandLabel "Go to Workflow Parameters" `
  -Modules @("workflow-parameter-types.ts","workflow-parameter.ts","workflow-parameter-group.ts","workflow-parameter-safety.ts","workflow-parameter-preset.ts","workflow-parameter-mapping.ts","workflow-parameter-handoff.ts","workflow-parameter-summary.ts","index.ts") `
  -Components @("ComfyUiWorkflowParameterMapperPanel.tsx","WorkflowParameterPanel.tsx","WorkflowParameterGroupPanel.tsx","WorkflowParameterSafetyPanel.tsx","WorkflowParameterPresetPanel.tsx","WorkflowParameterMappingPanel.tsx","WorkflowParameterHandoffPanel.tsx","WorkflowParameterSummaryPanel.tsx","WorkflowParameterMapperSafetyStrip.tsx","WorkflowParameterMapperEmptyState.tsx","index.ts") `
  -Exports @("buildWorkflowParameter","buildDefaultWorkflowParameters","buildWorkflowParameterGroup","buildWorkflowParameterSafety","buildWorkflowParameterPreset","buildWorkflowParameterMapping","buildWorkflowParameterHandoff","buildWorkflowParameterSummary","summarizeWorkflowParameterMapping") `
  -PlainEnglish @("Workflow parameters","Turn technical workflow settings into safe, understandable choices.","Map parameters","safe editable","review before edit","blocked for first run","Copy parameter plan allowed","Workflow mutation blocked") `
  -ExtraRoutes @("/comfyui-workflows/safety","/comfyui-jobs/package","/video-prompt","/keyframes")
