"use strict";

const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const repoRoot = path.resolve(process.argv[2] ?? "");
const input = JSON.parse(
  Buffer.from(process.argv[3] ?? "", "base64url").toString("utf8")
);

const originalLoad = Module._load;
Module._load = function patchedLoad(request, parent, isMain) {
  if (request === "server-only") return {};
  return originalLoad.apply(this, arguments);
};

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function patchedResolve(request, parent, isMain, options) {
  const resolvedRequest = request.startsWith("@/")
    ? path.join(repoRoot, "src", request.slice(2))
    : request;
  return originalResolveFilename.call(
    this,
    resolvedRequest,
    parent,
    isMain,
    options
  );
};

require.extensions[".ts"] = (module, filename) => {
  const transpiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: filename,
  });
  module._compile(transpiled.outputText, filename);
};

const privateAlpha = require(path.join(
  repoRoot,
  "src/lib/codexforge/private-alpha/index.ts"
));
const storeModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/private-alpha/private-alpha-store.server.ts"
));
const ollamaModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts"
));
const adapterModule = require(path.join(
  repoRoot,
  "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts"
));

let tagsCalls = 0;
let chatCalls = 0;
const fetchFn = async (request) => {
  const url = new URL(String(request));
  if (
    url.origin !== ollamaModule.PRIVATE_ALPHA_OLLAMA_ORIGIN ||
    ![
      ollamaModule.PRIVATE_ALPHA_OLLAMA_TAGS_PATH,
      ollamaModule.PRIVATE_ALPHA_OLLAMA_CHAT_PATH,
    ].includes(url.pathname)
  ) {
    throw new Error("Independent worker rejected a non-allowlisted provider request.");
  }
  if (url.pathname === ollamaModule.PRIVATE_ALPHA_OLLAMA_TAGS_PATH) {
    tagsCalls += 1;
    return new Response(
      JSON.stringify({ models: [{ name: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL }] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  chatCalls += 1;
  if (input.holdGeneration === true) {
    await new Promise(() => {
      setInterval(() => {}, 1_000);
    });
  }
  return new Response(
    JSON.stringify({
      model: privateAlpha.PRIVATE_ALPHA_PRODUCTION_MODEL,
      message: { role: "assistant", content: input.outputText ?? "worker output" },
      done: true,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

const store = storeModule.createPrivateAlphaStoreForTesting(input.testSuffix, {
  runtimeProfile: privateAlpha.PRIVATE_ALPHA_LOCAL_RUNTIME_PROFILE,
  providerAdapter: adapterModule.createPrivateAlphaOllamaProviderAdapter({
    ollamaClient: ollamaModule.createPrivateAlphaOllamaClientForTesting({
      fetchFn,
      availabilityTimeoutMs: 5_000,
      generationTimeoutMs: 5_000,
    }),
  }),
});

async function run() {
  let result;
  if (input.operation === "create") {
    result = input.ownership
      ? await store.createCreatorRun(input.body, input.idempotencyKey, input.ownership)
      : await store.createRun(input.body, input.idempotencyKey);
    return {
      ok: true,
      created: result.created,
      runId: result.run.runId,
      state: result.run.state,
      revision: result.run.revision,
    };
  }
  if (input.operation === "bind") {
    result = await store.bindCreatorRun(
      input.body,
      input.idempotencyKey,
      input.ownership,
      input.createIfMissing === true
    );
    return result
      ? {
          ok: true,
          created: result.created,
          runId: result.run.runId,
          state: result.run.state,
          revision: result.run.revision,
          bindingId: result.run.ownership?.kind === "creator"
            ? result.run.ownership.bindingId
            : null,
        }
      : { ok: true, recovered: false };
  }
  if (input.operation === "approve") {
    result = input.ownership
      ? await store.approveCreatorRun(input.runId, input.body, input.ownership)
      : await store.approveRun(input.runId, input.body);
  } else if (input.operation === "cancel") {
    result = input.ownership
      ? await store.cancelCreatorRun(input.runId, input.body, input.ownership)
      : await store.cancelRun(input.runId, input.body);
  } else if (input.operation === "execute") {
    result = input.ownership
      ? await store.executeCreatorRun(
          input.runId,
          input.body,
          input.idempotencyKey,
          input.ownership
        )
      : await store.executeRun(input.runId, input.body, input.idempotencyKey);
    return {
      ok: true,
      replayed: result.replayed,
      responseStatus: result.responseStatus,
      runId: result.run.runId,
      state: result.run.state,
      revision: result.run.revision,
    };
  } else {
    throw new Error("Independent worker operation is not allowlisted.");
  }
  return {
    ok: true,
    runId: result.runId,
    state: result.state,
    revision: result.revision,
  };
}

run()
  .then((result) => {
    process.stdout.write(
      `${JSON.stringify({ ...result, tagsCalls, chatCalls })}\n`
    );
  })
  .catch((error) => {
    process.stdout.write(
      `${JSON.stringify({
        ok: false,
        status:
          error instanceof storeModule.PrivateAlphaStoreError ? error.status : 500,
        error: error instanceof Error ? error.message : String(error),
        tagsCalls,
        chatCalls,
      })}\n`
    );
  });
