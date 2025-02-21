from app.model.Application import Application
from app.repository.BaseRepository import BaseRepository


class ApplicationRepository(BaseRepository):

    def insert(self, entity: Application):
        query = """
                INSERT INTO application (job_id, resume_id)
                VALUES (%s, %s);
                """
        try:
            super()._open_cursor()
            self.cursor.execute(query, (entity.job_id,
                                        entity.resume_id))
        except Exception as e:
            print(f"Erro: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

    def get_all_by_job_id(self, job_id: int):
        query = """
                SELECT 
                    application.*, 
                    resume.description AS resume_description, 
                    users.name AS applicant_name
                FROM 
                    application
                JOIN 
                    job ON application.job_id = job.job_id
                JOIN 
                    resume ON application.resume_id = resume.resume_id
                JOIN 
                    student ON resume.student_id = student.student_id
                JOIN 
                    users ON student.student_id = users.id
                WHERE 
                    application.job_id = %s;
                """
        applications = None
        try:
            super()._open_cursor()
            self.cursor.execute(query, (job_id,))
            applications = self.cursor.fetchall()
        except Exception as e:
            print(f"Error: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()
        return applications

    # def get_all_by_job_id(self, job_id: int):
    #
    #     pass
