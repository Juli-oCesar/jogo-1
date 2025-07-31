// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Bem vindos ao jogo do número secreto';
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10'
let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = geradorDeNumerosAleatorios(); 
let tentativas = 1;

function exibirTextosNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextosNaTela('h1','Jogo do número secreto');
    exibirTextosNaTela('p','Escolha um número de 1 a 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if (numeroSecreto == chute) {
        let palavataTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavataTentativas}!`;
        exibirTextosNaTela('h1','Parabéns!');
        exibirTextosNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            exibirTextosNaTela('p','Número secreto é maior');
        } else {
            exibirTextosNaTela('p','Número secreto é menor');
        }
        tentativas++ ;
        limparCampo();
    } 
    
}

function geradorDeNumerosAleatorios() {
    let numeroEscolhido = parseInt(Math.random()* 10 + 1);
    let quantidadeDeElementosSorteados = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosSorteados == numeroLimite) {
        listaDeNumerosSorteados = [];
        
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return geradorDeNumerosAleatorios();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ' ';
}

function reiniciarJogo() {
    numeroSecreto = geradorDeNumerosAleatorios();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}