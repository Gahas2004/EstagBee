from .usuario import Usuario


class Estudante(Usuario):
    def __init__(self, login, senha, ra, nome, curso):
        super().__init__(login, senha)
        self.ra = ra
        self.nome = nome
        self.curso = curso

    def cadastrar(self):
        # Lógica para cadastrar estudante
        pass

    def logar(self):
        # Lógica para login de estudante
        pass

    def buscar_vaga(self):
        # Lógica para buscar vaga de estágio
        pass

    def upload_curriculo(self):
        # Lógica para fazer upload de currículo
        pass
