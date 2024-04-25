import os
import sys
import json
import time
import base64
import text_to_3D
from tqdm import tqdm
from datetime import datetime
from flask import Flask, request, jsonify 
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/get_obj', methods=['POST'])
@cross_origin()
def get_obj():
    try:
        # Retrieve the string from the request data
        data = request.get_json()
        input_string = data.get('input_string')
        input_image = data.get('input_image')
        if not input_string:
            return jsonify({'error': 'Input string is required'}), 400
        if not input_image:
            return jsonify({'error': 'Input image is required'}), 400
        # decode the image
        input_image = input_image.split(",")[-1]
        input_image = base64.b64decode(input_image)
        pth = f"Inputs/input_image_{datetime.now().strftime('%Y%m%d%H%M%S')}.png"
        with open(pth, 'wb') as f:
            f.write(input_image)        

        obj_model_path = text_to_3D.text_to_3D(input_string)
        
        # encode the obj model
        with open(obj_model_path, 'rb') as f:
            obj_model = base64.b64encode(f.read()).decode('utf-8')

        return (jsonify([obj_model]), 200)
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
    
if __name__ == '__main__':
    app.run("localhost", port=61111)