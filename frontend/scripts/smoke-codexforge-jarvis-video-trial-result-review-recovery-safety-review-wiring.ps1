param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4014 Jarvis Video Trial Result Review Recovery Safety Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-safety-review-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-safety-review-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-safety-review-wiring' -Phase 'Phase 4014' -Title 'Jarvis Video Trial Result Review Recovery Safety Review Wiring'
