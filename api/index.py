from fastapi import FastAPI
app = FastAPI()
@app.get("/api/test")
def hello():
    return {"message": "Le moteur Vercel fonctionne !"}
