param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4030 Jarvis Video Trial Result Review Recovery Disabled Promotion Lane Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-disabled-promotion-lane-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-disabled-promotion-lane-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-disabled-promotion-lane-wiring' -Phase 'Phase 4030' -Title 'Jarvis Video Trial Result Review Recovery Disabled Promotion Lane Wiring'
