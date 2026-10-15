"use strict";

const fs = require("node:fs");
const path = require("node:path");
const core = require("./animation-studio-local-launcher-core.cjs");

function argumentsValue() {
  const values = process.argv.slice(2);
  if (values.length !== 2 || values[0] !== "--config") throw new core.LocalLauncherError("USAGE", "Use: stop-animation-studio-local.cjs --config <exact-config-path>");
  return values[1];
}

function stamp() {
  return new Date().toISOString().replace(/[-:.]/gu, "");
}

function archive(filename, directory, label) {
  const destination = path.join(directory, `${label}-${stamp()}-${process.pid}.json`);
  fs.renameSync(filename, destination);
  return destination;
}

function assertStateBinding(state, verified) {
  if (!core.stateMatchesConfiguration(state, verified)) {
    throw new core.LocalLauncherError("FOREIGN_STATE", "The recorded process state does not match this exact launcher. Nothing was signalled.");
  }
}

function inspectLock(verified, binding) {
  const lockPath = `${verified.config.control.statePath}.start-lock`;
  if (!fs.existsSync(lockPath)) return { state: "absent" };
  const ownerPath = path.join(lockPath, "owner.json");
  try {
    const bytes = fs.readFileSync(ownerPath);
    if (bytes.length < 2 || bytes.length > 4096) throw new Error("bounds");
    const owner = JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes));
    if (!bytes.equals(Buffer.from(`${core.canonicalJson(owner)}\n`, "utf8")) || owner.format !== "codexforge-animation-studio-start-lock-v1" || owner.configSha256 !== verified.configSha256 || !Number.isSafeInteger(owner.pid) || typeof owner.processIdentity !== "string") throw new Error("record");
    if (core.isExactProcessAlive(binding, owner.pid, owner.processIdentity)) return { state: "live", owner };
  } catch { /* invalid/dead exact lock is preserved below */ }
  const destination = path.join(verified.config.directories.logsRoot, `stale-start-lock-${stamp()}-${process.pid}`);
  fs.renameSync(lockPath, destination);
  return { state: "archived", destination };
}

function writeStopEvidence(verified, state, result, details = {}) {
  const filename = path.join(verified.config.directories.logsRoot, `${state ? state.sessionId : "no-session"}-stop-${stamp()}-${process.pid}.json`);
  core.writeExclusiveJson(filename, {
    at: new Date().toISOString(),
    format: "codexforge-animation-studio-local-stop-result-v1",
    result,
    sessionId: state?.sessionId ?? null,
    pid: state?.pid ?? null,
    processIdentity: state?.processIdentity ?? null,
    configSha256: verified.configSha256,
    url: verified.config.url,
    forced: false,
    ...details,
  });
  return filename;
}

async function main() {
  const verified = core.readConfiguration(path.resolve(argumentsValue()), { verifyRenderer: false, verifyLibrary: false, verifyRuntime: false });
  const binding = verified.nativeBinding;
  const state = core.readState(verified.config.control.statePath);
  if (!state) {
    const lock = inspectLock(verified, binding);
    if (lock.state === "live") throw new core.LocalLauncherError("START_IN_PROGRESS", "Start Studio is still owned by an exact live launcher. No process was signalled.");
    if (lock.state === "archived") {
      writeStopEvidence(verified, null, "STALE_START_LOCK_ARCHIVED", { archivedPath: lock.destination });
      console.log(`STALE_START_LOCK_ARCHIVED ${lock.destination}`);
      return;
    }
    writeStopEvidence(verified, null, "NOT_RUNNING", { portAvailable: await core.probePort(verified.config.host, verified.config.port) });
    console.log("NOT_RUNNING No owned Animation Studio process is recorded.");
    return;
  }
  assertStateBinding(state, verified);
  if (!core.isExactProcessAlive(binding, state.pid, state.processIdentity)) {
    const destination = archive(verified.config.control.statePath, verified.config.directories.logsRoot, `${state.sessionId}-stale-state`);
    const lock = inspectLock(verified, binding);
    writeStopEvidence(verified, state, "STALE_STATE_ARCHIVED", { archivedPath: destination, startLock: lock.state });
    console.log(`STALE_STATE_ARCHIVED ${destination}`);
    return;
  }
  if (state.phase !== "running") throw new core.LocalLauncherError("SERVER_NOT_READY", `The exact owned Studio process is ${state.phase}; it was not force-terminated.`);
  const response = await core.controlRequest(verified.config, state, "POST", core.CONTROL_STOP_PATH);
  if (response.status !== 202 || !response.body || response.body.format !== "codexforge-animation-studio-control-stop-v1" || response.body.accepted !== true || response.body.sessionId !== state.sessionId) {
    throw new core.LocalLauncherError("STOP_REJECTED", "The exact owned server did not acknowledge graceful stop. Nothing was force-terminated.");
  }
  const deadline = Date.now() + verified.config.limits.stopMilliseconds;
  while (Date.now() < deadline && core.isExactProcessAlive(binding, state.pid, state.processIdentity)) core.pause(100);
  if (core.isExactProcessAlive(binding, state.pid, state.processIdentity)) throw new core.LocalLauncherError("STOP_TIMEOUT", `The exact owned server did not close within ${verified.config.limits.stopMilliseconds} ms. Forced termination was not attempted.`);
  let retainedState = null;
  const remaining = core.readState(verified.config.control.statePath);
  if (remaining) {
    if (remaining.sessionId !== state.sessionId || remaining.pid !== state.pid || remaining.processIdentity !== state.processIdentity || remaining.controlToken !== state.controlToken || remaining.configSha256 !== state.configSha256) {
      const evidence = writeStopEvidence(verified, state, "STOPPED_RESTART_DETECTED", { graceful: true, replacementSessionId: remaining.sessionId });
      throw new core.LocalLauncherError("OWNERSHIP_CHANGED", `The requested owner stopped, but a different recorded Studio owner appeared and was left untouched. Evidence: ${evidence}`);
    }
    retainedState = archive(verified.config.control.statePath, verified.config.directories.logsRoot, `${state.sessionId}-closed-state`);
  }
  const lock = inspectLock(verified, binding);
  const portAvailable = await core.probePort(verified.config.host, verified.config.port);
  const evidence = writeStopEvidence(verified, state, "STOPPED", { graceful: true, retainedState, startLock: lock.state, portAvailable });
  if (!portAvailable) throw new core.LocalLauncherError("PORT_REOCCUPIED", `The owned Studio process stopped, but 127.0.0.1:3379 is now occupied. Evidence: ${evidence}`);
  console.log(`STOPPED ${state.sessionId}`);
  console.log(JSON.stringify({ result: "STOPPED", sessionId: state.sessionId, pid: state.pid, processIdentity: state.processIdentity, graceful: true, forced: false, portAvailable, evidence }));
}

main().catch((error) => {
  const code = error && typeof error.code === "string" ? error.code : "STOP_FAILED";
  console.error(`${code}: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
