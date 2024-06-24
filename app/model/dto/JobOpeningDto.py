from pydantic import BaseModel


class JobOpeningDto(BaseModel):
    description: str
    job_name: str
    company_id: int
    company_name: str