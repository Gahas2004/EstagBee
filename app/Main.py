from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app import Constants
from app.controller.ApplicationController import ApplicationController
from app.controller.JobOpeningController import JobOpeningController
from app.controller.ResumeController import ResumeController
from app.controller.UserController import UserController

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
    # Adicione aqui as origens permitidas
]

user_controller = UserController()
resume_controller = ResumeController()
job_opening_controller = JobOpeningController()
application_controller = ApplicationController()

app.include_router(user_controller.router)
app.include_router(resume_controller.router)
app.include_router(job_opening_controller.router)
app.include_router(application_controller.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Métodos permitidos
    allow_headers=["*"],  # Cabeçalhos permitidos
)

@app.options("/")  # Rota OPTIONS para Preflight
async def preflight_route():
    return {"message": "Preflight check successful"}

if __name__ == "__main__":
    import uvicorn

    print(f"psycopg2 successfully connected to {Constants.DB_NAME}")
    uvicorn.run(app, host="localhost", port=8000)
