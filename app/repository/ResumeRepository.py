from app.model.Resume import Resume
from app.repository.BaseRepository import BaseRepository


class ResumeRepository(BaseRepository):

    def __init__(self):
        super().__init__()

    def insert(self, entity: Resume):
        query = """
                INSERT INTO resume (description, student_id)
                VALUES (%s, %s)
                RETURNING resume_id;
                """

        id: int = None
        try:
            super()._open_cursor()
            self.cursor.execute(query, (entity.description, entity.student_id))
            id = self.cursor.fetchone()[0]
        except Exception as e:
            print(f"Error: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

        return id
