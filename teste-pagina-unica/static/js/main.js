// main.js
import Paginas from "./ClassePaginas.js";

// Função para inicializar o aplicativo
function inicializar() {
  const containerPrincipal = document.getElementById('containerPrincipal');
  const paginas = new Paginas(containerPrincipal);

  // Adiciona eventos aos botões do menu Lateral
  document.getElementById('logo').addEventListener('click', () => window.location.href = './static/html/landing-page.html');
  document.getElementById('menu-lateral-inicio').addEventListener('click', () => paginas.acessarInicio());
  document.getElementById('menu-lateral-feedback').addEventListener('click', () => paginas.acessarFeedback());

  // Adiciona eventos aos botões do menu Nav do Mobile
  document.getElementById('btInicioMobile').addEventListener('click', () => paginas.acessarInicio());
  document.getElementById('btFeedbackMobile').addEventListener('click', () => paginas.acessarFeedback());
  document.getElementById('btLandingPageMobile').addEventListener('click', () => window.location.href = './static/html/landing-page.html');

  // Adiciona evento do botão Compartilhar
  document.getElementById('botao-popup').addEventListener('click', () => copiarTexto());


  // Define a página inicial
  paginas.acessarInicio();
}

// Aguarda o carregamento do DOM antes de inicializar
document.addEventListener('DOMContentLoaded', inicializar);

/* ********************************** */
/*           Função Compartilhar      */
/* ********************************** */

function copiarTexto() {
    var copiarTexto = document.getElementById("input-compartilhar");
    copiarTexto.select();
    copiarTexto.setSelectionRange(0, 99999); // Versão mobile
    navigator.clipboard.writeText(copiarTexto.value);
    alert("Link copiado com sucesso!")
}


/* ********************************** */
/*           Função Filtrar      */
/* ********************************** */
function filtrar() {
    var input,
    filter,
    ul,
    li,
    i,
    txtValue,
    count = 0
  
    input = document.getElementById("barraFiltro");
    ul = document.getElementById("containerMusica");
  
    filter = input.value.toUpperCase();
  
    li = ul.getElementsByTagName("li");
  
    for (i = 0; i < li.length; i++) {
      textoFiltrado = li[i].getElementsByClassName("songTitle")[0];
      txtValue = textoFiltrado.textContent || textoFiltrado.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        count++
        nomeTitulo = li[i].querySelector(".songTitle");
        if (nomeTitulo) {
          nomeTitulo.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
            return "<strong>" + match + "</strong>";
          })
        }
      } else {
          li[i].style.display = "none";
      }
    } 
  }
