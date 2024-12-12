function Criptografia(senha) {
    senha += "criptografia_porca"
    return senha
}

let erro = 0

let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

class Pessoa {
    #nome;
    #endereco;
    #contato;
    constructor(nome, endereco, contato) {
        this.#nome = nome;
        this.#endereco = endereco;
        this.#contato = contato;
    }
    getNome() { return this.#nome; }
    getEndereco() { return this.#endereco; }
    getContato() { return this.#contato; }

    // Método estático
    static toJSON(instance) {
        return {
            nome: instance.#nome,
            endereco: instance.#endereco,
            contato: instance.#contato,
        };
    }
    static fromJSON(json) {
        return new Pessoa(json.nome, json.endereco, json.contato);
    }
}

class Cliente extends Pessoa {
    #id;
    #senha;

    constructor(nome, endereco, contato, id, senha) {
        super(nome, endereco, contato);
        this.#id = id;
        this.#senha = senha;
    }
    getId() { return this.#id; }
    getSenha() { return this.#senha; }

    static toJSON(instance) {
        return {
            ...Pessoa.toJSON(instance),
            id: instance.#id,
            senha: instance.#senha,
        };
    }
    static fromJSON(json) {
        return new Cliente(json.nome, json.endereco, json.contato, json.id, json.senha);
    }
}

class Funcionario extends Pessoa {
    #senha;
    constructor(nome, endereco, contato, senha) {
        super(nome, endereco, contato);
        this.#senha = senha;
    }
    getSenha() { return this.#senha; }
    toJSON() {
        return { ...super.toJSON(), senha: this.#senha };
    }
    static fromJSON(json) {
        return new Funcionario(json.nome, json.endereco, json.contato, json.senha);
    }
}
class Quarto {
    numero;
    tipo;
    codigo;
    preco;
    dono;
    constructor(numero, tipo, codigo = null, preco, dono = null) {
        this.numero = numero;
        this.tipo = tipo;
        this.codigo = codigo;
        this.preco = preco;
        this.dono = dono;
    }
    getNumero() {
        return this.numero;
    }
    getTipo() {
        return this.tipo;
    }
    getCodigo() {
        return this.codigo;
    }
    getPreco() {
        return this.preco;
    }
    getDono() {
        return this.dono;
    }
    static toJSON(quarto) {
        return JSON.stringify({
            numero: quarto.getNumero(),
            tipo: quarto.getTipo(),
            codigo: quarto.getCodigo(),
            preco: quarto.getPreco(),
            dono: quarto.getDono(),
        });
    }
    static fromJSON(json) {
        return new Quarto(json.numero, json.tipo, json.codigo, json.preco, json.dono);
    }
}
class Historico {
    #reserva;
    constructor(reserva) {
        this.#reserva = reserva;
    }
    getReserva() {
        return this.#reserva;
    }
    static toJSON(historico) {
        return JSON.stringify({
            reserva: Reserva.toJSON(historico.getReserva()),
        });
    }
    static fromJSON(json) {
        return new Historico(json.reserva);
    }
}
class Comanda {
    #diaria;
    #frigobar;
    #servicos;
    constructor(diaria, frigobar = null, servicos = null) {
        this.#diaria = diaria;
        this.#frigobar = frigobar;
        this.#servicos = servicos;
    }
    getDiaria() {
        return this.#diaria;
    }
    getFrigobar() {
        return this.#frigobar;
    }
    getServicos() {
        return this.#servicos;
    }
    static toJSON(comanda) {
        return JSON.stringify({
            diaria: comanda.getDiaria(),
            frigobar: comanda.getFrigobar(),
            servicos: comanda.getServicos(),
        });
    }
    static fromJSON(json) {
        return new Comanda(json.diaria, json.frigobar, json.servicos);
    }
}
class Reserva {
    checkin;
    checkout;
    id;
    numquarto;
    servico;
    preco;
    constructor(checkin, checkout, id, numquarto, servico, preco) {
        this.checkin = new Date(checkin);
        this.checkout = new Date(checkout);
        this.id = id;
        this.numquarto = numquarto;
        this.servico = servico;
        this.preco = preco;
    }
    getCheckin() {
        return this.checkin;
    }
    getCheckout() {
        return this.checkout;
    }
    getId() {
        return this.id;
    }
    getNumQuarto() {
        return this.numquarto;
    }
    getServico() {
        return this.servico;
    }
    getPreco() {
        return this.preco;
    }
    static toJSON(reserva) {
        return JSON.stringify({
            checkin: reserva.getCheckin().toISOString(),
            checkout: reserva.getCheckout().toISOString(),
            id: reserva.getId(),
            numquarto: reserva.getNumQuarto(),
            servico: reserva.getServico(),
            preco: reserva.getPreco(),
        });
    }
    static fromJSON(json) {
        return new Reserva(
            json.checkin,
            json.checkout,
            json.id,
            json.numquarto,
            json.servico,
            json.preco
        );
    }
}
let teste
let lista_historico = [];
let lista_clientes = [];
let lista_quartos = {
    executivo: [],
    executivo_vista_mar: [],
    familia: [],
    praiano: [],
    premium: [],
    luxo: []
};
let lista_reservas = {
    executivo: [],
    executivo_vista_mar: [],
    familia: [],
    praiano: [],
    premium: [],
    luxo: []
};
let cliente_temporario = null
let lista_funcionario = []
function SalvarDados() {
    sessionStorage.setItem('clientes', JSON.stringify(lista_clientes.map(cliente => Cliente.toJSON(cliente))));
    sessionStorage.setItem('funcionarios', JSON.stringify(lista_funcionario.map(funcionario => Funcionario.toJSON(funcionario))));
    sessionStorage.setItem('historico', JSON.stringify(lista_historico.map(historico => Historico.toJSON(historico))));
    sessionStorage.setItem('lq', JSON.stringify(lista_quartos));
    sessionStorage.setItem('lr', JSON.stringify(lista_reservas));
}
function CarregarDados() {
    lista_clientes = (JSON.parse(sessionStorage.getItem('clientes')) || []).map(Cliente.fromJSON);
    lista_funcionario = (JSON.parse(sessionStorage.getItem('funcionarios')) || []).map(Funcionario.fromJSON);
    lista_reservas = JSON.parse(sessionStorage.getItem('lr')) || {
        executivo: [], executivo_vista_mar: [], familia: [], praiano: [], premium: [], luxo: []
    };
    lista_quartos = JSON.parse(sessionStorage.getItem('lq')) || {
        executivo: [], executivo_vista_mar: [], familia: [], praiano: [], premium: [], luxo: []
    };
    lista_historico = (JSON.parse(sessionStorage.getItem('historico')) || []).map(Historico.fromJSON);
}
if (window.location.pathname.endsWith("logout.html")) {
    CarregarDados();
};
if (window.location.pathname.endsWith("login.html")) {
    CarregarDados();
};
if (window.location.pathname.endsWith("index.html")) {
    CarregarDados();
};
if (window.location.pathname.endsWith("cadastro.html")) {
    CarregarDados();
};
if (window.location.pathname.endsWith("index2.html")) {
    CarregarDados();
};




menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var swiper = new Swiper(".room-slider", {
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        991: { slidesPerView: 3 },
    },
});

var swiper = new Swiper(".gallery-slider", {
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        991: { slidesPerView: 4 },
    },
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let accordions = document.querySelectorAll('.faqs .row .content .box');

accordions.forEach(acco => {
    acco.onclick = () => {
        accordions.forEach(subAcco => { subAcco.classList.remove('active') });
        acco.classList.add('active');
    }
});
for (let i = 1; i <= 10; i++) {
    lista_quartos.executivo.push(new Quarto(i, "executivo", null,1, null));
    lista_quartos.executivo_vista_mar.push(new Quarto(i, "executivo_vista_mar", null, 12, null));
    lista_quartos.familia.push(new Quarto(i, "familia", null, 7, null));
    lista_quartos.praiano.push(new Quarto(i, "praiano", null, 8, null));
    lista_quartos.premium.push(new Quarto(i, "premium", null, 16, null));
    lista_quartos.luxo.push(new Quarto(i, "luxo", null, 15, null));
    alert(JSON.stringify(lista_quartos.executivo))
    SalvarDados()
}


if (1 == 1) {
    lista_funcionario = [new Funcionario("Enzo", "Rua dos fodas 58", "+55 11 98168-5828", Criptografia("Papaya")),
    new Funcionario("Gabrielly L. De Macedo", "Rua Das mina 2", "+55 11 99527-7430", Criptografia("0")),
    new Funcionario("Guilherme", "Rua joao batista alberti 88", "+55 11 99122-913", Criptografia("1")),
    new Funcionario("Giova", "Rua das mina 30", "+55 11 95559-3823", Criptografia("2"))]
    SalvarDados()
}

function verificar_entrada(entrada) {
    const caracteresDeRisco = ["'", '"', ';', '--', '#', '/*', '*/', '(', ')', '=', '%', '<', '>', '&', '|', '^', '\\', '`', '{', '}', '[', ']', '!', '$', '+', '*']
    for (let i = 0; i < entrada.length; i++) {
        if (caracteresDeRisco.includes(entrada[i])){
            alert("Entrada com caracter inválido.")
            return false
        }
    }
    return entrada
}

function verificar_senha(senha) {
    const caracteresEspeciais = [',', '-', '.', '/', ':', '?', '@', '_', '~']
    let caracterEspecial = false
    let letraMaiuscula = false
    let numero = false
    try {
        if (senha.length < 7) {
            alert("Senha inválida, precisa ter no mínimo 7 dígitos.");
            return false
        }
        for (let i = 0; i < senha.length; i++) {
            if (caracteresEspeciais.includes(senha[i])) {
                caracterEspecial = true
            }
            if (senha[i] >= 'A' && senha[i] <= 'Z') {
                letraMaiuscula = true
            }
            if (!isNaN(senha[i]) && senha[i] !== ' ') {
                numero = true
            }
        }
        if (!caracterEspecial) {
            alert("Senha inválida, precisa ter no mínimo 1 caractere especial.");
            return false
        }
        if (!letraMaiuscula) {
            alert("Senha inválida, precisa ter no mínimo 1 letra maiuscula.");
            return false
        }
        if (!numero) {
            alert("Senha inválida, precisa ter no mínimo 1 número.");
            return false
        }
        return true
    }
    catch (error) {
        alert(erro)
    }

}

function Cadastro() {
    try {
        let nome = verificar_entrada(document.getElementById("nome").value);
        let hash = verificar_entrada(document.getElementById("senha").value)
        if (verificar_senha(hash)) {
            let senha = Criptografia(hash)
            let endereco = verificar_entrada(document.getElementById("endereco").value)
            let contato = verificar_entrada(document.getElementById("contato").value)
            let id = verificar_entrada(document.getElementById("id").value)
            if (!nome || !senha || !endereco || !contato || !id) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }
            if (lista_clientes.some(cliente => cliente.getId() === id)) {
                alert("Já tem cadastro para esse cpf.");
                return false;
            } else {
                alert("Cadastro Feito com Sucesso.")
                let cliente = new Cliente(nome, endereco, contato, id, senha);
                lista_clientes.push(cliente);
                SalvarDados();
                window.location.href = 'login.html';
            }
        }
    } catch (error) {
        alert(error);
        return false;
    }
}

function Encontrar_pessoa(identidade, senha) {
    return lista_clientes.find(cliente => cliente.getId() === identidade && cliente.getSenha() === senha) || null;
}

function Encontrar_pessoa_pelo_nome(nome) {
    try {
        CarregarDados()
        if (lista_clientes.length == 0) {
            return null
        }
        let x = lista_clientes.find(cliente => cliente.getNome() === nome) || null;
        return x;
    } catch (error) {
        return null; // Retorna null em caso de erro
    }
}
function Encontrar_pessoa_pelo_id(nome) {
    try {
        CarregarDados()
        if (lista_clientes.length == 0) {
            return null
        }
        let x = lista_clientes.find(cliente => cliente.getId() === nome) || null;
        return x;
    } catch (error) {
        return null; // Retorna null em caso de erro
    }
}
function DiffDias(datacheckin, datacheckout) {
    let checkin = new Date(datacheckin);
    let checkout = new Date(datacheckout);
    let dias = (checkout - checkin) / (1000 * 60 * 60 * 24);
    return dias
}
function Login() {
    try {
        let quantidade = 4
        let nome = verificar_entrada(document.getElementById("Usuario").value)
        let senha = Criptografia(verificar_entrada(document.getElementById("Senha").value))
        let objeto = Encontrar_pessoa_pelo_id(nome)
        if ((quantidade - erro) > 1) {
            if (objeto === null) {
                alert("Conta não existente.");
            } else if (senha == objeto.getSenha()) {
                alert(`Entrada com sucesso ${objeto.getNome()}`);
                erro = 0
                SalvarDados()
                window.location.href = 'index2.html';
            } else {
                erro = erro + 1
                alert(`Senha incorreta.\nVocê tem mais ${quantidade - erro} tentativa(s)`);
            }
        } else {
            alert(`Senha incorreta.\nVocê tem mais 0 tentativa(s)`)
            alert("Muitas tentativas erradas de senha.")
            SalvarDados()
            window.location.href = 'index.html'
        }
    } catch (error) {
        alert(error)
    }
}

function Redirect_cadastro() {
    window.location.href = 'cadastro.html';
}




function AdicionarReserva() {
    CarregarDados()
    let datacheckin = verificar_entrada(document.getElementById("checkin").value);
    let datacheckout = verificar_entrada(document.getElementById("checkout").value);
    let dono = verificar_entrada(document.getElementById("nomeReserva").value);
    let tipo = verificar_entrada(document.getElementById("tipo").value);
    let servico = verificar_entrada(document.getElementById("service").value)
    let email = verificar_entrada(document.getElementById("emailReserva").value)
    if (!email) {
        alert("Digite o seu email")
        return
    }
    if (!datacheckin || !datacheckout) {
        alert("Digite datas");
        return;
    }
    alert("Verificando disponibilidade...");
    alert(tipo)
    let x = EstaDisponivel(datacheckin, datacheckout, tipo);

    if (x) {
        alert("Quarto disponível!");
        try {
            let y = Encontrar_pessoa_pelo_nome(dono);
            if (y != null) {
                alert(`Cliente encontrado: ${y.getNome()}`);
                let preco = 122
                switch (servico) {
                    case "basic":
                        preco = 100;
                        break;
                    case "premium":
                        preco = 200;
                        break;
                    case "premium plus":
                        preco = 300;
                        break;
                    case "ultra":
                        preco = 400;
                        break;
                    case "ultra plus":
                        preco = 500;
                        break;
                    case "max":
                        preco = 600;
                        break;
                }
                let preco_quarto = 0
                switch (tipo) {
                    case "executivo":
                        preco_quarto = 150; // Preço para quarto executivo
                        break;
                    case "executivo_vista_mar":
                        preco_quarto = 250; // Preço para quarto executivo vista mar
                        break;
                    case "familia":
                        preco_quarto = 350; // Preço para quarto família
                        break;
                    case "premium":
                        preco_quarto = 450; // Preço para quarto premium
                        break;
                    case "luxo":
                        preco_quarto = 550; // Preço para quarto luxo
                        break;
                    case "praiano":
                        preco_quarto = 650; // Preço para bangalô praiano
                        break;
                }
                let dias = DiffDias(datacheckin, datacheckout)
                let preco_total = (preco_quarto * dias) + preco
                let reserva = new Reserva(datacheckin, datacheckout, y.getId(), x, servico, preco_total);
                lista_reservas[tipo].push(reserva);
                let div = document.getElementById("vazia");
                if (tipo === "executivo_vista_mar") {
                    div.innerHTML = `<h1>Quarto número:${x} do ${tipo.split('_').join(' ')} está liberado ${y.getNome()}.</h2><br>`
                }
                else {
                    div.innerHTML = `<h1>Quarto número:${x} do ${tipo} está liberado ${y.getNome()}.</h2><br>`
                }

                SalvarDados();
            }
            else {
                alert("Usuario nao encontrado")
            }

        } catch (error) {
            alert(`Erro ao adicionar reserva: ${error}`);
        }
    } else {
        alert("Não há quartos disponíveis nessa data ou você digitou uma data inválida");
    }
}

function EstaDisponivel(datacheckin, datacheckout, tipo) {
    CarregarDados()
    let checkin = new Date(datacheckin);
    let checkout = new Date(datacheckout);

    let aux = null;

    alert("Iniciando verificação de disponibilidade...");
    
    alert(tipo)
    alert(JSON.stringify(lista_quartos[tipo]))
    if (!lista_quartos[tipo]) {
        alert("Tipo de quarto inválido.");
    }
    alert("a")
    for (let quarto of lista_quartos[tipo]) {
        alert(`Verificando quarto número: ${quarto.getNumero()}`);
        let status = true
        for (let reserva of lista_reservas[tipo]) {
            alert(`Verificando reserva...`);
            if (reserva.getNumQuarto() === quarto.getNumero()) {
                alert(`Conflito encontrado com a reserva: ${reserva.getNumQuarto()}`);
                if (checkin <= new Date(reserva.getCheckout()) && checkout >= new Date(reserva.getCheckin())) {
                    alert("Quarto não disponível, conflito de datas.");
                    status = false;
                    break;
                }
            }
        }

        if (status) {
            alert(`Quarto ${quarto.getNumero()} está disponível.`);
            aux = quarto.getNumero();
            return aux;
        }
    }
    alert("Nenhum quarto disponível.");
    return false;
}

function EstaDisponivel_print() {
    let checkin = new Date(verificar_entrada(document.getElementById("datacheckin1").value));
    let checkout = new Date(verificar_entrada(document.getElementById("datacheckout1").value));
    let tipo = verificar_entrada(document.getElementById("tipo1").value)
    if (checkout > checkin) {
        if (verificar_entrada(document.getElementById("datacheckin1").value) && verificar_entrada(document.getElementById("datacheckout1").value) && tipo) {
            for (let quarto of lista_quartos[tipo]) {
                let status = true;
                for (let reserva of lista_reservas[tipo]) {
                    if (reserva.getNumQuarto() === quarto.getNumero()) {
                        if (checkin <= reserva.getCheckout() && checkout >= reserva.getCheckin()) {
                            status = false;
                            break;
                        }
                    }
                }
                alert(status)
                if (status) {
                    let div = document.getElementById("vazia1");
                    alert(div.innerHTML)
                    if (tipo === "executivo_vista_mar") {
                        div.innerHTML = `<h1>Quarto número:${quarto.getNumero()} do ${tipo.split('_').join(' ')} está liberado.</h2><br>`
                    }
                    else {
                        div.innerHTML = `<h1>Quarto número:${quarto.getNumero()} do ${tipo} está liberado.</h2><br>`
                        alert(div.innerHTML)
                    }
                    alert(div.innerHTML)
                    aux = quarto.getNumero();
                    return status;
                }
            }

            return false;
        }
        let div = document.getElementById("vazia1");
        div.innerHTML = `<h1>Algum dado está inválido.</h2><br>`;
        return false
    }
    let div = document.getElementById("vazia1");
    div.innerHTML = `<h1>Data está inválida.</h2><br>`;
    return false



}


function Retirada() {
    CarregarDados()
    let id = verificar_entrada(document.getElementById("CPF").value)
    let tipo = verificar_entrada(document.getElementById("tipo").value)
    let numquarto = verificar_entrada(document.getElementById("NumQuarto").value)
    let func = Criptografia(verificar_entrada(document.getElementById("SenhaFuncionario").value))
    let validar = false
    for (let funcionario of lista_funcionario)
        if (func == funcionario.getSenha()) {
            validar = true
            break
        }
    if (validar) {
        let reserva = AcharReserva(numquarto, id, tipo)
        if (reserva === null) {
            alert("Essa reserva não existe")
        }
        else {
            let precinho = 0
            switch (tipo) {
                case "executivo":
                    precinho = 150; // Preço para quarto executivo
                    break;
                case "executivo_vista_mar":
                    precinho = 250; // Preço para quarto executivo vista mar
                    break;
                case "familia":
                    precinho = 350; // Preço para quarto família
                    break;
                case "premium":
                    precinho = 450; // Preço para quarto premium
                    break;
                case "luxo":
                    precinho = 550; // Preço para quarto luxo
                    break;
                case "praiano":
                    precinho = 650; // Preço para bangalô praiano
                    break;
            }
            let precao = 0
            switch (reserva.getServico()) {
                case "basic":
                    precao = 100;
                    break;
                case "premium":
                    precao = 200;
                    break;
                case "premium plus":
                    precao = 300;
                    break;
                case "ultra":
                    precao = 400;
                    break;
                case "ultra plus":
                    precao = 500;
                    break;
                case "max":
                    precao = 600;
                    break;
            }
            reserva.getPreco() = parseFloat(reserva.getPreco()) + (6 * parseFloat(verificar_entrada(document.getElementById("quant_doce").value))) + (8 * parseFloat(verificar_entrada(document.getElementById("quant_bebida").value)))
            let dias_reserva = DiffDias(reserva.getCheckin(), reserva.getCheckout())
            let tipinho = tipo
            if (tipinho === "executivo_vista_mar") {
                tipinho = "executivo vista mar"
            }
            alert(`O preco a pagar é: R$${reserva.getPreco()} pois:\n Você ficou ${dias_reserva} dia(s) e o tipo do seu quarto é:${tipinho} \n Que custa:R$ ${precinho}\n Já o serviço escolhido - ${reserva.getServico()} custa:R$ ${precao} \n e os produtos consumidos do frigobar: R$ ${(6 * parseFloat(verificar_entrada(document.getElementById("quant_doce").value))) + (8 * parseFloat(verificar_entrada(document.getElementById("quant_bebida").value)))}`)
            lista_historico.push(reserva);
            let index = lista_reservas[tipo].findIndex(item => item === reserva);
            if (index !== -1) {
                lista_reservas[tipo].splice(index, 1);
                alert("Retirada Válida, volte sempre.\nO Hotel encantado agradece a sua estadia conosco.")
                SalvarDados();
                window.location.href = 'index.html'

            }
        }

    } else {
        alert("Retirada Inválida, pois esse funcionário não existe.")
    }

}
function AcharReserva(NumQuarto, id, tipo) {
    for (let reserva of lista_reservas[tipo]) {
        if (reserva.getNumQuarto() == NumQuarto && reserva.getId() == id) {
            return reserva
        }
    }
    return null
}


document.querySelectorAll(".mudar-formulario").forEach((elemento) => {
    elemento.addEventListener("click", () => {
        document.getElementById("login").classList.toggle("formulario-visivel");
        document.getElementById("registro").classList.toggle("formulario-visivel");
        document.getElementById("mensagemLogin").classList.toggle("formulario-visivel");
        document.getElementById("mensagemRegistro").classList.toggle("formulario-visivel");
    });
});
