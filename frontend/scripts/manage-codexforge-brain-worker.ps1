[CmdletBinding()]
param(
    [ValidateSet('Install', 'Status', 'Restart', 'Remove', 'Run')]
    [string]$Action = 'Status',
    [string]$NodePath
)

$ErrorActionPreference = 'Stop'
$project = (Get-Item -LiteralPath (Join-Path $PSScriptRoot '..')).FullName
$worker = Join-Path $PSScriptRoot 'codexforge-brain-worker.cjs'
if (!$NodePath) { $NodePath = (Get-Command node.exe -CommandType Application | Select-Object -First 1).Source }
$node = (Get-Item -LiteralPath $NodePath).FullName

# Task Scheduler starts this wrapper in a hidden window and supervises its exit code.
if ($Action -eq 'Run') {
    Set-Location -LiteralPath $project
    $env:CODEXFORGE_BRAIN_SUPERVISOR_PID = [string]$PID
    & $node $worker
    exit $LASTEXITCODE
}

$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$hash = [Security.Cryptography.SHA256]::Create()
try {
    $key = [Text.Encoding]::UTF8.GetBytes($identity.User.Value + '|' + $project.ToLowerInvariant())
    $tag = [BitConverter]::ToString($hash.ComputeHash($key)).Replace('-', '').Substring(0, 16)
} finally { $hash.Dispose() }
$name = "CodexForge Brain - $tag"
$launcher = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$arguments = '-NoLogo -NoProfile -NonInteractive -WindowStyle Hidden -File "{0}" -Action Run -NodePath "{1}"' -f $PSCommandPath, $node
$task = Get-ScheduledTask -TaskPath '\' -TaskName $name -ErrorAction SilentlyContinue
if ($task) {
    $owned = $task.Actions.Count -eq 1 -and $task.Actions[0].Execute -eq $launcher -and
        $task.Actions[0].Arguments -ceq $arguments -and $task.Actions[0].WorkingDirectory -eq $project
    if (!$owned) { throw "An existing task named '$name' has a different action. Review it in Task Scheduler." }
}

if ($Action -eq 'Remove') {
    if ($task) {
        Stop-ScheduledTask -InputObject $task
        Unregister-ScheduledTask -InputObject $task -Confirm:$false
    }
    Write-Output "Removed automatic Brain capture for this checkout. Saved entries are still in the workspace."
    return
}

$receiptFile = Join-Path $project '.codexforge\brain\worker-status.json'
$previousWorkerPid = $null
if ($Action -eq 'Restart') {
    if (!$task) { throw 'Install the Brain task before restarting it.' }
    if (Test-Path -LiteralPath $receiptFile -PathType Leaf) {
        $previousWorkerPid = (Get-Content -Raw -LiteralPath $receiptFile | ConvertFrom-Json).pid
    }
    Stop-ScheduledTask -InputObject $task
    $until = [DateTime]::UtcNow.AddSeconds(10)
    do {
        Start-Sleep -Milliseconds 200
        $task = Get-ScheduledTask -TaskPath '\' -TaskName $name
    } while ($task.State -eq 'Running' -and [DateTime]::UtcNow -lt $until)
    if ($task.State -eq 'Running') { throw 'Windows has not yet stopped the old Brain worker.' }
}

if ($Action -in @('Install', 'Restart')) {
    foreach ($file in @($worker, (Join-Path $project 'build\Release\codexforge_creator_filesystem.node'))) {
        if (!(Test-Path -LiteralPath $file -PathType Leaf)) { throw "Missing Brain worker dependency: $file" }
    }
    if (!$task) {
        $start = New-ScheduledTaskAction -Execute $launcher -Argument $arguments -WorkingDirectory $project
        $trigger = New-ScheduledTaskTrigger -AtLogOn -User $identity.Name
        $principal = New-ScheduledTaskPrincipal -UserId $identity.Name -LogonType Interactive -RunLevel Limited
        $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit ([TimeSpan]::Zero) -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) -MultipleInstances IgnoreNew
        $task = Register-ScheduledTask -TaskPath '\' -TaskName $name -Description 'Save decisions and outcomes from the linked Codex chat to its local Brain archive.' -Action $start -Trigger $trigger -Principal $principal -Settings $settings
    }
    if ($task.State -ne 'Running') { Start-ScheduledTask -InputObject $task }
}

function Get-VerifiedReceipt {
    if (!(Test-Path -LiteralPath $receiptFile -PathType Leaf)) { return }
    $receipt = Get-Content -Raw -LiteralPath $receiptFile | ConvertFrom-Json
    if ($previousWorkerPid -and $receipt.pid -eq $previousWorkerPid) { return }
    if ($receipt.version -ne 1 -or !($receipt.pid -as [int]) -or [int]$receipt.pid -le 0) { return }
    $process = Get-CimInstance Win32_Process -Filter ('ProcessId = {0}' -f [int]$receipt.pid)
    if (!$process -or $process.ExecutablePath -ne $node) { return }
    $expected = '^(?:"{0}"|{0})\s+(?:"{1}"|{1})$' -f [regex]::Escape($node), [regex]::Escape($worker)
    if ($process.CommandLine -notmatch $expected) { return }
    $owner = Get-CimInstance Win32_Process -Filter ('ProcessId = {0}' -f [int]$process.ParentProcessId)
    if ($owner -and $owner.ExecutablePath -eq $launcher -and $owner.CreationDate -le $process.CreationDate -and
        $owner.CommandLine.EndsWith($arguments, [StringComparison]::Ordinal)) { return $receipt }
}

if (!$task) { Write-Output 'Automatic Brain capture is not installed for this checkout.'; return }
$receipt = Get-VerifiedReceipt
if ($Action -in @('Install', 'Restart')) {
    $until = [DateTime]::UtcNow.AddSeconds(20)
    while (!$receipt -and [DateTime]::UtcNow -lt $until) {
        Start-Sleep -Milliseconds 500
        $receipt = Get-VerifiedReceipt
    }
}
$task = Get-ScheduledTask -TaskPath '\' -TaskName $name
[pscustomobject]@{
    Task = $name
    State = [string]$task.State
    WorkerPid = $receipt.pid
    LastConfirmedSaveUtc = $receipt.at
    DeletionGuard = $receipt.deletionGuard
}
if ($Action -in @('Install', 'Restart') -and !$receipt) {
    Write-Warning 'The task has not confirmed a save. Check the linked chat, its local history, and the workspace archive.'
}
