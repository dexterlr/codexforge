param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4029 Jarvis Video Trial Result Review Recovery Operator Acceptance Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-operator-acceptance-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-operator-acceptance-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-operator-acceptance-wiring' -Phase 'Phase 4029' -Title 'Jarvis Video Trial Result Review Recovery Operator Acceptance Wiring'
