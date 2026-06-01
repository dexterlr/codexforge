param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "ComfyUI Job Package Builder" `
  -ScriptFile "smoke-codexforge-comfyui-job-package-builder.ps1" `
  -Domain "src\lib\codexforge\comfyui-job-package-builder" `
  -Route "src\app\comfyui-jobs\package" `
  -MainPanel "ComfyUiJobPackageBuilderPanel" `
  -CommandLabel "Go to ComfyUI Job Package" `
  -Modules @("comfyui-job-package-types.ts","comfyui-job-package.ts","comfyui-job-input.ts","comfyui-job-parameter-set.ts","comfyui-job-artifact-plan.ts","comfyui-job-approval-check.ts","comfyui-job-package-handoff.ts","comfyui-job-package-summary.ts","index.ts") `
  -Components @("ComfyUiJobPackageBuilderPanel.tsx","ComfyUiJobPackagePanel.tsx","ComfyUiJobInputPanel.tsx","ComfyUiJobParameterSetPanel.tsx","ComfyUiJobArtifactPlanPanel.tsx","ComfyUiJobApprovalCheckPanel.tsx","ComfyUiJobPackageHandoffPanel.tsx","ComfyUiJobPackageSummaryPanel.tsx","ComfyUiJobPackageSafetyStrip.tsx","ComfyUiJobPackageEmptyState.tsx","index.ts") `
  -Exports @("buildComfyUiJobPackage","buildDefaultComfyUiJobPackage","buildComfyUiJobInput","buildComfyUiJobParameterSet","buildComfyUiJobArtifactPlan","buildComfyUiJobApprovalCheck","buildComfyUiJobPackageHandoff","buildComfyUiJobPackageSummary","summarizeComfyUiJobPackage") `
  -PlainEnglish @("ComfyUI job package","Prepare a reviewed local video job before anything renders.","Build job package","prompt ready","parameters mapped","artifact destination planned","no-auto-run guarantee","Copy package handoff allowed") `
  -ExtraRoutes @("/comfyui-workflows/parameters","/video-jobs","/video-artifacts","/comfyui-health")
