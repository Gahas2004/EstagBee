from pydantic import BaseModel


class ApplicationDto(BaseModel):
    job_id: int
    resume_id: int