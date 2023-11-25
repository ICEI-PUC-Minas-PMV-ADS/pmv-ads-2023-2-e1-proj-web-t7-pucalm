/* ********************************** */
/*          Funções Globais           */
/* ********************************** */

function redirecionarParaPagina(pagina) {
  window.location.href = pagina;
}

// Redirecionar para página Inicio
const botoesExplorar = document.querySelectorAll(".btnExplorarLP");

botoesExplorar.forEach((botao) => {
  botao.addEventListener("click", function () {
    redirecionarParaPagina("../../index.html");
  });
});
