// Função para obter a taxa de câmbio entre duas moedas
async function getExchangeRate(from, to) {
  const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${from}-${to}`);
  const data = await response.json();
  const pair = `${from}${to}`;
  return parseFloat(data[pair].bid);
}

// Função principal que realiza a conversão: BRL → USD → EUR | Função composta f(g(x))
async function converter() {
  const amountBRL = parseFloat(document.getElementById("amount").value);

  // Valida se o valor inserido é válido
  if (isNaN(amountBRL) || amountBRL <= 0) {
    document.getElementById("result").innerText = "Insira um valor válido em BRL.";
    return;
  }

  try {
    // Passo 1: BRL para USD
    const rateBRLtoUSD = await getExchangeRate("BRL", "USD");
    const amountUSD = amountBRL * rateBRLtoUSD;

    // Passo 2: USD para EUR
    const rateUSDtoEUR = await getExchangeRate("USD", "EUR");
    const amountEUR = amountUSD * rateUSDtoEUR;

    // Mostra os resultados
    document.getElementById("result").innerHTML =
      `BRL → USD: <strong>$${amountUSD.toFixed(2)}</strong><br>` +
      `USD → EUR: <strong>€${amountEUR.toFixed(2)}</strong>`;
  } catch (error) {
    console.error(error);
    document.getElementById("result").innerText = "Erro ao obter cotações. Tente novamente.";
  }
}
