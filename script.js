let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

class Cliente {
    constructor(nome, endereco, contato, id, senha, dependentes) {
        this.nome = nome;
        this.endereco = endereco;
        this.contato = contato;
        this.id = id;
        this.senha = senha;
        this.dependentes = dependentes;
    }
}

class Quarto {
    constructor(numero, tipo, codigo = null, preco, dono = null) {
        this.numero = numero;
        this.tipo = tipo;
        this.codigo = codigo;
        this.preco = preco;
        this.dono = dono;
    }
}

class Historico {
    constructor(reserva) {
        this.reserva = reserva;
    }
}

class Comanda {
    constructor(diaria, frigobar = null, servicos = null) {
        this.diaria = diaria;
        this.frigobar = frigobar;
        this.servicos = servicos;
    }
}

class Funcionario {
    constructor(nome, endereco, contato, senha) {
        this.nome = nome;
        this.endereco = endereco;
        this.contato = contato;
        this.senha = senha;
    }
}

class Reserva {
    constructor(checkin, checkout, id, numquarto, servico, preco) {
        this.checkin = new Date(checkin);
        this.checkout = new Date(checkout);
        this.id = id;
        this.numquarto = numquarto;
        this.servico = servico
        this.preco = preco
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
let lista_funcionario=[]

// Função para atualizar o sessionStorage
function SalvarDados() {
    sessionStorage.setItem('lh', JSON.stringify(lista_historico));
    sessionStorage.setItem('lr', JSON.stringify(lista_reservas));
    sessionStorage.setItem('lq', JSON.stringify(lista_quartos));
    sessionStorage.setItem('lc', JSON.stringify(lista_clientes));
    sessionStorage.setItem('lf', JSON.stringify(lista_funcionario));
    sessionStorage.setItem('teste', "Teste")
}
// Função para carregar dados do sessionStorage
function CarregarDados() {
    lista_historico = JSON.parse(sessionStorage.getItem('lh')) || [];
    lista_reservas = JSON.parse(sessionStorage.getItem('lr')) || {
        executivo: [], executivo_vista_mar: [], familia: [], praiano: [], premium: [], luxo: []
    };
    lista_quartos = JSON.parse(sessionStorage.getItem('lq')) || {
        executivo: [], executivo_vista_mar: [], familia: [], praiano: [], premium: [], luxo: []
    };
    lista_clientes = JSON.parse(sessionStorage.getItem('lc') || []);
    lista_funcionario= JSON.parse(sessionStorage.getItem('lf') || []);
    teste = sessionStorage.getItem('teste')
}
// Verifica se a página atual é "index.html"



// Chama a função verificarPaginaIndex() quando a página é carregada

if (window.location.pathname.endsWith("index2.html")) {
    CarregarDados(); // Chama a função CarregarDados() se estiver na página "index.html"
};
function Teste() {
    CarregarDados()

}

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
    lista_quartos.executivo.push(new Quarto(i, "executivo", null, 1, null));
    lista_quartos.executivo_vista_mar.push(new Quarto(i, "executivo_vista_mar", null, 12, null));
    lista_quartos.familia.push(new Quarto(i, "familia", null, 7, null));
    lista_quartos.praiano.push(new Quarto(i, "praiano", null, 8, null));
    lista_quartos.premium.push(new Quarto(i, "premium", null, 16, null));
    lista_quartos.luxo.push(new Quarto(i, "luxo", null, 15, null));
    SalvarDados()
}
if (1==1){
        lista_funcionario = [new Funcionario("Enzo", "Rua dos fodas", "+55 11 98168-5828", "0"),
        new Funcionario("Gabrielly L. De Macedo", "Rua Das mina 2", "+55 11 99527-7430", "1"),
        new Funcionario("Guilherme", "Rua joao batista alberti 88", "+55 11 99122-913", "2"),
        new Funcionario("Giova", "Rua das mina 30", "+55 11 95559-3823", "3")]
    SalvarDados()
}



function Cadastro() {
    try {
        let nome = document.getElementById("nome").value;
        let senha = document.getElementById("senha").value;
        let endereco = document.getElementById("endereco").value;
        let contato = document.getElementById("contato").value;
        let id = document.getElementById("id").value;
        let acomp = document.getElementById("acompanhantes").value;
        if (!nome || !senha || !endereco || !contato || !id || acomp === "") {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (lista_clientes.some(cliente => cliente.id === id)) {
            alert("O usuário já está cadastrado.");
            return false;
        } else {
            let cliente = new Cliente(nome, endereco, contato, id, senha, acomp);
            lista_clientes.push(cliente);

            SalvarDados();
            window.location.href = 'login.html';
        }
    } catch (error) {
        alert("Ocorreu um erro durante o cadastro. Por favor, tente novamente.");
        return false;
    }
}

function Encontrar_pessoa(identidade, senha) {
    return lista_clientes.find(cliente => cliente.id === identidade && cliente.senha === senha) || null;
}

function Encontrar_pessoa_pelo_nome(nome) {
    try {
        CarregarDados()
        let x = lista_clientes.find(cliente => cliente.nome === nome) || null;
        return x;
    } catch (error) {
        alert(`Ocorreu um erro durante a busca: ${error}`);
        alert("Ocorreu um erro durante a busca. Por favor, tente novamente.");
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
        CarregarDados();  // Certifique-se de que os dados estão carregados.
        let nome = document.getElementById("Usuario").value;
        let senha = document.getElementById("Senha").value;
        let objeto = Encontrar_pessoa_pelo_nome(nome);
        if (objeto === null) {
            alert("Conta não existente.");
        } else if (objeto.senha === senha) {
            alert(`Entrada com sucesso ${objeto.nome}`);
            SalvarDados()
            window.location.href = 'index2.html';
        } else {
            alert("Senha incorreta.");
        }
    } catch (error) {
        alert(`Ocorreu um erro durante o login:${error}`);
        alert("Ocorreu um erro durante o login. Por favor, tente novamente.");
    }
}

function Redirect_cadastro() {
    window.location.href = 'cadastro.html';
}




function AdicionarReserva() {
    CarregarDados()
    let datacheckin = document.getElementById("checkin").value;
    let datacheckout = document.getElementById("checkout").value;
    let dono = document.getElementById("nomeReserva").value;
    let tipo = document.getElementById("tipo").value;
    let servico = document.getElementById("service").value
    if (!datacheckin || !datacheckout) {
        alert("Digite datas");
        return;
    }
    alert("Verificando disponibilidade...");
    let x = EstaDisponivel(datacheckin, datacheckout, tipo);

    if (x) {
        alert("Quarto disponível!");
        try {
            let y = Encontrar_pessoa_pelo_nome(dono);
            if (y != null) {
                alert(`Cliente encontrado: ${y.nome}`);
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
                let reserva = new Reserva(datacheckin, datacheckout, y.id, x, servico, preco_total);
                lista_reservas[tipo].push(reserva);
                let div = document.getElementById("vazia");
                if (tipo === "executivo_vista_mar") {
                    div.innerHTML = `<h1>Quarto número:${x} do ${tipo.split('_').join(' ')} está liberado.</h2><br>`
                }
                else {
                    div.innerHTML = `<h1>Quarto número:${x} do ${tipo} está liberado.</h2><br>`
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
    if (!lista_quartos[tipo]) {
        alert("Tipo de quarto inválido.");
    }
    for (let quarto of lista_quartos[tipo]) {
        alert(`Verificando quarto número: ${quarto.numero}`);
        let status = true;
        for (let reserva of lista_reservas[tipo]) {
            alert(`Verificando reserva: ${JSON.stringify(reserva)}`);
            if (reserva.numquarto === quarto.numero) {
                alert(`Conflito encontrado com a reserva: ${reserva.numquarto}`);
                if (checkin <= new Date(reserva.checkout) && checkout >= new Date(reserva.checkin)) {
                    alert("Quarto não disponível, conflito de datas.");
                    status = false;
                    break;
                }
            }
        }

        if (status) {
            alert(`Quarto ${quarto.numero} está disponível.`);
            aux = quarto.numero;
            return aux;
        }
    }
    alert("Nenhum quarto disponível.");
    return false;
}

function EstaDisponivel_print() {
    let checkin = new Date(document.getElementById("datacheckin1").value);
    let checkout = new Date(document.getElementById("datacheckout1").value);
    let tipo = document.getElementById("tipo1").value
    if (checkout > checkin) {
        if (document.getElementById("datacheckin1").value && document.getElementById("datacheckout1").value && tipo) {
            for (let quarto of lista_quartos[tipo]) {
                let status = true;
                for (let reserva of lista_reservas[tipo]) {
                    if (reserva.numquarto === quarto.numero) {
                        if (checkin <= reserva.checkout && checkout >= reserva.checkin) {
                            status = false;
                            break;
                        }
                    }
                }

                if (status) {
                    let div = document.getElementById("vazia1");
                    if (tipo === "executivo_vista_mar") {
                        div.innerHTML = `<h1>Quarto número:${x} do ${tipo.split('_').join(' ')} está liberado.</h2><br>`
                    }
                    else {
                        div.innerHTML = `<h1>Quarto número:${x} do ${tipo} está liberado.</h2><br>`
                    }    
                    aux = quarto.numero;
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
    div.innerHTML = `<h1>Data está inválido.</h2><br>`;
    return false



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
function Retirada() {
    CarregarDados()
    let id = document.getElementById("CPF").value
    let tipo = document.getElementById("tipo").value
    let numquarto = document.getElementById("NumQuarto").value
    let func = document.getElementById("SenhaFuncionario").value
    let validar = false
    for (let funcionario of lista_funcionario)
        if (func == funcionario.senha) {
            validar = true
            break
        }
    if (validar) {
        let reserva = AcharReserva(numquarto, id, tipo)
        if (reserva===null){
            alert("Essa reserva não existe")
        }
        else{
            reserva.preco= parseFloat(reserva.preco)+parseFloat(document.getElementById("kitkat").value)+parseFloat(document.getElementById("coca").value)
        alert(`O preco a pagar é: ${reserva.preco}`)
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
        if (reserva.numquarto == NumQuarto && reserva.id == id) {
            return reserva
        }
    }
    return null
}
