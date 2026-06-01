param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "Video Draft Comparison Mode" `
  -ScriptFile "smoke-codexforge-video-draft-comparison-mode.ps1" `
  -Domain "src\lib\codexforge\video-draft-comparison-mode" `
  -Route "src\app\video-compare" `
  -MainPanel "VideoDraftComparisonModePanel" `
  -CommandLabel "Go to Video Compare" `
  -Modules @("video-draft-comparison-types.ts","video-draft-record.ts","video-draft-comparison.ts","video-draft-scorecard.ts","video-draft-difference.ts","video-draft-selection.ts","video-draft-comparison-handoff.ts","video-draft-comparison-summary.ts","index.ts") `
  -Components @("VideoDraftComparisonModePanel.tsx","VideoDraftRecordPanel.tsx","VideoDraftComparisonPanel.tsx","VideoDraftScorecardPanel.tsx","VideoDraftDifferencePanel.tsx","VideoDraftSelectionPanel.tsx","VideoDraftComparisonHandoffPanel.tsx","VideoDraftComparisonSummaryPanel.tsx","VideoDraftComparisonSafetyStrip.tsx","VideoDraftComparisonEmptyState.tsx","index.ts") `
  -Exports @("buildVideoDraftRecord","buildDefaultVideoDraftRecords","buildVideoDraftComparison","buildVideoDraftScorecard","buildVideoDraftDifference","buildVideoDraftSelection","buildVideoDraftComparisonHandoff","buildVideoDraftComparisonSummary","summarizeVideoDraftComparison") `
  -PlainEnglish @("Compare video drafts","Decide which draft to keep, retry, upscale, or finish.","Compare drafts","motion quality","visual quality","render cost/time posture","Copy comparison handoff allowed","No fake playback") `
  -ExtraRoutes @("/video-review","/video-artifacts","/video-recovery","/local-draft-review")
