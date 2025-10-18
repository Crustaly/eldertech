from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

NGC_API_KEY = os.getenv("NGC_API_KEY")
NIM_ENDPOINT = os.getenv("NIM_ENDPOINT")

class MessageInput(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "NOMI backend is live!"}

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
        return {
            "reply": output["choices"][0]["message"]["content"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
