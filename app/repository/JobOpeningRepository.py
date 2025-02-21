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
            print(f"Error: {e}")
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
            print(f"Error: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

        return jobs

    def delete_one(self, job_id: int):
        query = """ 
                DELETE FROM job 
                WHERE job_id = %s 
                """

        self._delete_dependent(job_id)
        try:
            super()._open_cursor()
            self.cursor.execute(query, (job_id,))
        except Exception as e:
            print(f"Error: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

    def _delete_dependent(self, job_id: int):
        query = """
                DELETE FROM application 
                WHERE job_id = %s;
                """

        try:
            super()._open_cursor()
            self.cursor.execute(query, (job_id,))
        except Exception as e:
            print(f"Error: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

    def get_by_id(self, job_id: str):
        query = """
                SELECT * FROM job
                WHERE job_id = %s
                """

        job = None

        try:
            super()._open_cursor()
            self.cursor.execute(query, (job_id,))
            job = self.cursor.fetchone()
        except Exception as e:
            print(f"Error: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

        return job
