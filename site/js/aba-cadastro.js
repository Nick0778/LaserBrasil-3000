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