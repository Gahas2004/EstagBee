from dataclasses import dataclass

from .User import User


@dataclass
class Student(User):
    ra: int
    course: str
