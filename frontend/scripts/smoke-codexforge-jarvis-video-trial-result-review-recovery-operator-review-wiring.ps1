param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4039 Jarvis Video Trial Result Review Recovery Operator Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-operator-review-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-operator-review-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-operator-review-wiring' -Phase 'Phase 4039' -Title 'Jarvis Video Trial Result Review Recovery Operator Review Wiring'
