from abc import abstractmethod

import psycopg2
from pydantic import BaseModel

from app import Constants


class BaseRepository:
    _instance = None
    conn = None
    cursor = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(BaseRepository, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        try:
            self.conn = psycopg2.connect(
                dbname=Constants.DB_NAME,
                user=Constants.DB_USER,
                password=Constants.DB_PASSWORD,
                host=Constants.DB_HOST,
                port=Constants.DB_PORT
            )
        except psycopg2.Error as e:
            print(f"psycopg2 failed to connect to {Constants.DB_NAME}: {e}")

    def _execute_query(self, query: str):
        self._open_cursor()
        self.cursor.execute(query)
        self._close_cursor()
        self.conn.commit()

    @abstractmethod
    def insert(self, entity: BaseModel):
        pass

    def _open_cursor(self):
        self.cursor = self.conn.cursor()

    def _close_cursor(self):
        self.cursor.close()

    def _close_db_connection(self):
        self.conn.close()
