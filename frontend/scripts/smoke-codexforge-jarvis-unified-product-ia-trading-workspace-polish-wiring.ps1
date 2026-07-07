$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\codexforge-jarvis-unified-product-ia-smoke-helper.ps1"

Invoke-CodexForgeJarvisUnifiedProductIaSmoke -SmokeName 'Phase 3921 Jarvis Unified Product IA Trading Workspace Polish Wiring' -ScriptFile $MyInvocation.MyCommand.Name -Route 'jarvis-unified-product-ia-trading-workspace-polish-wiring' -CommandLabel 'Go to Jarvis Unified Product IA Trading Workspace Polish Wiring' -RouteHref '/jarvis-unified-product-ia-trading-workspace-polish-wiring' -Phase 'Phase 3921' -Title 'Jarvis Unified Product IA Trading Workspace Polish Wiring'