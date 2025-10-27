from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import json
import requests
from dotenv import load_dotenv

# 🔹 Load environment variables
load_dotenv()

app = FastAPI()

NGC_API_KEY = os.getenv("NGC_API_KEY")
NIM_ENDPOINT = os.getenv("NIM_ENDPOINT")

# 🔹 Your DynamoDB API Gateway endpoint
DYNAMO_API_URL = "https://96jal8jxw4.execute-api.us-east-1.amazonaws.com/default/dynamoread"


# -------------------------------
# 🔹 Prompt Builder
# -------------------------------
def build_nomiprompt(sensor_data, posture=None, pill_status=None):
    readable = json.dumps(sensor_data, indent=2)
    sensor_types = [d.get("sensor_type", "") for d in sensor_data]

    if any(s in sensor_types for s in ["eating", "sleep", "fall_detector", "meds"]):
        # 💤 Daily summary mode
        prompt = f"""
You are NOMI, an AI elder-care assistant summarizing daily activity logs.

These are the recorded events:
{readable}

Generate:
1. A short wellbeing summary for the day.
2. A direct, friendly recommendation for the caregiver (addressed as “you”).
3. A one-sentence reasoning behind your conclusion.

Return output in strict JSON format:
{{
  "summary": "",
  "recommendation": "",
  "reasoning": ""
}}
"""
    else:
        # 💓 Real-time vitals mode
        prompt = f"""
You are NOMI, an AI elder-care assistant.

Given these sensor readings:
{readable}

Current posture: {posture}
Pill-bottle status: {pill_status}

Generate:
1. A one-sentence wellbeing summary describing the elderly person’s current condition utilizing the data records available to you. 
2. A one-sentence recommendation addressed directly to the caregiver about the elderly person (e.g. “You should…” or “You can…”). 
3. A one-sentence reasoning behind your conclusion. Be concise and heartwarming.

Return output in strict JSON format:
{{
  "summary": "",
  "recommendation": "",
  "reasoning": ""
}}
"""
    return prompt


# -------------------------------
# 🔹 Routes
# -------------------------------
@app.get("/")
def root():
    return {"message": "NOMI backend is live!"}


# ---- 🔹 New Route: Fetch live data from DynamoDB ---- #
@app.get("/data")
def get_dynamo_data():
    """
    Fetches sensor data directly from your DynamoDB API Gateway endpoint.
    """
    try:
        response = requests.get(DYNAMO_API_URL)
        response.raise_for_status()
        data = response.json()
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch Dynamo data: {e}")


# ---- 🔹 Basic LLM Chat ---- #
class MessageInput(BaseModel):
    message: str


@app.post("/generate")
def generate_response(input_data: MessageInput):
    headers = {
        "Authorization": f"Bearer {NGC_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "messages": [{"role": "user", "content": input_data.message}],
        "temperature": 0.7,
        "max_tokens": 100
    }

    try:
        response = requests.post(NIM_ENDPOINT, headers=headers, json=data)
        response.raise_for_status()
        output = response.json()
        return {"reply": output["choices"][0]["message"]["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---- 🔹 Smart Sensor Analysis ---- #
class SensorBundle(BaseModel):
    posture: str = "normal"
    pill_status: str = "closed"
    sensor_data: list = []


@app.post("/analyze")
def analyze(bundle: SensorBundle):
    """
    If no sensor_data is provided, automatically pulls latest data from DynamoDB
    and runs reasoning on it.
    """
    try:
        # If no sensor data given, fetch from Dynamo
        if not bundle.sensor_data:
            dynamo_response = requests.get(DYNAMO_API_URL)
            dynamo_response.raise_for_status()
            bundle.sensor_data = dynamo_response.json()

        prompt = build_nomiprompt(
            sensor_data=bundle.sensor_data,
            posture=bundle.posture,
            pill_status=bundle.pill_status
        )

        headers = {
            "Authorization": f"Bearer {NGC_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.5,
            "max_tokens": 150
        }

        response = requests.post(NIM_ENDPOINT, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze data: {e}")
