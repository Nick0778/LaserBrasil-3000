// Espera até que o documento tenha carregado com sucesso
document.addEventListener("DOMContentLoaded", () => {

    // Busca e seleciona todos os botões e todas as seções
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".view-section");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            // Remove a classe `active` de todos os botões e seções da página 
            navButtons.forEach(nav => nav.classList.remove("active"));
            sections.forEach(sec => sec.classList.remove("active"));

            // Adiciona a classe `active` somente no botão clicado
            // Com isso, o botão vai aparecer selecionado na página
            btn.classList.add("active");

            // Busca qual seção abrir baseado no valor de `data-target`
            const targetID = btn.getAttribute("data-target");

            // Busca qual elemento cujo atributo `id` corresponde ao `targetID`
            const targetSection = document.getElementById(targetID);

            // Caso encontre, adiciona a classe `active`, mostrando a seção desejada 
            if (targetSection)
            {
                targetSection.classList.add("active");
            }
        })
    })
})