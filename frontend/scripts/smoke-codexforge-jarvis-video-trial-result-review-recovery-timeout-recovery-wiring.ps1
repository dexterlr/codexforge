param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4024 Jarvis Video Trial Result Review Recovery Timeout Recovery Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-timeout-recovery-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-timeout-recovery-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-timeout-recovery-wiring' -Phase 'Phase 4024' -Title 'Jarvis Video Trial Result Review Recovery Timeout Recovery Wiring'
