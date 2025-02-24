document.addEventListener("DOMContentLoaded", function () {
  console.log("📌 Popup carregado.");

  const copiarBtn = document.getElementById("copiarTodos");
  const configBtn = document.getElementById("configuracoes");
  const dataTable = document.getElementById("data-table");

  // 🔹 Verificação para evitar erros caso elementos não existam
  if (!copiarBtn || !configBtn || !dataTable) {
    console.error("⚠️ Um ou mais elementos do popup não foram encontrados.");
    return;
  }

  // 🔹 Obtém os dados automaticamente ao abrir o popup
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

      if (response && response.dadosConfigurados) {
        console.log("✅ Dados recebidos:", response);
        exibirDados(response.dadosConfigurados);
      } else {
        console.warn("⚠️ Nenhum dado recebido.");
      }
    });
  });

  function exibirDados(dados) {
    const tbody = dataTable.querySelector("tbody");
    if (!tbody) {
      console.error("⚠️ Elemento <tbody> não encontrado dentro da tabela.");
      return;
    }

    tbody.innerHTML = ""; // Limpa os dados antes de adicionar novos

    Object.entries(dados).forEach(([chave, valor]) => {
      const tr = document.createElement("tr");

      const tdNome = document.createElement("td");
      tdNome.textContent = chave.replace(/_/g, " ").toUpperCase();
      tdNome.style.fontWeight = "bold";
      tr.appendChild(tdNome);

      const tdValor = document.createElement("td");
      tdValor.textContent = valor;
      tr.appendChild(tdValor);

      tbody.appendChild(tr);
    });
  }

  // 🔹 Copiar todos os dados ao clicar no botão
  copiarBtn.addEventListener("click", function () {
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

        if (response && response.dadosConfigurados) {
          copiarTexto(response.dadosConfigurados);
        } else {
          console.warn("⚠️ Nenhum dado recebido.");
        }
      });
    });
  });

  function copiarTexto(dados) {
    if (!dados) {
      console.warn("⚠️ Nenhum dado disponível para copiar.");
      return;
    }

    const valores = Object.values(dados).join("\t");
    navigator.clipboard.writeText(valores).then(() => {
      alert("✅ Dados copiados com sucesso!");
    }).catch(err => {
      console.error("⚠️ Erro ao copiar:", err);
    });
  }

  // 🔹 Configurar link do RMA
  configBtn.addEventListener("click", function () {
    let novoLink = prompt("Insira o link do RMA:");

    if (novoLink) {
      chrome.storage.sync.set({ rmaLink: novoLink }, function () {
        alert("✅ Link do RMA salvo com sucesso!");
      });
    }
  });
});
