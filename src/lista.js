const addFrutaTable = (fruta) => {
  let frutasTBody = document.getElementById('frutaListaTBody');

  let frutaTr = `
    <tr>
      <th scope="row">${fruta.identificador}</th>
      <td><img src="${fruta.imagem}" width="50" height="50"></td>
      <td>${fruta.nome}</td>
      <td>${fruta.cientifico}</td>
      <td>${fruta.producao} Kg</td>
      <td>${fruta.dataPlantio}</td>
    </tr>
  `;

  frutasTBody.insertAdjacentHTML('beforeend', frutaTr);
};

// Carregar fruteiras do localStorage ao abrir a página
const carregarTabela = () => {
  let frutas = JSON.parse(localStorage.getItem('frutas')) ?? [];
  for (let fruta of frutas) {
    addFrutaTable(fruta);
  }
};

// Lidar com o envio do formulário
const handleSubmit = (event) => {
  event.preventDefault();

  let frutaForm = document.getElementById('frutaCadastrarForm');
  let frutaFormData = new FormData(frutaForm);
  let fruta = Object.fromEntries(frutaFormData);

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

  // Resetar formulário
  frutaForm.reset();

  // Fechar modal
  $('#frutaModal').modal('toggle');

  // Exibir Toastify
  Toastify({
    text: 'Fruteira cadastrada com sucesso!',
    duration: 3000,
    gravity: "top", 
    position: "center",
    style: { background: "green" }
  }).showToast();
};

// Eventos
let frutaCadastrarForm = document.getElementById('frutaCadastrarForm');
frutaCadastrarForm.onsubmit = handleSubmit;

document.body.onload = carregarTabela;