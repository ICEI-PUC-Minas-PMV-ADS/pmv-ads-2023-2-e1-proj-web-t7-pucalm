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

  // Outros métodos relacionados aos áudios podem ser adicionados conforme necessário
}

export default Audios;

// Exemplo de uso da classe Audios
var audios = new Audios();
var audiosFoco = audios.retornarAudiosPorGenero("foco");
console.log(audiosFoco, '\n', '---------');
console.log(audios.listaDeAudios, '\n', '---------')

