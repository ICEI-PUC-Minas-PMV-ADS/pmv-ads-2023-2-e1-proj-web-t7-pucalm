
/* ********************************** */
/*          Funções Globais           */
/* ********************************** */

function redirecionarParaPagina(pagina) {
  window.location.href = pagina;
}

// Redirecionar para página Início
document.getElementById("btn-inicio").addEventListener("click", function() {
  redirecionarParaPagina('index.html');
});

// Redirecionar para página Feedback
document.getElementById("btn-feedback").addEventListener("click", function() {
  redirecionarParaPagina('feedback.html');
});

// Salvar objeto no Local Storage do Navegador
function salvarObjLocalStorage(nome_obt, dados) {
  localStorage.setItem(nome_obt, JSON.stringify(dados))
}

// Retornar objeto do Local Storage do Navegador
function retornarObjLocalStorage(nome_obj) {
  obj_str = localStorage.getItem(nome_obj)
  return JSON.parse(obj_str)
}


/* ********************************** */
/*          Página Feedback           */
/* ********************************** */

//==> Envio do formulário de feedback
document.getElementById("btn-enviar").addEventListener("click", function(event) {
  event.preventDefault(); // Impede o envio do formulário padrão

  // Validação dos campos do formulário
  const nome = document.querySelector("#tnome").value;
  const email = document.querySelector("#temail").value;
  const mensagem = document.querySelector("#tmsg").value;
  
  if (nome === "" || mensagem === "") {
      // Exibe uma mensagem de erro se campos obrigatórios estiverem vazios
      swal("Erro!", "Por favor, preencha todos os campos obrigatórios.", "error");
  } else {
      // Se a validação for bem-sucedida, exibe o pop-up de agradecimento
      swal("Obrigado por seu Feedback!");
  }

  // Salvar Feedback no LocalStorage do navegador
  const dados = {
    'nome': nome,
    'email': email,
    'mensagem': mensagem
  }
  
  salvarObjLocalStorage('feedbacks', dados)

  // Retornar Feedback do LocalStorage
  dados = retornarObjLocalStorage('feedback1')

  console.log(`nome: ${dados.nome}\nemail: ${dados.email}\nmensagem: ${dados.mensagem}\n`)  
});



/* ********************************** */
/*          Página inicial            */
/* ********************************** */
// Deixar o carousel mostrando múltimos elementos de filtro

