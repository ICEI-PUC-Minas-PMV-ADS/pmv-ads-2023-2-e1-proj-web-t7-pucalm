var dadosMusicas = [["Foco","Desconhecido","Singles","Audio 01","03:27"],["Foco","Desconhecido","Singles","Audio 02","04:50"],["Estudo","Desconhecido","Singles","Audio 03","06:02"],["Ansiedade","Desconhecido","Singles","Audio 04","05:17"]]
var playlists = ["Foco","Relaxamento","Estresse","Ansiedade","Estudo"]


var containerPrincipal = document.querySelector("#container-principal");
var modalSong = document.querySelector("#popupModalSong");
var modalGenre = document.querySelector("#popupModalGenre");
var btnAddPlaylist = document.querySelector("#addPlaylistButton");
var btnAddSong = document.querySelector("#addPlaylistButton"); 

function getAllSongGenre(genero)
{
    var musicas = [];
    var length = 0;
    dadosMusicas.forEach(function(elem){
        if(elem[0].toLowerCase() === genero.toLowerCase())
        {
            length=musicas.push(elem);
        }
    })
    backup_queue = musicas;
    var data = [genero,musicas,length];
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
    document.querySelector("#searchBar");
    modalSong = document.querySelector("#popupModalSong");
    modalGenre = document.querySelector("#popupModalGenre");
    btnAddPlaylist = document.querySelector("#addPlaylistButton");
    btnAddSong = document.querySelector("#addPlaylistButton"); 

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
            var musicas =  getAllSongGenre(param);
            containerPrincipal.innerHTML='<div id="container-central"><div class="secao-flex espacamento-section"><div class="tamanho-20 imagem-playlist"><img class="capa-album" src="assets/playlists/genero-'+musicas[0]+'.jpg" alt=""></div><div class="tamanho-60 informacoes-playlist"><div id="albumTitle"><h1>'+musicas[0]+'</h1></div><div id="albumSongs">'+musicas[2]+' Músicas'+'</div><img id="tocar-playlist-toda" src="assets/imgs/play_musicbar.png" alt="Play" onclick="addQueue(\''+param+'\')"></div><div class="secao-grid tamanho-20 secao-filtro"><div class="alinhar-direita"><select name="ordenar_por" class="personalizacao-select"><option value="1">Ordenar por</option><option value="2">Nome</option><option value="3">Data</option><option value="4">Favorito</option><option value="5">Mais tocadas</option></select></div><div class="secao-flex centralizar alinhar-direita" style="padding-top:70%"><i class="bi bi-share"></i><p style="font-weight:600">Compartilhar</p></div></div></div></div><div id="containerMusica"></div>';
            btnAddSong = document.querySelector("#addSongButton");;
            var containerMusica = document.querySelector("#containerMusica");
            musicas[1].forEach(function(elem){
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