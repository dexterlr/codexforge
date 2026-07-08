param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4028 Jarvis Video Trial Result Review Recovery Export Publish Blocker Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-export-publish-blocker-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-export-publish-blocker-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-export-publish-blocker-wiring' -Phase 'Phase 4028' -Title 'Jarvis Video Trial Result Review Recovery Export Publish Blocker Wiring'
