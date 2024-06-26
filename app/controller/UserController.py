from fastapi import APIRouter, HTTPException

from app.model.Company import Company
from app.model.Student import Student
from app.model.dto.CompanyDto import CompanyDto
from app.model.dto.LoginDto import LoginDto
from app.model.dto.StudentDto import StudentDto
from app.service.CompanyService import CompanyService
from app.service.StudentService import StudentService


class UserController:
    def __init__(self):
        self.router = APIRouter()
        self._setup_routes()

        self.student_service = StudentService()
        self.company_service = CompanyService()

    def _setup_routes(self):
        @self.router.post("/user/student/register")
        async def register_new_student(student_dto: StudentDto) -> Student:
            student_entity: Student = self.student_service.create_student(student_dto)
            return student_entity

        @self.router.post("/user/company/register")
        async def register_new_company(company_dto: CompanyDto) -> Company:
            company_entity: Company = self.company_service.create_company(company_dto)
            return company_entity

        @self.router.post("/user/company/login")
        async def company_login(login_dto: LoginDto) -> Company:
            try:
                company_entity: Company = self.company_service.validate_login(login_dto)
            except HTTPException as e:
                raise e

            return company_entity

        @self.router.post("/user/student/login")
        async def student_login(login_dto: LoginDto) -> Student:
            try:
                student_entity: Student = self.student_service.validate_login(login_dto)
            except HTTPException as e:
                raise e

            return student_entity

        @self.router.post("/user/student/login")
        async def student_login(login_dto: LoginDto) -> Student:
            try:
                student_entity: Student = self.student_service.validate_login(login_dto)
            except HTTPException as e:
                raise e

            return student_entity
