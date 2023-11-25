class Player {
  constructor() {
    this.audio = new Audio();
    // Adicionar os elementos do player como propriedades da classe
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

    // Inicializar variáveis da fila de músicas
    this.song_queue = [];
    this.playlist_index = 0;

    // Configuração de event listeners
    this.btnPlay.addEventListener("click", () => this.togglePlayPause());
    this.audio.addEventListener("timeupdate", () => this.atualizarTempo());
    this.audio.addEventListener("ended", () => this.mudarMusica());
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

  // Método para atualizar o tempo de reprodução na interface do usuário
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

  
  // Método para mudar para a próxima música na fila de reprodução
  mudarMusica() {
    this.playlist_index++;
    if (this.playlist_index < this.song_queue.length) {
      this.audio.src =
        "assets/audios/" +
        this.song_queue[this.playlist_index][1] +
        "-" +
        this.song_queue[this.playlist_index][2] +
        "-" +
        this.song_queue[this.playlist_index][3] +
        ext;
      this.currentTitle.innerHTML = this.song_queue[this.playlist_index][3];
      this.currentArtist.innerHTML = this.song_queue[this.playlist_index][1];
      this.currentThumb.src =
        "assets/albums/album-" +
        this.song_queue[this.playlist_index][2] +
        ".jpg";
      this.audio.play();
    } else {
      this.audio.pause();
      this.btnPlay.src = "assets/icons/pause.png";
    }
  }

   // Método para reproduzir uma música pelo nome
  reproduzirAudio(nome_audio) {
    console.log("audio : " + nome_audio);
    this.playlist_index = 0;
    this.song_queue = [];
    dadosAudios.forEach((audio) => {
      if (audio[3].toLowerCase() === nome_audio.toLowerCase()) {
        if (this.song_queue.indexOf(audio) < 0) {
          this.song_queue.push(audio);
        }
      }
    });

    ext = ".mp3";
    this.audio.src =
      "assets/audios/" +
      this.song_queue[0][1] +
      "-" +
      this.song_queue[0][2] +
      "-" +
      this.song_queue[0][3] +
      ext;
    console.log("audio.src : " + this.audio.src);
    this.audio.loop = false;
    this.audio.volume = 1;
    this.currentTitle.innerHTML = this.song_queue[0][3];
    this.currentArtist.innerHTML = this.song_queue[0][1];
    this.currentThumb.src =
      "assets/albums/album-" + this.song_queue[0][2] + ".jpg";

    this.audio.play();
  };

  // Iniciar audio clicando no botão Play da playlist
tocarTodaPlaylist(genero) {
  console.log(`tocarPlaylist: ${genero}`)
  //   playlist_index = 0;
    // let audios = retornarAudiosDaPlaylist(genero);
    // song_queue = [];
    // audios[1].forEach(function (elem) {
    //   song_queue.push(elem);
    // });
    // audio.pause();
    // audio.currentTime = 0;
    // audio = new Audio();
  
    // if(song_queue.length > 0){
    //   reproduzirAudio(song_queue[0][3]);
    // }
  }
}


export default Player;
