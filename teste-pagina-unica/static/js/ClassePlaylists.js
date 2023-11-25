// Importar a classe Audios
import Audios from "./ClasseAudios.js";

class Playlists {
  constructor() {

    // Inicializar a instância da classe Audios
    this.audios = new Audios();

    // Obter a lista de gêneros disponíveis através da instância da classe Audios
    this.generos = this.audios.retornarGeneros();

    // Lista de playlists (gerada automaticamente a partir dos gêneros disponíveis)
    this.playlists = this.gerarPlaylists();
  }

  // Método para gerar automaticamente a lista de playlists com base nos gêneros disponíveis
  gerarPlaylists() {

    // Criar o objeto de cada Playlist com informações de nome, qtd de áudios e audios dela
    return this.generos.map((genero) => {
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

 

}

export default Playlists;

//Exemplo de uso da classe Playlists
// const playlists = new Playlists();
// console.log(playlists.generos,'\n\n')

// var cardPlaylist = playlists.criarCardPlaylist('Foco')
// console.log(cardPlaylist,'\n\n')


// const audiosDaPlaylist = playlists.retornarAudiosDaPlaylist('Foco')
// console.log(audiosDaPlaylist,'\n\n');

// console.log(playlists.playlists,'\n\n');
// console.log(playlists.playlists[0],'\n\n');
// console.log(playlists.playlists[0].audios,'\n\n');
// console.log(playlists.playlists[0].audios[1],'\n\n');
// console.log(playlists.playlists[0].audios[1].id,'\n\n');


