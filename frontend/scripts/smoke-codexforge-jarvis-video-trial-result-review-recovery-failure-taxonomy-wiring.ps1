param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4020 Jarvis Video Trial Result Review Recovery Failure Taxonomy Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-failure-taxonomy-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-failure-taxonomy-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-failure-taxonomy-wiring' -Phase 'Phase 4020' -Title 'Jarvis Video Trial Result Review Recovery Failure Taxonomy Wiring'
