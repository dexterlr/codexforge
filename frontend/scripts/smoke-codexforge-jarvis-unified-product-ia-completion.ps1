$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3945 Jarvis Unified Product IA Completion' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-completion' -CommandLabel 'Go to Jarvis Unified Product IA Completion' -RouteHref '/jarvis-unified-product-ia-completion' -Phase 'Phase 3945' -Title 'Jarvis Unified Product IA Completion'