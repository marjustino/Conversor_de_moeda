const flags = {
  BRL: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
  USD: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  EUR: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
}; // Link das bandeiras, pegas da wikipedia para exibir no site


// Função assíncrona para buscar a taxa de câmbio entre duas moedas usando a AwesomeAPI
async function getExchangeRate(from, to) {
  const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${from}-${to}`);
  if (!response.ok) throw new Error('Erro na API');
  const data = await response.json();
  const pair = `${from}${to}`;
  return parseFloat(data[pair].bid);
}

// Função para buscar a taxa de câmbio entre duas moedas usando a AwesomeAPI de conversão
async function converter() {
  const amountBRL = parseFloat(document.getElementById("amount").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(amountBRL) || amountBRL <= 0) { // Evita que o valor inserido seja string ou menor ou igual zero.
    resultDiv.innerText = "Insira um valor válido em BRL.";
    resultDiv.classList.remove("visible");
    return;
  }
// Função matemática de conversão do input para as moedas selecionadas. BRL -> USD e depois USD -> EUR
  try {
    const rateBRLtoUSD = await getExchangeRate("BRL", "USD");
    const amountUSD = amountBRL * rateBRLtoUSD;

    const rateUSDtoEUR = await getExchangeRate("USD", "EUR");
    const amountEUR = amountUSD * rateUSDtoEUR;

    // Limpa o conteúdo e prepara a exibição dos resultados
    resultDiv.classList.remove("visible");

    // Cria container para USD
    const usdDiv = document.createElement("div");
    usdDiv.style.display = "flex";
    usdDiv.style.alignItems = "center";
    usdDiv.style.gap = "8px";

    // Bandeira EUA sem animação
    const usdFlag = document.createElement("img");
    usdFlag.src = flags.USD;
    usdFlag.alt = "Bandeira EUA";
    usdFlag.className = "flag";

// Mostra o valor formatado em euro
    const usdText = document.createElement("span");
    usdText.innerHTML = `<strong>$${amountUSD.toFixed(2)}</strong>`;

    usdDiv.appendChild(usdFlag);
    usdDiv.appendChild(usdText);

    // Cria container para EUR
    const eurDiv = document.createElement("div");
    eurDiv.style.display = "flex";
    eurDiv.style.alignItems = "center";
    eurDiv.style.gap = "8px";
    eurDiv.style.marginLeft = "25px";

    // Bandeira UE sem animação
    const eurFlag = document.createElement("img");
    eurFlag.src = flags.EUR;
    eurFlag.alt = "Bandeira UE";
    eurFlag.className = "flag";


    const eurText = document.createElement("span");
    eurText.innerHTML = `<strong>€${amountEUR.toFixed(2)}</strong>`;

    eurDiv.appendChild(eurFlag);
    eurDiv.appendChild(eurText);

    // Limpa e adiciona os elementos na div de resultado
    resultDiv.innerHTML = "";
    resultDiv.appendChild(usdDiv);
    resultDiv.appendChild(eurDiv);

    // Adiciona a classe visível (se necessário para estilo CSS)
    resultDiv.classList.add("visible");

  } catch (error) {
    console.error(error);
    resultDiv.innerText = "Erro ao obter cotações. Tente novamente.";
    resultDiv.classList.remove("visible");
  }
}

document.getElementById("convertBtn").addEventListener("click", converter);