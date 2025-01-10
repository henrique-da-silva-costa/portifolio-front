export const valoresNumericos = ["valor"]
export const valorCepFixos = ["cep", "logradouro", "bairro", "localidade", "estado",]
export const valoresFixos = ["usuarios_id", "barbearia_id"];
export const valoresLimiteMaximo = ["nome", "senha", "novasenha", "confirmasenha", "cep", "logradouro", "bairro", "localidade", "estado", "nome", "numero"]
export const valoresLimiteMinimo = ["senha", "novasenha", "confirmasenha"]

export function editarColunas(col = "", tipo = {}, nomeFormulario = "") {
    const valoresEditaveis = ["cep", "estado", "numero", "localidade", "bairro", "logradouro"];

    if (nomeFormulario == "filtros") {
        return col
    }

    if (nomeFormulario == "cadastroUsuario") {
        if (tipo == "email" || tipo == "senha") {
            return "col-md-6"
        }
        return "col-md-12"
    }

    if (nomeFormulario == "cadastroBarbearia") {

        if (valoresEditaveis.includes(tipo)) {
            return "col-md-4";
        }

        if (tipo == "nome" || tipo == "telefone") {
            return "col-md-6"
        }

        if (tipo == "id" || tipo == "usuarios_id") {
            return "col-md-12"
        }

        return col;
    }
    if (nomeFormulario == "editarBarbearia") {

        if (valoresEditaveis.includes(tipo)) {
            return "col-md-4";
        }

        if (tipo == "nome" || tipo == "telefone") {
            return "col-md-6"
        }

        if (tipo == "id" || tipo == "usuarios_id") {
            return "col-md-12"
        }

        return col;
    }

    if (nomeFormulario == "cartao") {
        return "col-md-4";
    }
}

export function tipos(tipo) {
    const tiposSenha = ["senha", "novasenha", "confirmasenha"];
    const tiposDiferentes = ["senha", "novasenha", "confirmasenha", "emailcomfirmar", "email", "img"];
    const tiposHidden = ["id", "emailcomfirmar", "usuarios_id", "barbearia_id", "nome_reserva", "encript", "master"];

    if (tiposSenha.includes(tipo)) {
        return "password";
    }

    if (tiposHidden.includes(tipo)) {
        return "hidden";
    }

    if (tipo == "email") {
        return "email";
    }

    if (tipo == "img") {
        return "file";
    }

    if (tipo == "data") {
        return "date";
    }

    if (tiposDiferentes.includes(tipo)) {
        return "password";
    }

}

export function tiposLabel(label) {
    if (label == "holder") {
        return "Nome";
    }
    if (label == "number") {
        return "numero";
    }
    if (label == "expYear") {
        return "Ano";
    }
    if (label == "expMonth") {
        return "Mês";
    }
    if (label == "securityCode") {
        return "Código de segurança (CVV)";
    }
    if (label == "localidade") {
        return "Cidade"
    }

    if (label == "estado") {
        return "Estado"
    }

    if (label == "logradouro") {
        return "Rua"
    }

    if (label == "img") {
        return "Imagem";
    }

    if (label == "filtroCidade") {
        return "Cidade"
    }

    if (label == "filtroEstado") {
        return "Estado"
    }

    if (label == "filtroCep") {
        return "CEP"
    }

    if (label == "filtroNome") {
        return "Nome"
    }

    if (label == "email") {
        return "E-mail"
    }

    if (label == "servico") {
        return "serviço"
    }

    if (label == "emailcomfirmar") {
        return "";
    }
    else if (label == "encript") {
        return "";
    }
    else if (label == "master") {
        return "";
    }
    else if (label == "id") {
        return "";
    }
    else if (label == "barbearia_id") {
        return "";
    }
    else if (label == "usuarios_id") {
        return "";
    } else if (label == "nome_reserva") {
        return "";
    }

    else {
        return label;
    }
}

export function tipoInputMaskara(tipo) {
    if (tipo == "telefone") {
        return "99-9999-9999";
    }
}

export function tipoInputPlaceholder(tipo, tipoplaceholder = "") {
    const placeholders = {
        telefone: "(99)-(9999)-(9999)",
        nome: {
            nome: "Informe seu nome de usuário",
            nomebarbearia: "Informe o nome da barbearia",
            nomeservico: "Informe o nome do serviço",
        },
        email: "Informe seu E-mail",
        senha: "Informe a sua senha",
        novasenha: "Informe a sua nova senha",
        confirmasenha: "Informe a sua nova senha",
        nomebarbearia: "Informe o nome da barbearia",
        nomeservico: "Informe o nome do serviço",
        localidade: "Informe a cidade",
        filtroCidade: "Informe a cidade",
        filtroEstado: "Informe o estado",
        filtroNome: "Informe o nome",
        filtroCep: "99999-999",
        estado: "Informe o estado",
        logradouro: "Informe o nome da rua",
        bairro: "Informe o nome do bairro",
        numero: "Informe o número do endereço",
        number: "Número do cartão",
        cep: "99999-999",
        valor: "Informe o valor do serviço",
        holder: "Nome do cartão",
        expYear: "Ano de validade",
        expMonth: "Mês de validade",
        securityCode: "Informe o Código (CVV)",
    };

    if (tipo === "nome" && tipoplaceholder) {
        return placeholders.nome[tipoplaceholder] || "";
    }

    return placeholders[tipo] || "";
}