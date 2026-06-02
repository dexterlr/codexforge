param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Video Draft MVP" `
  -ScriptFile "smoke-codexforge-local-video-draft-mvp.ps1" `
  -Domain "src\lib\codexforge\local-video-draft-mvp" `
  -Route "src\app\local-video-draft" `
  -MainPanel "LocalVideoDraftMvpPanel" `
  -CommandLabel "Go to Local Video Draft MVP" `
  -Modules @("local-video-draft-types.ts","video-draft-request.ts","video-draft-input-review.ts","video-draft-readiness.ts","video-draft-safety.ts","video-draft-result.ts","video-draft-handoff.ts","video-draft-summary.ts","index.ts") `
  -Components @("LocalVideoDraftMvpPanel.tsx","VideoDraftRequestPanel.tsx","VideoDraftInputReviewPanel.tsx","VideoDraftReadinessPanel.tsx","VideoDraftSafetyPanel.tsx","VideoDraftResultPanel.tsx","VideoDraftHandoffPanel.tsx","VideoDraftSummaryPanel.tsx","VideoDraftSafetyStrip.tsx","VideoDraftEmptyState.tsx","index.ts") `
  -Exports @("buildVideoDraftRequest","buildDefaultVideoDraftRequest","buildVideoDraftInputReview","buildVideoDraftReadiness","buildVideoDraftSafety","buildVideoDraftResult","buildVideoDraftHandoff","buildVideoDraftSummary","summarizeLocalVideoDraft") `
  -PlainEnglish @("Local video draft MVP","Prepare a short local video draft request before anything renders.","Review draft request","prompt","storyboard","keyframes","workflow package","target duration","target resolution","local provider","artifact destination","render queue posture","approval status","execution posture","no-auto-run guarantee","needs-prompt","needs-storyboard","needs-keyframes","needs-workflow-package","needs-safety-review","needs-dry-run","needs-submit-boundary","request-ready","blocked-no-executor","result-supplied","unknown","not-generated","supplied-preview","approved-boundary-result","failed-supplied","blocked","Copy draft request allowed","Capture supplied draft allowed","local draft first, final later","no render button","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button") `
  -ExtraRoutes @("/local-draft-review","/local-keyframes","/video-jobs","/render-queue","/video-review","/video-capture")
