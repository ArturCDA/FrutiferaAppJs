const addFrutaTable = (fruta) => {
  let frutasTBody = document.getElementById('frutaListaTBody');

  let frutaTr = `
    <tr>
      <th scope="row">${fruta.identificador}</th>
      <td>${fruta.nome}</td>
      <td>${fruta.cientifico}</td>
      <td>${fruta.producao} Kg</td>
      <td>${fruta.dataPlantio}</td>
    </tr>
  `;

  frutasTBody.insertAdjacentHTML('beforeend', frutaTr);
};

const addFrutaCard = (fruta) => {
  let frutasContainer = document.getElementById('frutasCardContainer');

  let plantio = new Date(fruta.dataPlantio);
  let hoje = new Date();
  let idadeMeses = (hoje.getFullYear() - plantio.getFullYear()) * 12 
                 + (hoje.getMonth() - plantio.getMonth());


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

  frutasContainer.insertAdjacentHTML('beforeend', frutaCard);
};

// Carregar fruteiras do localStorage ao abrir a página
const carregarFrutas = () => {
  let frutas = JSON.parse(localStorage.getItem('frutas')) ?? [];
  for (let fruta of frutas) {
    addFrutaTable(fruta);
    addFrutaCard(fruta);
  }
};

// Lidar com o envio do formulário
const handleSubmit = (event) => {
  event.preventDefault();

  let frutaForm = document.getElementById('frutaCadastrarForm');
  let frutaFormData = new FormData(frutaForm);
  let fruta = Object.fromEntries(frutaFormData);

  fruta.identificador = Date.now();

  let select = document.querySelector('#nome');
  let imgSrc = select.options[select.selectedIndex].getAttribute('data-img');
  fruta.imagem = imgSrc;


  // Recuperar frutas do localStorage
  let frutas = JSON.parse(localStorage.getItem('frutas')) ?? [];

  // Adicionar nova fruta
  frutas.push(fruta);
  localStorage.setItem('frutas', JSON.stringify(frutas));

  // Adicionar na tabela
  addFrutaTable(fruta);
  addFrutaCard(fruta);
  // Resetar formulário
  frutaForm.reset();

  // Fechar modal
  $('#frutaModal').modal('toggle');

  Toastify({
        text: "Item cadastrado com sucesso!",
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

// Eventos
let frutaCadastrarForm = document.getElementById('frutaCadastrarForm');
frutaCadastrarForm.onsubmit = handleSubmit;

document.body.onload = carregarFrutas;

document.getElementById('btnTabela').addEventListener('click', () => {
  document.getElementById('viewTabela').style.display = 'block';
  document.getElementById('viewCards').style.display = 'none';
});

document.getElementById('btnCards').addEventListener('click', () => {
  document.getElementById('viewTabela').style.display = 'none';
  document.getElementById('viewCards').style.display = 'block';
});