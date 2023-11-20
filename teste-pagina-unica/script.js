var dadosMusicas = [["foco","Desconhecido","Verde","Audio 01","03:27"],["foco","Desconhecido","Azul","Audio 02","04:50"],["Estudo","Desconhecido","Verde","Audio 03","06:02"],["Ansiedade","Desconhecido","Azul","Audio 04","05:17"]]
var playlists = ["Foco","Relaxamento","Estresse","Ansiedade","Estudo"]

audio= new Audio();


var containerPrincipal = document.querySelector("#container-principal");

function getMusicasDaPlaylist(genero)
{
    var audios = [];
    var length = 0;
    dadosMusicas.forEach(function(elem){
        if(elem[0].toLowerCase() === genero.toLowerCase())
        {
            length=audios.push(elem);
        }
    })
    backup_queue = audios;
    var data = [genero,audios,length];
    return data;
}


function iniciarCodigo()
{
    containerPrincipal.innerHTML = '<div id="titulo-pagina"><h1>Playlists</h1></div><div id="container-playlists"></div>';
    btnAddPlaylist = document.querySelector("#addPlaylistButton");
    document.querySelector("#titulo-pagina").innerHTML ="Início";
    var containerPlaylists = document.querySelector("#container-playlists");
    playlists.forEach(function(elem){
    containerPlaylists.innerHTML +="<div class='card' onclick='acessarPlaylist(\""+elem+"\")'><div class='thumbnail'><img src='assets/playlists/genero-"+elem+".jpg' alt='' class='img-thumb'></div><div class='description'><p>"+elem+"</p></div></div>";
    })
}
init(iniciarCodigo)

function acessarInicio()
{
    containerPrincipal = document.querySelector("#container-principal");
    containerPrincipal.removeAttribute("class");
    containerPrincipal.classList.toggle("t-inicio");
    init("empty");
}

function acessarFeedback()
{
    containerPrincipal = document.querySelector("#container-principal");
    containerPrincipal.removeAttribute("class");
    containerPrincipal.classList.toggle("t-feedback");
    init("empty");
}

function acessarPlaylist(name)
{
    containerPrincipal = document.querySelector("#container-principal");
    console.log("Genre : "+name);
    containerPrincipal.removeAttribute("class");
    containerPrincipal.classList.toggle("t-playlist");
    init(name);
}

function init(param)
{
    btnPlay = document.querySelector("#controle-play");
    seekSlider= document.querySelector("#progresso-barra");
    currentTime = document.querySelector("#current");
    durationTime = document.querySelector("#remaining");
    currentTitle = document.querySelector("#titulo-atual");
    currentArtist = document.querySelector("#artista-atual");
    currentThumb = document.querySelector("#capa-atual");
    prevSong = document.querySelector("#controle-voltar");
    nextSong = document.querySelector("#controle-avancar");
    progressoMusica = document.querySelector("#progresso-musica");
    seekInput = document.querySelector("#input-seeker");

    containerPrincipal = document.querySelector("#container-principal");

    if(!document.getElementsByTagName("BODY")[0].classList.contains("body-index"))
    {
        window.onclick = function(event){
            if(event.target == modalGenre || event.target == modalSong)
            {
                modalGenre.style.display = "none";
                modalSong.style.display = "none";
            }
            if(event.target !=  document.querySelector("#context") )
            {
                if(document.querySelector("#context"))
                {
                    document.querySelector("#context").style.display = "none";
                }
                
            }
        }
        
        if(containerPrincipal.classList.contains("t-inicio"))
        {            
            containerPrincipal.innerHTML = '<div id="titulo-pagina"><h1>Playlists</h1></div><div id="container-playlists"></div>';
            btnAddPlaylist = document.querySelector("#addPlaylistButton");
            document.querySelector("#titulo-pagina").innerHTML ="Início";
            var containerPlaylists = document.querySelector("#container-playlists");
            playlists.forEach(function(elem){
                containerPlaylists.innerHTML +="<div class='card' onclick='acessarPlaylist(\""+elem+"\")'><div class='thumbnail'><img src='assets/playlists/genero-"+elem+".jpg' alt='' class='img-thumb'></div><div class='description'><p>"+elem+"</p></div></div>";
            })
        }

        else if(containerPrincipal.classList.contains("t-playlist"))
        {
            var audios =  getMusicasDaPlaylist(param);
            containerPrincipal.innerHTML='<div id="container-central"><div class="secao-flex espacamento-section"><div class="tamanho-20 imagem-playlist"><img class="capa-album" src="assets/playlists/genero-'+audios[0]+'.jpg" alt=""></div><div class="tamanho-60 informacoes-playlist"><div id="albumTitle"><h1>'+audios[0]+'</h1></div><div id="albumSongs">'+audios[2]+' Músicas'+'</div><img id="tocar-playlist-toda" src="assets/imgs/play_musicbar.png" alt="Play" onclick="addQueue(\''+param+'\')"></div><div class="secao-grid tamanho-20 secao-filtro"><div class="alinhar-direita"><select name="ordenar_por" class="personalizacao-select"><option value="1">Ordenar por</option><option value="2">Nome</option><option value="3">Data</option><option value="4">Favorito</option><option value="5">Mais tocadas</option></select></div><div class="secao-flex centralizar alinhar-direita" style="padding-top:70%"><i class="bi bi-share"></i><p style="font-weight:600">Compartilhar</p></div></div></div></div><div id="containerMusica"></div>';
            btnAddSong = document.querySelector("#addSongButton");;
            var containerMusica = document.querySelector("#containerMusica");
            audios[1].forEach(function(elem){
                containerMusica.innerHTML +='<div class="songCard" oncontextmenu="showContext(\''+elem[3]+'\' );return false;"><div class="songLeft"><img class="icon-sm" src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="acessarMusica(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist">'+elem[1]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';
            })
        }

        else if(containerPrincipal.classList.contains("t-feedback"))
        {
            containerPrincipal.innerHTML ='<div id="container-central"><div><h1 id="titulo-pagina">Escreva seu feedback</h1></div><div><span id="container-feedback"></span></div></div>';
            document.querySelector("#titulo-pagina").innerHTML ="Feedback";
            document.querySelector("#container-feedback").innerHTML ='<div><div class="container-logo"></div><div class="container-titulo-subtitlo"><h5>Nos ajude a melhorar! Deixe seu comentário ou proposta de melhoria para que possamos atender suas necessidades cada vez melhor.</h5></div><div class="container-form"><form class="form" id="form" action="https://formspree.io/f/mleyzvob" method="POST"><div class="container-nome"><label for="tnome">Nome (Obrigatório)</label><input type="text" id="tnome" name="nome" placeholder="Nome..." maxlength="255" required><span class="icone-validacao"></span></div><div class="container-email"><label for="temail">E-mail (Opcional)</label><input type="email" id="temail" name="email" placeholder="email@exemplo.com.br" autocomplete="email" maxlength="255"><span class="icone-validacao"></span></div><div class="container-msg"><label for="tmsg">Mensagem (Obrigatório)</label><textarea id="tmsg" name="msg" placeholder="Escreva seu comentário..." maxlength="255" required></textarea><span class="icone-validacao"></span></div><div class="container-btn-enviar"><input type="submit" value="Enviar" id="btn-enviar"></div></form></div>'
        }
    }
    
}


/* INICIAR MUSICA CLICANDO NO TÍTULO DELA */

function acessarMusica(param)
{
    btnPlay.src="assets/icons/pause.png";
    containerPrincipal = document.querySelector("#container-principal");
    console.log("song : "+param);
    playlist_index = 0;
    song_queue = [];
    dadosMusicas.forEach(function(elem){
        if(elem[3].toLowerCase()===param.toLowerCase())
        {
            if(song_queue.indexOf(elem) <0)
            {
                song_queue.push(elem);
            }
            
        }
    })
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    iniciarMusica();
}

function iniciarMusica(_callback)
{
    ext = ".mp3";
    agent = navigator.userAgent.toLowerCase();
    audio.src = "assets/audios/"+song_queue[0][1]+"-"+song_queue[0][2]+"-"+song_queue[0][3]+ext;
    audio.loop = false;
    audio.volume = 1;
    audio.play();
    currentTitle.innerHTML = song_queue[0][3];
    currentArtist.innerHTML = song_queue[0][1];
    currentThumb.src = "assets/albums/album-"+song_queue[0][2]+".jpg";
    audio.addEventListener("atualizartempo",atualizarTempo);
    audio.addEventListener("ended",mudarMusica);

    _callback && _callback();
}

function atualizarTempo()
{
    var tm = audio.currentTime * (100/audio.duration);
    var tmperc = tm+"%";
    progressoMusica.style.width = ""+tmperc+"";
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var dursecs = 0;
    if(!Number.isNaN(audio.duration))
    {
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
    }
    else
    {
        durmins = 0;
    }
    if(cursecs < 10){ cursecs = "0"+cursecs; }
    if(dursecs < 10){ dursecs = "0"+dursecs; }
    if(curmins < 10){ curmins = "0"+curmins; }
    if(durmins < 10){ durmins = "0"+durmins; }
    currentTime.innerHTML = curmins+":"+cursecs;
    durationTime.innerHTML = durmins+":"+dursecs;

}

function mudarMusica()
{
    playlist_index++;
    audio.src = "assets/audios/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
    currentTitle.innerHTML = song_queue[playlist_index][3];
    currentArtist.innerHTML = song_queue[playlist_index][1];
    currentThumb.src = "assets/albums/album-"+song_queue[playlist_index][2]+".jpg";
    if(song_queue.length !=1)
    {
        audio.play();
    }
    
}


/* INICIAR MUSICA CLICANDO NO BOTÃO DE PLAY DA PLAYLIST */

function addQueue(param)
{
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var audios =  getMusicasDaPlaylist(param);
    song_queue=[]
    audios[1].forEach(function(elem){
        song_queue.push(elem);
    })
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    iniciarMusica();
    //initAudioPlayer();
}