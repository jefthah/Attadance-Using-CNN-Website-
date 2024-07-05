from flask import Flask, render_template, request, jsonify
import cv2
import os

app = Flask(__name__)

def capture_images(user_id):
    cam = cv2.VideoCapture(0)
    user_dir = f"dataset/{user_id}"

    if not os.path.exists(user_dir):
        os.makedirs(user_dir)

    img_counter = 0
    while img_counter < 50:
        ret, frame = cam.read()
        if not ret:
            break
        img_name = f"{user_dir}/image_{img_counter}.jpg"
        cv2.imwrite(img_name, frame)
        img_counter += 1
        cv2.waitKey(100)  # Delay to simulate time gap between captures

    cam.release()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/capture', methods=['POST'])
def capture():
    user_id = request.form['user_id']
    capture_images(user_id)
    return jsonify({"message": "Images captured successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)