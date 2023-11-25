import Audios from './ClasseAudios';
import Playlists from './ClassePlaylists';
import Player from './ClassePlayer';

class Paginas {
  constructor(containerPrincipal) {
    this.containerPrincipal = containerPrincipal;
    this.audios = new Audios();
    this.playlists = new Playlists(this.audios);
    this.player = new Player();
  }

  // Método para carregar o conteúdo da página a partir de um arquivo HTML
  carregarConteudoPagina(arquivoHTML) {
    fetch(arquivoHTML)
      .then((response) => response.text())
      .then((html) => {
        this.containerPrincipal.innerHTML = html;
      }); 
  }

  // Método para gerar o conteúdo da página com base na classe do container
  gerarPagina(genero) {
    if (this.containerPrincipal.classList.contains("t-inicio")) {
      this.carregarConteudoPagina('./caminho/para/inicio.html');
      // Restante do código
    } else if (this.containerPrincipal.classList.contains("t-playlist")) {
      const playlistAtual = this.playlists.playlists.find((playlist) => playlist.nome === genero);
      if (playlistAtual) {
        this.carregarConteudoPagina('./static/html/playlists.html');
        this.inserirValoresPlaylist(playlistAtual);
        // Restante do código
      }
    } else if (this.containerPrincipal.classList.contains("t-feedback")) {
      this.carregarConteudoPagina('./caminho/para/feedback.html');
    }
    
  }

  inserirValoresPlaylist(playlist) {
    const containerCentral = document.getElementById('container-central');
    const albumTitle = document.getElementById('albumTitle');
    const albumSongs = document.getElementById('albumSongs');

    containerCentral.innerHTML = containerCentral.innerHTML
      .replace('{Genero}', playlist.nome)
      .replace('{Quantidade}', playlist.quantidade);

    albumTitle.innerHTML = `<h1>${playlist.nome}</h1>`;
    albumSongs.innerHTML = `${playlist.quantidade} Músicas`;
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
}

export default Paginas;
