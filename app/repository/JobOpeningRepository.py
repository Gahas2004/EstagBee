from pydantic import BaseModel

from app.model.JobOpening import JobOpening
from app.repository.BaseRepository import BaseRepository


class JobOpeningRepository(BaseRepository):
    def __init__(self):
        super().__init__()

    def insert(self, entity: JobOpening) -> int:
        query = """
                INSERT INTO job (description, company_name, company_id, job_name)
                VALUES (%s, %s, %s, %s)
                RETURNING job_id;
                """

        try:
            super()._open_cursor()
            self.cursor.execute(query, (entity.description,
                                        entity.company_name,
                                        entity.company_id,
                                        entity.job_name))
            id = self.cursor.fetchone()[0]
        except Exception as e:
            print(f"Erro: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

        return id

    def get_all(self):
        query = """
                SELECT * FROM job
                """

        jobs = None

        try:
            super()._open_cursor()
            self.cursor.execute(query)
            jobs = self.cursor.fetchall()
        except Exception as e:
            print(f"Erro: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

        return jobs
