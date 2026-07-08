param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4040 Jarvis Video Trial Result Review Recovery Readiness Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-readiness-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-readiness-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-readiness-wiring' -Phase 'Phase 4040' -Title 'Jarvis Video Trial Result Review Recovery Readiness Wiring'
