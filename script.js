let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

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
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
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
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
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
})


// reservas.js
class Quarto {
    constructor(numero, tipo, codigo = null, preco, dono = null) {
        this.numero = numero;
        this.tipo = tipo;
        this.codigo = codigo;
        this.preco = preco;
        this.dono = dono
    }
}
class Historico {
    constructor(reserva) {
        this.reserva = reserva
    }
}

class Comanda {
    constructor(diaria, frigobar = null, servicos = null) {
        this.diaria = diaria
        this.frigobar = frigobar
        this.servicos = servicos
    }
}

class Cliente {
    constructor(nome, endereco, contato, id, senha, dependentes) {
        this.nome = nome;
        this.endereco = endereco;
        this.contato = contato;
        this.id = id;
        this.senha = senha
        this.dependentes = dependentes;
    }
}

class Funcionario {
    constructor(nome, endereco, contato, id) {
        this.nome = nome;
        this.endereco = endereco;
        this.contato = contato;
        this.id = id;
    }
}

class Reserva {
    constructor(checkin, checkout, id, numquarto) {
        this.checkin = new Date(checkin)
        this.checkout = new Date(checkout)
        this.id = id
        this.numquarto = numquarto
    }
}
let lista_historico = []
let lista_reservas = []
let lista_clientes = [];
let lista_quartos = { executivo: [], executivo_vista_mar: [], familia: [], praiano: [], premium: [], luxo: [] };

function Encontrar_pessoa(identidade, senha) {
    return lista_clientes.find(cliente => cliente.id === identidade && cliente.senha === senha) || null;
}
function Encontrar_pessoa_pelo_nome(nome) {
    return lista_clientes.find(cliente => cliente.nome === nome) || null;
}


function DiffDias(datacheckin, datacheckout) {
    let checkin = new Date(datacheckin)
    let checkout = new Date(datacheckout)
    diffmili = checkout - checkin
    diffdias = diffmili / (1000 * 60 * 60 * 24)
    return diffdias
}

function Cadastro() {
    alert("fase1")
    let nome = document.getElementById("nome").value;
    let senha = document.getElementById("senha").value
    let endereco = document.getElementById("endereco").value;
    let contato = document.getElementById("contato").value;
    let id = document.getElementById("id").value;
    alert(`Nome: ${nome}, Senha: ${senha}, Endereço: ${endereco}, Contato: ${contato}, Identidade: ${id}`)
    if (lista_clientes.some(cliente => cliente.id === id)) {
        alert("O usuário já está cadastrado.")
    }else {
        alert("fase3")
        let acomp=document.getElementById("acompanhantes").value
        alert(`Nome: ${nome}, Senha: ${senha}, Endereço: ${endereco}, Contato: ${contato}, Identidade: ${id},acompanhantes:${acomp}`)//chinesa eu to a mt tempo querendo arrumar esse problema, o código só para aqui e nn faz mais nada
        alert("fase5")
        lista_clientes.push(new Cliente(nome, endereco, contato, id, senha, acomp ));
        alert("fase6")
        window.location.href ='login.html'
    }
}
function Login() {
    let nome = document.getElementById("Usuario").value;
    let senha = document.getElementById("Senha").value
    let objeto = Encontrar_pessoa_pelo_nome(nome)
    if (objeto === null) {
        alert("Conta não existente.")
    }
    else {
        let identidade = objeto.id
        if (lista_clientes.some(cliente => cliente.id === identidade && cliente.senha === senha)) {
            let cliente_logado = lista_clientes.find(obj => obj.id === identidade)
            alert(`Entrada com sucesso ${cliente_logado.nome}`)
            window.location.href = 'index.html'
        }
        else {
            alert("Conta não existente.")
        }
    }

}
function Redirect_cadastro(){
    window.location.href = 'cadastro.html'
}
for (let i = 1; i <= 2; i++) {
    lista_quartos.executivo.push(new Quarto(i, "executivo", null, 1, null));
    lista_quartos.executivo_vista_mar.push(new Quarto(i, "executivo_vista_mar", null, 12, null));
    lista_quartos.familia.push(new Quarto(i, "familia", null, 7, null));
    lista_quartos.praiano.push(new Quarto(i, "praiano", null, 8, null));
    lista_quartos.premium.push(new Quarto(i, "premium", null, 16, null));
    lista_quartos.luxo.push(new Quarto(i, "luxo", null, 15, null));
}
let aux // Variável global que armazena o número do quarto disponível; 
// na hora de rodar o adicionar reserva pensar se o aux deve ser colocado como parâmetro 
// ou se pode tirar o parâmetro e colocá-lo diretamente na função

function AdicionarReserva() // Função para adicionar uma reserva a um quarto disponível; 
//tem que trocar os parâmetros por document.getelementbyid
{
    let datacheckin = document.getElementById("datacheckin").value
    let datacheckout = document.getElementById("datacheckout").value
    let dono = document.getElementById("nomeReserva").value
    let tipo = document.getElementById("tipo").value
    alert(`Tipo selecionado: ${tipo}`)
    // Verifica se há um quarto disponível nas datas e tipo especificados
    if (EstaDisponivel(datacheckin, datacheckout, tipo)) {
        alert("china")
        let x = Encontrar_pessoa_pelo_nome(dono)
        dono = x.id
        // Cria uma nova reserva com as informações do check-in, check-out, dono e o número do quarto (aux)
        let reserva = new Reserva(datacheckin, datacheckout, dono, aux); // dono é o nome da pessoa ou identidade, 
        // pq sipa é melhor trabalhar com identidade
        lista_reservas.push(reserva); // Adiciona a nova reserva à lista de reservas
        alert(Object.values(reserva))
    } else {
        // Exibe um alerta caso não haja quartos disponíveis ou a data seja inválida
        alert("Não há quartos disponíveis nessa data ou você digitou uma data inválida");
    }

}

function EstaDisponivel(datacheckin, datacheckout, tipo) {
    let checkin = new Date(datacheckin); // Converte o check-in para o formato de data
    let checkout = new Date(datacheckout); // Converte o check-out para o formato de data

    alert(checkin, checkout)
    // Itera sobre todos os quartos do tipo especificado para encontrar um quarto disponível
    for (let quarto of lista_quartos[tipo]) {
        let status = true; // Inicialmente, assume que o quarto está disponível
        // Itera sobre todas as reservas para verificar se há conflito de datas
        for (let reserva of lista_reservas) {
            if (reserva.numquarto === quarto.numero) {// Verifica se a reserva está associada ao número do quarto atual
                if (checkin <= reserva.checkout && checkout >= reserva.checkin) {                // Verifica se as datas de check-in e check-out conflitam com as da reserva existente
                    status = false; // Marca o quarto como indisponível caso haja conflito
                    break; // Sai do loop de reservas para evitar verificações adicionais desnecessárias
                }
            }
        }

        // Se não houve conflito e o quarto está disponível
        if (status) {
            alert("if 3")
            let div = document.getElementById("vazia"); // Seleciona o elemento onde a mensagem será exibida
            div.innerText = `Quarto ${quarto.numero} está liberado.`; // Exibe o número do quarto disponível
            aux = quarto.numero; // Define `aux` como o número do quarto disponível encontrado
            return status; // Retorna true indicando que um quarto disponível foi encontrado
        }
    }

    return false; // Retorna false caso nenhum quarto disponível seja encontrado
}

// ainda é necessario o disponibildiade?
function Retirada(id, numquarto, senha) {
    const pessoa = Encontrar_pessoa(id, senha)
    for (let reserva of lista_reservas) {
        if (reserva.numero == numquarto && reserva.id == id && pessoa.senha == senha) {
            lista_historico.push(reserva)
            let index = lista_reservas.findIndex(item => item === reserva);
            if (index !== -1) { // Verifica se o item foi encontrado
                lista_reservas.splice(index, 1); // Remove o item no índice encontrado
            }
        }
    }
}
document.querySelectorAll(".mudar-formulario").forEach((elemento) => {
    elemento.addEventListener("click", () => {
        document.getElementById("login").classList.toggle("formulario-visivel");
        document.getElementById("registro").classList.toggle("formulario-visivel");
        document.getElementById("mensagemLogin").classList.toggle("formulario-visivel");
        document.getElementById("mensagemRegistro").classList.toggle("formulario-visivel");
    });
});
