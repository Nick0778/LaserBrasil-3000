// Seção "Entradas e Saídas"
// A troca de abas já é feita pelo barra-lateral.js, aqui só cuidamos do formulário e do histórico.
document.addEventListener("DOMContentLoaded", () => {

    const secao = document.getElementById("entrada-saida");
    if (!secao) return;

    const formulario = secao.querySelector("form");
    const campoData = document.getElementById("data");
    const historico = document.getElementById("historico");

    // Data de hoje no formato do campo (AAAA-MM-DD), usando o horário local
    // (valueAsDate usa UTC e, depois das 21h no Brasil, mostrava o dia seguinte)
    function dataDeHoje() {
        const agora = new Date();
        const mes = String(agora.getMonth() + 1).padStart(2, "0");
        const dia = String(agora.getDate()).padStart(2, "0");
        return agora.getFullYear() + "-" + mes + "-" + dia;
    }

    function criarCelula(texto, classe) {
        const td = document.createElement("td");
        if (classe) td.className = classe;
        td.textContent = texto;
        return td;
    }

    // Preenche a data com o dia de hoje por padrão
    campoData.value = dataDeHoje();

    // Ao clicar em "Registrar", adiciona a movimentação no topo do histórico
    // (sem isso o formulário recarregava a página inteira)
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const selectProduto = formulario.elements["produto"];
        const produto = selectProduto.options[selectProduto.selectedIndex].text;
        const ehEntrada = formulario.elements["tipo"].value === "E";
        const [ano, mes, dia] = campoData.value.split("-");

        const linha = document.createElement("tr");
        linha.appendChild(criarCelula(dia + "/" + mes + "/" + ano, "col-data"));
        linha.appendChild(criarCelula(produto, "col-produto"));

        const celulaTipo = document.createElement("td");
        const etiqueta = document.createElement("span");
        etiqueta.className = "tag " + (ehEntrada ? "entrada" : "saida");
        etiqueta.textContent = ehEntrada ? "↓ Entrada" : "↑ Saída";
        celulaTipo.appendChild(etiqueta);
        linha.appendChild(celulaTipo);

        linha.appendChild(criarCelula(formulario.elements["quantidade"].value, "num"));
        linha.appendChild(criarCelula(formulario.elements["motivo"].value.trim()));

        historico.prepend(linha);

        formulario.reset();
        campoData.value = dataDeHoje();
    });
});
