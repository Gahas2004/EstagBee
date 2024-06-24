from fastapi import APIRouter

from app.model.dto.JobOpeningDto import JobOpeningDto


class JobController:
    def __init__(self):
        self.router = APIRouter()
        self._setup_routes()

    def _setup_routes(self):
        @self.router.post("/student/resume/create")
        async def register_new_company(job_dto: JobOpeningDto) -> None:
            pass

