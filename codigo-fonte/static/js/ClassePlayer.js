import Playlists from "./ClassePlaylists.js";
import CrudHistorico from "./classeCrudHistorico.js";


class Player {
  constructor() {
    this.audio = new Audio();
    this.btnPlay = document.querySelector("#controle-play");
    this.seekSlider = document.querySelector("#progresso-barra");
    this.currentTime = document.querySelector("#current");
    this.durationTime = document.querySelector("#remaining");
    this.currentTitle = document.querySelector("#titulo-atual");
    this.currentArtist = document.querySelector("#artista-atual");
    this.currentThumb = document.querySelector("#capa-atual");
    this.prevSong = document.querySelector("#controle-voltar");
    this.nextSong = document.querySelector("#controle-avancar");
    this.progressoMusica = document.querySelector("#progresso-musica");
    this.seekInput = document.querySelector("#input-seeker");

    this.song_queue = [];
    this.playlist_index = 0;

    this.btnPlay.addEventListener("click", () => this.togglePlayPause());
    this.audio.addEventListener("timeupdate", () => this.atualizarTempo());
    this.audio.addEventListener("ended", () => this.mudarMusica());

    // Instância da classe Playlists e CrudHistorico
    this.playlists = new Playlists();
    this.crud = new CrudHistorico();

  }

  togglePlayPause() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    this.audio.play().catch((error) => {
      console.error("Erro ao iniciar a reprodução:", error);
    });
    this.btnPlay.src = "assets/icons/pause.png";
  }

  pause() {
    this.audio.pause();
    this.btnPlay.src = "assets/icons/play.png";
  }

  atualizarTempo() {
    var tm = this.audio.currentTime * (100 / this.audio.duration);
    var tmperc = tm + "%";
    this.progressoMusica.style.width = "" + tmperc + "";
    var curmins = Math.floor(this.audio.currentTime / 60);
    var cursecs = Math.floor(this.audio.currentTime - curmins * 60);
    var dursecs = 0;
    if (!Number.isNaN(this.audio.duration)) {
      var durmins = Math.floor(this.audio.duration / 60);
      var dursecs = Math.floor(this.audio.duration - durmins * 60);
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
    this.currentTime.innerHTML = curmins + ":" + cursecs;
    this.durationTime.innerHTML = durmins + ":" + dursecs;
  }

  mudarMusica() {
    this.playlist_index++;
    if (this.playlist_index < this.song_queue.length) {
      this.carregarMusica(this.playlist_index);
    } else {
      this.audio.pause();
      this.btnPlay.src = "assets/icons/pause.png";
    }
  }

  carregarFilaDeMusicas(playlistNome) {
    this.song_queue = this.playlists.retornarAudiosDaPlaylist(playlistNome);
    this.playlist_index = 0
    this.carregarMusica(this.playlist_index);
  }

  carregarMusica(index) {
    if (index < this.song_queue.length) {
      const audio = this.song_queue[index];
      this.audio.src = `assets/audios/${audio.genero}/${audio.titulo}.mp3`;
      
      this.atualizarInformacoesAudio(audio)
     
      this.play()
    
    }
  }

  reproduzirAudio(audio) {
    this.playlist_index = 0;
    this.song_queue = this.playlists.retornarAudiosDaPlaylist(audio.genero);

    // Encontrar o índice da música na fila de reprodução
    const index = this.song_queue.findIndex((a) => a.titulo === audio.titulo);

    if (index !== -1) {
      this.playlist_index = index;
      this.carregarMusica(this.playlist_index);
    }

    // INCLUIR FUNÇÃO PARA GUARDAR NO LOCAL STORAGE OS DADOS DO AUDIOS //
    
    audio.dataAdicao = 'data'
    this.crud.createHistorico(audio)
    console.log(`reproduzirAudio: ${audio.titulo}`)
    const dadosGrafico = this.crud.readHistoricos()
    console.log(dadosGrafico)

  }

  // Método para atualizar as informações do player com base no áudio atual
  atualizarInformacoesAudio(audio) {
    this.currentTitle.innerHTML = audio.titulo;
    this.currentArtist.innerHTML = audio.artista;
    this.currentThumb.src = `assets/playlists/genero-${audio.genero}.jpg`;
  }

  tocarTodaPlaylist(playlistNome) {
    this.carregarFilaDeMusicas(playlistNome);
    this.play();
  }

  
}

export default Player;
