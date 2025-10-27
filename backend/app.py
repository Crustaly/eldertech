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


# -------------------------------
# 🔹 Prompt Builder (was analyzer.py)
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
1. A one-sentence wellbeing summary describing the elderly person’s current condition.
2. A one-sentence recommendation addressed directly to the caregiver (e.g. “You should…” or “You can…”).
3. A one-sentence reasoning behind your conclusion.

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


# ---- Basic LLM Chat ---- #
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


# ---- Smart Sensor Analysis ---- #
class SensorBundle(BaseModel):
    posture: str
    pill_status: str
    sensor_data: list


@app.post("/analyze")
def analyze(bundle: SensorBundle):
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

    try:
        response = requests.post(NIM_ENDPOINT, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
