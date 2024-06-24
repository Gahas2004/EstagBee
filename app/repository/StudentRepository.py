from app.model.Student import Student
from app.repository.BaseRepository import BaseRepository


class StudentRepository(BaseRepository):

    def insert(self, entity: Student):
        query = """
                INSERT INTO student (student_id, RA, course)
                VALUES (%s, %s, %s);
                """

        try:
            super()._open_cursor()
            self.cursor.execute(query, (entity.id, entity.ra, entity.course))
        except Exception as e:
            print(f"Erro: {e}")
            self.conn.rollback()
            raise Exception
        finally:
            self.conn.commit()
            super()._close_cursor()

