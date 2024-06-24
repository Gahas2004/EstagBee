from dataclasses import dataclass

from .User import User


@dataclass
class Company(User):
    document: str
    website: str
