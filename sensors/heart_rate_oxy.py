import serial
import boto3
from datetime import datetime
import time
import json

PORT = "COM4"  # adjust
BAUD = 9600
TABLE_NAME = "NomiData"
REGION = "us-east-1"

dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)

ser = serial.Serial(PORT, BAUD)
print("Reading heart rate + SpO2...")

while True:
    try:
        line = ser.readline().decode().strip()
        if not line:
            continue

        # Example Arduino JSON: {"heart_rate": 72, "oxygen": 98}
        data = json.loads(line)
        now = datetime.utcnow().isoformat()

        for sensor_type, value in data.items():
            unit = "bpm" if sensor_type == "heart_rate" else "%"
            table.put_item(Item={
                "timestamp": now,
                "sensor_type": sensor_type,
                "value": value,
                "metadata": {"unit": unit},
                "expire_at": int(time.time()) + 86400
            })
            print(f"Uploaded {sensor_type}: {value}")

    except Exception as e:
        print("Error:", e)
        time.sleep(2)
