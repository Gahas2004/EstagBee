from typing import Tuple

from fastapi import HTTPException
from fastapi.exceptions import ValidationException

from app.model.Company import Company
from app.repository.BaseRepository import BaseRepository


class CompanyRepository(BaseRepository):

    def insert(self, entity: Company) -> None:
        query = """
                INSERT INTO company (company_id, document, website)
                VALUES (%s, %s, %s);
                """

        try:
            super()._open_cursor()
            self.cursor.execute(query, (entity.id, entity.document, entity.website))
        except Exception as e:
            print(f"Error: {e}")
            self.conn.rollback()
        finally:
            self.conn.commit()
            super()._close_cursor()

    def get_one(self, login_credential: str) -> Company:
        query = """
               SELECT
                   u.id,
                   u.login_credential,
                   u.password,
                   u.name,
                   c.document,
                   c.website
               FROM
                   users u
               JOIN
                   company c ON u.id = c.company_id
               WHERE
                   u.login_credential = %s
               """

        result = None

        try:
            super()._open_cursor()
            self.cursor.execute(query, (login_credential,))
            result = self.cursor.fetchone()

            self._validate_get_one_result(result)

            entity: Company = self._parse_tuple_to_entity(result)
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

    def _parse_tuple_to_entity(self, tuple: Tuple) -> Company:
        company_entity = Company(id=tuple[0],
                                 login_credential=tuple[1],
                                 password=tuple[2],
                                 name=tuple[3],
                                 document=tuple[4],
                                 website=tuple[5])

        return company_entity

    def _validate_get_one_result(self, result: Tuple) -> None:
        if result is None or len(result) == 0:
            raise HTTPException(status_code=403, detail="Company account not found.")

        if len(result) != 6:
            raise HTTPException(status_code=403, detail="Company account not found.")

