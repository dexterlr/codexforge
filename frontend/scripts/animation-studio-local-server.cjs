"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const core = require("./animation-studio-local-launcher-core.cjs");

function argumentsValue() {
  const values = process.argv.slice(2);
  if (values.length !== 4 || values[0] !== "--config" || values[2] !== "--session" || !/^local-\d{8}T\d{6}Z-[a-f0-9]{12}$/u.test(values[3])) {
    throw new core.LocalLauncherError("USAGE", "Use: animation-studio-local-server.cjs --config <exact-config-path> --session <session-id>");
  }
  return { configPath: path.resolve(values[1]), sessionId: values[3] };
}

function boundedLog(filename, maximumBytes) {
  const descriptor = fs.openSync(filename, "wx");
  let written = 0;
  let truncated = false;
  function append(value) {
    if (truncated) return;
    const text = typeof value === "string" ? value : core.canonicalJson(value);
    let bytes = Buffer.from(`${text.replace(/[\r\n]+/gu, " ")}\n`, "utf8");
    if (bytes.length > 16 * 1024) bytes = Buffer.from(`${text.slice(0, 16 * 1024 - 64)} [line truncated]\n`, "utf8");
    if (written + bytes.length > maximumBytes) {
      const marker = Buffer.from(`${core.canonicalJson({ at: new Date().toISOString(), event: "log-cap-reached", maximumBytes })}\n`, "utf8");
      if (written + marker.length <= maximumBytes) { fs.writeSync(descriptor, marker); written += marker.length; }
      truncated = true;
      return;
    }
    fs.writeSync(descriptor, bytes);
    written += bytes.length;
  }
  return Object.freeze({ filename, append, close: () => fs.closeSync(descriptor), bytes: () => written, truncated: () => truncated });
}

function safeMessage(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/[\r\n]+/gu, " ").slice(0, 2048);
}

function authorized(request, state, config) {
  const remote = request.socket.remoteAddress;
  if (remote !== "127.0.0.1" && remote !== "::ffff:127.0.0.1" && remote !== "::1") return false;
  if (request.headers.host !== `${config.host}:${config.port}`) return false;
  const supplied = request.headers.authorization;
  const expected = `Bearer ${state.controlToken}`;
  if (typeof supplied !== "string" || supplied.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

function statusBody(state) {
  return {
    buildId: state.buildId,
    configSha256: state.configSha256,
    format: `codexforge-animation-studio-control-status-v${state.format === core.STATE_V2_FORMAT ? 2 : 1}`,
    ...(state.format === core.STATE_V2_FORMAT ? { runtimeRoot: state.runtimeRoot, workspaceRoot: state.workspaceRoot } : {}),
    libraryId: state.libraryId,
    namespace: state.namespace,
    pid: state.pid,
    processIdentity: state.processIdentity,
    sessionId: state.sessionId,
    state: "running",
    url: state.url,
  };
}

function respondJson(response, status, value) {
  const bytes = Buffer.from(core.canonicalJson(value), "utf8");
  response.writeHead(status, { "Cache-Control": "no-store", "Content-Type": "application/json; charset=utf-8", "Content-Length": String(bytes.length), "X-Content-Type-Options": "nosniff" });
  response.end(bytes);
}

async function main() {
  const args = argumentsValue();
  const verified = core.readConfiguration(args.configPath, { verifyRenderer: false });
  if (!core.samePath(process.cwd(), verified.workspaceRoot) || !core.samePath(process.execPath, verified.nodePath)) throw new core.LocalLauncherError("RUNTIME_MISMATCH", "The server process escaped its exact workspace or Node identity.");
  const config = verified.config;
  const stdout = boundedLog(path.join(config.directories.logsRoot, `${args.sessionId}.stdout.log`), config.limits.maximumLogBytes);
  const stderr = boundedLog(path.join(config.directories.logsRoot, `${args.sessionId}.stderr.log`), config.limits.maximumLogBytes);
  const requests = boundedLog(path.join(config.directories.logsRoot, `${args.sessionId}-http.ndjson`), config.limits.maximumLogBytes);
  console.log = (...values) => stdout.append(values.map(String).join(" "));
  console.info = console.log;
  console.warn = (...values) => stderr.append(values.map(String).join(" "));
  console.error = console.warn;

  const binding = verified.nativeBinding;
  const identity = core.processIdentity(binding, process.pid);
  let startingState = null;
  for (let attempt = 0; attempt < 100 && startingState === null; attempt += 1) {
    startingState = core.readState(config.control.statePath);
    if (startingState === null) core.pause(50);
  }
  if (!startingState || startingState.phase !== "starting" || startingState.sessionId !== args.sessionId || startingState.pid !== process.pid || startingState.processIdentity !== identity || !core.stateMatchesConfiguration(startingState, verified)) {
    throw new core.LocalLauncherError("STATE_MISMATCH", "The server did not receive an exact owned startup state.");
  }

  if (config.format === core.CONFIG_V2_FORMAT) core.bootstrapNativeBinding(verified);
  const next = require(path.join(verified.runtimeRoot, "node_modules", "next"));
  const app = next({ dev: false, hostname: config.host, port: config.port, dir: verified.runtimeRoot });
  const handle = app.getRequestHandler();
  let server = null;
  let runningState = null;
  let closing = false;

  async function stop(reason) {
    if (closing) return;
    closing = true;
    let stopError = null;
    try {
      if (server?.listening) {
        server.closeIdleConnections?.();
        await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
      }
      await app.close();
    } catch (error) {
      stopError = error;
      stderr.append(`shutdown error: ${safeMessage(error)}`);
    }
    stdout.append(`Studio closed: ${reason}`);
    requests.close();
    stdout.close();
    stderr.close();
    const closure = {
      at: new Date().toISOString(),
      format: "codexforge-animation-studio-local-closure-v1",
      sessionId: args.sessionId,
      pid: process.pid,
      processIdentity: identity,
      reason,
      graceful: stopError === null,
      error: stopError ? safeMessage(stopError) : null,
      stdoutSha256: core.sha256File(stdout.filename),
      stderrSha256: core.sha256File(stderr.filename),
      httpSha256: core.sha256File(requests.filename),
      configSha256: verified.configSha256,
      providerRequests: 0,
      modelRequests: 0,
      generationRequests: 0,
      credentialReads: 0,
    };
    core.writeExclusiveJson(path.join(config.directories.logsRoot, `${args.sessionId}-closure.json`), closure);
    const current = core.readState(config.control.statePath);
    if (current && current.sessionId === args.sessionId && current.pid === process.pid && current.processIdentity === identity && current.controlToken === startingState.controlToken && current.configSha256 === verified.configSha256) fs.unlinkSync(config.control.statePath);
    process.exit(stopError ? 1 : 0);
  }

  try {
    await app.prepare();
    if (!core.samePath(process.cwd(), verified.workspaceRoot)) throw new core.LocalLauncherError("RUNTIME_MISMATCH", "The prepared server changed its workspace root.");
    server = http.createServer(async (request, response) => {
      const pathname = (() => { try { return new URL(request.url || "/", config.url).pathname; } catch { return "<invalid>"; } })();
      response.once("finish", () => {
        requests.append({ at: new Date().toISOString(), method: request.method, path: pathname, status: response.statusCode, remoteAddress: request.socket.remoteAddress, localAddress: request.socket.localAddress, localPort: request.socket.localPort });
        if (request.method === "PATCH" && pathname === "/api/codexforge/animation-studio/footage/upload" && response.statusCode >= 200 && response.statusCode < 300) {
          try {
            const observed = core.observeLibraryBinding(verified);
            stdout.append(`Media-library binding observed: ${observed.state}`);
          } catch (error) { stderr.append(`media-library witness error: ${safeMessage(error)}`); }
        }
      });
      if (pathname === core.CONTROL_STATUS_PATH || pathname === core.CONTROL_STOP_PATH) {
        if (!authorized(request, startingState, config) || request.headers["content-length"] && request.headers["content-length"] !== "0") return respondJson(response, 403, { error: "control_rejected" });
        if (pathname === core.CONTROL_STATUS_PATH && request.method === "GET") return respondJson(response, 200, statusBody(runningState || startingState));
        if (pathname === core.CONTROL_STOP_PATH && request.method === "POST") {
          respondJson(response, 202, { accepted: true, format: "codexforge-animation-studio-control-stop-v1", sessionId: args.sessionId });
          setImmediate(() => void stop("authenticated-loopback-stop"));
          return;
        }
        return respondJson(response, 405, { error: "method_not_allowed" });
      }
      try {
        if (!core.samePath(process.cwd(), verified.workspaceRoot)) throw new core.LocalLauncherError("RUNTIME_MISMATCH", "Request handling escaped the workspace root.");
        await handle(request, response);
      } catch (error) {
        stderr.append(`request error: ${safeMessage(error)}`);
        if (!response.headersSent) response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
        response.end("Local Animation Studio request failed.");
      }
    });
    server.once("error", (error) => { stderr.append(`server error: ${safeMessage(error)}`); void stop("server-error"); });
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen({ host: config.host, port: config.port, exclusive: true }, resolve);
    });
    const address = server.address();
    if (!address || typeof address === "string" || address.address !== config.host || address.port !== config.port) throw new core.LocalLauncherError("BIND_MISMATCH", "The server did not bind the fixed loopback origin.");
    runningState = { ...startingState, phase: "running", readyAt: new Date().toISOString() };
    const current = core.readState(config.control.statePath);
    if (!current || current.sessionId !== args.sessionId || current.pid !== process.pid || current.processIdentity !== identity || current.controlToken !== startingState.controlToken || current.phase !== "starting") throw new core.LocalLauncherError("STATE_RACE", "Owned state changed before readiness publication.");
    core.replaceJson(config.control.statePath, runningState);
    stdout.append(`READY ${config.url}`);
  } catch (error) {
    stderr.append(`startup error: ${safeMessage(error)}`);
    try {
      const current = core.readState(config.control.statePath);
      if (current && current.sessionId === args.sessionId && current.pid === process.pid && current.processIdentity === identity && current.controlToken === startingState.controlToken) core.replaceJson(config.control.statePath, { ...current, phase: "failed", readyAt: null });
    } catch (stateError) { stderr.append(`failure-state error: ${safeMessage(stateError)}`); }
    await stop("startup-failure");
  }

  process.once("SIGINT", () => void stop("sigint"));
  process.once("SIGTERM", () => void stop("sigterm"));
  process.once("uncaughtException", (error) => { stderr.append(`uncaught exception: ${safeMessage(error)}`); void stop("uncaught-exception"); });
  process.once("unhandledRejection", (error) => { stderr.append(`unhandled rejection: ${safeMessage(error)}`); void stop("unhandled-rejection"); });
}

main().catch(() => {
  process.exit(1);
});
