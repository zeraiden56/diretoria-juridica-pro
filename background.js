chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 Extensão Diretoria JurídicaPRO instalada!");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "injetarScript") {
        console.log("📥 Solicitando injeção de `content.js`...");

        if (sender.tab) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: sender.tab.id },
                    files: ["content.js"]
                },
                () => {
                    console.log("✅ `content.js` injetado com sucesso!");
                    sendResponse({ status: "sucesso" });
                }
            );
        } else {
            console.warn("⚠️ Nenhuma aba ativa encontrada para injetar o script.");
            sendResponse({ status: "erro", mensagem: "Nenhuma aba ativa encontrada." });
        }

        return true; // Mantém a conexão aberta até a resposta
    }

    // Injeção de script dentro de iframes específicos
    if (request.action === "injetarScriptIframe") {
        console.log("📥 Solicitando injeção de `inject.js` no iframe...");

        if (sender.tab && request.iframeId) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: sender.tab.id, frameIds: [request.iframeId] },
                    files: ["inject.js"]
                },
                () => {
                    console.log("✅ `inject.js` injetado com sucesso no iframe.");
                    sendResponse({ status: "sucesso" });
                }
            );
        } else {
            console.warn("⚠️ Erro ao injetar `inject.js`: iframeId ou aba não encontrada.");
            sendResponse({ status: "erro", mensagem: "IframeId ou aba não encontrada." });
        }

        return true; // Mantém a conexão aberta até a resposta
    }
});
