import Audios from './ClasseAudios.js';
import Playlists from './ClassePlaylists.js';
import Player from './ClassePlayer.js';

class Paginas {
  constructor(containerPrincipal) {
    this.containerPrincipal = containerPrincipal;
    this.tituloPagina =  document.querySelector("#titulo-pagina")
    this.playlists = new Playlists();
    this.player = new Player();
  }

   // Método para carregar o conteúdo da página a partir de um arquivo HTML
   async carregarConteudoPagina(arquivoHTML) {
    const response = await fetch(arquivoHTML);
    const html = await response.text();
    this.containerPrincipal.innerHTML = html;
  }

  // Método para gerar o conteúdo da página com base na classe do container
  async gerarPagina(genero) {
    // Página Início
    if (this.containerPrincipal.classList.contains("t-inicio")) {
      await this.carregarConteudoPagina('./static/html/inicio.html');
      this.tituloPagina.innerHTML = "Início";

      const containerPlaylists = document.querySelector("#container-playlists");

      this.playlists.generos.forEach(
        (genero) => containerPlaylists.innerHTML += '<br>teste troca do HTML' 
      );
    }

    // Página Playlist
    else if (this.containerPrincipal.classList.contains("t-playlist")) {
      this.tituloPagina.innerHTML = "Playlist";
      const playlistAtual = this.playlists.playlists.find((playlist) => playlist.nome === genero);

      if (playlistAtual) {
        await this.carregarConteudoPagina('./static/html/playlists.html');
        this.inserirValoresPlaylist(playlistAtual);
      }
    }

    // Página Feedback
    else if (this.containerPrincipal.classList.contains("t-feedback")) {
      await this.carregarConteudoPagina('./static/html/feedback.html');
      this.tituloPagina.innerHTML = "Feedback";
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