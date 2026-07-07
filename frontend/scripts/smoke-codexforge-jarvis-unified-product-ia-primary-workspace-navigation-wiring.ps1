$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3919 Jarvis Unified Product IA Primary Workspace Navigation Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-primary-workspace-navigation-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Primary Workspace Navigation Wiring' -RouteHref '/jarvis-unified-product-ia-primary-workspace-navigation-wiring' -Phase 'Phase 3919' -Title 'Jarvis Unified Product IA Primary Workspace Navigation Wiring'