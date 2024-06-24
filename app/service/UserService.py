from abc import abstractmethod

from app.model.Student import Student
from app.model.User import User
from app.model.dto.UserDto import UserDto
from app.repository.UserRepository import UserRepository


class UserService:

    def __init__(self):
        self.user_repository = UserRepository()

    def create_user(self, user_dto: UserDto):
        print(user_dto)  # Polimorfismo todo: remove
        user_entity: User = self._create_user_entity_from_dto(user_dto)
        user_entity.id = self.user_repository.insert(user_entity)
        return user_entity

    def login_with_user(self, user_dto: UserDto):
        user_entity: User = self._create_user_entity_from_dto(user_dto)

        pass

    def _create_user_entity_from_dto(self, user_dto: UserDto) -> User:
        return User(id=None,
                    name=user_dto.name,
                    password=user_dto.password,
                    login_credential=user_dto.login_credential)
