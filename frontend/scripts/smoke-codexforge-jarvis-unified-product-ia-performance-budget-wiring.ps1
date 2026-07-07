$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3939 Jarvis Unified Product IA Performance Budget Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-performance-budget-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Performance Budget Wiring' -RouteHref '/jarvis-unified-product-ia-performance-budget-wiring' -Phase 'Phase 3939' -Title 'Jarvis Unified Product IA Performance Budget Wiring'