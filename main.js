//declarando as Variaveis
const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando"/>';	
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji triste"/>';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class ="resultado reprovado">Reprovado</span';
const notaMInima = parseFloat(prompt("Digite a nota mínima:"));

let linhas = '';

//alterando o padrão do botão 
form.addEventListener('submit', function(e) {
	e.preventDefault();

	//funções as serem seguidas após selecionar o botão
	adicionaLinha();
	atualizatabela();
	atualizaMediafinal();

})
	//função vai adicionar uma linha a cada vez que clicar no botão ( adicionar+ ) 
function adicionaLinha() {
	//chamando variaveis do input-HTML através do id 
	const inputNomeAtividade = document.getElementById('nome-atividade');
	const inputNotaAtividade = document.getElementById('nota-atividade');

	if(atividades.includes(inputNomeAtividade.value)) {
		alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
	} else {
		//cada vez que optar por adicionar linha vamos atualizar a tabela incluindo os dados 
		atividades.push(inputNomeAtividade.value);
		notas.push(parseFloat(inputNotaAtividade.value));

		//adicionando dados e criando a logica para usar no calculo
		let linha = '<tr>';
		linha += `<td>${inputNomeAtividade.value}</td>`;
		linha += `<td>${inputNotaAtividade.value}</td>`;
		linha += `<td>${inputNotaAtividade.value >= notaMInima ? imgAprovado : imgReprovado}</td>`;
		linha += `</td>`

		//armazenando os dados anteriores junto com atual
		linhas += linha;
	}

	//esvaziando os inputs para novos dados 
	inputNomeAtividade.value = '';
	inputNotaAtividade.value = '';
}

//função criada p/ mostrar a lista dos dados usados 
function atualizatabela() { 
	const corpoTabela = document.querySelector('tbody');
	corpoTabela.innerHTML = linhas;
}
//mostra o total da media 
function atualizaMediafinal() {
	const mediaFinal = calculaMediaFinal().toFixed(1);

	document.getElementById('media-final-valor').innerHTML = mediaFinal;
	document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMInima ? spanAprovado : spanReprovado;
}
//calculo da media (soma de todos os valores devidido pelas materias)
function calculaMediaFinal() {
	let somaDasNotas = 0;

	for (let i = 0; i < notas.length; i++) {
		somaDasNotas += notas[i];
	}

	return somaDasNotas / notas.length;
}


