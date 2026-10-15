// Exact server configuration function with a repository-opening unit seam; no native or network activity.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";
const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), networkAttempts = blockStudioTestNetwork();
assert.equal(path.resolve(process.cwd()), frontend);
const loader = createStudioTestLoader(frontend), store = loader.load("@/lib/codexforge/animation-studio/store.server");
const originalOpen = store.openStudioRepository, opened = [];
store.openStudioRepository = options => { opened.push(options); return options; };
const { openStudioOperatorRepository } = loader.load("@/lib/codexforge/animation-studio/operator-repository.server");
const keys = ["CODEXFORGE_STUDIO_MEDIA_STORAGE", "CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE"];
const old = keys.map(key => process.env[key]);
let cases = 0;
try {
  delete process.env.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE;
  for (const [input, expected] of [[undefined, "workspace"], ["workspace", "workspace"], ["d-drive", "d-drive"]]) {
    if (input === undefined) delete process.env.CODEXFORGE_STUDIO_MEDIA_STORAGE; else process.env.CODEXFORGE_STUDIO_MEDIA_STORAGE = input;
    assert.deepEqual(openStudioOperatorRepository(), { workspace: "development", mediaStorage: expected }); cases++;
  }
  process.env.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE = "synthetic-config-12345678";
  assert.deepEqual(openStudioOperatorRepository(), { workspace: "test", namespace: "synthetic-config-12345678", mediaStorage: "d-drive" }); cases++;
  for (const invalid of ["", " ", "D-DRIVE", "D:/CodexForge", "d-drive\n", "fallback", "workspace,d-drive"]) {
    process.env.CODEXFORGE_STUDIO_MEDIA_STORAGE = invalid;
    const before = opened.length;
    assert.throws(() => openStudioOperatorRepository(), error => error.code === "INVALID_MEDIA_STORAGE");
    assert.equal(opened.length, before); cases++;
  }
  // The configured function is passed only as a callback: denied admission must not inspect config or open storage.
  const { createStudioFootageHandler } = loader.load("@/lib/codexforge/animation-studio/footage-http.server");
  let callbacks = 0;
  const handler = createStudioFootageHandler({ enabled: true, listenerAddresses: () => ["127.0.0.1"], openRepository: () => { callbacks++; return openStudioOperatorRepository(); } });
  const denied = await handler(new Request("http://127.0.0.1:3340/api/codexforge/animation-studio/footage", { headers: { Host: "127.0.0.1:3340" } }));
  assert.equal(denied.status, 403); assert.equal(callbacks, 0); cases++;
  for (const route of ["src/app/api/codexforge/animation-studio/route.ts", "src/app/api/codexforge/animation-studio/footage/route.ts"]) {
    const text = fs.readFileSync(path.join(frontend, route), "utf8");
    assert.match(text, /openRepository: openStudioOperatorRepository/u);
    assert.doesNotMatch(text, /openStudioOperatorRepository\(\)/u); cases++;
  }
  assert.equal(cases, 14); assert.deepEqual(networkAttempts, []);
  console.log(JSON.stringify({ status: "PASS", passed: cases, total: cases, realConfigurationFunction: true, repositoryOpeningUnitSeam: true, nativeExecution: false, networkAttempts, providerRequests: 0, credentialReads: 0 }));
} finally {
  store.openStudioRepository = originalOpen;
  for (let index = 0; index < keys.length; index++) { if (old[index] === undefined) delete process.env[keys[index]]; else process.env[keys[index]] = old[index]; }
}
