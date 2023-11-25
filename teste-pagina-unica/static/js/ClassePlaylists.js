// Importar a classe Audios
import Audios from "./ClasseAudios.js";

class Playlists {
  constructor() {
    this.caminhoCapas = './assets/playlists/'

    // Inicializar a instância da classe Audios
    this.audios = new Audios();

    // Lista de playlists (gerada automaticamente a partir dos gêneros disponíveis)
    this.playlists = this.gerarPlaylists();
  }

  // Método para gerar automaticamente a lista de playlists com base nos gêneros disponíveis
  gerarPlaylists() {
    // Obter a lista de gêneros disponíveis através da instância da classe Audios
    const generos = this.audios.retornarGeneros();

    // Criar o objeto de cada Playlist com informações de nome, qtd de áudios e audios dela
    return generos.map((genero) => {
      const audiosDaPlaylist = this.audios.retornarAudiosPorGenero(genero);
      return {
        nome: genero,
        quantidade: audiosDaPlaylist.length,
        audios: audiosDaPlaylist,
      };
    });
  }

  // Retorna os áudios de uma playlist específica
  retornarAudiosDaPlaylist(genero) {
    return this.audios.retornarAudiosPorGenero(genero);
  }

  // Cria um card de playlist para exibição na interface
  criarCardPlaylist(genero) {
    return `<div class='card' onclick='this.acessarPlaylist("${genero}")'>
  <div class='thumbnail'>
    <img src='${this.caminhoCapas}genero-${genero}.jpg' alt='' class='img-thumb'>
  </div>
  <div>
    <p class='description'>${genero}</p>
    <p style="font-size:14px; padding-left: 0.7rem; text-align: left;">Ouvir agora</p>
  </div>
</div>`;
  }

}

export default Playlists;

// Exemplo de uso da classe Playlists
const playlists = new Playlists();
var cardPlaylist = playlists.criarCardPlaylist('Foco')
console.log(cardPlaylist,'\n\n')


// const audiosDaPlaylist = playlists.retornarAudiosDaPlaylist('Foco')
// console.log(audiosDaPlaylist,'\n\n');


// console.log(playlists.playlists,'\n\n');
// console.log(playlists.playlists[0],'\n\n');
// console.log(playlists.playlists[0].audios,'\n\n');
// console.log(playlists.playlists[0].audios[1],'\n\n');
// console.log(playlists.playlists[0].audios[1].id,'\n\n');


