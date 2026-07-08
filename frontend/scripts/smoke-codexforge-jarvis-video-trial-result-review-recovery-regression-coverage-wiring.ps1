param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4038 Jarvis Video Trial Result Review Recovery Regression Coverage Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-regression-coverage-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-regression-coverage-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-regression-coverage-wiring' -Phase 'Phase 4038' -Title 'Jarvis Video Trial Result Review Recovery Regression Coverage Wiring'
