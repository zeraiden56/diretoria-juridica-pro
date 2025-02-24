document.addEventListener("DOMContentLoaded", function () {
  console.log("📌 Popup carregado.");

  // Obtém os dados automaticamente ao abrir o popup
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      console.error("⚠️ Nenhuma aba ativa encontrada.");
      return;
    }

    const tabId = tabs[0].id;

    chrome.tabs.sendMessage(tabId, { action: "obterDados" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("⚠️ Erro ao obter os dados:", chrome.runtime.lastError);
        return;
      }

      if (response) {
        console.log("✅ Dados recebidos:", response);
        exibirDados(response.dadosConfigurados);
      } else {
        console.warn("⚠️ Nenhum dado recebido.");
      }
    });
  });

  function exibirDados(dados) {
    const tbody = document.querySelector("#data-table tbody");
    tbody.innerHTML = "";

    Object.entries(dados).forEach(([chave, valor]) => {
      const tr = document.createElement("tr");

      const tdNome = document.createElement("td");
      tdNome.textContent = chave.replace("_", " ").toUpperCase();
      tdNome.style.fontWeight = "bold";
      tr.appendChild(tdNome);

      const tdValor = document.createElement("td");
      tdValor.textContent = valor;
      tr.appendChild(tdValor);

      tbody.appendChild(tr);
    });
  }

  // Copiar todos os dados ao clicar no botão
  document.getElementById("copiarTodos").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) {
        console.error("⚠️ Nenhuma aba ativa encontrada.");
        return;
      }

      const tabId = tabs[0].id;

      chrome.tabs.sendMessage(tabId, { action: "obterDados" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("⚠️ Erro ao obter os dados:", chrome.runtime.lastError);
          return;
        }

        if (response) {
          copiarTexto(response.dadosConfigurados);
        } else {
          console.warn("⚠️ Nenhum dado recebido.");
        }
      });
    });
  });

  function copiarTexto(dados) {
    const valores = Object.values(dados).join("\t"); // Tabulação para colar no Google Sheets
    navigator.clipboard.writeText(valores).then(() => {
      alert("✅ Dados copiados com sucesso!");
    }).catch(err => {
      console.error("⚠️ Erro ao copiar:", err);
    });
  }

  // Configurar link do RMA
  document.getElementById("configuracoes").addEventListener("click", function () {
    let novoLink = prompt("Insira o link do RMA:");

    if (novoLink) {
      chrome.storage.sync.set({ rmaLink: novoLink }, function () {
        alert("✅ Link do RMA salvo com sucesso!");
      });
    }
  });

  // Carregar a URL salva no botão "Abrir RMA"
  chrome.storage.sync.get("rmaLink", function (data) {
    if (data.rmaLink) {
      document.getElementById("abrirRMA").addEventListener("click", function () {
        window.open(data.rmaLink, "_blank");
      });
    } else {
      document.getElementById("abrirRMA").addEventListener("click", function () {
        alert("⚠️ Nenhum link do RMA configurado! Vá até as configurações e insira um link.");
      });
    }
  });

});
