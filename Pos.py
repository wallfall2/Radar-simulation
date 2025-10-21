import requests
import time
import random

def generate_target_data():
    # Simulating target position data
    return [
        {
            "target_id": 1,
            "angle": random.uniform(0, 360),  # Angle in degrees
            "distance": random.uniform(0, 100)  # Distance in arbitrary units
        },
        {
            "target_id": 2,
            "angle": random.uniform(0, 360),  # Angle in degrees
            "distance": random.uniform(0, 100)  # Distance in arbitrary units
        }
    ]

server_url = 'http://192.168.0.130:5000/update_target'

while True:
    target_data = generate_target_data()
    response = requests.post(server_url, json=target_data)
    print(f"Sent data: {target_data}, Response: {response.status_code}")
    time.sleep(5)

