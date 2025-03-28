let participantes = [];
// Funcão para adicionar um participante
function adicionar() {
    let inputNome = document.getElementById("nome-amigo")
let nome = inputNome.value.trim();

if ( nome === "") {
    alert("Por favor, insira um nome válido."); // Exibe um alerte se o nome estiver vazio
    return;
}

//Normaliza o nome para evitar duplicatas
let nomeNormalizado = nome.toLowerCase();
let nomesNormalizados = participantes.map(participante => participante.toLowerCase());

if (nomesNormalizados.includes(nomeNormalizado)) {
    alert("Esse nome já foi adicionado.");
    return;
}

participantes.push(nome); // Adiciona o nome à lista de participantes
inputNome.value = ""; //Limpa o campo de entrada
atualizarListaAmigos(); 
}
 // Função para atualizar a lista na interface
 function atualizarListaAmigos() {
    let listaAmigos = document.getElementById("lista-amigos");
    listaAmigos.innerHTML = participantes.join(", "); // Exibe os nomes separados da vírgula
 }

 //Função para realizar o sorteio
 function sortear () {
    if (participantes.length <2 ) {
        alert("Adicione pelo menos 2 participantes para realizar o sorteio.");
        return;
    }

    let resultado = sortearAmigoSecreto(participantes);
    atualizarResultadoSorteio(resultado); // Atualiza a interface com resultado
 }

// Função para atualizar o resultado
function atualizarResultadoSorteio(resultado) {
    let listaSorteio = document.getElementById("lista-sorteio");
        listaSorteio.innerHTML = resultado
        .map(par => `${par.amigo} tirou ${par.sorteado}`)
    .join("<br>");

}

//Função para embaralhar a lista

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

// Função para sortear o amigo secreto
function sortearAmigoSecreto(participantes) {
    let sorteados = [...participantes];// Cria uma cópia da lista de participantes
    do {
        sorteados = embaralhar(sorteados);
    } while  (sorteados.some((sorteado, index) => sorteado === participantes[index])) // Verifica se alguém tirou a si mesmo
   return participantes.map((participantes, index) => ({
        amigo : participantes,
        sorteado: sorteados[index],
   }));
}
// Função para reiniciar o sorteio
function reiniciar () {
    participantes = [];
    document.getElementById("lista-amigos").innerHTML = ""; 
    document.getElementById("lista-sorteio").innerHTML = "";
    document.getElementById("nome-amigo").value = "";
}
function atualizarResultadoSorteio(resultado) {
    const listaSorteio = document.getElementById("lista-sorteio");
    listaSorteio.innerHTML = "";
    resultado.forEach(par => {
        const p = document.createElement("p");
        p.className = "fade-in";
        p.textContent = `${par.amigo} tirou ${par.sorteado}`;
        listaSorteio.appendChild(p);
    });
}