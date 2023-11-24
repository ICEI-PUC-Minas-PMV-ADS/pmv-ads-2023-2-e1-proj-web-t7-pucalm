// Importar os dados dos áudios
import dadosAudios from "./dadosAudios.js";

class Audios {
  constructor() {
    // Array para armazenar os objetos de áudio
    this.listaDeAudios = [];

    // Inicializar os dados dos áudios
    this.carregarListaAudios();
  }

  // Método para inicializar os dados dos áudios (faz uma cópia do array original)
  carregarListaAudios() {
    // Preencher a lista de áudios com objetos importados
    this.listaDeAudios = dadosAudios.map((audio) => ({
      id: audio.id,
      genero: audio.genero,
      artista: audio.artista,
      titulo: audio.titulo,
      duracao: audio.duracao,
    }));
  }

  // Método para retornar os áudios com base no gênero fornecido
  retornarAudiosPorGenero(genero) {
    return this.listaDeAudios.filter(
      (audio) => audio.genero.toLowerCase() === genero.toLowerCase()
    );
  }

  // Método para retornar array com os gêneros disponíveis
  retornarGeneros() {
    // Mapear os gêneros únicos a partir da lista de áudios
    const generosUnicos = [...new Set(this.listaDeAudios.map((audio) => audio.genero))];
    return generosUnicos;
  }
}

export default Audios;

// Exemplo de uso da classe Audios
// var audios = new Audios();
// var audiosFoco = audios.retornarAudiosPorGenero("foco");
// console.log(audiosFoco, '\n\n');

// var generos = audios.retornarGeneros()
// console.log(generos, '\n\n');

