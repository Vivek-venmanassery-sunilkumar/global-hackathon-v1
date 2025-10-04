from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import router as main_router


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/health")  # Alternative endpoint
async def api_health():
    return {"status": "healthy"}


app.include_router(main_router)