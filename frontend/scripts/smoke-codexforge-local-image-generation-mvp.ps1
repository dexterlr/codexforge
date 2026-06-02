param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Image Generation MVP" `
  -ScriptFile "smoke-codexforge-local-image-generation-mvp.ps1" `
  -Domain "src\lib\codexforge\local-image-generation-mvp" `
  -Route "src\app\local-image" `
  -MainPanel "LocalImageGenerationMvpPanel" `
  -CommandLabel "Go to Local Image MVP" `
  -Modules @("local-image-generation-types.ts","image-generation-request.ts","image-generation-prompt.ts","image-generation-readiness.ts","image-generation-safety.ts","image-generation-result.ts","image-generation-handoff.ts","image-generation-summary.ts","index.ts") `
  -Components @("LocalImageGenerationMvpPanel.tsx","ImageGenerationRequestPanel.tsx","ImageGenerationPromptPanel.tsx","ImageGenerationReadinessPanel.tsx","ImageGenerationSafetyPanel.tsx","ImageGenerationResultPanel.tsx","ImageGenerationHandoffPanel.tsx","ImageGenerationSummaryPanel.tsx","ImageGenerationSafetyStrip.tsx","ImageGenerationEmptyState.tsx","index.ts") `
  -Exports @("buildImageGenerationRequest","buildDefaultImageGenerationRequest","buildImageGenerationPrompt","buildImageGenerationReadiness","buildImageGenerationSafety","buildImageGenerationResult","buildImageGenerationHandoff","buildImageGenerationSummary","summarizeLocalImageGeneration") `
  -PlainEnglish @("Local image MVP","Prepare and review a local image request before anything generates.","Review image request","prompt","negative prompt","style","size target","local provider","workflow package","artifact destination","approval status","execution posture","no-auto-run guarantee","needs-prompt","needs-workflow","needs-safety-review","needs-approval","request-ready","blocked-no-executor","result-supplied","unknown","not-generated","supplied-preview","approved-boundary-result","failed-supplied","blocked","Copy image request allowed","Capture supplied result allowed","nothing runs automatically","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button") `
  -ExtraRoutes @("/video-prompt","/keyframes","/comfyui-submit","/video-artifacts","/local-keyframes","/video-capture")
