param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4035 Jarvis Video Trial Result Review Recovery Product IA Link Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-product-ia-link-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-product-ia-link-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-product-ia-link-wiring' -Phase 'Phase 4035' -Title 'Jarvis Video Trial Result Review Recovery Product IA Link Wiring'
