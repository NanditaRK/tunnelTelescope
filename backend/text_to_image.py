import requests
import io
from PIL import Image
from datetime import datetime

API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.content

def text_to_image(prompt):
    print(f"Generating image for prompt: {prompt}")
    image_bytes = query({
        "inputs": prompt,
    })
    # You can access the image with PIL.Image for example
    image = Image.open(io.BytesIO(image_bytes))
    image_path = f"Images/output_{datetime.now().strftime('%Y%m%d%H%M%S')}.png"
    image.save(image_path)
    return image_path

#print(text_to_image("A beautiful sunset over the mountains"))