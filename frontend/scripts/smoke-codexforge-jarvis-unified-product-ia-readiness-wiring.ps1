$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3944 Jarvis Unified Product IA Readiness Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-readiness-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Readiness Wiring' -RouteHref '/jarvis-unified-product-ia-readiness-wiring' -Phase 'Phase 3944' -Title 'Jarvis Unified Product IA Readiness Wiring'