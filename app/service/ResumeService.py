from pydantic import BaseModel

from app.model.Resume import Resume
from app.model.dto.ResumeDto import ResumeDto
from app.repository.ResumeRepository import ResumeRepository


class ResumeService:
    def __init__(self):
        self.resume_repository = ResumeRepository()

    def create_resume(self, resume_dto: ResumeDto) -> Resume:
        resume_entity: Resume = self._create_resume_entity(resume_dto)
        # aqui devemos ter certeza que o id existe.
        self.resume_repository.insert(resume_entity)

        return resume_entity

    def _create_resume_entity(self, dto: ResumeDto):
        entity: Resume = Resume(description=dto.description,
                                student_id=dto.student_id)

        return entity