
var search_query = "";
var begin = true;
audio= new Audio();
var song_queue = dadosMusicas;
var first_time = true;

var result_genero = "";
var result_artist = "";
var result_album = "";
var musicas = [];
var result_song = [];
var backup_queue = [];

var selected_user = 0;
var user_data = [["Cheesie",[["KPop","WJSN","From WJSN","I Wish","01:00"],["KPop","WJSN","The Secret","Secret","01:00"]]]];


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

function initChange()
{
    if(sb.value !== "")
    {
        document.querySelector("#recent").style.display = "none";
        result_genero = "";
        result_artist = "";
        result_album = "";
        musicas = [];
        result_song = [];
        console.log(sb.value);
        playlists.forEach(function(elem){
            if( elem.toLowerCase().indexOf(sb.value.toLowerCase()) !== -1)
            {
                result_genero = elem;
                
            }
        })
        lcontainer = document.querySelector("#leftContainer");
        scontainer = document.querySelector("#containerMusica");
        document.querySelector("#leftContainer").style.display="inline-block";
        document.querySelector("#containerMusica").style.display="inline-block";
        document.querySelector("#errormsg").style.display="none";
        //scontainer.innerHTML = "";
        if(result_genero !== "" && sb.value !=="")
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

            console.log("Result Genre : "+result_genero);
            musicas = getAllSongGenre(result_genero);
            lcontainer.innerHTML = '<img class="capa-album" src="assets/playlists/genero-'+result_genero+'.jpg" alt="" style="margin-top: 15px;"><div id="albumTitle"><h1>'+result_genero+'</h1></div><div id="albumSongs">'+musicas[2]+'</div><button id="tocar-playlist-toda" onclick="addQueue(\''+result_genero+'\')">Play</button>';
            scontainer.innerHTML = "";
            musicas[1].forEach(function(elem){
                
                scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="acessarMusica(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
            })
            animateSongList();
        }
        else
        {
            dadosMusicas.forEach(function(elem){
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
                musicas = getAllSongArtist(result_artist);
                lcontainer.innerHTML = '<img class="capa-album" src="assets/banners/banner-'+result_artist+'.jpg" alt="" style="margin-top: 15px; cursor:pointer;" onclick="gotoArtist(\''+result_artist+'\')"><div id="albumTitle" style="cursor:pointer;" onclick="gotoArtist(\''+result_artist+'\')"><h1>'+result_artist+'</h1></div><div id="albumSongs">'+musicas[2]+'</div><button id="tocar-playlist-toda" onclick="addQueueArtist(\''+result_artist+'\')">Play</button>';
                console.log(musicas);
                scontainer.innerHTML = "";
                musicas[1].forEach(function(elem){
                    console.log("elems");
                    console.log(elem);
                    scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="acessarMusica(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
                })
                animateSongList();

            }
            else
            {
                dadosMusicas.forEach(function(elem){
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
                    musicas = getAllSongAlbum(result_album);
                    lcontainer.innerHTML = '<img class="capa-album" src="assets/albums/album-'+result_album+'.jpg" alt="" style="margin-top: 15px; cursor:pointer;" onclick="gotoAlbum(\''+result_album+'\')"><div id="albumTitle" style="cursor:pointer;" onclick="gotoAlbum(\''+result_album+'\')"><h1>'+result_album+'</h1></div><div id="albumSongs">'+musicas[2]+'</div><button id="tocar-playlist-toda" onclick="addQueueAlbum(\''+result_album+'\')">Play</button>';
                    scontainer.innerHTML = "";
                    musicas[1].forEach(function(elem){
                        scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="acessarMusica(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
                    })
                    animateSongList();
                }
                else
                {
                    var length = 0;
                    dadosMusicas.forEach(function(elem){
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
                        
                        lcontainer.innerHTML = '</div><button id="tocar-playlist-toda" onclick="addQueueSong(\''+sb.value.toLowerCase()+'\')">Play</button>';
                        scontainer.innerHTML = "";
                        result_song.forEach(function(elem){
                            scontainer.innerHTML+='<div class="songCard" oncontextMenu="showContext(\''+elem[3]+'\');return false;"><div class="songLeft"><img class="icon-sm"src="assets/icons/music-player-grey.png"><div class="songTitle" onclick="acessarMusica(\''+elem[3]+'\')">'+elem[3]+'</div><div class="songDetail"><span class="songArtist" onclick="gotoArtist(\''+elem[1]+'\')">'+elem[1]+'</span> <span class="songAlbum" style="margin-left: 0;" onclick="gotoAlbum(\''+elem[2]+'\')">'+elem[2]+'</span></div></div><div class="songRight">'+elem[4]+'</div></div>';    
                        })
                        animateSongList();
                    }
                    else
                    {
                        if(sb.value !=="")
                        {
                            document.querySelector("#leftContainer").style.display="none";
                            document.querySelector("#containerMusica").style.display="none";
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
        document.querySelector("#containerMusica").style.display="none";
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
    dadosMusicas.forEach(function(elem){
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
    var musicas =  getAllSongGenre(param);
    song_queue=[]
    musicas[1].forEach(function(elem){
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
    var musicas = getAllSongAlbum(param);
    song_queue=[]
    musicas[1].forEach(function(elem){
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
    var musicas = getAllSongArtist(param);
    song_queue=[]
    musicas[1].forEach(function(elem){
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


function getUserSong()
{
    var musicas = [];
    var length = 0;
    user_data[selected_user][1].forEach(function(elem){
        length = musicas.push(elem);
    });
    return [musicas,length];
}

function playUserSong()
{
    btnPlay.src="assets/icons/pause.png";
    playlist_index = 0;
    var musicas = getUserSong();
    song_queue=[]
    musicas[0].forEach(function(elem){
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
function switchSong()
{
    playlist_index++;
    audio.src = "assets/musicas/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
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
    audio.src = "assets/musicas/"+song_queue[0][1]+"-"+song_queue[0][2]+"-"+song_queue[0][3]+ext;
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
        audio.src = "assets/musicas/"+song_queue[0][1]+"-"+song_queue[0][2]+"-"+song_queue[0][3]+ext;
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

                
        /* function seek(event)
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
                
                audio.src = "assets/musicas/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
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
                
                audio.src = "assets/musicas/"+song_queue[playlist_index][1]+"-"+song_queue[playlist_index][2]+"-"+song_queue[playlist_index][3]+ext;
                currentTitle.innerHTML = song_queue[playlist_index][3];
                currentArtist.innerHTML = song_queue[playlist_index][1];
                currentThumb.src = "assets/albums/album-"+song_queue[playlist_index][2]+".jpg";
                audio.play();
            })
            
        }
        */

        
    }

}