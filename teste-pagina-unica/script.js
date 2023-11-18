

var song_data = [["Foco","Desconhecido","Singles","Audio 01","03:27"],["Foco","Desconhecido","Singles","Audio 02","04:50"],["Estudo","Desconhecido","Singles","Audio 03","06:02"],["Ansiedade","Desconhecido","Singles","Audio 04","05:17"]]
var genres = ["Foco","Relaxamento","Estresse","Ansiedade","Estudo"]

var search_query = "";
var begin = true;
audio= new Audio();
var song_queue = song_data;
var first_time = true;

var result_genre = "";
var result_artist = "";
var result_album = "";
var songs = [];
var result_song = [];
var backup_queue = [];

var selected_user = 0;
var user_data = [["Cheesie",[["KPop","WJSN","From WJSN","I Wish","01:00"],["KPop","WJSN","The Secret","Secret","01:00"]]]];



var mainContainer = document.querySelector("#mainContainer");
sb = document.querySelector("#searchBar");
var modalSong = document.querySelector("#popupModalSong");
var modalGenre = document.querySelector("#popupModalGenre");
var btnAddGenre = document.querySelector("#addGenreButton");
var btnAddSong = document.querySelector("#addGenreButton"); 

function getAllSongGenre(genre)
{
    var songs = [];
    var length = 0;
    song_data.forEach(function(elem){
        if(elem[0].toLowerCase() === genre.toLowerCase())
        {
            length=songs.push(elem);
        }
    })
    backup_queue = songs;
    var data = [genre,songs,length];
    return data;
}

function getAllSongAlbum(album)
{
    var songs = [];
    var length = 0;
    song_data.forEach(function(elem){
        if(elem[2].toLowerCase()===album.toLowerCase())
        {
            length = songs.push(elem);
        }
    })
    backup_queue = songs;
    var data = [album,songs,length];
    return data;
}

function getAllSongArtist(artist)
{
    var songs = []
    var albums = []
    song_data.forEach(function(elem){
        if(elem[1].toLowerCase() === artist.toLowerCase())
        {
            songs.push(elem);
            if(albums.indexOf(elem[2]) <0)
            {
                albums.push(elem[2]);
            }
        }
    })
    backup_queue = songs;
    var data=[artist,songs,albums];
    return data;
}

function gotoGenre(name)
{
    mainContainer = document.querySelector("#mainContainer");
    console.log("Genre : "+name);
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-genre");
    init(name);

    
}

function gotoLibrary()
{
    mainContainer = document.querySelector("#mainContainer");
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-library");
    init("empty");
}

function gotoAlbum(name)
{
    mainContainer = document.querySelector("#mainContainer");
    console.log("Album : "+name)
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-album")
    init(name);


}

function gotoSong(param)
{
    btnPlay.src="assets/icons/pause.png";
    mainContainer = document.querySelector("#mainContainer");
    console.log("song : "+param);
    playlist_index = 0;
    song_queue = [];
    song_data.forEach(function(elem){
        if(elem[3].toLowerCase()===param.toLowerCase())
        {
            console.log("masukkk");
            if(song_queue.indexOf(elem) <0)
            {
                song_queue.push(elem);
            }
            
        }
    })
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
}

function gotoArtist(name)
{
    mainContainer = document.querySelector("#mainContainer");
    console.log("Artist : "+name);
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-artist")
    init(name);
}

function gotoSetting()
{
    mainContainer = document.querySelector("#mainContainer");
    document.getElementsByTagName("BODY")[0].style.backgroundImage = "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#000000), to(#212121)";
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-setting");
    init("empty");
}

function backtoHome()
{
    mainContainer = document.querySelector("#mainContainer");
    mainContainer.removeAttribute("class");
    mainContainer.classList.toggle("t-landing");
    init("empty");
}

function initChange()
{
    if(sb.value !== "")
    {
        document.querySelector("#recent").style.display = "none";
        result_genre = "";
        result_artist = "";
        result_album = "";
        songs = [];
        result_song = [];
        console.log(sb.value);
        genres.forEach(function(elem){
            if( elem.toLowerCase().indexOf(sb.value.toLowerCase()) !== -1)
            {
                result_genre = elem;
                
            }
        })
        lcontainer = document.querySelector("#leftContainer");
        scontainer = document.querySelector("#songContainer");
        document.querySelector("#leftContainer").style.display="inline-block";
        document.querySelector("#songContainer").style.display="inline-block";
        document.querySelector("#errormsg").style.display="none";
        //scontainer.innerHTML = "";
        if(result_genre !== "" && sb.value !=="")
        {
            if(recent_search.length ===3)
            {
                recent_search.unshift(["Genre",sb.value.toString()]);
                recent_search.pop();
            }
            else
            {
                recent_search.ushift(["Genre",sb.value.toString()]);
            }

            console.log("Result Genre : "+result_genre);
            songs = getAllSongGenre(result_genre);
            lcontainer.innerHTML = '<img class="album-big" src="assets/genres/genre-'+result_genre+'.jpg" alt="" style="margin-top: 15px;"><div id="albumTitle"><h1>'+result_genre+'</h1></div><div id="albumSongs">'+songs[2]+'</div><button id="playButton" onclick="addQueue(\''+result_genre+'\')">Play</button>';
            scontainer.innerHTML = "";
            songs[1].forEach(function(elem){
                
                scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
            })
            animateSongList();
        }
        else
        {
            song_data.forEach(function(elem){
                if( elem[1].toLowerCase().indexOf(sb.value.toString().toLowerCase()) !== -1)
                {
                    result_artist = elem[1];
                }
            })

            if(result_artist !== "" && sb.value !=="")
            {
                if(recent_search.length ===3)
                {
                    recent_search.unshift(["Artist",sb.value.toString()]);
                    recent_search.pop();
                }
                else
                {
                    recent_search.unshift(["Artist",sb.value.toString()]);
                }
                console.log("Result Artist : "+result_artist);
                songs = getAllSongArtist(result_artist);
                lcontainer.innerHTML = '<img class="album-big" src="assets/banners/banner-'+result_artist+'.jpg" alt="" style="margin-top: 15px; cursor:pointer;" onclick="gotoArtist(\''+result_artist+'\')"><div id="albumTitle" style="cursor:pointer;" onclick="gotoArtist(\''+result_artist+'\')"><h1>'+result_artist+'</h1></div><div id="albumSongs">'+songs[2]+'</div><button id="playButton" onclick="addQueueArtist(\''+result_artist+'\')">Play</button>';
                console.log(songs);
                scontainer.innerHTML = "";
                songs[1].forEach(function(elem){
                    console.log("elems");
                    console.log(elem);
                    scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
                })
                animateSongList();

            }
            else
            {
                song_data.forEach(function(elem){
                    if(  elem[2].toLowerCase().indexOf(sb.value.toLowerCase()) !==-1)
                    {
                        result_album = elem[2];
                    }
                })

                if(result_album !== "" && sb.value !=="")
                {
                    if(recent_search.length ===3)
                    {
                        recent_search.unshift(["Album",sb.value.toString()]);
                        recent_search.pop();
                    }
                    else
                    {
                        recent_search.unshift(["Album",sb.value.toString()]);
                    }
                    console.log("Result Album : "+result_album);
                    songs = getAllSongAlbum(result_album);
                    lcontainer.innerHTML = '<img class="album-big" src="assets/albums/album-'+result_album+'.jpg" alt="" style="margin-top: 15px; cursor:pointer;" onclick="gotoAlbum(\''+result_album+'\')"><div id="albumTitle" style="cursor:pointer;" onclick="gotoAlbum(\''+result_album+'\')"><h1>'+result_album+'</h1></div><div id="albumSongs">'+songs[2]+'</div><button id="playButton" onclick="addQueueAlbum(\''+result_album+'\')">Play</button>';
                    scontainer.innerHTML = "";
                    songs[1].forEach(function(elem){
                        scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
                    })
                    animateSongList();
                }
                else
                {
                    var length = 0;
                    song_data.forEach(function(elem){
                        if(elem[3].toLowerCase().indexOf(sb.value.toLowerCase()) !== -1)
                        {
                            if(result_song.indexOf(elem) <0)
                            {
                                length = result_song.push(elem);
                            }
                            
                        }
                    })
                    if(length > 0 && sb.value !=="")
                    {
                        if(recent_search.length ===3)
                        {
                            recent_search.unshift(["Song",sb.value.toString()]);
                            recent_search.pop();
                        }
                        else
                        {
                            recent_search.unshift(["Song",sb.value.toString()]);
                        }
                        
                        lcontainer.innerHTML = '</div><button id="playButton" onclick="addQueueSong(\''+sb.value.toLowerCase()+'\')">Play</button>';
                        scontainer.innerHTML = "";
                        result_song.forEach(function(elem){
                            scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
                        })
                        animateSongList();
                    }
                    else
                    {
                        if(sb.value !=="")
                        {
                            document.querySelector("#leftContainer").style.display="none";
                            document.querySelector("#songContainer").style.display="none";
                            document.querySelector("#errormsg").style.display="block";
    
                            document.querySelector("#errormsg").innerHTML = "No Result Match Your Query";
                        }
                        
                        
                    }
                    
                }
            }
        }
    }
}

function initInput()
{
    if(sb.value === "" && recent_search !=[])
    {
        document.querySelector("#leftContainer").style.display="none";
        document.querySelector("#songContainer").style.display="none";
        document.querySelector("#errormsg").style.display="none";
        rcnt = document.querySelector("#recent");
        rcnt.style.display = "block";
        rcnt.innerHTML = "<p>RECENT SEARCHES</p>";
        recent_search.forEach(function(elem){  
            rcnt.innerHTML +='<div class="recent-items"><div class="recent-title" onclick="recentSearch(\''+elem[0]+"#"+elem[1]+'\')">'+elem[1]+'</div><div class="recent-type">'+elem[0]+'</div></div>';
        })

    }
}

function addQueueSong(param)
{
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    song_queue = [];
    song_data.forEach(function(elem){
        if(elem[3].toLowerCase().indexOf(param) !== -1)
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
    initSound();
}

function addQueue(param)
{
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var songs =  getAllSongGenre(param);
    song_queue=[]
    songs[1].forEach(function(elem){
        song_queue.push(elem);
    })
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
    //initAudioPlayer();

}

function addQueueAlbum(param)
{
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var songs = getAllSongAlbum(param);
    song_queue=[]
    songs[1].forEach(function(elem){
        song_queue.push(elem);
    })
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
}

function addQueueArtist(param)
{
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var songs = getAllSongArtist(param);
    song_queue=[]
    songs[1].forEach(function(elem){
        song_queue.push(elem);
    })
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
}

function openGenreModal()
{
    modalGenre.style.display = "block";
}
function openSongModal()
{
    modalSong.style.display = "block";
}

function closeModal()
{
    modalGenre.style.display = "none";
    modalSong.style.display = "none";
}

function removeSong(name)
{
    var selectedelem = [];
    var idx = 0;
    var selectedidx = 0;
    song_data.forEach(function(elem){
        if(name.toLowerCase() === elem[3].toLowerCase())
        {
            selectedidx = idx;
            selectedelem = elem;
            

        
        }
        idx++;
    })
    user_data[selected_user][1].splice(user_data[selected_user][1].indexOf(selectedelem),1);
    var con = document.querySelector("#context");
    con.style.display="none";
    if(mainContainer.classList.contains("t-library"))
    {
        init("empty")
    }
}

function addSong(name)
{
    var selectedelem = [];
    var idx = 0;
    var selectedidx = 0;
    song_data.forEach(function(elem){
        if(name.toLowerCase() === elem[3].toLowerCase())
        {
            selectedidx = idx;
            selectedelem = elem;
            

        
        }
        idx++;
    })
    user_data[selected_user][1].push(selectedelem);
    var con = document.querySelector("#context");
    con.style.display="none";
    
}

function submitGenre()
{
    var inputName = document.querySelector("#input-genre-name");
    var inputNameError = document.querySelector("#input-genre-name-error");
    var inputCheck = document.querySelector("#input-genre-check");
    var inputCheckError = document.querySelector("#input-genre-check-error");
    inputCheckError.style.display = "none";
    inputNameError.style.display = "none";
    console.log(inputName.value);

    var flag = false;
    if(inputName.value === "")
    {
        inputNameError.style.display = "block";
        inputNameError.innerHTML = "Genre name must be filled";
        flag = true;
    }
    if(inputCheck.checked === false)
    {
        inputCheckError.style.display = "block";
        inputCheckError.innerHTML = "Please check the checkbox above to cotinue";
        flag = true;
    }

    if(flag===false)
    {   
        genres.push(inputName.value);
        modalGenre.style.display = "none";
        modalSong.style.display = "none";
        inputCheck.checked = false;
        inputName.value = "";
        init("empty");
    }

}

function getUserSong()
{
    var songs = [];
    var length = 0;
    user_data[selected_user][1].forEach(function(elem){
        length = songs.push(elem);
    });
    return [songs,length];
}

function playUserSong()
{
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var songs = getUserSong();
    song_queue=[]
    songs[0].forEach(function(elem){
        song_queue.push(elem);
    })
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio();
    initSound();
    
}

function animateGenreList()
{
    var animate = document.getElementsByClassName("card");
    var anim = 1;
    Array.prototype.forEach.call(animate,function(elem){
    elem.style.webkitAnimation = "floatup "+anim+"s ease-in";
    anim += 0.1;
    
    })
}

function animateSongList()
{
    var animate = document.getElementsByClassName("songCard");
    var anim = 0;
    Array.prototype.forEach.call(animate,function(elem){
    elem.style.webkitAnimation = "floatleft "+anim+"s ease-in";
    anim += 0.5;
    
    })
}

function init(param)
{
    btnPlay = document.querySelector("#control-play");
    seekSlider= document.querySelector("#progressBar");
    currentTime = document.querySelector("#current");
    durationTime = document.querySelector("#remaining");
    currentTitle = document.querySelector("#now-title");
    currentArtist = document.querySelector("#now-artist");
    currentThumb = document.querySelector("#now-thumb");
    prevSong = document.querySelector("#control-previous");
    nextSong = document.querySelector("#control-next");
    progressSong = document.querySelector("#progress-song");
    seekInput = document.querySelector("#input-seeker");

    mainContainer = document.querySelector("#mainContainer");
    document.querySelector("#searchBar");
    modalSong = document.querySelector("#popupModalSong");
    modalGenre = document.querySelector("#popupModalGenre");
    btnAddGenre = document.querySelector("#addGenreButton");
    btnAddSong = document.querySelector("#addGenreButton"); 

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
        
        if(mainContainer.classList.contains("t-landing"))
        {
            
            
            mainContainer.innerHTML = '<div id="titulo-pagina"><h1>Playlists</h1></div><div id="cardContainer"></div>';
            btnAddGenre = document.querySelector("#addGenreButton");
            document.querySelector("#titulo-pagina").innerHTML ="Início";
            var cardContainer = document.querySelector("#cardContainer");
            genres.forEach(function(elem){
                cardContainer.innerHTML +="<div class='card' onclick='gotoGenre(\""+elem+"\")'><div class='thumbnail'><img src='assets/playlists/genero-"+elem+".jpg' alt='' class='img-thumb'></div><div class='description'><p>"+elem+"</p></div></div>";
            })
            animateGenreList();

            
        }
        else if(mainContainer.classList.contains("t-genre"))
        {
            var songs =  getAllSongGenre(param);
            mainContainer.innerHTML='<div id="albumContainer"><img class="album-big" src="assets/genres/genre-'+songs[0]+'.jpg" alt=""><div id="albumTitle"><h1>'+songs[0]+'</h1></div><div id="albumSongs">'+songs[2]+' Songs'+'</div><button id="playButton" onclick="addQueue(\''+param+'\')">Play</button></div><div id="songContainer" style="margin-top: 0px;"></div></div>';
            btnAddSong = document.querySelector("#addSongButton");;
            var songContainer = document.querySelector("#songContainer");
            songs[1].forEach(function(elem){
                songContainer.innerHTML +='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\' );return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';
            })
            animateSongList();
            


        }
        else if(mainContainer.classList.contains("t-album"))
        {
            var songs = getAllSongAlbum(param);
            mainContainer.innerHTML='<div id="leftContainer"  style="text-align:center;" ><img class="album-big" src="assets/albums/album-'+songs[0]+'.jpg" alt="" style="margin-top: 35px;"><div id="albumTitle"><h1>'+songs[0]+'</h1></div><div id="albumSongs">'+songs[2]+' Songs'+'</div><button id="playButton" onclick="addQueueAlbum(\''+param+'\')">Play</button></div><div id="songContainer" style="margin-top: 35px; min-width: 50%;"></div>';
            var songContainer = document.querySelector("#songContainer");
            songs[1].forEach(function(elem){
                songContainer.innerHTML +='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';
            })
            animateSongList();
        }
        else if(mainContainer.classList.contains("t-artist"))
        {
            var songs = getAllSongArtist(param);
            mainContainer.innerHTML='<div id="banner"><div class="layer"><div id="artist-title">'+songs[0]+'</div><div class="options"><button id="playButton" style="width: 500px; display: inline-block; margin-right: 1em;" onclick="addQueueArtist(\''+param+'\')">Play</button></div></div></div><div id="content"><h3>Songs</h3><div id="songContainer" style="margin-top: 0px;"></div><div id="albumContainer"><h3>Albums</h3><div id="cardContainer"></div></div></div>';
            var banner = document.querySelector("#banner");
            var songList = document.querySelector("#songContainer");
            var albumList = document.querySelector("#cardContainer");
            console.log('url("assets/banners/banner-'+songs[0]+'.jpg")');
            banner.style.backgroundImage = 'url("assets/banners/banner-'+songs[0]+'.jpg")';
            songs[1].forEach(function(elem){
                songList.innerHTML += '<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="gotoSong(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\'">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';
            })
            songs[2].forEach(function(elem){
                albumList.innerHTML +='<div class="card" onclick="gotoAlbum(\''+elem+'\')"><div class="thumbnail"><img src="assets/Albums/album-'+elem+'.jpg" alt="" class="img-thumb"></div><div class="description"><p>'+elem+'</p></div></div>';
            })
            animateSongList();
            animateGenreList();
    
        }
        else if(mainContainer.classList.contains("t-library"))
        {
            var songs = getUserSong();
            mainContainer.innerHTML ='<div id="albumContainer"><div><h1 id="titulo-pagina">Escreva seu feedback</h1></div><div id="albumSongs"><span id="container-feedback">30 songs</span></div></div><div id="songContainer" style="margin-top: 0px;"></div>';
            //document.querySelector("#titulo-pagina").innerHTML = user_data[selected_user][0];
            document.querySelector("#titulo-pagina").innerHTML ="Feedback";
            
            document.querySelector("#container-feedback").innerHTML ='<section class="conteudo"> <div class="container-logo"> </div> <div class="container-titulo-subtitlo"> <h5>Nos ajude a melhorar!<br> Deixe seu comentário ou proposta de melhoria para que possamos atender suas necessidades cada vez melhor.</h5> </div> <div class="container-form"> <form class="form" id="form" action="https://formspree.io/f/mleyzvob" method="POST"> <!--verificar se é seguro manter endpoint no código--> <div class="container-nome"> <label for="tnome">Nome (Obrigatório)</label> <input type="text" id="tnome" name="nome" placeholder="Nome..." maxlength="255" required> <span class="icone-validacao"></span> </div> <div class="container-email"> <label for="temail">E-mail (Opcional)</label> <input type="email" id="temail" name="email" placeholder="email@exemplo.com.br" autocomplete="email" maxlength="255"> <span class="icone-validacao"></span> </div> <div class="container-msg"> <label for="tmsg">Mensagem (Obrigatório)</label> <textarea id="tmsg" name="msg" placeholder="Escreva seu comentário..." maxlength="255" required ></textarea> <span class="icone-validacao"></span> </div> <div class="container-btn-enviar"> <input type="submit" value="Enviar" id="btn-enviar"> </div> </form> </section>'
        }
    }
    
}

btnPlay = document.querySelector("#control-play");
seekSlider= document.querySelector("#progressBar");
currentTime = document.querySelector("#current");
durationTime = document.querySelector("#remaining");
currentTitle = document.querySelector("#now-title");
currentArtist = document.querySelector("#now-artist");
currentThumb = document.querySelector("#now-thumb");
prevSong = document.querySelector("#control-previous");
nextSong = document.querySelector("#control-next");
progressSong = document.querySelector("#progress-song");
seekInput = document.querySelector("#input-seeker");


function getOffset(elem) { 
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return Math.round(left);
}

function timeUpdate()
{
    var tm = audio.currentTime * (100/audio.duration);
    var tmperc = tm+"%";
    progressSong.style.width = ""+tmperc+"";
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
function switchSong()
{
    playlist_index++;
    audio.src = "assets/songs/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
    currentTitle.innerHTML = song_queue[playlist_index][3];
    currentArtist.innerHTML = song_queue[playlist_index][1];
    currentThumb.src = "assets/albums/album-"+song_queue[playlist_index][2]+".jpg";
    if(song_queue.length !=1)
    {
        audio.play();
    }
    
}


function initSound(_callback)
{
    ext = ".mp3";
    agent = navigator.userAgent.toLowerCase();
    audio.src = "assets/songs/"+song_queue[0][1]+"-"+song_queue[0][2]+"-"+song_queue[0][3]+ext;
    audio.loop = false;
    audio.volume = 1;
    audio.play();
    currentTitle.innerHTML = song_queue[0][3];
    currentArtist.innerHTML = song_queue[0][1];
    currentThumb.src = "assets/albums/album-"+song_queue[0][2]+".jpg";
    audio.addEventListener("timeupdate",timeUpdate);
    audio.addEventListener("ended",switchSong);

    _callback && _callback();
}

function initAudioPlayer()
{
    btnPlay = document.querySelector("#control-play");
    seekSlider= document.querySelector("#progressBar");
    currentTime = document.querySelector("#current");
    durationTime = document.querySelector("#remaining");
    currentTitle = document.querySelector("#now-title");
    currentArtist = document.querySelector("#now-artist");
    currentThumb = document.querySelector("#now-thumb");
    prevSong = document.querySelector("#control-previous");
    nextSong = document.querySelector("#control-next");
    progressSong = document.querySelector("#progress-song");
    seekInput = document.querySelector("#input-seeker");
    console.log(btnPlay);

    playlist_index = 0;
    //fn = filename.split("-");
    seeking = false,vseek = false;
    ext = ".mp3";

    
    agent = navigator.userAgent.toLowerCase();
    if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
        ext = ".ogg";
    }
    
    
    if(!first_time)
    {
        audio.src = "assets/songs/"+song_queue[0][1]+"-"+song_queue[0][2]+"-"+song_queue[0][3]+ext;
    audio.loop = false;
    audio.volume = 1;

        audio.play();
        currentTitle.innerHTML = song_queue[0][3];
        currentArtist.innerHTML = song_queue[0][1];
        currentThumb.src = "assets/albums/album-"+song_queue[0][2]+".jpg";
        
    }
    else
    {
        console.log("waw")
        first_time=true;
        song_queue = [];
    }
    
    if(begin)
    {
    
        btnPlay.addEventListener("click",playPause);
        seekInput.addEventListener("mousedown",function(event){
            seeking = true;
            seek(event);
        })
        seekInput.addEventListener("mouseup",function(){seeking = false})
        seekInput.addEventListener("mousemove",function(event){seek(event)});
        audio.addEventListener("timeupdate",timeUpdate);
        audio.addEventListener("ended",switchSong);
        prevSong.addEventListener("click",pSong);
        nextSong.addEventListener("click",nSong);

        function playPause()
        {
            console.log("init playpause")
            if(audio.paused)
            {
                if(song_queue !== [])
                {
                    audio.play();
                    btnPlay.src="assets/icons/pause.png";
                }
                
            }
            else
            {
                if(song_queue !== [])
                {
                    audio.pause();
                    btnPlay.src="assets/icons/play.png"
                }
                
            }
        }

                
        function seek(event)
        {
            if(seeking)
            {

                seekInput.value =  (event.clientX -getOffset(seekInput)) / (seekInput.offsetWidth) * 100;
                console.log("client x : "+event.clientX);
                console.log("offsetleft : "+getOffset(seekInput));
                console.log((event.clientX - getOffset(seekInput)) );
                console.log((seekInput.offsetWidth));
                console.log( (event.clientX - getOffset(seekInput)) / (seekInput.offsetWidth-getOffset(seekInput)));
                seekto =audio.duration * (seekInput.value / 100);
                audio.currentTime = seekto;

            }
        }

        function pSong()
        {
            initSound(function(){
                if(!onrepeat){playlist_index--;}
                if(playlist_index == (song_queue.length-1) || playlist_index < 0){
                    console.log("masuk");
                    playlist_index = 0;	
                }
                
                audio.src = "assets/songs/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
                currentTitle.innerHTML = song_queue[playlist_index][3];
                currentArtist.innerHTML = song_queue[playlist_index][1];
                currentThumb.src = "assets/albums/album-"+song_queue[playlist_index][2]+".jpg";
                audio.play();

            })
        }
        function nSong()
        {
            initSound(function(){
                if(!onrepeat){playlist_index++;}
                if(playlist_index == song_queue.length || playlist_index < 0){
                    console.log("masuk");
                    playlist_index = 0;
                }
                
                audio.src = "assets/songs/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
                currentTitle.innerHTML = song_queue[playlist_index][3];
                currentArtist.innerHTML = song_queue[playlist_index][1];
                currentThumb.src = "assets/albums/album-"+song_queue[playlist_index][2]+".jpg";
                audio.play();
            })
            
        }


        
    }

}