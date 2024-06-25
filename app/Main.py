from fastapi import FastAPI

from app.controller.JobOpeningController import JobOpeningController
from app.controller.ResumeController import ResumeController
from app.controller.UserController import UserController

app = FastAPI()

user_controller = UserController()
resume_controller = ResumeController()
job_opening_controller = JobOpeningController()

app.include_router(user_controller.router)
app.include_router(resume_controller.router)
app.include_router(job_opening_controller.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
