
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
  obj = JSON.parse(obj_str)
  return obj
}


/* ********************************** */
/*          Página Feedback           */
/* ********************************** */

//==> Envio do formulário de feedback
document.getElementById("btn-enviar").addEventListener("click", function(event) {
 // event.preventDefault(); // Impede o envio do formulário padrão

  // Validação dos campos do formulário
  const nome = document.querySelector("#tnome").value;
  const email = document.querySelector("#temail").value;
  const mensagem = document.querySelector("#tmsg").value;
  
  if (nome === "" || mensagem === "") {
      // Exibe uma mensagem de erro se campos obrigatórios estiverem vazios
      swal("Atenção!", "Por favor, preencha todos os campos obrigatórios.", "error");
  } else {
      // Se a validação for bem-sucedida, exibe o pop-up de agradecimento
      swal("Mensagem Enviada!","Obrigado por seu Feedback!", "success");
  }

  //  Teste Salvar Feedback no LocalStorage do navegador
  const dados = {
    'nome': nome,
    'email': email,
    'mensagem': mensagem
  }
  
  salvarObjLocalStorage('feedbacks', dados)

  // Teste Retornar Feedback do LocalStorage
  const dados_lidos = retornarObjLocalStorage('feedback1')

  console.log(`nome: ${dados_lidos.nome}\nemail: ${dados_lidos.email}\nmensagem: ${dados_lidos.mensagem}\n`)  

  // Limpa os valores do form (verificar)
  nome.value = "";
  email.value = "";
  mensagem.value = "";
});




/* ********************************** */
/*          Página inicial            */
/* ********************************** */
// Deixar o carousel mostrando múltimos elementos de filtro

const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
    control.addEventListener("click", (e) => {
        isLeft = e.target.classList.contains("arrow-left");

        if (isLeft) {
            currentItem -= 1;
        } else {
            currentItem += 1;
        }

        if (currentItem >= maxItems) {
            currentItem = 0;
        }

        if (currentItem < 0) {
            currentItem = maxItems - 1;
        }

        items.forEach((item) => item.classList.remove("current-item"));

        items[currentItem].scrollIntoView({
            behavior: "smooth",
            inline: "center"
        });

        items[currentItem].classList.add("current-item");
    });
});