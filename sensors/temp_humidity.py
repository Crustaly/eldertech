import serial
import boto3
from datetime import datetime
import time
import json

PORT = "COM5"  # adjust
BAUD = 9600
TABLE_NAME = "NomiData"
REGION = "us-east-1"

dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)

ser = serial.Serial(PORT, BAUD)
print("Reading temperature & humidity...")

while True:
    try:
        line = ser.readline().decode().strip()
        if not line:
            continue

        # Example Arduino JSON: {"temperature": 26.4, "humidity": 45}
        data = json.loads(line)
        now = datetime.utcnow().isoformat()

        for sensor_type, value in data.items():
            unit = "C" if sensor_type == "temperature" else "%"
            table.put_item(Item={
                "timestamp": now,
                "sensor_type": sensor_type,
                "value": value,
                "metadata": {"unit": unit},
                "expire_at": int(time.time()) + 86400
            })
            print(f"Uploaded {sensor_type}: {value}{unit}")

    except Exception as e:
        print("Error:", e)
        time.sleep(2)
