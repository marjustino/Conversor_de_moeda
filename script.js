const flags = {
  BRL: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
  USD: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  EUR: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
}; // Link das bandeiras, pegas da wikipedia para exibir no site

// Função assíncrona para buscar a taxa de câmbio entre duas moedas usando a AwesomeAPI
async function getExchangeRate(from, to) {
  const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${from}-${to}`);
  if (!response.ok) throw new Error('Erro na API'); // Trata erro se a resposta não for OK
  const data = await response.json(); // Converte o JSON da resposta
  const pair = `${from}${to}`; // Ex: "BRLUSD"
  return parseFloat(data[pair].bid); // Retorna a cotação atual (taxa de compra)
}

// Função para buscar a taxa de câmbio entre duas moedas usando a AwesomeAPI de conversão
async function converter() {
  const amountBRL = parseFloat(document.getElementById("amount").value); // Pega valor digitado no input
  const resultDiv = document.getElementById("result"); // Pega a div de resultado para exibir os valores

  if (isNaN(amountBRL) || amountBRL <= 0) { // Evita que o valor inserido seja string ou menor ou igual zero.
    resultDiv.innerText = "Insira um valor válido em BRL.";
    resultDiv.classList.remove("visible");
    return;
  }

  // Função matemática de conversão do input para as moedas selecionadas. BRL -> USD e depois USD -> EUR
  try {
    const rateBRLtoUSD = await getExchangeRate("BRL", "USD"); // Busca cotação BRL → USD
    const amountUSD = amountBRL * rateBRLtoUSD; // Faz a conversão BRL para USD

    const rateUSDtoEUR = await getExchangeRate("USD", "EUR"); // Busca cotação USD → EUR
    const amountEUR = amountUSD * rateUSDtoEUR; // Faz a conversão USD para EUR

    // Limpa o conteúdo e prepara a exibição dos resultados
    resultDiv.classList.remove("visible");

    // Cria container para USD
    const usdDiv = document.createElement("div");
    usdDiv.style.display = "flex";
    usdDiv.style.alignItems = "center";
    usdDiv.style.gap = "8px";

    // Bandeira Estados Unidos
    const usdFlag = document.createElement("img");
    usdFlag.src = flags.USD;
    usdFlag.alt = "Bandeira EUA";
    usdFlag.className = "flag";

    // Mostra o valor formatado em dólar
    const usdText = document.createElement("span");
    usdText.innerHTML = `<strong>$${amountUSD.toFixed(2)}</strong>`; // Exibe valor USD com 2 casas decimais

    usdDiv.appendChild(usdFlag);
    usdDiv.appendChild(usdText);

    // Cria container para EUR
    const eurDiv = document.createElement("div");
    eurDiv.style.display = "flex";
    eurDiv.style.alignItems = "center";
    eurDiv.style.gap = "8px";
    eurDiv.style.marginLeft = "25px";

    // Bandeira União Européia
    const eurFlag = document.createElement("img");
    eurFlag.src = flags.EUR;
    eurFlag.alt = "Bandeira UE";
    eurFlag.className = "flag";

    const eurText = document.createElement("span");
    eurText.innerHTML = `<strong>€${amountEUR.toFixed(2)}</strong>`; // Exibe valor EUR com 2 casas decimais

    eurDiv.appendChild(eurFlag);
    eurDiv.appendChild(eurText);

    // Limpa e adiciona os elementos na div de resultado
    resultDiv.innerHTML = ""; // Remove qualquer conteúdo anterior
    resultDiv.appendChild(usdDiv); // Adiciona resultado em USD
    resultDiv.appendChild(eurDiv); // Adiciona resultado em EUR

    // Adiciona a classe visível (se necessário)
    resultDiv.classList.add("visible");

  } catch (error) {
    console.error(error); // Mostra erro no console
    resultDiv.innerText = "Erro ao obter cotações. Tente novamente."; // Mensagem de erro para oo usuário
    resultDiv.classList.remove("visible");
  }
}

document.getElementById("convertBtn").addEventListener("click", converter); // Associa o botão ao evento de conversão
