class Chargeable {
    cobrarDoCliente(payment_method, value) { }
}

class Printer extends Chargeable {
    constructor(printColorful, sheetQuantity, printValue, paymentMethod) {
        super();
        this.printColorful = printColorful;
        this.sheetQuantity = sheetQuantity;
        this.printValue = printValue;
        this.paymentMethod = paymentMethod;
        this.acceptedPaymentMethods = ["Dinheiro", "PIX", "Cartão"];
    }

    scanAndPrint() {
        if (this.cobrarDoCliente()) {
            alert(`Pagamento no ${this.paymentMethod.toLowerCase()} feito com sucesso, o valor total foi de ${this.printValue} reais, agora vamos escanear e imprimir seus documentos`);
            alert("Escaneando documento...");
            alert("Imprimindo documento...");
            alert('Documento impresso com sucesso, você retornara ao menu!')
        }
    }

    isPaymentMethodValid() {
        if (this.paymentMethod.toLowerCase() === "dinheiro" ||
            this.paymentMethod.toLowerCase() === "pix" ||
            this.paymentMethod.toLowerCase() === "cartão") {
            return true;
        } else {
            return false;
        }
    }

    cobrarDoCliente() {
        if (this.printColorful) {
            if (this.sheetQuantity > 10) {
                alert("Não é possível imprimir mais do que 10 folhas coloridas, tente escanear e imprimir novamente.");
                return false;
            }
        }

        if (!this.isPaymentMethodValid()) {
            alert("Método de pagamento não aceito, você retornara ao menu!");
            return false;
        }

        return true;
    }
}

function menu() {
    let initialMessage = `🖨️Bem vindo ao serviço de escanear e imprimir🖨️\n\nCada página que será escaneada e impressa custa 1,00 real caso seja preto e branco, e caso seja colorida custa 1,50.\n\nVocê deseja:\n`;;
    let showOptions = "\n1 - Escanear e imprimir\n2 - Não obrigado, desejo sair";
    let menuOp = prompt(initialMessage + showOptions);


    switch (menuOp) {
        case '1':
            const printColorful = confirm('Deseja imprimir colorido? caso sim clique em "OK" e caso queira a impressão em preto e branco clique em cancelar.');
            const sheetQuantity = parseInt(prompt('Digite a quantidade de páginas:'))
            const printValue = printColorful ? sheetQuantity * 1.5 : sheetQuantity * 1.0;
            const paymentMethod = prompt('Digite a condição de pagamento, pode ser:\nDinheiro\nPix\nCartão');
            
            if (sheetQuantity === '' || paymentMethod === '' || isNaN(sheetQuantity) ) { // verifica se o usuário deixou de escrever ou escrevou alguma informação fora do padrão
                alert('Favor escreva opções válidas, tente novamente');
                menu();
            }

            const payment = new Printer(printColorful, sheetQuantity, printValue, paymentMethod);
            payment.scanAndPrint();

            menu();
            break
        case '2':
            alert('Saindo do sistema');
            return
        case null:
            alert('Você clicou em cancelar, vamos fechar o sistema :)');
            return;
        default:
            alert("Digite uma opção válida");
            menu();
            break
    }

}

document.getElementById('startBtn').addEventListener('click', menu)
menu()