from fastapi import APIRouter, Query

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

        @self.router.get("/job_opening/get_one")
        async def get_all_job_openings(job_id: int = Query(...)):
            job = self.job_opening_service.get_job_by_id(job_id)

            return job

        @self.router.delete("/job_opening/delete")
        async def get_all_job_openings(job_id: int = Query(...)):
            self.job_opening_service.delete_job(job_id)

            return "DELETED"
