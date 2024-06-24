from pydantic import BaseModel


class ResumeDto(BaseModel):
    description: str
    student_id: int
