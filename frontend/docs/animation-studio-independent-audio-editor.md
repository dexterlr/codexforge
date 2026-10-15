# Independent AUDIO occurrences — TRAILER-06

Music, voiceover/dialogue and SFX are operator names over the existing canonical
`AUDIO` layer. Each occurrence has its own stable layer ID, timing, gain, fades,
mute/enabled state and provenance. Its source retains the immutable Asset/version
reference; source hashing remains in the existing asset and render specifications.
Inserting the same Asset again creates an occurrence, never another import/version.

The editor already accepted multiple AUDIO layers. There was no one-audio schema,
insertion or timeline ceiling to remove. The existing schema still permits 32
composition layers. The new renderer's initial four-AUDIO-occurrence policy is an
export qualification limit, including saved disabled/muted occurrences, not a new
permanent project schema maximum.

`SET_LAYER_PROPERTIES` now accepts the existing canonical `name` field (nonblank,
at most 160 characters, no control characters). AUDIO property requests send only
their editable name, enabled state and audio settings; they no longer send forbidden
visual opacity/transform fields. Gain remains −60 through +12 dB. Each exact fade
must individually fit the saved duration; overlapping fades remain independent.

`SET_AUDIO_LAYER_TIMING` is the small AUDIO-only extension for independent exact
`start`, `duration` and `sourceOffset` edits. The usual project/composition/layer IDs,
expected working-copy and composition revisions, timestamp and idempotency key
apply. All three canonical reduced fractions and saved fades must align exactly
to 48 kHz samples. Duration is positive. Source offset plus duration must fit the
qualified immutable source; start plus duration must fit the saved composition.
Shortening past a saved fade fails and asks for an explicit prior fade edit.
The operation never rounds to video frames, stretches, loops, changes another
layer, alters source identity, or changes composition duration. Existing generic
MOVE and inward AUDIO TRIM remain supported; VIDEO-only SPLIT stays VIDEO-only.

The command uses the same entity staging, atomic head publication, immutable
receipts, stale/replay handling and persistent Undo/Redo history as other edits.
Historical requests/journals are read without rewriting. New names and timing
drafts use the existing recoverable local draft surface, and unresolved drafts
continue to block render submission. Text inputs retain normal native Undo.

The saved audio participation list shows all occurrences by readable name and
stable ID with saved source/version, timing, level, fades and mute/exclusion. It
uses the existing enabled/solo semantics. No monitor solo or separate final-mix
state is introduced. The interactive preview remains limited; completed exports
are the synchronized audiovisual review surface.

Focused coverage is in `test-animation-studio-trailer-06-audio-editor.mjs`, the
TRAILER-06 cases in `test-animation-studio-trailer-03.mjs`, and the additional
working-copy/QC cases in `test-animation-studio-trailer-ui.mjs`. Real restart,
responsive Browser and decoded-output acceptance remain separate milestone
evidence; focused tests do not claim those outcomes.
