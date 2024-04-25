import os
import json
import text_to_image
import image_to_3D

def text_to_3D(prompt):
    # Step 1: Generate image from text
    image_path = text_to_image.text_to_image(prompt)
    print()
    print(f"IMAGE GENERATED: {image_path}")
    print()

    # Step 2: Generate 3D model from image
    result = image_to_3D.image_to_3D(image_path)['obj_model']
    print()
    print(f"3D MODEL GENERATED: {result}")
    print()

    return result

#text_to_3D("A beautiful sunset over the mountains")