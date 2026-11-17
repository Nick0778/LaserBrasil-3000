document.addEventListener("DOMContentLoaded", () => {
    const newProductButton = document.getElementById("btn-novo-produto");
    const cancelRegistrationButton = document.getElementById("btn-cancelar-cadastro");
    
    const productsListSection = document.getElementById("produtos");
    const productRegistrationSection = document.getElementById("cadastro-produto");

    // Ao clicar no botão "+ Novo produto", esconde a seção `produtos` e habilita a seção `cadastro-produto`
    if (newProductButton) {
        newProductButton.addEventListener("click", (e) => {
            e.preventDefault();
            productsListSection.classList.remove("active");
            productRegistrationSection.classList.add("active");
        });
    }

    // Ao clicar no botão "Cancelar", esconde a seção `cadastro-produto` e habilita a seção `produtos`
    if (cancelRegistrationButton) {
        cancelRegistrationButton.addEventListener("click", (e) => {
            e.preventDefault();
            productRegistrationSection.classList.remove("active");
            productsListSection.classList.add("active");
        });
    }
});

// Complementos da aba de cadastro
document.addEventListener("DOMContentLoaded", () => {
    const dashboardNewProductButton = document.getElementById("btn-novo-produto-painel");

    const productRegistrationSection = document.getElementById("cadastro-produto");
    const productsListSection = document.getElementById("produtos");
    const registrationForm = productRegistrationSection.querySelector("form");

    // Ao clicar em "+ Novo produto" no Painel, abre a seção `cadastro-produto`
    // O cadastro pertence a "Produtos", então esse botão do menu fica selecionado
    if (dashboardNewProductButton) {
        dashboardNewProductButton.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
            productRegistrationSection.classList.add("active");
            document.querySelectorAll(".nav-btn").forEach(btn => {
                btn.classList.toggle("active", btn.getAttribute("data-target") === "produtos");
            });
        });
    }

    // Ao clicar em "Salvar", adiciona o produto na tabela de `produtos` e volta para a listagem
    // (sem isso o formulário recarregava a página inteira)
    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("nome-produto").value.trim();
            const category = document.getElementById("categoria").value.trim();
            const quantity = Number(document.getElementById("disponivel").value);
            const minimum = Number(document.getElementById("minimo").value);

            // Mesmo critério do Painel: zerado = Esgotado; até o mínimo = Estoque baixo
            let statusClass = "status-ok";
            let statusText = "OK";
            if (quantity === 0) {
                statusClass = "status-esgotado";
                statusText = "Esgotado";
            } else if (quantity <= minimum) {
                statusClass = "status-estoque-baixo";
                statusText = "Estoque baixo";
            }

            const row = document.createElement("tr");
            [name, category, quantity, minimum].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            const statusCell = document.createElement("td");
            const badge = document.createElement("span");
            badge.className = statusClass;
            badge.textContent = statusText;
            statusCell.appendChild(badge);
            row.appendChild(statusCell);

            productsListSection.querySelector(".tabela-produtos tbody").appendChild(row);

            registrationForm.reset();
            productRegistrationSection.classList.remove("active");
            productsListSection.classList.add("active");
        });
    }
});
