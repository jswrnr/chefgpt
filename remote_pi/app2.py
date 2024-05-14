from flask import Flask, send_file
import requests
from io import BytesIO
from flask_cors import CORS
import sys
sys.path.append('/home/pi/.local/lib/python3.9/site-packages')
import cv2
import time
import base64

app = Flask(__name__)
CORS(app)

def capture_image(image_name):
	camera = cv2.VideoCapture(0)
	if not camera.isOpened():
		print("ERROR: COULD NOT OPEN CAMERA.")
		return

	camera.set(cv2.CAP_PROP_FRAME_WIDTH, 3840)
	camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 2160)

	print("GOT CAMERA")
	camera.set(cv2.CAP_PROP_ISO_SPEED, 100)

	ret, frame = camera.read()

	if not ret:
		print("ERROR: COULD NOT CAPTURE IMAGE.")
		return

	cv2.imwrite('/home/pi/remote_pi/' + image_name, frame)

	time.sleep(2)

	camera.release()

	cv2.destroyAllWindows()

#for testing purposes
@app.route('/get_products_static')
def get_products_static():
	image_path = 'image.jpg'
	capture_image(image_path)
	return send_file('veggies.jpg', mimetype='image/jpeg')
	
#for testing purposes
@app.route('/get_receipt_static')
def get_receipt_static():
	image_path = 'image.jpg'
	capture_image(image_path)
	return send_file('receipt2.jpg', mimetype='image/jpeg')

@app.route('/get_products')
def get_veggies():
	try:
		image_path = 'products.jpg'
		capture_image(image_path)
		with open(image_path, "rb") as image_file:
			encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
		return {'image': encoded_image}
	except Exception as e:
		print(e)

@app.route('/get_receipt')
def get_receipt():
	image_path = 'receipt.jpg'
	capture_image(image_path)
	return send_file(image_path, mimetype='image/jpeg')


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5422)
