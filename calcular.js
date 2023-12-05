const res = document.querySelector(".resultado");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let primeironum = null;
let operador = null;
let restart = false;

function updateRes(originClear = false){ /*função que define se o numero apresentado é o zero ou o digitado */
    res.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;

        if (!isNaN(buttonText) || buttonText === ".") {
            // Lógica para números e ponto decimal
            if (restart) {
                currentNumber = buttonText;
                restart = false;
            } else {
                currentNumber += buttonText;
            }
            updateRes();
        } else if (buttonText === "C") {
            // Lógica para o botão de limpar (C)
            currentNumber = "";
            primeironum = null;
            operador = null;
            updateRes(true);
        } else if (["+", "-", "x", "/"].includes(buttonText)) {
            // Lógica para operadores
            if (primeironum === null) {
                primeironum = parseFloat(currentNumber);
                operador = buttonText;
                restart = true;
            } else {
                // Se já tiver um primeiro número e um operador, realiza o cálculo
                const segundoNum = parseFloat(currentNumber);
                switch (operador) {
                    case "+":
                        primeironum += segundoNum;
                        break;
                    case "-":
                        primeironum -= segundoNum;
                        break;
                    case "x":
                        primeironum *= segundoNum;
                        break;
                    case "/":
                        primeironum /= segundoNum;
                        break;
                }
                operador = buttonText;
                currentNumber = primeironum.toString();
                restart = true;
                updateRes(); //atualizar a exibição do resultado com o resultado da operação.
            }
        } else if (buttonText === "=") {
            // Lógica para o botão de igual (=)
            if (primeironum !== null && operador !== null) {
                const segundoNum = parseFloat(currentNumber);
                switch (operador) {
                    case "+":
                        primeironum += segundoNum; //Se o operador for "+", add o segundo número ao primeiro.
                        break;
                    case "-":
                        primeironum -= segundoNum;
                        break;
                    case "x":
                        primeironum *= segundoNum;
                        break;
                    case "/":
                        primeironum /= segundoNum;
                        break;
                }
                currentNumber = primeironum.toString();
                operador = null; //Limpa o operador, pois a operação foi concluída.
                restart = true; // indica que a próxima entrada deve começar um novo número.
                updateRes();//para atualizar a exibição do resultado com o resultado da operação.
            }
        }
    });
});

