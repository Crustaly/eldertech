import serial
import boto3
from datetime import datetime
import time
import json

# === CONFIG ===
PORT = "COM3"  # Update to your Arduino port
BAUD = 9600
TABLE_NAME = "NomiData"
REGION = "us-east-1"

# === AWS ===
dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)

# === SERIAL ===
ser = serial.Serial(PORT, BAUD)
print("Reading force sensor data...")

while True:
    try:
        line = ser.readline().decode().strip()
        if not line:
            continue

        # Example input format from Arduino: {"fork": 320, "pill": 500}
        data = json.loads(line)

        now = datetime.utcnow().isoformat()
        for sensor_type, value in data.items():
            table.put_item(Item={
                "timestamp": now,
                "sensor_type": sensor_type,
                "value": value,
                "metadata": {"unit": "N"},  # Newtons or analog reading
                "expire_at": int(time.time()) + 86400  # auto-expire in 24h
            })
            print(f"Uploaded {sensor_type}: {value}")

    except Exception as e:
        print("Error:", e)
        time.sleep(2)
