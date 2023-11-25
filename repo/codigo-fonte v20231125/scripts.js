
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
        if (!index) {
          // Adicionar informações do audio no player
          document.getElementById("titulo-audio-player").innerText = audio.title;
          document.getElementById("img-audio-player").src = audio.img;
      }

      div.innerHTML = `
        <div class="playlist-audio ${index + 1 === 1 && "active"}">
          <audio id=${audio.id} src=${audio.src} autoplay muted></audio>
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
      item.addEventListener("click", () => {
         
          // Remover a classe "active" de todos os itens da playlist
          playlist_audio.forEach((audio) => audio.classList.remove("active"));

          // Adicionar a classe "active" ao item clicado
          item.classList.add("active");

          // Adicionar informações do audio no player (ajustar)
          setAudio(item);
        
      });
  });
}

// Função para retornar os dados de um audio com base na id (de audios.js importado )
function findAudioById(id) {
  return audios.find(audio => audio.id === id);
}

function setAudio(item) {
  const audio = item.querySelector("audio")
  const audioId = parseInt(audio.getAttribute("id"))
  const audioInfo = findAudioById(audioId)
  console.log(audioInfo)

  // Definir o src do elemento de áudio do player com o src do audio clicado
  document.getElementById("audio-main").src = audioInfo.src;
  

  // Adicionar informações do audio no player
  document.getElementById("titulo-audio-player").innerText = audioInfo.title;
  document.getElementById("img-audio-player").src = audioInfo.img;

}

loadAudios();


// Tocar primeira música da playlist ao clicar no player da playlist
document.getElementById("play-playlist-toda").addEventListener("click", () => {
  console.log('play-playlist-toda clicado!')
});

/* ********************************** */
/*          Player                    */
/* ********************************** */
