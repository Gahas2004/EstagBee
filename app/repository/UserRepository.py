from app.model.User import User
from app.repository.BaseRepository import BaseRepository


class UserRepository(BaseRepository):

    def __init__(self):
        super().__init__()

    def insert(self, user: User):
        query = """
                INSERT INTO users (login_credential, password, name)
                VALUES (%s, %s, %s)
                RETURNING id
                """

        id = None
        try:
            super()._open_cursor()
            self.cursor.execute(query, (user.login_credential, user.password, user.name))
            id = self.cursor.fetchone()[0]
        except Exception as e:
            print(f"Erro: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

        return id
