param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4023 Jarvis Video Trial Result Review Recovery Fallback Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-fallback-review-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-fallback-review-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-fallback-review-wiring' -Phase 'Phase 4023' -Title 'Jarvis Video Trial Result Review Recovery Fallback Review Wiring'
