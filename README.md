# ⚖️ Diretoria JurídicaPRO - Extensão para Chrome

Bem-vindo ao repositório da **Diretoria JurídicaPRO**! 📑  
Essa extensão foi desenvolvida para otimizar a extração de dados do **SEI (Sistema Eletrônico de Informações)**, tornando a rotina jurídica **mais ágil e eficiente**.  

🚀 **Este projeto foi criado pela Diretoria Jurídica da Defensoria Pública do Estado de Mato Grosso (DPEMT)** com o objetivo de **facilitar o preenchimento do Relatório Mensal de Atividades (RMA) pelos Advogados**, permitindo uma coleta automática de informações do SEI e agilizando o registro de atividades.

---

## 📂 Estrutura do Projeto

/diretoria-juridica-pro/ 
├── icons/ # Ícones da extensão 
│ ├── icon16.png 
│ ├── icon48.png 
│ ├── icon128.png 
├── img/ # Imagens utilizadas na extensão 
│ ├── enviar.png 
│ ├── enviar.svg 
│ ├── enviar2.png 
│ ├── icon.png 
│ ├── icon2.png 
├── temporario/ # Arquivos temporários e de teste 
│ ├── background.js 
│ ├── botoes_config.json 
│ ├── content.js 
│ ├── copy.png 
│ ├── dados_config.json 
│ ├── icon.png 
├── LICENSE # Licença do projeto 
├── manifest.json # Configuração da extensão para o Chrome 
├── package-lock.json # Dependências do projeto 
├── popup.html # Interface principal do popup da extensão 
├── popup.js # Script responsável pelo funcionamento do popup 
├── README.md # Documentação do projeto 
├── setting.png # Ícone de configurações 
├── sheet.png # Ícone de planilhas 
├── styles.css # Estilização do popup

---

## ⚙️ Configuração do Ambiente

### 📌 Pré-requisitos

- **Google Chrome** (para rodar a extensão)
- **Node.js** *(opcional, para desenvolvimento avançado)*

### 📥 Instalação

1️⃣ **Clone o repositório:**  
```sh
git clone https://github.com/seu-usuario/diretoria-juridica-pro.git
cd diretoria-juridica-pro
```

2️⃣ **Carregar no Google Chrome:**  
- Acesse `chrome://extensions/` no navegador.
- Ative o **Modo Desenvolvedor** no canto superior direito.
- Clique em **Carregar sem compactação** e selecione a pasta do projeto.

3️⃣ **A extensão será ativada automaticamente!** 🎯  

---

## 🚀 Uso

### 🔧 Funcionalidades Principais

✅ **Captura automática** de informações jurídicas no SEI.  
✅ **Botão para copiar** os dados formatados para colagem no Google Sheets.  
✅ **Configuração do link do RMA** para integração rápida.  
✅ **Interface intuitiva** e responsiva.  

### 📌 Como Utilizar?

1️⃣ Acesse um **processo jurídico no SEI**.  
2️⃣ Clique no botão **📋 Copiar** para obter os dados.  
3️⃣ Cole diretamente no **Google Sheets** ou em qualquer documento.  
4️⃣ Para configurar o **link do RMA**, acesse as **Configurações** ⚙️.  

---

## 🔗 Rotas e Configuração do RMA

A extensão permite salvar um **link personalizado do RMA**, que pode ser acessado diretamente pelo botão dentro do SEI.  

🔹 **Para configurar o RMA:**  
1. Clique no botão ⚙️ **Configurações**.  
2. Insira o **link do RMA** desejado.  
3. O link será salvo automaticamente.  

---

## 🤝 Contribuição

Quer ajudar no desenvolvimento? Siga os passos abaixo:

1️⃣ **Faça um fork do projeto**  
2️⃣ **Crie uma branch para sua feature:**  
   ```sh
   git checkout -b feature/minha-feature
   ```
3️⃣ **Faça as alterações e commit:**  
   ```sh
   git commit -m "Adicionando nova funcionalidade"
   ```
4️⃣ **Envie para o repositório remoto:**  
   ```sh
   git push origin feature/minha-feature
   ```
5️⃣ **Abra um Pull Request e aguarde a revisão!** 🚀  

---

## 📜 Licença

Este projeto está licenciado sob a **MIT License**.  
Sinta-se livre para usar, modificar e contribuir! 🎉  

---

💡 *Melhore sua produtividade e simplifique sua rotina jurídica com a Diretoria JurídicaPRO!* 😃⚖️
