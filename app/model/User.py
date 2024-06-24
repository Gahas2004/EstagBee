from dataclasses import dataclass
from typing import Optional

from pydantic import BaseModel


@dataclass
class User():
    id: Optional[int]
    login_credential: str
    password: str
    name: str
