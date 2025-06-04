Documentação do Projeto: Conversor de Moedas BRL → USD → EUR

Descrição:
Este projeto é uma aplicação web simples que realiza a conversão de valores de Real (BRL) para Dólar (USD) e depois para Euro (EUR), utilizando a AwesomeAPI (https://docs.awesomeapi.com.br/api-de-moedas) para obter as taxas de câmbio em tempo real.

Funcionalidades:
- Entrada de valor em reais (BRL).
- Conversão do BRL inserido para USD e EUR.
- Exibição do resultado com as bandeiras correspondents (Dólar Americano e Euro).
- Verificação de entrada inválida (ex: letras, valor zero ou negativo).
- Mensagens de erro caso a API falhe (por algum erro inserido ou de rede).

Interface (HTML + CSS):
- Campo de entrada (input) para o valor em reais.
- Botão de conversão (button).
- Área de resultado (div) que exibe os valores convertidos e as bandeiras.
Tecnologias utilizadas:
- HTML5
- CSS3
- JavaScript ES6
- API AwesomeAPI (economia.awesomeapi.com.br)

Como funciona a API:
Utiliza requisições do tipo GET com o fetch.
Exemplo de endpoint:
https://economia.awesomeapi.com.br/json/last/BRL-USD

Lógica do Código:
- O usuário digita um valor em reais.
- O JavaScript verifica se o valor é válido com isNaN() e <= 0.
- A função getExchangeRate(from, to) faz a chamada para a API e retorna a taxa.
- O valor é convertido para USD e, depois, USD é convertido para EUR.
- Os resultados são exibidos dinamicamente com createElement().

Como usar o projeto:
1. Abra o arquivo index.html no navegador.
2. Insira um valor em reais.
3. Clique no botão "Converter".
4. Veja os valores atualizados em dólar e euro.

Estrutura de arquivos:
/projeto-conversor/
- index.html
- style.css
- script.js

Discentes:
- Nomes: Jonathan Gustavo, Marcelo Justino, Roberto Eugênio, Yuri Miguel.
- Curso: Ciência da Computação – UNINASSAU
- Disciplina e Docente: Matemática Aplicada – Alamy Veríssimo.
