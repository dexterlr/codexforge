param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4010 Jarvis Video Trial Result Review Recovery Boundary Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-boundary-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-boundary-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-boundary-wiring' -Phase 'Phase 4010' -Title 'Jarvis Video Trial Result Review Recovery Boundary Wiring'
