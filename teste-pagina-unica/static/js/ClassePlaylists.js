// Importar a classe Audios
import Audios from "./ClasseAudios.js";

class Playlists {
  constructor() {
    // Inicializar a instância da classe Audios
    this.audios = new Audios();

    // Lista de playlists (gerada automaticamente a partir dos gêneros disponíveis)
    this.playlists = this.gerarPlaylists();
  }

  // Método para gerar automaticamente a lista de playlists com base nos gêneros disponíveis
  gerarPlaylists() {
    // Obter a lista de gêneros disponíveis através da instância da classe Audios
    const generos = this.audios.retornarGeneros();

    // Mapear cada gênero para formatar a primeira letra em maiúscula (transformar "foco" em "Fcco", por exemplo)
    const playlistsFormatadas = generos.map((genero) =>
      genero.charAt(0).toUpperCase()
    );

    // Retornar a lista de playlists formatadas
    return playlistsFormatadas;
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

}

export default Playlists;

// Exemplo de uso da classe Playlists
const playlists = new Playlists();
const audiosFoco = playlists.retornarAudiosDaPlaylist("Foco");
console.log(audiosFoco);
