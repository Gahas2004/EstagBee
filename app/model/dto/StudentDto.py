from app.model.dto.UserDto import UserDto


class StudentDto(UserDto):
    ra: int
    course: str