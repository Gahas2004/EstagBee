import psycopg2


class User:
    def __init__(self, login, senha):
        self.login = login
        self.senha = senha

    @staticmethod
    def validar_login(login, senha):
        conn = psycopg2.connect(
            dbname="seu_banco_de_dados",
            user="seu_usuario",
            password="sua_senha",
            host="seu_host",
            port="sua_porta"
        )
        cur = conn.cursor()

        query = "SELECT * FROM usuario WHERE login = %s AND senha = %s"
        cur.execute(query, (login, senha))

        user = cur.fetchone()

        cur.close()
        conn.close()

        if user:
            return True
        else:
            return False
