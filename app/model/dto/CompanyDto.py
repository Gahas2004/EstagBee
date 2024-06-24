from app.model.dto.UserDto import UserDto


class CompanyDto(UserDto):
    document: str
    website: str
