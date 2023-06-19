from fastapi import FastAPI, APIRouter
from app.api.api_v1.api import api_router

app = FastAPI()  

root_router = APIRouter()
app = FastAPI(title="Recipe API", openapi_url="/api/v1/openapi.json")


@root_router.get("/") 
async def main_route():     
  return {"message": "Hey, It is me Goku"}

app.include_router(api_router, prefix="/api/v1")
app.include_router(root_router)