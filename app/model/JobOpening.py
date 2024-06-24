from dataclasses import dataclass
from typing import Optional


@dataclass
class JobOpening:
    job_id: Optional[int]
    description: str
    company_id: Optional[int]
    company_name: str
    job_name: str
