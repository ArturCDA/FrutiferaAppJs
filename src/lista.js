// ======================== ADICIONA UMA FRUTA NA TABELA ========================
const addFrutaTable = (fruta) => {
  // Seleciona o corpo da tabela onde as frutas serão inseridas
  let frutasTBody = document.getElementById('frutaListaTBody');// seleciona tbody

  // Cria a linha da tabela com os dados da fruta
  let frutaTr = `
    <tr>
      <th scope="row">${fruta.identificador}</th>  <!-- Mostra o Id --> 
      <td>${fruta.nome}</td>                       <!-- Mostra o nome popular -->
      <td>${fruta.cientifico}</td>                 <!-- Mostra o nome científico -->
      <td>${fruta.producao} Kg</td>                <!-- Mostra a produção por safra em kg-->
      <td>${fruta.dataPlantio}</td>                <!-- Mostra a data de plantio -->
    </tr>
  `;

  // Insere a linha no final da tabela
  frutasTBody.insertAdjacentHTML('beforeend', frutaTr);
};

// ======================== ADICIONA UMA FRUTA EM FORMATO CARD ========================
const addFrutaCard = (fruta) => {
  // Seleciona o container de cards
  let frutasContainer = document.getElementById('frutasCardContainer');

  // Calcula a idade da fruta em meses
  let plantio = new Date(fruta.dataPlantio);// data plantio
  let hoje = new Date();// data atual
  //Calcula a diferença em anos * 12 + diferença de meses
  let idadeMeses = (hoje.getFullYear() - plantio.getFullYear()) * 12 
                 + (hoje.getMonth() - plantio.getMonth());

  // Cria o card da fruta com imagem, nome, científico, produção, data e idade
  let frutaCard = `
    <div class="col-md-4 mb-3">
      <div class="card shadow-sm h-100">
        <img src="${fruta.imagem}" class="card-img-top cardImg" alt="${fruta.nome}" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${fruta.nome}</h5>
          <h6 class="card-subtitle mb-2 text-muted"><i>${fruta.cientifico}</i></h6>
          <p class="card-text">
            <strong>ID:</strong> ${fruta.identificador}<br>
            <strong>Produção:</strong> ${fruta.producao} Kg<br>
            <strong>Data Plantio:</strong> ${fruta.dataPlantio}<br>
            <strong>Idade:</strong> ${idadeMeses} meses
          </p>
        </div>
      </div>
    </div>
  `;

  // Insere o card no final do container
  frutasContainer.insertAdjacentHTML('beforeend', frutaCard);
};

// ======================== CARREGA FRUTAS DO LOCALSTORAGE ========================
const carregarFrutas = () => {
  // Recupera o array de frutas armazenado no localStorage (ou cria array vazio se não existir)
  let frutas = JSON.parse(localStorage.getItem('frutas')) ?? [];
  // Para cada fruta, adiciona na tabela e nos cards
  for (let fruta of frutas) { // percorre todas
    addFrutaTable(fruta); // insere na tabela
    addFrutaCard(fruta); // insere no card
  }
};

// Lidar com o envio do formulário
const handleSubmit = (event) => {
  // Evita que a página recarregue ao enviar o formulário
  event.preventDefault();

  // Captura os dados do formulário
  let frutaForm = document.getElementById('frutaCadastrarForm'); // form
  let frutaFormData = new FormData(frutaForm); // dados form
  let fruta = Object.fromEntries(frutaFormData); // Transforma em objeto

  // Gera um ID único
  fruta.identificador = Date.now();

  // Pega a imagem correspondente ao nome da fruta selecionado
  let select = document.querySelector('#nome'); // seleciona frutas
  let imgSrc = select.options[select.selectedIndex].getAttribute('data-img');
  fruta.imagem = imgSrc;


  // Recuperar frutas do localStorage
  let frutas = JSON.parse(localStorage.getItem('frutas')) ?? [];

  // Adicionar nova fruta
  frutas.push(fruta);
  localStorage.setItem('frutas', JSON.stringify(frutas)); // salva

  // Adicionar fruta na tabela
  addFrutaTable(fruta);
  // Adicionar fruta no card
  addFrutaCard(fruta);

  // Resetar formulário para novo cadastro
  frutaForm.reset();

  // Fechar modal (usa Jquery)
  $('#frutaModal').modal('toggle');

  // Exibe notificação de sucesso usando Toastify
  Toastify({
        text: "Fruta cadastrada com sucesso!",
        duration: 3000,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        offset: { x: 20, y: 70 },
        style: {
            background: "linear-gradient(to right, #25b620ff, #fdfaf7ff)",
            padding: "10px 14px",
            width: "auto",
            maxWidth: "250px",
            fontSize: "14px"
        }
    }).showToast();

};

// ======================== EVENTOS ========================

// Captura evento de envio do formulário
let frutaCadastrarForm = document.getElementById('frutaCadastrarForm');
frutaCadastrarForm.onsubmit = handleSubmit; // envia form

// Carrega frutas automaticamente ao abrir a página
document.body.onload = carregarFrutas;

// Alterna para TABELA
document.getElementById('btnTabela').addEventListener('click', () => {
  document.getElementById('viewTabela').style.display = 'block';
  document.getElementById('viewCards').style.display = 'none';
});

// Alterna para CARDS
document.getElementById('btnCards').addEventListener('click', () => {
  document.getElementById('viewTabela').style.display = 'none';
  document.getElementById('viewCards').style.display = 'block';
});