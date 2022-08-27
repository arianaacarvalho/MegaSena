var estado = {tabela:[], jogoAtual:[], jogosSalvos:[]}

function start(){
    criarTabela()
    novoJogo()
}

function criarTabela(){
    estado.tabela = []

    for(var i = 0; i <= 60; i++){
        estado.tabela.push(i)
    }
}

function novoJogo(){
    zerarJogo()
    render()
}

function render(){
    renderTabela()
    renderBotoes()
    renderJogosSalvos()
}

function renderTabela(){
    var divTabela = document.querySelector('#megasena-tabela')
    divTabela.innerHTML = ''

    var ulNumeros = document.createElement('ul')
    ulNumeros.classList.add('numbers')

    for(var i = 0; i < estado.tabela.length; i++){
        var numeroAtual = estado.tabela[i]

        var liNumero = document.createElement('li')
        liNumero.textContent = numeroAtual
        liNumero.classList.add('number')

        liNumero.addEventListener('click', handLiNumeroClick)

        if(numeroRepetido(numeroAtual)){
            liNumero.classList.add('selected-number')
        }

        ulNumeros.appendChild(liNumero)
    }
    divTabela.appendChild(ulNumeros)
}

function handLiNumeroClick(event){
    var valor = Number(event.currentTarget.textContent)

    if(numeroRepetido(valor)){
        removeNumero(valor)
    }else{
        adicionaNumero(valor)
    }
    console.log(estado.jogoAtual)
    render()
}

function renderBotoes(){
    var divBotoes = document.querySelector('#megasena-botoes')
    divBotoes.innerHTML = ''

    var botaoNovoJogo = novoJogoBotao()
    var botaoJogoAleatorio = jogoAleatorioBotao()
    var botaoSalvarJogo = salvarJogoBotao()

    divBotoes.appendChild(botaoNovoJogo)
    divBotoes.appendChild(botaoJogoAleatorio)
    divBotoes.appendChild(botaoSalvarJogo)
}

function novoJogoBotao(){
    var botao = document.createElement('button')
    botao.textContent = 'Novo Jogo'
    botao.addEventListener('click', novoJogo)

    return botao
}

function jogoAleatorioBotao(){
    var botao = document.createElement('button')
    botao.textContent = 'Jogo Aleatório'
    botao.addEventListener('click', jogoAleatorio)

    return botao
}

function salvarJogoBotao(){
    var botao = document.createElement('button')
    botao.textContent = 'Salvar Jogo'
    botao.addEventListener('click', salvarJogo)
    botao.disabled = estado.jogoAtual.length !== 6

    return botao
}

function renderJogosSalvos(){
    var divJogosSalvos = document.querySelector('#megasena-jogos-salvos')
    divJogosSalvos.innerHTML = ''

    if(estado.jogosSalvos.length === 0){
        divJogosSalvos.innerHTML = '<p>Nenhum Jogo Salvo</p>'
    }else{
        var ulJogosSalvos = document.createElement('ul')

        for(var i = 0; i < estado.jogosSalvos.length; i++){
            var jogoAtual = estado.jogosSalvos[i]

            var liJogo = document.createElement('li')
            liJogo.textContent = jogoAtual.join(', ')

            ulJogosSalvos.appendChild(liJogo)
        }
        divJogosSalvos.appendChild(ulJogosSalvos)
    }
}

function adicionaNumero(numero){
    if(numero < 1 || numero > 60){
        console.error('Número invalido', numero)
        return
    }
    if(estado.jogoAtual.length > 5){
        console.error('O jogo já está completo')
        return
    }
    if(numeroRepetido(numero)){
        console.error(numero + ' já está no seu jogo')
        return
    }
    estado.jogoAtual.push(numero)
}

function removeNumero(numero){
    var novoJogo = []

    for(var i = 0; i < estado.jogoAtual.length;i++){
        var numeroAtual = estado.jogoAtual[i]

        if(numeroAtual === numero){
            continue
        }
        novoJogo.push(numeroAtual)
    }
        estado.jogoAtual = novoJogo
}

function numeroRepetido(numero){
    if(estado.jogoAtual.includes(numero)){
        return true
    }
    return false
}

function salvarJogo(){
    if(estado.jogoAtual.length !== 6){
        console.error('O jogo não está completo')
        return
    }
    estado.jogosSalvos.push(estado.jogoAtual)
    novoJogo()

    console.log(estado.jogosSalvos)
}

function zerarJogo(){
    estado.jogoAtual = []
}

function jogoAleatorio(){
    zerarJogo()

    while(estado.jogoAtual.length !== 6){
        var randomNumero = Math.ceil(Math.random() * 60)
        adicionaNumero(randomNumero)
    }
    console.log(estado.jogoAtual)
    render()
}
start()