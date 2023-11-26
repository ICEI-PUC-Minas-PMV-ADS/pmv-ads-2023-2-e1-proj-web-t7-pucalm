import CrudHistorico from "./classeCrudHistorico.js";

crud = new CrudHistorico()

dadosGrafico = crud.readHistoricos()
console.log(dadosGrafico)

const grafico = document.getElementById("grafico");
// Cria o gráfico de tarefas por prioridade
let dadosGrafico = [2, 1, 2];
let seriesGrafico = {
  labels: ["Alta", "Média", "Baixa"],
  datasets: [
    {
      label: "Tarefas",
      data: dadosGrafico,
      borderWidth: 1,
    },
  ],
};
let chart = new Chart(grafico, {
  type: "bar",
  data: seriesGrafico,
  options: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
});


