from dataclasses import dataclass

from pydantic import BaseModel


@dataclass
class Application:
    resume_id: int
    job_id: int
