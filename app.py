'''
To run this server use this command
						env FLASK_APP=app.py flask run
'''

from flask import Flask, escape, request, jsonify
import json
import base64

app = Flask(__name__)

@app.route('/', methods=['POST'])

def hello():
	if request.method == 'POST':
		cropImage = request.files['cropImage']
		print(cropImage)
		# run through model
		cropImageAnnotated = cropImage
		longitude = 90.88
		latitude = 60.76
		altitude = 2100
		total_crops = 4000

		return (
			jsonify(
					isError= False,
					message= "Success",
					statusCode= 200,
					data= {
							"cropImageAnnotated":base64.b64encode(cropImageAnnotated.read()),
							"longitude":longitude,
							"latitude":latitude,
							"altitude":altitude,
							"total_crops":total_crops
							}
					), 200
				)
