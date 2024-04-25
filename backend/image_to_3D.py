from gradio_client import Client, file
import os

# Initialize the client
client = Client("TencentARC/InstantMesh")

def image_to_3D(input_image_path):
    # Step 1: Check if the input image is valid
    result = client.predict(input_image=file(input_image_path), api_name="/check_input_image")

    # Step 2: Preprocess the input image
    do_remove_background = True  # Set to False if you don't want to remove the background
    result = client.predict(input_image=file(input_image_path), do_remove_background=do_remove_background, api_name="/preprocess")
    processed_image_path = result
    print(f"Processed Image: {processed_image_path}")

    # Step 3: Generate multi-view images
    sample_steps = 75  # Adjust the value as needed
    sample_seed = 42  # Adjust the value as needed
    result = client.predict(input_image=file(processed_image_path), sample_steps=sample_steps, sample_seed=sample_seed, api_name="/generate_mvs")
    multi_view_images_path = result
    print(f"Multi-view Images: {multi_view_images_path}")

    # Step 4: Generate 3D models
    result = client.predict(api_name="/make3d")
    obj_model_path = result[0]
    glb_model_path = result[1]

    print("Output 3D files:")
    print(f"OBJ Model: {obj_model_path}")
    print(f"GLB Model: {glb_model_path}")

    os.system(f"cp {obj_model_path} Models")
    print(f'OBJ Model saved at Models/{obj_model_path.split("/")[-1]}')

    return {
        "processed_image": processed_image_path,
        "multi_view_images": multi_view_images_path,
        "obj_model": obj_model_path,
        "glb_model": glb_model_path,
    }

#image_to_3D("Images/output_20240424220006.png")