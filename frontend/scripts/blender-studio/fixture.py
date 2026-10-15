"""Tiny qualification only: two flat colour frames, no EH-CAT or external files."""
import bpy
from pathlib import Path
import sys

args = sys.argv[sys.argv.index("--") + 1:]
if len(args) != 2 or args[1] not in ("SAFE", "DRIVER"):
    raise RuntimeError("FIXTURE_ARGUMENTS_INVALID")
destination = Path(args[0])
if destination.exists() or destination.suffix != ".blend":
    raise RuntimeError("FIXTURE_DESTINATION_INVALID")
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
scene = bpy.context.scene
scene.name = "STUDIO_BLENDER_QUALIFICATION"
scene.render.engine = "BLENDER_EEVEE"
scene.render.fps = 25
scene.render.fps_base = 1
scene.frame_start, scene.frame_end = 1, 2
scene.render.resolution_x, scene.render.resolution_y = 1280, 720
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = "Standard"
scene.view_settings.look = "None"
scene.view_settings.exposure = 0
scene.view_settings.gamma = 1
scene.display_settings.display_device = "sRGB"
scene.render.film_transparent = False
scene.render.use_compositing = False
scene.render.use_sequencer = False
scene.render.use_motion_blur = False
scene.render.dither_intensity = 0
scene.eevee.taa_render_samples = 1
bpy.ops.object.camera_add(location=(0, 0, 4))
camera = bpy.context.object
camera.name = "QUALIFICATION_CAMERA"
camera.data.type = "ORTHO"
camera.data.ortho_scale = 4
scene.camera = camera
# A known scene-linear neutral emission; expected encoded sRGB and BT709 are
# derived independently in the qualification test, not from the filter string.
bpy.ops.mesh.primitive_plane_add(size=20)
plane = bpy.context.object
material = bpy.data.materials.new("KNOWN_LINEAR_018")
material.use_nodes = True
material.node_tree.nodes.clear()
emission = material.node_tree.nodes.new("ShaderNodeEmission")
emission.inputs["Color"].default_value = (0.18, 0.18, 0.18, 1)
output = material.node_tree.nodes.new("ShaderNodeOutputMaterial")
material.node_tree.links.new(emission.outputs[0], output.inputs["Surface"])
plane.data.materials.append(material)
if args[1] == "DRIVER":
    # Deliberately rejected first-profile feature; no script or file access.
    plane.driver_add("location", 0).driver.expression = "0.0"
bpy.ops.wm.save_as_mainfile(filepath=str(destination), check_existing=False, compress=True)
print("STUDIO_FIXTURE_CREATED", flush=True)
