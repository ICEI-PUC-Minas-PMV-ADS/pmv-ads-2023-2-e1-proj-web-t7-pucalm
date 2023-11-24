// Importar a classe Audios
import Audios from "Audios.js";

class Playlists {
  constructor() {
    // Inicializar a instância da classe Audios
    this.audios = new Audios();

    // Lista de playlists (gerada automaticamente a partir dos gêneros disponíveis)
    this.playlists = this.gerarPlaylists();
  }

  // Método para gerar automaticamente a lista de playlists com base nos gêneros disponíveis
  gerarPlaylists() {
    const generos = this.audios.retornarGeneros();
    return generos.map((genero) => genero.charAt(0).toUpperCase() + genero.slice(1));
  }

  // Retorna os áudios de uma playlist específica
  retornarAudiosDaPlaylist(genero) {
    return this.audios.retornarAudiosPorGenero(genero);
  }

  // Cria um card de playlist para exibição na interface
  criarCardPlaylist(genero) {
    return `<div class='card' onclick='this.acessarPlaylist("${genero}")'>
                <div class='thumbnail'><img src='assets/playlists/genero-${genero}.jpg' alt='' class='img-thumb'></div>
                <div><p class='description'>${genero}</p><p style="font-size:14px; padding-left: 0.7rem; text-align: left;">Ouvir agora</p></div>
            </div>`;
  }

  // Método para acessar a página de uma playlist específica
  acessarPlaylist(nomePlaylist) {
    // Implemente conforme necessário
  }

  // Outros métodos relacionados às playlists podem ser adicionados conforme necessário
}

export default Playlists;
