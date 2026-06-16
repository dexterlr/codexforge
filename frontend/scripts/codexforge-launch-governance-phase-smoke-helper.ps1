param(
  [Parameter(Mandatory = $true)][string]$PhaseName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$MainPanel,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string[]]$Modules,
  [Parameter(Mandatory = $true)][string[]]$Components,
  [Parameter(Mandatory = $true)][string[]]$Exports,
  [Parameter(Mandatory = $true)][string[]]$PhaseMarkers,
  [Parameter(Mandatory = $true)][string[]]$PlainEnglish,
  [Parameter(Mandatory = $true)][string]$RouteHref
)

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/daily-beta-readiness-lock-audit",
  "/daily-beta-release-candidate-summary",
  "/codexforge-daily-beta-1-final-candidate",
  "/daily-beta-1-final-operator-review",
  "/daily-beta-1-final-regression-review",
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate",
  "/daily-beta-1-activation-final-gate",
  "/daily-beta-1-activation-controlled-trial",
  "/daily-beta-1-activation-feedback-review",
  "/daily-beta-1-activation-regression-review",
  "/daily-beta-1-activation-recovery-review",
  "/daily-beta-1-activation-hardening-pass",
  "/codexforge-daily-beta-1-activation-release-candidate",
  "/daily-beta-1-activation-readiness-lock",
  "/daily-beta-1-activation-lock-audit",
  "/daily-beta-1-release-handoff-final-review",
  "/daily-beta-1-launch-readiness-summary",
  "/daily-beta-1-launch-dry-run-review",
  "/daily-beta-1-launch-evidence-review",
  "/daily-beta-1-launch-result-review",
  "/codexforge-daily-beta-1-launch-candidate",
  "/daily-beta-1-launch-readiness-lock",
  "/launch-boundary-audit",
  "/launch-approval-packet",
  "/launch-go-no-go-review",
  "/launch-rollback-plan-review",
  "/launch-monitoring-plan-review",
  "/launch-support-runbook-review",
  "/codexforge-daily-beta-1-go-no-go-candidate",
  "/first-controlled-launch-plan",
  "/first-controlled-launch-review",
  "/first-controlled-launch-evidence-review",
  "/first-controlled-launch-result-review",
  "/first-controlled-launch-recovery-review",
  "/first-controlled-launch-hardening",
  "/daily-beta-1-controlled-launch-candidate",
  "/daily-beta-1-controlled-launch-handoff",
  "/daily-beta-1-controlled-launch-readiness-lock"
)

$governanceMarkers = @(
  "no Daily Beta 1 launch execution",
  "no launch approval automation",
  "no go/no-go auto-pass",
  "no approval packet send behavior",
  "no rollback trigger",
  "no monitoring job creation",
  "no support runbook publish/send behavior",
  "no controlled launch execution",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual server/build/project execution still requires approved execution boundaries",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName $PhaseName `
  -ScriptFile $ScriptFile `
  -Domain $Domain `
  -Route $Route `
  -MainPanel $MainPanel `
  -CommandLabel $CommandLabel `
  -Modules $Modules `
  -Components $Components `
  -Exports $Exports `
  -PhaseMarkers $PhaseMarkers `
  -PlainEnglish @($PlainEnglish + $governanceMarkers) `
  -RouteHref $RouteHref `
  -ProtectedRoutes $protectedRoutes
