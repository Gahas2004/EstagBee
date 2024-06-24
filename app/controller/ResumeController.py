from fastapi import APIRouter

from app.model.Resume import Resume
from app.model.dto.ResumeDto import ResumeDto
from app.service.ResumeService import ResumeService


class ResumeController:

    def __init__(self):
        self.router = APIRouter()
        self._setup_routes()

        self.resume_service = ResumeService()

    def _setup_routes(self):
        @self.router.post("/student/resume/create")
        async def register_new_company(resume_dto: ResumeDto) -> dict:
            resume_entity: Resume = self.resume_service.create_resume(resume_dto)

            response = {}
            response.update({"status": "RESUME_CREATED"})
            response.update(resume_entity.__dict__)
            return response
