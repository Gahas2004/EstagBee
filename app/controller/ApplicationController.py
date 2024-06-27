from fastapi import APIRouter, Query

from app.model.Application import Application
from app.model.dto.ApplicationDto import ApplicationDto
from app.service.ApplicationService import ApplicationService


class ApplicationController:

    def __init__(self):
        self.router = APIRouter()
        self._setup_routes()

        self.application_service = ApplicationService()

    def _setup_routes(self):
        @self.router.post("/job_opening/apply")
        async def apply_to_job(application_dto: ApplicationDto):
            application: Application = self.application_service.apply_resume_to_job_id(application_dto)

            return application

        @self.router.get("/job_opening/retrieve")
        async def retrieve_all_job_applicants(job_id: int = Query(...)):
            applications = self.application_service.retrieve_all_applicants_from_application(job_id)

            return applications