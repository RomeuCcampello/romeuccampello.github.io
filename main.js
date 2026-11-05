"use strict";
const valores = {
 diferenca: { consumo:100, tarifa:80, cobrado:8600 },
 compativel: { consumo:120, tarifa:75, cobrado:9000 },
 incompleto: { consumo:null, tarifa:80, cobrado:8600 }
};
const dinheiro = centavos => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(centavos/100);
const el = id => document.getElementById(id);
function atualizar(){
 const f = valores[el("cenario").value];
 el("consumo").textContent = f.consumo === null ? "Ausente" : f.consumo + " kWh";
 el("tarifa").textContent = dinheiro(f.tarifa) + "/kWh";
 el("cobrado").textContent = dinheiro(f.cobrado);
 if(f.consumo === null){
   el("resultado-titulo").textContent="Leitura incompleta";
   el("diferenca").textContent="Conferir consumo";
   el("calculo").textContent="O cálculo depende de uma leitura completa.";
   return;
 }
 const esperado = f.consumo*f.tarifa;
 const diferenca = f.cobrado-esperado;
 el("resultado-titulo").textContent=diferenca ? "Revisão necessária" : "Valores compatíveis";
 el("diferenca").textContent=dinheiro(diferenca);
 el("calculo").textContent=f.consumo+" × "+dinheiro(f.tarifa)+" = "+dinheiro(esperado)+" esperados.";
}
el("cenario").addEventListener("change",atualizar);
atualizar();

const modal = document.getElementById("gallery-modal");
document.querySelectorAll(".gallery-open").forEach(button => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    document.getElementById("gallery-title").textContent = button.dataset.title;
    document.getElementById("gallery-image").src = image.src;
    document.getElementById("gallery-image").alt = image.alt;
    document.getElementById("gallery-file").href = image.src;
    modal.showModal();
  });
});
document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", event => {
  if (event.target === modal) {
    const bounds = modal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      modal.close();
    }
  }
});
