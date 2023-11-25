// main.js
import Paginas from './Paginas';

// Função para inicializar o aplicativo
function inicializar() {
  const containerPrincipal = document.getElementById('containerPrincipal');
  const paginas = new Paginas(containerPrincipal);

  // Adiciona eventos aos botões do menu lateral
  document.getElementById('btInicioMobile').addEventListener('click', () => paginas.acessarInicio());
  document.getElementById('btFeedbackMobile').addEventListener('click', () => paginas.acessarFeedback());
  document.getElementById('btLandingPageMobile').addEventListener('click', () => window.location.href = './static/html/landing-page.html');

  // Define a página inicial
  paginas.acessarInicio();
}

// Aguarda o carregamento do DOM antes de inicializar
document.addEventListener('DOMContentLoaded', inicializar);
