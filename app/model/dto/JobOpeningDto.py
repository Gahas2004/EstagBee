from typing import Optional

from pydantic import BaseModel


class JobOpeningDto(BaseModel):
    job_id: Optional[int]
    description: str
    job_name: str
    company_id: int
    company_name: str
