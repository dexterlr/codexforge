# Qualified SDR export colour contract

New renders use immutable specification v4 and the code-owned policy
`SDR_BT709_LIMITED_RGB_COMPOSITE_V1`. The preset and output asset identity stay
unchanged; new jobs allocate subsequent output versions. Historical v1/v2/v3
specifications, receipts and output bytes are not migrated. Replaying an old
request key still returns that historical request; a corrected render is a new
ordinary saved-head request.

Video admission requires existing qualified H.264, 8-bit `yuv420p`, BT.709
primaries/transfer/YCbCr matrix and independently declared limited (`tv`) range.
The renderer also probes the immutable source bytes before execution. Missing,
ambiguous or unsupported source colour is blocked, never assumed to be BT.709.

Source YCbCr is explicitly decoded to full-range nonlinear BT.709 RGB. Canvas,
static video transforms, video opacity and title colours compose in that encoded
RGB domain using straight alpha. This is not linear-light compositing or colour
grading. Keeping `overlay` in RGB prevents its default YUV420 negotiation from
inserting an unspecified RGB-to-YCbCr conversion.

Chroma conversion uses explicit point resampling at the two RGB/YUV boundaries.
This avoids introducing a second chroma blur across already-subsampled source
edges; ordinary geometric scaling keeps its existing scaler. The policy binds
this choice as `chromaResampling: POINT`. A retained one-frame diagnostic proved
the default resampling exceeded the unchanged strong-pixel threshold, whereas
point chroma resampling retained source agreement without changing that threshold.

The final composite is explicitly converted once to limited-range BT.709
8-bit YUV420P with left chroma siting. Encoder and MP4 colour signalling match
the resulting samples: BT.709 primaries/transfer/matrix and limited range.
Publication additionally checks output colour properties before full decode
and immutable publication. Independent acceptance checks MP4 `colr`, H.264 VUI,
decoded-frame properties and source-colour agreement using actual signalling.

The four-occurrence ordered PCM audio path, exact sample timing, unclamped
clipping rejection, no-normalization policy, source-video-audio mute and
publication safeguards are unchanged. This does not add HDR, tone mapping,
arbitrary colour conversion, LUTs, 10-bit output or new presets.

Prior T06 output versions1/2 remain valid historical jobs and retained delivery
identities, but failed independent picture acceptance. A later corrected output
does not relabel those old files as picture-accepted.
