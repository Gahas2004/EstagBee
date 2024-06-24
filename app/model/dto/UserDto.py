from pydantic import BaseModel


class UserDto(BaseModel):
    login_credential: str
    password: str
    name: str
