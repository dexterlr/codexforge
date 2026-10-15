"use strict";

const childProcess = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const core = require("./animation-studio-local-launcher-core.cjs");

function argumentsValue() {
  const values = process.argv.slice(2);
  if (values.length !== 2 || values[0] !== "--config") throw new core.LocalLauncherError("USAGE", "Use: start-animation-studio-local.cjs --config <exact-config-path>");
  return values[1];
}

function assertStateBinding(state, verified) {
  if (!core.stateMatchesConfiguration(state, verified)) {
    throw new core.LocalLauncherError("FOREIGN_STATE", "The recorded Studio process does not match this exact configuration. Use Stop Studio to inspect it safely.");
  }
}

async function statusFor(state, verified) {
  const response = await core.controlRequest(verified.config, state, "GET", core.CONTROL_STATUS_PATH);
  const body = response.body;
  const version2 = state.format === core.STATE_V2_FORMAT;
  if (response.status !== 200 || !body || body.format !== `codexforge-animation-studio-control-status-v${version2 ? 2 : 1}` || body.state !== "running" || body.sessionId !== state.sessionId || body.pid !== state.pid || body.processIdentity !== state.processIdentity || body.configSha256 !== state.configSha256 ||
      version2 && (body.runtimeRoot !== state.runtimeRoot || body.workspaceRoot !== state.workspaceRoot || body.buildId !== state.buildId || body.namespace !== state.namespace || body.libraryId !== state.libraryId || body.url !== state.url)) {
    throw new core.LocalLauncherError("CONTROL_MISMATCH", "The recorded Studio control endpoint did not prove the exact owned server.");
  }
  return body;
}

function startEvidence(verified, state, result) {
  const record = {
    at: new Date().toISOString(),
    format: `codexforge-animation-studio-local-start-result-v${state.format === core.STATE_V2_FORMAT ? 2 : 1}`,
    result,
    sessionId: state.sessionId,
    pid: state.pid,
    processIdentity: state.processIdentity,
    configSha256: verified.configSha256,
    url: verified.config.url,
    runtimeRoot: verified.runtimeRoot,
    ...(state.format === core.STATE_V2_FORMAT ? { workspaceRoot: verified.workspaceRoot } : {}),
    buildId: verified.config.runtime.buildId,
    namespace: verified.config.workspace.namespace,
    libraryId: verified.config.workspace.libraryId,
    libraryBindingState: verified.binding.state,
    providerRequests: 0,
    modelRequests: 0,
    generationRequests: 0,
    credentialReads: 0,
  };
  core.writeExclusiveJson(path.join(verified.config.directories.logsRoot, `${state.sessionId}-start.json`), record);
}

function acquireLock(verified, binding) {
  const lockPath = `${verified.config.control.statePath}.start-lock`;
  try {
    fs.mkdirSync(lockPath);
  } catch (error) {
    if (error.code === "EEXIST") throw new core.LocalLauncherError("START_IN_PROGRESS", "Another Start Studio operation owns the startup lock. Wait for it to finish; no second server was created.");
    throw error;
  }
  const ownerPath = path.join(lockPath, "owner.json");
  try {
    core.writeExclusiveJson(ownerPath, {
      at: new Date().toISOString(),
      configSha256: verified.configSha256,
      format: "codexforge-animation-studio-start-lock-v1",
      pid: process.pid,
      processIdentity: core.processIdentity(binding, process.pid),
    });
  } catch (error) {
    try { fs.rmdirSync(lockPath); } catch { /* exact empty lock only */ }
    throw error;
  }
  return { lockPath, ownerPath };
}

function releaseLock(lock) {
  if (!lock) return;
  try { fs.unlinkSync(lock.ownerPath); } catch { /* retained lock is safer than broad cleanup */ }
  try { fs.rmdirSync(lock.lockPath); } catch { /* Stop Studio can archive an exact stale lock */ }
}

async function main() {
  const verified = core.readConfiguration(path.resolve(argumentsValue()));
  if (verified.binding.state === "bound" || verified.binding.state === "d-marker-only") core.observeLibraryBinding(verified);
  const binding = verified.nativeBinding;
  let existing = core.readState(verified.config.control.statePath);
  if (existing) {
    assertStateBinding(existing, verified);
    if (!core.isExactProcessAlive(binding, existing.pid, existing.processIdentity)) throw new core.LocalLauncherError("STALE_STATE", "The recorded Studio owner is no longer running. Run Stop Studio once to archive the stale record safely.");
    if (existing.phase !== "running") throw new core.LocalLauncherError("START_IN_PROGRESS", "The exact owned Studio process is still starting. No second server was created.");
    await statusFor(existing, verified);
    console.log(`ALREADY_RUNNING ${verified.config.url}`);
    console.log(JSON.stringify({ result: "ALREADY_RUNNING", url: verified.config.url, pid: existing.pid, processIdentity: existing.processIdentity, sessionId: existing.sessionId }));
    return;
  }

  let lock = null;
  try {
    lock = acquireLock(verified, binding);
    existing = core.readState(verified.config.control.statePath);
    if (existing) throw new core.LocalLauncherError("STATE_RACE", "An owned Studio state appeared during startup. No second server was created.");
    if (!await core.probePort(verified.config.host, verified.config.port)) throw new core.LocalLauncherError("PORT_IN_USE", "127.0.0.1:3379 is occupied by an unrelated or unverified listener. Nothing was stopped and no alternate port was selected.");

    const sessionId = core.makeSessionId();
    const controlToken = crypto.randomBytes(32).toString("hex");
    const environment = core.safeEnvironment(verified, sessionId);
    const child = childProcess.spawn(verified.nodePath, [verified.scriptPaths.server, "--config", verified.configPath, "--session", sessionId], {
      cwd: verified.workspaceRoot,
      env: environment,
      detached: true,
      windowsHide: true,
      stdio: "ignore",
    });
    let spawnError = null;
    child.once("error", (error) => { spawnError = error; });
    if (!Number.isSafeInteger(child.pid) || child.pid < 1) throw new core.LocalLauncherError("SPAWN_FAILED", "The Studio server did not receive a process ID.");
    let identity = null;
    for (let attempt = 0; attempt < 50 && identity === null; attempt += 1) {
      try { identity = core.processIdentity(binding, child.pid); } catch { if (child.exitCode !== null) break; core.pause(20); }
    }
    if (identity === null) throw new core.LocalLauncherError("SPAWN_FAILED", `The Studio server exited before its exact process identity could be recorded${spawnError ? `: ${spawnError.message}` : "."}`);
    const state = {
      format: verified.config.format === core.CONFIG_V2_FORMAT ? core.STATE_V2_FORMAT : core.STATE_FORMAT,
      phase: "starting",
      sessionId,
      pid: child.pid,
      processIdentity: identity,
      controlToken,
      configSha256: verified.configSha256,
      url: verified.config.url,
      runtimeRoot: verified.runtimeRoot,
      ...(verified.config.format === core.CONFIG_V2_FORMAT ? { workspaceRoot: verified.workspaceRoot } : {}),
      namespace: verified.config.workspace.namespace,
      libraryId: verified.config.workspace.libraryId,
      buildId: verified.config.runtime.buildId,
      startedAt: new Date().toISOString(),
      readyAt: null,
    };
    core.writeExclusiveJson(verified.config.control.statePath, state);
    child.unref();

    const deadline = Date.now() + verified.config.limits.startupMilliseconds;
    let lastError = null;
    while (Date.now() < deadline) {
      core.pause(100);
      const current = core.readState(verified.config.control.statePath);
      if (!current) throw new core.LocalLauncherError("STARTUP_FAILED", "The Studio server removed its owned state before readiness.");
      assertStateBinding(current, verified);
      if (current.pid !== state.pid || current.processIdentity !== state.processIdentity || current.sessionId !== sessionId) throw new core.LocalLauncherError("STATE_RACE", "The Studio process state changed ownership during startup.");
      if (current.phase === "failed") throw new core.LocalLauncherError("STARTUP_FAILED", `The Studio server reported startup failure. Inspect ${verified.config.directories.logsRoot}.`);
      if (!core.isExactProcessAlive(binding, state.pid, state.processIdentity)) throw new core.LocalLauncherError("STARTUP_FAILED", `The Studio server exited before readiness. Inspect ${verified.config.directories.logsRoot}.`);
      if (current.phase === "running") {
        try {
          await statusFor(current, verified);
          startEvidence(verified, current, "STARTED");
          console.log(`STARTED ${verified.config.url}`);
          console.log(JSON.stringify({ result: "STARTED", url: verified.config.url, pid: current.pid, processIdentity: current.processIdentity, sessionId: current.sessionId, libraryBindingState: verified.binding.state }));
          return;
        } catch (error) { lastError = error; }
      }
    }
    throw new core.LocalLauncherError("STARTUP_TIMEOUT", `Studio did not prove readiness within ${verified.config.limits.startupMilliseconds} ms${lastError ? `: ${lastError.message}` : "."}`);
  } finally {
    releaseLock(lock);
  }
}

main().catch((error) => {
  const code = error && typeof error.code === "string" ? error.code : "START_FAILED";
  console.error(`${code}: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
