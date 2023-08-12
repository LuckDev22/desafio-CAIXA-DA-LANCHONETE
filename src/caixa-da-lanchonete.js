class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const FORMAS_DE_PAGAMENTO = ["dinheiro", "debito", "credito"];

        const cardapio = {
            cafe: 3.0,
            chantily: 1.5,
            suco: 6.2,
            sanduiche: 6.5,
            queijo: 2.0,
            salgado: 7.25,
            combo1: 9.5,
            combo2: 7.5,
        };

        const calcularValorItem = (codigo, quantidade) => {
            let valor = cardapio[codigo];
        
            if (codigo === "cafe" && quantidade >= 1) {
                valor += (quantidade - 1) * cardapio.chantily;
            }
            if (codigo === "sanduiche" && quantidade >= 1) {
                valor += (quantidade - 1) * cardapio.queijo;
            }
            return valor * quantidade;
        };

        const validarPedido = (pedido) => {
            console.log(pedido)
            for (const item of pedido) {
                const [codigo, quantidade] = item.split(",");
                if (!cardapio[codigo]) {
                    return "Item inválido!";
                }
                if ((codigo !== "chantily" && codigo !== "queijo") && (quantidade <= 0 || isNaN(quantidade))) {
                    return "Quantidade inválida!";
                }
                if ((codigo === "chantily" || codigo === "queijo") && !pedido.includes(`${codigo === "chantily" ? "cafe" : "sanduiche"},${quantidade}`)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
            return null;
        };

        const processarPagamento = (total, metodoDePagamento) => {
            if (!FORMAS_DE_PAGAMENTO.includes(metodoDePagamento)) {
                return "Forma de pagamento inválida!";
            }
            if (metodoDePagamento === "dinheiro") {
                total *= 0.95; // 5% de desconto
            } else if (metodoDePagamento === "credito") {
                total *= 1.03; // 3% de acréscimo
            }
            return `R$ ${total.toFixed(2).replace(".", ",")}`;
        };

        const erro = validarPedido(itens);
        if (erro) {
            return erro;
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        for (const item of itens) {
            const [codigo, quantidade] = item.split(",");
            total += calcularValorItem(codigo, parseInt(quantidade));
        }

        return processarPagamento(total, metodoDePagamento);
    }
}

export { CaixaDaLanchonete };