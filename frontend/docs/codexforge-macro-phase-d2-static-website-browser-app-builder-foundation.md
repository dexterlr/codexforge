# Macro Phase D2: Static Website/Browser App Builder Foundation

## Meaning of Website/Browser App v0

Website/Browser App v0 means a bounded static project made from complete textual HTML, CSS, client-side JavaScript, JSON, safe SVG, Markdown, and text files. It is not a full-stack application builder. It does not provide a backend, database, package installation, arbitrary framework, native application, ZIP archive, deployment, hosting, domain setup, game, video, email, voice, screen control, or paid routing.

The flow is available only through Jarvis and its focused `/jarvis-websites` route. The user can describe, review the exact plan, approve, execute once, inspect validation and files, start/stop a sandbox preview, request one separately approved repair when validation reports a finding, verify export, and review the bounded audit.

## Versioned artifact contract

The exact model output contract is `codexforge.creator.bundle.v1`:

```json
{
  "contractVersion": "codexforge.creator.bundle.v1",
  "projectTitle": "Exact approved title",
  "creatorKind": "website-browser-app",
  "entrypoint": "index.html",
  "files": [
    {
      "path": "index.html",
      "mediaType": "text/html",
      "content": "Complete UTF-8 text"
    }
  ],
  "explanation": "Optional bounded explanation"
}
```

All root and file keys are strict. Unknown and missing fields fail. Duplicate JSON object keys fail before `JSON.parse` can collapse them. Invalid Unicode fails. Output must be either raw JSON or one fully anchored lowercase `json` fence; extra prose, multiple fences, multiple documents, and truncation fail. The server never substitutes a template and never claims rejected output was generated successfully.

The exact instruction envelope requires one complete static project, no packages, CDN, remote assets, network requests, external fonts, inline handlers/scripts/styles, server code, shell commands, secrets, environment variables, forms, frames/objects, or unsafe URLs. It requires semantic accessible HTML, explicit safe anchor destinations, `type="button"`, at most one local script, local styles, immutable client data, top-level one-time listener registration, and the conservative local CSS subset. The bounded user brief is appended inside the same approved Private Alpha request.

## Exact file policy

| Limit | Exact v0 value |
|---|---:|
| Files | 1–12 |
| Individual file | 24,576 UTF-8 bytes |
| Aggregate content | 49,152 UTF-8 bytes |
| Relative path | 120 printable ASCII characters |
| Segment | 48 characters |
| Directory levels before filename | 3 |
| Title | 80 characters |
| Optional explanation | 512 characters |
| Provider output | existing 65,536-character ceiling and 4,096-token envelope |
| Entrypoint | exact root `index.html`, exactly once, first |

Files after `index.html` must already be in strict ascending ASCII path order. The server rejects rather than silently reorders.

| Extension | Exact contract media type |
|---|---|
| `.html` | `text/html` |
| `.css` | `text/css` |
| `.js` | `text/javascript` |
| `.json` | `application/json` |
| `.svg` | `image/svg+xml` |
| `.md` | `text/markdown` |
| `.txt` | `text/plain` |

Every path segment must match `^[A-Za-z0-9][A-Za-z0-9._-]*$`. The policy additionally rejects absolute/rooted paths, drive-relative and drive-qualified forms, UNC/device/extended namespaces, backslashes, percent encoding, NUL and control characters, colons/alternate data streams, empty/dot/traversal segments, trailing dots/spaces, leading-dot control files, excessive length/depth, uppercase extensions, mismatched media types, executable/shell extensions, package and lock manifests, `.git`, `.codexforge`, `node_modules`, Windows device names (including names with extensions), duplicate normalized paths, ASCII case-insensitive collisions, and any case-insensitive file/ancestor conflict in either input order.

## Validation pipeline

1. **Contract/schema** — anchored output, duplicate JSON keys, strict keys/types/version/Unicode.
2. **Bundle limits** — file count, individual UTF-8 byte length, aggregate bytes.
3. **Paths/collisions** — complete conservative cross-platform path policy and deterministic ordering.
4. **Content safety** — restricted parsed HTML/SVG subsets, PostCSS syntax tree, Acorn JavaScript AST, JSON parse, text controls.
5. **Entrypoint** — one root `index.html` with exact HTML media type.
6. **Local references** — exact-case inventory resolution from the source directory; no traversal, schemes, queries, encoding, or missing files.
7. **HTML structure** — explicit balanced subset with doctype, html/head/body/title/main/h1, UTF-8 charset, and viewport.
8. **Accessibility** — html language, visible title/h1, image alt, labelled controls, named buttons and links; optional missing header/footer landmarks are an honest nonblocking warning.
9. **Preview readiness** — every blocking issue disables preview and materialization.
10. **Manifest/hashes** — ordered UTF-8 lengths and SHA-256 values, bundle digest, inventory digest, issue digest, and validation digest.

At most 64 issues are collected. If the limit is reached, validation adds one blocking overflow issue and stops. Every issue has a stable code, stage, severity, optional file path, bounded message, bounded repair context, and materialization-blocking flag. Generated JavaScript is parsed but never executed on the server.

A schema-valid but policy-invalid output is never persisted as an artifact proposal. Generation atomically records its bounded validation result and exact run provenance in `rejected_output`; an invalid repair atomically consumes attempt 1 and enters `failed` while retaining every earlier immutable materialization and export manifest. The terminal write uses one bounded same-record persistence reconciliation if publication throws, without another provider execution, retry loop, fallback, or substitution.

## Content policy

### HTML

HTML uses a deliberately restricted tokenizer plus the installed structured parser. It requires every opening and closing tag to terminate, explicit balanced tags, quoted attributes, exactly one top-level `html` element, whitespace only outside that root, one direct `head` followed by one direct `body`, `title` under `head`, and `main`/`h1` under `body`. Required native semantics and the title/H1 contribution must remain visible and exposed to accessibility APIs; `hidden`, `aria-hidden`, a collapsed `details` ancestor, or a semantics-erasing role cannot satisfy them. Unsupported declarations, comments, duplicate attributes/IDs, unknown tags/attributes, inline style/script, style elements, event attributes, `iframe`, `object`, `embed`, `base`, metadata refresh/equivalents, all `form` elements, `srcset`, ping, target, download, unsafe schemes, encoded URLs, root/protocol-relative URLs, and unresolved references fail. Anchors require one exact safe local `href`; buttons require exact `type="button"`. Summary controls cannot contain interactive descendants. Labels may wrap only their one exact matching labelable control and no unrelated interactive descendant. Positive, removed, or synthetic tab order is rejected: `tabindex` is limited to `0` on native interactive elements. Roles cannot replace native controls or required document semantics; only the documented passive alert/status and decorative-image cases are accepted. Script tags must be empty classic local `.js` references with `defer`; stylesheet links must be exact local `.css` references. Same-document fragments are accepted only for ordinary anchor navigation; fragment-only or fragment-bearing script, stylesheet, and image resource references fail before type or inventory acceptance. Labels and interactive names must contain visible, exposed text rather than hidden-only content.

This is a conservative accepted subset, not a general HTML5 sanitizer. Unsupported valid HTML is rejected rather than normalized.

### JavaScript

Acorn parses classic scripts without execution, collects comments structurally, and `eslint-scope` must successfully resolve every lexical reference before the policy walk continues. All line and block comments are rejected, including source-map directives that could cause browser developer tooling to request an external resource; comment-like characters inside a parsed string remain string content and are evaluated by the ordinary literal policy. The bounded AST walk rejects import/export/dynamic import, `eval`, `Function`, unresolved or temporal-dead-zone identifiers, network and Navigation APIs, XHR, sockets/events, beacons, service workers/workers/worklets, WebAssembly, storage/cookies/caches/indexedDB, file pickers/readers, Node/Deno/Bun/server globals, navigation/history, popups, parent/opener/frame access, messaging, HTML injection sinks (including modern unsafe HTML APIs), DOM construction and parsing, URL/resource-bearing DOM or CSSOM mutation, object URLs, reflection/proxies, constructor/prototype chains, dynamic computed or non-allowlisted member calls, common obfuscation helpers, repeated animation/interval/idle scheduling APIs, async or generator functions, classes, spread/rest/default parameters, object methods/accessors/function containers, recursive synthetic events, statically excessive or unprovable loops, calls from loop bodies, constant-truthy loop tests, named direct or mutual recursion (including nested callback edges), promise-microtask recursion primitives, BigInt/exponentiation, `in`/`instanceof`, debugger statements, nested/compound/general identifier assignment, classic-script `var`, browser-global-shaped bindings, high-amplification string/array helpers, large allocation constructors/string repetition, regular-expression execution, disruptive browser capabilities, destructive DOM removal, and external/dangerous URL literals. One literal classic loop is capped at 10,000 iterations. Nested literal work and the cumulative statically visible work across sequential loops are each capped at 100,000 units for the complete script. v0 accepts at most one `.js` file. It may query exact IDs in every referencing validated HTML document, register each bounded synchronous event listener exactly once during top-level initialization, run ordinary proven-bounded call-free classic loops, and update literal safe text, classes, and typed value/checked/disabled state. Identifiers remain immutable except for the exact update expression of a validator-proven `for` counter; listener registration inside a function is rejected to prevent accumulated work. Scripts may not mutate input type, synthesize markup, construct resource nodes, or remove document elements.

Static analysis cannot prove arbitrary JavaScript terminates. Browser CPU or memory denial of service remains a documented residual risk; obvious patterns and broad dynamic, reflection, attribute-mutation, and navigation primitives are rejected, and preview has an immediate parent-side stop control.

### CSS

PostCSS parses declarations and rule structure. The exact AST topology permits declarations only inside style rules; style rules must be direct root children or direct children of one top-level block-bodied `@media` or `@supports`; and those conditional blocks may contain only style rules. Root declarations, declarations directly inside conditional blocks, nested rules, nested conditionals, and CSS nesting therefore fail before they can bypass declaration or contrast analysis. Selectors must also match the conservative complete local grammar for type, class, ID, bounded attribute, allowlisted state, and ordinary combinator selectors; malformed or unsupported selector syntax fails closed. Control characters, comments that could split security-sensitive CSS tokens, empty declarations, malformed arithmetic values, imports, font faces, unknown or blockless at-rules, escapes, all URL/resource functions, remote schemes, expression/behavior bindings, image sets, dynamic attributes, every animation/transition, interaction or focus-indicator suppression, rendering suppression, zero-sized clipped rule boxes, unsafe margin/padding/border/inset displacement, invalid or extreme outline offsets, obvious off-screen positioning, and custom remote-resource mechanisms fail.

### JSON

JSON artifacts must be complete strict JSON with unique object keys at every nesting level. Duplicate keys are rejected before ordinary parsing can silently overwrite an earlier value.

### SVG

SVG is an external-file-only passive XML subset with exactly one top-level `svg` root and no non-whitespace text outside it. DTDs, entities, processing instructions, comments, CDATA, script/style, foreign objects, images, `use`, animation, href/xlink, event attributes, unknown elements/attributes, and external/dangerous references fail. A standard namespace and an exactly four-number, finite, conservatively bounded viewBox are required; explicit width and height must be positive when supplied. Only resolved earlier `url(#local-id)` references are accepted where passive paint/clip/mask attributes permit them.

## Atomic materialization

After validation succeeds and the kill switch is clear:

1. The exact contract is reconstructed and all ten deterministic validation stages are rerun; the complete bundle and validation record must match the approved evidence.
2. Paths are validated again.
3. On Windows, the service constructs one ordered publication input whose entries each contain an exact relative path-segment array and a complete `Buffer`. The entries include every artifact file plus immutable `manifest.json`, `validation.json`, and `revision.json` metadata. Non-Windows creator mutation is unavailable in v0 and fails closed before persistence; no path-check-then-mutate fallback is used.
4. Every buffer is completely constructed before the native publication boundary is entered. Artifact bytes are byte-counted and SHA-256 bound to the validated inventory; canonical metadata is strict-schema and digest verified in memory.
5. One trusted-root-handle-relative native transaction creates every directory and file exclusively, writes, syncs, reads back, and verifies all bytes and metadata inside the transaction, then makes the complete nonexistent six-digit revision tree visible at its sole commit. No materialization staging name or partial revision tree is externally visible.
6. Exact post-commit reconciliation enumerates the complete revision tree, rejects any missing or unlisted node, rereads the canonical revision, and accepts it only when its ordered inventory, file bytes, byte lengths, hashes, validation evidence, canonical newline-terminated metadata bytes, source binding, and audit references match that same publication attempt. Parse-equivalent noncanonical JSON and a self-consistent but conflicting tree are never adopted.
7. If the Windows helper is missing, cannot load, or the volume lacks the required transaction capability, mutation returns a bounded unavailable error with rebuild/NTFS guidance; it never degrades to pathname mutation.
8. A failed Windows transaction aborts before publication and leaves no creator materialization stage residue.

Persisted state, lock, manifest, revision, and validation JSON rejects duplicate object keys, and stored timestamps use exact UTC millisecond ISO form. An existing artifact revision is never overwritten. A failed repair or publication preserves every previous valid revision. Generated content is never applied to the CodexForge source tree.

## Preview threat model

Preview is a server-owned static file route, not a generated process. Start first rereads the complete publication and requires its manifest/materialization to match the immutable project-state digests before activation. Every request must match an active preview ID bound to one project and artifact revision, and every later read repeats that state-approved manifest binding. The requested file must match the exact inventory before any content response; bytes and hashes are reverified. The active state and kill switch are checked before the read, and active state is checked again after the read so a concurrent stop fails closed. The preview CSP source prefix is derived from the exact browser-visible authority returned by the validated loopback Host/Origin guard, never an internal development-server request URL.

The parent renders:

```html
<iframe sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe>
```

There is no `allow-same-origin`, forms, popups, downloads, modals, top navigation, or parent access. HTML responses allow local scripts, styles, and images only from the exact active preview-revision URL prefix and otherwise enforce:

```text
default-src 'none';
base-uri 'none';
object-src 'none';
frame-src 'none';
child-src 'none';
connect-src 'none';
font-src 'none';
media-src 'none';
manifest-src 'none';
worker-src 'none';
form-action 'none';
frame-ancestors 'self';
sandbox allow-scripts
```

Non-HTML documents receive no script/style/image source. Every preview response sends `X-Content-Type-Options: nosniff`, `Cache-Control: no-store, max-age=0`, `Referrer-Policy: no-referrer`, `X-DNS-Prefetch-Control: off`, `X-Frame-Options: SAMEORIGIN`, and a restrictive `Permissions-Policy`. Generated code never executes in Node. Stop and creator cancellation synchronously suppress the iframe in the parent before awaiting the server response. That exact project/preview suppression survives a reload in parent session storage when the response outcome is unknown, while a confirmed fresh preview start clears it; the opaque sandbox cannot access the parent record. A confirmed stop persists inactive state and makes later content requests fail. The parent `/jarvis-websites` route separately sends `Content-Security-Policy: frame-ancestors 'none'` and `X-Frame-Options: DENY`, so approval and execution controls cannot be embedded by another page while the dedicated preview response remains frameable only by the local parent.

## One-repair policy

Repair is available exactly once when validation has at least one error or warning. It never starts automatically.

Before leaving `ready` or `rejected_output`, the server requires enough bounded audit and idempotency capacity to finish repair approval/execution plus preview start/stop and export. If that complete tail cannot fit, repair is refused without consuming the attempt or stranding the current valid revision.

1. The operator reviews the exact current proposal/revision and issue digest.
2. The operator explicitly requests repair.
3. The server records attempt 1 and binds a new Private Alpha repair run awaiting approval.
4. The UI again shows exact local model, data boundary, source revision, and issues.
5. The operator separately approves repair.
6. The operator separately executes repair once.
7. The request sends the strict artifact schema, original bounded brief, source revision/digests, and at most eight bounded issue summaries. It remains within the protected 8,000-character Private Alpha request envelope and does not resend arbitrary oversized raw output.
8. The response must be a complete replacement bundle, never a patch.
9. A valid replacement publishes as the next artifact revision; previous valid revisions remain immutable.
10. A failed repair enters an honest failed state. There is no second repair, retry, fallback, or substitution. If an earlier valid revision exists, the operator may explicitly export that preserved hash-verified revision.

## Export manifest contract

The canonical `codexforge.creator.export.v1` manifest contains:

- creator project ID, title, and kind;
- artifact revision and `index.html` entrypoint;
- ordered file paths, exact media types, UTF-8 byte lengths, and SHA-256 hashes;
- aggregate bytes and digest;
- validation digest and source request digest;
- exact source Private Alpha run ID;
- `ollama-local`, `ollama-local::gpt-oss:20b`, `gpt-oss:20b`, and `local-machine` identities;
- creation timestamp and bounded audit reference IDs;
- a SHA-256 manifest digest calculated over every field except the digest itself.

The export action rereads the publication metadata and every inventory file, then rechecks strict manifest/path/media schema, byte lengths, per-file hashes, aggregate digest, validation digest, manifest digest, and exact equality with the immutable state-approved manifest/materialization before exposing download links. Manifest and file downloads repeat that state binding. Actual v0 export is the canonical manifest JSON plus individual validated static files. ZIP and deployment are explicitly unavailable.

## UI and accessibility

The focused creator has one H1 and follows logical DOM order: Describe, Review plan, Approval/Execution, Validation/Files, Preview, Repair, Export, Audit. Native controls are keyboard operable. Labels are explicit, state changes use a live status, errors use an alert, and every disabled interactive control has its own stable, unique `aria-describedby` target that is visible and exposed to assistive technology. The review-plan reason distinguishes an operation in progress from an already-created plan; the recovery-action reason identifies that exact action as unavailable while the current creator operation finishes. Focus is strongly visible, generated text is rendered escaped in bounded `<pre>` elements, long valid paths wrap without horizontal overflow, mobile layouts collapse to one column, and reduced-motion preferences disable nonessential motion.

The UI always shows the exact model, local boundary, 4,096-token limit, file/byte/path bounds, destination, state revision, artifact revision, approval state, execution state, validation findings, file inventory, preview state, repair gate, manifest, audit, and next recovery action. It does not advertise full-stack, deployment, package, video, game, email, voice, screen control, or paid capabilities.

## Deterministic validation and isolation

The D1 and D2 executable smokes use `.codexforge/creator-tests/<suite>` and matching Private Alpha test roots. Provider output is supplied only by an injected local fixture adapter after the real test Private Alpha approval and explicit execution gates. The production runtime has no fixture fallback; deterministic HTTP mode is wired to an adapter that always traps transport and generation. A shared smoke-only trap blocks and counts global fetch, HTTP/HTTPS/HTTP2, raw TCP/TLS/UDP, DNS, WebSocket, production provider-adapter construction, credential-like environment access and credential resolvers, child processes, worker threads, and every filesystem mutation outside exact deterministic roots. Child-process classification separately counts model-download, package-install, and deployment attempts. Filesystem guards separately count production creator and production Private Alpha mutation attempts. Every counter is asserted from its live value and printed; fixture availability/delivery counts are reported separately.

## Recovery and controlled live acceptance plan

Recovery uses the project query parameter or project ID to reload the exact server record. A rejected generation can use its one repair. A stopped preview can be restarted only from `ready`. A failed repair preserves its prior materialized revision and audit and permits explicit export of that revision; further model work requires a new explicit creator request. An interrupted final state write can be resumed with the retained original key, or after reload through a new explicit action against the exact current intermediate revision. Either path can adopt only the already-published revision matching the persisted action purpose, source run, validation digest, request digest, and deterministic audit references; it never makes a second provider call. Manifest/hash mismatch, unsafe root, stale revision, and ambiguous lock conditions require manual inspection rather than automatic mutation.

A later separately authorized controlled live acceptance should:

1. begin from a clean, hash-verified checkpoint;
2. confirm installed local Ollama and exact `gpt-oss:20b` availability without changing catalog or qualification;
3. create one isolated disposable creator request with a small accessible brief;
4. capture the exact plan and awaiting-approval state;
5. approve manually and execute exactly once;
6. verify source run/provider/model/data identity, validation, atomic revision, preview start/stop, manifest, file hashes, and audit;
7. make no Groq, paid, credential, download, package, deployment, or source-project mutation;
8. stop on any mismatch, preserve evidence, and clean only the authorized disposable creator project through a separately reviewed lifecycle.

No controlled live provider call is part of Macro D1+D2 implementation validation.
