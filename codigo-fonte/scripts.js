
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

// Verifique se o elemento "btn-enviar" existe antes de adicionar o ouvinte de eventos
const btnEnviar = document.getElementById("btn-enviar");

if (btnEnviar){
  document.addEventListener("DOMContentLoaded", function() {
    btnEnviar.addEventListener("click", function(event) {
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
  });
};



/* ********************************** */
/*            Playlist              */
/* ********************************** */
// Organizar audios da playlist em listas
import audios from "./audios.js";

function loadAudios() {
    const playlist_area = document.querySelector(".playlist");

    audios.forEach((audio, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
          
          <div class="playlist-audio ${index + 1 === 1 && "active"}">
            <audio src=${audio.src} muted></audio>
            <div class="playlist-info-bloco1">
              <img class="playlist-img-info" src="${audio.img}"></img>
              <label class="playlist-audio-info">${audio.title}</label>
            </div>
            <div class="playlist-info-bloco2">
              <i class="bi playlist-play bi-play-circle-fill" id="1"></i>
            </div>
          </div>
        `;

        playlist_area.appendChild(div);
    });

    addOnClick();
}

function addOnClick() {
    const audio_main = document.querySelector(".main-audio-content");
    const playlist_audio = document.querySelectorAll(".playlist-audio");

    playlist_audio.forEach((item, i) => {
    if (!i) {
        setaudio(audio_main, item);
    }

    item.onclick = () => {
        playlist_audio.forEach((audio) => audio.classList.remove("active"));
        item.classList.add("active");

        setaudio(audio_main, item);
    };
    });
}

function setaudio(audio_main, item) {
    audio_main.children[0].src = item.children[0].getAttribute("src");
    audio_main.children[1].innerHTML = item.children[1].innerHTML;
}

loadAudios();

/* ********************************** */
/*          Player                    */
/* ********************************** */

// Tocar audio ao clicar no play (do player)
const audio = new Audio('./audios/01.mp3')

btnPlay = document.getElementById("play-player").addEventListener("click", ()=> {
  if (audio.paused || audio.currentTime <=0) {
    audio.play()
  } else {
    audio.pause()
  }
})
