import cv2
import mediapipe as mp
import numpy as np
import boto3
import time
from datetime import datetime

TABLE_NAME = "NomiData"
REGION = "us-east-1"

dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)
last_state = "Normal"
last_upload = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = pose.process(rgb)

    if result.pose_landmarks:
        lm = result.pose_landmarks.landmark
        s_y = (lm[mp_pose.PoseLandmark.LEFT_SHOULDER].y + lm[mp_pose.PoseLandmark.RIGHT_SHOULDER].y) / 2
        h_y = (lm[mp_pose.PoseLandmark.LEFT_HIP].y + lm[mp_pose.PoseLandmark.RIGHT_HIP].y) / 2
        angle = np.degrees(np.arctan2(abs(s_y - h_y),
                                      abs(lm[mp_pose.PoseLandmark.LEFT_HIP].x -
                                          lm[mp_pose.PoseLandmark.LEFT_SHOULDER].x) + 1e-6))

        if angle < 25 and s_y > 0.6:
            state = "Sleep"
        elif s_y > 0.8:
            state = "Fall"
        else:
            state = "Normal"

        mp_drawing.draw_landmarks(frame, result.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        cv2.putText(frame, f"State: {state}", (30, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 3)

        # Upload every 60 seconds
        if time.time() - last_upload > 60:
            timestamp = datetime.utcnow().isoformat()
            table.put_item(Item={
                "timestamp": timestamp,
                "sensor_type": "posture",
                "value": state,
                "metadata": {"unit": "state"},
                "expire_at": int(time.time()) + 86400
            })
            print("Uploaded posture:", state)
            last_upload = time.time()

    cv2.imshow("Posture Monitor", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
