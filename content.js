console.log("📌 Content script injetado!");

const dadosConfig = {
    "nome_advogado": "body:nth-child(2) > DIV:nth-child(2) > NAV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(5) > DIV:nth-child(2) > DIV:nth-child(10) > SPAN:nth-child(2)",
    "numero_processo": "body:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)",
    "assunto": "titulo_pagina",
    "data_recebimento": "auto",
    "prazo": "15 DIAS ÚTEIS",
    "pedido_urgencia": "NÃO",
    "tipo_atividade": "",
    "comissao": "NÃO",
    "objeto_atividade": "",
    "setor_destino": "",
    "meio": "VIRTUAL",
    "plataforma": "SEI",
    "observacao": "titulo_pagina",
    "data_envio": "auto"
};

// Obtém a data atual no formato DD/MM/AAAA
function obterDataAtual() {
    let hoje = new Date();
    let dia = String(hoje.getDate()).padStart(2, '0');
    let mes = String(hoje.getMonth() + 1).padStart(2, '0');
    let ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Captura o nome do advogado e transforma em maiúsculas
function capturarNomeAdvogado() {
    let elemento = document.querySelector(dadosConfig["nome_advogado"]);
    if (elemento) {
        let nomeCompleto = elemento.innerText.trim();
        let nomeFormatado = nomeCompleto.includes("(") ? nomeCompleto.split("(")[0].trim() : nomeCompleto;
        return nomeFormatado.toUpperCase();
    }
    return "NÃO ENCONTRADO";
}

// Captura os dados da página
function capturarDadosPagina() {
    let dadosExtraidos = {};

    Object.keys(dadosConfig).forEach((chave) => {
        const seletor = dadosConfig[chave];

        if (chave === "nome_advogado") {
            dadosExtraidos[chave] = capturarNomeAdvogado();
        } else if (chave === "data_recebimento" || chave === "data_envio") {
            dadosExtraidos[chave] = obterDataAtual();
        } else if (chave === "assunto" || chave === "observacao") {
            let tituloLimpio = document.title.split("|")[0].trim();
            dadosExtraidos[chave] = tituloLimpio;
        } else if (chave === "tipo_atividade") {
            dadosExtraidos[chave] = "";
        } else if (!["15 DIAS ÚTEIS", "NÃO", "", "VIRTUAL", "SEI"].includes(seletor)) {
            try {
                const elemento = document.querySelector(seletor);
                dadosExtraidos[chave] = elemento ? elemento.innerText.trim() : "";
            } catch (erro) {
                console.error(`⚠️ Erro ao buscar '${chave}' com seletor '${seletor}':`, erro);
                dadosExtraidos[chave] = "";
            }
        } else {
            dadosExtraidos[chave] = dadosConfig[chave];
        }
    });

    return dadosExtraidos;
}

// Captura todos os dados
function capturarDados(callback) {
    let dadosConfigurados = capturarDadosPagina();
    console.log("✅ Dados extraídos:", dadosConfigurados);

    callback({
        dadosGerais: [],
        dadosConfigurados
    });
}

// Escuta mensagens do popup.js e responde quando solicitado
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "obterDados") {
        capturarDados((dados) => {
            sendResponse(dados);
        });
        return true; // Mantém a conexão aberta até a resposta
    }
});

// Injetar botão de copiar no cabeçalho da página principal
function injetarBotoesNaPagina() {
    let header = document.querySelector("#divInfraBarraSistemaPadraoD > div:nth-child(2)");

    if (header && !document.querySelector("#botaoCopiarPagina")) {
        // Criando container para os botões
        let container = document.createElement("div");
        container.style.display = "flex";
        container.style.gap = "8px"; // Espaço entre botões

        // Função para estilizar os botões
        function estilizarBotao(botao, iconeSrc, bgColor, hoverColor) {
            let icone = document.createElement("img");
            icone.src = chrome.runtime.getURL(iconeSrc);
            icone.style.width = "36px";
            icone.style.height = "36px";

            botao.appendChild(icone);
            botao.style.backgroundColor = bgColor;
            botao.style.border = "none";
            botao.style.padding = "8px";
            botao.style.cursor = "pointer";
            botao.style.borderRadius = "6px";
            botao.style.display = "flex";
            botao.style.alignItems = "center";
            botao.style.justifyContent = "center";
            botao.style.boxShadow = "0px 2px 4px rgba(0,0,0,0.2)";
            botao.style.transition = "background-color 0.3s ease-in-out";

            // Efeito hover para clarear um pouco a cor ao passar o mouse
            botao.addEventListener("mouseenter", function () {
                botao.style.backgroundColor = hoverColor;
            });
            botao.addEventListener("mouseleave", function () {
                botao.style.backgroundColor = bgColor;
            });
        }

        // Botão de copiar
        let botaoCopiar = document.createElement("button");
        botaoCopiar.id = "botaoCopiarPagina";
        estilizarBotao(botaoCopiar, "copy.png", "#004080", "#0059b3");

        botaoCopiar.addEventListener("click", function () {
            capturarDados((dados) => {
                copiarTexto(dados.dadosConfigurados);
            });
        });

        // Botão Abrir RMA
        let botaoRMA = document.createElement("button");
        botaoRMA.id = "botaoAbrirRMA";
        estilizarBotao(botaoRMA, "sheet.png", "#0066CC", "#0080FF");

        botaoRMA.addEventListener("click", function () {
            chrome.storage.sync.get("rmaLink", function (data) {
                if (data.rmaLink) {
                    window.open(data.rmaLink, "_blank");
                } else {
                    alert("⚠️ Nenhum link do RMA configurado! Vá até as configurações e insira um link.");
                }
            });
        });

        // Adicionando os botões ao container
        container.appendChild(botaoCopiar);
        container.appendChild(botaoRMA);
        header.appendChild(container);
    }
}



function copiarTexto(dados) {
    if (!dados) {
        console.warn("⚠️ Nenhum dado disponível para copiar.");
        return;
    }

    const valores = Object.values(dados).join("\t");
    navigator.clipboard.writeText(valores).then(() => {
        alert("✅ Dados copiados para a área de transferência! Cole no seu RMA!");
    }).catch(err => {
        console.error("⚠️ Erro ao copiar:", err);
    });
}

// Chamar a função para injetar o botão ao carregar a página
setTimeout(injetarBotoesNaPagina, 2000);
console.log("📌 Botões de copiar e abrir RMA injetados!");

