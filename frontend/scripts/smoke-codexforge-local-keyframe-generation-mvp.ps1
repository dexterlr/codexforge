param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Keyframe Generation MVP" `
  -ScriptFile "smoke-codexforge-local-keyframe-generation-mvp.ps1" `
  -Domain "src\lib\codexforge\local-keyframe-generation-mvp" `
  -Route "src\app\local-keyframes" `
  -MainPanel "LocalKeyframeGenerationMvpPanel" `
  -CommandLabel "Go to Local Keyframes MVP" `
  -Modules @("local-keyframe-generation-types.ts","keyframe-generation-request.ts","keyframe-generation-plan-review.ts","keyframe-generation-readiness.ts","keyframe-generation-safety.ts","keyframe-generation-result.ts","keyframe-generation-handoff.ts","keyframe-generation-summary.ts","index.ts") `
  -Components @("LocalKeyframeGenerationMvpPanel.tsx","KeyframeGenerationRequestPanel.tsx","KeyframeGenerationPlanReviewPanel.tsx","KeyframeGenerationReadinessPanel.tsx","KeyframeGenerationSafetyPanel.tsx","KeyframeGenerationResultPanel.tsx","KeyframeGenerationHandoffPanel.tsx","KeyframeGenerationSummaryPanel.tsx","KeyframeGenerationSafetyStrip.tsx","KeyframeGenerationEmptyState.tsx","index.ts") `
  -Exports @("buildKeyframeGenerationRequest","buildDefaultKeyframeGenerationRequest","buildKeyframeGenerationPlanReview","buildKeyframeGenerationReadiness","buildKeyframeGenerationSafety","buildKeyframeGenerationResult","buildKeyframeGenerationHandoff","buildKeyframeGenerationSummary","summarizeLocalKeyframeGeneration") `
  -PlainEnglish @("Local keyframes MVP","Prepare keyframe image requests that guide a future video draft.","Review keyframe request","keyframe plan id","selected shots","prompt set","consistency notes","local image workflow package","artifact destination","approval status","execution posture","no-auto-run guarantee","keyframes are still frames","needs-prompt","needs-workflow","needs-safety-review","needs-approval","request-ready","blocked-no-executor","result-supplied","unknown","not-generated","supplied-preview","approved-boundary-result","failed-supplied","blocked","Copy keyframe request allowed","Capture supplied keyframes allowed","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button") `
  -ExtraRoutes @("/keyframes","/local-image","/storyboard","/local-draft-review","/video-artifacts","/local-video-draft","/video-capture")
