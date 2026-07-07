$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3941 Jarvis Unified Product IA Regression Coverage Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-regression-coverage-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Regression Coverage Wiring' -RouteHref '/jarvis-unified-product-ia-regression-coverage-wiring' -Phase 'Phase 3941' -Title 'Jarvis Unified Product IA Regression Coverage Wiring'