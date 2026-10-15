"""Tiny edit/reopen fixture only. Not a render or production asset."""
import bpy
from pathlib import Path
import sys

args = sys.argv[sys.argv.index("--") + 1:]
if len(args) != 1 or Path(args[0]).exists():
    raise RuntimeError("MATERIAL_FIXTURE_PATH_INVALID")
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.name = "MATERIAL_EDIT_FIXTURE"
scene.render.engine = "BLENDER_EEVEE"
scene.render.fps = 25
scene.render.fps_base = 1
scene.frame_start, scene.frame_end = 1, 75
scene.render.resolution_x, scene.render.resolution_y = 1280, 720
scene.view_settings.view_transform = "Standard"
scene.view_settings.look = "None"
scene.view_settings.exposure = 0
scene.view_settings.gamma = 1
scene.display_settings.display_device = "sRGB"
scene.world = bpy.data.worlds.new("FIXTURE_WORLD")
scene.world.use_nodes = True
bpy.ops.object.camera_add(location=(0, -5, 3))
scene.camera = bpy.context.object
scene.camera.name = "PROTECTED_DELIVERY_CAMERA"


def object_with_material(name, material_name, x):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, 0, 0))
    obj = bpy.context.object
    obj.name = name
    material = bpy.data.materials.new(material_name)
    material.use_nodes = True
    material.node_tree.nodes.get("Principled BSDF").inputs["Base Color"].default_value = (0.18, 0.25, 0.4, 1)
    obj.data.materials.append(material)
    return obj, material


target, safe = object_with_material("EDITABLE_PROP", "INDEPENDENT_PROP_MATERIAL", -2)
for name, kind in [("proof_vector", "FLOAT_VECTOR"), ("proof_colour", "FLOAT_COLOR"),
                   ("proof_float", "FLOAT"), ("proof_int", "INT"), ("proof_bool", "BOOLEAN")]:
    target.data.attributes.new(name, kind, "POINT")
target.data.uv_layers.new(name="proof_uv")
target.location.x = -2
target.keyframe_insert("location", frame=1)
target.location.x = -1
target.keyframe_insert("location", frame=75)
screen, protected = object_with_material("PROTECTED_DISPLAY", "PROTECTED_WHITE", 0)
protected.node_tree.nodes.get("Principled BSDF").inputs["Base Color"].default_value = (1, 1, 1, 1)
first, shared = object_with_material("SHARED_A", "SHARED_MATERIAL", 2)
bpy.ops.mesh.primitive_cube_add(size=1, location=(4, 0, 0))
bpy.context.object.name = "SHARED_B"
bpy.context.object.data.materials.append(shared)
unsupported, emission = object_with_material("UNSUPPORTED_GRAPH", "EMISSION_GRAPH", 6)
emission.node_tree.nodes.new("ShaderNodeEmission")
animated, animated_material = object_with_material("ANIMATED_PROP", "ANIMATED_MATERIAL", 8)
colour = animated_material.node_tree.nodes.get("Principled BSDF").inputs["Base Color"]
colour.keyframe_insert("default_value", frame=1)
colour.default_value = (0.3, 0.2, 0.1, 1)
colour.keyframe_insert("default_value", frame=75)
bpy.ops.object.armature_add()
bpy.context.object.name = "FIXTURE_ARMATURE"
bpy.context.object.data.name = "FIXTURE_ARMATURE_DATA"
isolated_collection = bpy.data.collections.new("FIXTURE_VISIBILITY_COLLECTION")
scene.collection.children.link(isolated_collection)
isolated_collection.objects.link(screen)
scene.frame_set(1)
bpy.ops.wm.save_as_mainfile(filepath=args[0], check_existing=False, compress=True)
print("STUDIO_MATERIAL_FIXTURE_CREATED", flush=True)
