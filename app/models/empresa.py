from .usuario import Usuario


class Empresa(Usuario):
    def __init__(self, login, senha, cnpj, nome, info_vaga):
        super().__init__(login, senha)
        self.cnpj = cnpj
        self.nome = nome
        self.info_vaga = info_vaga

    def cadastrar(self):
        # Lógica para cadastrar empresa
        pass

    def logar(self):
        # Lógica para login de empresa
        pass

    def criar_vaga(self):
        # Lógica para criar vaga de estágio
        pass

    def apagar_vaga(self):
        # Lógica para apagar vaga de estágio
        pass

    def alterar_vaga(self):
        # Lógica para alterar vaga de estágio
        pass

    def download_curriculo(self):
        # Lógica para fazer download de currículo
        pass
