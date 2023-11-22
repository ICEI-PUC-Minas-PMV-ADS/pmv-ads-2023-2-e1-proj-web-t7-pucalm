/* ********************************** */
/*          Funções Globais           */
/* ********************************** */

function redirecionarParaPagina(pagina) {
  window.location.href = pagina;
}

// Responsável por configurar e inicializar dinamicamente o conteúdo da página com base em algumas condições, classes e dados fornecidos.
function gerarPagina(param) {
    btnPlay = document.querySelector("#controle-play");
    seekSlider = document.querySelector("#progresso-barra");
    currentTime = document.querySelector("#current");
    durationTime = document.querySelector("#remaining");
    currentTitle = document.querySelector("#titulo-atual");
    currentArtist = document.querySelector("#artista-atual");
    currentThumb = document.querySelector("#capa-atual");
    prevSong = document.querySelector("#controle-voltar");
    nextSong = document.querySelector("#controle-avancar");
    progressoMusica = document.querySelector("#progresso-musica");
    seekInput = document.querySelector("#input-seeker");
  
    containerPrincipal = document.querySelector("#container-principal");
  
    if (
      !document.getElementsByTagName("BODY")[0].classList.contains("body-index")
    ) {
      window.onclick = function (event) {
        // if(event.target == modalGenre || event.target == modalSong)
        // {
        //     modalGenre.style.display = "none";
        //     modalSong.style.display = "none";
        // }
        if (event.target != document.querySelector("#context")) {
          if (document.querySelector("#context")) {
            document.querySelector("#context").style.display = "none";
          }
        }
      };
  
      if (containerPrincipal.classList.contains("t-inicio")) {
        containerPrincipal.innerHTML =
          '<div id="titulo-pagina"><h1>Playlists</h1></div><div id="container-playlists"></div>';
        // btnAddPlaylist = document.querySelector("#addPlaylistButton");
        document.querySelector("#titulo-pagina").innerHTML = "Início";
        var containerPlaylists = document.querySelector("#container-playlists");
        playlists.forEach(function (elem) {
          containerPlaylists.innerHTML += criarCardPlaylist(elem);
        });
      } else if (containerPrincipal.classList.contains("t-playlist")) {
        var audios = getMusicasDaPlaylist(param);
        containerPrincipal.innerHTML =
          '<div id="container-central"><div class="secao-flex espacamento-section"><div class="tamanho-20 imagem-playlist"><img class="capa-album" src="assets/playlists/genero-' +
          audios[0] +
          '.jpg" alt=""></div><div class="tamanho-60 informacoes-playlist"><div id="albumTitle"><h1>' +
          audios[0] +
          '</h1></div><div id="albumSongs">' +
          audios[2] +
          " Músicas" +
          '</div><img id="tocar-playlist-toda" src="assets/imgs/play_musicbar.png" alt="Play" onclick="addQueue(\'' +
          param +
          '\')"></div><div class="secao-grid tamanho-20 secao-filtro"><div class="alinhar-direita"><select name="ordenar_por" class="personalizacao-select"><option value="1">Ordenar por</option><option value="2">Nome</option><option value="3">Data</option><option value="4">Favorito</option><option value="5">Mais tocadas</option></select></div><div class="secao-flex centralizar alinhar-direita" style="padding-top:70%"></div></div></div></div><div id="containerMusica"></div>';
        btnAddSong = document.querySelector("#addSongButton");
        var containerMusica = document.querySelector("#containerMusica");
        audios[1].forEach(function (elem) {
          containerMusica.innerHTML +=
            '<div class="songCard" onclick="acessarMusica(\'' +
            elem[3] +
            "')\" oncontextmenu=\"showContext('" +
            elem[3] +
            '\' );return false;"><div class="songLeft"><img class="icon-sm" src="assets/icons/music-player-grey.png"><div class="songTitle">' +
            elem[3] +
            '</div><div class="songDetail"><span class="songArtist">' +
            elem[1] +
            '</span></div></div><div class="songRight">' +
            elem[4] +
            "</div></div>";
        });
      } else if (containerPrincipal.classList.contains("t-feedback")) {
        containerPrincipal.innerHTML =
          '<div id="container-central"><div><h1 id="titulo-pagina">Escreva seu feedback</h1></div><div><span id="container-feedback"></span></div></div>';
        document.querySelector("#titulo-pagina").innerHTML = "Feedback";
        document.querySelector("#container-feedback").innerHTML =
          '<div><div class="container-logo"></div><div class="container-titulo-subtitlo"><h5>Nos ajude a melhorar! Deixe seu comentário ou proposta de melhoria para que possamos atender suas necessidades cada vez melhor.</h5></div><div class="container-form"><form class="form" id="form" action="https://formspree.io/f/mleyzvob" method="POST"><div class="container-nome"><label for="tnome">Nome (Obrigatório)</label><input type="text" id="tnome" name="nome" placeholder="Nome..." maxlength="255" required><span class="icone-validacao"></span></div><div class="container-email"><label for="temail">E-mail (Opcional)</label><input type="email" id="temail" name="email" placeholder="email@exemplo.com.br" autocomplete="email" maxlength="255"><span class="icone-validacao"></span></div><div class="container-msg"><label for="tmsg">Mensagem (Obrigatório)</label><textarea id="tmsg" name="msg" placeholder="Escreva seu comentário..." maxlength="255" required></textarea><span class="icone-validacao"></span></div><div class="container-btn-enviar"><input type="submit" value="Enviar" id="btn-enviar"></div></form></div>';
      }
    }
  }
  
  function acessarPagina(classe, name) {
    containerPrincipal = document.querySelector("#container-principal");
    containerPrincipal.removeAttribute("class");
    containerPrincipal.classList.toggle(classe);
    if(name){
        gerarPagina(name);
    }else{
        gerarPagina();
    }
  }

// Configura e exibe a página Inicio
function acessarInicio() {
    acessarPagina("t-inicio");
  }
  
// Configura e exibe a página da Playlist
function acessarPlaylist(name) {
    acessarPagina("t-playlist", name);
  }
  

  // Configura e exibe a página Feedback
  function acessarFeedback() {
    acessarPagina("t-feedback");
  }
  

/* ********************************** */
/*          Redirecionar Páginas      */
/* ********************************** */
// Redirecionar para página Landing Page
document.getElementById("logo").addEventListener("click", function () {
  redirecionarParaPagina("landing-page.html");
});

// Redirecionar para página Inicio
document.getElementById("menu-lateral-inicio").addEventListener("click", function () {
    acessarInicio();
  });

// Redirecionar para página Feedback
document.getElementById("menu-lateral-feedback").addEventListener("click", function () {
    acessarFeedback();
  });

// Redirecionar para página Inicio Mobile
document.getElementById("btInicioMobile").addEventListener("click", function () {
    acessarInicio();
  });

// Redirecionar para página Feedback Mobile
document.getElementById("btFeedbackMobile").addEventListener("click", function () {
    acessarFeedback();
  });

// Redirecionar para página Landing Page Mobile
document.getElementById("btLandingPageMobile").addEventListener("click", function () {
    redirecionarParaPagina("landing-page.html");
  });


/* ********************************** */
/*          Regras de Negocio         */
/* ********************************** */

var dadosMusicas = [
  ["foco", "Desconhecido", "Verde", "Audio 01", "07:14"],
  ["foco", "Desconhecido", "Azul", "Audio 02", "05:47"],
  ["Estudo", "Desconhecido", "Verde", "Audio 03", "06:02"],
  ["Ansiedade", "Desconhecido", "Azul", "Audio 04", "05:17"],
];
var playlists = ["Foco", "Relaxamento", "Sono", "Ansiedade", "Estudo"];

var audio = new Audio();

// Selecionar as músicas com base no gênero fornecido como argumento, criar uma cópia de backup dessa lista e retornar um array contendo o gênero, a lista de músicas filtradas e o número de músicas nessa lista.
function getMusicasDaPlaylist(genero) {
  var audios = [];
  var length = 0;
  dadosMusicas.forEach(function (elem) {
    if (elem[0].toLowerCase() === genero.toLowerCase()) {
      length = audios.push(elem);
    }
  });
  backup_queue = audios;
  var data = [genero, audios, length];
  return data;
}

function criarCardPlaylist(elem) {
  return `<div class='card' onclick='acessarPlaylist("${elem}")'>
                <div class='thumbnail'><img src='assets/playlists/genero-${elem}.jpg' alt='' class='img-thumb'></div>
                <div><p class='description'>${elem}</p><p style="font-size:14px; padding-left: 0.7rem; text-align: left;">Ouvir agora</p></div>
            </div>`;
}

// Configuração da página inicial do site, exibindo uma lista de playlists e permitindo que o usuário acesse cada uma clicando nos cards correspondentes.
function iniciarCodigo() {
  containerPrincipal.innerHTML = ""; // Limpa o conteúdo existente

  const tituloPagina = document.createElement("div");
  tituloPagina.id = "titulo-pagina";
  tituloPagina.innerHTML = "<h1>Playlists</h1>";
  containerPrincipal.appendChild(tituloPagina);

  btnAddPlaylist = document.querySelector("#addPlaylistButton");
  document.querySelector("#titulo-pagina").innerHTML = "Início";
  var containerPlaylists = document.querySelector("#container-playlists");

  playlists.forEach(function (elem) {
    const cardPlaylist = document.createElement("div");
    cardPlaylist.className = "card";
    cardPlaylist.setAttribute("onclick", `acessarPlaylist("${elem}")`);

    cardPlaylist.innerHTML = `
            <div class='thumbnail'><img src='assets/playlists/genero-${elem}.jpg' alt='' class='img-thumb'></div>
            <div class='description'><p>${elem}</p></div>`;

    containerPlaylists.appendChild(cardPlaylist);
  });
}

gerarPagina(iniciarCodigo);



// Iniciar música clicando no título dela
function acessarMusica(param) {
  containerPrincipal = document.querySelector("#container-principal");
  console.log("song : " + param); // imprimir nome do audio
  playlist_index = 0;
  song_queue = [];
  dadosMusicas.forEach(function (elem) {
    if (elem[3].toLowerCase() === param.toLowerCase()) {
      if (song_queue.indexOf(elem) < 0) {
        song_queue.push(elem);
      }
    }
  });

  // audio.currentTime = 0;
  iniciarMusica();
}

// Configura e inicia a reprodução de uma música, atualiza elementos na página com informações da música e associa event listeners para atualização de tempo e mudança de música ao término da reprodução.
function iniciarMusica(_callback) {
  // audio.pause();
  // audio = new Audio();
  ext = ".mp3";
  // agent = navigator.userAgent.toLowerCase();
  audio.src =
    "assets/audios/" +
    song_queue[0][1] +
    "-" +
    song_queue[0][2] +
    "-" +
    song_queue[0][3] +
    ext;
  console.log("audio.src : " + audio.src);
  audio.loop = false;
  audio.volume = 1;
  currentTitle.innerHTML = song_queue[0][3];
  currentArtist.innerHTML = song_queue[0][1];
  currentThumb.src = "assets/albums/album-" + song_queue[0][2] + ".jpg";
  //audio.addEventListener("atualizartempo",atualizarTempo);
  audio.addEventListener("timeupdate", atualizarTempo);
  audio.addEventListener("ended", mudarMusica);

  _callback && _callback();

  btnPlay.src = "assets/icons/pause.png";
  audio.play();
}

function atualizarTempo() {
  var tm = audio.currentTime * (100 / audio.duration);
  var tmperc = tm + "%";
  progressoMusica.style.width = "" + tmperc + "";
  var curmins = Math.floor(audio.currentTime / 60);
  var cursecs = Math.floor(audio.currentTime - curmins * 60);
  var dursecs = 0;
  if (!Number.isNaN(audio.duration)) {
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
  } else {
    durmins = 0;
  }
  if (cursecs < 10) {
    cursecs = "0" + cursecs;
  }
  if (dursecs < 10) {
    dursecs = "0" + dursecs;
  }
  if (curmins < 10) {
    curmins = "0" + curmins;
  }
  if (durmins < 10) {
    durmins = "0" + durmins;
  }
  currentTime.innerHTML = curmins + ":" + cursecs;
  durationTime.innerHTML = durmins + ":" + dursecs;
}

function mudarMusica() {
  playlist_index++;
  audio.src =
    "assets/audios/" +
    song_queue[playlist_index][1] +
    "-" +
    song_queue[playlist_index][2] +
    "-" +
    song_queue[playlist_index][3] +
    ext;
  currentTitle.innerHTML = song_queue[playlist_index][3];
  currentArtist.innerHTML = song_queue[playlist_index][1];
  currentThumb.src =
    "assets/albums/album-" + song_queue[playlist_index][2] + ".jpg";
  if (song_queue.length != 1) {
    audio.play();
  }
}

// Iniciar música clicando no botão Play da playlist
function addQueue(param) {
  playlist_index = 0;
  var audios = getMusicasDaPlaylist(param);
  song_queue = [];
  audios[1].forEach(function (elem) {
    song_queue.push(elem);
  });
  audio.pause();
  audio.currentTime = 0;
  audio = new Audio();
  iniciarMusica();
  //initAudioPlayer();
}

// Reprodução/Pausa do Audio, através do botão Play/Pause do Player
btnPlay.addEventListener("click", function () {
  // Verifica se o áudio está tocando
  if (audio.paused) {
    // Se estiver pausado, retoma a reprodução
    audio.play().catch((error) => {
      console.error("Erro ao iniciar a reprodução:", error);
    });
    // Atualiza a imagem do botão para o ícone de pausa
    btnPlay.src = "assets/icons/pause.png";
  } else {
    // Se estiver tocando, pausa a reprodução
    audio.pause();
    // Atualiza a imagem do botão para o ícone de play
    btnPlay.src = "assets/icons/play.png";
  }
});
