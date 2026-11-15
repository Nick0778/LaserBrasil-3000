// Página "Mais Utilizados"
// A troca de abas (Painel, Produtos, ...) já é feita pelo barra-lateral.js,
// então aqui só cuidamos do conteúdo da seção #utilizados.
document.addEventListener("DOMContentLoaded", () => {

    const secao = document.getElementById("utilizados");
    if (!secao) return;

    const listaBarras = secao.querySelector("#mu-barras");
    const listaTotais = secao.querySelector("#mu-totais");
    const subtituloTotal = secao.querySelector("#mu-total-subtitulo");
    const botoesPeriodo = secao.querySelectorAll(".mu-periodo button");

    const LIMITE_RANKING = 5;
    const PERIODO_PADRAO = 30;

    // ------------------------------------------------------------
    // DADOS (provisórios)
    // Enquanto não existir banco de dados / PHP, as saídas ficam aqui.
    // Quando o back-end estiver pronto, basta trocar o corpo da função
    // `buscarSaidas` por um fetch("api/mais-utilizados.php?dias=" + dias)
    // que devolva o mesmo formato: [{ produto: "...", quantidade: 0 }, ...]
    // ------------------------------------------------------------
    const SAIDAS_POR_PERIODO = {
        7: [
            { produto: "Tinta Canon GI-10 Preta",   quantidade: 12 },
            { produto: "Toner HP 105A Preto",       quantidade: 11 },
            { produto: "Toner HP 78A Preto",        quantidade: 8 },
            { produto: "Toner Brother TN-1060",     quantidade: 7 },
            { produto: "Cartucho Epson 544 Ciano",  quantidade: 6 },
            { produto: "Tinta Epson T544 Preta 65ml", quantidade: 4 }
        ],
        30: [
            { produto: "Toner HP 105A Preto",       quantidade: 58 },
            { produto: "Tinta Canon GI-10 Preta",   quantidade: 46 },
            { produto: "Toner HP 78A Preto",        quantidade: 37 },
            { produto: "Cartucho Epson 544 Ciano",  quantidade: 29 },
            { produto: "Tinta Epson T544 Preta 65ml", quantidade: 22 },
            { produto: "Toner Brother TN-1060",     quantidade: 18 },
            { produto: "Cartucho HP 664 Preto",     quantidade: 12 }
        ],
        90: [
            { produto: "Toner HP 105A Preto",       quantidade: 171 },
            { produto: "Tinta Canon GI-10 Preta",   quantidade: 138 },
            { produto: "Toner HP 78A Preto",        quantidade: 112 },
            { produto: "Cartucho Epson 544 Ciano",  quantidade: 88 },
            { produto: "Tinta Epson T544 Preta 65ml", quantidade: 67 },
            { produto: "Toner Brother TN-1060",     quantidade: 54 },
            { produto: "Cartucho HP 664 Preto",     quantidade: 36 }
        ]
    };

    // Único ponto que conhece a origem dos dados
    function buscarSaidas(dias) {
        return SAIDAS_POR_PERIODO[dias] || [];
    }

    // Ordena do maior para o menor e fica só com o Top 5
    function obterTopProdutos(dias) {
        return [...buscarSaidas(dias)]
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, LIMITE_RANKING);
    }

    // ------------------------------------------------------------
    // RENDERIZAÇÃO
    // (textContent em vez de innerHTML: seguro caso os nomes venham do banco)
    // ------------------------------------------------------------
    function criarElemento(tag, classe, texto) {
        const el = document.createElement(tag);
        if (classe) el.className = classe;
        if (texto !== undefined) el.textContent = texto;
        return el;
    }

    function textoUnidades(total) {
        return total + (total === 1 ? " unidade" : " unidades");
    }

    function mostrarVazio(dias) {
        listaBarras.replaceChildren(
            criarElemento("li", "mu-vazio", "Nenhuma saída registrada no período.")
        );
        listaTotais.replaceChildren();
        subtituloTotal.textContent = "Últimos " + dias + " dias · 0 unidades";
    }

    function renderizar(dias) {
        const top = obterTopProdutos(dias);

        if (top.length === 0) {
            mostrarVazio(dias);
            return;
        }

        const maior = top[0].quantidade;
        const total = top.reduce((soma, item) => soma + item.quantidade, 0);

        const linhasBarras = [];
        const linhasTotais = [];
        const barrasParaAnimar = [];

        top.forEach((item, indice) => {
            const posicao = indice + 1;

            // --- Barra horizontal (largura proporcional ao 1º colocado) ---
            const linha = criarElemento("li", "mu-barra-linha");
            const trilho = criarElemento("div", "mu-barra-trilho");
            const preenchida = criarElemento("div", "mu-barra-preenchida");
            preenchida.dataset.posicao = posicao;
            preenchida.dataset.largura = (item.quantidade / maior * 100) + "%";
            trilho.appendChild(preenchida);

            linha.append(
                criarElemento("span", "mu-barra-nome", item.produto),
                trilho,
                criarElemento("span", "mu-barra-valor", item.quantidade)
            );
            linhasBarras.push(linha);
            barrasParaAnimar.push(preenchida);

            // --- Lista "Total de saídas" ---
            const itemTotal = criarElemento("li", "mu-total-item");
            itemTotal.append(
                criarElemento("span", "mu-total-posicao", posicao),
                criarElemento("span", "mu-total-nome", item.produto),
                criarElemento("span", "mu-total-qtd", item.quantidade + " un.")
            );
            linhasTotais.push(itemTotal);
        });

        listaBarras.replaceChildren(...linhasBarras);
        listaTotais.replaceChildren(...linhasTotais);
        subtituloTotal.textContent = "Últimos " + dias + " dias · " + textoUnidades(total);

        // Anima as barras crescendo a partir de zero
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                barrasParaAnimar.forEach(barra => {
                    barra.style.width = barra.dataset.largura;
                });
            });
        });
    }

    // ------------------------------------------------------------
    // FILTRO DE PERÍODO (7 / 30 / 90 dias)
    // ------------------------------------------------------------
    function selecionarPeriodo(dias) {
        botoesPeriodo.forEach(botao => {
            const ativo = Number(botao.dataset.dias) === dias;
            botao.classList.toggle("ativo", ativo);
            botao.setAttribute("aria-pressed", ativo);
        });
        renderizar(dias);
    }

    botoesPeriodo.forEach(botao => {
        botao.addEventListener("click", () => {
            selecionarPeriodo(Number(botao.dataset.dias));
        });
    });

    // Estado inicial
    selecionarPeriodo(PERIODO_PADRAO);
});
