# Provider-independent local footage intake

The canonical control panel is `/animation-studio`. Local files exported from an AI service, camera or editor use the same provider-independent intake path; no service API, account, credential, download or provider success is implied. `/animation-studio/projects/[projectId]/generate` remains a separate, approval-bound provider workspace.

## TRAILER-04 current contract

TRAILER-04 is a bounded large-footage architecture, not unrestricted media storage:

- The configured source ceiling is **2 GiB per file**. A project may contain at most **eight imported local-media versions** and **16 GiB of logical imported bytes** in total. Exact reuse of an already registered source does not create another version merely because a Take or layer will use it.
- The supported source kinds are unchanged: qualified `video/mp4` and `audio/wav`. Video remains one H.264/yuv420p, square-pixel, zero-rotation SDR BT.709 stream with exact 25 fps CFR and even dimensions. Audio remains one PCM s16le, 48 kHz mono or stereo stream. Duration must be positive and no more than 300 seconds. Other containers, codecs, ambiguous streams and timings fail closed.
- The operator still supplies an exact source label and declared rights. Unknown rights remain unknown; licensed media requires license and evidence notes. Filenames and source labels reject control characters and paths. Notes do not fetch URLs or verify rights.
- Provider, model, prompt and original acquisition cost remain unknown. The import records zero local provider-operation cost, not a claim that the original media was free.
- Import creates no provider request, generation job, creative approval or playback/listening approval. Successful technical admission records human review as still required.

The configured limits are enforced both before upload-session creation and again against the canonical project at final publication. They are logical project limits, not a promise that every maximum-size combination can fit on the configured filesystems.

Each FFprobe subprocess retains fixed stdout/stderr caps and exact owned-process termination. Its wall deadline is 30 seconds through the 16 MiB legacy boundary, then increases by 15 seconds per additional started 128 MiB, capped at 270 seconds for the 2 GiB source ceiling. This is a bounded local policy, not a claim that every admitted ceiling/dimension combination has been measured.

## Server-owned sequential upload session

The current UI uses `/api/codexforge/animation-studio/footage/upload`. It retains the exact loopback listener, native Request URL, Host, Origin and operator-marker checks. A caller cannot nominate a local path, remote URL, library ID or storage destination.

The protocol is explicit and server-owned:

1. `POST` creates one durable session from canonical metadata plus the declared byte length.
2. `PUT` appends at the exact next acknowledged offset. Each transport request is bounded to **8 MiB**. Offsets must be sequential; an exact retry of an already acknowledged chunk is idempotent, while replacement bytes or gaps conflict.
3. `GET` inspects the saved state. It never uploads or resumes bytes.
4. `PATCH` explicitly finalizes only after all declared bytes are acknowledged. Finalization hashes the staged file, runs the configured FFprobe qualification, publishes immutable media, and only then adopts the project mutation.
5. `DELETE` explicitly cancels a non-complete session and releases its staged source and durable single-upload claim. A completed immutable import cannot be cancelled through the session.

Only one active upload session owns the durable local import slot. Session creation, ordered appends, finalization and cancellation therefore do not overlap as independent imports. A session can pass through `UPLOADING`, `VERIFYING`, `PROBING` and `PUBLISHING`; terminal outcomes are `COMPLETE`, `FAILED` or `CANCELLED`.

A process restart does not imply that any former in-process owner is still alive. On explicit status inspection, a saved active session without the live finalizer is converted to **`INTERRUPTED`**. No automatic retry, byte upload or publication occurs. Browser filesystem access is not retained across reload, and byte-resume for an incomplete interrupted session is unsupported: the operator must cancel it, reselect the file and explicitly restart from byte zero. The browser retains the new session's opaque finalization key in project-scoped session storage without rendering it. If every byte had already reached the server before interruption, the operator may explicitly request finalization of those retained server-owned bytes. An exact older recovery record that lacks this key remains inspectable and cancelable, but cannot be finalized or strand the durable upload slot.

The upload-session directory contains only staged source bytes and bounded session state. Creating or appending a session creates **no Asset and no editorial Take**. Successful final validation/publication may atomically register or reuse the immutable Asset and attach it to the saved shot; Take and layer creation remain separate editorial actions. A failure before project adoption cannot be presented as a completed import.

The legacy single-request `POST /api/codexforge/animation-studio/footage` seam remains bounded to 16 MiB for compatibility. Large-file UI intake uses the upload-session protocol; the legacy seam is not a byte-resume mechanism.

## Immutable media representation

Published local media uses the existing `studio-footage-chunks-v1` representation:

- immutable **512 KiB** parts;
- at most **4,096** parts, which exactly bounds the 2 GiB source ceiling;
- one canonical index no larger than **512 KiB**;
- per-part SHA-256 plus complete-media byte length and SHA-256; and
- index-last publication, so parts are not reachable as a media object until the complete staged hash has been verified.

Each native publication remains below the existing 1 MiB per-transfer cap. The index never supplies storage paths; paths are derived from validated project, asset, version and content-hash identities. Reads verify every touched part, and a complete verification rehashes all parts in order. Missing, corrupt, duplicate-key or inconsistent data fails closed.

An I/O or aggregate-publication failure can leave immutable unreferenced parts. They are preserved and never automatically deleted. An exact retry can adopt identical bytes; a stale competing project publication cannot silently overwrite the project.

Imported versions preserve predecessor lineage and original bytes. Attaching a new source revision advances the shot revision and clears derived output, selection and approval state while retaining audit evidence of the prior shot. Identical bytes with identical technical/source/rights metadata may reuse the existing Asset; contradictory metadata fails rather than duplicating the content.

## C: staging, C:/D: publication and capacity accounting

The browser never selects a filesystem destination. Server configuration chooses where **new immutable media bytes** publish:

- `workspace` keeps the media parts/index in the project-owned C: store.
- `d-drive` uses the fixed native-handle library under `D:/CodexForge/.codexforge/media-libraries/<libraryId>/`.

C: always owns the project aggregate, asset manifests, shot association, audit, receipts, upload-session ledger and upload staging. D: owns only media whose manifest carries the exact configured D-library binding. Existing C:-resident media is not migrated when D: is enabled, and switching later imports back to C: does not move D:-bound media. D: publication requires the exact D marker and matching C binding; a missing, markerless, substituted or unavailable D library fails closed with no silent C fallback or recreation.

Capacity admission deliberately accounts for coexistence instead of checking only the final source size:

- Before session finalization, the configured C: upload work root must have at least **twice the declared source length plus a fixed 4 GiB reserve**. This covers the staged source, publication copy/materialization exposure and reserve.
- Immediately before immutable publication, the selected C: workspace or D: library must have at least **the source length plus the same fixed 4 GiB publication reserve**.
- Render execution has its own C:-volume materialization gate. It accounts for the sum of selected source bytes, the font copy, two maximum 1 GiB output allocations, and a separate 256 MiB render safety reserve. This render reserve is not the 4 GiB import/publication reserve.

Available space never relaxes the 2 GiB/file, eight-version or 16 GiB/project contract.

## Range preview and streamed render materialization

Preview uses the same-origin footage URL directly in the browser media element. The UI first performs a 12-byte `Range` check, then `<video>` or `<audio>` requests the immutable source with ordinary same-origin HTTP byte ranges. The route supports bounded `GET`/`HEAD`, `Accept-Ranges: bytes`, exact `Content-Length`, `206 Content-Range`, and `416 bytes */<length>` for an invalid range. It does not create a full-file browser Blob URL.

For qualified current media, the server opens the immutable index once and caps every response pull at 512 KiB, verifying each storage part touched by that bounded range. It does not assemble the complete source into a server `Buffer`. Closing or cancelling the response closes both the media reader and repository. Preview remains a read-only convenience: decode/playback success does not grant QC, rights, creative, listening or mix approval.

Render execution likewise opens the exact Asset reader and streams verified 512 KiB chunks into an exclusive C: job file while incrementally hashing and counting it. FFprobe/FFmpeg consume that bounded disk materialization; the Node process does not construct a whole large source `Buffer`. The executor verifies the completed job-file length and hash before probing or rendering, and the storage preflight accounts for all selected source materializations as described above.

## Compatibility and historical baseline

Previously published `studio-local-footage-v1` Assets remain readable **without rewriting their manifests or bytes**. In particular, the original unqualified MP4 form has no fabricated technical-duration metadata and remains on its recorded C: storage path. It can still be read and previewed through the compatibility path, but exact duration-dependent insertion is unavailable until a separately authorized migration exists. Its historical whole-buffer helpers remain capped at 16 MiB and must never be used to assemble new large media.

The first local-footage milestone was intentionally a small-clip slice: MP4 only, 16 MiB/file, eight immutable imported versions, 64 MiB/project, a 30-second single-request read deadline, framing-level validation, and whole-file Blob preview. Those were accurate constraints for that milestone. TRAILER-04 supersedes its active size, transport, qualification and preview contracts while preserving the already stored v1 records and their read compatibility.

The initial operator association also remains narrow: import attaches qualified video to the selected saved shot's inputs or qualified WAV to its audio references. It does not implement arbitrary library migration, global cross-project indexing, proxies, automatic Takes, provider download, production-media cleanup or unrestricted production storage.

## Verification boundary

The focused footage suites cover upload-session lifecycle, capacity, immutable chunk storage, C:/D: library binding, import/publication, UI recovery, Range preview and Studio/editorial integration. Synthetic bytes and deterministic filesystem seams establish contract and recovery behavior; they are not representative production-media playback or creative-QC evidence. Browser playback, representative large-media performance and production configuration remain separate acceptance evidence.
