"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const net = require("node:net");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const repoRoot = path.resolve(__dirname, "..");
const originalLoad = Module._load;
const originalResolveFilename = Module._resolveFilename;
let routeMocksEnabled = false;

const calls = {
  approveRun: 0,
  cancelRun: 0,
  createRun: 0,
  executeRun: 0,
  freeFirst: 0,
  getRun: 0,
  getStatus: 0,
  listRuns: 0,
};
const executionScenarioCalls = new Map();

class StubPrivateAlphaStoreError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const stubStore = {
  async getStatus() {
    calls.getStatus += 1;
    return { available: true };
  },
  async listRuns() {
    calls.listRuns += 1;
    return [];
  },
  async createRun() {
    calls.createRun += 1;
    return { created: true, run: { id: "run-http-test" } };
  },
  async getRun(runId) {
    calls.getRun += 1;
    return { id: runId };
  },
  async approveRun(runId) {
    calls.approveRun += 1;
    return { id: runId, status: "approved" };
  },
  async cancelRun(runId) {
    calls.cancelRun += 1;
    return { id: runId, status: "canceled" };
  },
  async executeRun(runId, body) {
    calls.executeRun += 1;
    const scenario = body && typeof body === "object" ? body.scenario : null;
    const count = (executionScenarioCalls.get(scenario) ?? 0) + 1;
    executionScenarioCalls.set(scenario, count);
    if (scenario === "success") {
      return {
        responseStatus: 200,
        replayed: count > 1,
        errorCode: null,
        safeErrorMessage: null,
        run: { id: runId, status: "completed" },
      };
    }
    if (scenario === "failed-http-200") {
      return {
        responseStatus: 200,
        replayed: count > 1,
        errorCode: "ollama_http_error",
        safeErrorMessage: "Local provider returned a bounded failed result.",
        run: {
          id: runId,
          status: "failed",
          execution: { errorCode: "ollama_http_error" },
        },
      };
    }
    const cases = {
      conflict: [409, "kill_switch_blocked", "Private Alpha execution is disabled."],
      failure: [500, "ollama_http_error", "Local provider execution failed safely."],
      unavailable: [503, "ollama_unavailable", "Local provider is unavailable."],
      timeout: [504, "ollama_timeout", "Local provider request timed out."],
    };
    const selected = cases[scenario];
    assert(selected, `unknown execution scenario ${String(scenario)}`);
    return {
      responseStatus: selected[0],
      errorCode: selected[1],
      safeErrorMessage: selected[2],
      replayed: count > 1,
      run: { id: runId, status: "failed" },
    };
  },
};

Module._load = function load(request, parent, isMain) {
  if (request === "server-only") return {};
  if (routeMocksEnabled && request.includes("private-alpha-store.server")) {
    return {
      PrivateAlphaStoreError: StubPrivateAlphaStoreError,
      createPrivateAlphaStore: () => stubStore,
    };
  }
  if (routeMocksEnabled && request.includes("private-alpha-free-first-routing.server")) {
    class StubPrivateAlphaFreeFirstRoutingError extends Error {
      constructor(status, message) {
        super(message);
        this.status = status;
      }
    }
    return {
      PrivateAlphaFreeFirstRoutingError: StubPrivateAlphaFreeFirstRoutingError,
      routePrivateAlphaFreeFirst: async () => {
        calls.freeFirst += 1;
        return { route: "local" };
      },
    };
  }
  return originalLoad.apply(this, arguments);
};

Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(repoRoot, "src", request.slice(2));
  return originalResolveFilename.call(this, request, parent, isMain, options);
};

function compileTypeScript(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: filename,
  });
  module._compile(transpiled.outputText, filename);
}

require.extensions[".ts"] = compileTypeScript;
require.extensions[".tsx"] = compileTypeScript;

const httpModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/private-alpha/private-alpha-http.server.ts"
));

function requestHeaders(host, origin, extra = {}) {
  const headers = new Headers(extra);
  if (host !== null) headers.set("Host", host);
  if (origin !== null) headers.set("Origin", origin);
  return headers;
}

function mutationRequest({
  url = "http://127.0.0.1:41001/api/codexforge/private-alpha/runs",
  host = "localhost:41001",
  origin = "http://localhost:41001",
  fetchSite = "same-origin",
  body = "{}",
  contentType = "application/json",
  extra = {},
} = {}) {
  const headers = requestHeaders(host, origin, {
    "Content-Type": contentType,
    ...(fetchSite === null ? {} : { "Sec-Fetch-Site": fetchSite }),
    ...extra,
  });
  return new Request(url, { method: "POST", headers, body });
}

function expectGuardFailure(request, mutation, listeners, status, label) {
  assert.throws(
    () => httpModule.assertPrivateAlphaLoopbackRequest(request, mutation, listeners),
    (error) => error instanceof httpModule.PrivateAlphaHttpError && error.status === status,
    label
  );
}

async function expectBodyFailure(request, status, label) {
  await assert.rejects(
    () => httpModule.readPrivateAlphaJsonBody(request),
    (error) => error instanceof httpModule.PrivateAlphaHttpError && error.status === status,
    label
  );
}

function assertHardenedResponse(response) {
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(response.headers.get("Content-Security-Policy"), "default-src 'none'; sandbox");
}

async function runHelperMatrix() {
  httpModule.assertPrivateAlphaLoopbackRequest(mutationRequest(), true, ["127.0.0.1"]);
  httpModule.assertPrivateAlphaLoopbackRequest(
    mutationRequest({ url: "http://127.0.0.1/api/test", host: "LOCALHOST:80", origin: "http://localhost:80" }),
    true,
    ["127.0.0.1"]
  );
  httpModule.assertPrivateAlphaLoopbackRequest(
    mutationRequest({ url: "http://[::1]:41001/api/test", host: "[::1]:41001", origin: "http://[::1]:41001" }),
    true,
    ["::1"]
  );
  httpModule.assertPrivateAlphaLoopbackRequest(
    mutationRequest({ url: "https://127.0.0.1/api/test", host: "LOCALHOST:443", origin: "https://localhost:443" }),
    true,
    ["127.0.0.1"]
  );
  httpModule.assertPrivateAlphaLoopbackRequest(
    mutationRequest({ extra: { "X-Forwarded-Host": "evil.example", "X-Forwarded-Proto": "https" } }),
    true,
    ["127.0.0.1"]
  );

  expectGuardFailure(mutationRequest(), true, [], 503, "missing listener inventory fails closed");
  expectGuardFailure(mutationRequest(), true, ["0.0.0.0"], 503, "wildcard IPv4 listener fails closed");
  expectGuardFailure(mutationRequest(), true, ["::"], 503, "wildcard IPv6 listener fails closed");
  expectGuardFailure(
    mutationRequest({ url: "http://192.0.2.10:41001/api/test" }),
    true,
    ["127.0.0.1"],
    404,
    "nonloopback internal request URL is rejected"
  );
  for (const host of [
    "evil.example:41001",
    "127.0.0.1.evil.example:41001",
    "localhost:41001, evil.example",
    "localhost/path",
    "user@localhost",
    "localhost\\evil",
    "[::1",
    "localhost:0",
    "localhost:65536",
  ]) {
    expectGuardFailure(mutationRequest({ host }), true, ["127.0.0.1"], 404, `host ${host} is rejected`);
  }
  expectGuardFailure(mutationRequest({ host: null }), true, ["127.0.0.1"], 404, "missing Host is rejected");
  for (const origin of [
    null,
    "null",
    "http://evil.example:41001",
    "http://127.0.0.1:41001",
    "https://localhost:41001",
    "http://localhost:41002",
    "http://localhost:41001, http://localhost:41001",
    "http://user@localhost:41001",
    "http://localhost:41001/path",
    "http://localhost:41001?query=1",
    "ftp://localhost:41001",
  ]) {
    expectGuardFailure(mutationRequest({ origin }), true, ["127.0.0.1"], 403, `origin ${String(origin)} is rejected`);
  }
  expectGuardFailure(
    mutationRequest({ fetchSite: "cross-site" }),
    true,
    ["127.0.0.1"],
    403,
    "cross-site fetch metadata is rejected"
  );

  assert.deepEqual(await httpModule.readPrivateAlphaJsonBody(mutationRequest({ body: '{"safe":true}' })), { safe: true });
  assert.deepEqual(
    await httpModule.readPrivateAlphaJsonBody(
      mutationRequest({ body: '{"safe":true}', contentType: "APPLICATION/JSON; CHARSET=UTF-8" })
    ),
    { safe: true }
  );
  for (const contentType of ["", "text/plain", "application/json;charset=utf-16", "application/problem+json"]) {
    await expectBodyFailure(mutationRequest({ contentType }), 415, `content type ${contentType} is rejected`);
  }
  await expectBodyFailure(
    mutationRequest({ extra: { "Content-Length": String(httpModule.PRIVATE_ALPHA_MAX_HTTP_BODY_BYTES + 1) } }),
    413,
    "declared oversized body is rejected before reading"
  );
  await expectBodyFailure(
    mutationRequest({ body: `{"x":"${"x".repeat(httpModule.PRIVATE_ALPHA_MAX_HTTP_BODY_BYTES)}"}` }),
    413,
    "streamed oversized body is rejected"
  );
  await expectBodyFailure(mutationRequest({ body: '{"a":1,"a":2}' }), 400, "literal duplicate keys are rejected");
  await expectBodyFailure(
    mutationRequest({ body: '{"a":1,"\\u0061":2}' }),
    400,
    "escaped duplicate keys are rejected"
  );
  await expectBodyFailure(mutationRequest({ body: '{"a":' }), 400, "truncated JSON is rejected");
  await expectBodyFailure(mutationRequest({ body: '{}{}' }), 400, "multiple JSON documents are rejected");
  const invalidUtf8 = new Request("http://localhost/api/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: new Uint8Array([0x7b, 0x22, 0x78, 0x22, 0x3a, 0xff, 0x7d]),
  });
  await expectBodyFailure(invalidUtf8, 400, "invalid UTF-8 is rejected");

  assertHardenedResponse(httpModule.privateAlphaJsonResponse({ ok: true }));
  assertHardenedResponse(httpModule.privateAlphaFailureResponse(409, "blocked", { errorCode: "kill_switch_engaged" }));
}

function loadRoute(relativePath) {
  const filename = path.join(repoRoot, relativePath);
  delete require.cache[require.resolve(filename)];
  return require(filename);
}

function routeRequest(
  port,
  routePath,
  {
    method = "GET",
    host = undefined,
    origin = null,
    body = null,
    rawBody = null,
    contentType = "application/json",
    extraHeaders = {},
  } = {}
) {
  const externalHost = host === undefined ? `localhost:${port}` : host;
  const headers = new Headers(extraHeaders);
  if (externalHost !== null) headers.set("Host", externalHost);
  if (method !== "GET") {
    headers.set("Origin", origin ?? `http://${externalHost}`);
    headers.set("Sec-Fetch-Site", "same-origin");
    headers.set("Content-Type", contentType);
    headers.set("Idempotency-Key", "http-boundary-test-key-1234567890");
  }
  return new Request(`http://127.0.0.1:${port}${routePath}`, {
    method,
    headers,
    ...(rawBody !== null ? { body: rawBody } : body === null ? {} : { body: JSON.stringify(body) }),
  });
}

async function readJson(response) {
  assertHardenedResponse(response);
  return response.json();
}

async function runRouteMatrix() {
  const server = net.createServer((socket) => socket.end());
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  try {
    const address = server.address();
    assert(address && typeof address === "object");
    const port = address.port;
    routeMocksEnabled = true;

    const statusRoute = loadRoute("src/app/api/codexforge/private-alpha/status/route.ts");
    const runsRoute = loadRoute("src/app/api/codexforge/private-alpha/runs/route.ts");
    const runRoute = loadRoute("src/app/api/codexforge/private-alpha/runs/[runId]/route.ts");
    const approveRoute = loadRoute("src/app/api/codexforge/private-alpha/runs/[runId]/approve/route.ts");
    const cancelRoute = loadRoute("src/app/api/codexforge/private-alpha/runs/[runId]/cancel/route.ts");
    const executeRoute = loadRoute("src/app/api/codexforge/private-alpha/runs/[runId]/execute/route.ts");
    const freeFirstRoute = loadRoute("src/app/api/codexforge/private-alpha/routing/free-first/route.ts");
    const context = { params: Promise.resolve({ runId: "run-http-test" }) };

    const rejectedCases = [
      ["getStatus", () => statusRoute.GET(routeRequest(port, "/api/codexforge/private-alpha/status", { host: "evil.example" }))],
      ["listRuns", () => runsRoute.GET(routeRequest(port, "/api/codexforge/private-alpha/runs", { host: "evil.example" }))],
      ["createRun", () => runsRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/runs", { method: "POST", origin: "http://evil.example", body: {} }))],
      ["getRun", () => runRoute.GET(routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test", { host: "evil.example" }), context)],
      ["approveRun", () => approveRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test/approve", { method: "POST", origin: "http://evil.example", body: {} }), context)],
      ["cancelRun", () => cancelRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test/cancel", { method: "POST", origin: "http://evil.example", body: {} }), context)],
      ["executeRun", () => executeRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test/execute", { method: "POST", origin: "http://evil.example", body: {} }), context)],
      ["freeFirst", () => freeFirstRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/routing/free-first", { method: "POST", origin: "http://evil.example", body: {} }))],
    ];
    for (const [counter, invoke] of rejectedCases) {
      const before = calls[counter];
      const response = await invoke();
      assert([403, 404].includes(response.status), `${counter} hostile route request must be rejected`);
      await readJson(response);
      assert.equal(calls[counter], before, `${counter} must not run before HTTP validation`);
    }

    const mutationRoutes = [
      ["createRun", (options) => runsRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/runs", { method: "POST", ...options }))],
      ["approveRun", (options) => approveRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test/approve", { method: "POST", ...options }), context)],
      ["cancelRun", (options) => cancelRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test/cancel", { method: "POST", ...options }), context)],
      ["executeRun", (options) => executeRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test/execute", { method: "POST", ...options }), context)],
      ["freeFirst", (options) => freeFirstRoute.POST(routeRequest(port, "/api/codexforge/private-alpha/routing/free-first", { method: "POST", ...options }))],
    ];
    const invalidBodies = [
      [415, { body: {}, contentType: "text/plain" }],
      [413, { body: {}, extraHeaders: { "Content-Length": String(httpModule.PRIVATE_ALPHA_MAX_HTTP_BODY_BYTES + 1) } }],
      [400, { rawBody: '{"duplicate":1,"duplicate":2}' }],
    ];
    for (const [counter, invoke] of mutationRoutes) {
      for (const [expectedStatus, options] of invalidBodies) {
        const before = calls[counter];
        const response = await invoke(options);
        assert.equal(response.status, expectedStatus, `${counter} rejects invalid body before service access`);
        await readJson(response);
        assert.equal(calls[counter], before, `${counter} is not called for invalid body`);
      }
    }

    const statusResponse = await statusRoute.GET(routeRequest(port, "/api/codexforge/private-alpha/status"));
    assert.equal(statusResponse.status, 200);
    assert.equal((await readJson(statusResponse)).ok, true);
    assert.equal(calls.getStatus, 1);

    const createResponse = await runsRoute.POST(
      routeRequest(port, "/api/codexforge/private-alpha/runs", { method: "POST", body: { requestText: "local" } })
    );
    assert.equal(createResponse.status, 201);
    assert.equal((await readJson(createResponse)).created, true);
    assert.equal(calls.createRun, 1);

    const freeResponse = await freeFirstRoute.POST(
      routeRequest(port, "/api/codexforge/private-alpha/routing/free-first", { method: "POST", body: {} })
    );
    assert.equal(freeResponse.status, 200);
    assert.equal((await readJson(freeResponse)).result.route, "local");
    assert.equal(calls.freeFirst, 1);

    const expectedFailures = {
      conflict: [409, "kill_switch_blocked", "Private Alpha execution is disabled."],
      failure: [500, "ollama_http_error", "Local provider execution failed safely."],
      unavailable: [503, "ollama_unavailable", "Local provider is unavailable."],
      timeout: [504, "ollama_timeout", "Local provider request timed out."],
    };
    for (const [scenario, expected] of Object.entries(expectedFailures)) {
      for (const replayed of [false, true]) {
        const response = await executeRoute.POST(
          routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test/execute", {
            method: "POST",
            body: { scenario },
          }),
          context
        );
        assert.equal(response.status, expected[0]);
        const payload = await readJson(response);
        assert.deepEqual(payload, {
          ok: false,
          error: expected[2],
          errorCode: expected[1],
          replayed,
        });
      }
    }
    for (const replayed of [false, true]) {
      const response = await executeRoute.POST(
        routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test/execute", {
          method: "POST",
          body: { scenario: "success" },
        }),
        context
      );
      assert.equal(response.status, 200);
      const payload = await readJson(response);
      assert.equal(payload.ok, true);
      assert.equal(payload.replayed, replayed);
      assert.equal(payload.run.status, "completed");
    }
    for (const replayed of [false, true]) {
      const response = await executeRoute.POST(
        routeRequest(port, "/api/codexforge/private-alpha/runs/run-http-test/execute", {
          method: "POST",
          body: { scenario: "failed-http-200" },
        }),
        context
      );
      assert.equal(response.status, 200);
      const payload = await readJson(response);
      assert.equal(payload.ok, true);
      assert.equal(payload.replayed, replayed);
      assert.equal(payload.run.status, "failed");
      assert.equal(payload.run.execution.errorCode, "ollama_http_error");
    }
  } finally {
    routeMocksEnabled = false;
    await new Promise((resolve) => server.close(resolve));
  }
}

async function main() {
  await runHelperMatrix();
  await runRouteMatrix();
  process.stdout.write(
    `Private Alpha HTTP boundary smoke PASS: routes=7, helperCases=bounded, executeCalls=${calls.executeRun}, guardedStoreCalls=0\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
