class CrudHistorico {
  createHistorico(audio) {
    let audios = this.readHistoricos();
    
    // Adiciona a data e hora atual
    const dataAtual = new Date();
    audio.dataAdicao = dataAtual.toLocaleDateString();
    audio.horaAdicao = dataAtual.toLocaleTimeString();

    audios.push(audio);
    this.updateHistoricos(audios);
  }

  readHistoricos() {
    return JSON.parse(localStorage.getItem("audios")) || [];
  }

  readHistorico(idHistorico) {
    let audios = this.readHistoricos();
    return audios.find((audio) => audio.id == idHistorico);
  }

  updateHistoricos(audios) {
    localStorage.setItem("audios", JSON.stringify(audios));
  }

  updateHistorico(audioAtualizada) {
    let audios = this.readHistoricos();
    let indice = audios.findIndex((audio) => audio.id == audioAtualizada.id);
    audios[indice] = audioAtualizada;
    this.updateHistoricos(audios);
  }

  deleteHistorico(idExcluida) {
    let audios = this.readHistoricos();
    let indice = audios.findIndex((audio) => audio.id == idExcluida);
    audios.splice(indice, 1);
    this.updateHistoricos(audios);
  }
}

export default CrudHistorico;
