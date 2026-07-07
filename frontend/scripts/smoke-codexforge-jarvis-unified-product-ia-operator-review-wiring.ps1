$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3943 Jarvis Unified Product IA Operator Review Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-operator-review-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Operator Review Wiring' -RouteHref '/jarvis-unified-product-ia-operator-review-wiring' -Phase 'Phase 3943' -Title 'Jarvis Unified Product IA Operator Review Wiring'