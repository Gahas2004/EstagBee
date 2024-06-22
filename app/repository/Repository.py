import psycopg2

from app import Constants


class Repository:
    _instance = None
    _conn = None
    _cursor = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(Repository, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        try:
            self._conn = psycopg2.connect(
                dbname=Constants.DB_NAME,
                user=Constants.DB_USER,
                password=Constants.DB_PASSWORD,
                host=Constants.DB_HOST,
                port=Constants.DB_PORT
            )
            print(f"psycopg2 successfully connected to {Constants.DB_NAME}")
            return True
        except psycopg2.Error as e:
            print(f"psycopg2 failed to connect to {Constants.DB_NAME}: {e}")
            return False

    def _execute_query(self, query: str):
        self._open_cursor()
        self._cursor.execute(query)
        self._close_cursor()
        pass

    def _open_cursor(self):
        self._cursor = self._conn.cursor()

    def _close_cursor(self):
        self._cursor.close()

    def _close_db_connection(self):
        self._conn.close()
