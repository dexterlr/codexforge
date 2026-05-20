import { body, panel, title } from "./VideoRenderComponentStyles";

export function VideoRenderSafetyNotice() {
  return (
    <section style={panel} data-video-render-safety-notice="VideoRenderSafetyNotice renders preview-only no render execution no command execution no ffmpeg execution no file writes future executor boundary preserve latest-message authority no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI">
      <h2 style={title}>Safety Notice</h2>
      <p style={body}>
        Video Render Job Preview v1 is preview-only. It performs no render execution, no command execution, no ffmpeg
        execution, no Blender execution, no ComfyUI execution, no Unreal execution, no package/build, no file writes, no
        provider calls, and no artifact generation. Future executor boundary and operator approval are required.
        Preserve latest-message authority.
      </p>
    </section>
  );
}
