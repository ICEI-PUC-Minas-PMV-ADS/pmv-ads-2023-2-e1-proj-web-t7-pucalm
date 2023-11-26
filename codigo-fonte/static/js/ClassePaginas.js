import Audios from './ClasseAudios.js';
import Playlists from './ClassePlaylists.js';
import Player from './ClassePlayer.js';

class Paginas {
  constructor(containerPrincipal) {
    this.containerPrincipal = containerPrincipal;
    this.tituloPagina =  document.querySelector("#titulo-pagina")
    this.playlists = new Playlists();
    this.player = new Player();
    this.caminhoCapas = './assets/playlists/'
  }

   // Método para carregar o conteúdo da página a partir de um arquivo HTML
   async carregarConteudoPagina(arquivoHTML) {
    const response = await fetch(arquivoHTML);
    const html = await response.text();
    this.containerPrincipal.innerHTML = html;
  }

   // Método para criar um card de playlist
  criarCardPlaylist(genero) {
    const cardPlaylist = document.createElement('div');
    cardPlaylist.id = `playlist-${genero}`;
    cardPlaylist.className = 'card';

    cardPlaylist.innerHTML = `
      <div class='thumbnail'>
        <img src='${this.caminhoCapas}genero-${genero}.jpg' alt='' class='img-thumb'>
      </div>
      <div>
        <p class='description'>${genero}</p>
        <p style="font-size:14px; padding-left: 0.7rem; text-align: left;">Ouvir agora</p>
      </div>
    `;

    return cardPlaylist;
  }

  // Método para gerar o conteúdo da página com base na classe do container
  async gerarPagina(genero) {
    // Página Início
    if (this.containerPrincipal.classList.contains("t-inicio")) {
      await this.carregarConteudoPagina('./static/html/inicio.html');
      this.tituloPagina.innerHTML = "Início";

      const containerPlaylists = document.querySelector("#container-playlists");

      this.playlists.generos.forEach((genero) => {
        // Cria o card de playlist
        const cardPlaylist = this.criarCardPlaylist(genero);
    
        // Adiciona o evento de clique ao card
        cardPlaylist.addEventListener('click', () => {
          this.acessarPlaylist(genero);
        });
    
        // Adiciona o card ao container
        containerPlaylists.appendChild(cardPlaylist);
      });
    }

    // Página Playlist
    else if (this.containerPrincipal.classList.contains("t-playlist")) {
          
      this.tituloPagina.innerHTML = "Playlist";
      const playlistAtual = this.playlists.playlists.find((playlist) => playlist.nome === genero);
      
      if (playlistAtual) {
        await this.carregarConteudoPagina('./static/html/playlists.html');
        this.inserirValoresPlaylist(playlistAtual);
      }

      // Adiciona evento da barra de busca
      document.getElementById('barraFiltro').addEventListener('keyup', () => this.filtrar());
    
    }

    // Página Feedback
    else if (this.containerPrincipal.classList.contains("t-feedback")) {
      await this.carregarConteudoPagina('./static/html/feedback.html');
      this.tituloPagina.innerHTML = "Feedback";
    }

    // Página Histórico
    else if (this.containerPrincipal.classList.contains("t-historico")) {
      await this.carregarConteudoPagina('./static/html/historico.html');
      this.tituloPagina.innerHTML = "Meu Histórico";
    }
  }

  inserirValoresPlaylist(playlist) {
    const albumTitle = document.getElementById('textoAlbumTitle');
    const albumSongs = document.getElementById('albumSongs');
    const imgAlbumTitle = document.getElementById('imgAlbumTitle');
    const tocarPlaylistImg = document.getElementById('tocar-playlist-toda');
    const containerMusica = document.getElementById('containerMusica');

    // Substitua o caminho da imagem conforme necessário
    const caminhoImagem = `${this.caminhoCapas}genero-${playlist.nome}.jpg`;
  
    albumTitle.innerHTML = `${playlist.nome}`;

    if (playlist.quantidade == 1) {
      albumSongs.innerHTML = `${playlist.quantidade} Áudio`;
    } else{
      albumSongs.innerHTML = `${playlist.quantidade} Áudios`;
    }
  
    // Defina o atributo src do imgAlbumTitle
    imgAlbumTitle.src = caminhoImagem;

    // Adiciona um evento de clique ao botão de tocar playlist
    tocarPlaylistImg.addEventListener('click', () => {
      this.player.tocarTodaPlaylist(playlist.nome);
  });

    // Limpa o conteúdo atual do containerMusica
    containerMusica.innerHTML = '';

    // Adicione dinamicamente as músicas ao containerMusica
    playlist.audios.forEach((audio) => {
      const musicaElemento = document.createElement('li');
      musicaElemento.className = 'songCard';
      musicaElemento.innerHTML = `
        <div class="songLeft">
          <img class="icon-sm" src="assets/icons/music-player-grey.png">
          <div class="songTitle">${audio.titulo}</div>
          <div class="songDetail">
            <span class="songArtist">${audio.artista}</span>
          </div>
        </div>
        <div class="songRight">${audio.duracao}</div>
      `;

      // Adiciona um evento de clique ao elemento da música
      musicaElemento.addEventListener('click', () => {
        // Aqui, chame a função para reproduzir a música
        this.player.reproduzirAudio(audio);
      });

      // Adicione o elemento da música ao containerMusica
      containerMusica.appendChild(musicaElemento);
    });

  }
  
  // Método para acessar uma página específica
  acessarPagina(classe, nome_playlist) {
    this.containerPrincipal.removeAttribute("class");
    this.containerPrincipal.classList.toggle(classe);
    if (nome_playlist) {
      this.gerarPagina(nome_playlist);
    } else {
      this.gerarPagina();
    }
  }

  // Métodos para acessar páginas específicas
  acessarInicio() {
    this.acessarPagina("t-inicio");
  }

  acessarPlaylist(nome_playlist) {
    this.acessarPagina("t-playlist", nome_playlist);
  }

  acessarFeedback() {
    this.acessarPagina("t-feedback");
  }

  acessarHistorico() {
    this.acessarPagina("t-historico");
  }

  /* ********************************** */
/*           Função Filtrar      */
/* ********************************** */
filtrar() {
  var input,
  filter,
  ul,
  li,
  i,
  txtValue,
  textoFiltrado,
  nomeTitulo,
  count = 0

  input = document.getElementById("barraFiltro");
  ul = document.getElementById("containerMusica");

  filter = input.value.toUpperCase();

  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    textoFiltrado = li[i].getElementsByClassName("songTitle")[0];
    txtValue = textoFiltrado.textContent || textoFiltrado.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      count++
      nomeTitulo = li[i].querySelector(".songTitle");
      if (nomeTitulo) {
        nomeTitulo.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
          return "<strong>" + match + "</strong>";
        })
      }
    } else {
        li[i].style.display = "none";
    }
  } 
}

}

export default Paginas;