from dataclasses import dataclass
from typing import Optional


@dataclass
class Resume:
    resume_id: Optional[int]
    description: str
    student_id: int
