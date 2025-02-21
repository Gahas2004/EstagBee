from typing import Tuple

from fastapi import HTTPException

from app.model.Student import Student
from app.repository.BaseRepository import BaseRepository


class StudentRepository(BaseRepository):

    def insert(self, entity: Student) -> None:
        query = """
                INSERT INTO student (student_id, RA, course)
                VALUES (%s, %s, %s);
                """

        try:
            super()._open_cursor()
            self.cursor.execute(query, (entity.id, entity.ra, entity.course))
        except Exception as e:
            print(f"Error: {e}")
            self.conn.rollback()
            raise Exception
        finally:
            self.conn.commit()
            super()._close_cursor()

    def get_one(self, login_credential: str) -> Student:
        query = """
               SELECT
                   u.id,
                   u.login_credential,
                   u.password,
                   u.name,
                   s.RA,
                   s.course
               FROM
                   users u
               JOIN
                   student s ON u.id = s.student_id
               WHERE
                   u.login_credential = %s
               """

        result = None

        try:
            super()._open_cursor()
            self.cursor.execute(query, (login_credential,))
            result = self.cursor.fetchone()

            self._validate_get_one_result(result)

            entity: Student = self._parse_tuple_to_entity(result)
            result = entity

        except Exception as e:
            print(f"Error: {e}")
            self.conn.rollback()

            if isinstance(e, HTTPException):
                raise HTTPException(status_code=e.status_code, detail=e.detail)

        finally:
            self.conn.commit()
            super()._close_cursor()

        return result

    def _parse_tuple_to_entity(self, tuple: Tuple) -> Student:
        company_entity = Student(id=tuple[0],
                                 login_credential=tuple[1],
                                 password=tuple[2],
                                 name=tuple[3],
                                 ra=tuple[4],
                                 course=tuple[5])

        return company_entity

    def _validate_get_one_result(self, result: Tuple) -> None:
        if result is None or len(result) == 0:
            raise HTTPException(status_code=403, detail="Student account not found.")

        if len(result) != 6:
            raise HTTPException(status_code=403, detail="Student account not found.")
