from flask import Flask, request, jsonify
import cv2
import os
import re
import math
import base64
from io import BytesIO
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Tambahkan ini untuk mengizinkan semua asal
app.config['UPLOAD_FOLDER'] = 'dataset'

# Koordinat kampus (latitude dan longitude)
campus_lat = -6.315585237822579  # Ganti dengan koordinat kampus
campus_lon = 106.79444622703417  # Ganti dengan koordinat kampus
radius = 0.5  # Radius dalam kilometer

def haversine(lat1, lon1, lat2, lon2):
    # Menghitung jarak antara dua koordinat
    R = 6371  # Radius bumi dalam kilometer
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lat1 - lon2)
    a = math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) * math.sin(dlon / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance

def save_captured_image(user_id, image_data):
    user_dir = os.path.join(app.config['UPLOAD_FOLDER'], user_id)
    if not os.path.exists(user_dir):
        os.makedirs(user_dir)

    img_counter = len([name for name in os.listdir(user_dir) if os.path.isfile(os.path.join(user_dir, name))])
    img_name = f"{user_dir}/image_{img_counter}.jpg"

    # Decode the base64 image
    image = Image.open(BytesIO(base64.b64decode(image_data)))
    image.save(img_name)
    return img_name

@app.route('/attendance', methods=['POST'])
def attendance():
    user_id = request.form['user_id']
    user_lat = float(request.form['latitude'])
    user_lon = float(request.form['longitude'])
    image_data = request.form['image']

    print(f"Received user ID: {user_id}")
    print(f"Received latitude: {user_lat}, longitude: {user_lon}")

    # Validasi user ID
    if not re.match("^[a-zA-Z0-9_-]*$", user_id):
        print("Invalid user ID")
        return jsonify({"message": "Invalid user ID"}), 400

    try:
        # Simpan gambar yang di-capture
        save_captured_image(user_id, image_data)
        print(f"Image saved for user ID: {user_id}")

        # Validasi lokasi pengguna
        distance = haversine(campus_lat, campus_lon, user_lat, user_lon)
        print(f"Calculated distance: {distance}")

        if distance > radius:
            print("User is out of campus bounds")
            return jsonify({"message": "anda harus berada di lingkungan kampus untuk melakukan absensi"}), 400

        return jsonify({"message": "absensi berhasil"}), 200

    except Exception as e:
        print(f"Error saving image: {str(e)}")
        return jsonify({"message": f"Terjadi kesalahan saat menyimpan gambar: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
