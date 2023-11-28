class CrudHistorico {
  createHistorico(audio) {
    audio.dataAdicao = new Date().toLocaleDateString(); // Adiciona a data de hoje ao áudio
    let audios = this.readHistoricos();
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
