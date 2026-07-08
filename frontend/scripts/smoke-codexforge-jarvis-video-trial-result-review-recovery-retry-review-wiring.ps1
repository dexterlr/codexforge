param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4022 Jarvis Video Trial Result Review Recovery Retry Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-retry-review-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-retry-review-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-retry-review-wiring' -Phase 'Phase 4022' -Title 'Jarvis Video Trial Result Review Recovery Retry Review Wiring'
