from fastapi import HTTPException

from app.model.Company import Company
from app.model.User import User
from app.model.dto.CompanyDto import CompanyDto
from app.model.dto.LoginDto import LoginDto
from app.repository.CompanyRepository import CompanyRepository
from app.service.UserService import UserService


class CompanyService(UserService):

    def __init__(self):
        self.company_repository = CompanyRepository()
        super().__init__()

    def create_company(self, company_dto: CompanyDto) -> Company:
        entity: Company = self._create_company_entity(company_dto)
        self.company_repository.insert(entity)
        return entity

    def _create_company_entity(self, company_dto: CompanyDto) -> Company:
        user: User = super().create_user(company_dto)
        company_entity: Company = Company(id=user.id,
                                          login_credential=user.login_credential,
                                          password=user.password,
                                          name=user.name,
                                          document=company_dto.document,
                                          website=company_dto.website)

        return company_entity

    def validate_login(self, login_dto: LoginDto) -> Company:
        result = self.company_repository.get_one(login_dto.login_credential)
        if not self._is_login_and_password_valid(login_dto, result):
            raise HTTPException(status_code=404, detail="Company data mismatching.")
        return result

    def _is_login_and_password_valid(self, login_dto: LoginDto, company: Company) -> bool:
        if login_dto.login_credential != company.login_credential:
            return False

        if login_dto.password != company.password:
            return False

        return True
