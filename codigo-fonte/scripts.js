document.getElementById("feedback-button").addEventListener("click", () => {
    // Quando o botão "feedback" for clicado, atualize a seção de playlists
  
    // Selecione a seção de playlists
    const playlistSection = document.getElementById("playlist-section");
  
    // Defina o novo conteúdo que deseja adicionar
    const novoConteudo = `
      <div class="cartao">
        <div class="imagem-cartao">
          <img src="assets/mix2.jpeg" />
        </div>
        <div class="texto-cartao">
          <h2>Playlist 2</h2>
          <hr>
          <p>Ouvir agora</p>
        </div>
      </div>
      <!-- Adicione mais cartões conforme necessário -->
    `;
  
    // Atualize o HTML da seção de playlists com o novo conteúdo
    playlistSection.innerHTML = novoConteúdo;
  });
  