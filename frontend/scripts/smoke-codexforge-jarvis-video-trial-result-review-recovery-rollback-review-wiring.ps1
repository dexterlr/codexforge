param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4026 Jarvis Video Trial Result Review Recovery Rollback Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-rollback-review-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-rollback-review-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-rollback-review-wiring' -Phase 'Phase 4026' -Title 'Jarvis Video Trial Result Review Recovery Rollback Review Wiring'
