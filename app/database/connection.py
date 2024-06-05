import psycopg2

def connect():
    try:
        conn = psycopg2.connect(
            dbname="estagbee",
            user="postgres",
            password="GaGu0618",
            host="localhost",
            port="5432"
        )
        print("Conexão bem-sucedida ao banco de dados!")
        return conn
    except psycopg2.Error as e:
        print("Erro ao conectar ao banco de dados:", e)
        return None
