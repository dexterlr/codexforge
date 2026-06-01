param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "Video Result Review Inbox" `
  -ScriptFile "smoke-codexforge-video-result-review-inbox.ps1" `
  -Domain "src\lib\codexforge\video-result-review-inbox" `
  -Route "src\app\video-review" `
  -MainPanel "VideoResultReviewInboxPanel" `
  -CommandLabel "Go to Video Review" `
  -Modules @("video-review-inbox-types.ts","video-review-item.ts","video-review-filter.ts","video-review-decision.ts","video-review-next-action.ts","video-review-handoff.ts","video-review-inbox-summary.ts","index.ts") `
  -Components @("VideoResultReviewInboxPanel.tsx","VideoReviewItemPanel.tsx","VideoReviewFilterPanel.tsx","VideoReviewDecisionPanel.tsx","VideoReviewNextActionPanel.tsx","VideoReviewHandoffPanel.tsx","VideoReviewInboxSummaryPanel.tsx","VideoReviewInboxSafetyStrip.tsx","VideoReviewInboxEmptyState.tsx","index.ts") `
  -Exports @("buildVideoReviewItem","buildDefaultVideoReviewItems","buildVideoReviewFilter","filterVideoReviewItems","buildVideoReviewDecision","selectVideoReviewNextAction","buildVideoReviewHandoff","buildVideoReviewInboxSummary","summarizeVideoReviewInbox") `
  -PlainEnglish @("Video review","Review drafts, choose what to keep, and decide the next step.","Review next video","keep","retry prompt","compare","send to recovery","Copy review note allowed") `
  -ExtraRoutes @("/video-artifacts","/video-recovery","/video-compare","/video-jobs")
