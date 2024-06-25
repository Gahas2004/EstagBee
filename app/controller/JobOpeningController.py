from fastapi import APIRouter

from app.model.JobOpening import JobOpening
from app.model.dto.JobOpeningDto import JobOpeningDto
from app.service.JobOpeningService import JobOpeningService


class JobOpeningController:
    def __init__(self):
        self.router = APIRouter()
        self._setup_routes()
        self.job_opening_service = JobOpeningService()

    def _setup_routes(self):
        @self.router.post("/job_opening/create")
        async def register_new_job_opening(job_dto: JobOpeningDto) -> JobOpening:
            job: JobOpening = self.job_opening_service.create_job_opening(job_dto)

            return job

        @self.router.get("/job_opening/get_all")
        async def get_all_job_openings():
            jobs = self.job_opening_service.retrieve_all_job_openings()
            return jobs
