from fastapi import HTTPException

from app.model.Student import Student
from app.model.User import User
from app.model.dto.LoginDto import LoginDto
from app.model.dto.StudentDto import StudentDto
from app.repository.StudentRepository import StudentRepository
from app.service.UserService import UserService


class StudentService(UserService):

    def __init__(self):
        self.student_repository = StudentRepository()
        super().__init__()

    def create_student(self, student_dto: StudentDto) -> Student:
        student: Student = self._create_student_entity(student_dto)
        self.student_repository.insert(student)
        return student

    def _create_student_entity(self, student_dto: StudentDto) -> Student:
        user: User = super().create_user(student_dto)
        student_entity: Student = Student(id=user.id,
                                          login_credential=user.login_credential,
                                          password=user.password,
                                          name=user.name,
                                          ra=student_dto.ra,
                                          course=student_dto.course)

        return student_entity

    def validate_login(self, login_dto: LoginDto) -> Student:
        result: Student = self.student_repository.get_one(login_dto.login_credential)
        if not self._is_login_and_password_valid(login_dto, result):
            raise HTTPException(status_code=404, detail="Student data mismatching.")

        return result

    def _is_login_and_password_valid(self, login_dto: LoginDto, student: Student) -> bool:
        if login_dto.login_credential != student.login_credential:
            return False

        if login_dto.password != student.password:
            return False

        return True
